"use strict";

const logger = require("../utils/logger");
const stationCollection = require("../models/station-store.js");
const { WeatherReport } = require("../models/weatherReport");

const station = {
  index(request, response) {
    logger.info("station rendering");
    const stationId = request.params.id;
    const viewData = {
      title: "Station Dashboard",
      station: stationCollection.getStation(stationId),
      weatherReport: new WeatherReport(stationId)
    };
    logger.info("about to render", stationCollection.getStation(stationId));
    response.render("station", viewData);
  }
};

module.exports = station;
