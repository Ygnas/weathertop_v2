"use strict";

const { min } = require("lodash");

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

const weatherCodeIcons = {
    100: "sun icon",
    200: "cloud sun",
    300: "cloud icon",
    400: "cloud sun rain icon",
    500: "cloud showers heavy icon",
    600: "cloud rain icon",
    700: "snowflake icon",
    800: "bolt icon"
}

const conversion = {
    tempF(tempC) {
        return (tempC * 1.8) + 32;
    },
    currentWeather(code) {
        return weatherCodes[code];
    },
    weatherIcon(code) {
        return weatherCodeIcons[code];
    },
    beafourt(windSpeed) {
        if (windSpeed < 1) {
            return 0;
        } else if (windSpeed <= 5) {
            return 1;
        } else if (windSpeed <= 11) {
            return 2;
        } else if (windSpeed <= 19) {
            return 3;
        } else if (windSpeed <= 28) {
            return 4;
        } else if (windSpeed <= 38) {
            return 5;
        } else if (windSpeed <= 49) {
            return 6;
        } else if (windSpeed <= 61) {
            return 7;
        } else if (windSpeed <= 74) {
            return 8;
        } else if (windSpeed <= 88) {
            return 9;
        } else if (windSpeed <= 102) {
            return 10;
        } else {
            return 11;
        }
    },
    degreesToCompass(degrees) {
        const directions = ["North", "North North East", "North East",
        "East North East", "East", "East South East", "South East",
        "South South East", "South", "South South West", "South West",
        "West South West", "West", "West North West", "North West", "North North West", "North"];
        return directions[Math.round((degrees % 360) / 22.5)];
    },
    windChill(temperature, windSpeed) {
        return (13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16)).toFixed(2);
    },
    minValue(values) {
        let min = values[0];
        values.forEach(value => {
            if (value < min) {
                min = value;
            }
        });
        return min;
    },
    maxValue(values) {
        let max = values[0];
        values.forEach(value => {
            if (value > max) {
                max = value;
            }
        });
        return max;
    },
    minTemp(readings) {
        const values = [];
        readings.forEach(reading => {
            values.push(reading.temperature);
        });
        return this.minValue(values);
    },
    maxTemp(readings) {
        const values = [];
        readings.forEach(reading => {
            values.push(reading.temperature);
        });
        return this.maxValue(values);
    },
    minWind(readings) {
        const values = [];
        readings.forEach(reading => {
            values.push(reading.windSpeed);
        });
        return this.minValue(values);
    },
    maxWind(readings) {
        const values = [];
        readings.forEach(reading => {
            values.push(reading.windSpeed);
        });
        return this.maxValue(values);
    },
    minPressure(readings) {
        const values = [];
        readings.forEach(reading => {
            values.push(reading.pressure);
        });
        return this.minValue(values);
    },
    maxPressure(readings) {
        const values = [];
        readings.forEach(reading => {
            values.push(reading.pressure);
        });
        return this.maxValue(values);
    }
};

module.exports = conversion;