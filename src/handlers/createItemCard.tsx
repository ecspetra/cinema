import { IItemCard, ITag, IUpcomingMovieItem } from '../../interfaces'
import { getAllGenres } from '@/handlers/getAllGenres'

export const createItemCard = (items: IItemCard[]) => {
	return new Promise(async (resolve, reject) => {
		try {
			const allGenres: ITag[] = await getAllGenres('all')
			let cards: IItemCard[] | IUpcomingMovieItem[] = []

			items.map(item => {
				const itemGenres: number[] | ITag[] | undefined =
					item.genre_ids ?? item.genres
				let genresNames: ITag[] = []
				let card: IItemCard | IUpcomingMovieItem

				if (itemGenres) {
					itemGenres.map(genre => {
						let equalGenre: ITag | undefined
						if (typeof genre === 'number') {
							equalGenre = allGenres.find(
								genreFromDB => genreFromDB.id === genre
							)
						} else {
							equalGenre = allGenres.find(
								genreFromDB => genreFromDB.id === genre.id
							)
						}

						if (equalGenre) genresNames.push(equalGenre)
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
		} catch (error) {
			reject(error)
		}
	})
}
