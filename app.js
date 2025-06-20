const pool = require("./db/conn.js")
const express = require("express")
const app = express()
const exphbs = require("express-handlebars")
require ("dotenv").config();

//Set Engine
app.engine("handlebars", exphbs.engine())
app.set("view engine","handlebars")


//Middlewares
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(express.static("public"))


//Routes
app.post("/allbooks", (req,res)=>{
    
    res.render("allbooks")
})

app.get("/addbooks", (req,res)=>{
    res.render("addbooks")
})


app.get("/", (req,res)=>{
    res.render("home")
})

app.listen(3000, ()=>{
    console.log("Servidor rodando!")
})