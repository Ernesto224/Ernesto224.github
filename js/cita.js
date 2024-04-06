const meses =  ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
//los meses se utilizan para representarlos en el calendario
const medicos = [
    {
        nombre: "Ana",
        apellidos: "Rivera",
        especialidad: "Odontología",
        ubicacion: "Turrialba",
        identificacion: "30-4566-0463",
        horarioConsulta: "9:50am a 6:50pm",
        telefono: "8656-1544",
        correo:"AnaRivera@gmail.com",
        biografia:"Especialista en odontología general y estética. Más de 10 años de experiencia. Miembro de la Asociación Dental Americana.",
        resenias:[
            {
                correo:"miguel@gmail.com",
                escribe:"Excelente medico muy profecional",
                calificacion:5
            }
        ]
    },
    {
        nombre: "Elena",
        apellidos: "Martínez",
        especialidad: "Dermatología",
        ubicacion: "San José",
        identificacion: "25-4879-4231",
        horarioConsulta: "10:00am a 7:00pm",
        telefono: "8745-2312",
        correo: "ElenaMartinez@gmail.com",
        biografia: "Especialista en dermatología clínica y estética. Experta en el tratamiento de acné, eczema, psoriasis y cáncer de piel. Miembro de la Academia Española de Dermatología y Venereología.",
        resenias: [
            {
                correo: "maria@gmail.com",
                escribe: "La Dra. Martínez es una excelente profesional, me ha ayudado mucho con mi problema de acné.",
                calificacion: 5
            }
        ]
    },
    {
        nombre: "Carlos",
        apellidos: "García",
        especialidad: "Cardiología",
        ubicacion: "Turrialba",
        identificacion: "12-3456-7789",
        horarioConsulta: "8:00am a 12:00pm",
        telefono: "8832-1678",
        correo: "CarlosGarcia@gmail.com",
        biografia: "Especialista en cardiología clínica e intervencionista. Experto en el diagnóstico y tratamiento de enfermedades cardíacas. Miembro del Colegio Americano de Cardiología.",
        resenias: [
            {
                correo: "pedro@gmail.com",
                escribe: "El Dr. García es un médico muy atento y profesional, me ha ayudado mucho con mi problema cardíaco.",
                calificacion: 5
            }
        ]
    },
    {
        nombre: "Sofía",
        apellidos: "Pérez",
        especialidad: "Optometría",
        ubicacion: "San José",
        identificacion: "98-7654-4321",
        horarioConsulta: "2:00pm a 8:00pm",
        telefono: "8921-4567",
        correo: "SofiaPerez@gmail.com",
        biografia: "Especialista en optometría y terapia visual. Experta en la evaluación y corrección de la visión. Miembro de la Asociación Americana de Optometría.",
        resenias: [
            {
                correo: "ana@gmail.com",
                escribe: "La Dra. Pérez es una excelente profesional, me ha ayudado mucho con mi problema de visión.",
                calificacion: 5
            }
        ]
    },
    {
        nombre: "Ana",
        apellidos: "Pérez",
        especialidad: "Optometría",
        ubicacion: "San José",
        identificacion: "98-7654-7321",
        horarioConsulta: "2:00pm a 8:00pm",
        telefono: "8921-4517",
        correo: "Sofia@gmail.com",
        biografia: "Especialista en optometría y terapia visual. Experta en la evaluación y corrección de la visión. Miembro de la Asociación Americana de Optometría.",
        resenias: [
            {
                correo: "ana@gmail.com",
                escribe: "La Dra. Pérez es una excelente profesional, me ha ayudado mucho con mi problema de visión.",
                calificacion: 5
            },
            {
                correo: "Eva@gmail.com",
                escribe: "La Dra. Pérez es una excelente profesional, me ha ayudado mucho con mi problema de visión.",
                calificacion: 4
            }
        ]
    },
    {
        nombre: "Carmen",
        apellidos: "Rodriguez",
        especialidad: "Optometría",
        ubicacion: "Turrialba",
        identificacion: "88-7654-7321",
        horarioConsulta: "2:00pm a 8:00pm",
        telefono: "8921-4567",
        correo: "Sofia@gmail.com",
        biografia: "Especialista en optometría y terapia visual. Experta en la evaluación y corrección de la visión. Miembro de la Asociación Americana de Optometría.",
        resenias: [
            {
                correo: "ana@gmail.com",
                escribe: "La Dra. Rodriguez es una excelente profesional, me ha ayudado mucho con mi problema de visión.",
                calificacion: 5
            }
        ]
    }
]
const dateNow = new Date();
const citas = JSON.parse(localStorage.getItem("citasAgendadas")) ?? [];//se carga la lista de citas
const usuarioAgendando = JSON.parse(sessionStorage.getItem("usuarioEnSesion"));//se carga el usuario en sesion
var mesActual = dateNow.getMonth();

