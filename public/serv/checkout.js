


const main2={

   produ:[],
   produtosAdcionado:[],
   listaDEprodutos:[],
   objtoarrinho:[],


   init: function(){
    this.buscarHTML()
    this.buscandoAPI()
    this.adcionarProdutos()
    this.ventIncluir()    
    this.validarForm()

   }, 

   buscarHTML: function(){
    this.$listaDois=document.querySelector(".lista2")
    this.$incluirProd=document.querySelectorAll("#crementar")
    this.$formulario = document.querySelector("#formulario")
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
      
      <img id="imgadd" src="/imagens/${positionCartao.img}">
      <div id="quantidade">
   
          <p id="nome">${positionCartao.nome}</p>
          <p id="tamanho"> tamanho: ${positionCartao.tamanho}</p>
          <p id="grana">R$ ${positionCartao.preço}</p>
         
         <div id="crementasao2">
         <p id="crementar" data-local="${positionCartao.id}">+</p>
          
         <div/>
      </div>
   
  </article>`

   },

corpoFinal: function(positionCartao2){

   return `<article id="prodAdcional2"> 
            
            <img id="imgadd" src="/imagens/${positionCartao2.img}">
            <p id="excluir"  data-local="${positionCartao2.id}" >X</P>
            
            <div id="quantidade">
               <p id="nome">${positionCartao2.nome}</p>
               <p id="tamanho"> tamanho: ${positionCartao2.tamanho || positionCartao2.recheio}</p>
                  <diV id="valores">
                     <p id="va">${positionCartao2.quantidade}</p> 
                     <p>x</p>  
                     <p id="grana">R$ ${positionCartao2.preço|| positionCartao2.valor}</p>
                  <diV/>   
             <div/>
          </article>`

   },

   adcionarProdutos: function(){
      const self = this
      this.$listaUm= document.querySelector(".lista1")
   
      const objt = localStorage.getItem("adcionl")
      this.produtosAdciona= JSON.parse(objt)
   
         this.produtosAdciona.forEach( itens =>{
         self.$listaUm.innerHTML += self.corpoHTML(itens)
          
        })      
      
this.buscarHTML()
   },

ventIncluir: function(){

   const self = this 
   const $lista2 =document.querySelector(".lista2")   
   const obj2 = localStorage.getItem("car")
    self.objtoarrinho = JSON.parse(obj2)
   
   self.objtoarrinho.forEach(prodCar=>{

      return  $lista2.innerHTML += this.corpoFinal(prodCar)
    })

localStorage.setItem("prodFinais", JSON.stringify(self.objtoarrinho ))

   self.$incluirProd.forEach( produtos => {

      produtos.addEventListener("click", function(e){
         const id = e.target.dataset.local
     
         const adicionarIten = self.produ.find(itens => itens.id == id)

              $lista2.innerHTML += self.corpoFinal(adicionarIten)
              const obj = localStorage.getItem("prodFinais")
              const produtosSlavos = JSON.parse(obj)
    
              const todos = [adicionarIten, ... produtosSlavos]
              localStorage.setItem("prodFinais", JSON.stringify(todos))
    return    

          })

   })

   },

   validarForm:function(){
  const  self = this
      document.querySelector("#formulario").addEventListener('submit', validar)

      const nome = document.forms['formulario']['nome']
      const telefone = document.forms['formulario']['telefone']
      const cep = document.forms['formulario']['cep']
      const endereco = document.forms['formulario']['endereco']
      const complemento = document.forms['formulario']['complemento']
      const numero = document.forms['formulario']['numero']
     

const nomeUser = document.querySelector("#nome")
const telefoneUser = document.querySelector("#telefone")
const cepUser = document.querySelector("#cep")
const enderecoUser = document.querySelector("#endereco")
const complementoUser = document.querySelector("#complemento")
const numeroUser = document.querySelector("#numero")

      function validar(e){
      e.preventDefault() 



      }





   }

}




main2.init()