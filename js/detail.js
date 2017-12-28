// 详情
$.get(`/movies/${window.location.href.split('?title=')[1]}`,(ans)=>{
	let string =`
			<h1>
				<span>${ans[0].title}`;
	if(ans[0].title!==ans[0].original_title){
		string+=` ${ans[0].original_title}`;
	}
	string+=`</span>
				<span class="year">(${ans[0].year})</span>
			</h1>
			<div class="col-md-3 img-tt">
				<img class="img-test img-thumbnail" src="${ans[0].image}">
			</div>
			<div class="col-md-9">
				<div class="test bg-success">
					<p class="text-success">导演：${ans[0].directors}</p>
					<p class="text-success">评分：${ans[0].rating}</p>
					<p class="text-success">主演：${ans[0].casts}</p>
					<p class="text-success">类型：${ans[0].genres}</p>
					<p class="text-success">豆瓣详情：<a href="${ans[0].alt}">点击查看</a></p>
				</div>
			</div>`;
	$('#detail').empty();
	$('#detail').append(string);
});
// 推荐

// 搜索