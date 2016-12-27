/**
 * Created by duanzhengmou on 12/26/16.
 */

const express = require('express');
var app = express();
const PORT = 3000;

app.use(express.static('webapp'));

app.get('/',function (req, res) {
    var dir = __dirname + '/webapp/html/duck_main.html';
    res.sendFile(dir);
});

/*
  _   _ ___  ___ _ __
 | | | / __|/ _ \ '__|
 | |_| \__ \  __/ |
  \__,_|___/\___|_|

 */
app.get('/user/getUserName',function (req, res) {
    res.send("toast");
});

app.get('/user/checkIfLogin',function (req, res) {
    res.send(true);
});

/*
      _             _
  ___| |_ ___   ___| | __
 / __| __/ _ \ / __| |/ /
 \__ \ || (_) | (__|   <
 |___/\__\___/ \___|_|\_\

 */
app.get('/Stock/getStockDataList',function (req, res) {
    res.json([
        {name:'五粮液', code:'sh100001', open:'1.01', high:'2.45', low:'0.98', close:'1.87', turnoverVol:Math.random(), changeRate:Math.random()},
        {name:'六粮液', code:'sh100002', open:'1.02', high:'2.46', low:'0.99', close:'1.88', turnoverVol:Math.random(), changeRate:Math.random()},
        {name:'七粮液', code:'sh100003', open:'1.03', high:'2.47', low:'0.90', close:'1.84', turnoverVol:Math.random(), changeRate:Math.random()}
        ]);
});

app.get('/Stock/getStockDataListByTime',function (req, res) {
    res.json([
        {open:1.09, close:1.28, high:2.01, low:0.98, date:1482769897},
        {open:1.09, close:1.28, high:2.01, low:0.98, date:1482869897},
        {open:1.09, close:1.28, high:2.01, low:0.98, date:1482969897}]);
});

app.get('/BenchMark/getBenchDataList',function (req, res) {
    res.json([
        {name:'上证综指', code:'sh100001', open:'1.01', high:'2.45', low:'0.98', close:'1.87', turnoverVol:Math.random()},
        {name:'深证成指', code:'sh100002', open:'1.02', high:'2.46', low:'0.99', close:'1.88', turnoverVol:Math.random()}

    ]);
});

app.get('/BenchMark/getBenchList', function (req, res) {
    var data = [];

    for (var x=0;x<5;x++){
        var data_item = {};
        var random_name = '上证'+Math.random().toString().substr(3,7);
        var random_code = 'sh' + (Math.floor(Math.random()*10000)+10000);
        data_item.name = random_name;
        data_item.code = random_code;
    }
    res.json(data);
});

// app.get('/Stock/getStockDataList')

/*
  ____  _             _    ____       _        _ _
 / ___|| |_ ___   ___| | _|  _ \  ___| |_ __ _(_) |
 \___ \| __/ _ \ / __| |/ / | | |/ _ \ __/ _` | | |
  ___) | || (_) | (__|   <| |_| |  __/ || (_| | | |
 |____/ \__\___/ \___|_|\_\____/ \___|\__\__,_|_|_|

 */
app.get('/StockDetail/description', function (req ,res) {
    console.log(req.params);
    res.json({name:'五粮液', code:100001, listDate:{year:2005, month:1, day:10}, officeAddr:'珠江路创业大道', primeOperating:'主营业务什么都有啦', totalShares:10008273, close:1.78, changeRate:0.98});
});

app.get('/StockDetail/getFactorChange', function (req ,res) {

    res.json([
        {date:{year:2005, month:1, day:10}, value:Math.random()},
        {date:{year:2005, month:1, day:15}, value:Math.random()},
        {date:{year:2005, month:1, day:20}, value:Math.random()},
        {date:{year:2005, month:1, day:25}, value:Math.random()}]);
});

app.post('/StockDetail/evaluation', function (req ,res) {

    res.json({mark:Math.floor(Math.random()*30)+20, suggestion:"这是一条建议", analysis:"这是一条分析"});
});

