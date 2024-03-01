import { useEffect, useState } from "react";
import {
  clearErrorCreatingDoctor,
  createDoctor,
  getDoctorList,
} from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";

function ModalNewDoctor({ setVisibleModalNewDoctor }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [title, setTitle] = useState("");
  const [stringName, setStringName] = useState("");
  const [buttonVisible, setButtonVisible] = useState(false);

  const [messageOk, setMessageOk] = useState(false);
  const [messageServerError, setMessageServerError] = useState(false);
  const [messageEmailExistsError, setMessageEmailExistsError] = useState(false);

  let errorCreatingDoctorState = useSelector(
    (state) => state.errorCreatingDoctor
  );

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    let regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    setEmail(e.target.value);
    if (regex.test(e.target.value)) setEmailValid(true);
    else setEmailValid(false);
  };
  const handleStringName = (e) => {
    setStringName(e.target.value);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleCancel = () => {
    setName("");
    setLastName("");
    setTitle("");
    setEmail("");
    setStringName("");
    setEmailValid(false);
    setButtonVisible(false);
    setVisibleModalNewDoctor(false);
  };

  const handleCreateDoctor = () => {
    let data = {
      name,
      lastName,
      title,
      email,
      stringName,
      password: "password1234",
      active: true,
      admin: false,
    };
    dispatch(createDoctor(data));
  };

  const handleCreateOk = () => {
    setName("");
    setLastName("");
    setEmail("");
    setEmailValid(false);
    setTitle("");
    setStringName("");
    dispatch(clearErrorCreatingDoctor());
    dispatch(getDoctorList());
    setVisibleModalNewDoctor(false);
  };
  const handleCreateError = () => {
    setName("");
    setLastName("");
    setEmail("");
    setEmailValid(false);
    setTitle("");
    setStringName("");
    dispatch(clearErrorCreatingDoctor());
    setVisibleModalNewDoctor(false);
  };

  const handleCreateEmailExistsError = () => {
    setEmail("");
    setEmailValid(false);
    dispatch(clearErrorCreatingDoctor());
    setMessageEmailExistsError(false);
  };

  useEffect(() => {
    if (
      emailValid &&
      name != "" &&
      lastName != "" &&
      title != "" &&
      stringName != ""
    )
      setButtonVisible(true);
    else setButtonVisible(false);
  }, [name, lastName, title, stringName, emailValid]);

  useEffect(() => {
    if (
      errorCreatingDoctorState != "" &&
      errorCreatingDoctorState.status == "Ok"
    )
      setMessageOk(true);
    if (
      errorCreatingDoctorState != "" &&
      errorCreatingDoctorState.status == "Error" &&
      errorCreatingDoctorState.message == "Email already exists"
    )
      setMessageEmailExistsError(true);
    if (
      errorCreatingDoctorState != "" &&
      errorCreatingDoctorState.status == "Error" &&
      errorCreatingDoctorState.message == "Server Error"
    )
      setMessageServerError(true);
  }, [errorCreatingDoctorState]);

  return (
    <div className="flex flex-col fixed inset-0  bg-black bg-opacity-50 w-full justify-center items-center">
      <div className="flex flex-col items-center w-11/12 h-5/6 border-[2px] sm:w-2/3 sm:h-auto py-5 sm:py-10 sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90">
        <h1 className="text-white font-Saira text-2xl sm:text-3xl  font-light text-center pb-4 pt-5 sm:pb-5 sm:pt-6 ">
          Crear Nuevo Doctor
        </h1>

        <input
          className="flex flex-row w-5/6 sm:w-1/3 h-[3rem] px-2 text-center mb-1"
          placeholder="Nombres Doctor"
          name="name"
          value={name}
          onChange={(e) => handleName(e)}
        />
        <input
          className="flex flex-row w-5/6 sm:w-1/3 h-[3rem] px-2 text-center mb-1"
          placeholder="Apellido Doctor"
          name="lastName"
          value={lastName}
          onChange={(e) => handleLastName(e)}
        />
        <input
          className="flex flex-row w-5/6 sm:w-1/3 h-[3rem] px-2 text-center mb-1"
          placeholder="Email Doctor"
          name="email"
          value={email}
          onChange={(e) => handleEmail(e)}
        />
        <select
          className="w-5/6 sm:w-1/3 h-[3rem] text-center mb-1 text-black"
          onChange={(e) => handleTitle(e)}
          name="title"
          value={title}
        >
          <option className="bg-white text-gray-400" value={""}>
            -- Titulo --
          </option>
          <option className="text-black" value={"Dr."}>
            Dr.
          </option>
          <option className="text-black" value={"Dra."}>
            Dra.
          </option>
        </select>

        <input
          className="flex flex-row w-5/6 sm:w-1/3 h-[3rem] px-2 text-center mb-1"
          placeholder="Nombre Visible Doctor"
          name="stringName"
          value={stringName}
          onChange={(e) => handleStringName(e)}
        />

        <div className="w-full h-1/6 flex flex-row justify-center items-center mt-2">
          {!messageServerError &&
            !messageEmailExistsError &&
            !messageOk &&
            buttonVisible && (
              <button
                className="flex flex-row justify-center items-center mr-1 rounded-md h-10 w-1/2 sm:w-1/4 bg-red-700 bg-opacity-60 font-Saira text-2xl  sm:hover:text-4xl  sm:text-3xl text-white font-thin hover:bg-opacity-20 hover:border-4 hover:border-red-500 ml-1 sm:ml-0"
                onClick={handleCreateDoctor}
              >
                Grabar Doctor
              </button>
            )}

          {(messageServerError ||
            messageEmailExistsError ||
            messageOk ||
            !buttonVisible) && (
            <button
              className="flex flex-row justify-center items-center mr-1 rounded-md h-10 w-1/2 sm:w-1/4 bg-gray-700 bg-opacity-20 font-Saira text-2xl sm:text-3xl text-gray-700 font-thin ml-1 sm:ml-0"
              disabled
            >
              Grabar Doctor
            </button>
          )}

          {!messageServerError && !messageEmailExistsError && !messageOk && (
            <button
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10 w-1/2 sm:w-1/4 font-Saira text-2xl  sm:hover:text-4xl ml-1 mr-1 sm:mr-0 sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          )}
          {(messageServerError || messageEmailExistsError || messageOk) && (
            <button
              className="flex flex-row justify-center items-center mr-1 rounded-md h-10 w-1/2 sm:w-1/4 bg-gray-700 bg-opacity-20 font-Saira text-2xl sm:text-3xl text-gray-700 font-thin ml-1 sm:ml-0 "
              disabled
            >
              Cancelar
            </button>
          )}
        </div>

        {messageOk && (
          <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0 sm:mb-2">
            <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-green-600 text-center">
              El Doctor fué Creado Correctamente.
            </p>

            <button
              onClick={handleCreateOk}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue "
            >
              Ok
            </button>
          </div>
        )}

        {messageEmailExistsError && (
          <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0 sm:mb-2">
            <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
              El email del usuario ya existe.
            </p>

            <button
              onClick={handleCreateEmailExistsError}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
            >
              Ok
            </button>
          </div>
        )}
        {messageServerError && (
          <div className="flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0 sm:mb-2">
            <p className="px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
              Error de Servidor.
            </p>

            <button
              onClick={handleCreateError}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue"
            >
              Ok
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalNewDoctor;

