export const generateYearsList = (startYear: number) => {
	const currentYear = new Date().getFullYear()
	const yearsList: string[] = []
	for (let year = startYear; year <= currentYear; year++) {
		yearsList.push(year.toString())
	}

	return yearsList
}
