#!/bin/bash
cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.bak
reflector -c DE -c FR -c DK -c NL -c NO -l 20 -p http --sort score --fastest 10 --threads 2 --save /etc/pacman.d/reflectormirrorlist
cat /etc/pacman.d/reflectormirrorlist > /etc/pacman.d/mirrorlist
