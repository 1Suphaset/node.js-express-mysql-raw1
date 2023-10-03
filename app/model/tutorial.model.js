const sql = require("./db.js");

const student = function(student){  //table in database/ตัวสำหรับรับค่า
    this.no = student.no;
    this.name = student.name;
    this.lastname = student.lastname;
    this.university = student.university;
    this.graduated = student.graduated;
    this.date = student.date;
}


student.create = (newstudent, result) => {
    sql.query("INSERT INTO students SET ?", newstudent, (err, res) => {
        if(err){
            result(err, null)
            return
        }
        result(null, {id: res.insertId, ...newstudent}) // ...คือการรับค่าได้มากกว่า1ค่า/กระจายค่า
    })
}

student.getAll = (name, result) => {
    let sqltext = "SELECT * FROM students"; //ตัวแปรlet คือตัวแปรที่สามารถทำงานได้เพียงภายในสโคปหรือปีกกาเท่านั้น //var สามารถเรียกใช้นอกฟังก์ชั่นได้

    sql.query(sqltext, (err,res)=>{  //ฟังก์ชั่นของsql เพื่อประมวลผล
        if(err){
            console.log("err: ",err) //error 
            result(null, err);
            return;
        }

        console.log("students; ",res); //result
        result(null, res);
    });
};

student.findByName = (name, result) => {  //หาโดยใช้ id 
    sql.query("SELECT * FROM students WHERE name = "+ name, (err,res) => { //ฟังก์ชั่นที่มีฟังก์ชั่นที่เป็นcallbackซ้อนอีกทีเพื่อแยกระหว่างerr ,result
        if(err){
            result(err, null) //พารามิเตอร์ตัวที่สองที่จะส่งไปยังfindById
            return
        }

        if(res.length){
            result(null,res[0]) //array0 มาจาก
            return
        }

        result({kind: "not found"},null);
    });
}

student.getAllgraduated = result => {
    sql.query("SELECT * FROM students WHERE graduated = true", (err,res) => {
        if(err){
            result(err, null)
            return
        }
        result(null, res)
    })
}


student.remove = (no, result) => {
    sql.query("DELETE FROM students WHERE no = ?", no, (err, res) => {
        if(err){
            result(err,null)
            return;
        }
        
        if(res.affectedRows === 0){//affectedRow ถามว่ามีผลกระทบกับrecordมั้ย ท้าไม่ให้ทำต่อไป
            result({kind: "not found"}, null)
            return
        }
        result(null, res)
    });
}

student.removeAll = (result) => { //anonymous function
    sql.query("DELETE FROM students",(err, res ) => {
        if(err){
            result(null,err)
            return
        }
        result(null,res)
    })
}

module.exports = student;