import { decryptData } from '../tools/crypto.js';
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
    INITILIZE_DAYWITHOWNTURNS,
    TOGGLE_RELOAD,
    TOGGLE_ERROR_SAVING_TURN,
    TOGGLE_ERROR_DELETING_TURN,
    STORE_DATA_MONTH_TO_SEEK,
    SEND_DATA_LOGIN,
    SEND_DATA_LOGIN_ADMIN,
    CLEAR_LOGIN_ADMIN_ERROR,
    CLEAR_LOGIN_ADMIN_ALL,
    SEND_DATA_LOGIN_DOCTOR,
    CLEAR_LOGIN_DOCTOR_ERROR,
    CLEAR_LOGIN_DOCTOR_ALL,

}from './actionNames.js';
import axios from 'axios';

const VITE_APP_API = import.meta.env.VITE_APP_API;
const host= VITE_APP_API ;

//Limpieza de todos los campos de login Administrador (data, valid y error)
export function clearLoginAdminAll (){
    return function (dispatch){
        return dispatch({
            type: CLEAR_LOGIN_ADMIN_ALL,
        })
    }
}

//Limpieza de todos los campos de login Doctor (data, valid y error)
export function clearLoginDoctorAll(){
    return function(dispatch) {
        return dispatch({
            type: CLEAR_LOGIN_DOCTOR_ALL,
        })
    }
}

//Limpieza del error de login de doctor en el estado global loginDoctorError
export function clearLoginDoctorError(){
    return function (dispatch){
        return dispatch({
            type: CLEAR_LOGIN_DOCTOR_ERROR,
        })
    }
}

//Login de Doctores solamente
export function sendDataLoginDoctor (data) {
    return async function(dispatch) {
        const options = {
            method: 'POST',
            url: `${host}/doctors/login`,
            data: {user: data}
        }
        axios
        .request(options)
        .then((resolve)=>{
            let data;
            //Error de usuario invalido
            if (resolve.data.status=='Error' && resolve.data.message=='Invalid User') {
                data={
                    valid: false,
                    data: '',
                    error:2 
                } 
            }
            if (resolve.data.status=='Error' && resolve.data.message=='Server Error Try Again') {
                data={
                    valid: false,
                    data: '',
                    error:3 
                } 
            }
            //Usuario valido
            if(resolve.data.status=='Ok') {
                data={
                    valid:true,
                    data: decryptData(resolve.data.data),
                    error:1 
                }
            }
            // console.log(data);
            return dispatch({
                type: SEND_DATA_LOGIN_DOCTOR,
                payload: data
            })
                            

        })
        .catch((error)=>{
            let data={
                valid: false,
                data: '',
                error:3 
            }
            return dispatch({
                type: SEND_DATA_LOGIN_DOCTOR,
                payload: data
            })
        })  
    }
}


//Limpieza del error de login de administrador en el estado global loginAdminError
export function clearLoginAdminError (){
    return function(dispatch){
        return dispatch({
            type: CLEAR_LOGIN_ADMIN_ERROR,
        })
    }
}

//Login de Administradors solamente
export function sendDataLoginAdmin (data) {
    return async function(dispatch) {
        const options = {
            method: 'POST',
            url: `${host}/admin/login`,
            data: {user: data}
        }
        axios
        .request(options)
        .then((resolve)=>{
            console.log(' resolve: ');
            console.log(resolve.data)
            let data;
            //Error de usuario invalido
            if (resolve.data.status=='Error' && resolve.data.message=='Invalid User') {
                data={
                    valid: false,
                    data: '',
                    error:2 
                } 
            }
            if (resolve.data.status=='Error' && resolve.data.message=='Server Error Try Again') {
                data={
                    valid: false,
                    data: '',
                    error:3 
                } 
            }
            //Usuario valido
            if(resolve.data.status=='Ok') {
                data={
                    valid:true,
                    data: decryptData(resolve.data.data),
                    error:1 
                }
            }
            // console.log(data);
            return dispatch({
                type: SEND_DATA_LOGIN_ADMIN,
                payload: data
            })
                            

        })
        .catch((error)=>{
            console.log('hubo un problema al acceder al backend')
            console.log(error);
            let data={
                valid: false,
                data: '',
                error:3 
            }
            return dispatch({
                type: SEND_DATA_LOGIN_ADMIN,
                payload: data
            })

        })  


    }
}

//esto es para login de doctores
export function sendDataLogin(data) {
    return async function(dispatch) {
        const options = {
            method: 'POST',
            url: `${host}/doctors`,
            data: {user: data},   //body
            //params: {prueba: 'pepepepe'}  //params  se recupera con req.query
        }

        axios 
        .request(options)
        .then((resolve)=>{
            console.log( 'se resolvio la busqueda')
            console.log(resolve)
        })
        .catch((reject)=>{
            console.log('hubo un error')
            console.log(reject)
        })

    }
}

export function sendMail (data, destination) {
    return function (dispatch) {

        let path = (destination=='dentist')? `/toProfessional`: `/toPatient`  

        let options= {
            method: 'POST',
            url: `${host}/mails${path}`,
            data
        }

        axios
        .request(options)
        .then(resolve=>{
            console.log('se resolvio el correo:')
            // console.log(resolve)
        })
        .catch(error=>{
            console.log('hubo error enviando el correo')
            // console.log(error)
        })
    }
}

export function storeDataMonthToSeek (data){
    return function (dispatch) {
        return dispatch({
            type: STORE_DATA_MONTH_TO_SEEK,
            payload: data,
        })
    }
}
 
