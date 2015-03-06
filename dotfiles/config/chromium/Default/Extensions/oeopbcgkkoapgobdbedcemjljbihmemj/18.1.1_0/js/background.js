// Copyright 2015 Jason Savard

var localeMessages;
var email;
var itemID = "GmailChecker";
var accounts = new Array();
var ignoredAccounts = new Array();
var previousAccounts = new Array();
var pollingAccounts = false;

var unreadCount;
var accountWithNewestMail;
var lastShowNotificationDates = new Array();

var notificationAudio;
var lastNotificationAudioSource;

var oAuthForEmails;
var oAuthForContacts;

var subjects = new Array();
var notification;
var unreadCountWhenShowNotificationWhileActive;
var loadedSettings = false;
var pokerListenerLastPokeTime = new Date(1);
var checkEmailTimer;
var richNotifId;
var richNotifMails = [];
var richNotifButtonsWithValues;
var lastShowNotifParams;
var lastExtensionUpdateNotificationShownDate = new Date(1);
var unauthorizedAccounts;
var checkingEmails = false;
var loadingSettingsDeferred = $.Deferred();
var buttonIcon;

// init objects once in this background page and read them from all other views (html/popup/notification pages etc.)
ChromeTTS();
Controller();

var detectSleepMode = new DetectSleepMode(function() {
	// wakeup from sleep mode action...
	if (getAccountsSummary(accounts).signedIntoAccounts >= 1) {
		console.log("hasAtleastOneSuccessfullAccount - so don't check")
	} else {
		checkEmails("wakeupFromSleep");
	}
});

//Methods declared for "html-css-sanitizer-minified.js"
function allowAllUrls(url, mime) { return url; }
function rewriteIds(id) { return HTML_CSS_SANITIZER_REWRITE_IDS_PREFIX + id; }

function getSettings() {
   return Settings;
}

// seems alert()'s can stop the oninstalled from being called
chrome.runtime.onInstalled.addListener(function(details) {
	console.log("onInstalled: " + details.reason);

	// using .always to ensure Settings.load has finished, loadingSettingsDeferred is passed to Settings.load and once resolved (or maybe already resolved) it will call .always
	loadingSettingsDeferred.always(function() {
		if (details.reason == "install") {
			// Note: Install dates only as old as implementation of this today, Dec 14th 2013
			Settings.store("installDate", new Date());
			Settings.store("installVersion", chrome.runtime.getManifest().version);
			
			// only show options if NOT locked
			if (Settings.read("settingsAccess") != "locked") {
				chrome.tabs.create({url: "http://jasonsavard.com/thankYouForInstalling?app=gmail"});
			}
		} else if (details.reason == "update") {
			// seems that Reloading extension from extension page will trigger an onIntalled with reason "update"
			// so let's make sure this is a real version update by comparing versions
			var realUpdate = details.previousVersion != chrome.runtime.getManifest().version;
			if (realUpdate) {
				console.log("real version changed");
				// extension has been updated to let's resync the data and save the new extension version in the sync data (to make obsolete any old sync data)
				// but let's wait about 60 minutes for (if) any new settings have been altered in this new extension version before saving syncing them
				chrome.alarms.create("extensionUpdatedSync", {delayInMinutes:60});
			}
			
			var previousVersionObj = parseVersionString(details.previousVersion)
			var currentVersionObj = parseVersionString(chrome.runtime.getManifest().version);
			if ((Settings.read("extensionUpdates") == "all" && realUpdate) || (Settings.read("extensionUpdates") == "interesting" && (previousVersionObj.major != currentVersionObj.major || previousVersionObj.minor != currentVersionObj.minor))) {

				if (details.previousVersion != "16.5") { // details.previousVersion != "16.2" && details.previousVersion != "16.3" && details.previousVersion != "16.4"
					var options = {
							type: "basic",
							title: getMessage("extensionUpdated"),
							message: "Checker Plus for Gmail " + chrome.runtime.getManifest().version,
							iconUrl: Icons.NOTIFICATION_ICON_URL,
							buttons: [{title: getMessage("seeUpdates"), iconUrl: "images/notifButtons/exclamation.png"}, {title: getMessage("doNotNotifyMeOfUpdates"), iconUrl: "images/notifButtons/cancel.png"}]
					}
					
					chrome.notifications.create("extensionUpdate", options, function(notificationId) {
						if (chrome.runtime.lastError) {
							console.error(chrome.runtime.lastError.message);
						} else {
							lastExtensionUpdateNotificationShownDate = new Date();
						}
					});
				}
			}
		}		
	});
	
	sendGA("extensionVersion", chrome.runtime.getManifest().version, details.reason);		
});

if (chrome.alarms) {
	chrome.alarms.create("updateContacts", {periodInMinutes:60*24}); // = 1 day
}

if (chrome.runtime.setUninstallURL) {
	var url = "http://jasonsavard.com/uninstalled?app=gmail";
	try {
		if (bg.email) {
			url += "&e=" + encodeURIComponent(btoa(bg.email));
		}
	} catch (e) {
		logError("could not encode email: " + e);
	}
	chrome.runtime.setUninstallURL(url);
}

if (chrome.runtime.onMessageExternal) {
	chrome.runtime.onMessageExternal.addListener(function(message, sender, sendResponse) {
		if (message === "mgmiemnjjchgkmgbeljfocdjjnpjnmcg-poke") {
			
			var info = {
					  "poke"    :   2,              // poke version 2
					  "width"   :   1,              // 406 px default width
					  "height"  :   1,              // 200 px default height
					  "path"    :   "widget.html",
					  "v2"      :   {
					                  "resize"    :   true,  // Set to true ONLY if you create a range below.
					                  "min_width" :   1,     // 200 px min width
					                  "max_width" :   3,     // 406 px max width
					                  "min_height":   1,     // 200 px min height
					                  "max_height":   3      // 200 px max height
					                }
					};
			
			pokerListenerLastPokeTime = new Date();
			chrome.runtime.sendMessage(
				  sender.id, {
					  head: "mgmiemnjjchgkmgbeljfocdjjnpjnmcg-pokeback",
					  body: info
				  }
			);
			refreshWidgetData();
		} else if (sender.id == "blacklistedExtension") {
			//sendResponse({});  // don't allow this extension access
		} else if (message.action == "turnOffDND") {
			setDND_off(true);
		} else if (message.action == "setDNDEndTime") {
			var endTime = new Date(message.endTime);
			setDNDEndTime(endTime, true);
		} else {
			// used for calendar extension "look for references to 'installed' in calendar code to find out why"
			sendResponse({installed:true});
		}
	});
}

// Add listener once only here and it will only activate when browser action for popup = ""
chrome.browserAction.onClicked.addListener(function(tab) {
	var checkerPlusElseCompose = Settings.read("browserButtonAction") == BROWSER_BUTTON_ACTION_CHECKER_PLUS && Settings.read("checkerPlusBrowserButtonActionIfNoEmail") == BROWSER_BUTTON_ACTION_COMPOSE && unreadCount === 0;
	var gmailInboxElseCompose = Settings.read("browserButtonAction") == BROWSER_BUTTON_ACTION_GMAIL_INBOX && Settings.read("gmailPopupBrowserButtonActionIfNoEmail") == BROWSER_BUTTON_ACTION_COMPOSE && unreadCount === 0;
	if (Settings.read("browserButtonAction") == BROWSER_BUTTON_ACTION_COMPOSE || checkerPlusElseCompose || gmailInboxElseCompose) {
		// open compose mail
		if (accounts.length) {
			getFirstActiveAccount(accounts).openCompose();
		} else {
			chrome.tabs.create({url:getSignInUrl()});
		}
	} else {
		// open Gmail
		var ret = openInbox();
		
		// means not signed in so open gmail.com for user to sign in
		if (ret == -1) {
			chrome.tabs.create({url:getSignInUrl()});
		}
	}
});

$(document).ready(function() {
	init();
});

// make sure atleast one email in this group of unread has the setting to be shown in a notification
function oneMailHasThisSetting(settingsName, defaultObj) {
	for (var a=0; a<accounts.length; a++) {
		var account = accounts[a];
		var emails = account.getMail();
		for (var b=0; b<emails.length; b++) {
			var accountMail = emails[b];
			var settingValue = getSettingValueForLabels(account.getSetting(settingsName), accountMail.labels, defaultObj);
			if (settingValue) {
				return true;
			}
		}
	}
}

function maybeAppendAllMsg(msg, emails) {
	if (emails.length == 1) {
		return msg;
	} else {
		return msg + " (" + getMessage("all") + ")";
	}
}

function generateNotificationButton(buttons, buttonsWithValues, value, emails) {
	if (value) {
		var button;
		
		if (value == "markAsRead") {
			button = {title:maybeAppendAllMsg(getMessage("readLink"), emails), iconUrl:"images/notifButtons/checkmark.png"};
		} else if (value == "delete") {
			button = {title:maybeAppendAllMsg(getMessage("delete"), emails), iconUrl:"images/notifButtons/trash.png"};
		} else if (value == "archive") {
			button = {title:maybeAppendAllMsg(getMessage("archiveLink"), emails), iconUrl:"images/notifButtons/archive.png"};
		} else if (value == "spam") {
			button = {title:maybeAppendAllMsg(getMessage("spamLinkTitle"), emails), iconUrl:"images/notifButtons/spam.png"};
		} else if (value == "star") {
			button = {title:maybeAppendAllMsg(getMessage("starLinkTitle"), emails), iconUrl:"images/star-hover4.png"};
		} else if (value == "starAndArchive") {
			button = {title:maybeAppendAllMsg(getMessage("starAndArchive"), emails), iconUrl:"images/star-hover4.png"};
		} else if (value == "open") {
			button = {title:getMessage("open"), iconUrl:"images/notifButtons/open.png"};
		} else if (value == "openInNewTab") {
			button = {title:getMessage("open"), iconUrl:"images/notifButtons/open.png"};
		} else if (value == "openInPopup") {
			button = {title:getMessage("open"), iconUrl:"images/notifButtons/open.png"};
		} else if (value == "reply") {
			button = {title:getMessage("reply"), iconUrl:"images/notifButtons/reply.png"};
		} else if (value == "replyInPopup") {
			button = {title:getMessage("reply"), iconUrl:"images/notifButtons/reply.png"};
		} else if (value == "reducedDonationAd") {
			button = {title:getMessage("reducedDonationAd_notification", "50¢")};
		} else if (value == "markDone") {
			button = {title:maybeAppendAllMsg(getMessage("markDone"), emails), iconUrl:"images/notifButtons/checkmark.png"};
		}

		if (button) {
			buttons.push(button);
			
			var buttonWithValue = clone(button);
			buttonWithValue.value = value;
			buttonsWithValues.push(buttonWithValue);
		}
	}
}

function clearRichNotification(notificationId, callback) {
	callback = initUndefinedCallback(callback);
	
	if (notificationId) {
		chrome.notifications.clear(notificationId, function() {
			richNotifMails = [];
			callback();
		});
	} else {
		richNotifMails = [];
		callback();
	}
}

function canDisplayImageInNotification($image) {
	var src = $image.attr("src");	
	
	var imageRemovedBySender = false;
	if ($image.attr("alt") && $image.attr("alt").indexOf("Image removed by sender") != -1) {
		imageRemovedBySender = true;
	}
	
	if (src && (src.parseUrl().hostname.indexOf(".google.com") != -1 || src.parseUrl().hostname.indexOf(".googleusercontent.com")) && !imageRemovedBySender) { // src.indexOf("/proxy/") == -1
		return true;
	} else {
		return false;
	}
}

