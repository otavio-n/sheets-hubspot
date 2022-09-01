"use strict";

require("dotenv").config();
const {
  GoogleSheets,
  GoogleSheetsCaller,
  GoogleSheetsClient,
} = require("./GoogleSheets");

const Hubspot = require("./Hubspot");
const Parse = require("./Use-cases/integrate-contact-use-case");

async function execute() {
  const googleSheets = new GoogleSheets(GoogleSheetsClient, GoogleSheetsCaller);
  const rowsData = await googleSheets.execute();
  console.log(rowsData)
  
  // const rows = await GoogleSheets();
  // const preparedContacts = await Parse(rows);
  // await Hubspot(preparedContacts);
}

execute();
