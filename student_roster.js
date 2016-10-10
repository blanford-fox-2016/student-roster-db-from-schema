"use strict"

const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();
var file = 'student.db';
var db = new sqlite.Database(file);

class Student{

  add(firstname, lastname, birthdate){
    var first = firstname.split('')[0]
    firstname = firstname.replace(first,first.toUpperCase())
    var last = lastname.split('')[0]
    lastname = lastname.replace(last,last.toUpperCase())
    var ADD_DATA = `INSERT INTO student (firstname, lastname, birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}');`
    db.serialize (function(){
      db.run(ADD_DATA, function(err){
        if(err){
          console.log(err);
        } else{
          console.log('ADD_DATA');
       }
     });
   });
  }
  del(id){
    var DELETE_DATA = `DELETE FROM student WHERE id = ${id};`
    db.serialize (function(){
      db.run(DELETE_DATA, function(err){
        if(err){
          console.log(err);
        } else{
          console.log('DELETE_DATA');
        }
      })
    })
  }
  list(){
    var SELECT_DATA = `SELECT * FROM student;`
    db.serialize(function(){
      db.all(SELECT_DATA, function(err, data){
        if(err){
          console.log(err);
        }else{
          console.log(data);
          console.log(this._month);
        }
      })
    })
  }
  search(column, value){
    var SEARCH = `SELECT * FROM student WHERE ${column} LIKE '${value}';`
    db.serialize(function(){
      db.all(SEARCH, function(err, data){
        if(err){
          console.log(err);
        }else{
          for(var i = 0; i < data.length; i++){
            console.log("id: "+data[i].id);
            console.log("First name: "+data[i].firstname);
            console.log("Last name: " +data[i].lastname);
            console.log("Birthday: " +data[i].birthdate);
          }
        }
      })
    })
  }
  listThisMonth(){
    var date = new Date()
    var month = (date.getMonth() + 1)
    var BIRTHDAY = `SELECT * FROM student WHERE birthdate LIKE '%-0${month}-%' OR '%-${month}-%';`
    db.serialize(function(){
      db.all(BIRTHDAY, function(err, data){
        if(err){
          console.log(err);
        }
        else if(data.length < 1){
          console.log("No one is having a birthday this month.")
        }else{
          for(var i = 0; i < data.length; i++){
            console.log("------\nid: "+data[i].id);
            console.log("First name: "+data[i].firstname);
            console.log("Last name: " +data[i].lastname);
            console.log("Birthday: " +data[i].birthdate + "\n");
          }
        }
      })
    })
  }
  listBirthday(order){
    if(order == undefined){
      order = "ASC"
    }
    order.toUpperCase()
    var SORT = `SELECT * FROM student ORDER BY birthdate ${order}`
    db.serialize(function(){
      db.all(SORT, function(err,data){
        if(err)
        console.log(err);
        else{
          for(var i = 0; i < data.length; i++){
            console.log("------\nid: "+data[i].id);
            console.log("First name: "+data[i].firstname);
            console.log("Last name: " +data[i].lastname);
            console.log("Birthday: " +data[i].birthdate + "\n");
          }
        }
      })
    })

  }
}
let student = new Student
// student.add('hellow', 'world', '1998-09-27')
// student.del(3)
// student.listBirthday()
// student.list()
// student.listThisMonth()
// student.search(firstname, "alessandro")
