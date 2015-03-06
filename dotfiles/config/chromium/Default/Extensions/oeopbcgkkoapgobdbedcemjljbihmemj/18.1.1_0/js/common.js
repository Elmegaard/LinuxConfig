// Copyright 2015 Jason Savard
// Becareful because this common.js file is loaded on websites for content_scripts and we don't want errors here

if (!window.bg) {
	if (document.location.href.indexOf("chrome-extension://") == 0) {
		try {
			window.bg = chrome.extension.getBackgroundPage();
		} catch (e) {
			console.error("JError: " + e);
		}
	}
} 

window.onerror = function(msg, url, line) {
	var thisUrl = url.replace("chrome-extension://oeopbcgkkoapgobdbedcemjljbihmemj/", "");
	var thisLine;
	if (line) {
		thisLine = " (" + line + ") ";
	} else {
		thisLine = " ";
	}
	
	var category = "JS Errors"; 
	var GAError = thisUrl + thisLine + msg;
	var label = getOnErrorLabel();
	
	if (typeof sendGA != "undefined") {
		if (label) {
			sendGA(category, GAError, label);
		} else {
			sendGA(category, GAError);
		}
	}
	//return false; // false prevents default error handling.
};

function getOnErrorLabel() {
	var label;
	var attribute = "email";
	if (window[attribute]) {
		label = window[attribute];
	} else if (window.bg && window.bg[attribute]) {
		label = window.bg[attribute];
	}
	return label;
}

function logError(msg, o) {
	try {
		var onErrorMessage;
		if (o) {
			console.error(msg, o);
			onErrorMessage = msg + " " + o;
		} else {
			console.error(msg);
			onErrorMessage = msg;
		}
		window.onerror(onErrorMessage, location.href);
	} catch (e) {
		console.error("error in onerror?", e);
	}
}

var DetectClient = {};
DetectClient.isWindows = function() {
	return navigator.userAgent.match(/windows/i) != null;
}
DetectClient.isMac = function() {
	return navigator.userAgent.match(/mac/i) != null;
}
DetectClient.isLinux = function() {
	return navigator.userAgent.match(/linux/i) != null;
}
DetectClient.isOpera = function() {
	return navigator.userAgent.match(/opera/i) != null;
}
DetectClient.isChromeOS = function() {
	return navigator.userAgent.match(/cros/i) != null;
}
DetectClient.getChromeChannel = function(callback) {
	$.getJSON("https://omahaproxy.appspot.com/all.json?callback=?", function(data) {
		var versionDetected;
		var stableDetected = false;
		for (var a=0; a<data.length; a++) {

			var osMatched = false;
			// patch because Chromebooks/Chrome OS has a platform value of "Linux i686" but it does say CrOS in the useragent so let's use that value
			if (DetectClient.isChromeOS()) {
				if (data[a].os == "cros") {
					osMatched = true;
				}
			} else { // the rest continue with general matching...
				if (navigator.userAgent.toLowerCase().indexOf(data[a].os) != -1) {
					osMatched = true;
				}
			}
			
			if (osMatched) {
				for (var b=0; b<data[a].versions.length; b++) {
					if (navigator.userAgent.indexOf(data[a].versions[b].previous_version) != -1 || navigator.userAgent.indexOf(data[a].versions[b].version) != -1) {
						// it's possible that the same version is for the same os is both beta and stable???
						versionDetected = data[a].versions[b];
						if (data[a].versions[b].channel == "stable") {
							stableDetected = true;
							callback(versionDetected);
							return;
						}
					}
				}
			}
		}

		// probably an alternative based browser like RockMelt because I looped through all version and didn't find any match
		if (data.length && !versionDetected) {
			callback({channel:"alternative based browser"});
		} else {
			callback(versionDetected);
		}
	});
}

var ONE_SECOND = 1000;
var ONE_MINUTE = 60000;
var ONE_HOUR = ONE_MINUTE * 60;
var ONE_DAY = ONE_HOUR * 24;
var origConsoleLog = null;
var origConsoleWarn = null;
var origConsoleDebug = null;
Calendar = function () {};

jQuery.fn.exists = function(){return jQuery(this).length>0;}
jQuery.fn.textNodes = function() {
	var ret = [];

	(function(el){
		if (!el) return;
		if ((el.nodeType == 3)||(el.nodeName =="BR"))
			ret.push(el);
		else
			for (var i=0; i < el.childNodes.length; ++i)
				arguments.callee(el.childNodes[i]);
	})(this[0]);
	return $(ret);
}
jQuery.fn.hasHorizontalScrollbar = function() {
    var divnode = this.get(0);
    if (divnode && divnode.scrollWidth > divnode.clientWidth) {
        return true;
    } else {
    	return false;
    }
}

jQuery.fn.hasVerticalScrollbar = function() {
    var divnode = this.get(0);
    if (divnode.scrollHeight > divnode.clientHeight) {
        return true;
    } else {
    	return false;
    }
}

jQuery.fn.changeNode = function(newTagName) {
	if (this.get(0)) {
		var newNodeHTML = this.get(0).outerHTML;
		newNodeHTML = newNodeHTML.replace("<" + this.get(0).tagName.toLowerCase() + " ", "<" + newTagName + " ");
		newNodeHTML = newNodeHTML.replace("/" + this.get(0).tagName.toLowerCase() + ">", "/" + newTagName + ">");
		this.replaceWith( $(newNodeHTML) );
		return $(newNodeHTML);
	} else {
		return this;
	}
}

jQuery.fn.autoResize = function(options) {
	 
    // Just some abstracted details,
    // to make plugin users happy:
    var settings = $.extend({
        onResize : function(){},
        animate : true,
        animateDuration : 150,
        animateCallback : function() {},
        minHeight : 50,
        extraSpace : 0, // space at the bottom
        limit: 1000
    }, options);

    // Only textarea's auto-resize:
    this.filter('textarea').each(function(){

            // Get rid of scrollbars and disable WebKit resizing:
    	
        var textarea = $(this).css({resize:'none','overflow-y':'hidden'}),

            // Cache original height, for use later:
            origHeight = textarea.height(),

            // Need clone of textarea, hidden off screen:
            clone = (function(){

                // Properties which may effect space taken up by chracters:
                var props = ['height','padding','width','lineHeight','textDecoration','letterSpacing'],
                    propOb = {};

                // Create object of styles to apply:
                $.each(props, function(i, prop){
                    propOb[prop] = textarea.css(prop);
                });
                
                console.log("propob", propOb);

                // Clone the actual textarea removing unique properties
                // and insert before original textarea:
                return textarea.clone().removeAttr('id').removeAttr('name').css({
                    position: 'absolute',
                    top: 0,
                    left: -9999
                }).css(propOb).attr('tabIndex','-1').insertBefore(textarea);

            })(),
            lastScrollTop = null,
            updateSize = function() {

                // Prepare the clone:
                clone.height(0).val($(this).val()).scrollTop(10000);
                
                if (!origHeight) {
                	origHeight = settings.minHeight;
                }
                
                // Find the height of text:
                var scrollTop = Math.max(clone.scrollTop(), origHeight) + settings.extraSpace,
                    toChange = $(this).add(clone);
                
                // Don't do anything if scrollTip hasen't changed:
                if (lastScrollTop === scrollTop) { return; }
                lastScrollTop = scrollTop;

                // Check for limit:
                if ( scrollTop >= settings.limit ) {
                    $(this).css('overflow-y','');
                    return;
                }
                // Fire off callback:
                settings.onResize.call(this);

                // Either animate or directly apply height:
                toChange.stop().animate({height:scrollTop}, settings.animateDuration, settings.animateCallback);
                /*
                settings.animate && textarea.css('display') === 'block' ?
                    toChange.stop().animate({height:scrollTop}, settings.animateDuration, settings.animateCallback)
                    : toChange.height(scrollTop);
                */
            };

        // Bind namespaced handlers to appropriate events:
        textarea
            .off('.dynSiz')
            .on('keyup.dynSiz', updateSize)
            .on('keydown.dynSiz', updateSize)
            .on('change.dynSiz', updateSize);

    });

    // Chain:
    return this;

};

function seconds(seconds) {
	return seconds * ONE_SECOND;
}

function minutes(minutes) {
	return minutes * ONE_MINUTE;
}

function loadLocaleMessages(lang, callback) {
	lang = lang.toLowerCase();
	var navigatorLang = window.navigator.language.toLowerCase();
	
	// only load locales from files if they are not using their navigator langauge 
	if (lang == navigatorLang.substring(0,2)) {
		// for english just use native calls to get i18n messages
		chrome.extension.getBackgroundPage().localeMessages = null;
		callback();
	} else {
		console.log("loading locale: " + lang);
		
		// i haven't created a en-US so let's avoid the error in the console and just push the callback
		if (lang == "en-us") {
			callback();
		} else {
			
			// convert lang to match folder case ie. en_gb
			var folderName = lang.replace("-", "_");
			if (folderName.indexOf("_") != -1) {
				folderName = folderName.substr(0, 2) + "_" + folderName.substr(3).toUpperCase();
			} else {
				folderName = folderName.toLowerCase();
			}
			
			$.ajax({
				url: chrome.runtime.getURL("_locales/" + folderName + "/messages.json"),
				type: "GET",
				timeout: 5000,
				complete: function(request, textStatus) {
					var status = getStatus(request, textStatus);
					if (status == 200) {
						chrome.extension.getBackgroundPage().localeMessages = JSON.parse(request.responseText);					
					} else {
						// not found status usually 404					
					}
					callback();
				}
			});
		}
	}
}

function getMessage(messageID, args, localeMessages) {
	if (messageID) {
		// if localeMessage null because english is being used and we haven't loaded the localeMessage
		if (!localeMessages) {
			try {
				localeMessages = chrome.extension.getBackgroundPage().localeMessages;
			} catch (e) {
				// might be in content_script and localMessages not defined because it's in english
				return chrome.i18n.getMessage(messageID, args);
			}				
		}
		if (localeMessages) {
			var messageObj = localeMessages[messageID];	
			if (messageObj) { // found in this language
				var str = messageObj.message;
				
				// patch: replace escaped $$ to just $ (because chrome.i18n.getMessage did it automatically)
				if (str) {
					str = str.replace(/\$\$/g, "$");
				}
				
				if (args) {
					if (args instanceof Array) {
						for (var a=0; a<args.length; a++) {
							str = str.replace("$" + (a+1), args[a]);
						}
					} else {
						str = str.replace("$1", args);
					}
				}
				return str;
			} else { // default to default language
				return chrome.i18n.getMessage(messageID, args);
			}
		} else {
			// patch: chrome.i18n.getMessage does pass parameter if it is a numeric - must be converted to str
			if (args && $.isNumeric(args)) {
				args = args + "";
			}
			return chrome.i18n.getMessage(messageID, args);
		}
	}
}

function getUniqueId() {
	return Math.floor(Math.random() * 100000);
}

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc, forceEnglish) {
		var dF = dateFormat;
		var i18n = forceEnglish ? dF.i18nEnglish : dF.i18n;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  i18n.dayNamesShort[D],
				dddd: i18n.dayNames[D],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  i18n.monthNamesShort[m],
				mmmm: i18n.monthNames[m],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};

dateFormat.i18nEnglish = $.extend(true, {}, dateFormat.i18n);
dateFormat.i18nCalendarLanguage = $.extend(true, {}, dateFormat.i18n);

Date.prototype.isValid = function() {
	if (Object.prototype.toString.call(this) !== "[object Date]") {
		return false;
	}
	return !isNaN(this.getTime());
}

Date.prototype.addSeconds = function(seconds, cloneDate) {
	var date;
	if (cloneDate) {
		date = new Date(this);		
	} else {
		date = this;
	}
	date.setSeconds(date.getSeconds() + seconds, date.getMilliseconds());
	return date;
}

Date.prototype.subtractSeconds = function(seconds, cloneDate) {
	return this.addSeconds(-seconds, cloneDate);
}

// For convenience...
Date.prototype.format = function (mask, utc, forceEnglish) {
	return dateFormat(this, mask, utc, forceEnglish);
};

Date.prototype.formattedTime = function () {
	if (pref("24hourMode")) {
		return dateFormat(this, "HH:MM");
	} else {
		return dateFormat(this, "h:MMtt");
	}
};

Date.prototype.displayDate = function(params) {
	
	params = initUndefinedObject(params);
	
	// date
	var dateStr;
	if (this.isToday()) { // diffInHours() > -12
		if (pref("24hourMode")) {
			dateStr = this.format("HH:MM");
		} else {
			dateStr = this.format("h:MM tt");
		}
	} else {
		if (params.relativeDays && this.isYesterday()) {
			dateStr = getMessage("yesterday");
		} else {
			dateStr = this.format("mmm d");
		}
	}
	
	if (params.withTimeAgo) {
		dateStr += " <span class='timeAgo'>("
		if (this.diffInMinutes() > -60) {
			dateStr += getMessage("minutesAgo", Math.abs(this.diffInMinutes()) + "");
		} else if (this.diffInHours() > -24) {
			if (Math.abs(this.diffInHours()) == 1) {
				dateStr += getMessage("hourAgo", Math.abs(this.diffInHours()) + "");
			} else {
				dateStr += getMessage("hoursAgo", Math.abs(this.diffInHours()) + "");
			}
		} else {
			if (Math.abs(this.diffInDays()) == 1) {
				dateStr += getMessage("dayAgo", Math.abs(this.diffInDays()) + "");
			} else {
				dateStr += getMessage("daysAgo", Math.abs(this.diffInDays()) + "");
			}				
		}
		dateStr += ")</span>";
	}
	return dateStr;
}

