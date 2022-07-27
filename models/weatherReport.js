"use strict";

const stationCollection = require("./station-store.json").stationCollection;
const conversion = require("../utils/conversion");

const weatherReport = {
    WeatherReport : function(id) {
        const station = stationCollection.find(station => station.id == id);
        const latestReading = station.readings[station.readings.length-1];
        this.code = latestReading.code;
        this.tempC = latestReading.temperature + " C";
        this.windSpeed = latestReading.windSpeed + " bft";
        this.pressure = latestReading.pressure + " hpa";
        this.tempF = conversion.tempF(latestReading.temperature) + " F";
        this.weather = conversion.currentWeather(this.code);
    }
};

module.exports = weatherReport;