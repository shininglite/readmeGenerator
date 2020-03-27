
require("dotenv").config();
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const inquirer = require("inquirer");

const appendFileAsync = util.promisify(fs.appendFile);
const readFileAsync = util.promisify(fs.readFile);

console.log('KEYS: ', process.env)
const api = {
  getUser(username) {
    return axios
      .get(
        `https://api.github.com/users/${username}
        ?client_id=${process.env.CLIENT_ID}
        &client_secret=${process.env.CLIENT_SECRET}`
      )
      .catch(err => {
        console.log(`User not found`);
        process.exit(1);
      });
  }
};

module.exports = api;
