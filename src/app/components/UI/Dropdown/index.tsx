import React, { FC, ReactNode, useState } from 'react'
import Button from '@/app/components/UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

type PropsType = {
	children: ReactNode
}

const Dropdown: FC<PropsType> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleDropdown = () => {
		setIsOpen(!isOpen)
	}

	const closeDropdown = () => {
		setIsOpen(false)
	}

	const childrenWithProps = React.Children.map(children, child => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, { closeDropdown })
		}
		return child
	})

	return (
		<div className='absolute top-4 right-4' onMouseLeave={closeDropdown}>
			<Button
				className='!absolute top-0 right-0'
				context='icon'
				onClick={toggleDropdown}
			>
				<FontAwesomeIcon
					icon={faEllipsisVertical}
					className='w-6 h-6'
				/>
			</Button>
			{isOpen && (
				<div className='w-52 relative right-0 pt-14'>
					<ul className='w-full p-2 rounded-md bg-slate-600'>
						{childrenWithProps}
					</ul>
				</div>
			)}
		</div>
	)
}

export default Dropdown