/**
 * 原来的逻辑是返回一系列(数量>6)的因子和相应的影响值， 前端筛选影响最大的前6个
 */
app.get('/StockDetail/getMostUsefulFactors', function (req ,res) {

    res.json([
        {name:'5日换手率', judgeFactorValue:-0.78},
        {name:'30日换手率', judgeFactorValue:-1.08},
        {name:'60日换手率', judgeFactorValue:-1.08},
        {name:'日均线', judgeFactorValue:-1.08},
        {name:'市盈率', judgeFactorValue:-1.08},
        {name:'市净率', judgeFactorValue:-1.08},
        {name:'市现率', judgeFactorValue:-1.08}
    ]);
});

app.post('/StockDetail/news', function (req, res) {
   res.json([
       {title:'About Duckpp', publishDate:'2016-12-27', summary:'Duckpp要搞个大新闻'},
       {title:'uncle-Andy', publishDate:'2016-12-27', summary:'uncle-Andy要搞个大新闻'}
   ]);
});





/*
              _   _                   _
   ___  _ __ | |_(_) ___  _ __   __ _| |
  / _ \| '_ \| __| |/ _ \| '_ \ / _` | |
 | (_) | |_) | |_| | (_) | | | | (_| | |
  \___/| .__/ \__|_|\___/|_| |_|\__,_|_|
       |_|

 */
/**
 * 当前股票如果已经被加到自选股中
 * 就返回出，用来确定股票详情页面
 * 显示的是"加入自选股"，还是"删除
 * 自选股"
 */
app.post('/Optional/check',function (req, res) {
    res.send(true);
});

app.post('/Optional/del',function (req, res) {
    res.send(false);
});

app.post('/Optional/add',function (req, res) {
    res.send(false);
});

app.post('/Optional/get', function (req, res) {
    res.json([
        {name:'五粮液', code:'sh100001', open:'1.01', high:'2.45', low:'0.98', close:'1.87', turnoverVol:Math.random(), changeRate:Math.random()},
        {name:'六粮液', code:'sh100002', open:'1.02', high:'2.46', low:'0.99', close:'1.88', turnoverVol:Math.random(), changeRate:Math.random()},
        {name:'七粮液', code:'sh100003', open:'1.03', high:'2.47', low:'0.90', close:'1.84', turnoverVol:Math.random(), changeRate:Math.random()}
    ]);
});

app.post('/Optional/getRegionDistribution', function (req, res) {
    var data = {};
    for ( var x=0;x<10;x++ ){
        var random_name = Math.random().toString(36).substr(2,5).toUpperCase() + "省";
        var random_value = Math.floor(Math.random()*10);
        data[random_name] = random_value;
    }

    res.send(data);
});

app.post('/Optional/getBoardDistribution', function (req, res) {
    var data = {};
    for ( var x=0;x<10;x++ ){
        var random_name = Math.random().toString(36).substr(2,5).toUpperCase() + "行业";
        var random_value = Math.floor(Math.random()*10);
        data[random_name] = random_value;
    }
    res.send(data);
});

