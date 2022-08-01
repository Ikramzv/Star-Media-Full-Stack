// Babel register

require("@babel/register")({
  presets: ["@babel/preset-env"], // preset environement babel.
});

module.exports = require("./index.js");
