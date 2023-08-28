const sql = require("./db.js");

const Tutorial = function(tutorial){  //table in database
    this.title = tutorial.title;
    this.description = tutorial.description;
    this.published = tutorial.published;
}


Tutorial.create = (newTutorial, result) => {
    sql.query("INSERT INTO tutorials SET ?", newTutorial, (err, res) => {
        if(err){
            result(err, null)
            return
        }
        result(null, {id: res.insertId, ...newTutorial}) // ...คือการรับค่าได้มากกว่า1ค่า/กระจายค่า
    })
}

Tutorial.getAll = (title, result) => {
    let sqltext = "SELECT * FROM tutorials"; //ตัวแปรlet คือตัวแปรที่สามารถทำงานได้เพียงภายในสโคปหรือปีกกาเท่านั้น //var สามารถเรียกใช้นอกฟังก์ชั่นได้

    sql.query(sqltext, (err,res)=>{  //ฟังก์ชั่นของsql เพื่อประมวลผล
        if(err){
            console.log("err: ",err) //error 
            result(nul, err);
            return;
        }

        console.log("tutorials; ",res); //result
        result(null, res);
    });
};

Tutorial.findById = (id, result) => {  //หาโดยใช้ id 
    sql.query("SELECT * FROM tutorials WHERE id = "+ id, (err,res) => { //ฟังก์ชั่นที่มีฟังก์ชั่นที่เป็นcallbackซ้อนอีกทีเพื่อแยกระหว่างerr ,result
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

Tutorial.getAllPublished = result => {
    sql.query("SELECT * FROM tutorials WHERE published = true", (err,res) => {
        if(err){
            result(err, null)
            return
        }
        result(null, res)
    })
}

Tutorial.remove = (id, result) => {
    sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
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

module.exports = Tutorial;