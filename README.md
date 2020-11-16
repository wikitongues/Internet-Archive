# Internet-Archive
This repository contains the scripts used by Wikitongues to prepare oral histories for upload to the Internet Archive.

## Requirements
* Staging directory created using the [Library of Congress scripts](https://github.com/wikitongues/Library-of-Congress)
* Node.js

## Usage
* First run `npm install`
* Make the install script executable: `chmod 755 ./ia-install.sh`
* Run the install script: `./ia-install.sh`
* Create a config file named `ia-config` in your home directory:
```
IA_Staging='/path/to/staging'
IA_AIRTABLE_APIKEY='{api key}'
IA_AIRTABLE_BASE='{base id}'
```
* Run `ia-prepare` to create a spreadsheet for bulk uploading
  * For all directories in staging: `ia-prepare`
  * For all directories from a specific year: e.g. `ia-prepare -y 2020`
  * For all directories from a specific month: e.g. `ia-prepare -y 2020 -m 11`
  * This will create upload.csv in the staging directory containing metadata for each oral history to be uploaded
  * Error log written to ~/ia-log
* Now, run the [Internet Archive command-line tool](https://archive.org/services/docs/api/internetarchive/cli.html) from the staging directory to do a bulk upload:
```
ia upload --spreadsheet=upload.csv
```
