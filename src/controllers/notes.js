import { v4 as uuidv4 } from "uuid";
import Notes from "../Data/notes.json" assert { type: "json" };

export class notesController {
  static createNote(note, setter, array) {
    const newNote = {
      id: uuidv4(),
      titulo: note.noteName,
      descripcion: note.noteDesc,
      length: note.totalLength || null,
      date: note.date,
    };

    const updatedNotes = [ newNote, ...array];
    setter(updatedNotes);
  }

  static updateNote(note, id, setter, array) {
    if (!note || !id) {
      console.log("Datos inválidos");
      return;
    } else {
      const noteIndex = array.findIndex((note) => note.id === id);
      if (noteIndex === -1) {
        console.log("Nota no encontrada");
        return;
      }

      const updatedNote = {
        ...array[noteIndex],
        titulo: note.noteName,
        descripcion: note.noteDesc,
        lenght: note.totalLength,
        date: note.date,
      };

      const updatedArray = [
        ...array.slice(0, noteIndex),
        updatedNote,
        ...array.slice(noteIndex + 1),
      ];
  
      setter(updatedArray);
    }
  }

   static deleteNote(arrayID, array, setter) {
     const notesToDelete = Array.isArray(arrayID) ? arrayID : [arrayID];

     if (!notesToDelete.length) return Notes; 

     const updatedNotes = array.filter(item => !notesToDelete.includes(item.id));

     array.splice(0, array.length, ...updatedNotes)

    setter(array)
 }

}
