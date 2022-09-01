"use strict";

const columns = {
  company: 0,
  name: 1,
  email: 2,
  phone: 3,
  website: 4,
};

class Contacts {
  constructor() {}
  async execute(contacts) {
    const parser = new ContactParser();
    const email = new Email();
    let parsedContacts = [];
    for (let contact of contacts) {
      const isValidEmail = await email.verify(contact[columns.email]);
      if (!isValidEmail) continue;
      let parsedContact = await parser.parse(contact);
      parsedContacts.push(parsedContact);
    }
    return parsedContacts;
  }
}

class Email {
  async verify(email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const isValid = email.match(emailRegex);
    if (!isValid) console.warn(`Invalid email: ${email}`);
    return isValid;
  }
}

class ContactParser {
  async parse(contact) {
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
}

module.exports = { Contacts };
