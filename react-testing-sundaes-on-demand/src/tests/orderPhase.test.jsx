import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async () => {
	// render app
	render(<App />);

	// add ice cream scoops and toppings
	const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
	userEvent.clear(chocolateInput);
	userEvent.type(chocolateInput, '2');

	const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: 'Hot fudge' });
	userEvent.click(hotFudgeCheckbox);

	// find and click order button
	const button = screen.getByRole('button', { name: 'Order Sundaes' });
	userEvent.click(button);

	// check summary information based on order
	const scoopsSubtotal = await screen.findByText('Scoops: $', { exact: false });
	expect(scoopsSubtotal).toHaveTextContent('4.00');
	const toppingsSubtotal = await screen.findByText('Toppings: $', { exact: false });
	expect(toppingsSubtotal).toHaveTextContent('1.50');

	// accept terms and conditions and click button to confirm the order
	const termsCheckbox = await screen.findByRole('checkbox');
	userEvent.click(termsCheckbox);
	const confirmBtn = await screen.findByRole('button', { name: 'Confirm Order' });
	userEvent.click(confirmBtn);

	// confirm order number on confirmation page
	const orderNumber = await screen.findByText('Your order number is ', { exact: false });
	expect(orderNumber).toHaveTextContent('1234567890');

	// click 'new order' button on confirmation page
	const newOrderBtn = await screen.findByRole('button', { name: 'Create new order' });
	userEvent.click(newOrderBtn);
	// check that scoop and toppings subtotals have been reset
	expect(await screen.findByText('Scoops subtotal: $', { exact: false })).toHaveTextContent('0.00');
	expect(await screen.findByText('Toppings subtotal: $', { exact: false })).toHaveTextContent('0.00');
});
