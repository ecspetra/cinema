import { useRef } from 'react'

function useScrollToTop(offset = 0) {
	const listRef = useRef<HTMLDivElement | null>(null)

	const scrollToTop = () => {
		if (listRef.current) {
			const scrollPosition = listRef.current.getBoundingClientRect().top
			window.scrollTo({
				top: window.pageYOffset + scrollPosition - offset,
				behavior: 'smooth',
			})
		}
	}

	return {
		listRef,
		scrollToTop,
	}
}

export default useScrollToTop