Date.parse = function(dateStr) {
	var DATE_TIME_REGEX = /^(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)\.\d+(\+|-)(\d\d):(\d\d)$/;
	var DATE_TIME_REGEX_Z = /^(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)\.\d+Z$/;
	var DATE_TIME_REGEX_Z2 = /^(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)+Z$/;
	var DATE_MILLI_REGEX = /^(\d\d\d\d)(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)$/;
	var DATE_REGEX = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
	var DATE_NOSPACES_REGEX = /^(\d\d\d\d)(\d\d)(\d\d)$/;

	/* Convert the incoming date into a javascript date
	 * 2006-04-28T09:00:00.000-07:00
	 * 2006-04-28T09:00:00.000Z
	 * 2010-05-25T23:00:00Z (new one from jason)
	 * 2006-04-19
	 */
	var parts = DATE_TIME_REGEX.exec(dateStr);

	// Try out the Z version
	if (!parts) {
		parts = DATE_TIME_REGEX_Z.exec(dateStr);
	}
	if (!parts) {
		parts = DATE_TIME_REGEX_Z2.exec(dateStr);
	}

	if (exists(parts) && parts.length > 0) {
		var d = new Date();
		d.setUTCFullYear(parts[1], parseInt(parts[2], 10) - 1, parts[3]);
		d.setUTCHours(parts[4]);
		d.setUTCMinutes(parts[5]);
		d.setUTCSeconds(parts[6]);
		d.setUTCMilliseconds(0);

		var tzOffsetFeedMin = 0;
		if (parts.length > 7) {
			tzOffsetFeedMin = parseInt(parts[8],10) * 60 + parseInt(parts[9],10);
			if (parts[7] != '-') { // This is supposed to be backwards.
				tzOffsetFeedMin = -tzOffsetFeedMin;
			}
		}
		return new Date(d.getTime() + tzOffsetFeedMin * ONE_MINUTE); 
	}

	parts = DATE_MILLI_REGEX.exec(dateStr);
	if (exists(parts)) {
		var d = new Date();
		d.setFullYear(parts[1], parseInt(parts[2], 10) - 1, parts[3]);
		d.setHours(parts[4]);
		d.setMinutes(parts[5]);
		d.setSeconds(parts[6]);
		d.setMilliseconds(0);
		return d;
	}
	if (!parts) {
		parts = DATE_REGEX.exec(dateStr);
	}
	if (!parts) {
		parts = DATE_NOSPACES_REGEX.exec(dateStr);
	}
	if (exists(parts) && parts.length > 0) {
		return new Date(parts[1], parseInt(parts[2],10) - 1, parts[3]);
	}
	
	// Parse these strings...
	// Wed, Jan 25, 2012 at 1:53 PM
	// 25 janvier 2012 13:53
	// 25 января 2012 г. 13:53
	
	if (!isNaN(dateStr)) {
		return new Date(dateStr);
	}
	return null;
}

function nowInMillis() {
	return today().getTime();
}

function today() {
	var offsetToday = null;
	if (localStorage) {
		offsetToday = localStorage["today"];
	}
	if (offsetToday) {
		return new Date(offsetToday);
	} else {
		return new Date();
	}
}

function yesterday() {
	// could not use same variable name as function ie. var today = today();
	var yest = today();
	yest.setDate(yest.getDate()-1);
	return yest;
}

function tomorrow() {
	var tomorrow = today();
	tomorrow.setDate(tomorrow.getDate()+1);
	return tomorrow;
}

function isToday(date) {
	return date.getFullYear() == today().getFullYear() && date.getMonth() == today().getMonth() && date.getDate() == today().getDate();
}

function isTomorrow(date) {
	var tom = tomorrow();
	return date.getFullYear() == tom.getFullYear() && date.getMonth() == tom.getMonth() && date.getDate() == tom.getDate();
}

function isYesterday(date) {
	var yest = yesterday();
	return date.getFullYear() == yest.getFullYear() && date.getMonth() == yest.getMonth() && date.getDate() == yest.getDate();
}

function now() {
	return today();
}

Date.prototype.isToday = function () {
	return isToday(this);
};

Date.prototype.isTomorrow = function () {
	return isTomorrow(this);
};

Date.prototype.isYesterday = function () {
	return isYesterday(this);
};

Date.prototype.isSameDay = function (otherDay) {
	return this.getFullYear() == otherDay.getFullYear() && this.getMonth() == otherDay.getMonth() && this.getDate() == otherDay.getDate();
};

Date.prototype.isBefore = function(otherDate) {
	var paramDate;
	if (otherDate) {
		paramDate = new Date(otherDate);
	} else {
		paramDate = today();
	}	
	var thisDate = new Date(this);
	return thisDate.getTime() < paramDate.getTime();
};

Date.prototype.isAfter = function(otherDate) {
	return !this.isBefore(otherDate);
};

Date.prototype.diffInSeconds = function(otherDate) {
	var d1;
	if (otherDate) {
		d1 = new Date(otherDate);
	} else {
		d1 = today();
	}	
	var d2 = new Date(this);
	return Math.round(Math.ceil(d2.getTime() - d1.getTime()) / ONE_SECOND);
};

Date.prototype.diffInMinutes = function(otherDate) {
	var d1;
	if (otherDate) {
		d1 = new Date(otherDate);
	} else {
		d1 = today();
	}	
	var d2 = new Date(this);
	return Math.round(Math.ceil(d2.getTime() - d1.getTime()) / ONE_MINUTE);
};

Date.prototype.diffInHours = function(otherDate) {
	var d1;
	if (otherDate) {
		d1 = new Date(otherDate);
	} else {
		d1 = today();
	}	
	var d2 = new Date(this);
	return Math.round(Math.ceil(d2.getTime() - d1.getTime()) / ONE_HOUR);
};

Date.prototype.diffInDays = function(otherDate) {
	var d1;
	if (otherDate) {
		d1 = new Date(otherDate);
	} else {
		d1 = today();
	}	
	d1.setHours(1);
	d1.setMinutes(1);
	var d2 = new Date(this);
	d2.setHours(1);
	d2.setMinutes(1);
	return Math.round(Math.ceil(d2.getTime() - d1.getTime()) / ONE_DAY);
};

Date.prototype.daysInThePast = function() {
	return this.diffInDays() * -1;
};

Date.prototype.addDays = function(days) {
	var newDate = new Date(this);
	newDate.setDate(newDate.getDate()+days);
	return newDate;
}

Date.prototype.subtractDays = function(days) {
	return this.addDays(days*-1);
}

// Same as Array.prototype.unique but newer!
Object.defineProperty(Array.prototype, 'unique', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function() {
        var a = this.concat();
        for(var i=0; i<a.length; ++i) {
            for(var j=i+1; j<a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    }
});

// returns a subset of an object array with unique attributes, ex. [{type:"1"}, {type:"1"}, {type:"2"}}.unique(function(obj) {return obj.type}); // result: [1,2]
Array.prototype.uniqueAttr = function(getValueFunction) {
    var result = {};
    for(var i = 0; i < this.length; ++i) {
        var value = getValueFunction(this[i]);
        result[(typeof value) + ' ' + value] = value;
    }

    var retArray = [];

    for (key in result) {
        if (result.hasOwnProperty(key)) { 
            retArray.push(result[key]);
        }
    }

    return retArray;
}

Array.prototype.caseInsensitiveSort = function() {
	this.sort(function(a, b) {
	    if (a.toLowerCase() < b.toLowerCase()) return -1;
	    if (a.toLowerCase() > b.toLowerCase()) return 1;
	    return 0;
	})
	return this;
};

/*
//Usage: array.forEach(item, index)
Array.prototype.forEach = function(action) {
    for (var i = 0, l = this.length; i < l; ++i) {
        var ret = action(this[i], i);
        // breaks if returns false or true but not just return;
        if (ret != undefined) {
        	break;
        }
    }
};
*/

Array.prototype.first = function() {
	return this[0];
};
Array.prototype.last = function() {
	return this[this.length-1];
};
Array.prototype.isEmpty = function() {
	return this.length == 0;
};
Array.prototype.find = function(func) {
	for (var i = 0, l = this.length; i < l; ++i) {
		var item = this[i];
		if (func(item))
			return item;
	}
	return null;
};
Array.prototype.swap = function (x,y) {
	var b = this[x];
	this[x] = this[y];
	this[y] = b;
	return this;
}

Array.prototype.addItem = function(key, value) {
	for (var i=0, l=this.length; i<l; ++i) {
		if (this[i].key == key) {
			// found key so update value
			this[i].value = value;
			return;
		}
	}
	this.push({key:key, value:value});
}
Array.prototype.getItem = function(key) {
	for (var i=0, l=this.length; i<l; ++i) {
		if (this[i].key == key) {			
			return this[i].value;
		}
	}
}

// Convert associative javascript array to an object
Array.prototype.toObject = function() {
	var obj = new Object();
	for(var key in this){
		// exclude functions from object
		if (!$.isFunction(this[key])) {
			obj[key] = this[key];
		}
	}
	return obj;
}

String.prototype.parseUrl = function() {
	var a = document.createElement('a');
	a.href = this;
	return a;
}

String.prototype.replaceAll = function(find, replace) {
	var findEscaped = escapeRegExp(find);
	return this.replace(new RegExp(findEscaped, 'g'), replace);
}

String.prototype.chunk = function(size) {
    return [].concat.apply([],
        this.split('').map(function(x,i){ return i%size ? [] : this.slice(i,i+size) }, this)
    )
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.equalsIgnoreCase = function(str) {
	if (this && str) {
		return this.toLowerCase() == str.toLowerCase();
	}
}

String.prototype.hasWord = function(word) {
    return this.match("\\b" + word + "\\b");
}

String.prototype.summarize = function(maxLength, EOM_Message) {
	if (!maxLength) {
		maxLength = 101;
	}
	var summary = this;
	if (summary.length > maxLength) {
		summary = summary.substring(0, maxLength);
		var lastSpaceIndex = summary.lastIndexOf(" ");
		if (lastSpaceIndex != -1) {
			summary = summary.substring(0, lastSpaceIndex);
			summary = $.trim(summary);
		}
		summary += "...";
	} else {
		if (EOM_Message) {
			summary += EOM_Message;
		}
	}
	
	// patch: do not why: but it seem that unless i append a str to summary, it returns an array of the letters in summary?
	return summary + "";
}

String.prototype.parseTime = function() {
	var d = new Date();
	var pieces = this.match(/(\d+)([:|\.](\d\d))\s*(am|pm)?/i);
	if (pieces && pieces.length >= 5) {
		// patch: had to use parseFloat instead of parseInt (because parseInt would return 0 instead of 9 when parsing "09" ???		
		var hours = parseFloat(pieces[1]);
		var ampm = pieces[4];
		
		// patch for midnight because 12:12am is actually 0 hours not 12 hours for the date object
		if (hours == 12) {
			if (ampm && ampm.toLowerCase() == "am") {
				hours = 0;
			} else {
				hours = 12;
			}
		} else if (ampm) {
			if (ampm.toLowerCase() == "pm") {
				hours += 12;
			}
		}
		d.setHours(hours);		
		//d.setHours( parseFloat(pieces[1]) + ( ( parseFloat(pieces[1]) < 12 && pieces[4] ) ? 12 : 0) );
		d.setMinutes( parseFloat(pieces[3]) || 0 );
		d.setSeconds(0, 0);
		return d;
	}
}

String.prototype.startsWith = function (str) {
	return this.indexOf(str) == 0;
};

String.prototype.endsWith = function (str) {
	return this.slice(-str.length) == str;
};

// remove entity codes
String.prototype.htmlToText = function() {
	var tmp = document.createElement("DIV");
	tmp.innerHTML = this;
	return tmp.textContent||tmp.innerText;
}

//remove entity codes
String.prototype.getFirstName = function() {
	return this.split(" ")[0];
}

/*
String.prototype.endsWith = function(suffix) {
	var indexOfSearchStr = this.indexOf(suffix, this.length - suffix.length); 
    return indexOfSearchStr != -1 && indexOfSearchStr == this.length - suffix.length;
};
*/

function initAnalytics() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = 'js/analytics.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	$(document).ready(function() {
		$(document).on("click", "a, input, button", function() {
			processNodeForAnalytics(this);
		});
		$(document).on("change", "select", function() {
			processNodeForAnalytics(this);
		});
	});
} 

function determineAnalyticsLabel(node) {
	var $node = $(node);
	var id = $node.attr("ga");
	if (id == "IGNORE") {
		return;
	}
	if (id) {
		return id;
	}
	id = $node.attr("id");
	if (id) {
		return id;
	}
	/*
	if ($node.hasClass("button") || $node.hasClass("icon")) {
		id = $node.attr("class").split(" ")[1];
		if (id) {
			return id;
		}
	}
	*/
	id = $node.attr("msg");
	if (id) {
		return id;
	}
	id = $node.attr("msgTitle");
	if (id) {
		return id;
	}
	id = $node.attr("href");
	// don't log # so dismiss it
	if (id) {
		if (id == "#") {
			return;
		} else {
			id = id.replace(/javascript\:/, "");
			// only semicolon so remove it and keep finding other ids
			if (id == ";") {
				return "";
			}
		}
	}
	id = $node.parent().attr("id");
	if (id) {
		return id;
	}
	id = $node.attr("class");
	if (id) {
		return id;
	}
}

function processNodeForAnalytics(node) {
	var $node = $(node);
	var label = null;
	var id = determineAnalyticsLabel(node);
	if (id) {
		if ($node.attr("type") != "text") {
			if ($node.attr("type") == "checkbox") {
				if (node.checked) {
					label = id + "_on";
				} else {
					label = id + "_off";
				}
			} else if (node.tagName == "SELECT") {
				label = $node.val();
			}
			var category = $node.closest("*[gaCategory]");
			var action = null;
			// if gaCategory specified
			if (category.length != 0) {
				category = category.attr("gaCategory");
				action = id;
			} else {
				category = id;
				action = "click";
			}
			
			if (label != null) {
				sendGA(category, action, label);
			} else {
				sendGA(category, action);
			}
		}
	}
}

//usage: sendGA('category', 'action', 'label');
//usage: sendGA('category', 'action', 'label', value);  // value is a number.
//usage: sendGA('category', 'action', {'nonInteraction': 1});
function sendGA(category, action, label, etc) {
	console.log("%csendGA: " + category + " " + action + " " + label, "font-size:0.6em");

	// patch: seems arguments isn't really an array so let's create one from it
	var argumentsArray = [].splice.call(arguments, 0);

	var gaArgs = ['send', 'event'];
	// append other arguments
	gaArgs = gaArgs.concat(argumentsArray);
	
	// send to google
	if (window.ga) {
		ga.apply(this, gaArgs);
	}
}

function getPaypalLC() {
	var locale = pref("language", window.navigator.language);
	var lang = null;
	if (locale) {
		if (locale.match(/zh/i)) {
			lang = "CN"; 
		} else if (locale.match(/_GB/i)) {
			lang = "GB";
		} else if (locale.match(/ja/i)) {
			lang = "JP";
		} else {
			lang = locale.substring(0,2);
		}
		return lang;
	}
}

function isAsianLangauge() {
	var lang = pref("language", window.navigator.language);
	return /ja|zh|ko/.test(lang);
}

function consoleForceLog(args) {
	origConsoleLog.apply(console, arguments);	
}

