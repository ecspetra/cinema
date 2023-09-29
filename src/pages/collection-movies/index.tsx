import { NextPageContext } from 'next'
import Title from '@/app/components/UI/Title/Title'
import CollectionMoviesList from '@/components/Movie/MoviesList/CollectionMoviesList'
import { getCollectionMovies } from '@/firebase/config'
import Button from '@/app/components/UI/Button'
import { openLoginModal } from '@/handlers/openLoginModal'
import { useModal } from '@/context/ModalProvider'
import { parseCookies } from '@/handlers/handleCookies'
import { CURRENT_USER_COLLECTION_MOVIES_PAGE } from '@/constants/paths'
import TopBanner from '@/components/TopBanner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'

const CollectionMovies = ({ moviesFromProps }) => {
	const { showModal } = useModal()

	if (!moviesFromProps.movies)
		return (
			<>
				<TopBanner imageSrc='/35z8hWuzfFUZQaYog8E9LsXW3iI.jpg' />
				<div className='relative z-10'>
					<Title className='text-7xl'>
						Your favorite movies will be displayed here
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

	return (
		<CollectionMoviesList
			movieList={moviesFromProps}
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
					'userId',
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
		const result = await getCollectionMovies(userIdFromUrl, startAtValue)

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
