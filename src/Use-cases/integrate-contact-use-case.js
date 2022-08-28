"use strict";

const columns = {
  company: 0,
  name: 1,
  email: 2,
  phone: 3,
  website: 4,
};

async function execute(contacts) {
  let parsedContacts = [];
  for (let contact of contacts) {
    const isValidEmail = await verifyEmail(contact[columns.email]);
    if (!isValidEmail) continue
    let parsedContact = await parseContact(contact);
    parsedContacts.push(parsedContact);
  }
  return parsedContacts;
}

async function verifyEmail(email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const isValid = email.match(emailRegex);
  if (!isValid) console.warn(`Invalid email: ${email}`)
  return isValid;
}

async function parseContact(contact) {
  const contactNames = contact[columns.name].split(" ");
  let parsedContact = {
    company: contact[columns.company],
    email: contact[columns.email],
    firstname: contactNames[0],
    lastname: contactNames[contactNames.length - 1],
    phone: contact[columns.phone],
    website: contact[columns.website],
  };
  return parsedContact;
}

module.exports = execute;
