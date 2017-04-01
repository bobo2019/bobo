// 系统友情提示充值
(function(){
    var callback = function(p){
        var html = "<div style=\"padding: 4%;\" onclick=\"pay()\">"+
        "<div style=\"color: red;font-size: 16px; width:15%; float:left;\"><img src=\"/h5/img/laba.png\" style=\"width:80%\" /></div>"+
        "<div style=\"color: #330;font-size: 16px; width:80%; float:left;padding-bottom:3%\">老司机版块现已上线了：原价<b style=\"color:red\">98</b>元永久会员，现仅需<b style=\"color:red\">"+p+"</b>元！更有机会获得限量版充气娃娃，您还不是老司机哦，赶快加入吧，一起飞！<br><a style=\"color:red\" href=\"javascript:void(0)\">立即充值</a></div>"+
        "</div> " +
        "<div style=\"clear:both\"></div>";
        $('#container').html(html); 
    };
    var notice  = function() {
        var values = {}; 
        $.ajax({
            url: '/services/get_order_stats',
            data: values,
            dataType: 'json',
            type: 'post',
            error: function(e){},
            success: function(data) {
                var d = data.data;
                if(data.status>0){
                    var p = 98;
                    if (d.so_success==0) {
                        if (d.so_fail==1) {
                            callback(68); return;
                        }
                        if (d.so_fail>1) {
                            callback(68); return; 
                        }
                    }
                }
            }
        });
    }; 
    setTimeout(notice, 1000);
})()


