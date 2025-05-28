import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { MainContext } from "../contexts/mainContext";
import { motion } from "framer-motion";
import { FaFolder } from "react-icons/fa6";
import Task from "./Task";
import Alerts from "./Alerts";
import Fold from "./Fold";
import Cover from "./cover";

const ContainerAux = ({ title }) => {
  const [confirmAlert, setConfirmAlert] = useState(false);
  const [alertShown, setAlertShown] = useState(false);

  const {
    setContainerAux,
    containerAux,
    deleteAllCheckedTasks,
    folderView,
    folders,
    setShowTaskFRM,
    checkedTasks,
    showCover,
    setShowCover,
    setFolderView,
  } = useContext(MainContext);

  const hideAlert = () => {
    setAlertShown(false);
    setShowCover(false);
  };

  const handleDeleteTasks = (e) => {
    setConfirmAlert(true);
    if (confirmAlert) {
      deleteAllCheckedTasks();
      hideAlert();
    }
  };

  return (
    <>
      {showCover && <Cover />}
      {alertShown && (
        <Alerts
          handle={handleDeleteTasks}
          hide={hideAlert}
          message={"Delete All The Tasks?"}
        />
      )}
      <motion.div
        initial={{ left: "2000px", transitionDelay: { duration: "0.2s" } }}
        animate={{ left: "0px" }}
        exit={{ x: window.innerWidth }}
        className="fixed top-0 left-0 z-[30] h-screen bg-white "
      >
        <div className="flex  bg-white dark:bg-black text-xl items-center w-screen justify-between p-3  absolute z-50 text-[#212121] dark:text-white">
          <button
            onClick={() => {
              folderView
                ? setFolderView(false)
                : setContainerAux(!containerAux);
            }}
          >
            <FaArrowLeft />
          </button>
          <h3>{title}</h3>
          {folderView ? (
            <button
              onClick={(e) => {
                setShowTaskFRM(true);
                setShowCover(!showCover);
              }}
            >
              <FaPlus />
            </button>
          ) : checkedTasks.length < 1 ? (
            ""
          ) : (
            <button
              onClick={() => {
                setAlertShown(!alertShown);
                setShowCover(true);
              }}
            >
              <FaTrash />
            </button>
          )}
        </div>
        <div className="absolute w-screen overflow-x-hidden overflow-y-auto gap-5 p-2 pt-6 left-0 top-0 flex flex-col bg-white dark:bg-black h-screen text-[#1b1a1a] ">
          <br />
          <br />
          {folders.length === 0 && checkedTasks.length === 0 ? (
            <div className="relative md:left-[14%]">
              <div className="w-[72%] max-md:w-[99%] flex flex-col text-[#383838] overflow-x-hidden items-center absolute top-32">
                <FaFolder className="text-[120px]" />
                <h5>nothing here</h5>
              </div>
            </div>
          ) : folderView ? (
            folders.length > 0 ? (
              folders.map((obj) => <Fold key={obj.id} fold={obj} />)
            ) : (
              <div className="relative md:left-[14%]">
                <div className="w-[72%] max-md:w-[99%] flex flex-col text-[#383838] overflow-x-hidden items-center absolute top-32">
                  <FaFolder className="text-[120px]" />
                  <h5>No folders available</h5>
                </div>
              </div>
            )
          ) : checkedTasks.length > 0 ? (
            checkedTasks.map((obj) => <Task key={obj.id} task={obj} />)
          ) : (
            <div className="relative md:left-[14%]">
              <div className="w-[72%] max-md:w-[99%] flex flex-col text-[#383838] overflow-x-hidden items-center absolute top-32">
                <FaFolder className="text-[120px]" />
                <h5>No tasks available</h5>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default ContainerAux;
