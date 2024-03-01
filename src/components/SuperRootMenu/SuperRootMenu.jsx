import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearLoginAdminAll } from "../../actions/actions";
import FondoAzul from "../../assets/FondoAzul.jpg";

function SuperRootMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleExit = () => {
    dispatch(clearLoginAdminAll());
    window.localStorage.clear();
    navigate("/admin");
  };

  return (
    <div
      className="flex flex-row justify-center w-auto h-screen  bg-fixed bg-contain bg-right bg-mayra-dark-blue  "
      style={{ backgroundImage: `url(${FondoAzul})` }}
    >
      <div className="flex flex-col items-center justify-center mt-[1rem] w-11/12 h-5/6 border-[2px] rounded-lg border-mayra-dark-blue  bg-black opacity-80  sm:mt-[4rem] sm:w-3/5 sm:h-4/6 sm:border-[4px] ">
        <h1 className="text-white font-Saira text-2xl sm:text-3xl sm:mt-[1rem] w-3/4 font-light  mb-6 ">
          Opciones del Administrador
        </h1>

        <Link
          to={"/admin/doctorList"}
          className="flex flex-row justify-center items-center rounded-lg border-2 border-mayra-light-blue w-3/4 h-[4rem] px-1 mb-1 text-white text-center font-Saira sm:font-normal text-2xl sm:text-2xl hover:bg-black hover:border-4 hover:border-mayra-light-blue sm:hover:text-4xl sm:hover:font-thin"
        >
          Administración de Doctores
        </Link>

        <button
          className="flex flex-row justify-center items-center w-3/4 sm:w-3/4 sm:h-[4rem] h-1/6  text-center border-2 border-mayra-push-red rounded-lg font-Saira text-2xl sm:text-2xl text-white sm:font-light hover:bg-black hover:border-4 hover:border-mayra-push-red sm:hover:text-4xl "
          onClick={() => handleExit()}
        >
          Salir del Sistema
        </button>
      </div>
    </div>
  );
}

export default SuperRootMenu;
