var showSpinny=function(a){var b=$('<img src="../img/ajax-loader.gif">');a.after(b);a.hide();return b},hideSpinny=function(a,b){b.remove();a.show()},reload=function(){window.location.reload()},showDialogWithButtons=function(a,b,c,d,e,f){a=$(templates["modal-dialog-template"].render({title:a,message:b,primaryButtonText:c,cancelButtonText:d}));b=a.find(".btn-primary");var g=a.find(".btn-cancel");c||b.addClass("hide");d||g.addClass("hide");"undefined"!==typeof e&&b.click(e);"undefined"!==typeof f&&g.click(f);
a.modal("show");return a},showDialog=function(a,b,c){return showDialogWithButtons(a,b,"OK",null,c)},showErrorDialog=function(a,b){return showDialog("Error",a,b)},showDeleteDialog=function(a,b,c){return showDialogWithButtons(a,b,"Delete","Cancel",c)},onBackgroundError=function(a){console.log("background error",a);showErrorDialog(a.userVisibleError?a.userVisibleError:a)},reloadOnError=function(a){console.log("reloadOnError",a);showErrorDialog(a,function(){reload()})},validateEmail=function(a){return a.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)},
isVisibleGroup=function(a){return!(a.isNonOrgPrivateGroup||a.isOrgPrivateGroup||a.isTopLevelOrg||a.autoDelete)},filterVisibleGroups=function(a){return _.filter(a,isVisibleGroup)},showModal=function(a){a.modal({backdrop:"static"}).modal("show")},resetAndShowModal=function(a){a.find("form")[0].reset();showModal(a)},formatTimestamp=function(a){a=new Date(a);return a.toLocaleDateString()+" "+a.toLocaleTimeString()};"undefined"!==typeof module&&module.exports&&(module.exports.isVisibleGroup=isVisibleGroup);