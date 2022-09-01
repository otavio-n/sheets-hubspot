"use strict";

require("dotenv").config();
const { GoogleSheets } = require("./GoogleSheets");
const GoogleSheetsClient = require("./GoogleSheets/Client/client");
const GoogleSheetsCaller = require("./GoogleSheets/Api/caller");

const Hubspot = require("./Hubspot");
const { Contacts } = require("./Use-cases/integrate-contact-use-case");

async function execute() {
  const googleSheets = new GoogleSheets(GoogleSheetsClient, GoogleSheetsCaller);
  const rowsData = await googleSheets.execute();

  const parser = new Contacts();
  const preparedContacts = await parser.execute(rowsData)
  
console.log(preparedContacts)

  // const rows = await GoogleSheets();
  // const preparedContacts = await Parse(rows);
  // await Hubspot(preparedContacts);
}

execute();
