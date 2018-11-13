var examId = '';
var schema = '';
var count = 4;
var aviRange = '';
var apiRange = '';

$(document).ready(function () {
    Cain.i18n();

    examId = Cain.getUrlParam("examId");
    schema = Cain.getUrlParam("sign") || "lx";
    if (examId) {
        hhExamReports(examId, schema);
    } else {
        alert("请指定参数!");
    }
});
function hhExamReports(examId, schema) {
    Cain.ajax({
        interfaceNo: 310002,
        data: {
            examId: examId,
            schema: schema
        },
        success: function (result) {
            if (result.header.errorCode != "KEY_SUCCESS") {
                Cain.showAlertDialog({
                    content: $.i18n.prop('msg_system_error'),
                    centerBtnContent: $.i18n.prop('common-iKnow'),
                });
            } else {
                hhExamReportDetail(result.body);
                // 全部展开明细项目
                $(".js-item-header:visible").trigger("click");
            }
        }
    });
}
function hhExamReportDetail(body) {
    var examStartTime = body.examStartTime;
    if(body.userName){
    	$("title").html(body.userName + "的健康报告");
    } else {
    	$("title").text(examStartTime + "的健康报告");
    }
    //人体成分数据显示
    if (body.bmiBean.bmi != null) {
    	$("#rtcfArea").css("display","block");
        var bmiBean = body.bmiBean;
        $("#bmiValue").html(bmiBean.bmi);
        if (bmiBean.bmi >= 18.5 && bmiBean.bmi < 25) {
        	$("#arrowBMI").after('<div class="norm-icon norm-icon-normal left-side" style="float:right;">正常</div>');
        } else if (bmiBean.bmi >= 25) {
        	$("#arrowBMI").after('<div class="norm-icon norm-icon-height left-side" style="float:right;">偏高</div>');
        } else if (bmiBean.bmi < 18.5)  {
        	$("#arrowBMI").after('<div class="norm-icon norm-icon-low left-side" style="float:right;">偏低</div>');
        }

        $("#weight").html(bmiBean.weight);
        $("#height").html(bmiBean.height);
        $("#fatPercentage").html(bmiBean.fatPercentage);
        $("#muscleMass").html(bmiBean.muscleMass);
        $("#bodyBone").html(bmiBean.bodyBone);
        $("#bmiBodyResult").html("【" + bmiBean.result + "】" + bmiBean.advice);
        
        count--;
    }

    //骨密度数据显示
    if (body.bmdBean != null) {
    	$("#gmdArea").css("display","block");
        var bmdBean = body.bmdBean;
        if (parseFloat(bmdBean.tScore) > -1) {
        	$("#arrowTNUM").after('<div class="norm-icon norm-icon-normal left-side" style="float:right;">正常</div>');
        } else {
        	$("#arrowTNUM").after('<div class="norm-icon norm-icon-low left-side" style="float:right;">减少</div>');
        }
        if (parseFloat(bmdBean.zScore) > -2) {
        	$("#arrowZNUM").after('<div class="norm-icon norm-icon-normal left-side" style="float:right;">正常</div>');
        } else {
        	$("#arrowZNUM").after('<div class="norm-icon norm-icon-low left-side" style="float:right;">减少</div>');
        }

        $("#tScore").html(Number(bmdBean.tScore).toFixed(2));
        $("#zScore").html(Number(bmdBean.zScore).toFixed(2));
        var youngAdult = $.isNumeric(bmdBean.youngAdult) ? Number(bmdBean.youngAdult).toFixed(1) : "100";
        var ageMatched = $.isNumeric(bmdBean.ageMatched) ? Number(bmdBean.ageMatched).toFixed(1) : "100";
        $("#youngAdult").html(youngAdult);
        $("#ageMatched").html(ageMatched);
        $("#bmdResult").html("【" + bmdBean.result + "】" + bmdBean.advice);

        count--;
    }
    //血压度数据显示
    if (body.bpBean.sbp != null) {
    	$("#xyArea").css("display","block");
        var bpBean = body.bpBean;
        $("#dpValue").html(bpBean.dbp);
        if (bpBean.dbp >= 60 && bpBean.dbp <= 90) {
        	$("#arrowDBP").after('<div class="norm-icon norm-icon-normal left-side" style="float:right;">正常</div>');
        } else if (bpBean.dbp > 90) {
        	$("#arrowDBP").after('<div class="norm-icon norm-icon-height left-side" style="float:right;">偏高</div>');
        } else if (bpBean.dbp < 60)  {
        	$("#arrowDBP").after('<div class="norm-icon norm-icon-low left-side" style="float:right;">偏低</div>');
        }
        $("#spValue").html(bpBean.sbp);
        if (bpBean.sbp >= 90 && bpBean.sbp <= 140) {
        	$("#arrowSBP").after('<div class="norm-icon norm-icon-normal left-side" style="float:right;">正常</div>');
        } else if (bpBean.sbp > 140) {
        	$("#arrowSBP").after('<div class="norm-icon norm-icon-height left-side" style="float:right;">偏高</div>');
        } else if (bpBean.sbp < 90)  {
        	$("#arrowSBP").after('<div class="norm-icon norm-icon-low left-side" style="float:right;">偏低</div>');
        }

        $("#hrValue").html(bpBean.heartRate);
        if (bpBean.heartRate >= 60 && bpBean.heartRate <= 100) {
        	$("#arrowHR").after('<div class="norm-icon norm-icon-normal left-side" style="float:right;">正常</div>');
        } else if (bpBean.heartRate > 100) {
        	$("#arrowHR").after('<div class="norm-icon norm-icon-height left-side" style="float:right;">偏高</div>');
        } else if (bpBean.heartRate < 60)  {
        	$("#arrowHR").after('<div class="norm-icon norm-icon-low left-side" style="float:right;">偏低</div>');
        }
        $("#bloodPressureResult").html("【" + bpBean.result + "】" + bpBean.advice);

        count--;
    }
    //血糖数据显示
    if (body.gluBean.bloodSugar != null) {
    	$("#xtArea").css("display","block");
        var gluBean = body.gluBean;
        $("#fpgValue").html(gluBean.bloodSugar);
        $("#lblIntervalName").text(gluBean.timeInterval || '餐前');	//餐前/餐后血糖
        if (gluBean.bloodSugar >= 3.9 && gluBean.bloodSugar <= 6.1) {
        	$("#arrowFPG").after('<div class="norm-icon norm-icon-normal left-side" style="float:right;">正常</div>');
        } else if (gluBean.bloodSugar > 6.1) {
        	$("#arrowFPG").after('<div class="norm-icon norm-icon-height left-side" style="float:right;">偏高</div>');
        } else if (gluBean.bloodSugar < 3.9)  {
        	$("#arrowFPG").after('<div class="norm-icon norm-icon-low left-side" style="float:right;">偏低</div>');
        }

        $("#bloodGlucoseResult").html("【" + gluBean.result + "】" + gluBean.advice);

        count--;
    }
    // 动脉硬化仪数据显示
    if (body.artBean.sbp != null) {
    	$("#dmArea").css("display","block");
        var artBean = body.artBean;
        $("#dmdpValue").html(artBean.dbp);
        if (artBean.dbp >= 60 && artBean.dbp <= 90) {
        	$("#dmarrowDBP").after('<div class="norm-icon norm-icon-normal left-side" style="float:right;">正常</div>');
        } else if (artBean.dbp > 90) {
        	$("#dmarrowDBP").after('<div class="norm-icon norm-icon-height left-side" style="float:right;">偏高</div>');
        } else if (artBean.dbp < 60)  {
        	$("#dmarrowDBP").after('<div class="norm-icon norm-icon-low left-side" style="float:right;">偏低</div>');
        }
        $("#dmspValue").html(artBean.sbp);
        if (artBean.sbp >= 90 && artBean.sbp <= 140) {
        	$("#dmarrowSBP").after('<div class="norm-icon norm-icon-normal left-side" style="float:right;">正常</div>');
        } else if (artBean.sbp > 140) {
        	$("#dmarrowSBP").after('<div class="norm-icon norm-icon-height left-side" style="float:right;">偏高</div>');
        } else if (artBean.sbp < 90)  {
        	$("#dmarrowSBP").after('<div class="norm-icon norm-icon-low left-side" style="float:right;">偏低</div>');
        }

        $("#dmhrValue").html(artBean.heartRate);
        if (artBean.heartRate >= 60 && artBean.heartRate <= 100) {
        	$("#dmarrowHR").after('<div class="norm-icon norm-icon-normal left-side" style="float:right;">正常</div>');
        } else if (artBean.heartRate > 100) {
        	$("#dmarrowHR").after('<div class="norm-icon norm-icon-height left-side" style="float:right;">偏高</div>');
        } else if (artBean.heartRate < 60)  {
        	$("#dmarrowHR").after('<div class="norm-icon norm-icon-low left-side" style="float:right;">偏低</div>');
        }
        
        $("#dmcsbpValue").html(artBean.csbp);
        if (artBean.csbp <= 130) {
        	$("#dmarrowCSBP").after('<div class="norm-icon norm-icon-normal left-side" style="float:right;">正常</div>');
        } else if (artBean.csbp > 130)  {
        	$("#dmarrowCSBP").after('<div class="norm-icon norm-icon-abnormal left-side" style="float:right;">异常</div>');
        }
        
        $("#dmcappValue").html(artBean.capp);
        if (artBean.capp >= 20 && artBean.capp <= 60) {
        	$("#dmarrowCAPP").after('<div class="norm-icon norm-icon-normal left-side" style="float:right;">正常</div>');
        } else if (artBean.capp > 60) {
        	$("#dmarrowCAPP").after('<div class="norm-icon norm-icon-height left-side" style="float:right;">偏高</div>');
        } else if (artBean.capp < 20)  {
        	$("#dmarrowCAPP").after('<div class="norm-icon norm-icon-low left-side" style="float:right;">偏低</div>');
        }
        
        $("#dmaviValue").html(artBean.avi);
        aviRange = artBean.aviRange;
        var aviRangeList = artBean.aviRange.split(",");
        var aviRange1 = parseFloat(aviRangeList[0]);
        var aviRange2 = parseFloat(aviRangeList[1]);
        var aviRange3 = parseFloat(aviRangeList[2]);
        $("#rangeAVI1").html(aviRange1);
        $("#rangeAVI2").html(aviRange2);
        $("#rangeAVI3").html(aviRange3);
        if (artBean.avi > aviRange1) {
        	$("#dmarrowAVI").after('<div class="norm-icon norm-icon-height left-side" style="float:right;">偏高</div>');
        } else if (artBean.avi <= aviRange1) {
        	$("#dmarrowAVI").after('<div class="norm-icon norm-icon-normal left-side" style="float:right;">正常</div>');
        }
        
        $("#dmapiValue").html(artBean.api);
        apiRange = artBean.apiRange;
        var apiRangeList = artBean.apiRange.split(",");
        var apiRange1 = parseFloat(apiRangeList[0]);
        var apiRange2 = parseFloat(apiRangeList[1]);
        var apiRange3 = parseFloat(apiRangeList[2]);
        $("#rangeAPI1").html(apiRange1);
        $("#rangeAPI2").html(apiRange2);
        $("#rangeAPI3").html(apiRange3);
        if (artBean.api > apiRange1) {
        	$("#dmarrowAPI").after('<div class="norm-icon norm-icon-height left-side" style="float:right;">偏高</div>');
        } else if (artBean.api <= apiRange1) {
        	$("#dmarrowAPI").after('<div class="norm-icon norm-icon-normal left-side" style="float:right;">正常</div>');
        }
        
        $("#dmbloodPressureResult").html("【" + artBean.arteriosusResult + "】" + artBean.arteriosusAdvice);

        count--;
    }

}

