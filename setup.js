"use strict"

//write your code here
const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let file = 'student.db';
let db = new sqlite.Database(file); // SQL Statement

let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE )";
let SEED_DATA = "INSERT INTO student (firstname, lastname, birthdate) VALUES ('Rubi', 'Henjaya', '1986-11-20'), ('Riza', 'Fahmi', '1983-12-31');";

// CREATE_TABLE
let createTable = () => {
  // Run SQL one at a time
  db.serialize(function() {
    // Create table
    db.run(CREATE_TABLE, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('TABLE CREATED');
        seedData();
      }
    });
  });
}
// SEED_DATA
let seedData = () => {
  // Your code here
  db.run(SEED_DATA, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('DATA INSERTED');
    }
  })

}

createTable();
