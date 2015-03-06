(function() {var b, __GCast_isChromeBrowser = window.chrome ? !0 : !1, chrome = window.chrome || {};
chrome.cast = chrome.cast || {};
chrome.cast.media = chrome.cast.media || {};
var g = g || {};
g.global = this;
g.la = function(a) {
  return void 0 !== a;
};
g.ff = function(a, c, d) {
  a = a.split(".");
  d = d || g.global;
  a[0] in d || !d.execScript || d.execScript("var " + a[0]);
  for (var e;a.length && (e = a.shift());) {
    !a.length && g.la(c) ? d[e] = c : d = d[e] ? d[e] : d[e] = {};
  }
};
g.ou = function(a, c) {
  g.ff(a, c);
};
g.ha = !0;
g.da = "en";
g.cf = !0;
g.De = !1;
g.ro = !g.ha;
g.pw = function(a) {
  g.Eh(a);
};
g.Eh = function(a, c) {
  g.ff(a, c);
};
g.qn = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
g.module = function(a) {
  if (!g.isString(a) || !a || -1 == a.search(g.qn)) {
    throw Error("Invalid module identifier");
  }
  if (!g.Xh()) {
    throw Error("Module " + a + " has been loaded incorrectly.");
  }
  if (g.ja.Ce) {
    throw Error("goog.module may only be called once per module.");
  }
  g.ja.Ce = a;
};
g.module.get = function(a) {
  return g.module.wp(a);
};
g.module.wp = function() {
};
g.ja = null;
g.Xh = function() {
  return null != g.ja;
};
g.module.Ee = function() {
  if (!g.Xh()) {
    throw Error("goog.module.declareTestMethods must be called from within a goog.module");
  }
  g.ja.Ee = !0;
};
g.module.Bh = function() {
  g.ja.Bh = !0;
};
g.Gw = function(a) {
  if (g.ro) {
    throw a = a || "", Error("Importing test-only code into non-debug environment" + (a ? ": " + a : "."));
  }
};
g.Iu = function() {
};
g.jo = function(a, c) {
  for (var d = a.split("."), e = c || g.global, f;f = d.shift();) {
    if (g.R(e[f])) {
      e = e[f];
    } else {
      return null;
    }
  }
  return e;
};
g.Yu = function(a, c) {
  var d = c || g.global, e;
  for (e in a) {
    d[e] = a[e];
  }
};
g.qt = function(a, c, d, e) {
  if (g.$h) {
    var f;
    a = a.replace(/\\/g, "/");
    for (var h = g.pa, l = 0;f = c[l];l++) {
      h.ic[f] = a, h.ne[a] = !!e;
    }
    for (e = 0;c = d[e];e++) {
      a in h.requires || (h.requires[a] = {}), h.requires[a][c] = !0;
    }
  }
};
g.jx = !1;
g.Hq = !0;
g.Yv = function(a) {
  g.global.console && g.global.console.error(a);
};
g.require = function() {
};
g.ub = "";
g.Vg = function() {
};
g.hv = function(a) {
  return a;
};
g.ot = function() {
  throw Error("unimplemented abstract method");
};
g.mp = function(a) {
  a.Rd = function() {
    if (a.qc) {
      return a.qc;
    }
    g.ha && (g.Zh[g.Zh.length] = a);
    return a.qc = new a;
  };
};
g.Zh = [];
g.Ln = !0;
g.Nm = g.ha;
g.Pm = {};
g.$h = !1;
g.$h && (g.km = {}, g.pa = {ne:{}, ic:{}, requires:{}, Yg:{}, hc:{}, wd:{}}, g.ji = function() {
  var a = g.global.document;
  return "undefined" != typeof a && "write" in a;
}, g.rp = function() {
  if (g.global.Pn) {
    g.ub = g.global.Pn;
  } else {
    if (g.ji()) {
      for (var a = g.global.document.getElementsByTagName("script"), c = a.length - 1;0 <= c;--c) {
        var d = a[c].src, e = d.lastIndexOf("?"), e = -1 == e ? d.length : e;
        if ("base.js" == d.substr(e - 7, 7)) {
          g.ub = d.substr(0, e - 7);
          break;
        }
      }
    }
  }
}, g.we = function(a, c) {
  (g.global.Wp || g.tn)(a, c) && (g.pa.hc[a] = !0);
}, g.$n = g.global.document && g.global.document.all && !g.global.atob, g.jm = function(a) {
  g.we("", 'goog.retrieveAndExecModule_("' + a + '");') && (g.pa.hc[a] = !0);
}, g.Xe = [], g.nx = function(a, c) {
  return g.Ln && g.la(g.global.JSON) ? "goog.loadModule(" + g.global.JSON.stringify(c + "\n//# sourceURL=" + a + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + c + "\n;return exports});\n//# sourceURL=" + a + "\n";
}, g.fo = function() {
  var a = g.Xe.length;
  if (0 < a) {
    var c = g.Xe;
    g.Xe = [];
    for (var d = 0;d < a;d++) {
      g.ci(c[d]);
    }
  }
}, g.aw = function(a) {
  g.Ch(a) && g.zn(a) && g.ci(g.ub + g.Be(a));
}, g.Ch = function(a) {
  return(a = g.Be(a)) && g.pa.ne[a] ? g.ub + a in g.pa.wd : !1;
}, g.zn = function(a) {
  if ((a = g.Be(a)) && a in g.pa.requires) {
    for (var c in g.pa.requires[a]) {
      if (!g.bm(c) && !g.Ch(c)) {
        return!1;
      }
    }
  }
  return!0;
}, g.ci = function(a) {
  if (a in g.pa.wd) {
    var c = g.pa.wd[a];
    delete g.pa.wd[a];
    g.Bn(c);
  }
}, g.Vv = function(a) {
  var c = g.ja;
  try {
    g.ja = {Ce:void 0, Ee:!1};
    var d;
    if (g.isFunction(a)) {
      d = a.call(g.global, {});
    } else {
      if (g.isString(a)) {
        d = g.Om.call(g.global, a);
      } else {
        throw Error("Invalid module definition");
      }
    }
    var e = g.ja.Ce;
    if (!g.isString(e) || !e) {
      throw Error('Invalid module name "' + e + '"');
    }
    g.ja.Bh ? g.Eh(e, d) : g.Nm && Object.seal && Object.seal(d);
    g.Pm[e] = d;
    if (g.ja.Ee) {
      for (var f in d) {
        if (0 === f.indexOf("test", 0) || "tearDown" == f || "setUp" == f || "setUpPage" == f || "tearDownPage" == f) {
          g.global[f] = d[f];
        }
      }
    }
  } finally {
    g.ja = c;
  }
}, g.Om = function(a) {
  eval(a);
  return{};
}, g.tn = function(a, c) {
  if (g.ji()) {
    var d = g.global.document;
    if ("complete" == d.readyState) {
      if (/\bdeps.js$/.test(a)) {
        return!1;
      }
      throw Error('Cannot write "' + a + '" after document load');
    }
    var e = g.$n;
    void 0 === c ? e ? (e = " onreadystatechange='goog.onScriptLoad_(this, " + ++g.si + ")' ", d.write('<script type="text/javascript" src="' + a + '"' + e + ">\x3c/script>")) : d.write('<script type="text/javascript" src="' + a + '">\x3c/script>') : d.write('<script type="text/javascript">' + c + "\x3c/script>");
    return!0;
  }
  return!1;
}, g.si = 0, g.lw = function(a, c) {
  "complete" == a.readyState && g.si == c && g.fo();
  return!0;
}, g.ox = function() {
  function a(f) {
    if (!(f in e.hc)) {
      if (!(f in e.Yg) && (e.Yg[f] = !0, f in e.requires)) {
        for (var h in e.requires[f]) {
          if (!g.bm(h)) {
            if (h in e.ic) {
              a(e.ic[h]);
            } else {
              throw Error("Undefined nameToPath for " + h);
            }
          }
        }
      }
      f in d || (d[f] = !0, c.push(f));
    }
  }
  var c = [], d = {}, e = g.pa, f;
  for (f in g.km) {
    e.hc[f] || a(f);
  }
  for (var h = 0;h < c.length;h++) {
    f = c[h], g.pa.hc[f] = !0;
  }
  var l = g.ja;
  g.ja = null;
  for (h = 0;h < c.length;h++) {
    if (f = c[h]) {
      e.ne[f] ? g.jm(g.ub + f) : g.we(g.ub + f);
    } else {
      throw g.ja = l, Error("Undefined script input");
    }
  }
  g.ja = l;
}, g.Be = function(a) {
  return a in g.pa.ic ? g.pa.ic[a] : null;
}, g.rp(), g.global.rq || g.we(g.ub + "deps.js"));
g.gw = function(a) {
  a = a.split("/");
  for (var c = 0;c < a.length;) {
    "." == a[c] ? a.splice(c, 1) : c && ".." == a[c] && a[c - 1] && ".." != a[c - 1] ? a.splice(--c, 2) : c++;
  }
  return a.join("/");
};
g.uw = function() {
};
g.na = function(a) {
  var c = typeof a;
  if ("object" == c) {
    if (a) {
      if (a instanceof Array) {
        return "array";
      }
      if (a instanceof Object) {
        return c;
      }
      var d = Object.prototype.toString.call(a);
      if ("[object Window]" == d) {
        return "object";
      }
      if ("[object Array]" == d || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return "array";
      }
      if ("[object Function]" == d || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return "function";
      }
    } else {
      return "null";
    }
  } else {
    if ("function" == c && "undefined" == typeof a.call) {
      return "object";
    }
  }
  return c;
};
g.Yb = function(a) {
  return null === a;
};
g.R = function(a) {
  return null != a;
};
g.isArray = function(a) {
  return "array" == g.na(a);
};
g.S = function(a) {
  var c = g.na(a);
  return "array" == c || "object" == c && "number" == typeof a.length;
};
g.qv = function(a) {
  return g.isObject(a) && "function" == typeof a.getFullYear;
};
g.isString = function(a) {
  return "string" == typeof a;
};
g.eb = function(a) {
  return "boolean" == typeof a;
};
g.isNumber = function(a) {
  return "number" == typeof a;
};
g.isFunction = function(a) {
  return "function" == g.na(a);
};
g.isObject = function(a) {
  var c = typeof a;
  return "object" == c && null != a || "function" == c;
};
g.gf = function(a) {
  return a[g.wb] || (a[g.wb] = ++g.Zn);
};
g.dv = function(a) {
  return!!a[g.wb];
};
g.Mp = function(a) {
  "removeAttribute" in a && a.removeAttribute(g.wb);
  try {
    delete a[g.wb];
  } catch (c) {
  }
};
g.wb = "closure_uid_" + (1E9 * Math.random() >>> 0);
g.Zn = 0;
g.Ou = g.gf;
g.sw = g.Mp;
g.Mn = function(a) {
  var c = g.na(a);
  if ("object" == c || "array" == c) {
    if (a.clone) {
      return a.clone();
    }
    var c = "array" == c ? [] : {}, d;
    for (d in a) {
      c[d] = g.Mn(a[d]);
    }
    return c;
  }
  return a;
};
g.io = function(a, c, d) {
  return a.call.apply(a.bind, arguments);
};
g.ho = function(a, c, d) {
  if (!a) {
    throw Error();
  }
  if (2 < arguments.length) {
    var e = Array.prototype.slice.call(arguments, 2);
    return function() {
      var d = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(d, e);
      return a.apply(c, d);
    };
  }
  return function() {
    return a.apply(c, arguments);
  };
};
g.bind = function(a, c, d) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? g.bind = g.io : g.bind = g.ho;
  return g.bind.apply(null, arguments);
};
g.Xb = function(a, c) {
  var d = Array.prototype.slice.call(arguments, 1);
  return function() {
    var c = d.slice();
    c.push.apply(c, arguments);
    return a.apply(this, c);
  };
};
g.Ri = function(a, c) {
  for (var d in c) {
    a[d] = c[d];
  }
};
g.now = g.cf && Date.now || function() {
  return+new Date;
};
g.Bn = function(a) {
  if (g.global.execScript) {
    g.global.execScript(a, "JavaScript");
  } else {
    if (g.global.eval) {
      if (null == g.Cd && (g.global.eval("var _et_ = 1;"), "undefined" != typeof g.global._et_ ? (delete g.global._et_, g.Cd = !0) : g.Cd = !1), g.Cd) {
        g.global.eval(a);
      } else {
        var c = g.global.document, d = c.createElement("script");
        d.type = "text/javascript";
        d.defer = !1;
        d.appendChild(c.createTextNode(a));
        c.body.appendChild(d);
        c.body.removeChild(d);
      }
    } else {
      throw Error("goog.globalEval not available");
    }
  }
};
g.Cd = null;
g.Mu = function(a, c) {
  var d = function(a) {
    return g.Bi[a] || a;
  }, e = function(a) {
    a = a.split("-");
    for (var c = [], e = 0;e < a.length;e++) {
      c.push(d(a[e]));
    }
    return c.join("-");
  }, e = g.Bi ? "BY_WHOLE" == g.co ? d : e : function(a) {
    return a;
  };
  return c ? a + "-" + e(c) : e(a);
};
g.Bw = function(a, c) {
  g.Bi = a;
  g.co = c;
};
g.Ru = function(a, c) {
  c && (a = a.replace(/\{\$([^}]+)}/g, function(a, e) {
    return e in c ? c[e] : a;
  }));
  return a;
};
g.Su = function(a) {
  return a;
};
g.i = function(a, c, d) {
  g.ff(a, c, d);
};
g.w = function(a, c, d) {
  a[c] = d;
};
g.Ra = function(a, c) {
  function d() {
  }
  d.prototype = c.prototype;
  a.zd = c.prototype;
  a.prototype = new d;
  a.prototype.constructor = a;
  a.ao = function(a, d, h) {
    for (var l = Array(arguments.length - 2), m = 2;m < arguments.length;m++) {
      l[m - 2] = arguments[m];
    }
    return c.prototype[d].apply(a, l);
  };
};
g.ao = function(a, c, d) {
  var e = arguments.callee.caller;
  if (g.De || g.ha && !e) {
    throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
  }
  if (e.zd) {
    for (var f = Array(arguments.length - 1), h = 1;h < arguments.length;h++) {
      f[h - 1] = arguments[h];
    }
    return e.zd.constructor.apply(a, f);
  }
  f = Array(arguments.length - 2);
  for (h = 2;h < arguments.length;h++) {
    f[h - 2] = arguments[h];
  }
  for (var h = !1, l = a.constructor;l;l = l.zd && l.zd.constructor) {
    if (l.prototype[c] === e) {
      h = !0;
    } else {
      if (h) {
        return l.prototype[c].apply(a, f);
      }
    }
  }
  if (a[c] === e) {
    return a.constructor.prototype[c].apply(a, f);
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
g.scope = function(a) {
  a.call(g.global);
};
g.Fo = !0;
g.Fo && (Function.prototype.bind = Function.prototype.bind || function(a, c) {
  if (1 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 1);
    d.unshift(this, a);
    return g.bind.apply(null, d);
  }
  return g.bind(this, a);
}, Function.prototype.Xb = function(a) {
  var c = Array.prototype.slice.call(arguments);
  c.unshift(this, null);
  return g.bind.apply(null, c);
}, Function.prototype.Ra = function(a) {
  g.Ra(this, a);
}, Function.prototype.Ri = function(a) {
  g.Ri(this.prototype, a);
});
g.Pa = function(a, c) {
  var d = c.constructor, e = c.gn;
  d && d != Object.prototype.constructor || (d = function() {
    throw Error("cannot instantiate an interface (no constructor defined).");
  });
  d = g.Pa.en(d, a);
  a && g.Ra(d, a);
  delete c.constructor;
  delete c.gn;
  g.Pa.Yh(d.prototype, c);
  null != e && (e instanceof Function ? e(d) : g.Pa.Yh(d, e));
  return d;
};
g.Pa.vn = g.ha;
g.Pa.en = function(a, c) {
  if (g.Pa.vn && Object.seal instanceof Function) {
    if (c && c.prototype && c.prototype[g.wn]) {
      return a;
    }
    var d = function() {
      var c = a.apply(this, arguments) || this;
      c[g.wb] = c[g.wb];
      this.constructor === d && Object.seal(c);
      return c;
    };
    return d;
  }
  return a;
};
g.Pa.pi = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
g.Pa.Yh = function(a, c) {
  for (var d in c) {
    Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d]);
  }
  for (var e = 0;e < g.Pa.pi.length;e++) {
    d = g.Pa.pi[e], Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d]);
  }
};
g.Vw = function() {
};
g.wn = "goog_defineClass_legacy_unsealable";
chrome.cast.yi = {TAB_AND_ORIGIN_SCOPED:"tab_and_origin_scoped", ORIGIN_SCOPED:"origin_scoped", PAGE_SCOPED:"page_scoped"};
g.i("chrome.cast.AutoJoinPolicy", chrome.cast.yi);
chrome.cast.zi = {CREATE_SESSION:"create_session", CAST_THIS_TAB:"cast_this_tab"};
g.i("chrome.cast.DefaultActionPolicy", chrome.cast.zi);
chrome.cast.af = {VIDEO_OUT:"video_out", AUDIO_OUT:"audio_out", VIDEO_IN:"video_in", AUDIO_IN:"audio_in"};
g.i("chrome.cast.Capability", chrome.cast.af);
chrome.cast.La = {CANCEL:"cancel", TIMEOUT:"timeout", API_NOT_INITIALIZED:"api_not_initialized", INVALID_PARAMETER:"invalid_parameter", EXTENSION_NOT_COMPATIBLE:"extension_not_compatible", EXTENSION_MISSING:"extension_missing", RECEIVER_UNAVAILABLE:"receiver_unavailable", SESSION_ERROR:"session_error", CHANNEL_ERROR:"channel_error", LOAD_MEDIA_FAILED:"load_media_failed"};
g.i("chrome.cast.ErrorCode", chrome.cast.La);
chrome.cast.Qo = {AVAILABLE:"available", UNAVAILABLE:"unavailable"};
g.i("chrome.cast.ReceiverAvailability", chrome.cast.Qo);
chrome.cast.Xo = {CHROME:"chrome", IOS:"ios", ANDROID:"android"};
g.i("chrome.cast.SenderPlatform", chrome.cast.Xo);
chrome.cast.ac = {CAST:"cast", DIAL:"dial", HANGOUT:"hangout", CUSTOM:"custom"};
g.i("chrome.cast.ReceiverType", chrome.cast.ac);
chrome.cast.so = {RUNNING:"running", STOPPED:"stopped", ERROR:"error"};
g.i("chrome.cast.DialAppState", chrome.cast.so);
chrome.cast.Po = {CAST:"cast", STOP:"stop"};
g.i("chrome.cast.ReceiverAction", chrome.cast.Po);
chrome.cast.rc = {CONNECTED:"connected", DISCONNECTED:"disconnected", STOPPED:"stopped"};
g.i("chrome.cast.SessionStatus", chrome.cast.rc);
chrome.cast.VERSION = [1, 2];
g.i("chrome.cast.VERSION", chrome.cast.VERSION);
chrome.cast.Error = function(a, c, d) {
  this.code = a;
  this.description = c || null;
  this.details = d || null;
};
g.i("chrome.cast.Error", chrome.cast.Error);
chrome.cast.Wo = function(a) {
  this.platform = a;
  this.packageId = this.url = null;
};
g.i("chrome.cast.SenderApplication", chrome.cast.Wo);
chrome.cast.Image = function(a) {
  this.url = a;
  this.width = this.height = null;
};
g.i("chrome.cast.Image", chrome.cast.Image);
chrome.cast.qd = function(a, c) {
  this.level = g.la(a) ? a : null;
  this.muted = g.la(c) ? c : null;
};
g.i("chrome.cast.Volume", chrome.cast.qd);
var k = {M:{hr:"LAUNCH", fi:"STOP", ei:"SET_VOLUME", di:"GET_STATUS", un:"RECEIVER_STATUS", it:"CONNECT", jt:"CLOSE", Pq:"GET_APP_AVAILABILITY", Dh:"LOAD", pm:"PAUSE", um:"SEEK", qm:"PLAY", bh:"STOP_MEDIA", Xg:"MEDIA_GET_STATUS", ah:"MEDIA_SET_VOLUME", nm:"EDIT_TRACKS_INFO", Yq:"INVALID_PLAYER_STATE", nr:"LOAD_FAILED", mr:"LOAD_CANCELLED", Zq:"INVALID_REQUEST", ue:"MEDIA_STATUS", jr:"LAUNCH_ERROR", Bs:"PING", Es:"PONG"}, bf:{}};
k.bf[k.M.bh] = k.M.fi;
k.bf[k.M.ah] = k.M.ei;
k.bf[k.M.Xg] = k.M.di;
k.Um = function(a, c, d) {
  this.sessionId = a;
  this.namespaceName = c;
  this.message = d;
};
k.Tm = function(a) {
  this.type = k.M.fi;
  this.requestId = null;
  this.sessionId = a || null;
};
chrome.cast.media.wi = {PAUSE:"pause", SEEK:"seek", STREAM_VOLUME:"stream_volume", STREAM_MUTE:"stream_mute"};
g.i("chrome.cast.media.MediaCommand", chrome.cast.media.wi);
chrome.cast.media.Ea = {GENERIC:0, MOVIE:1, TV_SHOW:2, MUSIC_TRACK:3, PHOTO:4};
g.i("chrome.cast.media.MetadataType", chrome.cast.media.Ea);
chrome.cast.media.mc = {IDLE:"IDLE", PLAYING:"PLAYING", PAUSED:"PAUSED", BUFFERING:"BUFFERING"};
g.i("chrome.cast.media.PlayerState", chrome.cast.media.mc);
chrome.cast.media.To = {PLAYBACK_START:"PLAYBACK_START", PLAYBACK_PAUSE:"PLAYBACK_PAUSE"};
g.i("chrome.cast.media.ResumeState", chrome.cast.media.To);
chrome.cast.media.Qe = {BUFFERED:"BUFFERED", LIVE:"LIVE", OTHER:"OTHER"};
g.i("chrome.cast.media.StreamType", chrome.cast.media.Qe);
chrome.cast.media.Co = {CANCELLED:"CANCELLED", INTERRUPTED:"INTERRUPTED", FINISHED:"FINISHED", ERROR:"ERROR"};
g.i("chrome.cast.media.IdleReason", chrome.cast.media.Co);
chrome.cast.media.gp = {TEXT:"TEXT", AUDIO:"AUDIO", VIDEO:"VIDEO"};
g.i("chrome.cast.media.TrackType", chrome.cast.media.gp);
chrome.cast.media.dp = {SUBTITLES:"SUBTITLES", CAPTIONS:"CAPTIONS", DESCRIPTIONS:"DESCRIPTIONS", CHAPTERS:"CHAPTERS", METADATA:"METADATA"};
g.i("chrome.cast.media.TextTrackType", chrome.cast.media.dp);
chrome.cast.media.$o = {NONE:"NONE", OUTLINE:"OUTLINE", DROP_SHADOW:"DROP_SHADOW", RAISED:"RAISED", DEPRESSED:"DEPRESSED"};
g.i("chrome.cast.media.TextTrackEdgeType", chrome.cast.media.$o);
chrome.cast.media.ep = {NONE:"NONE", NORMAL:"NORMAL", ROUNDED_CORNERS:"ROUNDED_CORNERS"};
g.i("chrome.cast.media.TextTrackWindowType", chrome.cast.media.ep);
chrome.cast.media.ap = {SANS_SERIF:"SANS_SERIF", MONOSPACED_SANS_SERIF:"MONOSPACED_SANS_SERIF", SERIF:"SERIF", MONOSPACED_SERIF:"MONOSPACED_SERIF", CASUAL:"CASUAL", CURSIVE:"CURSIVE", SMALL_CAPITALS:"SMALL_CAPITALS"};
g.i("chrome.cast.media.TextTrackFontGenericFamily", chrome.cast.media.ap);
chrome.cast.media.bp = {NORMAL:"NORMAL", BOLD:"BOLD", BOLD_ITALIC:"BOLD_ITALIC", ITALIC:"ITALIC"};
g.i("chrome.cast.media.TextTrackFontStyle", chrome.cast.media.bp);
chrome.cast.media.Wg = function() {
  this.customData = null;
};
g.i("chrome.cast.media.GetStatusRequest", chrome.cast.media.Wg);
chrome.cast.media.fh = function() {
  this.customData = null;
};
g.i("chrome.cast.media.PauseRequest", chrome.cast.media.fh);
chrome.cast.media.gh = function() {
  this.customData = null;
};
g.i("chrome.cast.media.PlayRequest", chrome.cast.media.gh);
chrome.cast.media.Vo = function() {
  this.customData = this.resumeState = this.currentTime = null;
};
g.i("chrome.cast.media.SeekRequest", chrome.cast.media.Vo);
chrome.cast.media.eh = function() {
  this.customData = null;
};
g.i("chrome.cast.media.StopRequest", chrome.cast.media.eh);
chrome.cast.media.jp = function(a) {
  this.volume = a;
  this.customData = null;
};
g.i("chrome.cast.media.VolumeRequest", chrome.cast.media.jp);
chrome.cast.media.Eo = function(a) {
  this.type = k.M.Dh;
  this.sessionId = this.requestId = null;
  this.media = a;
  this.activeTrackIds = null;
  this.autoplay = !0;
  this.customData = this.currentTime = null;
};
g.i("chrome.cast.media.LoadRequest", chrome.cast.media.Eo);
chrome.cast.media.wo = function(a, c) {
  this.requestId = null;
  this.activeTrackIds = a || null;
  this.textTrackStyle = c || null;
};
g.i("chrome.cast.media.EditTracksInfoRequest", chrome.cast.media.wo);
chrome.cast.media.Ao = function() {
  this.metadataType = this.type = chrome.cast.media.Ea.GENERIC;
  this.releaseDate = this.releaseYear = this.images = this.subtitle = this.title = null;
};
g.i("chrome.cast.media.GenericMediaMetadata", chrome.cast.media.Ao);
chrome.cast.media.Lo = function() {
  this.metadataType = this.type = chrome.cast.media.Ea.MOVIE;
  this.releaseDate = this.releaseYear = this.images = this.subtitle = this.studio = this.title = null;
};
g.i("chrome.cast.media.MovieMediaMetadata", chrome.cast.media.Lo);
chrome.cast.media.hp = function() {
  this.metadataType = this.type = chrome.cast.media.Ea.TV_SHOW;
  this.originalAirdate = this.releaseYear = this.images = this.episode = this.episodeNumber = this.season = this.seasonNumber = this.episodeTitle = this.title = this.seriesTitle = null;
};
g.i("chrome.cast.media.TvShowMediaMetadata", chrome.cast.media.hp);
chrome.cast.media.Mo = function() {
  this.metadataType = this.type = chrome.cast.media.Ea.MUSIC_TRACK;
  this.releaseDate = this.releaseYear = this.images = this.discNumber = this.trackNumber = this.artistName = this.songName = this.composer = this.artist = this.albumArtist = this.title = this.albumName = null;
};
g.i("chrome.cast.media.MusicTrackMediaMetadata", chrome.cast.media.Mo);
chrome.cast.media.Oo = function() {
  this.metadataType = this.type = chrome.cast.media.Ea.PHOTO;
  this.creationDateTime = this.height = this.width = this.longitude = this.latitude = this.images = this.location = this.artist = this.title = null;
};
g.i("chrome.cast.media.PhotoMediaMetadata", chrome.cast.media.Oo);
chrome.cast.media.Jo = function(a, c) {
  this.contentId = a;
  this.streamType = chrome.cast.media.Qe.BUFFERED;
  this.contentType = c;
  this.customData = this.textTrackStyle = this.tracks = this.duration = this.metadata = null;
};
g.i("chrome.cast.media.MediaInfo", chrome.cast.media.Jo);
chrome.cast.media.s = function(a, c) {
  this.sessionId = a;
  this.mediaSessionId = c;
  this.media = null;
  this.playbackRate = 1;
  this.playerState = chrome.cast.media.mc.IDLE;
  this.currentTime = 0;
  this.qe = -1;
  this.supportedMediaCommands = [];
  this.volume = new chrome.cast.qd;
  this.customData = this.activeTrackIds = this.idleReason = null;
  this.Xc = this.he = !1;
  this.pc = [];
};
g.i("chrome.cast.media.Media", chrome.cast.media.s);
chrome.cast.media.oo = "CC1AD845";
g.i("chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID", chrome.cast.media.oo);
chrome.cast.media.timeout = {};
g.i("chrome.cast.media.timeout", chrome.cast.media.timeout);
chrome.cast.media.timeout.load = 0;
g.w(chrome.cast.media.timeout, "load", chrome.cast.media.timeout.load);
chrome.cast.media.timeout.nd = 0;
g.w(chrome.cast.media.timeout, "getStatus", chrome.cast.media.timeout.nd);
chrome.cast.media.timeout.play = 0;
g.w(chrome.cast.media.timeout, "play", chrome.cast.media.timeout.play);
chrome.cast.media.timeout.pause = 0;
g.w(chrome.cast.media.timeout, "pause", chrome.cast.media.timeout.pause);
chrome.cast.media.timeout.seek = 0;
g.w(chrome.cast.media.timeout, "seek", chrome.cast.media.timeout.seek);
chrome.cast.media.timeout.stop = 0;
g.w(chrome.cast.media.timeout, "stop", chrome.cast.media.timeout.stop);
chrome.cast.media.timeout.pd = 0;
g.w(chrome.cast.media.timeout, "setVolume", chrome.cast.media.timeout.pd);
chrome.cast.media.timeout.rd = 0;
g.w(chrome.cast.media.timeout, "editTracksInfo", chrome.cast.media.timeout.rd);
chrome.cast.media.fp = function(a, c) {
  this.trackId = a;
  this.trackContentType = this.trackContentId = null;
  this.type = c;
  this.customData = this.subtype = this.language = this.name = null;
};
g.i("chrome.cast.media.Track", chrome.cast.media.fp);
chrome.cast.media.cp = function() {
  this.customData = this.fontStyle = this.fontGenericFamily = this.fontFamily = this.fontScale = this.windowRoundedCornerRadius = this.windowColor = this.windowType = this.edgeColor = this.edgeType = this.backgroundColor = this.foregroundColor = null;
};
g.i("chrome.cast.media.TextTrackStyle", chrome.cast.media.cp);
chrome.cast.lo = function(a, c, d, e, f) {
  this.sessionRequest = a;
  this.sessionListener = c;
  this.receiverListener = d;
  this.autoJoinPolicy = e || chrome.cast.yi.TAB_AND_ORIGIN_SCOPED;
  this.defaultActionPolicy = f || chrome.cast.zi.CREATE_SESSION;
  this.customDialLaunchCallback = null;
};
g.i("chrome.cast.ApiConfig", chrome.cast.lo);
chrome.cast.vo = function(a, c) {
  this.appName = a;
  this.launchParameter = c || null;
};
g.i("chrome.cast.DialRequest", chrome.cast.vo);
chrome.cast.to = function(a, c, d) {
  this.receiver = a;
  this.appState = c;
  this.extraData = d || null;
};
g.i("chrome.cast.DialLaunchData", chrome.cast.to);
chrome.cast.uo = function(a, c) {
  this.doLaunch = a;
  this.launchParameter = c || null;
};
g.i("chrome.cast.DialLaunchResponse", chrome.cast.uo);
chrome.cast.Yo = function(a, c, d) {
  this.appId = a;
  this.capabilities = c || [chrome.cast.af.VIDEO_OUT, chrome.cast.af.AUDIO_OUT];
  this.dialRequest = null;
  this.requestSessionTimeout = d || chrome.cast.timeout.requestSession;
  this.language = null;
};
g.i("chrome.cast.SessionRequest", chrome.cast.Yo);
chrome.cast.Ia = function(a, c, d, e) {
  this.label = a;
  this.friendlyName = c;
  this.capabilities = d || [];
  this.volume = e || null;
  this.receiverType = chrome.cast.ac.CAST;
  this.displayStatus = this.isActiveInput = null;
};
g.i("chrome.cast.Receiver", chrome.cast.Ia);
chrome.cast.Ro = function(a, c) {
  this.statusText = a;
  this.appImages = c;
  this.showStop = null;
};
g.i("chrome.cast.ReceiverDisplayStatus", chrome.cast.Ro);
chrome.cast.q = function(a, c, d, e, f) {
  this.sessionId = a;
  this.appId = c;
  this.displayName = d;
  this.statusText = null;
  this.appImages = e;
  this.receiver = f;
  this.senderApps = [];
  this.namespaces = [];
  this.media = [];
  this.status = chrome.cast.rc.CONNECTED;
  this.transportId = "";
};
g.i("chrome.cast.Session", chrome.cast.q);
chrome.cast.q.hh = "custom_receiver_session_id";
g.w(chrome.cast.q, "CUSTOM_RECEIVER_SESSION_ID", chrome.cast.q.hh);
chrome.cast.timeout = {};
g.i("chrome.cast.timeout", chrome.cast.timeout);
chrome.cast.timeout.requestSession = 1E4;
chrome.cast.timeout.leaveSession = 3E3;
chrome.cast.timeout.stopSession = 3E3;
chrome.cast.timeout.setReceiverVolume = 3E3;
chrome.cast.timeout.sendCustomMessage = 3E3;
chrome.cast.dh = "mirror_app_id";
g.i("chrome.cast.MIRROR_APP_ID", chrome.cast.dh);
k.em = function(a) {
  this.sessionRequest = a.sessionRequest;
  this.autoJoinPolicy = a.autoJoinPolicy;
  this.defaultActionPolicy = a.defaultActionPolicy;
  this.useCustomDialLaunch = !!a.customDialLaunchCallback;
};
k.hq = function() {
  this.displayName = this.appId = this.sessionId = this.transportId = "";
  this.statusText = null;
  this.appImages = [];
  this.senderApps = [];
  this.namespaces = [];
};
k.Ms = function() {
  this.type = k.M.di;
  this.requestId = null;
};
k.Ns = function() {
  this.type = k.M.un;
  this.status = this.requestId = null;
};
k.Ls = function() {
  this.channelUrl = this.volume = this.applications = null;
  this.isActiveInput = void 0;
};
k.ar = function() {
};
g.b = {};
g.b.Pd = !1;
g.b.Fj = !1;
g.b.$j = {Zj:"\u00a0"};
g.b.wj = function(a, c) {
  return 0 == a.lastIndexOf(c, 0);
};
g.b.tu = function(a, c) {
  var d = a.length - c.length;
  return 0 <= d && a.indexOf(c, d) == d;
};
g.b.Pt = function(a, c) {
  return 0 == g.b.fg(c, a.substr(0, c.length));
};
g.b.Nt = function(a, c) {
  return 0 == g.b.fg(c, a.substr(a.length - c.length, c.length));
};
g.b.Ot = function(a, c) {
  return a.toLowerCase() == c.toLowerCase();
};
g.b.ek = function(a, c) {
  for (var d = a.split("%s"), e = "", f = Array.prototype.slice.call(arguments, 1);f.length && 1 < d.length;) {
    e += d.shift() + f.shift();
  }
  return e + d.join("%s");
};
g.b.Xt = function(a) {
  return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
};
g.b.Ud = function(a) {
  return/^[\s\xa0]*$/.test(a);
};
g.b.uv = function(a) {
  return 0 == a.length;
};
g.b.ra = g.b.Ud;
g.b.yp = function(a) {
  return g.b.Ud(g.b.Uj(a));
};
g.b.tv = g.b.yp;
g.b.nv = function(a) {
  return!/[^\t\n\r ]/.test(a);
};
g.b.kv = function(a) {
  return!/[^a-zA-Z]/.test(a);
};
g.b.Hv = function(a) {
  return!/[^0-9]/.test(a);
};
g.b.lv = function(a) {
  return!/[^a-zA-Z0-9]/.test(a);
};
g.b.Pv = function(a) {
  return " " == a;
};
g.b.Rv = function(a) {
  return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a;
};
g.b.Tw = function(a) {
  return a.replace(/(\r\n|\r|\n)+/g, " ");
};
g.b.Lt = function(a) {
  return a.replace(/(\r\n|\r|\n)/g, "\n");
};
g.b.iw = function(a) {
  return a.replace(/\xa0|\s/g, " ");
};
g.b.hw = function(a) {
  return a.replace(/\xa0|[ \t]+/g, " ");
};
g.b.Wt = function(a) {
  return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
};
g.b.trim = g.cf && String.prototype.trim ? function(a) {
  return a.trim();
} : function(a) {
  return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
};
g.b.trimLeft = function(a) {
  return a.replace(/^[\s\xa0]+/, "");
};
g.b.trimRight = function(a) {
  return a.replace(/[\s\xa0]+$/, "");
};
g.b.fg = function(a, c) {
  var d = String(a).toLowerCase(), e = String(c).toLowerCase();
  return d < e ? -1 : d == e ? 0 : 1;
};
g.b.hg = /(\.\d+)|(\d+)|(\D+)/g;
g.b.kw = function(a, c) {
  if (a == c) {
    return 0;
  }
  if (!a) {
    return-1;
  }
  if (!c) {
    return 1;
  }
  for (var d = a.toLowerCase().match(g.b.hg), e = c.toLowerCase().match(g.b.hg), f = Math.min(d.length, e.length), h = 0;h < f;h++) {
    var l = d[h], m = e[h];
    if (l != m) {
      return d = parseInt(l, 10), !isNaN(d) && (e = parseInt(m, 10), !isNaN(e) && d - e) ? d - e : l < m ? -1 : 1;
    }
  }
  return d.length != e.length ? d.length - e.length : a < c ? -1 : 1;
};
g.b.ix = function(a) {
  return encodeURIComponent(String(a));
};
g.b.hx = function(a) {
  return decodeURIComponent(a.replace(/\+/g, " "));
};
g.b.rf = function(a, c) {
  return a.replace(/(\r\n|\r|\n)/g, c ? "<br />" : "<br>");
};
g.b.Fa = function(a, c) {
  if (c) {
    a = a.replace(g.b.Hf, "&amp;").replace(g.b.Kf, "&lt;").replace(g.b.Jf, "&gt;").replace(g.b.Mf, "&quot;").replace(g.b.Nf, "&#39;").replace(g.b.Lf, "&#0;"), g.b.Pd && (a = a.replace(g.b.If, "&#101;"));
  } else {
    if (!g.b.tj.test(a)) {
      return a;
    }
    -1 != a.indexOf("&") && (a = a.replace(g.b.Hf, "&amp;"));
    -1 != a.indexOf("<") && (a = a.replace(g.b.Kf, "&lt;"));
    -1 != a.indexOf(">") && (a = a.replace(g.b.Jf, "&gt;"));
    -1 != a.indexOf('"') && (a = a.replace(g.b.Mf, "&quot;"));
    -1 != a.indexOf("'") && (a = a.replace(g.b.Nf, "&#39;"));
    -1 != a.indexOf("\x00") && (a = a.replace(g.b.Lf, "&#0;"));
    g.b.Pd && -1 != a.indexOf("e") && (a = a.replace(g.b.If, "&#101;"));
  }
  return a;
};
g.b.Hf = /&/g;
g.b.Kf = /</g;
g.b.Jf = />/g;
g.b.Mf = /"/g;
g.b.Nf = /'/g;
g.b.Lf = /\x00/g;
g.b.If = /e/g;
g.b.tj = g.b.Pd ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
g.b.Sd = function(a) {
  return g.b.contains(a, "&") ? !g.b.Fj && "document" in g.global ? g.b.cg(a) : g.b.Tj(a) : a;
};
g.b.dx = function(a, c) {
  return g.b.contains(a, "&") ? g.b.cg(a, c) : a;
};
g.b.cg = function(a, c) {
  var d = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'}, e;
  e = c ? c.createElement("div") : g.global.document.createElement("div");
  return a.replace(g.b.dk, function(a, c) {
    var l = d[a];
    if (l) {
      return l;
    }
    if ("#" == c.charAt(0)) {
      var m = Number("0" + c.substr(1));
      isNaN(m) || (l = String.fromCharCode(m));
    }
    l || (e.innerHTML = a + " ", l = e.firstChild.nodeValue.slice(0, -1));
    return d[a] = l;
  });
};
g.b.Tj = function(a) {
  return a.replace(/&([^;]+);/g, function(a, d) {
    switch(d) {
      case "amp":
        return "&";
      case "lt":
        return "<";
      case "gt":
        return ">";
      case "quot":
        return'"';
      default:
        if ("#" == d.charAt(0)) {
          var e = Number("0" + d.substr(1));
          if (!isNaN(e)) {
            return String.fromCharCode(e);
          }
        }
        return a;
    }
  });
};
g.b.dk = /&([^;\s<&]+);?/g;
g.b.ej = function(a, c) {
  return g.b.rf(a.replace(/  /g, " &#160;"), c);
};
g.b.ow = function(a) {
  return a.replace(/(^|[\n ]) /g, "$1" + g.b.$j.Zj);
};
g.b.Uw = function(a, c) {
  for (var d = c.length, e = 0;e < d;e++) {
    var f = 1 == d ? c : c.charAt(e);
    if (a.charAt(0) == f && a.charAt(a.length - 1) == f) {
      return a.substring(1, a.length - 1);
    }
  }
  return a;
};
g.b.truncate = function(a, c, d) {
  d && (a = g.b.Sd(a));
  a.length > c && (a = a.substring(0, c - 3) + "...");
  d && (a = g.b.Fa(a));
  return a;
};
g.b.bx = function(a, c, d, e) {
  d && (a = g.b.Sd(a));
  if (e && a.length > c) {
    e > c && (e = c), a = a.substring(0, c - e) + "..." + a.substring(a.length - e);
  } else {
    if (a.length > c) {
      e = Math.floor(c / 2);
      var f = a.length - e;
      a = a.substring(0, e + c % 2) + "..." + a.substring(f);
    }
  }
  d && (a = g.b.Fa(a));
  return a;
};
g.b.Td = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
g.b.Kc = {"'":"\\'"};
g.b.quote = function(a) {
  a = String(a);
  if (a.quote) {
    return a.quote();
  }
  for (var c = ['"'], d = 0;d < a.length;d++) {
    var e = a.charAt(d), f = e.charCodeAt(0);
    c[d + 1] = g.b.Td[e] || (31 < f && 127 > f ? e : g.b.dg(e));
  }
  c.push('"');
  return c.join("");
};
g.b.Au = function(a) {
  for (var c = [], d = 0;d < a.length;d++) {
    c[d] = g.b.dg(a.charAt(d));
  }
  return c.join("");
};
g.b.dg = function(a) {
  if (a in g.b.Kc) {
    return g.b.Kc[a];
  }
  if (a in g.b.Td) {
    return g.b.Kc[a] = g.b.Td[a];
  }
  var c = a, d = a.charCodeAt(0);
  if (31 < d && 127 > d) {
    c = a;
  } else {
    if (256 > d) {
      if (c = "\\x", 16 > d || 256 < d) {
        c += "0";
      }
    } else {
      c = "\\u", 4096 > d && (c += "0");
    }
    c += d.toString(16).toUpperCase();
  }
  return g.b.Kc[a] = c;
};
g.b.contains = function(a, c) {
  return-1 != a.indexOf(c);
};
g.b.Wi = function(a, c) {
  return g.b.contains(a.toLowerCase(), c.toLowerCase());
};
g.b.eu = function(a, c) {
  return a && c ? a.split(c).length - 1 : 0;
};
g.b.bc = function(a, c, d) {
  var e = a;
  0 <= c && c < a.length && 0 < d && (e = a.substr(0, c) + a.substr(c + d, a.length - c - d));
  return e;
};
g.b.remove = function(a, c) {
  var d = new RegExp(g.b.Xd(c), "");
  return a.replace(d, "");
};
g.b.removeAll = function(a, c) {
  var d = new RegExp(g.b.Xd(c), "g");
  return a.replace(d, "");
};
g.b.Xd = function(a) {
  return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
};
g.b.repeat = function(a, c) {
  return Array(c + 1).join(a);
};
g.b.nw = function(a, c, d) {
  a = g.la(d) ? a.toFixed(d) : String(a);
  d = a.indexOf(".");
  -1 == d && (d = a.length);
  return g.b.repeat("0", Math.max(0, c - d)) + a;
};
g.b.Uj = function(a) {
  return null == a ? "" : String(a);
};
g.b.It = function(a) {
  return Array.prototype.join.call(arguments, "");
};
g.b.oj = function() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ g.now()).toString(36);
};
g.b.Ab = function(a, c) {
  for (var d = 0, e = g.b.trim(String(a)).split("."), f = g.b.trim(String(c)).split("."), h = Math.max(e.length, f.length), l = 0;0 == d && l < h;l++) {
    var m = e[l] || "", n = f[l] || "", p = /(\d*)(\D*)/g, q = /(\d*)(\D*)/g;
    do {
      var r = p.exec(m) || ["", "", ""], t = q.exec(n) || ["", "", ""];
      if (0 == r[0].length && 0 == t[0].length) {
        break;
      }
      d = g.b.Yd(0 == r[1].length ? 0 : parseInt(r[1], 10), 0 == t[1].length ? 0 : parseInt(t[1], 10)) || g.b.Yd(0 == r[2].length, 0 == t[2].length) || g.b.Yd(r[2], t[2]);
    } while (0 == d);
  }
  return d;
};
g.b.Yd = function(a, c) {
  return a < c ? -1 : a > c ? 1 : 0;
};
g.b.ck = 4294967296;
g.b.ev = function(a) {
  for (var c = 0, d = 0;d < a.length;++d) {
    c = 31 * c + a.charCodeAt(d), c %= g.b.ck;
  }
  return c;
};
g.b.fk = 2147483648 * Math.random() | 0;
g.b.ju = function() {
  return "goog_" + g.b.fk++;
};
g.b.Zw = function(a) {
  var c = Number(a);
  return 0 == c && g.b.Ud(a) ? NaN : c;
};
g.b.Bv = function(a) {
  return/^[a-z]+([A-Z][a-z]*)*$/.test(a);
};
g.b.Sv = function(a) {
  return/^([A-Z][a-z]*)+$/.test(a);
};
g.b.Yw = function(a) {
  return String(a).replace(/\-([a-z])/g, function(a, d) {
    return d.toUpperCase();
  });
};
g.b.$w = function(a) {
  return String(a).replace(/([A-Z])/g, "-$1").toLowerCase();
};
g.b.ax = function(a, c) {
  var d = g.isString(c) ? g.b.Xd(c) : "\\s";
  return a.replace(new RegExp("(^" + (d ? "|[" + d + "]+" : "") + ")([a-z])", "g"), function(a, c, d) {
    return c + d.toUpperCase();
  });
};
g.b.Mt = function(a) {
  return String(a.charAt(0)).toUpperCase() + String(a.substr(1)).toLowerCase();
};
g.b.parseInt = function(a) {
  isFinite(a) && (a = String(a));
  return g.isString(a) ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN;
};
g.b.Nw = function(a, c, d) {
  a = a.split(c);
  for (var e = [];0 < d && a.length;) {
    e.push(a.shift()), d--;
  }
  a.length && e.push(a.join(c));
  return e;
};
g.b.ru = function(a, c) {
  var d = [], e = [];
  if (a == c) {
    return 0;
  }
  if (!a.length || !c.length) {
    return Math.max(a.length, c.length);
  }
  for (var f = 0;f < c.length + 1;f++) {
    d[f] = f;
  }
  for (f = 0;f < a.length;f++) {
    e[0] = f + 1;
    for (var h = 0;h < c.length;h++) {
      e[h + 1] = Math.min(e[h] + 1, d[h + 1] + 1, d[h] + (a[f] != c[h]));
    }
    for (h = 0;h < d.length;h++) {
      d[h] = e[h];
    }
  }
  return e[c.length];
};
k.Ve = {};
k.Ve.Gd = function(a) {
  return a ? g.b.Fa(a) : a;
};
k.Ve.gx = function(a) {
  return a ? g.b.Sd(a) : a;
};
g.debug = {};
g.debug.Error = function(a) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, g.debug.Error);
  } else {
    var c = Error().stack;
    c && (this.stack = c);
  }
  a && (this.message = String(a));
};
g.Ra(g.debug.Error, Error);
g.debug.Error.prototype.name = "CustomError";
g.nb = {};
g.nb.ol = {nl:1, aq:2, TEXT:3, lq:4, Kq:5, Jq:6, Fs:7, tq:8, Cq:9, Eq:10, Dq:11, ws:12};
g.l = {};
g.l.Ca = g.ha;
g.l.ld = function(a, c) {
  c.unshift(a);
  g.debug.Error.call(this, g.b.ek.apply(null, c));
  c.shift();
};
g.Ra(g.l.ld, g.debug.Error);
g.l.ld.prototype.name = "AssertionError";
g.l.no = function(a) {
  throw a;
};
g.l.re = g.l.no;
g.l.Wa = function(a, c, d, e) {
  var f = "Assertion failed";
  if (d) {
    var f = f + (": " + d), h = e
  } else {
    a && (f += ": " + a, h = c);
  }
  a = new g.l.ld("" + f, h || []);
  g.l.re(a);
};
g.l.Dw = function(a) {
  g.l.Ca && (g.l.re = a);
};
g.l.assert = function(a, c, d) {
  g.l.Ca && !a && g.l.Wa("", null, c, Array.prototype.slice.call(arguments, 2));
  return a;
};
g.l.za = function(a, c) {
  g.l.Ca && g.l.re(new g.l.ld("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)));
};
g.l.Bt = function(a, c, d) {
  g.l.Ca && !g.isNumber(a) && g.l.Wa("Expected number but got %s: %s.", [g.na(a), a], c, Array.prototype.slice.call(arguments, 2));
  return a;
};
g.l.Dt = function(a, c, d) {
  g.l.Ca && !g.isString(a) && g.l.Wa("Expected string but got %s: %s.", [g.na(a), a], c, Array.prototype.slice.call(arguments, 2));
  return a;
};
g.l.zt = function(a, c, d) {
  g.l.Ca && !g.isFunction(a) && g.l.Wa("Expected function but got %s: %s.", [g.na(a), a], c, Array.prototype.slice.call(arguments, 2));
  return a;
};
g.l.Ct = function(a, c, d) {
  g.l.Ca && !g.isObject(a) && g.l.Wa("Expected object but got %s: %s.", [g.na(a), a], c, Array.prototype.slice.call(arguments, 2));
  return a;
};
g.l.wt = function(a, c, d) {
  g.l.Ca && !g.isArray(a) && g.l.Wa("Expected array but got %s: %s.", [g.na(a), a], c, Array.prototype.slice.call(arguments, 2));
  return a;
};
g.l.xt = function(a, c, d) {
  g.l.Ca && !g.eb(a) && g.l.Wa("Expected boolean but got %s: %s.", [g.na(a), a], c, Array.prototype.slice.call(arguments, 2));
  return a;
};
g.l.yt = function(a, c, d) {
  !g.l.Ca || g.isObject(a) && a.nodeType == g.nb.ol.nl || g.l.Wa("Expected Element but got %s: %s.", [g.na(a), a], c, Array.prototype.slice.call(arguments, 2));
  return a;
};
g.l.At = function(a, c, d, e) {
  !g.l.Ca || a instanceof c || g.l.Wa("Expected instanceof %s but got %s.", [g.l.Ug(c), g.l.Ug(a)], d, Array.prototype.slice.call(arguments, 3));
  return a;
};
g.l.vk = function() {
  for (var a in Object.prototype) {
    g.l.za(a + " should not be enumerable in Object.prototype.");
  }
};
g.l.Ug = function(a) {
  return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a;
};
g.a = {};
g.Ya = g.cf;
g.a.Xa = !1;
g.a.Kp = function(a) {
  return a[a.length - 1];
};
g.a.Tv = g.a.Kp;
g.a.D = Array.prototype;
g.a.indexOf = g.Ya && (g.a.Xa || g.a.D.indexOf) ? function(a, c, d) {
  return g.a.D.indexOf.call(a, c, d);
} : function(a, c, d) {
  d = null == d ? 0 : 0 > d ? Math.max(0, a.length + d) : d;
  if (g.isString(a)) {
    return g.isString(c) && 1 == c.length ? a.indexOf(c, d) : -1;
  }
  for (;d < a.length;d++) {
    if (d in a && a[d] === c) {
      return d;
    }
  }
  return-1;
};
g.a.lastIndexOf = g.Ya && (g.a.Xa || g.a.D.lastIndexOf) ? function(a, c, d) {
  return g.a.D.lastIndexOf.call(a, c, null == d ? a.length - 1 : d);
} : function(a, c, d) {
  d = null == d ? a.length - 1 : d;
  0 > d && (d = Math.max(0, a.length + d));
  if (g.isString(a)) {
    return g.isString(c) && 1 == c.length ? a.lastIndexOf(c, d) : -1;
  }
  for (;0 <= d;d--) {
    if (d in a && a[d] === c) {
      return d;
    }
  }
  return-1;
};
g.a.forEach = g.Ya && (g.a.Xa || g.a.D.forEach) ? function(a, c, d) {
  g.a.D.forEach.call(a, c, d);
} : function(a, c, d) {
  for (var e = a.length, f = g.isString(a) ? a.split("") : a, h = 0;h < e;h++) {
    h in f && c.call(d, f[h], h, a);
  }
};
g.a.Xf = function(a, c, d) {
  for (var e = a.length, f = g.isString(a) ? a.split("") : a, e = e - 1;0 <= e;--e) {
    e in f && c.call(d, f[e], e, a);
  }
};
g.a.filter = g.Ya && (g.a.Xa || g.a.D.filter) ? function(a, c, d) {
  return g.a.D.filter.call(a, c, d);
} : function(a, c, d) {
  for (var e = a.length, f = [], h = 0, l = g.isString(a) ? a.split("") : a, m = 0;m < e;m++) {
    if (m in l) {
      var n = l[m];
      c.call(d, n, m, a) && (f[h++] = n);
    }
  }
  return f;
};
g.a.map = g.Ya && (g.a.Xa || g.a.D.map) ? function(a, c, d) {
  return g.a.D.map.call(a, c, d);
} : function(a, c, d) {
  for (var e = a.length, f = Array(e), h = g.isString(a) ? a.split("") : a, l = 0;l < e;l++) {
    l in h && (f[l] = c.call(d, h[l], l, a));
  }
  return f;
};
g.a.reduce = g.Ya && (g.a.Xa || g.a.D.reduce) ? function(a, c, d, e) {
  e && (c = g.bind(c, e));
  return g.a.D.reduce.call(a, c, d);
} : function(a, c, d, e) {
  var f = d;
  g.a.forEach(a, function(d, l) {
    f = c.call(e, f, d, l, a);
  });
  return f;
};
g.a.reduceRight = g.Ya && (g.a.Xa || g.a.D.reduceRight) ? function(a, c, d, e) {
  e && (c = g.bind(c, e));
  return g.a.D.reduceRight.call(a, c, d);
} : function(a, c, d, e) {
  var f = d;
  g.a.Xf(a, function(d, l) {
    f = c.call(e, f, d, l, a);
  });
  return f;
};
g.a.some = g.Ya && (g.a.Xa || g.a.D.some) ? function(a, c, d) {
  return g.a.D.some.call(a, c, d);
} : function(a, c, d) {
  for (var e = a.length, f = g.isString(a) ? a.split("") : a, h = 0;h < e;h++) {
    if (h in f && c.call(d, f[h], h, a)) {
      return!0;
    }
  }
  return!1;
};
g.a.every = g.Ya && (g.a.Xa || g.a.D.every) ? function(a, c, d) {
  return g.a.D.every.call(a, c, d);
} : function(a, c, d) {
  for (var e = a.length, f = g.isString(a) ? a.split("") : a, h = 0;h < e;h++) {
    if (h in f && !c.call(d, f[h], h, a)) {
      return!1;
    }
  }
  return!0;
};
g.a.count = function(a, c, d) {
  var e = 0;
  g.a.forEach(a, function(a, h, l) {
    c.call(d, a, h, l) && ++e;
  }, d);
  return e;
};
g.a.find = function(a, c, d) {
  c = g.a.Wf(a, c, d);
  return 0 > c ? null : g.isString(a) ? a.charAt(c) : a[c];
};
g.a.Wf = function(a, c, d) {
  for (var e = a.length, f = g.isString(a) ? a.split("") : a, h = 0;h < e;h++) {
    if (h in f && c.call(d, f[h], h, a)) {
      return h;
    }
  }
  return-1;
};
g.a.Eu = function(a, c, d) {
  c = g.a.Vj(a, c, d);
  return 0 > c ? null : g.isString(a) ? a.charAt(c) : a[c];
};
g.a.Vj = function(a, c, d) {
  for (var e = a.length, f = g.isString(a) ? a.split("") : a, e = e - 1;0 <= e;e--) {
    if (e in f && c.call(d, f[e], e, a)) {
      return e;
    }
  }
  return-1;
};
g.a.contains = function(a, c) {
  return 0 <= g.a.indexOf(a, c);
};
g.a.ra = function(a) {
  return 0 == a.length;
};
g.a.clear = function(a) {
  if (!g.isArray(a)) {
    for (var c = a.length - 1;0 <= c;c--) {
      delete a[c];
    }
  }
  a.length = 0;
};
g.a.insert = function(a, c) {
  g.a.contains(a, c) || a.push(c);
};
g.a.$f = function(a, c, d) {
  g.a.splice(a, d, 0, c);
};
g.a.iv = function(a, c, d) {
  g.Xb(g.a.splice, a, d, 0).apply(null, c);
};
g.a.insertBefore = function(a, c, d) {
  var e;
  2 == arguments.length || 0 > (e = g.a.indexOf(a, d)) ? a.push(c) : g.a.$f(a, c, e);
};
g.a.remove = function(a, c) {
  var d = g.a.indexOf(a, c), e;
  (e = 0 <= d) && g.a.bc(a, d);
  return e;
};
g.a.bc = function(a, c) {
  return 1 == g.a.D.splice.call(a, c, 1).length;
};
g.a.tw = function(a, c, d) {
  c = g.a.Wf(a, c, d);
  return 0 <= c ? (g.a.bc(a, c), !0) : !1;
};
g.a.rw = function(a, c, d) {
  var e = 0;
  g.a.Xf(a, function(f, h) {
    c.call(d, f, h, a) && g.a.bc(a, h) && e++;
  });
  return e;
};
g.a.concat = function(a) {
  return g.a.D.concat.apply(g.a.D, arguments);
};
g.a.join = function(a) {
  return g.a.D.concat.apply(g.a.D, arguments);
};
g.a.bb = function(a) {
  var c = a.length;
  if (0 < c) {
    for (var d = Array(c), e = 0;e < c;e++) {
      d[e] = a[e];
    }
    return d;
  }
  return[];
};
g.a.clone = g.a.bb;
g.a.extend = function(a, c) {
  for (var d = 1;d < arguments.length;d++) {
    var e = arguments[d];
    if (g.S(e)) {
      var f = a.length || 0, h = e.length || 0;
      a.length = f + h;
      for (var l = 0;l < h;l++) {
        a[f + l] = e[l];
      }
    } else {
      a.push(e);
    }
  }
};
g.a.splice = function(a, c, d, e) {
  return g.a.D.splice.apply(a, g.a.slice(arguments, 1));
};
g.a.slice = function(a, c, d) {
  return 2 >= arguments.length ? g.a.D.slice.call(a, c) : g.a.D.slice.call(a, c, d);
};
g.a.Xj = function(a, c, d) {
  c = c || a;
  d = d || function() {
    return g.isObject(l) ? "o" + g.gf(l) : (typeof l).charAt(0) + l;
  };
  for (var e = {}, f = 0, h = 0;h < a.length;) {
    var l = a[h++], m = d(l);
    Object.prototype.hasOwnProperty.call(e, m) || (e[m] = !0, c[f++] = l);
  }
  c.length = f;
};
g.a.Uf = function(a, c, d) {
  return g.a.Vf(a, d || g.a.fb, !1, c);
};
g.a.Gt = function(a, c, d) {
  return g.a.Vf(a, c, !0, void 0, d);
};
g.a.Vf = function(a, c, d, e, f) {
  for (var h = 0, l = a.length, m;h < l;) {
    var n = h + l >> 1, p;
    p = d ? c.call(f, a[n], n, a) : c(e, a[n]);
    0 < p ? h = n + 1 : (l = n, m = !p);
  }
  return m ? h : ~h;
};
g.a.sort = function(a, c) {
  a.sort(c || g.a.fb);
};
g.a.Ow = function(a, c) {
  for (var d = 0;d < a.length;d++) {
    a[d] = {index:d, value:a[d]};
  }
  var e = c || g.a.fb;
  g.a.sort(a, function(a, c) {
    return e(a.value, c.value) || a.index - c.index;
  });
  for (d = 0;d < a.length;d++) {
    a[d] = a[d].value;
  }
};
g.a.Yj = function(a, c, d) {
  var e = d || g.a.fb;
  g.a.sort(a, function(a, d) {
    return e(c(a), c(d));
  });
};
g.a.Mw = function(a, c, d) {
  g.a.Yj(a, function(a) {
    return a[c];
  }, d);
};
g.a.qf = function(a, c, d) {
  c = c || g.a.fb;
  for (var e = 1;e < a.length;e++) {
    var f = c(a[e - 1], a[e]);
    if (0 < f || 0 == f && d) {
      return!1;
    }
  }
  return!0;
};
g.a.equals = function(a, c, d) {
  if (!g.S(a) || !g.S(c) || a.length != c.length) {
    return!1;
  }
  var e = a.length;
  d = d || g.a.pf;
  for (var f = 0;f < e;f++) {
    if (!d(a[f], c[f])) {
      return!1;
    }
  }
  return!0;
};
g.a.$t = function(a, c, d) {
  d = d || g.a.fb;
  for (var e = Math.min(a.length, c.length), f = 0;f < e;f++) {
    var h = d(a[f], c[f]);
    if (0 != h) {
      return h;
    }
  }
  return g.a.fb(a.length, c.length);
};
g.a.fb = function(a, c) {
  return a > c ? 1 : a < c ? -1 : 0;
};
g.a.jv = function(a, c) {
  return-g.a.fb(a, c);
};
g.a.pf = function(a, c) {
  return a === c;
};
g.a.Et = function(a, c, d) {
  d = g.a.Uf(a, c, d);
  return 0 > d ? (g.a.$f(a, c, -(d + 1)), !0) : !1;
};
g.a.Ft = function(a, c, d) {
  c = g.a.Uf(a, c, d);
  return 0 <= c ? g.a.bc(a, c) : !1;
};
g.a.Ht = function(a, c, d) {
  for (var e = {}, f = 0;f < a.length;f++) {
    var h = a[f], l = c.call(d, h, f, a);
    g.la(l) && (e[l] || (e[l] = [])).push(h);
  }
  return e;
};
g.a.Tp = function(a, c, d) {
  var e = {};
  g.a.forEach(a, function(f, h) {
    e[c.call(d, f, h, a)] = f;
  });
  return e;
};
g.a.zc = function(a, c, d) {
  var e = [], f = 0, h = a;
  d = d || 1;
  void 0 !== c && (f = a, h = c);
  if (0 > d * (h - f)) {
    return[];
  }
  if (0 < d) {
    for (a = f;a < h;a += d) {
      e.push(a);
    }
  } else {
    for (a = f;a > h;a += d) {
      e.push(a);
    }
  }
  return e;
};
g.a.repeat = function(a, c) {
  for (var d = [], e = 0;e < c;e++) {
    d[e] = a;
  }
  return d;
};
g.a.Wj = function(a) {
  for (var c = [], d = 0;d < arguments.length;d++) {
    var e = arguments[d];
    if (g.isArray(e)) {
      for (var f = 0;f < e.length;f += 8192) {
        for (var h = g.a.slice(e, f, f + 8192), h = g.a.Wj.apply(null, h), l = 0;l < h.length;l++) {
          c.push(h[l]);
        }
      }
    } else {
      c.push(e);
    }
  }
  return c;
};
g.a.rotate = function(a, c) {
  a.length && (c %= a.length, 0 < c ? g.a.D.unshift.apply(a, a.splice(-c, c)) : 0 > c && g.a.D.push.apply(a, a.splice(0, -c)));
  return a;
};
g.a.dw = function(a, c, d) {
  c = g.a.D.splice.call(a, c, 1);
  g.a.D.splice.call(a, d, 0, c[0]);
};
g.a.zg = function(a) {
  if (!arguments.length) {
    return[];
  }
  for (var c = [], d = 0;;d++) {
    for (var e = [], f = 0;f < arguments.length;f++) {
      var h = arguments[f];
      if (d >= h.length) {
        return c;
      }
      e.push(h[d]);
    }
    c.push(e);
  }
};
g.a.Kw = function(a, c) {
  for (var d = c || Math.random, e = a.length - 1;0 < e;e--) {
    var f = Math.floor(d() * (e + 1)), h = a[e];
    a[e] = a[f];
    a[f] = h;
  }
};
g.a.du = function(a, c) {
  var d = [];
  g.a.forEach(c, function(c) {
    d.push(a[c]);
  });
  return d;
};
g.object = {};
g.object.forEach = function(a, c, d) {
  for (var e in a) {
    c.call(d, a[e], e, a);
  }
};
g.object.filter = function(a, c, d) {
  var e = {}, f;
  for (f in a) {
    c.call(d, a[f], f, a) && (e[f] = a[f]);
  }
  return e;
};
g.object.map = function(a, c, d) {
  var e = {}, f;
  for (f in a) {
    e[f] = c.call(d, a[f], f, a);
  }
  return e;
};
g.object.some = function(a, c, d) {
  for (var e in a) {
    if (c.call(d, a[e], e, a)) {
      return!0;
    }
  }
  return!1;
};
g.object.every = function(a, c, d) {
  for (var e in a) {
    if (!c.call(d, a[e], e, a)) {
      return!1;
    }
  }
  return!0;
};
g.object.ua = function(a) {
  var c = 0, d;
  for (d in a) {
    c++;
  }
  return c;
};
g.object.Ku = function(a) {
  for (var c in a) {
    return c;
  }
};
g.object.Lu = function(a) {
  for (var c in a) {
    return a[c];
  }
};
g.object.contains = function(a, c) {
  return g.object.Fb(a, c);
};
g.object.T = function(a) {
  var c = [], d = 0, e;
  for (e in a) {
    c[d++] = a[e];
  }
  return c;
};
g.object.sa = function(a) {
  var c = [], d = 0, e;
  for (e in a) {
    c[d++] = e;
  }
  return c;
};
g.object.Xu = function(a, c) {
  for (var d = g.S(c), e = d ? c : arguments, d = d ? 0 : 1;d < e.length && (a = a[e[d]], g.la(a));d++) {
  }
  return a;
};
g.object.Dd = function(a, c) {
  return c in a;
};
g.object.Fb = function(a, c) {
  for (var d in a) {
    if (a[d] == c) {
      return!0;
    }
  }
  return!1;
};
g.object.sp = function(a, c, d) {
  for (var e in a) {
    if (c.call(d, a[e], e, a)) {
      return e;
    }
  }
};
g.object.Fu = function(a, c, d) {
  return(c = g.object.sp(a, c, d)) && a[c];
};
g.object.ra = function(a) {
  for (var c in a) {
    return!1;
  }
  return!0;
};
g.object.clear = function(a) {
  for (var c in a) {
    delete a[c];
  }
};
g.object.remove = function(a, c) {
  var d;
  (d = c in a) && delete a[c];
  return d;
};
g.object.add = function(a, c, d) {
  if (c in a) {
    throw Error('The object already contains the key "' + c + '"');
  }
  g.object.set(a, c, d);
};
g.object.get = function(a, c, d) {
  return c in a ? a[c] : d;
};
g.object.set = function(a, c, d) {
  a[c] = d;
};
g.object.Fw = function(a, c, d) {
  return c in a ? a[c] : a[c] = d;
};
g.object.Jw = function(a, c, d) {
  if (c in a) {
    return a[c];
  }
  d = d();
  return a[c] = d;
};
g.object.equals = function(a, c) {
  for (var d in a) {
    if (!(d in c) || a[d] !== c[d]) {
      return!1;
    }
  }
  for (d in c) {
    if (!(d in a)) {
      return!1;
    }
  }
  return!0;
};
g.object.clone = function(a) {
  var c = {}, d;
  for (d in a) {
    c[d] = a[d];
  }
  return c;
};
g.object.Nn = function(a) {
  var c = g.na(a);
  if ("object" == c || "array" == c) {
    if (a.clone) {
      return a.clone();
    }
    var c = "array" == c ? [] : {}, d;
    for (d in a) {
      c[d] = g.object.Nn(a[d]);
    }
    return c;
  }
  return a;
};
g.object.Si = function(a) {
  var c = {}, d;
  for (d in a) {
    c[a[d]] = d;
  }
  return c;
};
g.object.Oi = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
g.object.extend = function(a, c) {
  for (var d, e, f = 1;f < arguments.length;f++) {
    e = arguments[f];
    for (d in e) {
      a[d] = e[d];
    }
    for (var h = 0;h < g.object.Oi.length;h++) {
      d = g.object.Oi[h], Object.prototype.hasOwnProperty.call(e, d) && (a[d] = e[d]);
    }
  }
};
g.object.create = function(a) {
  var c = arguments.length;
  if (1 == c && g.isArray(arguments[0])) {
    return g.object.create.apply(null, arguments[0]);
  }
  if (c % 2) {
    throw Error("Uneven number of arguments");
  }
  for (var d = {}, e = 0;e < c;e += 2) {
    d[arguments[e]] = arguments[e + 1];
  }
  return d;
};
g.object.Bd = function(a) {
  var c = arguments.length;
  if (1 == c && g.isArray(arguments[0])) {
    return g.object.Bd.apply(null, arguments[0]);
  }
  for (var d = {}, e = 0;e < c;e++) {
    d[arguments[e]] = !0;
  }
  return d;
};
g.object.hu = function(a) {
  var c = a;
  Object.isFrozen && !Object.isFrozen(a) && (c = Object.create(a), Object.freeze(c));
  return c;
};
g.object.yv = function(a) {
  return!!Object.isFrozen && Object.isFrozen(a);
};
g.nb.tags = {};
g.nb.tags.Wn = g.object.Bd("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));
g.nb.tags.Zi = function(a) {
  return!0 === g.nb.tags.Wn[a];
};
g.i18n = {};
g.i18n.c = {};
g.i18n.c.zo = !1;
g.i18n.c.Ni = g.i18n.c.zo || ("ar" == g.da.substring(0, 2).toLowerCase() || "fa" == g.da.substring(0, 2).toLowerCase() || "he" == g.da.substring(0, 2).toLowerCase() || "iw" == g.da.substring(0, 2).toLowerCase() || "ps" == g.da.substring(0, 2).toLowerCase() || "sd" == g.da.substring(0, 2).toLowerCase() || "ug" == g.da.substring(0, 2).toLowerCase() || "ur" == g.da.substring(0, 2).toLowerCase() || "yi" == g.da.substring(0, 2).toLowerCase()) && (2 == g.da.length || "-" == g.da.substring(2, 3) || "_" == 
g.da.substring(2, 3)) || 3 <= g.da.length && "ckb" == g.da.substring(0, 3).toLowerCase() && (3 == g.da.length || "-" == g.da.substring(3, 4) || "_" == g.da.substring(3, 4));
g.i18n.c.Ib = {wk:"\u202a", xk:"\u202b", kg:"\u202c", sk:"\u200e", tk:"\u200f"};
g.i18n.c.Q = {Gb:1, Db:-1, $a:0};
g.i18n.c.Gc = "right";
g.i18n.c.Fc = "left";
g.i18n.c.Uq = g.i18n.c.Ni ? g.i18n.c.Fc : g.i18n.c.Gc;
g.i18n.c.Tq = g.i18n.c.Ni ? g.i18n.c.Gc : g.i18n.c.Fc;
g.i18n.c.Sj = function(a, c) {
  return "number" == typeof a ? 0 < a ? g.i18n.c.Q.Gb : 0 > a ? g.i18n.c.Q.Db : c ? null : g.i18n.c.Q.$a : null == a ? null : a ? g.i18n.c.Q.Db : g.i18n.c.Q.Gb;
};
g.i18n.c.Tb = "A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff";
g.i18n.c.Ub = "\u0591-\u07ff\u200f\ufb1d-\ufdff\ufe70-\ufefc";
g.i18n.c.Jk = /<[^>]*>|&[^;]+;/g;
g.i18n.c.cb = function(a, c) {
  return c ? a.replace(g.i18n.c.Jk, "") : a;
};
g.i18n.c.Bk = new RegExp("[" + g.i18n.c.Ub + "]");
g.i18n.c.yk = new RegExp("[" + g.i18n.c.Tb + "]");
g.i18n.c.Jc = function(a, c) {
  return g.i18n.c.Bk.test(g.i18n.c.cb(a, c));
};
g.i18n.c.cv = g.i18n.c.Jc;
g.i18n.c.yf = function(a, c) {
  return g.i18n.c.yk.test(g.i18n.c.cb(a, c));
};
g.i18n.c.Kk = new RegExp("^[" + g.i18n.c.Tb + "]");
g.i18n.c.Mk = new RegExp("^[" + g.i18n.c.Ub + "]");
g.i18n.c.Hk = function(a) {
  return g.i18n.c.Mk.test(a);
};
g.i18n.c.Gk = function(a) {
  return g.i18n.c.Kk.test(a);
};
g.i18n.c.Fv = function(a) {
  return!g.i18n.c.Gk(a) && !g.i18n.c.Hk(a);
};
g.i18n.c.zk = new RegExp("^[^" + g.i18n.c.Ub + "]*[" + g.i18n.c.Tb + "]");
g.i18n.c.Ck = new RegExp("^[^" + g.i18n.c.Tb + "]*[" + g.i18n.c.Ub + "]");
g.i18n.c.Ff = function(a, c) {
  return g.i18n.c.Ck.test(g.i18n.c.cb(a, c));
};
g.i18n.c.Lv = g.i18n.c.Ff;
g.i18n.c.Rp = function(a, c) {
  return g.i18n.c.zk.test(g.i18n.c.cb(a, c));
};
g.i18n.c.Dv = g.i18n.c.Rp;
g.i18n.c.zf = /^http:\/\/.*/;
g.i18n.c.Gv = function(a, c) {
  a = g.i18n.c.cb(a, c);
  return g.i18n.c.zf.test(a) || !g.i18n.c.yf(a) && !g.i18n.c.Jc(a);
};
g.i18n.c.Ak = new RegExp("[" + g.i18n.c.Tb + "][^" + g.i18n.c.Ub + "]*$");
g.i18n.c.Dk = new RegExp("[" + g.i18n.c.Ub + "][^" + g.i18n.c.Tb + "]*$");
g.i18n.c.op = function(a, c) {
  return g.i18n.c.Ak.test(g.i18n.c.cb(a, c));
};
g.i18n.c.Cv = g.i18n.c.op;
g.i18n.c.pp = function(a, c) {
  return g.i18n.c.Dk.test(g.i18n.c.cb(a, c));
};
g.i18n.c.Jv = g.i18n.c.pp;
g.i18n.c.Lk = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
g.i18n.c.Kv = function(a) {
  return g.i18n.c.Lk.test(a);
};
g.i18n.c.lg = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(&lt;.*?(&gt;)+)/g;
g.i18n.c.uk = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;
g.i18n.c.$u = function(a, c) {
  return(void 0 === c ? g.i18n.c.Jc(a) : c) ? a.replace(g.i18n.c.lg, "<span dir=rtl>$&</span>") : a.replace(g.i18n.c.lg, "<span dir=ltr>$&</span>");
};
g.i18n.c.av = function(a, c) {
  var d = (void 0 === c ? g.i18n.c.Jc(a) : c) ? g.i18n.c.Ib.tk : g.i18n.c.Ib.sk;
  return a.replace(g.i18n.c.uk, d + "$&" + d);
};
g.i18n.c.wu = function(a) {
  return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=rtl") : "\n<span dir=rtl>" + a + "</span>";
};
g.i18n.c.xu = function(a) {
  return g.i18n.c.Ib.xk + a + g.i18n.c.Ib.kg;
};
g.i18n.c.uu = function(a) {
  return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=ltr") : "\n<span dir=ltr>" + a + "</span>";
};
g.i18n.c.vu = function(a) {
  return g.i18n.c.Ib.wk + a + g.i18n.c.Ib.kg;
};
g.i18n.c.ok = /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;
g.i18n.c.pk = /left/gi;
g.i18n.c.qk = /right/gi;
g.i18n.c.rk = /%%%%/g;
g.i18n.c.bw = function(a) {
  return a.replace(g.i18n.c.ok, ":$1 $4 $3 $2").replace(g.i18n.c.pk, "%%%%").replace(g.i18n.c.qk, g.i18n.c.Fc).replace(g.i18n.c.rk, g.i18n.c.Gc);
};
g.i18n.c.Fk = /([\u0591-\u05f2])"/g;
g.i18n.c.Ik = /([\u0591-\u05f2])'/g;
g.i18n.c.fw = function(a) {
  return a.replace(g.i18n.c.Fk, "$1\u05f4").replace(g.i18n.c.Ik, "$1\u05f3");
};
g.i18n.c.sj = /\s+/;
g.i18n.c.qj = /\d/;
g.i18n.c.rj = .4;
g.i18n.c.gk = function(a, c) {
  for (var d = 0, e = 0, f = !1, h = g.i18n.c.cb(a, c).split(g.i18n.c.sj), l = 0;l < h.length;l++) {
    var m = h[l];
    g.i18n.c.Ff(m) ? (d++, e++) : g.i18n.c.zf.test(m) ? f = !0 : g.i18n.c.yf(m) ? e++ : g.i18n.c.qj.test(m) && (f = !0);
  }
  return 0 == e ? f ? g.i18n.c.Q.Gb : g.i18n.c.Q.$a : d / e > g.i18n.c.rj ? g.i18n.c.Q.Db : g.i18n.c.Q.Gb;
};
g.i18n.c.pu = function(a, c) {
  return g.i18n.c.gk(a, c) == g.i18n.c.Q.Db;
};
g.i18n.c.Cw = function(a, c) {
  a && (c = g.i18n.c.Sj(c)) && (a.style.textAlign = c == g.i18n.c.Q.Db ? g.i18n.c.Gc : g.i18n.c.Fc, a.dir = c == g.i18n.c.Q.Db ? "rtl" : "ltr");
};
g.i18n.c.Gq = function() {
};
g.b.ct = function() {
};
g.b.I = function() {
  this.Bc = "";
  this.kj = g.b.I.uf;
};
g.b.I.prototype.Ta = !0;
g.b.I.prototype.Sa = function() {
  return this.Bc;
};
g.b.I.prototype.toString = function() {
  return "Const{" + this.Bc + "}";
};
g.b.I.H = function(a) {
  if (a instanceof g.b.I && a.constructor === g.b.I && a.kj === g.b.I.uf) {
    return a.Bc;
  }
  g.l.za("expected object of type Const, got '" + a + "'");
  return "type_error:Const";
};
g.b.I.Hd = function(a) {
  return g.b.I.yj(a);
};
g.b.I.uf = {};
g.b.I.yj = function(a) {
  var c = new g.b.I;
  c.Bc = a;
  return c;
};
g.html = {};
g.html.A = function() {
  this.$c = "";
  this.Uk = g.html.A.ba;
};
g.html.A.prototype.Ta = !0;
g.html.A.ba = {};
g.html.A.Zb = function(a) {
  a = g.b.I.H(a);
  return 0 === a.length ? g.html.A.EMPTY : g.html.A.Vb(a);
};
g.html.A.Ut = function() {
};
g.html.A.prototype.Sa = function() {
  return this.$c;
};
g.ha && (g.html.A.prototype.toString = function() {
  return "SafeStyle{" + this.$c + "}";
});
g.html.A.H = function(a) {
  if (a instanceof g.html.A && a.constructor === g.html.A && a.Uk === g.html.A.ba) {
    return a.$c;
  }
  g.l.za("expected object of type SafeStyle, got '" + a + "'");
  return "type_error:SafeStyle";
};
g.html.A.Vb = function(a) {
  var c = new g.html.A;
  c.$c = a;
  return c;
};
g.html.A.EMPTY = g.html.A.Vb("");
g.html.A.yc = "zClosurez";
g.html.A.create = function(a) {
  var c = "", d;
  for (d in a) {
    if (!/^[-_a-zA-Z0-9]+$/.test(d)) {
      throw Error("Name allows only [-_a-zA-Z0-9], got: " + d);
    }
    var e = a[d];
    null != e && (e instanceof g.b.I ? e = g.b.I.H(e) : g.html.A.Xi.test(e) || (g.l.za("String value allows only [-.%_!# a-zA-Z0-9], got: " + e), e = g.html.A.yc), c += d + ":" + e + ";");
  }
  return c ? g.html.A.Vb(c) : g.html.A.EMPTY;
};
g.html.A.Xi = /^[-.%_!# a-zA-Z0-9]+$/;
g.html.A.concat = function(a) {
  var c = "", d = function(a) {
    g.isArray(a) ? g.a.forEach(a, d) : c += g.html.A.H(a);
  };
  g.a.forEach(arguments, d);
  return c ? g.html.A.Vb(c) : g.html.A.EMPTY;
};
g.html.N = function() {
  this.bd = "";
  this.ce = g.html.N.ba;
};
g.html.N.prototype.Ta = !0;
g.html.N.ba = {};
g.html.N.concat = function(a) {
  var c = "", d = function(a) {
    g.isArray(a) ? g.a.forEach(a, d) : c += g.html.N.H(a);
  };
  g.a.forEach(arguments, d);
  return g.html.N.xc(c);
};
g.html.N.Zb = function(a) {
  a = g.b.I.H(a);
  return 0 === a.length ? g.html.N.EMPTY : g.html.N.xc(a);
};
g.html.N.prototype.Sa = function() {
  return this.bd;
};
g.ha && (g.html.N.prototype.toString = function() {
  return "SafeStyleSheet{" + this.bd + "}";
});
g.html.N.H = function(a) {
  if (a instanceof g.html.N && a.constructor === g.html.N && a.ce === g.html.N.ba) {
    return a.bd;
  }
  g.l.za("expected object of type SafeStyleSheet, got '" + a + "'");
  return "type_error:SafeStyleSheet";
};
g.html.N.xc = function(a) {
  var c = new g.html.N;
  c.bd = a;
  return c;
};
g.html.N.EMPTY = g.html.N.xc("");
g.html.v = function() {
  this.Ua = "";
  this.Rk = g.html.v.ba;
};
g.html.v.yc = "about:invalid#zClosurez";
g.html.v.prototype.Ta = !0;
g.html.v.prototype.Sa = function() {
  return this.Ua;
};
g.html.v.prototype.Kd = !0;
g.html.v.prototype.mb = function() {
  return g.i18n.c.Q.Gb;
};
g.ha && (g.html.v.prototype.toString = function() {
  return "SafeUrl{" + this.Ua + "}";
});
g.html.v.H = function(a) {
  if (a instanceof g.html.v && a.constructor === g.html.v && a.Rk === g.html.v.ba) {
    return a.Ua;
  }
  g.l.za("expected object of type SafeUrl, got '" + a + "'");
  return "type_error:SafeUrl";
};
g.html.v.Zb = function(a) {
  return g.html.v.Jd(g.b.I.H(a));
};
g.html.rm = /^(?:(?:https?|mailto):|[^&:/?#]*(?:[/?#]|$))/i;
g.html.v.Gd = function(a) {
  if (a instanceof g.html.v) {
    return a;
  }
  a = a.Ta ? a.Sa() : String(a);
  a = g.html.rm.test(a) ? g.html.v.sm(a) : g.html.v.yc;
  return g.html.v.Jd(a);
};
g.html.v.sm = function(a) {
  try {
    var c = encodeURI(a);
  } catch (d) {
    return g.html.v.yc;
  }
  return c.replace(g.html.v.Gm, function(a) {
    return g.html.v.Hm[a];
  });
};
g.html.v.Gm = /[()']|%5B|%5D|%25/g;
g.html.v.Hm = {"'":"%27", "(":"%28", ")":"%29", "%5B":"[", "%5D":"]", "%25":"%"};
g.html.v.ba = {};
g.html.v.Jd = function(a) {
  var c = new g.html.v;
  c.Ua = a;
  return c;
};
g.html.W = function() {
  this.ed = "";
  this.cl = g.html.W.ba;
};
g.html.W.prototype.Ta = !0;
g.html.W.prototype.Sa = function() {
  return this.ed;
};
g.html.W.prototype.Kd = !0;
g.html.W.prototype.mb = function() {
  return g.i18n.c.Q.Gb;
};
g.ha && (g.html.W.prototype.toString = function() {
  return "TrustedResourceUrl{" + this.ed + "}";
});
g.html.W.H = function(a) {
  if (a instanceof g.html.W && a.constructor === g.html.W && a.cl === g.html.W.ba) {
    return a.ed;
  }
  g.l.za("expected object of type TrustedResourceUrl, got '" + a + "'");
  return "type_error:TrustedResourceUrl";
};
g.html.W.Zb = function(a) {
  return g.html.W.vf(g.b.I.H(a));
};
g.html.W.ba = {};
g.html.W.vf = function(a) {
  var c = new g.html.W;
  c.ed = a;
  return c;
};
g.html.h = function() {
  this.Ua = "";
  this.nk = g.html.h.ba;
  this.Ac = null;
};
g.html.h.prototype.Kd = !0;
g.html.h.prototype.mb = function() {
  return this.Ac;
};
g.html.h.prototype.Ta = !0;
g.html.h.prototype.Sa = function() {
  return this.Ua;
};
g.ha && (g.html.h.prototype.toString = function() {
  return "SafeHtml{" + this.Ua + "}";
});
g.html.h.H = function(a) {
  if (a instanceof g.html.h && a.constructor === g.html.h && a.nk === g.html.h.ba) {
    return a.Ua;
  }
  g.l.za("expected object of type SafeHtml, got '" + a + "'");
  return "type_error:SafeHtml";
};
g.html.h.Fa = function(a) {
  if (a instanceof g.html.h) {
    return a;
  }
  var c = null;
  a.Kd && (c = a.mb());
  return g.html.h.Za(g.b.Fa(a.Ta ? a.Sa() : String(a)), c);
};
g.html.h.gv = function(a) {
  if (a instanceof g.html.h) {
    return a;
  }
  a = g.html.h.Fa(a);
  return g.html.h.Za(g.b.rf(g.html.h.H(a)), a.mb());
};
g.html.h.se = function(a) {
  if (a instanceof g.html.h) {
    return a;
  }
  a = g.html.h.Fa(a);
  return g.html.h.Za(g.b.ej(g.html.h.H(a)), a.mb());
};
g.html.h.Hd = g.html.h.Fa;
g.html.h.of = /^[a-zA-Z0-9-]+$/;
g.html.h.Ui = g.object.Bd("action", "cite", "data", "formaction", "href", "manifest", "poster", "src");
g.html.h.gm = g.object.Bd("embed", "iframe", "link", "object", "script", "style", "template");
g.html.h.create = function(a, c, d) {
  if (!g.html.h.of.test(a)) {
    throw Error("Invalid tag name <" + a + ">.");
  }
  if (a.toLowerCase() in g.html.h.gm) {
    throw Error("Tag name <" + a + "> is not allowed for SafeHtml.");
  }
  return g.html.h.Ed(a, c, d);
};
g.html.h.gu = function(a, c, d, e) {
  var f = {};
  f.src = a || null;
  f.srcdoc = c || null;
  a = g.html.h.kf(f, {sandbox:""}, d);
  return g.html.h.Ed("iframe", a, e);
};
g.html.h.iu = function(a, c) {
  var d = g.html.h.kf({type:"text/css"}, {}, c), e = "";
  a = g.a.concat(a);
  for (var f = 0;f < a.length;f++) {
    e += g.html.N.H(a[f]);
  }
  e = g.html.h.Za(e, g.i18n.c.Q.$a);
  return g.html.h.Ed("style", d, e);
};
g.html.h.Yi = function(a, c, d) {
  if (d instanceof g.b.I) {
    d = g.b.I.H(d);
  } else {
    if ("style" == c.toLowerCase()) {
      d = g.html.h.Vi(d);
    } else {
      if (/^on/i.test(c)) {
        throw Error('Attribute "' + c + '" requires goog.string.Const value, "' + d + '" given.');
      }
      if (c.toLowerCase() in g.html.h.Ui) {
        if (d instanceof g.html.W) {
          d = g.html.W.H(d);
        } else {
          if (d instanceof g.html.v) {
            d = g.html.v.H(d);
          } else {
            throw Error('Attribute "' + c + '" on tag "' + a + '" requires goog.html.SafeUrl or goog.string.Const value, "' + d + '" given.');
          }
        }
      }
    }
  }
  d.Ta && (d = d.Sa());
  return c + '="' + g.b.Fa(String(d)) + '"';
};
g.html.h.Vi = function(a) {
  if (!g.isObject(a)) {
    throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof a + " given: " + a);
  }
  a instanceof g.html.A || (a = g.html.A.create(a));
  return g.html.A.H(a);
};
g.html.h.ku = function(a, c, d, e) {
  c = g.html.h.create(c, d, e);
  c.Ac = a;
  return c;
};
g.html.h.concat = function(a) {
  var c = g.i18n.c.Q.$a, d = "", e = function(a) {
    g.isArray(a) ? g.a.forEach(a, e) : (a = g.html.h.Fa(a), d += g.html.h.H(a), a = a.mb(), c == g.i18n.c.Q.$a ? c = a : a != g.i18n.c.Q.$a && c != a && (c = null));
  };
  g.a.forEach(arguments, e);
  return g.html.h.Za(d, c);
};
g.html.h.cu = function(a, c) {
  var d = g.html.h.concat(g.a.slice(arguments, 1));
  d.Ac = a;
  return d;
};
g.html.h.ba = {};
g.html.h.Za = function(a, c) {
  var d = new g.html.h;
  d.Ua = a;
  d.Ac = c;
  return d;
};
g.html.h.Ed = function(a, c, d) {
  var e = null, f = "<" + a;
  if (c) {
    for (var h in c) {
      if (!g.html.h.of.test(h)) {
        throw Error('Invalid attribute name "' + h + '".');
      }
      var l = c[h];
      g.R(l) && (f += " " + g.html.h.Yi(a, h, l));
    }
  }
  g.la(d) ? g.isArray(d) || (d = [d]) : d = [];
  g.nb.tags.Zi(a.toLowerCase()) ? f += ">" : (e = g.html.h.concat(d), f += ">" + g.html.h.H(e) + "</" + a + ">", e = e.mb());
  (a = c && c.dir) && (e = /^(ltr|rtl|auto)$/i.test(a) ? g.i18n.c.Q.$a : null);
  return g.html.h.Za(f, e);
};
g.html.h.kf = function(a, c, d) {
  var e = {}, f;
  for (f in a) {
    e[f] = a[f];
  }
  for (f in c) {
    e[f] = c[f];
  }
  for (f in d) {
    var h = f.toLowerCase();
    if (h in a) {
      throw Error('Cannot override "' + h + '" attribute, got "' + f + '" with value "' + d[f] + '"');
    }
    h in c && delete e[h];
    e[f] = d[f];
  }
  return e;
};
g.html.h.EMPTY = g.html.h.Za("", g.i18n.c.Q.$a);
g.html.ca = function() {
  this.dd = "";
  this.ce = g.html.ca.ba;
};
g.html.ca.prototype.Ta = !0;
g.html.ca.ba = {};
g.html.ca.Zb = function(a) {
  a = g.b.I.H(a);
  return 0 === a.length ? g.html.ca.EMPTY : g.html.ca.Md(a);
};
g.html.ca.prototype.Sa = function() {
  return this.dd;
};
g.ha && (g.html.ca.prototype.toString = function() {
  return "SafeScript{" + this.dd + "}";
});
g.html.ca.H = function(a) {
  if (a instanceof g.html.ca && a.constructor === g.html.ca && a.ce === g.html.ca.ba) {
    return a.dd;
  }
  g.l.za("expected object of type SafeScript, got '" + a + "'");
  return "type_error:SafeScript";
};
g.html.ca.Md = function(a) {
  var c = new g.html.ca;
  c.dd = a;
  return c;
};
g.html.ca.EMPTY = g.html.ca.Md("");
g.html.pb = {};
g.html.pb.xw = function(a, c, d) {
  return g.html.h.Za(c, d || null);
};
g.html.pb.yw = function(a, c) {
  return g.html.ca.Md(c);
};
g.html.pb.zw = function(a, c) {
  return g.html.A.Vb(c);
};
g.html.pb.Aw = function(a, c) {
  return g.html.N.xc(c);
};
g.html.pb.dj = function(a, c) {
  return g.html.v.Jd(c);
};
g.html.pb.cx = function(a, c) {
  return g.html.W.vf(c);
};
g.g = {};
g.g.yq = function() {
};
g.G = {};
g.G.constant = function(a) {
  return function() {
    return a;
  };
};
g.G.Nq = g.G.constant(!1);
g.G.at = g.G.constant(!0);
g.G.ys = g.G.constant(null);
g.G.identity = function(a) {
  return a;
};
g.G.error = function(a) {
  return function() {
    throw Error(a);
  };
};
g.G.za = function(a) {
  return function() {
    throw a;
  };
};
g.G.Wv = function(a, c) {
  c = c || 0;
  return function() {
    return a.apply(this, Array.prototype.slice.call(arguments, 0, c));
  };
};
g.G.jw = function(a) {
  return function() {
    return arguments[a];
  };
};
g.G.mx = function(a, c) {
  return g.G.fn(a, g.G.constant(c));
};
g.G.zu = function(a, c) {
  return function(d) {
    return c ? a == d : a === d;
  };
};
g.G.au = function(a, c) {
  var d = arguments, e = d.length;
  return function() {
    var a;
    e && (a = d[e - 1].apply(this, arguments));
    for (var c = e - 2;0 <= c;c--) {
      a = d[c].call(this, a);
    }
    return a;
  };
};
g.G.fn = function(a) {
  var c = arguments, d = c.length;
  return function() {
    for (var a, f = 0;f < d;f++) {
      a = c[f].apply(this, arguments);
    }
    return a;
  };
};
g.G.rt = function(a) {
  var c = arguments, d = c.length;
  return function() {
    for (var a = 0;a < d;a++) {
      if (!c[a].apply(this, arguments)) {
        return!1;
      }
    }
    return!0;
  };
};
g.G.mw = function(a) {
  var c = arguments, d = c.length;
  return function() {
    for (var a = 0;a < d;a++) {
      if (c[a].apply(this, arguments)) {
        return!0;
      }
    }
    return!1;
  };
};
g.G.Ek = function(a) {
  return function() {
    return!a.apply(this, arguments);
  };
};
g.G.create = function(a, c) {
  var d = function() {
  };
  d.prototype = a.prototype;
  d = new d;
  a.apply(d, Array.prototype.slice.call(arguments, 1));
  return d;
};
g.G.dn = !0;
g.G.Kt = function(a) {
  var c = !1, d;
  return function() {
    if (!g.G.dn) {
      return a();
    }
    c || (d = a(), c = !0);
    return d;
  };
};
g.r = {};
g.r.qw = function(a) {
  return Math.floor(Math.random() * a);
};
g.r.ex = function(a, c) {
  return a + Math.random() * (c - a);
};
g.r.Vt = function(a, c, d) {
  return Math.min(Math.max(a, c), d);
};
g.r.Fh = function(a, c) {
  var d = a % c;
  return 0 > d * c ? d + c : d;
};
g.r.Uv = function(a, c, d) {
  return a + d * (c - a);
};
g.r.ew = function(a, c, d) {
  return Math.abs(a - c) <= (d || 1E-6);
};
g.r.Fe = function(a) {
  return g.r.Fh(a, 360);
};
g.r.Pw = function(a) {
  return g.r.Fh(a, 2 * Math.PI);
};
g.r.Hh = function(a) {
  return a * Math.PI / 180;
};
g.r.Jm = function(a) {
  return 180 * a / Math.PI;
};
g.r.ut = function(a, c) {
  return c * Math.cos(g.r.Hh(a));
};
g.r.vt = function(a, c) {
  return c * Math.sin(g.r.Hh(a));
};
g.r.st = function(a, c, d, e) {
  return g.r.Fe(g.r.Jm(Math.atan2(e - c, d - a)));
};
g.r.tt = function(a, c) {
  var d = g.r.Fe(c) - g.r.Fe(a);
  180 < d ? d -= 360 : -180 >= d && (d = 360 + d);
  return d;
};
g.r.sign = function(a) {
  return 0 == a ? 0 : 0 > a ? -1 : 1;
};
g.r.Zv = function(a, c, d, e) {
  d = d || function(a, c) {
    return a == c;
  };
  e = e || function(c) {
    return a[c];
  };
  for (var f = a.length, h = c.length, l = [], m = 0;m < f + 1;m++) {
    l[m] = [], l[m][0] = 0;
  }
  for (var n = 0;n < h + 1;n++) {
    l[0][n] = 0;
  }
  for (m = 1;m <= f;m++) {
    for (n = 1;n <= h;n++) {
      d(a[m - 1], c[n - 1]) ? l[m][n] = l[m - 1][n - 1] + 1 : l[m][n] = Math.max(l[m - 1][n], l[m][n - 1]);
    }
  }
  for (var p = [], m = f, n = h;0 < m && 0 < n;) {
    d(a[m - 1], c[n - 1]) ? (p.unshift(e(m - 1, n - 1)), m--, n--) : l[m - 1][n] > l[m][n - 1] ? m-- : n--;
  }
  return p;
};
g.r.Af = function(a) {
  return g.a.reduce(arguments, function(a, d) {
    return a + d;
  }, 0);
};
g.r.nj = function(a) {
  return g.r.Af.apply(null, arguments) / arguments.length;
};
g.r.Sm = function(a) {
  var c = arguments.length;
  if (2 > c) {
    return 0;
  }
  var d = g.r.nj.apply(null, arguments);
  return g.r.Af.apply(null, g.a.map(arguments, function(a) {
    return Math.pow(a - d, 2);
  })) / (c - 1);
};
g.r.Qw = function(a) {
  return Math.sqrt(g.r.Sm.apply(null, arguments));
};
g.r.zv = function(a) {
  return isFinite(a) && 0 == a % 1;
};
g.r.vv = function(a) {
  return isFinite(a) && !isNaN(a);
};
g.r.Xv = function(a) {
  if (0 < a) {
    var c = Math.round(Math.log(a) * Math.LOG10E);
    return c - (parseFloat("1e" + c) > a);
  }
  return 0 == a ? -Infinity : NaN;
};
g.r.ww = function(a, c) {
  return Math.floor(a + (c || 2E-15));
};
g.r.vw = function(a, c) {
  return Math.ceil(a - (c || 2E-15));
};
g.e = {};
g.e.$ = "StopIteration" in g.global ? g.global.StopIteration : Error("StopIteration");
g.e.Iterator = function() {
};
g.e.Iterator.prototype.next = function() {
  throw g.e.$;
};
g.e.Iterator.prototype.Hb = function() {
  return this;
};
g.e.L = function(a) {
  if (a instanceof g.e.Iterator) {
    return a;
  }
  if ("function" == typeof a.Hb) {
    return a.Hb(!1);
  }
  if (g.S(a)) {
    var c = 0, d = new g.e.Iterator;
    d.next = function() {
      for (;;) {
        if (c >= a.length) {
          throw g.e.$;
        }
        if (c in a) {
          return a[c++];
        }
        c++;
      }
    };
    return d;
  }
  throw Error("Not implemented");
};
g.e.forEach = function(a, c, d) {
  if (g.S(a)) {
    try {
      g.a.forEach(a, c, d);
    } catch (e) {
      if (e !== g.e.$) {
        throw e;
      }
    }
  } else {
    a = g.e.L(a);
    try {
      for (;;) {
        c.call(d, a.next(), void 0, a);
      }
    } catch (f) {
      if (f !== g.e.$) {
        throw f;
      }
    }
  }
};
g.e.filter = function(a, c, d) {
  var e = g.e.L(a);
  a = new g.e.Iterator;
  a.next = function() {
    for (;;) {
      var a = e.next();
      if (c.call(d, a, void 0, e)) {
        return a;
      }
    }
  };
  return a;
};
g.e.Du = function(a, c, d) {
  return g.e.filter(a, g.G.Ek(c), d);
};
g.e.zc = function(a, c, d) {
  var e = 0, f = a, h = d || 1;
  1 < arguments.length && (e = a, f = c);
  if (0 == h) {
    throw Error("Range step argument must not be zero");
  }
  var l = new g.e.Iterator;
  l.next = function() {
    if (0 < h && e >= f || 0 > h && e <= f) {
      throw g.e.$;
    }
    var a = e;
    e += h;
    return a;
  };
  return l;
};
g.e.join = function(a, c) {
  return g.e.bb(a).join(c);
};
g.e.map = function(a, c, d) {
  var e = g.e.L(a);
  a = new g.e.Iterator;
  a.next = function() {
    var a = e.next();
    return c.call(d, a, void 0, e);
  };
  return a;
};
g.e.reduce = function(a, c, d, e) {
  var f = d;
  g.e.forEach(a, function(a) {
    f = c.call(e, f, a);
  });
  return f;
};
g.e.some = function(a, c, d) {
  a = g.e.L(a);
  try {
    for (;;) {
      if (c.call(d, a.next(), void 0, a)) {
        return!0;
      }
    }
  } catch (e) {
    if (e !== g.e.$) {
      throw e;
    }
  }
  return!1;
};
g.e.every = function(a, c, d) {
  a = g.e.L(a);
  try {
    for (;;) {
      if (!c.call(d, a.next(), void 0, a)) {
        return!1;
      }
    }
  } catch (e) {
    if (e !== g.e.$) {
      throw e;
    }
  }
  return!0;
};
g.e.Rt = function(a) {
  return g.e.Wk(arguments);
};
g.e.Wk = function(a) {
  var c = g.e.L(a);
  a = new g.e.Iterator;
  var d = null;
  a.next = function() {
    for (;;) {
      if (null == d) {
        var a = c.next();
        d = g.e.L(a);
      }
      try {
        return d.next();
      } catch (f) {
        if (f !== g.e.$) {
          throw f;
        }
        d = null;
      }
    }
  };
  return a;
};
g.e.qu = function(a, c, d) {
  var e = g.e.L(a);
  a = new g.e.Iterator;
  var f = !0;
  a.next = function() {
    for (;;) {
      var a = e.next();
      if (!f || !c.call(d, a, void 0, e)) {
        return f = !1, a;
      }
    }
  };
  return a;
};
g.e.Ww = function(a, c, d) {
  var e = g.e.L(a);
  a = new g.e.Iterator;
  a.next = function() {
    var a = e.next();
    if (c.call(d, a, void 0, e)) {
      return a;
    }
    throw g.e.$;
  };
  return a;
};
g.e.bb = function(a) {
  if (g.S(a)) {
    return g.a.bb(a);
  }
  a = g.e.L(a);
  var c = [];
  g.e.forEach(a, function(a) {
    c.push(a);
  });
  return c;
};
g.e.equals = function(a, c, d) {
  a = g.e.bj({}, a, c);
  var e = d || g.a.pf;
  return g.e.every(a, function(a) {
    return e(a[0], a[1]);
  });
};
g.e.Nk = function(a, c) {
  try {
    return g.e.L(a).next();
  } catch (d) {
    if (d != g.e.$) {
      throw d;
    }
    return c;
  }
};
g.e.product = function(a) {
  if (g.a.some(arguments, function(a) {
    return!a.length;
  }) || !arguments.length) {
    return new g.e.Iterator;
  }
  var c = new g.e.Iterator, d = arguments, e = g.a.repeat(0, d.length);
  c.next = function() {
    if (e) {
      for (var a = g.a.map(e, function(a, c) {
        return d[c][a];
      }), c = e.length - 1;0 <= c;c--) {
        if (e[c] < d[c].length - 1) {
          e[c]++;
          break;
        }
        if (0 == c) {
          e = null;
          break;
        }
        e[c] = 0;
      }
      return a;
    }
    throw g.e.$;
  };
  return c;
};
g.e.lu = function(a) {
  var c = g.e.L(a), d = [], e = 0;
  a = new g.e.Iterator;
  var f = !1;
  a.next = function() {
    var a = null;
    if (!f) {
      try {
        return a = c.next(), d.push(a), a;
      } catch (l) {
        if (l != g.e.$ || g.a.ra(d)) {
          throw l;
        }
        f = !0;
      }
    }
    a = d[e];
    e = (e + 1) % d.length;
    return a;
  };
  return a;
};
g.e.count = function(a, c) {
  var d = a || 0, e = g.la(c) ? c : 1, f = new g.e.Iterator;
  f.next = function() {
    var a = d;
    d += e;
    return a;
  };
  return f;
};
g.e.repeat = function(a) {
  var c = new g.e.Iterator;
  c.next = g.G.constant(a);
  return c;
};
g.e.pt = function(a) {
  var c = g.e.L(a), d = 0;
  a = new g.e.Iterator;
  a.next = function() {
    return d += c.next();
  };
  return a;
};
g.e.zg = function(a) {
  var c = arguments, d = new g.e.Iterator;
  if (0 < c.length) {
    var e = g.a.map(c, g.e.L);
    d.next = function() {
      return g.a.map(e, function(a) {
        return a.next();
      });
    };
  }
  return d;
};
g.e.bj = function(a, c) {
  var d = g.a.slice(arguments, 1), e = new g.e.Iterator;
  if (0 < d.length) {
    var f = g.a.map(d, g.e.L);
    e.next = function() {
      var c = !1, d = g.a.map(f, function(d) {
        var e;
        try {
          e = d.next(), c = !0;
        } catch (f) {
          if (f !== g.e.$) {
            throw f;
          }
          e = a;
        }
        return e;
      });
      if (!c) {
        throw g.e.$;
      }
      return d;
    };
  }
  return e;
};
g.e.bu = function(a, c) {
  var d = g.e.L(c);
  return g.e.filter(a, function() {
    return!!d.next();
  });
};
g.e.Zc = function(a, c) {
  this.iterator = g.e.L(a);
  this.Gf = c || g.G.identity;
};
g.Ra(g.e.Zc, g.e.Iterator);
g.e.Zc.prototype.next = function() {
  for (;this.ec == this.hi;) {
    this.Pc = this.iterator.next(), this.ec = this.Gf(this.Pc);
  }
  this.hi = this.ec;
  return[this.ec, this.Dn(this.hi)];
};
g.e.Zc.prototype.Dn = function(a) {
  for (var c = [];this.ec == a;) {
    c.push(this.Pc);
    try {
      this.Pc = this.iterator.next();
    } catch (d) {
      if (d !== g.e.$) {
        throw d;
      }
      break;
    }
    this.ec = this.Gf(this.Pc);
  }
  return c;
};
g.e.Zu = function(a, c) {
  return new g.e.Zc(a, c);
};
g.e.Rw = function(a, c, d) {
  var e = g.e.L(a);
  a = new g.e.Iterator;
  a.next = function() {
    var a = g.e.bb(e.next());
    return c.apply(d, g.a.concat(a, void 0, e));
  };
  return a;
};
g.e.Xw = function(a, c) {
  var d = g.e.L(a), e = g.isNumber(c) ? c : 2, f = g.a.map(g.a.zc(e), function() {
    return[];
  }), h = function() {
    var a = d.next();
    g.a.forEach(f, function(c) {
      c.push(a);
    });
  };
  return g.a.map(f, function(a) {
    var c = new g.e.Iterator;
    c.next = function() {
      g.a.ra(a) && h();
      return a.shift();
    };
    return c;
  });
};
g.e.yu = function(a, c) {
  return g.e.zg(g.e.count(c), a);
};
g.e.limit = function(a, c) {
  var d = g.e.L(a), e = new g.e.Iterator, f = c;
  e.next = function() {
    if (0 < f--) {
      return d.next();
    }
    throw g.e.$;
  };
  return e;
};
g.e.Xk = function(a, c) {
  for (var d = g.e.L(a);0 < c--;) {
    g.e.Nk(d, null);
  }
  return d;
};
g.e.slice = function(a, c, d) {
  a = g.e.Xk(a, c);
  g.isNumber(d) && (a = g.e.limit(a, d - c));
  return a;
};
g.e.aj = function(a) {
  var c = [];
  g.a.Xj(a, c);
  return a.length != c.length;
};
g.e.$i = function(a, c) {
  var d = g.e.bb(a), e = g.isNumber(c) ? c : d.length, d = g.a.repeat(d, e), d = g.e.product.apply(void 0, d);
  return g.e.filter(d, function(a) {
    return!g.e.aj(a);
  });
};
g.e.Yt = function(a, c) {
  function d(a) {
    return e[a];
  }
  var e = g.e.bb(a), f = g.e.zc(e.length), f = g.e.$i(f, c), h = g.e.filter(f, function(a) {
    return g.a.qf(a);
  }), f = new g.e.Iterator;
  f.next = function() {
    return g.a.map(h.next(), d);
  };
  return f;
};
g.e.Zt = function(a, c) {
  function d(a) {
    return e[a];
  }
  var e = g.e.bb(a), f = g.a.zc(e.length), f = g.a.repeat(f, c), f = g.e.product.apply(void 0, f), h = g.e.filter(f, function(a) {
    return g.a.qf(a);
  }), f = new g.e.Iterator;
  f.next = function() {
    return g.a.map(h.next(), d);
  };
  return f;
};
g.g.Map = function(a, c) {
  this.t = {};
  this.J = [];
  this.ob = this.Va = 0;
  var d = arguments.length;
  if (1 < d) {
    if (d % 2) {
      throw Error("Uneven number of arguments");
    }
    for (var e = 0;e < d;e += 2) {
      this.set(arguments[e], arguments[e + 1]);
    }
  } else {
    a && this.ae(a);
  }
};
b = g.g.Map.prototype;
b.ua = function() {
  return this.Va;
};
b.T = function() {
  this.Cb();
  for (var a = [], c = 0;c < this.J.length;c++) {
    a.push(this.t[this.J[c]]);
  }
  return a;
};
b.sa = function() {
  this.Cb();
  return this.J.concat();
};
b.Dd = function(a) {
  return g.g.Map.rb(this.t, a);
};
b.Fb = function(a) {
  for (var c = 0;c < this.J.length;c++) {
    var d = this.J[c];
    if (g.g.Map.rb(this.t, d) && this.t[d] == a) {
      return!0;
    }
  }
  return!1;
};
b.equals = function(a, c) {
  if (this === a) {
    return!0;
  }
  if (this.Va != a.ua()) {
    return!1;
  }
  var d = c || g.g.Map.Vk;
  this.Cb();
  for (var e, f = 0;e = this.J[f];f++) {
    if (!d(this.get(e), a.get(e))) {
      return!1;
    }
  }
  return!0;
};
g.g.Map.Vk = function(a, c) {
  return a === c;
};
b = g.g.Map.prototype;
b.ra = function() {
  return 0 == this.Va;
};
b.clear = function() {
  this.t = {};
  this.ob = this.Va = this.J.length = 0;
};
b.remove = function(a) {
  return g.g.Map.rb(this.t, a) ? (delete this.t[a], this.Va--, this.ob++, this.J.length > 2 * this.Va && this.Cb(), !0) : !1;
};
b.Cb = function() {
  if (this.Va != this.J.length) {
    for (var a = 0, c = 0;a < this.J.length;) {
      var d = this.J[a];
      g.g.Map.rb(this.t, d) && (this.J[c++] = d);
      a++;
    }
    this.J.length = c;
  }
  if (this.Va != this.J.length) {
    for (var e = {}, c = a = 0;a < this.J.length;) {
      d = this.J[a], g.g.Map.rb(e, d) || (this.J[c++] = d, e[d] = 1), a++;
    }
    this.J.length = c;
  }
};
b.get = function(a, c) {
  return g.g.Map.rb(this.t, a) ? this.t[a] : c;
};
b.set = function(a, c) {
  g.g.Map.rb(this.t, a) || (this.Va++, this.J.push(a), this.ob++);
  this.t[a] = c;
};
b.ae = function(a) {
  var c;
  a instanceof g.g.Map ? (c = a.sa(), a = a.T()) : (c = g.object.sa(a), a = g.object.T(a));
  for (var d = 0;d < c.length;d++) {
    this.set(c[d], a[d]);
  }
};
b.forEach = function(a, c) {
  for (var d = this.sa(), e = 0;e < d.length;e++) {
    var f = d[e], h = this.get(f);
    a.call(c, h, f, this);
  }
};
b.clone = function() {
  return new g.g.Map(this);
};
b.Si = function() {
  for (var a = new g.g.Map, c = 0;c < this.J.length;c++) {
    var d = this.J[c];
    a.set(this.t[d], d);
  }
  return a;
};
b.Tp = function() {
  this.Cb();
  for (var a = {}, c = 0;c < this.J.length;c++) {
    var d = this.J[c];
    a[d] = this.t[d];
  }
  return a;
};
b.Hb = function(a) {
  this.Cb();
  var c = 0, d = this.J, e = this.t, f = this.ob, h = this, l = new g.e.Iterator;
  l.next = function() {
    for (;;) {
      if (f != h.ob) {
        throw Error("The map has changed since the iterator was created");
      }
      if (c >= d.length) {
        throw g.e.$;
      }
      var l = d[c++];
      return a ? l : e[l];
    }
  };
  return l;
};
g.g.Map.rb = function(a, c) {
  return Object.prototype.hasOwnProperty.call(a, c);
};
g.g.ua = function(a) {
  return "function" == typeof a.ua ? a.ua() : g.S(a) || g.isString(a) ? a.length : g.object.ua(a);
};
g.g.T = function(a) {
  if ("function" == typeof a.T) {
    return a.T();
  }
  if (g.isString(a)) {
    return a.split("");
  }
  if (g.S(a)) {
    for (var c = [], d = a.length, e = 0;e < d;e++) {
      c.push(a[e]);
    }
    return c;
  }
  return g.object.T(a);
};
g.g.sa = function(a) {
  if ("function" == typeof a.sa) {
    return a.sa();
  }
  if ("function" != typeof a.T) {
    if (g.S(a) || g.isString(a)) {
      var c = [];
      a = a.length;
      for (var d = 0;d < a;d++) {
        c.push(d);
      }
      return c;
    }
    return g.object.sa(a);
  }
};
g.g.contains = function(a, c) {
  return "function" == typeof a.contains ? a.contains(c) : "function" == typeof a.Fb ? a.Fb(c) : g.S(a) || g.isString(a) ? g.a.contains(a, c) : g.object.Fb(a, c);
};
g.g.ra = function(a) {
  return "function" == typeof a.ra ? a.ra() : g.S(a) || g.isString(a) ? g.a.ra(a) : g.object.ra(a);
};
g.g.clear = function(a) {
  "function" == typeof a.clear ? a.clear() : g.S(a) ? g.a.clear(a) : g.object.clear(a);
};
g.g.forEach = function(a, c, d) {
  if ("function" == typeof a.forEach) {
    a.forEach(c, d);
  } else {
    if (g.S(a) || g.isString(a)) {
      g.a.forEach(a, c, d);
    } else {
      for (var e = g.g.sa(a), f = g.g.T(a), h = f.length, l = 0;l < h;l++) {
        c.call(d, f[l], e && e[l], a);
      }
    }
  }
};
g.g.filter = function(a, c, d) {
  if ("function" == typeof a.filter) {
    return a.filter(c, d);
  }
  if (g.S(a) || g.isString(a)) {
    return g.a.filter(a, c, d);
  }
  var e, f = g.g.sa(a), h = g.g.T(a), l = h.length;
  if (f) {
    e = {};
    for (var m = 0;m < l;m++) {
      c.call(d, h[m], f[m], a) && (e[f[m]] = h[m]);
    }
  } else {
    for (e = [], m = 0;m < l;m++) {
      c.call(d, h[m], void 0, a) && e.push(h[m]);
    }
  }
  return e;
};
g.g.map = function(a, c, d) {
  if ("function" == typeof a.map) {
    return a.map(c, d);
  }
  if (g.S(a) || g.isString(a)) {
    return g.a.map(a, c, d);
  }
  var e, f = g.g.sa(a), h = g.g.T(a), l = h.length;
  if (f) {
    e = {};
    for (var m = 0;m < l;m++) {
      e[f[m]] = c.call(d, h[m], f[m], a);
    }
  } else {
    for (e = [], m = 0;m < l;m++) {
      e[m] = c.call(d, h[m], void 0, a);
    }
  }
  return e;
};
g.g.some = function(a, c, d) {
  if ("function" == typeof a.some) {
    return a.some(c, d);
  }
  if (g.S(a) || g.isString(a)) {
    return g.a.some(a, c, d);
  }
  for (var e = g.g.sa(a), f = g.g.T(a), h = f.length, l = 0;l < h;l++) {
    if (c.call(d, f[l], e && e[l], a)) {
      return!0;
    }
  }
  return!1;
};
g.g.every = function(a, c, d) {
  if ("function" == typeof a.every) {
    return a.every(c, d);
  }
  if (g.S(a) || g.isString(a)) {
    return g.a.every(a, c, d);
  }
  for (var e = g.g.sa(a), f = g.g.T(a), h = f.length, l = 0;l < h;l++) {
    if (!c.call(d, f[l], e && e[l], a)) {
      return!1;
    }
  }
  return!0;
};
g.g.Set = function(a) {
  this.t = new g.g.Map;
  a && this.ae(a);
};
g.g.Set.ie = function(a) {
  var c = typeof a;
  return "object" == c && a || "function" == c ? "o" + g.gf(a) : c.substr(0, 1) + a;
};
b = g.g.Set.prototype;
b.ua = function() {
  return this.t.ua();
};
b.add = function(a) {
  this.t.set(g.g.Set.ie(a), a);
};
b.ae = function(a) {
  a = g.g.T(a);
  for (var c = a.length, d = 0;d < c;d++) {
    this.add(a[d]);
  }
};
b.removeAll = function(a) {
  a = g.g.T(a);
  for (var c = a.length, d = 0;d < c;d++) {
    this.remove(a[d]);
  }
};
b.remove = function(a) {
  return this.t.remove(g.g.Set.ie(a));
};
b.clear = function() {
  this.t.clear();
};
b.ra = function() {
  return this.t.ra();
};
b.contains = function(a) {
  return this.t.Dd(g.g.Set.ie(a));
};
b.T = function() {
  return this.t.T();
};
b.clone = function() {
  return new g.g.Set(this);
};
b.equals = function(a) {
  return this.ua() == g.g.ua(a) && this.kd(a);
};
b.kd = function(a) {
  var c = g.g.ua(a);
  if (this.ua() > c) {
    return!1;
  }
  !(a instanceof g.g.Set) && 5 < c && (a = new g.g.Set(a));
  return g.g.every(this, function(c) {
    return g.g.contains(a, c);
  });
};
b.Hb = function() {
  return this.t.Hb(!1);
};
g.d = {};
g.d.userAgent = {};
g.d.userAgent.n = {};
g.d.userAgent.n.eg = function() {
  var a = g.d.userAgent.n.ak();
  return a && (a = a.userAgent) ? a : "";
};
g.d.userAgent.n.ak = function() {
  return g.global.navigator;
};
g.d.userAgent.n.ag = g.d.userAgent.n.eg();
g.d.userAgent.n.Iw = function(a) {
  g.d.userAgent.n.ag = a || g.d.userAgent.n.eg();
};
g.d.userAgent.n.zb = function() {
  return g.d.userAgent.n.ag;
};
g.d.userAgent.n.B = function(a) {
  return g.b.contains(g.d.userAgent.n.zb(), a);
};
g.d.userAgent.n.bk = function(a) {
  return g.b.Wi(g.d.userAgent.n.zb(), a);
};
g.d.userAgent.n.mf = function(a) {
  for (var c = /(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g, d = [], e;e = c.exec(a);) {
    d.push([e[1], e[2], e[3] || void 0]);
  }
  return d;
};
g.d.userAgent.browser = {};
g.d.userAgent.browser.Ip = function() {
  return g.d.userAgent.n.B("Opera") || g.d.userAgent.n.B("OPR");
};
g.d.userAgent.browser.Gp = function() {
  return g.d.userAgent.n.B("Trident") || g.d.userAgent.n.B("MSIE");
};
g.d.userAgent.browser.Fp = function() {
  return g.d.userAgent.n.B("Firefox");
};
g.d.userAgent.browser.Df = function() {
  return g.d.userAgent.n.B("Safari") && !g.d.userAgent.n.B("Chrome") && !g.d.userAgent.n.B("CriOS") && !g.d.userAgent.n.B("Android");
};
g.d.userAgent.browser.Cf = function() {
  return g.d.userAgent.n.B("Coast");
};
g.d.userAgent.browser.Hp = function() {
  return(g.d.userAgent.n.B("iPad") || g.d.userAgent.n.B("iPhone")) && !g.d.userAgent.browser.Df() && !g.d.userAgent.browser.Bf() && !g.d.userAgent.browser.Cf() && g.d.userAgent.n.B("AppleWebKit");
};
g.d.userAgent.browser.Bf = function() {
  return g.d.userAgent.n.B("Chrome") || g.d.userAgent.n.B("CriOS");
};
g.d.userAgent.browser.Ep = function() {
  return!g.d.userAgent.browser.lf() && g.d.userAgent.n.B("Android");
};
g.d.userAgent.browser.nf = g.d.userAgent.browser.Ip;
g.d.userAgent.browser.Fd = g.d.userAgent.browser.Gp;
g.d.userAgent.browser.wv = g.d.userAgent.browser.Fp;
g.d.userAgent.browser.Mv = g.d.userAgent.browser.Df;
g.d.userAgent.browser.pv = g.d.userAgent.browser.Cf;
g.d.userAgent.browser.Av = g.d.userAgent.browser.Hp;
g.d.userAgent.browser.lf = g.d.userAgent.browser.Bf;
g.d.userAgent.browser.mv = g.d.userAgent.browser.Ep;
g.d.userAgent.browser.Ov = function() {
  return g.d.userAgent.n.B("Silk");
};
g.d.userAgent.browser.Bb = function() {
  function a(a) {
    a = g.a.find(a, e);
    return d[a] || "";
  }
  var c = g.d.userAgent.n.zb();
  if (g.d.userAgent.browser.Fd()) {
    return g.d.userAgent.browser.Ti(c);
  }
  var c = g.d.userAgent.n.mf(c), d = {};
  g.a.forEach(c, function(a) {
    d[a[0]] = a[1];
  });
  var e = g.Xb(g.object.Dd, d);
  return g.d.userAgent.browser.nf() ? a(["Version", "Opera", "OPR"]) : g.d.userAgent.browser.lf() ? a(["Chrome", "CriOS"]) : (c = c[2]) && c[1] || "";
};
g.d.userAgent.browser.tc = function(a) {
  return 0 <= g.b.Ab(g.d.userAgent.browser.Bb(), a);
};
g.d.userAgent.browser.Ti = function(a) {
  var c = /rv: *([\d\.]*)/.exec(a);
  if (c && c[1]) {
    return c[1];
  }
  var c = "", d = /MSIE +([\d\.]+)/.exec(a);
  if (d && d[1]) {
    if (a = /Trident\/(\d.\d)/.exec(a), "7.0" == d[1]) {
      if (a && a[1]) {
        switch(a[1]) {
          case "4.0":
            c = "8.0";
            break;
          case "5.0":
            c = "9.0";
            break;
          case "6.0":
            c = "10.0";
            break;
          case "7.0":
            c = "11.0";
        }
      } else {
        c = "7.0";
      }
    } else {
      c = d[1];
    }
  }
  return c;
};
g.d.userAgent.qa = {};
g.d.userAgent.qa.Iv = function() {
  return g.d.userAgent.n.B("Presto");
};
g.d.userAgent.qa.mj = function() {
  return g.d.userAgent.n.B("Trident") || g.d.userAgent.n.B("MSIE");
};
g.d.userAgent.qa.xf = function() {
  return g.d.userAgent.n.bk("WebKit");
};
g.d.userAgent.qa.zp = function() {
  return g.d.userAgent.n.B("Gecko") && !g.d.userAgent.qa.xf() && !g.d.userAgent.qa.mj();
};
g.d.userAgent.qa.Bb = function() {
  var a = g.d.userAgent.n.zb();
  if (a) {
    var a = g.d.userAgent.n.mf(a), c = a[1];
    if (c) {
      return "Gecko" == c[0] ? g.d.userAgent.qa.xj(a, "Firefox") : c[1];
    }
    var a = a[0], d;
    if (a && (d = a[2]) && (d = /Trident\/([^\s;]+)/.exec(d))) {
      return d[1];
    }
  }
  return "";
};
g.d.userAgent.qa.tc = function(a) {
  return 0 <= g.b.Ab(g.d.userAgent.qa.Bb(), a);
};
g.d.userAgent.qa.xj = function(a, c) {
  var d = g.a.find(a, function(a) {
    return c == a[0];
  });
  return d && d[1] || "";
};
g.d.userAgent.platform = {};
g.d.userAgent.platform.Pf = function() {
  return g.d.userAgent.n.B("Android");
};
g.d.userAgent.platform.Pk = function() {
  return g.d.userAgent.n.B("iPod");
};
g.d.userAgent.platform.vg = function() {
  return g.d.userAgent.n.B("iPhone") && !g.d.userAgent.n.B("iPod") && !g.d.userAgent.n.B("iPad");
};
g.d.userAgent.platform.ug = function() {
  return g.d.userAgent.n.B("iPad");
};
g.d.userAgent.platform.uj = function() {
  return g.d.userAgent.platform.vg() || g.d.userAgent.platform.ug() || g.d.userAgent.platform.Pk();
};
g.d.userAgent.platform.Qf = function() {
  return g.d.userAgent.n.B("Macintosh");
};
g.d.userAgent.platform.Ok = function() {
  return g.d.userAgent.n.B("Linux");
};
g.d.userAgent.platform.Rf = function() {
  return g.d.userAgent.n.B("Windows");
};
g.d.userAgent.platform.ab = function() {
  return g.d.userAgent.n.B("CrOS");
};
g.d.userAgent.platform.Bb = function() {
  var a = g.d.userAgent.n.zb(), c = "";
  g.d.userAgent.platform.Rf() ? (c = /Windows (?:NT|Phone) ([0-9.]+)/, c = (a = c.exec(a)) ? a[1] : "0.0") : g.d.userAgent.platform.uj() ? (c = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, c = (a = c.exec(a)) && a[1].replace(/_/g, ".")) : g.d.userAgent.platform.Qf() ? (c = /Mac OS X ([0-9_.]+)/, c = (a = c.exec(a)) ? a[1].replace(/_/g, ".") : "10") : g.d.userAgent.platform.Pf() ? (c = /Android\s+([^\);]+)(\)|;)/, c = (a = c.exec(a)) && a[1]) : g.d.userAgent.platform.ab() && (c = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/, 
  c = (a = c.exec(a)) && a[1]);
  return c || "";
};
g.d.userAgent.platform.tc = function(a) {
  return 0 <= g.b.Ab(g.d.userAgent.platform.Bb(), a);
};
g.userAgent = {};
g.userAgent.Ye = !1;
g.userAgent.Fi = !1;
g.userAgent.Ji = !1;
g.userAgent.Ze = !1;
g.userAgent.$e = !1;
g.userAgent.zj = !1;
g.userAgent.Ad = g.userAgent.Ye || g.userAgent.Fi || g.userAgent.Ze || g.userAgent.Ji || g.userAgent.$e;
g.userAgent.Nb = function() {
  return g.d.userAgent.n.zb();
};
g.userAgent.gg = function() {
  return g.global.navigator || null;
};
g.userAgent.kc = g.userAgent.Ad ? g.userAgent.$e : g.d.userAgent.browser.nf();
g.userAgent.vb = g.userAgent.Ad ? g.userAgent.Ye : g.d.userAgent.browser.Fd();
g.userAgent.Mh = g.userAgent.Ad ? g.userAgent.Fi : g.d.userAgent.qa.zp();
g.userAgent.$b = g.userAgent.Ad ? g.userAgent.Ji || g.userAgent.Ze : g.d.userAgent.qa.xf();
g.userAgent.Bp = function() {
  return g.userAgent.$b && g.d.userAgent.n.B("Mobile");
};
g.userAgent.xr = g.userAgent.Ze || g.userAgent.Bp();
g.userAgent.xh = g.userAgent.$b;
g.userAgent.np = function() {
  var a = g.userAgent.gg();
  return a && a.platform || "";
};
g.userAgent.Cs = g.userAgent.np();
g.userAgent.Hi = !1;
g.userAgent.Ki = !1;
g.userAgent.Gi = !1;
g.userAgent.Li = !1;
g.userAgent.uc = !1;
g.userAgent.wc = !1;
g.userAgent.vc = !1;
g.userAgent.yb = g.userAgent.Hi || g.userAgent.Ki || g.userAgent.Gi || g.userAgent.Li || g.userAgent.uc || g.userAgent.wc || g.userAgent.vc;
g.userAgent.Ic = g.userAgent.yb ? g.userAgent.Hi : g.d.userAgent.platform.Qf();
g.userAgent.td = g.userAgent.yb ? g.userAgent.Ki : g.d.userAgent.platform.Rf();
g.userAgent.Ap = function() {
  return g.d.userAgent.platform.Ok() || g.d.userAgent.platform.ab();
};
g.userAgent.Hc = g.userAgent.yb ? g.userAgent.Gi : g.userAgent.Ap();
g.userAgent.Cp = function() {
  var a = g.userAgent.gg();
  return!!a && g.b.contains(a.appVersion || "", "X11");
};
g.userAgent.nt = g.userAgent.yb ? g.userAgent.Li : g.userAgent.Cp();
g.userAgent.ANDROID = g.userAgent.yb ? g.userAgent.uc : g.d.userAgent.platform.Pf();
g.userAgent.wh = g.userAgent.yb ? g.userAgent.wc : g.d.userAgent.platform.vg();
g.userAgent.vh = g.userAgent.yb ? g.userAgent.vc : g.d.userAgent.platform.ug();
g.userAgent.ef = function() {
  var a = "", c;
  if (g.userAgent.kc && g.global.opera) {
    return a = g.global.opera.version, g.isFunction(a) ? a() : a;
  }
  g.userAgent.Mh ? c = /rv\:([^\);]+)(\)|;)/ : g.userAgent.vb ? c = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : g.userAgent.$b && (c = /WebKit\/(\S+)/);
  c && (a = (a = c.exec(g.userAgent.Nb())) ? a[1] : "");
  return g.userAgent.vb && (c = g.userAgent.Oh(), c > parseFloat(a)) ? String(c) : a;
};
g.userAgent.Oh = function() {
  var a = g.global.document;
  return a ? a.documentMode : void 0;
};
g.userAgent.VERSION = g.userAgent.ef();
g.userAgent.compare = function(a, c) {
  return g.b.Ab(a, c);
};
g.userAgent.Yf = {};
g.userAgent.tc = function(a) {
  return g.userAgent.zj || g.userAgent.Yf[a] || (g.userAgent.Yf[a] = 0 <= g.b.Ab(g.userAgent.VERSION, a));
};
g.userAgent.Sb = g.userAgent.tc;
g.userAgent.xp = function(a) {
  return g.userAgent.vb && g.userAgent.Vn >= a;
};
g.userAgent.sv = g.userAgent.xp;
var u = g.global.document;
g.userAgent.Vn = u && g.userAgent.vb ? g.userAgent.Oh() || ("CSS1Compat" == u.compatMode ? parseInt(g.userAgent.VERSION, 10) : 5) : void 0;
g.debug.Aa = g.ha;
g.debug.Qt = function(a, c, d) {
  d = d || g.global;
  var e = d.onerror, f = !!c;
  g.userAgent.$b && !g.userAgent.tc("535.3") && (f = !f);
  d.onerror = function(c, d, m, n, p) {
    e && e(c, d, m, n, p);
    a({message:c, fileName:d, In:m, Xp:n, error:p});
    return f;
  };
};
g.debug.Bu = function(a, c) {
  if ("undefined" == typeof a) {
    return "undefined";
  }
  if (null == a) {
    return "NULL";
  }
  var d = [], e;
  for (e in a) {
    if (c || !g.isFunction(a[e])) {
      var f = e + " = ";
      try {
        f += a[e];
      } catch (h) {
        f += "*** " + h + " ***";
      }
      d.push(f);
    }
  }
  return d.join("\n");
};
g.debug.nu = function(a, c) {
  var d = [], e = function(a, h, l) {
    var m = h + "  ";
    l = new g.g.Set(l);
    try {
      if (g.la(a)) {
        if (g.Yb(a)) {
          d.push("NULL");
        } else {
          if (g.isString(a)) {
            d.push('"' + a.replace(/\n/g, "\n" + h) + '"');
          } else {
            if (g.isFunction(a)) {
              d.push(String(a).replace(/\n/g, "\n" + h));
            } else {
              if (g.isObject(a)) {
                if (l.contains(a)) {
                  d.push("*** reference loop detected ***");
                } else {
                  l.add(a);
                  d.push("{");
                  for (var n in a) {
                    if (c || !g.isFunction(a[n])) {
                      d.push("\n"), d.push(m), d.push(n + " = "), e(a[n], m, l);
                    }
                  }
                  d.push("\n" + h + "}");
                }
              } else {
                d.push(a);
              }
            }
          }
        }
      } else {
        d.push("undefined");
      }
    } catch (p) {
      d.push("*** " + p + " ***");
    }
  };
  e(a, "", new g.g.Set);
  return d.join("");
};
g.debug.qp = function(a) {
  for (var c = [], d = 0;d < a.length;d++) {
    g.isArray(a[d]) ? c.push(g.debug.qp(a[d])) : c.push(a[d]);
  }
  return "[ " + c.join(", ") + " ]";
};
g.debug.Cu = function(a, c) {
  var d = g.debug.Rl(a, c);
  return g.html.h.H(d);
};
g.debug.Rl = function(a, c) {
  try {
    var d = g.debug.dm(a), e = g.debug.cm(d.fileName);
    return g.html.h.concat(g.html.h.se("Message: " + d.message + "\nUrl: "), g.html.h.create("a", {href:e, target:"_new"}, d.fileName), g.html.h.se("\nLine: " + d.lineNumber + "\n\nBrowser stack:\n" + d.stack + "-> [end]\n\nJS stack traversal:\n" + g.debug.le(c) + "-> "));
  } catch (f) {
    return g.html.h.se("Exception trying to expose exception! You win, we lose. " + f);
  }
};
g.debug.cm = function(a) {
  g.R(a) || (a = "");
  if (!/^https?:\/\//i.test(a)) {
    return g.html.v.Zb(g.b.I.Hd("sanitizedviewsrc"));
  }
  a = g.html.v.Gd(a);
  return g.html.pb.dj(g.b.I.Hd("view-source scheme plus HTTP/HTTPS URL"), "view-source:" + g.html.v.H(a));
};
g.debug.dm = function(a) {
  var c = g.jo("window.location.href");
  if (g.isString(a)) {
    return{message:a, name:"Unknown error", lineNumber:"Not available", fileName:c, stack:"Not available"};
  }
  var d, e, f = !1;
  try {
    d = a.lineNumber || a.In || "Not available";
  } catch (h) {
    d = "Not available", f = !0;
  }
  try {
    e = a.fileName || a.filename || a.sourceURL || g.global.$googDebugFname || c;
  } catch (l) {
    e = "Not available", f = !0;
  }
  return!f && a.lineNumber && a.fileName && a.stack && a.message && a.name ? a : {message:a.message || "Not available", name:a.name || "UnknownError", lineNumber:d, fileName:e, stack:a.stack || "Not available"};
};
g.debug.xi = function(a, c) {
  var d;
  "string" == typeof a ? (d = Error(a), Error.captureStackTrace && Error.captureStackTrace(d, g.debug.xi)) : d = a;
  d.stack || (d.stack = g.debug.le(g.debug.xi));
  if (c) {
    for (var e = 0;d["message" + e];) {
      ++e;
    }
    d["message" + e] = String(c);
  }
  return d;
};
g.debug.Qn = function(a) {
  if (g.De) {
    var c = g.debug.gi(g.debug.Qn);
    if (c) {
      return c;
    }
  }
  for (var c = [], d = arguments.callee.caller, e = 0;d && (!a || e < a);) {
    c.push(g.debug.getFunctionName(d));
    c.push("()\n");
    try {
      d = d.caller;
    } catch (f) {
      c.push("[exception trying to get caller]\n");
      break;
    }
    e++;
    if (e >= g.debug.Tf) {
      c.push("[...long stack...]");
      break;
    }
  }
  a && e >= a ? c.push("[...reached max depth limit...]") : c.push("[end]");
  return c.join("");
};
g.debug.Tf = 50;
g.debug.gi = function(a) {
  var c = Error();
  if (Error.captureStackTrace) {
    return Error.captureStackTrace(c, a), String(c.stack);
  }
  try {
    throw c;
  } catch (d) {
    c = d;
  }
  return(a = c.stack) ? String(a) : null;
};
g.debug.le = function(a) {
  var c;
  g.De && (c = g.debug.gi(a || g.debug.le));
  c || (c = g.debug.Sf(a || arguments.callee.caller, []));
  return c;
};
g.debug.Sf = function(a, c) {
  var d = [];
  if (g.a.contains(c, a)) {
    d.push("[...circular reference...]");
  } else {
    if (a && c.length < g.debug.Tf) {
      d.push(g.debug.getFunctionName(a) + "(");
      for (var e = a.arguments, f = 0;e && f < e.length;f++) {
        0 < f && d.push(", ");
        var h;
        h = e[f];
        switch(typeof h) {
          case "object":
            h = h ? "object" : "null";
            break;
          case "string":
            break;
          case "number":
            h = String(h);
            break;
          case "boolean":
            h = h ? "true" : "false";
            break;
          case "function":
            h = (h = g.debug.getFunctionName(h)) ? h : "[fn]";
            break;
          default:
            h = typeof h;
        }
        40 < h.length && (h = h.substr(0, 40) + "...");
        d.push(h);
      }
      c.push(a);
      d.push(")\n");
      try {
        d.push(g.debug.Sf(a.caller, c));
      } catch (l) {
        d.push("[exception trying to get caller]\n");
      }
    } else {
      a ? d.push("[...long stack...]") : d.push("[end]");
    }
  }
  return d.join("");
};
g.debug.Ew = function(a) {
  g.debug.ui = a;
};
g.debug.getFunctionName = function(a) {
  if (g.debug.Qb[a]) {
    return g.debug.Qb[a];
  }
  if (g.debug.ui) {
    var c = g.debug.ui(a);
    if (c) {
      return g.debug.Qb[a] = c;
    }
  }
  a = String(a);
  g.debug.Qb[a] || (c = /function ([^\(]+)/.exec(a), g.debug.Qb[a] = c ? c[1] : "[Anonymous]");
  return g.debug.Qb[a];
};
g.debug.$v = function(a) {
  return a.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]");
};
g.debug.Qb = {};
g.debug.xa = function(a, c, d, e, f) {
  this.reset(a, c, d, e, f);
};
g.debug.xa.prototype.ai = null;
g.debug.xa.hn = !0;
g.debug.xa.ln = 0;
g.debug.xa.prototype.reset = function(a, c, d, e, f) {
  g.debug.xa.hn && ("number" == typeof f || g.debug.xa.ln++);
  e || g.now();
  this.Ld = a;
  this.kn = c;
  delete this.ai;
};
g.debug.xa.prototype.Em = function(a) {
  this.ai = a;
};
g.debug.xa.prototype.getMessage = function() {
  return this.kn;
};
g.debug.ka = function() {
  this.clear();
};
g.debug.ka.Rd = function() {
  g.debug.ka.qc || (g.debug.ka.qc = new g.debug.ka);
  return g.debug.ka.qc;
};
g.debug.ka.ud = 0;
g.debug.ka.prototype.zm = function(a, c, d) {
  var e = (this.nh + 1) % g.debug.ka.ud;
  this.nh = e;
  if (this.oh) {
    return e = this.mh[e], e.reset(a, c, d), e;
  }
  this.oh = e == g.debug.ka.ud - 1;
  return this.mh[e] = new g.debug.xa(a, c, d);
};
g.debug.ka.Am = function() {
  return 0 < g.debug.ka.ud;
};
g.debug.ka.prototype.clear = function() {
  this.mh = Array(g.debug.ka.ud);
  this.nh = -1;
  this.oh = !1;
};
g.debug.f = function(a) {
  this.ve = a;
  this.Ha = this.Ie = this.Ld = this.Ga = null;
};
g.debug.f.me = "";
g.debug.f.Wb = !0;
g.debug.f.Wb || (g.debug.f.Id = []);
g.debug.f.m = function(a, c) {
  this.name = a;
  this.value = c;
};
g.debug.f.m.prototype.toString = function() {
  return this.name;
};
g.debug.f.m.Nd = new g.debug.f.m("OFF", Infinity);
g.debug.f.m.Uo = new g.debug.f.m("SHOUT", 1200);
g.debug.f.m.rg = new g.debug.f.m("SEVERE", 1E3);
g.debug.f.m.ee = new g.debug.f.m("WARNING", 900);
g.debug.f.m.qg = new g.debug.f.m("INFO", 800);
g.debug.f.m.og = new g.debug.f.m("CONFIG", 700);
g.debug.f.m.pg = new g.debug.f.m("FINE", 500);
g.debug.f.m.xo = new g.debug.f.m("FINER", 400);
g.debug.f.m.yo = new g.debug.f.m("FINEST", 300);
g.debug.f.m.ko = new g.debug.f.m("ALL", 0);
g.debug.f.m.de = [g.debug.f.m.Nd, g.debug.f.m.Uo, g.debug.f.m.rg, g.debug.f.m.ee, g.debug.f.m.qg, g.debug.f.m.og, g.debug.f.m.pg, g.debug.f.m.xo, g.debug.f.m.yo, g.debug.f.m.ko];
g.debug.f.m.hb = null;
g.debug.f.m.ng = function() {
  g.debug.f.m.hb = {};
  for (var a = 0, c;c = g.debug.f.m.de[a];a++) {
    g.debug.f.m.hb[c.value] = c, g.debug.f.m.hb[c.name] = c;
  }
};
g.debug.f.m.Tu = function(a) {
  g.debug.f.m.hb || g.debug.f.m.ng();
  return g.debug.f.m.hb[a] || null;
};
g.debug.f.m.Uu = function(a) {
  g.debug.f.m.hb || g.debug.f.m.ng();
  if (a in g.debug.f.m.hb) {
    return g.debug.f.m.hb[a];
  }
  for (var c = 0;c < g.debug.f.m.de.length;++c) {
    var d = g.debug.f.m.de[c];
    if (d.value <= a) {
      return d;
    }
  }
  return null;
};
g.debug.f.Wl = function(a) {
  g.global.console && (g.global.console.timeStamp ? g.global.console.timeStamp(a) : g.global.console.markTimeline && g.global.console.markTimeline(a));
  g.global.msWriteProfilerMark && g.global.msWriteProfilerMark(a);
};
b = g.debug.f.prototype;
b.getName = function() {
  return this.ve;
};
b.qi = function(a) {
  g.debug.Aa && (g.debug.f.Wb ? (this.Ha || (this.Ha = []), this.Ha.push(a)) : g.debug.f.Id.push(a));
};
b.ti = function(a) {
  if (g.debug.Aa) {
    var c = g.debug.f.Wb ? this.Ha : g.debug.f.Id;
    return!!c && g.a.remove(c, a);
  }
  return!1;
};
b.getParent = function() {
  return this.Ga;
};
b.getChildren = function() {
  this.Ie || (this.Ie = {});
  return this.Ie;
};
b.wf = function() {
  if (!g.debug.Aa) {
    return g.debug.f.m.Nd;
  }
  if (!g.debug.f.Wb) {
    return g.debug.f.Vp;
  }
  if (this.Ld) {
    return this.Ld;
  }
  if (this.Ga) {
    return this.Ga.wf();
  }
  g.l.za("Root logger has no level set.");
  return null;
};
b.Hn = function(a) {
  return g.debug.Aa && a.value >= this.wf().value;
};
b.log = function(a, c, d) {
  g.debug.Aa && this.Hn(a) && (g.isFunction(c) && (c = c()), this.Fn(this.Gn(a, c, d)));
};
b.Gn = function(a, c, d) {
  a = g.debug.ka.Am() ? g.debug.ka.Rd().zm(a, c, this.ve) : new g.debug.xa(a, String(c), this.ve);
  d && a.Em(d);
  return a;
};
b.Un = function(a, c) {
  g.debug.Aa && this.log(g.debug.f.m.rg, a, c);
};
b.vd = function(a, c) {
  g.debug.Aa && this.log(g.debug.f.m.ee, a, c);
};
b.info = function(a, c) {
  g.debug.Aa && this.log(g.debug.f.m.qg, a, c);
};
b.config = function(a, c) {
  g.debug.Aa && this.log(g.debug.f.m.og, a, c);
};
b.ri = function(a, c) {
  g.debug.Aa && this.log(g.debug.f.m.pg, a, c);
};
b.Fn = function(a) {
  g.debug.f.Wl("log:" + a.getMessage());
  if (g.debug.f.Wb) {
    for (var c = this;c;) {
      c.Vl(a), c = c.getParent();
    }
  } else {
    for (var c = 0, d;d = g.debug.f.Id[c++];) {
      d(a);
    }
  }
};
b.Vl = function(a) {
  if (this.Ha) {
    for (var c = 0, d;d = this.Ha[c];c++) {
      d(a);
    }
  }
};
g.debug.Da = {};
g.debug.Da.Og = {};
g.debug.Da.nc = function() {
  g.debug.Da.Ig || (g.debug.Da.Og[g.debug.f.me] = g.debug.Da.Ig);
};
g.debug.Da.Qu = function() {
  return g.debug.Da.Og;
};
g.debug.Da.Vu = function() {
  g.debug.Da.nc();
  return g.debug.Da.Ig;
};
g.debug.Da.fu = function() {
  return function() {
  };
};
g.log = {};
g.log.jb = g.debug.Aa;
g.log.me = g.debug.f.me;
g.log.f = g.debug.f;
g.log.m = g.debug.f.m;
g.log.xa = g.debug.xa;
g.log.qi = function(a, c) {
  g.log.jb && a && a.qi(c);
};
g.log.ti = function(a, c) {
  return g.log.jb && a ? a.ti(c) : !1;
};
g.log.log = function(a, c, d, e) {
  g.log.jb && a && a.log(c, d, e);
};
g.log.error = function(a, c, d) {
  g.log.jb && a && a.Un(c, d);
};
g.log.vd = function(a, c, d) {
  g.log.jb && a && a.vd(c, d);
};
g.log.info = function(a, c, d) {
  g.log.jb && a && a.info(c, d);
};
g.log.ri = function(a, c, d) {
  g.log.jb && a && a.ri(c, d);
};
g.g.fa = function(a) {
  this.ea = {};
  if (a) {
    for (var c = 0;c < a.length;c++) {
      this.ea[g.g.fa.Nc(a[c])] = null;
    }
  }
  g.l.vk();
};
g.g.fa.Xl = {};
g.g.fa.Nc = function(a) {
  return a in g.g.fa.Xl || 32 == String(a).charCodeAt(0) ? " " + a : a;
};
g.g.fa.je = function(a) {
  return 32 == a.charCodeAt(0) ? a.substr(1) : a;
};
b = g.g.fa.prototype;
b.add = function(a) {
  this.ea[g.g.fa.Nc(a)] = null;
};
b.am = function(a) {
  for (var c in a.ea) {
    this.ea[c] = null;
  }
};
b.clear = function() {
  this.ea = {};
};
b.clone = function() {
  var a = new g.g.fa;
  a.am(this);
  return a;
};
b.contains = function(a) {
  return g.g.fa.Nc(a) in this.ea;
};
b.equals = function(a) {
  return this.kd(a) && a.kd(this);
};
b.forEach = function(a, c) {
  for (var d in this.ea) {
    a.call(c, g.g.fa.je(d), void 0, this);
  }
};
b.ua = Object.keys ? function() {
  return Object.keys(this.ea).length;
} : function() {
  var a = 0, c;
  for (c in this.ea) {
    a++;
  }
  return a;
};
b.T = Object.keys ? function() {
  return Object.keys(this.ea).map(g.g.fa.je, this);
} : function() {
  var a = [], c;
  for (c in this.ea) {
    a.push(g.g.fa.je(c));
  }
  return a;
};
b.ra = function() {
  for (var a in this.ea) {
    return!1;
  }
  return!0;
};
b.kd = function(a) {
  for (var c in this.ea) {
    if (!(c in a.ea)) {
      return!1;
    }
  }
  return!0;
};
b.remove = function(a) {
  a = g.g.fa.Nc(a);
  return a in this.ea ? (delete this.ea[a], !0) : !1;
};
b.Hb = function() {
  return g.e.L(this.T());
};
k.ia = {};
k.ia.ab = function() {
  return null != g.userAgent.Nb() && -1 != g.userAgent.Nb().indexOf("CrOS");
};
k.ia.mk = function() {
  var a = g.userAgent.Nb();
  if (!g.isString(a)) {
    return!1;
  }
  a = a.match(/Windows NT \d+.\d+/);
  if (g.Yb(a) || !g.isArray(a)) {
    return!1;
  }
  a = a[0];
  a = a.match(/\d+.\d+/);
  if (g.Yb(a) || !g.isArray(a)) {
    return!1;
  }
  a = a[0];
  return 6.2 <= parseFloat(a);
};
k.ia.oc = {wm:"ChromeOS", td:"Windows", Ic:"Mac", Hc:"Linux", OTHER:"Other"};
k.ia.Nu = function() {
  return k.ia.ab() ? k.ia.oc.wm : g.userAgent.td ? k.ia.oc.td : g.userAgent.Ic ? k.ia.oc.Ic : g.userAgent.Hc ? k.ia.oc.Hc : k.ia.oc.OTHER;
};
k.o = {};
k.o.Er = "Casting to {{receiverName}}";
k.o.Ir = "Cast this tab to...";
k.o.Jr = "Cast this tab (audio) to...";
k.o.Hr = "Cast screen/window to...";
k.o.Fr = "Cast {{v2AppDomain}} to...";
k.o.Gr = "Cast {{v2AppDomain}}";
k.o.Lr = "Cast this tab";
k.o.ss = "Stop casting";
k.o.Kr = "Cast {{v2AppDomain}}";
k.o.bs = "Bug or Error";
k.o.ds = "Feature Request";
k.o.fs = "Tab/Desktop Projection Quality";
k.o.cs = "Device Discovery";
k.o.es = "Other";
k.o.hs = "Freezes";
k.o.ls = "Jerky";
k.o.ps = "Occasional Stutter";
k.o.os = "Smooth";
k.o.ms = "Perfect";
k.o.Wr = "N/A";
k.o.qs = "Unwatchable";
k.o.ns = "Poor";
k.o.gs = "Acceptable";
k.o.js = "Good - DVD";
k.o.ks = "Great - HD";
k.o.Tr = "Unintelligible";
k.o.Sr = "Poor";
k.o.Pr = "Acceptable - FM";
k.o.Qr = "Good";
k.o.Rr = "Perfect";
k.o.Ur = "Do you want to discard the feedback?";
k.o.Zr = "Sending feedback...";
k.o.$r = "Unable to send feedback. Please try again later.";
k.o.as = "Thank you for sending feedback.";
k.o.Yr = "Failed to send feedback. Retrying (this is attempt #{{attemptNumber}})...";
k.o.Io = "Standard (480p)";
k.o.Go = "High (720p)";
k.o.Ho = "Extreme (720p high bitrate)";
k.o.rs = "Google Cast extension options";
k.o.Xr = "Google Cast feedback";
k.o.Nr = "The Google Cast extension enables you to find and play content on your Chromecast device from your Chrome browser.\nWhen on Cast optimized sites, you'll see new options that let you play video on your TV via Chromecast - using your computer as a remote to browse for videos and to control playback.\nYou can also cast any of your tabs in Chrome to your TV, letting you enjoy sites, photos, or even video from the best screen in your home. Note that this feature is still in beta, and requires a fast computer and Wi-Fi network.\nChromecast hardware is required to use this extension. To find out more, visit http://google.com/chromecast.\nBy installing this item, you agree to the Google Terms of Service and Privacy Policy at https://www.google.com/intl/en/policies/.";
k.o.Cr = "The Google Cast extension enables you to find and play content on your Chromecast device from your Chrome browser.\nThis is the *BETA* channel of the Google Cast extension.  It is intended for developers and advanced users who want early access to upcoming APIs and features in advance of public release.  Most users should install the stable Google Cast extension (https://chrome.google.com/webstore/detail/google-cast/boadgeojelhgndaghljhdicfkmllpafd). The beta channel will often be less stable and contain more bugs.\nBy installing this item, you agree to the Google Terms of Service and Privacy Policy at https://www.google.com/intl/en/policies/.";
k.o.Or = "Send content to your Chromecast and other devices that support Google Cast.";
k.o.Mr = "Enter Hangout name";
k.o.Dr = "Casting...";
k.o.Vr = "Your Chrome version, operating system version, Cast extension options, mirroring performance stats, and communication channel diagnostic logs will be submitted in addition to any information you choose to include above. This feedback is used to diagnose problems and help improve the extension. Any personal information you submit, whether explicitly or incidentally will be protected in accordance with our privacy policies. By submitting this feedback, you agree that Google may use feedback that you provide to improve any Google product or service.";
k.o.zr = "Casting to Hangouts has been disabled. Only @google.com supported at this time";
k.o.Br = "Casting to Hangouts setup has timed out.  See go/castouts-dogfood#TOC-Known-Issues";
k.o.Ar = "Casting to Hangouts has been succesfully initialized!";
g.userAgent.product = {};
g.userAgent.product.Ei = !1;
g.userAgent.product.Ci = !1;
g.userAgent.product.wc = !1;
g.userAgent.product.vc = !1;
g.userAgent.product.uc = !1;
g.userAgent.product.Di = !1;
g.userAgent.product.Ii = !1;
g.userAgent.product.lb = g.userAgent.Ye || g.userAgent.$e || g.userAgent.product.Ei || g.userAgent.product.Ci || g.userAgent.product.wc || g.userAgent.product.vc || g.userAgent.product.uc || g.userAgent.product.Di || g.userAgent.product.Ii;
g.userAgent.product.Rc = function() {
  g.userAgent.product.Th = !1;
  g.userAgent.product.Rh = !1;
  g.userAgent.product.Vh = !1;
  g.userAgent.product.Uh = !1;
  g.userAgent.product.Qh = !1;
  g.userAgent.product.Sh = !1;
  g.userAgent.product.Wh = !1;
  var a = g.userAgent.Nb();
  a && (-1 != a.indexOf("Firefox") ? g.userAgent.product.Th = !0 : -1 != a.indexOf("Camino") ? g.userAgent.product.Rh = !0 : -1 != a.indexOf("iPad") ? g.userAgent.product.Uh = !0 : -1 != a.indexOf("iPhone") || -1 != a.indexOf("iPod") ? g.userAgent.product.Vh = !0 : -1 != a.indexOf("Chrome") ? g.userAgent.product.Sh = !0 : -1 != a.indexOf("Android") ? g.userAgent.product.Qh = !0 : -1 != a.indexOf("Safari") && (g.userAgent.product.Wh = !0));
};
g.userAgent.product.lb || g.userAgent.product.Rc();
g.userAgent.product.kc = g.userAgent.kc;
g.userAgent.product.vb = g.userAgent.vb;
g.userAgent.product.Mm = g.userAgent.product.lb ? g.userAgent.product.Ei : g.userAgent.product.Th;
g.userAgent.product.Lm = g.userAgent.product.lb ? g.userAgent.product.Ci : g.userAgent.product.Rh;
g.userAgent.product.wh = g.userAgent.product.lb ? g.userAgent.product.wc : g.userAgent.product.Vh;
g.userAgent.product.vh = g.userAgent.product.lb ? g.userAgent.product.vc : g.userAgent.product.Uh;
g.userAgent.product.ANDROID = g.userAgent.product.lb ? g.userAgent.product.uc : g.userAgent.product.Qh;
g.userAgent.product.CHROME = g.userAgent.product.lb ? g.userAgent.product.Di : g.userAgent.product.Sh;
g.userAgent.product.xh = g.userAgent.product.lb ? g.userAgent.product.Ii : g.userAgent.product.Wh;
g.userAgent.product.ef = function() {
  if (g.userAgent.product.Mm) {
    return g.userAgent.product.Pb(/Firefox\/([0-9.]+)/);
  }
  if (g.userAgent.product.vb || g.userAgent.product.kc) {
    return g.userAgent.VERSION;
  }
  if (g.userAgent.product.CHROME) {
    return g.userAgent.product.Pb(/Chrome\/([0-9.]+)/);
  }
  if (g.userAgent.product.xh) {
    return g.userAgent.product.Pb(/Version\/([0-9.]+)/);
  }
  if (g.userAgent.product.wh || g.userAgent.product.vh) {
    var a = g.userAgent.product.zh(/Version\/(\S+).*Mobile\/(\S+)/);
    if (a) {
      return a[1] + "." + a[2];
    }
  } else {
    if (g.userAgent.product.ANDROID) {
      return(a = g.userAgent.product.Pb(/Android\s+([0-9.]+)/)) ? a : g.userAgent.product.Pb(/Version\/([0-9.]+)/);
    }
    if (g.userAgent.product.Lm) {
      return g.userAgent.product.Pb(/Camino\/([0-9.]+)/);
    }
  }
  return "";
};
g.userAgent.product.Pb = function(a) {
  return(a = g.userAgent.product.zh(a)) ? a[1] : "";
};
g.userAgent.product.zh = function(a) {
  return a.exec(g.userAgent.Nb());
};
g.userAgent.product.VERSION = g.userAgent.product.ef();
g.userAgent.product.Sb = function(a) {
  return 0 <= g.b.Ab(g.userAgent.product.VERSION, a);
};
k.j = {};
k.j.bt = {kp:"webrtc", jq:"cast_streaming"};
k.j.xq = {Xs:"tab", zq:"desktop"};
k.j.lk = {kt:"VP8", ik:"CAST1", Qq:"H264", Js:"rtx"};
k.j.u = function() {
  this.audioBitrate = this.minHeight = this.minWidth = this.videoQuality = this.maxVideoBitrate = this.minVideoBitrate = -1;
  this.bufferedMode = k.j.u.hk.kk;
  this.bufferSizeMillis = k.j.u.jk;
  this.minCastLatencyMillis = this.maxCastLatencyMillis = k.j.u.jg;
  this.maxFrameRate = -1;
  this.pacerTargetBatchSize = 10;
  this.pacerMaxBatchSize = 20;
  this.dscpEnabled = g.userAgent.Ic || g.userAgent.Hc || k.ia.ab() || k.ia.mk();
  this.backgroundScanDisabled = this.mediaStreamingModeEnabled = !1;
  this.preferredVideoCodec = k.j.lk.ik;
  this.disableTDLS = !1;
  k.j.X.Vd && this.update(k.j.X.Vd.settings);
};
k.j.u.po = {enablePacing:!0, enableAudioTcp:!0, enableVideoTcp:!0, enableAudioNack:!0, useOpus:!0, videoBitrate:!0, zoomModeEnabled:!0};
k.j.u.Iq = !1;
k.j.u.hk = {Nd:"off", bq:"auto", kk:"on"};
k.j.u.Kl = 100;
k.j.u.Il = 1E4;
k.j.u.Jl = 56;
k.j.u.Hl = 128;
k.j.u.Ql = 100;
k.j.u.Pl = 100;
k.j.u.Ol = 1;
k.j.u.or = 1;
k.j.u.Aq = 30;
k.j.u.ht = k.j.Pi ? {"848x480":[848, 480], "1280x720":[1280, 720], "1920x1072":[1920, 1072]} : {"854x480":[854, 480], "1280x720":[1280, 720], "1920x1080":[1920, 1080]};
k.j.u.prototype.update = function(a) {
  for (var c in this) {
    g.isFunction(this[c]) || g.R(a[c]) && g.na(this[c]) == g.na(a[c]) && (this[c] = a[c]);
  }
};
k.j.u.prototype.isEqual = function(a) {
  for (var c in this) {
    if (!g.isFunction(this[c]) && this[c] !== a[c]) {
      return!1;
    }
  }
  return!0;
};
k.j.u.Mg = function(a) {
  return Math.min(k.j.u.Il, Math.max(k.j.u.Kl, a));
};
b = k.j.u.prototype;
b.fl = function(a) {
  g.isString(a) && (a = parseInt(a, 10));
  this.maxVideoBitrate = a = k.j.u.Mg(a);
  this.minVideoBitrate = Math.min(this.minVideoBitrate, this.maxVideoBitrate);
};
b.hl = function(a) {
  g.isString(a) && (a = parseInt(a, 10));
  this.minVideoBitrate = a = k.j.u.Mg(a);
  this.maxVideoBitrate = Math.max(this.maxVideoBitrate, this.minVideoBitrate);
};
b.jl = function(a) {
  g.isString(a) && (a = parseInt(a, 10));
  0 < a && (this.videoQuality = a);
};
b.dl = function(a) {
  g.isString(a) && (a = parseInt(a, 10));
  this.audioBitrate = Math.min(k.j.u.Hl, Math.max(k.j.u.Jl, a));
};
b.il = function(a) {
  g.isString(a) && (a = parseInt(a, 10));
  this.minWidth = Math.max(k.j.u.Ql, a);
};
b.gl = function(a) {
  g.isString(a) && (a = parseInt(a, 10));
  this.minHeight = Math.max(k.j.u.Pl, a);
};
b.el = function(a) {
  g.isString(a) && (a = Math.round(parseFloat(a)));
  isFinite(a) && (this.maxFrameRate = Math.max(k.j.u.Ol, a));
};
k.j.u.jk = 500;
k.j.u.jg = 400;
k.j.X = function(a, c, d, e, f, h, l, m, n) {
  this.id = a;
  this.name = c;
  this.settings = new k.j.u;
  this.settings.il(d);
  this.settings.gl(e);
  this.settings.el(f);
  this.settings.hl(h);
  this.settings.fl(l);
  this.settings.jl(m);
  this.settings.dl(n);
};
k.j.X.Mi = new k.j.X("high", k.o.Go, 1280, 720, 30, 2E3, 2500, 56, 128);
k.j.Pi = k.ia.ab() && g.userAgent.product.Sb("37");
k.j.X.Do = new k.j.X("low", k.o.Io, k.j.Pi ? 848 : 854, 480, 30, 750, 1500, 56, 128);
k.j.X.Bo = new k.j.X("highest", k.o.Ho, 1280, 720, 30, 4E3, 5E3, 56, 128);
k.j.X.Vd = k.j.X.Mi;
k.j.X.lj = [k.j.X.Bo, k.j.X.Mi, k.j.X.Do];
k.j.X.vq = "custom";
k.j.X.Pu = function(a) {
  return g.a.find(k.j.X.lj, function(c) {
    return c.id == a;
  });
};
k.er = {Oq:"fatal", ee:"warning", xs:"notification"};
k.fr = {Yp:"activity_error", CHANNEL_ERROR:"channel_error", kr:"launch_failure", Bq:"device_offline", iq:"bad_device", Rs:"session_quality_network", Qs:"session_quality_encoding", gr:"known_issue_bad_intel_cpu", oq:"chrome_too_old_for_v2", dt:"unable_to_cast_streaming", pr:"low_perf_on_current_chrome", mt:"window_resize_unsupported", Sq:"hangout_invalid", Rq:"hangout_error"};
k.popup = {};
k.popup.Os = {Zp:"act_on_issue", Ws:"stop_activity", Ds:"play_media", As:"pause_media", Ts:"set_mute", CAST_THIS_TAB:"cast_this_tab", kq:"cast_this_tab_audio", CREATE_SESSION:"create_session", ir:"launch_desktop_mirror", INIT:"init", et:"update_settings", Is:"remove_receiver", Xq:"initialize_castouts", lt:"warn_resize"};
k.popup.Mq = {yr:"model_update"};
k.popup.fq = {ft:"v1_app", gt:"v2_app", uq:"custom_app", wr:"mirror_tab", vr:"mirror_screen"};
k.popup.Message = function(a, c) {
  this.type = a;
  this.message = c;
};
k.popup.dq = function(a, c, d, e, f, h, l, m) {
  this.id = a;
  this.receiver = g.object.clone(c);
  this.activityType = d;
  this.iconUrl = e || null;
  this.title = f || "";
  this.mediaPlayerStatus = h || null;
  this.tabId = l || null;
  this.isLocal = m;
  this.allowStop = !0;
};
k.popup.ac = {CAST:"cast", DIAL:"dial", HANGOUT:"hangout", CUSTOM:"custom"};
k.popup.Ia = function(a, c, d, e) {
  this.id = a;
  this.uniqueId = c;
  this.name = d;
  this.receiverType = e;
  this.isInLaunch = this.manuallyAdded = !1;
  this.muted = null;
};
k.popup.dr = function(a, c, d, e, f, h, l, m) {
  this.id = a;
  this.title = c;
  this.message = d;
  this.defaultActionText = e;
  this.optActionText = f || "";
  this.severity = h;
  this.activityId = l;
  this.isBlocking = m;
};
k.popup.Ks = function(a, c) {
  this.receiver = a;
  this.activity = c;
};
k.popup.cq = function(a, c) {
  this.id = a;
  this.isDefaultAction = c;
};
k.popup.va = function(a, c, d, e, f, h, l) {
  this.statsCollectNotificationDismissed = g.eb(d) ? d : !0;
  this.sendUsageEnabled = g.eb(e) ? e : !0;
  this.castAppNotificationDismissed = g.eb(a) ? a : !1;
  this.mirrorQualityId = c || k.j.X.Vd.id;
  this.hangoutsEnabled = f || !1;
  this.hangoutsInitialized = h || !1;
  this.hangoutsDefaultDomain = l || "";
};
k.popup.vs = function(a, c, d, e, f, h, l) {
  this.receiverActs = a || [];
  this.issue = c;
  this.isV1AppInTab = h || !1;
  this.isV2AppInTab = !!l;
  this.v2AppDomain = l || null;
  this.currentActivity = d;
  this.desktopActivity = e;
  this.settings = f || new k.popup.va;
};
k.popup.ts = function() {
  this.playerState = chrome.cast.media.mc.IDLE;
  this.muted = null;
  this.supportedCommands = [chrome.cast.media.wi.PAUSE];
};
k.Vq = function() {
};
k.j.Ko = function(a) {
  this.deviceId = a;
  this.avgNetworkLatency = null;
};
k.j.Ko.prototype.update = function(a) {
  g.R(a.deviceId) && (this.deviceId = a.deviceId);
  g.R(a.avgNetworkLatency) && (this.avgNetworkLatency = a.avgNetworkLatency);
};
k.Config = {};
k.Config.ur = 39;
k.Config.qo = "30.0.1584.0";
k.Config.Jn = "dliochdbjfkdbacpmhlcpmleaejidimm";
k.Config.Ph = "boadgeojelhgndaghljhdicfkmllpafd";
k.Config.getId = function() {
  return g.la(chrome.runtime) ? chrome.runtime.id : k.Config.Ph;
};
k.Config.Ue = !0;
k.Config.Qp = function() {
  var a = k.Config.getId() === k.Config.Jn, c = k.Config.getId() === k.Config.Ph;
  if (!k.Config.Ue && !a && !c) {
    switch(localStorage["test.extChannel"]) {
      case "stable":
        a = !1;
        c = !0;
        break;
      case "beta":
        a = !0;
        c = !1;
        break;
      default:
        c = a = !1;
    }
  }
  k.Config.mi = a;
  k.Config.ni = c;
};
k.Config.Qp();
k.Config.xv = g.userAgent.product.Sb(35);
k.Config.Qv = "undefined" != typeof chrome && !!chrome.networkingPrivate && !!chrome.networkingPrivate.setWifiTDLSEnabledState && k.ia.ab();
k.Config.ov = !!chrome.cast && !!chrome.cast.streaming && g.userAgent.product.Sb(36);
k.Config.rv = k.ia.ab() && g.userAgent.product.Sb(k.Config.qo) || g.userAgent.td && g.userAgent.product.Sb(31);
k.Config.vp = function() {
  return 1 < k.Config.Ue + k.Config.mi + k.Config.ni ? null : k.Config.Ue ? "internal" : k.Config.mi ? "beta" : k.Config.ni ? "stable" : "staging";
};
g.i("getCastExtensionChannel", k.Config.vp);
k.br = function() {
};
k.j.om = "0F5096E8";
k.j.Ev = function(a) {
  return a == k.j.om || a == chrome.cast.dh;
};
g.debug.Z = {};
g.debug.Lq = function() {
};
g.debug.Z.Ob = [];
g.debug.Z.ye = [];
g.debug.Z.Lh = !1;
g.debug.Z.register = function(a) {
  g.debug.Z.Ob[g.debug.Z.Ob.length] = a;
  if (g.debug.Z.Lh) {
    for (var c = g.debug.Z.ye, d = 0;d < c.length;d++) {
      a(g.bind(c[d].wrap, c[d]));
    }
  }
};
g.debug.Z.cw = function(a) {
  g.debug.Z.Lh = !0;
  for (var c = g.bind(a.wrap, a), d = 0;d < g.debug.Z.Ob.length;d++) {
    g.debug.Z.Ob[d](c);
  }
  g.debug.Z.ye.push(a);
};
g.debug.Z.fx = function(a) {
  var c = g.debug.Z.ye;
  a = g.bind(a.H, a);
  for (var d = 0;d < g.debug.Z.Ob.length;d++) {
    g.debug.Z.Ob[d](a);
  }
  c.length--;
};
g.async = {};
g.async.oi = function(a) {
  g.global.setTimeout(function() {
    throw a;
  }, 0);
};
g.async.Qa = function(a, c, d) {
  var e = a;
  c && (e = g.bind(a, c));
  e = g.async.Qa.ii(e);
  !g.isFunction(g.global.setImmediate) || !d && g.global.Window && g.global.Window.prototype.setImmediate == g.global.setImmediate ? (g.async.Qa.li || (g.async.Qa.li = g.async.Qa.En()), g.async.Qa.li(e)) : g.global.setImmediate(e);
};
g.async.Qa.En = function() {
  var a = g.global.MessageChannel;
  "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && (a = function() {
    var a = document.createElement("iframe");
    a.style.display = "none";
    a.src = "";
    document.documentElement.appendChild(a);
    var c = a.contentWindow, a = c.document;
    a.open();
    a.write("");
    a.close();
    var d = "callImmediate" + Math.random(), e = "file:" == c.location.protocol ? "*" : c.location.protocol + "//" + c.location.host, a = g.bind(function(a) {
      if (("*" == e || a.origin == e) && a.data == d) {
        this.port1.onmessage();
      }
    }, this);
    c.addEventListener("message", a, !1);
    this.port1 = {};
    this.port2 = {postMessage:function() {
      c.postMessage(d, e);
    }};
  });
  if ("undefined" !== typeof a && !g.d.userAgent.browser.Fd()) {
    var c = new a, d = {}, e = d;
    c.port1.onmessage = function() {
      if (g.la(d.next)) {
        d = d.next;
        var a = d.mg;
        d.mg = null;
        a();
      }
    };
    return function(a) {
      e.next = {mg:a};
      e = e.next;
      c.port2.postMessage(0);
    };
  }
  return "undefined" !== typeof document && "onreadystatechange" in document.createElement("script") ? function(a) {
    var c = document.createElement("script");
    c.onreadystatechange = function() {
      c.onreadystatechange = null;
      c.parentNode.removeChild(c);
      c = null;
      a();
      a = null;
    };
    document.documentElement.appendChild(c);
  } : function(a) {
    g.global.setTimeout(a, 0);
  };
};
g.async.Qa.ii = g.G.identity;
g.debug.Z.register(function(a) {
  g.async.Qa.ii = a;
});
g.kb = {};
g.kb.xb = {};
g.kb.xb.Se = [];
g.kb.xb.Lw = function() {
  for (var a = g.kb.xb.Se, c = 0;c < a.length;c++) {
    g.kb.xb.Se[c]();
  }
};
g.kb.xb.Up = function(a) {
  g.kb.xb.Se.push(a);
};
g.async.run = function(a, c) {
  g.async.run.xd || g.async.run.Cn();
  g.async.run.yd || (g.async.run.xd(), g.async.run.yd = !0);
  g.async.run.sc.push(new g.async.run.yn(a, c));
};
g.async.run.Cn = function() {
  if (g.global.Promise && g.global.Promise.resolve) {
    var a = g.global.Promise.resolve();
    g.async.run.xd = function() {
      a.then(g.async.run.Te);
    };
  } else {
    g.async.run.xd = function() {
      g.async.Qa(g.async.run.Te);
    };
  }
};
g.async.run.Hu = function() {
  g.async.run.xd = function() {
    g.async.Qa(g.async.run.Te);
  };
};
g.async.run.yd = !1;
g.async.run.sc = [];
g.ha && (g.async.run.Np = function() {
  g.async.run.yd = !1;
  g.async.run.sc = [];
}, g.kb.xb.Up(g.async.run.Np));
g.async.run.Te = function() {
  for (;g.async.run.sc.length;) {
    var a = g.async.run.sc;
    g.async.run.sc = [];
    for (var c = 0;c < a.length;c++) {
      var d = a[c];
      try {
        d.Kn.call(d.scope);
      } catch (e) {
        g.async.oi(e);
      }
    }
  }
  g.async.run.yd = !1;
};
g.async.run.yn = function(a, c) {
  this.Kn = a;
  this.scope = c;
};
g.promise = {};
g.promise.Ps = function() {
};
g.Thenable = function() {
};
g.Thenable.prototype.then = function() {
};
g.Thenable.Nh = "$goog_Thenable";
g.Thenable.Qi = function(a) {
  g.w(a.prototype, "then", a.prototype.then);
  a.prototype[g.Thenable.Nh] = !0;
};
g.Thenable.Ml = function(a) {
  if (!a) {
    return!1;
  }
  try {
    return!!a[g.Thenable.Nh];
  } catch (c) {
    return!1;
  }
};
g.Promise = function(a, c) {
  this.U = g.Promise.K.Ja;
  this.Od = void 0;
  this.wa = this.Ga = null;
  this.Wd = !1;
  0 < g.Promise.qb ? this.Mc = 0 : 0 == g.Promise.qb && (this.Lc = !1);
  g.Promise.cc && (this.Zd = [], this.ig(Error("created")), this.bg = 0);
  try {
    var d = this;
    a.call(c, function(a) {
      d.Ka(g.Promise.K.Ec, a);
    }, function(a) {
      if (g.ha && !(a instanceof g.Promise.Eb)) {
        try {
          if (a instanceof Error) {
            throw a;
          }
          throw Error("Promise rejected.");
        } catch (c) {
        }
      }
      d.Ka(g.Promise.K.Ma, a);
    });
  } catch (e) {
    this.Ka(g.Promise.K.Ma, e);
  }
};
g.Promise.cc = !1;
g.Promise.qb = 0;
g.Promise.K = {Ja:0, Hg:1, Ec:2, Ma:3};
g.Promise.resolve = function(a) {
  return new g.Promise(function(c) {
    c(a);
  });
};
g.Promise.reject = function(a) {
  return new g.Promise(function(c, d) {
    d(a);
  });
};
g.Promise.race = function(a) {
  return new g.Promise(function(c, d) {
    a.length || c(void 0);
    for (var e = 0, f;f = a[e];e++) {
      f.then(c, d);
    }
  });
};
g.Promise.all = function(a) {
  return new g.Promise(function(c, d) {
    var e = a.length, f = [];
    if (e) {
      for (var h = function(a, d) {
        e--;
        f[a] = d;
        0 == e && c(f);
      }, l = function(a) {
        d(a);
      }, m = 0, n;n = a[m];m++) {
        n.then(g.Xb(h, m), l);
      }
    } else {
      c(f);
    }
  });
};
g.Promise.Gu = function(a) {
  return new g.Promise(function(c, d) {
    var e = a.length, f = [];
    if (e) {
      for (var h = function(a) {
        c(a);
      }, l = function(a, c) {
        e--;
        f[a] = c;
        0 == e && d(f);
      }, m = 0, n;n = a[m];m++) {
        n.then(h, g.Xb(l, m));
      }
    } else {
      c(void 0);
    }
  });
};
g.Promise.lx = function() {
  var a, c, d = new g.Promise(function(d, f) {
    a = d;
    c = f;
  });
  return new g.Promise.So(d, a, c);
};
g.Promise.prototype.then = function(a, c, d) {
  g.Promise.cc && this.ig(Error("then"));
  return this.Tn(g.isFunction(a) ? a : null, g.isFunction(c) ? c : null, d);
};
g.Thenable.Qi(g.Promise);
b = g.Promise.prototype;
b.cancel = function(a) {
  this.U == g.Promise.K.Ja && g.async.run(function() {
    var c = new g.Promise.Eb(a);
    this.Lg(c);
  }, this);
};
b.Lg = function(a) {
  this.U == g.Promise.K.Ja && (this.Ga ? this.Ga.Ul(this, a) : this.Ka(g.Promise.K.Ma, a));
};
b.Ul = function(a, c) {
  if (this.wa) {
    for (var d = 0, e = -1, f = 0, h;h = this.wa[f];f++) {
      if (h = h.fc) {
        if (d++, h == a && (e = f), 0 <= e && 1 < d) {
          break;
        }
      }
    }
    0 <= e && (this.U == g.Promise.K.Ja && 1 == d ? this.Lg(c) : (d = this.wa.splice(e, 1)[0], this.Fg(d, g.Promise.K.Ma, c)));
  }
};
b.xm = function(a) {
  this.wa && this.wa.length || this.U != g.Promise.K.Ec && this.U != g.Promise.K.Ma || this.Cg();
  this.wa || (this.wa = []);
  this.wa.push(a);
};
b.Tn = function(a, c, d) {
  var e = {fc:null, Sg:null, Tg:null};
  e.fc = new g.Promise(function(f, h) {
    e.Sg = a ? function(c) {
      try {
        var e = a.call(d, c);
        f(e);
      } catch (n) {
        h(n);
      }
    } : f;
    e.Tg = c ? function(a) {
      try {
        var e = c.call(d, a);
        !g.la(e) && a instanceof g.Promise.Eb ? h(a) : f(e);
      } catch (n) {
        h(n);
      }
    } : h;
  });
  e.fc.Ga = this;
  this.xm(e);
  return e.fc;
};
b.Jg = function(a) {
  this.U = g.Promise.K.Ja;
  this.Ka(g.Promise.K.Ec, a);
};
b.Kg = function(a) {
  this.U = g.Promise.K.Ja;
  this.Ka(g.Promise.K.Ma, a);
};
b.Ka = function(a, c) {
  if (this.U == g.Promise.K.Ja) {
    if (this == c) {
      a = g.Promise.K.Ma, c = new TypeError("Promise cannot resolve to itself");
    } else {
      if (g.Thenable.Ml(c)) {
        this.U = g.Promise.K.Hg;
        c.then(this.Jg, this.Kg, this);
        return;
      }
      if (g.isObject(c)) {
        try {
          var d = c.then;
          if (g.isFunction(d)) {
            this.Nl(c, d);
            return;
          }
        } catch (e) {
          a = g.Promise.K.Ma, c = e;
        }
      }
    }
    this.Od = c;
    this.U = a;
    this.Cg();
    a != g.Promise.K.Ma || c instanceof g.Promise.Eb || g.Promise.Ll(this, c);
  }
};
b.Nl = function(a, c) {
  this.U = g.Promise.K.Hg;
  var d = this, e = !1, f = function(a) {
    e || (e = !0, d.Jg(a));
  }, h = function(a) {
    e || (e = !0, d.Kg(a));
  };
  try {
    c.call(a, f, h);
  } catch (l) {
    h(l);
  }
};
b.Cg = function() {
  this.Wd || (this.Wd = !0, g.async.run(this.eo, this));
};
b.eo = function() {
  for (;this.wa && this.wa.length;) {
    var a = this.wa;
    this.wa = [];
    for (var c = 0;c < a.length;c++) {
      g.Promise.cc && this.bg++, this.Fg(a[c], this.U, this.Od);
    }
  }
  this.Wd = !1;
};
b.Fg = function(a, c, d) {
  c == g.Promise.K.Ec ? a.Sg(d) : (a.fc && this.Fm(), a.Tg(d));
};
b.ig = function(a) {
  if (g.Promise.cc && g.isString(a.stack)) {
    var c = a.stack.split("\n", 4)[3];
    a = a.message;
    a += Array(11 - a.length).join(" ");
    this.Zd.push(a + c);
  }
};
b.bi = function(a) {
  if (g.Promise.cc && a && g.isString(a.stack) && this.Zd.length) {
    for (var c = ["Promise trace:"], d = this;d;d = d.Ga) {
      for (var e = this.bg;0 <= e;e--) {
        c.push(d.Zd[e]);
      }
      c.push("Value: [" + (d.U == g.Promise.K.Ma ? "REJECTED" : "FULFILLED") + "] <" + String(d.Od) + ">");
    }
    a.stack += "\n\n" + c.join("\n");
  }
};
b.Fm = function() {
  if (0 < g.Promise.qb) {
    for (var a = this;a && a.Mc;a = a.Ga) {
      g.global.clearTimeout(a.Mc), a.Mc = 0;
    }
  } else {
    if (0 == g.Promise.qb) {
      for (a = this;a && a.Lc;a = a.Ga) {
        a.Lc = !1;
      }
    }
  }
};
g.Promise.Ll = function(a, c) {
  0 < g.Promise.qb ? a.Mc = g.global.setTimeout(function() {
    a.bi(c);
    g.Promise.Re.call(null, c);
  }, g.Promise.qb) : 0 == g.Promise.qb && (a.Lc = !0, g.async.run(function() {
    a.Lc && (a.bi(c), g.Promise.Re.call(null, c));
  }));
};
g.Promise.Re = g.async.oi;
g.Promise.Hw = function(a) {
  g.Promise.Re = a;
};
g.Promise.Eb = function(a) {
  g.debug.Error.call(this, a);
};
g.Ra(g.Promise.Eb, g.debug.Error);
g.Promise.Eb.prototype.name = "cancel";
g.Promise.So = function(a, c, d) {
  this.promise = a;
  this.resolve = c;
  this.reject = d;
};
g.result = {};
g.result.oa = function() {
};
g.result.oa.prototype.Jh = function() {
};
g.result.oa.sb = {Rg:"success", ERROR:"error", Ja:"pending"};
b = g.result.oa.prototype;
b.getState = function() {
};
b.Ih = function() {
};
b.getError = function() {
};
b.cancel = function() {
};
b.gd = function() {
};
g.result.oa.ze = function() {
};
g.Ra(g.result.oa.ze, Error);
g.result.ib = function() {
  this.U = g.result.oa.sb.Ja;
  this.Ha = [];
  this.ke = this.Gg = void 0;
};
g.Thenable.Qi(g.result.ib);
g.result.ib.oe = function() {
  g.debug.Error.call(this, "Multiple attempts to set the state of this Result");
};
g.Ra(g.result.ib.oe, g.debug.Error);
b = g.result.ib.prototype;
b.getState = function() {
  return this.U;
};
b.Ih = function() {
  return this.Gg;
};
b.getError = function() {
  return this.ke;
};
b.Jh = function(a, c) {
  this.fd() ? this.Ha.push({callback:a, scope:c || null}) : a.call(c, this);
};
b.On = function(a) {
  if (this.fd()) {
    this.Gg = a, this.U = g.result.oa.sb.Rg, this.Qg();
  } else {
    if (!this.gd()) {
      throw new g.result.ib.oe;
    }
  }
};
b.Gh = function(a) {
  if (this.fd()) {
    this.ke = a, this.U = g.result.oa.sb.ERROR, this.Qg();
  } else {
    if (!this.gd()) {
      throw new g.result.ib.oe;
    }
  }
};
b.Qg = function() {
  var a = this.Ha;
  this.Ha = [];
  for (var c = 0;c < a.length;c++) {
    var d = a[c];
    d.callback.call(d.scope, this);
  }
};
b.fd = function() {
  return this.U == g.result.oa.sb.Ja;
};
b.cancel = function() {
  return this.fd() ? (this.Gh(new g.result.oa.ze), !0) : !1;
};
b.gd = function() {
  return this.U == g.result.oa.sb.ERROR && this.ke instanceof g.result.oa.ze;
};
b.then = function(a, c, d) {
  var e, f, h = new g.Promise(function(a, c) {
    e = a;
    f = c;
  });
  this.Jh(function(a) {
    a.gd() ? h.cancel() : a.getState() == g.result.oa.sb.Rg ? e(a.Ih()) : a.getState() == g.result.oa.sb.ERROR && f(a.getError());
  });
  return h.then(a, c, d);
};
g.result.ib.Ju = function(a) {
  var c = new g.result.ib;
  a.then(c.On, c.Gh, c);
  return c;
};
k.Gj = function() {
  this.hasNetworkSoftware = this.networkDescription = this.gpu = this.cpu = this.googleUsername = null;
};
k.ga = {Ef:"receiverIdToken", Lj:"mirrorSettings", Qj:"userNotification", Pj:"siteTokens", Dj:"feedback", Ej:"fixedIps", Cj:"enableCloud", Aj:"cloudDevice", Ij:"hangoutsStatus", Hj:"hangoutsDefaultDomain", Oj:"sendStatsEnabled", Kj:"lastMirrorDataAutoSubmitTimeMillis", Mj:"mirrorPerformanceData", Nj:"oneOffChangeVersion"};
k.zs = function() {
};
k.No = function(a) {
  this.ob = a;
};
k.No.prototype.Bb = function() {
  return this.ob;
};
k.Zo = {};
k.Zo.mq = [];
k.Rj = function() {
  this.dismissClicks = this.earliestTimeToShowWarning = this.sessionsBeforeWarning = 0;
  this.enhancedCastingNotificationDismissed = this.statsCollectNotificationDismissed = this.intelBadCpuWarningDismissed = this.castAppNotificationDismissed = !1;
};
k.va = function() {
  this.aa = {};
  this.jn();
  this.uh = this.Km = this.Im = !1;
};
g.mp(k.va);
k.va.Jj = {Bj:"disabled", jb:"enabled", Wq:"initialized"};
k.va.wq = "ChromeCast";
k.va.qr = 20;
k.va.po = {useCastStreaming:!0, tabCaptureSettings:!0, appEngineReceiverIds:!0, receiverUrl:!0, flingEnabled:!0, customReceiverVersion:!0, enableCustomReceiverVersion:!0, sendUsageEnabled:!0, mirrorLinkProtection:!0, autoOptedInCastStreaming:!0};
k.va.prototype.jn = function() {
  this.aa[k.ga.Lj] = new k.j.u;
  this.aa[k.ga.Dj] = new k.Gj;
  this.aa[k.ga.Qj] = new k.Rj;
  this.aa[k.ga.Pj] = {};
  this.aa[k.ga.Oj] = !0;
  this.aa[k.ga.Ej] = [];
  this.aa[k.ga.Cj] = !1;
  this.aa[k.ga.Aj] = {};
  this.aa[k.ga.Ij] = k.va.Jj.Bj;
  this.aa[k.ga.Hj] = "";
  this.aa[k.ga.Kj] = 0;
  this.aa[k.ga.Mj] = [];
  this.aa[k.ga.Nj] = 0;
};
k.va.prototype.pj = function() {
  this.Im ? (g.log.info(this.ad, "Saving settings to storage."), this.Km ? (localStorage.settings = JSON.stringify(this.aa), this.uh && (chrome.storage.local.clear(), this.uh = !1)) : chrome.storage.local.set(this.aa, g.bind(function() {
    chrome.runtime.lastError ? g.log.vd(this.ad, "Failed to save settings to chrome.storage.") : g.log.info(this.ad, "Successfully saved settings to storage.");
  }, this))) : g.log.vd(this.ad, "Aborting saving settings before initialization.");
};
k.va.prototype.Tk = function() {
  var a = this.aa[k.ga.Ef];
  a || (a = g.b.oj(), this.aa[k.ga.Ef] = a, this.pj());
  return a;
};
g.k = {};
g.k.kl = function(a) {
  for (var c = [], d = 0, e = 0;e < a.length;e++) {
    for (var f = a.charCodeAt(e);255 < f;) {
      c[d++] = f & 255, f >>= 8;
    }
    c[d++] = f;
  }
  return c;
};
g.k.ll = function(a) {
  if (8192 > a.length) {
    return String.fromCharCode.apply(null, a);
  }
  for (var c = "", d = 0;d < a.length;d += 8192) {
    var e = g.a.slice(a, d, d + 8192), c = c + String.fromCharCode.apply(null, e)
  }
  return c;
};
g.k.Jt = function(a) {
  return g.a.map(a, function(a) {
    a = a.toString(16);
    return 1 < a.length ? a : "0" + a;
  }).join("");
};
g.k.fv = function(a) {
  for (var c = [], d = 0;d < a.length;d += 2) {
    c.push(parseInt(a.substring(d, d + 2), 16));
  }
  return c;
};
g.k.Sw = function(a) {
  a = a.replace(/\r\n/g, "\n");
  for (var c = [], d = 0, e = 0;e < a.length;e++) {
    var f = a.charCodeAt(e);
    128 > f ? c[d++] = f : (2048 > f ? c[d++] = f >> 6 | 192 : (c[d++] = f >> 12 | 224, c[d++] = f >> 6 & 63 | 128), c[d++] = f & 63 | 128);
  }
  return c;
};
g.k.kx = function(a) {
  for (var c = [], d = 0, e = 0;d < a.length;) {
    var f = a[d++];
    if (128 > f) {
      c[e++] = String.fromCharCode(f);
    } else {
      if (191 < f && 224 > f) {
        var h = a[d++];
        c[e++] = String.fromCharCode((f & 31) << 6 | h & 63);
      } else {
        var h = a[d++], l = a[d++];
        c[e++] = String.fromCharCode((f & 15) << 12 | (h & 63) << 6 | l & 63);
      }
    }
  }
  return c.join("");
};
g.k.px = function(a, c) {
  for (var d = [], e = 0;e < a.length;e++) {
    d.push(a[e] ^ c[e]);
  }
  return d;
};
g.k.p = {};
g.k.p.dc = null;
g.k.p.Uc = null;
g.k.p.Oc = null;
g.k.p.Tc = null;
g.k.p.ge = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
g.k.p.fe = g.k.p.ge + "+/=";
g.k.p.sg = g.k.p.ge + "-_.";
g.k.p.Ag = g.userAgent.Mh || g.userAgent.$b || g.userAgent.kc || "function" == typeof g.global.atob;
g.k.p.tg = function(a, c) {
  if (!g.S(a)) {
    throw Error("encodeByteArray takes an array as a parameter");
  }
  g.k.p.Rc();
  for (var d = c ? g.k.p.Oc : g.k.p.dc, e = [], f = 0;f < a.length;f += 3) {
    var h = a[f], l = f + 1 < a.length, m = l ? a[f + 1] : 0, n = f + 2 < a.length, p = n ? a[f + 2] : 0, q = h >> 2, h = (h & 3) << 4 | m >> 4, m = (m & 15) << 2 | p >> 6, p = p & 63;
    n || (p = 64, l || (m = 64));
    e.push(d[q], d[h], d[m], d[p]);
  }
  return e.join("");
};
g.k.p.su = function(a, c) {
  return g.k.p.Ag && !c ? g.global.btoa(a) : g.k.p.tg(g.k.kl(a), c);
};
g.k.p.mu = function(a, c) {
  return g.k.p.Ag && !c ? g.global.atob(a) : g.k.ll(g.k.p.ml(a, c));
};
g.k.p.ml = function(a, c) {
  g.k.p.Rc();
  for (var d = c ? g.k.p.Tc : g.k.p.Uc, e = [], f = 0;f < a.length;) {
    var h = d[a.charAt(f++)], l = f < a.length ? d[a.charAt(f)] : 0;
    ++f;
    var m = f < a.length ? d[a.charAt(f)] : 64;
    ++f;
    var n = f < a.length ? d[a.charAt(f)] : 64;
    ++f;
    if (null == h || null == l || null == m || null == n) {
      throw Error();
    }
    e.push(h << 2 | l >> 4);
    64 != m && (e.push(l << 4 & 240 | m >> 2), 64 != n && e.push(m << 6 & 192 | n));
  }
  return e;
};
g.k.p.Rc = function() {
  if (!g.k.p.dc) {
    g.k.p.dc = {};
    g.k.p.Uc = {};
    g.k.p.Oc = {};
    g.k.p.Tc = {};
    for (var a = 0;a < g.k.p.fe.length;a++) {
      g.k.p.dc[a] = g.k.p.fe.charAt(a), g.k.p.Uc[g.k.p.dc[a]] = a, g.k.p.Oc[a] = g.k.p.sg.charAt(a), g.k.p.Tc[g.k.p.Oc[a]] = a, a >= g.k.p.ge.length && (g.k.p.Uc[g.k.p.sg.charAt(a)] = a, g.k.p.Tc[g.k.p.fe.charAt(a)] = a);
    }
  }
};
g.k.Bg = function() {
  this.gb = -1;
};
g.k.Sha1 = function() {
  g.k.Bg.call(this);
  this.gb = 64;
  this.P = [];
  this.be = [];
  this.Yk = [];
  this.Yc = [];
  this.Yc[0] = 128;
  for (var a = 1;a < this.gb;++a) {
    this.Yc[a] = 0;
  }
  this.Sc = this.Kb = 0;
  this.reset();
};
g.Ra(g.k.Sha1, g.k.Bg);
g.k.Sha1.prototype.reset = function() {
  this.P[0] = 1732584193;
  this.P[1] = 4023233417;
  this.P[2] = 2562383102;
  this.P[3] = 271733878;
  this.P[4] = 3285377520;
  this.Sc = this.Kb = 0;
};
g.k.Sha1.prototype.md = function(a, c) {
  c || (c = 0);
  var d = this.Yk;
  if (g.isString(a)) {
    for (var e = 0;16 > e;e++) {
      d[e] = a.charCodeAt(c) << 24 | a.charCodeAt(c + 1) << 16 | a.charCodeAt(c + 2) << 8 | a.charCodeAt(c + 3), c += 4;
    }
  } else {
    for (e = 0;16 > e;e++) {
      d[e] = a[c] << 24 | a[c + 1] << 16 | a[c + 2] << 8 | a[c + 3], c += 4;
    }
  }
  for (e = 16;80 > e;e++) {
    var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
    d[e] = (f << 1 | f >>> 31) & 4294967295;
  }
  for (var h = this.P[0], l = this.P[1], m = this.P[2], n = this.P[3], p = this.P[4], q, e = 0;80 > e;e++) {
    40 > e ? 20 > e ? (f = n ^ l & (m ^ n), q = 1518500249) : (f = l ^ m ^ n, q = 1859775393) : 60 > e ? (f = l & m | n & (l | m), q = 2400959708) : (f = l ^ m ^ n, q = 3395469782), f = (h << 5 | h >>> 27) + f + p + q + d[e] & 4294967295, p = n, n = m, m = (l << 30 | l >>> 2) & 4294967295, l = h, h = f;
  }
  this.P[0] = this.P[0] + h & 4294967295;
  this.P[1] = this.P[1] + l & 4294967295;
  this.P[2] = this.P[2] + m & 4294967295;
  this.P[3] = this.P[3] + n & 4294967295;
  this.P[4] = this.P[4] + p & 4294967295;
};
g.k.Sha1.prototype.update = function(a, c) {
  if (null != a) {
    g.la(c) || (c = a.length);
    for (var d = c - this.gb, e = 0, f = this.be, h = this.Kb;e < c;) {
      if (0 == h) {
        for (;e <= d;) {
          this.md(a, e), e += this.gb;
        }
      }
      if (g.isString(a)) {
        for (;e < c;) {
          if (f[h] = a.charCodeAt(e), ++h, ++e, h == this.gb) {
            this.md(f);
            h = 0;
            break;
          }
        }
      } else {
        for (;e < c;) {
          if (f[h] = a[e], ++h, ++e, h == this.gb) {
            this.md(f);
            h = 0;
            break;
          }
        }
      }
    }
    this.Kb = h;
    this.Sc += c;
  }
};
g.k.Sha1.prototype.Sk = function() {
  var a = [], c = 8 * this.Sc;
  56 > this.Kb ? this.update(this.Yc, 56 - this.Kb) : this.update(this.Yc, this.gb - (this.Kb - 56));
  for (var d = this.gb - 1;56 <= d;d--) {
    this.be[d] = c & 255, c /= 256;
  }
  this.md(this.be);
  for (d = c = 0;5 > d;d++) {
    for (var e = 24;0 <= e;e -= 8) {
      a[c] = this.P[d] >> e & 255, ++c;
    }
  }
  return a;
};
k.sf = {};
k.sf.hj = function(a) {
  var c = k.va.Rd().Tk(), d = new g.k.Sha1;
  d.update(a);
  d.update(c);
  return "r" + g.k.p.tg(d.Sk(), !0);
};
k.Ia = function(a, c) {
  this.cj = g.b.truncate(a, k.Ia.fj);
  this.tf = c;
  this.jj = null;
  this.ij = k.sf.hj(c);
  new g.g.Map;
  new g.g.fa;
  this.gj = new g.g.fa;
};
k.Ia.fj = 200;
k.Ia.Gs = {CAST:"cast", DIAL:"dial", tr:"mesi", sq:"cloud"};
k.Ia.gq = {AVAILABLE:"available", UNAVAILABLE:"unavailable", ip:"unknown"};
k.Ia.Fq = {nq:"chromecast", ip:"unknown"};
b = k.Ia.prototype;
b.isLocal = function() {
  return!!this.jj;
};
b.Rn = function() {
  return k.Ve.Gd(this.cj) || "";
};
b.getId = function() {
  return this.ij;
};
b.isAvailable = function(a) {
  return this.gj.contains(a);
};
b.equals = function(a) {
  return this.tf == a.tf;
};
k.O = {};
k.O.Qd = "urn:x-cast:";
k.O.vj = 128;
k.O.Dm = function(a) {
  return a.length > k.O.Qd.length && g.b.wj(a, k.O.Qd) && a.length <= k.O.vj;
};
k.O.Rb = function(a) {
  return k.O.Qd + "com.google.cast." + a;
};
k.O.mo = {Zs:k.O.Rb("tp.connection"), $s:k.O.Rb("tp.heartbeat"), Hs:k.O.Rb("receiver"), rr:k.O.Rb("media"), sr:k.O.Rb("media.universalRemote.optIn"), kp:k.O.Rb("webrtc")};
k.O.xn = g.object.Si(k.O.mo);
k.O.Bm = function(a) {
  return k.O.xn.hasOwnProperty(a);
};
k.Oa = {};
k.Oa.Wu = function(a, c) {
  if (!c.applications || 1 != c.applications.length) {
    return null;
  }
  var d = k.Oa.An(a, c.applications[0]);
  d.receiver.volume = c.volume;
  g.eb(c.isActiveInput) && (d.receiver.isActiveInput = c.isActiveInput);
  return d;
};
k.Oa.An = function(a, c) {
  var d = k.Oa.vm(a), d = new chrome.cast.q(c.sessionId, c.appId, c.displayName, c.appImages, d);
  d.senderApps = c.senderApps;
  d.namespaces = c.namespaces || [];
  d.transportId = c.transportId;
  d.statusText = c.statusText;
  return d;
};
k.Oa.vm = function(a) {
  return new chrome.cast.Ia(a.getId(), a.Rn());
};
k.Oa.Nv = function(a, c) {
  if (a.statusText != c.statusText) {
    return!0;
  }
  for (var d = a.namespaces || [], e = c.namespaces || [], f = 0;f < d.length;f++) {
    if (!e.some(function(a) {
      return a.name == d[f].name;
    })) {
      return!0;
    }
  }
  return a.receiver.volume.level != c.receiver.volume.level || a.receiver.volume.muted != c.receiver.volume.muted ? !0 : !1;
};
k.Oa.ki = function(a) {
  g.isArray(a) ? a.forEach(k.Oa.ki) : g.isObject(a) && Object.keys(a).forEach(function(c) {
    g.Yb(a[c]) ? delete a[c] : k.Oa.ki(a[c]);
  });
};
k.Oa.bv = function(a, c) {
  return a.namespaces.some(function(a) {
    return a.name == c;
  });
};
k.yh = function(a, c) {
  this.type = k.M.ei;
  this.requestId = null;
  this.volume = a;
  this.expectedVolume = c || null;
};
k.Y = {};
k.Y.Tt = function(a) {
  return!a || !g.isString(a.sessionId) || !g.R(a.media) || g.R(a.autoplay) && !g.eb(a.autoplay) || g.R(a.currentTime) && !g.isNumber(a.currentTime) ? !1 : k.Y.ym(a.media);
};
k.Y.ym = function(a) {
  return!a || !g.isString(a.contentId) || 1E3 < a.contentId.length || !g.object.Fb(chrome.cast.media.Qe, a.streamType) || !g.isString(a.contentType) || g.R(a.duration) && !g.isNumber(a.duration) ? !1 : !0;
};
k.Y.$k = function(a) {
  return!!a && g.R(a.sessionId) && g.isString(a.namespaceName) && k.O.Dm(a.namespaceName) && !k.O.Bm(a.namespaceName);
};
k.Y.Tl = function(a) {
  return a && g.isFunction(a.sessionListener) && g.isFunction(a.receiverListener) ? k.Y.yg(a.sessionRequest) : !1;
};
k.Y.bl = function(a) {
  return a ? !g.a.find(a, function(a) {
    return!((a.receiverType == chrome.cast.ac.CUSTOM || a.receiverType == chrome.cast.ac.DIAL) && g.R(a.friendlyName) && 0 == a.capabilities.length && g.Yb(a.volume));
  }) : !1;
};
k.Y.yg = function(a) {
  return!a || !g.R(a.appId) || g.R(a.dialRequest) && (!g.isString(a.dialRequest.appName) || g.R(a.dialRequest.launchParameter) && !g.isString(a.dialRequest.launchParameter)) ? !1 : !0;
};
k.Y.Zk = function(a) {
  return a && g.R(a.volume) && k.Y.Ah(a.volume) ? g.R(a.expectedVolume) ? k.Y.Ah(a.expectedVolume) : !0 : !1;
};
k.Y.Ah = function(a) {
  return a ? g.R(a.level) ? g.isNumber(a.level) && 0 <= a.level && 1 >= a.level : g.eb(a.muted) : !1;
};
k.Y.St = function(a) {
  return!!a && g.eb(a.doLaunch) && (!g.R(a.launchParameter) || g.isString(a.launchParameter));
};
k.V = function(a, c, d) {
  this.kh = a;
  this.te = c;
  this.xe = g.isNumber(d) ? d : 0;
  this.od = !1;
  this.jc = null;
};
k.V.tm = 432E5;
k.V.prototype.sn = function() {
  return this.od;
};
k.V.prototype.Ka = function() {
  this.od = !0;
  this.te = this.kh = null;
  this.jc && (clearTimeout(this.jc), this.jc = null);
};
k.V.sh = function() {
};
k.V.prototype.jh = function() {
  var a = this.kh;
  this.Ka();
  return a || k.V.sh;
};
k.V.prototype.ih = function() {
  var a = this.te;
  this.Ka();
  return a || k.V.sh;
};
k.V.prototype.Dg = function(a, c) {
  if (!this.od && !this.jc) {
    var d = function() {
      if (!this.od) {
        a && a();
        var d = this.te;
        this.Ka();
        if (0 < this.xe) {
          var f = new chrome.cast.Error(chrome.cast.La.TIMEOUT);
          c && (f.description = c);
          d(f);
        }
      }
    }.bind(this);
    this.jc = setTimeout(d, 0 < this.xe ? this.xe : k.V.tm);
  }
};
k.cr = {};
k.ta = function(a, c, d, e, f, h) {
  this.type = a;
  this.message = c;
  this.seqNum = d || null;
  this.clientId = e || null;
  this.appOrigin = null;
  this.timeoutMillis = g.isNumber(f) ? f : 0;
  this.receiverId = h || null;
  this.receiverList = null;
};
k.F = {Eg:"iframe_init_result", rl:"fail_to_connect_to_extension", qq:"client_reconnect", Dc:"v2_message", Zf:"app_message", fm:"client_init", lm:"log_message", Qk:"request_session", mm:"request_session_by_id", Yl:"leave_session", pq:"client_disconnect", al:"set_custom_receivers", $g:"custom_dial_launch_response", $l:"set_receiver_display_status", Zl:"query_tab_broadcast_status", tl:"receiver_availability", sl:"receiver_action", wg:"new_session", xg:"update_session", ql:"disconnect_session", ul:"remove_session", 
$p:"app_message_success", lr:"leave_session_success", Vs:"set_receiver_volume_success", Ss:"set_custom_receivers_success", ERROR:"error", pl:"custom_dial_launch_request", Us:"set_receiver_display_status_success", Ys:"tab_broadcast_status"};
k.hd = function() {
  this.t = {};
};
b = k.hd.prototype;
b.add = function(a, c) {
  var d = this.t[a];
  if (d) {
    return-1 == d.indexOf(c) && d.push(c), !1;
  }
  this.t[a] = [c];
  return!0;
};
b.remove = function(a, c) {
  var d = this.t[a];
  if (!d) {
    return!1;
  }
  var e = d.indexOf(c);
  if (-1 == e) {
    return!1;
  }
  if (1 == d.length) {
    return delete this.t[a], !0;
  }
  d.splice(e, 1);
  return!1;
};
b.Kh = function(a) {
  if (!(a in this.t)) {
    return!1;
  }
  delete this.t[a];
  return!0;
};
b.Qm = function(a) {
  var c = !1;
  Object.keys(this.t).forEach(function(d) {
    0 == d.indexOf(a) && (delete this.t[d], c = !0);
  }, this);
  return c;
};
b.get = function(a) {
  return this.t[a] || [];
};
b.contains = function(a, c) {
  return-1 != this.get(a).indexOf(c);
};
k.us = function() {
  this.type = k.M.ue;
  this.requestId = null;
  this.status = [];
  this.customData = null;
  this.sessionId = "";
};
chrome.cast.lc = function(a, c) {
  this.Sn = a;
  this.qh = c;
  this.rh = null;
};
chrome.cast.lc.prototype.init = function() {
  window.addEventListener("message", this.Jp.bind(this), !1);
};
chrome.cast.lc.prototype.Yn = function(a) {
  this.rh = a;
};
chrome.cast.lc.prototype.Jp = function(a) {
  a.source != window && a.origin == this.qh && (a = a.data, a.type == k.F.Eg && (this.Cm = !a.message), this.rh(a));
};
chrome.cast.lc.prototype.pe = function(a) {
  this.Cm && this.Sn.contentWindow.postMessage(a, this.qh);
};
k.Pg = function() {
  this.Mb = {};
  this.sd = {};
};
b = k.Pg.prototype;
b.Rm = function(a, c) {
  var d = this.Mb[a];
  return d ? (d.status = c, d.media.forEach(function(a) {
    delete this.sd[this.Ae(a)];
  }, this), delete this.Mb[a], !0) : !1;
};
b.Vm = function(a) {
  delete this.sd[this.Ae(a)];
  var c = this.Mb[a.sessionId];
  c && (a = c.media.indexOf(a), -1 != a && c.media.splice(a, 1));
};
b.bo = function(a) {
  if (a.sessionId == chrome.cast.q.hh) {
    return a;
  }
  var c = this.Mb[a.sessionId];
  if (c) {
    return c.statusText = a.statusText, c.namespaces = a.namespaces || [], c.receiver.volume = a.receiver.volume, c;
  }
  var c = new chrome.cast.q(a.sessionId, a.appId, a.displayName, a.appImages, a.receiver), d;
  for (d in a) {
    "media" == d ? c.media = a.media.map(function(a) {
      a = this.Zg(a);
      a.he = !1;
      a.Xc = !0;
      return a;
    }.bind(this)) : a.hasOwnProperty(d) && (c[d] = a[d]);
  }
  return this.Mb[a.sessionId] = c;
};
b.Zg = function(a) {
  var c = this.Ae(a), d = this.sd[c];
  d || (d = new chrome.cast.media.s(a.sessionId, a.mediaSessionId), this.sd[c] = d, (c = this.Mb[a.sessionId]) && c.media.push(d));
  for (var e in a) {
    a.hasOwnProperty(e) && ("volume" == e ? (d.volume.level = a.volume.level, d.volume.muted = a.volume.muted) : d[e] = a[e]);
  }
  "currentTime" in a && (d.qe = g.now());
  return d;
};
b.Ae = function(a) {
  return a.sessionId + "#" + a.mediaSessionId;
};
chrome.cast.ya = function(a) {
  this.Sl = 1E3 * Math.floor(1E5 * Math.random());
  this.Qc = a;
  this.Lb = {};
  this.Cc = !1;
  this.Jb = this.ma = this.$d = null;
  this.cd = new k.hd;
  this.Wc = new k.hd;
  this.gc = new k.hd;
  this.jd = [];
  this.Vc = new k.Pg(this.ad);
  this.Of = !1;
};
b = chrome.cast.ya.prototype;
b.init = function() {
  this.Qc.Yn(this.Xn.bind(this));
};
b.rn = function() {
  return "a" + this.Sl++;
};
b.vl = function(a) {
  var c = a.seqNum;
  if (!c) {
    return!1;
  }
  var d = this.Lb[c];
  if (d) {
    var e = a.message;
    a.type == k.F.ERROR ? d.ih()(a.message) : d.jh()(e);
    delete this.Lb[c];
  }
  return!!d;
};
b.wl = function(a) {
  switch(a.type) {
    case k.F.wg:
    ;
    case k.F.xg:
      a.message = this.im(a.message);
      break;
    case k.F.Dc:
      a = a.message, a.type == k.M.ue && a.status && (a.status = a.status.map(this.hm.bind(this)));
  }
};
b.im = function(a) {
  return this.Vc.bo(a);
};
b.Xn = function(a) {
  this.wl(a);
  if (!this.vl(a)) {
    switch(a.type) {
      case k.F.Eg:
        this.xl(a);
        break;
      case k.F.tl:
        this.El(a);
        break;
      case k.F.sl:
        this.Dl(a);
        break;
      case k.F.rl:
        this.Of = !0;
        break;
      case k.F.wg:
        this.Cl(a);
        break;
      case k.F.xg:
        this.Gl(a);
        break;
      case k.F.ql:
        this.zl(a);
        break;
      case k.F.ul:
        this.Fl(a);
        break;
      case k.F.Zf:
        this.Al(a.message);
        break;
      case k.F.Dc:
        this.Bl(a);
        break;
      case k.F.pl:
        this.yl(a);
    }
  }
};
b.yl = function(a) {
  var c = a.message;
  this.ma && this.ma.customDialLaunchCallback && this.ma.customDialLaunchCallback(c).then(g.bind(function(c) {
    this.Qc.pe(new k.ta(k.F.$g, c, a.seqNum));
  }, this), g.bind(function() {
    this.Qc.pe(new k.ta(k.F.$g, null, a.seqNum));
  }, this));
};
b.Bl = function(a) {
  switch(a.message.type) {
    case k.M.ue:
      this.mn(a.message);
  }
};
b.mn = function(a) {
  a.status.forEach(this.Ai.bind(this));
};
b.Cl = function(a) {
  this.ma && this.ma.sessionListener(a.message);
};
b.Gl = function(a) {
  (a = a.message) && this.gc.get(a.sessionId).forEach(function(a) {
    a(!0);
  });
};
b.zl = function(a) {
  this.vi(a.message, chrome.cast.rc.DISCONNECTED);
};
b.Fl = function(a) {
  this.vi(a.message, chrome.cast.rc.STOPPED);
};
b.vi = function(a, c) {
  var d = c != chrome.cast.rc.STOPPED;
  this.Vc.Rm(a, c) && (this.cd.Qm(a + "#"), this.Wc.Kh(a), this.gc.get(a).forEach(function(a) {
    a(d);
  }), this.gc.Kh(a));
};
b.Al = function(a) {
  this.tp(a.sessionId, a.namespaceName).forEach(function(c) {
    c(a.namespaceName, a.message);
  });
};
b.El = function(a) {
  if (this.ma) {
    var c = a.message;
    a.receiverList ? this.ma.receiverListener.apply(null, [c, a.receiverList]) : this.ma.receiverListener(c);
  }
};
b.Dl = function(a) {
  this.jd.forEach(function(c) {
    c(a.message.receiver, a.message.receiverAction);
  }, this);
};
b.xl = function(a) {
  (a = a.message) ? (this.$d = a, this.Jb && this.Jb.ih()(a)) : (this.Cc = !0, this.Ng(), this.Jb && this.Jb.jh()(void 0));
};
b.Oe = function(a, c, d) {
  this.Na(d) && (a = a || [], k.Y.bl(a) ? this.Ba(new k.ta(k.F.al, a), new k.V(c, d)) : d && d(new chrome.cast.Error(chrome.cast.La.INVALID_PARAMETER)));
};
chrome.cast.ya.prototype.setReceiverVolume = function(a, c, d, e) {
  this.Na(e) && (k.Y.Zk(c) ? (c.sessionId = a, this.Ba(new k.ta(k.F.Dc, c, null, null, chrome.cast.timeout.setReceiverVolume), new k.V(d, e, chrome.cast.timeout.setReceiverVolume))) : e && e(new chrome.cast.Error(chrome.cast.La.INVALID_PARAMETER)));
};
chrome.cast.ya.prototype.leaveSession = function(a, c, d) {
  this.Na(d) && this.Ba(new k.ta(k.F.Yl, a, null, null, chrome.cast.timeout.leaveSession), new k.V(c, d, chrome.cast.timeout.leaveSession));
};
b = chrome.cast.ya.prototype;
b.ph = function(a, c, d, e) {
  this.Na(d) && this.Ba(new k.ta(k.F.Dc, a, null, null, e), new k.V(c, d, e));
};
b.Ke = function(a) {
  this.Na(g.Vg) && this.Ba(new k.ta(k.F.lm, a));
};
b.th = function(a, c, d, e, f, h) {
  null != a && (d.mediaSessionId = a.mediaSessionId, d.sessionId = a.sessionId);
  d.requestId = null;
  d.type = c;
  this.ph(d, function(a) {
    e && a.status && 1 == a.status.length ? e(a.status[0]) : f && f(new chrome.cast.Error(chrome.cast.La.SESSION_ERROR));
  }, f, h);
};
b.cn = function(a, c, d) {
  this.th(null, k.M.Dh, a, function(a) {
    a.Xc = !0;
    a.he = !0;
    c && c(a);
  }.bind(this), d, chrome.cast.media.timeout.load);
};
b.tb = function(a, c, d, e, f, h) {
  this.th(a, c, d, function(a) {
    this.Ai(a);
    e && e();
  }.bind(this), f, h);
};
b.Wm = function(a, c, d) {
  this.Na(d) && (k.Y.$k(a) ? this.Ba(new k.ta(k.F.Zf, a, null, null, chrome.cast.timeout.sendCustomMessage), new k.V(c, d, chrome.cast.timeout.sendCustomMessage)) : d && d(new chrome.cast.Error(chrome.cast.La.INVALID_PARAMETER)));
};
b.Ng = function() {
  this.ma && this.Cc && this.Ba(new k.ta(k.F.fm, new k.em(this.ma)));
};
b.Ba = function(a, c) {
  var d = this.rn();
  a.seqNum = d;
  if (this.Lb[d] && !this.Lb[d].sn()) {
    throw "Try to send a request with the existing seqNum: " + a.seqNum;
  }
  c && (this.Lb[d] = c, c.Dg(function() {
    delete this.Lb[d];
  }.bind(this)));
  this.Qc.pe(a);
};
b.Je = function(a, c) {
  this.Na(c) && this.Ba(new k.ta(k.F.Zl, void 0), new k.V(a, c));
};
b.nc = function(a, c, d) {
  k.Y.Tl(a) ? this.$d ? d && d(this.$d) : this.ma ? c && c() : (this.ma = a, this.Cc ? (this.Ng(), c && c()) : (this.Jb = new k.V(c, d, 5E3), this.Jb.Dg())) : d && d(new chrome.cast.Error(chrome.cast.La.INVALID_PARAMETER));
};
chrome.cast.ya.prototype.requestSession = function(a, c, d, e) {
  this.Na(c) && (d && !k.Y.yg(d) ? c && c(new chrome.cast.Error(chrome.cast.La.INVALID_PARAMETER)) : (!d && this.ma && (d = this.ma.sessionRequest), this.Ba(new k.ta(k.F.Qk, d, null, null, d.requestSessionTimeout, e), new k.V(a, c, 0))));
};
chrome.cast.ya.prototype.Ne = function(a) {
  this.Na(g.Vg) && a && this.Ba(new k.ta(k.F.mm, a));
};
chrome.cast.ya.nn = new chrome.cast.Error(chrome.cast.La.API_NOT_INITIALIZED);
chrome.cast.ya.pn = new chrome.cast.Error(chrome.cast.La.EXTENSION_MISSING);
b = chrome.cast.ya.prototype;
b.Na = function(a) {
  return this.Cc ? this.Of ? (a && a(chrome.cast.ya.pn), !1) : !0 : (a && a(chrome.cast.ya.nn), !1);
};
b.We = function(a, c) {
  return a + "#" + c;
};
b.Xm = function(a, c, d) {
  this.cd.add(this.We(a, c), d);
};
b.$m = function(a, c, d) {
  this.cd.remove(this.We(a, c), d);
};
b.tp = function(a, c) {
  return this.cd.get(this.We(a, c));
};
b.Ge = function(a, c) {
  this.Wc.add(a, c);
};
b.Le = function(a, c) {
  this.Wc.remove(a, c);
};
b.Ym = function(a, c) {
  -1 == a.pc.indexOf(c) && a.pc.push(c);
};
b.an = function(a, c) {
  var d = a.pc.indexOf(c);
  -1 != d && a.pc.splice(d, 1);
};
b.Ai = function(a) {
  if (a.Xc) {
    var c = a.playerState != chrome.cast.media.mc.IDLE;
    a.pc.forEach(function(a) {
      a(c);
    });
    c || this.Vc.Vm(a);
  } else {
    a.Xc = !0, a.he || this.Wc.get(a.sessionId).forEach(function(c) {
      c(a);
    });
  }
};
b.hm = function(a) {
  return this.Vc.Zg(a);
};
b.Zm = function(a, c) {
  this.gc.add(a, c);
};
b.bn = function(a, c) {
  this.gc.remove(a, c);
};
b.He = function(a) {
  this.jd.push(a);
};
b.Me = function(a) {
  a = this.jd.indexOf(a);
  0 <= a && this.jd.splice(a, 1);
};
b.Pe = function(a, c, d) {
  this.Na(d) && this.Ba(new k.ta(k.F.$l, a), new k.V(c, d));
};
chrome.cast.isAvailable = !1;
g.i("chrome.cast.isAvailable", chrome.cast.isAvailable);
chrome.cast.C = null;
chrome.cast.Je = function(a, c) {
  chrome.cast.C.Je(a, c);
};
g.i("chrome.cast.isTabBroadcast", chrome.cast.Je);
chrome.cast.nc = function(a, c, d) {
  chrome.cast.C.nc(a, c, d);
};
g.i("chrome.cast.initialize", chrome.cast.nc);
chrome.cast.requestSession = function(a, c, d, e) {
  chrome.cast.C.requestSession(a, c, d, e);
};
g.i("chrome.cast.requestSession", chrome.cast.requestSession);
chrome.cast.Ne = function(a) {
  chrome.cast.C.Ne(a);
};
g.i("chrome.cast.requestSessionById", chrome.cast.Ne);
chrome.cast.He = function(a) {
  chrome.cast.C.He(a);
};
g.i("chrome.cast.addReceiverActionListener", chrome.cast.He);
chrome.cast.Me = function(a) {
  chrome.cast.C.Me(a);
};
g.i("chrome.cast.removeReceiverActionListener", chrome.cast.Me);
chrome.cast.Ke = function(a) {
  chrome.cast.C.Ke(a);
};
g.i("chrome.cast.logMessage", chrome.cast.Ke);
chrome.cast.Oe = function(a, c, d) {
  chrome.cast.C.Oe(a, c, d);
};
g.i("chrome.cast.setCustomReceivers", chrome.cast.Oe);
chrome.cast.Pe = function(a, c, d) {
  chrome.cast.C.Pe(a, c, d);
};
g.i("chrome.cast.setReceiverDisplayStatus", chrome.cast.Pe);
chrome.cast.q.prototype.Pp = function(a, c, d) {
  chrome.cast.C.setReceiverVolume(this.sessionId, new k.yh(new chrome.cast.qd(a, null), this.receiver.volume), c, d);
};
g.w(chrome.cast.q.prototype, "setReceiverVolumeLevel", chrome.cast.q.prototype.Pp);
chrome.cast.q.prototype.Op = function(a, c, d) {
  chrome.cast.C.setReceiverVolume(this.sessionId, new k.yh(new chrome.cast.qd(null, a), this.receiver.volume), c, d);
};
g.w(chrome.cast.q.prototype, "setReceiverMuted", chrome.cast.q.prototype.Op);
chrome.cast.q.prototype.leave = function(a, c) {
  chrome.cast.C.leaveSession(this.sessionId, a, c);
};
g.w(chrome.cast.q.prototype, "leave", chrome.cast.q.prototype.leave);
chrome.cast.q.prototype.stop = function(a, c) {
  chrome.cast.C.ph(new k.Tm(this.sessionId), a, c, chrome.cast.timeout.stopSession);
};
g.w(chrome.cast.q.prototype, "stop", chrome.cast.q.prototype.stop);
chrome.cast.q.prototype.sendMessage = function(a, c, d, e) {
  chrome.cast.C.Wm(new k.Um(this.sessionId, a, c), d, e);
};
g.w(chrome.cast.q.prototype, "sendMessage", chrome.cast.q.prototype.sendMessage);
chrome.cast.q.prototype.df = function(a) {
  chrome.cast.C.Zm(this.sessionId, a);
};
g.w(chrome.cast.q.prototype, "addUpdateListener", chrome.cast.q.prototype.df);
chrome.cast.q.prototype.hf = function(a) {
  chrome.cast.C.bn(this.sessionId, a);
};
g.w(chrome.cast.q.prototype, "removeUpdateListener", chrome.cast.q.prototype.hf);
chrome.cast.q.prototype.lp = function(a, c) {
  chrome.cast.C.Xm(this.sessionId, a, c);
};
g.w(chrome.cast.q.prototype, "addMessageListener", chrome.cast.q.prototype.lp);
chrome.cast.q.prototype.Lp = function(a, c) {
  chrome.cast.C.$m(this.sessionId, a, c);
};
g.w(chrome.cast.q.prototype, "removeMessageListener", chrome.cast.q.prototype.Lp);
chrome.cast.q.prototype.Ge = function(a) {
  chrome.cast.C.Ge(this.sessionId, a);
};
g.w(chrome.cast.q.prototype, "addMediaListener", chrome.cast.q.prototype.Ge);
chrome.cast.q.prototype.Le = function(a) {
  chrome.cast.C.Le(this.sessionId, a);
};
g.w(chrome.cast.q.prototype, "removeMediaListener", chrome.cast.q.prototype.Le);
chrome.cast.q.prototype.Dp = function(a, c, d) {
  a.sessionId = this.sessionId;
  chrome.cast.C.cn(a, c, d);
};
g.w(chrome.cast.q.prototype, "loadMedia", chrome.cast.q.prototype.Dp);
chrome.cast.media.s.prototype.nd = function(a, c, d) {
  a || (a = new chrome.cast.media.Wg);
  chrome.cast.C.tb(this, k.M.Xg, a, c, d, chrome.cast.media.timeout.nd);
};
g.w(chrome.cast.media.s.prototype, "getStatus", chrome.cast.media.s.prototype.nd);
chrome.cast.media.s.prototype.play = function(a, c, d) {
  a || (a = new chrome.cast.media.gh);
  chrome.cast.C.tb(this, k.M.qm, a, c, d, chrome.cast.media.timeout.play);
};
g.w(chrome.cast.media.s.prototype, "play", chrome.cast.media.s.prototype.play);
chrome.cast.media.s.prototype.pause = function(a, c, d) {
  a || (a = new chrome.cast.media.fh);
  chrome.cast.C.tb(this, k.M.pm, a, c, d, chrome.cast.media.timeout.pause);
};
g.w(chrome.cast.media.s.prototype, "pause", chrome.cast.media.s.prototype.pause);
chrome.cast.media.s.prototype.seek = function(a, c, d) {
  chrome.cast.C.tb(this, k.M.um, a, c, d, chrome.cast.media.timeout.seek);
};
g.w(chrome.cast.media.s.prototype, "seek", chrome.cast.media.s.prototype.seek);
chrome.cast.media.s.prototype.stop = function(a, c, d) {
  a || (a = new chrome.cast.media.eh);
  chrome.cast.C.tb(this, k.M.bh, a, c, d, chrome.cast.media.timeout.stop);
};
g.w(chrome.cast.media.s.prototype, "stop", chrome.cast.media.s.prototype.stop);
chrome.cast.media.s.prototype.pd = function(a, c, d) {
  chrome.cast.C.tb(this, k.M.ah, a, c, d, chrome.cast.media.timeout.pd);
};
g.w(chrome.cast.media.s.prototype, "setVolume", chrome.cast.media.s.prototype.pd);
chrome.cast.media.s.prototype.rd = function(a, c, d) {
  chrome.cast.C.tb(this, k.M.nm, a, c, d, chrome.cast.media.timeout.rd);
};
g.w(chrome.cast.media.s.prototype, "editTracksInfo", chrome.cast.media.s.prototype.rd);
chrome.cast.media.s.prototype.Sp = function(a) {
  return-1 < this.supportedMediaCommands.indexOf(a);
};
g.w(chrome.cast.media.s.prototype, "supportsCommand", chrome.cast.media.s.prototype.Sp);
chrome.cast.media.s.prototype.up = function() {
  if (this.playerState == chrome.cast.media.mc.PLAYING && 0 <= this.qe) {
    var a = (g.now() - this.qe) / 1E3, a = this.currentTime + this.playbackRate * a;
    this.media && null != this.media.duration && a > this.media.duration && (a = this.media.duration);
    0 > a && (a = 0);
    return a;
  }
  return this.currentTime;
};
g.w(chrome.cast.media.s.prototype, "getEstimatedTime", chrome.cast.media.s.prototype.up);
chrome.cast.media.s.prototype.df = function(a) {
  chrome.cast.C.Ym(this, a);
};
g.w(chrome.cast.media.s.prototype, "addUpdateListener", chrome.cast.media.s.prototype.df);
chrome.cast.media.s.prototype.hf = function(a) {
  chrome.cast.C.an(this, a);
};
g.w(chrome.cast.media.s.prototype, "removeUpdateListener", chrome.cast.media.s.prototype.hf);
chrome.cast.jf = function() {
  if (!chrome.cast.lh && (chrome.cast.lh = !0, chrome.cast.extensionId)) {
    var a = "chrome-extension://" + chrome.cast.extensionId, c = document.createElement("iframe");
    c.src = a + "/api_iframe.html?appOrigin=" + window.location.origin;
    c.setAttribute("style", "display:none");
    document.body.appendChild(c);
    a = new chrome.cast.lc(c, a);
    a.init();
    chrome.cast.C = new chrome.cast.ya(a);
    chrome.cast.C.init();
    chrome.cast.isAvailable = !0;
    (a = window.__onGCastApiAvailable) && "function" == typeof a && a(!0);
  }
};
chrome.cast.lh = !1;
"complete" == document.readyState ? chrome.cast.jf() : (window.addEventListener("load", chrome.cast.jf, !1), window.addEventListener("DOMContentLoaded", chrome.cast.jf, !1));
})();
