import getAllGenres from '@/handlers/getAllGenres'
import { IMovieCard, ITVShowCard } from '../../interfaces'

export const getMovieGenres = (items, listName) => {
	return new Promise(async resolve => {
		const allGenres = await getAllGenres(listName)
		let movies = []

		items.map(item => {
			let genresNames = []
			let movieWithGenres: ITVShowCard | IMovieCard = null

			item.genre_ids.map(genreId => {
				const equalGenre = allGenres.find(genre => genreId === genre.id)
				genresNames.push(equalGenre)
			})

			if (listName === 'movie') {
				movieWithGenres = {
					id: item.id,
					poster_path: item.poster_path,
					release_date: item.release_date,
					title: item.title,
					genres: genresNames,
				}
			} else {
				movieWithGenres = {
					id: item.id,
					poster_path: item.poster_path,
					first_air_date: item.first_air_date,
					name: item.name,
					genres: genresNames,
				}
			}

			movies.push(movieWithGenres)
		})

		resolve(movies)
	})
}
