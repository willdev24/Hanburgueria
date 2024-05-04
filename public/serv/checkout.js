


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

   adcionarProdutos: function(){

      

   },

   excluirProdutos:function(){


   }

}




main2.init()