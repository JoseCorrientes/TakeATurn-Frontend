import { useEffect, useState } from "react";
import FondoAzul from "../../assets/FondoAzul.jpg";
// import { fillClientData } from '../../actions/actions';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { encryptData } from "../../tools/crypto";
import { useNavigate } from "react-router-dom";
import {
  clearLoginAdminError,
  sendDataLoginAdmin,
} from "../../actions/actions";
import Modal from "../Modal/Modal";
import ModalProcessing from "../ModalProcessing/ModalProcessing";

function LandingAdmin() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [visible, setVisible] = useState(true);
  const [visibleMessage, setVisibleMessage] = useState(false);
  const [inProcess, setInProcess] = useState(false);

  const loginAdminError = useSelector((state) => state.loginAdminError);
  const loginAdminValid = useSelector((state) => state.loginAdminValid);

  const navigate = useNavigate();

  //useEffect que borra los mensajes de error que aparecen
  useEffect(() => {
    setInProcess(false);

    setVisibleMessage(true);
    if (loginAdminError == 2 || loginAdminError == 3) {
      setTimeout(() => {
        setEmail("");
        setPassword("");

        setEmailValid(false);
        setPasswordValid(false);

        setVisibleMessage(false);
        dispatch(clearLoginAdminError());
      }, 2000);
    }
  }, [loginAdminError]);

  //useffect que me envia a la pagina de menu de admin si es loginadminvalid==true
  useEffect(() => {
    if (loginAdminValid) navigate("/admin/menu");
  }, [loginAdminValid]);

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
    setInProcess(true);
    dispatch(sendDataLoginAdmin(valor));
  };

  let fieldType = visible ? "text" : "password";

  return (
    <div
      className="flex flex-row justify-center w-auto h-screen  bg-repeat bg-fixed bg-contain bg-right bg-mayra-dark-blue  "
      style={{ backgroundImage: `url(${FondoAzul})` }}
    >
      <div className="flex flex-col items-center justify-center mt-[1rem] w-11/12 h-5/6 border-[2px] rounded-lg border-mayra-dark-blue  bg-black opacity-80  sm:mt-[4rem] sm:w-3/5 sm:h-4/6 sm:border-[4px]">
        <h1 className="text-white font-Saira text-2xl sm:text-3xl  font-light text-center mb-4 w-1/3">
          Login Administrador Sistema
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
            placeholder="Ingrese su Password"
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
            // to={'/month'}
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
        {visibleMessage && loginAdminError == "2" && (
          <p className="mt-4 px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
            Usuario o Contraseña Invalidas.
          </p>
        )}
        {visibleMessage && loginAdminError == "3" && (
          <p className="mt-4 px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
            Error de Servidor. Reintente.
          </p>
        )}
      </div>

      {inProcess && (
        <Modal>
          <ModalProcessing idMessage={1} />
        </Modal>
      )}
    </div>
  );
}

export default LandingAdmin;
