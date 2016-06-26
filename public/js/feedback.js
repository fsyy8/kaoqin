$(document).ready(function(){
	$("#postFeedback").click(function(){
		$.ajax({
			url: '/addFeedback',
			type: 'POST',
			dataType: 'json',
			data: {
				feedbackText: $("#feedbackText").val()
			},
		})
		.done(function(json) {
			alert(json.msg);
		})
		.fail(function() {
			alert("发送失败");
		})
		.always(function() {
			console.log("complete");
		});
		
	})
});