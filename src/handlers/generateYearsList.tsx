export const generateYearsList = (startYear: number) => {
	const currentYear = new Date().getFullYear()
	const yearsList: number[] = []
	for (let year = startYear; year <= currentYear; year++) {
		yearsList.push(year)
	}

	return yearsList
}
