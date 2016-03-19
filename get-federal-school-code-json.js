'use strict';

const meow = require('meow');
const request = require('request');
const xlsx = require('node-xlsx');

const cli = meow(`
  Usage
    $ get-federal-school-code-json <academic-year>
`);

// Parse the academic year from the command line
let academicYearKey = cli.input[0];

if(!academicYearKey)
{
  console.error("No academic year provided");
  return;
}

if(!/^[0-9]{4}$/.test(academicYearKey))
{
  console.error('Incorrect format for academic year. Format should be XXYY (e.g. "1516")');
  return;
}

// Request the Excel document
let workbookUrl = 'https://ifap.ed.gov/fedschcodelist/attachments/' + academicYearKey + 'FedSchoolCodeList.xlsx'

let options = {
  method: 'GET',
  encoding: null,
  uri: workbookUrl
};

request(options, function(error, response, body) {

  // Download the workbook
  let workbook = xlsx.parse(body);
  let sheet = workbook[0].data;

  // Build a list of column names
  let columnCount = sheet[0].length;
  let columns = [];

  for(let i=0; i<columnCount; i++)
  {
    var columnName = sheet[0][i];
    columnName = columnName.charAt(0).toLowerCase() + columnName.slice(1);

    columns.push(columnName);
  }

  // Build a list of data
  let rowCount = sheet.length;
  let data = [];

  for(let i=1; i<rowCount; i++)
  {
    var item = {};
    for(let j=0; j<columnCount; j++)
    {
      item[columns[j]] = sheet[i][j];
    }
    data.push(item);
  }

  // Output JSON
  console.log(JSON.stringify(data));

});
