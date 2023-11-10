import React, { FC, useState } from 'react'
import Error from '@/app/components/UI/Error'
import classNames from 'classnames'

type PropsType = {
	onChange: React.Dispatch<React.SetStateAction<string>>
	value: string
	error?: string
	placeholder?: string
	className?: string
}

const Textarea: FC<PropsType> = ({
	onChange,
	value,
	error,
	placeholder = 'Enter text...',
	className,
}) => {
	const handleChange = event => {
		const newValue = event.target.value
		onChange(newValue)
	}

	return (
		<>
			<textarea
				value={value}
				onChange={handleChange}
				onClick={event => event.preventDefault()}
				rows={6}
				className={classNames(
					'w-full bg-transparent p-4 border border-gray-500 hover:border-white duration-300 resize-none outline-none block',
					className,
					error && '!border-amber-600'
				)}
				placeholder={placeholder}
			/>
			{error && <Error className='self-start' error={error} />}
		</>
	)
}

export default Textarea
