import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { MainContext } from "../contexts/mainContext";

const Fold = ({ fold }) => {
  const { deleteFolder, seeFolder } = useContext(MainContext);
  const { name, id } = fold;
  const [showFolder, setShowFolder] = useState(true);
  return (
    <>
      <AnimatePresence>
        {showFolder && (
          <motion.span
            initial={{ opacity: 0, x: "-100vw" }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1 }}
            exit={{ x: "-100vw" }}
            className="flex gap-5 overflow-x-hidden min-h-[55px]  w-[98%] lg:w-[50%] lg:ml-[25%] bg-[#f9f4f4] dark:bg-[#1e1d1d] shadow-[rgba(0,_0,_0,_0.24)_0px_4px_10px] justify-between p-4 rounded-lg"
          >
            <h2 className="w-[90%] h-full dark:text-[#f9f4f4] line-clamp-1">{name}</h2>
            <button>
              <FaPencil
                onClick={(e) => {
                  e.preventDefault();
                  seeFolder(fold)
                }}
                className="text-[#afacac]"
              />
            </button>
            <button>
              <FaTrash
                onClick={(e) => {
                  e.preventDefault();
                  deleteFolder(id)
                  setShowFolder(false);
                }}
                className="text-[#afacac]"
              />
            </button>
          </motion.span>
        )}
      </AnimatePresence>
    </>
  );
};

export default Fold;
