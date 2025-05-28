import {useContext } from "react";
import Header from "./components/Header";
import NoteContainer from "./components/NoteContainer";
import FormNote from "./components/FormNote";
import { MainContext } from "./contexts/mainContext";
import Tasks from "./components/Tasks";
import BTN from "./components/BTN";
import { AnimatePresence } from "framer-motion";
import TaskFRM from "./components/TaskFRM";
import ContainerAux from "./components/ContainerAux";
import Settings from "./components/Settings";
function App() {
  const { showFRM, Hmenu, taskShow, containerAux, showTaskFRM, showSettings, folderView } = useContext(MainContext);

  return (
    <>
      {Hmenu && <HeaderSelect />}
      <AnimatePresence>{showSettings && <Settings/>}</AnimatePresence>
      <AnimatePresence>{taskShow && <Tasks />}</AnimatePresence>
      <AnimatePresence>{showFRM && <FormNote />}</AnimatePresence>
      <AnimatePresence>{showTaskFRM && <TaskFRM/>}</AnimatePresence>
      <AnimatePresence>{containerAux && <ContainerAux  title={"Checked Tasks"}/>}</AnimatePresence>
      <AnimatePresence>{folderView && <ContainerAux title={"Folders"}/>}</AnimatePresence>
      <Header />
      <NoteContainer />
      <BTN />
    </>
  );
}

export default App;
