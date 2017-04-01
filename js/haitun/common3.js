/**
 * Created by Administrator on 2016/8/24.
 */
window.top !== window.self && (window.top.location = window.location);

//浏览器相关
var browser = {
    versions: function () {
        var o = navigator.userAgent;
        navigator.appVersion;
        return {
            mobile: !!o.match(/AppleWebKit.*Mobile/i) || !!o.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/),
            mac: o.indexOf("Mac") > -1,
            ios: !!o.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: o.indexOf("Android") > -1 || o.indexOf("Linux") > -1,
            weixin: !!o.match(/MicroMessenger/i),
            qq: !!o.match(/QQ/i)
        }
    }(), language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

function getsec(o) {
    var t = 1 * o.substring(1, o.length), i = o.substring(0, 1);
    return "s" == i ? 1e3 * t : "h" == i ? 60 * t * 60 * 1e3 : "d" == i ? 24 * t * 60 * 60 * 1e3 : void 0
}
//设置cookie
function sc(o, t, i) {
    i = i || "d1";
    var a = getsec(i), n = new Date;
    n.setTime(n.getTime() + 1 * a), document.cookie = o + "=" + escape(t) + ";expires=" + n.toGMTString()
}
//获取cookie值。
function gc(o) {
    var t, i = new RegExp("(^| )" + o + "=([^;]*)(;|$)");
    var v = (t = document.cookie.match(i)) ? t[2] : null;
    if (v)v = unescape(v);
    return v
}

//提示充值。
function getNo() {
    if (1 == Math.floor(2 * Math.random() + 1)) {
        var o = "x_a_no", t = 139850, i = gc(o);
        i ? (_ckno = parseInt(i) + 1, sc(o, _ckno, "d30")) : sc(o, t, "d30"), i = i ? _ckno : t;
        $("#showno").html(i);
        $(".ui-newstips-wrap").show().addClass("flip-top");
        setTimeout(function () {
            $(".ui-newstips-wrap").hide()
        }, 5e3)
    }
}

function isv(k) {
    return gc(k) == 1
}

//点击视频播放
//o 标题
//t 视频文件
//p 页面 1 同级可看  2  充值可看
function play(o, t) {
    //获取试播次数。
    var trytime = gc("x_a_watch") || 0;
    trytime++;
    sc("x_a_watch", trytime);

    //if (gc('level')>0) {
    console.log(t);
        window.location.href = "/s1/vedios/play.html?id=" + t;
    //} else {
    //    pay()
    //}
}

function picplay(c) {
    window.location.href="/s1/pic/play.html?id=" +c;
}

function gotochannel(o) {
    window.location.href = "/s1/vedios.html?tid=" + o;
}

function gotolsj(o) {
    window.location.href = "/s1/lsj/play.html?tid=" + o;
}

//提醒支付
function pay() {
    // var level = gc("hd_level");
    var level = $('#hd_level').val();
    level = level == null?"0":level;

    var c_id="";
    switch (level){
        case "0": //普通用户
            c_id ="paybox";
            $("#vip_radio2").attr("checked","checked");
            break;
        case "1": //黄金会员->升级
            $("#vip_radio3").attr("checked","checked");
            c_id ="paybox1";
            break;
        case "2": //钻石会员->升级
            $("#vip_radio4").attr("checked","checked");
            c_id ="paybox2";
            break;
    }

    var o = $("#"+c_id).dialog("show");
    o.on("dialog:action", function (o) {
        1 == o.index && (window.location.href = "/buy.html");   //tag  应该修改为支付跳转

        if (/android/i.test(navigator.userAgent.toLowerCase())) {
            $('video').show();
        }
    })

    if (/android/i.test(navigator.userAgent.toLowerCase())) {
        $('video').hide();
    }
    // $('video').show();
}

//点播支付
function reserve(o) {
    $('#reserveid').val(o);
    var o = $("#paybox3").dialog("show");
    o.on("dialog:action", function (o) {
        1 == o.index && (window.location.href = "/buy.html");   //tag  应该修改为支付跳转
    })
}

function goback() {
    window.location.href = "/index.html";
}

function wx_pay(price,pid){
    //alert("系统繁忙");
    window.location.href = '/bobo/pay_ali?price='+price+'&pid='+pid
}

