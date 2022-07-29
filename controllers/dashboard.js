"use strict";

const logger = require("../utils/logger");
const stationCollection = require("../models/station-store.js");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: stationCollection.getAllStation(),
    };
    logger.info("about to render", stationCollection.getAllStation());
    response.render("dashboard", viewData);
  },
  addStation(request, response) {
    const newStation = {
        id: uuid.v1(),
        name: request.body.name,
        readings: []
    }
    stationCollection.addStation(newStation);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
