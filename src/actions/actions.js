import { decryptData, encryptData } from "../tools/crypto.js";
import {
  GET_MONTH_TURNS,
  TOGGLE_SEE_HOUR_LIST,
  DAY_TO_SAVE,
  TOGGLE_CANCELED_TURN,
  //DELETE_TURN_DB,
  //SEND_EMAIL_TO_PRO,
  TOGGLE_SEE_CLIENT_RESERVATION,
  FILL_DATA_HOUR_RESERVATION,
  FILL_CLIENT_DATA,
  INITIALIZE_MONTH_TURNS,
  DELETE_DAY_FROM_DAYWITHOWNTURNS,
  DELETE_ALL_DAYS_FROM_DAYWITHOWNTURNS,
  INITILIZE_DAYWITHOWNTURNS,
  TOGGLE_RELOAD,
  TOGGLE_ERROR_SAVING_TURN,
  TOGGLE_ERROR_DELETING_TURN,
  TOGGLE_ERROR_DELETING_TURN_ALL,
  TOGGLE_ERROR_DISABLING_TURN,
  STORE_DATA_MONTH_TO_SEEK,
  //   SEND_DATA_LOGIN,
  SEND_DATA_LOGIN_ADMIN,
  CLEAR_LOGIN_ADMIN_ERROR,
  CLEAR_LOGIN_ADMIN_ALL,
  SEND_DATA_LOGIN_DOCTOR,
  CLEAR_LOGIN_DOCTOR_ERROR,
  CLEAR_LOGIN_DOCTOR_ALL,
  RECOVER_DOCTORS_LIST,
  //   ACTIVATE_DAY,
  //   DISABLE_TURN,
  DISABLING_TURN_DATA,
  //   ENABLE_TURN,
  TOGGLE_ERROR_ENABLING_TURN,
  CLEAR_CANCELED_TURN,
  TOGGLE_ERROR_SENDING_EMAIL,
  SEND_TO_GLOBAL_STORE,
  TOGGLE_IS_DOCTOR_DISABLE_TURN,
  //   DELETE_AND_DISABLE_TURN,
  TOGGLE_WAITING_RESPONSE,
  TOGGLE_DELETE_AND_DISABLE_ERROR,
  //   DISABLE_ALL_DAY,
  SET_DISABLE_ALL_DAY_STATUS,
  CLEAR_DISABLE_ALL_DAY_STATUS,
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
} from "./actionNames.js";
import axios from "axios";

const VITE_APP_API = import.meta.env.VITE_APP_API;
const host = VITE_APP_API;

//Funcion que activa o desactiva la visibilidad del INSTRUCCIONES button en el header
export function toggleInstructionsButton(data) {
  return function (dispatch) {
    return dispatch({
      type: TOGGLE_INSTRUCTIONS_BUTTON,
      payload: data,
    });
  };
}

//Funcion para borrar el estadoGlobal errorDeletingDoctor
export function clearErrorDeletingDoctor() {
  return function (dispatch) {
    return dispatch({
      type: DELETE_DOCTOR_FROM_DB,
      payload: "",
    });
  };
}

//Funcion que borra fisicamente un doctor y todos los turnos relacionados de la base de datos
export function deleteDoctorFromDB(data) {
  return function (dispatch) {
    let codedData = encryptData(data);
    const options = {
      method: "POST",
      url: `${host}/admin/deleteDoctorAll`,
      data: { codedData },
    };

    axios
      .request(options)
      .then((resolve) => {
        console.log(resolve.data);
        return dispatch({
          type: DELETE_DOCTOR_FROM_DB,
          payload: resolve.data,
        });
      })
      .catch(() => {
        return dispatch({
          type: DELETE_DOCTOR_FROM_DB,
          payload: { status: "Error", message: "Error Deleting Doctor" },
        });
      });
  };
}