// watch out for returns here, we don't want to callback twice or not callback at all!
function fetchEmailImagePreview(options, mail, callback) {
	if (Settings.read("showNotificationEmailImagePreview")) {
		
		if (Settings.read("accountAddingMethod") == "autoDetect") {
			
			// image domain host must be in permissions manifest or else notifications.create gives me download image errors and notification does not appear!
			chrome.permissions.contains(Origins.IMAGE_PREVIEW, function(result) {
				var skipLastCallback;
				
				if (result) {
					if (mail.messages && mail.messages.last()) {
						var $messageContent = $("<div>" + mail.messages.last().content + "</div>");
						console.log("mail.messages", $messageContent);
						fixRelativeLinks($messageContent);
						
						$messageContent.find("img").each(function(index, image) {
							var $image = $(image);
							var src = $image.attr("src");
							
							// do not show common gmail images such as these by ignore /images/
							// .vcf icon = https://mail.google.com/mail/u/0/images/generic.gif
							// .wav icon = https://mail.google.com/mail/u/0/images/sound.gif	
							// /proxy/ used by Google news letters https://ci6.googleusercontent.com/proxy/b0dQF6UdprOZnNdy4YkkZRZYSz4OKeP6tnNaKKhKAHzc5DoRLm-6T9Ofs1I_nxTMa7p63sQXCvlyhmMf4nIKJxbU6hMDZ46Wv5esDXgENaw2csOyvTEfyb2ycnSEic4Yi7N81kiF=s0-d-e1-ft#https://www.gstatic.com/gmktg/mtv-img/cloudplatform_hero_image_2014_mar_w538.jpg
							// google logo 						   https://ci4.googleusercontent.com/proxy/GYehbMfqpOfmkZni3YXcVpYFnSdFa4_3HNmCzVHxFFhtCBk_QulXrkB97v_UVSU0gt8t42RnDKOqw0SvszkMjvrdKHZjm3UErjYHQI7vsurAMj3tGuzIFiqw8xIvgCy_aoN9ujcdkHDJYGLdO9h6jySufmfLtNIRr8tXVfdR=s0-d-e1-ft#https://ssl.gstatic.com/s2/oz/images/notifications/logo/google-plus-6617a72bb36cc548861652780c9e6ff1.png
							// twitter profile image: https://ci4.googleusercontent.com/proxy/6gEsiJis1bR3V0VjLSVPlXWkvG5gpih1SXl76ZtlPej0gbvzyT5csZHqRvspHtFm6RSN3GMjr341ggvV8bL1kUfidvh40p5QhrHlZHUgvGD9Rzzka29xynqxWPMupf5w0YCPXAterd8WXA=s0-d-e1-ft#https://pbs.twimg.com/profile_images/1710068300/avatar-sel-port_reasonably_small.jpg
							// pinterest logos "/logo" ... https://ci4.googleusercontent.com/proxy/FljV4IcGHkNGLK57gCiy7cBamDrSWta_-7hOh_NMFw5xEjJo3MUga5TaUfk3gGcoZ2HQTvCgLoEUu60kokQkHWfke_Zg0QENUV_Z4flLXGIYhV7As6dHwGc=s0-d-e1-ft#http://email-assets.pinterest.com/email/shared/brand/logo_large.gif

							if (src && canDisplayImageInNotification($image) && src.parseUrl().pathname.indexOf("/images/") == -1 && src.indexOf("notifications/") == -1 && src.indexOf("/logo") == -1) {
								// hostname is .google.com if they embedded the image
								// hostname is .googleusercontent.com if they in Gmail > clicked Insert Photo > by Web address (URL)							
								if (src.parseUrl().hostname.indexOf(".google.com") != -1) {
									options.type = "image";
									// assign default low res embedded image
									options.imageUrl = src;
									
									// see if we can change that default image with hig res image
									if (src.indexOf("disp=thd") != -1) {
										var fullImageImage = new Image();
										var fullImageSrc = src.replace("disp=thd", "disp=inline");
										
										skipLastCallback = true;
										$.ajax(fullImageSrc)
											.done(function(data, textStatus, jqXHR) {
												options.imageUrl = fullImageSrc;
												callback();
											})
											.fail(function(jqXHR, textStatus) {
												logError("could not load preview image: " + textStatus, jqXHR);
												callback();
											})
										;
									}
									// exit image loop
									return false;
								} else {
									// Google+ email: let's pull the first image as iconurl and 2nd as the imageurl
									if (mail.authorMail && mail.authorMail.indexOf("@plus.google.com") != -1) { //noreply-2fe90779@plus.google.com
										// detect 1st profile photo
										if (src.indexOf("photo.jpg") != -1) {
											var callbackParams = {};
											callbackParams.detectedIconUrl = src;
											
											// find a posted large photo if in the email...
											$messageContent.find("img").each(function(index, image) {
												// skip any other possible "profile photos" until we find one without a width
												// profile pic: <img width="75" height="75" style="border:solid 1px #cccccc" src="https://lh5.googleusercontent.com/-AaGu6jEK0vQ/AAAAAAAAAAI/AAAAAAAAPyw/Ri1xBFp8ZTk/s75-c-k-a-no/photo.jpg"></a></td>
												// attached pic: https://lh4.googleusercontent.com/-zZ09UJ_sZeM/UyKo78Wy74I/AAAAAAAFPUc/uR1p1NvrCd8/w506-h750/1979464_675320629180179_9739741_n.jpg
												// and no static images like Google+ image found at this ex. url: https://ssl.gstatic.com/s2/oz/images/notifications/logo/google-plus-6617a72bb36cc548861652780c9e6ff1.png
												console.log("detected image: " + $(image).attr("src"));
												if (!$(image).attr("width") && canDisplayImageInNotification($(image)) && $(image).attr("src") && $(image).attr("src").indexOf("notifications/") == -1) {
													options.type = "image";
													options.imageUrl = $(image).attr("src");
													return false;
												}
											});
											
											skipLastCallback = true;
											callback(callbackParams);
											return false;
										}
									} else if (mail.authorMail && mail.authorMail.indexOf("@facebookmail.com") != -1) {
										// https://ci3.googleusercontent.com/proxy/g96-WnOcJ8aMpwH8MgjPEGTy5Q32qaOHpaF30q0s6tJRXXxs8yRr5jFkDIWAX_-wDIkjnoGpvMmPqJp_GGHk4U5yhSmUiBmDma-tPDyIE7Y_2-jWYC0PmPxhRU8mcSqqJxoqi27HTYG6sh9Jcbzsuw=s0-d-e1-ft#https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/t5/1117010_779426678_323617099_q.jpg
										if (src.indexOf("profile") != -1) {
											var callbackParams = {};
											callbackParams.detectedIconUrl = src;
											skipLastCallback = true;
											callback(callbackParams);
											return false;
										}
									} else if (($image.attr("width") && $image.attr("width") >= PREVIEW_IMAGE_MIN_WITDH_HEIGHT) && ($image.attr("height") && $image.attr("height") >= PREVIEW_IMAGE_MIN_WITDH_HEIGHT)) {
										options.type = "image";
										options.imageUrl = src;
										// exit image loop
										return false;
									} else { // could not determine width/height
										// Get the real width/height											
										var $copyOfImage = $("<img/>") // Make in memory copy of image to avoid css issues
										$copyOfImage.attr("src", src);

										skipLastCallback = true;
										
										loadImage($copyOfImage).then(function($thisImage) {
											var thisImage = $thisImage.get(0);
											console.log("copy image width/height: ", thisImage, thisImage.width + "/" + thisImage.height);
											// Note: $(this).width() will not work for in memory images.
											if (thisImage.width >= PREVIEW_IMAGE_MIN_WITDH_HEIGHT && thisImage.height >= PREVIEW_IMAGE_MIN_WITDH_HEIGHT) {
												options.type = "image";
												options.imageUrl = src;
											}
										}).catch(function(errorResponse) {
											logError("could not load image: " + errorResponse);
										}).then(function() {
											callback({});
										});

										// exit image loop
										return false;
									}									
								}
							} else {
								console.log("did not pass image tests");
							}
						});
					}
				}
				
				if (!skipLastCallback) {
					callback();
				}
			});
			// because we return here, make sure we call callback everywhere before this line
			return;
		} else {
			// oauth
			var skipLastCallback;
			if (mail.messages && mail.messages.last()) {
				var lastMessage = mail.messages.last();
				var foundPossibleImage = lastMessage.files.some(function(file, fileIndex) {
					if (file.mimeType && file.mimeType.indexOf("image/") == 0 && file.body.size >= PREVIEW_IMAGE_MIN_SIZE && file.body.size < PREVIEW_IMAGE_MAX_SIZE) {
						var queuedFile = mail.queueFile(lastMessage.id, file);
						queuedFile.fetchPromise.then(function(response) {
							options.type = "image";
							options.imageUrl = generateBlobUrl(response.data, file.mimeType);
							console.log("mimetype: " + file.mimeType);
						}).catch(function(errorResponse) {
							logError("could not fetch preview image (oauth) " + errorResponse.message);
						}).then(function() {
							callback();
						});
						return true;
					}
				});

				if (foundPossibleImage) {
					skipLastCallback = true;
				}
			}
			
			if (!skipLastCallback) {
				callback();
			}
			return;
		}
	}
	callback();
}

