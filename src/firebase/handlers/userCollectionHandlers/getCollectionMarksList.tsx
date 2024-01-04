import { get, ref } from 'firebase/database'
import { UserCollections } from '@/constants/enum'
import { database } from '@/firebase/config'
import { IMark } from '../../../../interfaces'

export const getCollectionMarksList = async (userId: string) => {
	try {
		const getMarks = async (
			markedItemType: UserCollections.movie | UserCollections.tv
		) => {
			let items: IMark[] = []
			const collectionPathForMarksList = `users/${userId}/collection/marks/${markedItemType}`
			const collectionRefForMarksList = ref(
				database,
				collectionPathForMarksList
			)
			const snapshot = await get(collectionRefForMarksList)

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
