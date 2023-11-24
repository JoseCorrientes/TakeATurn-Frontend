
import { useDispatch, useSelector} from "react-redux"
import { toggleSeeClientReservation, dayToSave, fillDataHourReservation, saveTurn, toggleReload, getMonthTurns, toggleErrorSavingTurn, sendMail} from "../../actions/actions";
import { useState } from "react";




// function ModalClientReservation({year, month, day}) {
function ModalClientReservation({year, month, day, data}) {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user);
    const dataHourReservation = useSelector(state=>state.dataHourReservation)
   
    const errorSavingTurn = useSelector(state=>state.errorSavingTurn);
    const errorDeletingTurn = useSelector(state=>state.errorDeletingTurn);


    const [typeAttention, setTypeAttention] = useState(0)
    const [healthInsurance, setHealthInsurance]=useState('');
    const [phone, setPhone] = useState('');
    const [comment, setComment] = useState('');
    const [toConfirm, setToConfirm]= useState(false)

    

    const handleCloseReservationForm =() =>{
        dispatch(dayToSave({}))
        dispatch(fillDataHourReservation(''))
        dispatch(toggleSeeClientReservation(false))

        dispatch(toggleErrorSavingTurn(''))
    }

    const handleSelectTypeAttention =(e)=>{
        setTypeAttention(e.target.value)
    }
    const handleHealthInsurance =(e)=>{
        setHealthInsurance(e.target.value)
    }
    const handlePhone =(e)=>{
        setPhone(e.target.value)
    }
    const handleComment =(e)=>{
        setComment(e.target.value)
    }

    const handleSubmit = ()=>{
        let hour = dataHourReservation.turnName.slice(0,2);
        let minute = dataHourReservation.turnName.slice(2);
        let status = 'busy';
        let dataToSave={
            day,
            month: parseInt(month),
            year: parseInt(year),
            hour,
            minute,
            status,
            idpatient:user.user,
            email: user.email,
            doctor: user.doctor,
            typetreatment: typeAttention,
            healthinsurance: healthInsurance,
            phone,
            comment,
            hourindex: dataHourReservation.hourIndex,
        }
        setPhone('');    
        setTypeAttention(0);
        setHealthInsurance('');
        setPhone('');
        setComment('');


        //de aca salen los datos que se envian para la registracion ----> dateToSave
        console.log(dataToSave)

        dispatch(dayToSave({}))
        dispatch(saveTurn(dataToSave))
        dispatch(()=>setToConfirm(false))
        dispatch(getMonthTurns(data))  

        //aca deberia enviar al backend los datos para el correo en una ruta email
        //enviar todo dataToSave  -- El correo se envia al paciente y al dr
        dispatch(sendMail(dataToSave))

        dispatch(toggleReload())
    }


    let monthText;
  switch (month) {
    case '1':  
    monthText = 'Enero';
    break
    case '2':  
    monthText = 'Febrero';
    break
    case '3':  
    monthText = 'Marzo';
    break
    case '4':  
    monthText = 'Abril';
    break
    case '5':  
    monthText = 'Mayo';
    break
    case '6':  
    monthText = 'Junio';
    break
    case '7':  
    monthText = 'Julio';
    break
    case '8':  
    monthText = 'Agosto';
    break
    case '9':  
    monthText = 'Septiembre';
    break
    case '10':  
    monthText = 'Octubre';
    break
    case '11':  
    monthText = 'Noviembre';
    break
    default: 
    monthText='Diciembre'
}  





  return (
        <div
        className=' flex flex-col fixed inset-0  bg-black bg-opacity-50 w-full justify-center items-center'
        >
            <div
                className='flex flex-col items-center w-11/12 h-5/6 border-[2px] sm:w-2/3 sm:h-auto sm:py-10 sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90'
                // className='flex flex-col items-center w-11/12 h-5/6 border-[2px] sm:w-2/3 sm:h-4/6 sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90'
            >
                    
                    {errorSavingTurn=='' &&
                    <h1
                    className='text-white font-Saira text-2xl sm:text-3xl  font-light text-center pb-4 pt-5 sm:pb-5 sm:pt-6' 
                    >
                    Pedido de Turno {day} de {monthText} de {year}
                    </h1>
                    }

                    {errorSavingTurn=='' &&
                    <input 
                    className='flex flex-row w-1/3 h-[3rem] px-2 text-center mb-1'
                    placeholder='Ingrese Teléfono de Contacto'
                    name='phone'
                    value={phone}
                    onChange={(e)=>handlePhone(e)}
                    />
                    }
                    {errorSavingTurn=='' &&
                    <input 
                    className='flex flex-row w-1/3 h-[3rem] px-2 text-center mb-1'
                    placeholder='Obra Social'
                    name='healthInsurance'
                    value={healthInsurance}
                    onChange={handleHealthInsurance}
                    />
                    }
                    {errorSavingTurn=='' &&
                    <select
                    className='w-1/3 h-[3rem] text-center mb-1'
                    onChange={(e)=>handleSelectTypeAttention(e)}
                    name='typeAttention'
                    value={typeAttention}
                    >
                        <option
                            className='bg-white text-gray-400'
                            value={0}
                        >Seleccione Tratamiento</option>
                        <option
                            value={'urgencia'}
                        >Urgencia</option>
                        <option
                            value={'consulta'}
                        >Consulta</option>
                        <option
                            value={'extraccion'}
                        >Extracción</option>
                        <option
                            value={'conducto'}
                        >Tratamiento de Conducto</option>
                        <option
                            value={'limpieza'}
                        >Limpieza</option>
                    </select> 
                    }
                    {errorSavingTurn=='' &&
                    <textarea 
                    cols={10}
                    rows={5}
                    className='flex flex-row w-1/3 h-[6rem] px-2 text-center mb-1'
                    placeholder='Ingrese Comentario'
                    name='comment'
                    value={comment}
                    onChange={(e)=>handleComment(e)}
                    />
                    }

                    {
                    (errorSavingTurn=='' && toConfirm==false  &&  (phone=='' || healthInsurance=='' || typeAttention=='')) &&
                    <div
                        className="w-full h-1/6 flex flex-row justify-center items-center "
                    >
                        <button
                        className='flex flex-row justify-center items-center mr-1 rounded-md h-10 w-1/4 bg-gray-700 bg-opacity-20 font-Saira text-2xl sm:text-3xl text-gray-700 font-thin '
                        disabled
                        >
                            Grabar Turno
                        </button>
                        <button
                        className='flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-1/4 font-Saira text-2xl hover:text-4xl ml-1 sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue'
                        onClick={handleCloseReservationForm}
                        
                        >
                            Cancelar
                        </button>
                    </div>
                    }



                    { (phone!='' && healthInsurance!='' && typeAttention!='' && !toConfirm) &&
                    <div
                        className="w-full h-1/6 flex flex-row justify-center items-center "
                    >
                        <button
                        className='flex flex-row justify-center items-center mr-1 rounded-md h-10 w-1/4 bg-red-700 bg-opacity-60 font-Saira text-2xl hover:text-4xl  sm:text-3xl text-white font-thin hover:bg-opacity-20 hover:border-4 hover:border-red-500'
                        onClick={()=>setToConfirm(true)}
                        >
                            Grabar Turno
                        </button>
                        <button
                        className='flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-1/4 font-Saira text-2xl hover:text-4xl ml-1 sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue'

                        onClick={handleCloseReservationForm}
                        >
                            Cancelar
                        </button>
                    </div>
                    } 

                    { 
                    toConfirm &&
                    <div
                        className="w-full h-1/6 flex flex-row justify-center items-center "
                    >
                        <button
                        
                        className='flex flex-row justify-center items-center mr-1 rounded-md h-10 w-1/4 bg-mayra-push-green bg-opacity-60 font-Saira text-2xl hover:text-4xl  sm:text-3xl text-white font-thin hover:bg-opacity-20 hover:border-4 hover:border-mayra-push-green-border'
                        onClick={handleSubmit}
                        >
                            Confirmar
                        </button>

                        {/* <button
                        className='flex flex-row justify-center items-center mr-1 rounded-md h-10 w-1/4 bg-mayra-push-green bg-opacity-60 font-Saira text-2xl hover:text-4xl  sm:text-3xl text-white font-thin hover:bg-opacity-20 hover:border-4 hover:border-mayra-push-green-border'
                        onClick={handleSubmit}
                        >
                            Confirmar
                        </button> */}
                        <button
                        className='flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-1/4 font-Saira text-2xl hover:text-4xl ml-1 sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue'
                        onClick={()=>setToConfirm(false)}
                        
                        >
                            Cancelar
                        </button>
                    </div>
                    } 
















                   {errorSavingTurn=='Error' && 
                   <div
                        className=" flex flex-row justify-center items-center w-full h-10 "
                   >
                        <p
                            className="px-4 mr-4 font-Saira text-3xl text-white font-thin bg-red-600"
                        >El Turno no se pudo Grabar.</p>
                        <button
                            onClick={handleCloseReservationForm}
                            className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-1/4 font-Saira text-2xl hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
                        >Cancelar</button>

                   </div>
                   }

                   {errorSavingTurn=='Ok' && 
                   <div
                        className="flex flex-row justify-center items-center w-full h-10 "
                   >
                        <p
                            className="px-4 mr-4 font-Saira text-3xl text-white font-thin bg-green-600"
                        >El Turno se Grabo Correctamente.</p>
                        <button
                            onClick={handleCloseReservationForm}
                            className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-1/4 font-Saira text-2xl hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
                        >Ok</button>

                   </div>
                   }
            </div>
        </div>)
}

