const meses =  ["Enero", "Febrero", "Marzo", "Abril"
                , "Mayo", "Junio", "Julio", "Agosto"
                , "Septiembre", "Octubre", "Noviembre"
                , "Diciembre"];
const dateNow = new Date();
var mesActual = dateNow.getMonth();
var paginaActual = 1;
const filasPorPagina = 5;
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
let usuarios = JSON.parse(localStorage.getItem("usuriosRegistrados")) ?? [];
const usuarioAgendando = JSON.parse(sessionStorage.getItem("usuarioEnSesion"));

document.addEventListener("DOMContentLoaded",() => {
    //visualizacion para el agendado de citas
    const especialidadCita = document.getElementById("especializacion");
    especialidadCita.addEventListener("change",() => {
        
        medicosDiponiblesParaCita(medicos, especialidadCita.value.trim());
    })

    medicosDiponiblesParaCita(medicos, especialidadCita.value.trim());

    cargarCalendario(dateNow.getFullYear(),mesActual);

    visualizacionCitas(usuarioAgendando.historiaCitas);

    mostrarPagina(usuarioAgendando, medicos, paginaActual)
})//metodo de 

const cargarCalendario = (anio, mes) => {

    document.getElementById('mes').innerHTML = meses[mes];
    document.getElementById('anio').innerHTML = anio;

    const diasTabla = document.getElementById('dias');

    let primerDia = new Date(anio, mes, 1).getDay() - 1;
    let ultimoDia = new Date(anio, mes + 1, 0).getDate();

    for (let i = -primerDia, j = 0; i < (42 - primerDia); i++, j++) {

        let fechaTabla = new Date(anio, mes, i);
        let diaTabla = diasTabla.getElementsByTagName('td')[j];

        diaTabla.classList.remove("mesAnterior");
        diaTabla.classList.remove("siguienteMes");

        diaTabla.innerHTML = fechaTabla.getDate();

        let fechaCelda = fechaTabla.getFullYear()+"-"
            +('0' + (fechaTabla.getMonth() + 1)).slice(-2)+"-"
            +('0' + fechaTabla.getDate()).slice(-2);

        diaTabla.setAttribute('data-value', fechaCelda);

        if (i < 1) {
            diaTabla.classList.add("mesAnterior");
        }

        if (i > ultimoDia) {
            diaTabla.classList.add("siguienteMes");
        }
    }
}

const visualizacionCitas = (citas) => {

    const dias = document.querySelectorAll('td')

    dias.forEach(datoDia => {

        citas.forEach(cita => {
          
            datoDia.classList.remove(cita.estado);
            if (cita.fecha == datoDia.getAttribute("data-value")) {

                
                datoDia.classList.add(cita.estado);
            }
        });
        
    });
}

//medicos seleccionables
const medicosDiponiblesParaCita = (medicos, especialidadBuscada) => {

    //se accede el combo box de opciones medicas
    const combo = document.getElementById("medicosDisponibles");
    combo.innerHTML = "";//se limpia el contenido anterior

    medicos.forEach(medico => {
        
        if (medico.especialidad == especialidadBuscada) {
         
            //se agragan las oppciones coincidentes
            combo.innerHTML += `<option value=${medico.identificacion}>${medico.nombre+" "+medico.apellidos}</option>`;
        }
    })
}



//agendar cita
const agendarCita = () => {

    const cita = optenerInfoCita();

    if (cita != null) {
        
        if (!verificaSolapamiento(usuarios,cita)) {
            
            usuarioAgendando.historiaCitas.push(cita);
            guradarCambiosEnLaSesion(usuarioAgendando, usuarios);
            alert("Agendado con exito");
        }else{

            alert("Ya existe una cita programada con estos parametros, por favor ajustelos");
        }
    }else{

        alert("Informacion de cita incorrecta");
    }
}

const cancelarCita = () => {

    const citaAEliminar = optenerInfoCita();

    if (citaAEliminar != null) {
        
        const listaCitas = usuarioAgendando.historiaCitas;

        for (let index = 0; index < listaCitas.length; index++) {
            
            if (verificarCitasIguales(citaAEliminar, listaCitas[index])) {
                listaCitas[index].estado = "CA";
                break
            }
        }

        guradarCambiosEnLaSesion(usuarioAgendando, usuarios);
        alert("Cita cancelada");
    }

}



