import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

export default function ScoopOption({ name, imagePath, updateOptionCount }) {
	return (
		<Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
			<img style={{ width: '75%' }} src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
			<Form.Group controlId={`${name}-count`} as={Row} className="mt-3">
				<Form.Label column xs="6" style={{ textAlign: 'right' }}>
					{name}
				</Form.Label>
				<Col xs="5" style={{ textAlign: 'left' }}>
					<Form.Control
						type="number"
						defaultValue={0}
						onChange={(e) => updateOptionCount(name, e.target.value)}
					/>
				</Col>
			</Form.Group>
		</Col>
	);
}
