const months =  ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const dateNow = new Date();
var nowMonth = dateNow.getMonth();

document.addEventListener('DOMContentLoaded',function() {
    console.log(nowMonth);
    getDaysCalendar(dateNow.getFullYear(),nowMonth);
})//eventLoadedDOM

function loadNextMonth(){
    console.log(nowMonth);
    nowMonth = (nowMonth + 1) % months.length;
    getDaysCalendar(dateNow.getFullYear(),nowMonth);
}//end function

function loadPrevMonth(){
    console.log(nowMonth);
    nowMonth = (nowMonth + months.length - 1) % months.length;
    getDaysCalendar(dateNow.getFullYear(),nowMonth);
}//end function

function getDaysCalendar(year,month){
    const tableDays = document.getElementById('days');
    document.getElementById('month').innerHTML = months[month];
    document.getElementById('year').innerHTML=year
    let firstDay = new Date(year,month,1).getDay()-1;
    let lastDay = new Date(year,month,0).getDay();

    for (let i = -firstDay,j = 0 ; i < (42-firstDay); i++,j++) {
        let dateTable = new Date(year,month,i);
        let dayTable = tableDays.getElementsByTagName('td')[j];
        dayTable.innerHTML = dateTable.getDate();

    }//end for

}//end function