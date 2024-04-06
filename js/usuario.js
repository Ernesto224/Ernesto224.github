const usuarios = JSON.parse(localStorage.getItem("usuriosRegistrados")) ?? [];
//carga el contenido del local storage 
//y en caso de ser null este sera una arreglo vacio
var concidenciaContra = false;
var intentos = 0;

//metodo para dar la propiedad al formulario de evento desencadenador
document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("formulario");
    //metodo que da al formulario la propiedad de ejecutar un evento
    formulario.addEventListener("submit", () => {

        //se evita la accion por defecto del boton submit
        event.preventDefault();

        //se optiene el valor del submit para saber que tipo de formulario de usuario es
        const tipoIni = document.getElementById("eviarDatosForm").value.trim();

        //acciones para inicio de session
        if (tipoIni === "Iniciar Sesion") {
            
            if (intentos >= 5) {
                alert("Limite de intentos excedido");
                window.location.href = "./../index.html"//redireccionamiento al index
            }//verifica los intentos restantes para que el usuario pueda ingresar

            //se verifica que los datos sean adecuados
            let usuario = obtenerUsuarioIngresando();
            const valido = validarFormatoId(usuario) && validarContrasenia(usuario);
            if (valido) {

                encriptarContrasena(usuario)
                .then(hash => {
                    
                    usuario.userPassword = hash;//cambia la pasw por el hash adecuado
                    const registradoPrevio = verificarRegistrado(usuarios, usuario);//verifica si el usuario esta registrado 
                    usuario = verificarContra(usuarios, usuario);
                    
                    //se verifica que el usuario este registrado y que la pasww sea correcta
                    if (registradoPrevio && usuario != null) {
    
                        //se almacena el usuario que inicia session en el session storage
                        sessionStorage.setItem("usuarioEnSesion",JSON.stringify(usuario));//gurada los cambios
                        window.location.href = "./../index.html"//redireccionamiento al index
                        manejarExito("Ingreso exitoso")
                    }else{
                        intentos++;
                        manejarError("El usuario no esta registrado o la contraseña es invalida");    
                    }
                })
                .catch(error => {
                    console.error('Error al encriptar la contraseña:', error);
                })
            } else {
                manejarError("Verifique los datos ingresados");
            }

            //acciones de registro
        } else if (tipoIni === "Registrar") {
    
            //se optienen todos los valores de los usuarios nuevos
            const usuario = obtenerNuevoUsuario();
            //se verifican todos los requerimientos y condiciones en los valores
            const valido = validarFormatoId(usuario) && validarLongitudNombre(usuario) 
            && validarLongitudApellidos(usuario) && validarNumeroCelular(usuario) 
            && validarFormatoCorreo(usuario) && validarContrasenia(usuario)
            && concidenciaContra;

            //se verifica que el usuario no este registrado y sea valido
            if (valido) {
                
                //verificacion de que el usuario sea nuevo y no este registrado previamente
                const registradoPrevio = verificarRegistrado(usuarios, usuario); 

                if (registradoPrevio === false) {

                    //el metodo de encriptacion se realiza de forma asincronica 
                    //asi que los procesos siguientes estan sujestos a el metodo
                    encriptarContrasena(usuario)
                    .then(hash => {
                        
                        // El hash resultante se almacena en la variable 'hash' y se cambia con la pasw del usuario
                        usuario.userPassword = hash;
                        usuarios.push(usuario);//agrega al usuario registrado a la lista
                        localStorage.setItem("usuriosRegistrados",JSON.stringify(usuarios));//gurada los cambios en el local storage
                        window.location.href = "./../html/inicioSesion.html"//redirecciona la pagina de inicio de sesion
                        manejarExito("Registro exitoso");
                    })
                    .catch(error => {
                        console.error('Error al encriptar la contraseña:', error);
                    });
                }else{
                    manejarError("El usurio ya tiene una cuenta");
                }

            } else {
                manejarError("Verifique los datos ingresados");
            }
        }
        
    })

    //se intenta llamar a el componente de verificacion de contrasenia
    const espacioVali = document.getElementById("verificarPassword");
    if (espacioVali != null) {//se verifica si existe
        
        //recupera el input de la password
        const espacioPasw = document.getElementById("password");

        //el espacio de validacion verifica al espacio de contra y viceversa
        espacioVali.addEventListener("input", () => {

            contraseniasIguales(espacioPasw.value.trim(), espacioVali.value.trim());
        })

        espacioPasw.addEventListener("input", () => {
            
            contraseniasIguales(espacioPasw.value.trim(), espacioVali.value.trim());
        })

    }
})

