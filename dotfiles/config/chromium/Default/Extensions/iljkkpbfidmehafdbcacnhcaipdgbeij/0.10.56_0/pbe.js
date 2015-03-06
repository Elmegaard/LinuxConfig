(function(){function v(c){function q(a,k,b){for(var d=[c.md.md5.create().update(a+k).digest().getBytes()],e=16,g=1;e<b;++g,e+=16)d.push(c.md.md5.create().update(d[g-1]+a+k).digest().getBytes());return d.join("").substr(0,b)}if("undefined"===typeof n)var n=c.jsbn.BigInteger;var a=c.asn1,h=c.pki=c.pki||{};h.pbe=c.pbe=c.pbe||{};var r=h.oids,v={name:"EncryptedPrivateKeyInfo",tagClass:a.Class.UNIVERSAL,type:a.Type.SEQUENCE,constructed:!0,value:[{name:"EncryptedPrivateKeyInfo.encryptionAlgorithm",tagClass:a.Class.UNIVERSAL,
type:a.Type.SEQUENCE,constructed:!0,value:[{name:"AlgorithmIdentifier.algorithm",tagClass:a.Class.UNIVERSAL,type:a.Type.OID,constructed:!1,capture:"encryptionOid"},{name:"AlgorithmIdentifier.parameters",tagClass:a.Class.UNIVERSAL,type:a.Type.SEQUENCE,constructed:!0,captureAsn1:"encryptionParams"}]},{name:"EncryptedPrivateKeyInfo.encryptedData",tagClass:a.Class.UNIVERSAL,type:a.Type.OCTETSTRING,constructed:!1,capture:"encryptedData"}]},u={name:"PBES2Algorithms",tagClass:a.Class.UNIVERSAL,type:a.Type.SEQUENCE,
constructed:!0,value:[{name:"PBES2Algorithms.keyDerivationFunc",tagClass:a.Class.UNIVERSAL,type:a.Type.SEQUENCE,constructed:!0,value:[{name:"PBES2Algorithms.keyDerivationFunc.oid",tagClass:a.Class.UNIVERSAL,type:a.Type.OID,constructed:!1,capture:"kdfOid"},{name:"PBES2Algorithms.params",tagClass:a.Class.UNIVERSAL,type:a.Type.SEQUENCE,constructed:!0,value:[{name:"PBES2Algorithms.params.salt",tagClass:a.Class.UNIVERSAL,type:a.Type.OCTETSTRING,constructed:!1,capture:"kdfSalt"},{name:"PBES2Algorithms.params.iterationCount",
tagClass:a.Class.UNIVERSAL,type:a.Type.INTEGER,onstructed:!0,capture:"kdfIterationCount"}]}]},{name:"PBES2Algorithms.encryptionScheme",tagClass:a.Class.UNIVERSAL,type:a.Type.SEQUENCE,constructed:!0,value:[{name:"PBES2Algorithms.encryptionScheme.oid",tagClass:a.Class.UNIVERSAL,type:a.Type.OID,constructed:!1,capture:"encOid"},{name:"PBES2Algorithms.encryptionScheme.iv",tagClass:a.Class.UNIVERSAL,type:a.Type.OCTETSTRING,constructed:!1,capture:"encIv"}]}]},w={name:"pkcs-12PbeParams",tagClass:a.Class.UNIVERSAL,
type:a.Type.SEQUENCE,constructed:!0,value:[{name:"pkcs-12PbeParams.salt",tagClass:a.Class.UNIVERSAL,type:a.Type.OCTETSTRING,constructed:!1,capture:"salt"},{name:"pkcs-12PbeParams.iterations",tagClass:a.Class.UNIVERSAL,type:a.Type.INTEGER,constructed:!1,capture:"iterations"}]};h.encryptPrivateKeyInfo=function(f,k,b){b=b||{};b.saltSize=b.saltSize||8;b.count=b.count||2048;b.algorithm=b.algorithm||"aes128";var d=c.random.getBytesSync(b.saltSize),e=b.count,g=a.integerToDer(e),m;if(0===b.algorithm.indexOf("aes")||
"des"===b.algorithm){var l,n;switch(b.algorithm){case "aes128":l=m=16;b=r["aes128-CBC"];n=c.aes.createEncryptionCipher;break;case "aes192":m=24;l=16;b=r["aes192-CBC"];n=c.aes.createEncryptionCipher;break;case "aes256":m=32;l=16;b=r["aes256-CBC"];n=c.aes.createEncryptionCipher;break;case "des":l=m=8;b=r.desCBC;n=c.des.createEncryptionCipher;break;default:throw{message:"Cannot encrypt private key. Unknown encryption algorithm.",algorithm:b.algorithm};}var p=c.pkcs5.pbkdf2(k,d,e,m);k=c.random.getBytesSync(l);
e=n(p);e.start(k);e.update(a.toDer(f));e.finish();f=e.output.getBytes();d=a.create(a.Class.UNIVERSAL,a.Type.SEQUENCE,!0,[a.create(a.Class.UNIVERSAL,a.Type.OID,!1,a.oidToDer(r.pkcs5PBES2).getBytes()),a.create(a.Class.UNIVERSAL,a.Type.SEQUENCE,!0,[a.create(a.Class.UNIVERSAL,a.Type.SEQUENCE,!0,[a.create(a.Class.UNIVERSAL,a.Type.OID,!1,a.oidToDer(r.pkcs5PBKDF2).getBytes()),a.create(a.Class.UNIVERSAL,a.Type.SEQUENCE,!0,[a.create(a.Class.UNIVERSAL,a.Type.OCTETSTRING,!1,d),a.create(a.Class.UNIVERSAL,a.Type.INTEGER,
!1,g.getBytes())])]),a.create(a.Class.UNIVERSAL,a.Type.SEQUENCE,!0,[a.create(a.Class.UNIVERSAL,a.Type.OID,!1,a.oidToDer(b).getBytes()),a.create(a.Class.UNIVERSAL,a.Type.OCTETSTRING,!1,k)])])])}else if("3des"===b.algorithm)m=24,b=new c.util.ByteBuffer(d),p=h.pbe.generatePkcs12Key(k,b,1,e,m),k=h.pbe.generatePkcs12Key(k,b,2,e,m),e=c.des.createEncryptionCipher(p),e.start(k),e.update(a.toDer(f)),e.finish(),f=e.output.getBytes(),d=a.create(a.Class.UNIVERSAL,a.Type.SEQUENCE,!0,[a.create(a.Class.UNIVERSAL,
a.Type.OID,!1,a.oidToDer(r["pbeWithSHAAnd3-KeyTripleDES-CBC"]).getBytes()),a.create(a.Class.UNIVERSAL,a.Type.SEQUENCE,!0,[a.create(a.Class.UNIVERSAL,a.Type.OCTETSTRING,!1,d),a.create(a.Class.UNIVERSAL,a.Type.INTEGER,!1,g.getBytes())])]);else throw{message:"Cannot encrypt private key. Unknown encryption algorithm.",algorithm:b.algorithm};return a.create(a.Class.UNIVERSAL,a.Type.SEQUENCE,!0,[d,a.create(a.Class.UNIVERSAL,a.Type.OCTETSTRING,!1,f)])};h.decryptPrivateKeyInfo=function(f,k){var b=null,d=
{},e=[];if(!a.validate(f,v,d,e))throw{message:"Cannot read encrypted private key. ASN.1 object is not a supported EncryptedPrivateKeyInfo.",errors:e};e=a.derToOid(d.encryptionOid);e=h.pbe.getCipher(e,d.encryptionParams,k);d=c.util.createBuffer(d.encryptedData);e.update(d);e.finish()&&(b=a.fromDer(e.output));return b};h.encryptedPrivateKeyToPem=function(f,k){var b={type:"ENCRYPTED PRIVATE KEY",body:a.toDer(f).getBytes()};return c.pem.encode(b,{maxline:k})};h.encryptedPrivateKeyFromPem=function(f){f=
c.pem.decode(f)[0];if("ENCRYPTED PRIVATE KEY"!==f.type)throw{message:'Could not convert encrypted private key from PEM; PEM header type is "ENCRYPTED PRIVATE KEY".',headerType:f.type};if(f.procType&&"ENCRYPTED"===f.procType.type)throw{message:"Could not convert encrypted private key from PEM; PEM is encrypted."};return a.fromDer(f.body)};h.encryptRsaPrivateKey=function(f,k,b){b=b||{};if(!b.legacy)return f=h.wrapRsaPrivateKey(h.privateKeyToAsn1(f)),f=h.encryptPrivateKeyInfo(f,k,b),h.encryptedPrivateKeyToPem(f);
var d,e,g;switch(b.algorithm){case "aes128":b="AES-128-CBC";e=16;d=c.random.getBytesSync(16);g=c.aes.createEncryptionCipher;break;case "aes192":b="AES-192-CBC";e=24;d=c.random.getBytesSync(16);g=c.aes.createEncryptionCipher;break;case "aes256":b="AES-256-CBC";e=32;d=c.random.getBytesSync(16);g=c.aes.createEncryptionCipher;break;case "3des":b="DES-EDE3-CBC";e=24;d=c.random.getBytesSync(8);g=c.des.createEncryptionCipher;break;case "des":b="DES-CBC";e=8;d=c.random.getBytesSync(8);g=c.des.createEncryptionCipher;
break;default:throw{message:'Could not encrypt RSA private key; unsupported encryption algorithm "'+b.algorithm+'".',algorithm:b.algorithm};}k=q(k,d.substr(0,8),e);k=g(k);k.start(d);k.update(a.toDer(h.privateKeyToAsn1(f)));k.finish();f={type:"RSA PRIVATE KEY",procType:{version:"4",type:"ENCRYPTED"},dekInfo:{algorithm:b,parameters:c.util.bytesToHex(d).toUpperCase()},body:k.output.getBytes()};return c.pem.encode(f)};h.decryptRsaPrivateKey=function(f,k){var b=null,d=c.pem.decode(f)[0];if("ENCRYPTED PRIVATE KEY"!==
d.type&&"PRIVATE KEY"!==d.type&&"RSA PRIVATE KEY"!==d.type)throw{message:'Could not convert private key from PEM; PEM header type is not "ENCRYPTED PRIVATE KEY", "PRIVATE KEY", or "RSA PRIVATE KEY".',headerType:d.type};if(d.procType&&"ENCRYPTED"===d.procType.type){var e,g;switch(d.dekInfo.algorithm){case "DES-CBC":e=8;g=c.des.createDecryptionCipher;break;case "DES-EDE3-CBC":e=24;g=c.des.createDecryptionCipher;break;case "AES-128-CBC":e=16;g=c.aes.createDecryptionCipher;break;case "AES-192-CBC":e=
24;g=c.aes.createDecryptionCipher;break;case "AES-256-CBC":e=32;g=c.aes.createDecryptionCipher;break;case "RC2-40-CBC":e=5;g=function(a){return c.rc2.createDecryptionCipher(a,40)};break;case "RC2-64-CBC":e=8;g=function(a){return c.rc2.createDecryptionCipher(a,64)};break;case "RC2-128-CBC":e=16;g=function(a){return c.rc2.createDecryptionCipher(a,128)};break;default:throw{message:'Could not decrypt private key; unsupported encryption algorithm "'+d.dekInfo.algorithm+'".',algorithm:d.dekInfo.algorithm};
}var m=c.util.hexToBytes(d.dekInfo.parameters);e=q(k,m.substr(0,8),e);g=g(e);g.start(m);g.update(c.util.createBuffer(d.body));if(g.finish())b=g.output.getBytes();else return b}else b=d.body;b="ENCRYPTED PRIVATE KEY"===d.type?h.decryptPrivateKeyInfo(a.fromDer(b),k):a.fromDer(b);null!==b&&(b=h.privateKeyFromAsn1(b));return b};h.pbe.generatePkcs12Key=function(a,k,b,d,e,g){var h,l;if("undefined"===typeof g||null===g)g=c.md.sha1.create();var n=g.digestLength,p=g.blockLength,r=new c.util.ByteBuffer,t=new c.util.ByteBuffer;
for(l=0;l<a.length;l++)t.putInt16(a.charCodeAt(l));t.putInt16(0);a=t.length();var q=k.length(),v=new c.util.ByteBuffer;v.fillWithByte(b,p);var s=p*Math.ceil(q/p);b=new c.util.ByteBuffer;for(l=0;l<s;l++)b.putByte(k.at(l%q));s=p*Math.ceil(a/p);k=new c.util.ByteBuffer;for(l=0;l<s;l++)k.putByte(t.at(l%a));t=b;t.putBuffer(k);k=Math.ceil(e/n);for(b=1;b<=k;b++){s=new c.util.ByteBuffer;s.putBytes(v.bytes());s.putBytes(t.bytes());for(l=0;l<d;l++)g.start(),g.update(s.getBytes()),s=g.digest();var u=new c.util.ByteBuffer;
for(l=0;l<p;l++)u.putByte(s.at(l%n));var w=Math.ceil(q/p)+Math.ceil(a/p),z=new c.util.ByteBuffer;for(h=0;h<w;h++){var y=new c.util.ByteBuffer(t.getBytes(p)),x=511;for(l=u.length()-1;0<=l;l--)x>>=8,x+=u.at(l)+y.at(l),y.setAt(l,x&255);z.putBuffer(y)}t=z;r.putBuffer(s)}r.truncate(r.length()-e);return r};h.pbe.getCipher=function(a,c,b){switch(a){case h.oids.pkcs5PBES2:return h.pbe.getCipherForPBES2(a,c,b);case h.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:case h.oids["pbewithSHAAnd40BitRC2-CBC"]:return h.pbe.getCipherForPKCS12PBE(a,
c,b);default:throw{message:"Cannot read encrypted PBE data block. Unsupported OID.",oid:a,supportedOids:["pkcs5PBES2","pbeWithSHAAnd3-KeyTripleDES-CBC","pbewithSHAAnd40BitRC2-CBC"]};}};h.pbe.getCipherForPBES2=function(f,k,b){var d={};f=[];if(!a.validate(k,u,d,f))throw{message:"Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.",errors:f};f=a.derToOid(d.kdfOid);if(f!==h.oids.pkcs5PBKDF2)throw{message:"Cannot read encrypted private key. Unsupported key derivation function OID.",
oid:f,supportedOids:["pkcs5PBKDF2"]};f=a.derToOid(d.encOid);if(f!==h.oids["aes128-CBC"]&&f!==h.oids["aes192-CBC"]&&f!==h.oids["aes256-CBC"]&&f!==h.oids["des-EDE3-CBC"]&&f!==h.oids.desCBC)throw{message:"Cannot read encrypted private key. Unsupported encryption scheme OID.",oid:f,supportedOids:["aes128-CBC","aes192-CBC","aes256-CBC","des-EDE3-CBC","desCBC"]};k=d.kdfSalt;var e=c.util.createBuffer(d.kdfIterationCount),e=e.getInt(e.length()<<3),g,m;switch(h.oids[f]){case "aes128-CBC":g=16;m=c.aes.createDecryptionCipher;
break;case "aes192-CBC":g=24;m=c.aes.createDecryptionCipher;break;case "aes256-CBC":g=32;m=c.aes.createDecryptionCipher;break;case "des-EDE3-CBC":g=24;m=c.des.createDecryptionCipher;break;case "desCBC":g=8,m=c.des.createDecryptionCipher}b=c.pkcs5.pbkdf2(b,k,e,g);d=d.encIv;m=m(b);m.start(d);return m};h.pbe.getCipherForPKCS12PBE=function(f,k,b){var d={},e=[];if(!a.validate(k,w,d,e))throw{message:"Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.",
errors:e};k=c.util.createBuffer(d.salt);var d=c.util.createBuffer(d.iterations),d=d.getInt(d.length()<<3),g;switch(f){case h.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:g=24;e=8;f=c.des.startDecrypting;break;case h.oids["pbewithSHAAnd40BitRC2-CBC"]:g=5;e=8;f=function(a,b){var d=c.rc2.createDecryptionCipher(a,40);d.start(b,null);return d};break;default:throw{message:"Cannot read PKCS #12 PBE data block. Unsupported OID.",oid:f};}g=h.pbe.generatePkcs12Key(b,k,1,d,g);b=h.pbe.generatePkcs12Key(b,k,2,d,e);
return f(g,b)}}if("function"!==typeof define)if("object"===typeof module&&module.exports){var A=!0;define=function(c,q){q(require,module)}}else return"undefined"===typeof forge&&(forge={}),v(forge);var u,B=function(c,q){q.exports=function(n){var a=u.map(function(a){return c(a)}).concat(v);n=n||{};n.defined=n.defined||{};if(n.defined.pbe)return n.pbe;n.defined.pbe=!0;for(var h=0;h<a.length;++h)a[h](n);return n.pbe}},w=define;define=function(c,q){u="string"===typeof c?q.slice(2):c.slice(2);if(A)return delete define,
w.apply(null,Array.prototype.slice.call(arguments,0));define=w;return define.apply(null,Array.prototype.slice.call(arguments,0))};define("require module ./aes ./asn1 ./des ./md ./oids ./pem ./pbkdf2 ./random ./rc2 ./rsa ./util".split(" "),function(){B.apply(null,Array.prototype.slice.call(arguments,0))})})();
