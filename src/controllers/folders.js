import { v4 as uuidv4 } from "uuid";
import folders from "../Data/folders.json" assert { type: "json" };

export class folderController {
  static createFolder(name, setter, array) {
    if (name.name === "") return;

    const newFolder = {
      id: uuidv4(),
      name: name.name,
      linkedNotes: [],
    };

    const updatedFolders = [newFolder, ...array]
    setter(updatedFolders);
    return;
  }

  static updateFolder(obj, id, setter, array) {
    if (!obj || !id) return;
    const FolderIndex = array.findIndex((fold) => fold.id === id);
    if (FolderIndex === -1) return;

    const updatedFolder = {
      ...array[FolderIndex],
      name: obj.name,
    };

    const updatedArray = [
      ...array.slice(0, FolderIndex),
      updatedFolder,
      ...array.slice(FolderIndex + 1),
    ];

    setter(updatedArray);
  }

  static deleteFolder(id, container, setter, array) {
    const updatedFolders = array.filter((ele) => ele.id !== id);
    array.splice(0,  array.length, ...updatedFolders);
    if (array.length < 1) container(false);
    setter(array)
  }

  static insertNoteInFolder(folderID, noteID, setter, array) {
    const selectedFolder = array.find((ele) => ele.id === folderID);
    const FolderIndex = array.findIndex((fold) => fold.id === folderID);
    if (!selectedFolder) return;

    if (selectedFolder.linkedNotes.includes(noteID)) {
      selectedFolder.linkedNotes = selectedFolder.linkedNotes.filter(
        (item) => item !== noteID
      );

      return;
    }

    selectedFolder.linkedNotes.unshift(noteID);

    const updatedArray = [
      ...array.slice(0, FolderIndex ),
      selectedFolder,
      ...array.slice(FolderIndex + 1),
    ];

    setter(updatedArray);
    
  }

  static getFolder(id, array) {
    const selectFolder = array.find((ele) => ele.id === id);
    return selectFolder;
  }
}
