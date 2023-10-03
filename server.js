//program server
const express = require("express");
const app = express();
const cors = require('cors')
const PORT =process.env.PORT || 8080;

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const corsOptions = {
    origin: "http://localhost:3000"
}
app.use(cors(corsOptions))

app.get("/", (req,res)=>{ //route1 defult route "/" คือ http://localhost:8080
    res.json({message: "Welcome to ITD102 appication"})
});

require("./app/routes/tutorial.routes.js")(app); //route2 แปลว่าเส้นทางlink 

app.listen(PORT, ()=>{
    console.log(`Server is running on Port ${PORT}`);
});             //call back funcion 