function showNotification(params, callback) {
	
	var notificationDisplay = Settings.read("notificationDisplay");
	
	if (!params) {
		params = {};
	}

	if (!callback) {
		callback = function () {};
	}

	if (Settings.read("desktopNotification") && !isDND()) {

		var firstEmail;
		if (params.emails) {
			firstEmail = params.emails.first();
		}
		if (!firstEmail) {
			logError("called showNotif but could not find any emails?");
			callback();
			return;
		}
		
		// not notification handle
		if (notification) {
			chrome.runtime.sendMessage({name:"addNewNotifications"}, function(response) {});
			callback();
		} else {
			var NOTIFICATION_DISABLE_WARNING = "Normally a notification for this email or some of these emails will not appear because you unchecked the notification in your Accounts/Labels settings for this particular email/label";
			
			var notificationFlagForLabelsOfNewestEmail;
			if (firstEmail) {
				notificationFlagForLabelsOfNewestEmail = getSettingValueForLabels(firstEmail.account.getSetting("notifications"), firstEmail.labels, Settings.read("desktopNotification"));
			}			

			var textNotification = params.testType == "text" || (params.testType == undefined && Settings.read("notificationWindowType") == "text");
			var richNotification = params.testType == "rich" || (params.testType == undefined && Settings.read("notificationWindowType") == "rich");

			if (textNotification || !chrome.notifications) {
				// text window
				if (notificationFlagForLabelsOfNewestEmail || params.testType) {					
					var fromName = generateNotificationDisplayName(firstEmail);
					
					var $div = $("<div/>");
					
					$div.html(firstEmail.title);
					var subject = $div.text();
					
					$div.html(firstEmail.getLastMessageText());
					var body = $div.text().summarize(101);
	
					if (window.webkitNotifications || window.Notification) {
						
						var title = "";
						
						if (accounts.length >= 2) {
							title = firstEmail.account.getEmailDisplayName() + "\n";
						}
						
						if (notificationDisplay == "newEmail") {
							title += getMessage("newEmail");
							body = "";
						} else if (notificationDisplay == "from") {
							title += fromName;
							body = "";
						} else if (notificationDisplay == "from|subject") {
							title += fromName
							body = subject;
						} else {
							title += formatEmailNotificationTitle(fromName, subject);
						}
						
						if (window.webkitNotifications) {
							notification = webkitNotifications.createNotification("/images/icons/icon_48.png", title, body);
						} else {
							notification = new Notification(title, {body:body, icon:"/images/icons/icon_48.png"});
						}
						notification.mail = firstEmail;
						notification.onclick = function() {
							firstEmail.open();
							if (notification) {
								if (window.webkitNotifications) {
									notification.cancel();
								} else {
									notification.close();
								}
							}
						}
						notification.onerror = function(e) {
							logError("showNotification error: " + e);
						}
						
						var notificationCloseTimeout = Settings.read("dn_timeout");
						if (notificationCloseTimeout != 0) {
							setTimeout(function () {
								if (notification) {
									if (window.webkitNotifications) {
										notification.cancel();
									} else {
										notification.close();
									}
								}
							}, notificationCloseTimeout);
						}
					} else {
						console.warn("webkitNotifications or Notifications does not exist");
						callback();
						return;
					}
				} else {
					console.warn("Notification disabled for this email");
					callback();
					return;
				}
			} else if (richNotification) {
				// rich notif
				
				console.log("rich params: ", params);

				var iconUrl = Icons.NOTIFICATION_ICON_URL;
				
				var buttons = [];
				var buttonsWithValues = []; // used to associate button values inside notification object
				var buttonValue;
				
				buttonValue = Settings.read("notificationButton1");
				generateNotificationButton(buttons, buttonsWithValues, buttonValue, params.emails);
				
				var buttonValue;
				if (shouldShowReducedDonationMsg()) {
					buttonValue = "reducedDonationAd";
				} else {
					buttonValue = Settings.read("notificationButton2");
				}				
				generateNotificationButton(buttons, buttonsWithValues, buttonValue, params.emails);
				
				var options;

				if (params.emails.length == 1) {
					// single email
					
					if (notificationFlagForLabelsOfNewestEmail || params.testType) {
						var fromName = generateNotificationDisplayName(firstEmail);
	
						var $div = $("<div/>");
						
						var subject = "";
						if (firstEmail.title) {
							subject = firstEmail.title.htmlToText();
						}
	
						var title = "";
						var message = firstEmail.getLastMessageText({maxSummaryLetters:170, htmlToText:true, EOM_Message:" [" + getMessage("EOM") + "]"});
						if (!message) {
							message = "";
						}
						
						if (accounts.length >= 2) {
							title = firstEmail.account.getEmailDisplayName() + "\n";
						}
						
						if (notificationDisplay == "newEmail") {
							title += getMessage("newEmail");
							message = "";
						} else if (notificationDisplay == "from") {
							title += fromName;
							message = "";
						} else if (notificationDisplay == "from|subject") {
							title += fromName
							message = subject;
						} else {
							title += formatEmailNotificationTitle(fromName, subject);
						}
						
						options = {
								type: "basic",
								title: title, //"Jason - Soccer tonight", 
								message: message, //"Meet me at the field before the game because we are playing against a very good team.",
								buttons: buttons,
								iconUrl: iconUrl
						}
						
						fetchEmailImagePreview(options, firstEmail, function(fetchEmailImagePreviewResult) {
							preloadProfilePhotos(params.emails, function () {
								var email = params.emails.first();
								if (email.contactPhoto && email.contactPhoto.src) {									
									console.log("iconUrl: " + email.contactPhoto.src);
									options.iconUrl = email.contactPhoto.src;
								} else {
									if (fetchEmailImagePreviewResult && fetchEmailImagePreviewResult.detectedIconUrl) {
										console.log("iconUrl2: " + email.contactPhoto.src);
										options.iconUrl = fetchEmailImagePreviewResult.detectedIconUrl;
									}
								}
								openNotification(options, buttonsWithValues, params.emails, function(notificationResponse) {
									if (!notificationFlagForLabelsOfNewestEmail) {
										notificationResponse.warning = NOTIFICATION_DISABLE_WARNING;
									}
									callback(notificationResponse);
								});
							});
						});
					} else {
						console.warn("Notification disabled for this email");
						callback();
						return;
					}
				} else {
					// multiple emails

					//if (true) { // list notification
						var items = [];
						
						$.each(params.emails, function(index, email) {
							
							console.log("item.push:", email);
							
							var subject = email.title;
							if (subject) {
								subject = subject.htmlToText();
							}
							if (!subject) {
								subject = "";
							}
							
							var item = {};
							
							if (notificationDisplay == "from") {
								item.title = generateNotificationDisplayName(email);
								item.message = "";
							} else if (notificationDisplay == "from|subject") {
								item.title = generateNotificationDisplayName(email);
								item.message = subject;
							} else {
								item.title = formatEmailNotificationTitle(generateNotificationDisplayName(email), subject);
								var message = email.getLastMessageText();
								if (message) {
									message = message.htmlToText();
								}
								if (!message) {
									message = "";
								}
								item.message = message;
							}
							
							items.push(item);
						});

						options = {
							message: "",
							buttons: buttons,
							iconUrl: iconUrl
						}

						if (notificationDisplay == "newEmail") {
							options.type = "basic";
						} else {
							options.type = "list";
							options.items = items;
						}

						var newEmailsCount;
						// because i use a max fetch the total unread email count might not be accurate - so if user is just signing in or startup then fetch the totalunread instead of the emails.length  
						if (Settings.read("accountAddingMethod") == "oauth" && (params.source == Source.SIGN_IN || params.source == Source.STARTUP)) {
							newEmailsCount = params.totalUnread;
						} else {
							newEmailsCount = params.emails.length;
						}
						options.title = getMessage("XNewEmails", [newEmailsCount]);

						openNotification(options, buttonsWithValues, params.emails, callback);

					/*	
					} else { // image notification
						var tempCanvas = document.getElementById("tempCanvas");
						var notificationCanvas = document.getElementById("notificationCanvas");
						var context = notificationCanvas.getContext("2d");
						
						var MAX_NOTIFICATION_WIDTH = 360;
						var MAX_NOTIFICATION_HEIGHT = 160;
						var EVENT_X_LEFT_BUFFER = 6;
						var EVENT_X_LEFT_BUFFER_WITH_DASHES = 8;
						var EVENT_X_RIGHT_BUFFER = 8;
						var EVENT_Y_SPACING = 2;
						var SMALL_FONT_X_BUFFER = 7;
						var BOTTOM_BUFFER = 2;
						var TITLE_FONT = "14px Georgia";
						var BODY_FONT = "12px Arial";
						var MAX_EMAILS = 5;
						
						var MAX_TITLE_WIDTH_PERCENT = 0.88; // with no time elapsed
						var MAX_TITLE_WITH_TIME_ELAPSED_WIDTH_PERCENT = 0.75; // with time elapsed
						
						var x;
						var y = -4;
						
						// note: changing width/height after will blank out the canvas
						notificationCanvas.width = tempCanvas.width = MAX_NOTIFICATION_WIDTH;
						notificationCanvas.height = tempCanvas.height = 2000;
						
						// filter out any emails that don't have a notification flag
						var someEmailsDidNotPassTheNotificationFlag;						
						for (var a=0; a<params.emails.length; a++) {
							var notificationFlagEnabled = getSettingValueForLabels(params.emails[a].account.getSetting("notifications"), params.emails[a].labels, Settings.read("desktopNotification"));
							if (!notificationFlagEnabled) {
								if (!params.testType) {
									console.warn("Disable notification for this email: " + params.emails[a].title);
									params.emails.splice(a, 1);
									a--;
								}
								someEmailsDidNotPassTheNotificationFlag = true;
							}
						}

						if (params.emails.length) {
							preloadProfilePhotos(params.emails, function () {
								console.log("after preload: ", params.emails);

								$.each(params.emails, function(index, email) {
	
									x = EVENT_X_LEFT_BUFFER;
	
									if (index >= MAX_EMAILS) {
										context.fillStyle = "black";
										context.fillText(params.emails.length - index + " " + getMessage("more") + " ...", x+38, y+2);
										y += 25;
										return false;
									}
									
									console.log("item.push:", email);
									
									if (Settings.read("showContactPhoto")) {
										var contactPhoto = new Image();
										
										if (email.contactPhoto) {
											notificationCanvas.getContext('2d').drawImage(email.contactPhoto, x, y, 32, 32);
										} else {
											notificationCanvas.getContext('2d').drawImage($("#noPhoto").get(0), x, y+4, 32, 32);
										}
										x += 41;
									} else {
										x += 10;
									}
									
									// calculate how much text we can fit on the line
	
									var message = email.title;
									if (message) {
										message = message.htmlToText();
									}
									
									// if subject is empty use email body
									if (!message) {
										message = email.getLastMessageText();
										if (message) {
											message = message.htmlToText();
										}
									}
									
									context.textBaseline = "top";
									context.font = TITLE_FONT;
									context.fillStyle = "black";

									var notificationEmailLine;
									
									var body = email.getLastMessageText();
									if (body) {
										body = body.htmlToText();
									}
									if (body) {
										body = body.summarize(55);
									} else {
										body = "";
									}
									
									if (notificationDisplay == "from") {
										notificationEmailLine = generateNotificationDisplayName(email);
										body = "";
									} else if (notificationDisplay == "from|subject") {
										notificationEmailLine = generateNotificationDisplayName(email)
										body = message;
									} else {
										notificationEmailLine = formatEmailNotificationTitle(generateNotificationDisplayName(email), message);
									}

									var maxLetters = notificationEmailLine.length * (MAX_NOTIFICATION_WIDTH / (context.measureText(notificationEmailLine).width + x));
									if (x + context.measureText(notificationEmailLine).width >= MAX_NOTIFICATION_WIDTH * MAX_TITLE_WIDTH_PERCENT) {
										notificationEmailLine = notificationEmailLine.substring(0, maxLetters * MAX_TITLE_WIDTH_PERCENT) + "…";
									}
									
									context.fillText(notificationEmailLine, x, y+1);
	
									context.font = BODY_FONT;
									context.fillStyle = "gray";
									context.fillText(body, x, y+18);
	
									x += context.measureText(notificationEmailLine).width + EVENT_X_RIGHT_BUFFER;
	
									y += getTextHeight(TITLE_FONT).height;
								});
								
								// save canvas to temp (because changing width/height after will blank out the canvas)
								tempCanvas.getContext('2d').drawImage(notificationCanvas, 0, 0);
								
								// resize new canvas
								notificationCanvas.height = y + BOTTOM_BUFFER;
								
								// copy temp canvas to new canvas
								notificationCanvas.getContext('2d').drawImage(tempCanvas, 0, 0, tempCanvas.width, notificationCanvas.height, 0, 0, notificationCanvas.width, notificationCanvas.height);
								var imageUrl = notificationCanvas.toDataURL("image/png");
								
								if (notificationDisplay == "newEmail") {
									options = {
											type: "basic",
											title: getMessage("XNewEmails", [params.emails.length]),
											message: "",
											buttons: buttons,
											iconUrl: iconUrl
									}									
								} else {
									options = {
											type: "image",
											title: getMessage("XNewEmails", [params.emails.length]),
											message: "",
											buttons: buttons,
											iconUrl: iconUrl,
											imageUrl: imageUrl
									}
								}
								
								openNotification(options, buttonsWithValues, params.emails, function(notificationResponse) {
									if (someEmailsDidNotPassTheNotificationFlag && params.testType) {
										notificationResponse.warning = NOTIFICATION_DISABLE_WARNING;
									}
									callback(notificationResponse);						
								});
								
							});
						} else {
							if (someEmailsDidNotPassTheNotificationFlag) {
								console.warn("Notification disabled for these email");
							}								
							callback();
							return;
						}
					}
					*/

				}
			} else {
				logError("html notif does not exit anymore");
				callback();
				return;
			}				
			
			if (notification) {
				notification.onclose = function() {
					console.log("onclose notification");
					notification = null;
				}
				if (window.webkitNotifications) {
					notification.show();
				}
				callback();
			}
		}
	} else {
		callback();
	}
}

function openNotification(options, buttonsWithValues, newEmails, callback) {
	callback = initUndefinedCallback(callback);
	
	// remove previous notifications
	clearRichNotification(richNotifId);
	
	// let's identify my notification with the mini icon IF we aren't already showing the extension logo in the notification iconurl
	if (DetectClient.isWindows() && options.iconUrl != Icons.NOTIFICATION_ICON_URL) {
		options.appIconMaskUrl = Icons.APP_ICON_MASK_URL;
	}
	
	// default is 0 if none below are matched...
	if (Settings.read("showNotificationDuration") == 7) {
		options.priority = 0;
	} else if (Settings.read("showNotificationDuration") > 7) {
		options.priority = 1;
	}
	
	if (Settings.read("notificationBehaviour") == "removeFromTray") {
		var notificationCloseTimeout = Settings.read("showNotificationDuration") * 1000;
		if (notificationCloseTimeout != 0) {
			setTimeout(function () {
				if (richNotifId) {
					console.log("timeout close notif");
					clearRichNotification(richNotifId);
				}
			}, notificationCloseTimeout);
		}
	}

	console.log("show notif", options);
	chrome.notifications.create("", options, function(notificationId) {
		if (chrome.extension.lastError) {
			callback({error:chrome.extension.lastError.message});
			//logError("create error: " + chrome.extension.lastError.message);
			sendGA("JS Errors", "create error: " + chrome.extension.lastError.message, options.iconUrl + " " + options.imageUrl);
		} else {
			richNotifId = notificationId;
			richNotifMails = newEmails;
			richNotifButtonsWithValues = buttonsWithValues;
			callback({notificationId:notificationId});
		}
	});
}

function getChromeWindowOrBackgroundMode(callback) {
	if (Settings.read("runInBackground")) {
		callback(true);
	} else {
		chrome.windows.getAll(null, function(windows) {
			if (windows && windows.length) {
				callback(true);
			} else {
				callback(false);
			}
		});
	}
}

function checkEmails(source, callback) {
	if (!callback) {
		callback = function() {};
	}
	
	getChromeWindowOrBackgroundMode(function(chromeWindowOrBackgroundMode) {
		if (chromeWindowOrBackgroundMode) {
			var intervalStopped = false;
			if (source == "wentOnline" || source == "wakeupFromSleep") {
				if (checkingEmails) {
					console.log("currently checking emails so bypass instant check");
					callback();
					return;
				} else {
					intervalStopped = true;
					console.log("check now for emails");
					// stop checking interval
					clearInterval(checkEmailTimer);
				}
			}
			
			checkingEmails = true;
			getAllEmails(accounts, function(allEmailsCallbackParams) {
				mailUpdate({showNotification:true, allEmailsCallbackParams:allEmailsCallbackParams});
				
				if (accounts.length) {
					previousAccounts = accounts;
				}

				checkingEmails = false;

				if (intervalStopped) {
					// resume checking interval
					restartCheckEmailTimer();
				}
				
				callback();
			});			
		} else {
			console.log("NO chromeWindowOrBackgroundMode - so do not check emails");
			callback();
		}
	});
}

