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
    let BROWSE_NAME = db.prepare(`SELECT * FROM student WHERE firstname LIKE ? or lastname LIKE ?;`);
    BROWSE_NAME.run(name, name, (err, row) => {
      if (err){
        console.log(err);
      } else {
        console.log(`Data ${name} found!`);
        console.log(`${row.id} | ${row.firstname} ${row.lastname} | ${row.birthdate}`);
      }
    });
  }
  browse_atr(){

  }
  browse_birthmonth(){

  }
  browse_birthday_sort(){

  }
}
var stud = new Student();

// stud.read()
stud.browse_name("budi")
// stud.delete(6)
// stud.add("budi", "utomo", "1908-05-20")
