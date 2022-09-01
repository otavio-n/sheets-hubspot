"use strict";

const { google } = require("googleapis");

const IGoogleSheetsClient = require("./interface");

class GoogleSheetsClient extends IGoogleSheetsClient {
  constructor() {
    super();
    this.credentialsFileName =
      process.env.CREDENTIALS_FILE_NAME || "credentials.json";
    this.baseUrl =
      process.env.GOOGLE_SHEET_BASE_URL ||
      "https://www.googleapis.com/auth/spreadsheets";
  }
  async createGoogleClient() {
    const auth = new google.auth.GoogleAuth({
      keyFile: this.credentialsFileName,
      scopes: this.baseUrl,
    });

    const client = await auth.getClient();
    return { auth, client };
  }
}

module.exports = GoogleSheetsClient;
