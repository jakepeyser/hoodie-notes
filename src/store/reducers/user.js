/* -----------------    ACTIONS     ------------------ */

const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

/* ------------   ACTION CREATORS     ------------------ */

const authenticated = account => ({ type: LOGIN, account })
const loggedOut = account => ({ type: LOGOUT })

/* ------------       DISPATCHERS     ------------------ */

// Check session. If logged in, "authenticate"
export const checkUser = () => (dispatch, getState) => {
  getState().hoodie.account.get()
    .then(({ session, id, username }) => {
      if (session) dispatch(authenticated({ id, username }))
    })
    .catch(err => console.error(err))
}

// Create a new user
export const createUser = (username, password, cb) => (dispatch, getState) => {
  getState().hoodie.account.signUp({ username, password })
    .then(({ id, username }) => {
      dispatch(authenticated({ id, username }))
      cb()
    }).catch(err => {
      console.error(err)
      cb(err)
    })
}

// Log in to an existing account
export const login = (username, password, cb) => (dispatch, getState) => {
  getState().hoodie.account.signIn({ username, password })
    .then(account => {
      dispatch(authenticated(account))
      cb()
    }).catch(err => {
      console.error(err)
      cb(err)
    })
}

// Log out of the current session
export const logout = () => (dispatch, getState) => {
  getState().hoodie.account.signOut()
    .then(() => dispatch(loggedOut()))
    .catch(err => console.error(err))
}

/* --------------      REDUCER     ------------------ */

const initialAccount = null
export default function reducer(account = initialAccount, action) {
  switch (action.type) {
    case LOGIN:
      return action.account
    case LOGOUT:
      return null
    default:
      return account
  }
}
