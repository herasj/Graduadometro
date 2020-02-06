
const puppeteer = require('puppeteer');

(async () => {

    const url = 'https://pomelo.uninorte.edu.co/pls/prod/twbkwbis.P_WWWLogin'
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' })

    await page.waitFor('#UserID');


    // await page.type('input[name=search]', 'Adenosine triphosphate');
    await page.$eval('#UserID', el => el.value = 'jcabarique');

    await page.waitFor('#PIN > input[type=password]');

    // await page.type('input[name=search]', 'Adenosine triphosphate');
    await page.$eval('#PIN > input[type=password]', el => el.value = 'jc3106060631')

    await Promise.all([
        page.waitForNavigation(),
        page.click('body > div.pagebodydiv > form > p > input[type=submit]')
    ])

    await page.waitForSelector('body > div.pagetitlediv > table > tbody > tr:nth-child(1) > td:nth-child(1) > h2')
    const estado = await page.$eval('body > div.pagebodydiv > table:nth-child(1) > tbody > tr > td:nth-child(2) > b:nth-child(2)', el => el.textContent)
    const nombre = await page.$eval('body > div.pagebodydiv > table:nth-child(1) > tbody > tr > td:nth-child(2) > b:nth-child(1)', el => el.textContent)
    console.log(estado)
    console.log(nombre.split(',')[1].trim())

    
    await Promise.all([
        page.waitForNavigation(),
        page.click('body > div.pagebodydiv > table.menuplaintable > tbody > tr:nth-child(1) > td:nth-child(2) > a')
    ])

    await Promise.all([
        page.waitForNavigation(),
        page.click('body > div.pagebodydiv > table.menuplaintable > tbody > tr:nth-child(4) > td:nth-child(2) > a')
    ])

    const periodo = await page.$eval('#term_in_id > option:nth-child(1)', periodo => periodo.value)
    console.log(periodo)
    await page.waitForSelector('#term_in_id')
    await page.select('#term_in_id', periodo)
    
    await Promise.all([
        page.waitForNavigation(),
        page.click('body > div.pagebodydiv > form > table > tbody > tr:nth-child(3) > td.dedefault > input[type=submit]')
    ])

    await Promise.all([
        page.waitForNavigation(),
        page.click('body > div.pagebodydiv > form > table > tbody > tr:nth-child(2) > td.ntdefault > a')
    ])

    
   // browser.close()
})();