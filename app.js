const express = require('express');
const mongoose = require('mongoose');
const Movie = require('./models/movies');
const Type = require('./models/types');
const app = express();
app.use(express.static(__dirname+'/'));
mongoose.connect('mongodb://localhost:27017/movies');

const db = mongoose.connection;
db.on('error',console.log);
db.once('open',()=>{
	console.log("success!");
});

// 加载index页面
app.get('/',(req,res)=> {
    res.sendFile('./public/index.html', {root: './'});
});

// 加载detail页面
app.get('/detail',(req,res)=> {
    res.sendFile('./public/detail.html', {root: './'});
});

// 所有影片
app.get('/movies',(req,res)=>{
	console.log('GET /movies........');
	Movie.find().sort({"rating":-1}).exec(function(err,movies){
		if (err) 
			return res.status(500).json({error: err.message});
    	res.send(movies);
	});
});

// 通过title获取电影
app.get('/movies/:title',(req,res)=>{
	console.log('GET /movies/:id........');
	let title = req.params.title;
	Movie.find({"title":title}).exec(function(err,movie){
		if (err) 
			return res.status(500).json({error: err.message});
    	res.send(movie);
	});
});

// 查找
app.get('/search/:search_name',(req,res)=>{
	console.log('GET /:search_name......');
	let search_name = req.params.search_name;
	Movie.find({"title":eval("/"+search_name+"/i")}).sort({"rating":-1}).exec(function(err,movies){
		if(err)
			return res.status(500).json({errpr:err.message});
		res.send(movies);
	});
});

// 所有类型
app.get('/types',(req,res)=>{
	console.log('GET /types........');
	Type.find().exec(function(err,types){
		if (err) 
			return res.status(500).json({error: err.message});
    	res.send(types);
	});
});

//类型对应的电影
app.get('/types/:type_id',(req,res)=>{
	let type_id = req.params.type_id;
	console.log('GET /types/:type_id........');
	Type.find({_id:type_id}).exec(function(err,type){
		Movie.find({"genres":eval("/"+type[0].type+"/i")}).sort({"rating":-1}).exec(function(err,movies){
			if (err) 
				return res.status(500).json({error: err.message});
    		res.send(movies);
		});
	});
});



app.listen(80,()=>{
	console.log('running on port 2000');
});