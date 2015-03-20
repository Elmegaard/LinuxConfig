#!/bin/bash
status=$( acpi -b | awk '{print $3}' | sed -e s/,//2 );
if [ "$status" == "Unknown," ] 
then
    echo "FULL"
elif [ "$status" == "Discharging," ] 
then
    echo "DIS"
else
    echo "CHAR"
fi
