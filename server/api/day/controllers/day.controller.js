let DayService = require('../services/day.service');

console.log("1 CTRL")


module.exports.read = (req, res) => {
    console.log("1 CTRL READ")
    console.log(req.idDay);
    res.send(req.idDay);
}

exports.findById = (req, res, next, id) => {
    console.log("1 CTRL FINDBYID")

    DayService.findById(id, (err, idDay) => {
        req.idDay = idDay;
        next();

    });

}