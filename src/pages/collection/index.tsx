import { NextPageContext } from 'next'
import Title from '@/app/components/UI/Title/Title'
import { getCollectionItemsList } from '@/firebase/config'
import Button from '@/app/components/UI/Button'
import { openLoginModal } from '@/handlers/openLoginModal'
import { useModal } from '@/context/ModalProvider'
import { parseCookies } from '@/handlers/handleCookies'
import { CURRENT_USER_COLLECTION_MOVIES_PAGE } from '@/constants/paths'
import TopBanner from '@/components/TopBanner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '@/context/AuthProvider'
import CollectionWrap from '@/components/CollectionWrap'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Collection = ({ results }) => {
	const [movies, setMovies] = useState(results.collectionMovies.items)
	const [persons, setPersons] = useState(results.collectionPersons.items)
	const [moviesToShow, setMoviesToShow] = useState({
		itemsToShow: [],
		isShowMoreButton: false,
	})
	const [personsToShow, setPersonsToShow] = useState({
		itemsToShow: [],
		isShowMoreButton: false,
	})
	const { showModal } = useModal()
	const router = useRouter()
	const { currentUser } = useAuth()
	const userId = currentUser?.uid

	const getCollectionItemsToShow = (collection, setItemsToShow) => {
		let itemsToShow = []
		let isShowMoreButton = false

		if (!collection.length) {
			itemsToShow = []
			isShowMoreButton = false
		} else if (collection.length < 5) {
			itemsToShow = collection.slice(0, collection.length)
		} else {
			itemsToShow = collection.slice(0, 4)
		}

		setItemsToShow({
			itemsToShow: itemsToShow,
			isShowMoreButton: isShowMoreButton,
		})
	}

	useEffect(() => {
		const getCollection = async () => {
			const startAtValue = null
			const userIdFromUrl = router.query.uid || null

			if (
				(userId && userIdFromUrl && userId !== userIdFromUrl) ||
				(!userId && userIdFromUrl)
			) {
				await router.push('/404')
			}

			if (userId && !userIdFromUrl) {
				await router.push(
					CURRENT_USER_COLLECTION_MOVIES_PAGE.replace(
						'{userId}',
						userId
					)
				)
			}

			if (!userId) {
				setMovies(null)
				setPersons(null)
			}

			try {
				const collectionMovies = await getCollectionItemsList(
					userIdFromUrl,
					'movies',
					6,
					startAtValue
				)
				const collectionPersons = await getCollectionItemsList(
					userIdFromUrl,
					'persons',
					6,
					startAtValue
				)

				setMovies(collectionMovies.items)
				setPersons(collectionPersons.items)
			} catch (error) {
				setMovies(null)
				setPersons(null)
			}
		}

		if (!results) getCollection()
	}, [])

	useEffect(() => {
		getCollectionItemsToShow(movies, setMoviesToShow)
		getCollectionItemsToShow(persons, setPersonsToShow)
	}, [movies, persons])

	if (!results.collectionMovies) {
		return (
			<>
				<TopBanner imageSrc='/35z8hWuzfFUZQaYog8E9LsXW3iI.jpg' />
				<div className='relative z-10 max-w-4xl'>
					<Title className='text-7xl'>
						Your favorite movies, TV shows and persons will be
						displayed here
						<FontAwesomeIcon
							icon={faFilm}
							className='ml-4 text-red-600'
						/>
					</Title>
					<p className='mb-8'>
						Please login or register to be able to create your own
						collection
					</p>
					<Button onClick={() => openLoginModal(showModal)}>
						Sign In
					</Button>
				</div>
			</>
		)
	}

	return (
		<>
			<TopBanner imageSrc='/35z8hWuzfFUZQaYog8E9LsXW3iI.jpg' />
			<div className='relative z-10 max-w-4xl'>
				<CollectionWrap
					title='Movies'
					type='movies'
					collection={moviesToShow.itemsToShow}
					isShowMoreButton={moviesToShow.isShowMoreButton}
				/>
				<CollectionWrap
					title='Persons'
					type='persons'
					collection={personsToShow.itemsToShow}
					isShowMoreButton={personsToShow.isShowMoreButton}
				/>
			</div>
		</>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	const startAtValue = null
	const userIdFromUrl = ctx.query.uid || null
	const cookies = parseCookies(ctx.req)
	const userId = cookies.uid

	if (
		(userId && userIdFromUrl && userId !== userIdFromUrl) ||
		(!userId && userIdFromUrl)
	) {
		return {
			notFound: true,
		}
	}

	if (userId && !userIdFromUrl) {
		return {
			redirect: {
				destination: CURRENT_USER_COLLECTION_MOVIES_PAGE.replace(
					'{userId}',
					userId
				),
				permanent: true,
			},
		}
	}

	if (!userId) {
		return {
			props: {
				results: {},
			},
		}
	}

	try {
		const collectionMovies = await getCollectionItemsList(
			userIdFromUrl,
			'movies',
			6,
			startAtValue
		)
		const collectionPersons = await getCollectionItemsList(
			userIdFromUrl,
			'persons',
			6,
			startAtValue
		)

		return {
			props: {
				results: {
					collectionMovies,
					collectionPersons,
				},
			},
		}
	} catch (error) {
		return {
			props: {
				results: {},
			},
		}
	}
}

export default Collection
