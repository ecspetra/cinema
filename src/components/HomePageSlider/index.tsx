import { FC } from 'react'
import HomePageSliderItemsList from '@/components/HomePageSlider/HomePageSliderItemsList'
import Image from '@/components/Images/Image'
import defaultMovieImage from '@/app/assets/images/default-movie-image.svg'
import TopBanner from '@/components/TopBanner'
import Title from '@/app/components/UI/Title/Title'
import ReactPlayer from 'react-player'
import { IFetchedResult, IUpcomingMovieItem } from '../../../interfaces'
import useHomePageSlider from '@/components/HomePageSlider/hooks/useHomePageSlider'

type PropsType = {
	itemsList: IFetchedResult<IUpcomingMovieItem>
}

const HomePageSlider: FC<PropsType> = ({ itemsList }) => {
	const { imageFullSrc, videoSrc, selectedItem, setSelectedItem } =
		useHomePageSlider(itemsList)

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
