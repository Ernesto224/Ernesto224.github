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
//se utiliza como intermediario entre los datos legitimos de los medicos
var medicosOrdenadosYFiltrados = medicos;
var filtrado = null;
var paginaActual = 1;
const filasPorPagina = 4;

document.addEventListener("DOMContentLoaded",() => {

    //agrega un evento de escucha a el boton de busqueda
    document.getElementById("formulario").addEventListener("submit",() => {
        
        event.preventDefault();//evita el refresco del formulario
 
        //se establece el nuevo tipo de filtro
        filtrado = document.getElementById("tipoFiltro").value.trim();

        //se optiene el texto que se desea buscar
        const textoBusqueda = document.getElementById("informacionBusqueda").value.trim();

        paginaActual = 1;//se restablece el indice de pagina
        
        //se ordenan los datos en base al valor del filtro
        medicosOrdenadosYFiltrados = ordenarMedicos(medicos);

        //procede a hacerce la busqueda secuencial
        medicosOrdenadosYFiltrados = buscar(medicosOrdenadosYFiltrados, textoBusqueda);
        
        //se envian los datos para su carga
        mostrarPagina(medicosOrdenadosYFiltrados, paginaActual);
    })

    document.getElementById("tipoFiltro").addEventListener("change",() => {
        
        //se establece el nuevo tipo de filtro
        filtrado = document.getElementById("tipoFiltro").value.trim();

        //se optiene el texto que se desea buscar
        const textoBusqueda = document.getElementById("informacionBusqueda").value.trim();

        paginaActual = 1;//se restablece el indice de pagina
        
        //se ordenan los datos en base al valor del filtro
        medicosOrdenadosYFiltrados = ordenarMedicos(medicos);
        
        //se envian los datos para su carga
        mostrarPagina(medicosOrdenadosYFiltrados, paginaActual);

        autoCompletar(medicos,"")
    })

    //crear botones Despliegue del modal
    document.getElementById("informacionMedicos").addEventListener("click",(evento) => {

        evento.stopPropagation();//detinen la posibilidad de muchos eventos simultaneos

        if (evento.target.matches(".botonModal")) {
            //se optiene el componente padre td y luego el padre de este tr
            //proporcionando acceso a todos sus child para poder recuperara la informacion a desplegar
            let datosMedico = evento.target.parentElement.parentElement.children;
            cargarDatosPerfil(datosMedico);//despliega el model y el perfil
        }//verifica que se haga clic sobre el boton de perfil y no sombre la tabla como tal

    })

    //se le asigna un listener a el boton de cierre de la ventana
    document.getElementById("btnCerrar").addEventListener("click",() => {

        cerrarModalPerfil();
    })

    //se le asigna un evento a la barra de busqueda para vez que se agregue un caracter
    document.getElementById("informacionBusqueda").addEventListener("input",(evento) => {

        let textoEscrito = evento.target.value.trim();
        autoCompletar(medicos,textoEscrito);
    })

    //se despliega por primera vez la tabla de informacion
    filtrado = document.getElementById("tipoFiltro").value.trim();
    ordenarMedicos(medicos);
    mostrarPagina(medicos, paginaActual);

})//metodo de inicializacion

//metodo de busqueda secuancial
const buscar = (medicos, textoBusqueda) =>{

    if (textoBusqueda === "") {
        return medicos;
    }//si el texto de busqueda es un valor vacio no hay necesidad de buscar 

    let resultados = [];//contendra todos los resultados que conicidan

    //se realiza una busqueda de forma secuencial
    for (let i = 0; i < medicos.length; i++) {
    
        let medico = medicos[i];
        //se pregunta si el medicos en indice i su valor de filtrado
        //incluye el texto buscado
        if (medico[filtrado].toUpperCase().includes(textoBusqueda.toUpperCase())) {
            resultados.push(medico);//se agrega al arreglo de resultados
        }
    }

    return resultados;
}