/**
 * 显示弃检对话框
 */
function showPoint() {
    var msg = '您的本次体检剩余' + count + '个项目未检,请确认是否弃检？';
    Cain.showConfirmDialog({
        content: msg,
        leftBtnContent: '取消',
        leftBtnCallBack: function () {
            Cain.closeDialog();
        },
        rightBtnContent: '弃检',
        rightBtnCallBack: function () {
            affirm();
            Cain.closeDialog();
        }
    });
}

function affirm() {
    Cain.ajax({
        interfaceNo: 310003,
        data: {
            examId: examId,
            schema: schema
        },
        success: function (result) {
            if (result.header.errorCode != "KEY_SUCCESS") {
                Cain.showAlertDialog({
                    content: "操作失败，请重试！",
                    centerBtnContent: $.i18n.prop('common-iKnow'),
                });
            } else {
                var showPoint = document.getElementById("showPoint");
                showPoint.style.display = "none";
            }
        }
    });
}


//人体成分-BMI
function moveBMI(){
	$(".fa-chevron-up").addClass("fa-chevron-down");
	$(".fa-chevron-down").removeClass("fa-chevron-up");
	var dataValue = $("#bmiValue").html();
	if(dataValue != ""){
		dataValue = parseFloat(dataValue);
	}
	$("#tagTextBMI").html(dataValue);
	var dataRange = "0,18.5,25,28,32,100"
	var rangeList = dataRange.split(",");
	for (var i = 0;i < rangeList.length ; i++)
	{
		if(dataValue > rangeList[i]){
			continue;
		} else {
			var length = (i-1)/(rangeList.length-1)*100 + (dataValue - rangeList[i-1])/(rangeList[i] - rangeList[i-1])*100/(rangeList.length-1);
			if($(".tagLiBMI").hasClass("barMove")){
				console.log("打开")
				$(".tagLiBMI").removeClass("barMove");
				$("#tagBMI").animate({left:'-5%'});
				$("#arrowBMI").removeClass("fa-chevron-up");
				$("#arrowBMI").addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLiBMI").addClass("barMove");
				console.log(length/100*$("#rtcf").width()*0.9-20)
				$("#tagBMI").animate({left:length/100*$("#rtcf").width()*0.9-20+'px'});
				$("#arrowBMI").removeClass("fa-chevron-down");
				$("#arrowBMI").addClass("fa-chevron-up");
			}
			return;
		}
	}
}
// 骨密度-T值
function moveGMDT(){
	$(".fa-chevron-up").addClass("fa-chevron-down");
	$(".fa-chevron-down").removeClass("fa-chevron-up");
	var dataValue=$("#tScore").html();
	if(dataValue != ""){
		dataValue = parseFloat(dataValue);
	}
	$("#tagTextTNUM").html(dataValue);
	if(dataValue > -1){
		if($(".tagLiTNUM").hasClass("barMove")){
			console.log("打开")
			$(".tagLiTNUM").removeClass("barMove");
			$("#tagTNUM").animate({left:'-5%'});
			$("#arrowTNUM").removeClass("fa-chevron-up");
			$("#arrowTNUM").addClass("fa-chevron-down");
		} else {
			$(".submenu").css("display","none");
			$(".barMove").removeClass("barMove");
			$(".tag").animate({left:'-5%'});
			console.log("关闭")
			$(".tagLiTNUM").addClass("barMove");
			$("#tagTNUM").animate({left:$("#gmd").width()*0.9*0.16-20+'px'});
			$("#arrowTNUM").removeClass("fa-chevron-down");
			$("#arrowTNUM").addClass("fa-chevron-up");
		}
	} else if(dataValue == -1){
		if($(".tagLi"+domIndex).hasClass("barMove")){
			console.log("打开")
			$(".tagLiTNUM").removeClass("barMove");
			$("#tagTNUM").animate({left:'-5%'});
			$("#arrowTNUM").removeClass("fa-chevron-up");
			$("#arrowTNUM").addClass("fa-chevron-down");
		} else {
			$(".submenu").css("display","none");
			$(".barMove").removeClass("barMove");
			$(".tag").animate({left:'-5%'});
			console.log("关闭")
			$(".tagLiTNUM").addClass("barMove");
			$("#tagTNUM").animate({left:$("#gmd").width()*0.9*0.33-20+'px'});
			$("#arrowTNUM").removeClass("fa-chevron-down");
			$("#arrowTNUM").addClass("fa-chevron-up");
		}
	} else if(dataValue < -1 &&　dataValue > -2.5){
		if($(".tagLiTNUM").hasClass("barMove")){
			console.log("打开")
			$(".tagLiTNUM").removeClass("barMove");
			$("#tagTNUM").animate({left:'-5%'});
			$("#arrowTNUM").removeClass("fa-chevron-up");
			$("#arrowTNUM").addClass("fa-chevron-down");
		} else {
			$(".submenu").css("display","none");
			$(".barMove").removeClass("barMove");
			$(".tag").animate({left:'-5%'});
			console.log("关闭")
			var changeValue = 0
			changeValue = -1 * dataValue;
			$(".tagLiTNUM").addClass("barMove");
			$("#tagTNUM").animate({left:$("#gmd").width()*0.9*0.33 + $("#gmd").width()*0.9*0.34*(changeValue-1)/1.5-20+'px'});
			$("#arrowTNUM").removeClass("fa-chevron-down");
			$("#arrowTNUM").addClass("fa-chevron-up");
		}
	} else if(dataValue == -2.5){
		if($(".tagLiTNUM").hasClass("barMove")){
			console.log("打开")
			$(".tagLiTNUM").removeClass("barMove");
			$("#tagTNUM").animate({left:'-5%'});
			$("#arrowTNUM").removeClass("fa-chevron-up");
			$("#arrowTNUM").addClass("fa-chevron-down");
		} else {
			$(".submenu").css("display","none");
			$(".barMove").removeClass("barMove");
			$(".tag").animate({left:'-5%'});
			console.log("关闭")
			$(".tagLiTNUM").addClass("barMove");
			$("#tagTNUM").animate({left:$("#gmd").width()*0.9*0.67-20+'px'});
			$("#arrowTNUM").removeClass("fa-chevron-down");
			$("#arrowTNUM").addClass("fa-chevron-up");
		}
	} else if(dataValue < -2.5){
		if($(".tagLiTNUM").hasClass("barMove")){
			console.log("打开")
			$(".tagLiTNUM").removeClass("barMove");
			$("#tagTNUM").animate({left:'-5%'});
			$("#arrowTNUM").removeClass("fa-chevron-up");
			$("#arrowTNUM").addClass("fa-chevron-down");
		} else {
			$(".submenu").css("display","none");
			$(".barMove").removeClass("barMove");
			$(".tag").animate({left:'-5%'});
			console.log("关闭")
			$(".tagLiTNUM").addClass("barMove")
			$("#tagTNUM").animate({left:$("#gmd").width()*0.9*0.84-20+'px'});
			$("#arrowTNUM").removeClass("fa-chevron-down");
			$("#arrowTNUM").addClass("fa-chevron-up");
		}
	}
}
//骨密度-Z值
function moveGMDZ(){
	$(".fa-chevron-up").addClass("fa-chevron-down");
	$(".fa-chevron-down").removeClass("fa-chevron-up");
	var dataValue=$("#zScore").html();
	if(dataValue != ""){
		dataValue = parseFloat(dataValue);
	}
	var domIndex = "ZNUM";
	$("#tagText"+domIndex).html(dataValue);
	var dataRange = "-2"
	var rangeList = dataRange.split(",");
	if(dataRange!= null && dataRange!=""){
		var rangeList = dataRange.split(",");
		if(dataValue < rangeList[0]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#tag"+domIndex).animate({left:'-5%'});
				$("#arrow"+domIndex).removeClass("fa-chevron-up");
				$("#arrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#tag"+domIndex).animate({left:$("#gmd").width()*0.9*0.75-20+'px'});
				$("#arrow"+domIndex).removeClass("fa-chevron-down");
				$("#arrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue == rangeList[0]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#tag"+domIndex).animate({left:'-5%'});
				$("#arrow"+domIndex).removeClass("fa-chevron-up");
				$("#arrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#tag"+domIndex).animate({left:$("#gmd").width()*0.9*0.50-20+'px'});
				$("#arrow"+domIndex).removeClass("fa-chevron-down");
				$("#arrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue > rangeList[0]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#tag"+domIndex).animate({left:'-5%'});
				$("#arrow"+domIndex).removeClass("fa-chevron-up");
				$("#arrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#tag"+domIndex).animate({left:$("#gmd").width()*0.9*0.25-20+'px'});
				$("#arrow"+domIndex).removeClass("fa-chevron-down");
				$("#arrow"+domIndex).addClass("fa-chevron-up");
			}
		}
	}
}

