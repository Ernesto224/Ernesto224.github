let indiceCarrusel = 0;//se coloca el indice en el primer componente del carrusel

document.addEventListener("DOMContentLoaded",()=>{
    mostrarImagenes(indiceCarrusel);
})//se llama al evento mediante la carga del archivo
  
const mostrarImagenes = () => {

    let i;
    let imagenes = document.getElementsByClassName("imagenCarrusel");
    for (i = 0; i < imagenes.length; i++) {
        imagenes[i].style.display = "none";  
    }//se desactivan las imagenes de forma que no se muestran

    indiceCarrusel++;//el indice de carrusel aumenta
    if (indiceCarrusel > imagenes.length) {
        indiceCarrusel = 1;
    }    

    imagenes[indiceCarrusel-1].style.display = "block";//se activa la imagen a mostrar
    setTimeout(mostrarImagenes, 4000);//lapso de descanso para el metodo
}