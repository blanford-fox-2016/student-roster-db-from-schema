"use strict"

const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();

var file = 'student.db';
var db = new sqlite.Database(file);
// write your code here

class Student{
  constructor(firstname, lastname, birthdate){
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthdate = birthdate;
  }
  viewData(){
    db.each("SELECT * FROM Student", function(err, row){
      console.log(row.id + " "+row.firstname+" "+row.lastname+" "+row.birthdate);
    })
  }

  addData(firstname, lastname, birthdate){
    db.serialize(function(){
      db.run(`INSERT INTO student (firstname, lastname, birthdate) VALUES('${firstname}', '${lastname}','${birthdate}');`, function(err){
        if(err){
          console.log(err);
        }else{
          console.log("Succes! insert 1 row");
        }
      })
    })
  }


findData(month){
    db.each(`SELECT strftime('%m', birthdate) as month, * FROM student where month = '${month}';`, function(err, row) {
    console.log(row.id + ": " + row.firstname + " "+ row.lastname + " " + row.birthdate);
      });
    };

    deleteStudent(id){
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

    sortData(){
      db.each(`SELECT * FROM student  order by birthdate;`, function(err, row) {
      console.log(row.id + ": " + row.firstname + " "+ row.lastname + " " + row.birthdate);
        });
    }

  } // end class

var man = new Student();
// man.addData('Mangku', 'Widodo', '1963-10-31');
// man.deleteStudent(4)
// man.viewData();
// man.sortData();
// man.findData(12)
man.sortData();
