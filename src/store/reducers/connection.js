/* -----------------    ACTIONS     ------------------ */

const CONNECTION_STATUS_UPDATE = 'CONNECTION_STATUS_UPDATE'

/* ------------   ACTION CREATORS     ------------------ */

export const connectionChanged = status =>
  ({ type: CONNECTION_STATUS_UPDATE, status })

/* --------------      REDUCER     ------------------ */

const initialStatus = true
export default function reducer(status = initialStatus, action) {
  switch (action.type) {
    case CONNECTION_STATUS_UPDATE:
      return action.status
    default:
      return status
  }
}
