import { useRef } from 'react'

function useScrollToTop(offset = 0) {
	const scrollRef = useRef<HTMLDivElement | null>(null)

	const scrollToTop = () => {
		if (scrollRef.current) {
			const scrollPosition = scrollRef.current.getBoundingClientRect().top
			window.scrollTo({
				top: window.pageYOffset + scrollPosition - offset,
				behavior: 'smooth',
			})
		}
	}

	return {
		ref: scrollRef,
		scrollToTop,
	}
}

export default useScrollToTop
