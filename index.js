"use strict";

require("dotenv").config();
const { google } = require("googleapis");
const hubspot = require("@hubspot/api-client");

async function execute() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Página1",
  });

  console.log(getRows.data);
}

async function sendContactToHubspot() {
  const hubspotClient = new hubspot.Client({
    accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
  });

  const properties = {
    company: "Biglytics",
    email: "bcooper@biglytics.net",
    firstname: "Sheldon",
    lastname: "Cooper",
    phone: "(877) 929-0687",
    website: "biglytics.net",
  };
  const SimplePublicObjectInput = { properties };

  try {
    const apiResponse = await hubspotClient.crm.contacts.basicApi.create(
      SimplePublicObjectInput
    );
    console.log(JSON.stringify(apiResponse, null, 2));
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
}

execute()
sendContactToHubspot()
