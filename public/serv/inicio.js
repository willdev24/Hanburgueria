let time = 2000
let currentImagenIndex = 0
let imagens = document.querySelectorAll("#baner img")
let max = imagens.length

const satrtF = ()=>{


    function nextImage(){

        currentImagenIndex ++

if(currentImagenIndex >= max){
    currentImagenIndex = 0
    for(let i = 0; i < 4; i++) 
    imagens[i].classList.remove("selected")
}

imagens[currentImagenIndex].classList.add("selected")
}

setInterval(()=>{

nextImage()

}, time)



}

window.addEventListener("load", satrtF)