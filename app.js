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
        res.render("books", {books})
    })
})

app.get("/addbooks", (req,res)=>{
    res.render("addbooks")
})

app.get("/editbook/:id", (req,res)=>{
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE id = ?`
    const dados = [id]
    pool.query(sql,dados,(err,data)=>{
        if(err){
            console.log(err)
        }
        const book = data[0]
        res.render("editbook", {book})
    })
})

app.post("/editbook/:id", (req,res)=>{
    const id = req.params.id
    const name = req.body.name
    const pageqty = req.body.pageqty
    const sql = `UPDATE books SET name = ?, pageqty = ? WHERE id = ?`
    const dados = [name, pageqty, id]
    pool.query(sql, dados, (err)=>{
        if(err){
            console.log(err)
        }
        res.redirect("/")
    })
})

app.post("/addbooks", (req,res)=>{
    const name = req.body.name
    const pageqty = req.body.pageqty
    const sql = `INSERT INTO books (name, pageqty) VALUES (?,?)`
    const data = [name, pageqty]

    pool.query(sql, data, (err)=>{
        if(err){
            console.log(err)
        }
        res.redirect("/")
    })
})

app.get("/", (req,res)=>{
    res.render("home")
})

app.listen(3000, ()=>{
    console.log("Servidor rodando!")
})