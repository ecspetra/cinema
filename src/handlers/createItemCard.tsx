import { IItemCard, ITag } from '../../interfaces'
import { getAllGenres } from '@/handlers/getAllGenres'

export const createItemCard = items => {
	return new Promise(async resolve => {
		const allGenres = await getAllGenres('all')
		let cards: Array<IItemCard> = []
		items.map(item => {
			const itemGenres = item.genre_ids ?? item.genres
			let genresNames: Array<ITag> = []
			let card: IItemCard

			if (itemGenres) {
				itemGenres.map(genre => {
					const equalGenre = allGenres.find(
						genreFromDB => genreFromDB.id === genre.id
					)
					genresNames.push(equalGenre)
				})
			}

			card = {
				id: item.id,
				...(item.media_type !== undefined && {
					media_type: item.media_type,
				}),
				...(item.gender !== undefined && { gender: item.gender }),
				...(item.poster_path !== undefined && {
					poster_path: item.poster_path,
				}),
				...(item.profile_path !== undefined && {
					profile_path: item.profile_path,
				}),
				...(item.release_date !== undefined && {
					release_date: item.release_date,
				}),
				...(item.first_air_date !== undefined && {
					first_air_date: item.first_air_date,
				}),
				...(item.title !== undefined && { title: item.title }),
				...(item.name !== undefined && { name: item.name }),
				...(itemGenres !== undefined && {
					genres: genresNames.filter(Boolean),
				}),
				...(item.known_for_department !== undefined && {
					known_for_department: item.known_for_department,
				}),
				...(item.character !== undefined && {
					character: item.character,
				}),
				...(item.job !== undefined && { job: item.job }),
			}

			cards.push(card)
		})

		resolve(cards)
	})
}
