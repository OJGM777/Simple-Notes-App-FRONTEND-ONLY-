import { useContext } from "react";
import {  FaPlus } from "react-icons/fa6";
import { MainContext } from "../contexts/mainContext";
import { motion } from "framer-motion";

const SmallFolderWidget = ({ noteID, widgetState }) => {
  const {
    folders,
    setFolderView,
    setShowCover,
    setShowFRM,
    insertNoteInFolder,
  } = useContext(MainContext);

  const handleClose = () => {
    setShowCover(false);
    widgetState(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="fixed  bg-white top-1/4 w-[91%] rounded-lg flex flex-col items-center lg:w-[50%] p-2 left-[4%] lg:left-[25%] gap-5 dark:bg-black shadow-lg  h-[400px] overflow-y-auto  justify-start z-[65]"
      >
        {/* Botón de cerrar */}
        <button
          onClick={handleClose}
          className="self-end mb-2 text-[#212121] dark:text-white"
        ></button>

        <h3 className="text-lg font-semibold mb-4 text-[#212121] dark:text-white">
          My Folders
        </h3>
        {folders.length === 0 ? (
          <div className="flex flex-col items-center">
            <FaPlus
              onClick={() => {
                setShowCover(false);
                setShowFRM(false);
                setFolderView(true);
              }}
              className="text-[80px] text-[#383838]"
            />
            <h5 className="text-[#383838]">nothing here</h5>
          </div>
        ) : (
          <div className="flex flex-col w-full gap-4 items-center">
            {folders.map((folder) => (
              <div
                key={folder.id}
                onClick={(e) => {
                  insertNoteInFolder(folder.id, noteID);
                  handleClose();
                }}
                className={`flex gap-5 cursor-pointer overflow-x-hidden min-h-[55px] ${folder.linkedNotes.includes(noteID) ?  "border-2 border-orange-400" : ""}  w-[98%] md:w-[80%] dark:text-white  bg-[#f9f4f4] dark:bg-[#1e1d1d] shadow-[rgba(0,_0,_0,_0.24)_0px_4px_10px] justify-between p-4 rounded-lg`}
              >
                {folder.name}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
};

export default SmallFolderWidget;
