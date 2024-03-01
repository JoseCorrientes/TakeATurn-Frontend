import { useEffect, useState } from "react";
import FondoAzul from "../../assets/FondoAzul.jpg";
import {
  clearDoctorList,
  clearErrorChangeDoctorStatus,
  getDoctorList,
  clearErrorChangeDoctorAdmin,
  clearLoginAdminAll,
  deleteDoctorFromDB,
  clearErrorDeletingDoctor,
} from "../../actions/actions.js";
import { useDispatch, useSelector } from "react-redux";
import DoctorCard from "../DoctorCard/DoctorCard.jsx";
import { useNavigate } from "react-router-dom";
import ModalNewDoctor from "../ModalNewDoctor/ModalNewDoctor.jsx";
import Modal from "../Modal/Modal.jsx";
import Modal1 from "../Modal/Modal.jsx";
import Modal2 from "../Modal/Modal.jsx";

function SuperRootDoctorList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let errorRecoveringDoctorListState = useSelector(
    (state) => state.errorRecoveringDoctorList
  );
  let errorChangeDoctorStatusState = useSelector(
    (state) => state.errorChangeDoctorStatus
  );
  let errorChangeDoctorDoctorAdminState = useSelector(
    (state) => state.errorChangeDoctorAdmin
  );
  let errorDeletingDoctorState = useSelector(
    (state) => state.errorDeletingDoctor
  );

  const [visibleOk, setVisibleOk] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const [visibleAdminOk, setVisibleAdminOk] = useState(false);
  const [visibleAdminError, setVisibleAdminError] = useState(false);
  const [visibleAdminError2, setVisibleAdminError2] = useState(false);
  const [visibleModalNewDoctor, setVisibleModalNewDoctor] = useState(false);
  const [visibleModalDeleteDoctorMessage, setVisibleModalDeleteDoctorMessage] =
    useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState("");

  const [messageDoctorDeletedOk, setMessageDoctorDeletedOk] = useState(false);
  const [messageDoctorDeletedTurnsError, setMessageDoctorDeletedTurnsError] =
    useState(false);
  const [messageDoctorDeletedError, setMessageDoctorDeletedError] =
    useState(false);

  const handleExitMenu = () => {
    dispatch(clearDoctorList());
    navigate("/admin/menu");
  };

  const handleMessageOk = () => {
    dispatch(getDoctorList());
    dispatch(clearErrorChangeDoctorStatus());
    setVisibleOk(false);
  };
  const handleMessageError = () => {
    dispatch(clearErrorChangeDoctorStatus());
    setVisibleError(false);
  };

  const handleMessageAdminOk = () => {
    dispatch(clearErrorChangeDoctorAdmin());
    dispatch(getDoctorList());
    setVisibleAdminOk(false);
    dispatch(clearLoginAdminAll());
    window.localStorage.clear();
    navigate("/admin");
  };
  const handleMessageAdminError = () => {
    dispatch(clearErrorChangeDoctorAdmin());
    setVisibleAdminError(false);
  };
  const handleMessageAdminError2 = () => {
    dispatch(clearErrorChangeDoctorAdmin());
    setVisibleAdminError2(false);
    dispatch(clearDoctorList());
    dispatch(clearLoginAdminAll());
    window.localStorage.clear();
    navigate("/admin");
  };

  const handleProceedDeleteDoctor = () => {
    dispatch(deleteDoctorFromDB(doctorToDelete.id));
  };

  const handleCancelDeleteDoctor = () => {
    setDoctorToDelete("");
    setVisibleModalDeleteDoctorMessage(false);
  };

  const handleFinishDoctorDeletedOk = () => {
    dispatch(clearErrorDeletingDoctor());
    setDoctorToDelete("");
    setVisibleModalDeleteDoctorMessage(false);
    setMessageDoctorDeletedOk(false);
    dispatch(getDoctorList());
  };

  const handleFinishDoctorDeletedTurnsError = () => {
    dispatch(clearErrorDeletingDoctor());
    setDoctorToDelete("");
    setVisibleModalDeleteDoctorMessage(false);
    setMessageDoctorDeletedTurnsError(false);
  };
  const handleFinishDoctorDeletedError = () => {
    dispatch(clearErrorDeletingDoctor());
    setDoctorToDelete("");
    setVisibleModalDeleteDoctorMessage(false);
    setMessageDoctorDeletedError(false);
  };

  useEffect(() => {
    if (
      errorDeletingDoctorState != "" &&
      errorDeletingDoctorState.status == "Ok"
    )
      setMessageDoctorDeletedOk(true);
    if (
      errorDeletingDoctorState != "" &&
      errorDeletingDoctorState.status == "Error" &&
      errorDeletingDoctorState.message == "Error Deleting Turns"
    )
      setMessageDoctorDeletedTurnsError(true);
    if (
      errorDeletingDoctorState != "" &&
      errorDeletingDoctorState.status == "Error" &&
      errorDeletingDoctorState.message == "Error Deleting Doctor"
    )
      setMessageDoctorDeletedError(true);
  }, [errorDeletingDoctorState]);

  useEffect(() => {
    if (doctorToDelete != "") setVisibleModalDeleteDoctorMessage(true);
  }, [doctorToDelete]);

  useEffect(() => {
    if (
      errorChangeDoctorDoctorAdminState != "" &&
      errorChangeDoctorDoctorAdminState.status == "Ok"
    )
      setVisibleAdminOk(true);
    if (
      errorChangeDoctorDoctorAdminState != "" &&
      errorChangeDoctorDoctorAdminState.status == "Error"
    )
      setVisibleAdminError(true);
    if (
      errorChangeDoctorDoctorAdminState != "" &&
      errorChangeDoctorDoctorAdminState.status == "Error2"
    )
      setVisibleAdminError2(true);
  }, [errorChangeDoctorDoctorAdminState]);

  useEffect(() => {
    if (
      errorChangeDoctorStatusState != "" &&
      errorChangeDoctorStatusState.status == "Ok"
    )
      setVisibleOk(true);
    if (
      errorChangeDoctorStatusState != "" &&
      errorChangeDoctorStatusState.status == "Error"
    )
      setVisibleError(true);
  }, [errorChangeDoctorStatusState]);

  useEffect(() => {
    dispatch(getDoctorList());
  }, []);

  return (
    <div
      className="flex flex-row justify-center w-auto h-full  bg-fixed bg-contain bg-right bg-mayra-dark-blue  "
      style={{ backgroundImage: `url(${FondoAzul})` }}
    >
      {errorRecoveringDoctorListState != "" &&
        errorRecoveringDoctorListState.doctor.length > 0 && (
          <div className="flex flex-col items-center w-full h-5/6 border-[2px] sm:w-2/3 sm:h-5/6 sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90 ">
            <h1 className="text-white font-Saira text-2xl sm:text-3xl  font-light text-center pb-4 pt-5 sm:pb-5 sm:pt-6">
              Listado de Doctores
            </h1>

            <button
              onClick={() => setVisibleModalNewDoctor(true)}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg  w-11/12 sm:w-2/3 h-10   sm:hover:text-4xl text-2xl sm:text-3xl text-white font-thin font-Saira mb-7 hover:border-4 sm:mr-1 hover:mb-6 sm:hover:mb-7"
            >
              CREAR NUEVO DOCTOR
            </button>

            <div className="flex flex-col justify-start items-center w-full h-5/6  overflow-y-auto">
              {errorRecoveringDoctorListState != "" &&
                errorRecoveringDoctorListState["doctor"].map((item, index) => (
                  <DoctorCard
                    className="text-white"
                    key={index}
                    data={item}
                    setDoctorToDelete={setDoctorToDelete}
                  ></DoctorCard>
                ))}
            </div>

            {!visibleAdminError2 &&
              !visibleAdminError &&
              !visibleAdminOk &&
              !visibleError &&
              !visibleOk && (
                <div className="flex flex-row w-full justify-center items-center sm:px-2 mt-2">
                  <button
                    onClick={handleExitMenu}
                    className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg  w-11/12 sm:w-2/3 h-10   sm:hover:text-4xl text-2xl sm:text-3xl text-white font-thin font-Saira mb-7 hover:border-4 sm:mr-1"
                  >
                    VOLVER
                  </button>
                </div>
              )}
            {(visibleAdminError2 ||
              visibleAdminError ||
              visibleAdminOk ||
              visibleOk ||
              visibleError) && (
              <div className="flex flex-row w-full justify-center items-center px-2 mt-5">
                <button
                  disabled
                  className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg  w-full sm:w-2/3 h-10  text-2xl sm:text-3xl text-white font-thin font-Saira mb-7 sm:mr-1 opacity-20"
                >
                  VOLVER
                </button>
              </div>
            )}

            {visibleOk && (
              <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0 sm:mb-2">
                <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-green-600 text-center ">
                  El Estado fué cambiado Correctamente.
                </p>

                <button
                  onClick={handleMessageOk}
                  className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl  sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue mb-2 sm:mb-0"
                >
                  Ok
                </button>
              </div>
            )}
            {visibleError && (
              <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0 sm:mb-2">
                <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center ">
                  El Estado No se pudo Cambiar.
                </p>

                <button
                  onClick={handleMessageError}
                  className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl mb-2 sm:mb-0 sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
                >
                  Ok
                </button>
              </div>
            )}
            {visibleAdminOk && (
              <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-2 sm:mb-5">
                <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-green-600 text-center">
                  El Doctor fué cambiado a Administrador Correctamente.
                </p>

                <button
                  onClick={handleMessageAdminOk}
                  className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue mb-2 sm:mb-1"
                >
                  Ok
                </button>
              </div>
            )}
            {visibleAdminError && (
              <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-2 sm:mb-2">
                <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
                  El Admin Actual no pudo deshabilitarse.
                </p>

                <button
                  onClick={handleMessageAdminError}
                  className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl  sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue mb-2 sm:-mb-1"
                >
                  Ok
                </button>
              </div>
            )}
            {visibleAdminError2 && (
              <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-2 sm:mb-6">
                <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
                  Hubo un Error. Active Admin con admin@gmail.com.
                </p>

                <button
                  onClick={handleMessageAdminError2}
                  className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue mb-2 sm:mb-1"
                >
                  Ok
                </button>
              </div>
            )}
            {visibleModalNewDoctor && (
              <Modal>
                <ModalNewDoctor
                  setVisibleModalNewDoctor={setVisibleModalNewDoctor}
                />
              </Modal>
            )}

            {visibleModalDeleteDoctorMessage && (
              <Modal1>
                <div className="flex flex-col fixed inset-0  bg-black bg-opacity-50 w-full justify-center items-center">
                  <div className="flex flex-col items-center w-11/12 h-auto border-[2px] sm:w-2/3 sm:h-1/3 py-5 sm:py-10 sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90">
                    <p className="px-4  sm:ml-2 sm:mr-2 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
                      El Doctor será borrado permanentemente de la Base de
                      Datos, así como tambien todos los turnos relacionados con
                      él.
                    </p>
                    <div className="mt-2 flex flex-row justify-center items-center w-full">
                      <button
                        onClick={handleProceedDeleteDoctor}
                        className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0 sm:mr-2 font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue "
                      >
                        Ok
                      </button>
                      <button
                        onClick={handleCancelDeleteDoctor}
                        className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0 sm:mr-2 font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue "
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </Modal1>
            )}

            {messageDoctorDeletedOk && (
              <Modal2>
                <div className="flex flex-col fixed inset-0  bg-black bg-opacity-50 w-full justify-center items-center">
                  <div className="flex flex-row justify-center items-center w-11/12 h-auto border-[2px] sm:w-2/3 sm:h-1/4 py-5 sm:py-10 sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90 ">
                    <p className="w-5/6 px-4  sm:mx-2 font-Saira text-3xl text-white font-thin bg-green-600 text-center ml-1 mr-1 ">
                      El Doctor fue Borrado de la Base de Datos
                    </p>
                    <button
                      onClick={handleFinishDoctorDeletedOk}
                      className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/6 mt-4 sm:mt-0 sm:mr-2 font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue mr-1 "
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </Modal2>
            )}

            {messageDoctorDeletedTurnsError && (
              <Modal2>
                <div className="flex flex-col fixed inset-0  bg-black bg-opacity-50 w-full justify-center items-center">
                  <div className="flex flex-row justify-center items-center w-11/12 h-auto border-[2px] sm:w-2/3 sm:h-1/4 py-5 sm:py-10 sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90 ">
                    <p className="w-5/6 px-4  sm:mx-2 font-Saira text-3xl text-white font-thin bg-red-600 text-center ml-1 ">
                      Error en el borrado. Los turnos no pudieron borrarse.
                    </p>
                    <button
                      onClick={handleFinishDoctorDeletedTurnsError}
                      className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 ml-1 mr-1 w-1/2 sm:w-1/6 mt-4 sm:mt-0 sm:mr-2 font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue "
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </Modal2>
            )}

            {messageDoctorDeletedError && (
              <Modal2>
                <div className="flex flex-col fixed inset-0  bg-black bg-opacity-50 w-full justify-center items-center">
                  <div className="flex flex-row justify-center items-center w-11/12 h-auto border-[2px] sm:w-2/3 sm:h-1/4 py-5 sm:py-10 sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90 ">
                    <p className="w-5/6 px-4  sm:mx-2 font-Saira text-3xl text-white font-thin bg-red-600 text-center ml-1 sm:ml-0 mr-1 sm:mr-1">
                      El doctor no pudo ser Borrado, pero si los turnos
                      relacionado.
                    </p>
                    <button
                      onClick={handleFinishDoctorDeletedError}
                      className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/6 mt-4 sm:mt-0 sm:mr-2 font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue mr-1 "
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </Modal2>
            )}
          </div>
        )}

      {errorRecoveringDoctorListState != "" &&
        errorRecoveringDoctorListState.doctor.length == 0 && (
          <div className="flex flex-col items-center w-11/12 h-1/2 border-[2px] sm:w-2/3 sm:h-5/6 sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90 ">
            <h1 className="text-white font-Saira text-2xl sm:text-3xl  font-light text-center pb-4 pt-5 sm:pb-5 sm:pt-6">
              Listado de Doctores
            </h1>

            <button
              onClick={() => setVisibleModalNewDoctor(true)}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg w-11/12 sm:w-2/3 h-10   sm:hover:text-4xl text-2xl sm:text-3xl text-white font-thin font-Saira mb-7 hover:border-4 sm:mr-1 "
            >
              CREAR NUEVO DOCTOR
            </button>

            {!visibleAdminError2 &&
              !visibleAdminError &&
              !visibleAdminOk &&
              !visibleError &&
              !visibleOk && (
                <div className="flex flex-row w-full justify-center items-center mt-2">
                  <button
                    onClick={handleExitMenu}
                    className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg  w-11/12 sm:w-2/3 h-10  sm:hover:text-4xl text-2xl sm:text-3xl text-white font-thin font-Saira mb-7 hover:border-4 sm:mr-1"
                  >
                    VOLVER
                  </button>
                </div>
              )}
            {visibleModalNewDoctor && (
              <Modal>
                <ModalNewDoctor
                  setVisibleModalNewDoctor={setVisibleModalNewDoctor}
                />
              </Modal>
            )}
          </div>
        )}
    </div>
  );
}

export default SuperRootDoctorList;
