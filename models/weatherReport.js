"use strict";

const stationCollection = require("./station-store.js");
const conversion = require("../utils/conversion");

const weatherReport = {
    WeatherReport : function(stationId) {
        const station = stationCollection.getStation(stationId);
        const latestReading = station.readings[station.readings.length-1];
        this.name = station.name;
        this.latitude = "Lat: " + station.latitude;
        this.longitude = "Lng: " + station.longitude;
        if (typeof latestReading == 'undefined') return 0;
        this.code = latestReading.code;
        this.icon = conversion.weatherIcon(this.code);
        this.tempC = latestReading.temperature + " C";
        this.maxTemp = "Max: " + conversion.maxTemp(station.readings);
        this.minTemp = "Min: " + conversion.minTemp(station.readings);
        this.beafourt = conversion.beafourt(latestReading.windSpeed) + " bft";
        this.windCompass = conversion.degreesToCompass(latestReading.windDirection);
        this.windChill = "Feels like \n" + conversion.windChill(latestReading.temperature, latestReading.windSpeed);
        this.maxWind = "Max: " + conversion.maxWind(station.readings);;
        this.minWind = "Min: " + conversion.minWind(station.readings);;
        this.pressure = latestReading.pressure + " hpa";
        this.maxPressure = "Max: " + conversion.maxPressure(station.readings);
        this.minPressure = "Min: " + conversion.minPressure(station.readings);
        this.tempF = conversion.tempF(latestReading.temperature) + " F";
        this.weather = conversion.currentWeather(this.code);
    }
};

module.exports = weatherReport;