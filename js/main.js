let id_page = 1;//当前页面号
let page_tatal = 0;//当前type总的页数
let movie_type = 'all';//当前type

//添加侧边栏
function addSideBar(){
	$('#sidebar').empty();
	let string = `<li id="all" class="active listClick"><a href="#">全部</a></li>`;
	$.get('/types',(types)=>{
		types.forEach((item)=>{
			string += `<li id="${item._id}" class="listClick"><a href="#">${item.type}</a></li>`;
		});
		$('#sidebar').append(string);
	});
}

// 添加电影
function addMovies(movies,pageid){
	$('#movies').empty();
	let string = ``;
	let number = 0;
	if(movies.length-8*(pageid-1)<=8){
		number = movies.length;
	}
	else{
		number = pageid*8;
	}
	for(let i = (pageid-1)*8;i<number;i++){
		string += `
			<div class="col-md-3 col-sm-6">
				<div class="thumbnail">
					<img class="img-movie" src="${movies[i].image}" alt="${movies[i].title}">
					<div class="caption">
        				<h4 class='overhide'>${movies[i].title}</h4>
        				<p>评分：<span>${movies[i].rating}</span></p>
        				<p>`;
        let labels = movies[i].genres.split(',');
        labels.forEach((label)=>{
        	string +=`<span class="label label-success">${label}</span>`;
        });
        string +=`</p>
        				<p class="point"><a href="./detail?title=${movies[i].title}">DETAIL<span class="glyphicon glyphicon-menu-right"></span></a></p>
        			</div>
				</div>
			</div>`;
	}
	$('#movies').append(string);
}

// 添加分页
function addPage(movies){
	$('.pager').empty();
	let string = `
		<li id="${id_page-1}_page" class="previous disabled"><a href="#"><span aria-hidden="true">&larr;</span> Older</a></li>
    	<li><span>当前页：${id_page}/${page_tatal}</span></li>
    	<li id="${id_page+1}_page" class="next"><a href="#">Newer <span aria-hidden="true">&rarr;</span></a></li>`;
    $('.pager').append(string);
}


//给侧边栏动态添加点击事件监听
$(document).on('click','.listClick',function () {
    let listId = $(this).attr('id');
    listClick(listId);
});

//侧边栏点击事件
function listClick(aim){
	id_page = 1;
	movie_type = aim;
	$('.active').removeClass('active');
	$(`#${aim}`).addClass('active');
	if(aim === 'all'){
		$.get('/movies',(allmovies)=>{
			page_tatal = Math.ceil(allmovies.length/8);
		 	addMovies(allmovies,id_page);
		 	addPage(allmovies,id_page);
		});
	}
	else{
		$.get(`/types/${aim}`,(movies)=>{
			page_tatal = Math.ceil(movies.length/8);
			addMovies(movies,id_page);
			addPage(movies,id_page);
		});
	}
}

//加载界面
$(document).ready(function () { 
    addSideBar();
    listClick('all');
});

// 动态监听上一页按钮
$(document).on('click','.previous',function(){
	let preId = $(this).attr('id');
	if(preId.split('_')[0]==0){
		layer.msg('点了没用', {icon: 4});
	}
	else{
		id_page--;
		getAnotherPage();
	}
});


// 动态监听下一页按钮
$(document).on('click','.next',function(){
	let nextId = $(this).attr('id');
	if(nextId.split('_')[0]==page_tatal+1){
		layer.msg('点了没用', {icon: 4});
	}
	else{
		id_page++;
		getAnotherPage();
	}
});

// 翻页
function getAnotherPage(){
	$('.pager').empty();
	let string = ``;
	if(movie_type === 'all'){
		$.get('/movies',(allmovies)=>{
		 	addMovies(allmovies,id_page);
		});
	}
	else{
		$.get(`/types/${movie_type}`,(movies)=>{
			addMovies(movies,id_page);
		});
	}
	if(id_page===1){
		string += `<li id="${id_page-1}_page" class="previous disabled"><a><span aria-hidden="true">&larr;</span> Older</a></li>`;
	}
	else{
		string += `<li id="${id_page-1}_page" class="previous"><a href="#"><span aria-hidden="true">&larr;</span> Older</a></li>`;
	}
	string +=`<li><span>当前页：${id_page}/${page_tatal}</span></li>`;
	if(id_page===page_tatal){
		string += `<li id="${id_page+1}_page" class="next disabled"><a>Newer <span aria-hidden="true">&rarr;</span></a></li>`;
	}
	else{
		string +=`<li id="${id_page+1}_page" class="next"><a href="#">Newer <span aria-hidden="true">&rarr;</span></a></li>`;
	}
	$('.pager').append(string);
}

// 搜索
$(document).ready(()=>{
	$('#search_btn').click((e)=>{
		e.preventDefault();//禁止刷新
		let inputval = $("#search_input").val();
		$.get(`search/${inputval}`,(movies)=>{
			addMovies(movies,1);
		});
	});
});