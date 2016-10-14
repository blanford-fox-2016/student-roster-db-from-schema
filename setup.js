"use strict"

const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();

// write your code here
var file = "student.db";
var db = new sqlite.Database(file);

let createTable = () =>{
  db.serialize(() =>{
    db.run("CREATE TABLE student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, gender TEXT, birthday DATE, email TEXT, phone TEXT);", (err) =>{
        if(err){
            console.log(err);
        }else{
          console.log("Table Created");
          seedData()
        }
    })

  })

}

let seedData = ()=>{
  db.run("INSERT INTO student (firstname, lastname, gender, birthday, email, phone)VALUES('andi','pratama','laki-laki','1990-05-05','andi@gmail.com','085808580858');", (err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("Insert Success");
    }
  })
}

createTable();
