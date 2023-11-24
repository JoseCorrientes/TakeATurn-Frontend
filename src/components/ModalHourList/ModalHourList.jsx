//import { ImCheckboxChecked, ImCheckboxUnchecked} from 'react-icons/im';
import { useDispatch, useSelector } from "react-redux";
import {
  dayToSave,
  deleteFromDayWithOwnTurns,
  deleteTurnDB,
  sendMail,
  toggleCanceledTurn,
  toggleErrorDeletingTurn,
  toogleSeeHourList,
} from "../../actions/actions";
import { useEffect, useState } from "react";

function ModalHourList({
  setFlag,
  day,
  month,
  year,
  handleCloseTurns,
  handleToggleClientReservation,
}) {
  const [toConfirmDelete, setToConfirmDelete] = useState(false); //lo voy a usar para pedir confirmacion delclient
  const [deleteItemIndex, setDeleteItemIndex] = useState(""); //respaldo del item.index pasado desde el listado a la funcion para borrar el elemento
  const [deleteItemStatus, setDeleteItemStatus] = useState(""); //respaldo del item.status pasado desde el listado a la funcion para borrar el elemento

  let dispatch = useDispatch();

  let dayTurns = useSelector((state) => state.dayToSave);
  let doctor = useSelector((state) => state.user.doctor);
  let errorDeletingTurn = useSelector((state) => state.errorDeletingTurn);

  let monthText;
  switch (month) {
    case "1":
      monthText = "Enero";
      break;
    case "2":
      monthText = "Febrero";
      break;
    case "3":
      monthText = "Marzo";
      break;
    case "4":
      monthText = "Abril";
      break;
    case "5":
      monthText = "Mayo";
      break;
    case "6":
      monthText = "Junio";
      break;
    case "7":
      monthText = "Julio";
      break;
    case "8":
      monthText = "Agosto";
      break;
    case "9":
      monthText = "Septiembre";
      break;
    case "10":
      monthText = "Octubre";
      break;
    case "11":
      monthText = "Noviembre";
      break;
    default:
      monthText = "Diciembre";
  }

  //esta funcion es llamada desde boton cancelar turno y levanta el cartel que pide confirma el borrado "Se borrara el turno -> confirmar Cancelar"
  const handleConfirmCancelTurn = (index, status) => {
    //lo unico que hace es llamar a handle cancelTurn
    setToConfirmDelete(true);
    setDeleteItemIndex(index);
    setDeleteItemStatus(status);
  };

  //esta funcion solo trata de borrar el turno de la db mongo y el resultado queda en errDeletingTrun
  const handleDeleteTurnDb = async () => {
    let index = deleteItemIndex;
    let status = deleteItemStatus;
    //actualizar el estado global daytosave cambiando status a free
    let idToErase = dayTurns.turns[index].dbId;
    //borra en la db mongo el turno.
    dispatch(deleteTurnDB(idToErase));
  };

  //la siguiente funcion se deriva del ok del cartel el turno se borro correctamente.
  const handleOkDeleted = () => {
    console.log("llega a handleokdeleted");

    let index = deleteItemIndex;
    let status = deleteItemStatus;

    //cambia el estado en el turno para grabar todos los datos para el futuro email en el global canceledTurn
    let todayNow = new Date();
    let todayDay = todayNow.getDate();
    let todayMonth = todayNow.getMonth() + 1;
    let todayYear = todayNow.getFullYear();

    let todayHour = todayNow.getHours();
    let todayMinutes = todayNow.getMinutes();

    //datos para enviar el correo se necesitan en el backend
    let newEmailData = {
      turnName: dayTurns.turns[index].turnName,
      status: "canceled",
      offDuty: dayTurns.turns[index].offDuty,
      day: dayTurns.turns[index].day,
      month: dayTurns.turns[index].month,
      year: dayTurns.turns[index].year,
      idPatient: dayTurns.turns[index].idPatient,
      email: dayTurns.turns[index].email,
      phone: dayTurns.turns[index].phone,
      canceledDate: `${todayDay}/${todayMonth}/${todayYear}`,
      canceledHour: `${todayHour}:${todayMinutes}`,
      doctor,
    };
    //datos para cargar en dayturns
    let newData = {
      turnName: dayTurns.turns[index].turnName,
      status: "free",
      index: index,
      offDuty: dayTurns.turns[index].offDuty,
    };
    dayTurns.turns[index] = newData;

    //Borro el numero del dia que esta en dayTurns.day  del arreglo Global dayWithOwnTurns
    dispatch(deleteFromDayWithOwnTurns(dayTurns.day));

    // guardo en canceledturn global el turno borrado para despues pasar al backend y mandar correos
    dispatch(toggleCanceledTurn(newEmailData));

    //vacia el estado global daytosave
    dispatch(dayToSave({}));

    //apaga el estado que permite ver el modal y vuelve al calendario.
    dispatch(toggleErrorDeletingTurn(""));

    //desde aca tengo que enviar datos a backend para enviar un correo a usuario y otro a profesional avisando  la cancelacion. ver si es posible el resultado del correo si se puede saber si se envio correctamente se debe sacar los datos de canceledTurn (para no enviarlos luego con la rutina automatica)
    dispatch(sendMail(newEmailData, "dentist"));

    //cambia la bandera para recargar showmonth
    setFlag((state) => !state);
    dispatch(toogleSeeHourList(false));
  };

  const handleErrorDeleted = () => {
    //apaga el estado que permite ver el modal y vuelve al calendario.
    dispatch(toggleErrorDeletingTurn(""));
    //cambia la bandera para recargar showmonth
    setFlag((state) => !state);
    dispatch(toogleSeeHourList(false));
  };

  let frameScreen =
    toConfirmDelete || errorDeletingTurn != ""
      ? "flex flex-col items-center justify-center w-11/12 h-5/6 border-[2px] sm:w-2/3 sm:h-40 sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90"
      : "flex flex-col items-center w-11/12 h-5/6 border-[2px] sm:w-2/3 sm:h-5/6 sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90";

  return (
    <div className=" flex flex-col fixed inset-0  bg-black bg-opacity-50 w-full justify-center items-center">
      <div
        className={frameScreen}
        // className='flex flex-col justify-center items-center w-11/12 h-5/6 border-[2px] sm:w-2/3 sm:h-auto sm:py-10 sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90'
        //className='flex flex-col items-center w-11/12 h-5/6 border-[2px] sm:w-2/3 sm:h-5/6 sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90'
      >
        {toConfirmDelete && errorDeletingTurn == "" && (
          <h1 className="text-white font-Saira text-2xl sm:text-3xl  font-light text-center sm:pb-5 mb-4">
            Se borrará el Turno
          </h1>
        )}

        {!toConfirmDelete && errorDeletingTurn == "" && (
          <h1 className="text-white font-Saira text-2xl sm:text-3xl  font-light text-center pb-4 pt-5 sm:pb-5 sm:pt-6">
            Turnos para el {day} de {monthText} de {year}
          </h1>
        )}

        {!toConfirmDelete && (
          <div className="sm:w-3/4 sm:h-full mb-5 sm:mb-10 overflow-y-auto pr-2">
            {dayTurns.turns &&
              dayTurns.turns.map(
                (item, index) =>
                  item.status != "busy" && (
                    <div
                      key={index}
                      className="rounded-md flex flex-row w-full h-auto border-2 border-mayra-light-blue justify-center items-center mb-4"
                    >
                      {item.status == "free" && (
                        <div className=" flex flex-row w-2/6 h-full justify-center items-center ">
                          <h1 className="text-white font-Saira font-extralight text-6xl">
                            {item.turnName.substring(0, 2)}
                          </h1>
                          <h1 className="flex flex-row h-full text-white font-Saira font-extralight text-6xl">
                            :
                          </h1>
                          <h1 className="text-white font-Saira font-extralight text-6xl">
                            {item.turnName.substring(2)}
                          </h1>
                        </div>
                      )}

                      {item.status == "busyOwner" && (
                        <div className="bg-black flex flex-row w-2/6 h-full justify-center items-center">
                          <h1 className="text-white font-Saira font-extralight text-6xl">
                            {item.turnName.substring(0, 2)}
                          </h1>
                          <h1 className="flex flex-row h-full text-white font-Saira font-extralight text-6xl">
                            :
                          </h1>
                          <h1 className="text-white font-Saira font-extralight text-6xl">
                            {item.turnName.substring(2)}
                          </h1>
                        </div>
                      )}

                      <div className="flex flex-row w-2/6 h-20 ">
                        {item.status == "free" && (
                          <p className="flex flex-row w-full h-full bg-green-900 bg-opacity-70 justify-center items-center font-Saira text-3xl font-semibold">
                            LIBRE
                          </p>
                        )}

                        {item.status == "busyOwner" && (
                          <p className="flex flex-row w-full h-full bg-gray-800 justify-center items-center font-Saira text-3xl font-semibold text-gray-200">
                            RESERVADO
                          </p>
                        )}
                      </div>
                      <div className="flex flex-row flex-wrap w-2/6 h-20 ">
                        {item.status == "free" && (
                          <button
                            className="rounded-md  font-Saira text-lg font-medium w-full h-full border-2 border-white text-white hover:text-2xl hover:bg-none hover:border-4 hover:border-mayra-light-blue"
                            onClick={() => handleToggleClientReservation(item)}
                          >
                            RESERVAR
                          </button>
                        )}
                        {item.status == "busyOwner" && (
                          <button
                            className="rounded-md  font-Saira text-lg font-medium w-full h-full border-2 border-white text-white hover:text-white hover:text-2xl hover:bg-none hover:border-4 hover:border-red-500 "
                            onClick={() =>
                              handleConfirmCancelTurn(item.index, item.status)
                            }
                            // onClick={()=>handleCancelTurn(item.index, item.status)}
                          >
                            CANCELAR TURNO
                          </button>
                        )}
                      </div>
                    </div>
                  )
              )}
          </div>
        )}

        {toConfirmDelete && errorDeletingTurn == "" && (
          <div className="w-full h-1/6 flex flex-row justify-center items-center ">
            <button
              onClick={handleDeleteTurnDb}
              className="flex flex-row justify-center items-center mr-1 rounded-md h-10 w-2/4 bg-mayra-push-green bg-opacity-60 font-Saira text-2xl hover:text-4xl  sm:text-3xl text-white font-thin hover:bg-opacity-20 hover:border-4 hover:border-mayra-push-green-border"
            >
              Confirmar el Borrado del Turno
            </button>

            <button
              onClick={() => setToConfirmDelete(false)}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-1/4 font-Saira text-2xl hover:text-4xl ml-1 sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
            >
              Cancelar
            </button>
          </div>
        )}

        {!toConfirmDelete && errorDeletingTurn == "" && (
          <button
            className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg  w-2/3 h-10  hover:text-4xl ml-1 sm:text-3xl text-white font-thin font-Saira mb-7 hover:border-4 hover:w-2/3 "
            onClick={handleCloseTurns}
          >
            VOLVER AL CALENDARIO
          </button>
        )}

        {errorDeletingTurn == "Error" && (
          <div className=" flex flex-row justify-center items-center w-full h-10 ">
            <p className="px-4 mr-4 font-Saira text-3xl text-white font-thin bg-red-600">
              El Turno no se pudo Borrar.
            </p>
            <button
              onClick={handleErrorDeleted}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-1/4 font-Saira text-2xl hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
            >
              Cancelar
            </button>
          </div>
        )}

        {errorDeletingTurn == "Ok" && (
          <div className="w-full h-10 flex flex-row justify-center items-center ">
            <p className="px-4 t-0 mr-4 font-Saira text-3xl text-white font-thin bg-green-600">
              El Turno se Borro Correctamente.
            </p>
            <button
              onClick={handleOkDeleted}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-1/4 font-Saira text-2xl hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
            >
              Ok
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalHourList;