//Funcion que borra todo el estado errorCreatinDoctor
export function clearErrorCreatingDoctor() {
  return function (dispatch) {
    return dispatch({
      type: CREATE_DOCTOR,
      payload: "",
    });
  };
}

//Funcion que crea un nuevo doctor en db y devuelve errores si los hubiera
export function createDoctor(data) {
  return async function (dispatch) {
    let encodedData = encryptData(data);

    const options = {
      url: `${host}/admin/create`,
      method: "POST",
      data: { encodedData },
    };
    axios
      .request(options)
      .then((response) => {
        return dispatch({
          type: CREATE_DOCTOR,
          payload: response.data,
        });
      })
      .catch(() => {
        return dispatch({
          type: CREATE_DOCTOR,
          payload: {
            status: "Error",
            message: "Server Error",
          },
        });
      });
  };
}

//Vacia el estado global ErrorChangeDoctorAdmin
export function clearErrorChangeDoctorAdmin() {
  return function (dispatch) {
    return dispatch({
      type: CHANGE_DOCTOR_ADMIN_STATUS,
      payload: "",
    });
  };
}

//Cambia el estado del doctor a administrador (funcion del administrador) - si esta inhabilitado lo HABILITA.
export function changeDoctorAdminStatus(data) {
  return async function (dispatch) {
    let codedData = encryptData(data.id);
    let options = {
      url: `${host}/admin/adminOn`,
      method: "PUT",
      data: { data: codedData },
    };
    axios
      .request(options)
      .then((resolve) => {
        return dispatch({
          type: CHANGE_DOCTOR_ADMIN_STATUS,
          payload: resolve.data,
        });
      })
      .catch(() => {
        return dispatch({
          type: CHANGE_DOCTOR_ADMIN_STATUS,
          payload: { status: "Error", message: "Server Error" },
        });
      });
  };
}

//Vacia el estado global errorChangeDoctorStatus
export function clearErrorChangeDoctorStatus() {
  return function (dispatch) {
    return dispatch({
      type: CHANGE_DOCTOR_STATUS,
      payload: "",
    });
  };
}

//Cambia el status de un doctor para el menu admin
export function changeDoctorStatus(sendEncryptData) {
  return function (dispatch) {
    const options = {
      url: `${host}/admin/active`,
      method: "PUT",
      data: { sendEncryptData },
    };
    axios
      .request(options)
      .then((resolve) => {
        return dispatch({
          type: CHANGE_DOCTOR_STATUS,
          payload: resolve.data,
        });
      })
      .catch(() => {
        return dispatch({
          type: CHANGE_DOCTOR_STATUS,
          payload: { status: "Error" },
        });
      });
  };
}

//limpia el errorRecoveringDoctorList
export function clearDoctorList() {
  return function (dispatch) {
    return dispatch({
      type: CLEAR_DOCTOR_LIST,
    });
  };
}

export function getDoctorList(data) {
  return async function (dispatch) {
    const options = {
      url: `${host}/admin/doctorsAdminList`,
      method: "POST",
      data,
    };
    axios
      .request(options)
      .then((resolve) => {
        let status = resolve.data.status;
        let code = decryptData(resolve.data.data);
        if (status == "Ok")
          return dispatch({
            type: GET_DOCTOR_LIST,
            payload: { status, doctor: code },
          });
        else
          return dispatch({
            type: GET_DOCTOR_LIST,
            payload: { status, doctor: [] },
          });
      })
      .catch(() => {
        return dispatch({
          type: GET_DOCTOR_LIST,
          payload: { status: "Error", doctor: [] },
        });
      });
  };
}

//action que limpia el estado que muestra los errores al intentar recuperar el password de un doctor
export function clearErrorRecoveringDoctorPassword() {
  return function (dispatch) {
    return dispatch({
      type: RECOVER_PASSWORD_DOCTOR,
      payload: "",
    });
  };
}

