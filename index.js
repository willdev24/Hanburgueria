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

app.get("/api/database", (req, res) => {
    res.sendFile(__dirname + '/cadastrados.json')
})


app.get("/endereco",(req, res)=>{

    res.render("endereco")
})


app.get("/pedidos",(req, res)=>{

    res.render("pedidos")
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