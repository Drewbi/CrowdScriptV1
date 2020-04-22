const express = require('express')

require('./_utils/mongoose')
require('./_models/segment')
require('./_models/session')
require('./_models/episode')
require('./_models/submission')
const router = require('./_routes/segment')

const app = express()
app.use(router)

module.exports = app
