import React, {FC} from 'react'
import classNames from "classnames"

type PropsType = {
	onClick: React.MouseEventHandler;
	children?: string | JSX.Element | JSX.Element[];
	context?: 'filled' | 'empty' | 'icon-text' | 'icon' | 'text';
	className?: string;
}

const Button: FC<PropsType> = ({ onClick, children, context= 'filled', className }) => {
	const filledButtonClassNames = "w-full bg-violet-700 rounded-md hover:bg-violet-600 font-semibold p-[10px] flex justify-center items-center"
	const emptyButtonClassNames = "w-full border-2 rounded-md hover:bg-violet-600 hover:border-transparent font-semibold p-[10px] flex justify-center items-center"
	const textButtonClassNames = "rounded-md inline-flex w-auto p-0 bg-transparent text-violet-500 underline hover:text-violet-400 hover:no-underline"
	const iconTextButtonClassNames = "w-full bg-violet-700 rounded-md"
	const iconButtonClassNames = "w-full bg-violet-700 rounded-md"

	const getButtonClassNames = () => {
		switch (context) {
			case 'filled': return filledButtonClassNames
			case 'empty': return emptyButtonClassNames
			case 'text': return textButtonClassNames
			case 'icon-text': return iconTextButtonClassNames
			case 'icon': return iconButtonClassNames
		}
	}

	return (
		<button className={classNames('duration-300', className, getButtonClassNames())} onClick={(event) => {onClick(event)}}>{children}</button>
	)
}

export default Button
