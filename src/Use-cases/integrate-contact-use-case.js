"use strict";

async function parse (contact) {
    const contactNames = contact[1].split(' ')
    let parsedContact = {
        company: contact[0],
        email: contact[2],
        firstname: contactNames[0],
        lastname: contactNames[contactNames.length - 1],
        phone: contact[3],
        website: contact[4],
    }
    return parsedContact
}

module.exports = parse