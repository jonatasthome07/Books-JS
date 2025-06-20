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
app.get("/allbooks", (req,res)=>{
    const sql = `SELECT * FROM books`
    pool.query(sql, (err,data)=>{
        if(err){
            console.log(err)
        }
        const books = data
        res.render("allbooks", { books })
    }) 
})

app.get("/books",(req,res)=>{
    res.render("books")
})

app.get("/addbooks", (req, res) => {
  res.render("addbooks");
});

app.post("/addbooks",(req,res)=>{
    const name = req.body.name
    const pages = req.body.pages
    const sql = `INSERT INTO books (name,pageqty) VALUES(?,?)`
    const data = [name, pages]

    pool.query(sql,data, (err)=>{
        if(err){
            console.log(err)
        }
    })

    res.redirect("/books")
})

app.get("/", (req,res)=>{
    res.render("home")
})

app.listen(3000, ()=>{
    console.log("Servidor rodando!")
})