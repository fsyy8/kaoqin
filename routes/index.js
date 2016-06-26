var express = require('express');
var session = require("../middleware/session");
var router = express.Router();

// 引入c层的各个控制器
var loginController = require("../controller/login");
var getLoginController = require("../controller/getLogin");
var adminController = require("../controller/admin");
var noticeController = require("../controller/notice");
var userController = require("../controller/user");
var feedbackController = require("../controller/feedback")

router.use(session.session);

router.get('/',function(req,res,next){
    res.redirect("home");
});

router.get('/login', function(req, res, next) {
  res.render('login',{title: "用户登录"});
});

router.get('/home', function (req, res){
	if(req.session.user){
        userController.getHome(function(kaoqinTotal,notice){
            res.render("home", {
                title: "登录成功页",
                user:req.session.user["username"],
                nickname:req.session.user["nickname"],
                pingshiScore:req.session.user["pingshiScore"],
                qimoScore:req.session.user["qimoScore"],
                kaoqin:req.session.user["kaoqin"],
                kaoqinTotal:kaoqinTotal,
                notice:notice,
            });
        });      
    }else{
        req.session.error = "请先登录";
        res.redirect("login");
    }
});

router.get('/userData', getLoginController.getLogin);

router.get('/logout', function (req, res){
    req.session.user = null;
    req.session.error = null;
    res.redirect("/login");
});

router.post("/register", loginController.register);

//登录接口
router.post("/userData", loginController.login);

//公告
router.get("/notice",function(req, res) {
    if (req.session.user) {
        noticeController.getNotice(function(notices){
            res.render('notice',{
                title: "公告栏",
                notices: notices,
                user:req.session.user,
            });
        })
    }else{
        req.session.error = "请先登录";
        res.redirect("login");
    } 
});

router.get("/notice/:id",function(req,res){
    if(req.session.user) {
        var info = [];
        noticeController.getDetail(req,res,function(notice,comments){
            res.render('noticeDetail', {
                title: '公告详情页',
                notice: notice,
                comments: comments,
                user: req.session.user,
            });
        });
    }else{
        req.session.error = "请先登录";
        res.redirect("../login");
    }
});

router.post("/notice/addNotice",noticeController.addNotice);

router.post("/notice/addNoticeComment",noticeController.addNoticeComment);

router.get("/kaoqin",function(req,res){
    if (req.session.user) {
        res.render('kaoqin',{
            title: "考勤",
            user: req.session.user,
        });
    }else{
        req.session.error = "请先登录";
        res.redirect("login");
    } 
});

router.get("/feedback",function(req,res){
    if (req.session.user) { 
        res.render('feedback',{
            title: "教学反馈",
            user: req.session.user,
        });
    }else{
        req.session.error = "请先登录";
        res.redirect("login");
    } 
});
router.post("/addFeedback",feedbackController.addFeedback);

//管理员接口
router.get("/admin", function(req, res) {
    adminController.adminPage(function(kaoqinNumbers){
        res.render('admin',{
            title: "管理员",
            kaoqinNumbers: kaoqinNumbers,
        });
    });
});

router.post("/addSetting",adminController.addSetting);
router.post("/editSetting",adminController.editSetting);
router.get("/randomNumber",adminController.randomNumber);
router.post("/submitKaoqin",userController.submitKaoqin);


module.exports = router;