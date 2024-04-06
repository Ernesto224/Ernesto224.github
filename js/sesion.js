const usuario = JSON.parse(sessionStorage.getItem("usuarioEnSesion"));//se carga el usuario en session

//se hace la llamada al evento de carga del documento y verificar la sesion
document.addEventListener("DOMContentLoaded", () => {

    //se recuperan todas las etiquetas que requieran ser ocultadas o mostradas
    //esto por el paso a estar en sesion 
    const elementosConSesion = document.querySelectorAll(".soloParaSesion");
    const elementosSinSesion = document.querySelectorAll(".soloSinSession");

    //verifica que existe un usuario en sesion
    if (usuario !== null) {
        
        elementosConSesion.forEach(elemento => {
            elemento.style.display = "block";
        })//se muestran todos los elementos en sesion

        elementosSinSesion.forEach(elemento => {
            elemento.style.display = "none";
        })//se ocultan todos los elementos que no deban ser visibles ya en la sesion

        const nombreUser = elementosConSesion[0].innerHTML = "<b>En linea:</b>"+usuario.nombre;
    }
})

//este metodo es exclusivamente para cerrar la sesion
//y sacar al usuario del almacenamiento 
const cerrarSesion = () =>{

    sessionStorage.removeItem("usuarioEnSesion");//se remueve la variable
    window.location.href = "./../index.html";//redireccionamineto al index
};