function startCheckEmailTimer() {
	var pollIntervalTime = Settings.read("poll");
	
	// make sure it's not a string or empty because it will equate to 0 and thus run all the time!!!
	// make sure it's not too small like 0 or smaller than 15 seconds
	if (isNaN(pollIntervalTime) || parseInt(pollIntervalTime) < (15 * ONE_SECOND)) {
		pollIntervalTime = seconds(30);
	}
	
	checkEmailTimer = setInterval(function() {
		checkEmails("interval");
	}, pollIntervalTime);
}

function restartCheckEmailTimer() {
	console.log("restarting check email timer")
	clearInterval(checkEmailTimer);
	
	// wait a little bit before restarting timer to let it's last execution run fully
	setTimeout(function() {
		startCheckEmailTimer();
	}, 30 * ONE_SECOND)
}

function shortcutNotApplicableAtThisTime(title) {
	var notif;
	var body = "Click here to remove this shortcut.";
	if (window.webkitNotifications) {
		notif = webkitNotifications.createNotification("/images/icons/icon_48.png", title, body);
	} else {
		notif = new Notification(title, {body:body, icon:"/images/icons/icon_48.png"});
	}
	notif.onclick = function() {
		chrome.tabs.create({ url: "http://jasonsavard.com/wiki/Checker_Plus_for_Gmail#Keyboard_shortcuts" });
		if (window.webkitNotifications) {
			this.cancel();
		} else {
			this.close();
		}
	}
	
	if (window.webkitNotifications) {
		notif.show();
	}
}

// execute action on all mails
function executeAction(mails, actionName) {

	var error;
	if (mails.length <= MAX_EMAILS_TO_ACTION) {
		$.each(mails, function(index, mail) {
			mail[actionName](function(cbParams) {
				if (cbParams && cbParams.error) {
					error = true;
					alert("Sorry, problem completing action (" + cbParams.error + ")");
					logError("error in execute Action: " + cbParams.error);
				}
			});
			
			// break out of loop
			if (error) {
				return false;
			}
		});

		if (Settings.read("accountAddingMethod") == "autoDetect") {
			if (actionName != "star") {
				if ((unreadCount-mails.length) >= 0) {
					updateBadge(unreadCount-mails.length);
				}
			}
		}
		
	} else {
		alert("Too many emails to " + actionName + " , please use the Gmail webpage!");
		mails.first().account.openInbox();
	}
}

function openInPopup(params) {
	var url = "popup.html?externalPopupWindow=true";
	
	params = initUndefinedObject(params);
	
	if (params.richNotifMails && params.richNotifMails.length == 1) {
		var mail = params.richNotifMails.first();
		url += "&previewMailId=" + mail.id;
	}

	params.width = 860;
	params.height = 564;
	var specs = getPopupWindowSpecs(params);
	if (!params.window) {
		params.window = window;
	}
	params.window.open(url, "openInPopup", specs);

	if (params.notificationId) {
		clearRichNotification(params.notificationId);
	}
}

function performButtonAction(params) {
	console.log("notificationButtonValue: " + params.notificationButtonValue);
	
	// actions...
	if (params.notificationButtonValue == "markAsRead") {
		executeAction(params.richNotifMails, "markAsRead");
		clearRichNotification(params.notificationId);
	} else if (params.notificationButtonValue == "delete") {
		executeAction(params.richNotifMails, "deleteEmail");
		clearRichNotification(params.notificationId);
	} else if (params.notificationButtonValue == "archive") {
		executeAction(params.richNotifMails, "archive");
		clearRichNotification(params.notificationId);
	} else if (params.notificationButtonValue == "spam") {
		executeAction(params.richNotifMails, "markAsSpam");
		clearRichNotification(params.notificationId);
	} else if (params.notificationButtonValue == "star") {
		executeAction(params.richNotifMails, "star");
		clearRichNotification(params.notificationId);
	} else if (params.notificationButtonValue == "starAndArchive") {
		executeAction(params.richNotifMails, "starAndArchive");
		clearRichNotification(params.notificationId);
	} else if (params.notificationButtonValue == "open" || params.notificationButtonValue == "openInNewTab") {
		
		var openParams = {};
		if (params.notificationButtonValue == "openInNewTab") {
			openParams.openInNewTab = true;
		}
		
		if (params.richNotifMails.length == 1) {
			params.richNotifMails.first().open(openParams);
		} else {
			params.richNotifMails.first().account.openInbox(openParams);
		}
		clearRichNotification(params.notificationId);
	} else if (params.notificationButtonValue == "openInPopup") {
		openInPopup(params);
	} else if (params.notificationButtonValue == "replyInPopup") {
		openInPopup(params);
	} else if (params.notificationButtonValue == "reply") {
		if (params.richNotifMails.length == 1) {
			params.richNotifMails.first().reply();
		} else {
			params.richNotifMails.first().account.openInbox();
		}
		clearRichNotification(params.notificationId);
	} else if (params.notificationButtonValue == "markDone") {
		executeAction(params.richNotifMails, "archive");
		clearRichNotification(params.notificationId);
	} else if (params.notificationButtonValue == "reducedDonationAd") {
		localStorage.reducedDonationAdClicked = true;
		createTab("donate.html?ref=reducedDonationFromNotif");
		clearRichNotification(params.notificationId);
	} else {
		logError("action not found for notificationButtonValue: " + params.notificationButtonValue);
	}
	
	sendGA("richNotification", params.notificationButtonValue);
}

function processOAuthUserResponse(tab, oAuthForMethod, callback) {
	if (tab.title.match(/success/i)) {
		var code = tab.title.match(/code=(.*)/i);
		if (code && code.length != 0) {
			code = code[1];
			chrome.tabs.remove(tab.id);
			
			oAuthForMethod.getAccessToken(code, function(accessTokenResponse) {
				if (accessTokenResponse.tokenResponse) {
					callback(accessTokenResponse);
				} else {
					if (!accessTokenResponse.error) {
						accessTokenResponse.error = "Could not get tokenResponse";
					}
					//if (accessTokenResponse.warning) {
						// ignore: might by re-trying to fetch the userEmail for the non default account									
					//} else {
						callback(accessTokenResponse);
					//}
				}
			});
		}
	} else {
		var error = "Error getting code: " + tab.title;
		logError(error);
		callback({error:error});
	}
}

function refreshWidgetData() {
	var widgetAccounts = [];
	$.each(accounts, function(index, account) {
		var widgetAccount = {}
		
		widgetAccount.id = account.id;
		widgetAccount.email = account.getAddress();
		widgetAccount.unreadCount = account.getUnreadCount();
		
		var emails = account.getMail()
		var widgetEmails = [];
		$.each(emails, function(emailIndex, email) {
			if (email.lastAction != "markAsRead") {
				var widgetEmail = {};
				widgetEmail.id = email.id;
				widgetEmail.title = email.title;
				widgetEmail.dateFormatted = email.issued.displayDate();
				widgetEmail.summary = email.summary;
				widgetEmail.name = email.getName();
				
				widgetEmails.push(widgetEmail);
			}
		});
		widgetAccount.emails = widgetEmails;
		
		widgetAccounts.push(widgetAccount);
	});
	localStorage["widgetAccounts"] = JSON.stringify(widgetAccounts);
}

