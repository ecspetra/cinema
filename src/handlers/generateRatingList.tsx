export const generateRatingList = count => {
	const numberArray = Array.from({ length: 10 }, (_, index) =>
		(index + 1).toFixed(1)
	)

	return numberArray
}
