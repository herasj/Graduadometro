
let modelData = []
const modelar = (data) => {
    let i = 0
    while (i < data.length) {
        if (data[i][0].semestre == data[i + 1][0].semestre) {
            modelData.push(data[i].concat(data[i + 1]))
            i = i + 2
        } else {
            modelData.push(data[i])
            i++
        }
    }

    return modelData
}


module.exports = modelar