import React, { useContext } from "react";
import { FaGear } from "react-icons/fa6";
import { FaBookBookmark } from "react-icons/fa6";
import { FaSquareCheck } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaFolderClosed } from "react-icons/fa6";
import { MainContext } from "../contexts/mainContext";

const Header = () => {
  const {
    setTaskShow,
    searcher,
    setShowCover,
    setShowSettings,
    fontSize,
    showFolderNotes,
    folders,
    setFolderId,
    setFolderView,
  } = useContext(MainContext);

  return (
    <>
      {/* <SearchContainer/> */}
      <header className="fixed w-screen  flex flex-col bg-white dark:bg-black text-yellow-600 z-20 rounded-[-50px 50px -50px 50px ] p-2">
        <div className="relative w-screen z-50 flex justify-between">
          <div className="btbc w-[60%] lg:w-[60%] flex justify-end gap-16 lg:gap-60  text-2xl p-2">
            <button onClick={() => setTaskShow(false)}>
              <FaBookBookmark />
            </button>
            <button
              onClick={() => {
                setTaskShow(true);
                setShowCover(false);
              }}
            >
              <FaSquareCheck />
            </button>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="text-2xl relative left-0 mr-8"
          >
            <FaGear />
          </button>
        </div>
        <div className="flex items-center justify-center gap-4 my-4">
          <FaMagnifyingGlass className="text-[#908f8f] dark:text-[#302f2f] text-2xl" />
          <input
            type="text"
            id="searchBar"
            placeholder="SEARCH"
            onChange={(e) => searcher(e)}
            className={`w-4/5 rounded-full p-2 ${fontSize} shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] dark:bg-[#302f2f] text-[#7c7c7c]`}
          />
        </div>
        <div className="flex gap-[0.2px] ml-2 overflow-x-auto">
        <button onClick={(e) => {e.preventDefault(); showFolderNotes(true);}} className="p-3 bg-[#d8d3d3] dark:bg-[#302f2f] m-1 rounded-xl text-[#efaa43]">
            ...
          </button>
          <button onClick={(e) => {e.preventDefault(); setFolderView(true);}} className="p-3 bg-[#d8d3d3] dark:bg-[#302f2f] m-1 rounded-xl text-[#efaa43]">
            <FaFolderClosed />
          </button>
          <div className="flex w-auto overflow-x-auto p-1">
            {folders.map((folder) => {
              return (
                <span
                  key={folder.id}
                  onClick={(e) => {showFolderNotes(false, folder.id)}}
                  className="h-auto cursor-pointer  mt-2 m-1 pt-3 pb-4 bg-[#d8d3d3] dark:bg-[#302f2f] w-auto text-[14px] p-[5px] rounded-xl text-[#2b2a2a] dark:text-white  whitespace-nowrap"
                >
                  <h6 className={`mt-[3px] m-auto ${fontSize}`}>
                    {folder.name}
                  </h6>
                </span>
              );
            })}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
