"use strict"

//write your code here
const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();
var file = 'student.db'
var db = new sqlite.Database(file)

var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student(id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE );";
var SEED_DATE = "INSERT INTO student (firstname, lastname, birthdate) VALUES('Rubi','Henjaya','1986-11-20'),('Riza','Fahmi','1983-12-31');";

let createTable = () => {
  db.serialize(function(){
    db.run(CREATE_TABLE,function(err){
        if(err){
          console.log(err);
        }else{
          console.log('CREATE TABLE');
          seedData()
        }
      });
    });
  }
  let seedData = () =>{
    db.run(SEED_DATE, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('INSERT DATA');
      }
    })
  }

  createTable()
