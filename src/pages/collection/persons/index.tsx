import { NextPageContext } from 'next'
import { parseCookies } from '@/handlers/handleCookies'
import { CURRENT_USER_COLLECTION_MOVIES_PAGE } from '@/constants/paths'
import { getCollectionItemsList } from '@/firebase/config'
import CollectionMovieList from '@/components/Movie/MovieList/CollectionMoviesList'

const CollectionPersons = ({ personsFromProps }) => {
	return (
		<CollectionMovieList
			movieList={personsFromProps}
			title='Collection movies'
		/>
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
				moviesFromProps: [],
			},
		}
	}

	try {
		const result = await getCollectionItemsList(
			userIdFromUrl,
			'persons',
			20,
			startAtValue
		)

		return {
			props: {
				moviesFromProps: result,
			},
		}
	} catch (error) {
		return {
			props: {
				moviesFromProps: [],
			},
		}
	}
}

export default CollectionPersons
