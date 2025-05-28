import React, { useContext, useState } from "react";
import { MainContext } from "../contexts/mainContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaRedo } from "react-icons/fa";

const Task = ({ task }) => {
  const {
    setHmenu,
    setUpdater,
    Hmenu,
    seeTask,
    setShowCover,
    showCover,
    toSelect,
    settoSelectNote,
    filtArray,
    checkTask,
    fontSize,
    containerAux,
  } = useContext(MainContext);

  const [showTask, setShowTask] = useState(true);

  const { taskName, id } = task;

  const handleTaskClick = (e) => {
    e.preventDefault();
    if (Hmenu) {
      filtArray();
      setShowCover(false);
      console.log(toSelect);
      settoSelectNote((prevElement) => [...prevElement, id]);
    } else {
      seeTask(task);
      setHmenu(false);
      setShowCover(!showCover);
    }
  };

  const Checker = () => {
    return (
      <motion.input
        initial={{ left: 0 }} // Agrega el delay aquí
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        type="checkbox"
        name=""
        id=""
        className=" cursor-pointer appearance-none w-6 h-6 bg-transparent
        lg:w-9 lg:h-7 
 focus:ring-0 focus:ring-offset-0 checked:bg-[#f4b238]
 border-gray-500 dark:border-gray-100 dark:bg-[#353535] border-2 w-[10%]lg:w-[90%] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] lg:ml-[10%] bg-[#dbd9d9] rounded-lg"
        onChange={() => {
          checkTask(task);
          setShowTask(!showTask);
        }}
      />
    );
  };

  const ReturnTask = () => {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ delay: 0.3, duration: 0.2 }}
        onClick={() => {
          checkTask(task);
          setShowTask(!showTask);
        }}
        className="p-1 cursor-pointer text-gray-800 dark:text-white"
      >
        <FaRedo />
      </motion.button>
    );
  };

  return (
    <>
      <AnimatePresence>
        {showTask && (
          <motion.div
            initial={{ opacity: 0, x: "-100vw" }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            exit={{ x: "-100vw" }}
            className="flex gap-1  cursor-pointer lg:ml-[26vw] "
          >
            <div className="flex p-3  bg-[#eae7e7] dark:bg-[#1e1d1d] rounded-lg">
              {containerAux ? <ReturnTask /> : <Checker />}
            </div>
            <span
              className="flex gap-5 w-[98%] lg:w-[57%] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] bg-[#eae7e7] dark:bg-[#1e1d1d]  p-2 rounded-lg"
              onClick={(e) => {
                handleTaskClick(e);
                setUpdater(true);
              }}
            >
              <h4
                className={`line-clamp-1 ${fontSize} text-gray-800 dark:text-slate-50`}
              >
                {taskName}
              </h4>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Task;
