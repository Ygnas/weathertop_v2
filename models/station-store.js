"use strict";

const stationCollection = require("./station-store.json").stationCollection;
const { WeatherReport } = require("./weatherReport.js");

stationCollection.forEach(station => {
    station.latestReading = new WeatherReport(station.id)
});

module.exports = stationCollection;