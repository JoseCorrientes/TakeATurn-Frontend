import { useEffect, useState } from "react";
import FondoAzul from "../../assets/FondoAzul.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decryptData, encryptData } from "../../tools/crypto";
import {
  changeDoctorPassword,
  clearErrorRecoveringDoctorPassword,
  clearLoginDoctor,
} from "../../actions/actions";

function DoctorChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const password = useSelector((state) => state.loginDoctorData.password);
  const loginDoctorDataState = useSelector((state) => state.loginDoctorData);
  const errorChangingDoctorPasswordState = useSelector(
    (state) => state.errorChangingDoctorPassword
  );

  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const [errorSamePassword, setErrorSamePassword] = useState(false); //contraseña igual a la anterior
  const [errorLengthPassword, setErrorLengthPassword] = useState(false); //contraseña de longitud menor a 12 en este caso
  const [errorVerifyPassword, setErrorVerifyPassword] = useState(false); //contraseña distinta a la verificacion

  const [errorChangedOk, setErrorChangedOk] = useState(false); //Muestra mensaje ok, cuando se cambio correctamente
  const [errorServer, setErrorServer] = useState(false); //Muestra mensaje error, cuando hubo error de server
  const [errorData, setErrorData] = useState(false); //Muestra error, cuando no se encontro el user o el pass enviado no corresponde con el de la DB

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleVerifyPassword = (e) => {
    setVerifyPassword(e.target.value);
  };

  const handleChange = async () => {
    let user = {
      email: loginDoctorDataState.email,
      password: loginDoctorDataState.password,
      newPassword: encryptData(newPassword),
    };
    setNewPassword("");
    setVerifyPassword("");
    dispatch(changeDoctorPassword(user));
  };

  const handleCancel = () => {
    dispatch(clearErrorRecoveringDoctorPassword());
    navigate("/doctors/menu");
  };

  const handlePasswordChanged = () => {
    dispatch(clearLoginDoctor());
    navigate("/doctors");
  };

  useEffect(() => {
    let flatPassword = decryptData(password);
    if (newPassword == flatPassword) {
      console.log("entro a la igualdad");
      setErrorSamePassword(true);
      setErrorLengthPassword(false);
      setErrorVerifyPassword(false);
    } else setErrorSamePassword(false);

    if (newPassword.length < 12 && newPassword != "")
      setErrorLengthPassword(true);
    else setErrorLengthPassword(false);

    if (newPassword == verifyPassword) setErrorVerifyPassword(false);
    else setErrorVerifyPassword(true);
  }, [newPassword, verifyPassword, password]);

  useEffect(() => {
    if (
      errorChangingDoctorPasswordState != "" &&
      errorChangingDoctorPasswordState.status.status == "Ok"
    )
      setErrorChangedOk(true);

    if (
      errorChangingDoctorPasswordState != "" &&
      errorChangingDoctorPasswordState.status.status == "Error" &&
      (errorChangingDoctorPasswordState.status.message == "Password Invalid" ||
        errorChangingDoctorPasswordState.status.message == "User invalid")
    )
      setErrorData(true);

    if (
      errorChangingDoctorPasswordState != "" &&
      errorChangingDoctorPasswordState.status.status == "Error" &&
      errorChangingDoctorPasswordState.status.message == "Updated Invalid"
    )
      setErrorServer(true);
  }, [errorChangingDoctorPasswordState]);

  return (
    <div
      className="flex flex-row justify-center w-auto h-screen  bg-repeat bg-fixed bg-contain bg-right bg-mayra-dark-blue  "
      style={{ backgroundImage: `url(${FondoAzul})` }}
    >
      <div className="flex flex-col items-center justify-center mt-[1rem] w-11/12 h-5/6 border-[2px] rounded-lg border-mayra-dark-blue  bg-black opacity-80  sm:mt-[4rem] sm:w-3/5 sm:h-3/6 sm:border-[4px]">
        <h1 className="text-white font-Saira text-2xl sm:text-3xl  font-light text-center mb-4 ">
          Cambio de Contraseña
        </h1>

        <input
          type="password"
          className="flex flex-row w-5/6 sm:w-1/3 h-[3rem]  text-center mb-1 "
          placeholder="Contraseña Nueva"
          name="newPassword"
          value={newPassword}
          onChange={(e) => handleNewPassword(e)}
        />
        <input
          type="password"
          className="flex flex-row w-5/6 sm:w-1/3 h-[3rem]  text-center mb-1 "
          placeholder="Reingrese Contraseña Nueva"
          name="verifyPassword"
          value={verifyPassword}
          onChange={(e) => handleVerifyPassword(e)}
        />

        <div className="flex flex-row w-full justify-center items-center px-2">
          {!errorSamePassword &&
            !errorLengthPassword &&
            !errorVerifyPassword &&
            newPassword != "" && (
              <Link
                className="flex flex-row justify-center items-center mt-3 w-2/3 sm:w-1/4 h-[3rem]  text-center border-2 border-mayra-light-blue rounded-lg font-Saira text-2xl sm:text-3xl text-white font-thin hover:bg-black hover:border-4 hover:border-mayra-light-blue sm:hover:text-4xl mr-1"
                onClick={handleChange}
              >
                Cambiar
              </Link>
            )}
          {(errorSamePassword ||
            errorLengthPassword ||
            errorVerifyPassword ||
            newPassword == "") && (
            <button
              className="flex flex-row justify-center items-center mt-3 w-2/3 sm:w-1/4 h-[3rem] border-2 border-mayra-light-blue rounded-lg font-Saira text-2xl sm:text-3xl text-white font-light opacity-20 mr-1"
              disabled
            >
              Cambiar
            </button>
          )}

          {!errorChangedOk &&
            !errorData &&
            !errorServer &&
            !errorLengthPassword &&
            !errorSamePassword &&
            !errorVerifyPassword && (
              <button
                className="flex flex-row justify-center items-center mt-3 w-2/3 sm:w-1/4 h-[3rem]  text-center border-2 border-mayra-light-blue rounded-lg font-Saira text-2xl sm:text-3xl text-white font-thin hover:bg-black hover:border-4 hover:border-mayra-light-blue sm:hover:text-4xl  ml-1"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            )}

          {/* //aca no aparece */}
          {(errorChangedOk ||
            errorData ||
            errorServer ||
            errorLengthPassword ||
            errorSamePassword ||
            errorVerifyPassword) &&
            newPassword.length < 1 &&
            verifyPassword.length < 1 && (
              <button
                className="flex flex-row justify-center items-center mt-3 w-2/3 sm:w-1/4 h-[3rem]  text-center border-2 border-mayra-light-blue rounded-lg font-Saira text-2xl sm:text-3xl text-white font-light opacity-20  ml-1"
                disabled
                // to={'/month'}
              >
                Cancelar
              </button>
            )}
        </div>

        {(newPassword.length > 0 || verifyPassword.length > 0) &&
          errorSamePassword && (
            <p className="mt-4 px-4 mx-1 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
              La nueva contraseña es igual a la anterior.
            </p>
          )}

        {(newPassword.length > 0 || verifyPassword.length > 0) &&
          !errorSamePassword &&
          errorLengthPassword && (
            <p className="mt-4 px-4 mx-1 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
              La contraseña debe tener al menos 12 caracteres.
            </p>
          )}

        {(newPassword.length > 0 || verifyPassword.length > 0) &&
          !errorSamePassword &&
          !errorLengthPassword &&
          errorVerifyPassword && (
            <p className="mt-4 px-4 mx-1 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
              La nueva contraseña no es igual a la verificación.
            </p>
          )}

        {errorChangedOk && (
          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0">
            <p className="ml-1 px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-green-700 text-center">
              La contraseña fué cambiada.
            </p>
            <button
              onClick={handlePasswordChanged}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl  sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue mr-1"
            >
              Ok
            </button>
          </div>
        )}
        {errorData && (
          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0">
            <p className="ml-1 px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
              Contraseña o Usuario Inválido.
            </p>
            <button
              onClick={handlePasswordChanged}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl  sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue mr-1"
            >
              Cancel
            </button>
          </div>
        )}
        {errorServer && (
          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center w-full h-auto sm:h-10 px-2 sm:px-0">
            <p className="ml-1 px-4 sm:mr-4 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
              Error de Servidor.
            </p>
            <button
              onClick={handlePasswordChanged}
              className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg h-10  w-1/2 sm:w-1/4 mt-4 sm:mt-0  font-Saira text-2xl  sm:hover:text-4xl sm:text-3xl text-white font-thin hover:bg-black  hover:border-4 hover:border-mayra-light-blue mr-1"
            >
              Ok
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorChangePassword;
