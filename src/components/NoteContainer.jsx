import { useContext, useEffect } from "react";
import Note from "./Note";
import { MainContext } from "../contexts/mainContext";
import { FaStickyNote } from "react-icons/fa";
import BTN from "./BTN";
import { motion, AnimatePresence } from "framer-motion";

const NoteContainer = () => {
  const { notesResult, setHmenu, designl, valueFont } = useContext(MainContext);

  useEffect(() => {
    setHmenu(false);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ x: window.innerWidth, transition: { duration: 0.3 } }}
        className={`w-[99%] bg-white dark:bg-black text-white relative top-[200px] ${valueFont === "Large" ? "top-[215px]" : ""} z-10 p-3 ${designl} lg:grid-cols-6 order-last  gap-2 ${notesResult.length === 0 ? ("") : ("overflow-x-hidden") }`}
      >
        {notesResult.length === 0 ? (
          <div className="w-[80%] relative text-[#171616] left-[53%] top-24 lg:absolute lg:left-[47%] lg:w-[50%] ">
            <FaStickyNote className="text-[150px] " />
            <h3 className="ml-6 lg:w-[100%] md:ml-9">Nothing</h3>
          </div>
        ) : (
          notesResult.map((note) => {
            return <Note key={note.id} note={note} />;
          })
        )}
        <BTN />
      </motion.div>
    </AnimatePresence>
  );
};

export default NoteContainer;
