const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");

const updateContacts = async(contacts) => {
  const contactsString = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, contactsString);
};

module.exports = updateContacts;