const moment = require('moment');

module.exports = app => {
    function existsOrError(value, msg) {
        if(!value) throw msg // valor vazio
        if(Array.isArray(value) && value.length === 0) throw msg // array vazio
        if(typeof value === 'string' && !value.trim()) throw msg // string vazia ou só espaços
    }
    
    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch(msg) {
            return
        }
        throw msg
    }
    
    function equalsOrError(valueA, valueB, msg) {
        if(valueA !== valueB) throw msg
    }

    function validateDateRange(beginAt, endAt, msg) {
        const now = moment(); // Get the current date and time using moment.js
      
        const beginAtMoment = moment(beginAt);
        const endAtMoment = moment(endAt);
      
        if (!beginAtMoment.isValid() || !endAtMoment.isValid()) {
          throw msg; // Invalid date format
        }
      
        if (beginAtMoment.isSameOrAfter(endAtMoment)) {
          throw msg; // beginAt is not before endAt
        }
      }

    return { existsOrError, notExistsOrError, equalsOrError, validateDateRange }
}