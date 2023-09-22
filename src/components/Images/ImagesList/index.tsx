import React, { FC, useEffect, useState } from 'react'
import { IBackdrop } from '../../../../interfaces'
import Image from '../../../components/Images/Image'
import defaultMovieImage from '../../../app/assets/images/default-movie-image.svg'
import Button from '../../../app/components/UI/Button'
import Title from '../../../app/components/UI/Title/Title'
import ImagesSlider from '../ImagesSlider/index'
import { useModal } from '@/context/ModalProvider'

type PropsType = {
	images: Array<IBackdrop>
}

const ImagesList: FC<PropsType> = ({ images }) => {
	const [imagesToShow, setImagesToShow] = useState<Array<IBackdrop>>([])
	const [initialSliderImageIdx, setInitialSliderImageIdx] =
		useState<number>(0)
	const { showModal } = useModal()
	const initialImagesNumber = 12
	const isAllImagesLoaded = imagesToShow.length > initialImagesNumber
	const isShowMoreButton = images.length > initialImagesNumber
	const buttonText = isAllImagesLoaded ? 'Show less' : 'Show all'

	const getImages = () => {
		const imagesToDisplay = isAllImagesLoaded
			? images.slice(0, initialImagesNumber)
			: images
		setImagesToShow(imagesToDisplay)
	}

	const handleSliderImage = (idx: number) => {
		showModal({
			modalTitle: '',
			modalText: '',
			modalClassName: '!max-w-7xl !p-0',
			modalContent: (
				<ImagesSlider
					images={images}
					initialSliderImageIdx={initialSliderImageIdx}
				/>
			),
		})
		setInitialSliderImageIdx(idx)
	}

	useEffect(() => {
		const initialImages = images.slice(0, initialImagesNumber)
		setImagesToShow(initialImages)
	}, [images])

	if (!images.length) {
		return (
			<div className='mb-16'>
				<Title>Images</Title>
				<p>No images yet</p>
			</div>
		)
	}

	return (
		<>
			<Title>Images</Title>
			<div className='mb-16'>
				<div className='grid grid-cols-[repeat(auto-fill,215px)] gap-1 justify-start'>
					{imagesToShow.map((item, idx) => (
						<Button
							key={idx}
							context='image'
							onClick={() => handleSliderImage(idx)}
						>
							<Image
								className='aspect-[215/121]'
								src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
								defaultImage={defaultMovieImage}
							/>
						</Button>
					))}
				</div>
				{isShowMoreButton && (
					<Button
						className='mx-auto mt-8'
						context='empty'
						onClick={getImages}
					>
						{buttonText}
					</Button>
				)}
			</div>
		</>
	)
}

export default ImagesList