function initCommon() {
	// Console...
	origConsoleLog = console.log;
	origConsoleWarn = console.warn;
	origConsoleDebug = console.debug;
	initConsole();

	if (typeof($) != "undefined") {
		$(document).ready(function() {
			initCalendarNames(dateFormat.i18n);
			initMessages();
		});
	}
}

function log(str, prefName) {
	if (pref(prefName)) {
		console.log(str);
	}
}

function getProtocol() {
	return pref("ssl2", true) ? "https" : "http";
}

// Show/hide suboptions at startup
function initOptions() {
	var a=1;
	$("input[type='checkbox'], input[type='radio']").each(function(index) {
		var $fieldset = $(this).parent("legend").parent("fieldset");
		var $options = $fieldset.children(".subOptions").first();
		
		$fieldset.toggleClass("selected", this.checked);		
		$options.toggle(this.checked);

		var key = $(this).attr("pref");
		if (key && chrome.extension.getBackgroundPage().Settings.isExtraFeature(key) && !pref("donationClicked")) {
			// do nothing, because this is an extra feature that the user can't change so don't attach any .change methods because we don't want them expanding the options
		} else {
			// Bind function to show/hide options
			if ($(this).attr("type") == "checkbox") {
				$(this).change(function() {
					$fieldset.toggleClass("selected", this.checked);
					if (this.checked) {
						$options.slideDown();
					} else {
						$options.slideUp();					
					}
				});
			} else if ($(this).attr("type") == "radio") {
				// because the .change AND .blur does not work when "removing" a selected radio - we must instad detect the change in one of the radio in the group and then go through the list to slide/unslide the suboptions
				$(this).change(function() {
					var inputName = $(this).attr("name");
					$("input[name='" + inputName + "']").each(function(index, input) {
						$fieldset = $(this).parent("legend").parent("fieldset");
						$fieldset.toggleClass("selected", this.checked);
						var $subOptions = $fieldset.children(".subOptions").first();
						if (this.checked) {
							$subOptions.slideDown();
						} else {
							$subOptions.slideUp();	
						}
					});
				});
			}
		}
	});
}

function checkPermissions(checkbox, callback) {
	var origins = $(checkbox).attr("origins");
	chrome.permissions.contains({origins: [getMessage("origins_" + origins)]}, function(result) {
		$(checkbox).prop("checked", result)
	});
}

function initPrefAttributes() {
	$("select[pref], input[pref], textarea[pref], input[origins]").each(function(index) {

		var origins = $(this).attr("origins");
		var key = $(this).attr("pref");
		var prefValue;

		if (chrome.extension.getBackgroundPage().Settings.isSettingLocked(key)) {
			$(this)
				.attr("disabled", true)
				.attr("disabledReason", "Disabled by your network administrator")
			;
		}
		
		if (chrome.extension.getBackgroundPage().Settings.isExtraFeature(key)) {
			if ($(this).attr("msg") && !$(this).attr("msgToolTip")) {
				msgName = $(this).attr("msg") + "ToolTip";
			} else {
				msgName = $(this).attr("msgToolTip");
			}
			var msgValue = getMessage(msgName);
			if (msgValue) {
				$(this).parent().attr("msgToolTip", msgValue);
			}
			if (!pref("donationClicked")) {
				$(this).parent().attr("mustDonate", "true");
			}
		}
		
		if (chrome.extension.getBackgroundPage().Settings.defaults[key] != undefined) {
			prefValue = pref(key, chrome.extension.getBackgroundPage().Settings.defaults[key]);
		} else {			
			if (origins) {
				// if pref set on input tag then let's check it's settings value AND then check permissions
				prefValue = key;
				if (prefValue) {
					if (pref(prefValue)) { // if value is true then let's check permissions
						checkPermissions($(this), function(){});
					}
				} else { // no pref set so let's ONLY rely on permissions
					checkPermissions($(this), function(){});
				}
			} else {
				prefValue = pref(key);
			}
		}
		
		if (this.tagName == "INPUT") {
			if ($(this).attr("type") == "checkbox") {
				if (origins) {
					$(this).change(function(event) {
						var checkbox = this;
						if (checkbox.checked) {
							chrome.permissions.request({origins: [getMessage("origins_" + origins)]}, function(granted) {
								checkbox.checked = granted;
								
								// only save setting if had a pref attriute for settings
								if (prefValue) {
									changePref(checkbox, checkbox.checked, event);
								}
							});
						} else {
							if (prefValue) {
								changePref(checkbox, false, event);
							}
							
							if ($(checkbox).attr("revokeIfDisabled")) {
								chrome.permissions.remove({origins: [getMessage("origins_" + origins)]}, function(removed) {
									if (removed) {
										checkbox.checked = false;
									} else {
										// The permissions have not been removed (e.g., you tried to remove required permissions)
										alert("error removing permission");
										checkbox.checked = true;
									}
								});
							}
						}
					});
				} else {
					$(this).attr("checked", prefValue);
					$(this).change(function(event) {
						changePref(this, this.checked, event);
					});
				}
			} else if ($(this).attr("type") == "radio") {
				if ($(this).val() == prefValue) {
					$(this).attr("checked", "true");
				}				
				$(this).change(function(event) {
					changePref(this, $(this).val(), event);
				});
			} else if ($(this).attr("type") == "text") {
				$(this).val(prefValue);
				$(this).change(function() {
					changePref(this, $(this).val(), event);
				});
			} else if ($(this).attr("type") == "range") {
				$(this).val(prefValue);
				$(this).change(function() {
					changePref(this, $(this).val(), event);
				});
			}
		} else if (this.tagName == "SELECT") {
			$(this).val(prefValue);
			$(this).change(function() {
				changePref(this, $(this).val(), event);
			});
		} else if (this.tagName == "TEXTAREA") {
			if (prefValue) {
				$(this).val(prefValue);
			}
			$(this).blur(function() {
				changePref(this, $(this).val(), event);
			});
		}
		
		$(this).on("click change", function(event) {
			console.log("click change", event);
			if (chrome.extension.getBackgroundPage().Settings.isExtraFeature(key) && !pref("donationClicked")) {
				event.preventDefault();
			}
		});
	});
}

function changePref(node, value, event) {
	var key = $(node).attr("pref");
	var isExtraFeature = chrome.extension.getBackgroundPage().Settings.isExtraFeature(key);
	
	if (!isExtraFeature || (isExtraFeature && donationClicked(key))) {
		chrome.extension.getBackgroundPage().Settings.store(key, value);
		return true;
	} else {
		return false;
	}	
}

//patch: for notification window to show tooltips
function SimulateToolTips() {
	var $tooltip = $("<div id='simulatedTooltip' style='background:lightyellow;color:black;box-shadow:4px 4px 10px #555;display:none;z-index:5;max-width:500px;position:absolute;border-radius:2px;border:1px solid #555;padding:1px;font-size:10px'/>");
	$("body").append($tooltip);
	var timer = null;
	var lastNodeHovered;
	
	var selector = "*[title]";
	var namespace = "simulateToolTips";
	
	$(selector).on("mousemove." + namespace, function(event) {
		if (timer) {
			clearTimeout(timer);
		}
		lastNodeHovered = $(this);
		timer = setTimeout(function() {
			var mouseX = event.pageX;
			var mouseY = event.pageY;
			
			// above top so display it below cursor
			if (mouseY < 16) {
				mouseY = 30;
			} else {
				mouseY -= 19;
			}

			if (lastNodeHovered.attr("title")) {
				$tooltip
					.html(lastNodeHovered.attr("title"))
					.css({left:mouseX-12, top:mouseY})
					.show();
			}
		}, 500);
		return false;
	}).on("mouseleave." + namespace, function() {
		clearTimeout(timer);
		$tooltip.hide();
	});

	SimulateToolTips.disable = function() {
		$(selector).off("mousemove." + namespace).off("mouseleave." + namespace);
		clearTimeout(timer);
		$tooltip.hide();
	}

	return SimulateToolTips;
}

function showTooltip(content) {
	$("#tooltip").html(content);
	var mouseX = event.pageX;
	var mouseY = event.pageY;
	$("#tooltip").css({left:mouseX+24, top:mouseY+8});
	$("#tooltip").show();
}

function initToolTips() {
	var $tooltip = $("<div id='tooltip' style='color:black;box-shadow:4px 4px 10px #555;display:none;z-index:5;max-width:500px;position:absolute;border-radius:5px;border:1px solid #555;background:lightyellow;padding:4px;font-size:100%'/>");
	$("body").append($tooltip);
	
	$(document).on("mousemove mouseleave", "*[mustDonate], *[msg], *[msgToolTip]", function(event) {
		// for labels mainly
		var msgName;
		
		if ($(this).attr("msg") && !$(this).attr("msgToolTip")) {
			msgName = $(this).attr("msg") + "ToolTip";
		} else {
			msgName = $(this).attr("msgToolTip");
		}
		if (event.type == 'mousemove') {
			var donateHTML = "<div style='font-weight:bold;white-space:nowrap;color:darkorange'>(" + getMessage("donationRequired") + ")</div>";
			var showDonateMsg = !pref("donationClicked") && $(this).attr("mustDonate");

			if (msgName) {
				var msgValue = getMessage(msgName);
				if (msgValue) {
					if (showDonateMsg) {
						showTooltip(msgValue + donateHTML);
					} else {
						showTooltip(msgValue);
					}						
				}
			} else {
				if (showDonateMsg) {
					showTooltip(donateHTML);
				}				
			}
		} else if (event.type == 'mouseleave') {
			$("#tooltip").hide();				
		}
	});	
}

function initConsole() {
	if (pref("console_messages")) {
		/*
		 * was causing <exception> errors in latest chrome version
		chrome.extension.getBackgroundPage().console.log = console.log = origConsoleLog;
		chrome.extension.getBackgroundPage().console.warn = console.warn = origConsoleWarn;
		chrome.extension.getBackgroundPage().console.debug = console.debug = origConsoleDebug;
		*/
		console.log = origConsoleLog;
		console.warn = origConsoleWarn;
		console.debug = origConsoleDebug;
	} else {
		chrome.extension.getBackgroundPage().console.log = chrome.extension.getBackgroundPage().console.debug = console.log = function(msg){};
	}
}

function initCalendarNames(obj) {
	
	obj.monthNamesShort = getMessage("monthsArray").split(",");
	
	/*
	if (Calendar._DN) {
		for (var a=0; a<7; a++) {
			obj.dayNames[a] = Calendar._DN[a];
			var SDNLen = Calendar._SDN_len;
			if (Calendar._SDN) {
				obj.dayNamesShort[a] = Calendar._SDN[a];
			} else {
				if (!SDNLen) {
					SDNLen = 3;
				}
				obj.dayNamesShort[a] = Calendar._DN[a].substring(0, SDNLen);
			}
		}
		for (var a=0; a<12; a++) {
			if (Calendar._MN) {
				obj.monthNames[a] = Calendar._MN[a];
				var SMNLen = Calendar._SMN_len;
				if (Calendar._SMN) {
					obj.monthNamesShort[a] = Calendar._SMN[a];
				} else {
					if (!SMNLen) {
						SMNLen = 3;
					}
					obj.monthNamesShort[a] = Calendar._MN[a].substring(0, SMNLen);
				}
			}
		}
	}
	*/
}

function initMessages(node) {

	// options page only for now..
	if (location.href.indexOf("options.html") != -1) {		
		$("html").attr("dir", getMessage("dir"));
	}
	
	// used to target certain divs in a page for direction:rtl etc.
	$("html").addClass(getMessage("dir"));

	var selector;
	if (node) {
		selector = node;
	} else {
		selector = "*";
	}
	$(selector).each(function() {
		//var parentMsg = $(this);
		var attr = $(this).attr("msg");
		if (attr) {
			var msgArg1 = $(this).attr("msgArg1");
			if (msgArg1) {
				$(this).text(getMessage( $(this).attr("msg"), msgArg1 ));
				var msgArg2 = $(this).attr("msgArg2");
				if (msgArg2) {
					$(this).text(getMessage( $(this).attr("msg"), [msgArg1, msgArg2] ));
				}
			} else {
				// look for inner msg nodes to replace before...
				var innerMsg = $(this).find("*[msg]");
				if (innerMsg.exists()) {
					initMessages(innerMsg);
					var msgArgs = new Array();
					innerMsg.each(function(index, element) {
						msgArgs.push( $(this).get(0).outerHTML );
					});
					$(this).html(getMessage(attr, msgArgs));
				} else {
					$(this).text(getMessage(attr));
				}
			}
		}
		attr = $(this).attr("msgTitle");
		if (attr) {
			$(this).attr("title", getMessage(attr));
		}
		attr = $(this).attr("msgSrc");
		if (attr) {
			$(this).attr("src", getMessage(attr));
		}
		attr = $(this).attr("msgValue");
		if (attr) {
			$(this).attr("value", getMessage(attr));
		}
		attr = $(this).attr("msgPlaceholder");
		if (attr) {
			$(this).attr("placeholder", getMessage(attr));
		}
		attr = $(this).attr("msgHTML");
		if (attr) {
			$(this).html(getMessage(attr));
		}
	});
}

function donationClicked(action, ls) {
	if (pref("donationClicked", null, ls)) {
		return true;
	} else {
		var url = "donate.html?action=" + action;
		/*
		try {
			// this was not working AND NOT returning an error??? bug in Canary
			chrome.tabs.create({url:url});
		} catch (e) {
			// Must be in a content_script or somewhere chrome.tabs.create cannot be called so send call to background.js
			chrome.runtime.sendMessage({name: "openTab", url:url}, function(response) {
				}
			);
		}
		*/
		chrome.runtime.sendMessage({command: "openTab", url:url});
		return false;
	}
}

function getChromeWindows(callback) {
	chrome.windows.getAll({}, function(windowList) {
		// keep only normal windows and not app windows like debugger etc.
		var normalWindows = new Array();
		for (var a=0; a<windowList.length; a++) {
			if (windowList[a].type == "normal") {
				normalWindows.push(windowList[a]);
			}
		}
		callback({windowList:windowList, normalWindows:normalWindows});
	});
}

