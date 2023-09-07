import '@/app/globals.css'
import {FC} from 'react'
import {IGenre} from "../../../interfaces"

type PropsType = {
	genre: IGenre;
}

const Genre: FC<PropsType> = ({ genre }) => {
	return (
		<span className="bg-slate-800 rounded flex text-xs leading-none px-2 py-1 my-0 mr-1 mb-1">{genre.name}</span>
	)
}

export default Genre