export default ModalClientReservation

































// import { useDispatch, useSelector} from "react-redux"
// import { toggleSeeClientReservation, dayToSave, fillDataHourReservation, saveTurn, toggleReload, getMonthTurns, toggleErrorSavingTurn} from "../../actions/actions";
// import { useState } from "react";




// // function ModalClientReservation({year, month, day}) {
// function ModalClientReservation({year, month, day, data}) {
//     const dispatch = useDispatch();
//     const user = useSelector(state=>state.user);
//     const dataHourReservation = useSelector(state=>state.dataHourReservation)
   
//     const errorSavingTurn = useSelector(state=>state.errorSavingTurn);
//     const errorDeletingTurn = useSelector(state=>state.errorDeletingTurn);


//     const [typeAttention, setTypeAttention] = useState(0)
//     const [healthInsurance, setHealthInsurance]=useState('');
//     const [phone, setPhone] = useState('');
//     const [comment, setComment] = useState('');
//     const [toConfirm, setToConfirm]= useState(false)

//     const handleCloseReservationForm =() =>{
//         dispatch(dayToSave({}))
//         dispatch(fillDataHourReservation(''))
//         dispatch(toggleSeeClientReservation(false))

//         dispatch(toggleErrorSavingTurn(''))
//     }

//     const handleSelectTypeAttention =(e)=>{
//         setTypeAttention(e.target.value)
//     }
//     const handleHealthInsurance =(e)=>{
//         setHealthInsurance(e.target.value)
//     }
//     const handlePhone =(e)=>{
//         setPhone(e.target.value)
//     }
//     const handleComment =(e)=>{
//         setComment(e.target.value)
//     }

