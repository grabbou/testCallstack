import React from 'react';
import { connect } from 'react-redux';
import { Pagination as BsPagination } from 'react-bootstrap';
import { changePage } from 'reduxApp/modules/posts';

const Pagination = ({ totalPages, activePage, changePage }) => {
	return (
		<div>
			<BsPagination
	          bsSize="small"
	          items={totalPages}
	          activePage={activePage}
	          onSelect={changePage} />
	
		</div>
	)

};

export default connect(
	state => ({
		totalPages: state.posts.totalPages,
		activePage: state.posts.activePage,
	}),
	{ changePage: changePage }
)(Pagination); 