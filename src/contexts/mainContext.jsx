import { createContext, useEffect, useState } from "react";
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
  const [updater, setUpdater] = useState(false);
  const [updatedInFolder, setUpdatedInFolder] = useState(false);
  const [Hmenu, setHmenu] = useState(false);
  const [taskShow, setTaskShow] = useState(false);
  const [showCover, setShowCover] = useState(false);
  const [showFoldersPage, setShowFoldersPage] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notes, setNotes] = useLocalStorage("Notes", Notes);
  const [tasks, setTasks] = useLocalStorage("Tasks", Tasks);

  const showFolderNotes = (btn, id) => {
    setFolderId(id);
    if (btn && !id) {
      setNotesResult(notes);
      setFolderId(id);
      return;
    } else {
      const folderResult = folderController.getFolder(id, folders);
      const folderNotes = !id
        ? notes
        : notes.filter((ele) => folderResult.linkedNotes.includes(ele.id));

      setNotesResult(folderNotes);

      setSearch("");
      return;
    }
  };

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

  const [selectedNote, setSelectedNote] = useState(null);

  const seeNote = (note) => {
    setShowFRM(!showFRM);
    setSelectedNote(note);
  };

  

  const seeTask = (task) => {
    setShowTaskFRM(true);
    setShowCover(true);
    setSelectedTask(task);
  };
  const [folderId, setFolderId] = useState("");

  const updateNote = (obj, id) => {
    notesController.updateNote(obj, id, setNotes, notes);
    if (folderId !== "") {
      setUpdatedInFolder(!updatedInFolder);
      return;
    } else {
      setUpdater(!updater);
    }
    return;
  };

  const updateTask = (obj, id) => {
    tasksController.updateTask(obj, id, setTasks, tasks);
    setUpdater(!updater);
    setSelectedTask(null);
    return;
  };

  const [toSelect, settoSelectNote] = useState([]);

  const deleteNote = (IDnotes) => {
    notesController.deleteNote(IDnotes, notes, setNotes);
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

  const [checkedTasks, setCheckedTask] = useLocalStorage("checkedTasks", "");
  const [containerAux, setContainerAux] = useState(false);

  const checkTask = (task) => {
    tasksController.checkTask(
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

  const deleteAllCheckedTasks = () => {
    setCheckedTask([]);
  };



  const [folders, setFolders] = useLocalStorage("Folders", Folders);
  const [folderView, setFolderView] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const createFolders = (obj) => {
    folderController.createFolder(obj, setFolders, folders);
    return;
  };

  const updateFolders = (obj, id) => {
    setSelectedFolder(null);
    folderController.updateFolder(obj, id, setFolders, folders);
  };

  const deleteFolder = (id) => {
    folderController.deleteFolder(id, setFolderView, setFolders, folders);
    return;
  };

  const insertNoteInFolder = (folderId, noteId) => {
    folderController.insertNoteInFolder(folderId, noteId, setFolders, folders);
    setUpdatedInFolder(!updatedInFolder);
    return;
  };

  const seeFolder = (obj) => {
    setShowTaskFRM(true);
    setShowCover(true);
    setSelectedFolder(obj);
  };

  const [taskResult, setTaskResult] = useState(tasks);
  const [notesResult, setNotesResult] = useState(notes);
  const [search, setSearch] = useState("");
  const searcher = (e) => {
    setSearch(e.target.value);
    setFolderId("");
  };

  useEffect(() => {
    if (!notes || !tasks) return;

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

  useEffect(() => {
    showFolderNotes(false, folderId);
  }, [updatedInFolder, folderId]);

  const [theme, setTheme] = useLocalStorage("theme", "Light");

  const handleOptionTheme = (event) => {
    stylesController.handleColorTheme(event, setTheme);
    return;
  };

  const [fontSize, setFontSize] = useLocalStorage("fontSize", "text-[18px]");
  const [valueFont, setValueFont] = useLocalStorage("valueFont", "Medium");

  const fontSizes = (size) => {
    stylesController.handleFontSize(size, setValueFont, setFontSize);
    return;
  };

  const [designl, setListType] = useLocalStorage(
    "designStyle",
    "grid grid-cols-2 grid-d"
  );
  const [designValue, setValueList] = useLocalStorage("valueList", "Grid");

  const designList = (e) => {
    stylesController.handleDesignList(e, setValueList, setListType);
    return;
  };

  useEffect(() => {
    if (theme === "Dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

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
