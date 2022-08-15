"use strict";

const logger = require("../utils/logger");
const uuid = require("uuid");
const stationStore = require("../models/station-store.js");
const { WeatherReport } = require("../models/weatherReport");

const station = {
  index(request, response) {
    logger.info("station rendering");
    const stationId = request.params.id;
    const viewData = {
      title: "Station Dashboard",
      station: stationStore.getStation(stationId),
      weatherReport: new WeatherReport(stationId)
    };
    logger.info("about to render", stationStore.getStation(stationId));
    response.render("station", viewData);
  },
  addReading(request, response) {
    const stationId = request.params.id;
    const newReading = {
        id: uuid.v1(),
        code: request.body.code,
        temperature: request.body.temperature,
        windSpeed: request.body.windSpeed,
        pressure: request.body.pressure,
        windDirection: request.body.windDirection
    };
    stationStore.addReading(stationId, newReading);
    response.redirect(`/station/${stationId}`);
  },
  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${stationId} from Station ${readingId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },
};

module.exports = station;
