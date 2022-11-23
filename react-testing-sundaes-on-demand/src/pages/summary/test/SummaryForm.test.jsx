import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

test('Initial conditions', () => {
	render(<SummaryForm />);
	const checkbox = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	});
	expect(checkbox).not.toBeChecked();

	const confirmButton = screen.getByRole('button', { name: /confirm order/i });
	expect(confirmButton).toBeDisabled();
});

test('Checkbox enables button on first click and disables on second click', () => {
	render(<SummaryForm />);
	const checkbox = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	});
	const confirmButton = screen.getByRole('button', { name: /confirm order/i });

	userEvent.click(checkbox);
	expect(confirmButton).toBeEnabled();

	userEvent.click(checkbox);
	expect(confirmButton).toBeDisabled();
});

test('Terms and Conditions Popover works', async () => {
	render(<SummaryForm />);

	// initially the popover should not be in the document
	const nullPopover = screen.queryByText(/No ice cream will actually be delivered/i);
	expect(nullPopover).not.toBeInTheDocument();

	// hover and popover should be appeared
	const tc = screen.getByText(/terms and conditions/i);
	userEvent.hover(tc);
	expect(screen.getByText(/No ice cream will actually be delivered/i)).toBeInTheDocument();

	// un hover  and popover should be disappeared
	userEvent.unhover(tc);
	await waitForElementToBeRemoved(() => screen.queryByText(/No ice cream will actually be delivered/));
});
