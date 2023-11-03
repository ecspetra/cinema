import React, { FC, useState, useEffect } from 'react'
import defaultMovieBg from '@/app/assets/images/default-movie-bg.jpg'
import Image from '@/components/Images/Image'
import classNames from 'classnames'

type PropsType = {
	imageSrc?: string
	className?: string
}

const TopBanner: FC<PropsType> = ({ imageSrc, className }) => {
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

	const imageKey = imageSrc || 'default'
	const imageComponent = (
		<Image
			key={imageKey}
			className='aspect-[215/121] inset-x-1/2 top-1/4 -translate-x-1/2 -translate-y-1/4'
			src={`https://image.tmdb.org/t/p/original${imageSrc}`}
			defaultImage={defaultMovieBg}
			loaderClassName='bg-transparent'
		/>
	)

	return (
		<div
			className={classNames(
				'w-screen h-[600px] -mb-40 relative inset-x-1/2 -translate-x-1/2 after:w-full after:absolute after:bottom-0 after:h-4/5 after:bg-gradient-to-t from-black overflow-hidden',
				className
			)}
		>
			<div style={{ transform: `translateY(${translateY}px)` }}>
				{imageComponent}
			</div>
		</div>
	)
}

export default TopBanner
