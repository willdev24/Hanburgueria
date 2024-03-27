
const Main ={

    produtos:[],
    gitstorage:[],

    init:function(){

        this.buscarnoHtml()
        this.adcionarEventos()
        this.apiDOSprodutos()   
        this.atualizarcarrinho()
        this.sincronizandoaApi()  
        this.apagar()

    },
    

buscarnoHtml: function(){
    this.$carrinhoDecompras = document.querySelector('#carrinho')
    this.$menucarrinho =document.querySelector('.menucarrinho')    
    this.$produtos=document.querySelectorAll("#addi")
   
    
},

adcionarEventos: function(){
    self = this

    this.$carrinhoDecompras.addEventListener('click', self.Events.abrirfecharCarrinho_click.bind(self))

    this.$produtos.forEach( itens => {
        itens.addEventListener("click", self.Events.addicionarCarrinho_click.bind(self))

    
    });

   
},


atualizarcarrinho: function(){

    const produtosSalvos = localStorage.getItem("car")
    this.gitstorage += produtosSalvos

},


apiDOSprodutos: function(){

    fetch('/api/database')
    .then(response => response.json())    
    .then(data => {    
        
this.produtos = data.map( itens =>{

const produtosapi = {     
       "nome": itens.nome,
        "valor":itens.valor,
        "img":itens.img,
        "recheio":itens.recheio,
        "id":itens.id,
    }

return produtosapi
})
localStorage.setItem("tasks", JSON.stringify(this.produtos))

this.sincronizandoaApi
})},


sincronizandoaApi:function(e){

const prod = localStorage.getItem("tasks")
this.produtos = JSON.parse(prod) 

},

Events:{

abrirfecharCarrinho_click:function(e){
const carrinho = this.$menucarrinho
const done=carrinho.classList.contains('abrirCarrinho')

if(done == false){

    carrinho.classList.add('abrirCarrinho')

}else{

    carrinho.classList.remove('abrirCarrinho')
}


},


addicionarCarrinho_click:function(e){

const id = e.target.dataset.local
const positionCartao = this.produtos.find( itens => itens.id == id)
const quantitativo = 0

 

    
const cartaoProdutos = ` <article id="prodnocarrinho">
                            <p id="excluir">X</P>
                            <img id="imgcartao" src="/imagens/${positionCartao.img}">
                            <div>
                                <p>${positionCartao.recheio}</p>
                                <p>R$${positionCartao.valor}</p>
                            </div>
                            <div id="quantidade">
                                <p id="crementar">+</p>
                                <p id="crementar">${quantitativo}</p>
                                <p id="incrementar">-</p>
                            </div>
                        </article>`


                        this.$menucarrinho.innerHTML += cartaoProdutos
                    const localstoragProd = this.produtos.filter( itens => itens.id == id )
             
                 

                    const savestryng = localStorage.getItem("car")
                    const saveobj = JSON.parse(savestryng)
                    
                    const obj = [{car:localstoragProd}, ...saveobj]
                    localStorage.setItem("car", JSON.stringify(obj))

                 

                    const itens = this.bugcar=document.querySelectorAll("#prodnocarrinho")
                    
                    itens.forEach(itens =>{
                        console.log(itens) 
                    })

                   this.apagar()
                }
                
                    
},

apagar: function(){
   const self = this
   this.$apagarCar=document.querySelectorAll("#excluir")   

   this.$apagarCar.forEach( itens=> {
        itens.addEventListener("click", function(){

            console.log("deu certo")
        })

    })




    }
   
    

}










Main.init()

