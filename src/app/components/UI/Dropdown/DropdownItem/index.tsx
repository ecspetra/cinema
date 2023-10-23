import React, { FC } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import Button from '@/app/components/UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type PropsType = {
	label: string
	icon: IconDefinition
	onClick: (event) => void
	closeDropdown?: () => void
}

const DropdownItem: FC<PropsType> = ({
	label,
	icon,
	onClick,
	closeDropdown,
}) => {
	const handleClick = event => {
		onClick(event)
		if (closeDropdown) {
			closeDropdown()
		}
	}

	return (
		<li>
			<Button
				context='icon-text'
				className='w-full'
				onClick={handleClick}
			>
				<FontAwesomeIcon icon={icon} className='mr-2' />
				<span>{label}</span>
			</Button>
		</li>
	)
}

export default DropdownItem
