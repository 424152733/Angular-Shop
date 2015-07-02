var express = require('express');
var bodyParser = require('body-parser');
var Good = require('./model/goodsmodel')
var mongoose = require('mongoose');
var port = process.env.PORT||8080;
var app = express();

mongoose.connect('mongodb://localhost:12345/shop');

//app.set('views','./tpl');
app.set('view engine','jade');

app.use(bodyParser.urlencoded({extended:true}));
app.listen(port);

console.log("server start on port"+port);

app.get('/getdata',function(req,res){
	res.end("111111")
})

app.get('/',function(req,res){

	Good.findAll(function(err,goods){
		if(err){
			console.log(err)
		}
		console.log(goods)	
		res.render('index.html')
	})
})
