import { useEffect, useState } from 'react'

export const useClickOutsideContainer = (ref, isContainerOpen = false) => {
	const [isOpen, setIsOpen] = useState(isContainerOpen)

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
		const handleClickOutside = event => {
			if (ref.current && !ref.current.contains(event.target)) {
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
