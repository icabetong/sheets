export function getCurrencyFormatter(withDecimal = true): Intl.NumberFormat {
	return Intl.NumberFormat('en-PH', {
		style: 'currency',
		currency: 'PHP',
		maximumFractionDigits: withDecimal ? 2 : 0,
		minimumFractionDigits: withDecimal ? 2 : 0
	})
}

export function getDateTimeFormatter(
	dateStyle: 'medium' | 'short' | 'full' | 'long' = 'medium',
	timeStyle: 'medium' | 'short' | 'full' | 'long' = 'short'
): Intl.DateTimeFormat {
	return Intl.DateTimeFormat('en-PH', { dateStyle: dateStyle, timeStyle: timeStyle })
}
