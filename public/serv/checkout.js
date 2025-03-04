

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
localStorage.setItem("prodFinais", JSON.stringify(this.objtoarrinho))

      self.$incluirProd.forEach( produtos => {

         produtos.addEventListener("click", function(e){
         self.valid = e.target.dataset.local
            const id = self.valid
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

      let nome = document.forms['formulario']['nome']
      let telefone = document.forms['formulario']['telefone']
      let cep = document.forms['formulario']['cep']
      let endereco = document.forms['formulario']['endereco']
      let complemento = document.forms['formulario']['complemento']
      let numero = document.forms['formulario']['numero']
      let bairro = document.forms['formulario']['bairro']

const nomeUser = document.querySelector("#nomeF")
const telefoneUser = document.querySelector("#telefone")
const cepUser = document.querySelector("#cep")
const enderecoUser = document.querySelector("#endereco")
const complementoUser = document.querySelector("#complemento")
const numeroUser = document.querySelector("#numero")
const bairroUser = document.querySelector("#bairro")

//console.log(nome.value)

const spannomeFO = document.getElementById("spannomeFO")
const spancep = document.querySelector("#spancep")
const spanend = document.querySelector("#spanend")
const spanbairro = document.querySelector("#spanbairro")
const spanumero = document.querySelector("#spanumero")
const spancomp = document.querySelector("#spancomp")
const spantel= document.querySelector("#spantel")


         function validar(e){
         e.preventDefault()
      self.dados = [nome, telefone, endereco, complemento, numero ,bairro, cep]
      self.spans=[spanumero,spantel,spannomeFO,spancomp,spancep,spanend,spanbairro]
      self.campos = [nomeUser,telefoneUser,cepUser,enderecoUser,complementoUser,numeroUser,bairroUser]


   function campos(id , excluir){
      console.log(id ,excluir)

         const campoAcionado  = self.campos.find( nome =>  nome.id == id )
               const done = campoAcionado.classList.contains("vazil")

               if(done == false){
                  campoAcionado.classList.add("vazil")
                  
               }
               
               if(excluir == 0){
                  campoAcionado.classList.remove("vazil")
               }
            }

   
         function spans(_id, excluir){
            //console.log(_id ,excluir)

            self.spans.forEach( itens => {
               const validar = itens.attributes.name.value 

               if(validar == _id){
                  const done = itens.classList.contains("spans")

                  if(done == false){         
                     itens.classList.add("spans")
                     itens.innerHTML =" O campo vazil deve ser preenchido "
                       }
                       
                       if(excluir == 0){
                        itens.classList.remove("spans")
                        itens.innerHTML = ""
                       }
                     
                     }

                   })}
      
      
      
self.dados.forEach( itens => {

         if(itens.value == "" ){ 
            campos(itens.id)
            spans(itens.id)
         
            }else if(itens.value != ""){
              campos(itens.id , 0)
              spans(itens.id, 0)
         }
      });
   

if(nome.value && telefone.value && endereco.value && complemento.value 
   && numero.value && bairro.value && cep.value  != "" ){

      //window.location.href = "http://localhost:8080/menu"

      
  const objP = localStorage.getItem('prodFinais')
  const teste = JSON.parse(objP)

      console.log(teste)
   }



      
      }

   

}



}


main2.init()