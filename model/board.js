/**
 * Created by HOME on 2016-05-24.
 */
var mongoose = require('mongoose');
var db = require('./database');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);

var BoardSchema = new mongoose.Schema({ // 스키마정의
    "title" : String,
    "content" : String,
    "regdate" : {
        "type" : Date,
        "default" : Date.now
    },
    "hit" : {
        "type" : Number,
        "default" : 0
    },
    "id" : String
});

BoardSchema.
plugin(autoIncrement.plugin, //auto increment 사용, filed를 num으로 정의, 시작값, 증분값 설정
    { "model" : 'Board' , "field" : 'num', "startAt" : 1, "incrementBy" : 1});

var Board = mongoose.model('Board', BoardSchema); //모델화

module.exports = Board;


