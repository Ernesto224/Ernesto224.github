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
        ],
        calificacionPro:4
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
        ],
        calificacionPro:3
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
        ],
        calificacionPro:1
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
        ],
        calificacionPro:5
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
        ],
        calificacionPro:4.96
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
        ],
        calificacionPro:5
    }
]
var medicosOrdenadosYFiltrados = medicos;//se utiliza como intermediario para la informacion de medicos
var filtrado = null;//tipo de filtro que se va a aplicar
var ordenamiento = null;//tipo de oredenacion de la tabla
var paginaActual = 1;//contador de pagina actual
const filasPorPagina = 4;//cantidad de datos a mostar por pagina

document.addEventListener("DOMContentLoaded",() => {

    //agrega un evento de escucha a el boton de busqueda
    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit",() => {
        
        event.preventDefault();//evita el refresco del formulario

        //se optiene el texto que se desea buscar
        const textoBusqueda = document.getElementById("informacionBusqueda").value.trim();
 
        //se establece el nuevo tipo de filtro
        filtrado = document.getElementById("tipoFiltro").value.trim();

        paginaActual = 1;//se restablece el indice de pagina
        
        //se ordenan los datos en base al valor del filtro
        medicosOrdenadosYFiltrados = ordenarMedicos(medicos);

        //procede a hacerce la busqueda secuencial
        medicosOrdenadosYFiltrados = buscar(medicosOrdenadosYFiltrados, textoBusqueda);
        
        //se envian los datos para su carga en el html
        mostrarPagina(medicosOrdenadosYFiltrados, paginaActual);
    })

    //agrega un evento al combo de seleccion filtrado
    const comboFiltro = document.getElementById("tipoFiltro"); 
    comboFiltro.addEventListener("change",() => {
        
        //se establece el nuevo tipo de filtro
        filtrado = document.getElementById("tipoFiltro").value.trim();

        paginaActual = 1;//se restablece el indice de pagina
        
        //se envian los datos para su carga
        mostrarPagina(medicosOrdenadosYFiltrados, paginaActual);

        autoCompletar(medicos,"")
    })

    //agrega un evento al combo de seleccion orden
    const comboOrden = document.getElementById("tipoOrden"); 
    comboOrden.addEventListener("change",() => {
        
        //se establece el nuevo tipo de filtro
        ordenamiento = document.getElementById("tipoOrden").value.trim();

        paginaActual = 1;//se restablece el indice de pagina
        
        //se ordenan los datos en base al valor del filtro
        medicosOrdenadosYFiltrados = ordenarMedicos(medicosOrdenadosYFiltrados);
        
        //se envian los datos para su carga
        mostrarPagina(medicosOrdenadosYFiltrados, paginaActual);

        autoCompletar(medicos,"")
    })

    //se le asigna un evento a la tabla para desplegar el modal
    const informacionMedicos = document.getElementById("informacionMedicos");
    informacionMedicos.addEventListener("click",(evento) => {

        evento.stopPropagation();//detine la posibilidad de muchos eventos simultaneos

        if (evento.target.matches(".botonModal")) {
            //se optiene el componente padre td y luego el padre de este tr
            //proporcionando acceso a todos sus hijos para poder recuperara la informacion a desplegar
            let datosMedico = evento.target.parentElement.parentElement.children;
            cargarDatosPerfil(datosMedico);//despliega el model y el perfil
        }//verifica que se haga clic sobre el boton de perfil y no sombre la tabla como tal
    })

    //se le asigna un evento al boton de cierre de la ventana modal
    const cerrarModal = document.getElementById("btnCerrar");
    cerrarModal.addEventListener("click",() => {

        cerrarModalPerfil();
    })

    //se le asigna un evento a la barra de busqueda para vez que se agregue un caracter
    const campoDeTexto = document.getElementById("informacionBusqueda");
    campoDeTexto.addEventListener("input",(evento) => {

        let textoEscrito = evento.target.value.trim();//se toma el valor del componente que desencadena el evento
        autoCompletar(medicos,textoEscrito);//esto creara nuevas opciones de autocompletado
    })

    //se despliega por primera vez la tabla de informacion
    filtrado = comboFiltro.value.trim();
    ordenamiento = comboOrden.value.trim();
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
        //se pregunta si el medicos en indice i incluyen su valor de filtrado en el texto
        //incluye el texto buscado
        if (medico[filtrado].toUpperCase().includes(textoBusqueda.toUpperCase())) {
            resultados.push(medico);//se agrega al arreglo de resultados
        }
    }

    return resultados;
}

