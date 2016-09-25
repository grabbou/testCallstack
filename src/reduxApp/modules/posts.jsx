const initState = {
	posts: [],
	totalPages: 10,
	activePage: 1,
	searchQuery: '',
	perPage: 5,
	sortField: null,
	sortDirection: null,
};


export function reducer(state = initState, action) {
	switch(action.type) {
		case 'SET_PAGE': {
			return { ...state, activePage: action.paylod };
		}
		case 'SET_SIZE': {
			return { ...state, perPage: action.paylod };
		}
		case 'RECIEVE_POSTS': {
			const { items, count } = action.paylod;
			return { ...state, posts: items, totalPages: Math.ceil(count / state.perPage)  };
		}
		case 'SET_SEARCH': {
			return { ...state, searchQuery: action.paylod };
		}
		case 'TOGGLE_SORT': {
			const field = action.paylod;
			let sortDirection;
			const sortField = field;
			if( state.sortField === field){
				sortDirection = ( state.sortDirection === 'desc' ) ? 'asc' :  'desc';
			} else {
				sortDirection = 'desc';
			}
			
			return { ...state, sortField, sortDirection };
		}
	}
	return state;
}

import _ from 'lodash';
const posts = [
		{ id: 1, userName: 'petya', userId: 1, title: 'title1', views: 2, likes: 3, createdAt: new Date(2016, 9, 1) },
		{ id: 2, userName: 'user2', userId: 2, title: 'title2', views: 3, likes: 4, createdAt: new Date(2016, 9, 1) },
		{ id: 3, userName: 'user3', userId: 3, title: 'title3', views: 45, likes: 45, createdAt: new Date(2015, 9, 1) },
		{ id: 4, userName: 'user4', userId: 4, title: 'title4', views: 35, likes: 44, createdAt: new Date(2016, 7, 1) },
		{ id: 5, userName: 'user5', userId: 5, title: 'titl54', views: 355, likes: 454, createdAt: new Date(2014, 9, 1) },
		{ id: 6, userName: 'user5', userId: 5, title: 'titl54', views: 355, likes: 454, createdAt: new Date(2010, 9, 1) },
		{ id: 7, userName: 'user5', userId: 5, title: 'titl54', views: 355, likes: 454, createdAt: new Date(2016, 9, 1) },
		{ id: 9, userName: 'user5', userId: 5, title: 'titl54', views: 355, likes: 454, createdAt: new Date(2001, 5, 1) },
		{ id: 10, userName: 'vasya', userId: 5, title: 'titl54', views: 355, likes: 454, createdAt: new Date(2016, 9, 1) },

];

import LocalStorageApi from 'utils/LocalStorageApi';
const postsApi = new LocalStorageApi('/api/posts', posts);

function recievePosts(paylod) {
	return {
		type: 'RECIEVE_POSTS',
		paylod
	};
}

function setSearch(paylod) {
	return {
		type: 'SET_SEARCH',
		paylod
	};
}

export function fetchPosts() {
	return (dispatch, getState) => {
		const page = getState().posts.activePage;
		const filter = getState().posts.searchQuery;
		const perPage = getState().posts.perPage;
		const sortField = getState().posts.sortField;
		const sortDirection = getState().posts.sortDirection;
		const sort = {
			field: sortField,
			direction: sortDirection,
		}
		const query = {
			userName: filter,
		}
		postsApi.getPage(query, sort, page, perPage).then(json => {
			dispatch(recievePosts(json));
		})

	};
}

export function toggleSort(field) {
	return (dispatch) => {
		dispatch({ type: 'TOGGLE_SORT', paylod: field });
		dispatch(fetchPosts());
	};
}


export function loadPosts() {
	return (dispatch) => {
			dispatch(fetchPosts());
	};
}

export function changeSize(perPage){
	return (dispatch) => {
		dispatch({ type: 'SET_SIZE', paylod: perPage });
		dispatch(fetchPosts());
	};
}


function setPage(page) {
	return {
		type: 'SET_PAGE',
		paylod: page,
	};
}

export function searchByName(query) {
	return (dispatch) => {
		dispatch(setPage(1));
		dispatch(setSearch(query));
		dispatch(fetchPosts());

	};
}

export function changePage(page) {
	return (dispatch) => {
		dispatch(setPage(page));
		dispatch(fetchPosts());
	};
}
