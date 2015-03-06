var licenseType = "singleUser";
var licenseSelected;
var minimumDonation = 1; // but being set overwritten when donate buttons are clicked
var currencySymbol = "$";
var currencyCode;

var donateButtonClicked = null;
var extensionName = getMessage("nameNoTM");
var multipleCurrencyFlag;

if (!extensionName) {
	try {
		extensionName = chrome.runtime.getManifest().name;
	} catch (e) {
		console.error("Manifest has not been loaded yet: " + e);
	}
	
	var prefix = "__MSG_";
	// look for key name to message file
	if (extensionName && extensionName.match(prefix)) {
		var keyName = extensionName.replace(prefix, "").replace("__", "");
		extensionName = getMessage(keyName);
	}
}

function getMessageFromCurrencySelection(key) {
	var idx = document.getElementById("multipleCurrency").selectedIndex;
	var suffix = idx == 0 ? "" : idx+1;
	return getMessage(key + suffix);
}

function initCurrency() {
	$("#multipleCurrency").find("option").each(function (idx) {
		// TWD is not supported for alertPay so disable it (dont' remove it because the selector uses it's order in the list)
		if (donateButtonClicked == "alertPay" && window.navigator.language.match(/tw/i) && $(this).attr("value") == "TWD") {
			$(this).attr("disabled", "true");
			if (idx==0) {
				$("#multipleCurrency").get(0).selectedIndex=1;
			}
		} else {
			$(this).removeAttr("disabled");
		}
	});
	
	function initCodesAndMinimums(donateButtonClicked) {
		var messageReducedPrefix;
		var messagePrefix;
		
		if (licenseType == "multipleUsers") {
			currencyCode = "USD"; // hard coded to USD for multipe user license
	} else {
			if (donateButtonClicked == "paypal") {
				messagePrefix = "minimumDonation";
				messageReducedPrefix = "minimumDonationPaypalReduced";
			} else if (donateButtonClicked == "stripe") {
				messagePrefix = "minimumDonationStripe";
				messageReducedPrefix = "minimumDonationStripeReduced";
			} else if (donateButtonClicked == "coinbase") {
				messagePrefix = "minimumDonationCoinbase";
				messageReducedPrefix = "minimumDonationCoinbaseReduced";
	}
	
			if ($("#multipleCurrency").val() == "BTC") {
				currencyCode = "BTC";
				currencySymbol = "BTC";
				
				if (isEligibleForReducedDonation()) {
					minimumDonation = parseFloat(getMessage("minimumDonationBitcoinReduced"));
				} else {
					minimumDonation = parseFloat(getMessage("minimumDonationBitcoin"));
				}
			} else if (donateButtonClicked == "stripe") {
				currencyCode = "USD";
				currencySymbol = "$";

				if (isEligibleForReducedDonation()) {
					minimumDonation = parseFloat(getMessage("minimumDonationStripeReduced"));
				} else {
					minimumDonation = parseFloat(getMessage("minimumDonationStripe"));
				}
			} else {
				currencyCode = getMessageFromCurrencySelection("currencyCode");
		currencySymbol = getMessageFromCurrencySelection("currencySymbol");
				
		if (isEligibleForReducedDonation()) {
					minimumDonation = parseFloat(getMessageFromCurrencySelection(messageReducedPrefix));
		} else {			
					minimumDonation = parseFloat(getMessageFromCurrencySelection(messagePrefix));
				}
			}
		}

		// General
		$("#currencyCode").text(currencyCode);
		$("#currencySymbol").text(currencySymbol);				
		if (multipleCurrencyFlag) {
			$("#singleCurrencyWrapper").hide();
			$("#multipleCurrencyWrapper").show();
		}
		}
		
	initCodesAndMinimums(donateButtonClicked);
}

function initPaymentDetails(buttonClicked) {
	donateButtonClicked = buttonClicked;
	
	if (licenseType == "singleUser") {
		$('#donateAmountDiv').slideUp("fast", function() {
			
			// If atleast 2 then we have multiple currencies
			multipleCurrencyFlag = getMessage("currencyCode2");
			
			$("#multipleCurrency").empty();
			var multipleCurrencyNode = $("#multipleCurrency").get(0);
			for (var a=1; a<10; a++) {
				var suffix = a==1 ? "" : a + "";
				var currencyCode2 = getMessage("currencyCode" + suffix);
				if (currencyCode2) {
					var currencySymbol2 = getMessage("currencySymbol" + suffix);
					multipleCurrency.add(new Option(currencyCode2 + " " + currencySymbol2, currencyCode2), null);
				}
			}
			
			if (donateButtonClicked == "coinbase") {
				multipleCurrencyFlag = true;
				multipleCurrency.add(new Option("BTC", "BTC"), null);
			}
			
			initCurrency();
		}).slideDown();
		$("#amount").focus();
	} else {
		initCurrency();
		licenseSelected = $("#licenseOptions input:checked").data("data"); 
		var price = licenseSelected.price;
		initPaymentProcessor(price);
	}
}

