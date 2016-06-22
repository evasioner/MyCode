/**
 * Created by HOME on 2016-06-22.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('timeline', { title: 'TimeLine' });
});

module.exports = router;