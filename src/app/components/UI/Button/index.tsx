import { FC, MouseEvent, MouseEventHandler, ReactNode } from 'react'
import classNames from 'classnames'

type PropsType = {
	onClick?: MouseEventHandler<HTMLButtonElement>
	onMouseEnter?: MouseEventHandler<HTMLButtonElement>
	onMouseLeave?: MouseEventHandler<HTMLButtonElement>
	children?: ReactNode
	context?:
		| 'filled'
		| 'filledDark'
		| 'empty'
		| 'collection'
		| 'image'
		| 'icon-text'
		| 'icon'
		| 'text'
		| 'listItem'
		| 'tag'
		| 'field'
	className?: string
	type?: 'submit' | 'reset' | 'button'
}

const Button: FC<PropsType> = ({
	onClick,
	onMouseEnter,
	onMouseLeave,
	children,
	context = 'filled',
	className,
	type = 'button',
}) => {
	const filledButtonClassNames =
		'w-full md:w-72 text-xs md:text-sm min-h-[48px] bg-rose-600 border-2 border-transparent rounded-3xl hover:bg-rose-500 text-white p-3 flex justify-center items-center'
	const filledDarkButtonClassNames =
		'w-full md:w-72 text-xs md:text-sm min-h-[48px] bg-gray-700 rounded-3xl hover:bg-gray-600 p-3 flex justify-center items-center'
	const emptyButtonClassNames =
		'w-full md:w-72 text-xs md:text-sm border-2 border-rose-600 text-rose-600 rounded-3xl hover:border-transparent hover:w-full hover:text-rose-500 p-3 flex justify-center items-center'
	const collectionButtonClassNames =
		'w-full md:w-72 text-xs md:text-sm min-h-[48px] border-2 border-rose-600 text-rose-600 rounded-3xl hover:border-rose-500 hover:text-rose-500 p-3 flex justify-center items-center'
	const imageButtonClassNames = 'flex justify-center items-center'
	const textButtonClassNames =
		'text-sm md:text-base inline-flex items-center h-fit text-rose-600 hover:text-rose-500'
	const iconTextButtonClassNames =
		'text-xs md:text-sm rounded-md p-2 bg-gray-600/50 leading-tight hover:bg-rose-900/30 hover:text-rose-500 flex justify-start items-center'
	const iconButtonClassNames =
		'w-9 h-9 md:w-11 md:h-11 flex justify-center items-center bg-gray-700 hover:bg-gray-600 rounded-3xl z-10'
	const listItemButtonClassNames =
		'text-xs md:text-sm w-full py-1 px-2 flex justify-start items-center hover:bg-rose-600 hover:text-white leading-normal'
	const tagButtonClassNames =
		'bg-gray-800 rounded flex justify-center items-center text-xs leading-none px-2 py-1 my-0 mr-1 mb-1 duration-300 last:mr-0'
	const fieldButtonClassNames =
		'text-sm md:text-base w-full h-full text-left bg-transparent border border-gray-500 hover:border-white focus-within:border-white !font-light block'

	const getButtonClassNames = () => {
		switch (context) {
			case 'filled':
				return filledButtonClassNames
			case 'filledDark':
				return filledDarkButtonClassNames
			case 'empty':
				return emptyButtonClassNames
			case 'collection':
				return collectionButtonClassNames
			case 'image':
				return imageButtonClassNames
			case 'text':
				return textButtonClassNames
			case 'icon-text':
				return iconTextButtonClassNames
			case 'icon':
				return iconButtonClassNames
			case 'listItem':
				return listItemButtonClassNames
			case 'tag':
				return tagButtonClassNames
			case 'field':
				return fieldButtonClassNames
		}
	}

	const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
		if (type !== 'submit') {
			event.preventDefault()
			if (onClick) onClick(event)
		}
	}

	return (
		<button
			type={type}
			className={classNames(
				'duration-300 relative leading-none font-semibold',
				className,
				getButtonClassNames()
			)}
			onClick={handleOnClick}
			onMouseEnter={onMouseEnter && onMouseEnter}
			onMouseLeave={onMouseLeave && onMouseLeave}
		>
			{children}
		</button>
	)
}

export default Button