document.addEventListener("DOMContentLoaded",() => {

    //este combo se utliza para cargar los medicos de forma dinamica segun la especialida
    //este representa el combo de el formulario principal
    const especialidad = document.getElementById("especializacion");
    especialidad.addEventListener("change",() => {
     
        const combo = document.getElementById("medicosDisponibles");
        medicosDisponibles(medicos, especialidad.value.trim(),combo);
    })

    //este combo representa el que esta en el modal y que se usa para editar citas
    //pero en esencia su evento cumple la misma funcion que el anterior
    const especialidadCita = document.getElementById("especializacionCita");
    especialidadCita.addEventListener("change", () => {
        
        const combo = document.getElementById("medicosCita");
        medicosDisponibles(medicos, especialidadCita.value.trim(),combo);
    })

    //se coloca un evento a la tabla para que se pueda desplegar un modal con la informacion de la cita
    const tablaCalendario = document.getElementById("tablaCalendario");
    tablaCalendario.addEventListener("click",(evento) => {

        evento.stopPropagation();//detine la posibilidad de muchos eventos simultaneos

        //se verifica que el subcomponente clicleado sea un td
        if (evento.target.matches("td")) {
           
            //se busca la cita en base al id del usuario y a la fecha agendada
            const citaVisualizar = buscarCita(usuarioAgendando, evento.target.getAttribute("data-value"));
            if (citaVisualizar !== null) {
                cargarDatosPerfil(citaVisualizar);
            }
        }//verifica que se haga clic sobre el boton de perfil y no sombre la tabla como tal
    })

    //se le asigna un evento al boton de cierre de la ventana modal
    const cerrarModal = document.getElementById("btnCerrar");
    cerrarModal.addEventListener("click",() => {

        cerrarModalPerfil();
    })

    //se cargan por primera vez los elemtos necesarios
    medicosDisponibles(medicos, especialidad.value.trim(), document.getElementById("medicosDisponibles"));
    cargarCalendario(dateNow.getFullYear(),mesActual);
    marcarCitas();
})

//Metodo de manipulacion de citas
const agendarCita = () => {

    const cita = optenerInfoCitaNueva();

    //se verifica que la cita exista
    //que esta no se repita y que la fecha sea valida
    //y que la hora este dentro del orario de trabajo de la clinica
    if (cita != null && !verificarSolapamientoYSemanaLaboral(citas, cita)
        && !verificaHorarios(cita)) {
        
        citas.push(cita);//se agrega la cita al arreglo
        guardarCambios();//se guardan los cambios en el local y session storage
        marcarCitas();//se recarga el calendario
        manejarExito("Cita agendada en espera de confirmacion");
    }else{
        manejarError("Informacion de cita invalida");
    }
}

const cancelarCita = () => {

    //se optiene la informacion que fue almacenada en el formulario modal para 
    //poder cancelar la cita
    const fechaCita = document.getElementById("formularioCitas").getAttribute('data-value');
    //se busca la cita utilizando como identificador
    //el id del usuario y la fecha de agenda
    const cita = buscarCita(usuarioAgendando, fechaCita);
    if (cita != null) {

        //se cambia el estado de la cita
        cita.estado = "CA";

        guardarCambios();//se guardan los cambios
        marcarCitas();//se refresca el calendario
        cerrarModalPerfil();//se cierra el modal
        manejarExito("Cita cancelada");
    }else{
        manejarError("Error al recopilar informacion");
    }
}

