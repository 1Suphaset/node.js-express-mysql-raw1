module.exports = (app) => {
    const students = require("../controllers/tutorial.controller.js");
    var router = require("express").Router();    
//เส้นทาง -v  v-potocall
    router.post("/",students.Create);//*
    router.get("/", students.FindAll);//*
    router.get("/graduated", students.FindAllgraduated);//*
    router.get("/:name", students.FindOne);
    router.delete("/:no", students.delete);
    router.delete("/", students.deleteAll);
    
    
    app.use('/api/students',router);  //root tutorial คำสั่งสำหรับการค้นหา
};