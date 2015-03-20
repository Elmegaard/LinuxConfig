#!/bin/bash
mute=$( amixer sget Master | grep '\[on\]' );
if [ "$mute" != "" ]
then
    vol=`awk -F"[][]" '/dB/ { print $2 }' <(amixer sget Master)`
    if [ $vol == "0%" ]
    then 
        echo "Mute"
    else
        echo $vol
    fi
else
    echo "Mute"
fi
