import account from './user'
import status from './connection'

// Create Hoodie client instance
import Hoodie from '@hoodie/client'
const hoodieInstance = new Hoodie({
  url: 'http://localhost:8080',
  PouchDB: require('pouchdb-browser')
})
const hoodie = () => hoodieInstance

export default {
  account,
  hoodie,
  status
}
