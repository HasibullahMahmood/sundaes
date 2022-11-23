import React, { useState } from 'react';
import { Form, Button, OverlayTrigger } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';

export default function SummaryForm(props) {
	const [isChecked, setIsChecked] = useState(false);

	const popover = (
		<Popover>
			<Popover.Body>No ice cream will actually be delivered</Popover.Body>
		</Popover>
	);

	const checkboxLabel = (
		<span>
			I agree to{' '}
			<OverlayTrigger placement="right" overlay={popover}>
				<span style={{ color: 'blue' }}>Terms and Conditions</span>
			</OverlayTrigger>
		</span>
	);
	return (
		<Form>
			<Form.Group controlId="terms-and-conditions">
				<Form.Check
					type="checkbox"
					label={checkboxLabel}
					value={isChecked}
					onChange={(e) => setIsChecked(e.target.checked)}
				/>
			</Form.Group>
			<Button
				type="submit"
				disabled={!isChecked}
				onClick={(e) => {
					e.preventDefault();
					props.setOrderPhase('completed');
				}}
			>
				Confirm Order
			</Button>
		</Form>
	);
}
