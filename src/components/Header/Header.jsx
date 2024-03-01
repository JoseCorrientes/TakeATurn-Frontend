import { useSelector } from "react-redux";
import LogoNegro from "../../assets/logoFondoNegro.jpg";
import { LuMailWarning } from "react-icons/lu";
import Modal from "../Modal/Modal.jsx";
import ModalMailsUnsended from "../ModalMailsUnsended/ModalMailsUnsended.jsx";
import { useState } from "react";
import ModalInstructions from "../ModalInstructions/ModalInstructions.jsx";

function Header() {
  const canceledGlobalStoreState = useSelector(
    (state) => state.canceledGlobalStore
  );
  const showInstructionsState = useSelector((state) => state.showInstructions);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalInstructions, setVisibleModalInstructions] =
    useState(false);

  return (
    <div className="flex flex-row justify-between items-center w-auto h-auto border-2 border-black text-center bg-black text-white">
      <img className="w-1/2 sm:w-1/3" src={LogoNegro}></img>

      {canceledGlobalStoreState != "" && (
        <div className="sm:w-2/3 flex flex-row justify-end items-center ">
          <LuMailWarning
            onClick={() => setVisibleModal(true)}
            className="w-[60px] sm:h-1/3 text-white mr-5 cursor-pointer hover:text-yellow-500"
          />
        </div>
      )}

      {showInstructionsState && (
        <buton
          className="h-1/3 flex flex-row justify-center items-center border-2 border-white cursor-pointer font-Saira hover:text-yellow-500 hover:border-yellow-500 rounded-lg px-5"
          onClick={() => setVisibleModalInstructions(true)}
        >
          {" "}
          INSTRUCCIONES
        </buton>
      )}

      {visibleModal && (
        <Modal>
          <ModalMailsUnsended
            setVisibleModal={setVisibleModal}
          ></ModalMailsUnsended>
        </Modal>
      )}
      {visibleModalInstructions && (
        <Modal>
          <ModalInstructions
            setVisibleModalInstructions={setVisibleModalInstructions}
          ></ModalInstructions>
        </Modal>
      )}
    </div>
  );
}

export default Header;
