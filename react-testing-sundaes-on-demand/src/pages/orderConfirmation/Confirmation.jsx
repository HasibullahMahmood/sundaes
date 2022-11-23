import { useEffect, useState } from 'react';
import axios from 'axios';

import { useOrderDetail } from '../../contexts/OrderDetail';
import Button from 'react-bootstrap/Button';

const Confirmation = (props) => {
	const [orderNumber, setOrderNumber] = useState();
	const [, , reset] = useOrderDetail();

	useEffect(() => {
		(async () => {
			const response = await axios.post('http://localhost:3030/order');
			setOrderNumber(response.data.orderNumber);
		})();
	}, []);

	if (!orderNumber) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h2>Thank you!</h2>
			<p>Your order number is {orderNumber}</p>
			<Button
				onClick={() => {
					reset();
					props.setOrderPhase('inProgress');
				}}
			>
				Create new order
			</Button>
		</div>
	);
};

export default Confirmation;
