import { useEffect, useState, RefObject } from 'react'

export const useClickOutsideContainer = (
	ref: RefObject<HTMLDivElement>,
	isContainerOpen: boolean = false
) => {
	const [isOpen, setIsOpen] = useState<boolean>(isContainerOpen)

	const onToggleContainer = () => {
		setIsOpen(!isOpen)
	}

	const onOpenContainer = () => {
		setIsOpen(true)
	}

	const onCloseContainer = () => {
		setIsOpen(false)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onCloseContainer()
			}
		}

		document.addEventListener('click', handleClickOutside)

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [ref])

	return { isOpen, onToggleContainer, onOpenContainer, onCloseContainer }
}
