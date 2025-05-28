import React, { useState, useEffect, useContext } from "react";
import {
  FaArrowLeft,
  FaPalette,
  FaCheck,
  FaTrash,
  FaFolderClosed,
} from "react-icons/fa6";
import { LiaEllipsisVSolid } from "react-icons/lia";
import { MainContext } from "../contexts/mainContext";
import moment from "moment";
import { motion } from "framer-motion";
import Alerts from "./Alerts";
import SmallFolderWidget from "./widgetFolder";

const FormNote = ({ titulo, descripcion, id }) => {
  const {
    handleNote,
    updateNote,
    deleteNote,
    setShowFRM,
    fontSize,
    folderId,
    setUpdatedInFolder,
    showCover,
    setShowCover,
  } = useContext(MainContext);

  const [noteName, setNoteName] = useState(titulo || "");
  const [noteDesc, setNoteDesc] = useState(descripcion || "");
  const [totalLength, setTotalLength] = useState(0);
  const [check, setCheck] = useState(false);
  const [detect, setDetect] = useState(false);
  const [widgetFolder, setWidgetFolder] = useState(false);
  const date = moment().format("LLL");

  //LOGIC TO DELETE ONE SPECIFIC NOTE AND SHOW AN ALERT
  const [alertShown, setAlertShown] = useState(false);

  const hideAlert = () => {
    setAlertShown(false);
    setShowCover(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteNote([id]);
    setShowCover(false);
    setShowFRM(false);
  };

  ///

  useEffect(() => {
    const total = noteName.length + noteDesc.length;
    setTotalLength(total);
  }, [noteName, noteDesc]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      setNoteDesc(value);
    } else if (name === "title") {
      setNoteName(value);
    }
    setCheck(true);
    setDetect(true);
  };

  const handleFRM = (e) => {
    e.preventDefault();
    if (!noteName.length || (noteName === titulo && noteDesc === descripcion)) {
      setShowFRM(false);
      return;
    }
    if(folderId) {
      setUpdatedInFolder(true)
    };
    setShowFRM(false);
    detect && id
      ? updateNote({ noteName, noteDesc, totalLength, date }, id)
      : handleNote({ noteName, noteDesc, totalLength, date });
  };

  const Checkr = () => (
    <div className={`absolute left-[17%] w-[80%] bg-white dark:bg-black text-right p-1 `}>
      <button className="p-1" onClick={handleFRM}>
        <FaCheck />
      </button>
    </div>
  );

  const Cover = () => {
    return (
      <>
        <div onClick={((e) => {setShowCover(false); setWidgetFolder(false)})} className=" fixed top-0 z-[60] left-0 w-screen h-screen bg-[#00000074] "></div>
      </>
    );
  };

  return (
    <>
    {widgetFolder && (<SmallFolderWidget noteID={id} widgetState={setWidgetFolder}/>)}
    {showCover && (<Cover />)}
      {alertShown && showCover &&  (
        <Alerts
          handle={handleDelete}
          hide={hideAlert}
          message={"Delete this note?"}
        />
      )}
      <motion.form
        className="overflow-x-hidden top-0 left-0 fixed z-50 text-gray-800 dark:text-white bg-white dark:bg-black h-screen"
        initial={{ left: "2000px" }}
        animate={{ left: "0px" }}
        exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
        onSubmit={handleFRM}
      >
        <div className="flex w-screen md:justify-end text-2xl p-3">
          {check && <Checkr />}
          <div className={` ${id ? "w-[70%]" : "w-[99%] mr-6"}`}>
            <button type="button" onClick={handleFRM}>
              <FaArrowLeft />
            </button>
          </div>
          <div className={`w-[35%] md:w-[50%] ${id ? "" : "hidden"} md:justify-end p-1 flex gap-6`}>
            <button
              type="button"
              name="Delete"
              onClick={(e) => {setShowCover(true); setAlertShown(true)}}
            >
              <FaTrash />
            </button>
            <button onClick={(e) => {setWidgetFolder(true); setShowCover(true)}} type="button">
              <FaFolderClosed />
            </button>
          </div>
        </div>
        <div className="w-[95%] rounded-xl">
          <input
            name="title"
            onChange={handleInputChange}
            type="text"
            placeholder="TITLE"
            className={`p-2 w-[95%] ${fontSize} m-2 bg-[#f9f4f4] dark:bg-[#2f2e2e] rounded-xl p-2 text-2xl dark:text-white text-gray-800`}
            value={noteName}
          />
        </div>
        <span className="flex gap-3 text-[15px] pl-4 text-gray-800 dark:text-slate-200">
          <h6>{date}</h6> |<h6>{totalLength} caracteres</h6>
        </span>
        <textarea
          name="description"
          cols="30"
          rows="10"
          placeholder="DESCRIPTION"
          className={` bg-[#f9f4f4] dark:bg-[#2f2e2e] rounded-xl p-2 ${fontSize} dark:text-white text-gray-800 mt-7 ml-3 w-[89%] h-screen`}
          value={noteDesc}
          onChange={handleInputChange}
        ></textarea>
      </motion.form>
    </>
  );
};

export default FormNote;
