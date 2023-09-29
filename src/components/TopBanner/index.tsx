import React, { FC } from 'react'
import { IBackdrop } from '../../../interfaces'
import defaultMovieBg from '@/app/assets/images/default-movie-bg.jpg'
import Image from '@/components/Images/Image'

type PropsType = {
	image: IBackdrop
}

const TopBanner: FC<PropsType> = ({ image }) => {
	return (
		<div className='w-screen h-[600px] -mb-40 relative inset-x-1/2 -translate-x-1/2 after:w-full after:absolute after:bottom-0 after:h-full after:bg-gradient-to-t from-black overflow-hidden'>
			<Image
				className='aspect-[215/121] inset-x-1/2 inset-y-1/2 -translate-x-1/2 -translate-y-1/2'
				src={`https://image.tmdb.org/t/p/original${image?.file_path}`}
				defaultImage={defaultMovieBg}
			/>
		</div>
	)
}

export default TopBanner
