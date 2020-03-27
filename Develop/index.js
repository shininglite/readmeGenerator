const fs = require("fs");
const inquirer = require("inquirer");
const api = require("./utils/api.js");
const generateMarkdown = require("./utils/generateMarkdown.js");
const axios = require("axios");

const questions = [
    {
        message: "What is your github username?",
        name: "username"
    },
];
inquirer.prompt(questions, api)
    .then(function ({ username }) {
        const queryUrl = `https://api.github.com/users/${username}`;
        axios
            .get(queryUrl)
            .then(function (response) {
                const userAvatar = response.data.avatar_url;
                const userEmail = response.data.email;
                console.log(userAvatar, userEmail);
            })
            .then(function () {
                inquirer
                    .prompt([
                        {
                            type: "checkbox",
                            message: "Would you like to add a badge?",
                            name: "stack",
                            choices: [
                                "Yes",
                                "No"
                            ]
                        },
                        {
                            message: "What is your project title?",
                            name: "title"
                        },
                        {
                            message: "Add a description of your project.",
                            name: "description"
                        }
                    ])
                    .then(function writeToFile(fileName, data) {
                        fs.writeFile("README.md", generateMarkdown,function(err) {
                            if (err) {
                              throw err;
                            };
                        });
                        console.log("Im Working!");
                    });
            })
    })
function init() {
}
init();