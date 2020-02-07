const express = require('express')
const scraper = require('../scraper/index')
const modelar = require('../configModel/modelar')
const percent = require('../configModel/percent')
const router = express.Router()


router.post('', async (req, res) => {
    //Obtiene el usuario y la contraseña
    const user = req.body.user
    const password = req.body.password
    //Llama al scraper
    const data = await scraper(user, password)
    //Trae la data en un mejor formato
    const updateData = modelar(data.infoMateria)
    //Porcentaje de las materias cursadas
    console.log(`Porcentaje cursado : ${percent(updateData)}`)
    res.json(data)
})

router.get('/', (req, res)=>{
   res.send('Obvio bobis')
})




module.exports = router