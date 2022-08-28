"use strict";

require("dotenv").config();
const GoogleSheets = require("./GoogleSheets");
const Hubspot = require("./Hubspot");
const Parse = require("./Use-cases/integrate-contact-use-case");

async function execute() {
  const rows = await GoogleSheets();
  console.log({rows})
}

execute();
