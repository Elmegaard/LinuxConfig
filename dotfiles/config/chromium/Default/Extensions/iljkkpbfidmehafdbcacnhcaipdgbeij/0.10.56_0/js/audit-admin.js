$(document).ready(function(){mitro.loadOrganizationInfo(function(a){a=a.getSelectedOrganization();(new AuditEventLoader(a?a.id:null)).loadMoreEvents()},onBackgroundError)});
