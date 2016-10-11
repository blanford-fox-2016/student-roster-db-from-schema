const repl = require('repl')//optional
const sqlite = require('sqlite3').verbose()

var file = 'student.db'
var db = new sqlite.Database(file)

var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS STUDENT (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE)";
var SEED_DATA = "INSERT INTO student (firstname,lastname,birthdate) VALUES ('Rubi','Henjaya','1998-11-20'),('Riza','Fahmi','1983-12-31');"
var DISPLAY_STUDENT = 'SELECT * FROM student;'
//create TABLE
var createTable = function()
{
  db.serialize(function(){
    db.run(CREATE_TABLE,function(err){
      if(err){
        console.log(err);
      }else {
        {
          console.log('CREATE TABLE');
        }
      }
    })
  })
}

var seedData = function()
{
  db.serialize(function(){
    db.run(SEED_DATA,function(err){
      if(err)console.log(err);
      else {console.log('seed data');}
    })
  })
}


var display_result = function()
{
  db.serialize(function(){
    db.all(DISPLAY_STUDENT,function(err,data){
      if(err)console.log(err);
      else console.log(data);
    })
  })
}

createTable()
seedData()
display_result()
