import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

const PostRow = ({ post }) => {
	return (
		<tr>
			<td>{post.id}</td>
			<td>{post.userName}</td>
			<td>{post.title}</td>
			<td>{post.views}</td>
			<td>{post.likes}</td>
			<td>{post.createdAt}</td>
		</tr>
	);
};

export const PostTable = ({ posts }) => (
	<div>
		<Table>
			<thead>
				<tr>
					<th> ID </th>
					<th> User name</th>
					<th> Post title	</th>
					<th> Views </th>
					<th> Likes </th>
					<th> Created at </th>
				</tr>
			</thead>
			<tbody>
				{posts.map(post =>
					<PostRow key={post.id} post={post} />
				)}
			</tbody>

		</Table>
	</div>
);

PostTable.defaultProps = {
	posts: [],
};

export default connect(
	state => ({
		posts: state.posts.posts,
	})

)(PostTable);

