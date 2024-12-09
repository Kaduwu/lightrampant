function shiftArray(array, shift) {
    let newArray = []
    console.log(array.length-shift)
    for (let i = 0; i < array.length; i++) {
        if(i+shift+1>array.length) {
            newArray.push(array[i-(array.length-shift)])
        } else {
            newArray.push(array[i+shift])
        }
    }
    return newArray;
}
