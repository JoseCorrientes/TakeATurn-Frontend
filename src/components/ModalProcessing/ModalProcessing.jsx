import React from 'react'

function ModalProcessing({idMessage}) {
    console.log(idMessage)
    let messageText;
    if (idMessage==1) messageText="Procesando, Por favor espere..."
    if (idMessage==2) messageText="Recuperando Lista de Doctores, Por favor espere..."

    return (
        <div className=" flex flex-col fixed inset-0 h-full bg-black bg-opacity-50 w-full justify-center items-center">
          <div className="my-2 flex flex-col items-center w-11/12 h-auto sm:w-2/3 sm:h-auto sm:border-[4px] rounded-lg border-mayra-dark-blue  bg-black opacity-90">
            <h1 className="text-white font-Saira text-2xl sm:text-3xl  font-light text-center pb-4 pt-5 sm:pb-5 sm:pt-6">
              {messageText}
            </h1>
            
            </div>
        </div>
      );
}

export default ModalProcessing