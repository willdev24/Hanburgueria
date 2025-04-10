const express = require("express")
const path = require("path")
const fs = require("fs")
const uuid = require("uuid")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs")

app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req, res)=>{

    res.render("index")
})

app.get("/api/database", (req, res) => {
    res.sendFile(__dirname + '/cadastrados.json')
    
})

app.get("/add/date", (req, res) =>{

    res.sendFile(__dirname + '/adicionais.json')
})


       app.get("/endereco",(req, res)=>{

            res.render("endereco")
        })


            app.get("/pedidos",(req, res)=>{

                res.render("pedidos")
            })

                app.get("/checkout",(req, res)=>{

                    res.render("checkout")
                })

                // excluir essa rota para poder mandar direto va requisiçao para painel adm
                    app.post("/finalizando/Compra", (req, res)=>{

                        const pedidos = fs.readFileSync("./pedidos.json")
                        const pedidosJson = JSON.parse(pedidos)

                        const {nome,endereco,complemento,contato} = req.body

                       pedidosJson.push({
                        nome,
                        contato,
                        complemento,
                        endereco
                       }) 

                      const pedidosStin = JSON.stringify(pedidosJson)           
                      fs.writeFileSync("./pedidos.json", pedidosStin )
                       
                       res.redirect("/menu")
                    })



// vou ter que apagar essa rota possivelmente ou fazer uma requiçao com o fet!! par buscar os produtos no banco
app.get("/menu",(req, res)=>{


    const produtos = fs.readFileSync("./cadastrados.json")
    const produtosOBJ = JSON.parse(produtos)


     res.render("menu",{
        cadastrados:produtosOBJ
    })
})



//produtos
            app.get("/doce",(req, res)=>{

                const produtos = fs.readFileSync("./cadastrados.json")
                const produtosOBJ = JSON.parse(produtos)


                res.render("bebidas",{
                    cadastrados:produtosOBJ
                })
            })

                app.get("/combos",(req, res)=>{

                    const produtos = fs.readFileSync("./cadastrados.json")
                    const produtosOBJ = JSON.parse(produtos)
                
                
                    res.render("combos",{
                        cadastrados:produtosOBJ
                    })
                })
                
                    app.get("/promocoes",(req, res)=>{

                        const produtos = fs.readFileSync("./cadastrados.json")
                        const produtosOBJ = JSON.parse(produtos)
                    
                    
                        res.render("pizza",{
                            cadastrados:produtosOBJ
                        })
                    })
                    app.get("/fritas",(req, res)=>{

                        const produtos = fs.readFileSync("./cadastrados.json")
                        const produtosOBJ = JSON.parse(produtos)
                    
                    
                        res.render("hotdog",{
                            cadastrados:produtosOBJ
                        })
                    })
   //                 
                





const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`servidor rodando na porta ${port}`)
})