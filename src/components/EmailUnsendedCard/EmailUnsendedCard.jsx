import { FaTrash } from "react-icons/fa";

function EmailUnsendedCard({ item, index, handleDeleteUnsendedEmail }) {
  return (
    <div
      //key={item.index}
      className="h-auto flex flex-row justify-center items-center text-white rounded-md  w-full border-2 border-mayra-light-blue mb-4 font-Saira  text-2xl sm:font-normal sm:text-3xl"
    >
      <div className="w-5/6 flex flex-col justify-center items-star pl-2 ">
        {item.status == "canceled" && (
          <p className="text-red-700 mt-2">CANCELADO</p>
        )}
        {item.status == "busy" && <p className="text-green-700 mt-2">CREADO</p>}
        <p className="text-gray-400">
          Turno Horario:{" "}
          <span className="text-white ">
            {item.day}/{item.month}/{item.year}
          </span>
        </p>

        <p className="text-gray-400">
          Turno Horario:
          <span className="text-white">
            {" "}
            {item.turnName.slice(0, 2)}:{item.turnName.slice(2)}
          </span>
        </p>

        {item.idPatient && (
          <p className="text-gray-400">
            Nombre del Paciente:{" "}
            <span className="text-white">{item.idPatient}</span>
          </p>
        )}

        {item.idpatient && (
          <p className="text-gray-400">
            Nombre del Paciente:{" "}
            <span className="text-white">{item.idpatient}</span>
          </p>
        )}

        <p className="text-gray-400">
          Correo Electrónico: <span className="text-white">{item.email}</span>
        </p>

        <p className="text-gray-400 mb-2">
          Teléfono: <span className="text-blue-400">{item.phone}</span>
        </p>
      </div>
      <div
        onClick={() => handleDeleteUnsendedEmail(index)}
        className="flex flex-row justify-center items-center w-1/6 h-full rounded-md mr-2 text-mayra-push-red  hover:bg-none hover:my-2 hover:h-[180px] hover:border-4 hover:border-mayra-light-blue hover:cursor-pointer hover:text-red-400"
      >
        <FaTrash className="text-4xl" />
      </div>
    </div>
  );
}

export default EmailUnsendedCard;
