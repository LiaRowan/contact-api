class DBAsync {
  constructor(db) {
    this.db = db;
  }

  find(search) {
    return new Promise((resolve, reject) => {
      this.db.find(search, (err, docs) => {
        if (err) { return reject(err); }
        return resolve(docs);
      });
    });
  }

  findOne(search) {
    return new Promise((resolve, reject) => {
      this.db.findOne(search, (err, doc) => {
        if (err) { return reject(err); }
        return resolve(doc);
      });
    });
  }

  insert(doc) {
    return new Promise((resolve, reject) => {
      this.db.insert(doc, (err, newDoc) => {
        if (err) { return reject(err); }
        return resolve(newDoc);
      });
    });
  }

  update(search, replace, options) {
    return new Promise((resolve, reject) => {
      this.db.update(search, replace, options, (err, numUpdated) => {
        if (err) { return reject(err); }
        return resolve(numUpdated);
      });
    });
  }

  remove(search, options) {
    return new Promise((resolve, reject) => {
      this.db.remove(search, options, (err, numRemoved) => {
        if (err) { return reject(err); }
        return resolve(numRemoved);
      });
    });
  }
}

module.exports = DBAsync;
