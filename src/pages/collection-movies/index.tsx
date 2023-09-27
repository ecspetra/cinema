import { NextPageContext } from 'next'
import Title from '@/app/components/UI/Title/Title'
import CollectionMoviesList from '@/components/Movie/MoviesList/CollectionMoviesList'
import { getCollectionMovies } from '@/firebase/config'

const CollectionMovies = ({ moviesFromProps }) => {
	if (!moviesFromProps.movies.length) return <div>Loading</div>

	return (
		<>
			<Title className='text-7xl'>Collection movies</Title>
			<CollectionMoviesList movieList={moviesFromProps} />
		</>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	const startAtValue = null
	const userId = ctx.query.uid || null

	try {
		const result = await getCollectionMovies(userId, startAtValue)

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

export default CollectionMovies
