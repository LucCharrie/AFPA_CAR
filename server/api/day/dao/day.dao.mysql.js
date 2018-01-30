let db = require(__base + 'config/db');
let DayModel = require('../models/day.model');
console.log("3 DAO");


class DayDAO {

    static findById(id, cb){
        console.log("3 DAO FINDBYID");

        db.query('SELECT * FROM day_week WHERE id_day_week = ?', [id], (err, rows)=>{
            
            // rows = rows || [];
            // rows = rows.map((row)=>{
            //     return new Day(row);
            // });
            // cb(err, rows);

            cb(err, new DayModel(rows[0]));

        });

    }
}

module.exports = DayDAO