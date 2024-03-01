function ModalInstructions({ setVisibleModalInstructions }) {
  return (
    <div className=" flex flex-col fixed inset-0 h-full bg-black bg-opacity-50 w-full justify-center items-center">
      <div className="my-2 flex flex-col items-center w-11/12 h-auto sm:w-2/3 sm:h-auto sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90">
        <h1 className="text-white font-Saira text-2xl sm:text-3xl  font-light text-center pb-4 pt-5 sm:pb-5 sm:pt-6">
          Instrucciones
        </h1>
        <div className="font-Saira text-lg sm:text-2xl font-light text-white px-4">
          <p>
            1) Elija un Año desplegando el selector &apos;Elija el Año&apos;.
          </p>
          <p>
            2) Elija un Mes despelegando el selector de &apos;Elija el
            Mes&apos;.
          </p>
          <p>3) Se activará el boton &apos;Ver Mes&apos;. Púlselo</p>
          <p>
            4) Verá todos los dias del mes elegido. Los morados ya poseen un
            turno suyo.
          </p>
          <p>
            5) Puede pulsar sobre cualquier dia para agregar o borrar sus
            turnos.
          </p>
          <p>
            6) Si va a Reservar o Cancelar siga las instrucciones que aparezcan.
          </p>
          <p>7) ¡Listo!.</p>
        </div>
        <div className="flex flex-row w-full justify-center items-center px-2 mt-4">
          <button
            onClick={() => setVisibleModalInstructions(false)}
            className="flex flex-row justify-center items-center border-2 border-mayra-light-blue rounded-lg  w-full sm:w-2/3 h-10  hover:text-3xl sm:hover:text-4xl text-2xl sm:text-3xl text-white font-thin font-Saira mb-7 hover:border-4 sm:mr-1 "
          >
            VOLVER
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalInstructions;
