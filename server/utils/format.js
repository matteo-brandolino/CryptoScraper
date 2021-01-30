function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function parseFloatIgnoreCommas(number) {
    var numberNoCommas = number.replace(/,/g, '');
    return parseFloat(numberNoCommas);
}
module.exports = {
    numberWithCommas,
    parseFloatIgnoreCommas
}