import { FC } from 'react'
import Button from '@/app/components/UI/Button'
import classNames from 'classnames'

type PropsType = {
	value: string
	label: string
	onClick?: (value: string, label: string) => void
	closeList?: () => void
	className?: string
}

const SelectOption: FC<PropsType> = ({
	value,
	label,
	onClick,
	closeList,
	className,
}) => {
	const onChooseSelectOption = () => {
		onClick && onClick(value, label)
		closeList && closeList()
	}
	return (
		<Button
			context='listItem'
			onClick={onChooseSelectOption}
			className={classNames('w-full z-10 text-left', className)}
		>
			{label}
		</Button>
	)
}

export default SelectOption
