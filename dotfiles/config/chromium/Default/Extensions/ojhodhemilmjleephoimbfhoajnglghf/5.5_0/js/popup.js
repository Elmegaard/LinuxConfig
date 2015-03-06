checkIfPandoraActive();
nowplaying();
pauseplaystatus();
createStations();

var int=self.setInterval(nowplaying, 500);
var int=self.setInterval(pauseplaystatus, 500);

$(document).ready(function() {
	$(".playButton").click(function() {
	  pauseplay();
	});
	$(".pauseButton").click(function() {
	  pauseplay();
	});
	
	$(".thumbDownButton").click(function() {
	  thumbsDown();
	});
	$(".thumbUpButton").click(function() {
	  thumbsUp();
	});
	$(".skipButton").click(function() {
	  skip();
	});
	$("#createStation").change(function(){
		changeStation();
	});
	
});

function changeStation(element)
{
	var val = $("#createStation").val();
	chrome.tabs.query({}, function(tabs) {
		for (var i=0; i<tabs.length; ++i) {
			chrome.tabs.sendMessage(tabs[i].id, {action: "changeStation", val: val}, function(response) {});
		}
	});
}

function createStations()
{
	chrome.tabs.query({}, function(tabs) {
		for (var i=0; i<tabs.length; ++i) {
			chrome.tabs.sendMessage(tabs[i].id, {action: "createStation"}, function(response) {
				for(var k in response.current)
				{
					var option = $('<option></option>');
					option.text(response.current[k].text);
					
					option.val(response.current[k].val);
					
					if(response.current[k].sel)
						option.attr('selected', 'selected');
						
					$("#createStation").append(option);
				}
			});
		}
	});

}

function pauseplaystatus()
{
	chrome.tabs.query({}, function(tabs) {
		for (var i=0; i<tabs.length; ++i) {
			chrome.tabs.sendMessage(tabs[i].id, {action: "pauseplaystatus"}, function(response) {
				if(response.current == 'play')
				{
					$('.playButton').hide();
					$('.pauseButton').show();
				}
				if(response.current == 'pause')
				{
					$('.playButton').show();
					$('.pauseButton').hide();
				}

			});
		}
	});
}

function nowplaying()
{
	
	chrome.tabs.query({}, function(tabs) {
		for (var i=0; i<tabs.length; ++i) {
			chrome.tabs.sendMessage(tabs[i].id, {action: "info"}, function(response) {
				var data = response.current;
				
					$('#nowplayingText').html(data.info);
					$('#nowplaying').css('background-image','url('+data.img+')');
					
			});
		}
	});
}

function pauseplay()
{
	chrome.tabs.query({}, function(tabs) {
		for (var i=0; i<tabs.length; ++i) {
			chrome.tabs.sendMessage(tabs[i].id, {action: "pauseplay"}, function(response) {
				if(response.current == 'play')
				{
					$('.playButton').hide();
					$('.pauseButton').show();
				}
				if(response.current == 'pause')
				{
					$('.playButton').show();
					$('.pauseButton').hide();
				}

			});
		}
	});
}

function thumbsDown()
{
	chrome.tabs.query({}, function(tabs) {
		for (var i=0; i<tabs.length; ++i) {
			chrome.tabs.sendMessage(tabs[i].id, {action: "tdown"}, function(response) {

			});
		}
	});
}

function thumbsUp()
{
	chrome.tabs.query({}, function(tabs) {
		for (var i=0; i<tabs.length; ++i) {
			chrome.tabs.sendMessage(tabs[i].id, {action: "tup"}, function(response) {

			});
		}
	});
}

function skip()
{
	chrome.tabs.query({}, function(tabs) {
		for (var i=0; i<tabs.length; ++i) {
			chrome.tabs.sendMessage(tabs[i].id, {action: "skip"}, function(response) {

			});
		}
	});
}

function checkIfPandoraActive()
{
	var tabs = chrome.tabs.query({url: "*://www.pandora.com/*"}, function(tabs){
		if(tabs.length == 0)
		{
			chrome.tabs.create({url: 'http://www.pandora.com/', active: false});
		}
	});

}