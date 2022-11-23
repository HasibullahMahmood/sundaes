import { screen, render } from '../../../test-utils/library-test-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('adding to toppings updates subtotal', async () => {
	render(<Options optionType="scoops" />);

	// check whether subtotal starts with $0.00
	const subtotal = await screen.findByText('Scoops subtotal: $', { exact: false });
	expect(subtotal).toHaveTextContent('0.00');

	// add 1 to vanilla and subtotal should be $2.00
	const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
	userEvent.clear(vanillaInput);
	userEvent.type(vanillaInput, '1');

	expect(subtotal).toHaveTextContent('2.00');

	// add 2 chocolate toppings and subtotal should be $6.00
	const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
	userEvent.clear(chocolateInput);

	userEvent.type(chocolateInput, '2');
	expect(subtotal).toHaveTextContent('6.00');
});

test('Toppings subtotal calculates correctly', async () => {
	render(<Options optionType="toppings" />);

	const subtotal = screen.getByText('Toppings subtotal: $', { exact: false });
	// by default subtotal should start from 0
	expect(subtotal).toHaveTextContent('0.00');

	// find cherries checkbox, click and expect subtotal to be 1.50
	const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
	userEvent.click(cherriesCheckbox);
	expect(subtotal).toHaveTextContent('1.50');

	// find Hot fudge checkbox, click and expect subtotal to be 3.00
	const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: 'Hot fudge' });
	userEvent.click(hotFudgeCheckbox);
	expect(subtotal).toHaveTextContent('3.00');

	// uncheck hot fudge and expect subtotal to be 1.50
	userEvent.click(hotFudgeCheckbox);
	expect(subtotal).toHaveTextContent('1.50');
});

describe('Grand total test', () => {
	test('Grand total is 0 by default', async () => {
		render(<OrderEntry />);
		const grandTotal = await screen.findByRole('heading', { name: /Grand total: \$/i });
		expect(grandTotal).toHaveTextContent('0.00');

		// await for further rendering and avoiding error
		await screen.findByRole('spinbutton', { name: 'Vanilla' });
	});

	test('Adding to topping then scoop updates grand total', async () => {
		render(<OrderEntry />);
		const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/i });
		const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
		userEvent.click(cherriesCheckbox);
		expect(grandTotal).toHaveTextContent(1.5);

		const vanillaScoop = await screen.findByRole('spinbutton', { name: 'Vanilla' });
		userEvent.clear(vanillaScoop);
		userEvent.type(vanillaScoop, '1');
		expect(grandTotal).toHaveTextContent(3.5);
	});
});
