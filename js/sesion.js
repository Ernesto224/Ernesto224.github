const usuario = JSON.parse(sessionStorage.getItem("usuarioEnSesion"));

//se hace la llamada al evento de carga del documento y verificar la sesion
document.addEventListener("DOMContentLoaded", () => {

    const elementosConSesion = document.querySelectorAll(".soloParaSesion");
    const elementosSinSesion = document.querySelectorAll(".soloSinSession");

    if (usuario !== null) {
        
        elementosConSesion.forEach(elemento => {
            elemento.style.display = "block";
        })

        elementosSinSesion.forEach(elemento => {
            elemento.style.display = "none";
        })

    }//verifica si hay un usuario en session
})

const cerrarSesion = () =>{

    sessionStorage.removeItem("usuarioEnSesion");
    window.location.href = "./../index.html";
};