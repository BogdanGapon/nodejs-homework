const fs = require('fs/promises');
const path = require('path');
const contactsJSONPath = path.resolve(__dirname, 'contacts.json');
const { nanoid } = require('nanoid');

const listContacts = async () => {
  const data = await fs.readFile(contactsJSONPath);
  return JSON.parse(data);
};
const getContactById = async id => {
  const data = await listContacts();
  const result = data.find(contact => contact.id === id);
  return result || null;
};

const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const newContact = { name, email, phone, id: nanoid() };
  data.push(newContact);
  await fs.writeFile(contactsJSONPath, JSON.stringify(data, null, 2));
  return data;
};

const removeContact = async id => {
  const data = await listContacts();
  const index = data.findIndex(contact => contact.id === id);
  if (index === -1) {
    return null;
  }
  data.splice(index, 1);
  await fs.writeFile(contactsJSONPath, JSON.stringify(data, null, 2));
  return data;
};

const updateContact = async (id, body) => {
  const data = await listContacts();
  const foundContactId = data.findIndex(contact => {
    return contact.id === id;
  });
  if (foundContactId === -1) {
    return null;
  }
  data[foundContactId] = { id, ...body };
  await fs.writeFile(contactsJSONPath, JSON.stringify(data, null, 2));
  return data;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
