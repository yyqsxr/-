
var timebar = new function() {
	this.init = initTimeBar;  // 初始化日历控件
	this.getDate = getDisDate; // 获取当前所选的日期
	this.nextTime = nextTime;
	this.lastTime = lastTime;
    this.id;

	var now = new Date();
	/*
	 * 初始化时间控件，传入要渲染div的id，和时间的点击事件
	 */
	function initTimeBar(id,evn){
		this.id = id;
		var timeHtml = `<p class="calendar-year" id="calyearp" style="display:none"></p><a href="javascript:timebar.nextTime();" class="mt20 calendar-btn calendar-btn-l"><span class="icon-triangle-w"><</span></a><a href="javascript:timebar.lastTime();" class="mt20 calendar-btn calendar-btn-r"><span class="icon-triangle-e">></span></a><div class="calendar-day"><ul class="week  week-day " id="dul"><li id="dli1"><span>1</span><input type="hidden" value=""/></li><li id="dli2"><span>2</span><input type="hidden" value=""/></li><li id="dli3"><span>3</span><input type="hidden" value=""/></li><li class="duty-cur" id="dli4"><span>4</span><input type="hidden" value=""/></li><li id="dli5"><span>5</span><input type="hidden" value=""/></li><li id="dli6"><span>6</span><input type="hidden" value=""/></li><li id="dli7"><span>7</span><input type="hidden" value=""/></li></ul><ul class="week week-hd " id="weeks"><li id="wli1"><span></span><input type="hidden" value=""/></li><li id="wli2"><span></span><input type="hidden" value=""/></li><li id="wli3"><span></span><input type="hidden" value=""/></li><li id="wli4"><span></span><input type="hidden" value=""/></li><li id="wli5"><span></span><input type="hidden" value=""/></li><li id="wli6"><span></span><input type="hidden" value=""/></li><li id="wli7"><span></span><input type="hidden" value=""/></li></ul></div>`;
		$("#"+id).html(timeHtml);
		showTime();//初始化时间
		var distime = $("#dli1 input").val();
		changeTime(distime);//改变显示时间
		changeTimeStyle();//改变选中节点样式
		$("#dul li").click(function(){
			clickTime(this.id);
			clickTimes(this.id)
			if(evn){
				evn();
			}
		})
		$("#weeks li").click(function(){
			clickTime(this.id);
			clickTimes(this.id)
			if(evn){
				evn();
			}
		})
	}

	/*
	 * 时间显示
	 */
	 function showTime(){
 		var d = new Array(7);
 		//var now = new Date();
 		d[0] = now;
 		// d[2] = getLastDay(now);
 		d[1] = getNextDay(d[0]);
 		d[2] = getNextDay(d[1]);
 		d[3] = getNextDay(d[2]);
 		d[4] = getNextDay(d[3]);
 		d[5] = getNextDay(d[4]);
 		d[6] = getNextDay(d[5]);
 		setDataText(d);
 		changeTimeStyle();
 	}
	/*
	 * 通过时间给文本赋值
	 */
	function setDataText(d){
		for(var i=0;i<7;i++){
			var year = d[i].getYear() + 1900;
			var sunday = d[i].getDay();
			var month = d[i].getMonth()+1;
			var day = d[i].getDate();
			$("#wli"+(i+1)+ " span").html(getweek(sunday));//给星期文本复制
			$("#dli"+(i+1)+ " span").html(month+'/'+day);//给日期文本复制
			if(month < 10)
				month = "0" + month;
			if(day < 10)
				day = "0" + day;
			$("#dli"+(i+1)+ " input").val(year+"-"+month+"-"+day);//给隐藏日期赋值
			$("#wli"+(i+1)+ " input").val(year+"-"+month+"-"+day);//给隐藏日期赋值
			//周六周日边变红
			if(getweek(sunday)=="日" || getweek(sunday)=="六"){
				$("#wli"+(i+1)).css("color","red");
			}
			else{
				$("#wli"+(i+1)).css("color","#fff");
			}
		}
	}
	/*
	 * 设置显示日期
	 * return: 当前选择日期
	 */
	function getDisDate(){
		var time = $("#"+ this.id +" input").val();
		var t = time.split("-");
		if(t[1].length==1) t[1] = "0" + t[1];
		if(t[2].length==1) t[2] = "0" + t[2];
		return new Date(t[0],t[1]-1,t[2]);
	}
	/*
	 * 获取时间
	 */
	function clickTime(id){
		var ids = id.substring(3);
		$("#dul li").removeClass("duty-cur");
		$("#dli"+ids).addClass("duty-cur");
		var time = $("#dli"+ids +" input").val();
		changeTime(time);
		// setAjax(time);
	}
	function clickTimes(id){
		var ids = id.substring(3);
		$("#weeks li").removeClass("duty-cur");
		$("#wli"+ids).addClass("duty-cur");
		var time = $("#wli"+ids +" input").val();
		changeTime(time);
	}

	// function setAjax(time)(
	// 	$.ajax({
	// 	    type: "POST",
	// 	    url: "some.php",
	// 	    data: {date:time},
	// 	    success: function(msg){
	// 	     	alert( msg );
	// 	 	},
	// 		error(function(err) {
	// 			alert(err)
	// 		});
	// 	});
	// )
	/*
	 *改变选中显示时间
	 */
	function changeTime(time){
		var t = time.split("-");
		if(t[1].length==1)
			t[1] = "0" + t[1];
		if(t[2].length==1)
			t[2] = "0" + t[2];
		$(".calendar-year").html(t[0]+"年"+ t[1] +"月" + t[2] + "日");
	}
	/*
	 * 改变选中结点样式
	 */
	function changeTimeStyle(){
		$("#dul li").removeClass("duty-cur");
		$("#weeks li").removeClass("duty-cur");
		var time = $(".calendar-year").html();
		var y = time.substring(0,4);
		var m = time.substring(5,7);
		var d = time.substring(8,10);
		time = y + "-" + m + "-" + d;
		for(var i=0;i<7;i++){
			if($("#dli"+(i+1)+ " input").val() == time)
			$("#dli"+(i+1)).addClass("duty-cur");
				//
			if($("#wli"+(i+1)+ " input").val() == time)
			$('#wli'+(i+1)).addClass('duty-cur');

		}
	}
	/*
	 * 时间切换,向左滚动,后退（左箭头点击事件）
	 */
	function nextTime(){
		now = getLastDay(now);
		showTime();
	}
	/*
	 * 时间切换,向右滚动,前进（右箭头点击事件）
	 */
	function lastTime(){
		now = getNextDay(now);
		showTime();
	}
	/*
	 * 获取后一天的时间
	 */
	function getNextDay(d){
		d = new Date(d);
		d = + d + 1000 * 60 * 60 * 24;
		d = new Date(d);
		return d;
	}
	/*
	 * 获取前一天的时间
	 */
	function getLastDay(d){
		d = new Date(d);
		d = + d - 1000 * 60 * 60 *24;
		d=new Date(d);
		return d;
	}
	/*
	 * 获取星期
	 */
	function getweek(day){
		  var week = "";
		  switch(day){
			 case 0:week="周日";break;
			 case 1:week="周一";break;
			 case 2:week="周二";break;
			 case 3:week="周三";break;
			 case 4:week="周四";break;
			 case 5:week="周五";break;
			 case 6:week="周六";break;
		  }
		  return week;
	}

	$(".meet_date").on("touchstart", function(e) {
		e.preventDefault();  startX = e.originalEvent.changedTouches[0].pageX,
		startY = e.originalEvent.changedTouches[0].pageY;
	});
	$(".meet_date").on("touchmove", function(e) {
		e.preventDefault();  moveEndX = e.originalEvent.changedTouches[0].pageX,
		moveEndY = e.originalEvent.changedTouches[0].pageY,
		X = moveEndX - startX,  Y = moveEndY - startY;
		if ( X > 0 ) {
			alert("从左向右");
		}
		else if ( X < 0 ) {
			alert("从右向左");
		};
	})
}
