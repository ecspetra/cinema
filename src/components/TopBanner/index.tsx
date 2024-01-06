import { FC, useState, useEffect } from 'react'
import defaultMovieBg from '@/app/assets/images/default-movie-bg.jpg'
import Image from '@/components/Images/Image'
import classNames from 'classnames'
import { ORIGINAL_IMAGE_SRC } from '@/constants/images'
import useToBannerParallax from '@/components/TopBanner/hooks/useToBannerParallax'

type PropsType = {
	imageSrc?: string
	className?: string
}

const TopBanner: FC<PropsType> = ({ imageSrc, className }) => {
	const { translateY } = useToBannerParallax(imageSrc)

	const imageFullSrc = imageSrc
		? ORIGINAL_IMAGE_SRC.replace('{imageSrc}', imageSrc)
		: ''
	const imageKey = imageSrc || 'default'
	const imageComponent = (
		<Image
			key={imageKey}
			className='aspect-[215/121] inset-x-1/2 top-1/4 -translate-x-1/2 -translate-y-1/4'
			src={imageFullSrc}
			defaultImage={defaultMovieBg}
			loaderClassName='bg-transparent'
		/>
	)

	return (
		<div
			className={classNames(
				'w-screen h-[600px] -z-10 -mb-40 relative inset-x-1/2 -translate-x-1/2 after:w-full after:absolute after:bottom-0 after:h-4/5 after:bg-gradient-to-t from-gray-950 overflow-hidden',
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
