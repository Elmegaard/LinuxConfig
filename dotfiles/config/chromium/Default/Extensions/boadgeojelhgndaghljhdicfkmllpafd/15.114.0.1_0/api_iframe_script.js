var b, __GCast_isChromeBrowser = window.chrome ? !0 : !1, chrome = window.chrome || {};
chrome.cast = chrome.cast || {};
chrome.cast.media = chrome.cast.media || {};
var l = l || {};
l.global = this;
l.P = function(a) {
  return void 0 !== a;
};
l.Vb = function(a, c, d) {
  a = a.split(".");
  d = d || l.global;
  a[0] in d || !d.execScript || d.execScript("var " + a[0]);
  for (var e;a.length && (e = a.shift());) {
    !a.length && l.P(c) ? d[e] = c : d = d[e] ? d[e] : d[e] = {};
  }
};
l.ak = function(a, c) {
  l.Vb(a, c);
};
l.ga = !0;
l.Di = "en";
l.Ub = !0;
l.ig = !1;
l.Cg = !l.ga;
l.wl = function(a) {
  l.gd(a);
};
l.gd = function(a, c) {
  l.Vb(a, c);
};
l.Tf = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
l.module = function(a) {
  if (!l.isString(a) || !a || -1 == a.search(l.Tf)) {
    throw Error("Invalid module identifier");
  }
  if (!l.ld()) {
    throw Error("Module " + a + " has been loaded incorrectly.");
  }
  if (l.C.Lb) {
    throw Error("goog.module may only be called once per module.");
  }
  l.C.Lb = a;
};
l.module.get = function(a) {
  return l.module.Ch(a);
};
l.module.Ch = function() {
};
l.C = null;
l.ld = function() {
  return null != l.C;
};
l.module.Mb = function() {
  if (!l.ld()) {
    throw Error("goog.module.declareTestMethods must be called from within a goog.module");
  }
  l.C.Mb = !0;
};
l.module.ed = function() {
  l.C.ed = !0;
};
l.Il = function(a) {
  if (l.Cg) {
    throw a = a || "", Error("Importing test-only code into non-debug environment" + (a ? ": " + a : "."));
  }
};
l.jk = function() {
};
l.rk = function(a, c) {
  for (var d = a.split("."), e = c || l.global, f;f = d.shift();) {
    if (l.cc(e[f])) {
      e = e[f];
    } else {
      return null;
    }
  }
  return e;
};
l.wk = function(a, c) {
  var d = c || l.global, e;
  for (e in a) {
    d[e] = a[e];
  }
};
l.gj = function(a, c, d, e) {
  if (l.md) {
    var f;
    a = a.replace(/\\/g, "/");
    for (var g = l.D, h = 0;f = c[h];h++) {
      g.Fa[f] = a, g.Db[a] = !!e;
    }
    for (e = 0;c = d[e];e++) {
      a in g.requires || (g.requires[a] = {}), g.requires[a][c] = !0;
    }
  }
};
l.dm = !1;
l.ni = !0;
l.gl = function(a) {
  l.global.console && l.global.console.error(a);
};
l.require = function() {
};
l.ea = "";
l.pl = function() {
};
l.Bk = function(a) {
  return a;
};
l.ej = function() {
  throw Error("unimplemented abstract method");
};
l.hj = function(a) {
  a.$h = function() {
    if (a.sd) {
      return a.sd;
    }
    l.ga && (l.td[l.td.length] = a);
    return a.sd = new a;
  };
};
l.td = [];
l.ng = !0;
l.If = l.ga;
l.Kf = {};
l.md = !1;
l.md && (l.Ef = {}, l.D = {Db:{}, Fa:{}, requires:{}, $c:{}, Ea:{}, fb:{}}, l.rd = function() {
  var a = l.global.document;
  return "undefined" != typeof a && "write" in a;
}, l.Ah = function() {
  if (l.global.lg) {
    l.ea = l.global.lg;
  } else {
    if (l.rd()) {
      for (var a = l.global.document.getElementsByTagName("script"), c = a.length - 1;0 <= c;--c) {
        var d = a[c].src, e = d.lastIndexOf("?"), e = -1 == e ? d.length : e;
        if ("base.js" == d.substr(e - 7, 7)) {
          l.ea = d.substr(0, e - 7);
          break;
        }
      }
    }
  }
}, l.Ib = function(a, c) {
  (l.global.Zh || l.Uf)(a, c) && (l.D.Ea[a] = !0);
}, l.rg = l.global.document && l.global.document.all && !l.global.atob, l.Df = function(a) {
  l.Ib("", 'goog.retrieveAndExecModule_("' + a + '");') && (l.D.Ea[a] = !0);
}, l.Qb = [], l.gm = function(a, c) {
  return l.ng && l.P(l.global.JSON) ? "goog.loadModule(" + l.global.JSON.stringify(c + "\n//# sourceURL=" + a + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + c + "\n;return exports});\n//# sourceURL=" + a + "\n";
}, l.vg = function() {
  var a = l.Qb.length;
  if (0 < a) {
    var c = l.Qb;
    l.Qb = [];
    for (var d = 0;d < a;d++) {
      l.od(c[d]);
    }
  }
}, l.il = function(a) {
  l.fd(a) && l.$f(a) && l.od(l.ea + l.Kb(a));
}, l.fd = function(a) {
  return(a = l.Kb(a)) && l.D.Db[a] ? l.ea + a in l.D.fb : !1;
}, l.$f = function(a) {
  if ((a = l.Kb(a)) && a in l.D.requires) {
    for (var c in l.D.requires[a]) {
      if (!l.lf(c) && !l.fd(c)) {
        return!1;
      }
    }
  }
  return!0;
}, l.od = function(a) {
  if (a in l.D.fb) {
    var c = l.D.fb[a];
    delete l.D.fb[a];
    l.bg(c);
  }
}, l.dl = function(a) {
  var c = l.C;
  try {
    l.C = {Lb:void 0, Mb:!1};
    var d;
    if (l.isFunction(a)) {
      d = a.call(l.global, {});
    } else {
      if (l.isString(a)) {
        d = l.Jf.call(l.global, a);
      } else {
        throw Error("Invalid module definition");
      }
    }
    var e = l.C.Lb;
    if (!l.isString(e) || !e) {
      throw Error('Invalid module name "' + e + '"');
    }
    l.C.ed ? l.gd(e, d) : l.If && Object.seal && Object.seal(d);
    l.Kf[e] = d;
    if (l.C.Mb) {
      for (var f in d) {
        if (0 === f.indexOf("test", 0) || "tearDown" == f || "setUp" == f || "setUpPage" == f || "tearDownPage" == f) {
          l.global[f] = d[f];
        }
      }
    }
  } finally {
    l.C = c;
  }
}, l.Jf = function(a) {
  eval(a);
  return{};
}, l.Uf = function(a, c) {
  if (l.rd()) {
    var d = l.global.document;
    if ("complete" == d.readyState) {
      if (/\bdeps.js$/.test(a)) {
        return!1;
      }
      throw Error('Cannot write "' + a + '" after document load');
    }
    var e = l.rg;
    void 0 === c ? e ? (e = " onreadystatechange='goog.onScriptLoad_(this, " + ++l.wd + ")' ", d.write('<script type="text/javascript" src="' + a + '"' + e + ">\x3c/script>")) : d.write('<script type="text/javascript" src="' + a + '">\x3c/script>') : d.write('<script type="text/javascript">' + c + "\x3c/script>");
    return!0;
  }
  return!1;
}, l.wd = 0, l.sl = function(a, c) {
  "complete" == a.readyState && l.wd == c && l.vg();
  return!0;
}, l.hm = function() {
  function a(f) {
    if (!(f in e.Ea)) {
      if (!(f in e.$c) && (e.$c[f] = !0, f in e.requires)) {
        for (var g in e.requires[f]) {
          if (!l.lf(g)) {
            if (g in e.Fa) {
              a(e.Fa[g]);
            } else {
              throw Error("Undefined nameToPath for " + g);
            }
          }
        }
      }
      f in d || (d[f] = !0, c.push(f));
    }
  }
  var c = [], d = {}, e = l.D, f;
  for (f in l.Ef) {
    e.Ea[f] || a(f);
  }
  for (var g = 0;g < c.length;g++) {
    f = c[g], l.D.Ea[f] = !0;
  }
  var h = l.C;
  l.C = null;
  for (g = 0;g < c.length;g++) {
    if (f = c[g]) {
      e.Db[f] ? l.Df(l.ea + f) : l.Ib(l.ea + f);
    } else {
      throw l.C = h, Error("Undefined script input");
    }
  }
  l.C = h;
}, l.Kb = function(a) {
  return a in l.D.Fa ? l.D.Fa[a] : null;
}, l.Ah(), l.global.hi || l.Ib(l.ea + "deps.js"));
l.ll = function(a) {
  a = a.split("/");
  for (var c = 0;c < a.length;) {
    "." == a[c] ? a.splice(c, 1) : c && ".." == a[c] && a[c - 1] && ".." != a[c - 1] ? a.splice(--c, 2) : c++;
  }
  return a.join("/");
};
l.Bl = function() {
};
l.I = function(a) {
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
l.Tk = function(a) {
  return null === a;
};
l.cc = function(a) {
  return null != a;
};
l.isArray = function(a) {
  return "array" == l.I(a);
};
l.v = function(a) {
  var c = l.I(a);
  return "array" == c || "object" == c && "number" == typeof a.length;
};
l.Jk = function(a) {
  return l.isObject(a) && "function" == typeof a.getFullYear;
};
l.isString = function(a) {
  return "string" == typeof a;
};
l.kf = function(a) {
  return "boolean" == typeof a;
};
l.isNumber = function(a) {
  return "number" == typeof a;
};
l.isFunction = function(a) {
  return "function" == l.I(a);
};
l.isObject = function(a) {
  var c = typeof a;
  return "object" == c && null != a || "function" == c;
};
l.Ud = function(a) {
  return a[l.fa] || (a[l.fa] = ++l.qg);
};
l.zk = function(a) {
  return!!a[l.fa];
};
l.Vh = function(a) {
  "removeAttribute" in a && a.removeAttribute(l.fa);
  try {
    delete a[l.fa];
  } catch (c) {
  }
};
l.fa = "closure_uid_" + (1E9 * Math.random() >>> 0);
l.qg = 0;
l.ok = l.Ud;
l.zl = l.Vh;
l.jg = function(a) {
  var c = l.I(a);
  if ("object" == c || "array" == c) {
    if (a.clone) {
      return a.clone();
    }
    var c = "array" == c ? [] : {}, d;
    for (d in a) {
      c[d] = l.jg(a[d]);
    }
    return c;
  }
  return a;
};
l.xg = function(a, c, d) {
  return a.call.apply(a.bind, arguments);
};
l.wg = function(a, c, d) {
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
l.bind = function(a, c, d) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? l.bind = l.xg : l.bind = l.wg;
  return l.bind.apply(null, arguments);
};
l.qb = function(a, c) {
  var d = Array.prototype.slice.call(arguments, 1);
  return function() {
    var c = d.slice();
    c.push.apply(c, arguments);
    return a.apply(this, c);
  };
};
l.Vd = function(a, c) {
  for (var d in c) {
    a[d] = c[d];
  }
};
l.now = l.Ub && Date.now || function() {
  return+new Date;
};
l.bg = function(a) {
  if (l.global.execScript) {
    l.global.execScript(a, "JavaScript");
  } else {
    if (l.global.eval) {
      if (null == l.kb && (l.global.eval("var _et_ = 1;"), "undefined" != typeof l.global._et_ ? (delete l.global._et_, l.kb = !0) : l.kb = !1), l.kb) {
        l.global.eval(a);
      } else {
        var c = l.global.document, d = c.createElement("script");
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
l.kb = null;
l.mk = function(a, c) {
  var d = function(a) {
    return l.Dd[a] || a;
  }, e = function(a) {
    a = a.split("-");
    for (var c = [], e = 0;e < a.length;e++) {
      c.push(d(a[e]));
    }
    return c.join("-");
  }, e = l.Dd ? "BY_WHOLE" == l.ug ? d : e : function(a) {
    return a;
  };
  return c ? a + "-" + e(c) : e(a);
};
l.El = function(a, c) {
  l.Dd = a;
  l.ug = c;
};
l.pk = function(a, c) {
  c && (a = a.replace(/\{\$([^}]+)}/g, function(a, e) {
    return e in c ? c[e] : a;
  }));
  return a;
};
l.qk = function(a) {
  return a;
};
l.g = function(a, c, d) {
  l.Vb(a, c, d);
};
l.V = function(a, c, d) {
  a[c] = d;
};
l.ta = function(a, c) {
  function d() {
  }
  d.prototype = c.prototype;
  a.hb = c.prototype;
  a.prototype = new d;
  a.prototype.constructor = a;
  a.tg = function(a, d, g) {
    for (var h = Array(arguments.length - 2), k = 2;k < arguments.length;k++) {
      h[k - 2] = arguments[k];
    }
    return c.prototype[d].apply(a, h);
  };
};
l.tg = function(a, c, d) {
  var e = arguments.callee.caller;
  if (l.ig || l.ga && !e) {
    throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
  }
  if (e.hb) {
    for (var f = Array(arguments.length - 1), g = 1;g < arguments.length;g++) {
      f[g - 1] = arguments[g];
    }
    return e.hb.constructor.apply(a, f);
  }
  f = Array(arguments.length - 2);
  for (g = 2;g < arguments.length;g++) {
    f[g - 2] = arguments[g];
  }
  for (var g = !1, h = a.constructor;h;h = h.hb && h.hb.constructor) {
    if (h.prototype[c] === e) {
      g = !0;
    } else {
      if (g) {
        return h.prototype[c].apply(a, f);
      }
    }
  }
  if (a[c] === e) {
    return a.constructor.prototype[c].apply(a, f);
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
l.scope = function(a) {
  a.call(l.global);
};
l.Sg = !0;
l.Sg && (Function.prototype.bind = Function.prototype.bind || function(a, c) {
  if (1 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 1);
    d.unshift(this, a);
    return l.bind.apply(null, d);
  }
  return l.bind(this, a);
}, Function.prototype.qb = function(a) {
  var c = Array.prototype.slice.call(arguments);
  c.unshift(this, null);
  return l.bind.apply(null, c);
}, Function.prototype.ta = function(a) {
  l.ta(this, a);
}, Function.prototype.Vd = function(a) {
  l.Vd(this.prototype, a);
});
l.O = function(a, c) {
  var d = c.constructor, e = c.Sf;
  d && d != Object.prototype.constructor || (d = function() {
    throw Error("cannot instantiate an interface (no constructor defined).");
  });
  d = l.O.Qf(d, a);
  a && l.ta(d, a);
  delete c.constructor;
  delete c.Sf;
  l.O.nd(d.prototype, c);
  null != e && (e instanceof Function ? e(d) : l.O.nd(d, e));
  return d;
};
l.O.Vf = l.ga;
l.O.Qf = function(a, c) {
  if (l.O.Vf && Object.seal instanceof Function) {
    if (c && c.prototype && c.prototype[l.Wf]) {
      return a;
    }
    var d = function() {
      var c = a.apply(this, arguments) || this;
      c[l.fa] = c[l.fa];
      this.constructor === d && Object.seal(c);
      return c;
    };
    return d;
  }
  return a;
};
l.O.ud = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
l.O.nd = function(a, c) {
  for (var d in c) {
    Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d]);
  }
  for (var e = 0;e < l.O.ud.length;e++) {
    d = l.O.ud[e], Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d]);
  }
};
l.Ul = function() {
};
l.Wf = "goog_defineClass_legacy_unsealable";
var m = {aa:{xi:"LAUNCH", vd:"STOP", gh:"SET_VOLUME", Jg:"GET_STATUS", Ti:"RECEIVER_STATUS", aj:"CONNECT", bj:"CLOSE", ri:"GET_APP_AVAILABILITY", pg:"LOAD", Hi:"PAUSE", Ji:"SEEK", Ii:"PLAY", Qg:"STOP_MEDIA", Og:"MEDIA_GET_STATUS", Pg:"MEDIA_SET_VOLUME", Gi:"EDIT_TRACKS_INFO", si:"INVALID_PLAYER_STATE", Ci:"LOAD_FAILED", Bi:"LOAD_CANCELLED", ti:"INVALID_REQUEST", Ki:"MEDIA_STATUS", yi:"LAUNCH_ERROR", Oi:"PING", Qi:"PONG"}, Tb:{}};
m.Tb[m.aa.Qg] = m.aa.vd;
m.Tb[m.aa.Pg] = m.aa.gh;
m.Tb[m.aa.Og] = m.aa.Jg;
m.bi = function(a, c, d) {
  this.sessionId = a;
  this.namespaceName = c;
  this.message = d;
};
m.Zi = function(a) {
  this.type = m.aa.vd;
  this.requestId = null;
  this.sessionId = a || null;
};
chrome.cast.zd = {TAB_AND_ORIGIN_SCOPED:"tab_and_origin_scoped", ORIGIN_SCOPED:"origin_scoped", PAGE_SCOPED:"page_scoped"};
l.g("chrome.cast.AutoJoinPolicy", chrome.cast.zd);
chrome.cast.Ad = {CREATE_SESSION:"create_session", CAST_THIS_TAB:"cast_this_tab"};
l.g("chrome.cast.DefaultActionPolicy", chrome.cast.Ad);
chrome.cast.Sb = {VIDEO_OUT:"video_out", AUDIO_OUT:"audio_out", VIDEO_IN:"video_in", AUDIO_IN:"audio_in"};
l.g("chrome.cast.Capability", chrome.cast.Sb);
chrome.cast.Ig = {CANCEL:"cancel", TIMEOUT:"timeout", API_NOT_INITIALIZED:"api_not_initialized", INVALID_PARAMETER:"invalid_parameter", EXTENSION_NOT_COMPATIBLE:"extension_not_compatible", EXTENSION_MISSING:"extension_missing", RECEIVER_UNAVAILABLE:"receiver_unavailable", SESSION_ERROR:"session_error", CHANNEL_ERROR:"channel_error", LOAD_MEDIA_FAILED:"load_media_failed"};
l.g("chrome.cast.ErrorCode", chrome.cast.Ig);
chrome.cast.dh = {AVAILABLE:"available", UNAVAILABLE:"unavailable"};
l.g("chrome.cast.ReceiverAvailability", chrome.cast.dh);
chrome.cast.jh = {CHROME:"chrome", IOS:"ios", ANDROID:"android"};
l.g("chrome.cast.SenderPlatform", chrome.cast.jh);
chrome.cast.Rd = {CAST:"cast", DIAL:"dial", HANGOUT:"hangout", CUSTOM:"custom"};
l.g("chrome.cast.ReceiverType", chrome.cast.Rd);
chrome.cast.Dg = {RUNNING:"running", STOPPED:"stopped", ERROR:"error"};
l.g("chrome.cast.DialAppState", chrome.cast.Dg);
chrome.cast.bh = {CAST:"cast", STOP:"stop"};
l.g("chrome.cast.ReceiverAction", chrome.cast.bh);
chrome.cast.Sd = {CONNECTED:"connected", DISCONNECTED:"disconnected", STOPPED:"stopped"};
l.g("chrome.cast.SessionStatus", chrome.cast.Sd);
chrome.cast.VERSION = [1, 2];
l.g("chrome.cast.VERSION", chrome.cast.VERSION);
chrome.cast.Error = function(a, c, d) {
  this.code = a;
  this.description = c || null;
  this.details = d || null;
};
l.g("chrome.cast.Error", chrome.cast.Error);
chrome.cast.ih = function(a) {
  this.platform = a;
  this.packageId = this.url = null;
};
l.g("chrome.cast.SenderApplication", chrome.cast.ih);
chrome.cast.Image = function(a) {
  this.url = a;
  this.width = this.height = null;
};
l.g("chrome.cast.Image", chrome.cast.Image);
chrome.cast.Cd = function(a, c) {
  this.level = l.P(a) ? a : null;
  this.muted = l.P(c) ? c : null;
};
l.g("chrome.cast.Volume", chrome.cast.Cd);
chrome.cast.media.Ug = {PAUSE:"pause", SEEK:"seek", STREAM_VOLUME:"stream_volume", STREAM_MUTE:"stream_mute"};
l.g("chrome.cast.media.MediaCommand", chrome.cast.media.Ug);
chrome.cast.media.M = {GENERIC:0, MOVIE:1, TV_SHOW:2, MUSIC_TRACK:3, PHOTO:4};
l.g("chrome.cast.media.MetadataType", chrome.cast.media.M);
chrome.cast.media.Bd = {IDLE:"IDLE", PLAYING:"PLAYING", PAUSED:"PAUSED", BUFFERING:"BUFFERING"};
l.g("chrome.cast.media.PlayerState", chrome.cast.media.Bd);
chrome.cast.media.fh = {PLAYBACK_START:"PLAYBACK_START", PLAYBACK_PAUSE:"PLAYBACK_PAUSE"};
l.g("chrome.cast.media.ResumeState", chrome.cast.media.fh);
chrome.cast.media.Td = {BUFFERED:"BUFFERED", LIVE:"LIVE", OTHER:"OTHER"};
l.g("chrome.cast.media.StreamType", chrome.cast.media.Td);
chrome.cast.media.Mg = {CANCELLED:"CANCELLED", INTERRUPTED:"INTERRUPTED", FINISHED:"FINISHED", ERROR:"ERROR"};
l.g("chrome.cast.media.IdleReason", chrome.cast.media.Mg);
chrome.cast.media.th = {TEXT:"TEXT", AUDIO:"AUDIO", VIDEO:"VIDEO"};
l.g("chrome.cast.media.TrackType", chrome.cast.media.th);
chrome.cast.media.qh = {SUBTITLES:"SUBTITLES", CAPTIONS:"CAPTIONS", DESCRIPTIONS:"DESCRIPTIONS", CHAPTERS:"CHAPTERS", METADATA:"METADATA"};
l.g("chrome.cast.media.TextTrackType", chrome.cast.media.qh);
chrome.cast.media.mh = {NONE:"NONE", OUTLINE:"OUTLINE", DROP_SHADOW:"DROP_SHADOW", RAISED:"RAISED", DEPRESSED:"DEPRESSED"};
l.g("chrome.cast.media.TextTrackEdgeType", chrome.cast.media.mh);
chrome.cast.media.rh = {NONE:"NONE", NORMAL:"NORMAL", ROUNDED_CORNERS:"ROUNDED_CORNERS"};
l.g("chrome.cast.media.TextTrackWindowType", chrome.cast.media.rh);
chrome.cast.media.nh = {SANS_SERIF:"SANS_SERIF", MONOSPACED_SANS_SERIF:"MONOSPACED_SANS_SERIF", SERIF:"SERIF", MONOSPACED_SERIF:"MONOSPACED_SERIF", CASUAL:"CASUAL", CURSIVE:"CURSIVE", SMALL_CAPITALS:"SMALL_CAPITALS"};
l.g("chrome.cast.media.TextTrackFontGenericFamily", chrome.cast.media.nh);
chrome.cast.media.oh = {NORMAL:"NORMAL", BOLD:"BOLD", BOLD_ITALIC:"BOLD_ITALIC", ITALIC:"ITALIC"};
l.g("chrome.cast.media.TextTrackFontStyle", chrome.cast.media.oh);
chrome.cast.media.Lg = function() {
  this.customData = null;
};
l.g("chrome.cast.media.GetStatusRequest", chrome.cast.media.Lg);
chrome.cast.media.Yg = function() {
  this.customData = null;
};
l.g("chrome.cast.media.PauseRequest", chrome.cast.media.Yg);
chrome.cast.media.$g = function() {
  this.customData = null;
};
l.g("chrome.cast.media.PlayRequest", chrome.cast.media.$g);
chrome.cast.media.hh = function() {
  this.customData = this.resumeState = this.currentTime = null;
};
l.g("chrome.cast.media.SeekRequest", chrome.cast.media.hh);
chrome.cast.media.lh = function() {
  this.customData = null;
};
l.g("chrome.cast.media.StopRequest", chrome.cast.media.lh);
chrome.cast.media.vh = function(a) {
  this.volume = a;
  this.customData = null;
};
l.g("chrome.cast.media.VolumeRequest", chrome.cast.media.vh);
chrome.cast.media.Ng = function(a) {
  this.type = m.aa.pg;
  this.sessionId = this.requestId = null;
  this.media = a;
  this.activeTrackIds = null;
  this.autoplay = !0;
  this.customData = this.currentTime = null;
};
l.g("chrome.cast.media.LoadRequest", chrome.cast.media.Ng);
chrome.cast.media.Hg = function(a, c) {
  this.requestId = null;
  this.activeTrackIds = a || null;
  this.textTrackStyle = c || null;
};
l.g("chrome.cast.media.EditTracksInfoRequest", chrome.cast.media.Hg);
chrome.cast.media.Kg = function() {
  this.metadataType = this.type = chrome.cast.media.M.GENERIC;
  this.releaseDate = this.releaseYear = this.images = this.subtitle = this.title = null;
};
l.g("chrome.cast.media.GenericMediaMetadata", chrome.cast.media.Kg);
chrome.cast.media.Wg = function() {
  this.metadataType = this.type = chrome.cast.media.M.MOVIE;
  this.releaseDate = this.releaseYear = this.images = this.subtitle = this.studio = this.title = null;
};
l.g("chrome.cast.media.MovieMediaMetadata", chrome.cast.media.Wg);
chrome.cast.media.uh = function() {
  this.metadataType = this.type = chrome.cast.media.M.TV_SHOW;
  this.originalAirdate = this.releaseYear = this.images = this.episode = this.episodeNumber = this.season = this.seasonNumber = this.episodeTitle = this.title = this.seriesTitle = null;
};
l.g("chrome.cast.media.TvShowMediaMetadata", chrome.cast.media.uh);
chrome.cast.media.Xg = function() {
  this.metadataType = this.type = chrome.cast.media.M.MUSIC_TRACK;
  this.releaseDate = this.releaseYear = this.images = this.discNumber = this.trackNumber = this.artistName = this.songName = this.composer = this.artist = this.albumArtist = this.title = this.albumName = null;
};
l.g("chrome.cast.media.MusicTrackMediaMetadata", chrome.cast.media.Xg);
chrome.cast.media.Zg = function() {
  this.metadataType = this.type = chrome.cast.media.M.PHOTO;
  this.creationDateTime = this.height = this.width = this.longitude = this.latitude = this.images = this.location = this.artist = this.title = null;
};
l.g("chrome.cast.media.PhotoMediaMetadata", chrome.cast.media.Zg);
chrome.cast.media.Vg = function(a, c) {
  this.contentId = a;
  this.streamType = chrome.cast.media.Td.BUFFERED;
  this.contentType = c;
  this.customData = this.textTrackStyle = this.tracks = this.duration = this.metadata = null;
};
l.g("chrome.cast.media.MediaInfo", chrome.cast.media.Vg);
chrome.cast.media.Tg = function(a, c) {
  this.sessionId = a;
  this.mediaSessionId = c;
  this.media = null;
  this.playbackRate = 1;
  this.playerState = chrome.cast.media.Bd.IDLE;
  this.currentTime = 0;
  this.supportedMediaCommands = [];
  this.volume = new chrome.cast.Cd;
  this.customData = this.activeTrackIds = this.idleReason = null;
};
l.g("chrome.cast.media.Media", chrome.cast.media.Tg);
chrome.cast.media.Bg = "CC1AD845";
l.g("chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID", chrome.cast.media.Bg);
chrome.cast.media.timeout = {};
l.g("chrome.cast.media.timeout", chrome.cast.media.timeout);
chrome.cast.media.timeout.load = 0;
l.V(chrome.cast.media.timeout, "load", chrome.cast.media.timeout.load);
chrome.cast.media.timeout.Dh = 0;
l.V(chrome.cast.media.timeout, "getStatus", chrome.cast.media.timeout.Dh);
chrome.cast.media.timeout.play = 0;
l.V(chrome.cast.media.timeout, "play", chrome.cast.media.timeout.play);
chrome.cast.media.timeout.pause = 0;
l.V(chrome.cast.media.timeout, "pause", chrome.cast.media.timeout.pause);
chrome.cast.media.timeout.seek = 0;
l.V(chrome.cast.media.timeout, "seek", chrome.cast.media.timeout.seek);
chrome.cast.media.timeout.stop = 0;
l.V(chrome.cast.media.timeout, "stop", chrome.cast.media.timeout.stop);
chrome.cast.media.timeout.Wh = 0;
l.V(chrome.cast.media.timeout, "setVolume", chrome.cast.media.timeout.Wh);
chrome.cast.media.timeout.zh = 0;
l.V(chrome.cast.media.timeout, "editTracksInfo", chrome.cast.media.timeout.zh);
chrome.cast.media.sh = function(a, c) {
  this.trackId = a;
  this.trackContentType = this.trackContentId = null;
  this.type = c;
  this.customData = this.subtype = this.language = this.name = null;
};
l.g("chrome.cast.media.Track", chrome.cast.media.sh);
chrome.cast.media.ph = function() {
  this.customData = this.fontStyle = this.fontGenericFamily = this.fontFamily = this.fontScale = this.windowRoundedCornerRadius = this.windowColor = this.windowType = this.edgeColor = this.edgeType = this.backgroundColor = this.foregroundColor = null;
};
l.g("chrome.cast.media.TextTrackStyle", chrome.cast.media.ph);
chrome.cast.yg = function(a, c, d, e, f) {
  this.sessionRequest = a;
  this.sessionListener = c;
  this.receiverListener = d;
  this.autoJoinPolicy = e || chrome.cast.zd.TAB_AND_ORIGIN_SCOPED;
  this.defaultActionPolicy = f || chrome.cast.Ad.CREATE_SESSION;
  this.customDialLaunchCallback = null;
};
l.g("chrome.cast.ApiConfig", chrome.cast.yg);
chrome.cast.Gg = function(a, c) {
  this.appName = a;
  this.launchParameter = c || null;
};
l.g("chrome.cast.DialRequest", chrome.cast.Gg);
chrome.cast.Eg = function(a, c, d) {
  this.receiver = a;
  this.appState = c;
  this.extraData = d || null;
};
l.g("chrome.cast.DialLaunchData", chrome.cast.Eg);
chrome.cast.Fg = function(a, c) {
  this.doLaunch = a;
  this.launchParameter = c || null;
};
l.g("chrome.cast.DialLaunchResponse", chrome.cast.Fg);
chrome.cast.kh = function(a, c, d) {
  this.appId = a;
  this.capabilities = c || [chrome.cast.Sb.VIDEO_OUT, chrome.cast.Sb.AUDIO_OUT];
  this.dialRequest = null;
  this.requestSessionTimeout = d || chrome.cast.timeout.requestSession;
  this.language = null;
};
l.g("chrome.cast.SessionRequest", chrome.cast.kh);
chrome.cast.ah = function(a, c, d, e) {
  this.label = a;
  this.friendlyName = c;
  this.capabilities = d || [];
  this.volume = e || null;
  this.receiverType = chrome.cast.Rd.CAST;
  this.displayStatus = this.isActiveInput = null;
};
l.g("chrome.cast.Receiver", chrome.cast.ah);
chrome.cast.eh = function(a, c) {
  this.statusText = a;
  this.appImages = c;
  this.showStop = null;
};
l.g("chrome.cast.ReceiverDisplayStatus", chrome.cast.eh);
chrome.cast.jb = function(a, c, d, e, f) {
  this.sessionId = a;
  this.appId = c;
  this.displayName = d;
  this.statusText = null;
  this.appImages = e;
  this.receiver = f;
  this.senderApps = [];
  this.namespaces = [];
  this.media = [];
  this.status = chrome.cast.Sd.CONNECTED;
  this.transportId = "";
};
l.g("chrome.cast.Session", chrome.cast.jb);
chrome.cast.jb.zg = "custom_receiver_session_id";
l.V(chrome.cast.jb, "CUSTOM_RECEIVER_SESSION_ID", chrome.cast.jb.zg);
chrome.cast.timeout = {};
l.g("chrome.cast.timeout", chrome.cast.timeout);
chrome.cast.timeout.requestSession = 1E4;
chrome.cast.timeout.leaveSession = 3E3;
chrome.cast.timeout.stopSession = 3E3;
chrome.cast.timeout.setReceiverVolume = 3E3;
chrome.cast.timeout.sendCustomMessage = 3E3;
chrome.cast.Rg = "mirror_app_id";
l.g("chrome.cast.MIRROR_APP_ID", chrome.cast.Rg);
m.Pd = function(a, c, d) {
  l.isNumber(d);
};
m.Pd.di = 432E5;
m.Pd.ql = function() {
};
m.wi = {};
m.ad = function(a, c, d, e, f, g) {
  this.type = a;
  this.message = c;
  this.seqNum = d || null;
  this.clientId = e || null;
  this.appOrigin = null;
  this.timeoutMillis = l.isNumber(f) ? f : 0;
  this.receiverId = g || null;
  this.receiverList = null;
};
m.u = {Mf:"iframe_init_result", Wc:"fail_to_connect_to_extension", gi:"client_reconnect", Bf:"v2_message", nf:"app_message", fi:"client_init", Ei:"log_message", Ui:"request_session", Vi:"request_session_by_id", zi:"leave_session", ei:"client_disconnect", Xi:"set_custom_receivers", ji:"custom_dial_launch_response", Yi:"set_receiver_display_status", Si:"query_tab_broadcast_status", uf:"receiver_availability", tf:"receiver_action", sf:"new_session", Af:"update_session", qf:"disconnect_session", vf:"remove_session", 
of:"app_message_success", rf:"leave_session_success", yf:"set_receiver_volume_success", wf:"set_custom_receivers_success", ERROR:"error", pf:"custom_dial_launch_request", xf:"set_receiver_display_status_success", zf:"tab_broadcast_status"};
l.debug = {};
l.debug.Error = function(a) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, l.debug.Error);
  } else {
    var c = Error().stack;
    c && (this.stack = c);
  }
  a && (this.message = String(a));
};
l.ta(l.debug.Error, Error);
l.debug.Error.prototype.name = "CustomError";
l.Xc = {};
l.Xc.jf = {hf:1, ai:2, TEXT:3, ci:4, pi:5, oi:6, Ri:7, ii:8, ki:9, mi:10, li:11, Mi:12};
l.b = {};
l.b.ub = !1;
l.b.xe = !1;
l.b.Be = {Ae:"\u00a0"};
l.b.pb = function(a, c) {
  return 0 == a.lastIndexOf(c, 0);
};
l.b.ae = function(a, c) {
  var d = a.length - c.length;
  return 0 <= d && a.indexOf(c, d) == d;
};
l.b.Kj = function(a, c) {
  return 0 == l.b.Mc(c, a.substr(0, c.length));
};
l.b.Ij = function(a, c) {
  return 0 == l.b.Mc(c, a.substr(a.length - c.length, c.length));
};
l.b.Jj = function(a, c) {
  return a.toLowerCase() == c.toLowerCase();
};
l.b.Fe = function(a, c) {
  for (var d = a.split("%s"), e = "", f = Array.prototype.slice.call(arguments, 1);f.length && 1 < d.length;) {
    e += d.shift() + f.shift();
  }
  return e + d.join("%s");
};
l.b.Oj = function(a) {
  return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
};
l.b.wb = function(a) {
  return/^[\s\xa0]*$/.test(a);
};
l.b.Mk = function(a) {
  return 0 == a.length;
};
l.b.K = l.b.wb;
l.b.Hh = function(a) {
  return l.b.wb(l.b.ze(a));
};
l.b.Lk = l.b.Hh;
l.b.Hk = function(a) {
  return!/[^\t\n\r ]/.test(a);
};
l.b.Ek = function(a) {
  return!/[^a-zA-Z]/.test(a);
};
l.b.Uk = function(a) {
  return!/[^0-9]/.test(a);
};
l.b.Fk = function(a) {
  return!/[^a-zA-Z0-9]/.test(a);
};
l.b.Yk = function(a) {
  return " " == a;
};
l.b.Zk = function(a) {
  return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a;
};
l.b.Sl = function(a) {
  return a.replace(/(\r\n|\r|\n)+/g, " ");
};
l.b.Gj = function(a) {
  return a.replace(/(\r\n|\r|\n)/g, "\n");
};
l.b.nl = function(a) {
  return a.replace(/\xa0|\s/g, " ");
};
l.b.ml = function(a) {
  return a.replace(/\xa0|[ \t]+/g, " ");
};
l.b.Nj = function(a) {
  return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
};
l.b.trim = l.Ub && String.prototype.trim ? function(a) {
  return a.trim();
} : function(a) {
  return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
};
l.b.trimLeft = function(a) {
  return a.replace(/^[\s\xa0]+/, "");
};
l.b.trimRight = function(a) {
  return a.replace(/[\s\xa0]+$/, "");
};
l.b.Mc = function(a, c) {
  var d = String(a).toLowerCase(), e = String(c).toLowerCase();
  return d < e ? -1 : d == e ? 0 : 1;
};
l.b.Oc = /(\.\d+)|(\d+)|(\D+)/g;
l.b.rl = function(a, c) {
  if (a == c) {
    return 0;
  }
  if (!a) {
    return-1;
  }
  if (!c) {
    return 1;
  }
  for (var d = a.toLowerCase().match(l.b.Oc), e = c.toLowerCase().match(l.b.Oc), f = Math.min(d.length, e.length), g = 0;g < f;g++) {
    var h = d[g], k = e[g];
    if (h != k) {
      return d = parseInt(h, 10), !isNaN(d) && (e = parseInt(k, 10), !isNaN(e) && d - e) ? d - e : h < k ? -1 : 1;
    }
  }
  return d.length != e.length ? d.length - e.length : a < c ? -1 : 1;
};
l.b.va = function(a) {
  return encodeURIComponent(String(a));
};
l.b.Xa = function(a) {
  return decodeURIComponent(a.replace(/\+/g, " "));
};
l.b.Ee = function(a, c) {
  return a.replace(/(\r\n|\r|\n)/g, c ? "<br />" : "<br>");
};
l.b.Kc = function(a, c) {
  if (c) {
    a = a.replace(l.b.tc, "&amp;").replace(l.b.wc, "&lt;").replace(l.b.vc, "&gt;").replace(l.b.yc, "&quot;").replace(l.b.zc, "&#39;").replace(l.b.xc, "&#0;"), l.b.ub && (a = a.replace(l.b.uc, "&#101;"));
  } else {
    if (!l.b.pe.test(a)) {
      return a;
    }
    -1 != a.indexOf("&") && (a = a.replace(l.b.tc, "&amp;"));
    -1 != a.indexOf("<") && (a = a.replace(l.b.wc, "&lt;"));
    -1 != a.indexOf(">") && (a = a.replace(l.b.vc, "&gt;"));
    -1 != a.indexOf('"') && (a = a.replace(l.b.yc, "&quot;"));
    -1 != a.indexOf("'") && (a = a.replace(l.b.zc, "&#39;"));
    -1 != a.indexOf("\x00") && (a = a.replace(l.b.xc, "&#0;"));
    l.b.ub && -1 != a.indexOf("e") && (a = a.replace(l.b.uc, "&#101;"));
  }
  return a;
};
l.b.tc = /&/g;
l.b.wc = /</g;
l.b.vc = />/g;
l.b.yc = /"/g;
l.b.zc = /'/g;
l.b.xc = /\x00/g;
l.b.uc = /e/g;
l.b.pe = l.b.ub ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
l.b.Lc = function(a) {
  return l.b.contains(a, "&") ? !l.b.xe && "document" in l.global ? l.b.Ic(a) : l.b.ye(a) : a;
};
l.b.bm = function(a, c) {
  return l.b.contains(a, "&") ? l.b.Ic(a, c) : a;
};
l.b.Ic = function(a, c) {
  var d = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'}, e;
  e = c ? c.createElement("div") : l.global.document.createElement("div");
  return a.replace(l.b.De, function(a, c) {
    var h = d[a];
    if (h) {
      return h;
    }
    if ("#" == c.charAt(0)) {
      var k = Number("0" + c.substr(1));
      isNaN(k) || (h = String.fromCharCode(k));
    }
    h || (e.innerHTML = a + " ", h = e.firstChild.nodeValue.slice(0, -1));
    return d[a] = h;
  });
};
l.b.ye = function(a) {
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
l.b.De = /&([^;\s<&]+);?/g;
l.b.em = function(a, c) {
  return l.b.Ee(a.replace(/  /g, " &#160;"), c);
};
l.b.vl = function(a) {
  return a.replace(/(^|[\n ]) /g, "$1" + l.b.Be.Ae);
};
l.b.Tl = function(a, c) {
  for (var d = c.length, e = 0;e < d;e++) {
    var f = 1 == d ? c : c.charAt(e);
    if (a.charAt(0) == f && a.charAt(a.length - 1) == f) {
      return a.substring(1, a.length - 1);
    }
  }
  return a;
};
l.b.truncate = function(a, c, d) {
  d && (a = l.b.Lc(a));
  a.length > c && (a = a.substring(0, c - 3) + "...");
  d && (a = l.b.Kc(a));
  return a;
};
l.b.am = function(a, c, d, e) {
  d && (a = l.b.Lc(a));
  if (e && a.length > c) {
    e > c && (e = c), a = a.substring(0, c - e) + "..." + a.substring(a.length - e);
  } else {
    if (a.length > c) {
      e = Math.floor(c / 2);
      var f = a.length - e;
      a = a.substring(0, e + c % 2) + "..." + a.substring(f);
    }
  }
  d && (a = l.b.Kc(a));
  return a;
};
l.b.vb = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
l.b.Za = {"'":"\\'"};
l.b.quote = function(a) {
  a = String(a);
  if (a.quote) {
    return a.quote();
  }
  for (var c = ['"'], d = 0;d < a.length;d++) {
    var e = a.charAt(d), f = e.charCodeAt(0);
    c[d + 1] = l.b.vb[e] || (31 < f && 127 > f ? e : l.b.Jc(e));
  }
  c.push('"');
  return c.join("");
};
l.b.fk = function(a) {
  for (var c = [], d = 0;d < a.length;d++) {
    c[d] = l.b.Jc(a.charAt(d));
  }
  return c.join("");
};
l.b.Jc = function(a) {
  if (a in l.b.Za) {
    return l.b.Za[a];
  }
  if (a in l.b.vb) {
    return l.b.Za[a] = l.b.vb[a];
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
  return l.b.Za[a] = c;
};
l.b.contains = function(a, c) {
  return-1 != a.indexOf(c);
};
l.b.Yd = function(a, c) {
  return l.b.contains(a.toLowerCase(), c.toLowerCase());
};
l.b.Vj = function(a, c) {
  return a && c ? a.split(c).length - 1 : 0;
};
l.b.Ba = function(a, c, d) {
  var e = a;
  0 <= c && c < a.length && 0 < d && (e = a.substr(0, c) + a.substr(c + d, a.length - c - d));
  return e;
};
l.b.remove = function(a, c) {
  var d = new RegExp(l.b.xb(c), "");
  return a.replace(d, "");
};
l.b.removeAll = function(a, c) {
  var d = new RegExp(l.b.xb(c), "g");
  return a.replace(d, "");
};
l.b.xb = function(a) {
  return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
};
l.b.repeat = function(a, c) {
  return Array(c + 1).join(a);
};
l.b.ul = function(a, c, d) {
  a = l.P(d) ? a.toFixed(d) : String(a);
  d = a.indexOf(".");
  -1 == d && (d = a.length);
  return l.b.repeat("0", Math.max(0, c - d)) + a;
};
l.b.ze = function(a) {
  return null == a ? "" : String(a);
};
l.b.$d = function(a) {
  return Array.prototype.join.call(arguments, "");
};
l.b.Zb = function() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ l.now()).toString(36);
};
l.b.ya = function(a, c) {
  for (var d = 0, e = l.b.trim(String(a)).split("."), f = l.b.trim(String(c)).split("."), g = Math.max(e.length, f.length), h = 0;0 == d && h < g;h++) {
    var k = e[h] || "", n = f[h] || "", p = /(\d*)(\D*)/g, u = /(\d*)(\D*)/g;
    do {
      var q = p.exec(k) || ["", "", ""], r = u.exec(n) || ["", "", ""];
      if (0 == q[0].length && 0 == r[0].length) {
        break;
      }
      d = l.b.yb(0 == q[1].length ? 0 : parseInt(q[1], 10), 0 == r[1].length ? 0 : parseInt(r[1], 10)) || l.b.yb(0 == q[2].length, 0 == r[2].length) || l.b.yb(q[2], r[2]);
    } while (0 == d);
  }
  return d;
};
l.b.yb = function(a, c) {
  return a < c ? -1 : a > c ? 1 : 0;
};
l.b.Ce = 4294967296;
l.b.Ak = function(a) {
  for (var c = 0, d = 0;d < a.length;++d) {
    c = 31 * c + a.charCodeAt(d), c %= l.b.Ce;
  }
  return c;
};
l.b.Ge = 2147483648 * Math.random() | 0;
l.b.Zj = function() {
  return "goog_" + l.b.Ge++;
};
l.b.Yl = function(a) {
  var c = Number(a);
  return 0 == c && l.b.wb(a) ? NaN : c;
};
l.b.Sk = function(a) {
  return/^[a-z]+([A-Z][a-z]*)*$/.test(a);
};
l.b.$k = function(a) {
  return/^([A-Z][a-z]*)+$/.test(a);
};
l.b.Xl = function(a) {
  return String(a).replace(/\-([a-z])/g, function(a, d) {
    return d.toUpperCase();
  });
};
l.b.Zl = function(a) {
  return String(a).replace(/([A-Z])/g, "-$1").toLowerCase();
};
l.b.$l = function(a, c) {
  var d = l.isString(c) ? l.b.xb(c) : "\\s";
  return a.replace(new RegExp("(^" + (d ? "|[" + d + "]+" : "") + ")([a-z])", "g"), function(a, c, d) {
    return c + d.toUpperCase();
  });
};
l.b.Hj = function(a) {
  return String(a.charAt(0)).toUpperCase() + String(a.substr(1)).toLowerCase();
};
l.b.parseInt = function(a) {
  isFinite(a) && (a = String(a));
  return l.isString(a) ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN;
};
l.b.Nl = function(a, c, d) {
  a = a.split(c);
  for (var e = [];0 < d && a.length;) {
    e.push(a.shift()), d--;
  }
  a.length && e.push(a.join(c));
  return e;
};
l.b.ck = function(a, c) {
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
    for (var g = 0;g < c.length;g++) {
      e[g + 1] = Math.min(e[g] + 1, d[g + 1] + 1, d[g] + (a[f] != c[g]));
    }
    for (g = 0;g < d.length;g++) {
      d[g] = e[g];
    }
  }
  return e[c.length];
};
l.i = {};
l.i.L = l.ga;
l.i.eb = function(a, c) {
  c.unshift(a);
  l.debug.Error.call(this, l.b.Fe.apply(null, c));
  c.shift();
};
l.ta(l.i.eb, l.debug.Error);
l.i.eb.prototype.name = "AssertionError";
l.i.Ag = function(a) {
  throw a;
};
l.i.Jb = l.i.Ag;
l.i.S = function(a, c, d, e) {
  var f = "Assertion failed";
  if (d) {
    var f = f + (": " + d), g = e
  } else {
    a && (f += ": " + a, g = c);
  }
  a = new l.i.eb("" + f, g || []);
  l.i.Jb(a);
};
l.i.Fl = function(a) {
  l.i.L && (l.i.Jb = a);
};
l.i.assert = function(a, c, d) {
  l.i.L && !a && l.i.S("", null, c, Array.prototype.slice.call(arguments, 2));
  return a;
};
l.i.dd = function(a, c) {
  l.i.L && l.i.Jb(new l.i.eb("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)));
};
l.i.vj = function(a, c, d) {
  l.i.L && !l.isNumber(a) && l.i.S("Expected number but got %s: %s.", [l.I(a), a], c, Array.prototype.slice.call(arguments, 2));
  return a;
};
l.i.yj = function(a, c, d) {
  l.i.L && !l.isString(a) && l.i.S("Expected string but got %s: %s.", [l.I(a), a], c, Array.prototype.slice.call(arguments, 2));
  return a;
};
l.i.tj = function(a, c, d) {
  l.i.L && !l.isFunction(a) && l.i.S("Expected function but got %s: %s.", [l.I(a), a], c, Array.prototype.slice.call(arguments, 2));
  return a;
};
l.i.wj = function(a, c, d) {
  l.i.L && !l.isObject(a) && l.i.S("Expected object but got %s: %s.", [l.I(a), a], c, Array.prototype.slice.call(arguments, 2));
  return a;
};
l.i.qj = function(a, c, d) {
  l.i.L && !l.isArray(a) && l.i.S("Expected array but got %s: %s.", [l.I(a), a], c, Array.prototype.slice.call(arguments, 2));
  return a;
};
l.i.rj = function(a, c, d) {
  l.i.L && !l.kf(a) && l.i.S("Expected boolean but got %s: %s.", [l.I(a), a], c, Array.prototype.slice.call(arguments, 2));
  return a;
};
l.i.sj = function(a, c, d) {
  !l.i.L || l.isObject(a) && a.nodeType == l.Xc.jf.hf || l.i.S("Expected Element but got %s: %s.", [l.I(a), a], c, Array.prototype.slice.call(arguments, 2));
  return a;
};
l.i.uj = function(a, c, d, e) {
  !l.i.L || a instanceof c || l.i.S("Expected instanceof %s but got %s.", [l.i.Zc(c), l.i.Zc(a)], d, Array.prototype.slice.call(arguments, 3));
  return a;
};
l.i.xj = function() {
  for (var a in Object.prototype) {
    l.i.dd(a + " should not be enumerable in Object.prototype.");
  }
};
l.i.Zc = function(a) {
  return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a;
};
l.a = {};
l.U = l.Ub;
l.a.T = !1;
l.a.Uh = function(a) {
  return a[a.length - 1];
};
l.a.bl = l.a.Uh;
l.a.n = Array.prototype;
l.a.indexOf = l.U && (l.a.T || l.a.n.indexOf) ? function(a, c, d) {
  return l.a.n.indexOf.call(a, c, d);
} : function(a, c, d) {
  d = null == d ? 0 : 0 > d ? Math.max(0, a.length + d) : d;
  if (l.isString(a)) {
    return l.isString(c) && 1 == c.length ? a.indexOf(c, d) : -1;
  }
  for (;d < a.length;d++) {
    if (d in a && a[d] === c) {
      return d;
    }
  }
  return-1;
};
l.a.lastIndexOf = l.U && (l.a.T || l.a.n.lastIndexOf) ? function(a, c, d) {
  return l.a.n.lastIndexOf.call(a, c, null == d ? a.length - 1 : d);
} : function(a, c, d) {
  d = null == d ? a.length - 1 : d;
  0 > d && (d = Math.max(0, a.length + d));
  if (l.isString(a)) {
    return l.isString(c) && 1 == c.length ? a.lastIndexOf(c, d) : -1;
  }
  for (;0 <= d;d--) {
    if (d in a && a[d] === c) {
      return d;
    }
  }
  return-1;
};
l.a.forEach = l.U && (l.a.T || l.a.n.forEach) ? function(a, c, d) {
  l.a.n.forEach.call(a, c, d);
} : function(a, c, d) {
  for (var e = a.length, f = l.isString(a) ? a.split("") : a, g = 0;g < e;g++) {
    g in f && c.call(d, f[g], g, a);
  }
};
l.a.Fc = function(a, c, d) {
  for (var e = a.length, f = l.isString(a) ? a.split("") : a, e = e - 1;0 <= e;--e) {
    e in f && c.call(d, f[e], e, a);
  }
};
l.a.filter = l.U && (l.a.T || l.a.n.filter) ? function(a, c, d) {
  return l.a.n.filter.call(a, c, d);
} : function(a, c, d) {
  for (var e = a.length, f = [], g = 0, h = l.isString(a) ? a.split("") : a, k = 0;k < e;k++) {
    if (k in h) {
      var n = h[k];
      c.call(d, n, k, a) && (f[g++] = n);
    }
  }
  return f;
};
l.a.map = l.U && (l.a.T || l.a.n.map) ? function(a, c, d) {
  return l.a.n.map.call(a, c, d);
} : function(a, c, d) {
  for (var e = a.length, f = Array(e), g = l.isString(a) ? a.split("") : a, h = 0;h < e;h++) {
    h in g && (f[h] = c.call(d, g[h], h, a));
  }
  return f;
};
l.a.reduce = l.U && (l.a.T || l.a.n.reduce) ? function(a, c, d, e) {
  e && (c = l.bind(c, e));
  return l.a.n.reduce.call(a, c, d);
} : function(a, c, d, e) {
  var f = d;
  l.a.forEach(a, function(d, h) {
    f = c.call(e, f, d, h, a);
  });
  return f;
};
l.a.reduceRight = l.U && (l.a.T || l.a.n.reduceRight) ? function(a, c, d, e) {
  e && (c = l.bind(c, e));
  return l.a.n.reduceRight.call(a, c, d);
} : function(a, c, d, e) {
  var f = d;
  l.a.Fc(a, function(d, h) {
    f = c.call(e, f, d, h, a);
  });
  return f;
};
l.a.some = l.U && (l.a.T || l.a.n.some) ? function(a, c, d) {
  return l.a.n.some.call(a, c, d);
} : function(a, c, d) {
  for (var e = a.length, f = l.isString(a) ? a.split("") : a, g = 0;g < e;g++) {
    if (g in f && c.call(d, f[g], g, a)) {
      return!0;
    }
  }
  return!1;
};
l.a.every = l.U && (l.a.T || l.a.n.every) ? function(a, c, d) {
  return l.a.n.every.call(a, c, d);
} : function(a, c, d) {
  for (var e = a.length, f = l.isString(a) ? a.split("") : a, g = 0;g < e;g++) {
    if (g in f && !c.call(d, f[g], g, a)) {
      return!1;
    }
  }
  return!0;
};
l.a.count = function(a, c, d) {
  var e = 0;
  l.a.forEach(a, function(a, g, h) {
    c.call(d, a, g, h) && ++e;
  }, d);
  return e;
};
l.a.find = function(a, c, d) {
  c = l.a.Ec(a, c, d);
  return 0 > c ? null : l.isString(a) ? a.charAt(c) : a[c];
};
l.a.Ec = function(a, c, d) {
  for (var e = a.length, f = l.isString(a) ? a.split("") : a, g = 0;g < e;g++) {
    if (g in f && c.call(d, f[g], g, a)) {
      return g;
    }
  }
  return-1;
};
l.a.hk = function(a, c, d) {
  c = l.a.se(a, c, d);
  return 0 > c ? null : l.isString(a) ? a.charAt(c) : a[c];
};
l.a.se = function(a, c, d) {
  for (var e = a.length, f = l.isString(a) ? a.split("") : a, e = e - 1;0 <= e;e--) {
    if (e in f && c.call(d, f[e], e, a)) {
      return e;
    }
  }
  return-1;
};
l.a.contains = function(a, c) {
  return 0 <= l.a.indexOf(a, c);
};
l.a.K = function(a) {
  return 0 == a.length;
};
l.a.clear = function(a) {
  if (!l.isArray(a)) {
    for (var c = a.length - 1;0 <= c;c--) {
      delete a[c];
    }
  }
  a.length = 0;
};
l.a.insert = function(a, c) {
  l.a.contains(a, c) || a.push(c);
};
l.a.Gc = function(a, c, d) {
  l.a.splice(a, d, 0, c);
};
l.a.Ck = function(a, c, d) {
  l.qb(l.a.splice, a, d, 0).apply(null, c);
};
l.a.insertBefore = function(a, c, d) {
  var e;
  2 == arguments.length || 0 > (e = l.a.indexOf(a, d)) ? a.push(c) : l.a.Gc(a, c, e);
};
l.a.remove = function(a, c) {
  var d = l.a.indexOf(a, c), e;
  (e = 0 <= d) && l.a.Ba(a, d);
  return e;
};
l.a.Ba = function(a, c) {
  return 1 == l.a.n.splice.call(a, c, 1).length;
};
l.a.Al = function(a, c, d) {
  c = l.a.Ec(a, c, d);
  return 0 <= c ? (l.a.Ba(a, c), !0) : !1;
};
l.a.yl = function(a, c, d) {
  var e = 0;
  l.a.Fc(a, function(f, g) {
    c.call(d, f, g, a) && l.a.Ba(a, g) && e++;
  });
  return e;
};
l.a.concat = function(a) {
  return l.a.n.concat.apply(l.a.n, arguments);
};
l.a.join = function(a) {
  return l.a.n.concat.apply(l.a.n, arguments);
};
l.a.Z = function(a) {
  var c = a.length;
  if (0 < c) {
    for (var d = Array(c), e = 0;e < c;e++) {
      d[e] = a[e];
    }
    return d;
  }
  return[];
};
l.a.clone = l.a.Z;
l.a.extend = function(a, c) {
  for (var d = 1;d < arguments.length;d++) {
    var e = arguments[d];
    if (l.v(e)) {
      var f = a.length || 0, g = e.length || 0;
      a.length = f + g;
      for (var h = 0;h < g;h++) {
        a[f + h] = e[h];
      }
    } else {
      a.push(e);
    }
  }
};
l.a.splice = function(a, c, d, e) {
  return l.a.n.splice.apply(a, l.a.slice(arguments, 1));
};
l.a.slice = function(a, c, d) {
  return 2 >= arguments.length ? l.a.n.slice.call(a, c) : l.a.n.slice.call(a, c, d);
};
l.a.ue = function(a, c, d) {
  c = c || a;
  d = d || function() {
    return l.isObject(h) ? "o" + l.Ud(h) : (typeof h).charAt(0) + h;
  };
  for (var e = {}, f = 0, g = 0;g < a.length;) {
    var h = a[g++], k = d(h);
    Object.prototype.hasOwnProperty.call(e, k) || (e[k] = !0, c[f++] = h);
  }
  c.length = f;
};
l.a.Bc = function(a, c, d) {
  return l.a.Cc(a, d || l.a.$, !1, c);
};
l.a.Bj = function(a, c, d) {
  return l.a.Cc(a, c, !0, void 0, d);
};
l.a.Cc = function(a, c, d, e, f) {
  for (var g = 0, h = a.length, k;g < h;) {
    var n = g + h >> 1, p;
    p = d ? c.call(f, a[n], n, a) : c(e, a[n]);
    0 < p ? g = n + 1 : (h = n, k = !p);
  }
  return k ? g : ~g;
};
l.a.sort = function(a, c) {
  a.sort(c || l.a.$);
};
l.a.Ol = function(a, c) {
  for (var d = 0;d < a.length;d++) {
    a[d] = {index:d, value:a[d]};
  }
  var e = c || l.a.$;
  l.a.sort(a, function(a, c) {
    return e(a.value, c.value) || a.index - c.index;
  });
  for (d = 0;d < a.length;d++) {
    a[d] = a[d].value;
  }
};
l.a.ve = function(a, c, d) {
  var e = d || l.a.$;
  l.a.sort(a, function(a, d) {
    return e(c(a), c(d));
  });
};
l.a.Ml = function(a, c, d) {
  l.a.ve(a, function(a) {
    return a[c];
  }, d);
};
l.a.dc = function(a, c, d) {
  c = c || l.a.$;
  for (var e = 1;e < a.length;e++) {
    var f = c(a[e - 1], a[e]);
    if (0 < f || 0 == f && d) {
      return!1;
    }
  }
  return!0;
};
l.a.equals = function(a, c, d) {
  if (!l.v(a) || !l.v(c) || a.length != c.length) {
    return!1;
  }
  var e = a.length;
  d = d || l.a.bc;
  for (var f = 0;f < e;f++) {
    if (!d(a[f], c[f])) {
      return!1;
    }
  }
  return!0;
};
l.a.Rj = function(a, c, d) {
  d = d || l.a.$;
  for (var e = Math.min(a.length, c.length), f = 0;f < e;f++) {
    var g = d(a[f], c[f]);
    if (0 != g) {
      return g;
    }
  }
  return l.a.$(a.length, c.length);
};
l.a.$ = function(a, c) {
  return a > c ? 1 : a < c ? -1 : 0;
};
l.a.Dk = function(a, c) {
  return-l.a.$(a, c);
};
l.a.bc = function(a, c) {
  return a === c;
};
l.a.zj = function(a, c, d) {
  d = l.a.Bc(a, c, d);
  return 0 > d ? (l.a.Gc(a, c, -(d + 1)), !0) : !1;
};
l.a.Aj = function(a, c, d) {
  c = l.a.Bc(a, c, d);
  return 0 <= c ? l.a.Ba(a, c) : !1;
};
l.a.Cj = function(a, c, d) {
  for (var e = {}, f = 0;f < a.length;f++) {
    var g = a[f], h = c.call(d, g, f, a);
    l.P(h) && (e[h] || (e[h] = [])).push(g);
  }
  return e;
};
l.a.Xh = function(a, c, d) {
  var e = {};
  l.a.forEach(a, function(f, g) {
    e[c.call(d, f, g, a)] = f;
  });
  return e;
};
l.a.Ua = function(a, c, d) {
  var e = [], f = 0, g = a;
  d = d || 1;
  void 0 !== c && (f = a, g = c);
  if (0 > d * (g - f)) {
    return[];
  }
  if (0 < d) {
    for (a = f;a < g;a += d) {
      e.push(a);
    }
  } else {
    for (a = f;a > g;a += d) {
      e.push(a);
    }
  }
  return e;
};
l.a.repeat = function(a, c) {
  for (var d = [], e = 0;e < c;e++) {
    d[e] = a;
  }
  return d;
};
l.a.te = function(a) {
  for (var c = [], d = 0;d < arguments.length;d++) {
    var e = arguments[d];
    if (l.isArray(e)) {
      for (var f = 0;f < e.length;f += 8192) {
        for (var g = l.a.slice(e, f, f + 8192), g = l.a.te.apply(null, g), h = 0;h < g.length;h++) {
          c.push(g[h]);
        }
      }
    } else {
      c.push(e);
    }
  }
  return c;
};
l.a.rotate = function(a, c) {
  a.length && (c %= a.length, 0 < c ? l.a.n.unshift.apply(a, a.splice(-c, c)) : 0 > c && l.a.n.push.apply(a, a.splice(0, -c)));
  return a;
};
l.a.jl = function(a, c, d) {
  c = l.a.n.splice.call(a, c, 1);
  l.a.n.splice.call(a, d, 0, c[0]);
};
l.a.Vc = function(a) {
  if (!arguments.length) {
    return[];
  }
  for (var c = [], d = 0;;d++) {
    for (var e = [], f = 0;f < arguments.length;f++) {
      var g = arguments[f];
      if (d >= g.length) {
        return c;
      }
      e.push(g[d]);
    }
    c.push(e);
  }
};
l.a.Ll = function(a, c) {
  for (var d = c || Math.random, e = a.length - 1;0 < e;e--) {
    var f = Math.floor(d() * (e + 1)), g = a[e];
    a[e] = a[f];
    a[f] = g;
  }
};
l.a.Uj = function(a, c) {
  var d = [];
  l.a.forEach(c, function(c) {
    d.push(a[c]);
  });
  return d;
};
l.o = {};
l.o.constant = function(a) {
  return function() {
    return a;
  };
};
l.o.qi = l.o.constant(!1);
l.o.$i = l.o.constant(!0);
l.o.Ni = l.o.constant(null);
l.o.identity = function(a) {
  return a;
};
l.o.error = function(a) {
  return function() {
    throw Error(a);
  };
};
l.o.dd = function(a) {
  return function() {
    throw a;
  };
};
l.o.el = function(a, c) {
  c = c || 0;
  return function() {
    return a.apply(this, Array.prototype.slice.call(arguments, 0, c));
  };
};
l.o.ol = function(a) {
  return function() {
    return arguments[a];
  };
};
l.o.fm = function(a, c) {
  return l.o.Pf(a, l.o.constant(c));
};
l.o.ek = function(a, c) {
  return function(d) {
    return c ? a == d : a === d;
  };
};
l.o.Sj = function(a, c) {
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
l.o.Pf = function(a) {
  var c = arguments, d = c.length;
  return function() {
    for (var a, f = 0;f < d;f++) {
      a = c[f].apply(this, arguments);
    }
    return a;
  };
};
l.o.ij = function(a) {
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
l.o.tl = function(a) {
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
l.o.Re = function(a) {
  return function() {
    return!a.apply(this, arguments);
  };
};
l.o.create = function(a, c) {
  var d = function() {
  };
  d.prototype = a.prototype;
  d = new d;
  a.apply(d, Array.prototype.slice.call(arguments, 1));
  return d;
};
l.o.Of = !0;
l.o.Fj = function(a) {
  var c = !1, d;
  return function() {
    if (!l.o.Of) {
      return a();
    }
    c || (d = a(), c = !0);
    return d;
  };
};
l.k = {};
l.k.xl = function(a) {
  return Math.floor(Math.random() * a);
};
l.k.cm = function(a, c) {
  return a + Math.random() * (c - a);
};
l.k.Mj = function(a, c, d) {
  return Math.min(Math.max(a, c), d);
};
l.k.hd = function(a, c) {
  var d = a % c;
  return 0 > d * c ? d + c : d;
};
l.k.cl = function(a, c, d) {
  return a + d * (c - a);
};
l.k.kl = function(a, c, d) {
  return Math.abs(a - c) <= (d || 1E-6);
};
l.k.Nb = function(a) {
  return l.k.hd(a, 360);
};
l.k.Pl = function(a) {
  return l.k.hd(a, 2 * Math.PI);
};
l.k.jd = function(a) {
  return a * Math.PI / 180;
};
l.k.Hf = function(a) {
  return 180 * a / Math.PI;
};
l.k.lj = function(a, c) {
  return c * Math.cos(l.k.jd(a));
};
l.k.mj = function(a, c) {
  return c * Math.sin(l.k.jd(a));
};
l.k.jj = function(a, c, d, e) {
  return l.k.Nb(l.k.Hf(Math.atan2(e - c, d - a)));
};
l.k.kj = function(a, c) {
  var d = l.k.Nb(c) - l.k.Nb(a);
  180 < d ? d -= 360 : -180 >= d && (d = 360 + d);
  return d;
};
l.k.sign = function(a) {
  return 0 == a ? 0 : 0 > a ? -1 : 1;
};
l.k.hl = function(a, c, d, e) {
  d = d || function(a, c) {
    return a == c;
  };
  e = e || function(c) {
    return a[c];
  };
  for (var f = a.length, g = c.length, h = [], k = 0;k < f + 1;k++) {
    h[k] = [], h[k][0] = 0;
  }
  for (var n = 0;n < g + 1;n++) {
    h[0][n] = 0;
  }
  for (k = 1;k <= f;k++) {
    for (n = 1;n <= g;n++) {
      d(a[k - 1], c[n - 1]) ? h[k][n] = h[k - 1][n - 1] + 1 : h[k][n] = Math.max(h[k - 1][n], h[k][n - 1]);
    }
  }
  for (var p = [], k = f, n = g;0 < k && 0 < n;) {
    d(a[k - 1], c[n - 1]) ? (p.unshift(e(k - 1, n - 1)), k--, n--) : h[k - 1][n] > h[k][n - 1] ? k-- : n--;
  }
  return p;
};
l.k.mc = function(a) {
  return l.a.reduce(arguments, function(a, d) {
    return a + d;
  }, 0);
};
l.k.me = function(a) {
  return l.k.mc.apply(null, arguments) / arguments.length;
};
l.k.Lf = function(a) {
  var c = arguments.length;
  if (2 > c) {
    return 0;
  }
  var d = l.k.me.apply(null, arguments);
  return l.k.mc.apply(null, l.a.map(arguments, function(a) {
    return Math.pow(a - d, 2);
  })) / (c - 1);
};
l.k.Ql = function(a) {
  return Math.sqrt(l.k.Lf.apply(null, arguments));
};
l.k.Qk = function(a) {
  return isFinite(a) && 0 == a % 1;
};
l.k.Nk = function(a) {
  return isFinite(a) && !isNaN(a);
};
l.k.fl = function(a) {
  if (0 < a) {
    var c = Math.round(Math.log(a) * Math.LOG10E);
    return c - (parseFloat("1e" + c) > a);
  }
  return 0 == a ? -Infinity : NaN;
};
l.k.Dl = function(a, c) {
  return Math.floor(a + (c || 2E-15));
};
l.k.Cl = function(a, c) {
  return Math.ceil(a - (c || 2E-15));
};
l.e = {};
l.e.A = "StopIteration" in l.global ? l.global.StopIteration : Error("StopIteration");
l.e.Iterator = function() {
};
l.e.Iterator.prototype.next = function() {
  throw l.e.A;
};
l.e.Iterator.prototype.zb = function() {
  return this;
};
l.e.s = function(a) {
  if (a instanceof l.e.Iterator) {
    return a;
  }
  if ("function" == typeof a.zb) {
    return a.zb(!1);
  }
  if (l.v(a)) {
    var c = 0, d = new l.e.Iterator;
    d.next = function() {
      for (;;) {
        if (c >= a.length) {
          throw l.e.A;
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
l.e.forEach = function(a, c, d) {
  if (l.v(a)) {
    try {
      l.a.forEach(a, c, d);
    } catch (e) {
      if (e !== l.e.A) {
        throw e;
      }
    }
  } else {
    a = l.e.s(a);
    try {
      for (;;) {
        c.call(d, a.next(), void 0, a);
      }
    } catch (f) {
      if (f !== l.e.A) {
        throw f;
      }
    }
  }
};
l.e.filter = function(a, c, d) {
  var e = l.e.s(a);
  a = new l.e.Iterator;
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
l.e.gk = function(a, c, d) {
  return l.e.filter(a, l.o.Re(c), d);
};
l.e.Ua = function(a, c, d) {
  var e = 0, f = a, g = d || 1;
  1 < arguments.length && (e = a, f = c);
  if (0 == g) {
    throw Error("Range step argument must not be zero");
  }
  var h = new l.e.Iterator;
  h.next = function() {
    if (0 < g && e >= f || 0 > g && e <= f) {
      throw l.e.A;
    }
    var a = e;
    e += g;
    return a;
  };
  return h;
};
l.e.join = function(a, c) {
  return l.e.Z(a).join(c);
};
l.e.map = function(a, c, d) {
  var e = l.e.s(a);
  a = new l.e.Iterator;
  a.next = function() {
    var a = e.next();
    return c.call(d, a, void 0, e);
  };
  return a;
};
l.e.reduce = function(a, c, d, e) {
  var f = d;
  l.e.forEach(a, function(a) {
    f = c.call(e, f, a);
  });
  return f;
};
l.e.some = function(a, c, d) {
  a = l.e.s(a);
  try {
    for (;;) {
      if (c.call(d, a.next(), void 0, a)) {
        return!0;
      }
    }
  } catch (e) {
    if (e !== l.e.A) {
      throw e;
    }
  }
  return!1;
};
l.e.every = function(a, c, d) {
  a = l.e.s(a);
  try {
    for (;;) {
      if (!c.call(d, a.next(), void 0, a)) {
        return!1;
      }
    }
  } catch (e) {
    if (e !== l.e.A) {
      throw e;
    }
  }
  return!0;
};
l.e.Lj = function(a) {
  return l.e.df(arguments);
};
l.e.df = function(a) {
  var c = l.e.s(a);
  a = new l.e.Iterator;
  var d = null;
  a.next = function() {
    for (;;) {
      if (null == d) {
        var a = c.next();
        d = l.e.s(a);
      }
      try {
        return d.next();
      } catch (f) {
        if (f !== l.e.A) {
          throw f;
        }
        d = null;
      }
    }
  };
  return a;
};
l.e.bk = function(a, c, d) {
  var e = l.e.s(a);
  a = new l.e.Iterator;
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
l.e.Vl = function(a, c, d) {
  var e = l.e.s(a);
  a = new l.e.Iterator;
  a.next = function() {
    var a = e.next();
    if (c.call(d, a, void 0, e)) {
      return a;
    }
    throw l.e.A;
  };
  return a;
};
l.e.Z = function(a) {
  if (l.v(a)) {
    return l.a.Z(a);
  }
  a = l.e.s(a);
  var c = [];
  l.e.forEach(a, function(a) {
    c.push(a);
  });
  return c;
};
l.e.equals = function(a, c, d) {
  a = l.e.de({}, a, c);
  var e = d || l.a.bc;
  return l.e.every(a, function(a) {
    return e(a[0], a[1]);
  });
};
l.e.$e = function(a, c) {
  try {
    return l.e.s(a).next();
  } catch (d) {
    if (d != l.e.A) {
      throw d;
    }
    return c;
  }
};
l.e.product = function(a) {
  if (l.a.some(arguments, function(a) {
    return!a.length;
  }) || !arguments.length) {
    return new l.e.Iterator;
  }
  var c = new l.e.Iterator, d = arguments, e = l.a.repeat(0, d.length);
  c.next = function() {
    if (e) {
      for (var a = l.a.map(e, function(a, c) {
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
    throw l.e.A;
  };
  return c;
};
l.e.$j = function(a) {
  var c = l.e.s(a), d = [], e = 0;
  a = new l.e.Iterator;
  var f = !1;
  a.next = function() {
    var a = null;
    if (!f) {
      try {
        return a = c.next(), d.push(a), a;
      } catch (h) {
        if (h != l.e.A || l.a.K(d)) {
          throw h;
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
l.e.count = function(a, c) {
  var d = a || 0, e = l.P(c) ? c : 1, f = new l.e.Iterator;
  f.next = function() {
    var a = d;
    d += e;
    return a;
  };
  return f;
};
l.e.repeat = function(a) {
  var c = new l.e.Iterator;
  c.next = l.o.constant(a);
  return c;
};
l.e.fj = function(a) {
  var c = l.e.s(a), d = 0;
  a = new l.e.Iterator;
  a.next = function() {
    return d += c.next();
  };
  return a;
};
l.e.Vc = function(a) {
  var c = arguments, d = new l.e.Iterator;
  if (0 < c.length) {
    var e = l.a.map(c, l.e.s);
    d.next = function() {
      return l.a.map(e, function(a) {
        return a.next();
      });
    };
  }
  return d;
};
l.e.de = function(a, c) {
  var d = l.a.slice(arguments, 1), e = new l.e.Iterator;
  if (0 < d.length) {
    var f = l.a.map(d, l.e.s);
    e.next = function() {
      var c = !1, d = l.a.map(f, function(d) {
        var e;
        try {
          e = d.next(), c = !0;
        } catch (f) {
          if (f !== l.e.A) {
            throw f;
          }
          e = a;
        }
        return e;
      });
      if (!c) {
        throw l.e.A;
      }
      return d;
    };
  }
  return e;
};
l.e.Tj = function(a, c) {
  var d = l.e.s(c);
  return l.e.filter(a, function() {
    return!!d.next();
  });
};
l.e.bb = function(a, c) {
  this.iterator = l.e.s(a);
  this.nc = c || l.o.identity;
};
l.ta(l.e.bb, l.e.Iterator);
l.e.bb.prototype.next = function() {
  for (;this.Ca == this.qd;) {
    this.$a = this.iterator.next(), this.Ca = this.nc(this.$a);
  }
  this.qd = this.Ca;
  return[this.Ca, this.hg(this.qd)];
};
l.e.bb.prototype.hg = function(a) {
  for (var c = [];this.Ca == a;) {
    c.push(this.$a);
    try {
      this.$a = this.iterator.next();
    } catch (d) {
      if (d !== l.e.A) {
        throw d;
      }
      break;
    }
    this.Ca = this.nc(this.$a);
  }
  return c;
};
l.e.xk = function(a, c) {
  return new l.e.bb(a, c);
};
l.e.Rl = function(a, c, d) {
  var e = l.e.s(a);
  a = new l.e.Iterator;
  a.next = function() {
    var a = l.e.Z(e.next());
    return c.apply(d, l.a.concat(a, void 0, e));
  };
  return a;
};
l.e.Wl = function(a, c) {
  var d = l.e.s(a), e = l.isNumber(c) ? c : 2, f = l.a.map(l.a.Ua(e), function() {
    return[];
  }), g = function() {
    var a = d.next();
    l.a.forEach(f, function(c) {
      c.push(a);
    });
  };
  return l.a.map(f, function(a) {
    var c = new l.e.Iterator;
    c.next = function() {
      l.a.K(a) && g();
      return a.shift();
    };
    return c;
  });
};
l.e.dk = function(a, c) {
  return l.e.Vc(l.e.count(c), a);
};
l.e.limit = function(a, c) {
  var d = l.e.s(a), e = new l.e.Iterator, f = c;
  e.next = function() {
    if (0 < f--) {
      return d.next();
    }
    throw l.e.A;
  };
  return e;
};
l.e.ef = function(a, c) {
  for (var d = l.e.s(a);0 < c--;) {
    l.e.$e(d, null);
  }
  return d;
};
l.e.slice = function(a, c, d) {
  a = l.e.ef(a, c);
  l.isNumber(d) && (a = l.e.limit(a, d - c));
  return a;
};
l.e.ce = function(a) {
  var c = [];
  l.a.ue(a, c);
  return a.length != c.length;
};
l.e.be = function(a, c) {
  var d = l.e.Z(a), e = l.isNumber(c) ? c : d.length, d = l.a.repeat(d, e), d = l.e.product.apply(void 0, d);
  return l.e.filter(d, function(a) {
    return!l.e.ce(a);
  });
};
l.e.Pj = function(a, c) {
  function d(a) {
    return e[a];
  }
  var e = l.e.Z(a), f = l.e.Ua(e.length), f = l.e.be(f, c), g = l.e.filter(f, function(a) {
    return l.a.dc(a);
  }), f = new l.e.Iterator;
  f.next = function() {
    return l.a.map(g.next(), d);
  };
  return f;
};
l.e.Qj = function(a, c) {
  function d(a) {
    return e[a];
  }
  var e = l.e.Z(a), f = l.a.Ua(e.length), f = l.a.repeat(f, c), f = l.e.product.apply(void 0, f), g = l.e.filter(f, function(a) {
    return l.a.dc(a);
  }), f = new l.e.Iterator;
  f.next = function() {
    return l.a.map(g.next(), d);
  };
  return f;
};
l.object = {};
l.object.forEach = function(a, c, d) {
  for (var e in a) {
    c.call(d, a[e], e, a);
  }
};
l.object.filter = function(a, c, d) {
  var e = {}, f;
  for (f in a) {
    c.call(d, a[f], f, a) && (e[f] = a[f]);
  }
  return e;
};
l.object.map = function(a, c, d) {
  var e = {}, f;
  for (f in a) {
    e[f] = c.call(d, a[f], f, a);
  }
  return e;
};
l.object.some = function(a, c, d) {
  for (var e in a) {
    if (c.call(d, a[e], e, a)) {
      return!0;
    }
  }
  return!1;
};
l.object.every = function(a, c, d) {
  for (var e in a) {
    if (!c.call(d, a[e], e, a)) {
      return!1;
    }
  }
  return!0;
};
l.object.da = function(a) {
  var c = 0, d;
  for (d in a) {
    c++;
  }
  return c;
};
l.object.kk = function(a) {
  for (var c in a) {
    return c;
  }
};
l.object.lk = function(a) {
  for (var c in a) {
    return a[c];
  }
};
l.object.contains = function(a, c) {
  return l.object.qa(a, c);
};
l.object.t = function(a) {
  var c = [], d = 0, e;
  for (e in a) {
    c[d++] = a[e];
  }
  return c;
};
l.object.w = function(a) {
  var c = [], d = 0, e;
  for (e in a) {
    c[d++] = e;
  }
  return c;
};
l.object.vk = function(a, c) {
  for (var d = l.v(c), e = d ? c : arguments, d = d ? 0 : 1;d < e.length && (a = a[e[d]], l.P(a));d++) {
  }
  return a;
};
l.object.ba = function(a, c) {
  return c in a;
};
l.object.qa = function(a, c) {
  for (var d in a) {
    if (a[d] == c) {
      return!0;
    }
  }
  return!1;
};
l.object.Bh = function(a, c, d) {
  for (var e in a) {
    if (c.call(d, a[e], e, a)) {
      return e;
    }
  }
};
l.object.ik = function(a, c, d) {
  return(c = l.object.Bh(a, c, d)) && a[c];
};
l.object.K = function(a) {
  for (var c in a) {
    return!1;
  }
  return!0;
};
l.object.clear = function(a) {
  for (var c in a) {
    delete a[c];
  }
};
l.object.remove = function(a, c) {
  var d;
  (d = c in a) && delete a[c];
  return d;
};
l.object.add = function(a, c, d) {
  if (c in a) {
    throw Error('The object already contains the key "' + c + '"');
  }
  l.object.set(a, c, d);
};
l.object.get = function(a, c, d) {
  return c in a ? a[c] : d;
};
l.object.set = function(a, c, d) {
  a[c] = d;
};
l.object.Hl = function(a, c, d) {
  return c in a ? a[c] : a[c] = d;
};
l.object.Kl = function(a, c, d) {
  if (c in a) {
    return a[c];
  }
  d = d();
  return a[c] = d;
};
l.object.equals = function(a, c) {
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
l.object.clone = function(a) {
  var c = {}, d;
  for (d in a) {
    c[d] = a[d];
  }
  return c;
};
l.object.kg = function(a) {
  var c = l.I(a);
  if ("object" == c || "array" == c) {
    if (a.clone) {
      return a.clone();
    }
    var c = "array" == c ? [] : {}, d;
    for (d in a) {
      c[d] = l.object.kg(a[d]);
    }
    return c;
  }
  return a;
};
l.object.Yh = function(a) {
  var c = {}, d;
  for (d in a) {
    c[a[d]] = d;
  }
  return c;
};
l.object.Qd = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
l.object.extend = function(a, c) {
  for (var d, e, f = 1;f < arguments.length;f++) {
    e = arguments[f];
    for (d in e) {
      a[d] = e[d];
    }
    for (var g = 0;g < l.object.Qd.length;g++) {
      d = l.object.Qd[g], Object.prototype.hasOwnProperty.call(e, d) && (a[d] = e[d]);
    }
  }
};
l.object.create = function(a) {
  var c = arguments.length;
  if (1 == c && l.isArray(arguments[0])) {
    return l.object.create.apply(null, arguments[0]);
  }
  if (c % 2) {
    throw Error("Uneven number of arguments");
  }
  for (var d = {}, e = 0;e < c;e += 2) {
    d[arguments[e]] = arguments[e + 1];
  }
  return d;
};
l.object.wh = function(a) {
  var c = arguments.length;
  if (1 == c && l.isArray(arguments[0])) {
    return l.object.wh.apply(null, arguments[0]);
  }
  for (var d = {}, e = 0;e < c;e++) {
    d[arguments[e]] = !0;
  }
  return d;
};
l.object.Yj = function(a) {
  var c = a;
  Object.isFrozen && !Object.isFrozen(a) && (c = Object.create(a), Object.freeze(c));
  return c;
};
l.object.Pk = function(a) {
  return!!Object.isFrozen && Object.isFrozen(a);
};
l.j = {};
l.j.Map = function(a, c) {
  this.B = {};
  this.q = [];
  this.Aa = this.p = 0;
  var d = arguments.length;
  if (1 < d) {
    if (d % 2) {
      throw Error("Uneven number of arguments");
    }
    for (var e = 0;e < d;e += 2) {
      this.set(arguments[e], arguments[e + 1]);
    }
  } else {
    a && this.Cf(a);
  }
};
b = l.j.Map.prototype;
b.da = function() {
  return this.p;
};
b.t = function() {
  this.na();
  for (var a = [], c = 0;c < this.q.length;c++) {
    a.push(this.B[this.q[c]]);
  }
  return a;
};
b.w = function() {
  this.na();
  return this.q.concat();
};
b.ba = function(a) {
  return l.j.Map.ca(this.B, a);
};
b.qa = function(a) {
  for (var c = 0;c < this.q.length;c++) {
    var d = this.q[c];
    if (l.j.Map.ca(this.B, d) && this.B[d] == a) {
      return!0;
    }
  }
  return!1;
};
b.equals = function(a, c) {
  if (this === a) {
    return!0;
  }
  if (this.p != a.da()) {
    return!1;
  }
  var d = c || l.j.Map.gf;
  this.na();
  for (var e, f = 0;e = this.q[f];f++) {
    if (!d(this.get(e), a.get(e))) {
      return!1;
    }
  }
  return!0;
};
l.j.Map.gf = function(a, c) {
  return a === c;
};
b = l.j.Map.prototype;
b.K = function() {
  return 0 == this.p;
};
b.clear = function() {
  this.B = {};
  this.Aa = this.p = this.q.length = 0;
};
b.remove = function(a) {
  return l.j.Map.ca(this.B, a) ? (delete this.B[a], this.p--, this.Aa++, this.q.length > 2 * this.p && this.na(), !0) : !1;
};
b.na = function() {
  if (this.p != this.q.length) {
    for (var a = 0, c = 0;a < this.q.length;) {
      var d = this.q[a];
      l.j.Map.ca(this.B, d) && (this.q[c++] = d);
      a++;
    }
    this.q.length = c;
  }
  if (this.p != this.q.length) {
    for (var e = {}, c = a = 0;a < this.q.length;) {
      d = this.q[a], l.j.Map.ca(e, d) || (this.q[c++] = d, e[d] = 1), a++;
    }
    this.q.length = c;
  }
};
b.get = function(a, c) {
  return l.j.Map.ca(this.B, a) ? this.B[a] : c;
};
b.set = function(a, c) {
  l.j.Map.ca(this.B, a) || (this.p++, this.q.push(a), this.Aa++);
  this.B[a] = c;
};
b.Cf = function(a) {
  var c;
  a instanceof l.j.Map ? (c = a.w(), a = a.t()) : (c = l.object.w(a), a = l.object.t(a));
  for (var d = 0;d < c.length;d++) {
    this.set(c[d], a[d]);
  }
};
b.forEach = function(a, c) {
  for (var d = this.w(), e = 0;e < d.length;e++) {
    var f = d[e], g = this.get(f);
    a.call(c, g, f, this);
  }
};
b.clone = function() {
  return new l.j.Map(this);
};
b.Yh = function() {
  for (var a = new l.j.Map, c = 0;c < this.q.length;c++) {
    var d = this.q[c];
    a.set(this.B[d], d);
  }
  return a;
};
b.Xh = function() {
  this.na();
  for (var a = {}, c = 0;c < this.q.length;c++) {
    var d = this.q[c];
    a[d] = this.B[d];
  }
  return a;
};
b.zb = function(a) {
  this.na();
  var c = 0, d = this.q, e = this.B, f = this.Aa, g = this, h = new l.e.Iterator;
  h.next = function() {
    for (;;) {
      if (f != g.Aa) {
        throw Error("The map has changed since the iterator was created");
      }
      if (c >= d.length) {
        throw l.e.A;
      }
      var h = d[c++];
      return a ? h : e[h];
    }
  };
  return h;
};
l.j.Map.ca = function(a, c) {
  return Object.prototype.hasOwnProperty.call(a, c);
};
l.j.da = function(a) {
  return "function" == typeof a.da ? a.da() : l.v(a) || l.isString(a) ? a.length : l.object.da(a);
};
l.j.t = function(a) {
  if ("function" == typeof a.t) {
    return a.t();
  }
  if (l.isString(a)) {
    return a.split("");
  }
  if (l.v(a)) {
    for (var c = [], d = a.length, e = 0;e < d;e++) {
      c.push(a[e]);
    }
    return c;
  }
  return l.object.t(a);
};
l.j.w = function(a) {
  if ("function" == typeof a.w) {
    return a.w();
  }
  if ("function" != typeof a.t) {
    if (l.v(a) || l.isString(a)) {
      var c = [];
      a = a.length;
      for (var d = 0;d < a;d++) {
        c.push(d);
      }
      return c;
    }
    return l.object.w(a);
  }
};
l.j.contains = function(a, c) {
  return "function" == typeof a.contains ? a.contains(c) : "function" == typeof a.qa ? a.qa(c) : l.v(a) || l.isString(a) ? l.a.contains(a, c) : l.object.qa(a, c);
};
l.j.K = function(a) {
  return "function" == typeof a.K ? a.K() : l.v(a) || l.isString(a) ? l.a.K(a) : l.object.K(a);
};
l.j.clear = function(a) {
  "function" == typeof a.clear ? a.clear() : l.v(a) ? l.a.clear(a) : l.object.clear(a);
};
l.j.forEach = function(a, c, d) {
  if ("function" == typeof a.forEach) {
    a.forEach(c, d);
  } else {
    if (l.v(a) || l.isString(a)) {
      l.a.forEach(a, c, d);
    } else {
      for (var e = l.j.w(a), f = l.j.t(a), g = f.length, h = 0;h < g;h++) {
        c.call(d, f[h], e && e[h], a);
      }
    }
  }
};
l.j.filter = function(a, c, d) {
  if ("function" == typeof a.filter) {
    return a.filter(c, d);
  }
  if (l.v(a) || l.isString(a)) {
    return l.a.filter(a, c, d);
  }
  var e, f = l.j.w(a), g = l.j.t(a), h = g.length;
  if (f) {
    e = {};
    for (var k = 0;k < h;k++) {
      c.call(d, g[k], f[k], a) && (e[f[k]] = g[k]);
    }
  } else {
    for (e = [], k = 0;k < h;k++) {
      c.call(d, g[k], void 0, a) && e.push(g[k]);
    }
  }
  return e;
};
l.j.map = function(a, c, d) {
  if ("function" == typeof a.map) {
    return a.map(c, d);
  }
  if (l.v(a) || l.isString(a)) {
    return l.a.map(a, c, d);
  }
  var e, f = l.j.w(a), g = l.j.t(a), h = g.length;
  if (f) {
    e = {};
    for (var k = 0;k < h;k++) {
      e[f[k]] = c.call(d, g[k], f[k], a);
    }
  } else {
    for (e = [], k = 0;k < h;k++) {
      e[k] = c.call(d, g[k], void 0, a);
    }
  }
  return e;
};
l.j.some = function(a, c, d) {
  if ("function" == typeof a.some) {
    return a.some(c, d);
  }
  if (l.v(a) || l.isString(a)) {
    return l.a.some(a, c, d);
  }
  for (var e = l.j.w(a), f = l.j.t(a), g = f.length, h = 0;h < g;h++) {
    if (c.call(d, f[h], e && e[h], a)) {
      return!0;
    }
  }
  return!1;
};
l.j.every = function(a, c, d) {
  if ("function" == typeof a.every) {
    return a.every(c, d);
  }
  if (l.v(a) || l.isString(a)) {
    return l.a.every(a, c, d);
  }
  for (var e = l.j.w(a), f = l.j.t(a), g = f.length, h = 0;h < g;h++) {
    if (!c.call(d, f[h], e && e[h], a)) {
      return!1;
    }
  }
  return!0;
};
l.d = {};
l.d.userAgent = {};
l.d.userAgent.h = {};
l.d.userAgent.h.Dc = function() {
  var a = l.d.userAgent.h.qe();
  return a && (a = a.userAgent) ? a : "";
};
l.d.userAgent.h.qe = function() {
  return l.global.navigator;
};
l.d.userAgent.h.Ac = l.d.userAgent.h.Dc();
l.d.userAgent.h.Jl = function(a) {
  l.d.userAgent.h.Ac = a || l.d.userAgent.h.Dc();
};
l.d.userAgent.h.la = function() {
  return l.d.userAgent.h.Ac;
};
l.d.userAgent.h.m = function(a) {
  return l.b.contains(l.d.userAgent.h.la(), a);
};
l.d.userAgent.h.re = function(a) {
  return l.b.Yd(l.d.userAgent.h.la(), a);
};
l.d.userAgent.h.Yb = function(a) {
  for (var c = /(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g, d = [], e;e = c.exec(a);) {
    d.push([e[1], e[2], e[3] || void 0]);
  }
  return d;
};
l.d.userAgent.browser = {};
l.d.userAgent.browser.Sh = function() {
  return l.d.userAgent.h.m("Opera") || l.d.userAgent.h.m("OPR");
};
l.d.userAgent.browser.Qh = function() {
  return l.d.userAgent.h.m("Trident") || l.d.userAgent.h.m("MSIE");
};
l.d.userAgent.browser.Ph = function() {
  return l.d.userAgent.h.m("Firefox");
};
l.d.userAgent.browser.lc = function() {
  return l.d.userAgent.h.m("Safari") && !l.d.userAgent.h.m("Chrome") && !l.d.userAgent.h.m("CriOS") && !l.d.userAgent.h.m("Android");
};
l.d.userAgent.browser.kc = function() {
  return l.d.userAgent.h.m("Coast");
};
l.d.userAgent.browser.Rh = function() {
  return(l.d.userAgent.h.m("iPad") || l.d.userAgent.h.m("iPhone")) && !l.d.userAgent.browser.lc() && !l.d.userAgent.browser.jc() && !l.d.userAgent.browser.kc() && l.d.userAgent.h.m("AppleWebKit");
};
l.d.userAgent.browser.jc = function() {
  return l.d.userAgent.h.m("Chrome") || l.d.userAgent.h.m("CriOS");
};
l.d.userAgent.browser.Oh = function() {
  return!l.d.userAgent.browser.Wb() && l.d.userAgent.h.m("Android");
};
l.d.userAgent.browser.ac = l.d.userAgent.browser.Sh;
l.d.userAgent.browser.$b = l.d.userAgent.browser.Qh;
l.d.userAgent.browser.Ok = l.d.userAgent.browser.Ph;
l.d.userAgent.browser.Wk = l.d.userAgent.browser.lc;
l.d.userAgent.browser.Ik = l.d.userAgent.browser.kc;
l.d.userAgent.browser.Rk = l.d.userAgent.browser.Rh;
l.d.userAgent.browser.Wb = l.d.userAgent.browser.jc;
l.d.userAgent.browser.Gk = l.d.userAgent.browser.Oh;
l.d.userAgent.browser.Xk = function() {
  return l.d.userAgent.h.m("Silk");
};
l.d.userAgent.browser.za = function() {
  function a(a) {
    a = l.a.find(a, e);
    return d[a] || "";
  }
  var c = l.d.userAgent.h.la();
  if (l.d.userAgent.browser.$b()) {
    return l.d.userAgent.browser.Xd(c);
  }
  var c = l.d.userAgent.h.Yb(c), d = {};
  l.a.forEach(c, function(a) {
    d[a[0]] = a[1];
  });
  var e = l.qb(l.object.ba, d);
  return l.d.userAgent.browser.ac() ? a(["Version", "Opera", "OPR"]) : l.d.userAgent.browser.Wb() ? a(["Chrome", "CriOS"]) : (c = c[2]) && c[1] || "";
};
l.d.userAgent.browser.lb = function(a) {
  return 0 <= l.b.ya(l.d.userAgent.browser.za(), a);
};
l.d.userAgent.browser.Xd = function(a) {
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
l.d.userAgent.G = {};
l.d.userAgent.G.Vk = function() {
  return l.d.userAgent.h.m("Presto");
};
l.d.userAgent.G.le = function() {
  return l.d.userAgent.h.m("Trident") || l.d.userAgent.h.m("MSIE");
};
l.d.userAgent.G.ic = function() {
  return l.d.userAgent.h.re("WebKit");
};
l.d.userAgent.G.Ih = function() {
  return l.d.userAgent.h.m("Gecko") && !l.d.userAgent.G.ic() && !l.d.userAgent.G.le();
};
l.d.userAgent.G.za = function() {
  var a = l.d.userAgent.h.la();
  if (a) {
    var a = l.d.userAgent.h.Yb(a), c = a[1];
    if (c) {
      return "Gecko" == c[0] ? l.d.userAgent.G.ne(a, "Firefox") : c[1];
    }
    var a = a[0], d;
    if (a && (d = a[2]) && (d = /Trident\/([^\s;]+)/.exec(d))) {
      return d[1];
    }
  }
  return "";
};
l.d.userAgent.G.lb = function(a) {
  return 0 <= l.b.ya(l.d.userAgent.G.za(), a);
};
l.d.userAgent.G.ne = function(a, c) {
  var d = l.a.find(a, function(a) {
    return c == a[0];
  });
  return d && d[1] || "";
};
l.d.userAgent.platform = {};
l.d.userAgent.platform.pc = function() {
  return l.d.userAgent.h.m("Android");
};
l.d.userAgent.platform.bf = function() {
  return l.d.userAgent.h.m("iPod");
};
l.d.userAgent.platform.Uc = function() {
  return l.d.userAgent.h.m("iPhone") && !l.d.userAgent.h.m("iPod") && !l.d.userAgent.h.m("iPad");
};
l.d.userAgent.platform.Tc = function() {
  return l.d.userAgent.h.m("iPad");
};
l.d.userAgent.platform.oe = function() {
  return l.d.userAgent.platform.Uc() || l.d.userAgent.platform.Tc() || l.d.userAgent.platform.bf();
};
l.d.userAgent.platform.qc = function() {
  return l.d.userAgent.h.m("Macintosh");
};
l.d.userAgent.platform.cf = function() {
  return l.d.userAgent.h.m("Linux");
};
l.d.userAgent.platform.rc = function() {
  return l.d.userAgent.h.m("Windows");
};
l.d.userAgent.platform.oc = function() {
  return l.d.userAgent.h.m("CrOS");
};
l.d.userAgent.platform.za = function() {
  var a = l.d.userAgent.h.la(), c = "";
  l.d.userAgent.platform.rc() ? (c = /Windows (?:NT|Phone) ([0-9.]+)/, c = (a = c.exec(a)) ? a[1] : "0.0") : l.d.userAgent.platform.oe() ? (c = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, c = (a = c.exec(a)) && a[1].replace(/_/g, ".")) : l.d.userAgent.platform.qc() ? (c = /Mac OS X ([0-9_.]+)/, c = (a = c.exec(a)) ? a[1].replace(/_/g, ".") : "10") : l.d.userAgent.platform.pc() ? (c = /Android\s+([^\);]+)(\)|;)/, c = (a = c.exec(a)) && a[1]) : l.d.userAgent.platform.oc() && (c = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/, 
  c = (a = c.exec(a)) && a[1]);
  return c || "";
};
l.d.userAgent.platform.lb = function(a) {
  return 0 <= l.b.ya(l.d.userAgent.platform.za(), a);
};
l.userAgent = {};
l.userAgent.Gd = !1;
l.userAgent.Fd = !1;
l.userAgent.Md = !1;
l.userAgent.Rb = !1;
l.userAgent.Ld = !1;
l.userAgent.we = !1;
l.userAgent.ib = l.userAgent.Gd || l.userAgent.Fd || l.userAgent.Rb || l.userAgent.Md || l.userAgent.Ld;
l.userAgent.ag = function() {
  return l.d.userAgent.h.la();
};
l.userAgent.Nc = function() {
  return l.global.navigator || null;
};
l.userAgent.Zf = l.userAgent.ib ? l.userAgent.Ld : l.d.userAgent.browser.ac();
l.userAgent.gb = l.userAgent.ib ? l.userAgent.Gd : l.d.userAgent.browser.$b();
l.userAgent.Yf = l.userAgent.ib ? l.userAgent.Fd : l.d.userAgent.G.Ih();
l.userAgent.Ya = l.userAgent.ib ? l.userAgent.Md || l.userAgent.Rb : l.d.userAgent.G.ic();
l.userAgent.Kh = function() {
  return l.userAgent.Ya && l.d.userAgent.h.m("Mobile");
};
l.userAgent.Li = l.userAgent.Rb || l.userAgent.Kh();
l.userAgent.Wi = l.userAgent.Ya;
l.userAgent.xh = function() {
  var a = l.userAgent.Nc();
  return a && a.platform || "";
};
l.userAgent.Pi = l.userAgent.xh();
l.userAgent.Kd = !1;
l.userAgent.Nd = !1;
l.userAgent.Jd = !1;
l.userAgent.Od = !1;
l.userAgent.Ed = !1;
l.userAgent.Id = !1;
l.userAgent.Hd = !1;
l.userAgent.ha = l.userAgent.Kd || l.userAgent.Nd || l.userAgent.Jd || l.userAgent.Od || l.userAgent.Ed || l.userAgent.Id || l.userAgent.Hd;
l.userAgent.Fi = l.userAgent.ha ? l.userAgent.Kd : l.d.userAgent.platform.qc();
l.userAgent.cj = l.userAgent.ha ? l.userAgent.Nd : l.d.userAgent.platform.rc();
l.userAgent.Jh = function() {
  return l.d.userAgent.platform.cf() || l.d.userAgent.platform.oc();
};
l.userAgent.Ai = l.userAgent.ha ? l.userAgent.Jd : l.userAgent.Jh();
l.userAgent.Mh = function() {
  var a = l.userAgent.Nc();
  return!!a && l.b.contains(a.appVersion || "", "X11");
};
l.userAgent.dj = l.userAgent.ha ? l.userAgent.Od : l.userAgent.Mh();
l.userAgent.ANDROID = l.userAgent.ha ? l.userAgent.Ed : l.d.userAgent.platform.pc();
l.userAgent.vi = l.userAgent.ha ? l.userAgent.Id : l.d.userAgent.platform.Uc();
l.userAgent.ui = l.userAgent.ha ? l.userAgent.Hd : l.d.userAgent.platform.Tc();
l.userAgent.yh = function() {
  var a = "", c;
  if (l.userAgent.Zf && l.global.opera) {
    return a = l.global.opera.version, l.isFunction(a) ? a() : a;
  }
  l.userAgent.Yf ? c = /rv\:([^\);]+)(\)|;)/ : l.userAgent.gb ? c = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : l.userAgent.Ya && (c = /WebKit\/(\S+)/);
  c && (a = (a = c.exec(l.userAgent.ag())) ? a[1] : "");
  return l.userAgent.gb && (c = l.userAgent.pd(), c > parseFloat(a)) ? String(c) : a;
};
l.userAgent.pd = function() {
  var a = l.global.document;
  return a ? a.documentMode : void 0;
};
l.userAgent.VERSION = l.userAgent.yh();
l.userAgent.compare = function(a, c) {
  return l.b.ya(a, c);
};
l.userAgent.Hc = {};
l.userAgent.lb = function(a) {
  return l.userAgent.we || l.userAgent.Hc[a] || (l.userAgent.Hc[a] = 0 <= l.b.ya(l.userAgent.VERSION, a));
};
l.userAgent.al = l.userAgent.lb;
l.userAgent.Gh = function(a) {
  return l.userAgent.gb && l.userAgent.sg >= a;
};
l.userAgent.Kk = l.userAgent.Gh;
var t = l.global.document;
l.userAgent.sg = t && l.userAgent.gb ? l.userAgent.pd() || ("CSS1Compat" == t.compatMode ? parseInt(l.userAgent.VERSION, 10) : 5) : void 0;
l.uri = {};
l.uri.c = {};
l.uri.c.Da = {Qc:38, EQUAL:61, Oe:35, Pe:63};
l.uri.c.ob = function(a, c, d, e, f, g, h) {
  var k = "";
  a && (k += a + ":");
  d && (k += "//", c && (k += c + "@"), k += d, e && (k += ":" + e));
  f && (k += f);
  g && (k += "?" + g);
  h && (k += "#" + h);
  return k;
};
l.uri.c.Ze = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;
l.uri.c.l = {ka:1, Ma:2, W:3, X:4, nb:5, Na:6, mb:7};
l.uri.c.split = function(a) {
  l.uri.c.Xe();
  return a.match(l.uri.c.Ze);
};
l.uri.c.Ab = l.userAgent.Ya;
l.uri.c.Xe = function() {
  if (l.uri.c.Ab) {
    l.uri.c.Ab = !1;
    var a = l.global.location;
    if (a) {
      var c = a.href;
      if (c && (c = l.uri.c.ua(c)) && c != a.hostname) {
        throw l.uri.c.Ab = !0, Error();
      }
    }
  }
};
l.uri.c.ab = function(a, c) {
  return a ? c ? decodeURI(a) : decodeURIComponent(a) : a;
};
l.uri.c.pa = function(a, c) {
  return l.uri.c.split(c)[a] || null;
};
l.uri.c.ia = function(a) {
  return l.uri.c.pa(l.uri.c.l.ka, a);
};
l.uri.c.nk = function(a) {
  a = l.uri.c.ia(a);
  !a && self.location && (a = self.location.protocol, a = a.substr(0, a.length - 1));
  return a ? a.toLowerCase() : "";
};
l.uri.c.Ve = function(a) {
  return l.uri.c.pa(l.uri.c.l.Ma, a);
};
l.uri.c.La = function(a) {
  return l.uri.c.ab(l.uri.c.Ve(a));
};
l.uri.c.Se = function(a) {
  return l.uri.c.pa(l.uri.c.l.W, a);
};
l.uri.c.ua = function(a) {
  return l.uri.c.ab(l.uri.c.Se(a), !0);
};
l.uri.c.Ka = function(a) {
  return Number(l.uri.c.pa(l.uri.c.l.X, a)) || null;
};
l.uri.c.Ue = function(a) {
  return l.uri.c.pa(l.uri.c.l.nb, a);
};
l.uri.c.ja = function(a) {
  return l.uri.c.ab(l.uri.c.Ue(a), !0);
};
l.uri.c.Xb = function(a) {
  return l.uri.c.pa(l.uri.c.l.Na, a);
};
l.uri.c.Te = function(a) {
  var c = a.indexOf("#");
  return 0 > c ? null : a.substr(c + 1);
};
l.uri.c.Gl = function(a, c) {
  return l.uri.c.af(a) + (c ? "#" + c : "");
};
l.uri.c.Ja = function(a) {
  return l.uri.c.ab(l.uri.c.Te(a));
};
l.uri.c.Rc = function(a) {
  a = l.uri.c.split(a);
  return l.uri.c.ob(a[l.uri.c.l.ka], a[l.uri.c.l.Ma], a[l.uri.c.l.W], a[l.uri.c.l.X]);
};
l.uri.c.uk = function(a) {
  a = l.uri.c.split(a);
  return l.uri.c.ob(null, null, null, null, a[l.uri.c.l.nb], a[l.uri.c.l.Na], a[l.uri.c.l.mb]);
};
l.uri.c.af = function(a) {
  var c = a.indexOf("#");
  return 0 > c ? a : a.substr(0, c);
};
l.uri.c.Eh = function(a, c) {
  var d = l.uri.c.split(a), e = l.uri.c.split(c);
  return d[l.uri.c.l.W] == e[l.uri.c.l.W] && d[l.uri.c.l.ka] == e[l.uri.c.l.ka] && d[l.uri.c.l.X] == e[l.uri.c.l.X];
};
l.uri.c.Zd = function(a) {
  if (l.ga && (0 <= a.indexOf("#") || 0 <= a.indexOf("?"))) {
    throw Error("goog.uri.utils: Fragment or query identifiers are not supported: [" + a + "]");
  }
};
l.uri.c.ie = function(a, c) {
  for (var d = a.split("&"), e = 0;e < d.length;e++) {
    var f = d[e].indexOf("="), g = null, h = null;
    0 <= f ? (g = d[e].substring(0, f), h = d[e].substring(f + 1)) : g = d[e];
    c(l.b.Xa(g), h ? l.b.Xa(h) : "");
  }
};
l.uri.c.sb = function(a) {
  if (a[1]) {
    var c = a[0], d = c.indexOf("#");
    0 <= d && (a.push(c.substr(d)), a[0] = c = c.substr(0, d));
    d = c.indexOf("?");
    0 > d ? a[1] = "?" : d == c.length - 1 && (a[1] = void 0);
  }
  return a.join("");
};
l.uri.c.tb = function(a, c, d) {
  if (l.isArray(c)) {
    for (var e = 0;e < c.length;e++) {
      l.uri.c.tb(a, String(c[e]), d);
    }
  } else {
    null != c && d.push("&", a, "" === c ? "" : "=", l.b.va(c));
  }
};
l.uri.c.Bb = function(a, c, d) {
  for (d = d || 0;d < c.length;d += 2) {
    l.uri.c.tb(c[d], c[d + 1], a);
  }
  return a;
};
l.uri.c.Dj = function(a, c) {
  var d = l.uri.c.Bb([], a, c);
  d[0] = "";
  return d.join("");
};
l.uri.c.Sc = function(a, c) {
  for (var d in c) {
    l.uri.c.tb(d, c[d], a);
  }
  return a;
};
l.uri.c.Ej = function(a) {
  a = l.uri.c.Sc([], a);
  a[0] = "";
  return a.join("");
};
l.uri.c.nj = function(a, c) {
  return l.uri.c.sb(2 == arguments.length ? l.uri.c.Bb([a], arguments[1], 0) : l.uri.c.Bb([a], arguments, 1));
};
l.uri.c.oj = function(a, c) {
  return l.uri.c.sb(l.uri.c.Sc([a], c));
};
l.uri.c.We = function(a, c, d) {
  a = [a, "&", c];
  l.cc(d) && a.push("=", l.b.va(d));
  return l.uri.c.sb(a);
};
l.uri.c.Va = function(a, c, d, e) {
  for (var f = d.length;0 <= (c = a.indexOf(d, c)) && c < e;) {
    var g = a.charCodeAt(c - 1);
    if (g == l.uri.c.Da.Qc || g == l.uri.c.Da.Pe) {
      if (g = a.charCodeAt(c + f), !g || g == l.uri.c.Da.EQUAL || g == l.uri.c.Da.Qc || g == l.uri.c.Da.Oe) {
        return c;
      }
    }
    c += f + 1;
  }
  return-1;
};
l.uri.c.Wa = /#|$/;
l.uri.c.yk = function(a, c) {
  return 0 <= l.uri.c.Va(a, 0, c, a.search(l.uri.c.Wa));
};
l.uri.c.sk = function(a, c) {
  var d = a.search(l.uri.c.Wa), e = l.uri.c.Va(a, 0, c, d);
  if (0 > e) {
    return null;
  }
  var f = a.indexOf("&", e);
  if (0 > f || f > d) {
    f = d;
  }
  e += c.length + 1;
  return l.b.Xa(a.substr(e, f - e));
};
l.uri.c.tk = function(a, c) {
  for (var d = a.search(l.uri.c.Wa), e = 0, f, g = [];0 <= (f = l.uri.c.Va(a, e, c, d));) {
    e = a.indexOf("&", f);
    if (0 > e || e > d) {
      e = d;
    }
    f += c.length + 1;
    g.push(l.b.Xa(a.substr(f, e - f)));
  }
  return g;
};
l.uri.c.Qe = /[?&]($|#)/;
l.uri.c.Ye = function(a, c) {
  for (var d = a.search(l.uri.c.Wa), e = 0, f, g = [];0 <= (f = l.uri.c.Va(a, e, c, d));) {
    g.push(a.substring(e, f)), e = Math.min(a.indexOf("&", f) + 1 || d, d);
  }
  g.push(a.substr(e));
  return g.join("").replace(l.uri.c.Qe, "$1");
};
l.uri.c.setParam = function(a, c, d) {
  return l.uri.c.We(l.uri.c.Ye(a, c), c, d);
};
l.uri.c.pj = function(a, c) {
  l.uri.c.Zd(a);
  l.b.ae(a, "/") && (a = a.substr(0, a.length - 1));
  l.b.pb(c, "/") && (c = c.substr(1));
  return l.b.$d(a, "/", c);
};
l.uri.c.wa = function(a, c) {
  l.b.pb(c, "/") || (c = "/" + c);
  var d = l.uri.c.split(a);
  return l.uri.c.ob(d[l.uri.c.l.ka], d[l.uri.c.l.Ma], d[l.uri.c.l.W], d[l.uri.c.l.X], c, d[l.uri.c.l.Na], d[l.uri.c.l.mb]);
};
l.uri.c.fc = {ec:"zx"};
l.uri.c.Nh = function(a) {
  return l.uri.c.setParam(a, l.uri.c.fc.ec, l.b.Zb());
};
l.f = function(a, c) {
  var d;
  a instanceof l.f ? (this.H = l.P(c) ? c : a.Wd(), this.Sa(a.ia()), this.Ta(a.La()), this.Oa(a.ua()), this.Qa(a.Ka()), this.wa(a.ja()), this.Ra(a.Xb().clone()), this.Pa(a.Ja())) : a && (d = l.uri.c.split(String(a))) ? (this.H = !!c, this.Sa(d[l.uri.c.l.ka] || "", !0), this.Ta(d[l.uri.c.l.Ma] || "", !0), this.Oa(d[l.uri.c.l.W] || "", !0), this.Qa(d[l.uri.c.l.X]), this.wa(d[l.uri.c.l.nb] || "", !0), this.Ra(d[l.uri.c.l.Na] || "", !0), this.Pa(d[l.uri.c.l.mb] || "", !0)) : (this.H = !!c, this.J = new l.f.N(null, 
  null, this.H));
};
l.f.mf = !1;
l.f.je = l.uri.c.fc.ec;
b = l.f.prototype;
b.sa = "";
b.Hb = "";
b.Eb = "";
b.F = null;
b.Gb = "";
b.Fb = "";
b.Lh = !1;
b.H = !1;
b.toString = function() {
  var a = [], c = this.ia();
  c && a.push(l.f.xa(c, l.f.hc, !0), ":");
  if (c = this.ua()) {
    a.push("//");
    var d = this.La();
    d && a.push(l.f.xa(d, l.f.hc, !0), "@");
    a.push(l.f.gc(l.b.va(c)));
    c = this.Ka();
    null != c && a.push(":", String(c));
  }
  if (c = this.ja()) {
    this.rb() && "/" != c.charAt(0) && a.push("/"), a.push(l.f.xa(c, "/" == c.charAt(0) ? l.f.fe : l.f.he, !0));
  }
  (c = this.ee()) && a.push("?", c);
  (c = this.Ja()) && a.push("#", l.f.xa(c, l.f.ge));
  return a.join("");
};
b.resolve = function(a) {
  var c = this.clone(), d = a.Le();
  d ? c.Sa(a.ia()) : d = a.Me();
  d ? c.Ta(a.La()) : d = a.rb();
  d ? c.Oa(a.ua()) : d = a.Je();
  var e = a.ja();
  if (d) {
    c.Qa(a.Ka());
  } else {
    if (d = a.Pc()) {
      if ("/" != e.charAt(0)) {
        if (this.rb() && !this.Pc()) {
          e = "/" + e;
        } else {
          var f = c.ja().lastIndexOf("/");
          -1 != f && (e = c.ja().substr(0, f + 1) + e);
        }
      }
      e = l.f.Ne(e);
    }
  }
  d ? c.wa(e) : d = a.Ke();
  d ? c.Ra(a.He()) : d = a.Ie();
  d && c.Pa(a.Ja());
  return c;
};
b.clone = function() {
  return new l.f(this);
};
b.ia = function() {
  return this.sa;
};
b.Sa = function(a, c) {
  this.Q();
  if (this.sa = c ? l.f.ra(a, !0) : a) {
    this.sa = this.sa.replace(/:$/, "");
  }
  return this;
};
b.Le = function() {
  return!!this.sa;
};
b.La = function() {
  return this.Hb;
};
b.Ta = function(a, c) {
  this.Q();
  this.Hb = c ? l.f.ra(a) : a;
  return this;
};
b.Me = function() {
  return!!this.Hb;
};
b.ua = function() {
  return this.Eb;
};
b.Oa = function(a, c) {
  this.Q();
  this.Eb = c ? l.f.ra(a, !0) : a;
  return this;
};
b.rb = function() {
  return!!this.Eb;
};
b.Ka = function() {
  return this.F;
};
b.Qa = function(a) {
  this.Q();
  if (a) {
    a = Number(a);
    if (isNaN(a) || 0 > a) {
      throw Error("Bad port number " + a);
    }
    this.F = a;
  } else {
    this.F = null;
  }
  return this;
};
b.Je = function() {
  return null != this.F;
};
b.ja = function() {
  return this.Gb;
};
b.wa = function(a, c) {
  this.Q();
  this.Gb = c ? l.f.ra(a, !0) : a;
  return this;
};
b.Pc = function() {
  return!!this.Gb;
};
b.Ke = function() {
  return "" !== this.J.toString();
};
b.Ra = function(a, c) {
  this.Q();
  a instanceof l.f.N ? (this.J = a, this.J.Cb(this.H)) : (c || (a = l.f.xa(a, l.f.ff)), this.J = new l.f.N(a, null, this.H));
  return this;
};
b.ee = function() {
  return this.J.toString();
};
b.He = function() {
  return this.J.mg();
};
b.Xb = function() {
  return this.J;
};
b.ke = function(a, c) {
  this.Q();
  this.J.set(a, c);
  return this;
};
b.Gf = function(a) {
  return this.J.get(a);
};
b.Ja = function() {
  return this.Fb;
};
b.Pa = function(a, c) {
  this.Q();
  this.Fb = c ? l.f.ra(a) : a;
  return this;
};
b.Ie = function() {
  return!!this.Fb;
};
b.Nh = function() {
  this.Q();
  this.ke(l.f.je, l.b.Zb());
  return this;
};
b.Q = function() {
  if (this.Lh) {
    throw Error("Tried to modify a read-only Uri");
  }
};
b.Cb = function(a) {
  this.H = a;
  this.J && this.J.Cb(a);
  return this;
};
b.Wd = function() {
  return this.H;
};
l.f.parse = function(a, c) {
  return a instanceof l.f ? a.clone() : new l.f(a, c);
};
l.f.create = function(a, c, d, e, f, g, h, k) {
  k = new l.f(null, k);
  a && k.Sa(a);
  c && k.Ta(c);
  d && k.Oa(d);
  e && k.Qa(e);
  f && k.wa(f);
  g && k.Ra(g);
  h && k.Pa(h);
  return k;
};
l.f.resolve = function(a, c) {
  a instanceof l.f || (a = l.f.parse(a));
  c instanceof l.f || (c = l.f.parse(c));
  return a.resolve(c);
};
l.f.Ne = function(a) {
  if (".." == a || "." == a) {
    return "";
  }
  if (l.b.contains(a, "./") || l.b.contains(a, "/.")) {
    var c = l.b.pb(a, "/");
    a = a.split("/");
    for (var d = [], e = 0;e < a.length;) {
      var f = a[e++];
      "." == f ? c && e == a.length && d.push("") : ".." == f ? ((1 < d.length || 1 == d.length && "" != d[0]) && d.pop(), c && e == a.length && d.push("")) : (d.push(f), c = !0);
    }
    return d.join("/");
  }
  return a;
};
l.f.ra = function(a, c) {
  return a ? c ? decodeURI(a) : decodeURIComponent(a) : "";
};
l.f.xa = function(a, c, d) {
  return l.isString(a) ? (a = encodeURI(a).replace(c, l.f.Ff), d && (a = l.f.gc(a)), a) : null;
};
l.f.Ff = function(a) {
  a = a.charCodeAt(0);
  return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16);
};
l.f.gc = function(a) {
  return a.replace(/%25([0-9a-fA-F]{2})/g, "%$1");
};
l.f.hc = /[#\/\?@]/g;
l.f.he = /[\#\?:]/g;
l.f.fe = /[\#\?]/g;
l.f.ff = /[\#\?@]/g;
l.f.ge = /#/g;
l.f.Eh = function(a, c) {
  var d = l.uri.c.split(a), e = l.uri.c.split(c);
  return d[l.uri.c.l.W] == e[l.uri.c.l.W] && d[l.uri.c.l.X] == e[l.uri.c.l.X];
};
l.f.N = function(a, c, d) {
  this.Y = a || null;
  this.H = !!d;
};
l.f.N.prototype.R = function() {
  this.r || (this.r = new l.j.Map, this.p = 0, this.Y && l.uri.c.ie(this.Y, l.bind(this.add, this)));
};
l.f.N.Xj = function(a, c, d) {
  c = l.j.w(a);
  if ("undefined" == typeof c) {
    throw Error("Keys are undefined");
  }
  d = new l.f.N(null, null, d);
  a = l.j.t(a);
  for (var e = 0;e < c.length;e++) {
    var f = c[e], g = a[e];
    l.isArray(g) ? d.sc(f, g) : d.add(f, g);
  }
  return d;
};
l.f.N.Wj = function(a, c, d, e) {
  if (a.length != c.length) {
    throw Error("Mismatched lengths for keys/values");
  }
  d = new l.f.N(null, null, e);
  for (e = 0;e < a.length;e++) {
    d.add(a[e], c[e]);
  }
  return d;
};
b = l.f.N.prototype;
b.r = null;
b.p = null;
b.da = function() {
  this.R();
  return this.p;
};
b.add = function(a, c) {
  this.R();
  this.oa();
  a = this.ma(a);
  var d = this.r.get(a);
  d || this.r.set(a, d = []);
  d.push(c);
  this.p++;
  return this;
};
b.remove = function(a) {
  this.R();
  a = this.ma(a);
  return this.r.ba(a) ? (this.oa(), this.p -= this.r.get(a).length, this.r.remove(a)) : !1;
};
b.clear = function() {
  this.oa();
  this.r = null;
  this.p = 0;
};
b.K = function() {
  this.R();
  return 0 == this.p;
};
b.ba = function(a) {
  this.R();
  a = this.ma(a);
  return this.r.ba(a);
};
b.qa = function(a) {
  var c = this.t();
  return l.a.contains(c, a);
};
b.w = function() {
  this.R();
  for (var a = this.r.t(), c = this.r.w(), d = [], e = 0;e < c.length;e++) {
    for (var f = a[e], g = 0;g < f.length;g++) {
      d.push(c[e]);
    }
  }
  return d;
};
b.t = function(a) {
  this.R();
  var c = [];
  if (l.isString(a)) {
    this.ba(a) && (c = l.a.concat(c, this.r.get(this.ma(a))));
  } else {
    a = this.r.t();
    for (var d = 0;d < a.length;d++) {
      c = l.a.concat(c, a[d]);
    }
  }
  return c;
};
b.set = function(a, c) {
  this.R();
  this.oa();
  a = this.ma(a);
  this.ba(a) && (this.p -= this.r.get(a).length);
  this.r.set(a, [c]);
  this.p++;
  return this;
};
b.get = function(a, c) {
  var d = a ? this.t(a) : [];
  return l.f.mf ? 0 < d.length ? d[0] : c : 0 < d.length ? String(d[0]) : c;
};
b.sc = function(a, c) {
  this.remove(a);
  0 < c.length && (this.oa(), this.r.set(this.ma(a), l.a.clone(c)), this.p += c.length);
};
b.toString = function() {
  if (this.Y) {
    return this.Y;
  }
  if (!this.r) {
    return "";
  }
  for (var a = [], c = this.r.w(), d = 0;d < c.length;d++) {
    for (var e = c[d], f = l.b.va(e), e = this.t(e), g = 0;g < e.length;g++) {
      var h = f;
      "" !== e[g] && (h += "=" + l.b.va(e[g]));
      a.push(h);
    }
  }
  return this.Y = a.join("&");
};
b.mg = function() {
  return l.f.ra(this.toString());
};
b.oa = function() {
  this.Y = null;
};
b.clone = function() {
  var a = new l.f.N;
  a.Y = this.Y;
  this.r && (a.r = this.r.clone(), a.p = this.p);
  return a;
};
b.ma = function(a) {
  a = String(a);
  this.H && (a = a.toLowerCase());
  return a;
};
b.Cb = function(a) {
  a && !this.H && (this.R(), this.oa(), this.r.forEach(function(a, d) {
    var e = d.toLowerCase();
    d != e && (this.remove(d), this.sc(e, a));
  }, this));
  this.H = a;
};
b.extend = function(a) {
  for (var c = 0;c < arguments.length;c++) {
    l.j.forEach(arguments[c], function(a, c) {
      this.add(c, a);
    }, this);
  }
};
m.Ob = {};
m.Ob.Nf = function(a) {
  return l.f.parse(window.location.href).Gf(a) || null;
};
m.Ob.getOrigin = function(a) {
  return l.uri.c.ia(a) ? l.uri.c.Rc(a) : l.uri.c.Rc("http://" + a);
};
m.kd = function(a) {
  this.Ga = a;
  this.Pb = this.F = null;
};
b = m.kd.prototype;
b.gg = function(a) {
  this.Pb = a;
};
b.og = function(a) {
  a.clientId = this.Ga;
  if (!this.F && (this.Xf(), !this.F)) {
    return;
  }
  this.F.postMessage(a);
};
b.Xf = function() {
  !this.F && (this.F = chrome.runtime.connect({name:this.Ga})) && (this.F.onMessage.addListener(l.bind(this.bd, this)), this.F.onDisconnect.addListener(l.bind(this.Rf, this)));
};
b.bd = function(a) {
  this.Pb && this.Pb(a);
};
b.Rf = function() {
  this.F = null;
  this.bd(new m.ad(m.u.Wc, null));
};
m.Ha = function(a) {
  this.yd = a;
  this.xd = null;
};
m.Ha.prototype.init = function() {
  window.addEventListener("message", this.Th.bind(this), !1);
};
m.Ha.prototype.fg = function(a) {
  this.xd = a;
};
m.Ha.prototype.Th = function(a) {
  if (a.source != window) {
    var c = a.data;
    this.yd = c.appOrigin = a.origin;
    this.xd(c);
  }
};
m.Ha.prototype.Yc = function(a) {
  a.clientId = null;
  window.parent.postMessage(a, this.yd);
};
m.Ia = function() {
  this.Ga = "client-" + String(Math.floor(1E5 * Math.random()));
  this.sessionRequest = null;
  this.cb = new m.Ha(m.Ob.Nf("appOrigin"));
  this.cd = new m.kd(this.Ga);
};
m.Ia.prototype.init = function() {
  this.cb.init();
  this.cb.fg(this.cg.bind(this));
  this.cd.gg(this.dg.bind(this));
  this.eg(null);
};
m.Ia.prototype.eg = function(a) {
  this.cb.Yc(new m.ad(m.u.Mf, a));
};
m.Ia.prototype.cg = function(a) {
  a.clientId = this.Ga;
  this.cd.og(a);
};
m.Ia.prototype.dg = function(a) {
  switch(a.type) {
    case m.u.nf:
    ;
    case m.u.of:
    ;
    case m.u.ERROR:
    ;
    case m.u.sf:
    ;
    case m.u.Af:
    ;
    case m.u.qf:
    ;
    case m.u.vf:
    ;
    case m.u.uf:
    ;
    case m.u.Bf:
    ;
    case m.u.rf:
    ;
    case m.u.yf:
    ;
    case m.u.wf:
    ;
    case m.u.Wc:
    ;
    case m.u.pf:
    ;
    case m.u.xf:
    ;
    case m.u.tf:
    ;
    case m.u.zf:
      this.cb.Yc(a);
  }
};
m.Fh = new m.Ia;
m.Fh.init();

