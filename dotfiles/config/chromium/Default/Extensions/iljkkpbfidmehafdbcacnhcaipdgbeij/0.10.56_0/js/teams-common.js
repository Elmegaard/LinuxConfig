var teamSortFunc,filterSortAndRenderTeams;
(function(){teamSortFunc=function(b,c){return lowercaseCompare(b.name,c.name)};var d=function(b){$(".teams-list").html(templates["teams-template"].render({teams:b}));replaceBlankImages($(".team-icon"))};filterSortAndRenderTeams=function(b,c){b=filterVisibleGroups(b);b.sort(teamSortFunc);0<b.length?($(".has-teams").removeClass("hide"),_.each(b,function(a){a.userCount=a.users.length;a.userCountString=a.userCount+" Member"+(1!==a.userCount?"s":"");a.secretCount=a.groupId in c?c[a.groupId]:0;a.secretCountString=
a.secretCount+" Secret"+(1!==a.secretCount?"s":"")}),d(b)):$(".has-no-teams").removeClass("hide")};"undefined"!==typeof module&&module.exports&&(module.exports={teamSortFunc:teamSortFunc,filterSortAndRenderTeams:filterSortAndRenderTeams})})();