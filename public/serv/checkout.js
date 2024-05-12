


const main2={

   produ:[],
   produtosAdcionado:[],
   listaDEprodutos:[],

   init: function(){
    this.buscarHTML()
    this.buscandoAPI()
    this.adcionarProdutos()
    this.excluirProdutos()
    this.eventoIncluir()    

   }, 

   buscarHTML: function(){
    this.$listaDois=document.querySelector(".lista2")
    this.$incluirProd=document.querySelectorAll("#crementar")
   },


   buscandoAPI:function(){
      
      fetch('/add/date')
      .then(response => response.json())
      .then(data =>{

      this.produ = data.map( itens =>{
             const newprodutos = {  
        "nome":itens.nome,
        "img":itens.img,
        "tamanho":itens.tamanho,
        "preço":itens.preco,
        "quantidade":itens.quantidade,
        "id":itens.id
      } 
        return newprodutos })
       localStorage.setItem("adcionl",JSON.stringify(this.produ))
      
       const objt = localStorage.getItem("car")
       this.listaDEprodutos = JSON.parse(objt)
      
      })

   },

   corpoHTML: function(positionCartao){
      
      return  ` <article id="prodAdcional"> 
      
      <img id="imgadd" src="/imagens/dicionais/${positionCartao.img}">
      
      <div id="quantidade">
   
          <p id="nome">${positionCartao.nome}</p>
          <p id="tamanho"> tamanho: ${positionCartao.tamanho}</p>
          <p id="grana">R$ ${positionCartao.preço}</p>
         
         <div id="crementasao">
         <p id="incrementar" data-local="${positionCartao.id}">-</p>
         <p id="va">${positionCartao.quantidade}</p>   
         <p id="crementar" data-local="${positionCartao.id}">+</p>
          
         <div/>
      </div>
   
  </article>`

   },

   adcionarProdutos: function(){
      const self = this
      this.$listaUm= document.querySelector(".lista1")
   
      const objt = localStorage.getItem("adcionl")
      this.produtosAdcionado= JSON.parse(objt)
   
         this.produtosAdcionado.forEach( itens =>{
         self.$listaUm.innerHTML += self.corpoHTML(itens)
          
        })      
      
this.buscarHTML()
   },

eventoIncluir: function(){
   const self = this 
   
   this.$incluirProd.forEach( produtos => {

      produtos.addEventListener("click", function(e){
         console.log(e)
         alert("ok")
      })
   })





   },

   excluirProdutos:function(){


   }

}




main2.init()