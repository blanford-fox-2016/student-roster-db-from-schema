"use strict"

const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();
const net = require("net")
// write your code here
var file = 'student.db'
var db = new sqlite.Database(file)


class Student {
  constructor(property){

  }

  addStudent(firstname, lastname, birthdate){
    db.run(`INSERT INTO student (firstname, lastname, birthdate) VALUES ('${firstname}','${lastname}','${birthdate}');`, function(err){
      if(err){
        console.log(err);
      }else{
        console.log(`NEW STUDENT ADDED : '${firstname}','${lastname}','${birthdate}'`);
      }
    })
  }

  deleteStudent(id){
    db.run(`DELETE FROM student where id = ${id};`, function(err){
      if(err){
        console.log(err);
      }else{
        console.log(`STUDENT DATA ID ${id} DELETED`);
      }
    })
  }

  viewAll(){
    db.each(`SELECT * FROM student;`, function(err, callback){
      if(err){
        console.log(err);
      }else{
        console.log(`ID : ${callback.id} | ${callback.firstname} | ${callback.lastname} | ${callback.birthdate}`);
      }
    })
  }

  searchFirstname(firstname){
    db.each(`SELECT * FROM student WHERE firstname LIKE '%${firstname}%';`, function(err, callback){
      if(err){
        console.log(err);
      }else{
        console.log(`ID : ${callback.id} | ${callback.firstname} | ${callback.lastname} | ${callback.birthdate}`);
      }
    })
  }

  searchLastname(lastname){
    db.each(`SELECT * FROM student WHERE lastname LIKE '%${lastname}%';`, function(err, callback){
      if(err){
        console.log(err);
      }else{
        console.log(`ID : ${callback.id} | ${callback.firstname} | ${callback.lastname} | ${callback.birthdate}`);
      }
    })
  }

  searchByMonth(month){
    db.each(`SELECT * FROM student WHERE birthdate LIKE '%-${month}-%';`, function(err, callback){
      if(err){
        console.log(err);
      }else{
          console.log(`ID : ${callback.id} | ${callback.firstname} | ${callback.lastname} | ${callback.birthdate}`);
      }
    })
  }

  orderAge(){
    db.each(`SELECT * FROM student ORDER BY birthdate`, function(err, callback){
      if(err){
        console.log(err);
      }else{
        console.log(`ID : ${callback.id} | ${callback.firstname} | ${callback.lastname} | ${callback.birthdate}`);
      }
    })
  }
}

var see = function(){
  var ariz = new Student()
  ariz.viewAll()
}
var add = function(param1,param2,param3){
  var ariz = new Student()
  ariz.addStudent(param1,param2,param3)
}
var search_fn = function(param){
  var ariz = new Student()
  ariz.searchFirstname(param)
}
var search_ln = function(param){
  var ariz = new Student()
  ariz.searchLastname(param)
}
var month = function(param){
  var ariz = new Student()
  ariz.searchByMonth(param)
}
var order = function(){
  var ariz = new Student()
  ariz.orderAge()
}


net.createServer(function (socket) {
  var remote = repl.start("node::remote> ", socket);
  remote.context.view = see
  remote.context.add = add
  remote.context.search_fn = search_fn
  remote.context.search_ln = search_ln
  remote.context.month = month
  remote.context.order = order

}).listen(5001);

console.log("Remote REPL started on port 5001.");
console.log(`Type 'view()' to look at database`);
console.log(`Type 'add('firstname','lastname','YYYY-MM-DD')' to add database. YYYY-MM-DD = birthdate`);
console.log(`Type 'search_fn('firstname')' to search database by firstname`);
console.log(`Type 'search_ln('lastname')' to search database by lastname`);
console.log(`Type 'month('MM') to search by month. format: MM'`);
console.log(`Type 'order()' to order student by age`);



var local = repl.start("node::local> ");

local.context.view = see
local.context.add = add
local.context.search_fn = search_fn
local.context.search_fn = search_ln
local.context.month = month
local.context.order = order
