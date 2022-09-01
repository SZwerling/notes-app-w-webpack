import { initializeEditPage, generateLastEdited } from "./views";
import { updateNote, removeNote } from "./notes";
import './styles/styles.min.css'

const titleInput = document.querySelector("#note-title");
const bodyInput = document.querySelector("#note-body");
const removeButton = document.querySelector("#remove");
const lastEditedEl = document.querySelector("#last-edited");
const noteId = location.hash.substring(1);

initializeEditPage(noteId);

titleInput.addEventListener("input", (e) => {
   const note = updateNote(noteId, {
      title: e.target.value,
   });
   lastEditedEl.textContent = generateLastEdited(note.updatedAt); 
});

bodyInput.addEventListener("input", (e) => {
   const note = updateNote(noteId, {
      body: e.target.value,
   });
   lastEditedEl.textContent = generateLastEdited(note.updatedAt); 
});

removeButton.addEventListener("click", (e) => {
   removeNote(noteId);
   location.assign("./index.html");
});

window.addEventListener("storage", (e) => {
   // event storage fires when local storage is updated
   if (e.key === "notes") {
      initializeEditPage(noteId);
   }
});
