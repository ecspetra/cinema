import MovieCard from "../../MovieCard/MovieCard"
import {IMovieCard} from "../../../../interfaces"
import {FC} from "react"

type PropsType = {
	defaultMovies: Array<IMovieCard>;
}

const MoviesListDefault: FC<PropsType> = ({ defaultMovies }) => {
	return (
		<div className="flex flex-nowrap">
			{defaultMovies.map((item: IMovieCard) => {
				return <MovieCard key={item.id} movie={item}/>
			})}
		</div>
	)
}

export default MoviesListDefault
