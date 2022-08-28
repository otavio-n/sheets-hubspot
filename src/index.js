"use strict";

require("dotenv").config();
const GoogleSheets = require('./GoogleSheets')
const Hubspot = require('./Hubspot')

async function execute() {
  await GoogleSheets()
}

execute()
