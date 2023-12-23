export const getPersonGender = (gender: number) => {
	const genderText = gender === 1 ? 'Female' : 'Male'
	return genderText
}
