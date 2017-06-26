import Hoodie from '@hoodie/client'
const hoodie = new Hoodie({
  url: 'http://localhost:8080',
  PouchDB: require('pouchdb-browser')
})

// Initial state
const defaultState = {
  hoodie,
  account: null,
  status: true
}

/* -----------------    ACTIONS     ------------------ */

const CREATE_USER = 'CREATE_USER'
const CONNECTION_STATUS_UPDATE = 'CONNECTION_STATUS_UPDATE'

/* ------------   ACTION CREATORS     ------------------ */

const authenticated = account => ({ type: CREATE_USER, account })
export const connectionChanged = status =>
  ({ type: CONNECTION_STATUS_UPDATE, status })

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
  switch (action.type) {
    case CREATE_USER:
      return Object.assign({}, state, { account: action.account })
    case CONNECTION_STATUS_UPDATE:
      return Object.assign({}, state, { status: action.status })
    default:
      return state
  }
}
