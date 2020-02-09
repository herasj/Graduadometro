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
    const updateData = modelar(data.tableSubjects)
   

    const response = {
        state: data.state,
        name: data.name,
        period: data.period,
        percent: percent(updateData),
        tableSubjects: updateData
    }
    res.json(response)
})




module.exports = router