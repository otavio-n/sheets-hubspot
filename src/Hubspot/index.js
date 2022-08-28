"use strict";

const hubspot = require("@hubspot/api-client");

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

module.exports = sendContactToHubspot
