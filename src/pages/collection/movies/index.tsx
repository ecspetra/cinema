import { NextPageContext } from 'next'
import { parseCookies } from '@/handlers/handleCookies'
import {
	CURRENT_USER_COLLECTION_MOVIES_PAGE,
	CURRENT_USER_COLLECTION_PAGE,
} from '@/constants/paths'
import { getCollectionItemsList } from '@/firebase/config'
import CollectionMovieList from '@/components/Movie/MovieList/CollectionMoviesList'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthProvider'

const CollectionMovies = ({ results }) => {
	const [movies, setMovies] = useState(results)
	const router = useRouter()
	const { currentUser } = useAuth()
	const userId = currentUser?.uid

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
			}

			try {
				const collectionMovies = await getCollectionItemsList(
					userIdFromUrl,
					'movies',
					20,
					startAtValue
				)

				if (!collectionMovies.items.length) {
					await router.push(
						CURRENT_USER_COLLECTION_PAGE.replace('{userId}', userId)
					)
				} else {
					setMovies(collectionMovies)
				}
			} catch (error) {
				setMovies(null)
			}
		}

		if (!results) getCollection()
	}, [])

	return <CollectionMovieList movieList={movies} title='Collection movies' />
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
		const result = await getCollectionItemsList(
			userIdFromUrl,
			'movies',
			20,
			startAtValue
		)

		if (!result.items.length) {
			return {
				redirect: {
					destination: CURRENT_USER_COLLECTION_PAGE.replace(
						'{userId}',
						userId
					),
					permanent: true,
				},
			}
		} else {
			return {
				props: {
					results: result,
				},
			}
		}
	} catch (error) {
		return {
			props: {
				results: {},
			},
		}
	}
}

export default CollectionMovies
