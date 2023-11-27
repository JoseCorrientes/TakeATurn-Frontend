import {useSelector, useDispatch} from 'react-redux'
import { getMonthTurns, toogleSeeHourList, dayToSave, toggleCanceledTurn, deleteTurnDB, sendEmailToPro, toggleSeeClientReservation, fillDataHourReservation, fillClientData, initializeMonthTurns, initilizeDaysWithOwnTurns, storeDataMonthToSeek, toggleErrorSavingTurn } from '../../actions/actions';
import DayComponent from '../DayComponent/DayComponent.jsx';
import { useEffect, useState } from 'react';
import FondoAzul from '../../assets/FondoAzul.jpg';
import Modal from '../Modal/Modal';
import ModalHourList from '../ModalHourList/ModalHourList';
import ModalClientReservation from '../ModalClientReservation/ModalClientReservation.jsx';
import { Link } from 'react-router-dom';



function ShowMonth() {
    let monthTurns = useSelector(state=>state.monthTurns); 
    let dayTurns = useSelector(state=>state.dayToSave)
    let seeHourList = useSelector(state=>state.seeHourList);
    let seeClientReservation = useSelector (state=>state.seeClientReservation);
    let canceledTurn = useSelector(state=>state.canceledTurn);
    const user = useSelector(state=>state.user) 

    const dataMonthToSeek=useSelector(state=>state.dataMonthToSeek);


    //let[state, setState]=useState(true); 
    const [localMonth, setLocalMonth] = useState('0');
    const [localYear, setLocalYear] = useState('0')
    const [flag, setFlag] = useState(false)
    
    const dispatch = useDispatch();
    
    
    useEffect(()=>{
        dispatch(toogleSeeHourList(false))
    },[flag])
    


    let reload = useSelector(state=>state.reload)
    useEffect(()=>{                    
        let data = {
            year: localYear,
            month: localMonth,
            claveAdmin: user.admin,
            idPatient: user.user,
            emailPatient: user.email,
            doctor: user.doctor
        }   
        if (localYear!='0' && localMonth!='0') {
            dispatch(getMonthTurns(data));
        }    
    },[reload])
    
    
    
    
    //se fija se cambia canceledTurns para enviar el correo y luego hacerar cenceldedTurn
    // useEffect(()=>{
    //     console.log('canceledTurn en SHOWmONTH: ');
    //     console.log(canceledTurn);
    //     console.log('------------------------------')
    //     if (canceledTurn!==null) {
    //         console.log('se debe enviar correo desde aca en showmonth');
    //         if (canceledTurn.length>0) dispatch(sendEmailToPro(canceledTurn))
    //     }

    // },[canceledTurn])

    







    //setea el año
   const handleYear = (e)=>{
    setLocalYear(e.target.value)
   } 


   //setea el mes
   const handleMonth = (e)=>{
    setLocalMonth(e.target.value)
   } 


   // cierra la visualizacion de la lista de turnos del dia
   const handleCloseTurns = ()=>{
    dispatch(toogleSeeHourList(false))
    dispatch(dayToSave({}))
   }





   const handleGetTurns = ()=>{
        // estos son los datos de quien accede tienen que venir de algun lado idPatient, claveadmin
        let data = {
            year: localYear,
            month: localMonth,
            // clave admin= true es administrador, false no es administrador
            claveAdmin: user.admin,
            //idpatient es el nombre del paciente que quire registrarse
            idPatient: user.user,
            //emailPatient es el correo que loguea el usuario, se usara como identificador
            emailPatient: user.email,

            //veo si necesito despachar tambien el numero de doctor
            doctor: user.doctor
        }   
        dispatch(storeDataMonthToSeek(data));
        dispatch(getMonthTurns(data));
    }



    //al apretar el boton de un dia en el calendario se dispara esta funcion
    const handleOneDay = (day)=>{
        let dayToSaveData = monthTurns.filter(item=> item.type=='day'&& item.day==day)
        dispatch(dayToSave(dayToSaveData[0]));        
        dispatch(toogleSeeHourList(true))
    }





    //funcion a ver cuando empiezo a reservar un turno
    //funcion de disparo de boton de reserva de turno desde modalhourlist. apaga modalhourlist apagando seehourlist y prendiendo seeClientReservation
    const handleToggleClientReservation = (item)=>{
        dispatch(toogleSeeHourList(false));
        let data= {
            turnName: item.turnName,
            status: 'busy',
            hourIndex: item.index,
            offDuty: item.offDuty
        }
        dispatch(fillDataHourReservation(data))
        dispatch(toggleSeeClientReservation(true));
    }



    //Esta funcion es llamada del boton cambiar usuario para acerar datos de user al volver a login
    const handleClearClient = ()=> {
        dispatch(fillClientData(""))
        dispatch(initializeMonthTurns())
        dispatch(initilizeDaysWithOwnTurns())
        dispatch(toggleErrorSavingTurn(""))
    }

    let data = {
                        year: localYear,
                        month: localMonth,
                        claveAdmin: user.admin,
                        idPatient: user.user,
                        emailPatient: user.email,
                        doctor: user.doctor
    }   




  return (
    // inicio de toda la pantall que tiene imagen de muela de fondo probando para cel
    <div className="w-full  h-full sm:h-auto overflow-y-auto"
        style={{backgroundImage: `url(${FondoAzul})`}}
    >







        {/* div inicio del contenedor de todo y que ocupa solo 3/4 del ancho de la pantall de fondo de pantalla? */}
        <div
            className="w-auto sm:w-3/4   h-auto  pt-4 sm:pt-8 mx-2 sm:mx-auto"
            // className="w-auto sm:w-3/4   h-auto  pt-4 sm:pt-8 mx-2 sm:mx-auto bg-no-repeat bg-contain bg-right "
        >





            {/* inicio del div cuadrado traslucido que contiene todo el elija un turno y los inputs y los botones */}
            <div
                className='py-2 sm:py-4 bg-black bg-opacity-30 shadow-black shadow-md'
            >


                <h2
                    className="text-center mb-3 sm:mb-6 font-Saira text-3xl sm:text-5xl text-gray-400 font-extralight"
                >ELIJA UN TURNO:
                </h2>


                {/* Div a continuacion que tiene input de ano, mes y 2 botones */}
                <div
                    className="flex flex-col justify-center"
                >



                            {/* inicio div que contiene la linea ano, input, mes, input */}
                            <div
                                className="flex flex-row justify-center mb-6 items-center"
                            >
                                <p
                                    className="pr-2 font-Saira text-2xl sm:text-3xl text-white font-light "
                                >Año:</p>
                                <select
                                    className="border-2  w-40 border-black text-center font-Saira text-2xl sm:text-md text-gray-700 font-light"
                                    onChange={(e)=>handleYear(e)}
                                >
                                    <option value='0'>- ? -</option>
                                    <option value='2023'>2023</option>
                                    <option value='2024'>2024</option>
                                    <option value='2025'>2025</option>
                                    <option value='2026'>2026</option>
                                </select>

                                <p
                                    className="ml-5 pr-2 font-Saira text-2xl sm:text-3xl text-white font-light "
                                >Mes:</p>
                                <select
                                    className="border-2 border-black text-center font-Saira text-2xl sm:text-md text-gray-700 font-light"
                                    onChange={(e)=>handleMonth(e)}
                                >
                                    <option value='0'>- ? -</option>
                                    <option value='1'>Enero</option>
                                    <option value='2'>Febrero</option>
                                    <option value='3'>Marzo</option>
                                    <option value='4'>Abril</option>
                                    <option value='5'>Mayo</option>
                                    <option value='6'>Junio</option>
                                    <option value='7'>Julio</option>
                                    <option value='8'>Agosto</option>
                                    <option value='9'>Septiembre</option>
                                    <option value='10'>Octubre</option>
                                    <option value='11'>Noviembre</option>
                                    <option value='12'>Diciembre</option>
                                </select>
                            </div>
                            {/* fin div que contiene la linea ano, input, mes, input */}
                            



                            {/* <div
                                className="flex flex-row justify-center"
                            >
                                
                            </div> */}


                            {/* inicio div contenedor de boton buscar y cambiar usuario     */}
                            <div
                                className='w-full flex flex-row justify-center'
                                >
                                    { localMonth!='0' && localYear!='0' && user!='' &&
                                        <button
                                        className='flex flex-row justify-center items-center mr-1 rounded-md h-10 w-1/4 bg-red-700 bg-opacity-60 font-Saira text-2xl hover:text-4xl  sm:text-3xl text-white font-thin hover:bg-opacity-20 hover:border-4 hover:border-red-500'
                                        onClick={handleGetTurns}
                                    >Buscar</button>}

                                    { (localMonth==='0' || localYear==='0' || user=='') &&
                                        <button
                                        className='mr-1 rounded-md h-10 w-1/4 bg-gray-700 bg-opacity-30 font-Saira text-2xl sm:text-3xl text-gray-700 font-thin  '
                                        disabled
                                    >Buscar</button>}

                                    <Link
                                        onClick={handleClearClient}
                                        to={`/`}
                                        className='flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-1/4 font-Saira text-2xl hover:text-4xl ml-1 sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue'
                                    >Cambiar Usuario</Link>

                            </div> 
                            {/* fin div contenedor de boton buscar y cambiar usuario     */}

                </div>
                {/* find del Div que tiene input de ano, mes y 2 botones */}

            </div>
            {/* fin del div cuadrado traslucido que contiene todo el elija un turno y los inputs y los botones */}










            {/* inicio del div contenedor de recuador de dias de la semana en negro y blanco                 */}
            <div
                className='mt-6 sm:mt-10 w-full sm:w-4/6 mx-auto h-10 grid grid-cols-7 grid-rows-1 border-2 bg-black border-black font-Saira text-2xl sm:text-3xl text-white font-light'
            >
                   <p
                        className='flex flex-col justify-center w-full h-10  col-start-1 col-end-2 text-center '
                   >DO
                    </p> 
                   <p
                        className='flex flex-col justify-center w-full h-10 col-start-2 col-end-3 text-center'
                   >LU
                    </p> 
                   <p
                        className='flex flex-col justify-center w-full h-10 col-start-3 col-end-4 text-center'
                   >MA
                    </p> 
                   <p
                        className='flex flex-col justify-center w-full h-10  col-start-4 col-end-5 text-center'
                   >MI
                    </p> 
                   <p
                        className='flex flex-col justify-center w-full h-10 col-start-5 col-end-6 text-center'
                   >JU
                    </p> 
                   <p
                        className='flex flex-col justify-center w-full h-10  col-start-6 col-end-7 text-center'
                   >VI
                    </p> 
                   <p
                        className='flex flex-col justify-center w-full h-10 col-start-7 col-end-8 text-center'
                   >SA
                    </p> 
            </div>
            {/* fin del div contenedor de recuador de dias de la semana en negro y blanco                 */}





            {/* inicio del contenedor de la grilla de dias                 */}
            <div
                className='mt-1 w-full h-full sm:w-4/6 mx-auto  grid gap-1 grid-cols-7 grid-rows-6 '
            >
                {monthTurns.length>0 && monthTurns.map((item, index) => {return <DayComponent
                                                    handleOneDay={handleOneDay}
                                                    key={index}
                                                    data={item}
                />}
                                    )}
            </div>
            {/* fin del contenedor de la grilla de dias */}









        </div>
        {/* div fin del contenedor de todo y que ocupa solo 3/4 del ancho de la pantall de fondo de pantalla? */}            






        {seeHourList && <Modal
            >
            <ModalHourList
                handleCloseTurns={handleCloseTurns}
                handleToggleClientReservation= { handleToggleClientReservation}
                //handleCancelTurn={handleCancelTurn}
                //dayTurns={dayTurns}
                year={localYear}
                month={localMonth}
                day={dayTurns.day}
                setFlag={setFlag}
            />    
        
        </Modal>}    

        {seeClientReservation && <Modal>
            <ModalClientReservation
                year={localYear}
                month={localMonth}
                day={dayTurns.day}
                data={data}

            />
        </Modal>}    






    </div>
    // fin de toda la pantall que tiene imagen de muela de fondo
  )
}

