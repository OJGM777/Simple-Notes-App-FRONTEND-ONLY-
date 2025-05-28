import React, { createContext, useEffect, useState } from "react";
import Notes from "../Data/notes.json";
import Tasks from "../Data/tasks.json";
import Folders from "../Data/folders.json";
import FormNote from "../components/FormNote";
import TaskFRM from "../components/TaskFRM";
import { notesController } from "../controllers/notes";
import { tasksController } from "../controllers/tasks";
import { stylesController } from "../controllers/stylesController";
import { folderController } from "../controllers/folders";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

export const MainContext = createContext();

export const MainContextProvider = (props) => {
  const [showFRM, setShowFRM] = useState(false);
  const [showTaskFRM, setShowTaskFRM] = useState(false);
  const [updater, setUpdater] = useState(false); // KEEPS THE CONTAINER IN ITS CURRENT STATE AFTER A MODIFICATION
  const [updatedInFolder, setUpdatedInFolder] = useState(false); // KEEPS THE CONTAINER IN ITS CURRENT STATE AFTER A MODIFICATION
  const [Hmenu, setHmenu] = useState(false);
  const [taskShow, setTaskShow] = useState(false);
  const [showCover, setShowCover] = useState(false);
  const [showFoldersPage, setShowFoldersPage] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

//FOLDERNOTES

   const [notes, setNotes] = useLocalStorage("Notes", Notes);
   const [tasks, setTasks] = useLocalStorage("Tasks", Tasks);


//

 // FUNCTION THAT USEEFFECT USES TO FETCH ALL THE NOTES IN A FOLDER

 const showFolderNotes = (btn, id) => {
  setFolderId(id);
  if (btn && !id) { // "btn" IS THE BUTTON TO SHOW ALL NOTES, IF PRESSED, IT WILL DISPLAY THEM
    setNotesResult(notes);
    setFolderId(id);  // ASSIGNs THE ID, WHETHER IT'S DEFINED OR NOT
    return;
  } else {
    const folderResult = folderController.getFolder(id, folders);
    // if(folderResult.linkedNotes.length < 1) return;
    const folderNotes = !id
      ? notes
      : notes.filter((ele) => folderResult.linkedNotes.includes(ele.id));

    setNotesResult(folderNotes);

    setSearch(""); // PREVENTS ANY MODIFICATION IN THE VIEW
    return;
  }
};
///

   // THESE FUNCTIONS HANDLE THE RECEIVED DATA AND CREATE A TASK OR NOTE.

  const handleNote = (note) => {
    const newNote = notesController.createNote(note, setNotes, notes);
    showFolderNotes(true);
    if (!newNote) return;
    return;
  };

  const [selectedTask, setSelectedTask] = useState(null);

  const handleTask = (task) => {
    if (!task) return;
    const newTask = tasksController.createTask(task, setTasks, tasks);
    if (!newTask) return;
    setSelectedTask(null);
    return;
  };

   // THIS FUNCTION IS CREATED TO REUSE THE NOTES FORM COMPONENT AND SHOW THE NOTE IN DETAIL OR EDIT IT.


  const [selectedNote, setSelectedNote] = useState(null);

  const seeNote = (note) => {
    setShowFRM(!showFRM);
    setSelectedNote(note);
  };

  // THIS FUNCTION IS CREATED TO REUSE THE TASK FORM COMPONENT AND SHOW THE TASK OR EDIT IT.



  const seeTask = (task) => {
    setShowTaskFRM(true);
    setShowCover(true);
    setSelectedTask(task);
  };
  const [folderId, setFolderId] = useState(""); // TO SEARCH OR KEEP THE NOTES IN THE CONTAINER AND PREVENT THE USEEFFECT FROM TRIGGERING UNNECESSARILY

  const updateNote = (obj, id) => {
    const updatedNote = notesController.updateNote(obj, id, setNotes, notes);
    if (folderId !== "") {
      setUpdatedInFolder(!updatedInFolder);
      return;
    } else {
      setUpdater(!updater);
    }
    return;
  };

  const updateTask = (obj, id) => {
    const updatedTask = tasksController.updateTask(obj, id, setTasks, tasks);
    setUpdater(!updater)
    setSelectedTask(null);
    return;
  };

  const [toSelect, settoSelectNote] = useState([]); // THIS VARIABLE STORES ALL THE IDs OF NOTES TO BE DELETED, WHETHER IT'S ONE OR MULTIPLE.


  const deleteNote = (IDnotes) => {
    const result = notesController.deleteNote(IDnotes, notes, setNotes);
    if (folderId !== "") {
      setUpdatedInFolder(!updatedInFolder);
    } else {
      setUpdater(!updater);
    }
    return;
  };

  const filtArray = () => {
    const filteredArrays = toSelect.filter((value, index, arr) => {
      return arr.indexOf(value) === index;
    });
    settoSelectNote(filteredArrays);
  };

  // TO CHECK THE TASKS OR RETURN THEM TO "TASKS"
  const [checkedTasks, setCheckedTask] = useLocalStorage("checkedTasks", '');
  const [containerAux, setContainerAux] = useState(false);



  const checkTask = (task) => {
    const result = tasksController.checkTask(
      task,
      setCheckedTask,
      checkedTasks,
      tasks,
      setTasks,
      containerAux,
      setContainerAux
    );
    return;
  };
  // THIS LINE DELETES ALL THE CHECKED TASKS.

  const deleteAllCheckedTasks = () => {
    setCheckedTask([]);
  };

  ///

  // FUNCTIONS FOR FOLDERS

  const [folders, setFolders] = useLocalStorage("Folders", Folders);
  const [folderView, setFolderView] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null)

  const createFolders = (obj) => {
    const result = folderController.createFolder(obj, setFolders, folders ); 
    return;
  };

  const updateFolders = (obj, id) => {
    setSelectedFolder(null);
    const result = folderController.updateFolder(obj, id, setFolders, folders)
  }

  const deleteFolder = (id) => {
    const result = folderController.deleteFolder(id, setFolderView, setFolders, folders);
    return;
  };

  const insertNoteInFolder = (folderId, noteId) => {
    const result = folderController.insertNoteInFolder(folderId, noteId, setFolders, folders);
    setUpdatedInFolder(!updatedInFolder);
    return;
  };

  const seeFolder = (obj) => {
    setShowTaskFRM(true);
    setShowCover(true);
    setSelectedFolder(obj);
  }

  const [taskResult, setTaskResult] = useState(tasks);
  const [notesResult, setNotesResult] = useState(notes); 
  // REGISTER EVERY LETTER FROM THE INPUT FIELD
  const [search, setSearch] = useState("");
  const searcher = (e) => {
    setSearch(e.target.value);
    setFolderId(""); // REMOVES ANY OPEN FOLDER OR ID TO PREVENT ERRORS
  };

  // MODIFIES THE CONTAINER TO SHOW NOTES OR TASKS BASED ON USER SEARCH INPUT IN REAL TIME

  useEffect(() => {
    if(!notes || !tasks) return;

    const results = !search
      ? notes
      : notes.filter((data) =>
          data.titulo.toLowerCase().includes(search.toLowerCase())
        );

    const resultsTasks = !search
      ? tasks
      : tasks.filter((task) =>
          task.taskName.toLowerCase().includes(search.toLowerCase())
        );

    setNotesResult(results);
    setTaskResult(resultsTasks);
  }, [search, notes, tasks, updater]);

  ////

  
    // FOR SELECTED FOLDER, IT FETCHES THE CORRESPONDING NOTES DEPENDING ON THEIR "linkedNotes" ARRAY


  useEffect(() => {
    showFolderNotes(false, folderId); //USES THE ID 
  }, [updatedInFolder, folderId]); // IT TRIGGERS IF "updatedInFolder" IS MODIFIED

  //CHANGE COLOR THEMES and STYLES

  const [theme, setTheme] = useLocalStorage("theme", "Light");

  const handleOptionTheme = (event) => {
    const result = stylesController.handleColorTheme(event, setTheme);
    return;
  };

  // MODIFICAR DINAMICAMENTE EL TAMAÑO DE LAS FUENTES

  const [fontSize, setFontSize] = useLocalStorage("fontSize","text-[18px]");
  const [valueFont, setValueFont] = useLocalStorage("valueFont", "Medium");

  const fontSizes = (size) => {
    const result = stylesController.handleFontSize(
      size,
      setValueFont,
      setFontSize
    );
    return;
  };

  const [designl, setListType] = useLocalStorage("designStyle","grid grid-cols-2 grid-d");
  const [designValue, setValueList] = useLocalStorage("valueList", "Grid");

  const designList = (e) => {
    const result = stylesController.handleDesignList(
      e,
      setValueList,
      setListType
    );
    return;
  };

  useEffect(() => {
    if (theme === "Dark") {
      document.documentElement.classList.add("dark");
  } else {
      document.documentElement.classList.remove("dark");
  }
  }, [])

  return (
    <MainContext.Provider
      value={{
        Hmenu,
        checkTask,
        createFolders,
        checkedTasks,
        containerAux,
        deleteAllCheckedTasks,
        deleteFolder,
        deleteNote,
        designList,
        designValue,
        designl,
        filtArray,
        folders,
        setUpdatedInFolder,
        folderView,
        folderId,
        setFolderView,
        fontSize,
        fontSizes,
        handleNote,
        handleOptionTheme,
        handleTask,
        insertNoteInFolder,
        notesResult,
        searcher,
        seeNote,
        seeTask,
        selectedFolder,
        setContainerAux,
        setHmenu,
        setShowCover,
        setShowFoldersPage,
        setShowFRM,
        setShowSettings,
        setShowTaskFRM,
        setTaskShow,
        setSelectedFolder,
        setUpdater,
        settoSelectNote,
        showFolderNotes,
        seeFolder,
        setFolderId,
        showCover,
        showFoldersPage,
        showFRM,
        showSettings,
        showTaskFRM,
        taskResult,
        tasks,
        taskShow,
        theme,
        toSelect,
        updateNote,
        updatedInFolder,
        updateTask,
        updateFolders,
        updater,
        valueFont,
      }}
    >
      {props.children}
      {showFRM && selectedNote && (
        <FormNote
          titulo={selectedNote.titulo}
          descripcion={selectedNote.descripcion}
          id={selectedNote.id}
        />
      )}

      {showTaskFRM && (selectedFolder || selectedTask) && (
        <TaskFRM
          titulo={selectedTask?.taskName || selectedFolder?.name}
          id={selectedTask?.id || selectedFolder?.id}
          state={selectedTask?.state || ""}
        />
      )}
    </MainContext.Provider>
  );
};
