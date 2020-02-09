const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

//config
app.set('port', process.env.PORT || 3000)


//middleware
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors({origin: 'http://localhost:4200'}))

//routes
app.use(require('./routes/index'))

//server
app.listen(app.get('port'), () =>{
    console.log(`Servidor conectado al puerto ${app.get('port')}`)
})