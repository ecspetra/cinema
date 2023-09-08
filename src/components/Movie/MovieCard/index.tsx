import {IMovieCard} from "../../../../interfaces"
import {FC} from "react"
import defaultMovieImage from "../../../app/assets/images/default-movie-image.svg"
import Link from "next/link"
import Image from "../../Images/Image/index";
import Button from "../../../app/components/UI/Button/index";
import Title from "../../../app/components/UI/Title/Title";
import Genre from "../../Genre/index";

type PropsType = {
	movie: IMovieCard;
}

const MovieCard: FC<PropsType> = ({ movie }) => {
	const test = () => {}

	return (
		<div className="flex flex-col w-full max-w-[232px] mb-8 mr-auto">
			<Link href="/movie/[id]" as={`/movie/${movie.id}`} className="group">
				<Image className="duration-300 mb-4 group-hover:shadow-red-700/70 group-hover:shadow-2xl" src={`https://image.tmdb.org/t/p/w440_and_h660_face${movie.poster_path}`} defaultImage={defaultMovieImage} />
				<Title className="relative z-10" variant="h3">{`${movie.title} (${(new Date(movie.release_date).getFullYear()).toString()})`}</Title>
			</Link>
			<div className="flex flex-wrap mb-2 relative z-10">
				{movie.genres.map((item, idx) => {
					return <Genre key={idx} genre={item} />
				})}
			</div>
			<Button className="mt-auto w-full" onClick={test}>Add to favorites</Button>
		</div>
	)
}

export default MovieCard
