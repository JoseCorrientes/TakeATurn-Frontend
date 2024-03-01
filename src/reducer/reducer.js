import {
  GET_MONTH_TURNS,
  TOGGLE_SEE_HOUR_LIST,
  DAY_TO_SAVE,
  TOGGLE_CANCELED_TURN,
  CLEAR_CANCELED_TURN,
  TOGGLE_SEE_CLIENT_RESERVATION,
  FILL_DATA_HOUR_RESERVATION,
  FILL_CLIENT_DATA,
  INITIALIZE_MONTH_TURNS,
  INITILIZE_DAYWITHOWNTURNS,
  DELETE_DAY_FROM_DAYWITHOWNTURNS,
  DELETE_ALL_DAYS_FROM_DAYWITHOWNTURNS,
  TOGGLE_RELOAD,
  TOGGLE_ERROR_SAVING_TURN,
  TOGGLE_ERROR_DELETING_TURN,
  TOGGLE_ERROR_DELETING_TURN_ALL,
  TOGGLE_ERROR_DISABLING_TURN,
  STORE_DATA_MONTH_TO_SEEK,
  CLEAR_LOGIN_ADMIN_ERROR,
  SEND_DATA_LOGIN_ADMIN,
  CLEAR_LOGIN_ADMIN_ALL,
  CLEAR_LOGIN_DOCTOR_ERROR,
  SEND_DATA_LOGIN_DOCTOR,
  CLEAR_LOGIN_DOCTOR_ALL,
  RECOVER_DOCTORS_LIST,
  DISABLING_TURN_DATA,
  TOGGLE_ERROR_ENABLING_TURN,
  TOGGLE_ERROR_SENDING_EMAIL,
  SEND_TO_GLOBAL_STORE,
  TOGGLE_IS_DOCTOR_DISABLE_TURN,
  TOGGLE_WAITING_RESPONSE,
  TOGGLE_DELETE_AND_DISABLE_ERROR,
  SET_DISABLE_ALL_DAY_STATUS,
  CLEAR_DISABLE_ALL_DAY_STATUS,
  TOGGLE_DELETE_AND_DISABLE_ERROR_AND_CANCELEDGLOBALSTORE,
  TOGGLE_DISABLE_ALL_DAY_EMAIL_ERROR_AND_CANCELEDGLOBALSTORE,
  TOGGLE_ERROR_SAVING_TURN_AND_CANCELEDGLOBALSTORE,
  TOGGLE_ERROR_ACTIVATING_DAY,
  SET_CANCELEDGLOBALSTORE,
  SET_PATIENT_DATA,
  CHANGE_DOCTOR_PASSWORD,
  CLEAR_LOGIN_DOCTOR,
  RECOVER_PASSWORD_DOCTOR,
  GET_DOCTOR_LIST,
  CLEAR_DOCTOR_LIST,
  CHANGE_DOCTOR_STATUS,
  CHANGE_DOCTOR_ADMIN_STATUS,
  CREATE_DOCTOR,
  DELETE_DOCTOR_FROM_DB,
  TOGGLE_INSTRUCTIONS_BUTTON,
} from "../actions/actionNames.js";
import { disablingTurnData } from "../actions/actions.js";

let initialArray = [
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
  { type: "initial" },
];

