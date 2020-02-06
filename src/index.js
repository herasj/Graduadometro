const express = require('express')
const app = express()

//config
app.set('port', process.env.PORT || 3000)

//middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//routes
app.use(require('./routes/index'))

//server
app.listen(app.get('port'), () =>{
    console.log(`Servidor conectado al puerto ${app.get('port')}`)
})