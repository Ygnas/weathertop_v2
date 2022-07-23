"use strict";

const logger = require("../utils/logger");
const playlistCollection = require("../models/station-store.js").default;

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "WeatherTop Dashboard",
      playlists: playlistCollection
    };
    logger.info("about to render", playlistCollection);
    response.render("dashboard", viewData);
  }
};

module.exports = dashboard;