const modificarCita = () =>{

    const cita = optenerInfoCitaModal();//se optiene la informacion de la cita del modal
    //carga la fecha de la cita que fue almacenada en un atributo del formulario
    const fechaCita = document.getElementById("formularioCitas").getAttribute('data-value');

    //se verifica que la cita exista
    //que esta no se repita y que la fecha sea valida
    //y que la hora este dentro del horario de trabajo de la clinica
    if (cita != null && !verificarSolapamientoYSemanaLaboral(citas, cita)
        && !verificaHorarios(cita)) {

        //se busca la cita en el arreglo para poder actualizar la 
        //informacion de citaRecuperada
        const citaRecuperada = buscarCita(usuarioAgendando, fechaCita);

        //recorremos todas las propiedades de los objetos
        for (let clave in cita) {
        
            citaRecuperada[clave] = cita[clave];
        }

        guardarCambios();//se guardan los cambios
        marcarCitas();//se refresca el calendario
        cerrarModalPerfil();//se cierra el modal
        manejarExito("La cita fue modificada")
    } else {
        manejarError("Los datos de modificacion no son validos");
    }
}

//Metodos para optener la informacion de las citas
const optenerInfoCitaNueva = () => {

    //se toma toda la informacion de la cita de los inputs
    //del formulario principal de agenda
    const fecha = document.getElementById("dia").value.trim();
    const hora = document.getElementById("hora").value.trim();
    const medico = document.getElementById("medicosDisponibles").value.trim();
    const especialida = document.getElementById("especializacion").value.trim();

    if (fecha === "" || hora === "") {

        manejarError("La fecha o hora esta vacia");
        return null;
    }else{
        //se crea el objeto cita para enviarlo
        return citaNueva = {usuario: usuarioAgendando.cedula, fecha:fecha, hora:hora, medico:medico, especialidad:especialida, estado: "AG"};   
    }
}

const optenerInfoCitaModal = () => {

    //se carga la informacion de las cita que se va a 
    //editar, en este caso con los inputs del modal 
    const fecha = document.getElementById("diaCita").value.trim();
    const hora = document.getElementById("horaCita").value.trim();
    const medico = document.getElementById("medicosCita").value.trim();
    const especialida = document.getElementById("especializacionCita").value.trim();

    if (fecha === "" || hora === "") {

        manejarError("La fecha o hora esta vacia");
        return null;
    }else{
        //se crea un objeto cita
        return citaNueva = {usuario: usuarioAgendando.cedula, fecha:fecha, hora:hora, medico:medico, especialidad:especialida, estado: "AG"};   
    }
}

const buscarCita = (usuarioAgendando, fechaCita) => {

    //este metodo realiza una busqueda secuencial en la lista de citas 
    //y ustiliza al usuario(su cedula) y la fecha de la cita como 
    //identificadores
    for (let index = 0; index < citas.length; index++) {
        
        //se realiza la comparacion
        if (citas[index].usuario === usuarioAgendando.cedula 
            && citas[index].fecha === fechaCita) {
            
            return citas[index];
        }
    }
    return null;
}

const buscarMedicoCita = (identificacion) => {

    //este metodo hace una busqueda secuencial en el arreglo de medicos 
    //para encontrar saber que medico es el seleccionado para la cita en el modal
    //esta informacion es para la edicion
    for (let index = 0; index < medicos.length; index++) {
        
        if(medicos[index].identificacion === identificacion) return medicos[index];
    }
    return null;
}

//guardado de informacion
const guardarCambios = () => {
    localStorage.setItem("citasAgendadas",JSON.stringify(citas));
}

