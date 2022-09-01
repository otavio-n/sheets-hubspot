"use strict";

const { google } = require("googleapis");

class GoogleSheets {
  constructor(GoogleSheetsClient, IGoogleSheetsCaller) {
    this.googleSheetsClient = new GoogleSheetsClient()
    this.googleSheetsCaller = new IGoogleSheetsCaller()
  }

  async execute() {
    const {auth, client} = await this.googleSheetsClient.createGoogleClient();
    const rowsData = await this.googleSheetsCaller.getGoogleSheetsRows(auth, client)
    await this.verifyFirstRow(rowsData[0])
    rowsData.shift()
    return rowsData
  }

  async verifyFirstRow(firstRowValues) {
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
}

class GoogleSheetsClient {
  async createGoogleClient() {
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();
    return {auth, client};
  }
}

class IGoogleSheetsCaller {
  async getGoogleSheetsRows() {
    throw new Error('Implement method')
  }
}
class GoogleSheetsCaller extends IGoogleSheetsCaller {
  constructor() {
    super()
    this.sheetId = process.env.GOOGLE_SHEET_ID;
  }

  async getGoogleSheetsRows(auth, client) {
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = this.sheetId;
    
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
}

module.exports = {GoogleSheets, GoogleSheetsClient, GoogleSheetsCaller};
