var express = require('express');
var router = express.Router();
var userModel = require('../DBModels/usersModel');
var ObjectId = require('mongoose').Types.ObjectId;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('input', { title: 'PXS - Password Exchange Service' });
});

router.get('/about', function(req,res, next){
    res.render('about', {title: 'About - Password Exchange Service'});
});

router.get('/faq', function (req, res, next) {
    res.render('faq', {title: 'F.A.Q. - Password Exchange Service'});
});

router.get('/link/:id', function(req, res, next) {
    var userId = req.params['id'];
    var userObjectID = ObjectId(userId);
    userModel.findOne({'_id':userObjectID}, function(err, docs) {
        if (!err) {
            res.render('request', docs);
        }
    })
});

router.post('/', function(req, res) {
    var body = req.body;

    var res_body = {
        userNameField: body.userNameField,
        passwordField: body.passwordField,
        comments: body.comments,
        validationField: body.validationField
    };

    var User = new userModel(body);
    User.save(function(err, onSave) {
    if (!err) {
        res_body['id'] = onSave._id;
        res.render('result', res_body);
    }
    else {
        console.log(err);
    }
    })
});



router.use(function (req, res) {
    res.status(404);
    res.render('error');
})

module.exports = router;
