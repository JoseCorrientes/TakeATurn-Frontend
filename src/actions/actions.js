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

}from './actionNames.js';
import axios from 'axios';

const VITE_APP_API = import.meta.env.VITE_APP_API;
const host= VITE_APP_API ;


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