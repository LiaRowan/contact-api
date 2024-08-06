/* eslint-disable no-underscore-dangle */

class DBApi {
  constructor(db) {
    this.db = db;
    this.currentID = null;
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
    return new Promise((resolve, reject) => {
      this.db.find({}, (err, docs) => {
        if (err) { return reject(err); }

        // NeDB forces use of `_id` as primary key, so swap with `id`
        const withSwappedId = docs.map((d) => ({ ...d, id: d._id, _id: undefined }));

        return resolve(withSwappedId);
      });
    });
  }

  async addContact(contact) {
    const id = await this.makeID();

    return new Promise((resolve, reject) => {
      this.db.insert({ ...contact, _id: id }, (err, newDoc) => {
        if (err) { return reject(err); }

        return resolve({ ...newDoc, id: newDoc._id, _id: undefined });
      });
    });
  }

  async updateContact(id, update) {
    return new Promise((resolve, reject) => {
      this.db.update({ _id: parseInt(id, 10) }, update, {}, (err, numUpdated) => {
        if (err) { return reject(err); }

        return resolve(numUpdated > 0);
      });
    });
  }

  async getContact(id) {
    return new Promise((resolve, reject) => {
      this.db.findOne({ _id: parseInt(id, 10) }, (err, contact) => {
        if (err) { return reject(err); }

        // NeDB forces use of `_id` as primary key, so swap with `id`
        const result = (contact)
          ? { ...contact, id: contact._id, _id: undefined }
          : null;

        return resolve(result);
      });
    });
  }

  async deleteContact(id) {
    return new Promise((resolve, reject) => {
      this.db.remove({ _id: parseInt(id, 10) }, {}, (err, numRemoved) => {
        if (err) { return reject(err); }

        return resolve(numRemoved > 0);
      });
    });
  }
}

module.exports = DBApi;
