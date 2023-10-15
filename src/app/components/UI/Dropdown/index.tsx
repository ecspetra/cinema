import React, { FC, ReactNode, useState } from 'react'
import Button from '@/app/components/UI/Button'

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
		<div className='absolute top-4 right-4'>
			<Button context='icon' onClick={toggleDropdown}>
				Open
			</Button>
			{isOpen && (
				<div className='pt-2'>
					<ul className='w-52 absolute top-full right-0 p-2 rounded-md bg-slate-600'>
						{childrenWithProps}
					</ul>
				</div>
			)}
		</div>
	)
}

export default Dropdown
