const pool = require("./db/conn.js")
const express = require("express")
const app = express()
const exphbs = require("express-handlebars")

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
app.get("/books", (req,res)=>{
    const sql = `SELECT * FROM books`
    pool.query(sql, (err,data)=>{
        if(err){
            console.log(err)
        }
        const books = data
        res.render("books", { books })
    }) 
})

app.get("/", (req,res)=>{
    res.render("home")
})

app.listen(3000, ()=>{
    console.log("Servidor rodando!")
})