export default ShowMonth






























// import {useSelector, useDispatch} from 'react-redux'
// import { getMonthTurns, toogleSeeHourList, dayToSave, toggleCanceledTurn, deleteTurnDB, sendEmailToPro, toggleSeeClientReservation, fillDataHourReservation, fillClientData, initializeMonthTurns, initilizeDaysWithOwnTurns } from '../../actions/actions';
// import DayComponent from '../DayComponent/DayComponent.jsx';
// import { useEffect, useState } from 'react';
// import FondoAzul from '../../assets/FondoAzul.jpg';
// import Modal from '../Modal/Modal';
// import ModalHourList from '../ModalHourList/ModalHourList';
// import ModalClientReservation from '../ModalClientReservation/ModalClientReservation.jsx';
// import { Link } from 'react-router-dom';

// // function useForceUpdate(){
// //     const [value, setValue] = useState(0);
// //     return ()=>setValue(value=>value+1)
// // }



// function ShowMonth() {
//    let monthTurns = useSelector(state=>state.monthTurns); 
//    let dayTurns = useSelector(state=>state.dayToSave)
//    let seeHourList = useSelector(state=>state.seeHourList);
//    let seeClientReservation = useSelector (state=>state.seeClientReservation);
//    let canceledTurn = useSelector(state=>state.canceledTurn);
//    const user = useSelector(state=>state.user) 


