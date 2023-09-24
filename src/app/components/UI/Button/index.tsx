import React, { FC } from 'react'
import classNames from 'classnames'

type PropsType = {
	onClick?: React.MouseEventHandler
	onMouseEnter?: React.MouseEventHandler
	onMouseLeave?: React.MouseEventHandler
	children?: string | JSX.Element | JSX.Element[]
	context?:
		| 'filled'
		| 'empty'
		| 'favorite'
		| 'image'
		| 'icon-text'
		| 'icon'
		| 'text'
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
		'w-72 min-h-[48px] bg-red-600 border-2 border-transparent rounded-md hover:bg-orange-500 font-semibold p-3 flex justify-center items-center'
	const emptyButtonClassNames =
		'w-72 border-2 border-red-600 text-red-600 rounded-md hover:border-transparent hover:w-full hover:text-orange-500 font-semibold p-3 flex justify-center items-center'
	const favoriteButtonClassNames =
		'w-72 min-h-[48px] border-2 border-red-600 text-red-600 rounded-md hover:border-orange-500 hover:text-orange-500 font-semibold p-3 flex justify-center items-center'
	const imageButtonClassNames = 'flex justify-center items-center'
	const textButtonClassNames =
		'inline-flex text-red-500 border-b border-red-500 hover:text-orange-500 hover:border-transparent'
	const iconTextButtonClassNames = 'w-full bg-slate-800 rounded-md'
	const iconButtonClassNames =
		'w-11 h-11 flex justify-center items-center bg-slate-800 hover:bg-slate-700 rounded-md z-50'

	const getButtonClassNames = () => {
		switch (context) {
			case 'filled':
				return filledButtonClassNames
			case 'empty':
				return emptyButtonClassNames
			case 'favorite':
				return favoriteButtonClassNames
			case 'image':
				return imageButtonClassNames
			case 'text':
				return textButtonClassNames
			case 'icon-text':
				return iconTextButtonClassNames
			case 'icon':
				return iconButtonClassNames
		}
	}

	return (
		<button
			type={type}
			className={classNames(
				'duration-300 relative leading-none',
				className,
				getButtonClassNames()
			)}
			onClick={event => {
				onClick && onClick(event)
			}}
			onMouseEnter={onMouseEnter && onMouseEnter}
			onMouseLeave={onMouseLeave && onMouseLeave}
		>
			{children}
		</button>
	)
}

export default Button
