var feedbackModel = require("../models/feedback").feedbackList;

exports.addFeedback = function(req,res){
    var newFeedback = new feedbackModel({
        feedbackText:req.body.feedbackText,
    });
    newFeedback.save(function (err){
        if(!err){
            res.send({
                code: 200,
                msg: "增加成功！（本条消息来自后台）"
            });
        }
    });
};
