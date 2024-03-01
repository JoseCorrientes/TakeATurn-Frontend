import { useSelector, useDispatch } from "react-redux";
import {
  getMonthTurns,
  toogleSeeHourList,
  dayToSave,
  //   toggleCanceledTurn,
  //   deleteTurnDB,
  //   sendEmailToPro,
  toggleSeeClientReservation,
  fillDataHourReservation,
  fillClientData,
  initializeMonthTurns,
  initilizeDaysWithOwnTurns,
  storeDataMonthToSeek,
  toggleErrorSavingTurn,
  //   clearLoginAdminAll,
  toggleReload,
  toggleErrorDeletingTurnAll,
  clearErrorActivatingDay,
  toggleInstructionsButton,
} from "../../actions/actions";
import DayComponent from "../DayComponent/DayComponent.jsx";
import { useEffect, useState } from "react";
import FondoAzul from "../../assets/FondoAzul.jpg";
import Modal from "../Modal/Modal";
import ModalHourList from "../ModalHourList/ModalHourList";
import ModalClientReservation from "../ModalClientReservation/ModalClientReservation.jsx";
import { Link } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";

function ShowMonth() {
  let monthTurns = useSelector((state) => state.monthTurns);
  let dayTurns = useSelector((state) => state.dayToSave);
  let seeHourList = useSelector((state) => state.seeHourList);
  let seeClientReservation = useSelector((state) => state.seeClientReservation);
  //   let canceledTurn = useSelector((state) => state.canceledTurn);
  let user = useSelector((state) => state.user);
  //   let dataMonthToSeek = useSelector((state) => state.dataMonthToSeek);
  let loginDoctorValid = useSelector((state) => state.loginDoctorValid);
  let loginDoctorData = useSelector((state) => state.loginDoctorData);
  let errorDeletingTurnAll = useSelector((state) => state.errorDeletingTurnAll);
  let errorActivatingDay = useSelector((state) => state.errorActivatingDay);
  const [localMonth, setLocalMonth] = useState("0");
  const [localYear, setLocalYear] = useState("0");
  const [flag, setFlag] = useState(false);
  const [seeErrorActivatingDay, setSeeErrorActivatingDay] = useState(false);
  const [yearsArray, setYearsArray] = useState([]);
  const [monthArray, setMonthArray] = useState([]);

  const dispatch = useDispatch();

  if (loginDoctorData == "") dispatch(toggleInstructionsButton(true));
  let reload = useSelector((state) => state.reload);

  useEffect(() => {
    dispatch(toogleSeeHourList(false));
  }, [flag]);

  useEffect(() => {
    if (errorActivatingDay != "") setSeeErrorActivatingDay(true);
  }, [errorActivatingDay]);

  //ver si esto anda con las modificaciones de login doctor valid
  useEffect(() => {
    let data;
    //Si es un doctor valido segun estado global envio lo siguiente:
    if (loginDoctorValid || errorDeletingTurnAll == 1) {
      data = {
        year: localYear,
        month: localMonth,
        // clave admin= true es administrador, false no es administrador
        userType: "doctor",
        //id es el id del doctor que busco
        idDoctor: loginDoctorData.id,
      };
      if (errorDeletingTurnAll == 1) dispatch(toggleErrorDeletingTurnAll(""));
    } else {
      data = {
        year: localYear,
        month: localMonth,
        // clave admin= true es administrador, false no es administrador
        userType: "patient",
        //idpatient es el nombre del paciente que quire registrarse
        idPatient: user.user,
        //emailPatient es el correo que loguea el usuario, se usara como identificador
        emailPatient: user.email,
        //veo si necesito despachar tambien el numero de doctor
        //cambio doctor por IdDoctor
        idDoctor: user.doctor,
      };
    }

    if (localYear != "0" && localMonth != "0") {
      dispatch(getMonthTurns(data));
    }
  }, [reload, errorDeletingTurnAll]);

  //Genera el arreglo de años a mostrar en el select de acuerdo al año actual
  useEffect(() => {
    let year = new Date();
    let actualYear = year.getFullYear();
    setYearsArray([
      actualYear.toString(),
      (actualYear + 1).toString(),
      (actualYear + 2).toString(),
      (actualYear + 3).toString(),
    ]);

    if (yearsArray.length > 0) console.log(typeof yearsArray[0]);
  }, []);

  //Genera el arreglo de meses a mostrar en el select de meses.
  useEffect(() => {
    if (localYear !== "0") {
      let year = new Date();
      let actualYear = year.getFullYear();
      let thisMonth = year.getMonth() + 1;
      let actualMonth = [];
      if (actualYear.toString() == localYear) {
        for (let x = thisMonth; x <= 12; x++) {
          let value;
          let name;
          switch (x) {
            case 1: {
              (value = "1"), (name = "Enero");
              break;
            }
            case 2: {
              (value = "2"), (name = "Febrero");
              break;
            }
            case 3: {
              (value = "3"), (name = "Marzo");
              break;
            }
            case 4: {
              (value = "4"), (name = "Abril");
              break;
            }
            case 5: {
              (value = "5"), (name = "Mayo");
              break;
            }
            case 6: {
              (value = "6"), (name = "Junio");
              break;
            }
            case 7: {
              (value = "7"), (name = "Julio");
              break;
            }
            case 8: {
              (value = "8"), (name = "Agosto");
              break;
            }
            case 9: {
              (value = "9"), (name = "Septiembre");
              break;
            }
            case 10: {
              (value = "10"), (name = "Octubre");
              break;
            }
            case 11: {
              (value = "11"), (name = "Noviembre");
              break;
            }
            case 12: {
              (value = "12"), (name = "Diciembre");
              break;
            }
          }
          actualMonth.push({ value, name });
        }
      } else {
        actualMonth = [
          { value: "1", name: "Enero" },
          { value: "2", name: "Febrero" },
          { value: "3", name: "Marzo" },
          { value: "4", name: "Abril" },
          { value: "5", name: "Mayo" },
          { value: "6", name: "Junio" },
          { value: "7", name: "Julio" },
          { value: "8", name: "Agosto" },
          { value: "9", name: "Septiembre" },
          { value: "10", name: "Octubre" },
          { value: "11", name: "Noviembre" },
          { value: "12", name: "Diciembre" },
        ];
      }
      setMonthArray(actualMonth);
    } else {
      setLocalMonth("0");
      setMonthArray([]);
    }
  }, [localYear]);

  //funcion de ok luego del mensaje de no se puede habilitar el dia por parte del doctor
  const handleOkErrorActivatingDay = () => {
    dispatch(clearErrorActivatingDay());
    setSeeErrorActivatingDay(false);
  };

  //setea el año
  const handleYear = (e) => {
    setLocalYear(e.target.value);
  };

  //setea el mes
  const handleMonth = (e) => {
    setLocalMonth(e.target.value);
  };

  // cierra la visualizacion de la lista de turnos del dia
  const handleCloseTurns = () => {
    dispatch(toogleSeeHourList(false));
    dispatch(dayToSave({}));
    dispatch(toggleReload());
  };

  const handleGetTurns = () => {
    let data;
    //considero este caso es un doctor
    if (loginDoctorValid) {
      data = {
        year: localYear,
        month: localMonth,
        userType: "doctor",
        idDoctor: loginDoctorData.id,
      };
    }

    //considero este caso es un paciente
    if (!loginDoctorValid) {
      data = {
        year: localYear,
        month: localMonth,
        userType: "patient",
        idPatient: user.user,
        emailPatient: user.email,
        idDoctor: user.doctor,
      };
    }

    dispatch(storeDataMonthToSeek(data));
    dispatch(getMonthTurns(data));
  };

  //al apretar el boton de un dia en el calendario se dispara esta funcion
  const handleOneDay = (day) => {
    let dayToSaveData = monthTurns.filter(
      (item) => item.type == "day" && item.day == day
    );
    dispatch(dayToSave(dayToSaveData[0]));
    dispatch(toogleSeeHourList(true));
  };

  //funcion de disparo de boton de reserva de turno desde modalhourlist. apaga modalhourlist apagando seehourlist y prendiendo seeClientReservation
  const handleToggleClientReservation = (item) => {
    dispatch(toogleSeeHourList(false));
    let data = {
      turnName: item.turnName,
      status: "busy",
      hourIndex: item.index,
      offDuty: false,
    };
    dispatch(fillDataHourReservation(data));
    dispatch(toggleSeeClientReservation(true));
  };

  //Esta funcion es llamada del boton cambiar usuario para acerar datos de user al volver a login
  const handleClearClient = () => {
    dispatch(fillClientData(""));
    dispatch(storeDataMonthToSeek(""));
    dispatch(initializeMonthTurns());
    dispatch(initilizeDaysWithOwnTurns());
    dispatch(toggleErrorSavingTurn(""));
    dispatch(toggleInstructionsButton(false));
  };

  let data = {
    year: localYear,
    month: localMonth,
    claveAdmin: user.admin,
    idPatient: user.user,
    emailPatient: user.email,
    doctor: user.doctor,
  };

  let tituloGeneral = loginDoctorValid ? "SELECCIONE EL DIA" : "ELIJA UN TURNO";
  let segundoBoton = loginDoctorValid ? "Salir" : "Cambiar Usuario";
  let segundoBotonLink = loginDoctorValid ? "/doctors/menu" : "/";

  return (
    // inicio de toda la pantall que tiene imagen de muela de fondo probando para cel
    <div
      className="w-full  h-full sm:h-auto overflow-y-auto"
      style={{ backgroundImage: `url(${FondoAzul})` }}
    >
      {/* div inicio del contenedor de todo y que ocupa solo 3/4 del ancho de la pantall de fondo de pantalla? */}
      <div
        className="w-auto sm:w-3/4   h-auto  pt-4 sm:pt-8 mx-2 sm:mx-auto"
        // className="w-auto sm:w-3/4   h-auto  pt-4 sm:pt-8 mx-2 sm:mx-auto bg-no-repeat bg-contain bg-right "
      >
        {/* inicio del div cuadrado traslucido que contiene todo el elija un turno y los inputs y los botones */}
        <div className="py-2 sm:py-4 bg-black bg-opacity-30 shadow-black shadow-md">
          <h2 className="text-center mb-3 sm:mb-6 font-Saira text-3xl sm:text-5xl text-gray-400 font-extralight">
            {tituloGeneral}
          </h2>

          {/* Div a continuacion que tiene input de ano, mes y 2 botones */}
          <div className="flex flex-col justify-center">
            {/* inicio div que contiene la linea ano, input, mes, input */}
            <div className="flex flex-row justify-center mb-6 items-center">
              <p className="pr-2 font-Saira text-2xl sm:text-3xl text-white font-light ">
                Año:
              </p>
              <select
                className="border-2  w-40 border-black text-center font-Saira text-2xl sm:text-md text-gray-700 font-light"
                onChange={(e) => handleYear(e)}
              >
                <option value="0">Elija el Año</option>
                {yearsArray.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <p className="ml-5 pr-2 font-Saira text-2xl sm:text-3xl text-white font-light ">
                Mes:
              </p>

              <select
                className="border-2 border-black text-center font-Saira text-2xl sm:text-md text-gray-700 font-light"
                onChange={(e) => handleMonth(e)}
              >
                <option value="0">Elija el Mes</option>
                {monthArray.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            {/* fin div que contiene la linea ano, input, mes, input */}

            {/* inicio div contenedor de boton buscar y cambiar usuario     */}
            <div className="w-full flex flex-row justify-center">
              {localMonth != "0" &&
                localYear != "0" &&
                (user != "" || loginDoctorValid) && (
                  <button
                    className="flex flex-row justify-center border-2 border-red-500 items-center py-1 h-10 w-1/3 sm:w-1/4 ml-1 sm:ml-0 mr-1 rounded-lg font-Saira text-2xl    sm:text-3xl sm:hover:text-4xl font-thin bg-red-700 bg-opacity-60 text-white  hover:bg-opacity-20 hover:border-4 hover:border-red-500"
                    onClick={handleGetTurns}
                  >
                    Ver Mes
                  </button>
                )}

              {(localMonth === "0" ||
                localYear === "0" ||
                (user == "" && !loginDoctorValid)) && (
                <button
                  className="mr-1 ml-1 sm:ml-0 rounded-md h-10 w-1/3 sm:w-1/4 bg-gray-700 bg-opacity-30 font-Saira text-2xl sm:text-3xl text-gray-700 font-thin  "
                  disabled
                ></button>
              )}

              <Link
                onClick={handleClearClient}
                to={segundoBotonLink}
                className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-2/3 sm:w-1/4 font-Saira text-2xl   sm:text-3xl sm:hover:text-4xl ml-1 mr-1 sm:mr-0  text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
              >
                {segundoBoton}
              </Link>
            </div>
            {/* fin div contenedor de boton buscar y cambiar usuario     */}
          </div>
          {/* find del Div que tiene input de ano, mes y 2 botones */}
        </div>
        {/* fin del div cuadrado traslucido que contiene todo el elija un turno y los inputs y los botones */}

        {/* inicio del div contenedor de recuador de dias de la semana en negro y blanco                 */}
        <div className="mt-6 sm:mt-10 w-full sm:w-4/6 mx-auto h-10 grid grid-cols-7 grid-rows-1 border-2 bg-black border-black font-Saira text-2xl sm:text-3xl text-white font-light">
          <p className="flex flex-col justify-center w-full h-10  col-start-1 col-end-2 text-center ">
            DO
          </p>
          <p className="flex flex-col justify-center w-full h-10 col-start-2 col-end-3 text-center">
            LU
          </p>
          <p className="flex flex-col justify-center w-full h-10 col-start-3 col-end-4 text-center">
            MA
          </p>
          <p className="flex flex-col justify-center w-full h-10  col-start-4 col-end-5 text-center">
            MI
          </p>
          <p className="flex flex-col justify-center w-full h-10 col-start-5 col-end-6 text-center">
            JU
          </p>
          <p className="flex flex-col justify-center w-full h-10  col-start-6 col-end-7 text-center">
            VI
          </p>
          <p className="flex flex-col justify-center w-full h-10 col-start-7 col-end-8 text-center">
            SA
          </p>
        </div>
        {/* fin del div contenedor de recuador de dias de la semana en negro y blanco                 */}

        {/* inicio del contenedor de la grilla de dias                 */}
        <div className="mt-1 w-full h-full sm:w-4/6 mx-auto  grid gap-1 grid-cols-7 grid-rows-6 ">
          {monthTurns.length > 0 &&
            monthTurns.map((item, index) => {
              return (
                <DayComponent
                  handleOneDay={handleOneDay}
                  key={index}
                  data={item}
                />
              );
            })}
        </div>
        {/* fin del contenedor de la grilla de dias */}
      </div>
      {/* div fin del contenedor de todo y que ocupa solo 3/4 del ancho de la pantall de fondo de pantalla? */}

      {seeHourList && (
        <Modal>
          <ModalHourList
            handleCloseTurns={handleCloseTurns}
            handleToggleClientReservation={handleToggleClientReservation}
            year={localYear}
            month={localMonth}
            day={dayTurns.day}
            setFlag={setFlag}
          />
        </Modal>
      )}

      {seeErrorActivatingDay && (
        <Modal>
          <div className=" flex flex-col fixed inset-0 h-full bg-black bg-opacity-50 w-full justify-center items-center">
            <div className="flex flex-col items-center justify-center w-11/12 h-auto py-5 sm:py-0 border-[2px]  sm:px-0 sm:w-2/3 sm:h-40 sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90 ">
              <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0">
                <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
                  No se pudo habilitar el Día.
                </p>
                <button
                  onClick={handleOkErrorActivatingDay}
                  className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {seeClientReservation && (
        <Modal>
          <ModalClientReservation
            year={localYear}
            month={localMonth}
            day={dayTurns.day}
            data={data}
          />
        </Modal>
      )}
    </div>
  );
}

export default ShowMonth;
