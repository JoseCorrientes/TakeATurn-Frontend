import { useEffect, useState } from "react";
import FondoAzul from "../../assets/FondoAzul.jpg";
// import { fillClientData } from '../../actions/actions';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { decryptData, encryptData } from "../../tools/crypto";
import { useNavigate } from "react-router-dom";
import {
  clearErrorRecoveringDoctorPassword,
  clearLoginDoctorError,
  recoverDoctorPassword,
  sendDataLoginDoctor,
} from "../../actions/actions";

function LandingDoctors() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleMessage, setVisibleMessage] = useState(false);
  const [recoverPasswordOk, setRecoverPasswordOk] = useState(false);
  const [recoverPasswordError, setRecoverPasswordError] = useState(false);

  const loginDoctorError = useSelector((state) => state.loginDoctorError);
  const loginDoctorValid = useSelector((state) => state.loginDoctorValid);
  const loginDoctorData = useSelector((state) => state.loginDoctorData);
  const errorRecoveringDoctorPasswordState = useSelector(
    (state) => state.errorRecoveringDoctorPassword
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (
      errorRecoveringDoctorPasswordState != "" &&
      errorRecoveringDoctorPasswordState.status == "Error"
    ) {
      setPassword("");
      setEmail("");
      setRecoverPasswordError(true);
      setRecoverPasswordOk(false);
    }
    if (
      errorRecoveringDoctorPasswordState != "" &&
      errorRecoveringDoctorPasswordState.status == "Ok"
    ) {
      setPassword("");
      setEmail("");
      setPasswordValid(false);
      setEmailValid(false);
      setRecoverPasswordError(false);
      setRecoverPasswordOk(true);
    }
    if (errorRecoveringDoctorPasswordState == "") {
      setPassword("");
      setEmail("");
      setPasswordValid(false);
      setEmailValid(false);
      setRecoverPasswordError(false);
      setRecoverPasswordOk(false);
    }
  }, [errorRecoveringDoctorPasswordState]);

  //useEffect que borra los mensajes de error que aparecen
  useEffect(() => {
    setVisibleMessage(true);
    if (loginDoctorError == 2 || loginDoctorError == 3) {
      setTimeout(() => {
        setVisibleMessage(false);
        dispatch(clearLoginDoctorError());
      }, 2000);
    }
  }, [loginDoctorError]);

  //useffect que me envia a la pagina de menu de admin si es loginadminvalid==true
  useEffect(() => {
    if (loginDoctorValid) {
      //guardar el en localstorage datos y token para mantener sesion
      window.localStorage.setItem("TATDoctorEmail", loginDoctorData.email);
      window.localStorage.setItem(
        "TATDoctorStringName",
        loginDoctorData.stringName
      );
      window.localStorage.setItem("TATDoctorTitle", loginDoctorData.title);
      window.localStorage.setItem("TATDoctorToken", loginDoctorData.token);

      navigate("/doctors/menu");
    }
  }, [loginDoctorValid]);

  const handleRecoverOk = () => {
    dispatch(clearErrorRecoveringDoctorPassword());
  };

  //contrasenia de 12 caracteres o mas
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length > 11) setPasswordValid(true);
    else setPasswordValid(false);
  };
  const handleChangeEmail = (e) => {
    let regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    setEmail(e.target.value);
    if (regex.test(e.target.value)) setEmailValid(true);
    else setEmailValid(false);
  };

  const handleToggleVisible = () => {
    setVisible(!visible);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let data = { email, password };
    let valor = encryptData(data);
    dispatch(sendDataLoginDoctor(valor));
  };

  const handleRecoverPassword = () => {
    dispatch(recoverDoctorPassword(email));
  };

  let fieldType = visible ? "text" : "password";

  return (
    <div
      className="flex flex-row justify-center w-auto h-screen  bg-repeat bg-fixed bg-contain bg-right bg-mayra-dark-blue  "
      style={{ backgroundImage: `url(${FondoAzul})` }}
    >
      <div className="flex flex-col items-center justify-center mt-[1rem] w-11/12 h-5/6 border-[2px] rounded-lg border-mayra-dark-blue  bg-black opacity-80  sm:mt-[4rem] sm:w-3/5 sm:h-4/6 sm:border-[4px]">
        <h1 className="text-white font-Saira w-1/3 text-2xl sm:text-3xl  font-light  mb-4 ">
          Login Doctor
        </h1>
        <input
          className="w-3/4 h-[2rem] px-1 mb-4 sm:w-1/3  sm:h-[3rem] sm:px-2 sm:mb-1  text-center"
          placeholder="Ingrese su @mail"
          name="email"
          value={email}
          onChange={(e) => handleChangeEmail(e)}
        />

        <div className="flex flex-row justify-between w-3/4 h-[2rem] px-0 sm:w-1/3 mb-4 sm:h-[3rem] sm:px-0 sm:mb-6  text-center ">
          <input
            className="w-5/6 h-[2rem] px-1 mb-4 sm:h-full  sm:px-1   sm:mb-1  text-center"
            type={fieldType}
            placeholder="Ingrese su Contraseña"
            name="password"
            value={password}
            onChange={(e) => handleChangePassword(e)}
          />
          {visible && (
            <AiOutlineEyeInvisible
              onClick={handleToggleVisible}
              className="text-white text-2xl w-1/6 h-[2rem] sm:h-full cursor-pointer"
            />
          )}

          {!visible && (
            <AiOutlineEye
              onClick={handleToggleVisible}
              className="text-white text-2xl w-1/6 h-[2rem]  sm:h-full cursor-pointer"
            />
          )}
        </div>

        {emailValid && passwordValid && (
          <Link
            className="flex flex-row justify-center items-center mt-3 w-2/3 sm:w-1/6 h-[3rem]  text-center border-2 border-mayra-light-blue rounded-lg font-Saira text-2xl sm:text-3xl text-white font-thin hover:bg-black hover:border-4 hover:border-mayra-light-blue sm:hover:text-4xl "
            onClick={handleLogin}
          >
            Entrar
          </Link>
        )}
        {(!emailValid || !passwordValid) && (
          <button
            className="flex flex-row justify-center items-center mt-3 w-2/3 sm:w-1/6 h-[3rem] border-2 border-mayra-light-blue rounded-lg font-Saira text-2xl sm:text-3xl text-white font-light opacity-20"
            disabled
          >
            Entrar
          </button>
        )}

        {!recoverPasswordOk && !recoverPasswordError && emailValid && (
          <button
            className="flex flex-row justify-center items-center mt-3 w-3/4 sm:w-2/6 h-auto  text-center border-2 border-mayra-light-blue rounded-lg font-Saira text-2xl sm:text-3xl text-white font-thin hover:text-white hover:bg-black sm:hover:border-4 sm:hover:text-4xl hover:border-white sm:hover:border-mayra-light-blue"
            onClick={handleRecoverPassword}
          >
            Recuperar Contraseña
          </button>
        )}
        {recoverPasswordOk ||
          recoverPasswordError ||
          (!emailValid && (
            <button
              className="flex flex-row justify-center items-center mt-3 w-3/4 sm:w-2/6 h-auto  text-center border-2 border-mayra-light-blue rounded-lg font-Saira text-2xl sm:text-3xl text-white font-light opacity-20"
              disabled
            >
              Recuperar Contraseña
            </button>
          ))}

        {visibleMessage && loginDoctorError == "2" && (
          <p className="mt-4 px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
            Usuario o Contraseña Invalidas.
          </p>
        )}
        {visibleMessage && loginDoctorError == "3" && (
          <p className="mt-4 px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
            Error de Servidor. Reintente.
          </p>
        )}
        {recoverPasswordError && (
          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0">
            <p className="ml-1 px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
              Error al Recuperar Contraseña.
            </p>
            <button
              onClick={handleRecoverOk}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue mr-1"
            >
              Ok
            </button>
          </div>
        )}

        {recoverPasswordOk && (
          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0">
            <p className="ml-1 px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-green-700 text-center">
              La Contraseña fue enviada a su Email.
            </p>
            <button
              onClick={handleRecoverOk}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue mr-1"
            >
              Ok
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingDoctors;
