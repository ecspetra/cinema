import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Error from '@/app/components/UI/Error'

type PropsType = {
	id: string
	label: string
	onChange: React.Dispatch<React.SetStateAction<string>>
	type?: 'image' | 'password' | 'text'
	placeholder?: string
	className?: string
	icon?: IconProp
	error?: string
	required?: boolean
}

const InputField: FC<PropsType> = ({
	id,
	label,
	onChange,
	type = 'text',
	placeholder = 'Enter your text...',
	className,
	icon,
	error,
	required,
}) => {
	const [value, setValue] = useState<string>('')

	const handleChange = event => {
		const newValue = event.target.value
		setValue(newValue)
		onChange(newValue)
	}

	return (
		<div className='w-full'>
			<label
				htmlFor={id}
				className={classNames(
					'w-full bg-transparent pt-2 px-4 pb-4 border border-slate-800 hover:border-white focus-within:border-white duration-300 block',
					className,
					error && '!border-red-600'
				)}
			>
				<span className='text-xs text-slate-500 font-semibold'>
					{`${label}${required && ' *'}`}
				</span>
				<div className='flex justify-items-start items-center'>
					{icon && (
						<FontAwesomeIcon className='text-sm mr-2' icon={icon} />
					)}
					<input
						value={value}
						type={type}
						id={id}
						onChange={handleChange}
						placeholder={placeholder}
						className='w-full bg-transparent autofill:shadow-[inset_0_0_0px_1000px_#000000/0] autofill:caret-white outline-none block'
					/>
				</div>
			</label>
			{error && <Error className='self-start' error={error} />}
		</div>
	)
}

export default InputField