const initialState = {
  showInstructions: false, //Estado global que se pone a true para mostrar el boton de instrucciones cuando entra a showmonth y se apaga al salir de el

  errorDeletingDoctor: "", //Se escribe si hubo error al borrar un doctor y sus turnos de la db por parte del administrador
  errorCreatingDoctor: "", //Se escribe si hubo error al crear un nuevo doctor por parte del administrador
  errorChangeDoctorAdmin: "", //Se escribe si hubo error al cambiar el estado de un doctor a administrador activo.
  errorChangeDoctorStatus: "", //Se escribe si hubo error al cambiar el estado de un doctor por el admin.
  errorRecoveringDoctorList: "", //Se escribe si hubo error al recupera el listado de doctores para el administrador
  errorRecoveringDoctorPassword: "", //Se escribe si hubo error al recuperar la password de un doctor.
  errorChangingDoctorPassword: "", //Se escribe si hubo error al cambiar el password de un doctor
  errorSavingTurn: "", //Se escribe si hubo error al grabar un turno en la DB
  errorDeletingTurnAll: "", //Se escribe si hubo error al intentar borrar todos los turnos del dia en modo doctor
  errorDisablingTurn: "", //Se escribe si hubo un error al inhabilitar un turno en particular por el doctor '': no error 1: todo ok 2: error servidor
  errorDeletingTurn: "", //Se escribe si hubo error al intentar borrar un turno
  errorSendingEmail: "", //Se guarda si hubo un error al enviar el email, se envia=1, error servidor=3
  errorEnablingTurn: "", //Se escribe si hubo un error al habilitar un turno desabilitado por el doctor,
  errorRecoverTurn: "", //Se escribe si hubo error al recuperar los turnos de DB
  errorActivatingDay: "", //Se escribe si hubo error al activar un dia desactivado por el doctor
  disableDayTurns: [], //Guardo los turnos inhabilitados que vienen del back
  disableAllDayStatus: "", //Guardo los estados luego de mandar inahbilitar un dia completo por el doctor

  canceledTurn: [], //Cuando alguien cancele el turno se copia sus datos para enviar el correo
  canceledGlobalStore: [], //Se almacena aqui todas las fallas de envio de correo para que el dr marque las que avisa personalmente
  waitingResponse: false, //bandera para decir que estamos esperando respuesta de backend

  isDoctorDisableTurn: false, // bandera para decir que es una deshabilitacion cuando entra a anular turnos existentes.
  deleteAndDisableData: "", //Guardo los datos de paciente que cancelo para inhabilitar (doctor)
  deleteAndDisableError: "", //Guardo los resultados de la operacion que viene del backend

  doctorsList: "", //Listado de los doctores que se consulta, con email, id y stringname
  doctorsListError: "", //Estado luego de leer los nombres de los doctores.

  loginDoctorData: "", //objeto que tiene el email,password y token de usuario doctor cuando se conecta
  loginDoctorValid: false, //Boolean que dice si el usuario es un doctor valido,
  loginDoctorError: 0, //Estado del intento de login doctor 0:no error, 1 ok, 2 no authorizado, 3 error servidor

  loginAdminData: "", //objeto que tiene el email,password y token de usuario administrador cuando se conecta
  loginAdminValid: false, //Boolean que dice si el usuario es un admin valido,
  loginAdminError: 0, //Estado del intento de login superroot 0:no error, 1 ok, 2 no authorizado, 3 error servidor

  monthTurns: initialArray, //turnos traidos de la collection turnos para un mes determinado.
  dayWithOwnTurns: [], //Arreglo que tiene todos los dias que tiene turnos de un cliente en particular

  disablingTurnData: "", //Objeto que tiene los datos del turno que se anulo para pasar a DayToSave

  enablingTurnData: "", //Objeto que tiene los datos del turno que se habilito para pasar a DayToSave

  seeHourList: false, //activa y desactiva la pantalla el modal para los horarios para un dia especifico
  seeClientReservation: false, //activa y desactiva la pantalla modal para carga de datos de reserva de turno
  dayToSave: {}, //Dia que se despliega en los horarios de un dia

  turnMessage: "", //Mensaje que define cualquier operacion a DB con un turno, borrado o agregado

  dataHourReservation: "", //Aca se cargan los datos para luego pasar a la base de datos el turno a crear SON DATOS DE LA FECHA Y HORA
  user: "", // objeto con correo electronico y nombre del paciente que se loguea

  reload: true, //uso para regenerar la pantalla, es un toggle

  dataMonthToSeek: "", //objeto que tiene todos los datos que se pasan cuando se busca un mes determinado y esta "" es porque no se busco nada

  patientData: "", //Datos del paciente para ver en detalle
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    //Cambia el global showInstructions para que se vea o no el boton de instrucciones del header
    case TOGGLE_INSTRUCTIONS_BUTTON:
      return {
        ...state,
        showInstructions: action.payload,
      };

    //Graba el estado global errorDeletingDoctor despues de tratar de borrar un doctor de la db
    case DELETE_DOCTOR_FROM_DB:
      return {
        ...state,
        errorDeletingDoctor: action.payload,
      };

    //cambia el estado de errorCreatingDoctor luego de crear un nuevo doctor en db
    case CREATE_DOCTOR: {
      return {
        ...state,
        errorCreatingDoctor: action.payload,
      };
    }

    //cambia el estado de errorChangeDoctorAdmin
    case CHANGE_DOCTOR_ADMIN_STATUS: {
      return {
        ...state,
        errorChangeDoctorAdmin: action.payload,
      };
    }

    //cambia el estado de errorChangeDoctorStatus
    case CHANGE_DOCTOR_STATUS: {
      return {
        ...state,
        errorChangeDoctorStatus: action.payload,
      };
    }

    //limpia el estado globar errorRecoveringDoctorList
    case CLEAR_DOCTOR_LIST: {
      return {
        ...state,
        errorRecoveringDoctorList: "",
      };
    }

    //Recupera la lista de doctores para el admin
    case GET_DOCTOR_LIST: {
      return {
        ...state,
        errorRecoveringDoctorList: action.payload,
      };
    }

    //Guarda el resultado de la accion de recuperar la contrasenia del doctor
    case RECOVER_PASSWORD_DOCTOR: {
      return {
        ...state,
        errorRecoveringDoctorPassword: action.payload,
      };
    }
    //Limpia el login del doctor para salir a la pantalla de login inicial de doctor
    case CLEAR_LOGIN_DOCTOR: {
      return {
        ...state,
        errorChangingDoctorPassword: "",
        loginDoctorData: "",
        loginDoctorError: 0,
        loginDoctorValid: false,
      };
    }

    //Se actualiza el estado luego de que se intento cambiar la contrasenia de un doctor.
    case CHANGE_DOCTOR_PASSWORD: {
      if (action.payload.newPassword == null)
        return {
          ...state,
          errorChangingDoctorPassword: action.payload,
        };
      else
        return {
          ...state,
          loginDoctorData: {
            ...state.loginDoctorData,
            password: action.payload.newPassword,
          },
          errorChangingDoctorPassword: action.payload,
        };
    }

    //Actualiza el valor de patientData, para poder ver en detalle los datos del paciente.
    case SET_PATIENT_DATA: {
      return {
        ...state,
        patientData: action.payload,
      };
    }

    //Actualiza el valor del canceledGlobalStore luego que el doctor elimina un email recordatorio de aviso
    case SET_CANCELEDGLOBALSTORE: {
      return {
        ...state,
        canceledGlobalStore: action.payload,
      };
    }

    //Carga en el estado errorActivatingDay el resultado del intento de activar un dia
    case TOGGLE_ERROR_ACTIVATING_DAY: {
      return {
        ...state,
        errorActivatingDay: action.payload,
      };
    }

    case CLEAR_DISABLE_ALL_DAY_STATUS: {
      return {
        ...state,
        disableAllDayStatus: action.payload,
      };
    }

    case SET_DISABLE_ALL_DAY_STATUS: {
      let data = { status: action.payload.status };
      return {
        ...state,
        disableAllDayStatus: data,
        canceledTurn: action.payload.turns,
        waitingResponse: false,
      };
    }

    //Recibe datos para cambiar el estado de waitingResponse
    case TOGGLE_WAITING_RESPONSE: {
      return {
        ...state,
        waitingResponse: action.payload,
      };
    }

    //cambia el estado de isDoctorDisableTurn Sirve para decir que es una inhabilitacion de turno ocupado al pasar por borrado de turno y envio de correo.
    case TOGGLE_IS_DOCTOR_DISABLE_TURN: {
      return {
        ...state,
        isDoctorDisableTurn: action.payload.doctor,
        deleteAndDisableData: action.payload.data,
      };
    }

    //agrego lo pasado a canceledGlobalStore y tambien a disableAllDayStatus (es para cuando no es puede enviar correos al user cuando se inhabilita un dia completo)
    case TOGGLE_DISABLE_ALL_DAY_EMAIL_ERROR_AND_CANCELEDGLOBALSTORE: {
      return {
        ...state,
        canceledGlobalStore: [...state.canceledGlobalStore].concat(
          action.payload.canceledGlobalStore
        ),
        disableAllDayStatus: { status: action.payload.status },
        waitingResponse: false,
      };
    }

    //carga deleteAndDisableError con los resultados que vienen del back
    case TOGGLE_DELETE_AND_DISABLE_ERROR: {
      return {
        ...state,
        deleteAndDisableError: action.payload,
      };
    }

    //agrega lo pasado a canceledGlobalStore y tambien a deleteAndDisableError (es para cuando no se pudo enviar el correo al usuario)
    case TOGGLE_DELETE_AND_DISABLE_ERROR_AND_CANCELEDGLOBALSTORE: {
      return {
        ...state,
        canceledGlobalStore: [
          ...state.canceledGlobalStore,
          action.payload.canceledGlobalStore,
        ],
        deleteAndDisableError: { status: action.payload.status },
      };
    }

    //pasa el contenido de canceledTurn a canceledGlobalStore
    case SEND_TO_GLOBAL_STORE: {
      return {
        ...state,
        canceledGlobalStore: [...state.canceledGlobalStore, action.payload],
        canceledTurn: [],
      };
    }

    case TOGGLE_ERROR_ENABLING_TURN: {
      return {
        ...state,
        errorEnablingTurn: action.payload.data1,
        enablingTurnData: action.payload.data2,
      };
    }

    case DISABLING_TURN_DATA: {
      return {
        ...state,
        disablingTurnData: action.payload,
      };
    }

    //cuando el dr ihabilita un turno, la grabacion graba el status de la grabacion 1 o 3 y los datos a deshabilitar para modificar el
    //dayToSave (Estado General)
    case TOGGLE_ERROR_DISABLING_TURN: {
      return {
        ...state,
        errorDisablingTurn: action.payload.code,
        disablingTurnData: action.payload.data,
      };
    }

    case RECOVER_DOCTORS_LIST: {
      if (action.payload.ok == true && action.payload.data.length > 0) {
        return {
          ...state,
          doctorsList: action.payload.data,
          doctorsListError: false,
        };
      } else {
        return {
          ...state,
          doctorsList: "",
          doctorsListError: true,
        };
      }
    }

    case CLEAR_LOGIN_ADMIN_ALL: {
      return {
        ...state,
        loginAdminData: "",
        loginAdminValid: false,
        loginAdminError: 0,
      };
    }

    case CLEAR_LOGIN_DOCTOR_ALL: {
      return {
        ...state,
        loginDoctorData: "",
        loginDoctorValid: false,
        canceledGlobalStore: [],
        loginDoctorError: 0,
      };
    }

    case CLEAR_LOGIN_DOCTOR_ERROR: {
      return {
        ...state,
        loginDoctorError: 0,
      };
    }

    case SEND_DATA_LOGIN_DOCTOR: {
      return {
        ...state,
        loginDoctorValid: action.payload.valid,
        loginDoctorData: action.payload.data,
        loginDoctorError: action.payload.error,
      };
    }

    case CLEAR_LOGIN_ADMIN_ERROR: {
      return {
        ...state,
        loginAdminError: 0,
      };
    }

    case SEND_DATA_LOGIN_ADMIN: {
      return {
        ...state,
        loginAdminValid: action.payload.valid,
        loginAdminData: action.payload.data,
        loginAdminError: action.payload.error,
      };
    }

    case STORE_DATA_MONTH_TO_SEEK: {
      return {
        ...state,
        dataMonthToSeek: action.payload,
      };
    }

    case TOGGLE_ERROR_DELETING_TURN_ALL: {
      return {
        ...state,
        errorDeletingTurnAll: action.payload,
      };
    }

    case TOGGLE_ERROR_DELETING_TURN: {
      return {
        ...state,
        errorDeletingTurn: action.payload,
      };
    }

    //-Se almacena en errorSavingTurn los resultados de intentar grabar un turno, y luego se hace un reload
    case TOGGLE_ERROR_SAVING_TURN: {
      return {
        ...state,
        errorSavingTurn: action.payload,
        reload: state.reload == 0 ? 1 : 0, //reload para ver si regenera o sino no borrar linea
      };
    }

    //-Se almacena en errorSavingTurn los resultado de intentar grabar un turno y se graba tambien en canceledGlobalStore, esto es para el doctor cuando no se pudo enviar el correo de aviso al paciente
    case TOGGLE_ERROR_SAVING_TURN_AND_CANCELEDGLOBALSTORE: {
      return {
        ...state,
        errorSavingTurn: action.payload,
        canceledGlobalStore: [...state.canceledGlobalStore].concat(
          action.payload.toStore
        ),
        reload: state.reload == 0 ? 1 : 0, //reload para ver si regenera o sino no borrar linea
      };
    }

    case TOGGLE_RELOAD: {
      return {
        ...state,
        reload: !state.reload,
        // reload: (state.reload==0)?1:0,
        errorSavingTurn: "",
      };
    }

    case INITILIZE_DAYWITHOWNTURNS: {
      return {
        ...state,
        dayWithOwnTurns: [],
      };
    }

    case DELETE_ALL_DAYS_FROM_DAYWITHOWNTURNS: {
      return {
        ...state,
        dayWithOwnTurns: action.payload,
      };
    }

    case DELETE_DAY_FROM_DAYWITHOWNTURNS: {
      let tempo = [];
      let encontrado = false;

      for (let x = 0; x < state.dayWithOwnTurns.length; x++) {
        if (state.dayWithOwnTurns[x] == action.payload && encontrado == false) {
          encontrado = true;
        } else tempo.push(state.dayWithOwnTurns[x]);
      }

      return {
        ...state,
        dayWithOwnTurns: tempo ? tempo : [],
      };
    }

    case INITIALIZE_MONTH_TURNS: {
      return {
        ...state,
        monthTurns: initialArray,
        errorRecoverTurn: "",
      };
    }

    case FILL_CLIENT_DATA: {
      return {
        ...state,
        user: action.payload,
      };
    }

    //-Se cargan los datos de turname, status, hourindex y offDuty para grabar un turno que estoy reservando
    case FILL_DATA_HOUR_RESERVATION: {
      return {
        ...state,
        dataHourReservation: action.payload,
      };
    }

    //-Se activa o desactiva para visualizar el modal de carga de datos de reserva de cliente
    case TOGGLE_SEE_CLIENT_RESERVATION:
      return {
        ...state,
        seeClientReservation: action.payload,
      };

    case CLEAR_CANCELED_TURN: {
      return {
        ...state,
        canceledTurn: [],
        errorSendingEmail: "",
      };
    }

    case TOGGLE_ERROR_SENDING_EMAIL: {
      return {
        ...state,
        errorSendingEmail: action.payload,
      };
    }

    // elimine de la llamada de la cancelacion de usuario, ver si se usa en otro lado mas
    case TOGGLE_CANCELED_TURN: {
      return {
        ...state,
        canceledTurn: action.payload,
        // canceledTurn: [...state.canceledTurn,action.payload] ver si no se usa asi era originariamente
      };
    }

    //-dayToSave contiene los datos del dia cuyo turnos estoy procesando
    case DAY_TO_SAVE: {
      return {
        ...state,
        dayToSave: action.payload,
      };
    }

    //carga un valor de true or false a seeHourList*
    case TOGGLE_SEE_HOUR_LIST: {
      return {
        ...state,
        seeHourList: action.payload,
      };
    }

    case GET_MONTH_TURNS: {
      return {
        ...state,
        monthTurns: action.payload.data,
        errorRecoverTurn: action.payload.error,
        dayWithOwnTurns: action.payload.data2,
      };
    }

    default:
      return { ...state };
  }
};

export default rootReducer;

