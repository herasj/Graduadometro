let sumaTotal = 0
let sumaNo = 0

const percent = (data) => {
    data.map(data => {
        data.map((data) => {
            if (data.cumplido == 'Yes') sumaNo++
            
            sumaTotal++
        })
    })

    return ((sumaNo / sumaTotal) * 100) + '%'
}


module.exports = percent