// 血压-舒张压
function moveDBP(){
	$(".fa-chevron-up").addClass("fa-chevron-down");
	$(".fa-chevron-down").removeClass("fa-chevron-up");
	var dataValue=$("#dpValue").html();
	if(dataValue != ""){
		dataValue = parseFloat(dataValue);
	}
	var domIndex = "DBP";
	$("#tagText"+domIndex).html(dataValue);
	var dataRange = "0,60,90,100,110,120";
	var rangeList = dataRange.split(",");
	for (var i = 0;i < rangeList.length ; i++)
	{
		if(dataValue > rangeList[i]){
			continue;
		} else {
			var length = (i-1)/(rangeList.length-1)*100 + (dataValue - rangeList[i-1])/(rangeList[i] - rangeList[i-1])*100/(rangeList.length-1);
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#tag"+domIndex).animate({left:'-5%'});
				$("#arrow"+domIndex).removeClass("fa-chevron-up");
				$("#arrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				console.log(length/100*$("#xy").width()*0.9-20)
				$("#tag"+domIndex).animate({left:length/100*$("#xy").width()*0.9-20+'px'});
				$("#arrow"+domIndex).removeClass("fa-chevron-down");
				$("#arrow"+domIndex).addClass("fa-chevron-up");
			}
			return;
		}
	}
}

