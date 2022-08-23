"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const userStore = {
  store: new JsonStore("./models/user-store.json", { users: [] }),
  collection: "users",

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  addUser(user) {
    this.store.add(this.collection, user);
    this.store.save();
  },

  getUserById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },

  editUser(user) {
    let oldUser = this.getUserByEmail(user.email);
    oldUser.firstName = user.firstName;
    oldUser.lastName = user.lastName;
    oldUser.password = user.password;
    oldUser.email = user.email;
    this.store.save();
  },
};

module.exports = userStore;
