import { IMarkFromDB } from '../../../../interfaces'
import { get, ref } from 'firebase/database'
import { database } from '@/firebase/config'

export const getMarkForMovieOrTVShow = (
	markedItemId: number,
	userId: string,
	collectionType: string
): Promise<IMarkFromDB | undefined> => {
	const marksCollectionRef = ref(
		database,
		`users/${userId}/collection/marks/${collectionType}`
	)

	return new Promise(async resolve => {
		get(marksCollectionRef).then(snapshot => {
			let response

			snapshot.forEach(childSnapshot => {
				const mark = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}

				if (mark.data.markedItemId === markedItemId) response = mark
			})

			resolve(response)
		})
	})
}