function setPayPayInlineParam(params) {
	var didNotExist = false;
	var $inputNode = $("#paypapInlineForm input[name='" + params.name + "']");			
	if (!$inputNode.exists()) {
		didNotExist = true;
		$inputNode = $("<input type='hidden' name='" + params.name + "'/>");
	}
	$inputNode.val(params.value);
	if (didNotExist) {
		$("#paypapInlineForm").append($inputNode);
	}
}

function getAmountNumberOnly() {
	var amount = $("#amount").val();
	amount = amount.replace(",", ".");
	amount = amount.replace("$", "");

	if (amount.indexOf(".") == 0) {
		amount = "0" + amount;
	}
	
	amount = $.trim(amount);
	return amount;
}

function showSuccessfulPayment() {		
	bg.Controller.processFeatures();

	$("#thankYouVideo").attr("src", "http://www.youtube.com/embed/b_v-42FxDuY?rel=0&autoplay=1&showinfo=0&theme=light");
	$("#extraFeatures").slideUp("slow");
	$("#paymentOptions").slideUp("slow", function() {
		$("#paymentComplete").slideDown();
	});
}

function showPaymentMethods(licenseType) {
	window.licenseType = licenseType;
	$("#choosePaymentWrapper").slideUp("fast", function() {
		$("#choosePaymentWrapper").slideDown();
	});
}

function showLoading() {
	var $img = $("<img id='ajaxLoader' src='/images/ajax-loader-big.gif' style='position:fixed;display:none;top:272px;left:48%'/>");
	$("body").append($img);
	$img.fadeIn("slow");
}

function hideLoading() {
	$("#ajaxLoader").remove();
}

