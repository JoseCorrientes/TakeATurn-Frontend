import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearLoginDoctorAll } from "../../actions/actions";
import FondoAzul from "../../assets/FondoAzul.jpg";

function DoctorsMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleExit = () => {
    dispatch(clearLoginDoctorAll());
    window.localStorage.clear();
    navigate("/doctors");
  };

  return (
    <div
      className="flex flex-row justify-center w-auto h-screen  bg-fixed bg-contain bg-right bg-mayra-dark-blue  "
      style={{ backgroundImage: `url(${FondoAzul})` }}
    >
      <div className="flex flex-col items-center justify-center mt-[1rem] w-11/12 h-5/6 border-[2px] rounded-lg border-mayra-dark-blue  bg-black opacity-80  sm:mt-[4rem] sm:w-3/5 sm:h-2/3 sm:border-[4px] ">
        <h1 className="text-white font-Saira text-2xl sm:text-3xl w-3/4  font-light  mb-6 ">
          Opciones del Doctor
        </h1>

        <Link
          className="flex flex-column justify-center items-center rounded-lg border-2 border-mayra-light-blue w-3/4 h-[4rem] px-1 mb-1 text-white font-Saira sm:font-normal text-2xl sm:text-2xl hover:bg-black sm:hover:border-4 sm:hover:border-mayra-light-blue sm:hover:text-4xl sm:hover:font-thin hover:border-white"
          to={"/month"}
        >
          Administración de Turnos
        </Link>

        <Link
          to={"/doctors/changePassword"}
          className="flex flex-column justify-center items-center rounded-lg border-2 border-mayra-light-blue w-3/4 h-[4rem] px-1 mb-1 text-white font-Saira sm:font-normal text-2xl sm:text-2xl hover:bg-black sm:hover:border-4 sm:hover:border-mayra-light-blue sm:hover:text-4xl sm:hover:font-thin hover:border-white"
        >
          Cambiar Contraseña
        </Link>

        <button
          className="flex flex-row justify-center items-center w-3/4 sm:w-3/4 sm:h-[4rem] h-1/6  text-center border-2 border-mayra-push-red rounded-lg font-Saira text-2xl sm:font-light text-white  hover:bg-black sm:hover:border-4 sm:hover:border-mayra-push-red sm:hover:text-4xl hover:border-pink-400"
          onClick={() => handleExit()}
        >
          Salir del Sistema
        </button>
      </div>
    </div>
  );
}

export default DoctorsMenu;
