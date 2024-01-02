import { ref, remove } from 'firebase/database'
import { database } from '@/firebase/config'

export const removeMarkForMovie = (
	markKey: string,
	userId: string,
	collectionType: string
) => {
	const markRef = ref(
		database,
		`users/${userId}/collection/marks/${collectionType}/${markKey}`
	)

	return new Promise(async resolve => {
		let isRemoved = false

		remove(markRef).then(() => {
			isRemoved = true
		})

		resolve(isRemoved)
	})
}
