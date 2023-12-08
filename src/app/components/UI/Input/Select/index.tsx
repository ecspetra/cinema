import React, { JSX, useState, FC, useRef } from 'react'
import classNames from 'classnames'
import { useClickOutsideContainer } from '@/hooks/useClickOutsideContainer'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@/app/components/UI/Button'

type PropsType = {
	children: JSX.Element
	name: string
	label: string
	onChange: () => void
	className?: string
}

const Select: FC<PropsType> = ({
	children,
	name,
	label,
	onChange,
	className,
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [selectedOption, setSelectedOption] = useState('Select')
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

	return (
		<div
			ref={containerRef}
			className={classNames('relative w-full h-16', className)}
		>
			<Button context='field' onClick={onToggleContainer}>
				<span className='text-xs text-gray-500 font-semibold absolute top-2 left-3 z-10'>
					{label}
				</span>
				<span className='absolute top-8 left-3 w-[calc(100%-22px)] flex justify-between items-center'>
					<span className='truncate'>{selectedOption}</span>
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