// params: url or {url, urlToFind}
function createTab(params, callback) {	
	var url;
	
	// Determine if object passed as param
	if (params.url) {
		url = params.url;
	} else {
		url = params;
	}
	if (!callback) {
		callback = function() {};
	}
	getChromeWindows(function(windowsParams) {
		if (windowsParams.normalWindows.length == 0) { //isLiteVersion() &&
			//chrome.extension.getBackgroundPage().console.log("chrome.windows.create");
			console.log('create window')
			chrome.windows.create({url:url, focused:true}, function(window) {
				console.log("window details: ", window);
				chrome.windows.getAll({populate:true}, function(windowList) {
					console.log("winodw list: ", windowList);
					if (windowList) {
						for (var a=0; a<windowList.length; a++) {
							if (windowList[a].id == window.id) {
								console.log("found window: ", windowList);
								for (var b=0; b<windowList[a].tabs.length; b++) {
									if (windowList[a].tabs[b].url == url) {										
										// force focus window cause it doesn't awlays happen when creating window with url
										chrome.windows.update(windowList[a].id, {focused:true}, function() {
											chrome.extension.getBackgroundPage().console.log("force window found")
											chrome.tabs.update(windowList[a].tabs[b].id, {active:true}, callback);
										});
										break;
									}
								}
								break;
							}
						}
					}
				});
				/*
				chrome.windows.get(window.id, function(window) {
					console.log("window get: ", window);
				});
				*/
			});
		} else {
			//chrome.extension.getBackgroundPage().console.log("chrome.tabs.create");
			//chrome.tabs.create({url:url}, callback);
			selectOrCreateTab(params, callback);
		}		
	});
}

// params: url or {url, urlToFind}
// OLD: findUrlStr, urlToOpen
function selectOrCreateTab(params, callback) {
	var url;
	
	// Determine if object passed as param
	if (params.url) {
		url = params.url;
	} else {
		url = params;
	}
	
	if (params.urlToFind) {
		chrome.windows.getAll({populate:true}, function (windows) {
			for(var a=0; a<windows.length; a++) {
				var tabs = windows[a].tabs;
				for(var b=0; b<tabs.length; b++) {
					if (tabs[b].url.indexOf(params.urlToFind) != -1) {
						// window focused bug fixed yay!
						chrome.windows.update(windows[a].id, {focused:true}, function() {
							chrome.tabs.update(tabs[b].id, { active: true });
							callback({found:true, tab:tabs[b]});
						});
						return true;
					}
				}
			}
			createTabAndFocusWindow(url, function(response) {
				callback({found:false, tab:response.tab});
			});
			return false;
		});
	} else {
		createTabAndFocusWindow(url, function(response) {
			callback({found:false, tab:response.tab});
		});
	}
}

function createTabAndFocusWindow(url, callback) {
	chrome.tabs.create({url: url}, function(tab) {
		chrome.windows.update(tab.windowId, {focused:true}, function() {
			if (callback) {
				callback(tab);
			}
		});						
	});
}

function removeNode(id) {
	var o = document.getElementById(id);
	if (o) {
		o.parentNode.removeChild(o);
	}
}

function addCSS(id, css) {
	removeNode(id);
	var s = document.createElement('style');
	s.setAttribute('id', id);
	s.setAttribute('type', 'text/css');
	s.appendChild(document.createTextNode(css));
	(document.getElementsByTagName('head')[0] || document.documentElement).appendChild(s);
}

function pad(str, times, character) { 
	var s = str.toString();
	var pd = '';
	var ch = character ? character : ' ';
	if (times > s.length) { 
		for (var i=0; i < (times-s.length); i++) { 
			pd += ch; 
		}
	}
	return pd + str.toString();
}

function toBool(str) {
	if ("false" === str || str == undefined) {
		return false;
	} else if ("true" === str) {
		return true;
	} else {
		return str;
	}
}

// This pref function is different*** we pass either just the param to localStorage[param] or the value of localStorage["example"]
function pref(param, defaultValue, ls) {
	var value;
	if (ls) {
		value = ls[param];
	} else {
		value = bg.Settings.read(param);
	}
	if (defaultValue == undefined) {
		defaultValue = false;
	}
	return value == null ? defaultValue : toBool(value);
}

function getUrlValue(url, name, unescapeFlag) {
	if (url) {
	    var hash;
	    var hashes = url.slice(url.indexOf('?') + 1).split('&');
	    for(var i=0; i<hashes.length; i++) {
	        hash = hashes[i].split('=');
	        // make sure no nulls
	        if (hash[0] && name) {
				if (hash[0].toLowerCase() == name.toLowerCase()) {
					if (unescapeFlag) {
						return unescape(hash[1]);
					} else {
						return hash[1];
					}
				}
	        }
	    }
	    return null;
	}
}

function setUrlParam(url, param, value) {
	var params = url.split("&");
	for (var a=0; a<params.length; a++) {
		var idx = params[a].indexOf(param + "=");
		if (idx != -1) {
			var currentValue = params[a].substring(idx + param.length + 1);
			return url.replace(param + "=" + currentValue, param + "=" + value);
		}
	}
	
	// if there is a hash tag only parse the part before;
	var urlParts = url.split("#");
	var newUrl = urlParts[0];
	
	if (newUrl.indexOf("?") == -1) {
		newUrl += "?";
	} else {
		newUrl += "&";
	}
	
	newUrl += param + "=" + value;
	
	// we can not append the original hashtag (if there was one)
	if (urlParts.length >= 2) {
		newUrl += "#" + urlParts[1];
	}
	
	return newUrl;
}

function getCookie(c_name) {
	if (document.cookie.length>0) {
	  c_start=document.cookie.indexOf(c_name + "=");
	  if (c_start!=-1) {
	    c_start=c_start + c_name.length+1;
	    c_end=document.cookie.indexOf(";",c_start);
	    if (c_end==-1) c_end=document.cookie.length;
	    return unescape(document.cookie.substring(c_start,c_end));
	    }
	  }
	return "";
}

function exists(o) {
	if (o) {
		return true;
	} else {
		return false;	
	}	
}

function getExtensionIDFromURL(url) {
	//"chrome-extension://dlkpjianaefoochoggnjdmapfddblocd/options.html"
	return url.split("/")[2]; 
}

function getStatus(request, textStatus) {
	var status; // status/textStatus combos are: 201/success, 401/error, undefined/timeout
	try {
		status = request.status;
	} catch (e) {
		status = textStatus;
	}
	return status;
}

function setTodayOffsetInDays(days) {
	var offset = today();
	offset.setDate(offset.getDate()+parseInt(days));
	localStorage["today"] = offset;
}

function clearTodayOffset() {
	localStorage.removeItem("today");
}

function addToArray(str, ary) {
	for (var a=0; a<ary.length; a++) {
		if (ary[a] == str) {
			return false;
		}
	}
	ary.push(str);
	return true;
}

function removeFromArray(str, ary) {
	for (var a=0; a<ary.length; a++) {
		if (ary[a] == str) {
			ary.splice(a, 1);
			return true;
		}
	}
	return false;
}

function isInArray(str, ary) {
	for (var a=0; a<ary.length; a++) {
		if (isSameUrl(ary[a], str)) {
			return true;
		}
	}
	return false;
}

function isSameUrl(url1, url2) {
	return removeProtocol(url1) == removeProtocol(url2);
}

