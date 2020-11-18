#!/bin/bash

if ! [[ -f ~/ia-config ]]; then
  echo "Couldn't find ia-config."
  exit 1
fi

month=''
year=''
while getopts 'm:y:' flag; do
  case "${flag}" in
    m) month="${OPTARG}" ;;
    y) year="${OPTARG}" ;;
    *) echo "Invalid flag ${flag}"
       exit 1 ;;
  esac
done

if ! [ -z $year ]; then
  # Year flag provided
  if ! [[ $year =~ ^[0-9]{4}$ ]]; then
    echo "Invalid year $year"
    exit 1
  fi

  if ! [ -z $month ]; then
    # Month flag provided
    if ! [[ $month =~ ^0[1-9]|1[0-2]$ ]]; then
      echo "Invalid month $month"
      echo "Must be 01-12"
      exit 1
    fi
  fi
elif ! [ -z $month ]; then
  echo "Must set year, e.g. $ loc -m 10 -y 2020"
  exit 1
else
  directories=$@
fi

source ~/ia-config
> ~/ia-log

cd $IA_Staging

APIKEY=$IA_AIRTABLE_APIKEY BASE=$IA_AIRTABLE_BASE IA_STAGING=$IA_Staging ia-csv-creator $year $month >> ~/ia-log 2>&1

echo "Done!"
