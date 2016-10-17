"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let file = 'student.db';
let db = new sqlite.Database(file);


// SQL Statement
let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE, sex TEXT);";

let SEED_DATA = "INSERT INTO student (firstname, lastname, birthdate, sex) VALUES ('Rubi', 'Henjaya', '20-11-1986', 'Male'), ('Riza', 'Fahmi', '31-12-1983', 'Male');";
//write your code here

let createTable = () => {
  db.serialize(() => {
    db.run(CREATE_TABLE, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Create Table");
      }
    });
  });
}

let seedData = () => {
  db.serialize(() => {
    db.run(SEED_DATA, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log("SEED THE DATA");
      }
    });
  });
}

createTable();
seedData();
