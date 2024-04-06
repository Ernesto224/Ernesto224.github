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
const citas = JSON.parse(localStorage.getItem("citasAgendadas")) ?? [];
const usuarioAgendando = JSON.parse(sessionStorage.getItem("usuarioEnSesion"));

document.addEventListener("DOMContentLoaded",() => {
    //visualizacion para el agendado de citas
    const especialidad = document.getElementById("especializacion");
    const medico = document.getElementById("medicosDisponibles");

    especialidad.addEventListener("change",() => {
     
        const combo = document.getElementById("medicosDisponibles");
        medicosDiponiblesParaCita(medicos, especialidad.value.trim(),combo);
    })

    
    medico.addEventListener("click", () => {
        
        const combo = document.getElementById("citas");
        cargarCitasDisponiblesParaElMedico(citas ,medico.value.trim() ,combo)
    })

    medicosDiponiblesParaCita(medicos, especialidad.value.trim(), document.getElementById("medicosDisponibles"));
})


//metodos referentes al manejo de citas
const cancelarCita = () => {

    const cita = document.getElementById("citas").value.trim();
    const medico = document.getElementById("medicosDisponibles").value.trim();
    const citaVisualizar = buscarCita(medico, cita);

    if (citaVisualizar != null) {

        citaVisualizar.estado = "CA";

        guradarCambiosEnLaSesion();
    }
}

const aceptarCita = () =>{

    const cita = document.getElementById("citas").value.trim();
    const medico = document.getElementById("medicosDisponibles").value.trim();
    const citaVisualizar = buscarCita(medico, cita);
    
    console.log(citaVisualizar)
    if (citaVisualizar != null) {

        citaVisualizar.estado = "AC";

        guradarCambiosEnLaSesion();

    }

}

const buscarCita = (medico, fechaCita) => {

    for (let index = 0; index < citas.length; index++) {
        
        if (citas[index].medico === medico && citas[index].fecha === fechaCita) {
            return citas[index];
        }
        
    }
    return null;
}

const guradarCambiosEnLaSesion = () => {
    localStorage.setItem("citasAgendadas",JSON.stringify(citas));
}

const cargarCitasDisponiblesParaElMedico = (citas ,medico ,combo) => {

    combo.innerHTML = "";//se limpia el contenido anterior

    citas.forEach(cita => {

        if (cita.medico == medico && cita.estado == "AG") {
         
            //se agragan las oppciones coincidentes
            combo.innerHTML += `<option value=${cita.fecha}>${"Fecha = "+cita.fecha+" Hora = "+cita.hora+" Especialidad = "+cita.especialida}</option>`;
        }
    })
}

const medicosDiponiblesParaCita = (medicos, especialidadBuscada, combo) => {

    combo.innerHTML = "";//se limpia el contenido anterior

    medicos.forEach(medico => {
        
        if (medico.especialidad == especialidadBuscada) {
         
            //se agragan las oppciones coincidentes
            combo.innerHTML += `<option value=${medico.identificacion}>${medico.nombre+" "+medico.apellidos}</option>`;
        }
    })
}