function wx_sao_pay(price,pid) {
    var el =$.loading({content:'正在提交订单...'});
    window.location.href = '/bobo/pay_ali?price='+price+'&pid='+pid
    // $.ajax({
    //     url:'/s1/services/create_wx_pay',
    //     data: $.param({"price":price,"pid":pid}),
    //     dataType: "json",
    //     beforeSend:function (xhr, settings) {
    //
    //     },
    //     complete:function (xhr, status) {
    //         el.hide();
    //         if(status!=200) {
    //
    //         }
    //     },
    //     success:function (data) {
    //         var d = data.data;
    //         if(data.status>0){
    //             //海豚
    //             if(d.type!=2) {
    //                 var vo = d.value;
    //                 var url = "/s1/temp/haitun/confirm.html?";
    //                 url += "sao=" + encodeURIComponent(vo.sao);
    //                 url += "&orderid=" + vo.orderid;
    //                 url += "&pid=" + vo.op;
    //                 window.location.href = url;
    //             }
    //         }
    //         else{
    //             var dia = $.dialog({
    //                 title: '错误',
    //                 content: '订单创建失败！请重试！',
    //                 button: ["确定"]
    //             });
    //         }
    //     }
    // });
}


function ali_pay(price,pid) {
    var el =$.loading({content:'正在提交订单...'});
    window.location.href = '/bobo/pay_ali?price='+price+'&pid='+pid

    // $.ajax({
    //     url:'/bobo/pay_ali',
    //     data: $.param({"price":price,"pid":pid}),
    //     dataType: "json",
    //     beforeSend:function (xhr, settings) {
    //
    //     },
    //     complete:function (xhr, status) {
    //         el.hide();
    //         if(status!=200) {
    //
    //         }
    //
    //         alert(status)
    //     },
    //     success:function (data) {
    //
    //         if(data.status>0){
    //             $.loading({content:'处理中...'});
    //             window.location.href= data;
    //         }
    //         else{
    //             var dia = $.dialog({
    //                 title: '错误',
    //                 content: '下单失败！',
    //                 button: ["确定"]
    //             });
    //         }
    //     }
    //
    // });
}

function wx_pay1(price,pid){
    //alert("系统繁忙");
    window.location.href = '/bobo/pay_ali?price='+price+'&pid='+pid
}

function wx_sao_pay1(price,pid) {
    var el =$.loading({content:'正在提交订单...'});
    window.location.href = '/bobo/pay_ali?price='+price+'&pid='+pid
    // $.ajax({
    //     url:'/s1/services/create_reserve_wx_pay',
    //     data: $.param({"price":price,"pid":pid}),
    //     dataType: "json",
    //     beforeSend:function (xhr, settings) {
    //
    //     },
    //     complete:function (xhr, status) {
    //         el.hide();
    //         if(status!=200) {
    //
    //         }
    //     },
    //     success:function (data) {
    //         var d = data.data;
    //         if(data.status>0){
    //             //海豚
    //             if(d.type!=2) {
    //                 var vo = d.value;
    //                 var url = "/s1/temp/haitun/confirm.html?";
    //                 url += "sao=" + encodeURIComponent(vo.sao);
    //                 url += "&orderid=" + vo.orderid;
    //                 url += "&pid=" + vo.op;
    //                 window.location.href = url;
    //             }
    //         }
    //         else{
    //             var dia = $.dialog({
    //                 title: '错误',
    //                 content: '只能点播1个视频！',
    //                 button: ["确定"]
    //             });
    //         }
    //     }
    // });
}


function ali_pay1(price,pid) {
    var el =$.loading({content:'正在提交订单...'});
    window.location.href = '/bobo/pay_ali?price='+price+'&pid='+pid
    // $.ajax({
    //     url:'/s1/services/create_reserve_ali_pay',
    //     data: $.param({"price":price,"pid":pid}),
    //     dataType: "json",
    //     beforeSend:function (xhr, settings) {
    //
    //     },
    //     complete:function (xhr, status) {
    //         el.hide();
    //         if(status!=200) {
    //
    //         }
    //     },
    //     success:function (data) {
    //         if(data.status>0){
    //             $.loading({content:'处理中...'});
    //             window.location.href= data.data;
    //         }
    //         else{
    //             var dia = $.dialog({
    //                 title: '错误',
    //                 content: '订单创建失败！请重试！',
    //                 button: ["确定"]
    //             });
    //         }
    //     }
    //
    // });
}


//初始化
Zepto(function ($) {
    //alert(gc("level"));

    $('#qqvideo-overlay-0,#qqvideobridge').remove();
    //如果是微信浏览器，提示浏览器打开。针对微信量。
    if (browser.versions.weixin) {
        $('.inapptips').show();
    }
    setInterval(getNo, 10000);
    $(".ui-list li,.ui-tiled li").click(function () {
        $(this).data("href") && (location.href = $(this).data("href"))
    });
    $("header .ui-icon-return").click(function () {
        goback()
    });
    if (gc('level') < 3) {
        $('.topay').on('click', function () {
            pay();
        })
    }

});