//action que llama a la ruta de recuperacion de contraseña de doctor
export function recoverDoctorPassword(data) {
  return async function (dispatch) {
    let codedData = encryptData(data);
    const options = {
      method: "PUT",
      url: `${host}/doctors/recoverPassword`,
      data: { codedData },
    };

    axios
      .request(options)
      .then((resolve) => {
        return dispatch({
          type: RECOVER_PASSWORD_DOCTOR,
          payload: resolve.data,
        });
      })
      .catch((error) => {
        return dispatch({
          type: RECOVER_PASSWORD_DOCTOR,
          payload: { status: "Error" },
        });
      });
  };
}

//Funcion que limpia errorChangingDoctorPassword y loginDoctorData cuando se cambia de contraseña de doctor
export function clearLoginDoctor() {
  return function (dispatch) {
    return dispatch({
      type: CLEAR_LOGIN_DOCTOR,
    });
  };
}

//Funcion que envia los datos de cambio de contraseña de doctor y obtiene los resultados de la operacion
export function changeDoctorPassword(data) {
  return async function (dispatch) {
    let user = encryptData(data);
    const options = {
      method: "PUT",
      url: `${host}/doctors/changePassword`,
      data: { user },
    };

    axios
      .request(options)
      .then((resolve) => {
        if (resolve.data.status == "Ok")
          return dispatch({
            type: CHANGE_DOCTOR_PASSWORD,
            payload: { status: resolve.data, newPassword: data.newPassword },
          });
        else
          return dispatch({
            type: CHANGE_DOCTOR_PASSWORD,
            payload: { status: resolve.data, newPassword: null },
          });
      })
      .catch(() => {
        return dispatch({
          type: CHANGE_DOCTOR_PASSWORD,
          payload: {
            status: "Error",
            message: "Updated Invalid",
            newPassword: null,
          },
        });
      });
  };
}

//Almacena los datos del paciente
export function setPatientData(data) {
  return function (dispatch) {
    return dispatch({
      type: SET_PATIENT_DATA,
      payload: data,
    });
  };
}

//funcion que actualiza el canceledGlobalStore con los datos luego de borrar un email unsended
export function setCanceledGlobalStore(data) {
  return function (dispatch) {
    return dispatch({
      type: SET_CANCELEDGLOBALSTORE,
      payload: data,
    });
  };
}

export function clearDisableAllDayStatus(data) {
  return function (dispatch) {
    return dispatch({
      type: CLEAR_DISABLE_ALL_DAY_STATUS,
      payload: data,
    });
  };
}

//v2 funcion que va al back para inhabilitar un dia completo (doctor) va devolver los errores sobre cancelado de turnos, emails e inhabilitacion final
export const disableAllDay = (data, loginDoctorData, dayToDisable) => {
  return function (dispatch) {
    let doctorData = {
      stringName: loginDoctorData.stringName,
      title: loginDoctorData.title,
      email: loginDoctorData.email,
      id: loginDoctorData.id,
    };

    let options = {
      url: `${host}/turns/disableAllDay`,
      method: "POST",
      data: { data: data, doctorData: doctorData, dayToDisable: dayToDisable },
    };
    axios
      .request(options)
      .then((resolve) => {
        if (
          resolve.data.status.canceledTurn &&
          !resolve.data.status.emailSended
        ) {
          return dispatch({
            type: TOGGLE_DISABLE_ALL_DAY_EMAIL_ERROR_AND_CANCELEDGLOBALSTORE,
            payload: {
              status: resolve.data.status,
              canceledGlobalStore: resolve.data.status.turn,
            },
          });
        } else
          return dispatch({
            type: SET_DISABLE_ALL_DAY_STATUS,
            payload: {
              status: resolve.data.status,
              turns: resolve.data.status.turn,
            },
          });
      })
      .catch(() => {
        return dispatch({
          type: SET_DISABLE_ALL_DAY_STATUS,
          payload: {
            status: {
              canceledTurn: false,
              emailSended: false,
              disableDay: false,
            },
            turns: "",
          },
        });
      });
  };
};

