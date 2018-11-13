//var userId = null;
var sexType = null;
var myDate = new Date();
var yy = myDate.getFullYear(); 
var xx = yy-100;
var dtPicker=new mui.DtPicker({"type":"date","beginYear":xx,"endYear":yy});

//时间控件调用
function setDate(){
	dtPicker.show(function(rs) {
		
		$("#birth-text").val(rs.text);
	});
}

$(document).ready(function(){
	// 初始化微信端口
	Cain.getWeChatToken(['closeWindow'])
	.done(function(msg){
		wx.ready(function(){
			//init();
		});
		wx.error(function(){
		});
	})
	.fail(function(e){
	});
	
	//获取用户信息
	
	Cain.ajax({
        interfaceNo:2010019,
        data:{
        	wechatNo:Cain.getParam('openId') //'o6Xops8JvlD351vY-DBGKtBddmCM'
      	        
        },
        success:function (result) {
        	console.log(result)
        	if(result.header.errorCode == 'KEY_SUCCESS'){
        		var userBean = result.body.bean;            	
            	if(userBean.lastName && userBean.firstName){
            		$('#name-text').val(userBean.lastName + userBean.firstName);
            	}else{
            		if(userBean.name){
                		$('#name-text').val(userBean.name);
                	};
            	}
            	
            	if(userBean.birthDay){
            		$('#birth-text').val(userBean.birthDay);
            		dtPicker.setSelectedValue($('#birth-text').val());
            	}else{
            		dtPicker.setSelectedValue("1970-01-01");
            	};
            	if(userBean.mobilePhone){
            		$('#mobilePhone').val(userBean.mobilePhone);
            	};
            	if(userBean.address){
            		$('#adress-text').val(userBean.address);
            	}
            	if(userBean.sex == '1'){
            		sexType = $('#man-pic').attr('data-sex');
            		$('#man-icon').attr('src','images/elder-care/icon_ok.png');
            	};
            	if(userBean.sex == '2'){
            		sexType = $('#woman-pic').attr('data-sex');
            		$('#woman-icon').attr('src','images/elder-care/icon_ok.png');
            	};
        	}
        	
        	
        }
	});
	
	
	//获取验证码
	$('#getcodeBtn').click(function(){
	    Cain.ajax({
	        interfaceNo:20300101,
	        data:{
	        	employeeNo:$('#mobilePhone').val(),
	  	        
	  	        tenant:Cain.getParam('tenant'),
	  	        //tenant:'gh_8f73972fc777',
	  	   

	        },
	        success:function (result) {
	        	console.log(result)
	        	$('#getcodeBtn').val('60s').attr('disabled', 'disabled');
	        	 if (result.header.errorCode == 'KEY_SUCCESS') {
	          	  	            	
		              var t = setInterval(function () {
		                var s = $('#getcodeBtn').val();
		                s = s.substring(0, s.length - 1);
		                if (s == 0) {
		                  clearInterval(t);
		                  $('#getcodeBtn').val('获取验证码').removeAttr('disabled');
		                 
		                  return;
		                }
	
		                $('#getcodeBtn').val((parseInt(s) - 1) + 's');
		              }, 1000);
	           
		          }else if(result.header.errorCode == "VERIFY_TOO_FREQUENTLY"){
		        	  Cain.showToast({content: '请不要频繁验证!'});
		        	  return;
		          }

	        	},
	      });
	});
	//点击保存 先验证验证码 后提交到接口
	$('#submit-btn').click(function(){
		 Cain.ajax({
		        interfaceNo:20300102,
		        data:{
		        	phone:$('#mobilePhone').val(),
		        	verifyCode: $('#codeNumber').val(),
		  	        
		        },
		        success:function (result) {
		        	console.log(result)
		        	if(result.header.errorCode == 'KEY_SUCCESS'){
		        		if(!$('#name-text')){
		        			Cain.showToast({content: '请输入您的姓名!'});
		        			return;
		        		};
		        		if(!$('#mobilePhone')){
		        			Cain.showToast({content: '请输入您的手机号!'});
		        			return;
		        		};
		        		if(!$('#codeNumber')){
		        			Cain.showToast({content: '请输入验证码!'});
		        			return;
		        		};
		        		if($('#man-icon').attr('src') == 'images/elder-care/icon_no.png' && $('#woman-icon').attr('src') == 'images/elder-care/icon_no.png'){
		        			Cain.showToast({content: '请点击图像选择性别!'});
		        			return;
		        		}
		        		 //提交到保存接口
		        		Cain.ajax({
		        		        interfaceNo:2010020,
		        		        data:{
		        		        	name: $('#name-text').val(),
		        		        	wechatNo: Cain.getParam('openId'),
		        		            mobilePhone: $('#mobilePhone').val(),
		        		            sex: sexType,
		        		            birthday: $('#birth-text').val(),
		        		  	        address: $('#adress-text').val()

		        		        },
		        		        success:function (result) {
		        		        	//console.log(result);
		        		        	wx.closeWindow();

		        		         },
		        		   });
		        		
		        	}else{
		        		 Cain.showToast({content: '验证码错误，请重新输入！'});
		          	   	 return;
		        	}
		        	
		        }
		  });
		
		
	});
	
	//点击头像 选择性别
	$('.sexPic').click(function(){
		$('.img-sex-icon').attr('src','images/elder-care/icon_no.png');
		$(this).find('.img-sex-icon').attr('src','images/elder-care/icon_ok.png');
		sexType = $(this).attr('data-sex');
	})
	


});

