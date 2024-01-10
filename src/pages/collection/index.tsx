import { useEffect, useState } from 'react'
import { NextPageContext } from 'next'
import Title from '@/app/components/UI/Title/Title'
import Button from '@/app/components/UI/Button'
import { openLoginModal, showErrorNotification } from '@/handlers/handleModals'
import { useModal } from '@/context/ModalProvider'
import { parseCookies } from '@/handlers/handleCookies'
import TopBanner from '@/components/TopBanner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '@/context/AuthProvider'
import { useRouter } from 'next/router'
import { COLLECTION_PAGE_TOP_BANNER_IMAGE } from '@/constants/images'
import GeneralUserCollection from '@/components/Collection'
import { getGeneralCollectionPage } from '@/handlers/getGeneralCollectionPage'
import { IGeneralCollection } from '../../../interfaces'
import Loader from '@/components/Loader'
import ErrorScreen from '@/app/components/UI/Error/ErrorScreen'

const GeneralCollectionPage = ({
	generalCollectionPageProps,
}: {
	generalCollectionPageProps: IGeneralCollection
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [generalCollection, setGeneralCollection] =
		useState<IGeneralCollection | null>(null)
	const { showModal } = useModal()
	const router = useRouter()
	const { userId } = useAuth()

	useEffect(() => {
		const getGeneralCollection = async () => {
			setIsLoading(true)
			const userIdFromUrl = router.query.uid as string

			getGeneralCollectionPage(userIdFromUrl, userId, url => {
				router.push(url)
			})
				.then(data => {
					setGeneralCollection(data)
				})
				.catch(() => {
					showErrorNotification(showModal, 'An error has occurred')
				})
				.finally(() => {
					setIsLoading(false)
				})
		}

		if (userId) {
			generalCollectionPageProps
				? setGeneralCollection(generalCollectionPageProps)
				: getGeneralCollection()
		}
	}, [generalCollectionPageProps, router.query.uid])

	if (!userId) {
		return (
			<>
				<TopBanner imageSrc='/35z8hWuzfFUZQaYog8E9LsXW3iI.jpg' />
				<div className='max-w-4xl'>
					<Title className='text-3xl md:text-7xl'>
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

	if (!generalCollection) {
		return isLoading ? (
			<Loader className='bg-transparent' />
		) : (
			<ErrorScreen title='Something went wrong' text='No data found' />
		)
	}

	return (
		<>
			<TopBanner imageSrc={COLLECTION_PAGE_TOP_BANNER_IMAGE} />
			<GeneralUserCollection
				movies={generalCollection.collectionMovies}
				tvShows={generalCollection.collectionTVShows}
				persons={generalCollection.collectionPersons}
				marks={generalCollection.collectionMarks}
				reviews={generalCollection.allCollectionReviews}
			/>
		</>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	const userIdFromUrl = ctx.query.uid as string
	const cookies = await parseCookies(ctx.req!)
	const userId = cookies.uid

	const generalCollection = await getGeneralCollectionPage(
		userIdFromUrl,
		userId,
		url => {
			ctx.res?.writeHead(302, { Location: url })
			ctx.res?.end()
		}
	)

	return {
		props: {
			generalCollectionPageProps: generalCollection,
		},
	}
}

export default GeneralCollectionPage
