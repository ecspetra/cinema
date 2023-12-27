import { FC, ChangeEvent } from 'react'
import classNames from 'classnames'
import Error from '@/app/components/UI/Error'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons'

type PropsType = {
	id: string
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
	error?: string
	className?: string
}

const InputField: FC<PropsType> = ({ id, onChange, error, className }) => {
	return (
		<>
			<label
				htmlFor={id}
				className={classNames(
					'w-full min-h-[48px] bg-gray-700 rounded-3xl hover:bg-gray-600 font-semibold p-3 flex justify-center items-center duration-300 cursor-pointer',
					className
				)}
			>
				<FontAwesomeIcon icon={faFileArrowUp} className='mr-2' />
				Upload image
				<input
					onChange={onChange}
					type='file'
					id={id}
					accept='image/*'
					className='hidden'
				/>
			</label>
			{error && <Error className='text-center' error={error} />}
		</>
	)
}

export default InputField
