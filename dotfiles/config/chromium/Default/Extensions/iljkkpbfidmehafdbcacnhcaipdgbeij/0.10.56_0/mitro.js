var optimist=require("optimist"),assert=require("assert"),lib=require("./mitro_lib.js"),rpc=require("./rpc"),fe=require("./mitro_fe"),fs=require("fs"),allowableCommands={getpub:lib.GetPublicKey,getpvt:lib.GetPrivateKey,addiden:lib.AddIdentity,addgroup:lib.AddGroup,ls:lib.ListGroupsAndSecrets,getgroup:lib.GetGroup,addmember:lib.AddMember,rmmember:lib.RemoveMember,add:lib.AddSecret,rm:lib.RemoveSecret,cat:lib.GetSecret,upload_groups:null,sync_groups:null,api_addsite:null},argv=optimist.usage("The Mitro interface\nCommands are:\n\n"+
Object.keys(allowableCommands).join("\n"),{uid:{description:"my user id",required:!0,"short":"u"},target_uid:{description:"target user id",required:!0,"short":"t"},gid:{description:"group id",required:!1,"short":"g"},server_host:{description:"server host",required:!0,"default":"localhost","short":"s"},server_port:{description:"server port",required:!0,"default":8443,"short":"p"},password:{description:"password",required:!0,"default":""},test_server:{description:"allow connecting to a test server (disables SSL validation)",
required:!1,"default":!1},test_use_crappy_crypto:{description:"allow connecting to a test server (disables SSL validation)",required:!1,"default":!1},key_cache:{description:"use keys from a cache file (warning: insecure!)",required:!1,"default":!1},deviceId:{description:"device id",required:!1,"default":"device_for_commandline"}}).argv;console.log=function(){process.stdout.write(JSON.stringify(Array.prototype.slice.call(arguments),null,2))};
function fatalExit(){process.stderr.write("ERROR! exiting\n");process.exit(1)}function okExit(){console.log("OK!");process.exit(0)}argv.test_server&&rpc.setCertificateValidationForTest(!1);argv.test_use_crappy_crypto&&lib.initForTest();argv.key_cache&&(fe.initCacheFromFile("test_data/keys.cache"),argv._keyCache=fe.keyCache);fe.setDeviceId(argv.deviceId);var command=argv._[0],success=!1;
if(void 0!==command&&0!==command.length){var cmdFcn=allowableCommands[command];argv.password&&(argv.password=""+argv.password);if(cmdFcn)success=lib.runCommand(cmdFcn,argv);else if("api_addsite"===command)fe.login(argv.uid,argv.password,argv.server_host,argv.server_port,null,function(a){try{process.stdout.write("login ok");var b=argv._[1],c=argv._[2],d=argv._[3],e=argv._[4];assert(b);assert(c);assert(d);assert(e);console.log("creating account for url ",b," with u/p",c,d,"and sharing with",e);a.addSite(b,
c,d,null,null,function(b){a.shareSite(b,[],[e],okExit,fatalExit)},fatalExit)}catch(f){console.log(f)}},function(){console.log("ok")},fatalExit),success=!0;else if("upload_groups"===command){var scope=argv._[1],adminGroup=argv.gid;assert(adminGroup);console.log("Enter json for groups followed by EOF:");var jsonString=fs.readFileSync("/dev/stdin").toString(),nameMap=JSON.parse(jsonString);fe.login(argv.uid,argv.password,argv.server_host,argv.server_port,null,function(a){a.clearAndAddPendingGroups(adminGroup,
scope,nameMap,okExit,fatalExit)},fatalExit);success=!0}else if("sync_groups"===command){var scope2=argv._[1];fe.login(argv.uid,argv.password,argv.server_host,argv.server_port,null,function(a){a.applyPendingGroups(scope2,okExit,fatalExit)},fatalExit);success=!0}}success||(console.log("unknown command: "+command),optimist.showHelp(),process.exit(1));