app.get('/Board/getAllBoardsAndStockData',function (req, res) {
    res.json([
        {boardName:'xx板块', boardChangeRate:Math.random(), stocks:[{name:"北大荒1", code:'sh100086', changeRate:Math.random(), turnoverVol:Math.random()},
                                                                    {name:"北大荒2", code:'sh100087', changeRate:Math.random(), turnoverVol:Math.random()}]},
        {boardName:'xx板块', boardChangeRate:Math.random(), stocks:[{name:"南大荒1", code:'sh100088', changeRate:Math.random(), turnoverVol:Math.random()},
                                                                    {name:"南大荒2", code:'sh100089', changeRate:Math.random(), turnoverVol:Math.random()}]},
        {boardName:'xx板块', boardChangeRate:Math.random(), stocks:[{name:"南大荒1", code:'sh100088', changeRate:Math.random(), turnoverVol:Math.random()},
            {name:"南大荒2", code:'sh100089', changeRate:Math.random(), turnoverVol:Math.random()}]},
        {boardName:'xx板块', boardChangeRate:Math.random(), stocks:[{name:"南大荒1", code:'sh100088', changeRate:Math.random(), turnoverVol:Math.random()},
            {name:"南大荒2", code:'sh100089', changeRate:Math.random(), turnoverVol:Math.random()}]},
        {boardName:'xx板块', boardChangeRate:Math.random(), stocks:[{name:"南大荒1", code:'sh100088', changeRate:Math.random(), turnoverVol:Math.random()},
            {name:"南大荒2", code:'sh100089', changeRate:Math.random(), turnoverVol:Math.random()}]},
        {boardName:'xx板块', boardChangeRate:Math.random(), stocks:[{name:"南大荒1", code:'sh100088', changeRate:Math.random(), turnoverVol:Math.random()},
            {name:"南大荒2", code:'sh100089', changeRate:Math.random(), turnoverVol:Math.random()}]},
        {boardName:'xx板块', boardChangeRate:Math.random(), stocks:[{name:"南大荒1", code:'sh100088', changeRate:Math.random(), turnoverVol:Math.random()},
            {name:"南大荒2", code:'sh100089', changeRate:Math.random(), turnoverVol:Math.random()}]},
        {boardName:'xx板块', boardChangeRate:Math.random(), stocks:[{name:"南大荒1", code:'sh100088', changeRate:Math.random(), turnoverVol:Math.random()},
            {name:"南大荒2", code:'sh100089', changeRate:Math.random(), turnoverVol:Math.random()}]},
        {boardName:'xx板块', boardChangeRate:Math.random(), stocks:[{name:"南大荒1", code:'sh100088', changeRate:Math.random(), turnoverVol:Math.random()},
            {name:"南大荒2", code:'sh100089', changeRate:Math.random(), turnoverVol:Math.random()}]},
        {boardName:'xx板块', boardChangeRate:Math.random(), stocks:[{name:"南大荒1", code:'sh100088', changeRate:Math.random(), turnoverVol:Math.random()},
            {name:"南大荒2", code:'sh100089', changeRate:Math.random(), turnoverVol:Math.random()}]},
        {boardName:'xx板块', boardChangeRate:Math.random(), stocks:[{name:"南大荒1", code:'sh100088', changeRate:Math.random(), turnoverVol:Math.random()},
            {name:"南大荒2", code:'sh100089', changeRate:Math.random(), turnoverVol:Math.random()}]},
        {boardName:'xx板块', boardChangeRate:Math.random(), stocks:[{name:"南大荒1", code:'sh100088', changeRate:Math.random(), turnoverVol:Math.random()},
            {name:"南大荒2", code:'sh100089', changeRate:Math.random(), turnoverVol:Math.random()}]},
        {boardName:'xx板块', boardChangeRate:Math.random(), stocks:[{name:"南大荒1", code:'sh100088', changeRate:Math.random(), turnoverVol:Math.random()},
            {name:"南大荒2", code:'sh100089', changeRate:Math.random(), turnoverVol:Math.random()}]},
        {boardName:'xx板块', boardChangeRate:Math.random(), stocks:[{name:"南大荒1", code:'sh100088', changeRate:Math.random(), turnoverVol:Math.random()},
            {name:"南大荒2", code:'sh100089', changeRate:Math.random(), turnoverVol:Math.random()}]},
        {boardName:'xx板块', boardChangeRate:Math.random(), stocks:[{name:"南大荒1", code:'sh100088', changeRate:Math.random(), turnoverVol:Math.random()},
            {name:"南大荒2", code:'sh100089', changeRate:Math.random(), turnoverVol:Math.random()}]},
        {boardName:'xx板块', boardChangeRate:Math.random(), stocks:[{name:"南大荒1", code:'sh100088', changeRate:Math.random(), turnoverVol:Math.random()},
            {name:"南大荒2", code:'sh100089', changeRate:Math.random(), turnoverVol:Math.random()}]},
        {boardName:'xx板块', boardChangeRate:Math.random(), stocks:[{name:"南大荒1", code:'sh100088', changeRate:Math.random(), turnoverVol:Math.random()},
            {name:"南大荒2", code:'sh100089', changeRate:Math.random(), turnoverVol:Math.random()}]},
        {boardName:'xx板块', boardChangeRate:Math.random(), stocks:[{name:"南大荒1", code:'sh100088', changeRate:Math.random(), turnoverVol:Math.random()},
            {name:"南大荒2", code:'sh100089', changeRate:Math.random(), turnoverVol:Math.random()}]},
        {boardName:'xx板块', boardChangeRate:Math.random(), stocks:[{name:"南大荒1", code:'sh100088', changeRate:Math.random(), turnoverVol:Math.random()},
            {name:"南大荒2", code:'sh100089', changeRate:Math.random(), turnoverVol:Math.random()}]},
        {boardName:'xx板块', boardChangeRate:Math.random(), stocks:[{name:"南大荒1", code:'sh100088', changeRate:Math.random(), turnoverVol:Math.random()},
            {name:"南大荒2", code:'sh100089', changeRate:Math.random(), turnoverVol:Math.random()}]},
        {boardName:'xx板块', boardChangeRate:Math.random(), stocks:[{name:"南大荒1", code:'sh100088', changeRate:Math.random(), turnoverVol:Math.random()},
            {name:"南大荒2", code:'sh100089', changeRate:Math.random(), turnoverVol:Math.random()}]}
    ]);
});

