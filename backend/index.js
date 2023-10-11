const express = require('express')
const app = express()
const consign = require('consign')
const db = require('./config/db')

app.db = db

app.use('/uploads', express.static('uploads'));

app.listen(3000, () => {
    console.log('Backend aguardando requests na porta 3000...')
})

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)