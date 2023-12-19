import { NextPageContext } from 'next'
import { parseCookies } from '@/handlers/handleCookies'
import SpecificCollectionItemsList from '../../components/Collection/SpecificCollectionItemsList'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthProvider'
import TopBanner from '@/components/TopBanner'
import { COLLECTION_PAGE_TOP_BANNER_IMAGE } from '@/constants/images'
import { IFetchedResult, IItemCard } from '../../../interfaces'
import { UserCollections } from '@/constants/enum'
import { getSpecificCollectionPage } from '@/handlers/getSpecificCollectionPage'
import Loader from '@/components/Loader'

const SpecificCollectionPage = ({
	specificCollectionPageProps,
}: {
	specificCollectionPageProps: IFetchedResult<IItemCard>
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
		const getCollectionItemsList = async () => {
			const userIdFromUrl = router.query.uid as string

			const collectionItemsList = await getSpecificCollectionPage(
				userIdFromUrl,
				collectionType,
				userId,
				url => {
					router.push(url)
				}
			)
			setItemsList(collectionItemsList as IFetchedResult<IItemCard>)
		}

		if (!specificCollectionPageProps) {
			getCollectionItemsList()
		} else setItemsList(specificCollectionPageProps)
	}, [specificCollectionPageProps])

	if (!itemsList) return <Loader className='bg-transparent' />

	return (
		<>
			<TopBanner imageSrc={COLLECTION_PAGE_TOP_BANNER_IMAGE} />
			<SpecificCollectionItemsList
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

	const cookies = await parseCookies(ctx.req!)
	const userId = cookies.uid

	const collectionItemsList = await getSpecificCollectionPage(
		userIdFromUrl,
		collectionType,
		userId,
		url => {
			ctx.res?.writeHead(302, { Location: url })
			ctx.res?.end()
		}
	)

	return {
		props: {
			specificCollectionPageProps: collectionItemsList,
		},
	}
}

export default SpecificCollectionPage
