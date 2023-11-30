export const generateYearsList = startYear => {
	const currentYear = new Date().getFullYear()
	startYear = startYear || 1930

	const yearsList = []
	for (let year = startYear; year <= currentYear; year++) {
		yearsList.push(year)
	}

	return yearsList
}
