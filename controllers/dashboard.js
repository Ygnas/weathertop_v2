"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: stationStore.getAllStation(),
    };
    logger.info("about to render", stationStore.getAllStation());
    response.render("dashboard", viewData);
  },
  addStation(request, response) {
    const newStation = {
        id: uuid.v1(),
        name: request.body.name,
        readings: []
    }
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