//metodo que envia la lista de medicos a la interfaz
const mostrarPagina = (medicos, pagina) => {

    //se accede a la tabla de impormacion
    const cuerpo = document.getElementById("información");
    cuerpo.innerHTML = "";//se limpia el contenido anterior
    //se calcula la seccion del arreglo que se va amostrar segun la pagina
    const inicio = (pagina - 1) * filasPorPagina;
    const fin = inicio + filasPorPagina;
    //se crea un arreglo que contendra la seccion cortada del arreglo principal
    const medicosPagina = medicos.slice(inicio, fin);

    medicosPagina.forEach(medico => {
        
        //se crean todas las eqtiqquetas para llenar la tabla con los valores basicos
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${medico.nombre}</td>
            <td>${medico.especialidad}</td>
            <td>${medico.ubicacion}</td>
            <td>${medico.identificacion}</td>
            <td> <button class="botonModal">${"Ver"}<button/> </td>
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

//metodo para ordenar la lista de medicos segun el filtro
//utiliza el metodo sort propio del lenguaje
const ordenarMedicos = (medicos) => {

    //se hace uso del metodo sort y se 
    //utiliza una funcion personalizada para los criterios
    medicos.sort((a,b) => {

        if (a[filtrado] > b[filtrado]) {
            
            return 1;
        }

        if (a[filtrado] < b[filtrado]){
            
            return -1;
        }

        return 0;

    });

    return medicos;
}

//carga de datos para visualizar el perfil
const cargarDatosPerfil = (datosMedico) => {

    const modal = document.getElementById("fondoModal");//se optiene el componente modal
    
    let medico = null;

    for (let i = 0; i < medicos.length; i++) {
    
        medico = medicos[i];

        //se compara la identificacion para optener todo el objeto medico
        //se utiliza la informacion por ser una clave unica
        if (medico["identificacion"] === datosMedico[3].textContent) {
            break;
        }
    }

    medico.resenias.forEach(resenia => {

        //se utiliza el metodo insertAdjacentHTML para colocar el html despues
        //de la segunda etiqueta  
        modal.children[0].children[0].insertAdjacentHTML("afterbegin", `
        <p>${resenia.correo}
        <br> ${"Calificacion =" + resenia.calificacion}
        <br>${resenia.escribe}<p/>
        `);

    });//primero se cargan todas las resenias

    modal.children[0].children[0].insertAdjacentHTML("afterbegin", `<h3>${"Reseñas"}</h3><br>`);

    //se insertan el resto de datos del medico
    modal.children[0].children[0].insertAdjacentHTML("afterbegin",`
            <h2>${"Dr. "+medico.nombre+" "+medico.apellidos}</h2>
            <p>${medico.identificacion}<p/>
            <p>${medico.especialidad}<p/>
            <p>${medico.correo}<p/>
            <p>${medico.ubicacion+"  "+medico.horarioConsulta}<p/>
            <p>${medico.biografia}<p/>
        `);

    modal.style.display = "flex";//se le quita la clase oculta para que esta sea visible

}

//cerrar perfil 
const cerrarModalPerfil = () => {

    //se llama a la ventana modal
    const modal = document.getElementById("fondoModal");

    //se limpia el contenido escrito en contenido modal
    modal.children[0].children[0].innerHTML = "";

    //se utiliza la pripiedad css none para ocultar
    modal.style.display = "none";
}

//Cargar opciones de autocompletado
const autoCompletar = (medicos, textoEscrito) => {

    //localiza el datalist
    const listaAutoCompletar = document.getElementById("autocompletar");
    listaAutoCompletar.innerHTML = "";//se limpian las opciones de auto

    const resultados = new Set();

    //se realiza una busqueda de forma secuencial
    for (let i = 0; i < medicos.length; i++) {

        //se verifica si el nombre de un medico contien los carateres
        //colocados en la barra de busqueda
        //valores se convierten a mayuscula para controlar el key sensitive del metodo includes
        const medico = medicos[i];
        if (medico[filtrado].toUpperCase().includes(textoEscrito.toUpperCase())) {
            resultados.add(medico[filtrado]);//se agrega al arreglo de resultados
        }
    }

    const coincidencias = Array.from(resultados);//se combierte al objeto resultados en una lista

    //se agregan las opciones al componente
    coincidencias.forEach(opcion => {
        listaAutoCompletar.innerHTML += `<option value = "${opcion}">${opcion}</option>`;//se envian las opciones de autocompletado encontradas
    });
}
