"use strict"

const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();
let file = 'student.db';
let db = new sqlite.Database(file);

// write your code here
class Student{
  constructor(){

  }
  read(){
    let READ_ALL = `SELECT * FROM student`;
    db.each(READ_ALL, (err, row) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${row.id} | ${row.firstname} ${row.lastname} | ${row.birthdate}`);
      }
    });
  }
  edit(){

  }
  add(firstname, lastname, birthdate){
    let INSERT_DATA = db.prepare(`INSERT INTO student VALUES (null, ?, ?, ?)`);
    INSERT_DATA.run(firstname, lastname, birthdate, (err) => {
      if (err){
        console.log(err);
      } else {
        console.log(`Data inserted`);
      }
    });
    INSERT_DATA.finalize();

  }
  delete(id){
    let DELETE = `DELETE FROM student WHERE id = ${id};`
    db.run(DELETE, (err) => {
      if (err){
        console.log(err);
      } else {
        console.log(`Data ${id} Deleted`);
      }
    })
  }

  browse_name(name){
    let BROWSE_NAME = `SELECT * FROM student WHERE firstname like '%${name}%' or lastname like '%${name}%'`;
    db.each(BROWSE_NAME, (err, row) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${row.id} | ${row.firstname} ${row.lastname} | ${row.birthdate}`);
      }
    });
  }
  browse_atr(atr, val){
    let BROWSE_ANYTHING = `SELECT * FROM student WHERE ${atr} = '${val}'`
    db.each(BROWSE_ANYTHING, (err, row) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${row.id} | ${row.firstname} ${row.lastname} | ${row.birthdate}`);
      }
    });
  }

  browse_birthmonth(){
    let BROWSE_BIRTHMONTH = `SELECT * FROM student WHERE strftime('%m', birthdate) = strftime('%m', 'now')`;
    db.each(BROWSE_BIRTHMONTH, (err, row) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${row.id} | ${row.firstname} ${row.lastname} | ${row.birthdate}`);
      }
    });
  }
  browse_birthday_sort(){
    let BIRTHDATE_SORT = `SELECT * FROM student ORDER BY strftime('%Y, %m, %d', birthdate);`;
    db.each(BIRTHDATE_SORT, (err, row) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${row.id} | ${row.firstname} ${row.lastname} | ${row.birthdate}`);
      }
    });
  }
}
var stud = new Student();


var r = repl.start({prompt: '>'});
r.context.viewAllStudents = stud.read
r.context.searchByName = stud.browse_name
r.context.sortFromOldest = stud.browse_birthday_sort
r.context.whosBornThisMonth = stud.browse_birthmonth
r.context.addNewStudent = stud.add
r.context.deleteStudent = stud.delete
