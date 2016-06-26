var adminSettingModel = require("../models/adminSetting").adminSettingList;
var kaoqinNumberModel = require("../models/kaoqinNumber").kaoqinNumberList;
var noticeModel = require("../models/notice").noticeList;
var userModel = require("../models/login").userList;

exports.getHome = function (callback){
	adminSettingModel.findById("572c0780f440c9cc2a3f86ac",function(err,doc){
		var kaoqinTotal = doc.kaoqinTotal;
		noticeModel.findOne({"recommended":true},function(err,doc){
			var notice = doc;
			callback(kaoqinTotal,notice);
		});		
	});
};

exports.submitKaoqin = function(req,res){
	kaoqinNumberModel.findOne({"kaoqinNumber":req.body.kaoqinNumber},function(err,doc){
		if(!err){
			if (!doc) {
				res.send({
                    code: 201,
                    msg: "号码输入错误！（本条消息来自后台）"
                });
			}else{
				if(doc.usedOrNot == true){
					res.send({
	                    code: 201,
	                    msg: "该号码已被使用（本条消息来自后台）"
	                });
				}else{
					kaoqinNumberModel.update({"kaoqinNumber":req.body.kaoqinNumber},{"usedOrNot":true},function(err,doc2){
						if(!err){
							userModel.findByIdAndUpdate(req.session.user.userid,{"kaoqin":req.session.user.kaoqin+1},function(err,doc3){
								req.session.user.kaoqin += 1;
								res.send({
				                    code: 201,
				                    msg: "考勤成功！（本条消息来自后台）"
				                });
							});
						}
					});
				}		
			}
		}
	});
}