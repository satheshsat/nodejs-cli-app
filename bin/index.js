#!/usr/bin/env node

import inquirer from "inquirer";
import { runBasicExample } from "../src/commands/basic-example.js";
import { runChalkExample } from "../src/commands/chalk-example.js";
import { runFigletExample } from "../src/commands/figlet-example.js";
import { runInquirerExample } from "../src/commands/inquirer-example.js";
import { runInquirerConfirmExample } from "../src/commands/inquirer-confirm-example.js";
import { runInquirerListExample } from "../src/commands/inquirer-list-example.js";
import { runOraExample } from "../src/commands/ora-example.js";
import { ageCalc } from "../src/commands/age-calculation.js";
import open, { openApp, apps } from "open";
import sqlite3 from 'sqlite3'
// let db = new sqlite3.Database(':memory:'); // Or provide a file path for persistent storage
let db = new sqlite3.Database('test.sqlite'); // Or provide a file path for persistent storage

const examples = {
  "sqlite": () => {
    db.serialize(function() {
      db.run("CREATE TABLE user (name TEXT)");
    
      const stmt = db.prepare("INSERT INTO user VALUES (?)");
      stmt.run("ChatGPT");
      stmt.finalize();
    
      db.each("SELECT rowid AS id, name FROM user", function(err, row) {
        console.log(row.id + ": " + row.name);
      });
    });
    
    db.close();
  },
  "Open Google": () => {
    open("https://www.google.com");
  },
  'open chrome incognito': async () => {
    await openApp(apps.chrome, {arguments: ['--incognito']});
  },
  "Time Now": () => {
    const date = new Date();
    console.log(`Current time: ${date.toISOString()}`);
  },
  "Age Calculation": ageCalc,
  "Basic Example": runBasicExample,
  "Chalk Example": runChalkExample,
  "Figlet Example": runFigletExample,
  "Inquirer Example": runInquirerExample,
  "Inquirer Confirm Example": runInquirerConfirmExample,
  "Inquirer List Example": runInquirerListExample,
  "Ora Example": runOraExample,
};

inquirer
  .prompt([
    {
      type: "list",
      name: "selectedExample",
      message: "Choose an example to run:",
      choices: Object.keys(examples),
    },
  ])
  .then((answers) => {
    const exampleFunction = examples[answers.selectedExample];
    if (exampleFunction) {
      exampleFunction();
    } else {
      console.error("Invalid selection");
    }
  });
