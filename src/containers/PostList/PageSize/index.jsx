import React from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';
import { changeSize  as changeSizeAction} from 'reduxApp/modules/posts';

const PageSize = ({perPage, changeSize}) => {

 	return (
		<div>
			<Nav bsStyle="pills" activeKey={perPage} onSelect={ (e) => changeSize(e) }>
			    <NavItem eventKey={5} >5</NavItem>
			    <NavItem eventKey={10} title="Item">10</NavItem>
			    <NavItem eventKey={15} >15</NavItem>
			    <NavItem eventKey={20} >20</NavItem>
  			</Nav>
		</div>
	);

};

export default connect(
	state => ({
		perPage: state.posts.perPage,
	}),
	{ changeSize: changeSizeAction }
)(PageSize); 