let indiceCarrusel = 0;

document.addEventListener("DOMContentLoaded",()=>{
    mostrarImagenes(indiceCarrusel);
})
  
const mostrarImagenes = () => {

    let i;
    let imagenes = document.getElementsByClassName("imagenCarrusel");
    for (i = 0; i < imagenes.length; i++) {
        imagenes[i].style.display = "none";  
    }
    indiceCarrusel++;
    if (indiceCarrusel > imagenes.length) {
        indiceCarrusel = 1;
    }    
    imagenes[indiceCarrusel-1].style.display = "block";  
    setTimeout(mostrarImagenes, 4000);
}