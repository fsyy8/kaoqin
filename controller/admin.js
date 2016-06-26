var adminSettingModel = require("../models/adminSetting").adminSettingList;
var kaoqinNumberModel = require("../models/kaoqinNumber").kaoqinNumberList;

exports.adminPage = function(callback){
    var kaoqinNumbers;
    //获取考勤数字
    kaoqinNumberModel.find({},function(err,docs){
        if (!err) {
            kaoqinNumbers = docs;
        }
        callback(kaoqinNumbers);
    });
    
}

exports.addSetting = function(req,res){
    var newSetting = new adminSettingModel({kaoqinTotal: req.body.kaoqinTotal});
        newSetting.save(function (err){
        if(!err){
            res.send({
                code: 200,
                msg: "增加成功！（本条消息来自后台）"
            });
        }
    });
};

exports.editSetting = function(req,res){
    adminSettingModel.update({"name" : "adminsetting",},{kaoqinTotal: req.body.kaoqinTotal}, function (err){
       if(!err){
            res.send({
                code: 200,
                msg: "修改成功！（本条消息来自后台）"
            });
        }
    });
};

exports.randomNumber = function(req,res){
    var Num=[]; 
    for(var i=0;i<50;i++) { 
        Num[i] = "";
        for(var length=0;length<9;length++){
            Num[i]+= Math.floor(Math.random()*10); 
        }
    }
    var newNum = [];
    for(var i=0;i<50; i++) {
        newNum[i] = {
            kaoqinNumber: Num[i],
            usedOrNot: false,
            NumberClass: 1,
        }
    }
    kaoqinNumberModel.create(newNum,function(err){
        if(!err){
            // res.send({
            //     newNum
            // });
        }       
    })    
};