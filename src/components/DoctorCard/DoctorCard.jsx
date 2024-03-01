import { useDispatch } from "react-redux";
import {
  changeDoctorAdminStatus,
  changeDoctorStatus,
} from "../../actions/actions";
import { encryptData } from "../../tools/crypto";
import { FaTrash } from "react-icons/fa";

function DoctorCard({ data, index, setDoctorToDelete }) {
  const dispatch = useDispatch();

  const handleChangeStatus = () => {
    let sendData = {
      email: data.email,
      active: data.active,
      admin: data.admin,
    };
    let sendEncryptData = encryptData(sendData);
    dispatch(changeDoctorStatus(sendEncryptData));
  };

  const handleAdminOn = () => {
    dispatch(changeDoctorAdminStatus(data));
  };

  let space = " ";

  return (
    <div className="w-full sm:w-5/6 h-auto flex flex-row justify-center items-center text-white rounded-md border-2 border-mayra-light-blue mb-4 font-Saira sm:font-normal sm:text-2xl">
      <div className="w-5/6 flex flex-col justify-center items-star pl-2">
        {!data.active && (
          <div className="flex flex-row w-full justify-between items-center h-[3rem] ">
            <p className="text-red-700 mt-2 font-Saira text-2xl">INACTIVO</p>
            <FaTrash
              onClick={() => setDoctorToDelete(data)}
              className="text-white rounded-lg mr-4 px-2 cursor-pointer h-[3rem] w-[3rem] hover:bg-red-700 hover:border-red-900"
            ></FaTrash>
          </div>
        )}

        {data.active && data.admin && (
          <p className="text-green-700 mt-2 font-Saira text-2xl">ACTIVO</p>
        )}

        {data.active && !data.admin && (
          <div className="flex flex-row w-full items-center h-[3rem]  justify-between">
            <p className="text-green-700 mt-2 font-Saira text-2xl ">ACTIVO</p>
            <FaTrash
              onClick={() => setDoctorToDelete(data)}
              className="text-white rounded-lg  mr-4 px-2 cursor-pointer h-[3rem] w-[3rem] hover:bg-red-700 hover:border-red-900"
            ></FaTrash>
          </div>
        )}

        {data.admin && (
          <p className="text-green-700 mt-2 font-Saira text-2xl">
            ADMINISTRADOR
          </p>
        )}

        <p className="text-gray-400 font-Saira text-2xl">
          Nombre:{" "}
          <span className="text-white ">
            {data.title}
            {space}
            {data.stringName}
          </span>
        </p>
        <p className="text-gray-400 font-Saira text-2xl">
          Email: <span className="text-white ">{data.email}</span>
        </p>
      </div>
      <div className="flex flex-col justify-center items-center w-1/6 h-[180px]  ">
        {data.active && !data.admin && (
          <button
            className="w-full h-1/2 rounded-md hover:h-1/2  hover:cursor-pointer mr-1 my-1 border-2 border-red-500 bg-red-700 bg-opacity-60 text-lg text-white hover:text-white sm:hover:text-2xl hover:bg-opacity-20 hover:border-4 hover:border-red-500 hover:bg-none mt-1 hover: bg-none"
            onClick={handleChangeStatus}
          >
            DESACT
          </button>
        )}

        {data.active && data.admin && (
          <button
            className="w-full h-1/2 rounded-md  border-4 mr-1 my-1  border-mayra-light-blue  font-Saira text-2xl sm:text-2xl text-white font-light opacity-20 hover:cursor-default"
            disabled
          >
            DESACTIVAR
          </button>
        )}
        {!data.active && (
          <button
            onClick={handleChangeStatus}
            className="w-full h-1/2 rounded-md hover:h-1/2  hover:cursor-pointer mr-1 my-1 border-2 border-mayra-push-green-border bg-mayra-push-green bg-opacity-60 text-lg text-white  hover:border-mayra-push-green sm:hover:text-2xl hover:bg-opacity-20 hover:border-4 hover:bg-none mt-1"
          >
            ACTIVAR
          </button>
        )}

        {!data.admin && (
          <button
            onClick={handleAdminOn}
            className="w-full h-1/2 rounded-md  border-2 border-yellow-900 text-white text-lg hover:bg-none hover:h-1/2 hover:border-4 hover:border-yellow-900 hover:cursor-pointer hover:text-white  sm:hover:text-2xl mr-1 my-1 bg-yellow-700 hover:bg-opacity-20"
          >
            ADMIN
          </button>
        )}
        {data.admin && (
          <button
            className="w-full h-1/2 rounded-md  border-4 mr-1 my-1  border-mayra-light-blue  font-Saira text-2xl sm:text-2xl text-white font-light opacity-20 hover:cursor-default"
            disabled
          >
            ADMIN
          </button>
        )}
      </div>
    </div>
  );
}

export default DoctorCard;