function init() {

	try {
		if (!localStorage.detectedChromeVersion) {
			localStorage.detectedChromeVersion = true;
			DetectClient.getChromeChannel(function(result) {
				console.log("browser detection", result);
				if (result && result.channel != "stable") {
					var notification;
					var title = "You are not using the stable channel of Chrome";
					var body = "Click for more info. Bugs might occur, you can use this extension, however, for obvious reasons, these bugs and reviews will be ignored unless you can replicate them on stable channel of Chrome.";
					if (window.webkitNotifications) {
						notification = webkitNotifications.createNotification("/images/icons/icon_48.png", title, body);
					} else {
						notification = new Notification(title, {body:body, icon:"/images/icons/icon_48.png"});
					}
					notification.onclick = function () {
						chrome.tabs.create({ url: "http://jasonsavard.com/wiki/Unstable_channel_of_Chrome" });
						this.close();
					};
					if (window.webkitNotifications) {
						notification.show();
					}
				}
			});
		}
	} catch (e) {
		logError("error detecting chrome version: " + e);
	}
	
	if (!chrome.runtime.onMessage || !window.Promise) {
		chrome.tabs.create({url:"http://jasonsavard.com/wiki/Old_Chrome_version"});
	}

	chrome.browserAction.setBadgeBackgroundColor({color:[255, 255, 255, 1]});
	chrome.browserAction.setBadgeText({ text: "..." });
	chrome.browserAction.setTitle({ title: getMessage("loadingSettings") + "..." });
	buttonIcon = new ButtonIcon();

	var syncExcludeList = ["lastOptionStatsSent", "tabletViewUrl", "autoSave", "lastCheckedEmail", "customSounds", "widgetAccounts", "paypalInlineResponse", "contactsData", "signedInGmailEmails"];
	syncOptions.init(syncExcludeList);
	
	Settings.load(loadingSettingsDeferred, function(settingsResponse) {

		if (!Settings.read("installDate")) {
			// patch for chrashing Chrome dev: if you add a Date object to the indexeddb it crashes
			Settings.store("installDate", new Date().toString());
		}

		var lang = pref("language", window.navigator.language);
		loadLocaleMessages(lang, function() {
			
			initCommon();

			// START LEGACY
			
			// Jan 8th, 2015
			if (localStorage.muteVoiceEndTime) {
				Settings.store( "DND_endTime", new Date(localStorage.muteVoiceEndTime) );
				localStorage.removeItem("muteVoiceEndTime");
			}
			
			if (Settings.read("muteVoice")) {
				Settings.store("DND_schedule", true);
				Settings.store("DND_scheduleStartHour", Settings.read("muteVoiceStart"));
				Settings.store("DND_scheduleEndHour", Settings.read("muteVoiceEnd"));
				Settings.delete("muteVoice");
				Settings.delete("muteVoiceStart");
				Settings.delete("muteVoiceEnd");
			}
			
			// March 28th, 2014
			if (localStorage.disabledExtensionUpdateNotifications) {
				Settings.store("extensionUpdates", "none");
				localStorage.removeItem("disabledExtensionUpdateNotifications");
			}
			
			// Apri 5th, 2014
			if (Settings.read("preview_setting") == "0") {
				Settings.store("browserButtonAction", BROWSER_BUTTON_ACTION_GMAIL_TAB);
				Settings.delete("preview_setting");
			} else if (Settings.read("preview_setting") == "1") {
				Settings.store("browserButtonAction", BROWSER_BUTTON_ACTION_CHECKER_PLUS);
				Settings.store("checkerPlusBrowserButtonActionIfNoEmail", BROWSER_BUTTON_ACTION_GMAIL_TAB);
				Settings.delete("preview_setting");
			} else if (Settings.read("preview_setting") == "2") {
				Settings.store("browserButtonAction", BROWSER_BUTTON_ACTION_CHECKER_PLUS);
				Settings.delete("preview_setting");
			} else if (Settings.read("preview_setting") == "3") {
				Settings.store("browserButtonAction", BROWSER_BUTTON_ACTION_COMPOSE);
				Settings.delete("preview_setting");
			}
			
			// rename atom labels to ie. "", ^all, ^imp etc to hardcoded variables like system_inbox etc.
			var emailSettings = Settings.read("emailSettings");
			if (emailSettings && emailSettings.version != "2") {
				console.log("refactor emailsettings to version 2");
				
				function fixAssociatedArray(associatedArray) {
					if (associatedArray) {
						for (key in associatedArray) {
							var newKey = null;
							if (key == ATOM_FEED_INBOX) {
								newKey = SYSTEM_INBOX;
							} else if (key == ATOM_FEED_IMPORTANT) {
								newKey = SYSTEM_IMPORTANT;
							} else if (key == ATOM_FEED_IMPORTANT_IN_INBOX) {
								newKey = SYSTEM_IMPORTANT_IN_INBOX;
							} else if (key == ATOM_FEED_UNREAD) {
								newKey = SYSTEM_ALL_MAIL;
							}

							if (newKey) {
								associatedArray[newKey] = associatedArray[key];
								delete associatedArray[key];
							}
						}
					}
				}
				
				for (esEmail in emailSettings) {
					var es = emailSettings[esEmail];
					
					if (es.openLabel == "search/l:unread") {
						es.openLabel = SYSTEM_UNREAD;
					} else if (es.openLabel == "all") {
						es.openLabel = SYSTEM_ALL_MAIL;
					} else {
						es.openLabel = SYSTEM_INBOX;
					}
					
					// fix array
					if (es.monitorLabel) {
						
						// legacy code
						if (!$.isArray(es.monitorLabel)) {
							es.monitorLabel = new Array(es.monitorLabel);
					   	}

						for (var a=0; a<es.monitorLabel.length; a++) {
							if (es.monitorLabel[a] == ATOM_FEED_INBOX) {
								es.monitorLabel[a] = SYSTEM_INBOX;
							} else if (es.monitorLabel[a] == ATOM_FEED_IMPORTANT) {
								es.monitorLabel[a] = SYSTEM_IMPORTANT;
							} else if (es.monitorLabel[a] == ATOM_FEED_IMPORTANT_IN_INBOX) {
								es.monitorLabel[a] = SYSTEM_IMPORTANT_IN_INBOX;
							} else if (es.monitorLabel[a] == ATOM_FEED_UNREAD) {
								es.monitorLabel[a] = SYSTEM_ALL_MAIL;
							}
						}
					}
					
					fixAssociatedArray(es.notifications);
					fixAssociatedArray(es.sounds);
					fixAssociatedArray(es.voices);
					
				}
				
				emailSettings.version = "2";
				console.log("new settings", emailSettings);
				Settings.store("emailSettings", emailSettings);
			}
			
			// Oct 20 2014: Used to use pref="alias" in options.html but changed it to aliasNOT_USED (because it was causing same alias to be used on all detected accounts)
			if (Settings.read("alias")) {
				Settings.store("alias");
			}
			
			// END LAGACY

			// postmessage did not work - it was not queueing the event in the case of oninstalled and thus it was never received in the oninstall listener
			//window.postMessage("settingsAndLocalesLoaded", location.href);

			if (chrome.notifications) {
				
				// clicked anywhere
				chrome.notifications.onClicked.addListener(function(notificationId) {
					console.log("notif onclick", notificationId, richNotifMails);
					
					if (notificationId == "extensionUpdate") {
						createTab("http://jasonsavard.com/wiki/Checker_Plus_for_Gmail_changelog");
						chrome.notifications.clear(notificationId, function() {});
						sendGA("extensionUpdateNotification", "clicked notification");
					} else {
						ChromeTTS.stop();
						
						var notificationButtonValue = Settings.read("notificationClickAnywhere");
						performButtonAction({notificationButtonValue:notificationButtonValue, notificationId:notificationId, richNotifMails:richNotifMails});
					}
				});

				// buttons clicked
				chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex) {
					if (notificationId == "extensionUpdate") {
						if (buttonIndex == 0) {
							createTab("http://jasonsavard.com/wiki/Checker_Plus_for_Gmail_changelog");
							chrome.notifications.clear(notificationId, function() {});
							sendGA("extensionUpdateNotification", "clicked button - see updates");
						} else if (buttonIndex == 1) {
							Settings.store("extensionUpdates", "none");
							chrome.notifications.clear(notificationId, function(wasCleared) {
								if (lastExtensionUpdateNotificationShownDate.diffInSeconds() < -7) { // 25 seconds is approx. the time it takes for the notification to hide, after that let's use the window technique
									// open a window to take focus away from notification and there it will close automatically
									var win = window.open("about:blank", "emptyWindow", "width=1, height=1, top=-500, left=-500");
									win.close();
								}				
							});
							sendGA("extensionUpdateNotification", "clicked button - do not show future notifications");
						}
					} else {
						ChromeTTS.stop();
						var notificationButtonValue = richNotifButtonsWithValues[buttonIndex].value;
						performButtonAction({notificationButtonValue:notificationButtonValue, notificationId:notificationId, richNotifMails:richNotifMails});
					}
				});
				
				// closed notif
				chrome.notifications.onClosed.addListener(function(notificationId, byUser) {
					console.log("notif onclose", notificationId, byUser);
					
					if (notificationId == "extensionUpdate") {
						if (byUser) {
							sendGA("extensionUpdateNotification", "closed notification");
						}
					} else {
						richNotifId = null;
						
						// byUser happens ONLY when X is clicked ... NOT by closing browser, NOT by clicking action buttons, NOT by calling .clear
						if (byUser) {
							ChromeTTS.stop();
							//lastNotificationAction = "dismiss";
						}
					}
				});
			}
				
			// save default language to localstorage
			var voiceInputDialectPref = localStorage.voiceInputDialect;
			if (!voiceInputDialectPref) {
				localStorage.voiceInputDialect = navigator.language;
			}
			
			var tokenResponsesEmails = localStorage["tokenResponsesEmails"];
			if (tokenResponsesEmails) {
				tokenResponsesEmails = JSON.parse(tokenResponsesEmails, dateReviver);
			}
			oAuthForEmails = new OAuthForDevices({
				tokenResponses:tokenResponsesEmails,
				scope:"https://www.googleapis.com/auth/gmail.modify", // space separated
				state:"GmailCheckerEmails"
			});
			oAuthForEmails.setOnTokenChange(function(params, allTokens) {
				console.log("bg setOnTokenChange", params, allTokens)
				// commented because when removing accounts we were not saving to localStorage (even though it was no accounts we should still save the no accounts)
				//if (params && params.tokenResponse) {
					localStorage["tokenResponsesEmails"] = JSON.stringify(allTokens);
				//}
			});
			
			var tokenResponsesContacts = localStorage["tokenResponsesContacts"];
			if (tokenResponsesContacts) {
				tokenResponsesContacts = JSON.parse(tokenResponsesContacts, dateReviver);
			}
			// params.state // roundtrip param use to identify correct code response window (because both gmail and calendar other extensions might popup this window also
			oAuthForContacts = new OAuthForDevices({
				tokenResponses:tokenResponsesContacts,
				scope:"https://www.google.com/m8/feeds",
				state:"GmailCheckerContacts",
				getUserEmail: function(tokenResponse, sendOAuthRequest, callback) {
					// were using the contacts url because it's the only one we request permission to and it will give us the email id (so only fetch 1 result)
					// send token response since we don't have the userEmail
					sendOAuthRequest({tokenResponse:tokenResponse, url: "https://www.google.com/m8/feeds/contacts/default/thin", data:{alt:"json", "max-results":"1"}}, function(response) {
						if (response.error) {
							logError("failed: you might by re-trying to fetch the userEmail for the non default account")
							response.warning = "failed: you might by re-trying to fetch the userEmail for the non default account";
							callback(response);
						} else {
							var data = JSON.parse(response.jqXHR.responseText);
							response.userEmail = data.feed.id.$t;
							callback(response);
						}
					});
				}
			});
			oAuthForContacts.setOnTokenChange(function(params, allTokens) {
				if (params && params.tokenResponse) {
					localStorage["tokenResponsesContacts"] = JSON.stringify(allTokens);
				}
			});
			
			chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
				if (message.command == "getMailUrl" && accounts != null && accounts.length > 0) {
					sendResponse({ mailUrl: accounts[0].getMailUrl(), openComposeReplyAction: Settings.read("openComposeReplyAction"), popupWindowSpecs:getPopupWindowSpecs() });
				} else if (message.command == "indexedDBSettingSaved") {
					syncOptions.storageChanged({key:message.key});
				} else if (message.command == "openTab") {
					chrome.tabs.create({url:message.url});
				} else if (message.command == "getVoiceInputSettings") {
					sendResponse({voiceInputDialect:Settings.read("voiceInputDialect")});
				} else if (message.command == "findOrOpenGmailTab") {
					
					// must use this getaccountsbyemail because can't use message.account (because of onMessage transfer in json so function are lost from account object
					var account = getAccountByEmail(message.account.email);
					
					if (message.email) { // opening an email
						var foundEmail = false;
						var emails = account.getMail();						
						$.each(emails, function(emailIndex, email) {
							if (email.id == message.email.id) {
								foundEmail = true;
								var params = {};
								// used only if no matching tab found
								params.noMatchingTabFunction = function(url) {
									sendResponse({noMatchingTab:true, url:url})
								};
								email.open(params);
								return false;
							}
						});
						if (!foundEmail) {
							// then try opening inbox
							var params = {};
							// used only if no matching tab found
							params.noMatchingTabFunction = function(url) {
								sendResponse({noMatchingTab:true, url:url})
							};
							account.openInbox(params);
						}
					} else { // opening an inbox
						var params = {};
						// used only if no matching tab found
						params.noMatchingTabFunction = function(url) {
							sendResponse({noMatchingTab:true, url:url})
						};
						account.openInbox(params);
					}
					return true;
				} else if (message.command == "chromeTTS") {
					if (message.stop) {
						ChromeTTS.stop();
					} else {
						ChromeTTS.queue(message.text);
					}
				}
			});
			
			if (chrome.contextMenus) {
				var doNotDisturbMenuId = chrome.contextMenus.create({title: getMessage("doNotDisturb"), contexts: ["browser_action"]});
				chrome.contextMenus.create({title: getMessage("turnOff"), contexts: ["browser_action"], parentId:doNotDisturbMenuId, onclick:function() {
					setDND_off();
				}});
				chrome.contextMenus.create({title: getMessage("Xminutes", 30), contexts: ["browser_action"], parentId:doNotDisturbMenuId, onclick:function() {
					setDND_minutes(30);
				}});
				chrome.contextMenus.create({title: getMessage("Xhour", 1), contexts: ["browser_action"], parentId:doNotDisturbMenuId, onclick:function() {
					setDND_minutes(60);
				}});
				chrome.contextMenus.create({title: getMessage("Xhour", 2), contexts: ["browser_action"], parentId:doNotDisturbMenuId, onclick:function() {
					setDND_minutes(120);
				}});
				chrome.contextMenus.create({title: getMessage("Xhours", 4), contexts: ["browser_action"], parentId:doNotDisturbMenuId, onclick:function() {
					setDND_minutes(240);
				}});
				chrome.contextMenus.create({title: getMessage("today"), contexts: ["browser_action"], parentId:doNotDisturbMenuId, onclick:function() {
					setDND_today();
				}});
				chrome.contextMenus.create({title: getMessage("schedule") + "...", contexts: ["browser_action"], parentId:doNotDisturbMenuId, onclick:function() {
					openDNDScheduleOptions();
				}});
				chrome.contextMenus.create({title: getMessage("indefinitely"), contexts: ["browser_action"], parentId:doNotDisturbMenuId, onclick:function() {
					setDND_indefinitely();
				}});
			}
				    
			if (chrome.alarms) {
				chrome.alarms.onAlarm.addListener(function(alarm) {
					if (alarm.name == "extensionUpdatedSync") {
						syncOptions.save("extensionUpdatedSync");
					} else if (alarm.name == "updateContacts") {
						
						if (Settings.read("showContactPhoto")) {
							// update contacts
							var contactsData = Settings.read("contactsData");
							if (contactsData) {
								var fetchContactPromises = [];
								contactsData.forEach(function(contactData, index) {
									console.log("updating contacts for account: " + contactData.userEmail);
									fetchContactPromises.push( fetchContacts(contactData.userEmail) );
								});
								
								Promise.all(fetchContactPromises).then(function(responses) {
									var someContactsHaveBeenUpdated = false;
									
									responses.forEach(function(response, index) {
										contactsData[index] = response.contactDataItem;
										if (response.contactsHaveBeenUpdated) {
											someContactsHaveBeenUpdated = true;
										}
									});
									
									if (someContactsHaveBeenUpdated) {
										Settings.store("contactsData", contactsData);
									}
								}).catch(function(errorResponse) {
									console.error(errorResponse);
								});
							}
						}
						
					}
				});
			}
			
			chrome.idle.onStateChanged.addListener(function(newState) {
				// returned from idle state
				console.log("onstatechange: " + newState + " " + now().toString());
				if (newState == "active") {
					console.log("unreadacount: " + unreadCount + " while active it was: " + unreadCountWhenShowNotificationWhileActive);
					if (unreadCount != 0 && unreadCount > unreadCountWhenShowNotificationWhileActive) {
						
						if (Settings.read("doNotShowNotificationIfGmailTabActive")) {
							chrome.windows.getLastFocused(function(window) {
								// check for this because a user was getting this... Error during windows.getLastFocused: No last-focused window sendRequest:21 AND Uncaught TypeError: Cannot read property 'focused' of undefined 
								if (chrome.extension.lastError) {
									showNotification(lastShowNotifParams);
								} else {
									if (window.focused) {
										console.log("window is focused");
										// url: must be URL pattern like in manifest ex. http://abc.com/* (star is almost mandatory)
										// if gmail NOT already focused then show notification
										if (accountWithNewestMail) {
											chrome.tabs.query({windowId:window.id, 'active': true, url:accountWithNewestMail.getMailUrl() + "*"}, function(tabs) {
												console.log("active tab is the gmail account?: " + tabs);
												if (!tabs) {
													showNotification(lastShowNotifParams);
												}
											});
										} else {
											showNotification(lastShowNotifParams);
										}
									} else {
										showNotification(lastShowNotifParams);
									}
								}
							});
						} else {
							showNotification(lastShowNotifParams);
						}
					}
				}
			});
			
			// for adding mailto links (note: onUpdated loads twice once with status "loading" and then "complete"
			chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
				if (changeInfo.status == "loading") {
					
					var alreadyDetectedInbox = false;
					if (accounts) {
					    $.each(accounts, function (i, account) {
							if (tab.url.indexOf(account.getMailUrl()) == 0) {
								console.log("Gmail webpage changed: " + tab.url);
								alreadyDetectedInbox = true;
								
								// only fetch emails if user is viewing an email ie. by detecting the email message id ... https://mail.google.com/mail/u/0/?shva=1#inbox/13f577bf07878472
								if (tab.url.match(/\#.*\/[a-z0-9]{16}/)) {
									account.getEmails(function() {
										mailUpdate();
									});
								}
								
								return false;
							}
					    })
					}
					
					if (tab.url.indexOf(MAIL_DOMAIN + MAIL_PATH) == 0 || tab.url.indexOf(INBOX_BY_GMAIL_DOMAIN) == 0) {
						localStorage["lastCheckedEmail"] = now().toString();
					}
					
					if (tab.url.indexOf(MAIL_DOMAIN + MAIL_PATH) == 0 && !alreadyDetectedInbox) {
						console.log("newly signed in")
						pollAccounts({noEllipsis:true, forceResyncAccounts:true, source:Source.SIGN_IN});
					}
					
					/*
					 	old order when logging out of gmail...
					 	
					  	https://mail.google.com/mail/u/0/?logout&hl=en&loia
						https://accounts.google.com/Logout?service=mail&continue=http://www.google.com/mail/help/intl/en/logout.html%23hl%3Den&hl=en
						https://accounts.youtube.com/accounts/Logout2?hl=en&service=mail&ilo=1&ils=s.youtube&ilc=0&continue=http%3A%2F%2Fwww.google.com%2Fmail%2Fhelp%2Fintl%2Fen%2Flogout.html%23hl%3Den&zx=640039438
						https://accounts.youtube.com/accounts/ClearSID?zx=593429634
						http://www.google.com/mail/help/intl/en/logout.html#hl=en
					 */
					
					/* new order...
					 * 
					 * https://mail.google.com/mail/u/0/?logout&hl=en&hlor
					 * https://accounts.youtube.com/accounts/Logout2?hl=en&service=mail&ilo=1&ils=…s%3D1%26scc%3D1%26ltmpl%3Ddefault%26ltmplcache%3D2%26hl%3Den&zx=2053747305 
					 * http://www.google.ca/accounts/Logout2?hl=en&service=mail&ilo=1&ils=s.CA&ilc…%3D1%26scc%3D1%26ltmpl%3Ddefault%26ltmplcache%3D2%26hl%3Den&zx=-1690400221
					 * https://accounts.google.com/ServiceLogin?service=mail&passive=true&rm=false…=https://mail.google.com/mail/&ss=1&scc=1&ltmpl=default&ltmplcache=2&hl=en    
					 */
					if (tab.url.match(/.*google\..*\/accounts\/Logout*/i)) { //if (tab.url.indexOf("://www.google.com/accounts/Logout") != -1) {
						if (Settings.read("accountAddingMethod") == "autoDetect") {
							accounts = new Array();
							setSignedOut();
						} else if (Settings.read("accountAddingMethod") == "oauth") {
							// reset signed in emails
							//Settings.store("signedInGmailEmails");
							
							// reset account id
							accounts.forEach(function(account) {
								account.mustResync = true;
								account.resyncAttempts = 3;
							});
						}
					}

					//console.log("loading: " + tab.url);

					chrome.permissions.contains({origins: [getMessage("origins_mailtoLinks")]}, function(result) {
						// cannot call executeScript on extensions gallery pages: https://chrome.google.com/webstore
						
						// when "reloading" a page that was "already" an error page from being offline the title happens to contain blahblah is not available, so parse for and don't execute the script on it
						var available = true;
						if (tab.title && tab.title.indexOf("is not available") != -1) {
							available = false;
						}
						//console.log(tab.title + " tab: ", tab)
						if (result && available && tab.url.indexOf("http") == 0 && tab.url.indexOf("https://chrome.google.com/webstore") == -1 && tab.url.indexOf("chrome://chromewebdata/") == -1) { // make sure it's standard webpage and not extensions:// or ftp:// because errors are generated
							chrome.tabs.executeScript(tabId, {file:"js/mailto.js", allFrames:true});
						}
					});					
					
				} else if (changeInfo.status == "complete") {

					// find code window and make sure its from this extension by matching the state
					if (tab.url.indexOf("https://accounts.google.com/o/oauth2/approval") != -1) {
						
						if (tab.title.hasWord("state=" + oAuthForEmails.getStateParam())) {
							processOAuthUserResponse(tab, oAuthForEmails, function(oauthUserResponse) {
								console.log("after user response: ", oauthUserResponse);
								chrome.runtime.sendMessage({command: "grantPermissionToEmails", result:oauthUserResponse});
								if (oauthUserResponse.error) {
									alert(oauthUserResponse.error);
									logError(oauthUserResponse.error);
								}
							});
						} else if (tab.title.hasWord("state=" + oAuthForContacts.getStateParam())) {
							processOAuthUserResponse(tab, oAuthForContacts, function(params) {
								console.log("add contacts");
								if (params.error) {
									alert(params.error);
									logError(params.error);
								} else {
									fetchContacts(params.tokenResponse.userEmail).then(function(response) {
										var contactsData = Settings.read("contactsData");
										if (!contactsData) {
											contactsData = new Array();
										}
										
										var dataIndex = getContactsDataIndexByEmail(contactsData, response.contactDataItem.userEmail);
										if (dataIndex != -1) {
											console.log('found: updating existing contactsDataItem')
											contactsData[dataIndex] = response.contactDataItem;
										} else {
											console.log("creating new contactsDataItem");
											contactsData.push(response.contactDataItem);
										}
										
										console.log("contactdata: ", contactsData);
										Settings.store("contactsData", contactsData);
										chrome.runtime.sendMessage({command: "grantPermissionToContacts", contactDataItem:response.contactDataItem}); 
									}).catch(function(errorResponse) {
										alert(errorResponse);
										logError(errorResponse);
									});
								}
							});
						}
						
					}
					
				}				
			});
			
			/*
			// called for urls matching method=oauth to prevent the cookies from being sent to mail.google.com/mail/atom/...
			// ...because when doing an oauth send to mail.googl.com i could get the wrong email from mail.google.com/mail/atom/... even though i was request the authorization with a particular email
			// the interesting this is that i could fetch any email inbox simply by sending an oauth to mail.google/u/0.... ???
			chrome.webRequest.onBeforeSendHeaders.addListener(
				function (details) {
					console.log("onBeforeSendHeaders:", details);
					for (var i = 0; i < details.requestHeaders.length; ++i) {
						if (details.requestHeaders[i].name === 'Cookie') {
							details.requestHeaders.splice(i, 1);
						}
					}
					return {requestHeaders: details.requestHeaders};
				},
				// match all this...
				// feed/atom
				// feed/atom/
				// feed/atom/unread
				// feed/atom/unread?timestamp=123
				// feed/atom/unread?timestamp=123&method=oauth
				{urls: ["https://mail.google.com/mail/feed/atom*method=oauth*"]},
				["blocking", "requestHeaders"]
			);
			*/
			
			chrome.webRequest.onCompleted.addListener(
				function(details) {
					if (pref("voiceInput")) {
						console.log("oncomplete webrequest:", details);
						
						if (details.url && details.url.indexOf("https://mail.google.com/mail/mu/") != -1) {
							// don't load speech for these
						} else {
							// added timeout because in compose popup window it seems the inserts were not working
							setTimeout(function() {
								insertSpeechRecognition(details.tabId);
							}, 200)
						}
					}
				},
				{types:["main_frame"], urls: ["*://mail.google.com/*"]}
			);

			chrome.tabs.onActiveChanged.addListener(function(tabId, selectInfo) {
				chrome.tabs.get(tabId, function(tab) {
					if (chrome.runtime.lastError) {
						console.error(chrome.runtime.lastError.message);
					} else {
						if (tab) {
							if (tab.url.indexOf(MAIL_DOMAIN) != -1 || tab.url.indexOf(INBOX_BY_GMAIL_DOMAIN) != -1) {
								if (notification) {
									if (window.webkitNotifications) {
										notification.cancel();
									} else {
										notification.close();
									}
								}
							}
						}
					}
				});
			});
			
			if (chrome.storage) {
				chrome.storage.onChanged.addListener(function(changes, areaName) {
					console.log("storage changes " + new Date() + " : ", changes, areaName);
				});
			}
			
			if (chrome.commands) {
				chrome.commands.onCommand.addListener(function(command) {
					var errorFlag;
					var errorMsg;
					if (command == "markAsReadInNotificationWindow") {
						errorMsg = "Cannot mark email as read because there are no email notifications visible";
						if (Settings.read("notificationWindowType") != "rich") {
							if (notification) {
								if (notification.mail) {
									// for when only one email ie. text or notify.html
									notification.mail.markAsRead();
									if (window.webkitNotifications) {
										notification.cancel();
									} else {
										notification.close();
									}
									
									if (Settings.read("accountAddingMethod") == "autoDetect") {
										if (unreadCount >= 1) {
											updateBadge(unreadCount-1);
										}
									}
								}
							} else {
								errorFlag = true;
							}
						} else {
							// rich notif
							if (richNotifId) {
								performButtonAction({notificationButtonValue:"markAsRead", notificationId:richNotifId, richNotifMails:richNotifMails});
							} else {
								errorFlag = true;
							}
						}
					} else if (command == "openEmailDisplayedInNotificationWindow") {
						errorMsg = "Cannot open email because there are no email notifications visible";
						if (Settings.read("notificationWindowType") != "rich") {
							if (notification) {
								if (notification.mail) {
									// for when only one email ie. text or notify.html
									notification.mail.open();
									if (window.webkitNotifications) {
										notification.cancel();
									} else {
										notification.close();
									}
									
									if (Settings.read("accountAddingMethod") == "autoDetect") {
										if (unreadCount >= 1) {
											updateBadge(unreadCount-1);
										}
									}
								}
							} else {
								errorFlag = true;
							}
						} else {
							// rich notif
							if (richNotifId) {
								performButtonAction({notificationButtonValue:"open", notificationId:richNotifId, richNotifMails:richNotifMails});
							} else {
								errorFlag = true;
							}
						}
					}
					
					if (errorFlag) {
						shortcutNotApplicableAtThisTime(errorMsg);
					}
					
				});
			}

			// set widgtet defaults
			
			// set default widget background color
			if (!localStorage.widgetBackgroundColor) {
				localStorage.widgetBackgroundColor = "#1B84C6";
			}
			
			if (!localStorage.widgetShowEmailAddresses) {
				localStorage.widgetShowEmailAddresses = "true";
			}
			
			if (!localStorage.widgetShowEmailPreview) {
				localStorage.widgetShowEmailPreview = "true";
			}
			
			if (!localStorage.widgetShowEmailSummary) {
				localStorage.widgetShowEmailSummary = "true";
			}
			
			unreadCount = 0;
			buttonIcon.setIcon({signedOut:true}); // img_notLoggedInSrc
			initPopup(unreadCount);

			if (Settings.read("accountAddingMethod") == "oauth") {
				initOauthAccounts();
			}

			// call poll accounts initially then set it as interval below
			pollAccounts({showNotification:true, source:Source.STARTUP}, function() {
				// set check email interval here
				startCheckEmailTimer();
			});

			if (Settings.read("accountAddingMethod") == "autoDetect") {

				// check every 10 seconds or if not signed in to any accounts
				setInterval(function() {
					if (accounts.length == 0) {
						pollAccounts({showNotification:true});
					}
				}, seconds(10));

				// refresh AT every hour (for possible mark as read bug)
				setInterval(function() {
					$.each(accounts, function(i, account) {
						if (!account.error) {
							account.getNewAt();
						}
					});
				}, minutes(30));
				
				// patch: make sure there are no duplicate accounts that could create lockout issue
				setInterval(function() {
					var uniqueAccounts = [];
					
					var foundDuplicateAccount;
					// start from end so that we remove duplicates from the end, assuming the first ones in the array in their correct position
					for (var a=accounts.length-1; a>=0; a--) {
						for (var b=a-1; b>=0; b--) {
							if ($.trim(accounts[a].getAddress()) == $.trim(accounts[b].getAddress())) {
								console.warn("dupe detection interval: remove ", accounts[a].getAddress());
								foundDuplicateAccount = true;
								break;
                            }
						}
						if (foundDuplicateAccount) {
                            foundDuplicateAccount = false;
                        } else {
							uniqueAccounts.unshift(accounts[a]);                            
                        }
					}
					accounts = uniqueAccounts;
				}, seconds(75));
			}
			
			// if iselibigable for reduced donations than make sure user hasn't contributed before, if so do not display this eligable notice
			setInterval(function() {
				if (!pref("donationClicked") && !localStorage["verifyPaymentRequestSentForReducedDonation"] && accounts.length) {

					// check sometime within 7 days (important *** reduce the load on my host)
					if (passedRandomTime("randomTimeForVerifyPayment", 7)) {
						verifyPayment(accounts, function(response) {
							if (response && response.unlocked) {
								Controller.processFeatures();
							}
						});
						localStorage["verifyPaymentRequestSentForReducedDonation"] = true;
					}
				}
			}, minutes(5));
			
			// for detecting and update the DND status to the user
			setInterval(function() {
				updateBadge();
			}, minutes(1));

			$(window).on("offline online", function(e) {
				console.log("detected: " + e.type + " " + new Date());
				if (e.type == "online") {
					console.log("navigator: " + navigator.onLine + " " + new Date());
					setTimeout(function() {
						if (getAccountsSummary(accounts).signedIntoAccounts == 0) {
							console.log("navigator: " + navigator.onLine);
							checkEmails("wentOnline");
						}
					}, seconds(3))
				}
			});


			// collect stats on options
			if (daysElapsedSinceFirstInstalled() > 14 && (!localStorage.lastOptionStatsSent || new Date(localStorage.lastOptionStatsSent).daysInThePast() >= 7)) { // start after 2 weeks to give people time to decide and then "every" 7 days after that (to keep up with changes over time)
				console.log("collecting optstats soon...")
				setTimeout(function() { // only send after a timeout make sure ga stats loaded
					console.log("collecting optionstats")
					
					var optionStatCounter = 1;
					
					function sendOptionStat(settingName) {
						var settingValue = Settings.read(settingName);
						
						// Convert booleans to string because google analytics doesn't process them
						if (settingValue === true) {
							settingValue = "true";
						} else if (settingValue === false || settingValue == null) {
							settingValue = "false";
						}
						
						// issue: seems like the 1st 10 are being logged only in Google Analytics - migth be too many sent at same time
						// so let's space out the sending to every 2 seconds
						setTimeout(function() {
							sendGA("optionStats", settingName, settingValue);
						}, optionStatCounter++ * seconds(2));
					}
					
					if (accounts.length >= 1) {
						sendGA("optionStats", "totalAccounts", accounts.length + " accounts", accounts.length);
					}
					
					sendOptionStat("browserButtonAction");
					sendOptionStat("checkerPlusBrowserButtonActionIfNoEmail");
					sendOptionStat("gmailPopupBrowserButtonActionIfNoEmail");
					sendOptionStat("desktopNotification");
					sendOptionStat("soundNotification");
					sendOptionStat("voiceNotification");
					sendOptionStat("accountAddingMethod");
					sendOptionStat("donationClicked");
					sendOptionStat("sn_audio");
					sendOptionStat("voice");
					sendOptionStat("extensionUpdates");
					sendOptionStat("icon_set");
					sendOptionStat("showContactPhoto");
					sendOptionStat("showNotificationEmailImagePreview");
					sendOptionStat("showfull_read");
					
					localStorage.lastOptionStatsSent = new Date();
					
				}, minutes(2));
			}		

			loadedSettings = true;
		});
	});
	
	$(window).on("storage", function(e) {
		syncOptions.storageChanged({key:e.originalEvent.key});
	});
	
}

