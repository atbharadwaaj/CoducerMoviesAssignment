import React from 'react';
import {Modal, Spinner} from 'reactstrap';
import '../styles/loader.css';

const LoaderSpinner = (props) => {
	return (
		<div>
			<Modal
				isOpen={props.modalShow}
				backdrop={true}
				className="loader-content"
			>
				<Spinner
					style={{ width: '4rem', height: '4rem', color: 'red', margin: '5px'}}
					type="grow"
				/>
				<Spinner
					style={{ width: '4rem', height: '4rem', color: 'black', margin: '5px'}}
					type="grow"
				/>
				<Spinner
					style={{ width: '4rem', height: '4rem', color: 'red', margin: '5px'}}
					type="grow"
				/>
			</Modal>
		</div>
	);
}

export default LoaderSpinner;