function forEach(array, callback) {
    var arrayCount = array.length;
    
    for (i = 0; i < arrayCount; ++i) {
        callback(array[i], i, array);
    }
}