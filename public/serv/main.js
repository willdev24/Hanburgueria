
const Main ={

    produtos:[],

    init:function(){
        this.apiDOSprodutos()   
        this.sincronizandoaApi()  
        this.buscarnoHtml()
        this.adcionarEventos()
        console.log(this.produtos)

    },

buscarnoHtml: function(){
    this.$carrinhoDecompras = document.querySelector('#carrinho')
    this.$menucarrinho =document.querySelector('.menucarrinho')    
    this.$produtos=document.querySelectorAll(".produtos")

},

adcionarEventos: function(){
    self = this

    this.$carrinhoDecompras.addEventListener('click', self.Events.abrirfecharCarrinho_click.bind(self))

    this.$produtos.forEach( itens => {
        itens.addEventListener("click", self.Events.addicionarCarrinho_click.bind(self))
    });
  
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
}},


addicionarCarrinho_click:function(e){

const id = e.target.dataset.local
alert("produto adicionado")
}

}}



Main.init()

