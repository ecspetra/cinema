import { NextPageContext } from 'next'
import { parseCookies } from '@/handlers/handleCookies'
import {
	CURRENT_USER_COLLECTION_PAGE,
	COLLECTION_PAGE_TOP_BANNER_IMAGE,
} from '@/constants/paths'
import { getCollectionItemsList } from '@/firebase/config'
import CollectionItemsList from '../../../components/Collection/CollectionItemsList'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthProvider'
import TopBanner from '@/components/TopBanner'

const CollectionPersons = ({ results }) => {
	const [persons, setPersons] = useState(results)
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

			if (!userId) {
				setPersons(null)
			}

			try {
				const collectionPersons = await getCollectionItemsList(
					userIdFromUrl,
					'persons',
					20,
					startAtValue
				)

				if (!collectionPersons.items.length) {
					await router.push(
						CURRENT_USER_COLLECTION_PAGE.replace('{userId}', userId)
					)
				} else {
					setPersons(collectionPersons)
				}
			} catch (error) {
				setPersons(null)
			}
		}

		if (!results) getCollection()
	}, [])

	return (
		<>
			<TopBanner imageSrc={COLLECTION_PAGE_TOP_BANNER_IMAGE} />
			<CollectionItemsList
				collectionName='persons'
				itemsList={persons}
				title='Persons from your collection'
			/>
		</>
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
			'persons',
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

export default CollectionPersons
