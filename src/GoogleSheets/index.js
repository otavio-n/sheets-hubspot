"use strict";

class GoogleSheets {
  constructor(IGoogleSheetsClient, IGoogleSheetsCaller) {
    this.googleSheetsClient = new IGoogleSheetsClient();
    this.googleSheetsCaller = new IGoogleSheetsCaller();
  }

  async execute() {
    const { auth, client } = await this.googleSheetsClient.createGoogleClient();
    const rowsData = await this.googleSheetsCaller.getGoogleSheetsRows(
      auth,
      client
    );
    await this.verifyFirstRow(rowsData[0]);
    rowsData.shift();
    return rowsData;
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

module.exports = { GoogleSheets };
