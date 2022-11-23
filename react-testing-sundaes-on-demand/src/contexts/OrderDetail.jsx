import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import prices from '../constants/prices.json';

const OrderDetailContext = createContext();

export const useOrderDetail = () => {
	const context = useContext(OrderDetailContext);
	if (!context) {
		throw new Error('The component needs be wrapped by the context provider.');
	}

	return context;
};

const calculateSubtotal = (optionType, optionCounts) => {
	let totalCount = 0;
	for (const count of optionCounts[optionType].values()) {
		totalCount += count;
	}

	return totalCount * prices[optionType];
};

const formatToCurrency = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2,
});

export const OrderDetailProvider = (props) => {
	const [optionCounts, setOptionCounts] = useState({
		scoops: new Map(),
		toppings: new Map(),
	});

	const zeroCurrency = formatToCurrency.format(0);

	const [totals, setTotals] = useState({
		scoops: zeroCurrency,
		toppings: zeroCurrency,
		grandTotal: zeroCurrency,
	});

	useEffect(() => {
		const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
		const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
		const grandTotal = scoopsSubtotal + toppingsSubtotal;
		setTotals({
			scoops: formatToCurrency.format(scoopsSubtotal),
			toppings: formatToCurrency.format(toppingsSubtotal),
			grandTotal: formatToCurrency.format(grandTotal),
		});
	}, [optionCounts]);

	const reset = () => {
		setOptionCounts({
			scoops: new Map(),
			toppings: new Map(),
		});
	};

	const value = useMemo(() => {
		const updateCounts = (optionType, optionName, count) => {
			const newOptionCounts = { ...optionCounts };
			newOptionCounts[optionType].set(optionName, +count);
			setOptionCounts(newOptionCounts);
		};
		return [{ ...optionCounts, totals }, updateCounts, reset];
	}, [optionCounts, totals]);

	return <OrderDetailContext.Provider value={value} {...props} />;
};
