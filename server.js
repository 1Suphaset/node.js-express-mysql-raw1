//program server
const express = require("express");
const app = express();
const PORT =80;

app.get("/", (req,res)=>{
    res.json({message: "Welcome to ITD102 appication"})
});

app.listen(PORT, ()=>{
    console.log(`Server is running on Port ${PORT}`);
});             //call back funcion 