//metodos de cargado de informacion
const cargarCalendario = (anio, mes) => {

    //se establece en el titulo del calendario
    //el mes y el anio actual
    document.getElementById('mes').innerHTML = meses[mes];
    document.getElementById('anio').innerHTML = anio;

    //se localiza el cuerpo de la tabla
    const diasTabla = document.getElementById('dias');

    //se establece el primer dia de la semana de ese mes
    let primerDia = new Date(anio, mes, 1).getDay() - 1;
    //se establece cuando comienza el proximo mes
    let ultimoDia = new Date(anio, mes + 1, 0).getDate();

    //se recorren las 42 etiquetas td del cuerpo
    //el indice i comienza el primer dia de la semana, 
    //o en el mes anterior en caso de no empezar domiendo
    for (let i = -primerDia, j = 0; i < (42 - primerDia); i++, j++) {

        //utilizando el objeto date optendremos el numero
        //del dia correspondiente a la tabla
        let fechaTabla = new Date(anio, mes, i);
        //se utiliza la j como indice para las 42 etiquetas del cuerpo
        let diaTabla = diasTabla.getElementsByTagName('td')[j];

        //se quita la clase a las etiquetas para 
        //que no se marquen como parte del mes anterior 
        //en caso de no serlo
        diaTabla.classList.remove("mesAnterior");
        diaTabla.classList.remove("siguienteMes");

        //se inserta en el td el numero de dia
        diaTabla.innerHTML = fechaTabla.getDate();

        //se le coloca un valor al td relativo a su fecha
        //exacta para que sea mas facil marcalo en caso
        //de que se agende una cita ese dia
        let fechaCelda = fechaTabla.getFullYear()+"-"
            +('0' + (fechaTabla.getMonth() + 1)).slice(-2)+"-"
            +('0' + fechaTabla.getDate()).slice(-2);
        diaTabla.setAttribute('data-value', fechaCelda);

        //se determina si el idice se refiere a un dia del mes anterior
        if (i < 1) {
            diaTabla.classList.add("mesAnterior");
        }
        //se determina si ya el indice supero el mes en cuestio
        //y marca la etiqueta para el sigMes
        if (i > ultimoDia) {
            diaTabla.classList.add("siguienteMes");
        }
    }
}

const cargarDatosPerfil = (cita) => {

    const modal = document.getElementById("fondoModal");//optenemos la etiqueta modal
    const contenidoModal =  modal.children[0].children[0];//optenemos el espacio de contenido
    const medico = buscarMedicoCita(cita.medico);//se busca la informacion del medico de la cita

    contenidoModal.innerHTML = "";//se limpia el modal

    //se insertan los datos basicos de la cita en el modal
    contenidoModal.insertAdjacentHTML("afterbegin",`
        <h2>Informacion Cita</h2>
        <p> <b>Fecha: </b>${cita.fecha} 
        <br><b>Hora: </b>${cita.hora} 
        <br><b>Estado: </b>${cita.estado}
        <br> <b>Medico: </b> ${"Dr. "+medico.nombre+" "+medico.apellidos} 
        <br><b>Identificacion: </b> ${medico.identificacion}
        <br><b>Lugar: </b>${medico.ubicacion} 
        <br><b> Especialidad: </b>${medico.especialidad}<p/>`);


    //se carga una previu de los datos existentes del modal
    //para poder editar este
    const formulario = document.getElementById("formularioCitas");

    //en caso de que la cita sea aceptada o cancelada no se puede editar
    if (cita.estado === "AG") {
        //se hace set del dia agendado para recuperar la cita
        //en caso de modificaciones
        formulario.setAttribute('data-value', cita.fecha)

        //se despliega el formulario
        formulario.style.display = "block"

        //se hace set de la fecha en el input
        const fecha = document.getElementById("diaCita");
        fecha.value = cita.fecha;
        //se hace set de la hora en el input
        const hora = document.getElementById("horaCita");
        hora.value = cita.hora;
        //se hace set de la especialidad agendada en el combo
        const especialidad = document.getElementById("especializacionCita");
        const opcionSeleccionada = especialidad.querySelector(`option[value="${cita.especialidad}"]`);
        if (opcionSeleccionada) opcionSeleccionada.selected = true;
        //cargan las opciones de medicos disponibles para modificar la cita
        const medicosDis = document.getElementById("medicosCita");
        medicosDisponibles(medicos, especialidad.value.trim(), medicosDis)
    }else{
        formulario.style.display = "none"
    }

    modal.style.display = "flex";//se cambia la propiedad display para mostrar el modal
}

