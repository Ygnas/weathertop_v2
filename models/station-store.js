"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const stationStore = {
    store: new JsonStore("./models/station-store.json", {
        stationCollection: [],
    }),
    collection: "stationCollection",

    getAllStation() {
        return this.store.findAll(this.collection);
    },
    getStation(id) {
        return this.store.findOneBy(this.collection, { id: id });
    },
    addStation(station) {
        this.store.add(this.collection, station);
        this.store.save();
    },
    addReading(id, reading) {
        const station = this.getStation(id);
        station.readings.push(reading);
        this.store.save();
    }
}

module.exports = stationStore;