//Funcion para cargar los resultados de las operaciones de delete and disable de doctor de ahi se mira para poner mensajes de resultados.
export const toggleDeleteAndDisableError = (data) => {
  return function (dispatch) {
    return dispatch({
      type: TOGGLE_DELETE_AND_DISABLE_ERROR,
      payload: data,
    });
  };
};

//Funcion que cambia el estado global waitingResponse, sirve para mostrar mensajes de waiting...
export const toggleWaitingResponse = (data) => {
  return function (dispatch) {
    return dispatch({
      type: TOGGLE_WAITING_RESPONSE,
      payload: data,
    });
  };
};

//Carga un valor en el estado de isDoctorDisableTurn para decir que es una inhabilitacion de turno cuando pasa por borrado de turnos existentes.
export function setToggleDisableTurn(data) {
  return function (dispatch) {
    let data1 = { doctor: data.doctor, data: data.data };
    return dispatch({
      type: TOGGLE_IS_DOCTOR_DISABLE_TURN,
      payload: data1,
    });
  };
}

//funcion para cargar la bandera si hubo un error al enviar emails
export const toggleErrorSendingEmail = (data) => {
  return function (dispatch) {
    return dispatch({
      type: TOGGLE_ERROR_SENDING_EMAIL,
      payload: data,
    });
  };
};

export const toggleErrorEnablingTurn = (data) => {
  return function (dispatch) {
    return dispatch({
      type: TOGGLE_ERROR_ENABLING_TURN,
      payload: { data1: "", data2: "" },
    });
  };
};

export const disablingTurnData = (data) => {
  return function (dispatch) {
    return dispatch({
      type: DISABLING_TURN_DATA,
      payload: data,
    });
  };
};

//Graba un registro poniendo ese turno com inhabilitado por el Doctor
export function disableTurn(data) {
  return async function (dispatch) {
    let options = {
      method: "POST",
      url: `${host}/turns/disable`,
      data,
    };

    axios
      .request(options)
      .then((resolve) => {
        let answer;
        if (resolve.data.status == "Ok") {
          answer = {
            code: 1,
            data: resolve.data.message,
          };
        } else {
          answer = {
            code: 3,
            data: resolve.data.message,
          };
        }
        return dispatch({
          type: TOGGLE_ERROR_DISABLING_TURN,
          payload: answer,
        });
      })
      .catch(() => {
        const answer = {
          code: 3,
          data: "",
        };
        return dispatch({
          type: TOGGLE_ERROR_DISABLING_TURN,
          payload: answer,
        });
      });
  };
}

export function enableTurn(data) {
  return async function (dispatch) {
    let options = {
      method: "DELETE",
      url: `${host}/turns/disabled`,
      data: { data },
    };

    axios
      .request(options)
      .then((resolve) => {
        if (resolve.data.status == "Ok") {
          return dispatch({
            type: TOGGLE_ERROR_ENABLING_TURN,
            payload: { data1: 1, data2: data },
          });
        }
        if (resolve.data.status == "Error")
          return dispatch({
            type: TOGGLE_ERROR_ENABLING_TURN,
            payload: { data1: 3, data2: "" },
          });
      })
      .catch(() => {
        return dispatch({
          type: TOGGLE_ERROR_ENABLING_TURN,
          payload: { data1: 3, data2: "" },
        });
      });
  };
}

//-Limpia el estado global errorActivatingDay que se usa para activar el dia inhabilitado por el doctor
export function clearErrorActivatingDay() {
  return function (dispatch) {
    return dispatch({
      type: TOGGLE_ERROR_ACTIVATING_DAY,
      payload: "",
    });
  };
}

