const express = require('express')
const app = express()

require('dotenv').config({silent: true})

//TODO:
//conectar o db
const db = require('./src/data/database')
db.connect()
//usar as rotas
app.use(express.json())

const estudiosRouter = require('./src/routes/estudios.routes')
app.use('/estudios', estudiosRouter)

const titulosRouter = require('./src/routes/titulos.routes')
app.use('/titulos', titulosRouter)

const usuariasRouter = require('./src/routes/usuarias.routes')
app.use('/usuarios', usuariasRouter)

const index = require("./src/routes/index");
app.use('/', index)

app.listen(process.env.PORT, () => console.log('listening on port 3333'))
