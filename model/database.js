/**
 * Created by HOME on 2016-05-24.
 */
var mongoose = require("mongoose");
var uri  = "mongodb://localhost/test";
var options = {
    "server" :{
        "poolSize" : 100
    }
};

var db = mongoose.createConnection(uri, options);

db.on('error', function(err){
    if(err) console.error("db Connection Error", err);

});

db.once('open', function callback() {
    console.info("DB Connected");
});

module.exports = db;

