import React, { FC, useState } from 'react'
import { ITag } from '../../../interfaces'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

type PropsType = {
	tag: ITag
	isEdit?: boolean
	isSelected?: boolean
	onToggle?: (tag: ITag, isChecked: boolean) => void
	onRemove?: (tag: ITag, isChecked: boolean) => void
}

const Tag: FC<PropsType> = ({
	tag,
	isEdit = false,
	isSelected = false,
	onToggle,
	onRemove,
}) => {
	const [isChecked, setIsChecked] = useState<boolean>(isSelected)

	const handleToggleIsChecked = () => {
		if (onToggle) {
			onToggle(tag, isChecked)
			setIsChecked(!isChecked)
		} else {
			onRemove(tag.name, tag.field)
		}
	}

	return (
		<>
			{isEdit ? (
				<button
					onClick={handleToggleIsChecked}
					className={classNames(
						'bg-gray-800 rounded flex justify-center items-center text-xs leading-none px-2 py-1 my-0 mr-1 mb-1 duration-300 last:mr-0',
						isChecked && '!bg-rose-900/30 text-rose-500',
						isEdit && 'hover:bg-rose-900/30'
					)}
				>
					{isChecked && (
						<FontAwesomeIcon
							icon={faCheck}
							className='w-3 h-3 mr-1'
						/>
					)}
					{tag.name}
					{onRemove && (
						<FontAwesomeIcon
							icon={faXmark}
							className='w-3 h-3 ml-2'
						/>
					)}
				</button>
			) : (
				<span className='bg-gray-800 rounded flex text-xs leading-none px-2 py-1 my-0 mr-1 mb-1 last:mr-0'>
					{tag.name}
				</span>
			)}
		</>
	)
}

export default Tag
