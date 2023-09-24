import { useState, useEffect } from 'react'
import {
	getCollectionMovie,
	removeCollectionMovie,
	setNewCollectionMovie,
} from '@/firebase/config'
import { useAuth } from '@/context/AuthProvider'
import { useModal } from '@/context/ModalProvider'
import { openLoginModal } from '@/handlers/openLoginModal'
import { IMovieCard } from '../../interfaces'

export const useCollectionButton = (movieInfo: IMovieCard) => {
	const [isCollectionMovie, setIsCollectionMovie] = useState<boolean>(false)
	const [isLoadingCollection, setIsLoadingCollection] =
		useState<boolean>(true)
	const { currentUser } = useAuth()
	const { showModal } = useModal()
	const isLoggedIn = currentUser !== null

	const handleSetCollectionMovie = (movie: IMovieCard) => {
		if (isLoggedIn) {
			setIsLoadingCollection(true)
			const newMovie: IMovieCard = {
				id: movie.id,
				poster_path: movie.poster_path,
				release_date: movie.release_date,
				title: movie.title,
				genres: movie.genres,
			}
			setNewCollectionMovie(newMovie, currentUser.uid)
				.then(() => {
					getCollectionMovie(movieInfo.id, currentUser?.uid)
						.then(data => {
							setIsCollectionMovie(data)
							setIsLoadingCollection(false)
						})
						.catch(() => {
							setIsLoadingCollection(false)
						})
				})
				.catch(() => {
					setIsLoadingCollection(false)
				})
		} else openLoginModal(showModal)
	}

	const handleRemoveCollectionMovie = (movieId: number, userId: string) => {
		setIsLoadingCollection(true)
		removeCollectionMovie(movieId, userId)
			.then(() => {
				setIsCollectionMovie(false)
				setIsLoadingCollection(false)
			})
			.catch(() => {
				setIsLoadingCollection(false)
			})
	}

	useEffect(() => {
		if (isLoggedIn) {
			setIsLoadingCollection(true)
			getCollectionMovie(movieInfo.id, currentUser?.uid)
				.then(data => {
					setIsCollectionMovie(data)
					setIsLoadingCollection(false)
				})
				.catch(() => {
					setIsLoadingCollection(false)
				})
		} else setIsLoadingCollection(false)
	}, [isLoggedIn])

	return {
		isLoadingCollection,
		isCollectionMovie,
		handleSetCollectionMovie,
		handleRemoveCollectionMovie,
	}
}
