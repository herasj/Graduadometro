const express = require('express')
const router = express.Router()
const scraper = require('../scraper/index')

router.post('', async (req, res) => {
    //Obtiene el usuario y la contraseña
    const user = req.body.user
    const password = req.body.password
    //Llama al scraper
    const data = await scraper(user, password)
    console.log(data)
    res.json(data)
})

router.get('/', (req, res)=>{
   res.send('Obvio bobis')
})




module.exports = router