import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import './index.css';
import { toggleSort as toggleSortAction } from 'reduxApp/modules/posts';
const PostRow = ({ post }) => {
	return (
		<tr>
			<td>{post.id}</td>
			<td>{post.userName}</td>
			<td>{post.title}</td>
			<td>{post.views}</td>
			<td>{post.likes}</td>
			<td>{'' + post.createdAt}</td>
		</tr>
	);
};

const SortTh = ({ children, onClick, active, direction }) => {
	let icon = (<span className='glyphicon glyphicon-sort'></span>);
	if(active) {
		if(direction === 'asc') {
			icon = <span className='glyphicon glyphicon-sort-by-attributes'></span>;
		} else {
			icon = <span className='glyphicon glyphicon-sort-by-attributes-alt'></span>;
		}
	}
	return (
		<th onClick={onClick} className='sortable'>
			<span>{children}</span>
			{icon}
		</th>
	);
};

export const PostTable = ({ posts, sortDirection, sortField, toggleSort }) => (
	<div>
		<Table>
			<thead>
				<tr>
					<SortTh
						onClick={() => toggleSort('id')}
						active={sortField === 'id'}
						direction={sortDirection}
					> ID </SortTh>
					<SortTh
						onClick={() => toggleSort('userName')}
						active={sortField === 'userName'}
						direction={sortDirection}
					> User Name </SortTh>
					<SortTh
						onClick={() => toggleSort('title')}
						active={sortField === 'title'}
						direction={sortDirection}
					> Post Title </SortTh>
					<SortTh
						onClick={() => toggleSort('views')}
						active={sortField === 'views'}
						direction={sortDirection}
					> Views </SortTh>
					<SortTh
						onClick={() => toggleSort('likes')}
						active={sortField === 'likes'}
						direction={sortDirection}
					> Likes </SortTh>
					<SortTh
						onClick={() => toggleSort('createdAt')}
						active={sortField === 'createdAt'}
						direction={sortDirection}
					> Created At </SortTh>
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
		sortField: state.posts.sortField,
		sortDirection: state.posts.sortDirection,
	}),
	{ toggleSort: toggleSortAction }

)(PostTable);

