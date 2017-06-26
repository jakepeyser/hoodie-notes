import Hoodie from '@hoodie/client'
const hoodie = new Hoodie({
  url: 'http://localhost:8080',
  PouchDB: require('pouchdb-browser')
})

// Initial state
const defaultState = {
  account: null
}

/* -----------------    ACTIONS     ------------------ */

export const CREATE_USER = 'CREATE_USER';

/* ------------   ACTION CREATORS     ------------------ */

export const authenticated = account => ({ type: CREATE_USER, account });

/* ------------       DISPATCHERS     ------------------ */

// Create a new user
export const createUser = (username, password, cb) => dispatch => {
  hoodie.account.signUp({ username, password }).then(({ id, username }) => {
    dispatch(authenticated({ id, username }))
    cb()
  }).catch(err => {
    console.error(err)
    cb(err)
  })
}

// Log in to an existing account
export const login = (username, password, cb) => dispatch => {
  hoodie.account.signIn({ username, password }).then(account => {
    dispatch(authenticated(account))
    cb()
  }).catch(err => {
    console.error(err)
    cb(err)
  })
}

/* --------------      REDUCER     ------------------ */

export default function reducer(state = defaultState, action) {
  console.log('state changed')
  console.dir(state)
  switch (action.type) {
    case CREATE_USER:
      const newState = Object.assign({}, state, { account: action.account })
      console.log(newState)
      return newState
    default:
      return state
  }
}
