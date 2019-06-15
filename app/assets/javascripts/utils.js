var removeAntiFlicker = function() {
  setTimeout(function(){
    jQuery("body").css("display", "block").css("visibility", "visible");
  }, 800);
};


var secondsToHourMinSec = function (secondCount) {
  var hours   = Math.floor(secondCount / 3600);
  var minutes = Math.floor((secondCount - (hours * 3600)) / 60);
  var seconds = secondCount - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}

  if (hours < 1){
    return minutes+':'+seconds;
  }
  else {
    return hours+':'+minutes+':'+seconds;
  }
};



var datalog = function(text) {
  var result;
  var downcasedText = text.trim().toLowerCase();

  switch (downcasedText) {
    case "a":
      result = "Abandonment";
      break;
    case "b":
      result = "Bug";
      break;
    case "f":
      result = "Facial reaction";
      break;
    case "m":
      result = "Miscellaneous";
      break;
    case "n":
      result = "Negative opinion";
      break;
    case "p":
      result = "Positive opinion";
      break;
    case "s":
      result = "Suggestion";
      break;
    case "u":
      result = "User interface";
      break;
    default:
      result = text;
  }

  return result;
};



var isDataloggued = function(text) {
  return (text.trim() !== datalog(text.trim()));
};



var getUniqueThemesOrTags = function(collection) {
  var isUniqueThemeOrCategory = function(collection, item) {
    for (var i = 0; i < collection.length; i++){
      var counter = 0;
      if (collection[i].name === item.name){
        counter += 1;

        if (counter > 0){
          return false;
        }
      }
    }

    return true;
  };

  var newCollection = [];

  for (var i = 0; i < collection.length; i++) {
    if (isUniqueThemeOrCategory(newCollection, collection[i])) {
      newCollection.push(collection[i]);
    }
  }

  return newCollection;
};


var createCookie = function(name, value, days) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  }
  else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}


var getCookie = function(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}


var runWhenConditionTrue = function (conditionFunction, functionToRun, interval, intervalId){
  window[intervalId] = setInterval(
      function(){
        if (conditionFunction() === true){
          functionToRun();
          clearInterval(window[intervalId]);
        }
      },
      interval
      );
};


var getUrlParam = function(param) {
  var url = new URL(window.location.href);
  return url.searchParams.get(param);
};


var copyToClipboard = function (element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text().trim()).select();
  document.execCommand("copy");
  $temp.remove();
};


var getBrowserName = function() {
  // Opera 8.0+
  var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

  // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined';

  // Safari 3.0+ "[object HTMLElementConstructor]"
  var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

  // Internet Explorer 6-11
  var isIE = /*@cc_on!@*/false || !!document.documentMode;

  // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;

  // Chrome 1+
  var isChrome = !!window.chrome && navigator.vendor.match(/Google/);

  if (isChrome) {
    return "Chrome";
  }
  else if (isEdge) {
    return "Edge";
  }
  else if (isIE) {
    return "Internet Explorer";
  }
  else if (isSafari) {
    return "Safari";
  }
  else if (isFirefox) {
    return "Firefox";
  }
  else if (isOpera) {
    return "Opera";
  }

  return "Unknown Browser";
};


var getResolution = function() {
  return window.screen.width + "x" + window.screen.height;
}


var isMobileDevice = function() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};


var getOSName = function() {
  // This script sets OSName variable as follows:
  // "Windows"    for all versions of Windows
  // "MacOS"      for all versions of Macintosh OS
  // "Linux"      for all versions of Linux
  // "UNIX"       for all other UNIX flavors
  // "Unknown OS" indicates failure to detect the OS

  var OSName="Unknown OS";
  if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
  if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
  if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
  if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

  return OSName;
};


var initializeLocation = function() {
  window.participantLocation = window.participantLocation || undefined;
  var ipAddress = jQuery(".ip-address").val();

  if (window.participantLocation === undefined) {
    $.get("https://api.ipstack.com/" + ipAddress + "?access_key=d51a5e2c60569fc2a8f7ab2f6ba97c48&output=json&legacy=1", function (response) {
      window.participantLocation = response.city + ", " + response.country_name;
      $("#ip").html("IP: " + response.ip);
    }, "jsonp");
  }
};


var getLocation = function() {
  return window.participantLocation;
};


var autoResizeInput = function(selector) {
  var input = document.querySelector(selector);
  var offset = input.offsetHeight - input.clientHeight;

  var resizeInput = function(event) {
    jQuery(event.target).css('height', 'auto').css('height', event.target.scrollHeight + offset);
  };

  input.addEventListener("keyup", resizeInput);
  jQuery(input).css('height', 'auto').css('height', input.scrollHeight + offset);
}
