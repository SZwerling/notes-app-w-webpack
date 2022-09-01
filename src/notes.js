let notes = [];

// Read existing notes from local storage
const loadNotes = () => {
   const notesJSON = localStorage.getItem("notes");
   // try/catch allows the program to continue if JSON data throws an error eg is not JSON
   try {
      return notesJSON ? JSON.parse(notesJSON) : [];
   } catch (e) {
      return [];
   }
};

// Save notes to local storage
const saveNotes = () => {
   localStorage.setItem("notes", JSON.stringify(notes));
};

// EXPOSE NOTES FROM MODULE
const getNotes = () => notes;

const createNote = () => {
   const timestamp = moment().valueOf();
   const newId = uuidv4();

   notes.push({
      id: newId,
      createdAt: timestamp,
      updatedAt: timestamp,
      title: "",
      body: "",
   });
   saveNotes();

   return newId
};

// Remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex > -1) {
       notes.splice(noteIndex, 1);
       saveNotes()
    }
 };

 //sort notes via dropdown
const sortNotes = (sortBy) => {
    if (sortBy === "byEdited") {
       return notes.sort((a, b) => {
          if (a.updatedAt > b.updatedAt) {
             return -1;
          } else if (a.updatedAt < b.updatedAt) {
             return 1;
          } else {
             return 0;
          }
       });
    } else if (sortBy === "byCreated") {
       // By first created
       return notes.sort((a, b) => {
          if (a.createdAt < b.createdAt) {
             return -1;
          } else if (a.createdAt > b.createdAt) {
             return 1;
          } else {
             return 0;
          }
       });
    } else if (sortBy === "alphabetical") {
       return notes.sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
             return -1;
          } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
             return 1;
          } else {
             return 0;
          }
       });
    } else {
       return notes;
    }
 };

 const updateNote = (id , updates) => {
    const note = notes.find((note) => note.id === id)

    if(!note) {
        return
    }

    if(typeof updates.title === 'string'){
        note.title = updates.title
        note.updatedAt = moment().valueOf()
    }

    if(typeof updates.body === 'string'){
        note.body = updates.body
        note.updatedAt = moment().valueOf()
    }

    saveNotes()
    return note
 }

 
 

notes = loadNotes();

export { getNotes, createNote, removeNote, sortNotes, updateNote };
