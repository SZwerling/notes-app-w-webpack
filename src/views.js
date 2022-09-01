import { getFilters } from "./filters";
import { sortNotes, getNotes } from "./notes";

// Generate the DOM structure for a note
const generateNoteDom = (note) => {
   const noteElement = document.createElement("a"); //we create an 'a' element
   const textElement = document.createElement("p");
   const statusEl = document.createElement("p");

   // set note title text
   if (note.title.length > 0) {
      textElement.textContent = note.title; //give it the text from the title prop
   } else {
      textElement.textContent = "Unnamed note.";
   }

   textElement.classList.add("list-item__title");
   noteElement.appendChild(textElement);

   // set up the link
   noteElement.setAttribute("href", `/edit.html#${note.id}`);
   noteElement.classList.add("list-item");
   // set up status message
   statusEl.textContent = generateLastEdited(note.updatedAt);
   statusEl.classList.add("list-item__subtitle");
   noteElement.appendChild(statusEl);

   return noteElement;
};

// Render app notes
const renderNotes = () => {
   const notesEl = document.querySelector("#notes");
   const filters = getFilters();

   const notesObj = sortNotes(filters.sortBy); // using dropdown sort, eg last edited etc
   //takes arr of objects and a 'filters' object
   const filteredNotes = notesObj.filter(
      (
         note //compares arr obj 'title' property with filters obj 'searchText' prop
      ) => note.title.toLowerCase().includes(filters.searchText.toLowerCase())
   );

   notesEl.innerHTML = ""; //clears all text from div w id 'notes'

   if (filteredNotes.length > 0) {
      filteredNotes.forEach((item) => {
         const noteP = generateNoteDom(item); //creates p element for each note
         notesEl.appendChild(noteP);
      });
   } else {
      const emptyMessage = document.createElement("p");
      emptyMessage.textContent = "No notes to show";
      emptyMessage.classList.add("empty-message"); // add css class to element created in js
      notesEl.appendChild(emptyMessage);
   }
};

const initializeEditPage = (noteId) => {
   const lastEditedEl = document.querySelector("#last-edited");
   const titleInput = document.querySelector("#note-title");
   const bodyInput = document.querySelector("#note-body");

   const notes = getNotes();
   const note = notes.find((note) => {
      return note.id === noteId;
   });

   if (!note) {
      location.assign("./index.html");
   }

   lastEditedEl.textContent = generateLastEdited(note.updatedAt); //generates message using timestamp
   titleInput.value = note.title;
   bodyInput.value = note.body;
};

// Generate the 'last edited message'
const generateLastEdited = (timestamp) =>
   `Last Edited: ${moment(timestamp).fromNow()}`;

export { generateLastEdited, renderNotes, generateNoteDom, initializeEditPage };
