import { ref, remove } from 'firebase/database'
import { database } from '@/firebase/config'

export const removeMarkForMovie = (
	markKey: string,
	userId: string,
	collectionType: string
): Promise<boolean> => {
	const removedMarkPath = `users/${userId}/collection/marks/${collectionType}/${markKey}`
	const removedMarkRef = ref(database, removedMarkPath)

	return new Promise(async resolve => {
		let isMarkRemovedFromCollection = false

		remove(removedMarkRef).then(() => {
			isMarkRemovedFromCollection = true
		})

		resolve(isMarkRemovedFromCollection)
	})
}
