let sumTotal = 0
let sumY = 0

const percent = (data) => {
    data.map(data => {
        data.map((data) => {
            if (data.completed == 'Yes') sumY++
            
            sumTotal++
        })
    })

    return intlRound(((sumY / sumTotal) * 100)) + '%'
}

const intlRound = (num, dec = 2, coma = false) =>{
    var option = {
        maximumFractionDigits: dec, 
        useGrouping: false
    };
    coma = coma ? "es" : "en";
    return new Intl.NumberFormat(coma, option).format(num);
}

module.exports = percent