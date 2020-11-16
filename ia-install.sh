#!/bin/bash

for file in ia-*; do
  filename=`echo $file | cut -d'.' -f 1`
  chmod 755 $file
  cp $file /usr/local/bin/$filename
  printf "Installing $file to /usr/local/bin/$filename.\n"
done

# Install the node script for ia-csv-creator globally
npm link
ln -sf /usr/local/lib/node_modules/ia-csv-creator/createInternetArchiveCsv.js /usr/local/bin/ia-csv-creator

echo "Done!"