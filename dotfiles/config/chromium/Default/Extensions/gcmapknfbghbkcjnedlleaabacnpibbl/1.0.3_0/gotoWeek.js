(function () { 
	function getWeek() { 
		var now = new Date(),
			onejan = new Date(now.getFullYear(),0,1); 
		return Math.ceil((((now - onejan) / 86400000) + onejan.getDay()+1)/7); 
	}
	var week = getWeek(),
		table = document.querySelectorAll('table')[1],
		top = table.getBoundingClientRect().top - 263;

	Array.prototype.filter.call(table.tBodies[0].rows, function (row) {
		if(row.cells[0].rowSpan == 4) {
			if(row.cells[0].children[0].children && row.cells[0].children[0].children[0].childNodes[0].textContent.indexOf('Uge '+week) !== -1) {
				window.scroll(0, row.offsetTop + 235 + top); 
			} else if(row.cells[0].children[0].childNodes[0].textContent == "Uge "+week) { 
				window.scroll(0, row.offsetTop + 170 + top); 
			} 
		} 
	}); 
}());