const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");
const updateContacts = require("./updateContacts");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
    // console.log(contacts);
  }
  catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const selectContact = contacts.find(item => item.id === contactId);
    if (!selectContact) {
      throw new Error(`Product with id=${contactId} is not found`);
    }
    // return selectContact;
    console.log(selectContact);
  }
  catch (error) {
    throw error;
  }
};

const updateContactById = async (contactId, updateInfo) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
      throw new Error(`Product with id=${contactId} is not found`);
    }
    contacts[idx] = { ...contacts[idx], ...updateInfo };
    await updateContacts(contacts);
    // return contacts[idx];
    console.log(contacts[idx]);
  }
  catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
      throw new Error(`Product with id=${contactId} is not found`);
    }
    const newContacts = contacts.filter(item => item.id !== contactId);
    await updateContacts(newContacts);
    // return contacts[idx];
    console.log(contacts[idx]);
  }
  catch (error) {
    throw error;
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const newContact = { id: v4(), name, email, phone };
    const contacts = await listContacts();
    contacts.push(newContact);
    await updateContacts(contacts);
    // return newContact;
    console.log(newContact);
  }
  catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  updateContactById,
  removeContact,
  addContact
};