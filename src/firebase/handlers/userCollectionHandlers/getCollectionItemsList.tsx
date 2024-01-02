import { UserCollections } from '@/constants/enum'
import {
	IFetchedResult,
	IItemCard,
	IMark,
	IReviewCard,
} from '../../../../interfaces'
import {
	get,
	limitToFirst,
	orderByKey,
	query,
	ref,
	startAfter,
} from 'firebase/database'
import { database } from '@/firebase/config'
import { getCollectionItemsInfo } from '@/firebase/handlers/userCollectionHandlers/getCollectionItemsInfo'

export const getCollectionItemsList = async (
	collectionOwnerId: string,
	collectionType:
		| UserCollections.movie
		| UserCollections.person
		| UserCollections.tv
		| UserCollections.marks,
	itemsPerPage: number | null,
	lastItemId: string | undefined = undefined
): Promise<IFetchedResult<IReviewCard | IItemCard | IMark>> => {
	try {
		const userPath = `users/${collectionOwnerId}/`
		const userRef = ref(database, userPath)
		const userSnapshot = await get(userRef)

		if (!userSnapshot.exists()) {
			throw `Failed to fetch`
		}

		const collectionPath = `users/${collectionOwnerId}/collection/${collectionType}/`
		const userCollectionRef = ref(database, collectionPath)
		const collectionInfo = {
			type: collectionType,
			ref: userCollectionRef,
			userId: collectionOwnerId,
		}
		let paginationQuery

		if (lastItemId) {
			if (itemsPerPage !== null) {
				paginationQuery = query(
					userCollectionRef,
					orderByKey(),
					startAfter(lastItemId),
					limitToFirst(itemsPerPage + 1)
				)
			} else {
				paginationQuery = query(
					userCollectionRef,
					orderByKey(),
					startAfter(lastItemId)
				)
			}
		} else {
			if (itemsPerPage !== null) {
				paginationQuery = query(
					userCollectionRef,
					orderByKey(),
					limitToFirst(itemsPerPage + 1)
				)
			} else {
				paginationQuery = query(userCollectionRef, orderByKey())
			}
		}

		const snapshot = await get(paginationQuery)
		const data = snapshot.val() || {}
		const itemIds = Object.keys(data)
		let isMoreDataAvailable = false

		if (itemsPerPage !== null && itemIds.length > itemsPerPage) {
			isMoreDataAvailable = true
			itemIds.pop()
		}

		if (!itemIds.length) {
			return {
				isMoreDataAvailable,
				items: [],
			}
		}

		const items = await getCollectionItemsInfo(itemIds, collectionInfo)

		return {
			isMoreDataAvailable,
			items: items as (IItemCard | IReviewCard | IMark)[],
		}
	} catch (error) {
		throw error
	}
}
