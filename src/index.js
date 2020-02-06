
const puppeteer = require('puppeteer');

(async () => {

    //Configuración incial
    const url = 'https://pomelo.uninorte.edu.co/pls/prod/twbkwbis.P_WWWLogin'
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' })


    //Escribe el usuario en el input de usuario
    await page.waitFor('#UserID');
    await page.$eval('#UserID', el => el.value = 'jcabarique');

    //Escribe la contraseña en el input de contraseña
    await page.waitFor('#PIN > input[type=password]');
    await page.$eval('#PIN > input[type=password]', el => el.value = 'jc3106060631')

    //Le da click para ingresar a la pagina de la norte
    await Promise.all([
        page.waitForNavigation(),
        page.click('body > div.pagebodydiv > form > p > input[type=submit]')
    ])

    // Obtiene el estado academico y el nombre del estudiante
    const estado = await page.$eval('body > div.pagebodydiv > table:nth-child(1) > tbody > tr > td:nth-child(2) > b:nth-child(2)', el => el.textContent)
    const nombre = await page.$eval('body > div.pagebodydiv > table:nth-child(1) > tbody > tr > td:nth-child(2) > b:nth-child(1)', el => el.textContent)
    console.log(estado)
    console.log(nombre.split(',')[1].trim())

    //Accede a información academica
    await Promise.all([
        page.waitForNavigation(),
        page.click('body > div.pagebodydiv > table.menuplaintable > tbody > tr:nth-child(1) > td:nth-child(2) > a')
    ])

    //Accede consulta de cumplimiento
    await Promise.all([
        page.waitForNavigation(),
        page.click('body > div.pagebodydiv > table.menuplaintable > tbody > tr:nth-child(4) > td:nth-child(2) > a')
    ])

    //Asigna el periodo que desea saber su cumplimiento
    const periodo = await page.$eval('#term_in_id > option:nth-child(1)', periodo => periodo.value)
    console.log(periodo)
    await page.waitForSelector('#term_in_id')
    await page.select('#term_in_id', periodo)
    
    //Da click en el boton para acceder
    await Promise.all([
        page.waitForNavigation(),
        page.click('body > div.pagebodydiv > form > table > tbody > tr:nth-child(3) > td.dedefault > input[type=submit]')
    ])

    //Selecciona la carrera
    await Promise.all([
        page.waitForNavigation(),
        page.click('body > div.pagebodydiv > form > table > tbody > tr:nth-child(2) > td.ntdefault > a')
    ])

    
   // browser.close()
})();