import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { addPopup  as addPopupAction, saveNewPost as saveNewPostAction} from 'reduxApp/modules/posts';
import { onHide as onHide } from 'reduxApp/modules/posts';

const AppPopup = ({addPopup, show, saveNewPost, onHide}) => {
	let input;
 	return (
		<div>

			<Modal show={show} onHide={onHide}>
				<Modal.Body>
					<div>
						<input type='text' placeholder='Add title' ref={node => input = node}/>
					</div>					
				</Modal.Body>
				<Modal.Footer>
					 <Button onClick={() => onHide()}>Close</Button>
					<Button onClick={() => saveNewPost(input.value)}> Save </Button>
				</Modal.Footer>
			</Modal>
			<Button onClick={addPopup}> add </Button>
		</div>
	);

};

export default connect(
	state => ({
		show: state.posts.showAddPopup,
	}),
	{addPopup: addPopupAction, saveNewPost: saveNewPostAction, onHide }
)(AppPopup); 