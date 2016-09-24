import React, { Component } from 'react';
import PostTable from './PostTable';
import { Grid, Row, Col } from 'react-bootstrap';
import Filter from './Filter';
import Pagination from './Pagination';
import { connect } from 'react-redux';
import { loadPosts } from 'reduxApp/modules/posts';

@connect(
	null,
	{ loadPosts }
)
class PostList extends Component{
	componentDidMount() {
		this.props.loadPosts();
	}
	render() {
		return (
			<Grid>
				<Row> 
					<Col xs={12}>
						<Filter />
					</Col> 
				</Row>
				<Row> 
					<Col xs={12}>
						<PostTable />
						<Pagination />
					</Col> 
				</Row>
			</Grid>	
		);
	}
}



export default PostList;