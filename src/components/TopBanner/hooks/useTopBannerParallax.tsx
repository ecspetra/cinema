import { useEffect, useState } from 'react'

const useTopBannerParallax = (imageSrc: string) => {
	const [scrollY, setScrollY] = useState<number>(0)
	const parallaxFactor = 0.5
	const translateY = scrollY * parallaxFactor

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY)
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return { translateY }
}

export default useTopBannerParallax
