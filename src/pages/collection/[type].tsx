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
import { IFetchedResult, IItemCard } from '../../../interfaces'
import { UserCollections } from '@/constants/enum'

const CollectionType = ({
	results,
}: {
	results: IFetchedResult<IItemCard>
}) => {
	const [itemsList, setItemsList] =
		useState<IFetchedResult<IItemCard> | null>(null)
	const router = useRouter()
	const { userId } = useAuth()
	const listTitle =
		router.query.type === UserCollections.movie
			? 'Movies from your collection'
			: 'Persons from your collection'
	const collectionType = router.query.type as
		| UserCollections.movie
		| UserCollections.tv
		| UserCollections.person

	useEffect(() => {
		const getCollection = async () => {
			const userIdFromUrl = router.query.uid as string

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
					collectionType,
					20,
					null
				)

				if (!collectionItems.items.length) {
					await router.push(
						CURRENT_USER_COLLECTION_PAGE.replace('{userId}', userId)
					)
				} else {
					setItemsList(collectionItems as IFetchedResult<IItemCard>)
				}
			} catch (error) {
				setItemsList(null)
			}
		}

		if (results) {
			setItemsList(results)
		} else getCollection()
	}, [results])

	return (
		<>
			<TopBanner imageSrc={COLLECTION_PAGE_TOP_BANNER_IMAGE} />
			<CollectionItemsList
				collectionType={collectionType}
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
	const userIdFromUrl = ctx.query.uid as string
	const collectionType = ctx.query.type as
		| UserCollections.movie
		| UserCollections.tv
		| UserCollections.person

	const cookies = parseCookies(ctx.req!)
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
			collectionType,
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
