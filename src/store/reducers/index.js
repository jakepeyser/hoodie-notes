import account from './user'
import notes from './notes'
import status from './connection'

// Create Hoodie client instance
import Hoodie from '@hoodie/client'
const hoodieInstance = new Hoodie({
  url: window.location.origin,
  PouchDB: require('pouchdb-browser').default
})
const hoodie = () => hoodieInstance

// For browser console debugging purposes
window.hoodie = hoodieInstance
window.account = hoodieInstance.account
window.store = hoodieInstance.store

export default {
  account,
  hoodie,
  notes,
  status
}
