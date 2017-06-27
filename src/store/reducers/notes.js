/* -----------------    ACTIONS     ------------------ */

const GET_NOTES = 'GET_NOTES'

/* ------------   ACTION CREATORS     ------------------ */

const receivedNotes = notes => ({ type: GET_NOTES, notes })

/* ------------       DISPATCHERS     ------------------ */

// Check session. If logged in, "authenticate"
export const retrieveNotes = () => (dispatch, getState) => {
  getState().hoodie.store.findAll()
    .then(notes => dispatch(receivedNotes(notes)))
    .catch(err => console.error(err))
}

/* --------------      REDUCER     ------------------ */

const initialNotes = []
export default function reducer(notes = initialNotes, action) {
  switch (action.type) {
    case GET_NOTES:
      return action.notes
    default:
      return notes
  }
}
