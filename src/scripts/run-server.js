const express = require('express')
const paths = require('../config/paths')

const app = express()

app.use(express.static(paths.serverRoot))

app.listen(3000, function () {
  console.log('Server startet at http://localhost:3000')
})
