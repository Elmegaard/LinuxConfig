#!/bin/bash
disk_avail=$(df -H /dev/sda2 | grep -vE '^Filesystem|tmpfs|cdrom' | awk '{ print $4 }')
echo $disk_avail