const marcarCitas = () => {

    const dias = document.querySelectorAll('td');//se recolectan todas etiquetas td 
    //se recorren todas la etiquetas
    dias.forEach(datoDia => {
        //para refrescar el calendario
        //y marcar las citas agendadas
        //del sigMes se quita la calse de estado de cita a los td
        datoDia.classList.remove("AG");
        datoDia.classList.remove("CA");
        datoDia.classList.remove("AC");
        //se recorre el arreglo de citas para saber si este td debe
        //ser marcado como una cita agendada, para esto se usa el
        //valor indicador de fecha colocado en el metodo cargar calendario
        citas.forEach(cita => {
            
            //se comparan los valores usados como clave
            if (cita.usuario == usuarioAgendando.cedula
                && cita.fecha == datoDia.getAttribute("data-value")) {

                //se agrega la clase de estado al td
                datoDia.classList.add(cita.estado);
            }
        })
    })
}

const medicosDisponibles = (medicos, especialidad, combo) => {

    combo.innerHTML = "";//se limpia el contenido anterior

    //se filtra el arreglo de medicos para enviar sus datos
    //y que estos puedan ser seleccionados segun la especialidad
    medicos.forEach(medico => {
        
        if (medico.especialidad === especialidad) {
         
            //se agragan las opciones coincidentes al combo
            //la identificacion se usa como referencia para encontrar al medico
            combo.innerHTML += `<option value=${medico.identificacion}>${medico.nombre+" "+medico.apellidos}</option>`;
        }
    })
}

const cerrarModalPerfil = () => {

    //se llama a la ventana modal
    const modal = document.getElementById("fondoModal");

    //se utiliza la pripiedad css none para ocultar
    modal.style.display = "none";
}

//metodos de desplazamiento del calendario
const cargarMesSiguiente = () => {
    //se determina el mes siguiente y se vuelve a cargar el calendario
    mesActual = (mesActual + 1) % meses.length;
    cargarCalendario(dateNow.getFullYear(), mesActual);
    marcarCitas();
}

const cargarMesAnterior = () => {
    //se determina el mes anterior y se vuelve a cargar el calendario
    mesActual = (mesActual + meses.length - 1) % meses.length;
    cargarCalendario(dateNow.getFullYear(), mesActual);
    marcarCitas();
}

//metodos de verificacion y validacion
const verificarSolapamientoYSemanaLaboral = (citas, cita) => {

    //se utiliza el objeto date para poder compara la fecha
    //y determinar en que dia se lleva a cabo
    const fechaCita = new Date(cita.fecha);

    if (fechaCita < dateNow) {

        return true;
    }//valida solo citas superiores al dia actual

    console.log(fechaCita.getDay())
    if (fechaCita.getDay() === 6) {
        
        return true;
    }//valida que no se agenden citas los domingos*/

    for (let index = 0; index < citas.length; index++) {
        
        if (citas[index].usuario === cita.usuario 
            && citas[index].fecha === cita.fecha) {
            
            return true;
        }
    }//valida que no se solapen las citas un mismo dia a la misma hora y con el mismo medico

    for (let index = 0; index < citas.length; index++) {
        
        if (citasIguales(citas[index], cita)) {
            
            return true;
        }
    }//valida que no se solapen las citas un mismo dia a la misma hora y con el mismo medico

    return false;
}

const verificaHorarios = (citaAVerificar) => {

    //crea un objeto date para poder manipular la hora 
    //de la cita
    const fechaCita = new Date(citaAVerificar.fecha);
    const hora = citaAVerificar.hora.split(":");
    fechaCita.setHours(parseInt(hora[0]));
    fechaCita.setMinutes(parseInt(hora[1]));

    if (fechaCita.getHours() > 16 || fechaCita.getHours() < 8) {
        return true;
    }///se valida que no se agende una cita fuera del rango de trabajo
    
    if (fechaCita.getDay() == 5 && (fechaCita.getHours() < 8 || fechaCita.getHours() > 11)) {
        return true;
    }///se valida que no se agende una cita fuera del rango de trabajo

    return false;
}

const citasIguales = (cita1, cita2) => {

    // Iterar sobre las propiedades ambas citas para saber si son iguales
    //esto no contempla que sean del mismo usuario
    //ni su estado
    const claves = Object.keys(cita1);
    for (let index = 1; index < claves.length-1; index++) {

        if (cita1[claves[index]] !== cita2[claves[index]]) {
            return false;
        }
    }
    return true;
}

//mensajes del usuario
const manejarExito = (mensaje) => {
    alert(mensaje);
};

const manejarError = (mensaje) => {
    alert(mensaje);
};


