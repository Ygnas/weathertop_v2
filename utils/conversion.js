"use strict";

const weatherCodes = {
    100: "Clear",
    200: "Partial Clouds",
    300: "Cloudy",
    400: "Light Showers",
    500: "Heavy Showers",
    600: "Rain",
    700: "Snow",
    800: "Thunder"
};

const conversion = {
    tempF(tempC) {
        return (tempC * 1.8) + 32;
    },
    currentWeather(code) {
        return weatherCodes[code];
    }
};

module.exports = conversion;