const obtenerNuevoUsuario = () => {

    //se leen los valores de los input
    const id = document.getElementById("id").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    //se crea un objeto implicito usuario
    const usuario = {
        cedula: id,
        nombre: nombre,
        apellido: apellidos,
        telefono: telefono,
        correo: email,
        contrasenia: password
    };

    return usuario;
}//metodo para optener la informacion de un usuario nuevo

const obtenerUsuarioIngresando = () => {

    const id = document.getElementById("id").value.trim();
    const password = document.getElementById("password").value.trim();
    
    const usuario = {
        cedula: id,
        contrasenia: password,
    };

    return usuario;
}//metodo para optener la informacion del inicio de sesion

//metodos de validacion con expreciones regulares
const validarFormatoId = (usuario) => {
  
  //se verifica que cumpla con tener solo numeros en una cantidad especifica
  return /^\d{2}-\d{4}-\d{4}$/.test(usuario.cedula);
}

const validarLongitudNombre = (usuario) => {

    //se verifica que solo incluya caracteres y su rango
   return /^[a-zA-Z]{1,20}$/.test(usuario.nombre);
}

const validarLongitudApellidos = (usuario) => {

    //se valida que contenga caracteres y su longitud
   return /^[A-Za-z ]{1,30}$/.test(usuario.apellido);
}

const validarNumeroCelular = (usuario) => {

    //se valida que poseea numeros y el caracter separador
    return /^\d{4}-\d{4}$/.test(usuario.telefono);
}

const validarFormatoCorreo = (usuario) => {

    //valida que el correo este compuesto por valores alfanumericos y que siga un patron
   return /^[\w-]+@[\w-]+\.[a-zA-Z]{2,}$/ .test(usuario.correo);
}

const validarContrasenia = (usuario) => {

    //verifica que contenga a mayuscula, minuscaula, numeros y caracteres especiales
    return /^[^\s](?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,11}$/.test(usuario.contrasenia);
}

const contraseniasIguales = (campoContra1, campoContra2) => {

    //responde de forma dinamica a lo que se coloca en el input
    //por lo que se puede ir analizando la informacion para saber si es igual

    //toma la etiqueta de verificacion y hace visible segun conveniencia
    let etiquetaVerificacion = document.getElementById("noIguales");

    //valida que los valores sean iguales
    if (campoContra1 === campoContra2) {
        etiquetaVerificacion.style.display = "none";
        concidenciaContra = true;//esta variable definira si ambas son iguales a la hora de registrar
    } else {
        etiquetaVerificacion.style.display = "block";
        concidenciaContra = false;
    }
}

const verificarRegistrado = (usuarios, usuarioAValidar) => {

    //este for se utiliza para verificar si el usuario esta colocando una identificacion que ya existe
    for (let index = 0; index < usuarios.length; index++) {
        
        if (usuarios[index].cedula === usuarioAValidar.cedula) return true;
    }
    return false;
}

const verificarContra = (usuarios, usuarioAValidar) => {

    //a la hora de iniciar sesion se verifica que la contrasenia sea correcta con el usuario 
    for (let index = 0; index < usuarios.length; index++) {

        //se retorna el usuario para pasarlo al session storege
        if (usuarios[index].contrasenia === usuarioAValidar.contrasenia) return usuarios[index];
    }
    return null;
}

//metodo de encriptacion
const encriptarContrasena = async (usuario) => {//este priceso es mediante la api cryto.js
    // Codificar la contraseña como una secuencia de bytes
    const buffer = new TextEncoder().encode(usuario.userPassword);
    
    // Calcular el hash utilizando SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    
    // Convertir el hash a una representación hexadecimal
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    
    // Devolver el hash
    return hashHex;
}

//mensajes del usuario
const manejarExito = (mensaje) => {
    alert(mensaje);
};

const manejarError = (mensaje) => {
    alert(mensaje);
};
