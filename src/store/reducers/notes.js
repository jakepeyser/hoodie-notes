import { LOGOUT } from './user'

/* -----------------    ACTIONS     ------------------ */

const GET_NOTES = 'GET_NOTES'
const ADD_NOTE = 'ADD_NOTE'
const DELETE_NOTE = 'DELETE_NOTE'
const UPDATE_NOTE = 'UPDATE_NOTE'

/* ------------   ACTION CREATORS     ------------------ */

const receivedNotes = notes => ({ type: GET_NOTES, notes })
const addedNote = note => ({ type: ADD_NOTE, note })
const deletedNote = noteId => ({ type: DELETE_NOTE, noteId })
const updatedNote = note => ({ type: UPDATE_NOTE, note })

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

// Update a note in the store
export const updateNote = note => (dispatch, getState) => {
  getState().hoodie.store.update(note)
    .then(() => dispatch(updatedNote(note)))
    .catch(err => console.error(err))
}

/* --------------      REDUCER     ------------------ */

const initialNotes = []
export default function reducer(notes = initialNotes, action) {
  switch (action.type) {
    case GET_NOTES:
      return action.notes.sort((a, b) => a.hoodie.createdAt > b.hoodie.createdAt ? -1 : 1)
    case ADD_NOTE:
      return [ action.note, ...notes ]
    case DELETE_NOTE:
      return notes.filter(note => note._id !== action.noteId)
    case UPDATE_NOTE:
      const noteIndex = notes.findIndex(note => note._id === action.note._id)
      return [
        ...notes.slice(0, noteIndex),
        action.note,
        ...notes.slice(noteIndex + 1)
      ]
    case LOGOUT:
      return initialNotes
    default:
      return notes
  }
}
