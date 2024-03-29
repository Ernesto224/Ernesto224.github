const meses =  ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const dateNow = new Date();
var mesActual = dateNow.getMonth();

document.addEventListener('DOMContentLoaded',function() {
    getDaysCalendar(dateNow.getFullYear(),mesActual);
})//eventLoadedDOM

const loadNextMonth = () => {
    mesActual = (mesActual + 1) % meses.length;
    getDaysCalendar(dateNow.getFullYear(),mesActual);
}//end function

const loadPrevMonth = () => {//pasar a funciones flecha
    mesActual = (mesActual + meses.length - 1) % meses.length;
    getDaysCalendar(dateNow.getFullYear(),mesActual);
}//end function

const getDaysCalendar = (anio,mes) => {
    const diasTabla = document.getElementById('dias');
    document.getElementById('mes').innerHTML = meses[mes];
    document.getElementById('anio').innerHTML= anio;
    let primerDia = new Date(anio,mes,1).getDay()-1;
    let ultimoDia = new Date(anio,mes,0).getDay();

    for (let i = -primerDia,j = 0 ; i < (42-primerDia); i++,j++) {
        let fechaTabla = new Date(anio,mes,i);
        let diaTabla = diasTabla.getElementsByTagName('td')[j];
        diaTabla.innerHTML = fechaTabla.getDate();
    }//end for

}//end function