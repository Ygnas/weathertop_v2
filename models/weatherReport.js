"use strict";

const stationCollection = require("./station-store.js");
const conversion = require("../utils/conversion");

const weatherReport = {
    WeatherReport : function(stationId) {
        const station = stationCollection.getStation(stationId);
        const latestReading = station.readings[station.readings.length-1];
        this.name = station.name;
        if (typeof latestReading == 'undefined') return 0;
        this.code = latestReading.code;
        this.tempC = latestReading.temperature + " C";
        this.beafourt = conversion.beafourt(latestReading.windSpeed) + " bft";
        this.windCompass = conversion.degreesToCompass(latestReading.windDirection);
        this.windChill = "Feels like \n" + conversion.windChill(latestReading.temperature, latestReading.windSpeed);
        this.pressure = latestReading.pressure + " hpa";
        this.tempF = conversion.tempF(latestReading.temperature) + " F";
        this.weather = conversion.currentWeather(this.code);
    }
};

module.exports = weatherReport;