//    let[state, setState]=useState(true); 



// //    const[reloadMonth, setReloadMonth] = useState(0); 
// //    const handleReloadMonth = ()=>{
// //     console.log(' entro en reloadMonth------------->')
// //     if (reloadMonth==1) setReloadMonth(0)
// //     else setReloadMonth(1)
// //    } 

   

//    const [localMonth, setLocalMonth] = useState('0');
//    const [localYear, setLocalYear] = useState('0')
//    const [flag, setFlag] = useState(false)


//    const dispatch = useDispatch();

//     //se fija se cambia canceledTurns para enviar el correo y luego hacerar cenceldedTurn
//     // useEffect(()=>{
//     //     console.log('canceledTurn en SHOWmONTH: ');
//     //     console.log(canceledTurn);
//     //     console.log('------------------------------')
//     //     if (canceledTurn!==null) {
//     //         console.log('se debe enviar correo desde aca en showmonth');
//     //         if (canceledTurn.length>0) dispatch(sendEmailToPro(canceledTurn))
//     //     }

//     // },[canceledTurn])

    







//     //setea el año
//    const handleYear = (e)=>{
//     setLocalYear(e.target.value)
//    } 


//    //setea el mes
//    const handleMonth = (e)=>{
//     setLocalMonth(e.target.value)
//    } 


