$(document).ready(function(){
	$("#postComment").click(function(){
		if($("#commentContent textarea").val()==""){
			alert("输入内容不得为空")
		}else{
			$.ajax({
				url: '/notice/addNoticeComment',
				type: 'POST',
				dataType: 'json',
				data: {
					notice : $("#noticeId").val(),
					content : $("#commentContent textarea").val(),
				},
			})
			.done(function(json) {
				alert(json.msg)
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
		}		
	})
})