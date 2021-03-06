const puppeteer = require('puppeteer');

const main = async (user, pass) => {

    //Configuración incial
    const url = 'https://pomelo.uninorte.edu.co/pls/prod/twbkwbis.P_WWWLogin'
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' })


    //Escribe el usuario en el input de usuario
    await page.waitFor('#UserID');
    await page.$eval('#UserID', (inputUser, value) => inputUser.value = value, user);

    //Escribe la contraseña en el input de contraseña
    await page.waitFor('#PIN > input[type=password]');
    await page.$eval('#PIN > input[type=password]', (inputPassword, value) => inputPassword.value = value, pass)

    //Le da click para ingresar a la pagina de la norte
    await Promise.all([
        page.waitForNavigation(),
        page.click('body > div.pagebodydiv > form > p > input[type=submit]')
    ])

    // Espera por las etiquetas del estado academico y el nombre del estudiante
    await page.waitFor('body > div.pagebodydiv > table:nth-child(1) > tbody > tr > td:nth-child(2) > b:nth-child(2)');
    await page.waitFor('body > div.pagebodydiv > table:nth-child(1) > tbody > tr > td:nth-child(2) > b:nth-child(1)');

    //Toma el valor del estado academico y el nombre del estudiante
    const estate = await page.$eval('body > div.pagebodydiv > table:nth-child(1) > tbody > tr > td:nth-child(2) > b:nth-child(2)', estate => estate.innerText)
    const name = await page.$eval('body > div.pagebodydiv > table:nth-child(1) > tbody > tr > td:nth-child(2) > b:nth-child(1)', name => name.innerText)


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
    const period = await page.$eval('#term_in_id > option:nth-child(1)', periodo => periodo.value)

    await page.waitForSelector('#term_in_id')
    await page.select('#term_in_id', period)

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

    //Selecciona la carrera
    await Promise.all([
        page.waitForNavigation(),
        page.click('body > div.pagebodydiv > form > input[type=submit]:nth-child(13)')
    ])

    await page.waitForSelector('.datadisplaytable')
    const cantTable = await page.$$eval('.datadisplaytable', length => length.length)

    //Obtiene las materias, el semestre y si ya culmino la materia
    const cumplimiento = await page.$$eval('.datadisplaytable', table => table.map(data => {
        const cumplimiento = []
        for (let i = 2; i < data.rows.length - 1; i++) {
            const semester = data.rows[0].innerText.split('\t')[1]
            cumplimiento.push({
                semester: semester.split('Sem')[0] + 'Semestre',
                subject: data.rows[i].innerText.split('\t')[3],
                completed: data.rows[i].innerText.split('\t')[0]
            })

        }

        return cumplimiento
    }))

    //Elimina ingles de las materias
    const tableSubjects = []
    for (let i = 2; i < cumplimiento.length; i++) {
        const size = cumplimiento[i].length
        if (size == 1) {
            if (cumplimiento[i][0].subject.indexOf('EXIGENCIA INGLES') == -1) {
                tableSubjects.push(cumplimiento[i])
            }
        } else {
            tableSubjects.push(cumplimiento[i])
        }
    }
    browser.close()

    //Retorna los datos
    return {
        state: estate.split(':')[1],
        name: name.split(',')[1],
        period: period,
        tableSubjects: tableSubjects
    }

};

module.exports = main