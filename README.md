# movie
移动端电影购票网站-影院详情页：展示影院详情、正在上映的电影及场次
## 所用技术
* 页面：HTML5&css，JavaScript
* 框架：jQuery，jQuery mobile，boostrap
* 服务器：node.js express框架
* 数据库：mysql

## 页面功能
* 通过上级页面所点击的影院，动态加载该页面的影院信息及上映电影
* 点击不同电影图片，下方场次表内容同步更新
* 选择不同日期，电影场次表同部更新

## 功能实现
根据上一页面点击的影院id获取当前页面的影院信息
```
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
```
获取电影图片列表
```
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
```
电影图片对象
```
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
```
