import { NextPageContext } from 'next'
import { URL_TO_FETCH_MOVIES_WITH_PERSONS } from '@/constants/linksToFetch'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PersonInfo from '@/components/Person/PersonInfo'
import Loader from '@/components/Loader'
import TopBanner from '@/components/TopBanner'
import ItemsListWrap from '@/components/List/ItemsListWrap'
import { UserCollections } from '@/constants/enum'
import { getPersonPageData } from '@/handlers/getPersonPageData'
import { showErrorNotification } from '@/handlers/handleModals'
import { useModal } from '@/context/ModalProvider'
import ErrorScreen from '@/app/components/UI/Error/ErrorScreen'
import {
	IBackdrop,
	IFetchedResult,
	IItemCard,
	IPersonInfo,
} from '../../../interfaces'

interface IPersonPageProps {
	info: IPersonInfo
	images: IBackdrop[]
	movies: IFetchedResult<IItemCard>
}

const PersonPage = ({
	personFromProps,
}: {
	personFromProps: IPersonPageProps
}) => {
	const { showModal } = useModal()
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [person, setPerson] = useState<IPersonPageProps | null>(null)
	const router = useRouter()
	const personId = router.query.id as string
	const urlToFetchMoviesWithCurrentPerson =
		URL_TO_FETCH_MOVIES_WITH_PERSONS.replace('{personId}', personId)

	useEffect(() => {
		const fetchPersonPageData = async () => {
			setIsLoading(true)
			setPerson(null)

			getPersonPageData(personId)
				.then(data => {
					setPerson(data)
				})
				.catch(() => {
					showErrorNotification(showModal, 'An error has occurred')
				})
				.finally(() => {
					setIsLoading(false)
				})
		}

		if (!personFromProps) {
			fetchPersonPageData()
		} else setPerson(personFromProps)
	}, [personId])

	if (!person) {
		return isLoading ? (
			<Loader className='bg-transparent' />
		) : (
			<ErrorScreen title='Something went wrong' text='No data found' />
		)
	}

	return (
		<>
			<TopBanner />
			<PersonInfo personInfo={person.info} personImages={person.images} />
			<ItemsListWrap
				itemsList={person.movies.items}
				collectionType={UserCollections.movie}
				isMoreDataAvailable={person.movies.isMoreDataAvailable}
				urlToFetchItems={urlToFetchMoviesWithCurrentPerson}
				title={`Movies with ${person.info.name}`}
			/>
		</>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	const personId = ctx.query.id as string
	return getPersonPageData(personId)
		.then(data => {
			return {
				props: {
					personPageProps: data,
				},
			}
		})
		.catch(() => {
			return {
				props: {
					personPageProps: null,
				},
			}
		})
}

export default PersonPage
