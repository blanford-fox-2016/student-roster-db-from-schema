"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let file = 'students.db';
let db = new sqlite.Database(file);


// SQL Statement
let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE);";

let SEED_DATA = "INSERT INTO students (firstname, lastname, birthdate) VALUES ('Rubi', 'Henjaya', '1986-11-20'), ('Riza', 'Fahmi', '1983-12-31');";
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