//血压-收缩压
function moveSBP(){
	$(".fa-chevron-up").addClass("fa-chevron-down");
	$(".fa-chevron-down").removeClass("fa-chevron-up");
	var dataValue=$("#spValue").html();
	if(dataValue != ""){
		dataValue = parseFloat(dataValue);
	}
	var domIndex = "SBP";
	$("#tagText"+domIndex).html(dataValue);
	var dataRange = "0,90,140,160,180,220";
	var rangeList = dataRange.split(",");
	for (var i = 0;i < rangeList.length ; i++)
	{
		if(dataValue > rangeList[i]){
			continue;
		} else {
			var length = (i-1)/(rangeList.length-1)*100 + (dataValue - rangeList[i-1])/(rangeList[i] - rangeList[i-1])*100/(rangeList.length-1);
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#tag"+domIndex).animate({left:'-5%'});
				$("#arrow"+domIndex).removeClass("fa-chevron-up");
				$("#arrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				console.log(length/100*$("#xy").width()*0.9-20)
				$("#tag"+domIndex).animate({left:length/100*$("#xy").width()*0.9-20+'px'});
				$("#arrow"+domIndex).removeClass("fa-chevron-down");
				$("#arrow"+domIndex).addClass("fa-chevron-up");
			}
			return;
		}
	}
}

