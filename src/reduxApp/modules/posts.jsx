const initState = {
	posts: [],
	totalPages: 10,
	activePage: 1,

};


export function reducer(state = initState, action) {
	switch(action.type){
		case 'SET_PAGE': {
			return { ...state, activePage: action.paylod }
		}
		case 'RECIEVE_POSTS': {
			const { items, count } = action.paylod;
			return { ...state, posts: items, totalPages: Math.ceil(count / 2)  }
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

export function fetchPosts() {
	return (dispatch, getState) => {
		const page = getState().posts.activePage ;
		postsApi.getPage(page).then(json => {
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
		alert(query);
	};
}

export function changePage(page) {
	return (dispatch) => {
		dispatch(setPage(page));
		dispatch(fetchPosts());
	};
}
