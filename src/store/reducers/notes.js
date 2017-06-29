/* -----------------    ACTIONS     ------------------ */

const GET_NOTES = 'GET_NOTES'
const ADD_NOTE = 'ADD_NOTE'
const DELETE_NOTE = 'DELETE_NOTE'

/* ------------   ACTION CREATORS     ------------------ */

const receivedNotes = notes => ({ type: GET_NOTES, notes })
const addedNote = note => ({ type: ADD_NOTE, note })
const deletedNote = noteId => ({ type: DELETE_NOTE, noteId })

/* ------------       DISPATCHERS     ------------------ */

// Retrieve user's notes from the store
export const retrieveNotes = () => (dispatch, getState) => {
  getState().hoodie.store.findAll()
    .then(notes => dispatch(receivedNotes(notes)))
    .catch(err => console.error(err))
}

// Create a new note and add it to the store
export const addNote = () => (dispatch, getState) => {
  getState().hoodie.store.add({ title: '', text: '' })
    .then(note => dispatch(addedNote(note)))
    .catch(err => console.error(err))
}

// Delete a note in the store
export const deleteNote = noteId => (dispatch, getState) => {
  getState().hoodie.store.remove(noteId)
    .then(() => dispatch(deletedNote(noteId)))
    .catch(err => console.error(err))
}

/* --------------      REDUCER     ------------------ */

const initialNotes = []
export default function reducer(notes = initialNotes, action) {
  switch (action.type) {
    case GET_NOTES:
      return action.notes
    case ADD_NOTE:
      return [ action.note, ...notes ]
    case DELETE_NOTE:
      return notes.filter(note => note._id !== action.noteId)
    default:
      return notes
  }
}