//     const handleSubmit = ()=>{
//         let hour = dataHourReservation.turnName.slice(0,2);
//         let minute = dataHourReservation.turnName.slice(2);
//         let status = 'busy';
//         let dataToSave={
//             day,
//             month: parseInt(month),
//             year: parseInt(year),
//             hour,
//             minute,
//             status,
//             idpatient:user.user,
//             email: user.email,
//             doctor: user.doctor,
//             typetreatment: typeAttention,
//             healthinsurance: healthInsurance,
//             phone,
//             comment,
//             hourindex: dataHourReservation.hourIndex,
//         }
//         setPhone('');    
//         setTypeAttention(0);
//         setHealthInsurance('');
//         setPhone('');
//         setComment('');


//         //de aca salen los datos que se envian para la registracion ----> dateToSave
//         console.log(dataToSave)




//         dispatch(dayToSave({}))
//         dispatch(saveTurn(dataToSave))
//         dispatch(()=>setToConfirm(false))

//         dispatch(getMonthTurns(data))  //ver si re renderiza showmonth
//         dispatch(toggleReload())
        
        
//     }

//     let monthText;
//   switch (month) {
//     case '1':  
//     monthText = 'Enero';
//     break
//     case '2':  
//     monthText = 'Febrero';
//     break
//     case '3':  
//     monthText = 'Marzo';
//     break
//     case '4':  
//     monthText = 'Abril';
//     break
//     case '5':  
//     monthText = 'Mayo';
//     break
//     case '6':  
//     monthText = 'Junio';
//     break
//     case '7':  
//     monthText = 'Julio';
//     break
//     case '8':  
//     monthText = 'Agosto';
//     break
//     case '9':  
//     monthText = 'Septiembre';
//     break
//     case '10':  
//     monthText = 'Octubre';
//     break
//     case '11':  
//     monthText = 'Noviembre';
//     break
//     default: 
//     monthText='Diciembre'
// }  





