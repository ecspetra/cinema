import { NextPageContext } from 'next'
import Title from '@/app/components/UI/Title/Title'
import Button from '@/app/components/UI/Button'
import { openLoginModal } from '@/handlers/handleModals'
import { useModal } from '@/context/ModalProvider'
import { parseCookies } from '@/handlers/handleCookies'
import TopBanner from '@/components/TopBanner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '@/context/AuthProvider'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { COLLECTION_PAGE_TOP_BANNER_IMAGE } from '@/constants/images'
import GeneralUserCollection from '@/components/Collection'
import { getGeneralCollectionPage } from '@/handlers/getGeneralCollectionPage'
import {
	IFetchedResult,
	IItemCard,
	IMark,
	IReviewCard,
} from '../../../interfaces'

interface IGeneralCollectionPageProps {
	collectionMovies: IFetchedResult<IItemCard>
	collectionTVShows: IFetchedResult<IItemCard>
	collectionPersons: IFetchedResult<IItemCard>
	allCollectionReviews: IReviewCard[]
	collectionMarks: IMark[]
}

const GeneralCollectionPage = ({
	generalCollectionPageProps,
}: {
	generalCollectionPageProps: IGeneralCollectionPageProps
}) => {
	const [movies, setMovies] = useState<IFetchedResult<IItemCard> | null>(null)
	const [tvShows, setTvShows] = useState<IFetchedResult<IItemCard> | null>(
		null
	)
	const [persons, setPersons] = useState<IFetchedResult<IItemCard> | null>(
		null
	)
	const [reviews, setReviews] = useState<
		IFetchedResult<IReviewCard>['items']
	>([])
	const [marks, setMarks] = useState<IFetchedResult<IMark>['items']>([])
	const { showModal } = useModal()
	const router = useRouter()
	const { userId } = useAuth()

	useEffect(() => {
		const getGeneralCollection = async () => {
			const userIdFromUrl = router.query.uid as string

			const generalCollection = await getGeneralCollectionPage(
				userIdFromUrl,
				userId,
				url => {
					router.push(url)
				}
			)

			if (generalCollection) {
				setMovies(generalCollection.collectionMovies)
				setTvShows(generalCollection.collectionTVShows)
				setPersons(generalCollection.collectionPersons)
				setReviews(generalCollection.allCollectionReviews)
				setMarks(generalCollection.collectionMarks)
			}
		}

		if (generalCollectionPageProps) {
			setMovies(generalCollectionPageProps?.collectionMovies)
			setTvShows(generalCollectionPageProps?.collectionTVShows)
			setPersons(generalCollectionPageProps?.collectionPersons)
			setReviews(generalCollectionPageProps?.allCollectionReviews)
			setMarks(generalCollectionPageProps?.collectionMarks)
		} else getGeneralCollection()
	}, [generalCollectionPageProps])

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
			<GeneralUserCollection
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
	const userIdFromUrl = ctx.query.uid as string
	const cookies = parseCookies(ctx.req!)
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
