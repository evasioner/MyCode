/**
 * Created by HOME on 2016-05-25.
 */
var express = require('express');
var router = express.Router();


var db = require('../model/database');
require('../model/board');
var BoardModel = db.model('Board');

/* GET board page. */
router.get('/', function(req, res, next) {
    //res.render('board/list', { title: 'Article' });
    res.redirect('/board/1');
});

router.get('/write', function(req, res, next) {
    res.render('board/writeform', { title: 'Article Write' });
});


router.post('/write', function (req, res, next) {
    var title = req.body.title;
    var content = req.body.content;
    var board = new BoardModel({
        "title": title,
        "content": content,
        "id": 'session'
    });

    board.save(function (err, doc) {
        if (err) console.error('err', err);
        console.log("doc", doc);
        res.redirect('/board/1');
    });
});

router.get('/:page', function (req, res, next) {
    var page = req.params.page;

    page = parseInt(page, 10);

    BoardModel.count(function (err, cnt) {
        var size = 10;  // 한 페이지에 보여줄 개수
        var begin = (page - 1) * size; // 시작 글
        var totalPage = Math.ceil(cnt / size);  // 전체 페이지의 수 (75 / 10 = 7.5(X) -> 8(O))
        var pageSize = 10; // 페이지 링크의 개수

        // 1~10페이지는 1로, 11~20페이지는 11로 시작되어야하기 때문에 숫자 첫째자리의 수를 고정시키기 위한 계산법
        var startPage = Math.floor((page-1) / pageSize) * pageSize + 1;
        var endPage = startPage + (pageSize - 1);

        if(endPage > totalPage) {
            endPage = totalPage;
        }

        // 전체 글이 존재하는 개수
        var max = cnt - ((page-1) * size);
        BoardModel.find({}).sort("-num").skip(begin).limit(size).exec(function (err, docs) {
            if (err) console.error('err', err);
            console.log('docs', docs);
            for(i in docs){
                console.log('docs', docs[i].length);
                if(docs[i].length > 200){
                    docs[i].content = docs[i].content.substr(0,200)+"...";
                }
            }
            //res.json({"result" : docs});

            //console.log(B);

            var datas = {
                "title" : "게시판 리스트",
                "data" : docs,
                "page" : page,
                "pageSize" : pageSize,
                "startPage" : startPage,
                "endPage" : endPage,
                "totalPage" : totalPage,
                "max" : max
            };

            res.render('board/list', datas);
        });
    });
});







module.exports = router;