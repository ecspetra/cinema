import { FC, MouseEvent } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import Button from '@/app/components/UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type PropsType = {
	label: string
	icon: IconDefinition
	onClick: (event: MouseEvent<HTMLButtonElement>) => void
	closeList?: () => void
}

const DropdownItem: FC<PropsType> = ({ label, icon, onClick, closeList }) => {
	const onChoseDropdownItem = (event: MouseEvent<HTMLButtonElement>) => {
		onClick(event)
		closeList && closeList()
	}

	return (
		<Button
			context='icon-text'
			className='w-full text-left'
			onClick={onChoseDropdownItem}
		>
			<FontAwesomeIcon icon={icon} className='mr-2' />
			<span>{label}</span>
		</Button>
	)
}

export default DropdownItem
