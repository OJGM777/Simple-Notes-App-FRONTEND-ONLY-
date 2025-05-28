import { useContext, useEffect, useState } from "react";
import TaskRep from "../Data/tasks.json" 
import { MainContext } from "../contexts/mainContext";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import Task from "./Task";
import TaskFRM from "./TaskFRM";
import { motion } from "framer-motion";
import ContainerAux from "./ContainerAux";
import Cover from "./cover";

const Tasks = () => {
  const {
    showTaskFRM,
    showCover,
    searcher,
    taskResult,
    setHmenu,
    checkedTasks,
    containerAux,
    setContainerAux,
    fontSize
  } = useContext(MainContext);

  useEffect(() => {
    setHmenu(false);
  }, []);


  const TaskCheckedContainer = () => {
    return (
      <>
        <motion.span
          onClick={() => {
            setContainerAux(true);
          }}
          className="flex gap-5 cursor-pointer overflow-x-hidden min-h-[58px] text-gray-800 dark:text-white bg-slate-50 dark:bg-[#262525] w-[93%] lg:w-[46%]  shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] justify-between p-4  rounded-lg"
        >
          <h2 className={`"w-[90%] line-clamp-1  ${fontSize}`}>Completed Tasks</h2>
          <h6>{checkedTasks.length}</h6>
        </motion.span>
      </>
    );
  };

  return (
    <>
      {showCover && <Cover />}
      {showTaskFRM && <TaskFRM />}
      {containerAux && (
        <ContainerAux data={checkedTasks} title={"Checked Tasks"} />
      )}
      <motion.div
        initial={{ left: "3333px" }}
        animate={{ left: "0" }}
        exit={{ x: window.innerWidth, transition: { duration: 0.3 } }}
        className="flex flex-col-reverse fixed z-[25] top-[40px] left-0 overflow-x-hidden items-center bg-white dark:bg-black justify-center gap-4 my-4"
      >
        <div className="w-screen flex flex-col bg-white dark:bg-black  h-[87vh] overflow-x-hidden text-[#111] dark:text-slate-50 relative z-10 p-3 gap-5">
          {taskResult.length === 0 || TaskRep.length === 0 ? (
            <div>
              <div className="w-[100%] text-[#171616]  relative left-[30%] top-24 lg:absolute lg:left-[45%] lg:w-[50%]  ">
                <FaTasks className="text-[120px]" />
                <h5 className={`ml-6 ${fontSize}`}>No Tasks</h5>
              </div>
            </div>
          ) : (
            taskResult.map((task) => {
              return <Task key={task.id} task={task} component ={""} />;
            })
          )}
        </div>
        <div className="flex flex-col gap-5 relative  w-screen  justify-center items-center over">
         <div className="flex items-center w-screen ml-10 md:ml-48 gap-3">
         <FaMagnifyingGlass className="text-[#313131] text-2xl mt-3" />
          <input
          id="searchBarTask"
            type="text"
            placeholder="Buscar Tareas"
            className={`w-[80%] rounded-full ${fontSize} p-2 mt-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] dark:bg-[#1f1f1f] text-[#7c7c7c]`}
            onChange={(e) => searcher(e)}
          />
         </div>
           <TaskCheckedContainer />
        </div>
      </motion.div>
    </>
  );
};

export default Tasks;
