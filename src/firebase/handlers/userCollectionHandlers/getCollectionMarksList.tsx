import { get, ref } from 'firebase/database'
import { UserCollections } from '@/constants/enum'
import { database } from '@/firebase/config'

export const getCollectionMarksList = async (userId: string) => {
	try {
		const getMarks = async type => {
			let items = []
			const collectionPath = `users/${userId}/collection/marks/${type}`
			const collectionRef = ref(database, collectionPath)
			const snapshot = await get(collectionRef)

			if (snapshot.exists()) {
				snapshot.forEach(childSnapshot => {
					const item = childSnapshot.val()
					items.push(item)
				})
			}

			return items
		}

		const movieMarks = await getMarks(UserCollections.movie)
		const tvMarks = await getMarks(UserCollections.tv)

		return [...movieMarks, ...tvMarks]
	} catch (error) {
		throw error
	}
}
