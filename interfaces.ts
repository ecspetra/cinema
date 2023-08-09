export interface IGenre {
	id: string;
	name: string;
}

export interface IMovieCard {
	id: string;
	poster_path: string;
	release_date: string;
	title: string;
	// genres: Array<IGenre>;
}