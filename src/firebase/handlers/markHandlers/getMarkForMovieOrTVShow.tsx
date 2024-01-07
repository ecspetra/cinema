import { IMarkFromDB } from '../../../../interfaces'
import { get, ref } from 'firebase/database'
import { database } from '@/firebase/config'
import { UserCollections } from '@/constants/enum'

export const getMarkForMovieOrTVShow = (
	userId: string,
	markConfig: {
		markedItemId: number
		collectionType: UserCollections.movie | UserCollections.tv
	}
): Promise<IMarkFromDB | undefined> => {
	const { markedItemId, collectionType } = markConfig
	const marksCollectionPath = `users/${userId}/collection/marks/${collectionType}`
	const marksCollectionRef = ref(database, marksCollectionPath)

	return new Promise(async resolve => {
		get(marksCollectionRef).then(snapshot => {
			let mark

			snapshot.forEach(childSnapshot => {
				const markFromStorage = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}

				if (markFromStorage.data.markedItemId === markedItemId)
					mark = markFromStorage
			})

			resolve(mark)
		})
	})
}