function removeProtocol(url) {
	if (url) {
		return url.replace(/https?:\/\//g, "");
	} else {
		return url;
	}
}

function findTag(str, name) {
	if (str) {
		var index = str.indexOf("<" + name + " ");
		if (index == -1) {
			index = str.indexOf("<" + name + ">");
		}
		if (index == -1) {
			return null;
		}
		var closingTag = "</" + name + ">";
		var index2 = str.indexOf(closingTag);
		return str.substring(index, index2 + closingTag.length);
	}
}

function rotate(node, params) {
	// can't rotate <a> tags for some reason must be the image inside if so
	var rotationInterval;
	if (params && params.forever) {
		node.css({WebkitTransition: "all 10ms linear"});
		var degree = 0;
		rotationInterval = setInterval(function() {
	    	node.css({WebkitTransform: 'rotate(' + (degree+=2) + 'deg)'}); //scale(0.4) translateZ(0)
	    }, 2);
	} else {
		node.css({WebkitTransition: "all 1s ease-out"}); //all 1000ms linear
		node.css({WebkitTransform: "rotateZ(360deg)"}); //-webkit-transform: rotateZ(-360deg);
	}
	return rotationInterval;
}

function trimLineBreaks(str) {
	if (str) {
		str = str.replace(/^\n*/g, "");
		str = str.replace(/\n*$/g, "");
	}
	return str;
}

function cleanEmailSubject(subject) {
	if (subject) {
		subject = subject.replace(/^re: ?/i, "");
		subject = subject.replace(/^fwd: ?/i, "");
	}
	return subject;	
}

function extractEmails(text) {
    return text.match(/([a-zA-Z0-9.!#$%^_+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

function getHost(url) {
	if (url) {
		var matches = url.match(/:\/\/([^\/?#]*)/);
		if (matches && matches.length >=2) {
			return matches[1];
		}
	}
}

function ellipsis(str, cutoffLength) {	
	if (str && str.length > cutoffLength) {
		str = str.substring(0, cutoffLength) + " ...";
	}
	return str;
}

if (document.location.href.startsWith("chrome-extension://")) {

	// moved init analytics here/outside of initCommon becuase that was only being called if wrappeddb.open and (i think) that was causing missed analytics oninstall update events
	if (typeof($) != "undefined") {
		$(document).ready(function() {
			// For some reason including scripts for popup window slows down popup window reaction time, so only found that settimeout would work
			if (document.location.href.match("popup.html")) {
				setTimeout(function() {
					initAnalytics();
				}, 1);
			} else {
				initAnalytics();
			}
		});
	}
	
	if (chrome.extension.getBackgroundPage() && chrome.extension.getBackgroundPage().wrappedDB && chrome.extension.getBackgroundPage().wrappedDB.opened) {
		initCommon();
	}
}

//return 1st active tab
function getActiveTab(callback) {
	chrome.tabs.query({'active': true}, function(tabs) {
		if (tabs && tabs.length >= 1) {
			callback(tabs[0]);
		} else {
			callback();
		}
	});
}

function beautify(string) {
    return string.replace(/([+.,])$/, '').replace(/^([+.,])/, '');
}

/*
 * -----------------------------------------------------------------------------
 *  Function for filtering text from "bad" characters and preppare text
 *  for Google Text to Speech API
 * -----------------------------------------------------------------------------
*/	
function filterTextForGoogleSpeech(text) {
	var j = 0,
	str = [],
	tmpstr =[],
	maxlength = 90, // Max length of one sentence this is Google's fault :)
	badchars = ["+","#","@","-","<",">","\n","!","?",":","&",'"',"  ","。"],
	replaces = [" plus "," sharp "," at ","","","","",".",".","."," and "," "," ","."];

	for(var i in badchars) // replacing bad chars
	{
		text = text.split(badchars[i]).join(replaces[i]);		
	}

	str = text.split(/([.,!?:])/i); // this is where magic happens :) :)

	for(var i in str) //join and group sentences
	{
		if(tmpstr[j] === undefined)
		{
			tmpstr[j] = '';
		}

		if((tmpstr[j]+str[i]).length < maxlength)
		{
			tmpstr[j] = tmpstr[j]+str[i].split(' ').join('+');
		}
		else
		{
			tmpstr[j] = beautify(tmpstr[j]);

			if(str[i].length < maxlength)
			{
				j++;
				tmpstr[j]=beautify(str[i].split(' ').join('+'));
			}
			else
			{
				sstr = split(str[i],maxlength);
				for(x in sstr)
				{
					j++;
					tmpstr[j] = beautify(sstr[x]);
				}
			}
		}
	}
	return tmpstr.filter(String);
}

function isDomainEmail(email) {
	if (/@yahoo\.|@gmail\.|@mail\.|@comcast\.|@googlemail\.|@hotmail\./.test(email)) {
		return false;
	} else {
		return true;
	}
}

function isVisibleInScrollArea( $elm, scrollHeight ) {
	/*
    var vpH = $scroll.height(), // Viewport Height
        st = $scroll.scrollTop(), // Scroll Top
        y = $elm.position().top;
	 */
	var elmTop = $elm.position().top;
    return elmTop >= 0 && elmTop < scrollHeight;
    //return (y > (vpH + st));
}

var defaultDiacriticsRemovalap = [
  {'base':'A', 'letters':'\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F'},
  {'base':'AA','letters':'\uA732'},
  {'base':'AE','letters':'\u00C6\u01FC\u01E2'},
  {'base':'AO','letters':'\uA734'},
  {'base':'AU','letters':'\uA736'},
  {'base':'AV','letters':'\uA738\uA73A'},
  {'base':'AY','letters':'\uA73C'},
  {'base':'B', 'letters':'\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181'},
  {'base':'C', 'letters':'\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E'},
  {'base':'D', 'letters':'\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779'},
  {'base':'DZ','letters':'\u01F1\u01C4'},
  {'base':'Dz','letters':'\u01F2\u01C5'},
  {'base':'E', 'letters':'\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E'},
  {'base':'F', 'letters':'\u0046\u24BB\uFF26\u1E1E\u0191\uA77B'},
  {'base':'G', 'letters':'\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E'},
  {'base':'H', 'letters':'\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D'},
  {'base':'I', 'letters':'\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197'},
  {'base':'J', 'letters':'\u004A\u24BF\uFF2A\u0134\u0248'},
  {'base':'K', 'letters':'\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2'},
  {'base':'L', 'letters':'\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780'},
  {'base':'LJ','letters':'\u01C7'},
  {'base':'Lj','letters':'\u01C8'},
  {'base':'M', 'letters':'\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C'},
  {'base':'N', 'letters':'\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4'},
  {'base':'NJ','letters':'\u01CA'},
  {'base':'Nj','letters':'\u01CB'},
  {'base':'O', 'letters':'\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C'},
  {'base':'OI','letters':'\u01A2'},
  {'base':'OO','letters':'\uA74E'},
  {'base':'OU','letters':'\u0222'},
  {'base':'OE','letters':'\u008C\u0152'},
  {'base':'oe','letters':'\u009C\u0153'},
  {'base':'P', 'letters':'\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754'},
  {'base':'Q', 'letters':'\u0051\u24C6\uFF31\uA756\uA758\u024A'},
  {'base':'R', 'letters':'\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782'},
  {'base':'S', 'letters':'\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784'},
  {'base':'T', 'letters':'\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786'},
  {'base':'TZ','letters':'\uA728'},
  {'base':'U', 'letters':'\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244'},
  {'base':'V', 'letters':'\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245'},
  {'base':'VY','letters':'\uA760'},
  {'base':'W', 'letters':'\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72'},
  {'base':'X', 'letters':'\u0058\u24CD\uFF38\u1E8A\u1E8C'},
  {'base':'Y', 'letters':'\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE'},
  {'base':'Z', 'letters':'\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762'},
  {'base':'a', 'letters':'\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250'},
  {'base':'aa','letters':'\uA733'},
  {'base':'ae','letters':'\u00E6\u01FD\u01E3'},
  {'base':'ao','letters':'\uA735'},
  {'base':'au','letters':'\uA737'},
  {'base':'av','letters':'\uA739\uA73B'},
  {'base':'ay','letters':'\uA73D'},
  {'base':'b', 'letters':'\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253'},
  {'base':'c', 'letters':'\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184'},
  {'base':'d', 'letters':'\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A'},
  {'base':'dz','letters':'\u01F3\u01C6'},
  {'base':'e', 'letters':'\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD'},
  {'base':'f', 'letters':'\u0066\u24D5\uFF46\u1E1F\u0192\uA77C'},
  {'base':'g', 'letters':'\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F'},
  {'base':'h', 'letters':'\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265'},
  {'base':'hv','letters':'\u0195'},
  {'base':'i', 'letters':'\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131'},
  {'base':'j', 'letters':'\u006A\u24D9\uFF4A\u0135\u01F0\u0249'},
  {'base':'k', 'letters':'\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3'},
  {'base':'l', 'letters':'\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747'},
  {'base':'lj','letters':'\u01C9'},
  {'base':'m', 'letters':'\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F'},
  {'base':'n', 'letters':'\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5'},
  {'base':'nj','letters':'\u01CC'},
  {'base':'o', 'letters':'\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275'},
  {'base':'oi','letters':'\u01A3'},
  {'base':'ou','letters':'\u0223'},
  {'base':'oo','letters':'\uA74F'},
  {'base':'p','letters':'\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755'},
  {'base':'q','letters':'\u0071\u24E0\uFF51\u024B\uA757\uA759'},
  {'base':'r','letters':'\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783'},
  {'base':'s','letters':'\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B'},
  {'base':'t','letters':'\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787'},
  {'base':'tz','letters':'\uA729'},
  {'base':'u','letters': '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289'},
  {'base':'v','letters':'\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C'},
  {'base':'vy','letters':'\uA761'},
  {'base':'w','letters':'\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73'},
  {'base':'x','letters':'\u0078\u24E7\uFF58\u1E8B\u1E8D'},
  {'base':'y','letters':'\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF'},
  {'base':'z','letters':'\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763'}
  ];

var diacriticsMap = {};
for (var i=0; i < defaultDiacriticsRemovalap.length; i++){
      var letters = defaultDiacriticsRemovalap[i].letters.split("");
      for (var j=0; j < letters.length ; j++){
          diacriticsMap[letters[j]] = defaultDiacriticsRemovalap[i].base;
      }
}

// actually @skerit  version... look at http://jsperf.com/diacritics/8
function removeDiacritics(str) {
      var result = "", length = str.length, i;
      for(i=0; i< length; i++) {
          result += diacriticsMap[str[i]] || str[i];
      }
      return result;
}

function ChromeTTS() {
	
	var chromeTTSMessages = new Array();
	var speaking = false;
	
	ChromeTTS.queue = function(msg, options, callback) {
		// this might have fixed the endless loop
		if (msg != null && msg != "") {
			if (!options) {
				options = {};
			}
			
			if (!callback) {
				callback = function() {};
			}
			
			options.utterance = msg;
			chromeTTSMessages.push(options);
			play(callback);
		}
	};
	
	ChromeTTS.stop = function() {
		if (chrome.tts) {
			chrome.tts.stop();
		}
		chromeTTSMessages = new Array();
		speaking = false;
	};
	
	ChromeTTS.isSpeaking = function() {
		return speaking;
	}
	
	function play(callback) {
		if (!callback) {
			callback = function() {};
		}
		
		if (chromeTTSMessages.length) {
			chrome.tts.isSpeaking(function(speakingParam) {
				console.log(speaking + " _ " + speakingParam);
				if (!speaking && !speakingParam) {
					// decoded etity codes ie. &#39; is ' (apostrohpe)
					var ttsMessage = $("<div/>").html(chromeTTSMessages[0].utterance).text();
					
					var voiceParams = chrome.extension.getBackgroundPage().Settings.read("voice");
					
					var voiceName;
					var extensionID;
					// if specified use it instead of the default 
					if (chromeTTSMessages[0].voiceName) {
						voiceName = chromeTTSMessages[0].voiceName;
						extensionID = "";
					} else {
						voiceName = voiceParams.split("___")[0];
						extensionID = voiceParams.split("___")[1];
					}
					
					var MULTINGUAL_EXTENSION_ID = "colheiahjiadjgeideiglpokapnhifph";
					var GOOGLE_NETWORK_SPEECH_EXTENSION_ID = "neajdppkdcdipfabeoofebfddakdcjhd";
					
					// patch because Google tts voices would break the tts engine when trying to speak words with accents (ie. Google US English)
					// however, apparently the multilingual voice can do it, so ignore removing accents if that is used
					if (extensionID == GOOGLE_NETWORK_SPEECH_EXTENSION_ID && localStorage.removeDiacritics == "true") {
						ttsMessage = removeDiacritics(ttsMessage); // this methods removes all accents etc.
					}

					console.log("speak: " + ttsMessage);
					speaking = true;
					chrome.tts.stop();
					
					// delay between plays
					setTimeout(function() {
						
						chromeTTSMessages[0].speakCommandExecuteTime = new Date();
						
						// check the time between when we executed the speak command and the time between the actual "start" event happened (if it doesn't happen then let's break cause we could be stuck)
						var speakNotStartedTimer = setTimeout(function() {
							console.log("start event never happened: so stop voice");
							// stop will invoke the "interuppted" event below and it will process end/next speak events
							chrome.tts.stop();
						}, seconds(5));
						
						chrome.tts.speak(ttsMessage, {
							voiceName: voiceName,
							extensionId : extensionID,
							//enqueue : true,
							volume: pref("voiceSoundVolume") / 100,
							pitch: parseFloat(pref("pitch")),
							rate: parseFloat(pref("rate")),
							onEvent: function(event) {
								console.log('event: ' + event.type);
								if (event.type == "start") {
									clearTimeout(speakNotStartedTimer);
								} else if (event.type == "interrupted" || event.type == 'error' || event.type == 'end') {
									clearTimeout(speakNotStartedTimer);									
									chromeTTSMessages.shift();
									speaking = false;
									play(callback);
								}
							}
						}, function() {
							if (chrome.runtime.lastError) {
						        logError('speech error: ' + chrome.runtime.lastError.message);
							}
						});
						
					}, 150);
				} else {
					console.log("already speaking, wait before retrying...");
					setTimeout(function() {
						play(callback);
					}, 1000);
				}
			});
		} else {
			callback();
		}
	}
}

function openWindowInCenter(url, title, specs, popupWidth, popupHeight) {
	var left = (screen.width/2)-(popupWidth/2);
	var top = (screen.height/2)-(popupHeight/2);
	return window.open(url, title, specs + ", width=" + popupWidth + ", height=" + popupHeight + ", top=" + top + ", left=" + left)
}

function LineReader(str) {
	var SEP = "\r\n";
	this.currentIndex = 0;
	
	this.readLine = function() {
        // detect if at the end of string
        if (this.currentIndex == str.length) {
            return null;
        } else {
            var sepIndex = str.indexOf(SEP, this.currentIndex);
            if (sepIndex == -1) {
                // return the rest of the string
                var line = str.substr(this.currentIndex);
                this.currentIndex = str.length;
                return line;
            } else {
                var line = str.substring(this.currentIndex, sepIndex);
                this.currentIndex = sepIndex + SEP.length;
                return line;
            }
        }
	}
}

function parseBodyParts(jqXHR) {
	var httpResponses = [];
	
	var contentType = jqXHR.getResponseHeader("content-type"); // multipart/mixed; boundary=batch_Al0uYHFsObA=_AAFnntVKyPs=
	//console.log("contentType", contentType);
	var boundary = contentType.match(/.*\n?.*boundary=\"?([^\r\n\"']*)/i);
	if (boundary) {
		boundary = boundary[1];
	}
	
	//console.log("boundary: " + boundary);

	var bodyParts = jqXHR.responseText.split("--" + boundary);
	for (var a=0; a<bodyParts.length; a++) {
		//console.log("part: " + bodyParts[a].substr(0, 1000));
		
		if (bodyParts[a].length >= 10) { // because -- means end of body
			/* example:
			Content-Type: application/http
			
			HTTP/1.1 200 OK
			ETag: "gbmbZs68sGGWei7engZdferRE3M/kD5-Hkz3T496rt9xks8mnnwGENY"
			Content-Type: application/json; charset=UTF-8
			Date: Sun, 20 Jul 2014 15:56:25 GMT
			Expires: Sun, 20 Jul 2014 15:56:25 GMT
			Cache-Control: private, max-age=0
			Content-Length: 1186337
			
			bodyblahblah...
		 */

			var httpResponse = {};
			
			var emptyLines = 0;
			var lr = new LineReader(bodyParts[a]);
			while ((line = lr.readLine()) != null) {
				//console.log("line: " + "|" + line + "|");
				if (line == "") {
					emptyLines++;
					//console.log("empty line: " + emptyLines);
					if (emptyLines == 3) {
						//console.log("process body");
						httpResponse.body = bodyParts[a].substr(lr.currentIndex);
						break;
					}
				} else {
					if (line.indexOf("HTTP") != -1) {
						httpResponse.status = line;
						if (line.hasWord("200")) {
							httpResponse.statusText = "success";
						} else {
							httpResponse.statusText = line;
						}
					} else {
						// process other headers here...
						
					}
				}
			}
			
			/*
			// get first bunch of characters to parse
			var firstBunchOfLines = bodyParts[a].substring(0, 1000);
			// split lines into array
			firstBunchOfLines = firstBunchOfLines.match(/[^\r\n]+/g);
			*/
		
			httpResponses.push(httpResponse);			
		}
	}

	return httpResponses;
}

// mimics official Google gapi.client - https://developers.google.com/api-client-library/javascript/reference/referencedocs
function MyGAPIClient() {
}

MyGAPIClient.prototype = {
	request: function(args) {
		return args;
	}
}

// static method
MyGAPIClient.getHeaderValue = function(headers, name) {
	if (headers) {
		for (var a=0; a<headers.length; a++) {
			if (name.equalsIgnoreCase(headers[a].name)) {
				return headers[a].value;
			}
		}
	}
}

function HttpBatch() {
	var MAX_CALLS_PER_BATCH = 100;
	
	var httpRequests = [];
	var LF = "\n";
	var data = "";
	
	function addDataLine(str) {
		data += str + LF;
	}

	this.add = function(httpRequest, optParams) {
		if (httpRequests.length > MAX_CALLS_PER_BATCH) {
			throw new Error("JError: Exceeded maximum calls per batch: " + MAX_CALLS_PER_BATCH);
		} else {
			httpRequests.push(httpRequest);
		}
	};
	
	// Usage: params: .oauthRequest, .tokenResponse OR .email
	this.execute = function(sendOAuthParams) {
		return new Promise(function(resolve, reject) {
			var boundary = "batch_sep";
			
			var totalContentLength = 0;
			for (var a=0; a<httpRequests.length; a++) {
				addDataLine("");
				addDataLine("--" + boundary);
				addDataLine("Content-Type: application/http");
				addDataLine("");
				addDataLine(httpRequests[a].method + " " + httpRequests[a].path);
			}
			addDataLine("--" + boundary + "--");
			
			// if no token passed then use email
			var tokenResponse = sendOAuthParams.tokenResponse;
			if (!tokenResponse) {
				tokenResponse = sendOAuthParams.oauthRequest.findTokenResponse({userEmail:sendOAuthParams.email});
			}
			
			sendOAuthParams.oauthRequest.send({tokenResponse:tokenResponse, type:"POST", url: GmailAPI.DOMAIN + "/batch", contentType:"multipart/mixed", boundary:boundary, headers:{"Content-Length":totalContentLength}, data:data}, function(sendResponse) {
				if (sendResponse.error) {
					reject(sendResponse);
				} else {
					console.log("batch response", sendResponse);
					
					var httpResponses = parseBodyParts(sendResponse.jqXHR);
					var httpBodies = [];
					console.log("parsed parts parsed", httpResponses);
					
					httpResponses.forEach(function(httpResponse) {
						try {
							httpResponse.body = JSON.parse(httpResponse.body);
							if (httpResponse.statusText != "success") {
								httpResponse.error = httpResponse.body.error.message;
								httpResponse.code = httpResponse.body.error.code;
								if (httpResponse.body.error.code == 404) {
									httpResponse.body.jerror = JError.NOT_FOUND;
									console.warn("might be permanently deleted: " + httpResponse.body.error.message);
								} else {
									logError("execute error: " + httpResponse.body.error.message);
								}
							}
						} catch (e) {
							logError("execute error2: " + e + " body: " + httpResponse.body);
							httpResponse.error = httpResponse.body;
							httpResponse.body = {};
							httpResponse.body.error = {message:httpResponse.error};
						}
						httpBodies.push(httpResponse.body);
					});
					resolve({httpResponses:httpResponses, httpBodies:httpBodies});
				}
			});
		});
	}

}

function getMyGAPIClient() {
	var mygapiClient = new MyGAPIClient();
	mygapiClient.HttpBatch = new HttpBatch();
	return mygapiClient;
}

function OAuthForDevices(params) {
	
	var GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/auth";
	var GOOGLE_TOKEN_URL = "https://accounts.google.com/o/oauth2/token";
	var GOOGLE_CLIENT_ID = "450788627700.apps.googleusercontent.com";
	var GOOGLE_CLIENT_SECRET = "Wf-ObXmgsyANHeWZD-1AWJ2H";
	var GOOGLE_REDIRECT_URI = "urn:ietf:wg:oauth:2.0:oob";

	// Need this because 'this' keyword will be out of scope within this.blah methods like callbacks etc.
	var that = this;
	
	this.oauthParams = params;
	if (!this.oauthParams.tokenResponses) {
		this.oauthParams.tokenResponses = new Array();
	}
	this.params = null;
	this.callback = null;
	
	this.getStateParam = function() {
		return that.oauthParams.state;
	}
	
	// return array
	this.getUserEmails = function() {
		var userEmails = new Array();
		$.each(that.oauthParams.tokenResponses, function(index, tokenResponse) {
			userEmails.push(tokenResponse.userEmail);
		});
		return userEmails;
	}

	if (params.getUserEmail) {
		// override default with this method
		this.getUserEmail = params.getUserEmail;
	} else {
		// default getUserEmail	
		this.getUserEmail = function(tokenResponse, sendOAuthRequest, callback) {
			sendOAuthRequest({tokenResponse:tokenResponse, type:"GET", url: GmailAPI.URL + "profile"}, function(response) {
				if (response.error) {
					response.error += " (Could not get userinfo - email)";
					logError(response.error);
					callback(response);
				} else {
					var data = JSON.parse(response.jqXHR.responseText);
					response.userEmail = data.emailAddress;
					callback(response);
				}				
			});
			/*
			sendOAuthRequest({tokenResponse:tokenResponse, type:"GET", url: GmailAPI.URL + "threads", data:{includeSpamTrash:true, maxResults:5}}, function(response) {
				if (response.error) {
					response.error += " (Could not get userinfo - email)";
					logError(response.error);
					callback(response);
				} else {
					var data = JSON.parse(response.jqXHR.responseText);
					
					var mygapiClient = getMyGAPIClient();
					
					data.threads.forEach(function(thread) {
						console.log("thread id: " + thread.id);
						var httpRequest = mygapiClient.request({
							path: GmailAPI.PATH + "threads/" + thread.id,
							method: "GET"
						});
						mygapiClient.HttpBatch.add(httpRequest);
					});
					
					mygapiClient.HttpBatch.execute({oauthRequest:that, tokenResponse:tokenResponse}).then(function(batchResponse) {
						var email;
						batchResponse.httpBodies.forEach(function(httpBody) {
							var deliveredTo = MyGAPIClient.getHeaderValue(httpBody.messages.first().payload.headers, "Delivered-To");
							if (deliveredTo) {
								email = deliveredTo;
							}
						});
						
						if (email) {
							response.userEmail = email;
						} else {
							response.error = "Could not determine email";
						}
						callback(response);
					}).catch(function(errorResponse) {
						response.error = errorResponse;
						callback(response);
					});
				}
			});		
			*/
		}
	}

	function onTokenChangeWrapper(params) {
		// expires_in params is in seconds (i think)
		params.tokenResponse.expiryDate = new Date(nowInMillis() + (params.tokenResponse.expires_in * 1000));
		that.onTokenChange(params, that.oauthParams.tokenResponses);
	}	

	function onTokenErrorWrapper(tokenResponse, response) {
		// 400 is returned when refresing token and 401 when .send returns... // means user has problably revoked access: statusText = Unauthorized message = Invalid Credentials
		if ((response.oauthAction == "refreshToken" && response.jqXHR.status == 400) || response.jqXHR.status == 401) {
			//console.error("user probably revoked access so removing token:", response);
			//that.removeTokenResponse(tokenResponse);			
			that.onTokenError(tokenResponse, response);
		}
	}	

	// params: changedToken, allTokens
	this.onTokenChange = function() {};
	this.onTokenError = function() {};
	
	this.openPermissionWindow = function() {
		return openWindowInCenter(GOOGLE_AUTH_URL + "?prompt=select_account&response_type=code&client_id=" + GOOGLE_CLIENT_ID + "&redirect_uri=" + GOOGLE_REDIRECT_URI + "&scope=" + encodeURIComponent(that.oauthParams.scope) + "&state=" + that.oauthParams.state, 'oauth', 'toolbar=0,scrollbars=0,menubar=0,resizable=0', 900, 700);
	}
	
	this.setOnTokenChange = function(onTokenChange) {
		this.onTokenChange = onTokenChange;
	}
	
	this.setOnTokenError = function(onTokenError) {
		this.onTokenError = onTokenError;
	}
	
	this.generateURL = function(userEmail, url, callback) {
		var tokenResponse = that.findTokenResponse({userEmail:userEmail});
		if (tokenResponse) {
			ensureToken(tokenResponse, function(response) {
				if (response.error) {
					logError("error generating url", response);
				} else {
					// before when calling refreshtoken we used to call this method, notice the tokenResponse came from the response and not that one passed in... params.generatedURL = setUrlParam(url, "access_token", params.tokenResponse.access_token);
					response.generatedURL = setUrlParam(url, "access_token", tokenResponse.access_token);
				}
				callback(response);
			});
		} else {
			callback({error:"No tokenResponse found!"});
		}
	}
	
	function sendOAuthRequest(params, callback) {

		if (!params.type) {
			params.type = "GET";
		}
		
		var accessToken;
		if (params.tokenResponse) {
			accessToken = params.tokenResponse.access_token;
		} else if (params.userEmail) {
			var tokenResponse = that.findTokenResponse(params);	
			accessToken = tokenResponse.access_token;
		}

		if (params.type == "DELETE") {
			params.data = null;
		}

		console.log("sendOAuthRequest: " + params.userEmail + " url: " + params.url);
		
		var ajaxParams = {
			type: params.type,
			url: params.url,
			data: params.data,
			timeout: 10000,
			beforeSend: function(jqXHR, settings) {
				jqXHR.setRequestHeader('Authorization', "OAuth " + accessToken);
			},
			complete: function(jqXHR, textStatus) {
				if (textStatus == "success") {
					callback({jqXHR:jqXHR, textStatus:textStatus});
				} else {
					var error;
					if (jqXHR.responseText) {
						try {
							var errorObject = JSON.parse(jqXHR.responseText);
							params.error = errorObject.error.message;
							params.code = errorObject.error.code;
						} catch (e) {
							logError("error parsing error :) " + e);
						}
					}
					if (!params.error) {
						params.error = textStatus;
					}
					
					logError("error getting data: " + params.error);

					params.jqXHR = jqXHR;
					// seems when offline the code 404 exists in the jqXHR.status so let's copy it to the resonse 
					params.code = jqXHR.status;
					params.textStatus = textStatus;
					callback(params);
				}
			}
		}
		
		if (params.contentType) {
			ajaxParams.contentType = params.contentType;
		}
		if (params.processData != undefined) {
			ajaxParams.processData = params.processData;
		}
		if (params.boundary) {
			ajaxParams.contentType += "; boundary=" + params.boundary;
		}
		
		$.ajax(ajaxParams);
	}
	
	function ensureToken(tokenResponse, callback) {
		if (isExpired(tokenResponse)) {
			console.log("token expired: ", tokenResponse);
			refreshToken(tokenResponse, function(response) {
				callback(response);
			});
		} else {
			callback({});
		}
	}

	function refreshToken(tokenResponse, callback) {
		// must refresh token
		console.log("refresh token: " + tokenResponse.userEmail + " " + now().toString());
		$.ajax({
			type: "POST",
			url: GOOGLE_TOKEN_URL,			
			data: {refresh_token:tokenResponse.refresh_token, client_id:GOOGLE_CLIENT_ID, client_secret:GOOGLE_CLIENT_SECRET, grant_type:"refresh_token"},
			dataType: "json",
			timeout: 5000,
			complete: function(jqXHR, textStatus) {
				if (textStatus == "success") {
					var refreshTokenResponse = JSON.parse(jqXHR.responseText);
					tokenResponse.access_token = refreshTokenResponse.access_token;
					tokenResponse.expires_in = refreshTokenResponse.expires_in;
					tokenResponse.token_type = refreshTokenResponse.token_type;					
					
					var callbackParams = {tokenResponse:tokenResponse};
					onTokenChangeWrapper(callbackParams);
					console.log("in refresh: " + tokenResponse.expiryDate.toString());
					callback(callbackParams);
				} else {
					var callbackParams = {tokenResponse:tokenResponse};
					
					var responseError;
					try {
						var bodyResponse = JSON.parse(jqXHR.responseText);
						responseError = bodyResponse.error;
					} catch (e) {
						responseError = jqXHR.statusText;
					}
					
					callbackParams.code = jqXHR.status;
					
					if (responseError == "invalid_grant") { // code = 400
						callbackParams.error = "You need to re-grant access, it was probably revoked";
					} else {
						callbackParams.error = "error getting new token via refresh token: " + responseError;
					}
					
					callbackParams.jqXHR = jqXHR;
					callbackParams.oauthAction = "refreshToken";
					logError(callbackParams.error);
					callback(callbackParams);
				}
			}
		});
	}
	
	// private isExpired
	function isExpired(tokenResponse) {
		var SECONDS_BUFFER = -300; // 5 min. yes negative, let's make the expiry date shorter to be safe
		return !tokenResponse.expiryDate || today().isAfter(tokenResponse.expiryDate.addSeconds(SECONDS_BUFFER, true));
	}

	// public method, should be called before sending multiple asynchonous requests to .send
	this.ensureTokenForEmail = function(userEmails, callback) {
		
		// if single email passed, put it into an array
		if (!$.isArray(userEmails)) {
			userEmails = [userEmails];
		}
		
		var deferreds = new Array();
		
		$.each(userEmails, function(index, userEmail) {

			var dfd = $.Deferred();
			deferreds.push(dfd);

			var tokenResponse = that.findTokenResponse({userEmail:userEmail});
			if (tokenResponse) {
				ensureToken(tokenResponse, function(response) {
					dfd.resolve(response);
				});
			} else {
				var error = "no token for: " + userEmail + ": might have not have been granted access";
				logError(error);
				// using .resolve instead of .reject because .reject trigers .always immediately without finishing all deferreds! (as intended by jquery)
				dfd.resolve({error:error});
			}
			
			dfd.promise();
		});

		$.when.apply($, deferreds).always(function() {
			// The arguments object is NOT an Array. It is similar to an Array, but does not have any Array properties except length. For example, it does not have the pop method. However it can be converted to a real Array. (ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/arguments)
			var argsArray = Array.prototype.slice.call(arguments);
			if (argsArray.length == 1) {
				callback(argsArray.first());
			} else {
				callback(argsArray);
			}
		});
	}		
	
	this.send = function(params, callback) {
		var dfd = new $.Deferred();
		// save all args in this sendrequet to call it back later
		that.params = params;
		if (!callback) {
			callback = function() {};
		}
		that.callback = callback;
		
		var tokenResponse;
		// if tokenresponse directly passsed here then use it, else let's use the userEmail to find the token
		if (params.tokenResponse) {
			tokenResponse = params.tokenResponse;
		} else {
			tokenResponse = that.findTokenResponse(params);		
		}
		if (tokenResponse) {
			ensureToken(tokenResponse, function(response) {
				if (response.error) {
					onTokenErrorWrapper(tokenResponse, response);						
					response.roundtripArg = params.roundtripArg;						
					callback(response);
					dfd.resolve(response);						
				} else {
					sendOAuthRequest(params, function(response) {
						if (response.error) {
							onTokenErrorWrapper(tokenResponse, response);
						}
						response.roundtripArg = params.roundtripArg;
						callback(response);
						dfd.resolve(response);						
					});
				}
			});			
		} else {
			var error = "no token response found for email: " + params.userEmail;
			console.warn(error, params);
			params.error = error;
			that.callback(params);
			dfd.resolve(params);
		}
		return dfd.promise();
	}
	
	this.findTokenResponseIndex = function(params) {
		for (var a=0; a<that.oauthParams.tokenResponses.length; a++) {
			if (that.oauthParams.tokenResponses[a].userEmail == params.userEmail) {
				return a;
			}
		}
		return -1;
	}
	
	this.findTokenResponse = function(params) {
		var index = that.findTokenResponseIndex(params);
		if (index != -1) {
			return that.oauthParams.tokenResponses[index];
		}
	}

	this.findTokenResponseByIndex = function(index) {
		return that.oauthParams.tokenResponses[index];
	}

	// removes token response and calls onTokenChange to propogate change back to client
	this.removeTokenResponse = function(params) {
		console.log("parms", params)
		for (var a=0; a<that.oauthParams.tokenResponses.length; a++) {
			if (that.oauthParams.tokenResponses[a].userEmail == params.userEmail) {
				that.oauthParams.tokenResponses.splice(a, 1);
				break;
			}
		}
		that.onTokenChange(null, that.oauthParams.tokenResponses);
	}

	this.removeAllTokenResponses = function() {
		that.oauthParams.tokenResponses = [];
		that.onTokenChange(null, that.oauthParams.tokenResponses);
	}

	this.getAccessToken = function(code, callback) {
		if (!code) {
			//alert("authorization code param is required: comes from opening the google grant permission popup");
		}
		that.code = code;
		console.log("get access token: " + now().toString());
		$.ajax({
			type: "POST",
			url: GOOGLE_TOKEN_URL,
			data: {state:"", code:code, client_id:GOOGLE_CLIENT_ID, client_secret:GOOGLE_CLIENT_SECRET, redirect_uri:GOOGLE_REDIRECT_URI, grant_type:"authorization_code"},
			dataType: "json",
			timeout: 5000,
			complete: function(request, textStatus) {
				if (textStatus == "success") {
					var tokenResponse = JSON.parse(request.responseText);
					
					if (tokenResponse.error) {
						callback({error:tokenResponse.error.message});
					} else {
						that.getUserEmail(tokenResponse, sendOAuthRequest, function(params) {
							if (params.userEmail && !params.error) {
								// add this to response
								tokenResponse.userEmail = params.userEmail;
								
								var tokenResponseIndex = that.findTokenResponseIndex(params);
								if (tokenResponseIndex != -1) {
									// update if exists
									that.oauthParams.tokenResponses[tokenResponseIndex] = tokenResponse;
								} else {
									// add new token response
									that.oauthParams.tokenResponses.push(tokenResponse);
								}
								var callbackParams = {tokenResponse:tokenResponse};
								onTokenChangeWrapper(callbackParams);
								callback(callbackParams);
							} else {
								callback(params);
							}
						});
					}					
				} else {
					callback({error:request.statusText});
				}
			}
		});
	}
	
	this.sendImapRequest = function(email, data, callback) {
		console.log("sendImapRequest: " + email);
		var tokenResponse = that.findTokenResponse({userEmail:email});
		
		ensureToken(tokenResponse, function(response) {
			if (response.error) {
				logError("error ensuring token for sendimap", response);
				callback(response);
			} else {
				var accountHeader = {tokenResponse:tokenResponse, userInfo:{email:tokenResponse.userEmail}};
				console.log("data sent:", data);
				$.ajax({
				   url: "https://apps.jasonsavard.com/gmail/ajax.php",
				   type: "post",
				   headers: {
					   misc:location.href,
					   ensureToken: false,
					   account: JSON.stringify(accountHeader) // must be a string not an object
				   },
				   data: data,
				   timeout: seconds(60),
				   complete: function(jqXHR, textStatus) {
					   callback(jqXHR, textStatus);
				   }
			   });
			}
		});
		
	}
	
}

function DetectSleepMode(wakeUpCallback) {
	var PING_INTERVAL = 60; // 1 minute
	var PING_INTERVAL_BUFFER = 15;
	
	var lastPingTime = new Date();
	var lastWakeupTime = new Date(1); // make the last wakeup time really old because extension starting up does not equal a wakeup 
	
	function lastPingIntervalToolLong() {
		return lastPingTime.diffInSeconds() < -(PING_INTERVAL+PING_INTERVAL_BUFFER);
	}
	
	function ping() {
		if (lastPingIntervalToolLong()) {
			console.log("DetectSleepMode.wakeup time: " + new Date());
			lastWakeupTime = new Date();
			if (wakeUpCallback) {
				wakeUpCallback();
			}
		}
		lastPingTime = new Date();
	}
	
	setInterval(function() {
		ping();
	}, seconds(PING_INTERVAL));
	
	this.isWakingFromSleepMode = function() {
		console.log("DetectSleepMode.last ping: " + lastPingTime);
		console.log("last wakeuptime: " + lastWakeupTime);
		console.log("current time: " + new Date())
		// if last wakeup time was recently set than we must have awoken recently
		if (lastPingIntervalToolLong() || lastWakeupTime.diffInSeconds() >= -(PING_INTERVAL+PING_INTERVAL_BUFFER)) {
			return true;
		} else {
			return false;
		}
	}
}

function Controller() {
	
	// apps.jasonsavard.com server
	Controller.FULLPATH_TO_PAYMENT_FOLDERS = "https://apps.jasonsavard.com/";
	
	// jasonsavard.com server
	//Controller.FULLPATH_TO_PAYMENT_FOLDERS = "https://jasonsavard.com/apps.jasonsavard.com/";

	// internal only for now
	function callAjaxController(params) {
		$.ajax({
			type: "GET",
			url: Controller.FULLPATH_TO_PAYMENT_FOLDERS + "controller.php",
			headers: {"misc":location.href},
			data: params.data,
			dataType: "jsonp",
			jsonp: "jsoncallback",
			timeout: seconds(5),
			success: params.success,
			error: params.error						
		});
	}

	Controller.ajax = function(params, callback) {
		callAjaxController({
			data: params.data,
			success: function(data, textStatus, jqXHR) {
				callback({data:data, textStatus:textStatus, jqXHR:jqXHR});
			},
			error: function(jqXHR, textStatus, errorThrown) {
				callback({error: "jasonerror thrown from controller: " + textStatus + " " + errorThrown, jqXHR:jqXHR, textStatus:textStatus, errorThrown:errorThrown});
			}
		});
	}

	Controller.verifyPayment = function(itemID, emails, callback) {
		callAjaxController({
			data: {action:"verifyPayment", name:itemID, email:emails}, //bg.email
			success: function(data, textStatus, jqXHR) {
				callback(data);
			},
			error: function() {
				callback({error: "jasonerror thrown from controller"});
			}						
		});
	}
	
	Controller.detectLanguage = function(q, callback) {
		callAjaxController({
			data: {action:"detectLanguage", q:q, misc:location.href}, // had to pass misc as parameter because it didn't seem to be passed with header above
			success: function(data, textStatus, jqXHR) {
				callback(data);
			},
			error: function() {
				callback({error: "jasonerror thrown from controller"});
			}						
		});
	}

	Controller.processFeatures = function() {
		chrome.extension.getBackgroundPage().Settings.store("donationClicked", true);
		chrome.runtime.sendMessage({command: "featuresProcessed"}, function(response) {});
	}

	Controller.email = function(params, callback) {
		
		if (!callback) {
			callback = function() {};
		}

		// append action to params
		params.action = "email";
		
		callAjaxController({
			data: params,
			success: function(data, textStatus, jqXHR) {
				callback(data);
			},
			error: function() {
				callback({error: "jasonerror thrown from controller"});
			}						
		});
	}
}

//see if the keypressed event equals the letter passed
function keydown(e, key, comboKeys) {
	if (e) {

		var keyMatched = false;
		if (typeof key == "string") {
			keyMatched = key.toUpperCase().charCodeAt(0) == e.which;
		} else {
			keyMatched = key == e.keyCode;
		}

		if (keyMatched) {
			// init defaults
			
			if (!comboKeys) {
				comboKeys = {};
			}
			if (comboKeys.ctrl == undefined) {
				comboKeys.ctrl = false;
			}
			if (comboKeys.shift == undefined) {
				comboKeys.shift = false;
			}
			if (comboKeys.meta == undefined) {
				comboKeys.meta = false;
			}
			
			var comboKeysMatched = e.ctrlKey == comboKeys.ctrl && e.shiftKey == comboKeys.shift && e.metaKey == comboKeys.meta;
		}
		
		return keyMatched && comboKeysMatched;
	} else {
		return null;
	}
}

function clone(obj) {
	return $.extend(true, {}, obj);
}

function decodeUTF8(s) {
	return decodeURIComponent( escape(s) );
}

function replaceBase64UrlSafeCharacters(str) {
	if (str) {
		str = str.replace(/-/g, '+');
		str = str.replace(/_/g, '/');
	}
	return str;
}

function replaceBase64UrlUnsafeCharacters(str) {
	str = str.replace(/\+/g, '-');
	str = str.replace(/\//g, '_');
	return str;
}

function decodeBase64UrlSafe(str) {
	if (str) {
		str = replaceBase64UrlSafeCharacters(str);
		// Patch: Refer to unicode problem - https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
		return decodeURIComponent(escape(window.atob( str )));
	} else {
		return str;
	}
}

function encodeBase64UrlSafe(str) {
	str = btoa(unescape(encodeURIComponent( str )));
	str = replaceBase64UrlUnsafeCharacters(str);
	return str;
}

function nbsp(count) {
	var str = "";
	for (var a=0; a<count; a++) {
		str += "&nbsp;";
	}
	return str;
}

// used to reduce load or requests: Will randomy select a date/time between now and maxdaysnfrom now and return true when this date/time has passed 
function passedRandomTime(name, maxDaysFromNow) {
	var randomTime = localStorage[name];
	
	// already set a random time let's if we passed it...
	if (randomTime) {
		randomTime = new Date(randomTime);
		// this randomtime is before now, meaning it has passed so return true
		if (randomTime.isBefore()) {
			return true;
		} else {
			return false;
		}
	} else {
		// set a random time
		if (!maxDaysFromNow) {
			maxDaysFromNow = 5; // default 5 days
		}
		var maxDate = new Date();
		maxDate = maxDate.addDays(maxDaysFromNow);
		
		var randomeMilliSecondsFromNow = parseInt(Math.random() * (maxDate.getTime() - Date.now()));
		randomTime = Date.now() + randomeMilliSecondsFromNow;
		randomTime = new Date(randomTime);
		
		console.log("Set randomtime: " + randomTime);
		localStorage[name] = randomTime;
		return false;
	}
}

// usage: JSON.parse(str, dateReviver) find all date strings and turns them into date objects
function dateReviver(key, value) {
	// 2012-12-04T13:51:06.897Z
	if (typeof value == "string" && value.length == 24 && value.match(/\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z/)) {
		return new Date(value);
	} else {
		return value;
	}
}

var getTextHeight = function(font) {
	  var text = $('<span>Hg</span>').css({ fontFamily: font });
	  var block = $('<div style="display: inline-block; width: 1px; height: 0px;"></div>');

	  var div = $('<div></div>');
	  div.append(text, block);

	  var body = $('body');
	  body.append(div);

	  try {

	    var result = {};

	    block.css({ verticalAlign: 'baseline' });
	    result.ascent = block.offset().top - text.offset().top;

	    block.css({ verticalAlign: 'bottom' });
	    result.height = block.offset().top - text.offset().top;

	    result.descent = result.height - result.ascent;

	  } finally {
	    div.remove();
	  }

	  return result;
};

//usage: niceAlert(message, [params], [callback])
function niceAlert(message, params, callback) {
	if (arguments.length == 1) {
		params = {};
	} else if (arguments.length == 2) {
		// if 2nd param is function then assume it's
		if ($.isFunction(params)) {
			callback = params;
			params = {};
		} else if (!params) {
			params = {};
		}
	}
	if (!callback) {
		callback = function() {};
	}
	
	var $style = $("<style>" +
			" #jBackDrop {position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 1030;background-color:rgba(0,0,0, 0.4) }" +
			" #jMessage {font-size:1.2em;display:flex;position: fixed;align-items: center;justify-content: center;height: 100%;width: 100%;top:0;left:0;z-index: 1040}" +
			" #jMessageInner {text-align: center;box-shadow:0 10px 20px rgba(0,0,0,0.6);max-width: 400px;width: 80%;z-index: 1050;background:white;border-radius:2px;padding:15px;-webkit-transform: scale(1.15);transform: scale(1.15);-webkit-transition: -webkit-transform 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946), opacity 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946); transition: transform 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946), opacity 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946);}" +
			" #jMessageInner.visible {-webkit-transform: scale(1);transform: scale(1);} " +
			" #jMessageClose {float:right;margin-right: -5px;margin-top: -6px;cursor:pointer;font-size: 21px;font-weight: bold;line-height: 1;color: #000;text-shadow: 0 1px 0 #fff;opacity: .2} " +
			" #jMessageClose:hover {opacity:0.5} " +
			" #jMessageText {color: black;text-align: left;margin: 15px 10px 20px 10px} " +
			" #jMessage #jMessageButtonArea {text-align:right} " +
			" #jMessage .jMessageButton {min-width:75px;color: #fff;background: #428bca;border-color: #357ebd;padding: 6px 12px;margin:0 0 0 10px;font-size: 14px;font-weight: normal;line-height: 1.428571429;text-align: center;white-space: nowrap;vertical-align: middle;cursor: pointer;border: 1px solid transparent;border-radius: 4px;-webkit-user-select: none} " +
			" #jMessage .jMessageButton:hover {background:#3276b1} " +
			" #jMessage .jMessageButton:focus {outline:none} " +
			" #jMessage #jMessageCancelButton {background:#aaa}" +
			" #jMessage #jMessageCancelButton:hover {background:#999} " +
			"</style>");
	
	var $backDrop = $("<div id='jBackDrop'></div>");
	$("head").append($style);
	$("body").append($backDrop);
	
	var $messageDiv;
	
	function closeAlert(action, callback) {
		//$backDrop.animate({ opacity: 0 }, 200, function() {
			callback(action);
			$messageDiv.remove();
			$backDrop.remove();
			$style.remove();
		//});
	}
	
	$messageDiv = $("<div id='jMessage'><div id='jMessageInner'><div id='jMessageClose'>×</div><div id='jMessageText'></div><div id='jMessageButtonArea'><button id='jMessageOKButton' class='jMessageButton'>OK</button></div></div></div>");		
	$messageDiv.find("#jMessageText").html(message);
	
	if (params.cancelButton || params.cancelButtonLabel) {
		var $cancelButton = $("<button id='jMessageCancelButton' class='jMessageButton'></button>");
		if (params.cancelButton) {
			$cancelButton.text("Cancel");
		} else {
			$cancelButton.text(params.cancelButtonLabel);
		}
		
		$messageDiv.find("#jMessageButtonArea").append( $cancelButton );
	}

	$backDrop.before($messageDiv);

	if (params.noButtons) {
		$("#jMessageOKButton").hide();
	} else {
		if (params.okButtonLabel) {
			$messageDiv.find("#jMessageOKButton").text( params.okButtonLabel );
		}
		
		$messageDiv.find("#jMessageOKButton")
			.on('keyup', function (e) {
				if (e.which == 27) {
					$("#jMessageClose").click();
				}
			})
			// prevent spacebar from clicking button
			.on('keydown', function (e) {
				if (e.which == 32) {
					return false;
				}
			})
			.on("click", function() {
				$messageDiv.hide();
				closeAlert("ok", callback);
			})
		;
	}
	
	$messageDiv.find("#jMessageCancelButton, #jMessageClose")
		.click(function() {
			$messageDiv.fadeOut("fast");
			closeAlert("cancel", callback);
		})
	;		
	
	setTimeout(function() {
		$messageDiv.find("#jMessageInner").addClass("visible");
	}, 1);
	$messageDiv.find("#jMessageOKButton").focus();

	return $messageDiv;
}

var syncOptions = (function() {
	var MIN_STORAGE_EVENTS_COUNT_BEFORE_SAVING = 4;
	var LOCALSTORAGE_CHUNK_PREFIX = "localStorageChunk";
	var INDEXEDDB_CHUNK_PREFIX = "indexedDBChunk";
	var saveTimeout;
	var paused;
	
	// ex. syncChunks(deferreds, localStorageChunks, "localStorageChunk", setDetailsSeparateFromChunks);
	function syncChunks(deferreds, chunks, chunkPrefix, details, setDetailsSeparateFromChunks) {
		
		var previousDeferredsCount = deferreds.length;
		
		$(chunks).each(function(index, chunk) {
			var itemToSave = {};
			
			// let's set details + chunk together
			if (!setDetailsSeparateFromChunks) {
				itemToSave["details"] = details;
			}
			
			itemToSave[chunkPrefix + "_" + index + "_" + details.chunkId] = chunk;
			
			console.log("trying to sync.set json length: ", chunkPrefix + "_" + index + "_" + details.chunkId, chunk.length + "_" + JSON.stringify(chunk).length);
			
			deferred = $.Deferred(function(def) {
				
				// to avoid problems with MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE let's spread out the calls
				var delay;
				var SYNC_OPERATIONS_BEFORE = 1; // .clear were done before
				if (SYNC_OPERATIONS_BEFORE + previousDeferredsCount + chunks.length > chrome.storage.sync.MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE) {
					delay = (previousDeferredsCount+index) * seconds(10); // makes only 6 calls per minute
				} else {
					delay = 0;
				}
				setTimeout(function() {					
					chrome.storage.sync.set(itemToSave, function() {
						if (chrome.runtime.lastError) {
							var error = "sync error: " + chrome.runtime.lastError.message;
							logError(error);
							def.reject(error);
						} else {											
							console.log("saved " + chunkPrefix + " " + index);
							def.resolve("success");
						}
					});
				}, delay);
			});
			deferreds.push(deferred);
		});
	}
	
	// usage: compileChunks(details, items, details.localStorageChunksCount, LOCALSTORAGE_CHUNK_PREFIX) 
	function compileChunks(details, items, chunkCount, prefix) {
		var data = "";
		for (var a=0; a<chunkCount; a++) {
			data += items[prefix + "_" + a + "_" + details.chunkId];
		}
		return JSON.parse(data);
	}
	
	function isSyncable(key) {
		return !key.startsWith("_") && syncOptions.excludeList.indexOf(key) == -1;
	}
	
	return { // public interface
		init: function(excludeList) {
			if (!excludeList) {
				excludeList = [];
			}
			
			// append standard exclusion to custom ones
			excludeList = excludeList.concat(["version", "lastSyncOptionsSave", "lastSyncOptionsLoad", "detectedChromeVersion", "installDate", "installVersion", "DND_endTime"]);
			
			// all private members are accesible here
			syncOptions.excludeList = excludeList;
		},
		storageChanged: function(params) {
			if (!paused) {
				if (syncOptions.excludeList.indexOf(params.key) != -1) {
					console.log("storage event ignored: " + params.key);
				} else {
					// we don't want new installers overwriting their synced data from previous installations - so only sync after certain amount of clicks by presuming their just going ahead to reset their own settings manually
					if (!localStorage._storageEventsCount) {
						localStorage._storageEventsCount = 0;
					}
					localStorage._storageEventsCount++;
					
					// if loaded upon new install then we can proceed immediately to save settings or else want for minium storage event
					if (localStorage.lastSyncOptionsLoad || localStorage.lastSyncOptionsSave || localStorage._storageEventsCount >= MIN_STORAGE_EVENTS_COUNT_BEFORE_SAVING) {
						if (isSyncable(params.key)) {
							console.log("storage event: " + params.key + " will sync it soon...");
							clearTimeout(saveTimeout);
							saveTimeout = setTimeout(function() {
								syncOptions.save("sync data: " + params.key);
							}, seconds(45));
						} else {
							console.log("dont sync this key: " + params.key);
						}
					} else {
						console.log("storage event: " + params.key + " waiting for more storage events before syncing");
					}
				}
			}
		},
		pause: function() {
			paused = true;
		},
		resume: function() {
			paused = false;
		},
		save: function(reason, callback) {

			// split it up because of max size per item allowed in Storage API
			// because QUOTA_BYTES_PER_ITEM is sum of key + value STRINGIFIED! (again)
			// watchout because the stringify adds quotes and slashes refer to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
			// so let's only use 80% of the max and leave the rest for stringification when the sync.set is called
			var MAX_CHUNK_SIZE = Math.floor(chrome.storage.sync.QUOTA_BYTES_PER_ITEM * 0.80);

			if (!callback) {
				callback = function() {};
			}
			console.log("syncOptions: saving data reason: " + reason + "...");
			
			// process localStorage
			var localStorageItemsToSave = {};
			for (item in localStorage) {
				// don't incude storage options starting with _blah and use exclude list
				if (isSyncable(item)) {
					//console.log(item + ": " + localStorage[item]);
					localStorageItemsToSave[item] = localStorage[item];
				}
			}
			
			syncOptions.exportIndexedDB({}, function(exportIndexedDBResponse) {
				try {
					// remove all items first because we might have less "chunks" of data so must clear the extra unsused ones now
					chrome.storage.sync.clear(function() {
						if (chrome.runtime.lastError) {
							var error = "sync error: " + chrome.runtime.lastError.message;
							logError(error);
							callback({error:error});
						} else {
							var deferreds = new Array();
							var deferred;
							
							var chunkId = getUniqueId();

							var localStorageChunks = chunkObject(localStorageItemsToSave, MAX_CHUNK_SIZE);
							var indexedDBChunks = chunkObject(exportIndexedDBResponse.data, MAX_CHUNK_SIZE);
							
							var details = {chunkId:chunkId, localStorageChunksCount:localStorageChunks.length, indexedDBChunksCount:indexedDBChunks.length, extensionVersion:chrome.runtime.getManifest().version, lastSync:new Date().toJSON(), syncReason:reason};
							
							// can we merge details + first AND only chunk into one .set operation (save some bandwidth)
							var setDetailsSeparateFromChunks;
							
							if (localStorageChunks.length == 1 && indexedDBChunks.length == 1 && JSON.stringify(details).length + localStorageChunks.first().length + indexedDBChunks.first().length < MAX_CHUNK_SIZE) {
								setDetailsSeparateFromChunks = false;
							} else {
								setDetailsSeparateFromChunks = true;

								// set sync header/details...
								deferred = $.Deferred(function(def) {
									chrome.storage.sync.set({details:details}, function() {
										console.log("saved details");
										def.resolve("success");
									});
								});
								deferreds.push(deferred);
							}
							
							// in 1st call to syncChunks let's pass the last param setDetailsSeparateFromChunks
							// in 2nd call to syncChunks let's hard code setDetailsSeparateFromChunks to true
							syncChunks(deferreds, localStorageChunks, LOCALSTORAGE_CHUNK_PREFIX, details, setDetailsSeparateFromChunks);
							syncChunks(deferreds, indexedDBChunks, INDEXEDDB_CHUNK_PREFIX, details, true);
							
							$.when.apply($, deferreds)
						   		.done(function() {
						   			localStorage.lastSyncOptionsSave = new Date();
						   			console.log("sync done");
						   			callback({});
						   		})
						   		.fail(function(args) {
						   			console.log(args)
						   			console.log(arguments)
						   			
						   			// error occured so let's clear storage because we might have only partially written data
						   			chrome.storage.sync.clear();
						   			
						   			callback({error:"jerror"});
						   		})
						   	;
						}
					});
				} catch (e) {
					var error = "sync save error: " + e;
					logError(error);
					callback({error:error});
				}
			});
		},
		fetch: function(callback) {
			console.log("syncOptions: fetch...");
			var response = {};
			try {
				chrome.storage.sync.get(null, function(items) {
					if (chrome.runtime.lastError) {
						var error = "sync last error: " + chrome.runtime.lastError.message;
						response.error = error;
						logError(error);
					} else {
						console.log("items", items);
						if (!$.isEmptyObject(items)) {
							response.items = items;
							var details = items["details"];
							if (details.extensionVersion != chrome.runtime.getManifest().version) {
								response.error = "Versions are different: " + details.extensionVersion + " and " + chrome.runtime.getManifest().version;
							}
						}
					}
					callback(response);
				});
			} catch (e) {
				var error = "sync fetch error: " + e;
				logError(error);
				response.error = error;
				callback(response);
			}
		},
		fetchAndLoad: function(callback) {
			syncOptions.fetch(function(response) {
				if (response.items && !response.error) {
					syncOptions.load(response.items, callback);
				} else {
					callback(response);
				}
			});
		},
		load: function(items, callback) {
			console.log("syncOptions: load...");
			if (items) {
				var details = items["details"]; 
				if (details) {
					
					// process localstorage					
					var dataObj;
					dataObj = compileChunks(details, items, details.localStorageChunksCount, LOCALSTORAGE_CHUNK_PREFIX);
					for (item in dataObj) {
						localStorage.setItem(item, dataObj[item]);
					}
					
					// process indexeddb
					if (details.indexedDBChunksCount) {
						dataObj = compileChunks(details, items, details.indexedDBChunksCount, INDEXEDDB_CHUNK_PREFIX);
						syncOptions.importIndexedDB(dataObj, function(importIndexedDBResponse) {
							if (!importIndexedDBResponse.error) {
								importIndexedDBResponse.items = items;								
							}
							callback(importIndexedDBResponse);
						})
					} else {
						callback({items:items});
					}
					
					// finish stamp
					localStorage.lastSyncOptionsLoad = new Date();
					console.log("done");
				}
			} else {
				callback({});
			}
		},
		exportIndexedDB: function(params, callback) {
			params = initUndefinedObject(params);
			
			db = bg.wrappedDB.db;
			
		    if (!db) {
		    	callback({error: "jerror db not declared"});
		    	return;
		    }

		    //Ok, so we begin by creating the root object:
		    var data = {};
		    var promises = [];
		    for(var i=0; i<db.objectStoreNames.length; i++) {
		        //thanks to http://msdn.microsoft.com/en-us/magazine/gg723713.aspx
		        promises.push(

		            $.Deferred(function(defer) {

		                var objectstore = db.objectStoreNames[i];
		                console.log("objectstore: " + objectstore);

		                var transaction = db.transaction([objectstore], "readonly");  
		                var content = [];

		                transaction.oncomplete = function(event) {
		                    console.log("trans oncomplete for " + objectstore + " with " + content.length + " items");
		                    defer.resolve({name:objectstore, data:content});
		                };

		                transaction.onerror = function(event) {
		                	// Don't forget to handle errors!
		                	console.dir(event);
		                };

		                var handleResult = function(event) {  
		                	var cursor = event.target.result;  
		                	if (cursor) {
		                		//console.log(cursor.key + " " + JSON.stringify(cursor.value).length);
		                		
		                		// don't incude storage options starting with _blah and use exclud list
		                		if (cursor.key.startsWith("_") || (!params.exportAll && syncOptions.excludeList.indexOf(cursor.key) != -1)) {
		                			// exclude this one and do nothing
		                			console.log("excluding this key: " + cursor.key);
		                		} else {
		                			content.push({key:cursor.key,value:cursor.value});
		                		}
		                		
		                		cursor.continue();  
		                	}
		                };  

		                var objectStore = transaction.objectStore(objectstore);
		                objectStore.openCursor().onsuccess = handleResult;

		            }).promise()

		        );
		    }

		    $.when.apply($, promises)
		    	.done(function() {
			        // arguments is an array of structs where name=objectstorename and data=array of crap
			        // make a copy cuz I just don't like calling it argument
			        var dataToStore = arguments;
			        //serialize it
			        var serializedData = JSON.stringify(dataToStore);
			        console.log("datastore:", dataToStore);
			        console.log("length: " + serializedData.length);
			        
			        callback({data:dataToStore});
			        
			        //downloadObject(dataToStore, "indexedDB.json");
			        
			        //The Christian Cantrell solution
			        //var link = $("#exportLink");
			        //document.location = 'data:Application/octet-stream,' + encodeURIComponent(serializedData);
			        //link.attr("href",'data:Application/octet-stream,'+encodeURIComponent(serializedData));
			        //link.trigger("click");
			        //fakeClick(link[0]);
		   		})
		   		.fail(function(args) {
		   			console.log(args)
		   			console.log(arguments)
		   			callback({error:"jerror when exporting"});
		   		})
		    ;
		},
		importIndexedDB: function(obj, callback) {
			// first (and only) item in array should be the "settings" objectstore that i setup when using the indexedb with this gmail checker
			var settingsObjectStore = obj[0];
			if (settingsObjectStore.name == "settings") {
				
				var deferreds = new Array();
				
				for (var a=0; a<settingsObjectStore.data.length; a++) {
					var key = settingsObjectStore.data[a].key;
					var value = settingsObjectStore.data[a].value.value;
					console.log(key + ": " + value);
					var deferred = Settings.store(key, value);
					deferreds.push(deferred);
				}
				
			    $.when.apply($, deferreds)
			    	.done(function() {
				        callback({success:true});
			   		})
			   		.fail(function() {
			   			console.log(arguments)
			   			callback({error:"jerror when importing"});
			   		})
			    ;
			} else {
				callback({error: "Could not find 'settings' objectstore!"});
			}
		}
	};
})();

function downloadObject(data, filename) {
    if (!data) {
        console.error('No data')
        return;
    }

    if(!filename) filename = 'object.json'

    if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}

function initUndefinedObject(obj) {
    if (typeof obj == "undefined") {
        return {};
    } else {
        return obj;
    }
}

function initUndefinedCallback(callback) {
    if (callback) {
        return callback;
    } else {
        return function() {};
    }
}

function chunkObject(obj, chunkSize) {
	var str = JSON.stringify(obj);
	return str.chunk(chunkSize);
}

function getDefaultVoice(voices, includeExternal) {
	
	function hasVoice(voices, voiceValue) {	
		for (var a=0; a<voices.length; a++) {
			// if extensiond id in value then match voicename and extension id
			if (voiceValue.indexOf("___") != -1 && includeExternal) {
				var voiceName = voiceValue.split("___")[0];
				var extensionId = voiceValue.split("___")[1];
				if (voices[a].voiceName == voiceName && voices[a].extensionId == extensionId) {
					return a;
				}
			} else if (voices[a].voiceName == voiceValue) {
				// no exension id so let's only match name
				return a;
			}
		}
		return -1;
	}
	
	var savedVoice = Settings.read("voice");
	var voiceIndexMatched = hasVoice(voices, savedVoice);
	if (voiceIndexMatched == -1) {
		// windows
		voiceIndexMatched = hasVoice(voices, "native");
		if (voiceIndexMatched == -1) {
			// linux
			voiceIndexMatched = hasVoice(voices, "default espeak");
		}
	}
	
	if (voiceIndexMatched == -1 && voices.length) {
		voiceIndexMatched = 0;
	}
	
	return voiceIndexMatched;
}

function parseVersionString(str) {
    if (typeof(str) != 'string') { return false; }
    var x = str.split('.');
    // parse from string or default to 0 if can't parse
    var maj = parseInt(x[0]) || 0;
    var min = parseInt(x[1]) || 0;
    var pat = parseInt(x[2]) || 0;
    return {
        major: maj,
        minor: min,
        patch: pat
    }
}

function escapeRegExp(str) {
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function isHex(str) {
	if (str) {
		return str.match(/^[0-9A-Fa-f]+$/);
	}
}

function isOnline() {
	// patch because some distributions of linux always returned false for is navigator.online so let's force it to true
	if (DetectClient.isLinux()) {
		return true;
	} else {
		return navigator.onLine;
	}
}

function countEvent(eventName) {
	var lsKey = "_countEvent_" + eventName;
	
	var countEvent;
	var countEventStr = bg.localStorage[lsKey];
	
	if (countEventStr) {
		countEvent = JSON.parse(countEventStr);
		countEvent.startDate = new Date(countEvent.startDate);

		if (countEvent.startDate.isToday()) {
			countEvent.count++;
		} else {
			sendGA("frequentCountEvent", "hit", eventName, countEvent.count);
			countEvent.startDate = new Date();
			countEvent.count = 1;
		}
	} else {
		countEvent = {startDate:new Date(), count:1};
	}

	bg.localStorage[lsKey] = JSON.stringify(countEvent);
}

function convertBase64ToBlob(base64str, type) {
	var byteString = atob(base64str);

	// write the bytes of the string to an ArrayBuffer
	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}
	
	// write the ArrayBuffer to a blob, and you're done
	return new Blob([ia], {type: type});
}

// cross OS used to determine if ctrl or mac key is pressed
function isCtrlPressed(e) {
	return e.ctrlKey || e.metaKey;
}