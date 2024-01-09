import { FC } from 'react'
import { IBackdrop, IPersonImage } from '../../../../interfaces'
import Image from '../../../components/Images/Image'
import defaultMovieImage from '../../../app/assets/images/default-movie-image.svg'
import Button from '../../../app/components/UI/Button'
import Title from '../../../app/components/UI/Title/Title'
import ImagesSlider from '../ImagesSlider/index'
import { useModal } from '@/context/ModalProvider'
import classNames from 'classnames'
import EmptyList from '@/components/List/EmptyList'
import useItemsToShow from '@/hooks/useItemsToShow'
import { uuidv4 } from '@firebase/util'
import { SLIDER_IMAGE_SRC } from '@/constants/images'

type PropsType = {
	images: IBackdrop[] | IPersonImage[]
	isPersonImages?: boolean
	className?: string
}

const ImagesList: FC<PropsType> = ({
	images,
	isPersonImages = false,
	className,
}) => {
	const { showModal } = useModal()
	const {
		itemsToShow,
		getItemsToShow,
		isShowMoreButton,
		buttonText,
		listRef,
	} = useItemsToShow(images, 12)

	const handleSliderImage = (idx: number) => {
		showModal({
			id: uuidv4(),
			modalTitle: '',
			modalText: '',
			modalClassName: isPersonImages ? '!p-0' : '!max-w-7xl !p-0',
			modalContent: (
				<ImagesSlider
					images={images}
					initialSliderImageIdx={idx}
					isPersonImages={isPersonImages}
				/>
			),
			alertInfo: null,
		})
	}

	if (!images.length) {
		return <EmptyList title='Images' />
	}

	return (
		<div ref={listRef} className={classNames('mb-16', className)}>
			<Title>Images</Title>
			<div className='grid grid-cols-[repeat(auto-fill,calc((100vw-48px)/3))] md:grid-cols-[repeat(auto-fill,calc((100vw-416px)/3))] xl:grid-cols-[repeat(auto-fill,calc(864px/3))] gap-1 justify-start'>
				{(itemsToShow as IBackdrop[]).map((item, idx) => (
					<Button
						key={idx}
						context='image'
						onClick={() => handleSliderImage(idx)}
					>
						<Image
							className={
								isPersonImages
									? 'aspect-[2/3]'
									: 'aspect-[215/121]'
							}
							src={
								item.file_path
									? SLIDER_IMAGE_SRC.replace(
											'{imageSrc}',
											item.file_path
									  )
									: ''
							}
							defaultImage={defaultMovieImage}
						/>
					</Button>
				))}
			</div>
			{isShowMoreButton && (
				<Button
					className='mx-auto mt-8'
					context='empty'
					onClick={getItemsToShow}
				>
					{buttonText}
				</Button>
			)}
		</div>
	)
}

export default ImagesList
