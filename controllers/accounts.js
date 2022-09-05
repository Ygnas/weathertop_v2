"use strict";

const userstore = require("../models/user-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    if (request.cookies.weathertop) {
      response.redirect("dashboard");
    }
    response.render("index", viewData);
  },

  settings(request, response) {
    const user = userstore.getUserByEmail(request.cookies.weathertop);
    response.render("account", user);
  },

  edit(request, response) {
    const user = request.body;
    userstore.editUser(user);
    response.cookie("weathertop", user.email);
    response.redirect("/account");
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("login", viewData);
  },

  logout(request, response) {
    response.cookie("weathertop", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("signup", viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect("/");
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user) {
      response.cookie("weathertop", user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.weathertop;
    return userstore.getUserByEmail(userEmail);
  },
};

module.exports = accounts;
