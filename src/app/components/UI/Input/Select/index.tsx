import React, { JSX, useState, FC, useRef, ReactNode, useEffect } from 'react'
import classNames from 'classnames'
import { useClickOutsideContainer } from '@/hooks/useClickOutsideContainer'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@/app/components/UI/Button'
import { FilterFormData } from '@/hooks/useFilterReducer'

type PropsType = {
	children: ReactNode[]
	name: string
	label: string
	onChange: (field: keyof FilterFormData, value: any) => void
	defaultValue: string
	className?: string
}

const Select: FC<PropsType> = ({
	children,
	name,
	label,
	onChange,
	defaultValue,
	className,
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [selectedOption, setSelectedOption] = useState(defaultValue)
	const { isOpen, onToggleContainer, onCloseContainer } =
		useClickOutsideContainer(containerRef)

	const handleSelectChange = (value, label) => {
		if (name) {
			onChange(name, value)
		} else {
			onChange(value)
		}
		setSelectedOption(label)
	}

	const childrenWithProps = React.Children.map(children, child => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, {
				onClick: handleSelectChange,
				closeList: onCloseContainer,
			})
		}
		return child
	})

	useEffect(() => {
		if (defaultValue) {
			setSelectedOption(defaultValue)
		}
	}, [defaultValue])

	return (
		<div
			ref={containerRef}
			className={classNames('relative w-full h-16', className)}
		>
			<Button context='field' onClick={onToggleContainer}>
				<span className='text-xs text-gray-500 font-semibold absolute top-2 left-3 z-10'>
					{label}
				</span>
				<span className='absolute top-7 left-3 w-[calc(100%-22px)] flex justify-between items-center'>
					<span className='truncate leading-5'>{selectedOption}</span>
					<FontAwesomeIcon icon={faChevronDown} />
				</span>
			</Button>
			{isOpen && (
				<div className='w-full absolute top-full flex flex-col items-center flex-none h-60 border border-gray-500 overflow-y-auto scrollbar-hide bg-gray-950 shadow-[0_35px_60px_15px_rgba(3,7,18,1)] z-20'>
					{childrenWithProps}
				</div>
			)}
		</div>
	)
}

export default Select
