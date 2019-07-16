/**
 * @module
 * this class will be used to handle get requests for issue
 */

const express = require('express')
const db = require('../config/db.conf.js');


//create router
const router = express.Router()
 

//to check for empty object on error handling 
Object.prototype.isEmpty = function() {
    for (var key in this) {
        if (this.hasOwnProperty(key))
            return false;
    }
    return true;
}

//route for getting a category by id
router.get('/getCategory', (req, res) =>{
const queryString = "SELECT issue.id, issue.title, issue.photo, issue.location, issue.description, issue.time_stamp \
FROM issue , category\
WHERE issue.category_id = ? AND category.category_id = ?;"
const category_id = req.query.category_id
db.query(queryString, [category_id, category_id], (err, results)=>{
    if (err) {
        return res.status(400).send({
            err
        });
    } else {
        res.send(results)
    }

})
})

//route for getting all issue
router.get('/getAllCategory', (req, res) =>{
    const queryString = "SELECT issue.id, issue.title, issue.photo, issue.location, issue.description, issue.time_stamp\
    FROM issue\
    where ?=?;"
    var whereAll = 1;
    db.query(queryString,[whereAll,whereAll], (err, results)=>{
        if (err) {
            return res.status(400).send({
                err
            });
        } else {
            res.send(results)
        }
    })
    })

//route using percent like to search issue where park is in the title
router.get('/getPercentLike', (req, res) =>{
    const queryString = "SELECT issue.id, issue.title, issue.photo, issue.location, issue.description, issue.time_stamp \
    FROM issue\
    where title like '%park%';"
    db.query(queryString,(err, results)=>{
        if(err) {
            throw err;
            console.log(results);
        }
        else{
            res.send(results);
        }
    })
})

module.exports = router