//   return (
//         <div
//         className=' flex flex-col fixed inset-0  bg-black bg-opacity-50 w-full justify-center items-center'
//         >
//             <div
//                 className='flex flex-col items-center w-11/12 h-5/6 border-[2px] sm:w-2/3 sm:h-auto sm:py-10 sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90'
//                 // className='flex flex-col items-center w-11/12 h-5/6 border-[2px] sm:w-2/3 sm:h-4/6 sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90'
//             >
                    
//                     {errorSavingTurn=='' &&
//                     <h1
//                     className='text-white font-Saira text-2xl sm:text-3xl  font-light text-center pb-4 pt-5 sm:pb-5 sm:pt-6' 
//                     >
//                     Pedido de Turno {day} de {monthText} de {year}
//                     </h1>
//                     }

//                     {errorSavingTurn=='' &&
//                     <input 
//                     className='flex flex-row w-1/3 h-[3rem] px-2 text-center mb-1'
//                     placeholder='Ingrese Teléfono de Contacto'
//                     name='phone'
//                     value={phone}
//                     onChange={(e)=>handlePhone(e)}
//                     />
//                     }
//                     {errorSavingTurn=='' &&
//                     <input 
//                     className='flex flex-row w-1/3 h-[3rem] px-2 text-center mb-1'
//                     placeholder='Obra Social'
//                     name='healthInsurance'
//                     value={healthInsurance}
//                     onChange={handleHealthInsurance}
//                     />
//                     }
//                     {errorSavingTurn=='' &&
//                     <select
//                     className='w-1/3 h-[3rem] text-center mb-1'
//                     onChange={(e)=>handleSelectTypeAttention(e)}
//                     name='typeAttention'
//                     value={typeAttention}
//                     >
//                         <option
//                             className='bg-white text-gray-400'
//                             value={0}
//                         >Seleccione Tratamiento</option>
//                         <option
//                             value={'urgencia'}
//                         >Urgencia</option>
//                         <option
//                             value={'consulta'}
//                         >Consulta</option>
//                         <option
//                             value={'extraccion'}
//                         >Extracción</option>
//                         <option
//                             value={'conducto'}
//                         >Tratamiento de Conducto</option>
//                         <option
//                             value={'limpieza'}
//                         >Limpieza</option>
//                     </select> 
//                     }
//                     {errorSavingTurn=='' &&
//                     <textarea 
//                     cols={10}
//                     rows={5}
//                     className='flex flex-row w-1/3 h-[6rem] px-2 text-center mb-1'
//                     placeholder='Ingrese Comentario'
//                     name='comment'
//                     value={comment}
//                     onChange={(e)=>handleComment(e)}
//                     />
//                     }

//                     {
//                     (errorSavingTurn=='' && toConfirm==false  &&  (phone=='' || healthInsurance=='' || typeAttention=='')) &&
//                     <div
//                         className="w-full h-1/6 flex flex-row justify-center items-center "
//                     >
//                         <button
//                         className='flex flex-row justify-center items-center mr-1 rounded-md h-10 w-1/4 bg-gray-700 bg-opacity-20 font-Saira text-2xl sm:text-3xl text-gray-700 font-thin '
//                         disabled
//                         >
//                             Grabar Turno
//                         </button>
//                         <button
//                         className='flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-1/4 font-Saira text-2xl hover:text-4xl ml-1 sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue'
//                         onClick={handleCloseReservationForm}
                        
//                         >
//                             Cancelar
//                         </button>
//                     </div>
//                     }



