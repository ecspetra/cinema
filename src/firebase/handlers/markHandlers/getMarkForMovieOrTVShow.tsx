import { IMarkFromDB } from '../../../../interfaces'
import { get, ref } from 'firebase/database'
import { database } from '@/firebase/config'

export const getMarkForMovieOrTVShow = (
	markedItemId: number,
	userId: string,
	collectionType: string
): Promise<IMarkFromDB | undefined> => {
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
