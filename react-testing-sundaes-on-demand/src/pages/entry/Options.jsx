import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';

import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import AlertBanner from '../../components/alert-banner/AlertBanner';
import pricePerItem from '../../constants/prices.json';
import { useOrderDetail } from '../../contexts/OrderDetail';

export default function Options({ optionType }) {
	const [items, setItems] = useState([]);
	const [error, setError] = useState(false);
	const [orderDetail, updateOptionCount] = useOrderDetail();

	useEffect(() => {
		(async () => {
			// optionType: scoops, toppings
			try {
				const response = await axios.get(`http://localhost:3030/${optionType}`);
				setItems(response.data);
			} catch (error) {
				setError(true);
			}
		})();
	}, [optionType]);

	if (error) {
		return <AlertBanner />;
	}
	const ElementItem = optionType === 'scoops' ? ScoopOption : ToppingOption;
	const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
	const OptionItems = items.map((i) => (
		<ElementItem
			key={i.name}
			name={i.name}
			imagePath={i.imagePath}
			updateOptionCount={(optionName, count) => updateOptionCount(optionType, optionName, count)}
		/>
	));
	return (
		<>
			<h2>{title}</h2>
			<p>{pricePerItem[optionType]} each</p>
			<p>
				{title} subtotal: {orderDetail.totals[optionType]}
			</p>
			<Row>{OptionItems}</Row>
		</>
	);
}
