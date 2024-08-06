/* eslint-disable no-underscore-dangle */
const DBAsync = require('./DBAsync');

class DBApi {
  constructor(db) {
    this.db = new DBAsync(db);
    this.currentID = null;
  }

  // NeDB forces use of `_id` as primary key, so swap with `id`
  static translateID(contact) {
    return (contact.id === undefined)
      ? { ...contact, id: contact._id, _id: undefined }
      : { ...contact, _id: contact.id, id: undefined };
  }

  async makeID() {
    if (this.currentID === null) {
      this.currentID = await this.getCurrentID();
    }

    this.currentID += 1;
    return this.currentID;
  }

  async getCurrentID() {
    const contacts = await this.getAllContacts();
    const largestID = contacts.reduce((max, c) => Math.max(max, c.id), -1);

    return largestID;
  }

  async getAllContacts() {
    const docs = await this.db.find({});

    return docs.map(DBApi.translateID);
  }

  async addContact(contact) {
    const id = await this.makeID();
    const newDoc = await this.db.insert({ ...contact, _id: id });

    return DBApi.translateID(newDoc);
  }

  async updateContact(id, update) {
    const numUpdated = await this.db.update({ _id: parseInt(id, 10) }, update, {});

    return numUpdated > 0;
  }

  async getContact(id) {
    const contact = await this.db.findOne({ _id: parseInt(id, 10) });

    const result = (contact)
      ? DBApi.translateID(contact)
      : null;

    return result;
  }

  async deleteContact(id) {
    const numRemoved = await this.db.remove({ _id: parseInt(id, 10) }, {});

    return numRemoved > 0;
  }
}

module.exports = DBApi;
