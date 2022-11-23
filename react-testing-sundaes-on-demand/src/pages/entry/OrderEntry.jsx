import Options from './Options';
import { useOrderDetail } from '../../contexts/OrderDetail';
import Button from 'react-bootstrap/Button';

export default function OrderEntry(props) {
	const [values] = useOrderDetail();

	return (
		<div>
			<Options optionType="scoops" />
			<Options optionType="toppings" />
			<h2>Grand total: {values.totals.grandTotal}</h2>
			<Button onClick={() => props.setOrderPhase('review')}>Order Sundaes</Button>
		</div>
	);
}
