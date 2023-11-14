import { NextPageContext } from 'next'
import { parseCookies } from '@/handlers/handleCookies'
import { CURRENT_USER_COLLECTION_PAGE } from '@/constants/paths'
import { getCollectionItemsList } from '@/firebase/config'
import CollectionItemsList from '../../components/Collection/CollectionItemsList'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthProvider'
import TopBanner from '@/components/TopBanner'
import { COLLECTION_PAGE_TOP_BANNER_IMAGE } from '@/constants/images'

const CollectionType = ({ results }) => {
	const [itemsList, setItemsList] = useState(null)
	const router = useRouter()
	const { userId } = useAuth()
	const listTitle =
		router.query.type === 'movie'
			? 'Movies from your collection'
			: 'Persons from your collection'

	useEffect(() => {
		const getCollection = async () => {
			const userIdFromUrl = router.query.uid || null

			if (
				(userId && userIdFromUrl && userId !== userIdFromUrl) ||
				(!userId && userIdFromUrl)
			) {
				await router.push('/404')
			}

			if (!userId) {
				setItemsList(null)
			}

			try {
				const collectionItems = await getCollectionItemsList(
					userIdFromUrl,
					router.query.type,
					20,
					null
				)

				if (!collectionItems.items.length) {
					await router.push(
						CURRENT_USER_COLLECTION_PAGE.replace('{userId}', userId)
					)
				} else {
					setItemsList(collectionItems)
				}
			} catch (error) {
				setItemsList(null)
			}
		}

		if (!results) getCollection()
	}, [])

	useEffect(() => {
		setItemsList(results)
	}, [results])

	return (
		<>
			<TopBanner imageSrc={COLLECTION_PAGE_TOP_BANNER_IMAGE} />
			<CollectionItemsList
				collectionName={router.query.type}
				items={itemsList ? itemsList.items : []}
				isMoreDataAvailable={
					itemsList ? itemsList.isMoreDataAvailable : false
				}
				title={listTitle}
			/>
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

	if (!userId) {
		return {
			props: {
				results: null,
			},
		}
	}

	try {
		const result = await getCollectionItemsList(
			userIdFromUrl,
			ctx.query.type,
			20,
			null
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
				results: null,
			},
		}
	}
}

export default CollectionType
