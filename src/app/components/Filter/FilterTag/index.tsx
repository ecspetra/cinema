import React, { FC } from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type PropsType = {
	field: string
	tag: string
	onRemove: () => void
}

const FilterTag: FC<PropsType> = ({ field, tag, onRemove }) => {
	return (
		<div className='bg-gray-800 rounded flex justify-center items-center text-xs leading-none px-2 py-1 my-0 mr-1 mb-1 duration-300 last:mr-0'>
			{tag}
			<button onClick={() => onRemove(field, tag)}>
				<FontAwesomeIcon icon={faXmark} className='w-3 h-3 ml-2' />
			</button>
		</div>
	)
}

export default FilterTag
