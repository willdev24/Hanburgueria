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


app.get("/endereco",(req, res)=>{

    res.render("endereco")
})


app.get("/contatos",(req, res)=>{

    res.render("contatos")
})


app.get("/menu",(req, res)=>{

    const produtos = fs.readFileSync("./cadastrados.json")
    const produtosOBJ = JSON.parse(produtos)


     res.render("menu",{
        cadastrados:produtosOBJ
    })
})



const port = process.env.PORT || 8080

app.listen(port,()=>{
    console.log(`servidor rodando na porta ${port}`)
})