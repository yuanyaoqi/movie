var myExpress=require("./server/node_modules/express");
var douhuadao=require("./server/dao/douhuadao");
var myWeb=myExpress();
myWeb.set("port",2000);
myWeb.configure(function () {
    myWeb.use(myExpress.logger("dev"));
    myWeb.use(myExpress.bodyParser());
    myWeb.use(myExpress.methodOverride());
    myWeb.use(myWeb.router);
    myWeb.use(myExpress.static(__dirname+"/client"));
    myWeb.use(myExpress.errorHandler());
});
myWeb.listen(myWeb.get("port"),function(){
    console.log("服务器已启动");
});
myWeb.post("/cinpro_moviequery.do",function (req,resp) {
    douhuadao.cinpro_moviequery(req,resp);
});
myWeb.post("/cinpro_schsquery.do",function (req,resp) {
    douhuadao.cinpro_schquery(req,resp);
});
myWeb.post("/cinpro_cinemaReload.do",function (req,resp) {
    douhuadao.cinpro_cinemaReload(req,resp);
});