function initPaymentProcessor(price) {
	if (donateButtonClicked == "paypal") {
		sendGA("paypal", 'start');
		
		showLoading();

		var donationPageUrl = location.protocol + "//" + location.hostname + location.pathname;

		// seems description is not used - if item name is entered, but i put it anyways
		var data = {itemId:bg.itemID, itemName:extensionName, currency:currencyCode, price:price, email:bg.email, description:extensionName, successUrl:donationPageUrl + "?action=paypalSuccess", errorUrl:donationPageUrl + "?action=paypalError", cancelUrl:bg.Controller.FULLPATH_TO_PAYMENT_FOLDERS + "paymentSystems/paypal/redirectToExtension.php?url=" + encodeURIComponent(donationPageUrl)};
		if (licenseType == "multipleUsers") {
			data.license = licenseSelected.number;
		}
		
		$.ajax({
			type: "post",
			url: bg.Controller.FULLPATH_TO_PAYMENT_FOLDERS + "paymentSystems/paypal/createPayment.php",
			data: data,
			timeout: seconds(10),
			//xhrFields: {
			      //withCredentials: true // patch: because session & cookies were not being saved on apps.jasonsavard.com
			//},
			complete: function(request, textStatus) {
				if (textStatus == "success") {
					location.href = request.responseText;
				} else {
					hideLoading();
					console.error("error", request);
					niceAlert("error: " + request.statusText + " Try Stripe instead?");
					sendGA("paypal", 'failure on createPayment');
				}
			}
		});
	} else if (donateButtonClicked == "stripe") {
		sendGA("stripe", 'start');
		
		var licenseParamValue = "";
		if (licenseType == "multipleUsers") {
			licenseParamValue = licenseSelected.number;
		}

		var stripeAmount = price * 100;
		var stripeCurrency = currencyCode;
		
		var stripeHandler = StripeCheckout.configure({
			key: "pk_live_GYOxYcszcmgEMwflDGxnRL6e",
		    image: "http://jasonsavard.com/images/jason.png",
		    token: function(response) {
		        console.log("token result:", response);
		        $.ajax({
					type: "POST",
					url: "https://apps.jasonsavard.com/paymentSystems/stripe/charge.php",
					data: {stripeToken:response.id, amount:stripeAmount, email:bg.email, currency:stripeCurrency, itemId:bg.itemID, description:extensionName, license:licenseParamValue}
				}).done(function(data, textStatus, jqXHR) {
					showSuccessfulPayment();
					sendGA("stripe", "success", "daysElapsedSinceFirstInstalled", daysElapsedSinceFirstInstalled());
				}).fail(function(jqXHR, textStatus, errorThrown) {
					console.log("respone arsg", arguments);
					niceAlert("Error: " + jqXHR.responseText);
					sendGA("stripe", 'error with token: ' + jqXHR.responseText);
				});
			}
		});
		
		showLoading();
		
		stripeHandler.open({
			email:		 bg.email,
        	address:     false,
        	amount:      stripeAmount,
        	name:        extensionName,
        	currency:    stripeCurrency,
        	allowRememberMe: false,
        	opened: function() {
        		hideLoading();
			}
		});
	} else if (donateButtonClicked == "coinbase") {
		sendGA("coinbase", 'start');
		
		var licenseParamValue = "";
		if (licenseType == "multipleUsers") {
			licenseParamValue = licenseSelected.number;
		}

		var borderRadius = "border-radius:10px;";
		var $coinbaseWrapper = $("<div id='coinbaseWrapper' style='" + borderRadius + "-webkit-transition:top 800ms ease-in-out;left: 37%;top: 182px;text-align:center;position:fixed;background:white;width: 500px; height: 160px;box-shadow:2px 2px 193px rgba(0,0,0,1);'><img id='loadingCoinbase' src='/images/ajax-loader.gif' style='margin-top:56px'/></span><img id='closeCoinbase' src='images/closeBig.png' style='cursor:pointer;top: -16px;right: -16px;position: absolute;'/></div>");
		$coinbaseWrapper.find("#closeCoinbase").click(function() {
			$coinbaseWrapper.remove();
		});
		$("body").append($coinbaseWrapper);
		
		bg.Controller.ajax({data:"action=createCoinbaseButton&name=" + extensionName + "&price=" + price + "&currency=" + currencyCode}, function(params) {
			if (params.error) {
				niceAlert("Temporary problem with this payment method, please try again later or try PayPal instead or contact the developer");
				sendGA("coinbase", 'error with createCoinbaseButton');
				bg.Controller.email({subject:"Payment error", message:"error:<br>" + params.error + "<br>errorthrown: " + params.errorThrown});
			} else {
				var code = params.data.button.code;

				var customParam = {itemID:bg.itemID, email:bg.email, license:licenseParamValue};
				var url = "https://coinbase.com/inline_payments/" + code + "?c=" + encodeURIComponent( JSON.stringify(customParam) );
				
				var $coinbaseIframe = $("<iframe src='" + url + "' style='" + borderRadius + "width: 500px; height: 160px; border: none;overflow: hidden;' scrolling='no' allowtransparency='true' frameborder='0'></iframe>");
				$coinbaseWrapper.find("#loadingCoinbase").hide();
				$coinbaseWrapper.append($coinbaseIframe);
			}			
		});
	} else {
		niceAlert('invalid payment process')
	}
}

function showAmountError(msg) {
	$("#amountError").html(msg).slideDown().delay(2000).slideUp();
}

function initLicenseFlow(email) {
	bg.email = email;
	$("#licenseDomain").text("@" + bg.email.split("@")[1]);
	//var licenses = [{number:"5", price:"0.02"}, {number:"10", price:"20"}, {number:"20", price:"40"}, {number:"unlimited", price:"0.03"}];
	var licenses = [{number:"5", price:"20"}, {number:"10", price:"30"}, {number:"20", price:"50"}, {number:"100", price:"100"}, {number:"unlimited", price:"500"}];
	$("#licenseOptions").empty();
	$.each(licenses, function(index, license) {
		var li = $("<li><input id='licenseOption" + index + "' type='radio' name='licenseOption'/>&nbsp;<label for='licenseOption" + index + "'>" + license.number + " users for USD $" + license.price + "</label></li>");
		li.find("input").data("data", license);
		$("#licenseOptions").append(li);
	});						
	$("#multipleUserLicenseWrapper").slideDown();
}

