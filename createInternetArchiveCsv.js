#!/usr/bin/env node

'use strict';
var Airtable = require('airtable');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const { argv } = require('process');

const fields = require('./fields');
const airtableFields = require('./airtableFields');
const {normalize} = require('./helpers');

const year = argv[2];
const month = argv[3];

let formula;
if (year) {
  if (month) {
    formula = `FIND("_${year}${month}",Identifier)>0`;
  } else {
    formula = `FIND("_${year}",Identifier)>0`;
  }
}

async function getRecords () {
  return new Promise(resolve => {
    const allRecords = [];
    try {
      var base = new Airtable({apiKey: process.env.APIKEY}).base(process.env.BASE);
    
      base('Oral Histories').select({
          view: "Archival View (Comprehensive)",
          cellFormat: "string",
          timeZone: "America/New_York",
          userLocale: "en-ca",
          filterByFormula: formula,
          fields: airtableFields
      }).eachPage(function page(records, fetchNextPage) {
        allRecords.push(...records);
        fetchNextPage();
      }, function done(err) {
        if (err) { 
          console.error(err); 
          return process.exit(1);
        } else {
          resolve(allRecords);
        }
      });
    } catch (e) {
      console.error(e);
      return process.exit(1);
    }
  });
}

function getCsvRow (record) {
  return fields.reduce((row, field) => {
    row[field.name] = field.getValue(record);
    return row;
  }, {});
}

const stagedDirectories = new Set(fs.readdirSync(process.env.IA_STAGING).map(normalize));

getRecords().then(airtableRecords => {
  const rows = airtableRecords
    .filter(record => stagedDirectories.has(normalize(record.get('Identifier'))))
    .map(getCsvRow);

  const header = fields.map(field => ({id: field.name, title: field.name}));

  const csvWriter = createCsvWriter({
    path: 'upload.csv',
    header: header
  });

  return csvWriter.writeRecords(rows);
}).then(() => {
  console.log('Done!');
});