// 血压-心率
function moveHR(){
	$(".fa-chevron-up").addClass("fa-chevron-down");
	$(".fa-chevron-down").removeClass("fa-chevron-up");
	var dataValue=$("#hrValue").html();
	if(dataValue != ""){
		dataValue = parseFloat(dataValue);
	}
	var domIndex = "HR";
	$("#tagText"+domIndex).html(dataValue);
	var dataRange = "60,90";
	var rangeList = dataRange.split(",");
	if(dataRange!= null && dataRange!=""){
		var rangeList = dataRange.split(",");
		if(dataValue < rangeList[0]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#tag"+domIndex).animate({left:'-5%'});
				$("#arrow"+domIndex).removeClass("fa-chevron-up");
				$("#arrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#tag"+domIndex).animate({left:$("#xy").width()*0.9*0.17-20+'px'});
				$("#arrow"+domIndex).removeClass("fa-chevron-down");
				$("#arrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue == rangeList[0]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#tag"+domIndex).animate({left:'-5%'});
				$("#arrow"+domIndex).removeClass("fa-chevron-up");
				$("#arrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#tag"+domIndex).animate({left:$("#xy").width()*0.9*0.33-20+'px'});
				$("#arrow"+domIndex).removeClass("fa-chevron-down");
				$("#arrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue > rangeList[0] && dataValue < rangeList[1]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#tag"+domIndex).animate({left:'-5%'});
				$("#arrow"+domIndex).removeClass("fa-chevron-up");
				$("#arrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#tag"+domIndex).animate({left:$("#xy").width()*0.9*0.33 + $("#xy").width()*0.9*0.34*(dataValue-rangeList[0])/(rangeList[1]-rangeList[0])-20+'px'});
				$("#arrow"+domIndex).removeClass("fa-chevron-down");
				$("#arrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue == rangeList[1]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#tag"+domIndex).animate({left:'-5%'});
				$("#arrow"+domIndex).removeClass("fa-chevron-up");
				$("#arrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#tag"+domIndex).animate({left:$("#xy").width()*0.9*0.67-20+'px'});
				$("#arrow"+domIndex).removeClass("fa-chevron-down");
				$("#arrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue > rangeList[1]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#tag"+domIndex).animate({left:'-5%'});
				$("#arrow"+domIndex).removeClass("fa-chevron-up");
				$("#arrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#tag"+domIndex).animate({left:$("#xy").width()*0.9*0.84-20+'px'});
				$("#arrow"+domIndex).removeClass("fa-chevron-down");
				$("#arrow"+domIndex).addClass("fa-chevron-up");
			}
		}
	}
}