//manipulacion de html
const verificarCitasIguales = (citaAEliminar, citaRecuperada) => {

    // Iterar sobre las propiedades de citaAEliminar
    for (let clave in citaAEliminar) {
        // Verificar si la propiedad existe en citaRecuperada y si los valores son diferentes
        if (!(clave in citaRecuperada) || citaAEliminar[clave] !== citaRecuperada[clave]) {
            return false;
        }
    }
    // Si todas las propiedades son iguales, retornar true
    return true;
}

const verificaSolapamiento = (usuarios, citaAVerificar) => {

    for (let i = 0; i < usuarios.length; i++) {
            
        for (let j = 0; j < usuarios[i].historiaCitas.length; j++) {
            
            let citaRecuperada = usuarios[i].historiaCitas[j];
            if (verificarCitasIguales(citaAVerificar,citaRecuperada)) return true;
        }
    }

    return false;
}

const optenerInfoCita = () => {

    const fecha = document.getElementById("dia").value.trim();
    const hora = document.getElementById("hora").value.trim();
    const medico = document.getElementById("medicosDisponibles").value.trim();
    const especialida = document.getElementById("especializacion").value.trim();

    if (fecha == "" || hora == "") {
        alert("Dia invalido o hora invalido")
        return null;

    }else{

        return cita = {fecha:fecha, hora:hora, medico:medico, especialida:especialida, estado: "AG"}   
    }
}

const loadNextMonth = () => {
    mesActual = (mesActual + 1) % meses.length;
    cargarCalendario(dateNow.getFullYear(), mesActual);
}

const loadPrevMonth = () => {
    mesActual = (mesActual + meses.length - 1) % meses.length;
    cargarCalendario(dateNow.getFullYear(), mesActual);
}




/*metodo historial*/
const mostrarPagina = (usuarioAgendando, medicos, pagina) => {

    //se accede a la tabla de impormacion
    const cuerpo = document.getElementById("información");
    cuerpo.innerHTML = "";//se limpia el contenido anterior
    //se calcula la seccion del arreglo que se va amostrar segun la pagina
    const inicio = (pagina - 1) * filasPorPagina;
    const fin = inicio + filasPorPagina;
    //se crea un arreglo que contendra la seccion cortada del arreglo principal
    const citas = usuarioAgendando.historiaCitas.slice(inicio, fin);

    citas.forEach(cita => {
        
        let medicoDeCita = null;
        for (let index = 0; index < medicos.length; index++) {
            
            if (cita.medico === medicos[index]. identificacion) {
                medicoDeCita = medicos[index];
                break;
            }           
        }
        
        //se crean todas las eqtiqquetas para llenar la tabla con los valores basicos
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${cita.fecha}</td>
            <td>${cita.hora}</td>
            <td>${cita.medico} <br> ${medicoDeCita.nombre} ${medicoDeCita.apellidos}</td>
            <td>${medicoDeCita.ubicacion}</td>
            <td>${medicoDeCita.especialidad}</td>
            <td>${cita.estado}</td>
        `;
        cuerpo.appendChild(fila);
    });

}

//pasar la pagina de informacion
const cargarPaginaSiguiente = () => {
    if (paginaActual < Math.ceil(medicosOrdenadosYFiltrados.length / filasPorPagina)) {//se verifica si la pagina actual se puede seguir pasando
        paginaActual++;
        mostrarPagina(medicosOrdenadosYFiltrados,paginaActual);
    }
}

const cargarPaginaAnterior = () => {
    if (paginaActual > 1) {//se puede regresar mientra la pagina actual sea mayor a 1
        paginaActual--;
        mostrarPagina(medicosOrdenadosYFiltrados,paginaActual);
    }
}

//guardar lo cambios
const guradarCambiosEnLaSesion = (usuarioAgendando, usuarios) => {

    sessionStorage.setItem("usuarioEnSesion",JSON.stringify(usuarioAgendando));//gurada los cambios

    for (let index = 0; index < usuarios.length; index++) {
       
        if (usuarios[index].userId === usuarioAgendando.userId) {
            usuarios[index] = usuarioAgendando;
            break;
        } 
    }

    localStorage.setItem("usuriosRegistrados",JSON.stringify(usuarios));
}