function initMailAccount(accountNumber, callback) {
	var MAX_ACCOUNTS = 50;
	
    buttonIcon.stopAnimation();
    
    /*
    if (Settings.read("accountAddingMethod") == "oauth" && accounts.length >= oAuthForEmails.getUserEmails().length) {
    	console.log("found all accounts - exit loop");
    	callback();
    	return;
    }
    */
    
    var tokenResponse = oAuthForEmails.findTokenResponseByIndex(accountNumber);
    var mailAddress;
    if (tokenResponse && tokenResponse.userEmail) {
    	mailAddress = tokenResponse.userEmail;
    }
    
    // when using auto-detect use the accountnumber and eventually the mailaddress will get populated with the fetch
    // when using oauth use the mailaddress passed in here to fetch the appropriate data
    var account = new MailAccount({ accountNumber: accountNumber, mailAddress:mailAddress});
    
    account.getEmails({restorePreviousMails:Settings.read("rememeberReadEmails") == "show", previousAccounts:previousAccounts}, function(cbParams) {
		console.info("Detected account: " + account.getAddress());

    	// maximum accounts, if over this we might be offline and just gettings errors for each account
    	if (accountNumber <= MAX_ACCOUNTS && isOnline()) {
    		// cbParams.ignored was the old way of putting ignore email in a free textarea, getSettings("ignore") is new way of checking it on/off in per email settings
    		if (cbParams.ignored || account.getSetting("ignore")) {
    			// do not add, ignore this one and try next
    			console.info("mailaccount - ignored");
    			ignoredAccounts.push(account);
    		} else if (cbParams.error && (cbParams.error.toLowerCase() == "unauthorized" || (cbParams.jqXHR && cbParams.jqXHR.status == 401))) { // not signed in
    			console.log("mailaccount - error/unauth");
    			unauthorizedAccounts++;
    			
    			// if offline then watch out because all accounts will return error, but not unauthorized, so must stop from looping too far
    			
				account = null;
    			delete account;
    			
    			// if too many unauthorized results than assume they are all signed out and exit loop, else continue looping
    			var maxUnauthorizedAccount = parseInt(pref("maxUnauthorizedAccount", 1, localStorage));
    			if (unauthorizedAccounts >= maxUnauthorizedAccount) {
    				callback();
    				return;
    			}
    		} else {
    			
    			// if duplicate email found then let's stop before it repeats
    			for (var a=0; a<accounts.length; a++) {
    				if (account.getAddress() == accounts[a].getAddress()) {
    					console.info("duplicate account " + account.getAddress() + " found so stop finding accounts, total: " + accounts.length);
    					account = null;
    					delete account;
    					callback();
    					return;
    				} else {
    					console.info("valid account: " + a + " [" + account.getAddress() + "] (" + account.link + ") AND [" + accounts[a].getAddress() + "] (" + accounts[a].link + ")");
    				}
    			}

    			// if consecutive accounts with errors let's quit - trying to avoid the locked account condition
    			if (accounts.length && accounts.last().error) {
    				console.error("consecutive accounts with errors so not looking for anymore");
					account = null;
					delete account;
    				callback();
    				return;
    			}
    			
				if (!localStorage["_conversationView"]) {
					localStorage["_conversationView"] = "detecting";
					account.detectConversationViewMode(function(response) {
						if (!response.error) {
							localStorage["_conversationView"] = response.conversationViewMode;
						}
					});
				}

    			// success
				console.info("Adding account: " + account.getAddress());
    			accounts.push(account);
    		}
    		initMailAccount(accountNumber+1, callback);
    	} else {
    		if (cbParams.error) {
    			// Error on last one most probably they were all errors ie. timeouts or no internet so reset all accounts to 0
    			accounts = new Array();
    			console.info("mailaccount - probably they were all errors");
    		} else {
    			if (isOnline()) {
    				logError("jmax accounts reached");
    			} else {
    				console.warn("Not online so not detecting accounts");
    			}
    		}
    		callback();
    		return;
    	}
    });
}

