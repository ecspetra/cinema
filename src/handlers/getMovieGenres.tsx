import getAllGenres from '@/handlers/getAllGenres'

export const getMovieGenres = movie => {
	return new Promise(async resolve => {
		const allGenres = await getAllGenres()

		const genresNames = movie.genre_ids.map(genreId => {
			const equalGenre = allGenres.find(genre => genreId === genre.id)
			return equalGenre
		})

		const movieWithGenres = {
			id: movie.id,
			poster_path: movie.poster_path,
			release_date: movie.release_date,
			title: movie.title,
			genres: genresNames,
		}

		resolve(movieWithGenres)
	})
}
