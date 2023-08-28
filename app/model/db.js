const mysql = require("mysql2");  //เรียกใช้package 
const dbConfig = require("../config/db.config.js") // ../ถอยหลัง1ระดับ แล้วค่อยเข้าconfig
//เรียกใช้ db.config.jsจากอีกโฟลเดอร์

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password:dbConfig.PASSWORD, 
    database: dbConfig.DB
});

connection.connect(error => {
    if(error) throw error;
    console.log("Successfully connected to the database. ");
});

module.exports = connection;