"use strict"

//write your code here
const repl = require('repl')
const sqlite = require('sqlite3').verbose()

var file = 'student.db'
var db = new sqlite.Database(file)

var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE);"
var SEED_DATA = "INSERT INTO student (firstname, lastname, birthdate) VALUES ('Ahyana', 'Rizky', '1992-01-18'), ('Toni', 'Chen', '1991-02-13');"

let createTable =()=> {
  db.serialize(function(){
    db.run(CREATE_TABLE, function(err){
      if(err){
        console.log(err);
      }else{
        console.log('TABLE CREATED');
        seedData()
      }
    })
  })
}

let seedData =()=> {
  db.run(SEED_DATA, function(err){
    if(err){
      console.log(err);
    }else{
      console.log('DATA ADDED');
    }
  })
}

createTable()
