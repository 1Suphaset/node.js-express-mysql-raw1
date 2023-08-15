const sql = require("./db.js");

const Tutorial = function(tutorial){
    this.title = tutorial.title;
    this.description = tutorial.description;
    this.published = tutorial.published;
}

Tutorial.getAll = (title, result) => {
    let sqltext = "selecet * from tutorials";

    sql.query(sqltext, (err,res)=>{
        if(err){
            console.log("err: ",err)
            return;
        }

        console.log("tutorials; ",res);
    });
};