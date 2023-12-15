import { useEffect, useState } from 'react'
import { showErrorNotification } from '@/handlers/handleModals'
import { useModal } from '@/context/ModalProvider'
import { UserCollections } from '@/constants/enum'
import { URL_TO_FETCH_SIMILAR_LIST } from '@/constants/linksToFetch'
import { getMovieOrTvShowData } from '@/handlers/getMovieOrTvShowData'
import { IMovieOrTVShowData } from '../../interfaces'

const useFetchData = (
	movieOrTVShowFromProps: IMovieOrTVShowData,
	itemId: string,
	collectionType: UserCollections.movie | UserCollections.tv
) => {
	const { showModal } = useModal()
	const [data, setData] = useState<IMovieOrTVShowData | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const urlToFetchSimilarItems = URL_TO_FETCH_SIMILAR_LIST.replace(
		'{itemId}',
		itemId
	).replace('{collectionType}', collectionType)

	const fetchMovieOrTVShowData = async () => {
		setIsLoading(true)
		setData(null)

		getMovieOrTvShowData(itemId, collectionType)
			.then(data => {
				setData(data)
			})
			.catch(() => {
				showErrorNotification(showModal, 'An error has occurred')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	useEffect(() => {
		if (!movieOrTVShowFromProps) {
			fetchMovieOrTVShowData()
		} else setData(movieOrTVShowFromProps)
	}, [itemId])

	return { data, isLoading, urlToFetchSimilarItems }
}

export default useFetchData
