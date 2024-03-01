import { useDispatch, useSelector } from "react-redux";
import EmailUnsendedCard from "../EmailUnsendedCard/EmailUnsendedCard";
import { setCanceledGlobalStore } from "../../actions/actions";
import { useState } from "react";

function ModalMailsUnsended({ setVisibleModal }) {
  const dispatch = useDispatch();
  const canceledGlobalStore = useSelector((state) => state.canceledGlobalStore);
  const [arrayUnsendedEmail, setArrayUnsendedEmail] =
    useState(canceledGlobalStore);

  const handleDeleteUnsendedEmail = (e) => {
    canceledGlobalStore.splice(e, 1);
    dispatch(setCanceledGlobalStore(canceledGlobalStore));
    setVisibleModal(false);
  };

  const handleDeleteAllUnsendedEmail = () => {
    dispatch(setCanceledGlobalStore([]));
    setVisibleModal(false);
  };

  return (
    <div className=" flex flex-col fixed inset-0 h-full bg-black bg-opacity-50 w-full justify-center items-center">
      <div className="flex flex-col items-center w-11/12 h-full border-[2px] sm:w-2/3 sm:h-5/6 sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90">
        <h1 className="text-white font-Saira text-2xl sm:text-3xl  font-light text-center pb-4 pt-5 sm:pb-5 sm:pt-6">
          Pacientes pendientes de aviso
        </h1>

        <div className="w-full sm:w-3/4 sm:h-full mb-5 sm:mb-10 overflow-y-auto p-1">
          {arrayUnsendedEmail != "" &&
            arrayUnsendedEmail.map((item, index) => (
              <EmailUnsendedCard
                key={index}
                item={item}
                index={index}
                handleDeleteUnsendedEmail={handleDeleteUnsendedEmail}
              />
            ))}
        </div>

        <div className="flex flex-row w-full justify-center items-center px-2">
          <button
            onClick={() => setVisibleModal(false)}
            className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg  w-full sm:w-2/3 h-10   sm:hover:text-4xl text-2xl sm:text-3xl text-white font-thin font-Saira mb-7 hover:border-4 sm:mr-1 "
          >
            VOLVER
          </button>
          <button
            onClick={handleDeleteAllUnsendedEmail}
            className="flex flex-row justify-center items-center border-2 border-red-500  rounded-lg w-full sm:w-2/3 h-10   sm:hover:text-4xl text-2xl sm:text-3xl  font-thin font-Saira mb-7 bg-red-700 bg-opacity-60 text-white  hover:bg-opacity-20 hover:border-4 hover:border-red-500 sm:ml-1"
          >
            BORRAR TODOS
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalMailsUnsended;
