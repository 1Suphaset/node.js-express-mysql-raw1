module.exports = (app) => {
    const tutorials = require("../controllers/tutorial.controller.js");
    var router = require("express").Router();    
//เส้นทาง -v  v-potocall
    router.post("/",tutorials.Create);
    router.get("/", tutorials.FindAll);
    router.get("/published", tutorials.FindAllpublished);
    router.get("/:id", tutorials.FindOne);
    router.put("/:id", tutorials.update);
    router.delete("/:id", tutorials.delete);
    router.delete("/", tutorials.deleteAll);
    
    
    app.use('/api/tutorials',router);  //root tutorial คำสั่งสำหรับการค้นหา
};