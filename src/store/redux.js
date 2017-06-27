import Hoodie from '@hoodie/client'
const hoodie = new Hoodie({
  url: 'http://localhost:8080',
  PouchDB: require('pouchdb-browser')
})
window.store = hoodie.store
window.account = hoodie.account
window.hoodie = hoodie

// Initial state
const defaultState = {
  hoodie,
  account: null,
  status: true
}

/* -----------------    ACTIONS     ------------------ */

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const CONNECTION_STATUS_UPDATE = 'CONNECTION_STATUS_UPDATE'

/* ------------   ACTION CREATORS     ------------------ */

const authenticated = account => ({ type: LOGIN, account })
const loggedOut = account => ({ type: LOGOUT })
export const connectionChanged = status =>
  ({ type: CONNECTION_STATUS_UPDATE, status })

/* ------------       DISPATCHERS     ------------------ */

// Check session. If logged in, "authenticate"
export const checkUser = () => dispatch => {
  hoodie.account.get()
  .then(({ session, id, username }) => {
    if (session) dispatch(authenticated({ id, username }))
  })
  .catch(err => console.error(err))
}

// Create a new user
export const createUser = (username, password, cb) => dispatch => {
  hoodie.account.signUp({ username, password })
    .then(({ id, username }) => {
      dispatch(authenticated({ id, username }))
      cb()
    }).catch(err => {
      console.error(err)
      cb(err)
    })
}

// Log in to an existing account
export const login = (username, password, cb) => dispatch => {
  hoodie.account.signIn({ username, password })
    .then(account => {
      dispatch(authenticated(account))
      cb()
    }).catch(err => {
      console.error(err)
      cb(err)
    })
}

// Log out of the current session
export const logout = () => dispatch => {
  hoodie.account.signOut()
    .then(() => dispatch(loggedOut()))
    .catch(err => console.error(err))
}

/* --------------      REDUCER     ------------------ */

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, { account: action.account })
    case LOGOUT:
      return Object.assign({}, state, { account: null })
    case CONNECTION_STATUS_UPDATE:
      return Object.assign({}, state, { status: action.status })
    default:
      return state
  }
}