//    // cierra la visualizacion de la lista de turnos del dia
//    const handleCloseTurns = ()=>{
//     dispatch(toogleSeeHourList(false))
//     dispatch(dayToSave({}))
//    }


//    useEffect(()=>{
//     dispatch(toogleSeeHourList(false))
//    },[flag])



//    const handleGetTurns = ()=>{
//         // estos son los datos de quien accede tienen que venir de algun lado idPatient, claveadmin
//         let data = {
//             year: localYear,
//             month: localMonth,
//             // clave admin= true es administrador, false no es administrador
//             claveAdmin: user.admin,
//             //idpatient es el nombre del paciente que quire registrarse
//             idPatient: user.user,
//             //emailPatient es el correo que loguea el usuario, se usara como identificador
//             emailPatient: user.email,

//             //veo si necesito despachar tambien el numero de doctor
//             doctor: user.doctor
//         }   

//         console.log('este es el boton de disparo de handleGetTurns en ShowMonth')
//         console.log(data)
//         console.log('----------------------')

//         dispatch(getMonthTurns(data));
        


//     }

//     let reload = useSelector(state=>state.reload)
//     useEffect(()=>{                    
//         //console.log(`useefect reload    ----> ${reload}`)
//         let data = {
//             year: localYear,
//             month: localMonth,
//             claveAdmin: user.admin,
//             idPatient: user.user,
//             emailPatient: user.email,
//             doctor: user.doctor
//         }   
//         if (localYear!='0' && localMonth!='0') dispatch(getMonthTurns(data));
//     },[reload])


