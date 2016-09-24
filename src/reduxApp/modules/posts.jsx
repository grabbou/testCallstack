const initState = {
	posts: [],
	totalPages: 10,
	activePage: 1,
	searchQuery: '',
	perPage: 2,
};


export function reducer(state = initState, action) {
	switch(action.type){
		case 'SET_PAGE': {
			return { ...state, activePage: action.paylod }
		}
		case 'RECIEVE_POSTS': {
			const { items, count } = action.paylod;
			return { ...state, posts: items, totalPages: Math.ceil(count / state.perPage)  }
		}
		case 'SET_SEARCH': {
			return { ...state, searchQuery: action.paylod }
		}
	}
	return state;
}


import LocalStorageApi from 'utils/LocalStorageApi';
const postsApi = new LocalStorageApi('/api/posts');

function recievePosts(paylod){
	return {
		type: 'RECIEVE_POSTS',
		paylod
	};
}

function setSearch(paylod){
	return {
		type: 'SET_SEARCH',
		paylod
	}
}

export function fetchPosts() {
	return (dispatch, getState) => {
		const page = getState().posts.activePage;
		const filter = getState().posts.searchQuery;
		const perPage = getState().posts.perPage;
		const query = {
			userName: filter,
		}
		postsApi.getPage(query, page, perPage).then(json => {
			dispatch(recievePosts(json));
		})

	};
}

export function loadPosts() {
	return (dispatch) => {
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
