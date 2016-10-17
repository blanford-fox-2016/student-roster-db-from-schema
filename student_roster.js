"use strict"

const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();

var file = 'student.db';
var db = new sqlite.Database(file);


class Student{
  constructor(name, lastname, birthdate){
    this.name = name;
    this.lastname = lastname;
    this.birthdate = birthdate;
  }
//view all student
  seeAllStudent(){
    db.each("SELECT * FROM Student", function(err, row) {
    console.log(row.id + ": " + row.firstname + " "+ row.lastname + " " + row.birthdate);
      });
    };
//add new student
  addNewStudent (nama, lastname, birthdate) {
    db.serialize(function(){
      db.run(`INSERT INTO student (firstname, lastname, birthdate) VALUES('${nama}', '${lastname}', '${birthdate}');`, function(err){
        if(err){
          console.log(err);
        }else{
          console.log("Succes! insert 1 row");
        }
      });

    });
  }
//search by month
  bdayStudentThisMonth(month){
    db.each(`SELECT strftime('%m', birthdate) as month, * FROM student where month = '${month}';`, function(err, row) {
    console.log(row.id + ": " + row.firstname + " "+ row.lastname + " " + row.birthdate);
      });
    };
//delete by id
    deleteStudentByid(id){
      db.serialize(function(){
        db.run(`DELETE FROM student WHERE id = '${id}'`, function(err){
          if(err){
            console.log(err);
          }else{
            console.log(`success!  delete one ${id}`);
          }
        });

      });
    }
//sorting by birthdate
    sortingBybirthdate(){
      db.each(`SELECT * FROM student  order by birthdate;`, function(err, row) {
      console.log(row.id + ": " + row.firstname + " "+row.age+ " "+ row.lastname + " " + row.birthdate);
        });
    }

}


var lol = new Student()
// lol.addNewStudent('toni', 'stark', '1923-01-12')
// lol.addNewStudent('jojo', 'jije', '1970-10-12')
// lol.addNewStudent('lol', 'lala', '1960-09-12')
lol.addNewStudent('obladi','oblada','1905-06-06')
// lol.bdayStudentThisMonth(10)
// lol.seeAllStudent()
//
// lol.deleteStudentByid(1)
//
// lol.seeAllStudent()
lol.sortingBybirthdate()