// 血糖
function moveFPG(){
	$(".fa-chevron-up").addClass("fa-chevron-down");
	$(".fa-chevron-down").removeClass("fa-chevron-up");
	var dataValue=$("#fpgValue").html();
	if(dataValue != ""){
		dataValue = parseFloat(dataValue);
	}
	var domIndex = "FPG";
	$("#tagText"+domIndex).html(dataValue);
	var dataRange = "3.9,6.1";
	var rangeList = dataRange.split(",");
	if(dataValue < rangeList[0]){
		if($(".tagLi"+domIndex).hasClass("barMove")){
			console.log("打开")
			$(".tagLi"+domIndex).removeClass("barMove");
			$("#tag"+domIndex).animate({left:'-5%'});
			$("#arrow"+domIndex).removeClass("fa-chevron-up");
			$("#arrow"+domIndex).addClass("fa-chevron-down");
		} else {
			$(".submenu").css("display","none");
			$(".barMove").removeClass("barMove");
			$(".tag").animate({left:'-5%'});
			console.log("关闭")
			$(".tagLi"+domIndex).addClass("barMove");
			$("#tag"+domIndex).animate({left:$("#xt").width()*0.9*0.17-20+'px'});
			$("#arrow"+domIndex).removeClass("fa-chevron-down");
			$("#arrow"+domIndex).addClass("fa-chevron-up");
		}
	} else if (dataValue == rangeList[0]){
		if($(".tagLi"+domIndex).hasClass("barMove")){
			console.log("打开")
			$(".tagLi"+domIndex).removeClass("barMove");
			$("#tag"+domIndex).animate({left:'-5%'});
			$("#arrow"+domIndex).removeClass("fa-chevron-up");
			$("#arrow"+domIndex).addClass("fa-chevron-down");
		} else {
			$(".submenu").css("display","none");
			$(".barMove").removeClass("barMove");
			$(".tag").animate({left:'-5%'});
			console.log("关闭")
			$(".tagLi"+domIndex).addClass("barMove");
			$("#tag"+domIndex).animate({left:$("#xt").width()*0.9*0.33-20+'px'});
			$("#arrow"+domIndex).removeClass("fa-chevron-down");
			$("#arrow"+domIndex).addClass("fa-chevron-up");
		}
	} else if (dataValue > rangeList[0] && dataValue < rangeList[1]){
		if($(".tagLi"+domIndex).hasClass("barMove")){
			console.log("打开")
			$(".tagLi"+domIndex).removeClass("barMove");
			$("#tag"+domIndex).animate({left:'-5%'});
			$("#arrow"+domIndex).removeClass("fa-chevron-up");
			$("#arrow"+domIndex).addClass("fa-chevron-down");
		} else {
			$(".submenu").css("display","none");
			$(".barMove").removeClass("barMove");
			$(".tag").animate({left:'-5%'});
			console.log("关闭")
			$(".tagLi"+domIndex).addClass("barMove");
			$("#tag"+domIndex).animate({left:$("#xt").width()*0.9*0.33 + $("#xt").width()*0.9*0.34*(dataValue-rangeList[0])/(rangeList[1]-rangeList[0])-20+'px'});
			$("#arrow"+domIndex).removeClass("fa-chevron-down");
			$("#arrow"+domIndex).addClass("fa-chevron-up");
		}
	} else if (dataValue == rangeList[1]){
		if($(".tagLi"+domIndex).hasClass("barMove")){
			console.log("打开")
			$(".tagLi"+domIndex).removeClass("barMove");
			$("#tag"+domIndex).animate({left:'-5%'});
			$("#arrow"+domIndex).removeClass("fa-chevron-up");
			$("#arrow"+domIndex).addClass("fa-chevron-down");
		} else {
			$(".submenu").css("display","none");
			$(".barMove").removeClass("barMove");
			$(".tag").animate({left:'-5%'});
			console.log("关闭")
			$(".tagLi"+domIndex).addClass("barMove");
			$("#tag"+domIndex).animate({left:$("#xt").width()*0.9*0.67-20+'px'});
			$("#arrow"+domIndex).removeClass("fa-chevron-down");
			$("#arrow"+domIndex).addClass("fa-chevron-up");
		}
	} else if (dataValue > rangeList[1]){
		if($(".tagLi"+domIndex).hasClass("barMove")){
			console.log("打开")
			$(".tagLi"+domIndex).removeClass("barMove");
			$("#tag"+domIndex).animate({left:'-5%'});
			$("#arrow"+domIndex).removeClass("fa-chevron-up");
			$("#arrow"+domIndex).addClass("fa-chevron-down");
		} else {
			$(".submenu").css("display","none");
			$(".barMove").removeClass("barMove");
			$(".tag").animate({left:'-5%'});
			console.log("关闭")
			$(".tagLi"+domIndex).addClass("barMove");
			$("#tag"+domIndex).animate({left:$("#xt").width()*0.9*0.84-20+'px'});
			$("#arrow"+domIndex).removeClass("fa-chevron-down");
			$("#arrow"+domIndex).addClass("fa-chevron-up");
		}
	}
}

