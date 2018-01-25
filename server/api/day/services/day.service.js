let DayDAO = require('../dao/day.dao.mysql')
console.log("2 SERVICE");


class DayService{

    static findById(id, cb){
        console.log("2 SERVICE FINDBYID");

        return DayDAO.findById(id, cb);
    }

}

module.exports = DayService;