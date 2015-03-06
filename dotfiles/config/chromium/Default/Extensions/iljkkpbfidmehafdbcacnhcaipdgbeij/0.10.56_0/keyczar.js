var forge=forge||require("node-forge"),keyczar_util=keyczar_util||require("./keyczar_util"),keyczar={};
(function(){function p(e){e||(e=w);e=forge.random.getBytes(e/8);var b=forge.random.getBytes(x/8);return keyczar_util._aesFromBytes(e,b)}function h(e){for(var b=null,a=0;a<e.versions.length;a++)if(e.versions[a].status==q){if(null!==b)throw Error("Invalid key: multiple primary keys");b=e.versions[a].versionNumber}if(null===b)throw Error("No primary key");return b}function r(e,b,a){if(!(0<a))throw Error("Invalid iterationCount: "+a);return forge.pkcs5.pbkdf2(e,b,a,s,forge.md.sha1.create())}function y(e,
b){var a=JSON.parse(e);if(a.cipher!=t)throw Error("Unsupported encryption cipher: "+a.cipher);if(a.hmac!=u)throw Error("Unsupported key derivation function: "+a.hmac);var d=keyczar_util.decodeBase64Url(a.iv),f=keyczar_util.decodeBase64Url(a.salt),g=keyczar_util.decodeBase64Url(a.key),a=r(b,f,a.iterationCount),d=forge.aes.startDecrypting(a,d,null);d.update(new forge.util.ByteBuffer(g));if(!d.finish())throw Error(v);g=d.output.getBytes();try{var k=forge.util.decodeUtf8(g);JSON.parse(k);return k}catch(c){throw Error(v);
}}function l(e,b){var a={};a.metadata=JSON.parse(e.meta);if(!1!==a.metadata.encrypted){if(!b)throw Error("Key is encrypted; you must provide the password");if(0===b.length)throw Error("Must supply a password length > 0");}else if(b)throw Error("Key is not encrypted but password provided");var d=h(a.metadata),d=e[String(d)];a.metadata.encrypted&&(d=y(d,b));var f=a.metadata.type,g=a.metadata.purpose;if(f==keyczar.TYPE_RSA_PRIVATE)a.primary=keyczar_util.privateKeyFromKeyczar(d),a.exportPublicKey=function(){var c=
a.metadata.type,b=a.metadata.purpose;if(c!=keyczar.TYPE_RSA_PRIVATE||b!=keyczar.PURPOSE_DECRYPT_ENCRYPT&&b!=keyczar.PURPOSE_SIGN_VERIFY)throw Error("Unsupported key type/purpose:"+c+"/"+b);c=keyczar.PURPOSE_ENCRYPT;b==keyczar.PURPOSE_SIGN_VERIFY&&(c=keyczar.PURPOSE_VERIFY);c={name:a.metadata.name,purpose:c,type:keyczar.TYPE_RSA_PUBLIC,encrypted:!1,versions:a.metadata.versions};if(1!=a.metadata.versions.length)throw Error("TODO: Support key sets with multiple keys");b=h(a.metadata);c={meta:JSON.stringify(c)};
c[String(b)]=a.primary.exportPublicKeyJson();return l(c)};else if(f==keyczar.TYPE_RSA_PUBLIC)a.primary=keyczar_util.publicKeyFromKeyczar(d);else if(f==keyczar.TYPE_AES&&g==keyczar.PURPOSE_DECRYPT_ENCRYPT)a.primary=keyczar_util.aesFromKeyczar(d);else throw Error("Unsupported key type: "+f);if(g==keyczar.PURPOSE_ENCRYPT||g==keyczar.PURPOSE_DECRYPT_ENCRYPT)a.encryptBinary=function(c){return a.primary.encrypt(c)},a.encrypt=function(c){c=forge.util.encodeUtf8(c);c=a.encryptBinary(c);return c=keyczar_util.encodeBase64Url(c)},
g==keyczar.PURPOSE_DECRYPT_ENCRYPT&&(a.decryptBinary=function(c){return a.primary.decrypt(c)},a.decrypt=function(c){c=keyczar_util.decodeBase64Url(c);c=a.primary.decrypt(c);return c=forge.util.decodeUtf8(c)});else if(g==keyczar.PURPOSE_VERIFY||g==keyczar.PURPOSE_SIGN_VERIFY)a.verify=function(c,b){c=forge.util.encodeUtf8(c);b=keyczar_util.decodeBase64Url(b);return a.primary.verify(c,b)},g==keyczar.PURPOSE_SIGN_VERIFY&&(a.sign=function(c){c=forge.util.encodeUtf8(c);c=a.primary.sign(c);return keyczar_util.encodeBase64Url(c)});
var k=function(){var c={};c.meta=JSON.stringify(a.metadata);if(1!=a.metadata.versions.length)throw Error("TODO: Support keyczars with multiple keys");var b=h(a.metadata);c[String(b)]=a.primary.toJson();return c};a.toJson=function(){if(a.metadata.encrypted)throw Error("Key is encrypted; use toJsonEncrypted() instead");var c=k();return JSON.stringify(c)};a.exportDecryptedJson=function(){if(!a.metadata.encrypted)throw Error("Key is not encrypted; use toJson() instead");var c=k(),b=JSON.parse(c.meta);
b.encrypted=!1;c.meta=JSON.stringify(b);return JSON.stringify(c)};a.toJsonEncrypted=function(a){if(0===a.length)throw Error("Password length must be > 0");var b=k(),d=JSON.parse(b.meta);d.encrypted=!0;b.meta=JSON.stringify(d);for(var e in b)if("meta"!=e){var d=b,g=e,f;f=b[e];var n=a,h=z,l=forge.random.getBytes(A),m=r(n,l,h),n=forge.random.getBytes(s),m=forge.aes.startEncrypting(m,n,null);m.update(new forge.util.ByteBuffer(f));if(!m.finish())throw Error("AES encryption failed");f={salt:keyczar_util.encodeBase64Url(l),
iterationCount:h,hmac:u,cipher:t,iv:keyczar_util.encodeBase64Url(n),key:keyczar_util.encodeBase64Url(m.output.getBytes())};f=JSON.stringify(f);d[g]=f}return JSON.stringify(b)};return a}keyczar.TYPE_AES="AES";keyczar.TYPE_RSA_PRIVATE="RSA_PRIV";keyczar.TYPE_RSA_PUBLIC="RSA_PUB";keyczar.PURPOSE_DECRYPT_ENCRYPT="DECRYPT_AND_ENCRYPT";keyczar.PURPOSE_ENCRYPT="ENCRYPT";keyczar.PURPOSE_VERIFY="VERIFY";keyczar.PURPOSE_SIGN_VERIFY="SIGN_AND_VERIFY";var q="PRIMARY",w=128,x=256;keyczar.create=function(e,b,a){b||
(b=keyczar.PURPOSE_DECRYPT_ENCRYPT);a||(a={});a.size||(a.size=null);a.name||(a.name="");var d=null,d=a.size;if(e==keyczar.TYPE_RSA_PRIVATE)d||(d=2048),d=forge.pki.rsa.createKeyPairGenerationState(d),forge.pki.rsa.stepKeyPairGenerationState(d,0),d=keyczar_util._rsaPrivateKeyToKeyczarJson(d.keys.privateKey);else if(e==keyczar.TYPE_AES)d=p(d).toJson();else throw Error("Unsupported key type: "+e);if(b!=keyczar.PURPOSE_DECRYPT_ENCRYPT&&b!=keyczar.PURPOSE_SIGN_VERIFY)throw Error("Unsupported purpose: "+
JSON.stringify(b,null,2));e={meta:JSON.stringify({name:a.name,purpose:b,type:e,encrypted:!1,versions:[{exportable:!1,status:q,versionNumber:1}]}),1:d};return l(e)};keyczar.fromJson=function(e,b){var a=JSON.parse(e);return l(a,b)};var t="AES128",u="HMAC_SHA1",s=16,A=16,z=5E4,v="AES decryption failed (password incorrect or data is corrupt?)";keyczar.createSessionCrypter=function(e,b){if(e.metadata.type!=keyczar.TYPE_RSA_PRIVATE&&e.metadata.type!=keyczar.TYPE_RSA_PUBLIC)throw Error("Invalid key type for SessionCrypter: "+
e.metadata.type);var a=null,d=null;if(b)var d=b.charAt(0)==keyczar_util.VERSION_BYTE?b:keyczar_util.decodeBase64Url(b),f=e.decryptBinary(d),f=keyczar_util._unpackByteStrings(f),a=keyczar_util._aesFromBytes(f[0],f[1]);else a=p(),d=a.pack(),d=e.encryptBinary(d);d={rawSessionMaterial:d,sessionMaterial:keyczar_util.encodeBase64Url(d),encryptBinary:function(b){return a.encrypt(b)},decryptBinary:function(b){return a.decrypt(b)}};a.sessionMaterial=b;return d};keyczar.encryptWithSession=function(e,b){var a=
keyczar.createSessionCrypter(e);b=forge.util.encodeUtf8(b);var d=a.encryptBinary(b),a=keyczar_util._packByteStrings([a.rawSessionMaterial,d]);return keyczar_util.encodeBase64Url(a)};keyczar.decryptWithSession=function(e,b){b=keyczar_util.decodeBase64Url(b);var a=keyczar_util._unpackByteStrings(b),a=keyczar.createSessionCrypter(e,a[0]).decryptBinary(a[1]);return forge.util.decodeUtf8(a)};"undefined"!==typeof module&&module.exports&&(module.exports=keyczar)})();