function pollAccounts(params, cb) {
	var callback;
	if (cb) {
		callback = cb;
	} else {
		// params might be the callback (if no 2nd parameter passed)
		if ($.isFunction(params)) {
			callback = params;
			params = {};
		} else {
			callback = function() {};
		}
	}

	if (pollingAccounts) {
		console.log("currently polling; quit polling me!")
		callback();
		return;
	}
	pollingAccounts = true;
	
	if (!params || !params.noEllipsis) { 
		chrome.browserAction.setBadgeText({ text: "..." });
	}	
	chrome.browserAction.setTitle({ title: getMessage("pollingAccounts") + "..." });

	console.log("poll accounts...");

	function afterPollingAccounts(callback) {
		var accountsSummary = getAccountsSummary(accounts);
		
		if (accountsSummary.signedIntoAccounts == 0) {
			setSignedOut({title:accountsSummary.firstNiceError});
		} else {
			// save default email for payment stuff
			email = getFirstActiveEmail(accounts);
			
			// see if i should unlock this user...
			if (!localStorage["verifyPaymentRequestSent"]) {
				
				verifyPayment(accounts, function(response) {
					if (response && response.unlocked) {
						Controller.processFeatures();
					}
				});
				
				localStorage["verifyPaymentRequestSent"] = true;
			}
			
			mailUpdate(params);
		}
		
		unreadCountWhenShowNotificationWhileActive = unreadCount;
		pollingAccounts = false;
		callback();
	}

	if (Settings.read("accountAddingMethod") == "autoDetect") {
		if (accounts != null) {
			$.each(accounts, function (i, account) {
				account = null;
				delete account;
			});
		}
		
		accounts = new Array();
		ignoredAccounts = new Array();
		unauthorizedAccounts = 0; 
		
		initMailAccount(0, function() {
			afterPollingAccounts(function() {
				callback();
			});
		});
	} else { // manual adding
		getAllEmails(accounts, function(allEmailResponses) {
			afterPollingAccounts(function() {
				callback(allEmailResponses);
			});
		});
	}
}

function getSettingValueForLabels(settings, labels, defaultObj) {
	if (!settings) {
		settings = {};
	}
	
	var settingValue;
	if (labels) {
		for (var a=labels.length-1; a>=0; a--) {
			var label = getJSystemLabelId(labels[a]);
			settingValue = settings[label];
			if (typeof settingValue != "undefined") {
				return settingValue;
			}
		}
	}
	
	// if we get here then return default value
	return defaultObj;
}

// Called when an account has received a mail update
function mailUpdate(params) {
	params = initUndefinedObject(params);
	
	buttonIcon.stopAnimation();
	
	updateNotificationTray();

	// if this mailUpdate is called from interval then let's gather newest emails ELSE we might gather later in the code
	var newEmails = [];
	if (params.allEmailsCallbackParams) {
		$.each(params.allEmailsCallbackParams, function(index, allEmailsCallback) {
			if (allEmailsCallback.newestMailArray && allEmailsCallback.newestMailArray.length) {
				console.log("allEmailsCallback.newestMailArray:", allEmailsCallback.newestMailArray);
				newEmails = newEmails.concat(allEmailsCallback.newestMailArray);
			}
		});
	}

	var totalUnread = 0;
	var lastMailUpdateAccountWithNewestMail;
	$.each(accounts, function(i, account) {

		if (!account.error) {
			if (account.getUnreadCount() > 0) {
				totalUnread += account.getUnreadCount();
			}
		}

		if (account.getNewestMail()) {
			if (!lastMailUpdateAccountWithNewestMail || !lastMailUpdateAccountWithNewestMail.getNewestMail() || account.getNewestMail().issued > lastMailUpdateAccountWithNewestMail.getNewestMail().issued) {
				lastMailUpdateAccountWithNewestMail = account;
			}

			if (!params.allEmailsCallbackParams) {
				newEmails = newEmails.concat(account.getAllNewestMail());
			}
		}
	});
	
	updateBadge(totalUnread);
	
	newEmails.sort(function (a, b) {
	   if (a.issued > b.issued)
		   return -1;
	   if (a.issued < b.issued)
		   return 1;
	   return 0;
	});
	
	if (newEmails.length) {
		var mostRecentNewEmail = newEmails.first();
		accountWithNewestMail = mostRecentNewEmail.account;
		
		var passedDateCheck = false;
		if (Settings.read("showNotificationsForOlderDateEmails")) {
			if (accountWithNewestMail.getMail().length < 20) {
				passedDateCheck = true;
			} else {
				console.warn("more than 20 emails so bypassing check for older dated emails");
				if (mostRecentNewEmail.issued > lastShowNotificationDates[accountWithNewestMail.id]) {
					passedDateCheck = true;
				}
			}
		} else {
			if (mostRecentNewEmail.issued > lastShowNotificationDates[accountWithNewestMail.id]) {
				passedDateCheck = true;
			}
		}
		
		if (!lastShowNotificationDates[accountWithNewestMail.id] || passedDateCheck) {
			
			lastShowNotificationDates[accountWithNewestMail.id] = mostRecentNewEmail.issued;

			var mailIdHash = $.md5(mostRecentNewEmail.id);
			var addressHash = $.md5(accountWithNewestMail.getAddress());
	
			if (mailIdHash != localStorage[addressHash + "_newest"]) {
				
				buttonIcon.startAnimation();

				var soundSource = getSettingValueForLabels(accountWithNewestMail.getSetting("sounds"), mostRecentNewEmail.labels, Settings.read("sn_audio"));

				// show notification, then play sound, then play voice
				if (params.showNotification) {
					// save them here for the next time i call showNotification when returning from idle
					params.totalUnread = totalUnread;
					params.emails = newEmails;
					lastShowNotifParams = params;
					showNotification(params, function() {
						if (Settings.read("soundNotification")) {
							playNotificationSound(soundSource, function() {
								playVoiceNotification(accountWithNewestMail);
							});
						} else {
							playVoiceNotification(accountWithNewestMail);
						}
					});
				} else if (Settings.read("soundNotification")) {
					playNotificationSound(soundSource, function() {
						playVoiceNotification(accountWithNewestMail);
					});
				} else {
					playVoiceNotification(accountWithNewestMail);
				}
				
				localStorage[addressHash + "_newest"] = mailIdHash;
			}
		}
	}
	
	// if new emails or mail count different (meaning some emails might have been marked as read)
	if (newEmails.length || unreadCount != totalUnread) {
		if (pokerListenerLastPokeTime.diffInDays() > -5) {
			refreshWidgetData();
		}
	}
	
	unreadCount = totalUnread;
	initPopup(unreadCount);
	
	chrome.idle.queryState(120, function(newState) {
		if (newState == "active") {
			//console.log("unreadcount while: " + newState);
			unreadCountWhenShowNotificationWhileActive = unreadCount;
		}
	});

}