app.get('/Board/checkBoard', function (req, res) {
    res.send(true);
});

app.get('/Board/getCompareData', function (req, res) {

   res.json([
       {date:{year:'2016',month:'1',day:'2'},boardData:Math.random(), huShen300Data:Math.random()},
       {date:{year:'2016',month:'1',day:'3'},boardData:Math.random(), huShen300Data:Math.random()},
       {date:{year:'2016',month:'1',day:'4'},boardData:Math.random(), huShen300Data:Math.random()},
       {date:{year:'2016',month:'1',day:'5'},boardData:Math.random(), huShen300Data:Math.random()},
       {date:{year:'2016',month:'1',day:'6'},boardData:Math.random(), huShen300Data:Math.random()}
   ]);
});

app.get('/Board/getBoardDistribution', function (req, res) {

    res.json([
        {code:Math.random().toString(36).substr(0,6),stockName:'股票1',open:Math.random(),turnoverVol:Math.random(),changeRate:Math.random(), weight:Math.random()},
        {code:Math.random().toString(36).substr(0,6),stockName:'股票2',open:Math.random(),turnoverVol:Math.random(),changeRate:Math.random(), weight:Math.random()},
        {code:Math.random().toString(36).substr(0,6),stockName:'股票3',open:Math.random(),turnoverVol:Math.random(),changeRate:Math.random(), weight:Math.random()},
        {code:Math.random().toString(36).substr(0,6),stockName:'股票4',open:Math.random(),turnoverVol:Math.random(),changeRate:Math.random(), weight:Math.random()},
        {code:Math.random().toString(36).substr(0,6),stockName:'股票5',open:Math.random(),turnoverVol:Math.random(),changeRate:Math.random(), weight:Math.random()},
        {code:Math.random().toString(36).substr(0,6),stockName:'股票6',open:Math.random(),turnoverVol:Math.random(),changeRate:Math.random(), weight:Math.random()}
        ]);
});



app.listen(PORT, function(){
    console.log("Service is online ...");
    console.log("Listening on port "+PORT+" ...");
    console.log("Press Ctrl+C to stop");
});