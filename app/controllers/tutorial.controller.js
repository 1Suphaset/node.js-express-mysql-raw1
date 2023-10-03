const student = require("../model/tutorial.model.js");

exports.Create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    const newstudent = new student({
        id: req.body.id,
        name: req.body.name,
        lastname: req.body.lastname,
        university: req.body.university,
        graduated: req.body.graduated || false,
        date: req.body.date
    })

    student.create(newstudent, (err, data) => { //ถ้าerrorแก้ตรงชื่อเด้อ//** */
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

exports.FindAll = (req,res) => {/** */
   const name = req.query.name;

   student.getAll(name, (err, data) => {  //paramiter จะส่งค่าtitle และcallback function
        if(err){
             res.status(500).send({
                message: err.message || "Some error occurred!"
             });
         }else {
            res.send(data);
         }
   });
};

exports.FindOne = (req,res) => {//** */
    const name = req.params.name;

    
    student.findByName(name, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
             res.status(404).send({
                message: "Not found student with name " + name
             });
            }else{
                res.status(500).send({
                    message: "Error student with name " + name
                });
            }
        }else{
            res.send(data);
        }
    });
    //res.send({message: "FindOne"})
};

exports.FindAllgraduated = (req,res) => {
    student.getAllgraduated((err, data) => {
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


exports.delete = (req,res) => {
    const no = req.params.no;
    student.remove(no,(err, data) => {
        if(err){
            if(err.kind === 'not found'){
                res.status(404).send({
                    message: "Not found!"
                })
            }else{
                res.status(500).send({
                    message: "Could not delete no. " + no
                })
            }
        }else{
            res.send({message: "Delete successfully"})
        }
    })
    //res.send({message: "delete"})
};

exports.deleteAll = (req,res) => {
    student.removeAll((err, data) => {
        if(err){
            res.tatus(500).send({
                message: err.message || "Some error occurred!"
            })
        }else{
            res.send({message: "All tutorials were delete successfully!"})//message: คือการใส่ข้อความ
        }
    })
    //res.send({message: "deleteAll"})
};