//-Activa un dia inhabilitado por Doctor
export function activateDay(data) {
  return async function (dispatch) {
    const options = {
      method: "POST",
      url: `${host}/turns/activateDay`,
      data: { data },
    };

    axios
      .request(options)
      .then((resolve) => {
        if (resolve.data.status == "Error") {
          return dispatch({
            type: TOGGLE_ERROR_ACTIVATING_DAY,
            payload: { status: "Error" },
          });
        } else
          return dispatch({
            type: TOGGLE_RELOAD,
          });
      })
      .catch(() => {
        return dispatch({
          type: TOGGLE_ERROR_ACTIVATING_DAY,
          payload: { status: "Error" },
        });
      });
  };
}

//Recupera el listado de doctores pasandole si quiere activos, inactivos o todos
export function recoverDoctorsList(active) {
  return async function (dispatch) {
    let options = {
      method: "POST",
      url: `${host}/admin/doctorsList`,
      //con lo siguiente solo recupero lista de doctores activos
      data: { active },
    };
    axios
      .request(options)
      .then((resolve) => {
        if (resolve.data.message == "") {
          return dispatch({
            type: RECOVER_DOCTORS_LIST,
            payload: {
              ok: true,
              data: resolve.data.data,
            },
          });
        } else
          return dispatch({
            type: RECOVER_DOCTORS_LIST,
            payload: {
              ok: false,
              data: "",
            },
          });
      })
      .catch(() => {
        return dispatch({
          type: RECOVER_DOCTORS_LIST,
          payload: {
            ok: false,
            data: "",
          },
        });
      });
  };
}

//Limpieza de todos los campos de login Administrador (data, valid y error)
export function clearLoginAdminAll() {
  return function (dispatch) {
    return dispatch({
      type: CLEAR_LOGIN_ADMIN_ALL,
    });
  };
}

//Limpieza de todos los campos de login Doctor (data, valid y error)
export function clearLoginDoctorAll() {
  return function (dispatch) {
    return dispatch({
      type: CLEAR_LOGIN_DOCTOR_ALL,
    });
  };
}

//Limpieza del error de login de doctor en el estado global loginDoctorError
export function clearLoginDoctorError() {
  return function (dispatch) {
    return dispatch({
      type: CLEAR_LOGIN_DOCTOR_ERROR,
    });
  };
}

//Login de Doctores solamente
export function sendDataLoginDoctor(data) {
  return async function (dispatch) {
    const options = {
      method: "POST",
      url: `${host}/doctors/login`,
      data: { user: data },
    };
    axios
      .request(options)
      .then((resolve) => {
        let data;
        //Error de usuario invalido
        if (
          resolve.data.status == "Error" &&
          resolve.data.message == "Invalid User"
        ) {
          data = {
            valid: false,
            data: "",
            error: 2,
          };
        }
        if (
          resolve.data.status == "Error" &&
          resolve.data.message == "Server Error Try Again"
        ) {
          data = {
            valid: false,
            data: "",
            error: 3,
          };
        }
        //Usuario valido
        if (resolve.data.status == "Ok") {
          data = {
            valid: true,
            data: decryptData(resolve.data.data),
            error: 1,
          };
        }
        // console.log(data);
        return dispatch({
          type: SEND_DATA_LOGIN_DOCTOR,
          payload: data,
        });
      })
      .catch((error) => {
        let data = {
          valid: false,
          data: "",
          error: 3,
        };
        return dispatch({
          type: SEND_DATA_LOGIN_DOCTOR,
          payload: data,
        });
      });
  };
}

//Limpieza del error de login de administrador en el estado global loginAdminError
export function clearLoginAdminError() {
  return function (dispatch) {
    return dispatch({
      type: CLEAR_LOGIN_ADMIN_ERROR,
    });
  };
}

