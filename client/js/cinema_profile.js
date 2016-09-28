/**
 * Created by yuanyaoqi on 16/8/30.
 */
var chooseMovieid=1;
$(document).ready(function () {
    //获取电影列表
    cinpro_moviequery(1);
    //加载影院信息
    cinpro_cinemaReload(3);
    cinpro_schquery(1,1,"2016-09-12");
    $(".cinpro_date").click(function () {
        $(".cinpro_datechoose").removeClass("cinpro_datechoose");
        $(this).addClass("cinpro_datechoose");
        cinpro_schquery(1,chooseMovieid,this.title);
    });
});
//动态加载影院相关信息
function cinpro_cinemaReload(id) {
    $.ajax({
        type:"post",
        url:"cinpro_cinemaReload.do",
        data:{cinid:id},
        success:function (data) {
            $("#cinpro_header h1").html(data[0].cin_name);
            $("#cinpro_title h4").html(data[0].cin_name);
            $("#cinpro_title h6").html(data[0].cin_address);
            var cinemaAttr;
            if(data[0].cin_4k==1){cinemaAttr="4K影院"}
            if(data[0].cin_4d==1){cinemaAttr="4D影院"}
            if(data[0].cin_imax==1){cinemaAttr="IMAX影厅"}
            if(data[0].cin_dolby==1){cinemaAttr="杜比全景声影厅"}
            if(data[0].cin_big==1){cinemaAttr="巨幕影厅"}
            if(data[0].cin_china_big==1){cinemaAttr="中国巨幕影厅"}
            if(data[0].cin_double==1){cinemaAttr="双机3D影厅"}
            if(data[0].cin_4dx==1){cinemaAttr="4DX影厅"}
            $("#cinpro_title>.cinpro_button").html(cinemaAttr);
        }
    })
}
//电影图片绑定点击函数
function cinpro_picclick() {
    $(".cinpro_pics").click(function () {
        $(".cinpro_picchoose").removeClass("cinpro_picchoose");
        $(this).addClass("cinpro_picchoose");
        var left=37-parseInt($(this).get(0).order)*23;
        $(this).parent().animate({left:left+'%'});
        chooseMovieid=$(this).get(0).movie_id;
        cinpro_schquery(1,chooseMovieid,"2016-09-12");
        $("div#cinpro_sch>div>h4").text(this.movie_name);
    });
}
//电影图片对象
function cinpro_picprotype(id,url,order,moviename) {
    this.initialize=function () {
        if(order==1){
            var pic=$('<img src="'+url+'" class="cinpro_pics cinpro_picchoose">');
            pic.get(0).order=order;
            pic.get(0).movie_id=id;
            pic.get(0).movie_name=moviename;
            $("#cinpro_pic").append(pic);
        }
        else{
            var pic=$('<img src="'+url+'" class="cinpro_pics" ng-click="query();">');
            pic.get(0).order=order;
            pic.get(0).movie_id=id;
            pic.get(0).movie_name=moviename;
            $("#cinpro_pic").append(pic);
        }
    }
}
//获取电影列表
function cinpro_moviequery(id) {
    $.ajax({
        type:"post",
        url:"cinpro_moviequery.do",
        data:{cinid:id},
        success:function (data) {
            $("div#cinpro_sch>div>h4").text(data[0].movie_name);
            //创建电影图片表
            for(var i=0;i<data.length;i++){
                var pic=new cinpro_picprotype(data[i].movie_id,data[i].movie_url,i,data[i].movie_name);
                pic.initialize();
            }
            //绑定点击函数
            cinpro_picclick();
        }
    })

}
//获取电影排片
function cinpro_schquery(cinid,movieid,date) {
    $.ajax({
        type:"post",
        url:"cinpro_schsquery.do",
        data:{
            movieid:movieid,
            cinid:cinid,
            date:date
        },
        success:function (data) {
            $("#cinpro_schdiv").html("");
            for(var i=0;i<data.length;i++){
                var schdiv=$('<div class="cinpro_schs ui-grid-c"><div class="ui-block-a"><h2>'+data[i].sch_starttime+'</h2><h6>'+data[i].sch_endtime+'散场</h6></div><div class="ui-block-b"> <h5>国语3D</h5><h6>'+data[i].hal_name+'</h6> </div> <div class="ui-block-c"> <h4>'+data[i].sch_price+'</h4> </div> <div class="ui-block-d"> <a href=""><span class="cinpro_button">选座购票</span></a> </div>');
                $("#cinpro_schdiv").append(schdiv);
            }
        }
    })
}


