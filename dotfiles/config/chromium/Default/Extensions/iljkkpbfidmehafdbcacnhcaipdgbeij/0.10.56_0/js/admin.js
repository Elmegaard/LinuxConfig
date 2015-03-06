$(document).ready(function(){var a=window.location.pathname;$(".admin-nav li a").each(function(){(new URI(this.href)).getPath()===a&&$(this).addClass("admin-active-nav-item")})});
