import  { useContext } from "react";
import { MainContext } from "../contexts/mainContext";

const BTN = () => {
  const { seeNote,seeTask, taskShow} = useContext(MainContext);

  return (
    <button
      id="adder"
      name="adder"
      onClick={(e) =>{ taskShow ? seeTask(e) : seeNote(e);}}
      className="p-8 bg-[#e8a71c] fixed z-[25] right-5 bottom-8 text-3xl rounded-full w-11 h-11"
    >
      <div className="font-light text-5xl absolute left-[24%] top-0.5 text-white">
        +
      </div>
    </button>
  );
};

export default BTN;
