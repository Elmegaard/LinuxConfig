#!/bin/sh

PLAY_SYMBOL="▶"
PAUSE_SYMBOL="▮▮"
STOP_SYMBOL="■"

function print_symbol()
{
  case "$1" in
    "playing") echo "$PLAY_SYMBOL";;
    "paused") echo "$PAUSE_SYMBOL";;
    "stopped") echo "$STOP_SYMBOL";;
  esac
}

# First: check that mpc is installed
command -v mpc >/dev/null 2>&1 || { echo >&2 "mpc missing"; exit 1; }

# Second: check that mpd is running
MPD_STATUS="$(mpc status -f "" 2>/dev/null)"
if [[ "$MPD_STATUS" == "" ]]; then
  print_symbol "stopped"
else
  # Then get the player status
  MPD_STATE=$(echo "$MPD_STATUS" | grep -Po '(?<=\[).*(?=\])')

  case $BLOCK_BUTTON in
    1) # left click (toggling changes the status)
      [ "$MPD_STATE" == "paused"] && print_symbol "playing" \
        || print_symbol "paused" ;
      mpc toggle& ;;
    4) # scroll up
      print_symbol $MPD_STATE ;
      mpc prev& ;;
    5) # scroll down
      print_symbol $MPD_STATE ;
      mpc next& ;;
    *) print_symbol $MPD_STATE ;;
  esac
fi