//动脉硬化-舒张压
function dmmoveDBP(){
	$(".fa-chevron-up").addClass("fa-chevron-down");
	$(".fa-chevron-down").removeClass("fa-chevron-up");
	var dataValue=$("#dmdpValue").html();
	if(dataValue != ""){
		dataValue = parseFloat(dataValue);
	}
	var domIndex = "DBP";
	$("#dmtagText"+domIndex).html(dataValue);
	var dataRange = "0,60,90,100,110,120";
	var rangeList = dataRange.split(",");
	for (var i = 0;i < rangeList.length ; i++)
	{
		if(dataValue > rangeList[i]){
			continue;
		} else {
			var length = (i-1)/(rangeList.length-1)*100 + (dataValue - rangeList[i-1])/(rangeList[i] - rangeList[i-1])*100/(rangeList.length-1);
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				console.log(length/100*$("#dm").width()*0.9-20)
				$("#dmtag"+domIndex).animate({left:length/100*$("#dm").width()*0.9-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
			return;
		}
	}
}

//动脉硬化-收缩压
function dmmoveSBP(){
	$(".fa-chevron-up").addClass("fa-chevron-down");
	$(".fa-chevron-down").removeClass("fa-chevron-up");
	var dataValue=$("#dmspValue").html();
	if(dataValue != ""){
		dataValue = parseFloat(dataValue);
	}
	var domIndex = "SBP";
	$("#dmtagText"+domIndex).html(dataValue);
	var dataRange = "0,90,140,160,180,220";
	var rangeList = dataRange.split(",");
	for (var i = 0;i < rangeList.length ; i++)
	{
		if(dataValue > rangeList[i]){
			continue;
		} else {
			var length = (i-1)/(rangeList.length-1)*100 + (dataValue - rangeList[i-1])/(rangeList[i] - rangeList[i-1])*100/(rangeList.length-1);
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				console.log(length/100*$("#dm").width()*0.9-20)
				$("#dmtag"+domIndex).animate({left:length/100*$("#dm").width()*0.9-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
			return;
		}
	}
}

// 动脉硬化-心率
function dmmoveHR(){
	$(".fa-chevron-up").addClass("fa-chevron-down");
	$(".fa-chevron-down").removeClass("fa-chevron-up");
	var dataValue=$("#dmhrValue").html();
	if(dataValue != ""){
		dataValue = parseFloat(dataValue);
	}
	var domIndex = "HR";
	$("#dmtagText"+domIndex).html(dataValue);
	var dataRange = "60,90";
	var rangeList = dataRange.split(",");
	if(dataRange!= null && dataRange!=""){
		var rangeList = dataRange.split(",");
		if(dataValue < rangeList[0]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.17-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue == rangeList[0]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.33-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue > rangeList[0] && dataValue < rangeList[1]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.33 + $("#dm").width()*0.9*0.34*(dataValue-rangeList[0])/(rangeList[1]-rangeList[0])-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue == rangeList[1]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.67-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue > rangeList[1]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.84-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		}
	}
}

//动脉硬化-中心动脉血压值（CSBP）
function dmmoveCSBP(){
	$(".fa-chevron-up").addClass("fa-chevron-down");
	$(".fa-chevron-down").removeClass("fa-chevron-up");
	var dataValue=$("#dmcsbpValue").html();
	if(dataValue != ""){
		dataValue = parseFloat(dataValue);
	}
	var domIndex = "CSBP";
	$("#dmtagText"+domIndex).html(dataValue);
	var dataRange = "-2"
	var rangeList = dataRange.split(",");
	if(dataRange!= null && dataRange!=""){
		var rangeList = dataRange.split(",");
		if(dataValue < rangeList[0]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.75-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue == rangeList[0]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.50-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue > rangeList[0]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.25-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		}
	}
}

//动脉硬化-中心动脉脉压值（CAPP）
function dmmoveCAPP(){
	$(".fa-chevron-up").addClass("fa-chevron-down");
	$(".fa-chevron-down").removeClass("fa-chevron-up");
	var dataValue=$("#dmcappValue").html();
	if(dataValue != ""){
		dataValue = parseFloat(dataValue);
	}
	var domIndex = "CAPP";
	$("#dmtagText"+domIndex).html(dataValue);
	var dataRange = "20,60";
	var rangeList = dataRange.split(",");
	if(dataRange!= null && dataRange!=""){
		var rangeList = dataRange.split(",");
		if(dataValue < rangeList[0]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.17-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue == rangeList[0]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.33-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue > rangeList[0] && dataValue < rangeList[1]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.33 + $("#dm").width()*0.9*0.34*(dataValue-rangeList[0])/(rangeList[1]-rangeList[0])-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue == rangeList[1]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.67-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue > rangeList[1]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.84-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		}
	}
}

//动脉硬化-中心动脉硬度指标（AVI）
function dmmoveAVI(){
	$(".fa-chevron-up").addClass("fa-chevron-down");
	$(".fa-chevron-down").removeClass("fa-chevron-up");
	var dataValue=$("#dmaviValue").html();
	if(dataValue != ""){
		dataValue = parseFloat(dataValue);
	}
	var domIndex = "AVI";
	$("#dmtagText"+domIndex).html(dataValue);
	var dataRange = aviRange;
	var rangeList = dataRange.split(",");
	if(dataRange!= null && dataRange!=""){
		var rangeList = dataRange.split(",");
		if(dataValue <= rangeList[0]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.13-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue > rangeList[0] && dataValue <= rangeList[1]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.38-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue > rangeList[1] && dataValue <= rangeList[2]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.63-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue > rangeList[2]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.88-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		}
	}
}

//动脉硬化-中心动脉硬度指标（AVI）
function dmmoveAVI(){
	$(".fa-chevron-up").addClass("fa-chevron-down");
	$(".fa-chevron-down").removeClass("fa-chevron-up");
	var dataValue=$("#dmaviValue").html();
	if(dataValue != ""){
		dataValue = parseFloat(dataValue);
	}
	var domIndex = "AVI";
	$("#dmtagText"+domIndex).html(dataValue);
	var dataRange = aviRange;
	var rangeList = dataRange.split(",");
	if(dataRange!= null && dataRange!=""){
		var rangeList = dataRange.split(",");
		if(dataValue <= rangeList[0]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.13-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue > rangeList[0] && dataValue <= rangeList[1]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.38-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue > rangeList[1] && dataValue <= rangeList[2]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.63-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue > rangeList[2]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.88-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		}
	}
}

//动脉硬化-上臂动脉硬度指标（API）
function dmmoveAPI(){
	$(".fa-chevron-up").addClass("fa-chevron-down");
	$(".fa-chevron-down").removeClass("fa-chevron-up");
	var dataValue=$("#dmapiValue").html();
	if(dataValue != ""){
		dataValue = parseFloat(dataValue);
	}
	var domIndex = "API";
	$("#dmtagText"+domIndex).html(dataValue);
	var dataRange = apiRange;
	var rangeList = dataRange.split(",");
	if(dataRange!= null && dataRange!=""){
		var rangeList = dataRange.split(",");
		if(dataValue <= rangeList[0]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.13-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue > rangeList[0] && dataValue <= rangeList[1]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.38-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue > rangeList[1] && dataValue <= rangeList[2]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.63-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		} else if (dataValue > rangeList[2]){
			if($(".tagLi"+domIndex).hasClass("barMove")){
				console.log("打开")
				$(".tagLi"+domIndex).removeClass("barMove");
				$("#dmtag"+domIndex).animate({left:'-5%'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-up");
				$("#dmarrow"+domIndex).addClass("fa-chevron-down");
			} else {
				$(".submenu").css("display","none");
				$(".barMove").removeClass("barMove");
				$(".tag").animate({left:'-5%'});
				console.log("关闭")
				$(".tagLi"+domIndex).addClass("barMove");
				$("#dmtag"+domIndex).animate({left:$("#dm").width()*0.9*0.88-20+'px'});
				$("#dmarrow"+domIndex).removeClass("fa-chevron-down");
				$("#dmarrow"+domIndex).addClass("fa-chevron-up");
			}
		}
	}
}

$(function() {
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables privadas
		var links = this.el.find('.link');
		// Evento
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		};
	}	

	new Accordion($('#rtcf'), false);
	new Accordion($('#gmd'), false);
	new Accordion($('#xy'), false);
	new Accordion($('#xt'), false);
	new Accordion($('#dm'), false);
});