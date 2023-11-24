import React, { JSX, useState, FC } from 'react'
import classNames from 'classnames'

type PropsType = {
	children: JSX.Element
	name: string
	label: string
	onChange: () => void
	className?: string
}

const Select: FC<PropsType> = ({
	children,
	name,
	label,
	onChange,
	className,
}) => {
	const [selectedOption, setSelectedOption] = useState('')

	const handleSelectChange = event => {
		if (name) {
			onChange(name, event.target.value)
		} else {
			onChange(event.target.value)
		}
		setSelectedOption(event.target.value)
	}

	return (
		<label
			htmlFor='selectOption'
			className={classNames(
				'w-full h-full relative bg-transparent border border-gray-500 hover:border-white focus-within:border-white duration-300 block',
				className
			)}
		>
			<span className='text-xs text-gray-500 font-semibold absolute top-4 left-4'>
				{label}
			</span>
			<select
				id='selectOption'
				value={selectedOption}
				onChange={handleSelectChange}
				className='w-full relative left-0 top-0 pl-4 pt-8 pb-4 pr-4 bg-transparent autofill:shadow-[inset_0_0_0px_1000px_#000000/0] autofill:caret-white outline-none block'
			>
				{children}
			</select>
		</label>
	)
}

export default Select
