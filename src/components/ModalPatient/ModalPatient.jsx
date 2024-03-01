import { useSelector } from "react-redux";

function ModalPatient({ handleHidePatient }) {
  let patientDataState = useSelector((state) => state.patientData);
  let typeTreatment;

  switch (patientDataState.typeTreatment) {
    case "urgencia": {
      typeTreatment = "URGENCIA";
      break;
    }
    case "extraccion": {
      typeTreatment = "EXTRACCION";
      break;
    }
    case "conducto": {
      typeTreatment = "TRATAMIENTO DE CONDUCTO";
      break;
    }
    case "limpieza": {
      typeTreatment = "LIMPIEZA";
      break;
    }
    default: {
      typeTreatment = "CONSULTA";
      break;
    }
  }

  return (
    <div className=" flex flex-col fixed inset-0 h-full bg-black bg-opacity-50 w-full justify-center items-center">
      <div className="flex flex-col items-center justify-center w-11/12 h-auto py-5 sm:py-0 border-[2px]  sm:px-0 sm:w-2/3 sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90 ">
        <h1 className="text-white font-Saira text-2xl sm:text-3xl  font-light text-center pb-4 pt-5 sm:pb-5 sm:pt-6">
          Detalle del Paciente
        </h1>

        <div className="w-full flex flex-col justify-center items-center font-Saira sm:font-normal sm:text-2xl">
          <p className="text-gray-400">
            Turno Día:{" "}
            <span className="text-white ">
              {patientDataState.day}/{patientDataState.month}/
              {patientDataState.year}
            </span>
          </p>

          <p className="text-gray-400">
            Turno Horario:
            <span className="text-white">
              {" "}
              {patientDataState.turnName.slice(0, 2)}:
              {patientDataState.turnName.slice(2)}
            </span>
          </p>

          {typeTreatment == "URGENCIA" && (
            <p className="text-gray-400">
              Tipo de Tratamiento:{" "}
              <span className="text-red-400">{typeTreatment}</span>
            </p>
          )}
          {typeTreatment != "URGENCIA" && (
            <p className="text-gray-400">
              Tipo de Tratamiento:{" "}
              <span className="text-white">{typeTreatment}</span>
            </p>
          )}

          {patientDataState.idPatient && (
            <p className="text-gray-400">
              Nombre del Paciente:{" "}
              <span className="text-white">{patientDataState.idPatient}</span>
            </p>
          )}

          {patientDataState.idpatient && (
            <p className="text-gray-400">
              Nombre del Paciente:{" "}
              <span className="text-white">{patientDataState.idpatient}</span>
            </p>
          )}

          <p className="text-gray-400">
            Correo Electrónico:{" "}
            <span className="text-white">{patientDataState.email}</span>
          </p>

          <p className="text-gray-400">
            Teléfono:{" "}
            <span className="text-white">{patientDataState.phone}</span>
          </p>

          <p className="text-gray-400">
            Obra Social:{" "}
            <span className="text-white">
              {patientDataState.ealthInsurance}
            </span>
          </p>

          {patientDataState.comment != "" && (
            <div className="p-4 mt-4 w-4/6 h-auto border-2 rounded-lg border-mayra-light-blue text-white">
              {patientDataState.comment}
            </div>
          )}
        </div>

        <div className="flex flex-row w-full justify-center items-center px-2">
          <button
            className=" mt-6 flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg  w-1/3 h-10 sm:hover:text-4xl text-2xl sm:text-3xl text-white font-thin font-Saira mb-7 hover:border-4 sm:mr-1 "
            onClick={handleHidePatient}
          >
            VOLVER
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalPatient;
