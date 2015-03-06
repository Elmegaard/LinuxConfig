// Copyright 2015 Jason Savard

function MailAccount(accountParams) {
	
	this.id = accountParams.accountNumber;
	this.status;
	this.userActionedHistoryIds = [];
	
	var historyId;
	
	var requestTimeout = 10000;
   
	var mailArray = [];
	var newestMailArray = [];
	var emailsInAllLabels = [];
	var lastTotalEmailsFromPreviousFeed;
	var lastEmailFromPreviousFeed;
	var unreadCount = -1;
	var mailTitle;
	var mailAddress = accountParams.mailAddress;
	var gmailAt = null;
	var isStopped = false;
	var requestTimer;
	var syncSignInIdTimer;

	var labels = null;

	// Without this/that, no internal calls to onUpdate or onError can be made...
	var that = this;
	
   	function filterEmailBody(subject, body) {
	   if (body) {
		   
		   // remove line breaks because regex cannot match content before lines especially with start of line operator ^
		   body = body.replace(/\r\n/g, " ");
		   body = body.replace(/^facebook([a-z])/i, "$1"); // $1 is a regex variable indicating matching everything, remove facebook string because when doing htmlToText ... we get a string like: facebookWilliam da Silva commented on your status.William wrote:
		   
		   var regexs = new Array();
		   
		   regexs.push(/ on [a-z]{3}, [a-z]{3} \d+/i);	// On Wed, Dec 28, 2011 at 12:36 AM, Jason <jaso
		   regexs.push(/ on [a-z]{3} \d+\/\d+\/\d+/i);	// On Wed 15/02/12  8:23 AM , Wade Konowalchuk
		   regexs.push(/ \w* [a-z]{3} \d+ \d+ /i); 		// Fri May 04 2012 15:54:46
		   regexs.push(/ on \d+[\/|-]\d+[\/|-]\d+/i);	// on 2011/12/28 Jason <apps@...
		   regexs.push(/ on \w*, \w* \d+(st)?, \d+,/i);	// On Thursday, October 31, 2013, Jason wrote:   OR   On Wednesday, October 15, 2014, Jason <jasonsavard@gmail.com> wrote:
		   regexs.push(/ >? on \w* \d+, \d+, at/i);	// In!  > On Oct 5, 2014, at 9:32 AM ...
		   regexs.push(/ \d+[\/|-]\d+[\/|-]\d+/i);		// 2011/12/28 Jason <apps@...
		   regexs.push(/ [\-]+ original message/i); // -------- Message original -------- 
		   regexs.push(/ [\-]+ message original/i); // -------- original Message -------- 
		   regexs.push(/ ?sent from: /i);
		   regexs.push(/ ?Envoyé de mon i/);
		   regexs.push(/ ?cc: /i);
		   regexs.push(/ date: /i); // removed the '?' because the word up'date' would stop the filter
		   regexs.push(/ ?from: /i); //great From: Jason
		   regexs.push(/ ?Reply to this email to comment on this status./i); // facebook ending
		   regexs.push(/ subject: re: /i); // facebook ending
		   // DONT use because passing subject string with unintential regex syntax screwed it up like ] and [ etc.
		   //regexs.push( new RegExp(" subject: re: " + subject, "i") );	// I can play afterall, any room left ? Subject: Re: Saturday's game Nov 2nd at 2pm From: wade@
		   
		   if (Settings.read("hideSentFrom")) {
			   //regexs.push(/^(.*) ?sent from \w* ?\w* ?$/i); // "Sent from Blackberry" or "Sent from my iPhone"
			   regexs.push(/ ?Sent (wirelessly )?from my /i); // "Sent from my Blackberry" or "Sent from my iPhone"
			   regexs.push(/ ?Sent on the ?\w* \w* network/i); // "Sent on the TELUS Mobility network with BlackBerry"
			   regexs.push(/ ?Sent from \w* mobile/i); // "Sent from Samsung Mobile"
		   }
		   
		   for (var a=0; a<regexs.length; a++) {			   
			   /*
			   // max this internal loop to 10: just in case it goes on forever
			   // by the way we re-passing the same regex several times until all occurences of ie from" are gone... "Hello1 from: Hello2 from:"
			   for (var b=0; b<10; b++) {
				   var matches = body.match(regexs[a]);
				   if (matches && matches.length >= 2) {
					   body = matches[1];
				   } else {
					   break;
				   }
			   }
			   */
			   
			   // regex.search = faster ...
			   var searchIndex = body.search(regexs[a]);
			   if (searchIndex != -1) {
				   body = body.substring(0, searchIndex);
			   }
		   }
		   
		   body = $.trim(body);
		   
		   // remove repeated subject line from beginning of the body (ie. emails from facebook tend to do that etc. like William da Silva commented on your status.
		   if (body.indexOf(subject) == 0) {
			   body = body.substring(subject.length);
		   }
		   
		   return body;
	   }
   	}

   function addParsedFeed(params, parsedFeed, feedUnreadCount, callback) {
	   // add the parsed feeds and continue for more						   
	   var feedInfo = {label:params.monitorLabels[params.monitorLabelsIndex], parsedFeed:parsedFeed, feedUnreadCount:feedUnreadCount};
	   
	   params.feedsArrayInfo.push(feedInfo);
	   params.monitorLabelsIndex++;
	   
	   fetchEmailsByLabel(params, callback);
   }
   
   function fetchFeed(params, callback) {
	   var atomParam;
	   var labelParam = params.monitorLabels[params.monitorLabelsIndex];
	   if (labelParam) {
		   if (labelParam == SYSTEM_INBOX) {
			   atomParam = ATOM_FEED_INBOX;
		   } else if (labelParam == SYSTEM_IMPORTANT) {
			   atomParam = ATOM_FEED_IMPORTANT;
		   } else if (labelParam == SYSTEM_IMPORTANT_IN_INBOX) {
			   atomParam = ATOM_FEED_IMPORTANT_IN_INBOX;
		   } else if (labelParam == SYSTEM_ALL_MAIL) {
			   atomParam = ATOM_FEED_UNREAD;
		   } else {
			   atomParam = labelParam;
		   }
		   
		   // apparently iPads add these labels with slashes (ie. INBOX/ they are not actually nested labels just labels with slashes in them)
		   atomParam = atomParam.replace(/\//g, "-"); // slashes must had to replaced with - to work (yeah that's gmail wants it)
		   atomParam = encodeURIComponent(atomParam);
	   } else {
		   atomParam = ATOM_FEED_INBOX;
	   }
	   
	   var labelPath = "feed/atom/" + atomParam;
	   var url = that.getMailUrl({useStandardGmailUrl:true}) + labelPath + "?timestamp=" + Date.now();
	   $.ajax({
		   type: "GET",
		   dataType: "text",
		   url: url,
		   timeout: requestTimeout,
		   complete: function(jqXHR, textStatus) {
			   callback({jqXHR:jqXHR, textStatus:textStatus});
		   }
	   });
	   
	   countEvent("atomFeedLabel");
	   
   }
   
   function fetchEmailsByLabel(params, callback) {
	   
	   // finished with feeds so exit/callback
	   if (params.monitorLabelsIndex >= params.monitorLabels.length) {
		   callback(params);
	   } else {
		   
		   fetchFeed(params, function(fetchFeedResponse) {
			   
			   // test flag
			   var TEST_FAIL = false;
			   if (TEST_FAIL) {		   
				   fetchFeedResponse.textStatus = "jasontimeout";
			   }
			   
			   if (fetchFeedResponse.textStatus == "success") {
				   that.error = null;
				   
				   var parser = new DOMParser();
				   parsedFeed = $(parser.parseFromString(fetchFeedResponse.jqXHR.responseText, "text/xml"));
				   
				   var titleNode = parsedFeed.find('title');
				   if (titleNode.length >= 1) {			   
					   var titleNodeStr = $(titleNode[0]).text();
					   //titleNodeStr = "access is blocked";
					   mailTitle = titleNodeStr.replace("Gmail - ", "");
					   
					   // patch because <title> tag could contain a label with a '@' that is not an email address ie. Gmail - Label '@test@' for blah@gmail.com
					   var emails = mailTitle.match(/([\S]+@[\S]+)/ig);
					   if (emails) {
						   mailAddress = emails.last();
					   } else {
						   // catch these errors:
						   // Access to this site is blocked
						   // Acceso Denegado
						   // Denied Access Policy
						   mailAddress = "unknown";
						   that.error = "Error: " + titleNodeStr;
						   callback({error: that.error, jqXHR:fetchFeedResponse.jqXHR});
						   logError(that.error);
						   return;
					   }
					   
					   var link = parsedFeed.find('link').attr('href');
					   that.link = link;
					   
					   var ignoreEmailFound = false;
					   var ignoreEmailsStr = Settings.read("ignoreEmails");
					   if (ignoreEmailsStr) {
						   var ignoreEmailsArray = ignoreEmailsStr.split(",");
						   $.each(ignoreEmailsArray, function(i, ignoreEmail) {
							   if (mailAddress == $.trim(ignoreEmail.toLowerCase())) {
								   ignoreEmailFound = true;
								   return false;
							   }
						   });
					   }
					   
					   if (ignoreEmailFound || (Settings.read("check_gmail_off") && mailAddress && mailAddress.indexOf("@gmail") != -1)) {
						   callback({ignored:true});
						   return;
					   }
				   } else {
					   mailAddress = "Cookie problem, try signing out and in or restart browser!";
				   }
				   
				   // If previousMonitorLabel not matching current then we are probably fetching this feed for the first time and so now we have the email address, we must now check if the user selected a different label to monitor for this email address, if so stop this one and call the feed again
				   //console.log("params: ", params.monitorLabels)
				   //console.log("getmonitors: ", that.getMonitorLabels())
				   if (params.monitorLabels.toString() != that.getMonitorLabels().toString()) {
					   // this is a safety flag so that they we don't endless recursively call getEmails()
					   if (params.fetchFeedAgainSinceMonitorLabelIsDifferent) {
						   that.error = "JError: recursive error with label";
						   callback({error:that.error, jqXHR:fetchFeedResponse.jqXHR});
					   } else {					   
						   // update monitor labels and send it again
						   console.log("call again since fetchFeedAgainSinceMonitorLabelIsDifferent");
						   params.monitorLabels = that.getMonitorLabels();
						   params.fetchFeedAgainSinceMonitorLabelIsDifferent = true;
						   fetchEmailsByLabel(params, callback);
					   }
				   } else {
					   
					   var feedUnreadCount = Number(parsedFeed.find('fullcount').text());
					   // TESTING
					   //alert('remove test')
					   //feedUnreadCount = 0;
					   if (feedUnreadCount) {
						   addParsedFeed(params, parsedFeed, feedUnreadCount, callback);
					   } else {							   
						   // patch: because fullcount is 'sometimes' 0 for some user accounts for labels: important or allmail (https://github.com/aceat64/MailCheckerMinus/issues/15 or banko.adam@gmail.com)
						   feedUnreadCount = Number(parsedFeed.find('entry').length);
						   
						   // TESTING
						   // 20 is the limit to the feed so there might be more unread emails, let's use the basic view to fetch the real total (we can only do this for allmail/unread label because even the basic view only says 1-20 of "about"??? blahblah
						   if (feedUnreadCount >= MAX_EMAILS_IN_ATOM_FEED && params.monitorLabels[params.monitorLabelsIndex] == SYSTEM_ALL_MAIL) {
							   console.log("use the basic view to fetch the real total...")
							   $.ajax({
								   type: "GET",
								   timeout: requestTimeout,
								   url: that.getMailUrl({useBasicGmailUrl:true}) + "?s=q&q=label%3Aunread", // append 'unread' to only fetch unreads of this label of course
								   complete: function(jqXHR, textStatus) {
									   if (textStatus == "success") {
										   try {
											   // patch: must place wrapper div element because jQuery would generate error when trying to parse the response into the $() contructor ... Uncaught Error: Syntax error, unrecognized expression: <html...
											   var $responseText = $("<div>" + jqXHR.responseText + "</div>");
											   var realTotal = $responseText.find("table tr:first-child td b:nth-child(3)").first().text();
											   if (realTotal && $.isNumeric(realTotal)) {
												   feedUnreadCount = Number(realTotal);
											   }
										   } catch (e) {
											   logError("Could not parse basic view html to get real unread count: " + e);
										   }
									   }
									   addParsedFeed(params, parsedFeed, feedUnreadCount, callback);
								   }
							   });
						   } else {
							   addParsedFeed(params, parsedFeed, feedUnreadCount, callback);
						   }
					   }
				   }

			   } else {
				   // jqXHR.status = 401 = unauthorized, 0=timeout
				   // jqXHR.statusText = unauthorized, timeout
				   // textStatus (param) "success", "notmodified", "error", "timeout", "abort", or "parsererror"
				   
				   console.warn("fetchEmailsByLabel error: " + fetchFeedResponse.textStatus);

				   if (TEST_FAIL) {
					   setTimeout(function() {
						   that.error = "timeout";
						   callback({error: that.error, jqXHR:fetchFeedResponse.jqXHR});
					   }, 4000);
				   } else {
					   
					   if (fetchFeedResponse.jqXHR) {
						   that.error = fetchFeedResponse.jqXHR.statusText;
					   } else {
						   that.error = fetchFeedResponse.textStatus;
					   }
					   callback({error:that.error, jqXHR:fetchFeedResponse.jqXHR});
				   }
			   }
		   });
	   }
   }
   
   function findThreadByMail(threads, mail) {
	   for (var a=0; a<threads.length; a++) {
		   for (var b=0; b<threads[a].messages.length; b++) {
			   alert("need to refactor because mail.id used to be id now it's frontendmessageid");
			   if (threads[a].messages[b]["X-GM-MSGID"] == mail.id) {
				   return threads[a];
			   }
		   }
	   }
   }
   
   this.getLabelName = function(labelId) {
	   var labelName;
	   
	   if (Settings.read("accountAddingMethod") == "autoDetect") {
		   labelName = labelId;
	   } else {
		   if (labelId == SYSTEM_PRIMARY) {
			   labelName = getMessage("primary");
		   } else if (labelId == SYSTEM_SOCIAL) {
			   labelName = getMessage("social");
		   } else if (labelId == SYSTEM_SOCIAL) {
			   labelName = getMessage("social");
		   } else if (labelId == SYSTEM_PROMOTIONS) {
			   labelName = getMessage("promotions");
		   } else if (labelId == SYSTEM_UPDATES) {
			   labelName = getMessage("updates");
		   } else if (labelId == SYSTEM_FORUMS) {
			   labelName = getMessage("forums");
		   } else {
			   that.getLabels(function(labelsResponse) {
				   labelsResponse.labels.some(function(thisLabel) {
					   if (thisLabel.id == labelId) {
						   labelName = thisLabel.name;
						   return true;
					   }
				   });
			   });
		   }
	   }
	   
	   return labelName;
   }
   
   this.hasMonitoredLabel = function(labelId) {
	   return that.getMonitorLabels().some(function(monitorLabel) {
		   if (monitorLabel == labelId) {
			   return true;
		   }
	   });
   }
   
   this.setAccountId = function(id) {
	   that.id = id;
   }
   
   this.syncSignInId = function(secondCall) {
	   console.log("syncSyncInId");
	   return new Promise(function(resolve, reject) {
		   $.ajax(MAIL_DOMAIN_AND_PATH + "u/?authuser=" + encodeURIComponent(mailAddress)).done(function(data, textStatus, jqXHR) {
			   // wrap response in a div because or else the jQuery.find would not work
			   var $html = $("<div/>");
			   $html.html(data);
			   var $metaTag = $html.find("meta[name='application-url']").first();
			   var content = $metaTag.attr("content"); // returns: https://mail.google.com/mail/u/0
			   if (content) {
				   // Patch: seems that on the first call to ?authuser after granting access the response points to /u/0 always, I think by caling it once it then signs in correctly and you can call ?authuser again to get the right index
				   var emails = extractEmails($html.html());
				   if (emails && emails.length && emails.first() == mailAddress) {
					   var parts = content.match(/u\/(\d+)/);
					   var id = parts[1];
					   console.log("setting " + mailAddress + " to id: " + id);
					   that.setAccountId(id);
					   resolve();
				   } else {
					   if (secondCall) {
						   console.log("failed after 2 consecutive authuser calls");
						   reject(new Error("Could not find email in response - might be signed out [12]"));
					   } else {
						   console.log("did not find matching email in authuser response, so call it again");
						   that.syncSignInId(true).then(function() {
							   resolve();
						   }).catch(function(errorResponse) {
							   reject(errorResponse);
						   });
					   }
				   }
			   } else {
				   reject(new Error("Could not find email in response - might be signed out"));
			   }
		   }).fail(function(jqXHR, textStatus, errorThrown) {
			   reject(errorThrown);
		   });
	   });
   }
   
   this.fetchThreads = function(mailArray, callback) {
	   // accounts count will be 0 when you start the extension or pollAccounts (that's ok because initMailAccount sets accounts to 0) once the interval calls this function then the accounts should be 1 or + 
	   var maxGetThreads;
	   if (bg.accounts.length) {
		   // do this to prevent locked accounts (note it used be 20 and no averaging so 20 for each account, i'm such an idiot
		   maxGetThreads = 5 / bg.accounts.length; // because this method will be called for each accounts let's average the number of threads per account
	   } else {
		   maxGetThreads = 1;
	   }
	   var getThreadsCount = 0;
	   var deferreds = new Array();
	   
	   $.each(mailArray, function(i, email) {
		   // lots of peeps in the thread so this might be a reply to a conversation (but which was already 'read' by user before so this check does not know the thread's past or initial email etc.) (and thus the summary in the Gmail's feed will not match what this sender wrote, but rather it matches summary of the first email in this thread
		   if (true) { //email.contributors.length || Settings.read("spokenWordsLimit") == "paragraph" || Settings.read("spokenWordsLimit") == "wholeEmail") { 
			   //console.log("has contributors: " + email.contributors.length + " or spokenwordslimit high");
			   if (getThreadsCount < maxGetThreads) {
				   var deferred = email.getThread();
				   deferreds.push(deferred);
				   getThreadsCount++;
			   } else {
				   console.warn("MAX fetch last conversations reached, ignoring now.");						   
			   }
		   }
	   });
	   
	   if (deferreds.length) {
		   console.log("deferreds: ", deferreds);
	   }
	   
	   $.when.apply($, deferreds).always(function() {
		   console.log("fetchfeeds end");
		   callback();
	   });
   }
   
   function initLabelDetails(mailObject) {
	   var label = mailObject.monitoredLabel;
	   if (label == SYSTEM_INBOX) {
		   mailObject.formattedLabel = getMessage("inbox");
		   mailObject.labelSortIndex = 0;
	   } else if (label == SYSTEM_IMPORTANT || label == SYSTEM_IMPORTANT_IN_INBOX) {
		   mailObject.formattedLabel = getMessage("importantMail");
		   mailObject.labelSortIndex = 1;
	   } else if (label == SYSTEM_ALL_MAIL) {
		   mailObject.formattedLabel = getMessage("allMail");
		   mailObject.labelSortIndex = 2;
	   } else {
		   mailObject.formattedLabel = mailObject.account.getLabelName(label);
		   if (mailObject.formattedLabel) {
			   mailObject.labelSortIndex = mailObject.formattedLabel.toLowerCase().charCodeAt(0);
		   } else {
			   // empty label, might have once been monitored but now label removed and marked as spam or something
			   // let's move it to the end of the list
			   mailObject.labelSortIndex = 3;
		   }
	   }
   }
   
   function initNewestEmails(mailObject) {
	   initLabelDetails(mailObject);
	   
	   // logic only for auto-detect
	   // check if this email appeared in previous label fetches (ie. it was labeled with multiple labels) if so then avoid adding this email again
	   var emailAlreadyFoundInADifferentLabelFetch = emailsInAllLabels.some(function(emailInAllFeeds) {
		   if (emailInAllFeeds.id == mailObject.id) {
			   // only for auto-detect because oauth can retrieve all the labels for an email
			   if (Settings.read("accountAddingMethod") == "autoDetect") {
				   emailInAllFeeds.labels.push( mailObject.monitoredLabel );
			   }
			   return true;
		   }
	   });

	   var passedImportantAndInboxTest = mailObject.passedImportantAndInboxTest();
	   
	   if (!emailAlreadyFoundInADifferentLabelFetch && passedImportantAndInboxTest) {
		   emailsInAllLabels.push(mailObject);
		   
		   var mailAlreadyExisted = mailArray.some(function(oldMail) {
			   if (oldMail.id == mailObject.id) {
				   return true;
			   }
		   });
		   if (!mailAlreadyExisted) {
			   newestMailArray.push(mailObject);
		   }
	   }
	   return {emailAlreadyFoundInADifferentLabelFetch:emailAlreadyFoundInADifferentLabelFetch, passedImportantAndInboxTest:passedImportantAndInboxTest};
   }
   
   function syncMailArray() {
	   // remove emails that have disappeared from the feed (user could have done any number of actions on the emails via the gmail.com etc.
	   for (var a=0; a<mailArray.length; a++) {
		   var emailStillInFeed = false; 
		   for (var b=0; b<emailsInAllLabels.length; b++) {
			   if (mailArray[a].id == emailsInAllLabels[b].id) {
				   emailStillInFeed = true;
				   break;
			   }
		   }
		   if (emailStillInFeed) {
			   // might have been marked as unread in Gmail page so make sure to reset this flag or it will appear as read in popup 
			   mailArray[a].lastAction = "";
		   } else {
			   if (Settings.read("rememeberReadEmails")) {
				   // assume deleted
				   if (Settings.read("readViaGmailPage") == "hide") {
					   if (mailArray[a].lastAction != "markAsRead") {
						   console.log("removing: " + mailArray[a].title);
						   mailArray.splice(a, 1);
						   a--;
					   }
				   } else {
					   mailArray[a].lastAction = "markAsRead";
				   }
			   } else {
				   console.log("removing: " + mailArray[a].title);
				   mailArray.splice(a, 1);
				   a--;
			   }
		   }
	   }
	   
	   mailArray = mailArray.concat(newestMailArray);

	   sortMailArray();
   }
   
   function sortMailArray() {
	   mailArray.sort(function (a, b) {
		   if (!Settings.read("groupByLabels") || a.monitoredLabel == b.monitoredLabel) {
			   if (a.issued > b.issued)
				   return -1;
			   if (a.issued < b.issued)
				   return 1;
			   return 0;
		   } else {
			   if (Settings.read("groupByLabels")) {
				   if (a.labelSortIndex < b.labelSortIndex) {
					   return -1;
				   } else if (a.labelSortIndex > b.labelSortIndex) {
					   return 1;
				   } else {
					   return 0;
				   }
			   } else {
				   return 0;
			   }
		   }
	   });
	   
	   // for rememeberReadEmails if busting max displayed then remove the already read ones
	   for (var a=mailArray.length-1; a>=0 && mailArray.length > Settings.read("maxEmailsToShowPerAccount"); a--) {
		   if (mailArray[a]) {
			   if (mailArray[a].lastAction == "markAsRead") {
				   console.log("removing: " + mailArray[a].title);
				   mailArray.splice(a, 1);
				   a++;
			   }
		   } else {
			   break;
		   }
	   }
   }
   
   this.getError = function(useHtml) {
	   var error;
	   var niceError;
	   var instructions = "";
	   
	   console.log("online: " + navigator.onLine);
	   
	   if (that.errorCode === 0) {
		   error = JError.NETWORK_ERROR;
		   niceError = "Network error!";
	   } else if (that.errorCode == 429) {
		   error = JError.RATE_LIMIT_EXCEEDED;
		   niceError = "Rate limit exceeded!";
	   } else if (that.errorCode == 400 || that.errorCode == 401) {
		   error = JError.ACCESS_REVOKED;
		   niceError = "Access was revoked!";
	   } else if (that.errorCode == 404) {
		   error = JError.MIGHT_BE_OFFLINE;
		   niceError = "Might be offline";
	   } else {
		   error = that.error;
		   niceError = that.error;
	   }
	   
	   var refreshHtml = "<a class='refreshAccount' href='javascript:;'>" + getMessage("refresh") + "</a>";
	   
	   if (Settings.read("accountAddingMethod") == "autoDetect") {
		   if (useHtml) {
			   instructions = refreshHtml + " or sign out/in or <a href='http://jasonsavard.com/wiki/Account_sign_in_methods?ref=autoDetectPopupError' target='_blank'>" + getMessage("addAccount") + "</a>";
		   } else {
			   instructions = "Refresh or try signing out/in or " + getMessage("addAccount");
		   }
	   } else {
		   if (error == JError.ACCESS_REVOKED) {
			   if (useHtml) {
				   instructions = refreshHtml + " or " + "<a href='options.html#2' target='_blank'>" + getMessage("addAccount") + "</a> to re-grant access!";
			   } else {
				   instructions = "Refresh or " + getMessage("addAccount") + " to re-grant access!";
			   }
		   } else {
			   if (useHtml) {
				   instructions = refreshHtml;
			   } else {
				   instructions = getMessage("refresh");
			   }
		   }
	   }
	   
	   return {error:error, niceError:niceError, instructions:instructions}
   }
   
   // Retreives inbox count and populates mail array
   this.getEmails = function(getEmailParams, callback) {
	   var dfd = new $.Deferred();
	   
	   getEmailParams = initUndefinedObject(getEmailParams);
	   callback = initUndefinedCallback(callback);
	   
	   // if params is a function then it's probably the callback
	   if ($.isFunction(getEmailParams)) {
		   callback = getEmailParams;
	   }
	   
	   if (Settings.read("accountAddingMethod") == "autoDetect") {
		   fetchEmailsByLabel({monitorLabels:that.getMonitorLabels(), monitorLabelsIndex:0, feedsArrayInfo:[]}, function(cbParams) {
			   if (cbParams.ignored) {
				   callback(cbParams);
				   dfd.resolve("success");
			   } else if (cbParams.error) {
				   callback(cbParams);
				   dfd.reject(cbParams.error);
			   } else {
				   
				   if (getEmailParams.restorePreviousMails) {
					   for (var a=0; a<getEmailParams.previousAccounts.length; a++) {
						   if (getEmailParams.previousAccounts[a].getAddress() == mailAddress) {
							   console.log("restoring previous mails: " + mailAddress);
							   mailArray = getEmailParams.previousAccounts[a].getMail();
							   break;
						   }
					   }
				   }
				   
				   unreadCount = 0;
				   
				   emailsInAllLabels = [];
				   newestMailArray = [];
				   
				   if (cbParams.feedsArrayInfo) {
					   $.each(cbParams.feedsArrayInfo, function(feedInfoIndex, feedInfo) {
						   
						   unreadCount += feedInfo.feedUnreadCount;
						   
						   // Parse xml data for each mail entry
						   feedInfo.parsedFeed.find('entry').each(function () {
							   
							   var $entry = $(this);
							   
							   var title = $entry.find('title').text();
							   
							   var summary = $entry.find('summary').text();
							   summary = filterEmailBody(title, summary);
							   
							   var issued = Date.parse($entry.find('issued').text());
							   
							   var imapMessageId = $entry.find('id').text().split(":")[2]; // ex. fetch the last number for the messageid... tag:gmail.google.com,2004:1436934733284861101
							   
							   var link = $entry.find('link').attr('href');
							   var id = link.replace(/.*message_id=(\d\w*).*/, "$1");
							   
							   var authorName = $entry.find('author').find('name').text();
							   var authorMail = $entry.find('author').find('email').text();
							   var contributors = $entry.find("contributor");
							   
							   // Encode content to prevent XSS attacks
							   title = Encoder.XSSEncode(title, true);
							   summary = Encoder.XSSEncode(summary, true);
							   authorMail = Encoder.XSSEncode(authorMail, true);							   
							   
							   var mailObject = new MailObject();
							   mailObject.account = that;
							   mailObject.id = id;
							   mailObject.imapMessageId = imapMessageId;
							   mailObject.title = title;
							   mailObject.summary = summary;
							   mailObject.issued = issued;
							   mailObject.authorName = authorName;
							   mailObject.authorMail = authorMail;
							   mailObject.labels = [feedInfo.label]; // initialize array and make first item in array the default label
							   mailObject.monitoredLabel = feedInfo.label;
							   mailObject.contributors = contributors;
							   
							   var newestEmailsResponse = initNewestEmails(mailObject);
							   if (newestEmailsResponse.emailAlreadyFoundInADifferentLabelFetch) {
								   unreadCount--;
							   }
						   });
						   
					   });
				   }
				   
				   syncMailArray();
				   
				   cbParams.mailAccount = that;
				   cbParams.newestMailArray = newestMailArray;
				   
				   if (newestMailArray.length) {
					   that.fetchThreads(newestMailArray, function() {
						   callback(cbParams);
						   dfd.resolve("success");
					   });
				   } else {
					   callback(cbParams);
					   dfd.resolve("success");
				   }
			   }
		   });
	   } else {
		   // added accounts
		   
		   function setAccountError(account, response) {
			   account.error = response.error;
			   account.errorCode = response.code;
			   
			   console.log("setaccounterror online: " + navigator.onLine);

			   if (response.error == "timeout") {
				   // don't have to display it again since it's logged already
			   } else if (response.code == 429) { // .error = "Rate Limit Exceeded"
				   logError("Caught rate limit exceeded");
			   } else {
				   var error = response.error + " code: " + response.code;
				   if (response.stack) {
					   error += " stack: " + response.stack;
				   }
				   logError("setAccountError: " + error, response);
			   }
		   }
		   
		   function getInitialMessages(params) {
			   // only pass history id (if we want to skip calling getHistoryForFirstTime again)
			   getMessagesByList({monitoredLabels:params.account.getMonitorLabels(), historyId:params.historyId}).then(function(newestMailArray) {
				   //throw {error:"my error"};
				   params.getEmailsResponse.firstFetch = params.firstFetch;
				   params.getEmailsResponse.newestMailArray = newestMailArray;
				   params.callback(params.getEmailsResponse);
				   params.dfd.resolve("success");
			   }).catch(function(errorResponse) {
				   params.callback(errorResponse);
				   setAccountError(that, errorResponse);
				   params.dfd.reject(errorResponse);
			   });
		   }

		   // call this to load labels
		   that.getLabels(function(getLabelsResponse) {
			   
			   if (getLabelsResponse.error) {
				   setAccountError(that, getLabelsResponse);
				   callback(getLabelsResponse);
				   dfd.reject(getLabelsResponse);
			   } else {
				   that.error = null;
				   that.errorCode = null;
				   
				   var getEmailsResponse = {};
				   getEmailsResponse.mailAccount = that;
				   var monitoredLabels = that.getMonitorLabels();
				   
				   newestMailArray = [];

				   if (historyId) {
					   getMessagesByHistory({historyId:historyId, monitoredLabels:monitoredLabels}).then(function(messagesByHistoryResponse) {
						   return new Promise(function(resolve, reject) {
							   if (messagesByHistoryResponse.messages && messagesByHistoryResponse.messages.length) {
								   
								   var allLabelsMessageIdsToFetch = [];			
								   var oauthEmailAlreadyFoundInADifferentLabelFetch = 0;
								   
								   var fetchMessagesByIdsParams = generateFetchMessagesByIdsParams({httpMessages:messagesByHistoryResponse.messages, allLabelsMessageIdsToFetch:allLabelsMessageIdsToFetch});
								   // must append this int variable outside of function because it's not passed by reference (but the array allLabelMessages... is)
								   oauthEmailAlreadyFoundInADifferentLabelFetch += fetchMessagesByIdsParams.oauthEmailAlreadyFoundInADifferentLabelFetch;

								   fetchMessagesByIds(fetchMessagesByIdsParams.messages).then(function(fetchMessagesByIdsResponse) {
									   var mergeUnreadRelativeCount = 0;
									   var createResponse = createMailObjects({httpBodies:fetchMessagesByIdsResponse.httpBodies});
									   createResponse.mailObjects.forEach(function(historyMailObject) {
										   // Not Found, so let's generate a sub to pass to mergeMailObject to remove it
										   if (historyMailObject.jerror == JError.NOT_FOUND) {
											   messagesByHistoryResponse.messages.some(function(message) {
												   if (message.id == historyMailObject.id) {
													   historyMailObject.threadId = message.threadId;
													   return true;
												   }
											   });
										   }
										   
										   mergeUnreadRelativeCount += mergeMailObject(historyMailObject);
										   initLabelDetails(historyMailObject);
									   });
									   
									   sortMailArray();
									   
									   getEmailsResponse.newestMailArray = newestMailArray;
									   
									   // Fixes this issue: when many emails are unread and you mark some older emails as read it does not reduce the count
									   // if already displaying more emails then the maximum allowed - then we fetch the unreadcount - because we can't rely on detecting if emails were removed since they may not have previously been fetched due to my max limits
									   new Promise(function(resolve, reject) {
										   if (unreadCount >= MAX_EMAILS_TO_FETCH) {
											   fetchUnreadCount(monitoredLabels).then(function(fetchedUnreadCount) {
												   unreadCount = fetchedUnreadCount;
											   }).catch(function() {
												   // ignore error let's just the other logic...
												   unreadCount += mergeUnreadRelativeCount;
											   }).then(function() {
												   resolve();
											   });
										   } else {
											   unreadCount += mergeUnreadRelativeCount;
											   resolve();
										   }
									   }).catch(function(errorResponse) {
										   console.error(errorResponse);
									   }).then(function() {
										   resolve({historyId:messagesByHistoryResponse.historyId});
									   });
									   
								   }).catch(function(errorResponse) {
									   reject(errorResponse);
								   });
							   } else {
								   resolve({historyId:messagesByHistoryResponse.historyId});
							   }
						   });
					   }).then(function(response) {
						   historyId = response.historyId;
						   callback(getEmailsResponse);
						   dfd.resolve("success");
					   }).catch(function(errorResponse) {
						   console.log("errorResponse", errorResponse);
						   if (errorResponse.jreason == JError.HISTORY_INVALID_OR_OUT_OF_DATE || errorResponse.jreason == JError.TOO_MANY_HISTORIES) {
							   // Must reinitalize
							   console.log(errorResponse.jreason + " - let's reinitalize mail");
							   
							   historyId = null;
							   // REPLICATED LOGIC below
							   //getInitialMessages({account:that, historyId:errorResponse.historyId, getEmailsResponse:getEmailsResponse, callback:callback, dfd:dfd});
							   getInitialMessages({account:that, getEmailsResponse:getEmailsResponse, callback:callback, dfd:dfd});
						   } else {
							   callback(errorResponse);
							   setAccountError(that, errorResponse);
							   dfd.reject(errorResponse);
						   }
					   });
				   } else {
					   getInitialMessages({account:that, getEmailsResponse:getEmailsResponse, callback:callback, dfd:dfd, firstFetch:true});
				   }
			   }
		   });
	   }

	   countEvent("getEmails");
	   
	   return dfd.promise();
   }
   
   function getMessagesByList(messagesByListParams) {
	   console.log("getMessagesByList");
	   
	   return new Promise(function(resolve, reject) {
		   
		   unreadCount = 0;
		   emailsInAllLabels = [];
	
		   var currentHistoryId;
		   
		   var promises = [];
		   promises.push(fetchUnreadCount(messagesByListParams.monitoredLabels));
		   promises.push(new Promise(function(resolve, reject) {
			   // if we already have history then let's just pass it forward
			   if (messagesByListParams.historyId) {
				   resolve({historyId:messagesByListParams.historyId});
			   } else {
				   getHistoryForFirstTime().then(function(response) {
					   resolve(response);
				   }).catch(function(errorResponse) {
					   reject(errorResponse);
				   });
			   }
		   }));
		   
		   Promise.all(promises).then(function(promiseAllResponse) {
			   // fetchUnreadCount response
			   unreadCount = promiseAllResponse[0];
			   // getHistoryForFirstTime response
			   return promiseAllResponse[1]; 
		   }).then(function(historyResponse) {
			   currentHistoryId = historyResponse.historyId;
			   return getMessages(messagesByListParams.monitoredLabels, function(getMessagesResponse) {
				   if (getMessagesResponse.fetchMessagesByLabelsResponse) {
					   unreadCount -= getMessagesResponse.fetchMessagesByLabelsResponse.oauthEmailAlreadyFoundInADifferentLabelFetch;
					   //unreadCount = getMessagesResponse.fetchMessagesByLabelsResponse.totalMessages;
					   getMessagesResponse.fetchMessagesByLabelsResponse.responses.forEach(function(response) {
						   var createResponse = createMailObjects(response);
						   
						   createResponse.mailObjects.forEach(function(mailObject) {
							   var newestEmailsResponse = initNewestEmails(mailObject);
							   if (!newestEmailsResponse.passedImportantAndInboxTest) { // we used the oauth logic above for this and the autodetect one here... newestEmailsResponse.emailAlreadyFoundInADifferentLabelFetch
								   unreadCount--;
							   }
						   });
						   
						   //unreadCount -= createResponse.totalMessagesThatWereGrouped;
					   });
				   } else {
					   // no unread messages
					   console.log("no unread messages");
				   }
			   });
		   }).then(function() {
			   syncMailArray();
			   historyId = currentHistoryId;
			   resolve(newestMailArray);
		   }).catch(function(errorResponse) {
			   console.error(errorResponse);
			   reject(errorResponse);
		   });
	   });
   }
   
   function getMailArrayIndexByThreadId(threadId) {
	   for (var a=0; a<mailArray.length; a++) {
		   if (mailArray[a].threadId == threadId) {
			   return a;
		   }
	   }
	   return -1;
   }

   function getMailArrayIndexByMessageId(messageId) {
	   for (var a=0; a<mailArray.length; a++) {
		   if (mailArray[a].id == messageId) {
			   return a;
		   }
	   }
	   return -1;
   }

   function mergeMailObject(historyMailObject) {
	   var mergeUnreadRelativeCount = 0;
	   
	   var showMailInPopup = historyMailObject.jerror != JError.NOT_FOUND && historyMailObject.isUnread() && historyMailObject.isMonitoredLabelStillInLabels() && historyMailObject.passedImportantAndInboxTest();
	   console.log("showMailInPopup: " + showMailInPopup, historyMailObject);
	   
	   var matchingMailArrayIndex;
	   if (that.getSetting("conversationView")) {
		   matchingMailArrayIndex = getMailArrayIndexByThreadId(historyMailObject.threadId);
	   } else {
		   matchingMailArrayIndex = getMailArrayIndexByMessageId(historyMailObject.id);
	   }
	   var matchingMailObject = mailArray[matchingMailArrayIndex];
	   
	   console.log("matchingMailArrayIndex: " + matchingMailArrayIndex);
	   if (matchingMailArrayIndex != -1) {
		   // is still unread?
		   if (showMailInPopup) {
			   // merge messages
			   matchingMailObject.messages.forEach(function(matchingMessage) {
				   var historyMessageFound = historyMailObject.getMessageById(matchingMessage.id);
				   if (!historyMessageFound) {
					   historyMailObject.messages.push(matchingMessage);
				   }
			   });
			   
			   historyMailObject.sortMessages();

			   // let's add this new mailobject to queue and remove it after merging the messages
			   console.log("merge new mail:", historyMailObject);
			   mailArray.push(historyMailObject);
			   mailArray.splice(matchingMailArrayIndex, 1);
			   newestMailArray.push(historyMailObject);
		   } else { // is no longer unread (maybe deleted, archive or marked as read etc.)
			   console.log("matchingMailObject.messages.length before: " + matchingMailObject.messages.length);
			   historyMailObject.messages.forEach(function(historyMessage) {
				   console.log("remove message: " + historyMessage.id);
				   matchingMailObject.removeMessageById(historyMessage.id);
			   });
			   console.log("matchingMailObject.messages.length affter: " + matchingMailObject.messages.length);
			   
			   // if all messages from thread are no longer unread then remove it from the array
			   var allMessagesRead = matchingMailObject.messages.every(function(message) {
				   return !historyMailObject.isUnread();
			   });
			   
			   if (allMessagesRead) {
				   mailArray.splice(matchingMailArrayIndex, 1);
				   mergeUnreadRelativeCount--;
			   }
		   }
	   } else {
		   if (showMailInPopup) {
			   mailArray.push(historyMailObject);
			   newestMailArray.push(historyMailObject);
			   mergeUnreadRelativeCount++;
		   } else {
			   // 1) we might have removed it immediately after user action like mark as read
			   // 2) was never in the mailarray and is still not unread: so ignore it :)
		   }
	   }
	   
	   return mergeUnreadRelativeCount;
   }
   
   function getMessagesByHistory(getMessageByHistoryParams) {
	   return new Promise(function(resolve, reject) {
		   // Poll gethistory first here to determine if any changes have made across ANY label - note that we are passing in the label just to also determine if changes have been made to this particular label
		   getHistory({historyId:getMessageByHistoryParams.historyId, labelId:getGmailAPILabelId(getMessageByHistoryParams.monitoredLabels.first())}).then(function(firstHistoryResponse) {
			   var returnParams = {historyId:firstHistoryResponse.historyId};
			   
			   // if exists history[] then we've had changes since the last historyid - so let's fetch emails
			   if (firstHistoryResponse.history) {
				   console.log("history exists");
				   
				   // Too many histories so let's just resync
				   if (firstHistoryResponse.nextPageToken) {
					   console.log("too many histories");
					   returnParams.jreason = JError.TOO_MANY_HISTORIES;
					   reject(returnParams);
				   } else {
					   // gethistory for the rest of the monitored labels to determine if they had any changes
					   var restOfMonitoredLabels = getMessageByHistoryParams.monitoredLabels.concat();
					   // remove first monitored label since it was already fetched above
					   restOfMonitoredLabels.shift();
			
					   var getHistoriesForRestOfMonitoredLabels = new Promise(function(resolve, reject) {
						   var allHistories = [firstHistoryResponse];
						   
						   if (restOfMonitoredLabels.length) {
							   getHistories(getMessageByHistoryParams.historyId, restOfMonitoredLabels).then(function(historiesHttpBodies) {
								   // join the rest of histories together
								   allHistories = allHistories.concat(historiesHttpBodies);
								   resolve(allHistories);
							   }).catch(function(errorResponse) {
								   reject(errorResponse);
							   });							   
						   } else {
							   console.log("only monitoring one label")
							   resolve(allHistories);
						   }
					   });
					   
					   getHistoriesForRestOfMonitoredLabels.then(function(allHistories) {
						   var messages = [];
						   var labelsWithMessageHistory = [];
						   allHistories.some(function(historyResponse) {
							   console.log("allHistories: ", historyResponse);
							   if (historyResponse.history) {
								   console.log("allHistories .history found");
								   
								   if (historyResponse.nextPageToken) {
									   console.log("too many histories in label: " + historyResponse.historyLabelId);
									   returnParams.jreason = JError.TOO_MANY_HISTORIES;
									   reject(returnParams);
									   return true;
								   } else {
									   var addedThisLabel = false;
									   historyResponse.history.forEach(function(historyItem) {
										   console.log("history item", historyItem);
										   if (historyItem.messages) {
											   /*
									   var userActionedHistoryIdIndex = that.userActionedHistoryIds.indexOf(historyItem.id);
									   if (userActionedHistoryIdIndex != -1) {
										   // the user did this action inside the extension (and hopefully updated the mailobject accordingly) so don't have to fetch or reprocess this message
										   console.log("ignore user actioned history id:" + historyItem.id);
										   that.userActionedHistoryIds.splice(userActionedHistoryIdIndex, 1);
									   } else {
											    */
											   console.log("messages in history: " + historyResponse.historyLabelId);
											   
											   // tag this historymessage with the monitoredLabel
											   historyItem.messages.forEach(function(historyMessage) {
												   historyMessage.monitoredLabel = getJSystemLabelId(historyResponse.historyLabelId); 
											   });
											   
											   messages = messages.concat(historyItem.messages);
											   if (!addedThisLabel) {
												   labelsWithMessageHistory.push(historyResponse.historyLabelId);
												   addedThisLabel = true;
											   }
											   //}
										   }
									   });
								   }
							   }
						   });
						   console.log("labelsWithMessageHistory", labelsWithMessageHistory);
						   returnParams.messages = messages;
						   returnParams.labelsWithMessageHistory = labelsWithMessageHistory;
						   resolve(returnParams);
					   }).catch(function(errorResponse) {
						   reject(errorResponse);
					   });
				   }
			   } else { // no changes
				   console.log("no changes");
				   resolve(returnParams);
			   }
		   }).catch(function(errorResponse) {
			   reject(errorResponse);
		   });
	   });
   }
   
   function getMessages(labels, processMessages) {
	   return new Promise(function(resolve, reject) {
		   fetchMessageIdsByLabels(labels).then(function(fetchMessageIdsByLabelsResponse) {
			   // detect if any messages found
			   var messagesFound = fetchMessageIdsByLabelsResponse.httpBodies.some(function(httpBody) {
				   if (httpBody.messages && httpBody.messages.length) {
					   return true;
				   }
			   });
			   if (messagesFound) {
				   fetchMessagesByLabels(fetchMessageIdsByLabelsResponse).then(function(fetchMessagesByLabelsResponse) {
					   processMessages({fetchMessagesByLabelsResponse:fetchMessagesByLabelsResponse});
					   resolve();
				   }).catch(function(errorResponse) {
					   reject(errorResponse);
				   });
			   } else {
				   // should still execute processMessages
				   processMessages({labelsWithoutMessages:labels});
				   resolve();
			   }
		   }).catch(function(errorResponse) {
			   reject(errorResponse);
		   });
	   });
   }
   
   function generateFetchMessagesByIdsParams(params) {
	   var oauthEmailAlreadyFoundInADifferentLabelFetch = 0;
	   var messages = [];
	   params.httpMessages.forEach(function(httpMessage) {
		   if (params.allLabelsMessageIdsToFetch && params.allLabelsMessageIdsToFetch.indexOf(httpMessage.id) != -1) {
			   console.log("skip this message because already queued from another label: " + httpMessage.id);
			   oauthEmailAlreadyFoundInADifferentLabelFetch++;
		   } else {
			   var message = {id: httpMessage.id, monitoredLabel:httpMessage.monitoredLabel};
			   messages.push(message);
			   params.allLabelsMessageIdsToFetch.push(httpMessage.id);
		   }
	   });
	   
	   return {messages:messages, oauthEmailAlreadyFoundInADifferentLabelFetch:oauthEmailAlreadyFoundInADifferentLabelFetch};
   }
   
   function fetchMessagesByLabels(fetchMessageIdsByLabelsResponse) {
	   return new Promise(function(resolve, reject) {
		   var fetchMessagesByIdsPromises = [];
		   var errors = [];

		   var allLabelsMessageIdsToFetch = [];
		   var oauthEmailAlreadyFoundInADifferentLabelFetch = 0;

		   fetchMessageIdsByLabelsResponse.httpBodies.forEach(function(httpBody) {
			   if (httpBody.error) {
				   errors.push(httpBody);
			   } else if (httpBody.messages) {
				   
				   httpBody.messages.forEach(function(httpMessage) {
					   httpMessage.monitoredLabel = httpBody.monitoredLabel;
				   });
				   
				   var fetchMessagesByIdsParams = generateFetchMessagesByIdsParams({httpMessages:httpBody.messages, allLabelsMessageIdsToFetch:allLabelsMessageIdsToFetch});
				   // must append this int variable outside of function because it's not passed by reference (but the array allLabelMessages... is)
				   oauthEmailAlreadyFoundInADifferentLabelFetch += fetchMessagesByIdsParams.oauthEmailAlreadyFoundInADifferentLabelFetch;

				   if (fetchMessagesByIdsParams.messages.length) {
					   var fetchMessagesByIdsPromise = fetchMessagesByIds(fetchMessagesByIdsParams.messages);
					   fetchMessagesByIdsPromises.push(fetchMessagesByIdsPromise);
				   }
			   }
		   });
		   
		   Promise.all(fetchMessagesByIdsPromises).then(function(fetchMessagesByIdsPromisesResponses) {
			   if (errors.length) {
				   console.error("found some errors[]", errors);
				   reject(errors);
			   } else {
				   resolve({responses:fetchMessagesByIdsPromisesResponses, oauthEmailAlreadyFoundInADifferentLabelFetch:oauthEmailAlreadyFoundInADifferentLabelFetch});
			   }
		   }).catch(function(errorResponse) {
			   console.log("PromiseAll errors", errorResponse);
			   reject(errorResponse);
		   });
	   });
   }
   
   function createMailObjects(params) {
	   var mailObjects = [];
	   var totalMessagesThatWereGrouped = 0;
	   var errors = [];
	   params.httpBodies.forEach(function(httpBody) {

		   // might be permanently deleted
		   if (httpBody.jerror == JError.NOT_FOUND) { //if (httpBody.error && httpBody.error.code == 404) { // message == Not Found  (might have been permanently deleted)
			   // just push error object into array and continue loop
			   var mailObject = new MailObject();
			   mailObject.account = that;
			   mailObject.labels = [];
			   mailObject.messages = [];
			   mailObject.jerror = httpBody.jerror;
			   mailObjects.push(mailObject);
			   return;
		   } else if (httpBody.error) {
			   console.error("in createmailbojects, this body has this error: " + httpBody.error.message);
			   return;
		   }
		   
		   var headers = httpBody.payload.headers;
		   
		   if (that.getSetting("conversationView")) {
			   // group emails by threadid
			    var threadFound = mailObjects.some(function(existingMailObject) {
				   if (existingMailObject.threadId == httpBody.threadId) {
					   var message = generateMessageFromHttpResponseMessage(httpBody);
					   // add to beginning of array
					   existingMailObject.messages.unshift(message);
					   totalMessagesThatWereGrouped++;
					   return true;
				   }
			   });
			   
			   if (threadFound) {
				   // continue the "batchResponse.httpResponses.forEach" above
				   return;
			   }
		   }
		   
		   var subject = cleanEmailSubject(MyGAPIClient.getHeaderValue(headers, "Subject"));
		   console.log("subject: " + subject);
		   if (!subject) {
			   subject = "";
		   }

		   var summary = httpBody.snippet;
		   summary = filterEmailBody(subject, summary);
		   
		   var issued = getDateFromHttpResponseMessage(httpBody);
		   var from = MyGAPIClient.getHeaderValue(headers, "From");
		   
		   var addressObj = parseAddresses(from).first();
		   var authorName = addressObj.name;
		   
		   var authorMail = addressObj.email;
		   authorMail = Encoder.XSSEncode(authorMail, true);
		   
		   var mailObject = new MailObject();
		   mailObject.account = that;
		   mailObject.id = httpBody.id;
		   mailObject.messageId = MyGAPIClient.getHeaderValue(headers, "Message-ID"); // Used for replying
		   mailObject.threadId = httpBody.threadId;
		   mailObject.title = subject;
		   mailObject.summary = summary;
		   mailObject.issued = issued;
		   mailObject.authorName = authorName;
		   mailObject.authorMail = authorMail; 
		   
		   if (httpBody.labelIds) {
			   mailObject.labels = httpBody.labelIds;
		   } else {
			   mailObject.labels = [];
		   }
		   
		   /*
		   if (params.monitoredLabel) {
			   mailObject.monitoredLabel = params.monitoredLabel;
		   } else {
			   // probably fetched via history so let's just tag the first monitoredlabel to it
			   mailObject.monitoredLabel = that.getFirstMonitoredLabel(httpBody.labelIds);
		   }
		   */
		   mailObject.monitoredLabel = httpBody.monitoredLabel;
		   
		   mailObject.contributors = [];
		   
		   // init first conversation message, which is same as mailobject message
		   mailObject.messages = [];
		   var message = generateMessageFromHttpResponseMessage(httpBody);
		   mailObject.messages.push(message);
		   
		   mailObjects.push(mailObject);
	   });
	   
	   mailObjects.forEach(function(mailObject) {
		   mailObject.sortMessages();
		   // Make sure last convesation date is synced with mailobject date/issue (issue doesn't have happen on extension load but it does upon detecting history changes)
		   var lastMessage = mailObject.messages.last();
		   if (lastMessage) {
			   mailObject.issued = lastMessage.date;
		   }
	   });
	   
	   return {mailObjects:mailObjects, totalMessagesThatWereGrouped:totalMessagesThatWereGrouped};
   }
   
   function getHistories(historyId, labels) {
	   console.log("getHistories", labels);
	   return new Promise(function(resolve, reject) {
		   if (labels.length) {
			   var mygapiClient = getMyGAPIClient();
				
			   labels.forEach(function(label) {
				   var httpRequest = mygapiClient.request({
					   path: GmailAPI.PATH + "history?startHistoryId=" + historyId + "&labelId=" + getGmailAPILabelId(label) + "&maxResults=" + MAX_EMAILS_HISTORIES, //  + "&maxResults=1"
					   method: "GET"
				   });
				   mygapiClient.HttpBatch.add(httpRequest);
			   });
			
			   mygapiClient.HttpBatch.execute({oauthRequest:bg.oAuthForEmails, email:mailAddress}).then(function(batchResponse) {
				   // tag label id to httpbodies
				   batchResponse.httpBodies.forEach(function(httpBody, httpBodyIndex) {
					   httpBody.historyLabelId = labels[httpBodyIndex];
				   });
				   resolve(batchResponse.httpBodies);
			   }).catch(function(errorResponse) {
				   reject(errorResponse);
			   });
		   } else {
			   resolve([]);
		   }
	   });
   }
   
   function fetchMessageIdsByLabels(monitoredLabels) {
	   console.log("fetchMessageIdsByLabels");

	   return new Promise(function(resolve, reject) {
		   var mygapiClient = getMyGAPIClient();

		   monitoredLabels.forEach(function(monitoredLabel) {
			   var path = GmailAPI.PATH + "messages?labelIds=UNREAD&maxResults=" + MAX_EMAILS_TO_FETCH;
			   if (monitoredLabel != SYSTEM_ALL_MAIL) {
				   path += "&labelIds=" + getGmailAPILabelId(monitoredLabel);
			   }
			   
			   var httpRequest = mygapiClient.request({
				   path: path,
				   method: "GET"
			   });
			   mygapiClient.HttpBatch.add(httpRequest);
		   });

		   mygapiClient.HttpBatch.execute({oauthRequest:bg.oAuthForEmails, email:mailAddress}).then(function(batchResponse) {
			   // tag monitored label to httpbodies
			   batchResponse.httpBodies.forEach(function(httpBody, httpBodyIndex) {
				   httpBody.monitoredLabel = monitoredLabels[httpBodyIndex];
			   });
			   //resolve({httpBodies:batchResponse.httpBodies, monitoredLabels:monitoredLabels});
			   resolve({httpBodies:batchResponse.httpBodies});
		   }).catch(function(errorResponse) {
			   reject(errorResponse);
		   });
	   });
   }

   function fetchMessagesByIds(messages) {
	   console.log("fetchMessagesByIds", messages);
	   
	   return new Promise(function(resolve, reject) {
		   var mygapiClient = getMyGAPIClient();
		   
		   messages.forEach(function(message) {
			   console.log("messageid: " + message.id);
			   
			   var httpRequest = mygapiClient.request({
				   path: GmailAPI.PATH + "messages/" + message.id,
				   method: "GET"
			   });
			   mygapiClient.HttpBatch.add(httpRequest);
		   });

		   mygapiClient.HttpBatch.execute({oauthRequest:bg.oAuthForEmails, email:mailAddress}).then(function(batchResponse) {
			   // tag monitored label to httpbodies
			   batchResponse.httpBodies.forEach(function(httpBody, httpBodyIndex) {
				   httpBody.monitoredLabel = messages[httpBodyIndex].monitoredLabel;
			   });
			   
			   resolve({httpBodies:batchResponse.httpBodies});
		   }).catch(function(errorResponse) {
			   reject(errorResponse);
		   });
	   });
   }
   
   function processPart(part, message) {
	   // multipart/digest  ??? refer to http://www.w3.org/Protocols/rfc1341/7_2_Multipart.html
	   if (part.mimeType == "multipart/mixed" || part.mimeType == "multipart/alternative" || part.mimeType == "multipart/related" || part.mimeType == "multipart/relative" || part.mimeType == "multipart/parallel") {
		   part.parts.forEach(function(part) {
			   processPart(part, message);
		   });
	   } else if (part.mimeType == "text/plain") { // message/rfc822
		   message.textContent = decodeBase64UrlSafe(part.body.data);
		   //console.log("textcontent: " + message.from.name + " " + message.textContent.substring(0, 20));
	   } else if (part.mimeType == "text/html") {
		   if (part.body.data) {
			   message.content = decodeBase64UrlSafe(part.body.data);
			   
			   // Must keep content-id reference for inline images, so let's fool sanitizer to by prefixing it with "http://"
			   message.content = message.content.replace(/src=\"cid:/g, "src=\"" + FOOL_SANITIZER_CONTENT_ID_PREFIX);
			   message.content = message.content.replace(/src=\'cid:/g, "src=\'" + FOOL_SANITIZER_CONTENT_ID_PREFIX);
			   
			   message.content = bg.html_sanitize(message.content, bg.allowAllUrls, bg.rewriteIds);
			   // just remove img altogether
			   if (message.content) {
				   message.content = message.content.replace(/<img /g, "<imghidden ");
				   message.content = message.content.replace(/\/img>/g, "/imghidden>");
			   }
		   }
	   } else if (part.filename) {
		   message.files.push(part);
	   } else {
		   console.error("must add logic for mimetype: " + part.mimeType, part);
	   }
   }
   
   function generateMessageFromHttpResponseMessage(httpResponseMessage) {
	   var headers = httpResponseMessage.payload.headers;
	   
	   var message = {};
	   
	   message.id = httpResponseMessage.id;
	   message.labels = httpResponseMessage.labelIds;
	   
	   message.to = [];
	   message.cc = [];
	   message.bcc = [];
	   
	   message.files = [];
	   
	   message.date = getDateFromHttpResponseMessage(httpResponseMessage);

	   var subject = MyGAPIClient.getHeaderValue(headers, "Subject");
	   
	   var from = MyGAPIClient.getHeaderValue(headers, "From");
	   message.from = parseAddresses(from).first();
	   
	   var to = MyGAPIClient.getHeaderValue(headers, "To");
	   message.to = parseAddresses(to);
	   var cc = MyGAPIClient.getHeaderValue(headers, "CC");
	   message.cc = parseAddresses(cc);
	   var bcc = MyGAPIClient.getHeaderValue(headers, "BCC");
	   message.bcc = parseAddresses(bcc);

	   processPart(httpResponseMessage.payload, message);
	   
	   // if no text content then use the html content
	   if (!message.textContent) {
		   if (message.content) {
			   message.textContent = message.content.htmlToText();
		   }
		   if (!message.textContent) {
			   message.textContent = "";
		   }
	   }
	   
	   // if no html content then use the text content
	   if (!message.content) {
		   if (message.textContent) {
			   message.content = message.textContent.replace(/\n/g, "<br/>");
			   message.content = bg.html_sanitize(message.content, bg.allowAllUrls, bg.rewriteIds);
		   }
		   if (!message.content) {
			   message.content = "";
		   }
	   }
	   
	   message.textContent = filterEmailBody(subject, message.textContent);
	   message.textContent = Encoder.XSSEncode(message.textContent, true);

	   return message;
   }
   
   function getDateFromHttpResponseMessage(httpResponseMessage) {
	   var headers = httpResponseMessage.payload.headers;

	   var date = MyGAPIClient.getHeaderValue(headers, "Date");
	   if (date) {
		   date = new Date(date);
		   if (isNaN(date.getTime())) {
			   console.error("could not parse date: " + date);
			   date = new Date();
		   }
	   } else {
		   console.error("date header not found");
		   date = new Date();
	   }
	   return date;
   }
   
   function fetchUnreadCount(labelIds) {
	   console.log("fetchUnreadCount");
	   
	   return new Promise(function(resolve, reject) {
		   var mygapiClient = getMyGAPIClient();
		   
		   labelIds.forEach(function(labelId) {
			   var path = GmailAPI.PATH + "labels/";
			   if (labelId == SYSTEM_ALL_MAIL) {
				   path += GmailAPI.labels.UNREAD;
			   } else {
				   path += getGmailAPILabelId(labelId);
			   }
			   
			   var httpRequest = mygapiClient.request({
				   method: "GET",
				   path: path
			   });
			   mygapiClient.HttpBatch.add(httpRequest);
		   });

		   mygapiClient.HttpBatch.execute({oauthRequest:bg.oAuthForEmails, email:mailAddress}).then(function(batchResponse) {
			   var unreadCount = 0;
			   batchResponse.httpBodies.forEach(function(httpBody) {
				   if (that.getSetting("conversationView")) {
					   unreadCount += httpBody.threadsUnread;
				   } else {
					   unreadCount += httpBody.messagesUnread;
				   }
			   });
			   resolve(unreadCount);
		   }).catch(function(errorResponse) {
			   reject(errorResponse);
		   });
	   });
   }
   
   function getHistoryForFirstTime() {
	   return new Promise(function(resolve, reject) {
		   bg.oAuthForEmails.send({userEmail:mailAddress, url: GmailAPI.URL + "profile"}, function(response) {
			   if (response.error) {
				   reject(response);
			   } else {
				   var data = JSON.parse(response.jqXHR.responseText);
				   resolve(data);
			   }
		   });
	   });
   }
   
   function getHistory(params) {
	   console.log("getHistory");
	   return new Promise(function(resolve, reject) {
		   // Fetch the latest historyid by passing the history id of the last message. I'm only passing the labelid=inbox to minimize response data
		   var sendParams = {userEmail:mailAddress, url: GmailAPI.URL + "history?maxResults=" + MAX_EMAILS_HISTORIES, data:{startHistoryId:params.historyId}};
		   if (params.labelId == SYSTEM_ALL_MAIL) {
			   // do not send any label id params
		   } else {
			   sendParams.data.labelId = params.labelId;
		   }
		   bg.oAuthForEmails.send(sendParams, function(historyResponse) {
			   if (historyResponse.error) {
				   if (historyResponse.code == 404) {
					   historyResponse.jreason = JError.HISTORY_INVALID_OR_OUT_OF_DATE;
				   }
				   reject(historyResponse);
			   } else {
				   data = JSON.parse(historyResponse.jqXHR.responseText);
				   data.historyLabelId = params.labelId;
				   resolve(data);
			   }
		   });
	   });
   }
   
   this.fetchAttachment = function(params) {
	   console.log("fetchAttachment");
	   return new Promise(function(resolve, reject) {
		   
		   if (!params.noSizeLimit && params.size > FETCH_ATTACHMENT_MAX_SIZE) {
			   reject({error:"Size too large"});
			   return;
		   }
		   
		   var sendParams = {userEmail:mailAddress, url: GmailAPI.URL + "messages/" + params.messageId + "/attachments/" + params.attachmentId};
		   bg.oAuthForEmails.send(sendParams, function(historyResponse) {
			   if (historyResponse.error) {
				   reject(historyResponse);
			   } else {
				   response = JSON.parse(historyResponse.jqXHR.responseText);
				   // Because API returns base64 url safe strings
				   response.data = replaceBase64UrlSafeCharacters(response.data);

				   resolve(response);
			   }
		   });
	   });
   }
   
   function executeMailAction(params) {
	   console.log("in executeMailAction", params);
	   return postAction(params, function(postActionCBParams) {
		   console.log("after postaction", postActionCBParams);
		   if (postActionCBParams.error) {
			   logError("error executing postaction: " + postActionCBParams.error);
		   } else {
			   
			   if (Settings.read("accountAddingMethod") == "autoDetect") {
				   that.getEmails(function() {
					   bg.mailUpdate();
				   });
			   } else {
				   // let's save some quota and not call .getEmails
				   
				   var removedEmail;
				   
				   if (params.action == MailAction.MARK_AS_READ || params.action == MailAction.DELETE || params.action == MailAction.ARCHIVE || params.action == MailAction.MARK_AS_SPAM || (params.action == MailAction.REMOVE_LABEL && params.mail && params.mail.monitoredLabel == params.label)) {
					   if (that.removeMail(params.mail.id)) {
						   removedEmail = true;
						   --unreadCount; // account specific (not the global bg.unreadCount)
						   console.log("removemail unreadcount: " + unreadCount);
					   }
				   }
				   
				   if (removedEmail && !params.instantlyUpdatedCount) {
					   // use bg.unreadCount because that is the global unreadcount (as opposed to just unreadCount which is local to this mailAccount)
					   var newBadgeCount = bg.unreadCount - 1;
					   console.log("updatebadge: " + newBadgeCount);
					   updateBadge(newBadgeCount);
				   }
				   
				   /*
				   var removeMail = false;
				   if (params.action != MailAction.STAR && params.action != MailAction.REMOVE_STAR && params.action != MailAction.APPLY_LABEL) {
					   if (params.action == MailAction.MARK_AS_UNREAD) {
						   // do nothing
					   } else if (params.action == MailAction.REMOVE_LABEL) {
						   if (params.label == params.mail.monitoredLabel) {
							   removeMail = true;
						   } else {
							   // do nothing because we were never monitoring this label anyways
						   }
					   } else {
						   removeMail = true;
					   }
					   
					   if (removeMail) {
						   if (that.removeMail(params.mail.id)) {
							   --unreadCount; // account specific (not the global bg.unreadCount)
							   console.log("removemail unreadcount: " + unreadCount);
							   // don't update badge again if were already in popup
							   if (params.source != "popup") {
								   console.log("params source: " + params.source);
								   console.log("updatebadge: " + (bg.unreadCount-1));
								   // use bg.unreadCount because that is the global unreadcount (as opposed to just unreadCount which is local to this mailAccount)
								   updateBadge(bg.unreadCount-1);
							   }
						   }
					   }
				   }
				   */
			   }
			   
			   if (params.postActionCallback) {
				   console.log("postActionCallback");
				   params.postActionCallback();
			   }
		   }
		   if (params.callback) {
			   console.log("executeMailAction callback");
			   params.callback(postActionCBParams);
		   }
	   });
   }

   function postAction(params, callback) {
	   console.log("in postAction", arguments);
	   var dfd = new $.Deferred();
	   
	   if (!callback) {
		   callback = function() {};
	   }
	   
	   if (Settings.read("accountAddingMethod") == "autoDetect") {
		   if (gmailAt == null) {
			   getAt(function() {
				   if (gmailAt) {
					   return postAction(params, callback);
				   } else {
					   var error = "could not get AT";
					   logError(error);
					   callback({error:error});
					   dfd.reject(error);
				   }
			   });
		   } else {
			   var ACT_PARAM_NAME = "act=";
			   var actionParams;
			   if (params.action == MailAction.MARK_AS_READ) {
				   actionParams = ACT_PARAM_NAME + "rd";
			   } else if (params.action == MailAction.MARK_AS_UNREAD) {
				   actionParams = ACT_PARAM_NAME + "ur";
			   } else if (params.action == MailAction.DELETE) {
				   actionParams = ACT_PARAM_NAME + "tr";
			   } else if (params.action == MailAction.ARCHIVE) {
				   actionParams = ACT_PARAM_NAME + "arch";
			   } else if (params.action == MailAction.MARK_AS_SPAM) {
				   actionParams = ACT_PARAM_NAME + "sp";
			   } else if (params.action == MailAction.APPLY_LABEL) {
				   actionParams = ACT_PARAM_NAME + "ac_" + encodeURIComponent(params.label);
			   } else if (params.action == MailAction.REMOVE_LABEL) {
				   actionParams = ACT_PARAM_NAME + "rc_" + encodeURIComponent(params.label);
			   } else if (params.action == MailAction.STAR) {
			   	   if (params.mail.labels.first() == SYSTEM_INBOX) { //inbox usually
			   		   actionParams = ACT_PARAM_NAME + "st";
			   	   } else {
					   actionParams = "tact=st&nvp_tbu_go=Go&s=a";
				   }
			   } else if (params.action == MailAction.REPLY) {
				   var replyAllQueryStr = params.replyAllFlag ? "a" : "o";
				   actionParams = "v=b&qrt=n&fv=cv&cs=qfnq&rm=" + params.mail.id + "&th=" + params.mail.id + "&qrr=" + replyAllQueryStr + "&body=" + encodeURIComponent(params.message) + "&nvp_bu_send=Send&haot=qt&redir=?v=c";
			   } else {
				   var error = "action not found: " + params.action;
				   logError(error);
				   callback({error:error});
				   dfd.reject(error);
				   return;
			   }
			   
			   
			   var postURL = that.getMailUrl({useBasicGmailUrl:true}).replace("http:", "https:");
			   postURL += Math.ceil(1000000 * Math.random()) + "/";
			   var postParams = "t=" + params.mail.id + "&at=" + gmailAt + "&" + actionParams;

			   var postXHR = new XMLHttpRequest();
			   postXHR.onreadystatechange = function () {
				   //console.log("in postaction: " + postURL + ": " + this.readyState + " __ " + this.status);
				   if (this.readyState == 4 && this.status == 200) {
					   callback({});
					   dfd.resolve("success");
				   } else if (this.readyState == 4 && this.status == 401) {
					   callback({error:"Unauthorized"});
					   dfd.reject("Unauthorized");
				   }
			   }
			   postXHR.onerror = function (error) {
				   callback({error:error});
				   dfd.reject(error);
			   }

			   postXHR.open("POST", postURL, true);
			   postXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			   postXHR.send(postParams);
			   
			   if (params.action == MailAction.DELETE || params.action == MailAction.MARK_AS_READ || params.action == MailAction.ARCHIVE) {
				   if (localStorage["_conversationView"] == "false" && !localStorage["_conversationViewWarningShown"]) {
					   createTab("http://jasonsavard.com/wiki/Conversation_View_issue");
					   localStorage["_conversationViewWarningShown"] = new Date();
				   }
			   }
		   }		   
	   } else { // oauth submit

		   function executeGmailAPIAction(params, callback) {
			   // save the quota by using messages vs threads depending on conversation view
			   var requestPath;
			   
			   // is request path overridden here?
			   if (params.requestPath) {
				   requestPath = params.requestPath;
			   } else {
				   var gmailAPIaction = params.gmailAPIaction;
				   // default action is modify
				   if (!gmailAPIaction) {
					   gmailAPIaction = "modify";
				   }
				   if (params.mail.account.getSetting("conversationView")) {
					   requestPath = "threads/" + params.mail.threadId + "/" + gmailAPIaction;
				   } else {
					   requestPath = "messages/" + params.mail.id + "/" + gmailAPIaction;
				   }
			   }
			   
			   var sendParams = {userEmail:mailAddress, type:"POST", contentType:"application/json", processData:false, url: GmailAPI.URL + requestPath};
			   if (params.data) {
				   sendParams.data = JSON.stringify(params.data);
			   }
			   bg.oAuthForEmails.send(sendParams, function(response) {
				   if (response.error) {
					   callback(response);
					   dfd.reject(response.error);
				   } else {
					   data = JSON.parse(response.jqXHR.responseText);
					   
					   console.log("execute history response", data);
					   //that.userActionedHistoryIds.push(data.id); Gmail API not working
					   
					   callback(data);
					   dfd.resolve("success");
				   }
			   });
		   }
		   
		   if (params.action == MailAction.MARK_AS_READ) {
			   params.data = {removeLabelIds:[GmailAPI.labels.UNREAD]};
			   executeGmailAPIAction(params, callback);
		   } else if (params.action == MailAction.MARK_AS_UNREAD) {
			   params.data = {addLabelIds:[GmailAPI.labels.UNREAD]};
			   executeGmailAPIAction(params, callback);
		   } else if (params.action == MailAction.DELETE) {
			   params.gmailAPIaction = "trash";
			   executeGmailAPIAction(params, callback);
		   } else if (params.action == MailAction.ARCHIVE) {
			   params.data = {removeLabelIds:[GmailAPI.labels.INBOX]};
			   executeGmailAPIAction(params, callback);
		   } else if (params.action == MailAction.MARK_AS_SPAM) {
			   params.data = {addLabelIds:[GmailAPI.labels.SPAM]};
			   executeGmailAPIAction(params, callback);
		   } else if (params.action == MailAction.APPLY_LABEL) {
			   params.data = {addLabelIds:[params.label]};
			   executeGmailAPIAction(params, function(executeResponseParams) {
				   params.mail.labels.push(params.label);
				   callback(executeResponseParams);
			   });
		   } else if (params.action == MailAction.REMOVE_LABEL) {
			   params.data = {removeLabelIds:[params.label]};
			   executeGmailAPIAction(params, function(executeResponseParams) {
				   var foundIndex = params.mail.labels.indexOf(params.label);
				   params.mail.labels.splice(foundIndex, 1);
				   callback(executeResponseParams);
			   });
		   } else if (params.action == MailAction.STAR) {
			   params.data = {addLabelIds:[GmailAPI.labels.STARRED]};
			   executeGmailAPIAction(params, callback);
		   } else if (params.action == MailAction.REMOVE_STAR) {
			   params.data = {removeLabelIds:[GmailAPI.labels.STARRED]};
			   executeGmailAPIAction(params, callback);
		   } else if (params.action == MailAction.REPLY) {
			   var replyObj = params.mail.generateReplyObject(params);

			   var mimeMessage = "";
			   mimeMessage += "MIME-Version: 1.0" + "\n";
			   mimeMessage += "In-Reply-To: " + params.mail.messageId + "\n";
			   mimeMessage += "References: " + params.mail.messageId + "\n";
			   
			   var alias = that.getSetting("alias");
			   var fromStr = "";
			   if (alias) {
				   fromStr = alias + " ";
			   }
			   fromStr += "<" + that.getAddress() + ">"
			   mimeMessage += "From: " + fromStr + "\n";
			   
			   var toStr = "";
			   replyObj.tos.forEach(function(to, index) {
				   if (index != 0) {
					   toStr += ", ";
				   }
				   toStr += to.name + " <" + to.email + ">";
			   });
			   mimeMessage += "To: " + toStr + "\n";

			   if (replyObj.ccs && replyObj.ccs.length) {
				   var ccStr = "";
				   replyObj.ccs.forEach(function(cc, index) {
					   if (index != 0) {
						   ccStr += ", ";
					   }
					   ccStr += cc.name + " <" + cc.email + ">";
				   });
				   mimeMessage += "Cc: " + ccStr + "\n";
			   }

			   mimeMessage += "Subject: " + params.mail.title + "\n";
			   mimeMessage += "Content-Type: text/plain" + "\n";
			   mimeMessage += "\n";
			   mimeMessage += params.message;

			   params.requestPath = "messages/send";
			   params.data = {raw:encodeBase64UrlSafe(mimeMessage), threadId:params.mail.threadId};
			   executeGmailAPIAction(params, callback);
		   } else {
			   var error = "action not found: " + params.action;
			   logError(error);
			   callback({error:error});
			   dfd.reject(error);
			   return;
		   }
	   }
	   
	   return dfd.promise(); 
   }

   // Opens the basic HTML version of Gmail and fetches the Gmail_AT value needed for POST's
   function getAt(callback) {
	   var url = that.getMailUrl({useBasicGmailUrl:true}) + Math.ceil(1000000 * Math.random()) + "/?ui=html&zy=c";
	   var gat_xhr = new XMLHttpRequest();
	   gat_xhr.onreadystatechange = function () {
		   if (this.readyState == 4 && this.status == 200 && this.responseText) {
			   var matches = this.responseText.match(/\at=([^"]+)/);
			   if (matches != null && matches.length > 0) {
				   gmailAt = matches[1];
				   console.log("get at: " + gmailAt);
				   if (callback != null) {
					   callback();
				   }
			   }
		   } else if (this.readyState == 4 && this.status == 401) {

		   }
	   }
	   gat_xhr.onerror = function (error) {
		   logError("get gmail_at error: " + error);
	   }
	   gat_xhr.open("GET", url, true);
	   gat_xhr.send(null);
   }

   // Opens the inbox
   this.openInbox = function (params) {
	   console.log("openinbox");
	   params = initUndefinedObject(params);

	   params.label = that.getOpenLabel();
	   params.useGmailUI = true;
	   	
	   if (params.openInNewTab) {
		   var newURL = that.getMailUrl(params);
		   createTab(newURL);
	   } else {
		   that.findOrOpenGmailTab(params);
	   }
   }
   
   this.openLabel = function(label) {
	   that.findOrOpenGmailTab({label:label});
   }
   
   this.openSearch = function(searchStr, params) {
	   params = initUndefinedObject(params);
	   
	   params.label = "search";
	   params.searchStr = searchStr;
	   params.detectInboxByGmail = false;
	   that.findOrOpenGmailTab(params);
   }
   
   this.openMessageById = function(params) {
	   if (!params.label) {
		   params.label = SYSTEM_ALL_MAIL;
	   }
	   
	   that.findOrOpenGmailTab(params);
   }
   
   function loadMailInGmailTab(params, callback) {
	   // focus window
	   chrome.windows.update(params.tab.windowId, {focused:true}, function() {
		   
		   // focus/update tab
		   var newURL = params.account.getMailUrl(params);
		   
		   // if same url then don't pass url parameter or else chrome will reload the tab
		   if (params.tab.url == newURL) {
			   chrome.tabs.update(params.tab.id, {active:true}, callback);
		   } else {
			   chrome.tabs.update(params.tab.id, {active:true, url:newURL}, callback);

			   // patch for issue when your newly composing an email, it seems if you navigate away Gmail with change the url back #compose after this initial change, so we have to change it twice with a delay
			   if (params.tab.url.endsWith("#compose")) {
				   setTimeout(function() {
					   chrome.tabs.update(params.tab.id, {active:true, url:newURL}, callback);
				   }, 3000);
			   }
		   }
		   
	   });
   }
   
   this.findOrOpenGmailTab = function(params) {
	   // unless overridden, then set default to true
	   if (params.detectInboxByGmail !== false) {
		   params.detectInboxByGmail = true;
	   }
	   params.useGmailUI = true;
	   
	   var mailUrl = that.getMailUrl(params);

	   var domainAndPath;
	   var multiAccountPath;
	   var firstMultiAccountPath;
	   
	   if (that.getSetting("openLinksToInboxByGmail")) {
		   domainAndPath = INBOX_BY_GMAIL_DOMAIN_AND_PATH;
		   multiAccountPath = "/u/";
		   firstMultiAccountPath = "/u/0";
	   } else {
		   domainAndPath = MAIL_DOMAIN_AND_PATH;
		   multiAccountPath = "/mail(/ca)?/u/";
		   firstMultiAccountPath = "/mail/u/0";
	   }
	   
	   // get all gmail windows
	   chrome.tabs.query({url:domainAndPath + "*"}, function(tabs) {
		   
		   var defaultMailURLTab;
		   var exactMailURLTab;

		   $.each(tabs, function(index, tab) {
			   // apparently a launching Gmail in Chrome application shortcut is windowType = "popup" ???		   
			   if (!tab.url.match(multiAccountPath)) {
				   // no account # appended so could be the default url /mail/ (ie. NOT /mail/u/0/ etc..
				   defaultMailURLTab = tab;
				   params.account = getAccountById(0);
			   } else if (tab.url.match(multiAccountPath + that.id)) {
				   exactMailURLTab = tab;
				   params.account = getAccountById(that.id);
				   return false;
			   }
		   });
		   
		   // if 1st account then look for default url just /mail/ and not /mail/u/0/
		   if (mailUrl.indexOf(firstMultiAccountPath) != -1 && defaultMailURLTab) {
			   params.tab = defaultMailURLTab;
			   loadMailInGmailTab(params);
		   } else if (exactMailURLTab) {
			   params.tab = exactMailURLTab;
			   loadMailInGmailTab(params);
		   } else {
			   if (params.noMatchingTabFunction) {
				   params.noMatchingTabFunction(mailUrl);
			   } else {
				   createTab(mailUrl);
			   }
		   }
		   
	   });
	   
	   if (params.mail && !that.getSetting("openLinksToInboxByGmail")) {
		   params.mail.markAsRead(function() {
			   that.getEmails(function() {
				   bg.mailUpdate();
			   });
		   });
	   }
	   
   }

   // Fetches content of thread
   function fetchThread(params, callback) {
	   var dfd = new $.Deferred();
	   
	   var mail = params.mail;
	   
	   if (!callback) {
		   callback = function() {};
	   }

	   console.log("fetchthread: " + mail.title);
	   
	   var url = that.getMailUrl({useBasicGmailUrl:true}).replace('http:', 'https:') + Math.ceil(1000000 * Math.random()) + "/?v=pt&th=" + mail.id;
	   
	   $.ajax({
		   type: "GET",
		   timeout: requestTimeout,
		   url: url,
		   complete: function(jqXHR, textStatus) {

			   if (textStatus == "success") {

				   mail.messages = [];

				   // patch 101 to not load any images because apparently $("<img src='abc.gif'");  will load the image even if not displayed
				   var responseText = jqXHR.responseText;
				   
				   if (!params.forceDisplayImages) {
					   // just remove img altogether
					   if (responseText) {
						   responseText = responseText.replace(/<img /g, "<imghidden ");
						   responseText = responseText.replace(/\/img>/g, "/imghidden>");
					   }
				   }
				   
				   // need to add wrapper so that this jquery call workes "> table" ???
				   // patch for error "Code generation from strings disallowed for this context"
				   // the error would occur if I use jQuery's .append but not!!! if I initially set the content with $()
				   var $responseWrapper = $("<div id='$responseWrapper'>" + responseText + "</div>");

				   // before google changed print page layout
				   var $tables = $responseWrapper.find("> table");
				   if ($tables.length) {
					   $tables = $tables.splice(0, 1);
				   } else {
					   // new layout
					   $tables = $responseWrapper.find(".maincontent .message");
				   }
				   
				   if ($tables.length && $tables.each) {
					   $tables.each(function(i) {
						   
						   var message = {};
						   message.to = [];
						   message.cc = [];
						   message.bcc = [];
						   
						   var $messageNode = $(this);
						   
						   // get from via by parsing this string:  John Poon <blah@hotmail.com>
						   var from = $messageNode.find("tr:eq(0)").find("td").first().text();
						   message.from = parseAddresses(from).first();

						   // get date from first line ex. Chloe De Smet Allègre via LinkedIn <member@linkedin.com>	 Sun, Jan 8, 2012 at 12:14 PM
						   message.dateStr = $.trim( $messageNode.find("tr:first").find("td").last().text() );
						   if (message.dateStr) {
							   message.date = parseGoogleDate(message.dateStr); // "Thu, Mar 8, 2012 at 12:58 AM";
						   }

						   // get to/CC
						   var $toCCHTML = $messageNode.find("tr:eq(1)").find("td");

						   var divs = $toCCHTML.find("div");							   
						   divs.each(function(i) {

							   // if 2 divs the first line is usually the reply-to line so ignore it
							   if (i == 0 && divs.length >= 2 && divs.eq(1).text().toLowerCase().indexOf("cc:") == -1) {
								   return true;
							   }
							   // remove to:, cc: etc...
							   var emails = $(this).text();
							   emails = emails.replace(/.*:/, "");
							   
							   if ($(this).text().toLowerCase().indexOf("bcc:") != -1) {
								   message.bcc = parseAddresses(emails);
							   } else if ($(this).text().toLowerCase().indexOf("to:") != -1) {
								   message.to = parseAddresses(emails);
							   } else if ($(this).text().toLowerCase().indexOf("cc:") != -1) {
								   message.cc = parseAddresses(emails);
							   } else {
								   // could not detect to or cc, could be in another language like chinese "收件者："
								   message.to = parseAddresses(emails);
							   }

						   });

						   var $gmailPrintContent = $messageNode.find("> tbody > tr:last-child table td");
						   message.content = $gmailPrintContent.html();
						   
						   //message.textContent = htmlToText(message.content);
						   message.textContent = convertGmailPrintHtmlToText($gmailPrintContent);
						   
						   // cut the summary to lines before the [Quoted text hidden] (in any language)
						   var quotedTextHiddenArray = new Array("Quoted text hidden", "Texte des messages précédents masqué");
						   for (var a=0; a<quotedTextHiddenArray.length; a++) {
							   var idx = message.textContent.indexOf("[" + quotedTextHiddenArray[a] + "]");
							   if (idx != -1) {
								   message.textContent = message.textContent.substring(0, idx);
								   break;
							   }
						   }
						   
						   message.textContent = filterEmailBody(mail.title, message.textContent);
						   message.textContent = Encoder.XSSEncode(message.textContent, true);
						   
						   mail.messages.push(message);
					   });
				   } else {
					   var message = {};
					   console.warn("Could not parse body from print page: ", $responseWrapper);
					   message.from = {name:mail.getName(), email:mail.authorMail}; 
					   message.content = $responseWrapper.html();
					   
					   // remove script tags to bypass content_security_policy
					   message.content = message.content.replaceAll("<script", "<div style='display:none'");
					   message.content = message.content.replaceAll("</script>", "</div>");
					   
					   message.textContent = convertGmailPrintHtmlToText($responseWrapper);
					   message.textContent = Encoder.XSSEncode(mail.textContent, true);
					   mail.messages.push(message);
				   }
				   
				   callback({mail:mail});
				   dfd.resolve("success");			   

			   } else {
				   var error = jqXHR.statusText;
				   callback({error:error});
				   dfd.reject(error);
			   }
		   }
	   });
	   
	   countEvent("fetchThread");

	   return dfd.promise();
   }
   
   this.getSetting = function(attributeName, settingsName) {
	   
	   // if no settingsname passed just use attribute
	   if (!settingsName) {
		   settingsName = attributeName;
	   }
	   
	   var emailSettings = Settings.read("emailSettings");
	   if (emailSettings) {
		   var accountEmailSettings = emailSettings[that.getAddress()];
		   if (accountEmailSettings) {
			   if (accountEmailSettings[attributeName] != undefined) {
				   return accountEmailSettings[attributeName];
			   } else {
				   return Settings.read(settingsName);
			   }
		   } else {
			   return Settings.read(settingsName);
		   }
	   } else {
		   return Settings.read(settingsName);
	   }
   }
   
   this.getMonitorLabels = function() {	   
	   var monitorLabels = that.getSetting("monitorLabel", "monitor_label");
	   return monitorLabels;
   }
   
   this.getFirstMonitoredLabel = function(gmailAPILabelIds) {
	   var monitoredLabels = that.getMonitorLabels();
	   for (var a=0; a<monitoredLabels.length; a++) {
		   for (var b=0; b<gmailAPILabelIds.length; b++) {
			   if (getGmailAPILabelId(monitoredLabels[a]) == gmailAPILabelIds[b]) {
				   return monitoredLabels[a];
			   }
		   }
	   }
   }

   this.getOpenLabel = function() {
	   var openLabel = that.getSetting("openLabel", "open_label");
	   return openLabel;
  }

   // Retrieves unread count
   this.getUnreadCount = function () {
	   if (unreadCount <= 0) {
		   return 0;
	   } else {
		   return unreadCount;
	   }
   }
   
   this.getEmailDisplayName = function() {
	   var alias = that.getSetting("alias");
	   if (alias) {
		   return alias;
	   } else {
		   return that.getAddress();
	   }
   }

   this.getMailUrl = function (params) {
	   params = initUndefinedObject(params);
	   
	   var mailUrl;
	   var mailPath;
	   var usingInboxByGmail;

	   if (params.detectInboxByGmail && that.getSetting("openLinksToInboxByGmail")) {
		   mailUrl = INBOX_BY_GMAIL_DOMAIN;
		   mailPath = INBOX_BY_GMAIL_PATH;
		   usingInboxByGmail = true;
	   } else {
		   mailUrl = MAIL_DOMAIN;
		   mailPath = MAIL_PATH;
	   }
	   
	   if (accountParams.domain != null) {
		   // This is a GAFYD account
		   mailUrl += "/a/" + accountParams.domain + "/";
	   } else if (that.id != null && !that.mustResync) {
		   // This is a Google account with multiple sessions activated
		   if (params.useBasicGmailUrl || (!params.useStandardGmailUrl && Settings.read("useBasicHTMLView"))) {
			   mailUrl = MAIL_DOMAIN_AND_PATH + "u/" + that.id + "/h/";
		   } else {
			   mailUrl += mailPath + "u/" + that.id + "/";
		   }
	   } else {
		   // Standard one-session Gmail account
		   console.trace("no account id");
		   mailUrl += mailPath;
		   if (params.useGmailUI && that.mustResync) {
			   // only for gmail (not for Inbox by Gmail because it does not support authuser parameter)
			   if (!usingInboxByGmail) {
				   mailUrl = setUrlParam(mailUrl, "authuser", that.getAddress());
			   }
			   // leave some grace time for user to sign in if they get they are prompted for password to sign into their gmail
			   // stop previous timer (if any)
			   clearTimeout(syncSignInIdTimer);
			   if (that.resyncAttempts > 0) {
				   syncSignInIdTimer = setTimeout(function() {
					   that.resyncAttempts--;
					   that.syncSignInId().then(function() {
						   serializeOauthAccounts();
						   that.mustResync = false;
					   }).catch(function(errorResponse) {
						   console.error("syncsignin error: " + errorResponse);
					   });
				   }, seconds(20));
			   }
		   }
	   }
	   
	   if (params.useGmailUI && !usingInboxByGmail) {
	   	   var labelToUse;
	   	   if (params.label != undefined) {
	   		   labelToUse = params.label;
	   	   } else {
	   		   if (Settings.read("accountAddingMethod") == "autoDetect") {
		   		   labelToUse = params.mail.labels.first();
	   		   } else {
	   			   //labelToUse = params.mail.account.getFirstMonitoredLabel(params.mail.labels);
	   			   //labelToUse = getJSystemLabelId(id);
	   			   labelToUse = params.mail.monitoredLabel;
	   		   }
	   	   }
	   	   
	   	   if (labelToUse == SYSTEM_INBOX || labelToUse == SYSTEM_IMPORTANT || labelToUse == SYSTEM_IMPORTANT_IN_INBOX || labelToUse == SYSTEM_PRIMARY || labelToUse == SYSTEM_SOCIAL || labelToUse == SYSTEM_PROMOTIONS || labelToUse == SYSTEM_UPDATES || labelToUse == SYSTEM_FORUMS) {
	   		   labelToUse = "inbox"; // mbox changed to inbox
	   	   } else if (labelToUse == SYSTEM_ALL_MAIL) {
	   		   labelToUse = "all";
	   	   } else if (labelToUse == SYSTEM_UNREAD) {
	   		   labelToUse = "search/l:unread";
	   	   } else if (labelToUse == "search") {
	   		   var searchStrFormatted = encodeURIComponent(params.searchStr);
	   		   searchStrFormatted = searchStrFormatted.replace(/%20/g, "+");
	   		   labelToUse = "search/" + searchStrFormatted;
	   	   } else {
	   		   if (params.mail) {
	   			   labelToUse = params.mail.account.getLabelName(labelToUse);
	   		   } else {
	   			   labelToUse = that.getLabelName(labelToUse);
	   		   }
	   		   labelToUse = "label/" + labelToUse;
	   	   }
	   	   
	   	   mailUrl += "#" + labelToUse;
	   	   
	   	   var messageId;
	   	   
	   	   // passed directly
	   	   if (params.messageId) {
	   		   messageId = params.messageId;
	   	   } else if (params.mail) { // passed via mail object
	   		   messageId = params.mail.id;
	   	   }
	   	   
		   if (messageId) {
		   	   if (Settings.read("useBasicHTMLView")) {
		   		   mailUrl = setUrlParam(mailUrl, "th", messageId);
		   	   } else {
		   		   mailUrl += "/" + messageId;
		   	   }
		   }   

	   }
	   
	   if (params.urlParams) {
		   if (mailUrl.indexOf("?") != -1) {
			   mailUrl += "&"
		   } else {
			   mailUrl += "?";
		   }
		   mailUrl += params.urlParams;
	   }
	   
	   return mailUrl;
   }
   
   // Returns the email address for the current account
   this.getAddress = function () {
	   if (mailAddress) {
		   return mailAddress;
	   } else {
		   return that.getMailUrl();
	   }
   }
   
   this.hasBeenIdentified = function() {
	   return mailAddress;
   }

   // Returns the mail array
   this.getMail = function () {
	   return mailArray;
   }
   
   this.getMailIndexById = function(id) {
	   for (var a=0; a<mailArray.length; a++) {
		   if (mailArray[a].id == id) {
			   return a;
		   }
	   }
	   return -1;
   }

   this.getMailById = function(id) {
	   var mailIndex = that.getMailIndexById(id);
	   if (mailIndex != -1) {
		   return mailArray[mailIndex];
	   }
   }
   
   this.removeMail = function(id) {
	   var mailIndex = that.getMailIndexById(id);
	   if (mailIndex != -1) {
		   return mailArray.splice(mailIndex, 1);
	   }
   }

   // Returns the newest mail
   this.getNewestMail = function () {
	   return newestMailArray.first();
   }

   // Returns the newest mail
   this.getAllNewestMail = function () {
	   return newestMailArray;
   }

   this.getNewAt = function () {
      getAt();
   }
   
   this.openCompose = function(params) {

	   params = initUndefinedObject(params);
	   
	   params.account = that;
	   params.url = generateComposeUrl(params);
	   
	   // generate a reply all regardless to store it for possible use later
	   params.generateReplyAll = true;
	   var urlReplyAll = generateComposeUrl(params);
	   
	   localStorage["_composeUrl"] = params.url;
	   localStorage["_composeUrlReplyAll"] = urlReplyAll;
	   
	   console.log("open compose:", params);
	   
	   if (params.replyAction) {
		   // detect if more than 1 recipient and if so we show the reply all option to user
		   if ((params.replyAll.tos && params.replyAll.tos.length >= 2) || (params.replyAll.tos && params.replyAll.tos.length == 1 && params.replyAll.ccs >= 1) || (params.ccs && params.ccs.length >= 2)) {
			   params.showReplyAllOption = true;
			   console.log("show reply all");
		   }
	   }
	   
	   openTabOrPopup(params);
   }
   
   this.detectConversationViewMode = function(callback) {
	   console.log("detecting converation mode...");
	   $.ajax({
		   type: "GET",
		   dataType: "text",
		   url: that.getMailUrl({useStandardGmailUrl:true}),
		   timeout: seconds(7),
		   complete: function(jqXHR, textStatus) {
			   var conversationViewMode = true;
			   if (textStatus == "success") {
				   var data = jqXHR.responseText;
				   if (data) {
					   // ["bx_vmb","1"] means it is disabled
					   if (data.indexOf("[\"bx_vmb\",\"1\"]") != -1) {
						   conversationViewMode = false;
					   }
				   }
				   callback({conversationViewMode:conversationViewMode});
			   } else {
				   callback({error:textStatus});
			   }
		   }
	   });
	}

   
   function fetchLabelsFromHtmlSource(callback) {
	   $.ajax({
		   type: "GET",
		   dataType: "text",
		   url: that.getMailUrl({useStandardGmailUrl:true}),
		   timeout: 7000,
		   complete: function(jqXHR, textStatus) {
			   var foundLabels = false;
			   
			   if (textStatus == "success") {
				   var data = jqXHR.responseText;
				   if (data) {
					   var labelStartStr = '["ua",';
					   var startIndex = data.indexOf(labelStartStr);
					   if (startIndex != -1) {
						   startIndex += labelStartStr.length;
						   try {
							   var endIndex = data.indexOf(']\n]', startIndex) + 3;
							   var length = endIndex - startIndex;
							   var labelsRawStr = data.substr(startIndex, length);
							   var labelsRawObj = JSON.parse(labelsRawStr);
							   
							   labels = [];
							   for (var a=labelsRawObj.length-1; a>=0; a--) {
								   var labelName = labelsRawObj[a][0];
								   if (labelName.indexOf("^") != 0) {
									   labels.push({id:labelName, name:labelName});
								   }
							   }
							   
							   foundLabels = true;
						   } catch (e) {
							   logError("An error occured while parsing labels: ", e, jqXHR);
						   }
					   } else {
						   logError("did not find label search str: " + labelStartStr);
					   }
				   }
			   } else {
				   logError("An error occured while fetching globals: " + textStatus, jqXHR);				   
			   }
			   
			   if (foundLabels) {
				   callback({labels:labels});
			   } else {
				   console.warn("trying alternative fetch for labels");
				   $.ajax({
					   type: "GET",
					   dataType: "text",
					   url: that.getMailUrl({useBasicGmailUrl:true}),
					   timeout: 7000,
					   complete: function(jqXHR, textStatus) {
						   if (textStatus == "success") {
							   var data = jqXHR.responseText;
							   if (data) {
								   var startIndex = data.indexOf("<select name=tact>");
								   if (startIndex != -1) {
									   try {
										   var endIndex = data.indexOf("</select>", startIndex);
										   var html = data.substring(startIndex, endIndex);
										   labels = [];
										   $(html).find("option").each(function() {
											   var label = $(this).attr("value");
											   if (label.indexOf("ac_") == 0) {
												   var labelName = label.substring(3);
												   labels.push({id:labelName, name:labelName});
											   }
										   });
										   
										   foundLabels = true;
									   } catch (e) {
										   logError("error parsing html2", e);
									   }
								   }
							   }
						   } else {
							   logError("An error occured while fetching globals2: " + textStatus);
						   }
						   
						   if (foundLabels) {
							   callback({labels:labels});
						   } else {
							   callback({error:"Problem loading labels, try again later!"});
						   }
					   }
				   });
			   }
		   }
	   });
   }
   
   function fetchLabels(forceRefresh, callback) {
	   if (Settings.read("accountAddingMethod") == "autoDetect") {
		   fetchLabelsFromHtmlSource(function(response) {
			   console.log("fetchlabels", response);
			   if (response.labels) {
				   response.labels.sort(function(a, b) {
					   if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
					   if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
					   return 0;
				   });
			   }
			   callback(response);
		   });
	   } else {
		   bg.oAuthForEmails.send({userEmail:mailAddress, url: GmailAPI.URL + "labels"}, function(response) {
			   if (response.error) {
				   callback(response);
			   } else {
				   var responseObj = JSON.parse(response.jqXHR.responseText);
				   labels = responseObj.labels;
				   
				   var userLabels = [];
				   for (var a=0; a<labels.length; a++) {
					   if (labels[a].type == "user") {
						   userLabels.push(labels[a]);
					   }
				   }
				   
				   userLabels.sort(function(a, b) {
					   if (a.name < b.name) return -1;
					   if (a.name > b.name) return 1;
					   return 0;
				   });
				   
				   // cache it here
				   labels = userLabels;
				   
				   callback({labels:labels});
			   }
		   });
	   }
   }

   this.getLabels = function(forceRefresh, callback) {
	   callback = initUndefinedCallback(callback);
	   
	   // if params is a function then it's probably the callback
	   if ($.isFunction(forceRefresh)) {
		   callback = forceRefresh;
	   }
	   
	   if (labels && forceRefresh !== true) {
		   callback({labels:labels});
	   } else {
		   fetchLabels(forceRefresh, callback);
 	   }
   }

   // Construct a new mail object
   function MailObject() {

	   var that = this;
	   
	   this.allFiles = [];
	   
	   this.queueFile = function(messageId, file) {
			var queuedFile = {filename:file.filename, size:file.body.size};
			queuedFile.fetchPromise = that.account.fetchAttachment({messageId:messageId, attachmentId:file.body.attachmentId, size:file.body.size});
			that.allFiles.push(queuedFile);
			return queuedFile;
	   }
	   
	   this.getName = function(parsedAddress) {
		   
		   var name;
		   var email;
		   
		   // if message is passed used the 
		   if (parsedAddress) {
			   name = parsedAddress.name;
			   email = parsedAddress.email;
		   } else {
			   name = that.authorName;
			   email = that.authorMail;
		   }

		   if (name == null || name.length < 1) {
			   if (email) {
				   name = email.split("@")[0];
			   } else {
				   name = email;
			   }
			   return name;
		   } else {
			   return $.trim(name);
		   }
	   }

	   this.getShortName = function() {
		   var name = that.getName();
		   if (name) {
			   name = name.split(" ")[0];
		   }
		   return name;
	   }

	   this.open = function(params) {
		   params = initUndefinedObject(params);
		   
		   params.mail = that;
		   params.useGmailUI = true;

		   if (params.openInNewTab) {
			   var newURL = that.account.getMailUrl(params);
			   createTab(newURL);
		   } else {
			   that.account.findOrOpenGmailTab(params);
		   }
	   }

	   // params is optional
	   this.markAsRead = function(params, callback) {
		   params = initUndefinedObject(params);

		   var executeMailActionParams = {};
		   
		   // if params is a function then it's probably the callback
		   if ($.isFunction(params)) {
			   callback = params;
			   params = {};
		   } else {
			   executeMailActionParams = clone(params);
		   }
		   
		   // append these params
		   executeMailActionParams.mail = that;
		   executeMailActionParams.action = MailAction.MARK_AS_READ;
		   executeMailActionParams.postActionCallback = function() {
			   that.lastAction = "markAsRead";
		   };
		   executeMailActionParams.callback = callback;
		   
		   return executeMailAction(executeMailActionParams);
	   }

	   this.markAsUnread = function(callback) {
		   return executeMailAction({mail:that, action:MailAction.MARK_AS_UNREAD,
			   postActionCallback:function() {
				   that.lastAction = "markAsUnread";
			   },
			   callback:callback
		   });
	   }

	   this.deleteEmail = function(params, callback) {
		   console.log("delete email");
		   params = initUndefinedObject(params);
		   
		   var executeMailActionParams = {};
		   
		   // if params is a function then it's probably the callback
		   if ($.isFunction(params)) {
			   callback = params;
			   params = {};
		   } else {
			   // must clone it because i stuck in a loop below because params was modified in .markAsRead and it in turn modified executeMailActionParams later
			   executeMailActionParams = clone(params);
		   }
		   
		   // append these params
		   executeMailActionParams.mail = that;
		   executeMailActionParams.action = MailAction.DELETE;
		   executeMailActionParams.postActionCallback = function() {
			   that.removeFromArray();
		   };
		   executeMailActionParams.callback = callback;

		   if (Settings.read("deletingMarksAsRead")) {
			   console.log("deleteemail markaread", params, callback);
			   that.markAsRead(params, function() {
				   // 2 scenarios: instantlyUpdatedCount was already executed before this method was called or markasread above should have updated the count so let's note update it again with the executeMailAction
				   executeMailActionParams.instantlyUpdatedCount = true;
				   return executeMailAction(executeMailActionParams);
			   })
		   } else {
			   return executeMailAction(executeMailActionParams);
		   }
	   }

	   this.archive = function(params, callback) {
		   params = initUndefinedObject(params);
		   
		   var executeMailActionParams = {};
		   
		   // if params is a function then it's probably the callback
		   if ($.isFunction(params)) {
			   callback = params;
			   params = {};
		   } else {
			   executeMailActionParams = clone(params);
		   }
		   
		   // append these params
		   executeMailActionParams.mail = that;
		   executeMailActionParams.action = MailAction.ARCHIVE;
		   executeMailActionParams.postActionCallback = function() {
			   that.removeFromArray();
		   };
		   executeMailActionParams.callback = callback;
		   
		   if (Settings.read("archive_read")) {
			   that.markAsRead(params, function() {
				   // 2 scenarios: instantlyUpdatedCount was already executed before this method was called or markasread above should have updated the count so let's note update it again with the executeMailAction
				   executeMailActionParams.instantlyUpdatedCount = true;
				   return executeMailAction(executeMailActionParams);									   
			   })
		   } else {
			   return executeMailAction(executeMailActionParams);
		   }
	   }

	   this.markAsSpam = function(params, callback) {
		   params = initUndefinedObject(params);

		   var executeMailActionParams = {};
		   
		   // if params is a function then it's probably the callback
		   if ($.isFunction(params)) {
			   callback = params;
			   params = {};
		   } else {
			   executeMailActionParams = clone(params);
		   }
		   
		   // append these params
		   executeMailActionParams.mail = that;
		   executeMailActionParams.action = MailAction.MARK_AS_SPAM;
		   executeMailActionParams.postActionCallback = function() {
			   that.removeFromArray();
		   };
		   executeMailActionParams.callback = callback;

		   return executeMailAction(executeMailActionParams);
	   }

	   this.moveLabel = function(newLabel, callback) {
		   console.log("move label", that.labels);
		   if (that.labels.length) {

			   var emailMightBeInInbox = false;

			   // find "possibly" inbox label: archive it first and then label it										   
			   $.each(that.labels, function(index, label) {
				   console.log("label: ", label);
				   if (isSystemLabel(label)) { // possibly inbox email
					   console.log("system label: ", label);
					   emailMightBeInInbox = true;
					   that.archive(function() {
						   return that.applyLabel(newLabel, function() {
							   if (callback) {
								   callback();
							   }
						   });
					   });
					   return false;
				   }
			   });

			   // if only 1 label (and not possibly in inbox) then remove it and apply new label
			   if (that.labels.length == 1 && !emailMightBeInInbox) {
				   that.removeLabel(that.labels.first(), function() {
					   return that.applyLabel(newLabel, function() {
						   if (callback) {
							   callback();
						   }
					   });
				   });
			   }
		   } else {
			   logError("no labels for email");
		   }
	   }

	   this.applyLabel = function(label, callback) {
		   return executeMailAction({mail:that, action:MailAction.APPLY_LABEL, label:label,
			   postActionCallback:function() {
				   // nothing
			   },
			   callback:callback
		   });									   
	   }

	   this.removeLabel = function(label, callback) {
		   console.log("remove label");
		   return executeMailAction({mail:that, action:MailAction.REMOVE_LABEL, label:label,
			   postActionCallback:function() {
				   // nothing
			   },
			   callback:callback
		   });									   
	   }

	   this.star = function(callback) {
		   return executeMailAction({mail:that, action:MailAction.STAR,
			   postActionCallback:function() {
				   // nothing
			   },
			   callback:callback
		   });
	   }

	   this.removeStar = function(callback) {
		   return executeMailAction({mail:that, action:MailAction.REMOVE_STAR,
			   postActionCallback:function() {
				   // nothing
			   },
			   callback:callback
		   });
	   }

	   this.starAndArchive = function(callback) {
		   that.star(function() {
			   return that.archive(function(response) {
				   callback(response);
			   });
		   });
	   }

	   this.postReply = function(message, replyAllFlag, callback) {
		   return executeMailAction({mail:that, action:MailAction.REPLY, message:message, replyAllFlag:replyAllFlag,
			   postActionCallback:function() {
				   // nothing
			   },
			   callback:callback
		   });
	   }

	   this.generateReplyObject = function(params) {
		   var replyObj = {replyAction:true};
		   var quotedContent;
		   console.log("generatereplyobj:", that);
		   if (that.messages) {
			   var lastMessage = that.messages.last();

			   replyObj.tos = [lastMessage.from];

			   // save replyall object for possible use later when choosing reply or reply all
			   replyObj.replyAll = {};
			   replyObj.replyAll.tos = replyObj.tos.concat(removeSelf(lastMessage.to));
			   replyObj.replyAll.ccs = removeSelf(lastMessage.cc);

			   function removeSelf(ary) {
				   for (var a=0; a<ary.length; a++) {
					   if (ary[a].email == mailAddress) {
						   ary.splice(a, 1);
						   break;
					   }
				   }
				   return ary;
			   }

			   console.log("replyallobj:", replyObj.replyAll);

			   if (params.replyAllFlag) {
				   replyObj.tos = replyObj.replyAll.tos
				   replyObj.ccs = replyObj.replyAll.ccs;
			   }

			   // used to group replies by converstion in Gmail etc.
			   var inReplyTo = lastMessage["message-id"];
			   if (inReplyTo) {
				   replyObj.inReplyTo = inReplyTo;
			   }
			   quotedContent = lastMessage.content;
		   } else {
			   var toObj = {};
			   toObj.email = that.authorMail;
			   toObj.name = that.getName();
			   replyObj.tos = [toObj];

			   quotedContent = that.summary;
		   }

		   if (params.type == "text") {
			   // text
			   var subject = Encoder.htmlDecode(that.title);
			   subject = (subject.search(/^Re: /i) > -1) ? subject : "Re: " + subject; // Add 'Re: ' if not already there
			   replyObj.subject = subject;
			   // warning: $.trim removes \r\n (and this trim was is used in the .summarize 
			   replyObj.message = "\r\n\r\n" + that.issued.toString() + " <" + that.authorMail + ">:\r\n" + Encoder.htmlDecode(that.getLastMessageText()).summarize(600); // summarize body because or else we get a 414 or 413 too long url parameters etc.;
		   } else {
			   // html
			   replyObj.subject = that.title;
			   replyObj.message = params.message + "<blockquote type='cite' style='border-left:1px solid #ccc;margin-top:20px;margin-bottom:10px;margin-left:50px;padding-left:9px'>" + quotedContent + "</blockquote>";
		   }
		   return replyObj;
	   }

	   this.reply = function(callback) {
		   var replyObject = that.generateReplyObject({type:"text"});

		   console.log("reply:", replyObject);

		   that.account.openCompose(replyObject);

		   if (Settings.read("replyingMarksAsRead")) {
			   that.markAsRead(function() {

			   });
		   }
	   }

	   this.getThread = function(params, callback) {
		   if (!params) {
			   params = {};
		   }
		   params.mail = that;

		   // for auto-detect - if already fetched thread/messages
		   // for oauth - should have aleady been fetched so just return it
		   if (params.mail.messages || Settings.read("accountAddingMethod") == "oauth") {
			   var dfd = new $.Deferred();
			   callback(params);
			   dfd.resolve("success");
			   return dfd.promise();
		   } else {
			   // refresh thread - return promise()
			   return fetchThread(params, function(response) {
				   if (callback) {
					   callback(response);
				   }
			   });
		   }
	   }
	   
	   this.getMessageById = function(id) {
		   for (var a=0;a<that.messages.length; a++) {
			   if (that.messages[a].id == id) {
				   return that.messages[a];
			   }
		   }
	   }
	   
	   this.removeMessageById = function(id) {
		   for (var a=0;a<that.messages.length; a++) {
			   if (that.messages[a].id == id) {
				   that.messages.splice(a, 1);
				   return true;
			   }
		   }
	   }

	   // params... {maxSummaryLetters:170, htmlToText:true, EOM_Message:" [" + getMessage("EOM") + "]"}
	   this.getLastMessageText = function(params) { // optional maxletters
		   if (!params) {
			   params = {};
		   }
		   var lastMessageText;
		   // if we are getting the summary from whole message than we can use the EOM, else if we use the brief summary from the atom feed we don't know for sure if it's cut off etc.
		   if (that.messages && that.messages.length) {
			   lastMessageText = that.messages.last().textContent;
			   if (lastMessageText) {
				   if (params.htmlToText) {
					   lastMessageText = lastMessageText.htmlToText();
				   }
				   if (params.maxSummaryLetters) {
					   lastMessageText = lastMessageText.summarize(params.maxSummaryLetters, Settings.read("showEOM") ? params.EOM_Message : null);
				   }
			   }
		   }

		   // can happen when could not parse body from print page
		   if (!lastMessageText) {
			   lastMessageText = that.summary;

			   if (lastMessageText) {
				   if (params.htmlToText) {
					   lastMessageText = lastMessageText.htmlToText();
				   }												
				   if (lastMessageText && params.maxSummaryLetters) {
					   // seems like ... doesn't always exist in atom feed? so cant be sure there more text
					   lastMessageText = lastMessageText.summarize(params.maxSummaryLetters);
				   }
			   }
		   }
		   
		   if (!lastMessageText) {
			   lastMessageText = "";
		   }
		   
		   return lastMessageText;
	   }

	   this.removeFromArray = function() {
		   for (var a=0; a<mailArray.length; a++) {
			   if (that.id == mailArray[a].id) {
				   mailArray.splice(a, 1);
				   break;
			   }
		   }
	   }
	   
	   this.sortMessages = function() {
		   that.messages.sort(function(message1, message2) {
			   var date1 = message1.date;
			   var date2 = message2.date;
			   if (date1.getTime() == date2.getTime()) {
				   return 0;
			   } else {
				   return date1.getTime() < date2.getTime() ? -1 : 1;
			   }
		   });
	   }

	   this.generateAuthorsNode = function(shortVersion) {
		   var $node;

		   if (Settings.read("accountAddingMethod") == "autoDetect") {
			   
			   var useMessages = that.messages && that.messages.length;
			   if (that.contributors.length >= 1) {
				   // the feed does not put the original author as first contributor if they have replied in the thread (ie. last author) so make sure they're first if so
				   var name = "someone";
				   var nextContributorIndex = 0;
				   if (useMessages) {
					   if (that.messages.first().from.email == that.contributors.last().find("email").text()) {
						   console.log("last contr is valid original author: " + that.messages.first().from.email);
						   name = that.contributors.last().find("name").text().split(" ")[0];
						   nextContributorIndex = 0;
					   } else {
						   name = that.getName(that.messages.first().from).getFirstName();
						   nextContributorIndex = 1;
					   }
				   } else {
					   if (that.contributors.length) {
						   name = that.contributors.first().find("name").text().getFirstName();
					   }
				   }
				   var html = "<span>" + name + "</span>";

				   var unreadAuthor = "<span class='unread'>" + that.getShortName() + "</span>";
				   if (useMessages) {
					   unreadAuthor += " (" + (that.messages.length) + ")";
				   }
				   // if more conversations than contributors (happens when several exchanges are done from the original author)
				   if (useMessages && that.messages.length > that.contributors.length+1) {
					   html += " .. " + unreadAuthor;
				   } else {
					   if (!useMessages || shortVersion) {
						   if (that.contributors.length == 2) {
							   html += ", ";
						   } else {
							   html += " .. ";
						   }
						   html += unreadAuthor;
					   } else {
						   if (that.contributors.length == 2) {						
							   html += ", <span>" + that.contributors.eq(nextContributorIndex).find("name").text().split(" ")[0] + "</span>";
						   } else if (that.contributors.length >= 3) {
							   //html += " .. " + unreadAuthor;
							   html += " .. <span>" + that.contributors.first().find("name").text().split(" ")[0] + "</span>";
						   }

						   html += ", " + unreadAuthor;
					   }
				   }

				   $node = $(html);
			   } else {
				   $node = $("<span/>");
				   $node
				   		.text( that.getName() )
				   		.addClass("unread")
				   		.attr("title", that.authorMail)
				   ;
			   }			   
		   } else {
			   if (that.messages.length == 1) {
				   $node = $("<span/>");
				   $node
				   		.text( that.getName() )
				   		.addClass("unread")
				   		.attr("title", that.authorMail)
				   ;
			   } else if (that.messages.length == 2) {
				   var html = "<span class='unread'>" + that.getName(that.messages.first().from).getFirstName() + "</span>, <span class='unread'>" + that.getName(that.messages.last().from).getFirstName() + "</span>";
				   html += " (" + (that.messages.length) + ")";
				   $node = $(html);
			   } else {
				   var html = "<span class='unread'>" + that.getName(that.messages.first().from).getFirstName() + "</span> .. <span class='unread'>" + that.getName(that.messages.last().from).getFirstName() + "</span>";
				   html += " (" + (that.messages.length) + ")";
				   $node = $(html);
			   }
		   }

		   return $node;
	   }
	   
	   this.passedImportantAndInboxTest = function() {
		   var passedImportantAndInboxTest = true;
		   if (Settings.read("accountAddingMethod") == "oauth") {
			   // we can only poll for 1 label so when polling for important + inbox we initialled poll for important so make sure now that it also has the label "inbox" 
			   if (that.monitoredLabel == SYSTEM_IMPORTANT_IN_INBOX) {
				   if (!that.account.hasMonitoredLabel(SYSTEM_INBOX)) {
					   passedImportantAndInboxTest = false;
				   }
			   }
		   }
		   return passedImportantAndInboxTest;
	   }
	   
	   this.isUnread = function() {
		   return that.labels.indexOf(GmailAPI.labels.UNREAD) != -1 && that.labels.indexOf(GmailAPI.labels.SPAM) == -1 && that.labels.indexOf(GmailAPI.labels.TRASH) == -1;
	   }
	   
	   this.isMonitoredLabelStillInLabels = function() {
		   if (that.monitoredLabel == SYSTEM_ALL_MAIL) {
			   return that.labels.indexOf(GmailAPI.labels.SPAM) == -1 && that.labels.indexOf(GmailAPI.labels.TRASH) == -1;
		   } else {
			   if (that.labels.indexOf(getGmailAPILabelId(that.monitoredLabel)) != -1) {
				   return true;
			   }
		   }
		   
		   /*
		   return that.labelIds.some(function(labelId) {
			   if (getGmailAPILabelId(that.monitoredLabel) == labelId) {
				   return true;
			   }
		   });
		   */
	   }
	   
	   this.hasLabel = function(labelId) {
		   if (that.labels.indexOf(labelId) != -1) {
			   return true;
		   }
	   }
   };
   
}