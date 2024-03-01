//import { ImCheckboxChecked, ImCheckboxUnchecked} from 'react-icons/im';
import { useDispatch, useSelector } from "react-redux";
import {
  dayToSave,
  deleteFromDayWithOwnTurns,
  deleteAllFromDayWithOwnTurns,
  deleteTurnDB,
  deleteTurnAllDB,
  sendMail,
  toggleCanceledTurn,
  toggleErrorDeletingTurn,
  toggleErrorDeletingTurnAll,
  toogleSeeHourList,
  toggleReload,
  disableTurn,
  //disablingTurnData,
  toggleErrorDisablingTurn,
  enableTurn,
  toggleErrorEnablingTurn,
  sendToGlobalStore,
  toggleErrorSendingEmail,
  setToggleDisableTurn,
  deleteAndDisableDB,
  toggleWaitingResponse,
  toggleDeleteAndDisableError,
  disableAllDay,
  clearDisableAllDayStatus,
  setPatientData,
} from "../../actions/actions";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import ModalPatient from "../ModalPatient/ModalPatient";

function ModalHourList({
  setFlag,
  day,
  month,
  year,
  handleCloseTurns,
  handleToggleClientReservation,

  handleReload,
}) {
  const [toConfirmDelete, setToConfirmDelete] = useState(false); //lo voy a usar para pedir confirmacion delclient

  //probable remplazo por toconfirdisableAll
  const [toConfirmDeleteAll, setToConfirmDeleteAll] = useState(false); //uso para pedir confirmacion de borrado total del doctor

  const [toConfirmDisableAll, setToConfirmDisableAll] = useState(false); //uso para levantar el cartel de confirmacion cuando el doctor quiere inhabilitar el dia completo.

  const [toConfirmDeleteAndDisable, setToConfirmDeleteAndDisable] =
    useState(false); //lo voys a usar para pedir confirmacion del doctor antes del disable un turno que tiene un turno ocupado

  const [toConfirmDisable, setToConfirmDisable] = useState(false); //se usa para visibilizar el confirmador de inhabilitar un turno ocupado

  const [deleteItemIndex, setDeleteItemIndex] = useState(""); //respaldo del item.index pasado desde el listado a la funcion para borrar el elemento
  const [deleteItemStatus, setDeleteItemStatus] = useState(""); //respaldo del item.status pasado desde el listado a la funcion para borrar el elemento

  const [showMessageDayNotDisable, setShowMessageDayNotDisable] =
    useState(false); //uso para mostrar que no se pudo inhabilitar el dia completo para el doctor en disable allday.

  const [visibleModalPatient, setVisibleModalPatient] = useState(false);

  let dispatch = useDispatch();

  let dayTurns = useSelector((state) => state.dayToSave);
  let doctor = useSelector((state) => state.user.doctor);
  let errorDeletingTurn = useSelector((state) => state.errorDeletingTurn);
  let errorDeletingTurnAll = useSelector((state) => state.errorDeletingTurnAll);
  let loginDoctorValid = useSelector((state) => state.loginDoctorValid);
  let loginDoctorData = useSelector((state) => state.loginDoctorData);

  let errorSendingEmail = useSelector((state) => state.errorSendingEmail);

  //grupo de variables sacadas del global para pasar la infor a borrar en db de todos los turnos de un doctor
  let monthNow = useSelector((state) => state.dataMonthToSeek.month);
  let yearNow = useSelector((state) => state.dataMonthToSeek.year);
  let doctorNow = useSelector((state) => state.dataMonthToSeek.idDoctor);
  let dayNow = useSelector((state) => state.dayToSave.day);
  //let daytoSave=useSelector(state=>state.dayToSave);
  let dayWithOwnTurns = useSelector((state) => state.dayWithOwnTurns);

  let canceledTurn = useSelector((state) => state.canceledTurn);

  let errorDisablingTurn = useSelector((state) => state.errorDisablingTurn);
  let disablingTurnDataState = useSelector((state) => state.disablingTurnData);

  let errorEnablingTurn = useSelector((state) => state.errorEnablingTurn);
  let enablingTurnData = useSelector((state) => state.enablingTurnData);

  let isDoctorDisableTurn = useSelector((state) => state.isDoctorDisableTurn);
  let deleteAndDisableData = useSelector((state) => state.deleteAndDisableData);
  let waitingResponse = useSelector((state) => state.waitingResponse);
  let deleteAndDisableError = useSelector(
    (state) => state.deleteAndDisableError
  );

  let disableAllDayStatus = useSelector((state) => state.disableAllDayStatus);

  let patientDataStatus = useSelector((state) => state.patientData);

  //uso para probar la visibilidad de errores de doctor
  const [showErrorNotEnabled, setShowErrorNotEnabled] = useState(false);
  //   const [showErrorEnabled, setShowErrorEnabled] = useState(false);
  const [showErrorNotDisabled, setShowErrorNotDisabled] = useState(false);
  //visibilidad de errores de todo el dia
  const [showErrorDisablingAll, setShowErrorDisablingAll] = useState(false);
  //Visibilidad de error en el envio de email
  const [showErrorSendingEmail, setShowErrorSendingEmail] = useState(false);

  //Visibilidad de inhabilitacion dia completo cuando no se pudo inhabilitar, ni cancelar turnos, ni enviar mails
  const [showErrorAllDayNotDisabled, setShowErrorAllDayNotDisabled] =
    useState(false);
  //Visibilidad de inhabilitacion dia completo cuando se pudo cancelar turnos, pero no enviar mails ni inhabilitar
  const [
    showErrorAllDayCancelNotSendedNotDisabled,
    setShowErrorAllDayCancelNotSendedNotDisabled,
  ] = useState(false);
  //Visibilidad de inhabilitacion dia completo cuando se pudo cancelar turnos, se pudo enviar mails, pero no inhabilitar el dia
  const [
    showErrorAllDayCancelSendedNotDisabled,
    setShowErrorAllDayCancelSendedNotDisabled,
  ] = useState(false);
  //Visibilidad de inhabilitacion dia completo cuando se pudo cancelar turnos, no se pudo enviar correos pero se pudo inhabilitar
  const [
    showErrorAllDayCancelNotSendedDisabled,
    setShowErrorAllDayCancelNotSendedDisabled,
  ] = useState(false);

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

  const handleSeePatient = (item) => {
    dispatch(setPatientData(item));
    setVisibleModalPatient(true);
  };

  const handleHidePatient = () => {
    dispatch(setPatientData(""));
    setVisibleModalPatient(false);
  };

  //PRIMERA FUNCION EN EL BORRADO
  //-esta funcion es llamada desde boton cancelar turno y levanta el cartel que pide confirma el borrado "Se borrara el turno -> confirmar Cancelar"
  const handleConfirmCancelTurn = (index, status) => {
    //lo unico que hace es llamar a handle cancelTurn
    setToConfirmDelete(true); //PONE EN TRUE PARA LEVANTAR EL CARTEL DE CONFIRMACION
    setDeleteItemIndex(index);
    setDeleteItemStatus(status);
  };

  //PRIMERA FUNCION DE BORRADO PARA TODOS V2.
  function handleConfirmCancelAllTurn2v() {
    setToConfirmDisableAll(true); //levanta el cartel de confirmacion
  }

  //PRIMERA FUNCION DE BORRADO PARA TODOS v2 segunda parte luego del confirme
  const handleDisableAllTurnDb = () => {
    dispatch(toggleWaitingResponse(true));
    let todayNow = new Date();
    let todayDay = todayNow.getDate();
    let todayMonth = todayNow.getMonth() + 1;
    let todayYear = todayNow.getFullYear();
    let todayHour = todayNow.getHours();
    let todayMinutes = todayNow.getMinutes();
    let toSave = dayTurns["turns"].filter((item) => item.status == "busy");

    //datos a guardar en el canceledTurn temporariamente
    let result = toSave.map((item) => {
      return {
        turnName: item.turnName,
        status: "canceled",
        day: item.day,
        month: item.month,
        year: item.year,
        idPatient: item.idPatient,
        email: item.email,
        phone: item.phone,
        canceledDate: `${todayDay}/${todayMonth}/${todayYear}`,
        canceledHour: `${todayHour}:${todayMinutes}`,
        doctor: loginDoctorData.id,
      };
    });

    let dayToDisable = {
      year: parseInt(yearNow),
      month: parseInt(monthNow),
      day: dayNow,
    };
    dispatch(disableAllDay(result, loginDoctorData, dayToDisable));
  };

  //SEGUNDA FUNCION trata de borrar el turno de la db mongo y el resultado queda en errDeletingTurn
  const handleDeleteTurnDb = async () => {
    let index = deleteItemIndex;
    //let status = deleteItemStatus;
    //actualizar el estado global daytosave cambiando status a free

    let idToErase = dayTurns.turns[index].dbId;

    dispatch(toggleWaitingResponse(true));
    //borra en la db mongo el turno.
    dispatch(deleteTurnDB(idToErase)); //ver si no me conviene enviar los datos del turno para que se almacencen en la accion en una variable para pasar despues a
  };

  //SEGUNDA FUNCION PARA TODOS borrados de un dia en modo doctor
//   const handleDeleteAllTurnDb = async () => {
//     let data2 = {
//       dayNow,
//       monthNow,
//       yearNow,
//       doctorNow,
//     };
//     dispatch(deleteTurnAllDB(data2));
//     dispatch(toggleReload());
//     handleCloseTurns();
//   };

  //TERCERA FUNCION
  //La siguiente funcion se deriva del ok del cartel de todos los turnos fueron borrados
  const handleOkDeletedAll = () => {
    let todayNow = new Date();
    let todayDay = todayNow.getDate();
    let todayMonth = todayNow.getMonth() + 1;
    let todayYear = todayNow.getFullYear();
    let todayHour = todayNow.getHours();
    let todayMinutes = todayNow.getMinutes();

    let emailAddresses = [];
    dayTurns.turns.forEach((item) => {
      if (item.status == "busy") {
        let newEmailData = {
          turnName: item.turnName,
          status: "canceled",
          offDuty: item.offDuty,
          day: item.day,
          month: item.month,
          year: item.year,
          idPatient: item.idPatient,
          email: item.email,
          phone: item.phone,
          canceledDate: `${todayDay}/${todayMonth}/${todayYear}`,
          canceledHour: `${todayHour}:${todayMinutes}`,
          doctor: loginDoctorData.id,
        };
        emailAddresses.push(newEmailData);

        //datos para cargar en dayturns
        let newData = {
          turnName: item.turnName,
          status: "free",
          index: item.index,
          offDuty: item.offDuty,
        };
        dayTurns.turns[item.index] = newData;
      }
    });

    //Borro el numero del dia que esta en dayTurns.day  del arreglo Global dayWithOwnTurns
    dispatch(deleteAllFromDayWithOwnTurns(dayTurns.day, dayWithOwnTurns));

    //vacia el estado global daytosave
    dispatch(dayToSave({}));

    //apaga el estado que permite ver el modal y vuelve al calendario.
    dispatch(toggleErrorDeletingTurnAll(""));
    //cambia la bandera para recargar showmonth
    setFlag((state) => !state);
    dispatch(toggleReload());
    dispatch(toogleSeeHourList(false));
  };

  //TERCERA FUNCION
  //-Funcion que deriva del ok del cartel el turno se borro correctamente un turn utilizando CANCELAR.
  const handleOkDeleted = () => {
    let index = deleteItemIndex;
    let newEmailData;
    if (loginDoctorData != "") {
      let todayNow = new Date();
      let todayDay = todayNow.getDate();
      let todayMonth = todayNow.getMonth() + 1;
      let todayYear = todayNow.getFullYear();

      let todayHour = todayNow.getHours();
      let todayMinutes = todayNow.getMinutes();

      newEmailData = {
        index,
        turnName: dayTurns.turns[index].turnName,
        status: "canceled",
        day: dayTurns.turns[index].day,
        month: dayTurns.turns[index].month,
        year: dayTurns.turns[index].year,
        idPatient: dayTurns.turns[index].idPatient,
        typeTreatment: dayTurns.turns[index].typetreatment,
        ealthInsurance: dayTurns.turns[index].healthinsurance,
        comment: dayTurns.turns[index].comment,
        email: dayTurns.turns[index].email,
        phone: dayTurns.turns[index].phone,
        canceledDate: `${todayDay}/${todayMonth}/${todayYear}`,
        canceledHour: `${todayHour}:${todayMinutes}`,
        doctor,
      };
    }
    let newData = {
      turnName: dayTurns.turns[index].turnName,
      status: "free",
      index: index,
      offDuty: dayTurns.turns[index].offDuty,
    };
    dayTurns.turns[index] = newData;
    dispatch(toggleErrorDeletingTurn(""));
    setToConfirmDelete(false);
    dispatch(deleteFromDayWithOwnTurns(dayTurns.day));

    if (loginDoctorData != "") dispatch(toggleCanceledTurn(newEmailData));
    if (loginDoctorData != "")
      dispatch(sendMail(newEmailData, "cancel", loginDoctorData, "doctor"));
  };

  const handleErrorDeleted = () => {
    setToConfirmDelete(false);
    //apaga el estado que permite ver el modal y vuelve al calendario.
    dispatch(toggleErrorDeletingTurn(""));
    //cambia la bandera para recargar showmonth
    setFlag((state) => !state);
    //dispatch(toogleSeeHourList(false));
  };

  //trato de que regenere el marcado de inhabilitacion
  const handlecloseErrorDisablingAll = () => {
    dispatch(toggleErrorDeletingTurnAll(""));
    //cambia la bandera para recargar showmonth
    setFlag((state) => !state);
    dispatch(toggleReload());
    dispatch(toogleSeeHourList(false));
  };

  //Funcion que deshabilita un turno-hora para el Doctor
  const handleDisableTurn = (item) => {
    let data = item;
    if (dayTurns.turns[data.index].status == "free") {
      let data1 = {
        year: Number(yearNow),
        month: Number(monthNow),
        day: dayNow,
        doctor: doctorNow,
        hour: data.turnName.slice(0, 2),
        minute: data.turnName.slice(2),
        status: "offDuty",
        idpatient: "",
        email: "",
        typetreatment: "consulta",
        healthinsurance: "",
        phone: "",
        comment: "",
      };
      dispatch(disableTurn(data1));
    }

    //aca empiezo a tocar para un turno ocupado
    if (dayTurns.turns[data.index].status == "busy") {
      let todayNow = new Date();
      let todayDay = todayNow.getDate();
      let todayMonth = todayNow.getMonth() + 1;
      let todayYear = todayNow.getFullYear();
      let todayHour = todayNow.getHours();
      let todayMinutes = todayNow.getMinutes();
      let newEmailData = {
        index: data.index,
        turnName: data.turnName,
        status: "canceled",
        day: data.day,
        month: data.month,
        year: data.year,
        idPatient: data.idPatient,
        typeTreatment: data.typetreatment,
        ealthInsurance: data.healthinsurance,
        comment: data.comment,
        email: data.email,
        offDuty: "offDuty",
        phone: data.phone,
        canceledDate: `${todayDay}/${todayMonth}/${todayYear}`,
        canceledHour: `${todayHour}:${todayMinutes}`,
        doctor: doctorNow,
        dbId: data.dbId,
      };

      dispatch(setToggleDisableTurn({ doctor: true, data: newEmailData })); //pone un estado que avisa que es un estado de inhabilitacion de turno lleno
      setToConfirmDeleteAndDisable(true);
    }
  };

  //Habilitar un turno inhabilitado por el administrador
  const handleEnableTurn = (data) => {
    let data1 = {
      day: dayNow,
      month: Number.parseInt(monthNow),
      year: Number.parseInt(yearNow),
      turnName: dayTurns.turns[data].turnName,
      hourIndex: data,
      doctor: doctorNow,
    };
    dispatch(enableTurn(data1));
  };

  //oculta el mensaje de no se pudo habilitar
  const handleEnableError = () => {
    setShowErrorNotEnabled(false);
    dispatch(toggleErrorEnablingTurn());
  };

  //oculta el mensaje de no se pudo deshabilitar
  const handleDisableError = () => {
    setShowErrorNotDisabled(false);
    dispatch(toggleErrorDisablingTurn({ code: "", data: "" }));
  };

  const handleDisableAllDayError = () => {
    dispatch(clearDisableAllDayStatus(""));
    setShowMessageDayNotDisable(false);
    handleCloseTurns();
  };

  const handleDisableAllDayErrorOnlyDisabling = () => {
    dispatch(clearDisableAllDayStatus(""));
    setShowErrorAllDayCancelSendedNotDisabled(false);
    handleCloseTurns();
  };

  const handleDisableAllDayErrorDisablingErrorEmail = () => {
    dispatch(clearDisableAllDayStatus(""));
    setShowErrorAllDayCancelNotSendedNotDisabled(false);
    handleCloseTurns();
  };

  //funcion que maneja el ok del error cuando se inhabilita el dia pero no se envia email y si se borran los turnos, por parte del doctor
  const handleDisableAllDayErrorEmail = () => {
    dispatch(clearDisableAllDayStatus(""));
    setShowErrorAllDayCancelNotSendedDisabled(false);
    handleCloseTurns();
  };

  //Funcion que confirma  cuando muestra un error por no enviar el email ni deshabilitar en deleteAndDisable en Doctor
  const handleDeleteAndDisableConfirmErrorEmailDisable = () => {
    dispatch(toggleDeleteAndDisableError(""));
    setToConfirmDeleteAndDisable(false);
    dispatch(setToggleDisableTurn({ doctor: false, data: "" }));
  };

  // Ver esta funcion para el paciente porque acumula vacios en el globalstore, me parece que el canceledTurn da vacio,
  const handleSendToGlobalStore = () => {
    dispatch(sendToGlobalStore(canceledTurn));
    dispatch(toggleErrorSendingEmail(""));
    setShowErrorSendingEmail(false);
  };

  useEffect(() => {
    //aparecio el errordisablingturn diciendo que se grabo bien la inhabilitacion, entoneces disparo el day to save con los datos nuevos del turn
    if (errorDisablingTurn == 1) {
      dayTurns.turns[disablingTurnDataState.hourIndex] = {
        turnName: disablingTurnDataState.hour + disablingTurnDataState.minute,
        status: "offDuty",
        index: disablingTurnDataState.hourIndex,
      };
      dispatch(dayToSave(dayTurns));
      dispatch(toggleErrorDisablingTurn({ code: "", data: "" }));
    }

    if (errorEnablingTurn == 1) {
      dayTurns.turns[enablingTurnData.hourIndex] = {
        turnName: enablingTurnData.turnName,
        status: "free",
        index: enablingTurnData.hourIndex,
      };
      dispatch(dayToSave(dayTurns));
      dispatch(toggleErrorEnablingTurn({ data1: "", data2: "" }));
      //setShowErrorEnabled(true)
    }

    if (errorEnablingTurn == 3) {
      setShowErrorNotEnabled(true);
    }

    //tal vez lo mismo de arriba pero para el error de inhabilitar un turno
    if (errorDisablingTurn == 3) {
      setShowErrorNotDisabled(true);
    }

    if (errorSendingEmail == 3) {
      setShowErrorSendingEmail(true);
    }

    //En el disableAllDay inhabilitacion de un dia completo por parte del doctor todo salio mal y no se pudo inhabilitar
    if (
      disableAllDayStatus.status &&
      !disableAllDayStatus.status.canceledTurn &&
      !disableAllDayStatus.status.emailSended &&
      !disableAllDayStatus.status.disabledDay
    ) {
      setShowErrorAllDayNotDisabled(true);
    }

    //En el disableAllDay inhabilitacion de un dia completo por parte del doctor todo salio bien
    if (
      disableAllDayStatus.status &&
      disableAllDayStatus.status.canceledTurn &&
      disableAllDayStatus.status.emailSended &&
      disableAllDayStatus.status.disabledDay
    ) {
      dispatch(clearDisableAllDayStatus(""));
      handleCloseTurns();
      setToConfirmDisableAll(false);
    }

    //En el disableAllDay inhabilitacion de un dia completo por parte del doctor todo se borraron los turnos, se envio el correo, pero no se pudo inhabilitar
    if (
      disableAllDayStatus.status &&
      disableAllDayStatus.status.canceledTurn &&
      disableAllDayStatus.status.emailSended &&
      !disableAllDayStatus.status.disabledDay
    ) {
      setShowErrorAllDayCancelSendedNotDisabled(true);
    }

    //En el disableAllDay inhabilitacion de un dia completo por parte del doctor se borraron los turnos, no se enviaron los correos, y no se pudo inhabilitar el dia
    if (
      disableAllDayStatus.status &&
      disableAllDayStatus.status.canceledTurn &&
      !disableAllDayStatus.status.emailSended &&
      !disableAllDayStatus.status.disabledDay
    ) {
      setShowErrorAllDayCancelNotSendedNotDisabled(true);
    }

    //En el disableAllDay inhabilitacion de un dia completo por parte del doctor se borraron los turnos, no se enviaron los correos, y se pudo inhabilitar el dia
    if (
      disableAllDayStatus.status &&
      disableAllDayStatus.status.canceledTurn &&
      !disableAllDayStatus.status.emailSended &&
      disableAllDayStatus.status.disabledDay
    ) {
      setShowErrorAllDayCancelNotSendedDisabled(true);
    }

    //En el cancelAndDisable de un turno por parte del doctor todo salio bien
    if (
      deleteAndDisableError.status &&
      deleteAndDisableError.status.canceledTurn &&
      deleteAndDisableError.status.emailSended &&
      deleteAndDisableError.status.disabledTurn
    ) {
      dayTurns.turns[deleteAndDisableData.index] = {
        turnName: deleteAndDisableData.turnName,
        status: "offDuty",
        index: deleteAndDisableData.index,
      };
      dispatch(dayToSave(dayTurns));
      dispatch(toggleWaitingResponse(false));
      setToConfirmDeleteAndDisable(false);
      dispatch(toggleDeleteAndDisableError(""));
      dispatch(setToggleDisableTurn({ doctor: false, data: "" }));
    }

    //En el cancelAndDisable de un turno por parte del doctor no se pudo cancelar el turno original
    if (
      deleteAndDisableError.status &&
      !deleteAndDisableError.status.canceledTurn
    ) {
      dispatch(toggleWaitingResponse(false));
      dispatch(setToggleDisableTurn({ doctor: false, data: "" }));
    }

    //En el cancelAndDisable de un turno por parte del doctor no se pudo enviar el correo de cancelacion y no se inhabilito el turno
    if (
      deleteAndDisableError.status &&
      deleteAndDisableError.status.canceledTurn &&
      !deleteAndDisableError.status.emailSended &&
      !deleteAndDisableError.status.disabledTurn
    ) {
      dayTurns.turns[deleteAndDisableData.index] = {
        turnName: deleteAndDisableData.turnName,
        status: "free",
        index: deleteAndDisableData.index,
      };
      dispatch(dayToSave(dayTurns));
      dispatch(toggleWaitingResponse(false));
    }

    //En el cancelAndDisable de un turno por parte del doctor no se pudo enviar el correo de cancelacion  pero se inhabilito el turno
    if (
      deleteAndDisableError.status &&
      deleteAndDisableError.status.canceledTurn &&
      !deleteAndDisableError.status.emailSended &&
      deleteAndDisableError.status.disabledTurn
    ) {
      dayTurns.turns[deleteAndDisableData.index] = {
        turnName: deleteAndDisableData.turnName,
        status: "offDuty",
        index: deleteAndDisableData.index,
      };
      dispatch(dayToSave(dayTurns));
      dispatch(setToggleDisableTurn({ doctor: false, data: "" }));
      dispatch(toggleWaitingResponse(false));
    }

    //haciendo
    //En el cancelAndDisable de un turno por parte del doctor se pudo enviar el correo de cancelacion  pero NO se inhabilito el turno

    //deleteanddiabledata no viene en el global ver reducer

    if (
      deleteAndDisableError.status &&
      deleteAndDisableError.status.canceledTurn &&
      deleteAndDisableError.status.emailSended &&
      !deleteAndDisableError.status.disabledTurn
    ) {
      dayTurns.turns[deleteAndDisableData.index] = {
        turnName: deleteAndDisableData.turnName,
        status: "free",
        index: deleteAndDisableData.index,
      };
      dispatch(dayToSave(dayTurns));
      dispatch(setToggleDisableTurn({ doctor: false, data: "" }));
      dispatch(toggleWaitingResponse(false));
    }

    if (errorDeletingTurn != "") {
      dispatch(toggleWaitingResponse(false));
    }

    if (errorDeletingTurn != "") {
      dispatch(toggleWaitingResponse(false));
    }
  }, [
    errorDisablingTurn,
    errorEnablingTurn,
    errorSendingEmail,
    deleteAndDisableError,
    errorDeletingTurn,
    disableAllDayStatus,
  ]);

  let frameScreen =
    showErrorAllDayCancelNotSendedNotDisabled ||
    showErrorAllDayCancelSendedNotDisabled ||
    showErrorAllDayNotDisabled ||
    showMessageDayNotDisable ||
    toConfirmDisableAll ||
    toConfirmDeleteAndDisable ||
    toConfirmDisable ||
    toConfirmDeleteAll ||
    toConfirmDelete ||
    errorDeletingTurn != "" ||
    showErrorNotEnabled ||
    showErrorNotDisabled ||
    showErrorSendingEmail
      ? //   ? "flex flex-col items-center justify-center w-11/12 h-5/6 border-[2px] sm:w-2/3 sm:h-40 sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90"
        "flex flex-col items-center justify-center w-11/12 h-auto py-5 sm:py-0 border-[2px]  sm:px-0 sm:w-2/3 sm:h-40 sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90 "
      : "flex flex-col items-center w-11/12 h-full border-[2px] sm:w-2/3 sm:h-5/6 sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90";

  return (
    <div className=" flex flex-col fixed inset-0 h-full bg-black bg-opacity-50 w-full justify-center items-center">
      <div className={frameScreen}>
        {/* Mensaje de confirmacion de borrado */}
        {toConfirmDelete && errorDeletingTurn == "" && (
          <h1 className="text-white font-Saira text-2xl sm:text-3xl  font-light text-center sm:pb-5 mb-4 ">
            Confirme la Cancelación del Turno
          </h1>
        )}

        {/* Mensaje de confirmacion de inhabilitacion de turno ocupado */}
        {toConfirmDisable && errorDeletingTurn == "" && (
          <h1 className="text-white font-Saira text-2xl sm:text-3xl  font-light text-center sm:pb-5 mb-4 ">
            Confirme la Inhabilitacion del Turno
          </h1>
        )}
        {!deleteAndDisableError.status &&
          toConfirmDeleteAndDisable &&
          errorDeletingTurn == "" && (
            <h1 className="text-white font-Saira text-2xl sm:text-3xl  font-light text-center sm:pb-5 mb-4 ">
              Confirme la Inhabilitacion del Turno Ocupado.
            </h1>
          )}

        {/* Mensaje de confirmacion de borrado de todos los turnos e inhabilitacion del dia completo - reemplaza al tocinfirmDeleteAll que esta arriba  */}
        {!setShowErrorAllDayCancelSendedNotDisabled &&
          !showErrorAllDayNotDisabled &&
          toConfirmDisableAll &&
          !waitingResponse && (
            <h1 className="text-white font-Saira text-2xl sm:text-3xl  font-light text-center sm:pb-5 mb-4">
              Confirme la Inhabilitación del Día Completo.
            </h1>
          )}

        {!showErrorAllDayCancelNotSendedNotDisabled &&
          !showErrorAllDayCancelSendedNotDisabled &&
          !showErrorAllDayNotDisabled &&
          !showMessageDayNotDisable &&
          !toConfirmDisableAll &&
          !toConfirmDeleteAndDisable &&
          !toConfirmDisable &&
          !showErrorSendingEmail &&
          !showErrorSendingEmail &&
          !showErrorNotDisabled &&
          !showErrorNotEnabled &&
          !toConfirmDelete &&
          errorDeletingTurn == "" &&
          !toConfirmDeleteAll &&
          errorDeletingTurnAll == "" && (
            <h1 className="text-white font-Saira text-2xl sm:text-3xl  font-light text-center pb-4 pt-5 sm:pb-5 sm:pt-6">
              Turnos para el {day} de {monthText} de {year}
            </h1>
          )}

        {/* PACIENTE */}
        {/* //aca va el listador si es un paciente  */}
        {!toConfirmDisableAll &&
          !loginDoctorValid &&
          !toConfirmDelete &&
          !toConfirmDeleteAll && (
            <div className=" w-full sm:w-3/4 sm:h-full mb-5 sm:mb-10 overflow-y-auto p-1">
              {dayTurns.turns &&
                dayTurns.turns.map(
                  (item, index) =>
                    item.status != "busy" &&
                    item.status != "offDuty" && (
                      <div
                        key={index}
                        className="rounded-md flex flex-row w-full h-auto border-2 border-mayra-light-blue justify-center items-center mb-4"
                      >
                        {item.status == "free" && (
                          <div className=" flex flex-row w-2/6 h-full justify-center items-center ">
                            <h1 className="text-white font-Saira font-extralight text-3xl sm:text-6xl">
                              {item.turnName.substring(0, 2)}
                            </h1>
                            <h1 className="flex flex-row h-full text-white font-Saira font-extralight text-2xl sm:text-6xl">
                              :
                            </h1>
                            <h1 className="text-white font-Saira font-extralight text-3xl sm:text-6xl">
                              {item.turnName.substring(2)}
                            </h1>
                          </div>
                        )}

                        {item.status == "busyOwner" && (
                          <div className="bg-black flex flex-row w-2/6 h-full justify-center items-center">
                            <h1 className="text-white font-Saira font-extralight text-3xl sm:text-6xl">
                              {item.turnName.substring(0, 2)}
                            </h1>
                            <h1 className="flex flex-row h-full text-white font-Saira font-extralight text-2xl sm:text-6xl">
                              :
                            </h1>
                            <h1 className="text-white font-Saira font-extralight text-3xl sm:text-6xl">
                              {item.turnName.substring(2)}
                            </h1>
                          </div>
                        )}

                        <div className="flex flex-row w-2/6 h-20 ">
                          {item.status == "free" && (
                            <p className="flex flex-row w-full h-full bg-mayra-dark-blue  bg-opacity-70 justify-center items-center font-Saira text-3xl font-semibold">
                              LIBRE
                            </p>
                          )}

                          {item.status == "busyOwner" && (
                            <p className="flex flex-row w-full h-full bg-gray-800 justify-center items-center font-Saira text-3xl font-light sm:font-semibold text-gray-200">
                              TOMADO
                            </p>
                          )}
                        </div>
                        <div className="flex flex-row flex-wrap w-2/6 h-20 ">
                          {item.status == "free" && (
                            <button
                              className="rounded-md  font-Saira text-lg font-medium w-full h-full border-2 border-white text-white sm:hover:text-2xl hover:bg-none hover:border-4 hover:border-mayra-light-blue "
                              onClick={() =>
                                handleToggleClientReservation(item)
                              }
                            >
                              RESERVAR
                            </button>
                          )}
                          {item.status == "busyOwner" && (
                            <button
                              className="rounded-md  font-Saira text-lg font-medium w-full h-full border-2 border-white text-white hover:text-white sm:hover:text-2xl hover:bg-none hover:border-4 hover:border-red-500  "
                              onClick={() =>
                                handleConfirmCancelTurn(item.index, item.status)
                              }
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

        {/* Este sector estoy modificando para el doctor administrador                     */}
        {/* listador para DOCTOR    */}
        {!showErrorAllDayCancelNotSendedNotDisabled &&
          !showErrorAllDayCancelSendedNotDisabled &&
          !showErrorAllDayNotDisabled &&
          !showMessageDayNotDisable &&
          !toConfirmDisableAll &&
          !toConfirmDeleteAndDisable &&
          !toConfirmDisable &&
          errorDeletingTurn == "" &&
          !showErrorSendingEmail &&
          !showErrorNotDisabled &&
          !showErrorNotEnabled &&
          loginDoctorValid &&
          !toConfirmDelete &&
          !toConfirmDeleteAll && (
            <div className=" w-full sm:w-3/4 sm:h-full mb-5 sm:mb-10 overflow-y-auto p-1">
              {dayTurns.turns &&
                dayTurns.turns.map((item, index) => (
                  <div
                    key={index}
                    className={
                      item.status != "offDuty"
                        ? "rounded-md flex flex-row w-full h-auto border-2 border-mayra-light-blue justify-center items-center mb-4"
                        : "rounded-md flex flex-row w-full h-auto border-2 border-black justify-center items-center mb-4"
                    }
                  >
                    {
                      <div className=" flex flex-row w-2/6 h-full justify-center items-center">
                        <h1
                          className={
                            item.status == "offDuty"
                              ? "text-mayra-dark-blue font-Saira font-extralight text-3xl sm:text-6xl"
                              : "text-white font-Saira font-extralight text-3xl sm:text-6xl"
                          }
                        >
                          {item.turnName.substring(0, 2)}
                        </h1>
                        <h1
                          className={
                            item.status == "offDuty"
                              ? "text-mayra-dark-blue font-Saira font-extralight text-3xl sm:text-6xl"
                              : "text-white font-Saira font-extralight text-3xl sm:text-6xl"
                          }
                        >
                          :
                        </h1>
                        <h1
                          className={
                            item.status == "offDuty"
                              ? "text-mayra-dark-blue font-Saira font-extralight text-3xl sm:text-6xl"
                              : "text-white font-Saira font-extralight text-3xl sm:text-6xl"
                          }
                        >
                          {item.turnName.substring(2)}
                        </h1>
                      </div>
                    }

                    {/* Lo siguiente muestra el cartel libre o el nombre del paciente si esta ocupado para el doctor */}
                    <div className="flex flex-row w-2/6 h-20 ">
                      {item.status == "free" && (
                        <p className="flex flex-row w-full h-full bg-mayra-dark-blue bg-opacity-70 justify-center items-center font-Saira text-3xl font-semibold">
                          LIBRE
                        </p>
                      )}

                      {item.status == "busy" && (
                        <p
                          className="px-1 flex flex-row w-full h-full bg-gray-800 justify-center items-center font-Saira text-lg sm:text-3xl font-light sm:font-semibold text-gray-200 hover:cursor-pointer"
                          onClick={() => handleSeePatient(item)}
                        >
                          {item.idPatient}
                        </p>
                      )}
                    </div>

                    {/* SECTOR DIV DE BOTONES INICIO*/}
                    <div className="flex flex-row flex-wrap w-2/6 h-20 ">
                      {/* ESTO ESTOY PROBANDO */}
                      {item.status == "offDuty" && (
                        <button
                          className="rounded-lg  font-Saira text-lg font-medium w-full h-full border-2 border-mayra-push-green-border bg-mayra-push-green text-white hover:text-white sm:hover:text-2xl hover:bg-none hover:border-4 hover:border-mayra-push-green   bg-opacity-60"
                          onClick={() => handleEnableTurn(item.index)}
                        >
                          HABILITAR
                        </button>
                      )}

                      {/* ESTO VA A REEMPLAZAR AL GRUPO 3 */}
                      {item.status == "free" && (
                        <button
                          className="rounded-md  font-Saira text-lg font-medium w-full h-1/2 border-2 border-white text-white sm:hover:text-2xl hover:bg-none hover:border-4 hover:border-mayra-light-blue"
                          onClick={() => handleToggleClientReservation(item)}
                        >
                          RESERVAR
                        </button>
                      )}

                      {item.status == "free" && (
                        <button
                          className=" rounded-lg  font-Saira text-lg font-medium w-full h-1/2 border-2 border-red-500 bg-red-700 bg-opacity-60 text-white hover:text-white sm:hover:text-2xl hover:bg-opacity-20 hover:border-4 hover:border-red-500 hover:bg-none mt-1 hover: bg-none"
                          onClick={() => handleDisableTurn(item)}
                        >
                          INHABILITAR
                        </button>
                      )}

                      {/* COMENTO mientras GRUPO 2 para reemplazar por dos botones cancelar e inhabilitar     */}

                      {/* ESTO REEMPLAZA AL GRUPO 2 PARA PONER LOS DOS BOTONES */}
                      {item.status == "busy" && (
                        <button
                          className="rounded-md  font-Saira text-lg font-medium w-full h-1/2 border-2 border-white text-white hover:text-white sm:hover:text-2xl hover:bg-none hover:border-4 hover:border-red-500"
                          onClick={() =>
                            handleConfirmCancelTurn(item.index, item.status)
                          }
                        >
                          CANCELAR
                        </button>
                      )}

                      {item.status == "busy" && (
                        <button
                          className=" rounded-lg  font-Saira text-lg font-medium w-full h-1/2 border-2 border-red-500 bg-red-700 bg-opacity-60 text-white hover:text-white sm:hover:text-2xl hover:bg-opacity-20 hover:border-4 hover:border-red-500 hover:bg-none mt-1"
                          onClick={() => handleDisableTurn(item)}
                        >
                          INHABILITAR
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}

        {/* Este es el boton de confirmacion cuando aparece pidiendo confirmacion de borrado                    */}
        {!waitingResponse && toConfirmDelete && errorDeletingTurn == "" && (
          <div className="w-full h-1/6 flex flex-row justify-center items-center">
            <button
              onClick={handleDeleteTurnDb}
              className="flex flex-row justify-center items-center mr-1 rounded-md h-10  w-auto px-6  sm:px-0 sm:w-2/4 bg-mayra-push-green bg-opacity-60 font-Saira text-2xl sm:hover:text-4xl  sm:text-3xl text-white font-thin hover:bg-opacity-20 hover:border-4 hover:border-mayra-push-green-border "
            >
              Confirmar
            </button>

            <button
              onClick={() => setToConfirmDelete(false)}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-auto sm:w-1/4 px-3 sm:px-0 font-Saira text-2xl sm:hover:text-4xl ml-1 sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
            >
              Volver
            </button>
          </div>
        )}

        {/* REVISAR ESTO */}
        {/* Este es el boton de confirmacion cuando aparece pidiendo confirmacion de inhabilitacion de turno ocupado                    */}
        {toConfirmDisable &&
          errorDeletingTurn == "" && ( //ver si va errorDeletingTurn ==""
            <div className="w-full h-1/6 flex flex-row justify-center items-center">
              <button
                onClick={handleDisableTurn()}
                className="flex flex-row justify-center items-center mr-1 rounded-md h-10  w-auto px-6 hover:px-1 sm:px-0 sm:w-2/4 bg-mayra-push-green bg-opacity-60 font-Saira text-2xl sm:hover:text-4xl  sm:text-3xl text-white font-thin hover:bg-opacity-20 hover:border-4 hover:border-mayra-push-green-borde"
              >
                Confirmar Inhabilitación
              </button>

              <button
                onClick={() => setToConfirmDisable(false)}
                className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-auto sm:w-1/4 px-3 hover:px-1 sm:px-0 font-Saira text-2xl sm:hover:text-4xl ml-1 sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
              >
                Volver
              </button>
            </div>
          )}

        {/* Esto lo agrego para que me confirme el inhabilitado de un turno ocupado  POR PARTE DEL DOCTOR   */}
        {/* Este es el boton de confirmacion cuando aparece pidiendo confirmacion de inhabilitacion de turno ocupado                    */}
        {!deleteAndDisableError.status &&
          !waitingResponse &&
          toConfirmDeleteAndDisable && (
            <div className="w-full h-1/6 flex flex-row justify-center items-center">
              <button
                onClick={() => {
                  dispatch(
                    deleteAndDisableDB({
                      data: deleteAndDisableData,
                      loginDoctorData: loginDoctorData,
                    })
                  );
                  dispatch(toggleWaitingResponse(true));
                }}
                className="flex flex-row justify-center items-center mr-1 rounded-md h-10  w-auto px-6 hover:px-1 sm:px-0 sm:w-2/4 bg-mayra-push-green bg-opacity-60 font-Saira text-2xl sm:hover:text-4xl  sm:text-3xl text-white font-thin hover:bg-opacity-20 hover:border-4 hover:border-mayra-push-green-border"
              >
                Confirmar
              </button>

              <button
                onClick={() => {
                  dispatch(setToggleDisableTurn({ doctor: false, data: "" }));
                  setToConfirmDeleteAndDisable(false);
                }}
                className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-auto sm:w-1/4 px-3 hover:px-1 sm:px-0 font-Saira text-2xl sm:hover:text-4xl ml-1 sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue "
              >
                Volver
              </button>
            </div>
          )}

        {/* //Muestra el mensaje Procesando cuando se pidio cancelar un turno e inhabilitarlo desde doctor */}
        {waitingResponse &&
          toConfirmDeleteAndDisable &&
          errorDeletingTurn == "" && (
            <div className="w-full h-1/6 flex flex-row justify-center items-center">
              <p className="flex flex-row justify-center items-center mr-1 rounded-md h-10  w-auto px-6 hover:px-1 sm:px-0 sm:w-2/4 bg-mayra-push-green bg-opacity-60 font-Saira text-2xl sm:hover:text-4xl  sm:text-3xl text-white font-thin hover:bg-opacity-20 hover:border-4 hover:border-mayra-push-green-border">
                Procesando...
              </p>
            </div>
          )}

        {/* //Muestra el mensaje Procesando cuando se pidio cancelar un turno  desde doctor */}
        {toConfirmDelete &&
          waitingResponse && ( //ver si va errorDeletingTurn ==""
            <div className="w-full h-1/6 flex flex-row justify-center items-center">
              <p className="flex flex-row justify-center items-center mr-1 rounded-md h-10  w-auto px-6 hover:px-1 sm:px-0 sm:w-2/4 bg-mayra-push-green bg-opacity-60 font-Saira text-2xl sm:hover:text-4xl  sm:text-3xl text-white font-thin hover:bg-opacity-20 hover:border-4 hover:border-mayra-push-green-border">
                Procesando...
              </p>
            </div>
          )}

        {/* //Muestra el mensaje Procesando cuando se inhabilitar todo un DIA  desde doctor */}
        {toConfirmDisableAll &&
          waitingResponse && ( //ver si va errorDeletingTurn ==""
            <div className="w-full h-1/6 flex flex-row justify-center items-center">
              <p className="flex flex-row justify-center items-center mr-1 rounded-md h-10  w-auto px-6 hover:px-1 sm:px-0 sm:w-2/4 bg-mayra-push-green bg-opacity-60 font-Saira text-2xl sm:hover:text-4xl  sm:text-3xl text-white font-thin hover:bg-opacity-20 hover:border-4 hover:border-mayra-push-green-border">
                Procesando...
              </p>
            </div>
          )}

        {/* CARTEL ORIGINAL AL PIE VOLVER - INHABILITIAR DIA */}
        {/* //voy a tocar para agregar el boton borrar TODO el dia para el doctor    */}
        {!showErrorAllDayCancelNotSendedNotDisabled &&
          !showErrorAllDayCancelSendedNotDisabled &&
          !showErrorAllDayNotDisabled &&
          !showMessageDayNotDisable &&
          !toConfirmDisableAll &&
          !toConfirmDeleteAndDisable &&
          !toConfirmDisable &&
          !showErrorSendingEmail &&
          !showErrorDisablingAll &&
          !showErrorNotDisabled &&
          !showErrorNotEnabled &&
          !toConfirmDelete &&
          errorDeletingTurn == "" &&
          loginDoctorValid &&
          !toConfirmDeleteAll &&
          errorDeletingTurnAll == "" && (
            <div className="flex flex-row w-full justify-center items-center px-2">
              <button
                className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg  w-full sm:w-2/3 h-10  sm:hover:text-4xl text-2xl sm:text-3xl text-white font-thin font-Saira mb-7 hover:border-4 sm:mr-1 "
                onClick={handleCloseTurns}
              >
                VOLVER
              </button>
              <button
                className="flex flex-row justify-center items-center border-2 border-red-500  rounded-lg w-full sm:w-2/3 h-10  sm:hover:text-4xl text-2xl sm:text-3xl  font-thin font-Saira mb-7 bg-red-700 bg-opacity-60 text-white  hover:bg-opacity-20 hover:border-4 hover:border-red-500 sm:ml-1 "
                onClick={handleConfirmCancelAllTurn2v}
              >
                INHABILITAR DIA
              </button>
            </div>
          )}

        {/* v2 Este es el boton de confirmacion cuando aparece pidiendo confirmacion de inhabilitacion de TODO EL DIA - reemplaza al toConfirmDeleteAll                   */}
        {/* {toConfirmDisableAll && errorDeletingTurnAll == "" && ( */}
        {!showErrorAllDayCancelNotSendedDisabled &&
          !showErrorAllDayCancelNotSendedNotDisabled &&
          !showErrorAllDayCancelSendedNotDisabled &&
          !showErrorAllDayNotDisabled &&
          toConfirmDisableAll &&
          !waitingResponse && (
            <div className="w-full h-1/6 flex flex-row justify-center items-center ">
              <button
                onClick={handleDisableAllTurnDb}
                className="flex flex-row justify-center items-center mr-1 rounded-md h-10  w-auto px-6 sm:px-0 sm:w-2/4 bg-mayra-push-green bg-opacity-60 font-Saira text-2xl sm:hover:text-4xl  sm:text-3xl text-white font-thin hover:bg-opacity-20 hover:border-4 hover:border-mayra-push-green-border"
              >
                Confirmar
              </button>

              <button
                onClick={() => {
                  setToConfirmDisableAll(false);
                  dispatch(toggleCanceledTurn([]));
                }}
                className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-auto sm:w-1/4 px-3 sm:px-0 font-Saira text-2xl sm:hover:text-4xl ml-1 sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
              >
                Cancelar
              </button>
            </div>
          )}

        {!toConfirmDelete && errorDeletingTurn == "" && !loginDoctorValid && (
          <button
            className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg  w-full sm:w-2/3 h-10  sm:hover:text-4xl text-2xl sm:text-3xl text-white font-thin font-Saira mb-7 hover:border-4"
            onClick={handleCloseTurns}
          >
            VOLVER
          </button>
        )}

        {/* Estoy probando poner este mensaje aca     */}
        {showErrorNotEnabled && (
          <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0">
            <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
              El Turno no se pudo habilitar.
            </p>
            <button
              onClick={handleEnableError}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
            >
              Ok
            </button>
          </div>
        )}

        {/* Estoy probando poner este mensaje aca    TURNO INDIVIDUAL NO SE PUDO DESHABILITAR */}
        {showErrorNotDisabled && (
          <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0">
            <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
              El Turno no se pudo deshabilitar.
            </p>
            <button
              onClick={handleDisableError}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
            >
              Ok
            </button>
          </div>
        )}

        {/* MENSAJE    EMAIL NO PUDO SER ENVIADO */}
        {showErrorSendingEmail && (
          <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0">
            <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
              El email no fué Enviado.
            </p>
            <button
              onClick={handleSendToGlobalStore}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
            >
              Ok
            </button>
          </div>
        )}

        {/* MENSAJE  el turno no pudo cancelarse en cancelanddisable doctor */}
        {deleteAndDisableError.status &&
          deleteAndDisableError.status.canceledTurn == false && (
            <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0">
              <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
                El turno no pudo cancelarse.
              </p>
              <button
                onClick={() => {
                  dispatch(toggleDeleteAndDisableError(""));
                  setToConfirmDeleteAndDisable(false);
                }}
                className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
              >
                Ok
              </button>
            </div>
          )}

        {/* MENSAJE  el turno se cancelo en cancelanddisable doctor  pero no se envio mail a cliente y no se pudo deshabilitar el turno*/}
        {deleteAndDisableError.status &&
          deleteAndDisableError.status.canceledTurn &&
          !deleteAndDisableError.status.emailSended &&
          !deleteAndDisableError.status.disabledTurn && (
            <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0">
              <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
                No se envio email de Cancelación ni se Inhabilito Turno
              </p>
              <button
                onClick={handleDeleteAndDisableConfirmErrorEmailDisable}
                className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
              >
                Ok
              </button>
            </div>
          )}

        {/* MENSAJE  el turno se cancelo en cancelanddisable doctor  pero no se envio mail a cliente y pero se pudo deshabilitar el turno*/}
        {deleteAndDisableError.status &&
          deleteAndDisableError.status.canceledTurn &&
          !deleteAndDisableError.status.emailSended &&
          deleteAndDisableError.status.disabledTurn && (
            <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0">
              <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
                No se envio email de Cancelación
              </p>
              <button
                onClick={() => {
                  dispatch(toggleDeleteAndDisableError(""));
                  setToConfirmDeleteAndDisable(false);
                }}
                className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
              >
                Ok
              </button>
            </div>
          )}

        {/* MENSAJE  el turno se cancelo en cancelanddisable doctor  y se envio mail a cliente  pero no se pudo deshabilitar el turno*/}
        {deleteAndDisableError.status &&
          deleteAndDisableError.status.canceledTurn &&
          deleteAndDisableError.status.emailSended &&
          !deleteAndDisableError.status.disabledTurn && (
            <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0">
              <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
                No se pudo Inhabilitar el Día
              </p>
              <button
                onClick={() => {
                  dispatch(toggleDeleteAndDisableError(""));
                  setToConfirmDeleteAndDisable(false);
                }}
                className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
              >
                Ok
              </button>
            </div>
          )}

        {/* operaciones de inhabilitar un dia */}
        {/* El disableallday no se pudo cancelar los turnos, ni enviar mail, ni inhabilitar dia v2 */}
        {showErrorAllDayNotDisabled && (
          <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0">
            <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
              Error al Cancelar Turnos.
            </p>
            <button
              onClick={handleDisableAllDayError}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl  sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
            >
              Ok
            </button>
          </div>
        )}

        {/* El disableallday no se pudo inhabilitar el dia pero se envio correo y se cancelo turnos v2*/}
        {showErrorAllDayCancelSendedNotDisabled && (
          <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0">
            <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
              El Día no se pudo deshabilitar.
            </p>
            <button
              onClick={handleDisableAllDayErrorOnlyDisabling}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue "
            >
              Ok
            </button>
          </div>
        )}

        {/* El disableallday no se pudo inhabilitar el dia ni enviar correos  pero se cancelo turnos v2*/}
        {showErrorAllDayCancelNotSendedNotDisabled && (
          <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0">
            <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
              Error en Inhabilitación de dia y Envio de emails.
            </p>
            <button
              onClick={handleDisableAllDayErrorDisablingErrorEmail}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue "
            >
              Ok
            </button>
          </div>
        )}

        {/* El disableallday se pudo inhabilitar el dia, pero no enviar correos,  pero se cancelo turnos v2*/}
        {showErrorAllDayCancelNotSendedDisabled && (
          <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0">
            <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center ">
              No se pudo avisar a los Pacientes.
            </p>
            <button
              onClick={handleDisableAllDayErrorEmail}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl  sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue "
            >
              Ok
            </button>
          </div>
        )}

        {/* El disableallday no se pudo inhabilitar el dia */}
        {showMessageDayNotDisable && (
          <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0">
            <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
              El Día no se pudo deshabilitar.
            </p>
            <button
              onClick={handleDisableAllDayError}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
            >
              Ok
            </button>
          </div>
        )}

        {/* ver si reemplazo por v2 */}
        {/* Estoy probando    */}
        {/* Estoy probando poner este mensaje aca     */}
        {errorDeletingTurnAll == 3 && (
          <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0">
            <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
              El Día completo no se pudo deshabilitar.
            </p>
            <button
              onClick={handlecloseErrorDisablingAll}
              // onClick={()=>dispatch(toggleErrorDeletingTurnAll(''))}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
            >
              Ok
            </button>
          </div>
        )}

        {/* ver si reemplazo por v2 */}
        {errorDeletingTurnAll == 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0">
            <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-green-600 text-center">
              Los Turnos del dia fueron Borrados.
            </p>

            <button
              onClick={handleOkDeletedAll}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
            >
              Ok
            </button>
          </div>
        )}

        {errorDeletingTurn == "Error" && (
          <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0">
            <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
              El Turno no se pudo Borrar.
            </p>
            <button
              onClick={handleErrorDeleted}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
            >
              Ok
            </button>
          </div>
        )}

        {errorDeletingTurn == "Ok" && (
          <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0">
            <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-green-600 text-center">
              El Turno se Canceló Correctamente.
            </p>

            <button
              onClick={handleOkDeleted}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
            >
              Ok
            </button>
          </div>
        )}

        {visibleModalPatient && (
          <Modal>
            <ModalPatient handleHidePatient={handleHidePatient} />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ModalHourList;