//metodo que envia la lista de medicos a la interfaz
const mostrarPagina = (medicos, pagina) => {

    //se accede al cuerpo de la tabla
    const cuerpo = document.getElementById("información");
    cuerpo.innerHTML = "";//se limpia el contenido anterior
    //se calcula la seccion del arreglo que se va a mostrar segun la pagina
    const inicio = (pagina - 1) * filasPorPagina;
    const fin = inicio + filasPorPagina;//se establece el limite de informacion
    //se crea un arreglo que contendra la seccion cortada del arreglo principal
    const medicosPagina = medicos.slice(inicio, fin);

    medicosPagina.forEach(medico => {
        
        //se crean todas las eqtiquetas para llenar la tabla con los valores basicos
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${medico.nombre}</td>
            <td>${medico.especialidad}</td>
            <td>${medico.ubicacion}</td>
            <td>${medico.identificacion}</td>
            <td>${medico.calificacionPro}</td>
            <td> <button class="botonModal">${"Ver"}<button/> </td>
        `;
        cuerpo.appendChild(fila);//se agrega la informacion al cuerpo
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

        if (ordenamiento == "calificacionPro") {
            let temp = b;
            b = a;
            a = temp;
        }

        if (a[ordenamiento] > b[ordenamiento]) {
            
            return 1;
        }

        if (a[ordenamiento] < b[ordenamiento]){
            
            return -1;
        }

        return 0;

    });

    return medicos;
}

//carga de datos para visualizar el perfil
const cargarDatosPerfil = (datosMedico) => {

    const modal = document.getElementById("fondoModal");//se optiene el componente modal
    const contenidoModal = modal.children[0].children[0];//se optiene la etiqueta donde se coloca el contenido

    let medico = null;

    for (let i = 0; i < medicos.length; i++) {
    
        medico = medicos[i];

        //se compara la identificacion para optener todo el objeto medico
        //se utiliza la identificacion por ser una clave unica
        if (medico["identificacion"] === datosMedico[3].textContent) {
            break;
        }
    }

    medico.resenias.forEach(resenia => {

        //se utiliza el metodo insertAdjacentHTML para colocar el html despues del componente padre
        modal.children[0].children[0].insertAdjacentHTML("afterbegin", `
            <p>${resenia.correo}
            <br> ${"Calificacion =" + resenia.calificacion}
            <br>${resenia.escribe}<p/>`);

    });//primero se cargan todas las resenias

    contenidoModal.insertAdjacentHTML("afterbegin", `<h3>${"Reseñas"}</h3><br>`);

    //se insertan el resto de datos del medico
    contenidoModal.insertAdjacentHTML("afterbegin",`
        <h2>${"Dr. "+medico.nombre+" "+medico.apellidos}</h2>
        <p>${medico.identificacion}<p/>
        <p>${medico.especialidad}<p/>
        <p>${medico.correo}<p/>
        <p>${medico.ubicacion+"  "+medico.horarioConsulta}<p/>
        <p>${medico.biografia}<p/>`);

    modal.style.display = "flex";//se le quita al modal el display para que sea visible
}

//cerrar perfil 
const cerrarModalPerfil = () => {

    //se llama a la ventana modal
    const modal = document.getElementById("fondoModal");

    //se limpia el contenido escrito en contenido modal
    modal.children[0].children[0].innerHTML = "";

    //se utiliza la propiedad css none para ocultar el modal
    modal.style.display = "none";
}

//Cargar opciones de autocompletado
const autoCompletar = (medicos, textoEscrito) => {

    if (textoEscrito !== "" && (textoEscrito.length > 1)) {//no se envian opciones de autocompletar si no hay texto
        
        //localiza el datalist
        const listaAutoCompletar = document.getElementById("autocompletar");
        listaAutoCompletar.innerHTML = "";//se limpian las opciones de autocompletar

        const resultados = new Set();//se utiliza este objeto para no guardar opciones repetidas

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

        const coincidencias = Array.from(resultados);//se combierte el objeto resultados en una lista

        //se agregan las opciones al componente html
        coincidencias.forEach(opcion => {
            listaAutoCompletar.innerHTML += `<option value = "${opcion}">${opcion}</option>`;//se envian las opciones de autocompletado encontradas
        });
    }
}
