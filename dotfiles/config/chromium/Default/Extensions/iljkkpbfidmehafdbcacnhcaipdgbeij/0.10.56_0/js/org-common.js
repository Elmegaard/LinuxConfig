$(document).ready(function(){background.getIdentity(function(a){null===a?helper.setLocation("popup.html"):$(".email").text(a.uid)});mitro.loadOrganizationInfo(function(a){var b=a.getSelectedOrganization();if(null!==b){$(".org-name").text(b.name);$(".org-icon").attr("data-icon-text",b.name);var c=function(){var a=$(".org-admin-dropdown .org-name"),b=$(".org-admin-dropdown .org-icon");b.attr("data-icon-text",a.text());replaceBlankImages(b);a=parseInt(a.attr("data-id"),10);background.selectOrganization(a,
reload,onBackgroundError)};a=_.filter(a.getOrganizations(),function(a){return a.isAdmin});0<a.length&&($(".org-admin").removeClass("hide"),1===a.length?$(".org-no-dropdown").removeClass("hide"):initOrgDropdown($(".org-admin-dropdown"),a,b.id,c));replaceBlankImages($(".org-icon"));0<$(".org-admin .selected").length&&$(".create-team-link").attr("href","../html/create-team.html?orgId="+b.id)}else $(".org-upgrade").removeClass("hide");$(".nav-menu").removeClass("hide");$(".user-menu").removeClass("hide")},
onBackgroundError);$(".logout-link").click(function(){background.mitroLogout(function(){helper.setLocation("popup.html")});return!1});$(".nav-menu a").each(function(){var a=document.location.pathname,b=$(this).attr("href").slice(2);a===b&&$(this).addClass("selected")})});