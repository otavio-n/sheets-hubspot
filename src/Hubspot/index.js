"use strict";

const hubspot = require("@hubspot/api-client");

async function execute(contacts) {
  for (let contact of contacts) {
    await sendContactToHubspot(contact);
  }
}

async function sendContactToHubspot(properties) {
  const hubspotClient = new hubspot.Client({
    accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
  });

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

module.exports = execute;
