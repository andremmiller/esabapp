const bodyParser = require('body-parser')
const cors = require('cors')

// app = instancia express criada em index.js
// dependencias sao gerenciadas pelo consign
module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
} 