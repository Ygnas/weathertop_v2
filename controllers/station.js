"use strict";

const logger = require("../utils/logger");
const uuid = require("uuid");
const axios = require("axios");
const stationStore = require("../models/station-store.js");
const { WeatherReport } = require("../models/weatherReport");
const conversion = require("../utils/conversion");

const station = {
  index(request, response) {
    logger.info("station rendering");
    const stationId = request.params.id;
    const viewData = {
      title: "Station Dashboard",
      station: stationStore.getStation(stationId),
      weatherReport: new WeatherReport(stationId),
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
      windDirection: request.body.windDirection,
      date: new Date().toISOString(),
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

  async autoGenerateReading(request, response) {
    //https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    let reading = {};
    const lat = station.latitude;
    const lng = station.longitude;
    const api = "0ab783420cda8773a310c625532baf43";
    const requestUrl = `https://pro.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&exclude=minutely,hourly&appid=${api}`;
    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      const currentReading = result.data.current;
      reading.id = uuid.v1();
      reading.code = conversion.openWeatherConditionCodes(currentReading.weather[0].id);
      reading.temperature = currentReading.temp;
      reading.windSpeed = currentReading.wind_speed;
      reading.pressure = currentReading.pressure;
      reading.windDirection = currentReading.wind_deg;
      reading.date = new Date().toISOString();

      station.trends = {};
      station.trends.tempTrend = [];
      station.trends.pressureTrend = [];
      station.trends.windTrend = [];
      station.trendLabels = [];
      const trends = result.data.daily;
      for (let i = 0; i < trends.length; i++) {
        station.trends.tempTrend.push(trends[i].temp.day);
        station.trends.pressureTrend.push(trends[i].pressure);
        station.trends.windTrend.push(trends[i].wind_speed);
        const date = new Date(trends[i].dt * 1000);
        station.trendLabels.push(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
      }
    }
    stationStore.addReading(stationId, reading);
    response.redirect("/station/" + stationId);
  },
};

module.exports = station;
