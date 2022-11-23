import { render, screen } from '../../../test-utils/library-test-utils';
import Options from '../Options';

test('display image for each scoop option', async () => {
	render(<Options optionType="scoops" />);

	const images = await screen.findAllByRole('img', { name: /scoop$/i });
	expect(images).toHaveLength(2);

	const imagesAlt = images.map((i) => i.alt);
	expect(imagesAlt).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('Display image for each topping option', async () => {
	render(<Options optionType="toppings" />);

	const images = await screen.findAllByRole('img', { name: /topping$/ });
	expect(images).toHaveLength(3);

	const imageAlts = images.map((i) => i.alt);
	expect(imageAlts).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);
});
