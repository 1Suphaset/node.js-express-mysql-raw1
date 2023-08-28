const Tutorial = require("../model/tutorial.model.js");

exports.Create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    const newTutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    })

    Tutorial.create(newTutorial, (err, data) => { //ถ้าerrorแก้ตรงชื่อเด้อ
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred!"
            })
        }else{
            res.send(data)
        }
    })
    //res.send("Create");
};

exports.FindAll = (req,res) => {
   const title = req.query.title;

   Tutorial.getAll(title, (err, data) => {  //paramiter จะส่งค่าtitle และcallback function
        if(err){
             res.status(500).send({
                message: err.message || "Some error occurred!"
             });
         }else {
            res.send(data);
         }
   });
};

exports.FindOne = (req,res) => {
    const id = req.params.id;

    
    Tutorial.findById(id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
             res.status(404).send({
                message: "Not found tutorial with id " + id
             });
            }else{
                res.status(500).send({
                    message: "Error Tutorial with id " + id
                });
            }
        }else{
            res.send(data);
        }
    });
    //res.send({message: "FindOne"})
};

exports.FindAllpublished = (req,res) => {
    Tutorial.getAllPublished((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred!"
            });
        }else{
            res.send(data);
        }
    });
    //res.send({message: "FindAllpublished"})
};

exports.update = (req,res) => {
    res.send({message: "update"})
};

exports.delete = (req,res) => {
    const id = req.params.id;
    Tutorial.remove(id,(err, data) => {
        if(err){
            if(err.kind === 'not found'){
                res.status(404).send({
                    message: "Not found!"
                })
            }else{
                res.status(500).send({
                    message: "Could not delete id " + id
                })
            }
        }else{
            res.send({message: "Delete successfully"})
        }
    })
    //res.send({message: "delete"})
};

exports.deleteAll = (req,res) => {
    res.send({message: "deleteAll"})
};