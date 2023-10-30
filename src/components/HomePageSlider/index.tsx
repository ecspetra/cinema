import { FC, useEffect, useState } from 'react'
import { IBackdrop, IMovieCard } from '../../../interfaces'
import HomePageSliderItemsList from '@/components/HomePageSlider/HomePageSliderItemsList'
import Image from '@/components/Images/Image'
import defaultMovieImage from '@/app/assets/images/default-movie-image.svg'
import TopBanner from '@/components/TopBanner'
import { fetchMovieData } from '@/handlers/fetchMovieData'
import Title from '@/app/components/UI/Title/Title'

type PropsType = {
	movies: Array<IMovieCard>
}

const HomePageSlider: FC<PropsType> = ({ movies }) => {
	const [selectedItem, setSelectedItem] = useState<IMovieCard>(
		movies.items[0]
	)
	const [imageSrc, setImageSrc] = useState<string>('')

	const getSelectedItemImageSrc = async () => {
		const images = await fetchMovieData(selectedItem.id, '/images')
		setImageSrc(images.backdrops[0].file_path)
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
				<Image
					src={`https://image.tmdb.org/t/p/original${imageSrc}`}
					defaultImage={defaultMovieImage}
					className='aspect-[215/121]'
				/>
				<HomePageSliderItemsList
					itemsList={movies.items}
					isMoreDataAvailable={movies.isMoreDataAvailable}
					onSelectItem={setSelectedItem}
				/>
			</div>
		</>
	)
}

export default HomePageSlider
