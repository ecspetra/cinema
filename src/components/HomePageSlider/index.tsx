import { FC, useEffect, useState } from 'react'
import HomePageSliderItemsList from '@/components/HomePageSlider/HomePageSliderItemsList'
import Image from '@/components/Images/Image'
import defaultMovieImage from '@/app/assets/images/default-movie-image.svg'
import TopBanner from '@/components/TopBanner'
import { fetchItemData } from '@/handlers/fetchItemData'
import Title from '@/app/components/UI/Title/Title'
import ReactPlayer from 'react-player'
import {
	IFetchedResult,
	IUpcomingMovieItem,
	IVideoData,
} from '../../../interfaces'
import { CARD_IMAGE_SRC, ORIGINAL_IMAGE_SRC } from '@/constants/images'
import { UserCollections } from '@/constants/enum'

type PropsType = {
	itemsList: IFetchedResult<IUpcomingMovieItem>
}

const HomePageSlider: FC<PropsType> = ({ itemsList }) => {
	const [selectedItem, setSelectedItem] = useState<IUpcomingMovieItem>(
		itemsList.items[0]
	)
	const [imageSrc, setImageSrc] = useState<string>('')
	const [videoSrc, setVideoSrc] = useState<string>('')
	const imageFullSrc = imageSrc
		? ORIGINAL_IMAGE_SRC.replace('{imageSrc}', imageSrc)
		: ''

	const getSelectedItemImageSrc = async () => {
		const images = await fetchItemData(
			UserCollections.movie,
			selectedItem.id,
			'/images'
		)
		const videos = await fetchItemData(
			UserCollections.movie,
			selectedItem.id,
			'/videos'
		)
		const movieTeaser =
			videos.results.length > 0 &&
			videos.results.find(
				(item: IVideoData) =>
					(item.type === 'Teaser' || item.type === 'Trailer') &&
					item.site === 'YouTube'
			)
		const image = images.backdrops[0]?.file_path
		const imageSrc = image || ''
		const videoSrc = movieTeaser.key || ''

		setImageSrc(imageSrc)
		setVideoSrc(videoSrc)
	}

	useEffect(() => {
		if (selectedItem) getSelectedItemImageSrc()
	}, [selectedItem])

	return (
		<>
			<TopBanner
				imageSrc={imageFullSrc}
				className='-mb-72 after:h-full'
			/>
			<Title>Upcoming movies</Title>
			<div className='flex justify-between items-stretch max-h-[500px] gap-4 mb-16'>
				{videoSrc ? (
					<ReactPlayer
						url={`https://www.youtube.com/watch?v=${videoSrc}`}
						controls={true}
						width={'100%'}
						style={{ minHeight: `500px` }}
					/>
				) : (
					<Image
						src={imageFullSrc}
						defaultImage={defaultMovieImage}
						className='aspect-[215/121]'
					/>
				)}
				<HomePageSliderItemsList
					itemsList={itemsList.items}
					isMoreDataAvailable={itemsList.isMoreDataAvailable}
					selectedItemId={selectedItem ? selectedItem.id : undefined}
					onSelectItem={setSelectedItem}
				/>
			</div>
		</>
	)
}

export default HomePageSlider
