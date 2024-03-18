fetch("cadastrados.json").then((response)=>{
    response.json().then((dados)=>{
        console.log(dados)
    })
    
    })