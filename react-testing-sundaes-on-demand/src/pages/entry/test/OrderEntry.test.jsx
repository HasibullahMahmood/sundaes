import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';

import { server } from '../../../mocks/server';
import OrderEntry from '../OrderEntry';
import { OrderDetailProvider } from '../../../contexts/OrderDetail';

test('Order entry catches error correctly', async () => {
	server.resetHandlers(
		rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
			return res(ctx.status(500));
		}),
		rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
			return res(ctx.status(500));
		})
	);

	render(<OrderEntry />, { wrapper: OrderDetailProvider });

	await waitFor(async () => {
		const alerts = await screen.findAllByRole('alert');
		expect(alerts).toHaveLength(2);
	});
});
