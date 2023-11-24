//0 - sunday  //6-saturday


const weekday = (year, month, day) =>{
    console.log(year)
    console.log(month)
    console.log(day)
    console.log(' -----------------------------')


    let fecha = `${year}-${month}-${day}`
    let fechanew = new Date(fecha)
    return fechanew.getUTCDay();
}

export default weekday;
