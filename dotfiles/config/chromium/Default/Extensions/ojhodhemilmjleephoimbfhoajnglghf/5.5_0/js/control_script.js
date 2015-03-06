
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	if (request.action == "pauseplay")
	  sendResponse({current: pauseplay()});
	if (request.action == "pauseplaystatus")
	  sendResponse({current: pauseplaystatus()});
	if (request.action == "tdown")
	  sendResponse({current: tdown()});
	if (request.action == "tup")
	  sendResponse({current: tup()});
	if (request.action == "skip")
	  sendResponse({current: skip()});
	if (request.action == "info")
	  sendResponse({current: nowPlaying()});  
	if(request.action == 'restartOnEnd')
		restartOnEnd();
	if(request.action == 'createStation')
		sendResponse({current: createStation()});  
	if(request.action == 'changeStation')
		changeStation(request.val); 
  });

function changeStation(val)
{
	var item = $('#stationList .stationListItem')[val];
	item.click();
}  
  
function createStation()
{
	var data = [];
	var items = $('#stationList .stationListItem');
	$.each(items, function(index,value){
		var tmp = {};
		tmp['text'] = $(items[index]).find('.stationNameText').attr('title');
		tmp['val'] = index;
		if($(items[index]).hasClass('selected'))
			tmp['sel'] = true;
		else
			tmp['sel'] = false;
			
		if(tmp['text'])
			data.push(tmp);
		
	});
	

	return data;

}  
  
function restartOnEnd()
{
	setInterval(function(){
		if($('.remainingTime').length > 0)
		{
			var remainingTime = $('.remainingTime').text();
			if(remainingTime == '-0:00' || remainingTime == '-0:01')
			{
				if(pauseplaystatus() == 'play')
					location.reload();
			}
		}
	},250);
}
  
function nowPlaying()
{
	var data = {info:false,img:false};
	
	var title = $('.songTitle').text();
	var artist = $('.artistSummary').text();
	var top = title + ' - ' + artist;
	
	data['info'] =  top;
	data['img'] = $('.albumArt img').attr('src');
	return data;
}

function pauseplaystatus()
{
	if($(".playButton").css("display") == "none")
	{
		console.log('play');
		return 'play';
	}
	else
	{
		console.log('pause');
		return 'pause';
	}
}

function pauseplay()
{
	if($(".playButton").css("display") == "none")
	{
		$('.pauseButton').trigger('click');
		return 'pause';
	}
	else
	{
		$('.playButton').trigger('click');
		return 'play';
	}
}

function tdown()
{
	$('.thumbDownButton').trigger('click');
	return false;
}
function tup()
{
	$('.thumbUpButton').trigger('click');
	return false;
}
function skip()
{
	$('.skipButton').trigger('click');
	return false;
}

var int=self.setInterval(updateTitle, 1500);

function updateTitle()
{
	var title = $('.songTitle').text();
	var artist = $('.artistSummary').text();
	var top = title + ' - ' + artist;
	document.title = top;
}
