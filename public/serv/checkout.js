


const main2={

   produtos:[],
   produtosAdcionado:[],
   listaDEprodutos:[],

   init: function(){
    this.buscarHTML()
    this.buscandoAPI()
    this.adcionarProdutos()
    this.excluirProdutos()
    

   }, 

   buscarHTML: function(){
    this.$listaDois=document.querySelector(".lista2")
   },


   buscandoAPI:function(){

      fetch('/add/date')
      .then(response => response.json())
      .then(data =>{

      this.produtos = data.map( itens =>{
             const newprodutos = {  
        "nome":itens.nome,
        "img":itens.img,
        "tamanho":itens.tamanho,
        "preço":itens.preço,
        "quantidade":itens.quantidade
      } 
        return newprodutos })
       localStorage.setItem("adcionl",JSON.stringify(this.produtos))
      const objt = localStorage.getItem("car")
       this.listaDEprodutos = JSON.parse(objt)
      
      })




   },

   corpoHTML: function(positionCartao){
      
      return  ` <article id="prodAdcional"> 
      
      <img id="imgadd" src="/imagens/${positionCartao.img}">
      
      <p id="tamanho">R$${positionCartao.nome}</p>
      <p id="tamanho">R$${positionCartao.tamanho}</p>
      <p id="grana">R$${positionCartao.valor}</p>

      <div id="quantidade">
          <p id="crementar" data-local="${positionCartao.id}">+</p>
          <p id="va">${positionCartao.quantidade}</p>
          <p id="incrementar" data-local="${positionCartao.id}">-</p>
      </div>
   
  </article>`

   },

   adcionarProdutos: function(){
      this.$listaUm= document.querySelector(".lista1")
      const elementclass = document.createElement( "article")
                    
      this.produtos.forEach( produtos => {
 console.log(this.produtos)               
   
      })
      

   },

   excluirProdutos:function(){


   }

}




main2.init()