import { FC, useEffect, useState } from 'react'
import Title from '@/app/components/UI/Title/Title'

type PropsType = {
	name: string
	label: string
	onToggle: () => void
	isSelected: boolean
}

const Checkbox: FC<PropsType> = ({ name, label, onToggle, isSelected }) => {
	const [isChecked, setIsChecked] = useState<boolean>(false)

	const handleOnChange = () => {
		onToggle(name, !isChecked)
		setIsChecked(!isChecked)
	}

	useEffect(() => {
		setIsChecked(isSelected)
	}, [isSelected])

	return (
		<label className='relative h-fit inline-flex items-center cursor-pointer'>
			<Title variant='h3' className='mr-3 mb-0'>
				{label}
			</Title>
			<input
				type='checkbox'
				id={label}
				checked={isChecked}
				onChange={handleOnChange}
				className='sr-only peer'
			/>
			<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
		</label>
	)
}

export default Checkbox
