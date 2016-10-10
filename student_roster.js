"use strict"

const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();
var file = 'student.db'
var db = new sqlite.Database(file)
// write your code here
var VIEW_STUDENT = "SELECT * FROM student;"
class Student {
  constructor() {
    // this.firstname = firstname
    // this.lastname = lastname
    // this.birthdate = birthdate
  }

  viewStudent() {
    db.each("SELECT * FROM student", function(err, row) {
      if (err) {
        console.log(err);
      } else {
        console.log(`${row.id} ${row.firstname} ${row.lastname} ${row.birthdate}`);
      }
    });
  }

  addStudent(firstname, lastname, birthdate) {
    var SEED_DATE = `INSERT INTO student VALUES(${null},'${firstname}','${lastname}','${birthdate}');`
    db.run(SEED_DATE, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log(`INSERT DATA ${firstname}`);
      }
    })
  }

  deleteStudent(id) {
    var DELETE_DATA = `DELETE FROM student WHERE id=${id};`
    db.run(DELETE_DATA,function(err){
      if(err){
        console.log(err);
      }else{
        console.log("telah dihapus");
      }
    })
  }

  searchByFirstName(firstname) {
    var SEARCH_DATA = `SELECT * FROM student WHERE firstname LIKE '%${firstname}%'`;
    db.each(SEARCH_DATA,function(err, row){
      if(err){
        console.log(err);
      }else {
        console.log(`${row.firstname}`);
      }
    })
  }

  searchByLastName(lastname){
    var SEARCH_DATA = `SELECT * FROM student WHERE lastname LIKE '%${lastname}%'`;
    db.each(SEARCH_DATA,function(err,row){
      if(err){
        console.log(err);
      }else{
        console.log(`${row.lastname}`);
      }
    })
  }

  searchByBirthdate(birthdate){
    var SEARCH_DATA = `SELECT * FROM student WHERE birthdate LIKE '%${birthdate}%'`;
    db.each(SEARCH_DATA,function(err,row){
      if(err){
        console.log(err);
      }else{
        console.log(`${row.birthdate}`);
      }
    })
  }

  searchByBirthMonth() {
    var SEARCH_DATA = `SELECT * FROM student
    WHERE strftime('%m', birthdate) = strftime('%m', 'now')`;
    db.each(SEARCH_DATA,function(err,row){
      if(err){
        console.log(err);
      }else{
        console.log(`${row.id} ${row.firstname} ${row.birthdate}`);
      }
    })
  }

  searchByBirthday() {
    var SEARCH_DATA = `SELECT *, strftime('%w', birthdate) as hari FROM student ORDER BY hari;`
    db.each(SEARCH_DATA,function(err,row){
      if(err){
        console.log(err);
      }else{
        console.log(`${row.id} ${row.firstname} ${row.birthdate}`);
      }
    })
  }

}

var student = new Student()
// student.deleteStudent(5)
// student.viewStudent()
// student.searchByFirstName("m")
// student.searchByLastName("w")
// student.searchByBirthdate("1945")
// student.searchByBirthMonth()
student.searchByBirthday()

// student.addStudent("Mangku", "Widodo","1945-08-17")
// student.addStudent("Dharmadi", "Tanamas","1993-10-01")
// student.addStudent("Orang", "Satu","1993-10-10")
// student.addStudent("Orang", "Dua","1993-10-03")