//                     { (phone!='' && healthInsurance!='' && typeAttention!='' && !toConfirm) &&
//                     <div
//                         className="w-full h-1/6 flex flex-row justify-center items-center "
//                     >
//                         <button
//                         className='flex flex-row justify-center items-center mr-1 rounded-md h-10 w-1/4 bg-red-700 bg-opacity-60 font-Saira text-2xl hover:text-4xl  sm:text-3xl text-white font-thin hover:bg-opacity-20 hover:border-4 hover:border-red-500'
//                         onClick={()=>setToConfirm(true)}
//                         >
//                             Grabar Turno
//                         </button>
//                         <button
//                         className='flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-1/4 font-Saira text-2xl hover:text-4xl ml-1 sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue'

//                         onClick={handleCloseReservationForm}
//                         >
//                             Cancelar
//                         </button>
//                     </div>
//                     } 

//                     { 
//                     toConfirm &&
//                     <div
//                         className="w-full h-1/6 flex flex-row justify-center items-center "
//                     >
//                         <button
                        
//                         className='flex flex-row justify-center items-center mr-1 rounded-md h-10 w-1/4 bg-mayra-push-green bg-opacity-60 font-Saira text-2xl hover:text-4xl  sm:text-3xl text-white font-thin hover:bg-opacity-20 hover:border-4 hover:border-mayra-push-green-border'
//                         onClick={handleSubmit}
//                         >
//                             Confirmar
//                         </button>

//                         {/* <button
//                         className='flex flex-row justify-center items-center mr-1 rounded-md h-10 w-1/4 bg-mayra-push-green bg-opacity-60 font-Saira text-2xl hover:text-4xl  sm:text-3xl text-white font-thin hover:bg-opacity-20 hover:border-4 hover:border-mayra-push-green-border'
//                         onClick={handleSubmit}
//                         >
//                             Confirmar
//                         </button> */}
//                         <button
//                         className='flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-1/4 font-Saira text-2xl hover:text-4xl ml-1 sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue'
//                         onClick={()=>setToConfirm(false)}
                        
//                         >
//                             Cancelar
//                         </button>
//                     </div>
//                     } 
















//                    {errorSavingTurn=='Error' && 
//                    <div
//                         className=" flex flex-row justify-center items-center w-full h-10 "
//                    >
//                         <p
//                             className="px-4 mr-4 font-Saira text-3xl text-white font-thin bg-red-600"
//                         >El Turno no se pudo Grabar.</p>
//                         <button
//                             onClick={handleCloseReservationForm}
//                             className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-1/4 font-Saira text-2xl hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
//                         >Cancelar</button>

//                    </div>
//                    }

//                    {errorSavingTurn=='Ok' && 
//                    <div
//                         className=" flex flex-row justify-center items-center w-full h-10 "
//                    >
//                         <p
//                             className="px-4 mr-4 font-Saira text-3xl text-white font-thin bg-green-600"
//                         >El Turno se Grabo Correctamente.</p>
//                         <button
//                             onClick={handleCloseReservationForm}
//                             className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-1/4 font-Saira text-2xl hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
//                         >Ok</button>

//                    </div>
//                    }

//                    {errorDeletingTurn=='Error' && 
//                    <div
//                         className=" flex flex-row justify-center items-center w-full h-10 "
//                    >
//                         <p
//                             className="px-4 mr-4 font-Saira text-3xl text-white font-thin bg-red-600"
//                         >El Turno no se pudo Borrar.</p>
//                         <button
//                             onClick={handleCloseReservationForm}
//                             className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-1/4 font-Saira text-2xl hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
//                         >Cancelar</button>

//                    </div>
//                    }
//                     {errorDeletingTurn=='Ok' && 
//                    <div
//                         className=" flex flex-row justify-center items-center w-full h-10 "
//                    >
//                         <p
//                             className="px-4 mr-4 font-Saira text-3xl text-white font-thin bg-green-600"
//                         >El Turno se Borro Correctamente.</p>
//                         <button
//                             onClick={handleCloseReservationForm}
//                             className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-1/4 font-Saira text-2xl hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
//                         >Ok</button>

//                    </div>
//                    }









//             </div>
//         </div>)
// }

// export default ModalClientReservation