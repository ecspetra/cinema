import React, { FC, ReactNode, useState } from 'react'
import Button from '@/app/components/UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faGear } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'

type PropsType = {
	children: ReactNode
	icon?: 'settings' | 'dots'
	className?: string
}

const Dropdown: FC<PropsType> = ({ children, icon = 'dots', className }) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleList = event => {
		setIsOpen(!isOpen)
	}

	const closeList = () => {
		setIsOpen(false)
	}

	const childrenWithProps = React.Children.map(children, child => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, { closeList })
		}
		return child
	})

	return (
		<span
			className={classNames('absolute top-4 right-4', className)}
			onMouseLeave={closeList}
		>
			<Button
				className='!absolute top-0 right-0'
				context='icon'
				onClick={toggleList}
			>
				<FontAwesomeIcon
					icon={icon === 'settings' ? faGear : faEllipsisVertical}
					className='w-6 h-6'
				/>
			</Button>
			<CSSTransition
				in={isOpen}
				timeout={300}
				classNames='dropdown'
				unmountOnExit
			>
				<span className='w-52 relative right-0 pt-14 block'>
					<span className='w-full p-2 rounded-md bg-gray-600'>
						{childrenWithProps}
					</span>
				</span>
			</CSSTransition>
		</span>
	)
}

export default Dropdown
