import React, { ChangeEventHandler, FC, useState } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Error from '@/app/components/UI/Error'
import Button from '@/app/components/UI/Button'

type PropsType = {
	id: string
	label: string
	value: string
	error: string
	onChange: ChangeEventHandler<HTMLInputElement>
	type?: 'image' | 'password' | 'text'
	placeholder?: string
	className?: string
	icon?: IconProp
	required?: boolean
}

const InputField: FC<PropsType> = ({
	id,
	label,
	value,
	error,
	onChange,
	type = 'text',
	placeholder = 'Enter your text...',
	className,
	icon,
	required,
}) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
	const isPasswordInput = type === 'password'
	const inputClassName =
		'w-full bg-transparent autofill:shadow-[inset_0_0_0px_1000px_#000000/0] autofill:caret-white outline-none block'

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
				<span className='flex justify-between items-center'>
					<span className='w-full flex justify-start items-center'>
						{icon && (
							<FontAwesomeIcon
								className='text-sm mr-2'
								icon={icon}
							/>
						)}
						{isPasswordInput ? (
							<span className='w-full flex justify-between items-center'>
								<input
									value={value}
									onChange={onChange}
									type={
										isPasswordVisible ? 'text' : 'password'
									}
									id={id}
									placeholder={placeholder}
									className={inputClassName}
								/>
								<Button
									className='w-auto h-auto hover:bg-transparent'
									context='icon'
									onClick={() =>
										setIsPasswordVisible(!isPasswordVisible)
									}
								>
									<FontAwesomeIcon
										icon={
											isPasswordVisible
												? faEyeSlash
												: faEye
										}
									/>
								</Button>
							</span>
						) : (
							<input
								value={value}
								onChange={onChange}
								type={type}
								id={id}
								placeholder={placeholder}
								className={inputClassName}
							/>
						)}
					</span>
				</span>
			</label>
			{error && <Error className='self-start' error={error} />}
		</div>
	)
}

export default InputField
