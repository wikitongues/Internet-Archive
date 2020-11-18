// Remove diacritics
// https://stackoverflow.com/a/37511463
exports.normalize = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
