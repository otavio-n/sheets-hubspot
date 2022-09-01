"use strict";

const { google } = require("googleapis");

const IGoogleSheetsCaller = require("./interface");

class GoogleSheetsCaller extends IGoogleSheetsCaller {
  constructor() {
    super();
    this.sheetId = process.env.GOOGLE_SHEET_ID;
    this.range = process.env.SHEET_RANGE || "Página1";
  }

  async getGoogleSheetsRows(auth, client) {
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = this.sheetId;

    try {
      const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: this.range,
      });
      console.log(JSON.stringify(getRows.data, null, 2));
      return getRows.data.values;
    } catch (e) {
      e.message === "HTTP request failed"
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e);
    }
  }
}

module.exports = GoogleSheetsCaller;
