//write your code here
"use strict"

const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();

// write your code here
var file = 'student.db';
var db = new sqlite.Database(file);
//SQL statements
var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE);";
var SEED_DATA = "INSERT INTO student (firstname,lastname,birthdate) VALUES ('aji', 'lantang', '1992-12-02');";

let createTable = () => {
  db.serialize(function(){

    db.run(CREATE_TABLE, function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Succes! create table");
      }
    });

  });
}


let seedData = () => {
  db.serialize(function(){

    db.run(SEED_DATA, function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Succes! insert 1 row");
      }
    });

  });
}

//
createTable()
seedData()
