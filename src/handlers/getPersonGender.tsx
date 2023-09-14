export const getPersonGender = person => {
	const gender = person.gender === 1 ? 'Female' : 'Male'
	return gender
}
