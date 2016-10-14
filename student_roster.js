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

  viewByBirthMonth() {
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

  viewByBirthday() {
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

// student.searchByFirstName("m")
// student.searchByLastName("w")
// student.searchByBirthdate("1945")
// student.viewByBirthMonth()
// student.viewByBirthday()

// student.addStudent("Mangku", "Widodo","1945-08-17")
// student.addStudent("Dharmadi", "Tanamas","1993-10-01")
// student.addStudent("Orang", "Satu","1993-10-10")
// student.addStudent("Orang", "Dua","1993-10-03")


var replServer = repl.start({prompt: '> '});
replServer.defineCommand('address', {
  help: 'address view\n        '+
  'address add <firstname> <lastname> <birthdate>\n        '+
  'address delete <id>\n        '+
  'address searchByFirstName <firstname>\n        '+
  'address searchByLastName <lastname>\n        '+
  'address searchByBirthdate <birthdate>\n        '+
  'address viewByBirthMonth\n        '+
  'address viewByBirthday\n        ',
  action: function(option) {
    this.lineParser.reset();
    this.bufferedCommand = '';
    var temp = option.split(" ")
    switch (temp[0]) {

      case 'add':
        student.addStudent(temp[1], temp[2],temp[3])
        break;

      case 'view':
        student.viewStudent()
        break;

      case 'delete':
        student.deleteStudent(temp[1])
        break;

      case 'searchByFirstName':
        student.searchByFirstName(temp[1])
        break;

      case 'searchByLastName':
        student.searchByLastName(temp[1])
        break;

      case 'searchByBirthdate':
        student.searchByBirthdate(temp[1])
        break;

      case 'viewByBirthMonth':
        student.viewByBirthMonth()
        break;

      case 'viewByBirthday':
        student.viewByBirthday()
        break;


      default:
        console.log("tidak ada");
        break
    }

    this.displayPrompt();
  }
}

);
replServer.defineCommand('saybye', function() {
  console.log('Goodbye!');
  this.close();
});
