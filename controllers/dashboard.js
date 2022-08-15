"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const uuid = require("uuid");
const accounts = require("./accounts");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: stationStore.getUserStations(loggedInUser.id),
    };
    logger.info("about to render", stationStore.getAllStation());
    response.render("dashboard", viewData);
  },
  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
        id: uuid.v1(),
        userid: loggedInUser.id,
        name: request.body.name,
        latitude: request.body.lat,
        longitude: request.body.lng,
        readings: []
    };
    logger.debug('Creating a new Station', newStation);
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
