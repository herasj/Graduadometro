

const modelar = (data) => {
    let modelData = []
    let i = 0
    while (i < data.length) {
        if (data[i][0].semester == data[i + 1][0].semester) {
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