function updateNotificationTray() {
	
	var allUnreadMail = getAllUnreadMail(accounts);
	
	// if any of the rich notif mails do not exist anymore than assume one has been read/deleted and therefore remove the notification from the tray

	var richNotifMailsStillUnreadCount = 0;
	for (var a=0; a<richNotifMails.length; a++) {
		for (var b=0; b<allUnreadMail.length; b++) {
			if (richNotifMails[a] && allUnreadMail[b] && richNotifMails[a].id == allUnreadMail[b].id) {
				richNotifMailsStillUnreadCount++;
			}
		}
	}

	if (richNotifMails.length != richNotifMailsStillUnreadCount) {
		console.log("remove tray because some rich notif mails have been read: " + richNotifMails.length + " | " + richNotifMailsStillUnreadCount);
		clearRichNotification(richNotifId);
	}
}

function setSignedOut(params) {
	params = initUndefinedObject(params);
	
	bg.buttonIcon.setIcon({signedOut:true});
	chrome.browserAction.setBadgeBackgroundColor({color:[255, 255, 255, 1]});
	chrome.browserAction.setBadgeText({ text: "X" });
	if (params.title) {
		chrome.browserAction.setTitle({ title: params.title });
	} else {
		chrome.browserAction.setTitle({ title: getMessage("notSignedIn") });
	}
	if (Settings.read("accountAddingMethod") == "autoDetect") {
		unreadCount = 0;
		email = null;
	}
}

function playNotificationSound(source, callback) {
	
	callback = initUndefinedCallback(callback);
	
	try {
		// must try catch this because of "Uncaught ReferenceError: Audio is not defined" for some users
		// false alarm: user had removed this file ffmpegsumo.dll in Chrome folder which caused the error.
		if (!notificationAudio) {
			notificationAudio = new Audio();
		}

		var audioEventTriggered = false;
		
		$(notificationAudio).off().on("ended abort error", function(e) {
			console.log("sound event", e);		
			if (!audioEventTriggered) {
				audioEventTriggered = true;
				callback();
			}
		});
		
		if (isDND() || source == "") {
			callback();
		} else {
			if (!source) {
				source = Settings.read("sn_audio");
			}
		
			// patch for ogg might be crashing extension
			// patch linux refer to mykhi@mykhi.org
			if (DetectClient.isLinux() || lastNotificationAudioSource != source) {
				if (source.indexOf("custom_") == 0) {
					var sounds = Settings.read("customSounds");
					if (sounds) {
						// custom file selectd
						$.each(sounds, function(index, sound) {
							if (source.replace("custom_", "") == sound.name) {
								console.log("loadin audio src")
								notificationAudio.src = sound.data;
							}
						});
					}					
				} else {
					console.log("loadin audio src")
					notificationAudio.src = "sounds/" + source;
				}
		   }
		   lastNotificationAudioSource = source;
		   notificationAudio.volume = pref("notificationSoundVolume") / 100;
		   notificationAudio.play();
		}
	} catch (e) {
		logError("sound error: " + e);
		callback();
	}
}

function detectLanguage(text, callback) {
	Controller.detectLanguage(text, function(response) {
		if (response && response.error) {
			callback(response);
		} else {
			lang = "en";
			if (response && response.length != 0) {
				lang = response[0].language;
				console.log("lang detected: " + lang)
				if (lang == "eu" || lang == "et" || lang == "sq") { // estonia
					lang = "en";
				}
			}
			callback({lang:lang});
		}
	});
	/*
	$.ajax({
		type: "GET",
		url: "https://ws.detectlanguage.com/0.2/detect",
		data: {q: text, key:"blahblah"},
		dataType: "json",
		timeout: seconds(2),
		complete: function(request, textStatus) {
			var status = getStatus(request, textStatus);
			if (status == 200) {
				var data;
				try {
					data = JSON.parse(request.responseText);
				} catch (e) {
					logError("could not parse detect lang response: " + request.responseText);
					callback();
					return;
				}
				if (data && data.data && data.data.detections && data.data.detections.length != 0) {
					lang = data.data.detections[0].language;
					console.log("lang detected: " + lang)
					if (lang == "eu" || lang == "et" || lang == "sq") { // estonia
						lang = "en";
					}
				}
				callback({lang:lang});
			} else {
				logError("error with detect: " + status + " " + textStatus)
				callback();
			}
		}
	});
	*/
}

function playVoiceNotification(accountWithNewestMail) {
	
	// watch out 2 mute voice types...
	
	// this one is for temporarly muting voice from icon in the popup window
	// this one is for muting voice between certain hours set in the options
	
	if (Settings.read("voiceNotification") && !isDND()) {

		chrome.idle.queryState(parseInt(pref("voiceNotificationOnlyIfIdleInterval")), function(state) {
			// apparently it's state can be locked or idle
			if (!pref("voiceNotificationOnlyIfIdle") || (pref("voiceNotificationOnlyIfIdle") && state != "active" && !detectSleepMode.isWakingFromSleepMode())) {

				var newestEmail = accountWithNewestMail.getNewestMail();

				// put a bit of time between chime and voice
				setTimeout(function() {

					if (newestEmail) {
						
						var voiceHear = getSettingValueForLabels(accountWithNewestMail.getSetting("voices"), newestEmail.labels, Settings.read("voiceHear"));

						if (voiceHear) {
							
							var hearFrom = voiceHear.indexOf("from") != -1;
							var hearSubject = voiceHear.indexOf("subject") != -1;
							var hearMessage = voiceHear.indexOf("message") != -1;
							
							var fromName = generateNotificationDisplayName(newestEmail);
							
							// filter for speech
							
							if (newestEmail.authorMail && newestEmail.authorMail.indexOf("vonage.") != -1) {
								// put vonage instead because or elee the phone number is spoken like a long number ie. 15141231212 etc...
								fromName = "Vonage";
							}
		
							var subject = newestEmail.title;
							subject = cleanEmailSubject(subject);
		
							var introToSay = "";
							var introToSayEnglish = "";
							var afterfromSeparator = "";
							var messageToSay = "";
							
							if (hearFrom) {
								if (hearSubject || hearMessage) {
									// from plus something else...
									introToSay = getMessage("NAME_says", fromName);
									introToSayEnglish = fromName + " says";
									afterfromSeparator = ", ";
								} else {
									// only from
									introToSay = getMessage("emailFrom_NAME", fromName);
									introToSayEnglish = "Email from " + fromName;
								}
							} 
								
							if (hearSubject || hearMessage) {
								if (hearSubject && !subjects[subject] && !subject.match(/no subject/i) && !subject.match(/sent you a message/i)) {
									subjects[subject] = "ALREADY_SAID";
									messageToSay += subject.htmlToText();
								} else {
									console.log("omit saying the subject line")
								}
								
								if (hearMessage) {
									var spokenWordsLimit = Settings.read("spokenWordsLimit");
									var spokenWordsLimitLength;
									if (spokenWordsLimit == "summary") {
										spokenWordsLimitLength = 101;
									} else if (spokenWordsLimit == "paragraph") {
										spokenWordsLimitLength = 500;
									} else {
										spokenWordsLimitLength = 30000;
									}
									var messageText = newestEmail.getLastMessageText({maxSummaryLetters:spokenWordsLimitLength, htmlToText:true});
									if (messageText) {
										messageToSay += ", " + messageText;
									}
								}
							}
							
							console.log("message to say: " + introToSay + afterfromSeparator + messageToSay);					
							if (pref("voice").indexOf("Multilingual TTS Engine") != -1) {
								if (isOnline()) {
									var lang = pref("language", window.navigator.language);
									
									// Commented out because multingual extension is doing the detect language
									/*
									detectLanguage(messageToSay, function(detectLanguageResult) {
										// if intro and message are same lang then play them in one submit to google
										if (!detectLanguageResult || lang == detectLanguageResult.lang) {
											ChromeTTS.queue(introToSay + afterfromSeparator + messageToSay);
										} else {
											ChromeTTS.queue(introToSay);
											setTimeout(function() {
												ChromeTTS.queue(messageToSay);
											}, 400);
										}
									});
									*/
									
									ChromeTTS.queue(introToSay);
									setTimeout(function() {
										ChromeTTS.queue(messageToSay);
									}, 400);
									
								} else {
									// fetch default machine voice by passing false as 2nd parameter to getDefaultVoice
									chrome.tts.getVoices(function(voices) {
										var voiceIndexMatched = getDefaultVoice(voices, false);
										if (voiceIndexMatched != -1) {
											var voice = voices[voiceIndexMatched];
											ChromeTTS.queue(introToSayEnglish + afterfromSeparator + messageToSay, voice);
										}
									});
								}
							} else {
								ChromeTTS.queue(introToSay + afterfromSeparator + messageToSay);
								//ChromeTTS.queue(introToSayEnglish + afterfromSeparator + messageToSay);
							}
						} else {
							console.log("voiceHear off for these labels");
						}
					} else {
						console.warn("in playVoiceNotification this returns null?? -> accountWithNewestMail.getNewestMail()");
					}
				}, 1000);
			}
		});
	}
}

function preloadProfilePhotos(mails, callback) {
	var timeoutReached = false;
	if (Settings.read("showContactPhoto")) {
		
		// gather unique emails
		var userEmails = mails.uniqueAttr(function(mail) {
			return mail.account.getAddress();
		});
		
		console.log("useremails", userEmails);
		
		// let's ensure all tokens first before looping
		oAuthForContacts.ensureTokenForEmail(userEmails, function(cbParams) {
			if (cbParams.error) {
				callback(cbParams);
			} else {
				var deferreds = new Array();
				$.each(mails, function(index, mail) {
			
				   var dfd = $.Deferred();
				   deferreds.push(dfd);
					
				   var contactPhoto = new Image();
				   getContactPhoto({mail:mail}, function(params) {
						if (params.error) {
							console.log("contacterror: " + params.error, params);
							dfd.resolve(params);
						} else {
							console.log("photoUrl: " + params.photoUrl);
							
							if (params.photoUrl) {
								$(contactPhoto).attr("src", params.photoUrl);
								
								loadImage($(contactPhoto)).then(function() {
									mail.contactPhoto = contactPhoto;
									dfd.resolve("success");
								}).catch(function(e) {
									var error = "could not load image: " + e;
									console.log(error);
									dfd.resolve({error:error});
								});
								
							} else {
								dfd.resolve("success");
							}
						}
					});
				   
				   	dfd.promise();
				});
			
				// wait for https images to load because even if the deferreds completed it seem the contact images woulnd't load at extension startup
				var preloadTimeout = setTimeout(function() {
					timeoutReached = true;
					console.log("preloadphotos timeoutEND");
					callback();
				}, seconds(3));
				
				$.when.apply($, deferreds).always(function() {
					console.log("preloadphotos always args", arguments);
					// cancel timeout
					clearTimeout(preloadTimeout);
					// make sure timeout did not already call the callback before proceeding (don't want to call it twice)
					if (!timeoutReached) {
						console.log("preloadphotos whenEND");
						callback();
					}
				});
			}
		});
		
	} else {
		callback();
	}
}