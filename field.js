const baseMapper = field => record => record.get(field) || '';

module.exports = class Field {
  constructor (wtField, iaField, mapper) {
    this.wtField = wtField;
    this.name = iaField;
    this.getValue = mapper || baseMapper(wtField);
  }
}
