function loadFormFromDocument(){return{formElement:document.getElementById("create-org-form"),nameInput:document.getElementById("name-input"),saveButton:document.getElementById("create-org-button"),outputDiv:document.getElementById("output")}}
function saveOrganization(b){var a=b.nameInput.value,a=a.trimRight(),a=a.trimLeft();background.getIdentity(function(d){background.createOrganization({name:a,owners:[d.uid],members:[]},function(a){window.console.log("createOrganization response",a);hideSpinny($(b.saveButton),c);helper.setLocation("admin-dashboard.html")},function(a){window.console.log("error",a);showErrorDialog(a.userVisibleError);hideSpinny($(b.saveButton),c)});b.outputDiv.textContent="submitted request, please be patient ...";var c=
showSpinny($(b.saveButton))},onBackgroundError)}$(function(){var b=loadFormFromDocument();b.formElement.addEventListener("submit",function(a){saveOrganization(b);a.preventDefault()})});