//Login de Administradors solamente
export function sendDataLoginAdmin(data) {
  return async function (dispatch) {
    const options = {
      method: "POST",
      url: `${host}/admin/login`,
      data: { user: data },
    };
    axios
      .request(options)
      .then((resolve) => {
        let data;
        //Error de usuario invalido
        if (
          resolve.data.status == "Error" &&
          resolve.data.message == "Invalid User"
        ) {
          data = {
            valid: false,
            data: "",
            error: 2,
          };
        }
        if (
          resolve.data.status == "Error" &&
          resolve.data.message == "Server Error Try Again"
        ) {
          data = {
            valid: false,
            data: "",
            error: 3,
          };
        }
        //Usuario valido
        if (resolve.data.status == "Ok") {
          data = {
            valid: true,
            data: decryptData(resolve.data.data),
            error: 1,
          };
        }
        return dispatch({
          type: SEND_DATA_LOGIN_ADMIN,
          payload: data,
        });
      })
      .catch(() => {
        let data = {
          valid: false,
          data: "",
          error: 3,
        };
        return dispatch({
          type: SEND_DATA_LOGIN_ADMIN,
          payload: data,
        });
      });
  };
}

//esto es para login de doctores
export function sendDataLogin(data) {
  return async function (dispatch) {
    const options = {
      method: "POST",
      url: `${host}/doctors`,
      data: { user: data }, //body
      //params: {prueba: 'pepepepe'}  //params  se recupera con req.query
    };

    axios
      .request(options)
      .then((resolve) => {
        console.log("se resolvio la busqueda");
        // console.log(resolve)
      })
      .catch((reject) => {
        console.log("hubo un error");
        console.log(reject);
      });
  };
}

export function sendMail(data, destination, loginDoctorData, sender) {
  //origin es quien envia = patient o dentist
  //destination puede ser = 'cancel' o 'create'
  return async function (dispatch) {
    let destiny = destination == "cancel" ? `/cancelTurn` : `/createTurn`;
    let options = {
      method: "POST",
      url: `${host}/mails${destiny}`,
      data: {
        sender,
        data,
        loginDoctorData,
      },
    };

    await axios
      .request(options)
      .then((resolve) => {
        if (resolve.data.status == "Ok") {
          return dispatch({
            type: CLEAR_CANCELED_TURN,
          });
        } else {
          return dispatch({
            type: TOGGLE_ERROR_SENDING_EMAIL,
            payload: 3,
          });
        }
      })
      .catch(() => {
        return dispatch({
          type: TOGGLE_ERROR_SENDING_EMAIL,
          payload: 3,
        });
      });
  };
}

export function storeDataMonthToSeek(data) {
  return function (dispatch) {
    return dispatch({
      type: STORE_DATA_MONTH_TO_SEEK,
      payload: data,
    });
  };
}

export function toggleErrorDeletingTurnAll(data) {
  return function (dispatch) {
    return dispatch({
      type: TOGGLE_ERROR_DELETING_TURN_ALL,
      payload: data,
    });
  };
}

export function toggleErrorDeletingTurn(data) {
  return function (dispatch) {
    return dispatch({
      type: TOGGLE_ERROR_DELETING_TURN,
      payload: data,
    });
  };
}

export function toggleErrorSavingTurn(data) {
  return function (dispatch) {
    return dispatch({
      type: TOGGLE_ERROR_SAVING_TURN,
      payload: data,
    });
  };
}

export function toggleErrorDisablingTurn(data) {
  return function (dispatch) {
    return dispatch({
      type: TOGGLE_ERROR_DISABLING_TURN,
      payload: data,
    });
  };
}

export function toggleReload() {
  return function (dispatch) {
    return dispatch({
      type: TOGGLE_RELOAD,
    });
  };
}

//borra el numero de dia del arreglo dayWithOwnTurns
export function deleteFromDayWithOwnTurns(data) {
  return function (dispatch) {
    return dispatch({
      type: DELETE_DAY_FROM_DAYWITHOWNTURNS,
      payload: data,
    });
  };
}

//borra el numero de dia en todas sus repeticiones del arreglo dayWithWonTurns para doctors
export function deleteAllFromDayWithOwnTurns(data, dayWithOwnTurns) {
  return function (dispatch) {
    let result = dayWithOwnTurns.filter((item) => item != data);
    return dispatch({
      type: DELETE_ALL_DAYS_FROM_DAYWITHOWNTURNS,
      payload: result,
    });
  };
}

