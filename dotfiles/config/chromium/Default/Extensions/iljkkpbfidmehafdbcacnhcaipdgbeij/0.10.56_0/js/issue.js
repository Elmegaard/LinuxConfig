$(document).ready(function(){background.getIdentity(function(a){a&&$("#issue-form").find('input[name="email"]').val(a.uid)});$("#issue-form").submit(function(a){var b=$(this);background.getIdentity(function(a){var d=b.find('input[name="email"]').val(),c=b.find("select").val(),e=b.find('input[name="url"]').val();a="uid:"+(a?a.uid:"unknown")+"\n\n\n"+b.find("textarea").val();"none"===c?showErrorDialog("Please select an issue type"):background.addIssue(c,e,a,d,function(){b=$("#issue-form");$("<span> Thanks! Issue submitted</span>").insertAfter(b);
$(b).hide()},onBackgroundError)},onBackgroundError);return!1});var a=(new URI(document.location.toString())).getFragment();a&&(a=window.atob(a),$('#issue-form input[name="url"]').val(a))});
