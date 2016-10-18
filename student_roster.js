'use strict'
const repl = require('repl')
const sqlite = require('sqlite3').verbose();

var file = 'student.db'
var db = new sqlite.Database(file)

class Student {
static add_student(firstname,lastname,birthdate)
{
  var ADD_STUDENT = `insert into student(firstname,lastname,birthdate) values ('${firstname}','${lastname}','${birthdate}')`
  Student.execute_command(ADD_STUDENT)
}

static delete_student(id)
{
  var DELETE_STUDENT = `delete from student where id = ${id}`
  Student.execute_command(DELETE_STUDENT)
}

static display_student()
{
  var DISPLAY_STUDENT = `select * from student`
  Student.display_executed_command(DISPLAY_STUDENT)
}

static display_student_by_name(firstname,lastname)
{
  var DISPLAY_STUDENT_BY_NAME = `select * from student where firstname like '%${firstname}%' and lastname like '%${lastname}%' group by firstname`
  Student.display_executed_command(DISPLAY_STUDENT_BY_NAME)
}

static display_student_by_atribute(firstname){
  var DISPLAY_STUDENT_BY_ATRIBUTE = `select * from student where firstname = '${firstname}'`
  Student.display_executed_command(DISPLAY_STUDENT_BY_ATRIBUTE)
}

static display_student_current_birthdate()
{
  var DISPLAY_STUDENT_CURRENT_BIRTHDATE = `select * from student where birthdate = DATE()`
  Student.display_executed_command(DISPLAY_STUDENT_CURRENT_BIRTHDATE)
}
static display_student_by_birthdate()
{
  var DISPLAY_STUDENT_BY_BIRTHDATE = 'select * from student order by birthdate'
  Student.display_executed_command(DISPLAY_STUDENT_BY_BIRTHDATE)
}

  static execute_command(command)
  {
    db.serialize(function(){
      db.run(command,function(err){
        if(err){
          console.log(err);
        }else {
          {
            console.log('executed!');
          }
        }
      })
    })
  }

  static display_executed_command(result)
  {
    db.serialize(function(){
      db.all(result,function(err,data){
        if(err)console.log(err);
        else {
          for(var i=0;i<data.length;i++){
            console.log(data[i]);
          }
        }
      })
    })
  }
}

var replServer = repl.start({prompt: '> '});
replServer.defineCommand('command', {
  help: '\n\n============= Students ==============\n\naddStudent(firstname,lastname,birthdate)\nlistStudent\ndisplayStudentByName (firstname,lastname)\ndestroyStudent(studentID)\ndisplayStudentByAttribute (firstname)\ndisplayStudentCurrentBirthdate\ndisplayStudentByBirthdate\n\n',

  action: function(name) {
var splitName = name.split(' ')
    switch (splitName[0]) {
      case 'addStudent':
      Student.add_student(splitName[1],splitName[2],splitName[3])
      break;
      case 'listStudent':
      Student.display_student()
      break;
      case 'displayStudentByName':
      Student.display_student_by_name(splitName[1],splitName[2])
      break;
      case 'destroyStudent':
      Student.delete_student(splitName[1])
      break;
      case 'displayStudentByAttribute':
      Student.display_student_by_atribute(splitName[1])
      break;
      case 'displayStudentCurrentBirthdate':
      Student.display_student_current_birthdate()
      break;
      case 'displayStudentByBirthdate':
      Student.display_student_by_birthdate()
      break;

      default:
      console.log('error');
      break;
    }
    this.displayPrompt();
  }
});

replServer.defineCommand('Exit', function() {
  console.log('Goodbye!');
  this.close();
});
