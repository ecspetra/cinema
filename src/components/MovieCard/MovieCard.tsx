import {IMovieCard} from "../../../interfaces";
import {FC} from "react"

type PropsType = {
	movie: IMovieCard;
}

const MovieCard: FC<PropsType> = ({ movie }) => {
	return (
		<div>
			{movie.id}
			{movie.title}
		</div>
	)
}

export default MovieCard