export function toggleErrorDeletingTurn (data) {
    return function (dispatch) {
        return dispatch ({
            type: TOGGLE_ERROR_DELETING_TURN,
            payload: data
        })
    }
}

export function toggleErrorSavingTurn (data) {
    return function (dispatch) {
        return dispatch({
            type: TOGGLE_ERROR_SAVING_TURN,
            payload: data
        })
    }
}

export function toggleReload () {
    return function (dispatch) {
        return dispatch({
            type: TOGGLE_RELOAD,
        })
    }
}

//borra el numero de dia del arreglo dayWithOwnTurns
export function deleteFromDayWithOwnTurns (data) {
    return function (dispatch) {
        return dispatch({
            type: DELETE_DAY_FROM_DAYWITHOWNTURNS,
            payload: data,
        })
    }
}

export function initilizeDaysWithOwnTurns () {
    return function (dispatch) {
        return dispatch({
            type: INITILIZE_DAYWITHOWNTURNS,
        })
    }
}

export function initializeMonthTurns () {
    return function(dispatch){
        return dispatch({
            type: INITIALIZE_MONTH_TURNS,
        })
    }

}

export function fillClientData (data){
    return function (dispatch){
        return dispatch({
            type: FILL_CLIENT_DATA,
            payload: data
        })
    }
}

export function fillDataHourReservation (data){
    return function (dispatch){
        return dispatch({
            type: FILL_DATA_HOUR_RESERVATION,
            payload: data
        })
    }
}    

export function toggleSeeClientReservation (data) {
    return function(dispatch) {
        return dispatch({
            type: TOGGLE_SEE_CLIENT_RESERVATION,
            payload: data
        })
    }
}

export function sendEmailToPro (data) {
    return async function(dispatch) {
        let options = {
            method: 'POST',
            url: `${host}/mails/toProfessional`,
            data: { data }
        }

        axios
        .request(options)
        .then(response=>{
            console.log(response)
            
            //si recibe respuesta que envio debe borrar el arreglo globar canceledTurn
            let result = ok //simulo que la respuesta es correcta, result==response (se enviaron los msg)
            //dispatch(eliminar canceledTurn global)




        })
        .catch(error=>{
            console.log(error)
        })

    }
}

export function deleteTurnDB(data) {
    return async function (dispatch) {
    const options = {
            method: 'DELETE',
            url: `${host}/turns`,
            params: { _id: data},
    }

    axios
        .request(options)
        .then(response=>{
            // console.log('response.data.status')
            // console.log(response.data.status)
            return dispatch ({
                type: TOGGLE_ERROR_DELETING_TURN,
                payload: response.data.status,
            })
            
        })
        .catch(error=>{
            return dispatch ({
                type: TOGGLE_ERROR_DELETING_TURN,
                payload: error.response.data.status
        })

        })
}}

export function toggleCanceledTurn (data) {
    return function(dispatch) {
        return dispatch({
            type: TOGGLE_CANCELED_TURN,
            payload: data,
        })
    }
}

export function dayToSave (data) {
    return function (dispatch) {
        return dispatch ({
            type: DAY_TO_SAVE,
            payload: data
        })
    }
}

export function toogleSeeHourList (data) {
    return function(dispatch) {
        return dispatch({
            type: TOGGLE_SEE_HOUR_LIST,
            payload: data
        })
    }
}

export function saveTurn (data) {
    return async function(dispatch) {

        let options = {
            method: 'POST',
            url: `${host}/turns`,
            data
        }

        axios
        .request(options)
        .then(resolve=>{
            // console.log('Resultado que viene del BACKEND AL GRABAR TURNO:')
            // console.log('resultado comun en action saveTrun')
            // console.log(resolve.data)   //puede ser Ok o Error
            // console.log('---------------------------------')
            return dispatch({
                type: TOGGLE_ERROR_SAVING_TURN,
                payload: resolve.data.status
            })
        })
        .catch(error=>{
            // console.log('ERROR que viene del BACKEND AL GRABAR TURNO:')
            // console.log('ERROR comun en action saveTrun')
            // console.error('ha ocurrido un error')
            // console.log(error.response.data)
            return dispatch({
                type: TOGGLE_ERROR_SAVING_TURN,
                payload: error.response.data.status
            })
        })

    }
}

export function getMonthTurns(data) {
    return async function(dispatch) {



        let options = {
            method: 'get',
            url: `${host}/turns`,
            params: data,
        }

        axios
            .request(options)
            .then(resolve => {
                    if (resolve.data.status=='Ok') {
                                    let result = {
                                        data: resolve.data.data,
                                        data2: resolve.data.data2?resolve.data.data2:[],
                                        error: ''
                                    }
                                    return dispatch({
                                        type: GET_MONTH_TURNS,
                                        payload: result,
                                    })
                    } else {
                                    console.log('no ese pudo recuperar status no ok estamos probando')
                                    let result = {
                                        data: '',
                                        data2: [],
                                        error: 'Error Recuperacion Turnos'
                                    }
                                    return dispatch({
                                        type: GET_MONTH_TURNS,
                                        payload: result,
                                    })

                    }                
            })
            .catch(error=>{
                                    let result = {
                                        data: '',
                                        data2: [],
                                        error: 'Error Recuperacion Turnos'
                                    }
                                    return dispatch({
                                        type: GET_MONTH_TURNS,
                                        payload: result,
                                    })
            })
}}