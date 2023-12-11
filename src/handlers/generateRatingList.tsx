export const generateRatingList = (count: number) => {
	return Array.from({ length: count }, (_, index) => (index + 1).toFixed(1))
}
