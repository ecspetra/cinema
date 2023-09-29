import React, { FC } from 'react'
import defaultMovieBg from '@/app/assets/images/default-movie-bg.jpg'
import Image from '@/components/Images/Image'

type PropsType = {
	imageSrc: string
}

const TopBanner: FC<PropsType> = ({ imageSrc }) => {
	return (
		<div className='w-screen h-[600px] -mb-40 relative inset-x-1/2 -translate-x-1/2 after:w-full after:absolute after:bottom-0 after:h-full after:bg-gradient-to-t from-black overflow-hidden'>
			<Image
				className='aspect-[215/121] inset-x-1/2 inset-y-1/2 -translate-x-1/2 -translate-y-1/2'
				src={`https://image.tmdb.org/t/p/original${imageSrc}`}
				defaultImage={defaultMovieBg}
			/>
		</div>
	)
}

export default TopBanner
