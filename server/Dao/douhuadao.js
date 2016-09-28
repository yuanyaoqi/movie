/**
 * Created by yuanyaoqi on 16/9/6.
 */
var user={};
var mysql=require("./../node_modules/mysql");
exports.cinpro_moviequery=function (req,resp) {
    var myconnection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        port:"3306",
        database:"douhua"
    });
    myconnection.connect();
    var cinid=req.body.cinid;
    myconnection.query("select movie_id,movie_url,movie_name from movies where movie_id in(select distinct movie_id from schedules where hal_id in (select hal_id from halls where cin_id=?));",[cinid],function (err,data) {
        resp.send(data);
    });
    myconnection.end();
};
exports.cinpro_schquery=function (req,resp) {
    var myconnection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        port:"3306",
        database:"douhua"
    });
    myconnection.connect();
    var cinid=req.body.cinid;
    var movieid=req.body.movieid;
    var date=req.body.date;
    myconnection.query("select sch_price,sch_starttime,sch_endtime,(select hal_name from halls where halls.hal_id=schedules.hal_id ) as hal_name from schedules where hal_id in (select hal_id from halls where cin_id=?) and movie_id=? and sch_date=?;",[cinid,movieid,date],function (err,data) {
        resp.send(data);
    });
    myconnection.end();
};
exports.cinpro_cinemaReload=function (req,resp) {
    var myconnection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        port:"3306",
        database:"douhua"
    });
    myconnection.connect();
    var cinid=req.body.cinid;
    myconnection.query("select * from cinemas where cin_id=?;",[cinid],function (err,data) {
        resp.send(data);
    });
    myconnection.end();
};