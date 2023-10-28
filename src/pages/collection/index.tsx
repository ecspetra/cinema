import { NextPageContext } from 'next'
import Title from '@/app/components/UI/Title/Title'
import { getCollectionItemsList } from '@/firebase/config'
import Button from '@/app/components/UI/Button'
import { openLoginModal } from '@/handlers/openLoginModal'
import { useModal } from '@/context/ModalProvider'
import { parseCookies } from '@/handlers/handleCookies'
import {
	CURRENT_USER_COLLECTION_PAGE,
	COLLECTION_PAGE_TOP_BANNER_IMAGE,
} from '@/constants/paths'
import TopBanner from '@/components/TopBanner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '@/context/AuthProvider'
import CollectionWrap from '../../components/Collection/CollectionWrap'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getCollectionReviewsWithRepliesList } from '@/handlers/getCollectionReviewsWithRepliesList'

const Collection = ({ results }) => {
	const [movies, setMovies] = useState(null)
	const [persons, setPersons] = useState(null)
	const [reviews, setReviews] = useState([])
	const [marks, setMarks] = useState([])
	const { showModal } = useModal()
	const router = useRouter()
	const { userId } = useAuth()

	useEffect(() => {
		setMovies(results.collectionMovies)
		setPersons(results.collectionPersons)
		setReviews(results.allCollectionReviews)
		setMarks(results.collectionMarks)
	}, [results])

	useEffect(() => {
		const getCollection = async () => {
			const userIdFromUrl = router.query.uid || null
			let allCollectionReviews = []

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
				setPersons(null)
				setReviews([])
				setMarks([])
			}

			try {
				const collectionMovies = await getCollectionItemsList(
					userIdFromUrl,
					'movies',
					6,
					null
				)
				const collectionPersons = await getCollectionItemsList(
					userIdFromUrl,
					'persons',
					6,
					null
				)
				const collectionReviews = await getCollectionItemsList(
					userIdFromUrl,
					'reviews',
					null,
					null
				)
				const collectionReplies = await getCollectionItemsList(
					userIdFromUrl,
					'replies',
					null,
					null
				)
				const collectionMarks = await getCollectionItemsList(
					userIdFromUrl,
					'movieMarks',
					null,
					null
				)

				const reviewsWithUserReplies =
					await getCollectionReviewsWithRepliesList(collectionReplies)

				allCollectionReviews = [
					...collectionReviews.items,
					...reviewsWithUserReplies,
				]

				setMovies(collectionMovies)
				setPersons(collectionPersons)
				setReviews(allCollectionReviews)
				setMarks(collectionMarks)
			} catch (error) {
				setMovies(null)
				setPersons(null)
				setReviews([])
				setMarks([])
			}
		}

		if (!results) getCollection()
	}, [])

	if (!userId) {
		return (
			<>
				<TopBanner imageSrc='/35z8hWuzfFUZQaYog8E9LsXW3iI.jpg' />
				<div className='relative z-10 max-w-4xl'>
					<Title className='text-7xl'>
						Your favorite movies, TV shows and persons will be
						displayed here
						<FontAwesomeIcon
							icon={faFilm}
							className='ml-4 text-amber-600'
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
			<div className='relative z-10'>
				<CollectionWrap
					title='Movies'
					type='movies'
					items={movies ? movies.items : []}
					isMoreDataAvailable={
						movies ? movies.isMoreDataAvailable : false
					}
				/>
				<CollectionWrap
					title='Persons'
					type='persons'
					items={persons ? persons.items : []}
					isMoreDataAvailable={
						persons ? persons.isMoreDataAvailable : false
					}
				/>
				<CollectionWrap
					title='Marks'
					type='marks'
					items={marks ? marks : []}
					isMoreDataAvailable={false}
				/>
				<CollectionWrap
					title='Reviews'
					type='reviews'
					items={reviews ? reviews : []}
					isMoreDataAvailable={false}
				/>
			</div>
		</>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	const userIdFromUrl = ctx.query.uid || null
	const cookies = parseCookies(ctx.req)
	const userId = cookies.uid
	let allCollectionReviews = []

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
				results: {},
			},
		}
	}

	try {
		const collectionMovies = await getCollectionItemsList(
			userIdFromUrl,
			'movies',
			6,
			null
		)
		const collectionPersons = await getCollectionItemsList(
			userIdFromUrl,
			'persons',
			6,
			null
		)
		const collectionReviews = await getCollectionItemsList(
			userIdFromUrl,
			'reviews',
			null,
			null
		)
		const collectionReplies = await getCollectionItemsList(
			userIdFromUrl,
			'replies',
			null,
			null
		)
		const collectionMarks = await getCollectionItemsList(
			userIdFromUrl,
			'movieMarks',
			null,
			null
		)

		const reviewsWithUserReplies =
			await getCollectionReviewsWithRepliesList(collectionReplies)

		allCollectionReviews = [
			...collectionReviews.items,
			...reviewsWithUserReplies,
		]

		return {
			props: {
				results: {
					collectionMovies,
					collectionPersons,
					allCollectionReviews,
					collectionMarks: collectionMarks.items,
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
