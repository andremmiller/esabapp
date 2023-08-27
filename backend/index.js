const app = require('express')()
const consign = require('consign')
const db = require('./config/db')

app.db = db

app.listen(3000, () => {
    console.log('Backend executando...')
})

consign()
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)