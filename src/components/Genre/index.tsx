import '@/app/globals.css'
import {FC} from 'react'
import {IGenre} from "../../../interfaces"

type PropsType = {
	genre: IGenre;
}

const Genre: FC<PropsType> = ({ genre }) => {
	return (
		<span className="bg-slate-900 rounded flex text-xs leading-none font-extralight p-[4px] my-0 mr-1 mb-1">{genre.name}</span>
	)
}

export default Genre
