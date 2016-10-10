"use strict"

const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();

let file = 'student.db';
let db = new sqlite.Database(file);

// write your code here

class Student {
  constructor(component) {
    this.firstname = component["firstname"];
    this.lastname = component["lastname"];
    this.birthdate = component["birthdate"];
    this.sex = component["sex"];
  }


  addData(firstname, lastname, birthdate, sex) {
    db.run(`INSERT INTO student (firstname, lastname, birthdate, sex) VALUES ('${this.firstname}', '${this.lastname}', '${this.birthdate}', '${this.sex}');`, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Data Inserted");
      }
    });
  }

  deleteData(id) {
    db.run(`DELETE FROM student WHERE id = '${id}';`, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Data with ${id} is being deleted`);
      }
    });
  }

  showData() {
    db.each(`SELECT * FROM student;`, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${data.id}  ||  ${data.firstname}  ||  ${data.lastname}  ||  ${data.birthdate}  || ${data.sex}`);
      }
    });
  }

  showData_firstname(name) {
    db.each(`SELECT * FROM student WHERE firstname = '${name}';`, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${data.id}  ||  ${data.firstname}  ||  ${data.lastname}  ||  ${data.birthdate}  || ${data.sex}`);
      }
    });
  }

  showData_lastname(name) {
    db.each(`SELECT * FROM student WHERE lastname = '${name}';`, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${data.id}  ||  ${data.firstname}  ||  ${data.lastname}  ||  ${data.birthdate}  || ${data.sex}`);
      }
    });
  }

  showData_id(id) {
    db.each(`SELECT * FROM student WHERE id = '${id}';`, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${data.id}  ||  ${data.firstname}  ||  ${data.lastname}  ||  ${data.birthdate}  || ${data.sex}`);
      }
    });
  }

  birthThisMonth(month) {
    db.each(`SELECT * FROM student where birthdate LIKE '%${month}%';`, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${data.id}  ||  ${data.firstname}  ||  ${data.lastname}  ||  ${data.birthdate}  || ${data.sex}`);
      }
    });
  }

  shortbyBirth() {
    db.each(`SELECT * FROM student ORDER BY birthdate ASC;`, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${data.id}  ||  ${data.firstname}  ||  ${data.lastname}  ||  ${data.birthdate}  || ${data.sex}`);
      }
    })
  }

}




var example = [{
  firstname : "aji",
  lastname: "lantang",
  birthdate: "28-02-1990",
  sex: "Male"
},
{
  firstname : "juang",
  lastname: "wiantoro",
  birthdate: "03-02-1990",
  sex: "Male"
},
{
  firstname : "mangku",
  lastname: "widodo",
  birthdate: "01-01-1990",
  sex: "Male"
},
{
  firstname : "ken",
  lastname: "arok",
  birthdate: "04-04-1990",
  sex: "Male"
},
{
  firstname : "Dharmadi",
  lastname: "Yea",
  birthdate: "05-05-1990",
  sex: "Male"
}];



let hacktiv8 = new Student(example[1]);
hacktiv8.addData();
hacktiv8.showData();
hacktiv8.deleteData(1);
hacktiv8.addData(example[2]);
hacktiv8.showData();
hacktiv8.addData(example[3]);
hacktiv8.showData_firstname('Riza');
hacktiv8.shortbyBirth();
hacktiv8.showData(2);
hacktiv8.birthThisMonth("02");
hacktiv8.shortbyBirth();
