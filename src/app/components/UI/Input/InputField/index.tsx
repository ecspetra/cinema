import { ChangeEventHandler, KeyboardEvent, FC, useState } from 'react'
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
	onChange: ChangeEventHandler<HTMLInputElement>
	error?: string
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
	onChange,
	error,
	type = 'text',
	placeholder = 'Enter your text...',
	className,
	icon,
	required,
}) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
	const isPasswordInput = type === 'password'
	const inputClassName =
		'w-full h-full bg-transparent autofill:shadow-[inset_0_0_0px_1000px_#000000/0] autofill:caret-white outline-none block'

	return (
		<div className='w-full h-full'>
			<label
				htmlFor={id}
				className={classNames(
					'w-full h-full bg-transparent pt-1 px-3 pb-2 border border-gray-500 hover:border-white focus-within:border-white duration-300 block',
					className,
					error && '!border-rose-600'
				)}
			>
				<span className='text-xs text-gray-500 font-semibold'>
					{`${label}${required ? ' *' : ''}`}
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
