let usuarios = JSON.parse(localStorage.getItem("usuriosRegistrados")) ?? [];
//carga el contenido del local storage 
//y en caso de ser null este sera una arreglo vacio
var concidenciaContra = false;
let intentos = 0;

//metodo para dar la propiedad al formulario de evento desencadenador
document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("formulario");
    //metodo que da al formulario la propiedad de ejecutar un evento
    formulario.addEventListener("submit", () => {

        event.preventDefault();
        //se optiene el valor del submit para saber que tipo de formulario de usuario es
        const tipoIni = document.getElementById("eviarDatosForm").value.trim();
        console.log("entre"+tipoIni)
        //acciones para inicio de session
        if (tipoIni == "Iniciar Sesion") {
            
            if (intentos >= 5) {
                alert("Limite de intentos excedido");
                window.location.href = "./../index.html"//redireccionamiento al inicio
            }//verifica los intentos restantes para que el usuario pueda ingresar

            let usuario = obtenerUsuarioIngresando();
            const valido = validarFormatoId(usuario) && validarContrasenia(usuario);

            //se verifica que el usuario este registrado y que la pasww sea correcta
            if (valido) {

                encriptarContrasena(usuario)
                .then(hash => {
                    
                    usuario.userPassword = hash;//cambia la pasw por el hash adecuado
                    const registradoPrevio = verificarRegistrado(usuarios, usuario); 
                    usuario = verificarContra(usuarios, usuario);
                    
                    if (registradoPrevio && usuario != null) {
    
                        //se almacena el usuario que inicia session en el session storage
                        sessionStorage.setItem("usuarioEnSesion",JSON.stringify(usuario));//gurada los cambios
                        manejarExito();
                        window.location.href = "./../index.html"//redireccionamiento al inicio
                    }else{
                        intentos++;
                        manejarError();    
                    }
                })
                .catch(error => {
                    console.error('Error al encriptar la contraseña:', error);
                })
            } else {
                manejarError();
            }
            // El hash resultante se almacena en la variable 'hash' y se cambia con la pasw del usuario

            //acciones de registro
        } else if (tipoIni == "Registrar") {
    
            //se optienen todos los valores de los usuarios
            const usuario = obtenerNuevoUsuario();
            //se verifican todos los requerimientos y condiciones en los valores
            const valido = validarFormatoId(usuario) && validarLongitudNombre(usuario) 
            && validarLongitudApellidos(usuario) && validarNumeroCelular(usuario) 
            && validarFormatoCorreo(usuario) && validarContrasenia(usuario)
            && concidenciaContra;

            //se verifica que el usuario no este registrado y sea valido
            if (valido) {
                
                //varificacion de que el usuario sea nuevo y no este registrado
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
                        manejarExito();
                        window.location.href = "./../html/inicioSesion.html"//redirecciona la pagiana
                    })
                    .catch(error => {
                        console.error('Error al encriptar la contraseña:', error);
                    });
                }else{
                    manejarError();
                }

            } else {
                manejarError();
            }
        }
        
    })

    //se intenta llamar a el componente de verificacion de contrasenia
    const espacioVali = document.getElementById("verificarPassword");
    if (espacioVali != null) {//se verifica si existe
        
        //recupera el input de la password
        const espacioPasw = document.getElementById("password");

        //el espacio de validacion verifica al espacio de contra y viceverza
        espacioVali.addEventListener("input", () => {

            contraseniasIguales(espacioPasw.value.trim(), espacioVali.value.trim());
        })

        espacioPasw.addEventListener("input", () => {
            
            contraseniasIguales(espacioPasw.value.trim(), espacioVali.value.trim());
        })

    }
})

const obtenerNuevoUsuario = () => {

    const id = document.getElementById("id").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const email = document.getElementById("email").value.trim();
    const password =document.getElementById("password").value.trim();

    const usuario = {
        userId: id,
        userNombre: nombre,
        userApellido: apellidos,
        userTelefono: telefono,
        userEmail: email,
        userPassword: password,
        historiaCitas:[]
    };

    return usuario;
}

const obtenerUsuarioIngresando = () => {

    const id = document.getElementById("id").value.trim();
    const password = document.getElementById("password").value.trim();
    
    const usuario = {
        userId: id,
        userPassword: password,
    };
    console.log(usuario)
    return usuario;
}

const validarFormatoId = (usuario) => {
 
  return /^\d{2}-\d{4}-\d{4}$/.test(usuario['userId']);
}

const validarLongitudNombre = (usuario) => {

   return /^[a-zA-Z]{1,20}$/.test(usuario['userNombre']);
}

const validarLongitudApellidos = (usuario) => {

   return /^[A-Za-z ]{1,30}$/.test(usuario['userApellido']);
}

const validarNumeroCelular = (usuario) => {

    return /^\d{4}-\d{4}$/.test(usuario['userTelefono']);
}

const validarFormatoCorreo = (usuario) => {

   return /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/.test(usuario['userEmail']);
}

const validarContrasenia = (usuario) => {
    return /^[^\s](?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,11}$/.test(usuario['userPassword']);
}

const contraseniasIguales = (campoContra1, campoContra2) => {

    //toma la etiqueta de verificacion y hace visible segun conveniencia
    let etiquetaVerificacion = document.getElementById("noIguales");

    //valida que los valores sean iguales
    if (campoContra1 === campoContra2) {
        etiquetaVerificacion.style.display = "none";
        concidenciaContra = true;
    } else {
        etiquetaVerificacion.style.display = "block";
        concidenciaContra = false;
    }
}

const guardarSesion = (usuario,valido) => {

    if (valido) {//guarda la sesion nueva en el sesion storage para manejar el acceso a la agenda de cita
        usuarioEnSesion = usuario;
        localStorage.setItem("usuarioEnSesion",usuarioEnSesion);
        window.location.href = "./../index.html";
        manejarExito();
    } else {
        manejarError();
    }
};

const verificarRegistrado = (usuarios, usuarioAValidar) => {

    //este for se utiliza para verificar si el usuario esta colocando una identificacion que ya existe
    for (let index = 0; index < usuarios.length; index++) {
        
        if (usuarios[index].userId === usuarioAValidar.userId) return true;
    }
    return false;
}

const verificarContra = (usuarios, usuarioAValidar) => {

    //a la hora de iniciar sesion se verifica que la contrasenia que ya exito
    for (let index = 0; index < usuarios.length; index++) {
        console.log(usuarios[index].userPassword)
        console.log(usuarioAValidar.userPassword)
        if (usuarios[index].userPassword === usuarioAValidar.userPassword) return usuarios[index];
    }
    return null;
}

const encriptarContrasena = async (usuario) => {
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

const manejarExito = () => {
    alert("Proceso realizado con exito");
};

const manejarError = () => {
    alert("Los datos ingresados no son válidos");
};
