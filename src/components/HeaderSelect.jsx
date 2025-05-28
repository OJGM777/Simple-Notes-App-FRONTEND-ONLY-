import  { useContext, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { FaLock } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { MainContext } from "../contexts/mainContext";
import { motion } from "framer-motion";
import Alert from "./Alerts";

const HeaderSelect = () => {
  const {
    Hmenu,
    setHmenu,
    toSelect,
    settoSelectNote,
    deleteNote,
    setShowCover,
  } = useContext(MainContext);

  const [confirmAlert, setConfirmAlert] = useState(false);
  const [alertShown, setAlertShown] = useState(false);

  const showAlert = () => {
    setAlertShown(true);
    setShowCover(true);
  };

  const hideAlert = () => {
    setAlertShown(false);
    setShowCover(false);
  };

  const handleDeleteNote = () => {
    setConfirmAlert(true);
    if (confirmAlert) {
      deleteNote(toSelect);
      settoSelectNote([]);
      hideAlert();
    }
  };




  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        className="bg-gray-300 dark:bg-[#0f0f0f] h-14  fixed z-30 w-screen flex object-center p-2 justify-between text-[20px] text-gray-800 dark:text-white"
      >
        <button>
          <FaTimes
            onClick={() => {
              setHmenu(!Hmenu);
              settoSelectNote([]);
            }}
          />
        </button>
        <h3>{toSelect.length} seleccionados</h3>
        <button>
          <RiCheckboxCircleLine className="text-[25px] font-bold" />
        </button>
      </motion.header>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        className="p-2 h-[10%] dark:bg-[#0f0f0f] bg-gray-300 fixed z-30 w-screen bottom-0 dark:text-white text-gray-800 flex justify-between"
      >
        <div className="w-screen relative m-auto flex gap-3 ">
          <div className="flex flex-col m-auto ">
            <button className="text-[19px] m-auto">
              <FaLock />
            </button>
            <h6 className="text-[12px]">Ocultar</h6>
          </div>
          <div className="flex flex-col m-auto ">
            <button className="text-[19px] m-auto">
              <FaUpload />
            </button>
            <h6 className="text-[12px]">Anclar</h6>
          </div>
          <div className="flex flex-col m-auto ">
            <button onClick={(e) => {handleToAddNoteToFolder(e)}} className="text-[19px] m-auto">
              <FaArrowRight />
            </button>
            <h6 className="text-[12px]">Mover</h6>
          </div>
          <div className="flex flex-col m-auto ">
            <button onClick={showAlert} className="text-[19px] m-auto">
              <FaTrash />
            </button>
            <h6 className="text-[12px]">Eliminar</h6>
          </div>
        </div>
      </motion.footer>
      {alertShown && <Alert handle ={handleDeleteNote} hide={hideAlert} message={"eliminar " + toSelect.length + " elementos?"} />}
    </>
  );
};

export default HeaderSelect;
