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

const Collection = ({ results }) => {
	const [movies, setMovies] = useState(null)
	const [persons, setPersons] = useState(null)
	const { showModal } = useModal()
	const router = useRouter()
	const { currentUser } = useAuth()
	const userId = currentUser?.uid

	useEffect(() => {
		setMovies(results.collectionMovies)
		setPersons(results.collectionPersons)
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
				setPersons(null)
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

				setMovies(collectionMovies.items)
				setPersons(collectionPersons.items)
			} catch (error) {
				setMovies(null)
				setPersons(null)
			}
		}

		if (!results) getCollection()
	}, [])

	if (!movies && !persons) {
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
			<TopBanner imageSrc={COLLECTION_PAGE_TOP_BANNER_IMAGE} />
			<div className='relative z-10'>
				<CollectionWrap
					title='Movies'
					type='movies'
					items={movies.items}
					isMoreDataAvailable={movies.isMoreDataAvailable}
				/>
				<CollectionWrap
					title='Persons'
					type='persons'
					items={persons.items}
					isMoreDataAvailable={persons.isMoreDataAvailable}
				/>
			</div>
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
