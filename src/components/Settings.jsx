import React, { useContext } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { MainContext } from "../contexts/mainContext";
import { motion } from "framer-motion";

const Settings = () => {
  const {
    setShowSettings,
    handleOptionTheme,
    theme,
    fontSize,
    fontSizes,
    valueFont,
    designList,
    designValue,
  } = useContext(MainContext);

  const fontOptions = [
    { id: "1234", label: "Small", value: "Small" },
    { id: "1235", label: "Medium", value: "Medium" },
    { id: "1236", label: "Large", value: "Large" },
  ];

  const DesignOptions = [
    { id: "1237", label: "Grid", value: "Grid" },
    { id: "1238", label: "List", value: "List" },
  ];

  const ViewOptions = [
    { id: "1239", label: "Light", value: "Light" },
    { id: "1232", label: "Dark", value: "Dark" },
  ];

  return (
    <motion.div
      initial={{ left: "2000px" }}
      animate={{ left: "0px" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.3 } }}
      className="fixed top-0 left-0 z-[80] bg-white dark:bg-black flex flex-col gap-2 text-gray-900 dark:text-slate-50 p-2  overflow-x-hidden h-screen "
    >
      <button onClick={() => setShowSettings(false)} className="w-12">
        <FaArrowLeft className="text-2xl" />
      </button>
      <br />
      <h1 className="text-2xl">SETTINGS</h1>

      {/* STYLES SETTINGS */}
      <div className="text-black w-screen flex flex-col mt-6 gap-8">
        <h4 className="text-yellow-600">STYLES</h4>
        <span className="flex  justify-between w-[98%]">
          <h4 className={`text-gray-900 dark:text-white text-lg ${fontSize}`}>
            Font Size
          </h4>
          <select
            onChange={(e) => fontSizes(e)}
            value={valueFont}
            className="w-36 mr-4 bg-gray-200 text-gray-500 dark:text-slate-50 dark:bg-[#181717] p-1"
          >
            {fontOptions.map((opcion) => {
              return (
                <option key={opcion.id} value={opcion.value}>
                  {opcion.value}
                </option>
              );
            })}
          </select>
        </span>
        <span className="flex w-[98%] justify-between">
          <h4 className={`text-gray-900 dark:text-white text-lg ${fontSize}`}>
            Design
          </h4>
          <select
            onChange={(e) => designList(e)}
            value={designValue}
            className="w-36 mr-4 bg-gray-200 text-gray-500 dark:text-slate-50 dark:bg-[#181717] p-1"
          >
            {DesignOptions.map((opcion) => {
              return (
                <option key={opcion.id} value={opcion.value}>
                  {opcion.value}
                </option>
              );
            })}
          </select>
        </span>
        <span className="flex w-[98%] justify-between">
          <h4 className={`text-gray-900 dark:text-white text-lg ${fontSize}`}>
            View
          </h4>
          <select
            onChange={(e) => handleOptionTheme(e)}
            value={theme}
            className="w-36 mr-4 bg-gray-200  text-gray-500 dark:text-slate-50 dark:bg-[#181717] p-1"
          >
            {ViewOptions.map((opcion) => {
              return (
                <option key={opcion.id} value={opcion.value}>
                  {opcion.value}
                </option>
              );
            })}
          </select>
        </span>
      </div>

      {/* INFO */}
      <br />
      <hr className="w-[94%] " />
      <br />

      <div className="w-screen flex flex-col gap-10">
        <h4 className="text-yellow-600">INFORMATION</h4>
        <a>
          <span className={`flex w-[94%] justify-between ${fontSize}`}>
            <h4>Developed By</h4>
            <FaArrowRight className="text-gray-500" />
          </span>
        </a>
        <a>
          <span
            className={`flex  flex-col w-[94%] justify-between ${fontSize}`}
          >
            <h3>what is Notes?</h3>
            <br />
            <p className="text-justify font-thin">
              My notes app is a must-have tool for keep my life organized and
              productive. Designed with decent interface. With the option to
              create multiple Notes and Tasks.
            </p>
          </span>
        </a>
      </div>
    </motion.div>
  );
};

export default Settings;
