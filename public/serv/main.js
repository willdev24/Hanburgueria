
const Main ={

    produtos:[],
    gitstorage:[],

    init:function(){

        this.buscarnoHtml()
        this.adcionarEventos()
        this.apiDOSprodutos()   
        this.atualizarcarrinho()
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
    this.apagar()
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

this.apagar()
})},



corpoHTML: function(positionCartao){
    const quantitativo = 0 

    this.apagar()
        return ` <article id="prodnocarrinho">
        <p id="excluir"  data-local="${positionCartao.id}" >X</P>
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

const elementclass = document.createElement( "article")

elementclass.innerHTML = this.corpoHTML(positionCartao)
this.$menucarrinho.appendChild(elementclass)
           
        const localstoragProd = this.produtos.find( itens => itens.id == id )
    
        const savestryng = localStorage.getItem("car")
        const saveobj = JSON.parse(savestryng)
                
        const obj = [localstoragProd, ...saveobj]
                    localStorage.setItem("car", JSON.stringify(obj))


                    this.apagar()
                }
                
                    
},

apagar: function(){
    this.$apagarCar=document.querySelectorAll("#excluir")   
    this.bugcar=document.querySelectorAll("#prodnocarrinho")
    const self = this               
   
    this.$apagarCar.forEach( itens=> {
        itens.addEventListener("click",function(e){
         
            const nocarrinho = localStorage.getItem("car")
            const objsalvos = JSON.parse(nocarrinho)
            
            self.gitstorage = objsalvos
                
              
  const id = e.target.dataset.local 
  const contID = self.gitstorage.filter( itenscar => { 
    return itenscar.id != id
    
     })
     console.log(contID)




 const teste =document.querySelector('.menucarrinho')
teste.innerHTML = ""

self.gitstorage.forEach( positionCartao =>{

           const html =  ` <article id="prodnocarrinho">
                        <p id="excluir"  data-local="${positionCartao.id}" >X</P>
                        <img id="imgcartao" src="/imagens/${positionCartao.img}">
                        <div>
                            <p>${positionCartao.recheio}</p>
                            <p>R$${positionCartao.valor}</p>
                        </div>
                        <div id="quantidade">
                            <p id="crementar">+</p>
                            <p id="crementar">$"0"</p>
                            <p id="incrementar">-</p>
                        </div>
                    </article>`

                   teste.innerHTML += html
                   self.apagar()
     })


        
    })
 
})
}


}



Main.init()

