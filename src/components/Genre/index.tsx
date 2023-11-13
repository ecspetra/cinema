import React, { FC, useState } from 'react'
import { IGenre } from '../../../interfaces'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

type PropsType = {
	genre: IGenre
	isEdit?: boolean
	isFavorite?: boolean
	onToggle?: (genre: IGenre, isChecked: boolean) => void
}

const Genre: FC<PropsType> = ({
	genre,
	isEdit = false,
	isFavorite = false,
	onToggle,
}) => {
	const [isChecked, setIsChecked] = useState<boolean>(isFavorite)

	const handleToggleIsChecked = () => {
		onToggle(genre, isChecked)
		setIsChecked(!isChecked)
	}

	return (
		<>
			{isEdit ? (
				<button
					onClick={handleToggleIsChecked}
					className={classNames(
						'bg-gray-800 rounded flex justify-center items-center text-xs leading-none px-2 py-1 my-0 mr-1 mb-1 duration-300 last:mr-0',
						isChecked && '!bg-amber-900/50 text-amber-400',
						isEdit && 'hover:bg-amber-900/50'
					)}
				>
					{isChecked && (
						<FontAwesomeIcon
							icon={faCheck}
							className='w-3 h-3 mr-1'
						/>
					)}
					{genre.name}
				</button>
			) : (
				<span className='bg-gray-800 rounded flex text-xs leading-none px-2 py-1 my-0 mr-1 mb-1 last:mr-0'>
					{genre.name}
				</span>
			)}
		</>
	)
}

export default Genre
