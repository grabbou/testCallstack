const initState = {
	userId: null,
	isLoggin: false,
}

export function reducer(state = initState, action){
	switch(action.type) {
		case 'START_SESSION': {
			const user = action.paylod;
			return { ...state, userId: user.id, isLogin: true };
		}
		case 'LOGOUT': {
			return { ...state, userId: null, isLogin: false };
		}
		default:
			return state;
	}
}

export function startSession(user){
	return {
		type: 'START_SESSION',
		paylod: user,
	}
}

export function logout(){
	return {
		type: 'LOGOUT',
	}
}