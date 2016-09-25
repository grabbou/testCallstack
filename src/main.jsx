
import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import createStore from './reduxApp/create.jsx';
import PostList from 'containers/PostList/';


window.onload = () => {
    const root = document.getElementById('app');
    const store = createStore();
	render((
		<Provider store={store} >
			<PostList />
		</Provider>
		), root
	);
};