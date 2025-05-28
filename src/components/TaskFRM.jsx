import  { useState, useContext, useEffect } from "react";
import { MainContext } from "../contexts/mainContext";
import { motion } from "framer-motion";

const TaskFRM = ({ titulo, id, state }) => {
  const { setShowTaskFRM, handleTask, updateTask, setShowCover, folderView, createFolders, updateFolders, selectedFolder,} =
    useContext(MainContext);

  const [titleOBJ, setTitleTask] = useState("");
  const [detect, setDetect] = useState(false);

  useEffect(() => {
    setTitleTask(titulo || "");
  }, []);

  const handleFRM = (obj) => {
    setShowTaskFRM(false);
    setShowCover(false);
    if(obj.name === "" || obj.title === "") return;
    if (folderView) {
     selectedFolder ? updateFolders(obj, id) : createFolders(obj);
      return;
    } else {
      const isTitleEmpty = obj.title.length < 1;
      const isTitleSame = obj.title === titulo;

      if (isTitleEmpty || isTitleSame) return;

      if (detect && id) {
        updateTask(obj, id);
        setTitleTask("");
      } else {
        handleTask(obj);
        setTitleTask("");

      }
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      id="TaskAndFolderFRM"
      className="absolute z-[100] top-1/3 dark:bg-[#1c1b1b] bg-[#dad8d8] w-[91%] rounded-lg flex flex-col items-center lg:w-[50%] p-2 left-[4%] lg:left-[25%] gap-5"
    >
      <div className="w-[90%] flex items-center">
        <input
          value={titleOBJ}
          className="w-screen p-2 rounded-lg dark:bg-[#2a2a2a] text-[18px] text-gray-900 dark:text-white bg-[#d0cbcb]"
          id="sendOBJ"
          type="text"
          placeholder="ingresa el nombre"
          onChange={(e) => {
            setTitleTask(e.target.value);
            setDetect(true);
          }}
        />
      </div>
      <div className="w-[90%] text-center">
        <button
          className="text-[#626060] relative font-bold text-xl "
          onClick={(e) => {
            e.preventDefault();
            folderView ? handleFRM({name: titleOBJ}) : handleFRM({ state, title: titleOBJ });
          }}
        >
          Done
        </button>
      </div>
    </motion.form>
  );
};

export default TaskFRM;
