import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation from './pages/orderConfirmation/Confirmation';
import { OrderDetailProvider } from './contexts/OrderDetail';

function App() {
	// there are 3 phases: inProgress, review, completed
	const [orderPhase, setOrderPhase] = useState('inProgress');
	let Component = null;
	switch (orderPhase) {
		case 'review':
			Component = OrderSummary;
			break;
		case 'completed':
			Component = OrderConfirmation;
			break;
		default:
			Component = OrderEntry;
			break;
	}
	return (
		<Container>
			<OrderDetailProvider>
				<Component setOrderPhase={setOrderPhase} />
			</OrderDetailProvider>
		</Container>
	);
}

export default App;
