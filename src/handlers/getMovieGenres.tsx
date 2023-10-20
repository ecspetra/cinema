import getAllGenres from '@/handlers/getAllGenres'

export const getMovieGenres = items => {
	return new Promise(async resolve => {
		const allGenres = await getAllGenres()
		let movies = []

		items.map(item => {
			let genresNames = []

			item.genre_ids.map(genreId => {
				const equalGenre = allGenres.find(genre => genreId === genre.id)
				genresNames.push(equalGenre)
			})

			const movieWithGenres = {
				id: item.id,
				poster_path: item.poster_path,
				release_date: item.release_date,
				title: item.title,
				genres: genresNames,
			}

			movies.push(movieWithGenres)
		})

		resolve(movies)
	})
}
