import {
    GET_MONTH_TURNS,
    TOGGLE_SEE_HOUR_LIST,
    DAY_TO_SAVE,
    TOGGLE_CANCELED_TURN,
    TOGGLE_SEE_CLIENT_RESERVATION,
    FILL_DATA_HOUR_RESERVATION,
    FILL_CLIENT_DATA,
    INITIALIZE_MONTH_TURNS,
    INITILIZE_DAYWITHOWNTURNS,
    DELETE_DAY_FROM_DAYWITHOWNTURNS,
    TOGGLE_RELOAD,
    TOGGLE_ERROR_SAVING_TURN,
    TOGGLE_ERROR_DELETING_TURN,
    STORE_DATA_MONTH_TO_SEEK,
    CLEAR_LOGIN_ADMIN_ERROR,
    SEND_DATA_LOGIN_ADMIN,
    CLEAR_LOGIN_ADMIN_ALL,
    CLEAR_LOGIN_DOCTOR_ERROR,
    SEND_DATA_LOGIN_DOCTOR,
    CLEAR_LOGIN_DOCTOR_ALL,
} from '../actions/actionNames.js';


let initialArray = [
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
    {type: 'initial'},
] 


const initialState = {
    loginDoctorData:'',   //objeto que tiene el email,password y token de usuario doctor cuando se conecta
    loginDoctorValid: false,   //Boolean que dice si el usuario es un doctor valido,
    loginDoctorError: 0,       //Estado del intento de login doctor 0:no error, 1 ok, 2 no authorizado, 3 error servidor  


    loginAdminData:'',   //objeto que tiene el email,password y token de usuario administrador cuando se conecta
    loginAdminValid: false,   //Boolean que dice si el usuario es un admin valido,
    loginAdminError: 0,       //Estado del intento de login superroot 0:no error, 1 ok, 2 no authorizado, 3 error servidor  
    
    monthTurns: initialArray,     //turnos traidos de la collection turnos para un mes determinado.
    dayWithOwnTurns: [],         //Arreglo que tiene todos los dias que tiene turnos de un cliente en particular
    errorRecoverTurn: '',  //Se escribe si hubo error al recuperar los turnos de DB
    errorSavingTurn: '',   //Se escribe si hubo error al grabar un turno en la DB
    errorDeletingTurn: '', //Se escribe si hubo error al intentar borrar un turno
    seeHourList : false,    //activa y desactiva la pantalla el modal para los horarios para un dia especifico
    seeClientReservation: false, //activa y desactiva la pantalla modal para carga de datos de reserva de turno
    dayToSave: {},        //Dia que se despliega en los horarios de un dia   
    canceledTurn: [],      //Cuando alguien cancele el turno se copia sus datos para enviar el correo
    turnMessage: '',        //Mensaje que define cualquier operacion a DB con un turno, borrado o agregado

    dataHourReservation: '',   //Aca se cargan los datos para luego pasar a la base de datos el turno a crear SON DATOS DE LA FECHA Y HORA
    user: '',          // objeto con correo electronico y nombre del paciente que se loguea

    reload: 0,

    dataMonthToSeek: "",   //objeto que tiene todos los datos que se pasan cuando se busca un mes determinado y esta "" es porque no se busco nada

   

}


const rootReducer = (state=initialState, action) =>{
    switch(action.type) {

        case CLEAR_LOGIN_ADMIN_ALL: {
            return {
                ...state,
                loginAdminData:'',
                loginAdminValid: false,
                loginAdminError: 0
            }
        }

        case CLEAR_LOGIN_DOCTOR_ALL: {
            return {
                ...state,
                loginDoctorData:'',
                loginDoctorValid: false,
                loginDoctorError:0
            }
        }

        case CLEAR_LOGIN_DOCTOR_ERROR: {
            return {
                ...state,
                loginDoctorError: 0
            }
        }

        case SEND_DATA_LOGIN_DOCTOR: {
            return {
                ...state,
                loginDoctorValid: action.payload.valid,
                loginDoctorData: action.payload.data,
                loginDoctorError: action.payload.error,
            }
        }


        case CLEAR_LOGIN_ADMIN_ERROR: {
            return {
                ...state,
                loginAdminError: 0
            }
        }

        case SEND_DATA_LOGIN_ADMIN: {
            return {
                ...state,
                loginAdminValid: action.payload.valid,
                loginAdminData: action.payload.data,
                loginAdminError: action.payload.error,
            }
        }
       
        case STORE_DATA_MONTH_TO_SEEK: {
            return {
                ...state,
                dataMonthToSeek: action.payload
            }
        }

        case TOGGLE_ERROR_DELETING_TURN: {
            return {
                ...state,
                errorDeletingTurn: action.payload
            }
        }

        case TOGGLE_ERROR_SAVING_TURN: {
            return {
                ...state,
                errorSavingTurn: action.payload,
                reload: (state.reload==0)?1:0               //reload para ver si regenera o sino no borrar linea
            }
        }

        case TOGGLE_RELOAD: {
            return {
                ...state,
                reload: (state.reload==0)?1:0,
                errorSavingTurn: ''
            }
        }

        case INITILIZE_DAYWITHOWNTURNS: {
            return {
                ...state,
                dayWithOwnTurns: []
            }
        }
            
        case DELETE_DAY_FROM_DAYWITHOWNTURNS: {
            let tempo=[];
            let encontrado=false;
            
            for (let x=0; x<state.dayWithOwnTurns.length; x++){
                console.log(`day: ${state.dayWithOwnTurns[x]}`)
                if (state.dayWithOwnTurns[x]==action.payload && encontrado==false) {
                                encontrado=true;
                }else tempo.push(state.dayWithOwnTurns[x]);       
            }

            return {
                ...state,
                dayWithOwnTurns: (tempo)?tempo:[],
            }
        }

        case INITIALIZE_MONTH_TURNS: {
            return {
                ...state,
                monthTurns: initialArray,
                errorRecoverTurn: ""
            }
        }

        case FILL_CLIENT_DATA: {
            return {
                ...state,
                user: action.payload
            }
        }

        case FILL_DATA_HOUR_RESERVATION: {
            return {
                ...state,
                dataHourReservation: action.payload
            }
        }

        case TOGGLE_SEE_CLIENT_RESERVATION: 
            return {
                ...state,
                seeClientReservation: action.payload
            }

        case TOGGLE_CANCELED_TURN: {
            return {
                ...state,
                canceledTurn: [...state.canceledTurn,action.payload]
            }
        }

        case DAY_TO_SAVE: {
            return {
                ...state,
                dayToSave: action.payload
            }
        }

        case TOGGLE_SEE_HOUR_LIST: {
            return { 
                ...state,
                seeHourList: action.payload
            }
        }

        case GET_MONTH_TURNS: {
            return {
                ...state,
                monthTurns: action.payload.data,
                errorRecoverTurn: action.payload.error,
                dayWithOwnTurns: action.payload.data2
            }
        }

        default:
            return {...state}  
    }
}

export default rootReducer;