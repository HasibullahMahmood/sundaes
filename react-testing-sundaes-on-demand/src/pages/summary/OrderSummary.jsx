import SummaryForm from './SummaryForm';
import { useOrderDetail } from '../../contexts/OrderDetail';

const OrderSummary = (props) => {
	const [values] = useOrderDetail();

	return (
		<div>
			<h1>Order Summary</h1>
			<h2>Scoops: {values.totals.scoops}</h2>
			<ul>
				<li></li>
			</ul>
			<h2>Toppings: {values.totals.toppings}</h2>
			<ul>
				<li></li>
			</ul>
			<h2 style={{ marginBottom: 20 }}>Total: {values.totals.grandTotals}</h2>
			<SummaryForm setOrderPhase={props.setOrderPhase} />
		</div>
	);
};

export default OrderSummary;
