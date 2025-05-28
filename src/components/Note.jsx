import { useContext } from "react";
import { MainContext } from "../contexts/mainContext";
import { motion, AnimatePresence } from "framer-motion";

const Note = ({ note }) => {
  const { titulo, descripcion, date} = note;
  const {
    seeNote,
    setUpdater,
    filtArray,
    fontSize
  } = useContext(MainContext);

  const handleNoteClick = (e) => {
    e.preventDefault();
    seeNote(note);
  };

  return (
    <>
    <AnimatePresence>
    <motion.div
      initial={{scale: 0 }}
      animate={{ opacity: 1, scale: 1, transition: "0.4s" }}
      whileHover={{scale: 1.02}}
      exit={{ scale: 0 }}
      id="note"
      className="relative p-3 cursor-pointer bg-[#f9f4f4] lg:w-[98%] dark:bg-[#2f2e2e] shadow-[rgba(0,_0,_0,_0.24)_0px_4px_10px] text-gray-700 dark:text-[#d8d4d4] w-[100%] rounded-xl flex flex-col max-h-48"
      onClick={(e) => {
        filtArray();
        handleNoteClick(e, note);
        setUpdater(true);
      }}
    >
      <h2 className= {` ${fontSize} overflow-clip line-clamp-1`}>{titulo}</h2>
      <span className=" overflow-clip dark:text-[#d8d4d4] font-light text-gray-700 w-[100%]   line-clamp-3 lg:line-clamp-2 leading-[-px]">
        {descripcion}
      </span>
      <br />
      <span className="absolute bottom-2 text-[14px] line-clamp-1  dark:text-[#d8d4d4] text-gray-700 w-[80%]">
        <h5 className="">{date}</h5>
      </span>
    </motion.div>

    </AnimatePresence>
    </>
  );
};

export default Note;
