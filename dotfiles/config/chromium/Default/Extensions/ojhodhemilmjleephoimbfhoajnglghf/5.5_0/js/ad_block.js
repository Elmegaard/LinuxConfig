// Auto Skip Video Ads or Remove Container
autoSkipVideoAds();
function autoSkipVideoAds() {
    var $skipHolder = $('DIV.skipHolder');
    if ($skipHolder.length) {
        $skipHolder.children('A').click();
    }
	
	//If Video DIV Exists, remove it and make sure music is still playing, if not, play it
	if($('#videoAd').length)
	{
		console.log('Video Ad Removed');
		$('#videoAd').remove();
		if($(".playButton").css("display") == "none")
		{
			$('.pauseButton').trigger('click');
		}
	}

    setTimeout(autoSkipVideoAds, 250);
}

// Press the Still Listening Button
stillListening();
function stillListening()
{
	listen=document.getElementsByClassName("still_listening");
	if (listen.length > 0)
	{
		listen[0].click();
	}
	setTimeout(stillListening,6000);
}

/* set the Pandora One centered layout */
document.documentElement.classList.add("width-p1-noAds");

/* get rid of the in-page advertising container */
if(ads=document.getElementById("ad_container"))
{
	ads.parentNode.removeChild(ads);
}

$('#promobox').remove();
