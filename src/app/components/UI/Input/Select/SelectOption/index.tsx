import { FC } from 'react'
import Button from '@/app/components/UI/Button'
import classNames from 'classnames'

type PropsType = {
	value: string
	label: string
	className?: string
	onClick?: () => void
	closeList?: () => void
}

const SelectOption: FC<PropsType> = ({
	value,
	label,
	className,
	onClick,
	closeList,
}) => {
	const handleClick = () => {
		onClick(value, label)
		if (closeList) {
			closeList()
		}
	}
	return (
		<Button
			context='listItem'
			onClick={handleClick}
			className={classNames('w-full z-10 text-left', className)}
		>
			{label}
		</Button>
	)
}

export default SelectOption
