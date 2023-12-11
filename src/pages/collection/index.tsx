import { NextPageContext } from 'next'
import Title from '@/app/components/UI/Title/Title'
import Button from '@/app/components/UI/Button'
import { openLoginModal } from '@/handlers/handleModals'
import { useModal } from '@/context/ModalProvider'
import { parseCookies } from '@/handlers/handleCookies'
import { CURRENT_USER_COLLECTION_PAGE } from '@/constants/paths'
import TopBanner from '@/components/TopBanner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '@/context/AuthProvider'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { COLLECTION_PAGE_TOP_BANNER_IMAGE } from '@/constants/images'
import UserCollection from '@/components/Collection'
import { getUserCollection } from '@/handlers/getUserCollection'

const Collection = ({ results }) => {
	const [movies, setMovies] = useState(null)
	const [tvShows, setTvShows] = useState(null)
	const [persons, setPersons] = useState(null)
	const [reviews, setReviews] = useState([])
	const [marks, setMarks] = useState([])
	const { showModal } = useModal()
	const router = useRouter()
	const { userId } = useAuth()

	useEffect(() => {
		setMovies(results?.collectionMovies)
		setTvShows(results?.collectionTVShows)
		setPersons(results?.collectionPersons)
		setReviews(results?.allCollectionReviews)
		setMarks(results?.collectionMarks)
	}, [results])

	useEffect(() => {
		const getCollection = async () => {
			const userIdFromUrl = router.query.uid || null

			if (
				(userId && userIdFromUrl && userId !== userIdFromUrl) ||
				(!userId && userIdFromUrl)
			) {
				await router.push('/404')
			}

			if (userId && !userIdFromUrl) {
				await router.push(
					CURRENT_USER_COLLECTION_PAGE.replace('{userId}', userId)
				)
			}

			if (!userId) {
				setMovies(null)
				setTvShows(null)
				setPersons(null)
				setReviews([])
				setMarks([])
			}

			try {
				const userCollection = await getUserCollection(userIdFromUrl)

				setMovies(userCollection.collectionMovies)
				setTvShows(userCollection.collectionTVShows)
				setPersons(userCollection.collectionPersons)
				setReviews(userCollection.allCollectionReviews)
				setMarks(userCollection.collectionMarks)
			} catch (error) {
				setMovies(null)
				setTvShows(null)
				setPersons(null)
				setReviews([])
				setMarks([])
			}
		}
		getCollection()
		if (!results) getCollection()
	}, [])

	if (!userId) {
		return (
			<>
				<TopBanner imageSrc='/35z8hWuzfFUZQaYog8E9LsXW3iI.jpg' />
				<div className='max-w-4xl'>
					<Title className='text-7xl'>
						Your favorite movies, TV shows and persons will be
						displayed here
						<FontAwesomeIcon
							icon={faFilm}
							className='ml-4 text-rose-600'
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
			<TopBanner imageSrc={COLLECTION_PAGE_TOP_BANNER_IMAGE} />
			<UserCollection
				movies={movies}
				tvShows={tvShows}
				persons={persons}
				marks={marks}
				reviews={reviews}
			/>
		</>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
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
				destination: CURRENT_USER_COLLECTION_PAGE.replace(
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
				results: null,
			},
		}
	}

	try {
		const userCollection = await getUserCollection(userIdFromUrl)

		return {
			props: {
				results: {
					collectionMovies: userCollection.collectionMovies,
					collectionTVShows: userCollection.collectionTVShows,
					collectionPersons: userCollection.collectionPersons,
					allCollectionReviews: userCollection.allCollectionReviews,
					collectionMarks: userCollection.collectionMarks,
				},
			},
		}
	} catch (error) {
		return {
			props: {
				results: null,
			},
		}
	}
}

export default Collection
