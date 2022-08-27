'use strict'

const { google } = require("googleapis");

async function execute() {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
      });

  const client = await auth.getClient();

  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1f8p4SR3Qb_Pp4Yj5hlJQ5Udtwy1_jwK3gg5GR5oc8-c";

  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Página1",
  });

  console.log(getRows.data)
  
}

execute()