$(document).ready(function() {
	
	initToolTips();
	
	$("title").text(extensionName);
	$("#contributeToContinue").click(function() {
		$.when( $("#header, #extraFeatures, #option1, #option2 legend").animate({opacity: 'hide', height: 'hide'}, 700) ).done(function() {
			setTimeout(function() {
				if (bg.email) {
					
					// reinit email address in case it was substiiutted from multipe signin
					bg.email = getFirstActiveEmail(bg.accounts);
					
					showPaymentMethods("singleUser");
				} else {
					niceAlert(getMessage("mustSignInToPay"));
				}
			}, 100)
		});
		$("#multipleUserLicenseWrapper").slideUp();
	});
	
	var action = getUrlValue(location.href, "action");
	
	if (action == "paypalSuccess") {
		$("#extraFeatures").hide();
		showLoading();
		verifyPayment(bg.accounts, function(response) {
			hideLoading();
			if (response && response.unlocked) {
				showSuccessfulPayment();
				sendGA("paypal", 'success');
			} else {
				if (response && response.error) {
					// show success anyways because they might just have extensions preventing access to my server
					showSuccessfulPayment();
					sendGA("paypal", 'failure ' + response.error + ' but show success anyways');
					//errorMsg = " (Send him this error: " + response.error + ")";
					//niceAlert("Problem contacting the server, please <a href='http://jasonsavard.com/contact'>contact</a> the developer!" + errorMsg);
				} else {
					niceAlert("Could not match your email, please <a href='http://jasonsavard.com/contact'>contact</a> the developer!");
				}
			}
		});
	} else if (action == "paypalError") {
		$("#header, #extraFeatures, #option1, #option2 legend").hide();
		$("#paymentOptions").show();
		$("#contributeToContinue").click();

		var error = getUrlValue(location.href, "error");
		if (error) {
			error = error + "<br>";
		} else {
			error = "";
		}
		
		$("#paymentFailure").html(error + getMessage("failureWithPayPalPurchase", "Stripe")).slideDown("slow").delay(6000).slideUp("slow");
		sendGA("paypal", 'failure ' + error);
	} else if (action) {
		setTimeout(function() {
			$("#extraFeaturesDetails").slideDown(2000);
		}, 800);
		setTimeout(function() {
			$("#paymentOptions").fadeIn(3500);
		}, 3000);
	} else {
		$("#extraFeaturesLegend").text(getMessage("extraFeatures"));
		$("#extraFeaturesDetails").show();
		$("#paymentOptions").show();
	}

	$("#paymentMethods a").click(function() {
		$("#paymentMethods").find("a").removeClass("selected");
		$(this).addClass("selected");
		$("#paymentFailure").hide();
	});

	// If multiple currencies load them
	$("#multipleCurrency").change(function() {
		$("#amount")
			.val("")
			.focus()
		;
		initCurrency();
	});
	
	$("#donateButtonPaypal").click(function() {
		initPaymentDetails("paypal");
	});
	
	$("#donateButtonStripe").click(function() {
		initPaymentDetails("stripe");
	});

	$("#coinbaseButton").click(function() {
		initPaymentDetails("coinbase");
	});

	$("#submitDonationAmount").click(function() {				
		sendGA("donationAmount", 'submitted', $("#amount").val());
		
		var amount = getAmountNumberOnly();
		
		if (amount == "") {
			showAmountError(getMessage("enterAnAmount"));
			$("#amount").focus();
		} else if (parseFloat(amount) < minimumDonation) {
			var minAmountFormatted = minimumDonation; //minimumDonation.toFixed(2).replace("\.00", "");
			showAmountError(getMessage("minimumAmount", currencySymbol + " " + minAmountFormatted));
			$("#amount").val(minAmountFormatted).focus();
		} else {
			initPaymentProcessor(amount);
		}
	});
	$('#amount').keypress(function(event) {
		  if (event.keyCode == '13') {
			  $("#submitDonationAmount").click();
		  }
	});
	$("#moreFeatures").click(function() {
		$(this).hide();
		$(".moreFeatures").slideDown();
	});
	// Show non-english users message to help me translate
	if (!pref("lang", window.navigator.language).match(/en/i)) {
		$("#helpMeTranslate").show();
	}
	
	$("#reasonsToDonateLink").click(function() {
		//$(this).hide();
		$("#reasonsToDonate").slideToggle();
		$("#me").fadeTo(2000, 1.0);
	});			
	
	$(".alreadyDonated").click(function() {
		var $alreadyDonated = $(this);
		if (bg.email) {
			$("#verifying").show();			
			verifyPayment(bg.accounts, function(response) {
				$("#verifying").hide();
				if (response && response.unlocked) {
					showSuccessfulPayment();
				} else if (response && response.error) {
					niceAlert("Problem contacting the server, please try again later or contact the developer!");
				} else {
					$("#noPaymentEmail").text(bg.email);
					$("#noPaymentFound").slideDown();
				}
			});
		} else {
			niceAlert(getMessage("mustSignInToPay"));
			$("#verifying").hide();
		}
	});
		
	$("#multipleUserLicense").click(function() {
		if (bg.email) {
			$('#donateAmountDiv').hide();
			$("#choosePaymentWrapper").slideUp();
			
			var emailDomainsSignedIn = 0;
			var lastEmailDomainFound;
			var $emailDomains = $("#emailDomains").empty();
			$emailDomains.append( $("<option>Select the domain to assign this license to...</option>") );
			$.each(bg.accounts, function(i, account) {
				if (isDomainEmail(account.getAddress())) {
					lastEmailDomainFound = account;
					$emailDomains.append( $("<option value='" + account.getAddress() + "'>Users who sign into their Gmail with a @" + account.getAddress().split("@")[1] + "</option>") );
					emailDomainsSignedIn++;
				}
			});
			
			if (emailDomainsSignedIn == 0) {
				// none found...						
				$("#licenseOnlyValidFor").hide();
				$("#signInAsUserOfOrg").show();
				$("#licenseOptions").hide();
				
				$("#exampleEmail").html("<span style='color:gray'>" + bg.email.split("@")[0] + "</span><b>@mycompany.com</b>");						
			} else if (emailDomainsSignedIn == 1) {
				initLicenseFlow(lastEmailDomainFound.getAddress());
			} else {
				// user is signed into 2 more email domains so give him an option to choose one...
				$("#licenseOnlyValidFor").hide();
				$emailDomains.slideDown();
			}
			$("#multipleUserLicenseWrapper").slideDown();
		} else {
			niceAlert(getMessage("mustSignInToPay"));
			return
		}
	});
	
	$("#emailDomains").change(function() {
		$(this).slideUp();
		initLicenseFlow( $(this).val() );
	});
	
	$("#multipleUserLicenseWrapper").on("click", "#licenseOptions input", function() {
		$("#multipleUserLicenseWrapper").slideUp();
		showPaymentMethods("multipleUsers");
	});
	
	$("#closeWindow").click(function() {
		getActiveTab(function(currentTab) {
			window.close();
			chrome.tabs.remove(currentTab.id);
		});
	});
	
	$(".signOutAndSignIn").click(function() {
		location.href = "https://mail.google.com/mail/?logout"; //%3Fcontinue%3D" + encodeURIComponent(location.href);
		// &il=true&zx=1ecpu2nnl1qyn
	});
	
	$("#reviews").click(function() {
		$(this).attr("href", "https://chrome.google.com/webstore/detail/" + getExtensionIDFromURL(location.href) + "/reviews");
	});

	$("#closeReasonsToDonate").click(function() {
		$('#reasonsToDonate').slideUp();
	});
	
	// load these things at the end
	
	// prevent jumping due to anchor # and because we can't javascript:; or else content security errors appear
	$("a[href='#']").on("click", function(e) {
		e.preventDefault()
	});

	$(window).on('message', function(messageEvent) {
		console.log("message", messageEvent);
		var origin = messageEvent.originalEvent.origin;
		var data = messageEvent.originalEvent.data;
		
		if (origin && origin.match('https://(www\.)?coinbase.com')) {
			console.log(origin, data);
			try {
			    var eventType = data.split('|')[0];     // "coinbase_payment_complete"
			    var eventId   = data.split('|')[1];     // ID for this payment type

			    if (eventType == 'coinbase_payment_complete') {
			    	setTimeout(function() {
			    		$("#coinbaseWrapper").css("top", "550");
			    		showSuccessfulPayment();			    		
			    	}, 500);
			    	sendGA("coinbase", "success", "daysElapsedSinceFirstInstalled", daysElapsedSinceFirstInstalled());
			    } else if (eventType == 'coinbase_payment_mispaid') {
			    	niceAlert("Mispaid amount! Try again");
			    } else if (eventType == 'coinbase_payment_expired') {
			    	niceAlert("Time expired! Try again");
			    } else {
			        // Do something else, or ignore
			    	console.log("coinbase message: " + eventType);
			    }
			} catch (e) {
				bg.Controller.email({subject:"Coinbase error", message:"error:<br>" + JSON.stringify(e) + "<br><br>message event:<br>" + JSON.stringify(messageEvent)});
			}
	    }
	});

});