//     //al apretar el boton de un dia en el calendario se dispara esta funcion
//     const handleOneDay = (day)=>{
//         let dayToSaveData = monthTurns.filter(item=> item.type=='day'&& item.day==day)
//         dispatch(dayToSave(dayToSaveData[0]));        
//         dispatch(toogleSeeHourList(true))
//     }





//     //funcion a ver cuando empiezo a reservar un turno
//     //funcion de disparo de boton de reserva de turno desde modalhourlist. apaga modalhourlist apagando seehourlist y prendiendo seeClientReservation
//     const handleToggleClientReservation = (item)=>{
//         dispatch(toogleSeeHourList(false));
//         let data= {
//             turnName: item.turnName,
//             status: 'busy',
//             hourIndex: item.index,
//             offDuty: item.offDuty
//         }
//         dispatch(fillDataHourReservation(data))
//         dispatch(toggleSeeClientReservation(true));
//     }

//     //Esta funcion es llamada del boton cambiar usuario para acerar datos de user al volver a login
//     const handleClearClient = ()=> {
//         //console.log('entro en handleclarcliente de showmonth')
//         dispatch(fillClientData(""))
//         dispatch(initializeMonthTurns())
//         dispatch(initilizeDaysWithOwnTurns())
//     }

//     // const handleReloadMonth =()=>{
//     //     let data = {
//     //                 year: localYear,
//     //                 month: localMonth,
//     //                 claveAdmin: user.admin,
//     //                 idPatient: user.user,
//     //                 emailPatient: user.email,
//     //                 doctor: user.doctor
//     //             }   
//     //     console.log( 'disparo handleReloadMonth')        
//     //     console.log(localMonth + '----' + localYear)
//     //     if (localYear!='0' && localMonth!='0') dispatch(getMonthTurns(data));
//     // }    

//     let data = {
//                         year: localYear,
//                         month: localMonth,
//                         claveAdmin: user.admin,
//                         idPatient: user.user,
//                         emailPatient: user.email,
//                         doctor: user.doctor
//     }   




//   return (
//     <div className="w-full "
//         style={{backgroundImage: `url(${FondoAzul})`}}
//     >
//         <div
//             className="w-auto pt-4 sm:pt-8 mx-2 sm:w-3/4 h-auto sm:mx-auto bg-no-repeat bg-contain bg-right "
//         >






//             <div
//                 className='py-2 sm:py-4 bg-black bg-opacity-30 shadow-black shadow-md'
//             >
//             <h2
//                 className="text-center mb-3 sm:mb-6 font-Saira text-3xl sm:text-5xl text-gray-400 font-extralight"
//             >ELIJA UN TURNO:
//             </h2>
           

//             <div
//                 className="flex flex-col justify-center "
//             >
//                         <div
//                             className="flex flex-row justify-center mb-6 items-center"
//                         >
//                             <p
//                                 className="pr-2 font-Saira text-2xl sm:text-3xl text-white font-light "
//                             >Año:</p>
//                             <select
//                                 className="border-2  w-40 border-black text-center font-Saira text-2xl sm:text-md text-gray-700 font-light"
//                                 onChange={(e)=>handleYear(e)}
//                             >
//                                 <option value='0'>- ? -</option>
//                                 <option value='2023'>2023</option>
//                                 <option value='2024'>2024</option>
//                                 <option value='2025'>2025</option>
//                                 <option value='2026'>2026</option>
//                             </select>

//                             <p
//                                 className="ml-5 pr-2 font-Saira text-2xl sm:text-3xl text-white font-light "
//                             >Mes:</p>
//                             <select
//                                 className="border-2 border-black text-center font-Saira text-2xl sm:text-md text-gray-700 font-light"
//                                 onChange={(e)=>handleMonth(e)}
//                             >
//                                 <option value='0'>- ? -</option>
//                                 <option value='1'>Enero</option>
//                                 <option value='2'>Febrero</option>
//                                 <option value='3'>Marzo</option>
//                                 <option value='4'>Abril</option>
//                                 <option value='5'>Mayo</option>
//                                 <option value='6'>Junio</option>
//                                 <option value='7'>Julio</option>
//                                 <option value='8'>Agosto</option>
//                                 <option value='9'>Septiembre</option>
//                                 <option value='10'>Octubre</option>
//                                 <option value='11'>Noviembre</option>
//                                 <option value='12'>Diciembre</option>
//                             </select>






