"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const uuid = require("uuid");
const accounts = require("./accounts");
const { WeatherReport } = require("../models/weatherReport");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: stationStore.getUserStations(loggedInUser.id),
    };
    viewData.stations.sort((a, b) => a.name.localeCompare(b.name));
    viewData.stations.forEach((station) => {
      station.latestReading = new WeatherReport(station.id);
    });
    logger.info("about to render", viewData.stations);
    response.render("dashboard", viewData);
  },

  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      latitude: Number(request.body.lat),
      longitude: Number(request.body.lng),
      readings: [],
    };
    logger.debug("Creating a new Station", newStation);
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  },
};

module.exports = dashboard;