export function initilizeDaysWithOwnTurns() {
  return function (dispatch) {
    return dispatch({
      type: INITILIZE_DAYWITHOWNTURNS,
    });
  };
}

export function initializeMonthTurns() {
  return function (dispatch) {
    return dispatch({
      type: INITIALIZE_MONTH_TURNS,
    });
  };
}

export function fillClientData(data) {
  return function (dispatch) {
    return dispatch({
      type: FILL_CLIENT_DATA,
      payload: data,
    });
  };
}

//-Se cargan los datos de turname, status, hourindex y offDuty para grabar un turno que estoy reservando*
export function fillDataHourReservation(data) {
  return function (dispatch) {
    return dispatch({
      type: FILL_DATA_HOUR_RESERVATION,
      payload: data,
    });
  };
}

//-Se activa o desactiva para visualizar el modal de carga de datos de reserva de cliente
export function toggleSeeClientReservation(data) {
  return function (dispatch) {
    return dispatch({
      type: TOGGLE_SEE_CLIENT_RESERVATION,
      payload: data,
    });
  };
}

export function sendEmailToPro(data) {
  return async function (dispatch) {
    let options = {
      method: "POST",
      url: `${host}/mails/toProfessional`,
      data: { data },
    };

    axios
      .request(options)
      .then((response) => {
        // console.log(response)

        //si recibe respuesta que envio debe borrar el arreglo globar canceledTurn
        let result = ok; //simulo que la respuesta es correcta, result==response (se enviaron los msg)
        //dispatch(eliminar canceledTurn global)
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function deleteTurnAllDB(data) {
  //necesito que venga el mes, dia, ano y id doctor
  return async function (dispatch) {
    console.log("action deleteTurnAllDB 638");
    let day = data.dayNow;
    let month = data.monthNow;
    let year = data.yearNow;
    let doctor = data.doctorNow;

    const options = {
      method: "DELETE",
      url: `${host}/turns/all`,
      params: { day, month, year, doctor },
    };

    axios
      .request(options)
      .then((response) => {
        let valor = response.data.status == "Ok" ? 1 : 3;
        return dispatch({
          type: TOGGLE_ERROR_DELETING_TURN_ALL,
          payload: valor,
        });
      })
      .catch(() => {
        return dispatch({
          type: TOGGLE_ERROR_DELETING_TURN_ALL,
          payload: 3,
        });
      });
  };
}

//-Funcion que borra un turno y luego inhabilita el mismo (doctor)
export function deleteAndDisableDB(data) {
  return async function (dispatch) {
    let options = {
      url: `${host}/turns/cancelAndDisable`,
      method: "DELETE",
      data: { data: data.data, loginDoctorData: data.loginDoctorData },
    };

    let result;
    await axios
      .request(options)
      .then((resolve) => {
        //voy a poner los resultados en deleteAndDisabledError y de ahi veo que cartel poner
        result = resolve.data;
        //si no se envio el mail lo almaceno en canceledGlobalStore
        if (!result.status.emailSended && result.status.canceledTurn) {
          let data = {
            canceledGlobalStore: result.status.turn,
            status: result.status,
          };
          return dispatch({
            type: "TOGGLE_DELETE_AND_DISABLE_ERROR_AND_CANCELEDGLOBALSTORE",
            payload: data,
          });
        } else
          return dispatch({
            type: TOGGLE_DELETE_AND_DISABLE_ERROR,
            payload: result,
          });
      })
      .catch(() => {
        return dispatch({
          type: TOGGLE_DELETE_AND_DISABLE_ERROR,
          payload: {
            status: {
              canceledTurn: false,
              emailSended: false,
              disabledTurn: false,
            },
          },
        });
      });
  };
}

//Funcion que borra un turno en la DB
export function deleteTurnDB(data) {
  return async function (dispatch) {
    const options = {
      method: "DELETE",
      url: `${host}/turns`,
      params: { _id: data },
    };

    axios
      .request(options)
      .then((response) => {
        return dispatch({
          type: TOGGLE_ERROR_DELETING_TURN,
          payload: response.data.status,
        });
      })
      .catch(() => {
        return dispatch({
          type: TOGGLE_ERROR_DELETING_TURN,
          payload: "Error",
        });
      });
  };
}

//funcion que envia todos los email sin mandar a canceledGlobalStore y vacia el canceledTurn
export function sendToGlobalStore(data) {
  return function (dispatch) {
    return dispatch({
      type: SEND_TO_GLOBAL_STORE,
      payload: data,
    });
  };
}

//La uso al inhabilitar el dia completo guarda temporariamente los turnos ocupados en canceledTurn
export function toggleCanceledTurn(data) {
  return function (dispatch) {
    return dispatch({
      type: TOGGLE_CANCELED_TURN,
      payload: data,
    });
  };
}

//-Tiene los datos del dia cuyo horarios estoy trabajando
export function dayToSave(data) {
  return function (dispatch) {
    return dispatch({
      type: DAY_TO_SAVE,
      payload: data,
    });
  };
}

//Cambia el estado de vision de la pantalla modal de horarios para un dia especificio*
export function toogleSeeHourList(data) {
  return function (dispatch) {
    return dispatch({
      type: TOGGLE_SEE_HOUR_LIST,
      payload: data,
    });
  };
}

//-Funcion que graba en la DB un turno por el PACIENTE
export function createTurnPatient({ data, user }) {
  return async function (dispatch) {
    let options = {
      method: "POST",
      url: `${host}/turns/patientCreate`,
      data: { data, user },
    };
    axios
      .request(options)
      .then((resolve) => {
        return dispatch({
          type: TOGGLE_ERROR_SAVING_TURN,
          payload: resolve.data,
        });
      })
      .catch((error) => {
        return dispatch({
          type: TOGGLE_ERROR_SAVING_TURN,
          payload: error.response.data,
        });
      });
  };
}

//-Funcion que graba en la DB un turno por el DOCTOR
export function createTurnDoctor({ data, doctor }) {
  return async function (dispatch) {
    let options = {
      method: "POST",
      url: `${host}/turns/doctorCreate`,
      data: { data, doctor },
    };
    axios
      .request(options)
      .then((resolve) => {
        if (resolve.data.data.created && !resolve.data.data.emailed) {
          return dispatch({
            type: TOGGLE_ERROR_SAVING_TURN_AND_CANCELEDGLOBALSTORE,
            payload: resolve.data,
          });
        } else
          return dispatch({
            type: TOGGLE_ERROR_SAVING_TURN,
            payload: resolve.data,
          });
      })
      .catch((error) => {
        return dispatch({
          type: TOGGLE_ERROR_SAVING_TURN,
          payload: error.response.data,
        });
      });
  };
}

export function getMonthTurns(data) {
  return async function (dispatch) {
    let options = {
      method: "get",
      url: `${host}/turns`,
      params: data,
    };
    axios
      .request(options)
      .then((resolve) => {
        if (resolve.data.status == "Ok") {
          let result = {
            data: resolve.data.data,
            data2: resolve.data.data2 ? resolve.data.data2 : [],
            error: "",
          };
          return dispatch({
            type: GET_MONTH_TURNS,
            payload: result,
          });
        } else {
          let result = {
            data: "",
            data2: [],
            error: "Error Recuperacion Turnos",
          };
          return dispatch({
            type: GET_MONTH_TURNS,
            payload: result,
          });
        }
      })
      .catch(() => {
        let result = {
          data: "",
          data2: [],
          error: "Error Recuperacion Turnos",
        };
        return dispatch({
          type: GET_MONTH_TURNS,
          payload: result,
        });
      });
  };
}
