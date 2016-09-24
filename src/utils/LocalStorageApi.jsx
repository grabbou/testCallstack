import _ from 'lodash';
const posts = [
		{ id: 1, userName: 'petya', userId: 1, title: 'title1', views: 2, likes: 3, crearedAt: new Date() },
		{ id: 2, userName: 'user2', userId: 2, title: 'title2', views: 3, likes: 4, crearedAt: new Date() },
		{ id: 3, userName: 'user3', userId: 3, title: 'title3', views: 45, likes: 45, crearedAt: new Date() },
		{ id: 4, userName: 'user4', userId: 4, title: 'title4', views: 35, likes: 44, crearedAt: new Date() },
		{ id: 5, userName: 'user5', userId: 5, title: 'titl54', views: 355, likes: 454, crearedAt: new Date() },
		{ id: 6, userName: 'user5', userId: 5, title: 'titl54', views: 355, likes: 454, crearedAt: new Date() },
		{ id: 7, userName: 'user5', userId: 5, title: 'titl54', views: 355, likes: 454, crearedAt: new Date() },
		{ id: 9, userName: 'user5', userId: 5, title: 'titl54', views: 355, likes: 454, crearedAt: new Date() },
		{ id: 10, userName: 'vasya', userId: 5, title: 'titl54', views: 355, likes: 454, crearedAt: new Date() },



];

function Api(url) {
	this.getPage = function(query, page, perPage = 10) {
		return new Promise( function(resolve, reject) {
			setTimeout(function() {
				var _page = page || 1;
			    var offset = (_page - 1) * perPage;
			    var matchesFilter = new RegExp(query.userName, 'i');
			    var _posts = posts.filter(post => !query.userName || matchesFilter.test(post.userName));
			    var paginatedItems = _posts.slice(offset, offset + perPage);
			    //_.rest(posts, offset).slice(0, per_page);
			    console.log(_page, paginatedItems);
					resolve({
						items: paginatedItems,
						count: _posts.length,
					});			
			}, 100);
		});
	}
}

export default Api;

