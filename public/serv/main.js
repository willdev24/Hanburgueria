
const Main ={

    produtos:[],
    gitstorage:[],
    validarProd:[],
    objsalvos:[],

    init:function(){  //aq executo todas as minhas funçoes 
        this.buscarnoHtml()
        this.adcionarEventos()
        this.apiDOSprodutos()   
        this.atualizarcarrinho()
        this.apagar()
        this.Quantidade()
        this.finaizarPedido()
        this.dinheiro()
    },
    

buscarnoHtml: function(){
    this.$carrinhoDecompras = document.querySelector('#carrinho')
    this.$menucarrinho =document.querySelector('.menucarrinho')    
    this.$produtos=document.querySelectorAll("#addi") //uso os queryselectoALL para pegar todos os produtos com botao id #addi
    this.$dinheiro=document.querySelector("#total")

},

adcionarEventos: function(){
    self = this
     
    //abrir e fechar crrinho
    this.$carrinhoDecompras.addEventListener('click', self.Events.abrirfecharCarrinho_click.bind(self))

    //adicionar os produtos no carrihno
    //dou um forEach no objeto com todos os produtos para que seja adicionado o evento em todos eles  
    this.$produtos.forEach( itens => {
        itens.addEventListener("click", 
        self.Events.addicionarCarrinho_click.bind(self))  //aq é chamado o objeto onde irá ser executado a funçao de adicionar os produtos no carrinho  
    });                                                   // bnd(self) serve para passar o this global para a funçao chamada
 
},


atualizarcarrinho: function(){
    const produtosSalvos = localStorage.getItem("car")
    this.gitstorage += produtosSalvos
    this.apagar()
},

//buscando os produtos disponibilizados pela api do back-end   
apiDOSprodutos: async function(){  //async: serve para que javascript so avance depois de ter executao toda a funçao na qual esta trabalhando 

   await fetch('/api/database')            //aq é importado as informaçoes de cada produto e em seguida é executado um map no obj com os produtos
    .then(response => response.json())    //para que seja criado um novo array a partir dele e seja salvo no localstorage
    .then(data => {    
        
this.produtos = data.map( itens  =>{

    const produtosapi = {     
            "nome": itens.nome,
            "valor":itens.valorCartao,
            "img":itens.img,
            "recheio":itens.recheio,
            "id":itens.id,
            "quantidade": 1,
            "money":itens.valor
        }

    return produtosapi
})
localStorage.setItem("tasks", JSON.stringify(this.produtos))
//localStorage.setItem("car",JSON.stringify(this.produtos))
// caso deja erro ao executar o sistema pela primeira vez é so liberar esse comando 
//this.apagar()//
})
},

//funçao responsavel pela criaçao de produtos
corpoHTML: function(positionCartao, quantidade){
    
    return ` <article id="prodnocarrinho">
        <p id="excluir"  data-local="${positionCartao.id}" >X</P>
      
     <div  id="recheio">
        <p>${positionCartao.recheio}</p>
        <p id="dinheiro">R$${positionCartao.valor}</p>
    </div>
        <img id="imgcartao" src="/imagens/${positionCartao.img}">
       
        <div id="quantidade">
            <p id="crementar" data-local="${positionCartao.id}">+</p>
            <p id="va"> ${quantidade || positionCartao.quantidade }</p>
            <p id="incrementar" data-local="${positionCartao.id}">-</p>
        </div>
    </article>`
    
    },

dinheiro:  function(valor, sub, quantidade){  

const corpo = this.$menucarrinho
let money = this.$dinheiro

const objvanum1l = localStorage.getItem("valor")
const  objval =  JSON.parse(objvanum1l)

const subtrair = sub / quantidade


        if(subtrair > objval){
          this.newvalor = subtrair - objval

            }else{
                this.newvalor = objval - subtrair
            }

        if(subtrair){
            localStorage.setItem("valor", this.newvalor.toFixed(2))
          
            return money.innerHTML =   this.newvalor.toFixed(2)        
        }

   if(valor > 0){
     const num = objval + valor
     money.innerHTML = num.toFixed(2)
     localStorage.setItem("valor", num.toFixed(2))
   
     }else if(corpo.textContent){

       return  money.innerHTML = objval.toFixed(2)
   
        }else{
            const num = 0
            money.innerHTML = "00,00"
            localStorage.setItem("valor", num.toFixed(2))
        }
},

    
Events:{
 
//abrir e fechar o carrinho 
abrirfecharCarrinho_click:function(e){
const carrinho = this.$menucarrinho  
const done=carrinho.classList.contains('abrirCarrinho') // contains: serve para saber se a variavel, seja la qual for, possui ou nao a alguma class especifica
const favicon = document.querySelector('#favicon')


favicon.addEventListener('click', function(){ 
        carrinho.classList.remove('abrirCarrinho')
        campo.classList.remove('abrirCarrinho')

})

const campo = document.querySelector("#campo")
const doneDuol = campo.classList.contains('abrirCarrinho')

        if(  done == false){
            carrinho.classList.add('abrirCarrinho')    
          }

        if(  doneDuol == false){
    campo.classList.add('abrirCarrinho')
       
    
}

},

//adiciona os produtos no carrinho 
addicionarCarrinho_click:function(e){

const id = e.target.dataset.local  //pega o id do produto que voçe adiciona
const positionCartao = this.produtos.find( itens => itens.id == id) //passa por todo os array,de produtos, ate encontrar o produto que tem o mesmo id 
                                                                    // usando o find para poder pegar a informaçao completa do produto


//verificando se ja tem o mesmo produto no carrinho
const validar = localStorage.getItem("car")
      this.validarProd = JSON.parse(validar)
const posisao = this.validarProd.find( intensSlavod => intensSlavod.id == id)//se tiver esse produto no carrinhoe ele vai chamar a funçao incrementar 

if( posisao ){
    this.Quantidade(id) //aq eu chamo a funçao qunatidade para nao ser adicionado o mesmo produto no carrinho e sim so a quantidade/valor

 }else{  //caso contrario o produto irá seguir essa linha de codgo e adcionara o produto no carrinho

    const elementclass = document.createElement( "article")
                    
    elementclass.innerHTML = this.corpoHTML(positionCartao) //aq é chamado a funçao para criar meu produto, passsando o "positionCartao" que contem todas as informaçoes do cartao.
    this.$menucarrinho.appendChild(elementclass)
    const localstoragProd = this.produtos.find( itens => itens.id == id )     

    
    this.dinheiro(localstoragProd.money)//adicionar valor
    
    
    const savestryng = localStorage.getItem("car") //pega os produtos salvos no carrinho
    const saveobj = JSON.parse(savestryng)
                                    
    const obj = [localstoragProd, ...saveobj] //junto o produto que ta salvo + o produto que vou adicionar, jogo tudo dentro uma const e atualizo o localstorage
    localStorage.setItem("car", JSON.stringify(obj))

    
                    
    //sempre que excuto uma funçao preciso chamar as demais funçoes novamente para que nao haja erros                 
    this.apagar() 
    this.descrementar() 
    this.crementar()
                                 //tenho que fazer o apagar hamar a funçao inheiro uma ves so 
}}                      
               
},

//apaga os produtos do carrinho
apagar: function(){
    
    
    this.$apagarCar = document.querySelectorAll("#excluir")   //pego toos os butaos que tem o id "excluir"
    const self = this
    
    
        this.$apagarCar.forEach( (itens, indce)=> {              //adiciono um eventos em todos eles        
        itens.addEventListener("click",function(e){ //executo a funçao aq mesmo para evitar erros
        const id = e.target.dataset.local//id do produto a ser excluido
        
            const nocarrinho = localStorage.getItem("car") //antes de tudo pego todos os produtos, salvos no carrinho, e coloco dentro de uma variavel global  
            const objsalvos = JSON.parse(nocarrinho)
            self.gitstorage = objsalvos
                    
            const contID = self.gitstorage.filter( itenscar => {  //filtro o a minha variavel global retirando apenas o routo a ser exluido
            return itenscar.id != id
            })

    if(self.gitstorage.length != contID.length){ //preciso fazer isso para corrigir bug na hora de subtrair valores no carrinho!
                                                 // na primeira vez que o forEach for chamado ele sempre vai ter o indice diferente entre  (self.gitstorage.length != contID.length)
                                                 //fazendo com que a funçao dinheiro seja chamaada apenas uma vez                                    

       const valor = self.gitstorage.find(index=> index.id == id)
       const newvalor = valor.money
       const quant = valor.money
       self.dinheiro(0,newvalor, quant)
    }

// por fim TUALIZO o localStorage com os produtos ja filtrados
    localStorage.setItem("car", JSON.stringify(contID)) 
    
  const teste =document.querySelector('.menucarrinho') //a sim eu apago todos os produtos e logo a baixo crio todos eles ja filtrados 
          teste.innerHTML = ""
          
     contID.forEach( positionCartao =>{
  
                const html = self.corpoHTML(positionCartao)                       
                teste.innerHTML += html
return  
    
           
    })


    
     self.descrementar()
     self.crementar()
     self.apagar()    
    })
 })

},

// depois de ser verificado se o mesmo produto ja esta no carrinho essa funçao é chamada se ja houver o produto ja no carrino  
Quantidade: function(objss,valor){  //objss = id do produto //valor = quantidade negativa ou positiva 

const self = this 
    this.$quantidades = document.querySelectorAll("#va")

    const nocarrinho = localStorage.getItem("car") //produtos no carrinho
    self.objsalvos = JSON.parse(nocarrinho)

    const teste =document.querySelector('.menucarrinho') //primeiro eu apago todos os produtos e logo a baixo crio todos eles ja com a quantiade certa 
    teste.innerHTML = ""

   //dinheiro
   if(objss){
const produtoASERsomado = self.objsalvos.find(itens => itens.id == objss )
const val = produtoASERsomado.money
const quant = produtoASERsomado.quantidade
this.dinheiro(val)
   }

   
   
    //encontrando a posiçao do produto dentro do array
 const contabilizar = self.objsalvos.findIndex((element)=> element.id == objss ) //uso em varios lugares: preciso usar como uma funçao pra reduzir o uso desse elemento
       
 self.objsalvos.forEach( positionCartao =>{ // reconstruindo os produtos 

    if(valor == -1){ //se o valor vier negativo ele iradecrementar 

        self.cont = positionCartao.quantidade - 1

    }else{ self.cont = positionCartao.quantidade + 1} // caso venha positivo ele ir crementar

                if(positionCartao.id == objss){
                                                            //modificando so a quantidade do array original e no localhost
                self.objsalvos.splice(contabilizar,1, {    id:positionCartao.id, 
                                                            img:positionCartao.img, 
                                                            nome:positionCartao.nome, 
                                                            quantidade:self.cont, 
                                                            recheio:positionCartao.recheio, 
                                                            valor:positionCartao.valor,
                                                            money:positionCartao.money})

                       const valor = self.cont
                       teste.innerHTML += self.corpoHTML(positionCartao,valor)

           }else{ // esse else reconstroi tudo que ta no localhost, mesmo que atualize a pagna 

                const html = self.corpoHTML(positionCartao)
            teste.innerHTML += html
           
}})

   localStorage.setItem("car",JSON.stringify(self.objsalvos))
    self.apagar()
    self.descrementar()
    self.crementar()
     
},


// diminuir quantidades de produtos no carrinho 
descrementar: function(){
const self = this
const valor = -1
self.$incrementar = document.querySelectorAll("#incrementar")

self.$incrementar.forEach( prodIncrement=>{
    prodIncrement.addEventListener("click", function(e){

    const idcarrinho = e.target.dataset.local
    self.Quantidade(idcarrinho, valor)

})})
 
},

crementar: function(){
    const self = this
    const valor = 1
    self.$crementar = document.querySelectorAll("#crementar")
    self.$crementar.forEach( prodIncrement=>{
        
    prodIncrement.addEventListener("click", function(e){
    
    const idcarrinho = e.target.dataset.local
    
    self.Quantidade(idcarrinho,valor)
          
    })})
     
    },


finaizarPedido: function(){

const $butaoCheckut = document.querySelector("#finalizar")


        $butaoCheckut.addEventListener("click", function(e){
        const obj = localStorage.getItem("car")
        const validar = obj.length

        if(validar <= 2){
            alert("carrinho vazil")
        }else(
            window.location.href = window.location.origin + "/checkout"
        )
            
        
     }) 




}   
    
}//fim do objeto main


Main.init()







//caso precise usar //function quantidade //

           // reconstruçao dos produtos ja atualizado 
               /* const html =  ` <article id="prodnocarrinho"> 
                <p id="excluir"  data-local="${positionCartao.id}" >X</P>
            
                <div id="recheio">
                <p>${positionCartao.recheio}</p>
                <p id="dinheiro">R$${positionCartao.valor}</p>
            </div>
                <img id="imgcartao" src="/imagens/${positionCartao.img}">
                
                <div id="quantidade">
                    <p id="crementar" data-local="${positionCartao.id}">+</p>
                    <p id="va">${this.cont}</p>
                    <p id="incrementar" data-local="${positionCartao.id}">-</p>
                </div>
            </article>`*/ 