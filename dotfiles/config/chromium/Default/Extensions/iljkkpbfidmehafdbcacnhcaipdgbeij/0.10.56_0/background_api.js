var keycache=mitro.keycache.MakeKeyCache();mitro.keycache.startFiller(keycache);
var getNewRSAKeysAsync=function(a,c,b){keycache.getNewRSAKeysAsync(a,function(a){for(var b=[],f=0;f<a.length;++f)b.push(a[f].toJson());c(b)},b)},getRandomnessFirstTime=!0,getRandomness=function(a,c){try{var b=forge.random.seedFileSync(getRandomnessFirstTime?1024:32);getRandomnessFirstTime=!1;a({seed:b})}catch(d){c(d)}},client=new Client("background"),_Worker="undefined"!==typeof unsafeWindow?unsafeWindow.Worker:Worker,worker=new _Worker("worker.js");
worker.addEventListener("message",function(a){a.data.sendResponse=function(a){a=client.composeResponse(this,a);worker.postMessage(a)};client.processIncoming(a.data)});client.addSender("worker",function(a){worker.postMessage(a)});var console_log=function(a){var c=["Web Worker console.log:"],c=c.concat(a);console.log.apply(console,c)},ajax=mitro.rpc._PostToMitro;client.initRemoteCalls("worker","signMessageAsync setExtensionId setFailover setDeviceId getDeviceId getDeviceIdAsync workerInvokeOnIdentity createIdentity workerCreateIdentity workerLogin workerLoginWithToken workerLoginWithTokenAndLocalKey login loginWithToken loginWithTokenAndLocalKey addIssue initCacheFromFile initCacheFromJson clearCaches bidirectionalSetDiff workerLogout".split(" "));
client.initRemoteExecution("worker",["getNewRSAKeysAsync","console_log","ajax","getRandomness"],this);client.setExtensionId(getExtensionId());assert(mitro.fe);mitro.fe=client;
var fe=mitro.fe,userIdentity=null,attemptingLogin=!1,serviceInstances=null,storePasswordForTwoFactor=null,clearPasswordCallbackId=null,selectedOrgId=null,reportError=function(a,c){console.log(c);"undefined"!==typeof a&&a(c)},checkTwoFactor=function(a,c){fe.workerInvokeOnIdentity(userIdentity,"checkTwoFactor",a,c)},reportSuccess=function(a,c){"undefined"!==typeof a&&a(c)},refreshTabsOnMitroLogin=function(){console.log("refreshTabsOnMitroLogin");helper.tabs.getAll(function(a){for(var c=0;c<a.length;c++){var b=
a[c],d=getCanonicalHost(b.url);helper.tabs.sendMessage(b.id,client.composeMessage("content","refreshOnMitroLogin",getLoginHintsForHost(d)))}})},saveLoginToken=function(a){fe.workerInvokeOnIdentity(a,"getLoginTokenAsync",function(c){c=JSON.stringify(c);var b={};b["loginToken:"+a.uid]=c;helper.storage.local.set(b,function(){CHROME&&chrome.runtime.lastError&&console.log("error storing login token",chrome.runtime.lastError.message)})},function(a){console.log("could not get login token from worker: ",
a)})},getLoginToken=function(a,c){var b="loginToken:"+a;helper.storage.local.get(b,function(d){var e=d;try{CHROME&&chrome.runtime.lastError?console.log("local storage error",chrome.runtime.lastError.message):(e=JSON.parse(d[b]),console.log("got login token for user "+a))}catch(f){console.log("problem getting key",f.stack?f.stack:"")}finally{c(e)}})},saveEncryptedKey=function(a,c){helper.storage.local.set({encryptedKey:a?{key:c,uid:a}:null},function(){CHROME&&chrome.runtime.lastError&&console.log("error storing encrypted key: "+
chrome.runtime.lastError.message)})},pregenerateKeys=function(a,c){keycache.setTemporaryLimit(a,c)};client.initRemoteExecution("extension","pregenerateKeys");var getSiteData=function(a,c,b){fe.workerInvokeOnIdentity(userIdentity,"getSiteData",a,!1,c,b)};client.initRemoteExecution("extension","getSiteData");var getPendingGroupDiffs=function(a,c,b){fe.workerInvokeOnIdentity(a,"getPendingGroups",null,c,b)};client.initRemoteExecution("extension","getPendingGroupDiffs");
var commitPendingGroupDiffs=function(a,c,b,d,e){b={scope:null};b.nonce=c;fe.workerInvokeOnIdentity(a,"applyPendingGroups",b,d,e)};client.initRemoteExecution("extension","commitPendingGroupDiffs");
var loadEncryptedKey=function(a){helper.storage.local.get("encryptedKey",function(c){CHROME&&chrome.runtime.lastError&&console.log("error loading encrypted key: "+chrome.runtime.lastError.message);"encryptedKey"in c?a(c.encryptedKey):a(null)})},mitroSignup=function(a,c,b,d,e){console.log("mitroSignup");var f=function(c){console.log("onCreateIdentity");setIdentity(c);saveLoginToken(c);b&&fe.workerInvokeOnIdentity(c,"getPrivateKeyStringForLocalDiskAsync",function(a){saveEncryptedKey(c.uid,a)},function(a){console.log("error",
a)});var e=function(){};saveSettingsAsync({username:a,rememberMe:b},e,e);reportSuccess(d,userIdentity);refreshTabsOnMitroLogin()},g=function(a){reportError(e,"Error during signup: "+a.userVisibleError)};helper.cookies.get({url:"http://"+MITRO_HOST,name:"glcid"},function(b){var d=null;b&&(d=b.value);fe.workerCreateIdentity(a,c,d,MITRO_HOST,MITRO_PORT,f,g)})},commonOnLoginCode=function(a,c,b,d){console.log("onLogin: ",a.uid);attemptingLogin=!1;isLoggedIn()?(console.log("already logged in. Potential race condition? Aborted."),
d(Error("already logged in"))):(saveLoginToken(a),setIdentity(a),c&&fe.workerInvokeOnIdentity(a,"getPrivateKeyStringForLocalDiskAsync",function(b){saveEncryptedKey(a.uid,b)},function(a){console.log("error saving encrypted key",a)}),listUsersGroupsAndSecrets(function(){refreshTabsOnMitroLogin();b()},d),helper.addContextMenu())},mitroLogin=function(a,c,b,d,e,f,g,n,k){console.log("mitroLogin");attemptingLogin=!0;f&&g&&storePasswordForTwoFactor&&(c=storePasswordForTwoFactor,storePasswordForTwoFactor=
null,clearPasswordCallbackId&&clearTimeout(clearPasswordCallbackId),clearPasswordCallbackId=null);var h=function(a){try{commonOnLoginCode(a,n,function(){reportSuccess(b,userIdentity)},d)}catch(c){d(c)}},l=function(a){attemptingLogin=!1;e&&"DoTwoFactorAuthException"===a.exceptionType?(storePasswordForTwoFactor=c,clearPasswordCallbackId=setTimeout(function(){storePasswordForTwoFactor=null},6E5),e(a.rawMessage)):reportError(d,a)},m=function(b){b?fe.workerLoginWithToken(a,c,b,MITRO_HOST,MITRO_PORT,k,
h,l):fe.workerLogin(a,c,MITRO_HOST,MITRO_PORT,k,h,l)};f&&g?m({loginToken:f,loginTokenSignature:g}):getLoginToken(a,m)},mitroLogout=function(a,c){console.log("mitroLogout");fe.workerLogout(userIdentity);setIdentity(null);saveEncryptedKey(null,null);selectedOrgId=serviceInstances=null;formRecorder={};helper.removeContextMenu();reportSuccess(a,null)},isLoggedIn=function(){return!!userIdentity},isAttemptingLogin=function(){return attemptingLogin},changePassword=function(a,c,b,d,e){if(isLoggedIn()&&null!==
b.token&&null!==b.token_signature){var f=function(a){userIdentity.changePwd=!1;reportSuccess(d,a)},g=function(a){reportError(e,"Error changing password: "+a.userVisibleError)};null===a?fe.workerInvokeOnIdentity(userIdentity,"mutatePrivateKeyPasswordWithoutOldPassword",{newPassword:c,up:b},f,g):fe.workerInvokeOnIdentity(userIdentity,"mutatePrivateKeyPassword",a,c,b,f,g)}else reportError(e,"Cannot change password; not logged in")},getIdentity=function(a,c){reportSuccess(a,userIdentity)},getLoginState=
function(a,c){reportSuccess(a,{identity:userIdentity,attemptingLogin:attemptingLogin})},updateIconState=function(){var a={19:"img/mitro_logo_gray-19.png",32:"img/mitro_logo_gray-32.png",38:"img/mitro_logo_gray-38.png"},c={19:"img/mitro_logo-19.png",32:"img/mitro_logo-32.png",38:"img/mitro_logo-38.png"},a=isLoggedIn()?c:a;helper.setIcon({path:a})},setIdentity=function(a){userIdentity=a;updateIconState()},listUsersGroupsAndSecrets=function(a,c){console.log("trying to fetch services from "+MITRO_HOST+
"...");isLoggedIn()?fe.workerInvokeOnIdentity(userIdentity,"listUsersGroupsAndSecrets",function(b){console.log("fetched "+b.secrets.length+" services");console.log("fetched "+b.users.length+" users");console.log("fetched "+b.groups.length+" groups");serviceInstances=b.secrets;reportSuccess(a,b)},function(a){reportError(c,"Failed to fetch services: "+a.userVisibleError)}):reportError(c,"Cannot fetch services; not logged in")},internalGetSiteSecretData=function(a,c,b,d){console.log("getSiteSecretData: "+
c);isLoggedIn()?fe.workerInvokeOnIdentity(userIdentity,a,c,function(a){reportSuccess(b,a)},function(a){reportError(d,"Error getting site secret data: "+a.userVisibleError)}):reportError(d,"Not logged in")},getSiteSecretData=function(a,c,b){return internalGetSiteSecretData("getSiteSecretData",a,c,b)},getSiteSecretDataForDisplay=function(a,c,b){return internalGetSiteSecretData("getSiteSecretDataForDisplay",a,c,b)},addSecretToGroups=function(a,c,b){isLoggedIn()?a.clientData&&a.criticalData&&a.groupIds&&
0!==a.groupIds.length?fe.workerInvokeOnIdentity(userIdentity,"addSecrets",a,function(a){console.log("secret added to groups successfully");c(a)},function(a){reportError(b,"Error saving secret: "+a.userVisibleError)}):reportError(b,"invalid data"):reportError(b,"Not logged in")},addSecret=function(a,c,b){if(isLoggedIn()){var d=a.serverData,e=a.clientData;a=a.secretData;var f="none";"loginUrl"in d&&(f=d.loginUrl);fe.workerInvokeOnIdentity(userIdentity,"addSecret",f,e,a,function(a){console.log("secret added successfully");
c(a)},function(a){reportError(b,"Error saving secret: "+a.userVisibleError)})}else reportError(b,"Not logged in")},editSecret=function(a,c,b){isLoggedIn()?fe.workerInvokeOnIdentity(userIdentity,"mutateSecret",a.secretId,a.serverData,a.clientData,a.secretData,function(a){console.log("secret edited successfully");c(a)},function(a){reportError(b,"Error saving secret: "+a.userVisibleError)}):reportError(b,"Not logged in")},addSite=function(a,c,b){if(isLoggedIn()){var d=a.before_page,e=a.usernameField;
a=a.passwordField;console.log("adding site for ",d,e,a);fe.workerInvokeOnIdentity(userIdentity,"addSite",d,e.value,a.value,e.name,a.name,function(a){console.log("service added successfully");listUsersGroupsAndSecrets(function(){c(a)},b)},function(a){reportError(b,"Error saving password from "+d+": "+a.userVisibleError)})}else reportError(b,"Not logged in")},removeSecret=function(a,c,b){console.log("removeSecret: "+a);isLoggedIn()?fe.workerInvokeOnIdentity(userIdentity,"deleteSecret",a,function(a){reportSuccess(c,
a)},function(a){reportError(b,"Error removing secret: "+a.userVisibleError)}):reportError(b,"Not logged in")},editSiteShares=function(a,c,b){var d=a.secretId,e=a.groupIdList,f=a.identityList;a=a.orgGroupId;console.log("editSiteShares: "+d);isLoggedIn()?fe.workerInvokeOnIdentity(userIdentity,"shareSiteAndOptionallySetOrg",d,e,f,a,function(a){reportSuccess(c,a)},function(a){reportError(b,"Error editing site share list: "+a.userVisibleError)}):reportError(b,"Not logged in")},getGroup=function(a,c,b){console.log("getGroup: "+
a);isLoggedIn()?fe.workerInvokeOnIdentity(userIdentity,"getGroup",a,function(a){console.log("got group successfully");reportSuccess(c,a)},function(a){reportError(b,"Error getting group: "+a.userVisibleError)}):reportError(b,"Not logged in")},addGroup=function(a,c,b){console.log("addGroup: "+a);isLoggedIn()?fe.workerInvokeOnIdentity(userIdentity,"addGroup",a,function(a){console.log("group created successfully");reportSuccess(c,a)},function(a){reportError(b,"Error creating group: "+a.userVisibleError)}):
reportError(b,"Not logged in")},removeGroup=function(a,c,b){console.log("removeGroup: "+a);isLoggedIn()?fe.workerInvokeOnIdentity(userIdentity,"removeGroup",a,function(a){console.log("group removed successfully");reportSuccess(c,a)},function(a){reportError(b,"Error removing group: "+a.userVisibleError)}):reportError(b,"Not logged in")},editGroup=function(a,c,b){var d=a.groupId,e=a.name,f=a.groupIdList;a=a.identityList;console.log("editGroup: "+d);isLoggedIn()?fe.workerInvokeOnIdentity(userIdentity,
"mutateGroup",d,e,f,a,function(a){console.log("group edited successfully");reportSuccess(c,a)},function(a){reportError(b,"Error editing group: "+a.userVisibleError)}):reportError(b,"Not logged in")},addIssue=function(a,c,b){console.log("addIssue");a.logs=mitro.log.logBuffer.toString();fe.addIssue(a,MITRO_HOST,MITRO_PORT,function(a){console.log("issue reported successfully");reportSuccess(c,a)},function(a){reportError(b,"Error reporting issue: "+a.userVisibleError)})},getAuditLog=function(a,c,b){console.log("getAuditLog");
fe.workerInvokeOnIdentity(userIdentity,"getAuditLog",a,function(a){console.log("audit log retrieved successfully");reportSuccess(c,a)},function(a){reportError(b,"Error getting audit log: "+a.userVisibleError)})},createOrganization=function(a,c,b){isLoggedIn()?fe.workerInvokeOnIdentity(userIdentity,"createOrganization",a,c,b):reportError(b,"Not logged in")},getOrganizationInfo=function(a,c,b){console.log("getOrganizationInfo");isLoggedIn()?fe.workerInvokeOnIdentity(userIdentity,"getOrgInfo",function(a){a.organizations&&
selectedOrgId in a.organizations&&(a.myOrgId=selectedOrgId);c(a)},b):b("Not logged in")},getOrganization=function(a,c,b){console.log("getOrganization: ",a);isLoggedIn()?fe.workerInvokeOnIdentity(userIdentity,"getOrganizationState",a,c,b):b("Not logged in")},selectOrganization=function(a,c,b){console.log("selectOrganization: ",a);isLoggedIn()?fe.workerInvokeOnIdentity(userIdentity,"getOrgInfo",function(d){"number"===typeof a&&a in d.organizations?(selectedOrgId=a,c()):b({userVisibleError:"Invalid org id: "+
a})},b):reportError(b,"Not logged in")},mutateOrganization=function(a,c,b){isLoggedIn()?fe.workerInvokeOnIdentity(userIdentity,"mutateOrganization",a,c,b):b("Not logged in")},changeRemotePassword=function(a,c,b){isLoggedIn()?fe.workerInvokeOnIdentity(userIdentity,"changeRemotePassword",a,c,b):b("Not logged in")},addSecretFromSelection=function(a,c){console.log("addSecretFromSelection: url="+a+", text="+c);var b={},d={};b.type="note";b.title="note for "+getCanonicalHost(a);d.note=c;addSecret({serverData:{},
clientData:b,secretData:d},function(a){console.log("SUCCESS. Successfully saved secret from selection. secretId:",a)},function(a){console.log("ERROR. Something went wrong while saving the secret from selection",a)});return!0};
