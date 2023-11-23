import { FC, useEffect, useState } from 'react'
import { IMovieCard } from '../../../interfaces'
import HomePageSliderItemsList from '@/components/HomePageSlider/HomePageSliderItemsList'
import Image from '@/components/Images/Image'
import defaultMovieImage from '@/app/assets/images/default-movie-image.svg'
import TopBanner from '@/components/TopBanner'
import { fetchItemData } from '@/handlers/fetchItemData'
import Title from '@/app/components/UI/Title/Title'
import ReactPlayer from 'react-player'

type PropsType = {
	movies: Array<IMovieCard>
}

const HomePageSlider: FC<PropsType> = ({ movies }) => {
	const [selectedItem, setSelectedItem] = useState<IMovieCard>(
		movies.items[0]
	)
	const [imageSrc, setImageSrc] = useState<string>('')
	const [videoSrc, setVideoSrc] = useState<string>('')

	const getSelectedItemImageSrc = async () => {
		const images = await fetchItemData('movie', selectedItem.id, '/images')
		const videos = await fetchItemData('movie', selectedItem.id, '/videos')
		const movieTeaser =
			videos.results.length &&
			videos.results.find(
				item => item.type === 'Teaser' || item.type === 'Trailer'
			)
		setImageSrc(
			images.backdrops.length ? images.backdrops[0].file_path : ''
		)
		setVideoSrc(movieTeaser ? movieTeaser.key : '')
	}

	useEffect(() => {
		getSelectedItemImageSrc()
	}, [selectedItem])

	return (
		<>
			<TopBanner
				imageSrc={`https://image.tmdb.org/t/p/original${imageSrc}`}
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
						src={`https://image.tmdb.org/t/p/original${imageSrc}`}
						defaultImage={defaultMovieImage}
						className='aspect-[215/121]'
					/>
				)}
				<HomePageSliderItemsList
					itemsList={movies.items}
					isMoreDataAvailable={movies.isMoreDataAvailable}
					selectedItemId={selectedItem.id}
					onSelectItem={setSelectedItem}
				/>
			</div>
		</>
	)
}

export default HomePageSlider
