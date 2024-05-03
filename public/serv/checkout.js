


const main2={

   produtos:[],
   produtosAdcionado:[],

   init: function(){
    this.buscarHTML()
    this.buscandoAPI()
    this.adcionarProdutos()
    this.excluirProdutos()
    

   }, 

   buscarHTML: function(){

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
        console.log(this.produtos)

      })

   },


   buscandoAPI:function(){




   },

   adcionarProdutos: function(){


   },

   excluirProdutos:function(){


   }

}




main2.init()