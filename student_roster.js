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
//adding new student
let addnew = (namadepan,namabelakang,jumlah) => {
    lol.addNewStudent(namadepan,namabelakang,jumlah)
}
//view all student
let seeStudent = () => {
  lol.seeAllStudent()
}
//biarthday student by month
let birthdayMo = (month) => {
  let input = month.toString()
  lol.bdayStudentThisMonth(input)
}
//sortingby birthdate
let sortBirth = () => {
  lol.sortingBybirthdate()
}
//delete student by id
let deleteStudent = (id) => {
  lol.deleteStudentByid(id)
}
console.log('*input selalu menggunakan string\nberikut merupakan perintah yang bisa dijalankan:');
console.log('1. addnew("namadepan","namabelakang","birthdate")->untuk memasukkan data student');
console.log('2. seeStudent()->untuk melihat semua data murid');
console.log('3. birthdayMo("inputangkabulan")->melihat yang lahir pada bulan yang dimasukkan berupa angka misal "06" ');
console.log('4.sortBirth()->sorting berdasarkan tanggal lahir');
console.log('5.deleteStudent("id")-->delete berdasarkan id');
console.log("ingat untuk selalu menggunakan petik ('') untuk setiap data yang dimasukkan ");
var r = repl.start({prompt: 'isi perintah >\n'});
r.context.addnew = addnew
r.context.seeStudent = seeStudent
r.context.birthdayMo = birthdayMo
r.context.deleteStudent = deleteStudent
r.context.sortBirth = sortBirth

// // lol.seeAllStudent()
// //
// //
// //
// // lol.seeAllStudent()
//
