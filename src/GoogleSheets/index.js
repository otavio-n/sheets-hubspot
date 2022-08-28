"use strict";

const { google } = require("googleapis");

async function execute() {
  const rows = await getSheetRowsFromApi();
  await verifyFirstRow(rows[0]);
  rows.shift();
  return rows;
}

async function getSheetRowsFromApi() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  try {
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Página1",
    });
    console.log(JSON.stringify(getRows.data, null, 2));
    return getRows.data.values;
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
}

async function verifyFirstRow(firstRowValues) {
  const firstRow = [
    "Nome da empresa",
    "Nome completo",
    "Email",
    "Telefone",
    "Website",
  ];

  if (
    firstRow.length !== firstRowValues.length ||
    !firstRow.every((element, index) => element === firstRowValues[index])
  ) {
    throw new Error("The first row is incorrect");
  }
}

module.exports = execute;