//                         </div>
                        
//                         <div
//                             className="flex flex-row justify-center"
//                         >
                            
//                         </div>
//                         <div
//                             className='w-full flex flex-row justify-center'
//                             >
//                         { localMonth!='0' && localYear!='0' &&
//                             <button
//                             className='flex flex-row justify-center items-center mr-1 rounded-md h-10 w-1/4 bg-red-700 bg-opacity-60 font-Saira text-2xl hover:text-4xl  sm:text-3xl text-white font-thin hover:bg-opacity-20 hover:border-4 hover:border-red-500'
//                             onClick={handleGetTurns}
//                         >Buscar</button>}

//                         { (localMonth==='0' || localYear==='0') &&
//                             <button
//                             className='mr-1 rounded-md h-10 w-1/4 bg-gray-700 bg-opacity-30 font-Saira text-2xl sm:text-3xl text-gray-700 font-thin  '
//                             disabled
//                         >Buscar</button>}
//                         <Link
//                             onClick={handleClearClient}
//                             to={`/`}
//                             className='flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-1/4 font-Saira text-2xl hover:text-4xl ml-1 sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue'
//                         >Cambiar Usuario</Link>
//                         </div> 

//             </div>
//             </div>










           
//                 <div
//                     className='mt-4 sm:mt-10 w-full sm:w-4/6 mx-auto h-10 grid grid-cols-7 grid-rows-1 border-2 bg-black border-black font-Saira text-2xl sm:text-3xl text-white font-light'
//                 >
//                    <p
//                         className='flex flex-col justify-center w-full h-10  col-start-1 col-end-2 text-center '
//                    >DO
//                     </p> 
//                    <p
//                         className='flex flex-col justify-center w-full h-10 col-start-2 col-end-3 text-center'
//                    >LU
//                     </p> 
//                    <p
//                         className='flex flex-col justify-center w-full h-10 col-start-3 col-end-4 text-center'
//                    >MA
//                     </p> 
//                    <p
//                         className='flex flex-col justify-center w-full h-10  col-start-4 col-end-5 text-center'
//                    >MI
//                     </p> 
//                    <p
//                         className='flex flex-col justify-center w-full h-10 col-start-5 col-end-6 text-center'
//                    >JU
//                     </p> 
//                    <p
//                         className='flex flex-col justify-center w-full h-10  col-start-6 col-end-7 text-center'
//                    >VI
//                     </p> 
//                    <p
//                         className='flex flex-col justify-center w-full h-10 col-start-7 col-end-8 text-center'
//                    >SA
//                     </p> 


//                 </div>




//                 <div
//                     className='mt-1 w-full h-auto sm:w-4/6 mx-auto  grid gap-1 grid-cols-7 grid-rows-6'
//                 >
                
                
//                    {monthTurns.length>0 && monthTurns.map((item, index) => {return <DayComponent
//                                                         handleOneDay={handleOneDay}
//                                                         key={index}
//                                                         data={item}
//                    />}
//                                         )}
                                   

//                 </div>

//         </div>




//         {seeHourList && <Modal
//             >
//             <ModalHourList
//                 handleCloseTurns={handleCloseTurns}
//                 handleToggleClientReservation= { handleToggleClientReservation}
//                 //handleCancelTurn={handleCancelTurn}
//                 //dayTurns={dayTurns}
//                 year={localYear}
//                 month={localMonth}
//                 day={dayTurns.day}
//                 setFlag={setFlag}
//             />    
        
//         </Modal>}    

//         {seeClientReservation && <Modal>
//             <ModalClientReservation
//                 year={localYear}
//                 month={localMonth}
//                 day={dayTurns.day}
//                 data={data}

//             />
//         </Modal>}    


//     </div>
//   )
// }

// export default ShowMonth