import { useEffect, useState } from 'react'
import {
	IFetchedResult,
	IUpcomingMovieItem,
	IVideoData,
} from '../../../../interfaces'
import { ORIGINAL_IMAGE_SRC } from '@/constants/images'
import { fetchItemData } from '@/handlers/fetchItemData'
import { UserCollections } from '@/constants/enum'

const useHomePageSlider = (itemsList: IFetchedResult<IUpcomingMovieItem>) => {
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

	return { imageFullSrc, videoSrc, selectedItem, setSelectedItem }
}

export default useHomePageSlider
