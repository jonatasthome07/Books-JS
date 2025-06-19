const pool = require("./db/conn.js")
const express = require("express")
const app = express()
const exphbs = require("express-handlebars")
require ("dotenv").config();

app.use(express.static("public"))

app.engine("handlebars", exphbs.engine())
app.set("view engine","handlebars")


app.get("/", (req,res)=>{
    res.render("home")
})

app.listen(3000, ()=>{
    console.log("Servidor rodando!")
})