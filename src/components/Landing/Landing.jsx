import { useEffect, useState } from "react";
import FondoAzul from "../../assets/FondoAzul.jpg";
import { fillClientData, recoverDoctorsList } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import ModalProcessing from "../ModalProcessing/ModalProcessing";

function Landing() {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [doctor, setDoctor] = useState(0);
  const [emailValid, setEmailValid] = useState(false);
  const [userValid, setUserValid] = useState(false);
  const [inProcess, setInProcess] = useState(false);

  let doctorsListError = useSelector((state) => state.doctorsListError);
  let doctorsList = useSelector((state) => state.doctorsList);

  //Pongo para el cartel de recuperando lista de doctores
  useEffect(()=>{
        setInProcess(false);
  },[doctorsListError])  




  

  useEffect(() => {
    //Le envio true or false que es el estado de active de los doctores buscados
    setInProcess(true)
    dispatch(recoverDoctorsList(true));
  }, []);

  const handleChangeUser = (e) => {
    setUser(e.target.value);
    if (e.target.value.length > 10) setUserValid(true);
    else setUserValid(false);
  };
  const handleChangeDoctor = (e) => {
    setDoctor(e.target.value);
  };
  const handleChangeEmail = (e) => {
    let regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    setEmail(e.target.value);
    if (regex.test(e.target.value)) setEmailValid(true);
    else setEmailValid(false);
  };

  const handleSearch = () => {
    let doctorData = doctorsList.filter((x) => x.id == doctor);
    let data = {
      user,
      email,
      doctor,
      admin: false,
      title: doctorData[0].title,
      stringName: doctorData[0].stringName,
    };
    dispatch(fillClientData(data));
  };

  return (
    <div
      className="flex flex-row justify-center w-auto h-screen  bg-repeat bg-fixed bg-contain bg-right bg-mayra-dark-blue  "
      // className="flex flex-row justify-center w-auto h-screen  bg-no-repeat bg-fixed bg-contain bg-right bg-mayra-dark-blue  "
      style={{ backgroundImage: `url(${FondoAzul})` }}
    >
      {/* <div
        className=' flex flex-col bg-black bg-opacity-50 w-full justify-center items-center'
        > */}
      <div className="flex flex-col items-center justify-center mt-[1rem] w-11/12 h-5/6 border-[2px] rounded-lg border-mayra-dark-blue  bg-black opacity-80  sm:mt-[4rem] sm:w-3/5 sm:h-4/6 sm:border-[4px]">
        <h1 className="mt-[2rem] text-white w-1/3 font-Saira text-2xl sm:text-3xl  font-light mb-4 ">
          Buscador de Turnos
        </h1>
        <input
          className="w-3/4 h-[2rem] px-1 mb-4 sm:w-1/3  sm:h-[3rem] sm:px-2 sm:mb-1  text-center"
          placeholder="Ingrese su @mail"
          name={email}
          value={email}
          onChange={(e) => handleChangeEmail(e)}
        />
        <input
          className="w-3/4 h-[2rem] px-1 sm:w-1/3 mb-4 sm:h-[3rem] sm:px-2 sm:mb-1  text-center"
          placeholder="Ingrese su Nombre y Apellido"
          name="user"
          value={user}
          onChange={(e) => handleChangeUser(e)}
        />

        {doctorsList && (
          <select
            className="static flex flex-row justify-center  w-3/4 h-[2rem] px-1 sm:w-1/3 mb-4 sm:h-[3rem] sm:px-2 sm:mb-6  text-center"
            //className='w-1/3 h-1/6 text-center'
            onChange={(e) => handleChangeDoctor(e)}
          >
            <option className="bg-white text-gray-400 text-center" value={0}>
              Seleccione Doctor
            </option>

            {doctorsList.map((item) => (
              <option
                className="bg-white text-black text-center"
                key={item.id}
                value={item.id}
              >
                {item.stringName}
              </option>
            ))}
          </select>
        )}

        {emailValid && userValid && doctor != 0 && !doctorsListError && (
          <Link
            className="flex flex-row justify-center items-center mt-3 w-2/3 sm:w-1/6 h-[3rem]  text-center border-2 border-mayra-light-blue rounded-lg font-Saira text-2xl sm:text-3xl text-white font-thin hover:bg-black hover:border-4 hover:border-mayra-light-blue sm:hover:text-4xl "
            // className='flex flex-row justify-center items-center mt-3 w-1/6 h-1/6  text-center border-2 border-mayra-light-blue rounded-lg font-Saira text-2xl sm:text-3xl text-white font-thin hover:bg-black hover:border-4 hover:border-mayra-light-blue hover:text-4xl '
            onClick={handleSearch}
            to={"/month"}
          >
            Buscar
          </Link>
        )}
        {(!emailValid || !userValid || doctor == 0) && (
          <button
            className="flex flex-row justify-center items-center mt-3 w-2/3 sm:w-1/6 h-[3rem] border-2 border-mayra-light-blue rounded-lg font-Saira text-2xl sm:text-3xl text-white font-light opacity-20"
            // className='flex flex-row justify-center items-center mt-3 w-1/6 h-1/6 border-2 border-mayra-light-blue rounded-lg font-Saira text-2xl sm:text-3xl text-white font-light opacity-20'
            disabled
          >
            Buscar
          </button>
        )}
        {doctorsListError && (
          <p className="mt-4 px-4 sm: mx-2 font-Saira text-3xl text-white font-thin bg-red-600 text-center">
            No hay médicos cargados. Avise a su dentista
          </p>
        )}
      </div>

      {inProcess && (
        <Modal>
          <ModalProcessing idMessage={2} />
        </Modal>
      )}      


    </div>
  );
}

export default Landing;

