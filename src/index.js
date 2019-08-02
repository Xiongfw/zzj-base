import * as api from "./api/index.js"
import * as logger from './lib/logger/index.js'
import install from './install.js'
import axios from "./api/request.js"
import showalert from './components/alert/index.js'
import loading from './components/loading/index.js'

export {
  install,
  api,
  axios,
  logger,
  showalert,
  loading,
}