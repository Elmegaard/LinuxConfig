var getCanonicalHost=function(a){a=(new URI(a)).getAuthority();if(!a)return null;var b=a.indexOf(":");-1!==b&&(a=a.slice(0,b));return"www."===a.substring(0,4)?a.substring(4):a};
