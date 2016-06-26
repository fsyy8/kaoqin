var drawPieChart = function(i,numA,numB,colorA,colorB,callback){
	numB = numB - numA;
	var pieChart = $("#pieChart"+i);
	var data = {
		labels:["a","b"] ,
	    datasets: [{
            data: [numA, numB],
            backgroundColor: [colorA,colorB],
        }]
	};
	var myPieChart = new Chart(pieChart , {
	    type: 'doughnut',
	    data: data,
	    options:{
		    legend:{
		    	display:false,
		    },
		    tooltips:{
		    	enabled:false,
		    },
			cutoutPercentage:80,
		}
	});
	if(callback){
		callback();
	}
	
}

var drawLineChart = function(_data,animate){
	var lineChart = $(".lineCanvas");
	var data = {
		labels: ["第一次", "第二次", "第三次", "第四次", "第五次"],
	    datasets: [
	        {
	            label: "作业成绩",
	            fill: false,
	            lineTension: 0.1,
	            backgroundColor: "rgba(75,192,192,0.4)",
	            borderColor: "rgba(75,192,192,1)",
	            borderCapStyle: 'butt',
	            borderDash: [],
	            borderDashOffset: 0.0,
	            borderJoinStyle: 'miter',
	            pointBorderColor: "rgba(75,192,192,1)",
	            pointBackgroundColor: "#fff",
	            pointBorderWidth: 1,
	            pointHoverRadius: 5,
	            pointHoverBackgroundColor: "rgba(75,192,192,1)",
	            pointHoverBorderColor: "rgba(220,220,220,1)",
	            pointHoverBorderWidth: 2,
	            pointRadius: 1,
	            pointHitRadius: 10,
	            data: _data,
	        }
	    ]
	};
	if(animate==false){
		var myLineChart = Chart.Line(lineChart, {
		    data: data,
		    options: {
		    	animation:false
		    }
		});
	}else{
		var myLineChart = Chart.Line(lineChart, {
		    data: data,
		    options: {}
		});
	}
	
}

$(document).ready(function(){
	$("#submitKaoqin").click(function(){
		$.ajax({
			url: '/submitKaoqin',
			type: 'POST',
			dataType: 'json',
			data: $("#kaoqinForm").serialize(),
		})
		.done(function(json) {
			alert(json.msg);
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});		
	});

	$(window).resize(function() {
		$(".pieCanvas").css({
			"width":"100%",
			"height":"100%",
		});
	});

})