const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

db.query(`SELECT * FROM department`, (err, rows) => {
    console.log(rows);
  });


router.get('/departments', (req, res) => {
    const sql = `SELECT * FROM department`;
 
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

module.exports = router;