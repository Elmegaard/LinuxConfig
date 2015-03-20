#!/bin/bash
export WINEPREFIX=$HOME/.steam
export WINEDEBUG=-all
nice -n 19 wine ~/.wine/drive_c/Program\ Files/Steam/Steam.exe -no-dwrite
