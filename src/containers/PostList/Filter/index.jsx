import React from 'react';
import { Form, FormGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { searchByName } from 'reduxApp/modules/posts';

const Filter = ({ makeSeach }) => {
	let input;
	const submit = (e) => {
		e.preventDefault();
		makeSeach(input.value);
	};
	return (
		<div>
			<Form inline={true} onSubmit={submit}>
				<FormGroup controlId='formInlineName'>
					<input
					  className='form-control'
				      ref={node => input = node} type='text'
				      placeholder='Search user...'
					/>
				</FormGroup>
				<Button type='submit'>
					Search
				</Button>
			</Form>
		</div>
	);
};

export default connect(
	null,
	{ makeSeach: searchByName }

)(Filter)


