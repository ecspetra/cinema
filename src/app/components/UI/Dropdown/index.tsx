import {
	FC,
	ReactNode,
	useState,
	Children,
	isValidElement,
	cloneElement,
	ReactElement,
} from 'react'
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
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const toggleList = () => {
		setIsOpen(!isOpen)
	}

	const closeList = () => {
		setIsOpen(false)
	}

	const childrenWithProps = Children.map(children, child => {
		if (isValidElement(child)) {
			return cloneElement(child as ReactElement, { closeList })
		}
		return child
	})

	return (
		<span
			className={classNames(
				'absolute top-2 right-2 md:top-4 md:right-4',
				className
			)}
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
				<span className='w-52 relative right-0 pt-14 block z-50'>
					<span className='w-full p-2 rounded-md bg-gray-600 block'>
						{childrenWithProps}
					</span>
				</span>
			</CSSTransition>
		</span>
	)
}

export default Dropdown
