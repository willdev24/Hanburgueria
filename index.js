const express = require("express")
const path = require("path")
const fs = require("fs")
const uuid = require("uuid")

const app = express()

app.set("view engine","ejs")

app.use(express.static(path.join(__dirname,"public")))


app.get("/",(req, res)=>{

    res.render("index")
})


const port = process.env.PORT || 8080

app.listen(port,()=>{
    console.log(`servidor rodando na porta ${port}`)
})