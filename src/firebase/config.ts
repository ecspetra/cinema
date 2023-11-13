import { initializeApp } from 'firebase/app'
import {
	createUserWithEmailAndPassword,
	EmailAuthProvider,
	getAuth,
	reauthenticateWithCredential,
	signInWithEmailAndPassword,
	signOut,
	updateEmail,
	updatePassword,
	updateProfile,
} from 'firebase/auth'
import {
	getDatabase,
	ref,
	get,
	set,
	remove,
	orderByKey,
	limitToFirst,
	query,
	startAfter,
	child,
	DataSnapshot,
	onChildAdded,
	onChildRemoved,
	update,
	onChildChanged,
} from 'firebase/database'
import { uuidv4 } from '@firebase/util'
import {
	IGenre,
	IMovieCard,
	IPersonCard,
	IReplyCard,
	IReviewCardFromDB,
} from '../../interfaces'
import { onValue } from '@firebase/database'

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth(app)
export { auth }

export interface AuthContextType {
	isLoggedIn: boolean
	userId: string
	photoURL: string
	userName: string
	updateUserProfile: () => void
}

export const USER_COLLECTIONS = [
	'movie',
	'tv',
	'person',
	'reviews',
	'replies',
	'marks',
]

// auth handlers

export const addUserToRealtimeDatabase = async (newUser: object) => {
	const newUserRef = ref(database, `users/${newUser.uid}`)

	const newUserData = {
		info: {
			displayName: newUser.displayName,
			id: newUser.uid,
			email: newUser.email,
			photoURL: newUser.photoURL,
		},
	}

	await set(newUserRef, newUserData)
}

export const updateUserInRealtimeDatabase = async (
	updateFields: object,
	userId: string
) => {
	const newUserRef = ref(database, `users/${userId}`)

	const existingUserData = (await get(newUserRef)).val()
	const newUserData = {
		info: {
			...existingUserData.info,
			...updateFields,
		},
	}

	await set(newUserRef, newUserData)
}

export const updateProfileIcon = async (newIcon: string) => {
	const currentUser = auth.currentUser
	const displayName = currentUser?.displayName
	const userId = currentUser?.uid
	const photoURL = newIcon

	const updateFields = {
		photoURL: newIcon,
	}

	await updateProfile(currentUser, { displayName, photoURL })
	await updateUserInRealtimeDatabase(updateFields, userId)
}

export const updateUserInfo = async (newInfo: object) => {
	const currentUser = auth.currentUser
	const displayName = newInfo.name.value
	const userId = currentUser?.uid
	const photoURL = currentUser?.photoURL

	const updateFields = {
		displayName: newInfo.name.value,
		country: newInfo.country.value,
		dateOfBirth: newInfo.dateOfBirth.value,
		about: newInfo.about.value,
	}

	await updateProfile(currentUser, { displayName, photoURL })
	await updateUserInRealtimeDatabase(updateFields, userId)
}

export const updateUserCredential = async (newInfo: object) => {
	const currentUser = auth.currentUser
	const userId = currentUser?.uid
	const oldEmail = currentUser?.email
	const updateFields = {
		email: newInfo.email.value,
	}

	const credential = EmailAuthProvider.credential(
		oldEmail,
		newInfo.oldPassword.value
	)

	await reauthenticateWithCredential(currentUser, credential).then(
		async () => {
			await updateEmail(currentUser, newInfo.email.value)
			await updatePassword(currentUser, newInfo.newPassword.value)
			await updateUserInRealtimeDatabase(updateFields, userId)
		}
	)
}

export const updateProfileGenres = async (newGenres: Array<IGenre>) => {
	const currentUser = auth.currentUser
	const userId = currentUser?.uid
	const updateFields = {
		favoriteGenres: newGenres,
	}

	await updateUserInRealtimeDatabase(updateFields, userId)
}

export const signUp = async (
	email: string,
	password: string,
	displayName: string
) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)
		const newUser = userCredential.user
		const photoURL = `https://api.dicebear.com/5.x/thumbs/svg?seed=${newUser.uid}`

		await updateProfile(newUser, { displayName, photoURL })
		await signInWithEmailAndPassword(auth, email, password)
		await addUserToRealtimeDatabase(newUser)
	} catch (error) {
		throw error
	}
}

export const signIn = async (email: string, password: string) => {
	try {
		await signInWithEmailAndPassword(auth, email, password)
	} catch (error) {
		throw error
	}
}

export const signOutUser = async () => {
	try {
		await signOut(auth)
	} catch (error) {
		throw error
	}
}

export const getUserInfo = (userId: string) => {
	const infoPath = `users/${userId}/info/`
	const itemRef = ref(database, infoPath)

	return new Promise(async resolve => {
		get(itemRef).then(snapshot => {
			let userInfo = {}
			if (snapshot.exists()) {
				userInfo = snapshot.val()
			}

			resolve(userInfo)
		})
	})
}

// movie marks handlers

export const setNewMarkForMovie = async (markData: object, userId: string) => {
	const newMarkRef = ref(database, `users/${userId}/movieMarks/${uuidv4()}`)

	const newMarkData = {
		movieId: markData.movieId,
		movieTitle: markData.movieTitle,
		mark: markData.mark,
		isTVShow: markData.isTVShow,
	}

	await set(newMarkRef, newMarkData)
}

export const getMarkForMovie = (markData: object, userId: string) => {
	const marksCollectionRef = ref(database, `users/${userId}/movieMarks`)

	return new Promise(async resolve => {
		get(marksCollectionRef).then(snapshot => {
			let response

			snapshot.forEach(childSnapshot => {
				const movieMark = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}

				if (
					movieMark.data.movieId === markData.movieId &&
					movieMark.data.movieTitle === markData.movieTitle
				)
					response = movieMark
			})

			resolve(response)
		})
	})
}

export const removeMarkForMovie = (markKey: string, userId: string) => {
	const markRef = ref(database, `users/${userId}/movieMarks/${markKey}`)

	return new Promise(async resolve => {
		let isRemoved = false

		remove(markRef).then(() => {
			isRemoved = true
		})

		resolve(isRemoved)
	})
}

// collection handlers

export const setNewCollectionItem = async (
	item: IMovieCard | IPersonCard,
	userId: string,
	collectionName: (typeof USER_COLLECTIONS)[number]
) => {
	const collectionPath = `users/${userId}/${collectionName}/${item.id}`
	const newCollectionItemRef = ref(database, collectionPath)

	await set(newCollectionItemRef, item)
}

export const getCollectionItem = (
	itemId: number,
	userId: string,
	collectionName: (typeof USER_COLLECTIONS)[number]
) => {
	const collectionPath = `users/${userId}/${collectionName}/${itemId}`
	const itemRef = ref(database, collectionPath)

	return new Promise(async resolve => {
		let isCollectionItem = false

		get(itemRef).then(snapshot => {
			if (snapshot.exists()) isCollectionItem = true

			resolve(isCollectionItem)
		})
	})
}

export const removeCollectionItem = (
	itemId: number,
	userId: string,
	collectionName: (typeof USER_COLLECTIONS)[number]
) => {
	const collectionPath = `users/${userId}/${collectionName}/${itemId}`
	const itemRef = ref(database, collectionPath)

	return new Promise(async resolve => {
		let isRemoved = false

		remove(itemRef).then(() => {
			isRemoved = true
		})

		resolve(isRemoved)
	})
}

export const getCollectionItemsList = async (
	userId: string,
	collectionName: (typeof USER_COLLECTIONS)[number],
	itemsPerPage: number | null,
	lastItemId: string | null
) => {
	const collectionPath = `users/${userId}/${collectionName}/`
	const userCollectionRef = ref(database, collectionPath)
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

	const items = await Promise.all(
		itemIds.map(async itemId => {
			const itemSnapshot = await get(child(userCollectionRef, itemId))
			return itemSnapshot.val()
		})
	)

	return {
		isMoreDataAvailable,
		items,
	}
}

export const collectionListener = (
	userId: string,
	collectionName: (typeof USER_COLLECTIONS)[number],
	loadedItems: Array<any>,
	setItems: ([]) => void,
	setIsMoreDataAvailable: (arg: boolean) => void
) => {
	const collectionRef = ref(database, `users/${userId}/${collectionName}`)
	const itemsPerPage = 20

	const onDataChange = (snapshot: DataSnapshot) => {
		const data = snapshot.val()
		const itemsFromDB = data ? Object.values(data) : []
		const totalItemsLength = itemsFromDB.length
		const loadedItemsLength = loadedItems.length

		const newItems = itemsFromDB.filter(item =>
			loadedItems.some(existingItem => existingItem.id === item.id)
		)

		if (!loadedItemsLength) {
			itemsFromDB.map((item, idx) => {
				if (idx < itemsPerPage) {
					setItems(prevState => [...prevState, item])
				}
			})
			setIsMoreDataAvailable(totalItemsLength > loadedItemsLength)
		} else {
			setItems(newItems)
			setIsMoreDataAvailable(totalItemsLength > loadedItemsLength)
		}
	}

	const unsubscribe = onValue(collectionRef, onDataChange)

	return () => {
		unsubscribe()
	}
}

// review handlers

export const setNewReviewItem = async (
	item: IReviewCardFromDB | IReplyCard,
	userId: string,
	movieId: number,
	collectionName: 'reviews' | 'replies'
) => {
	const collectionPath = `users/${userId}/${collectionName}/${item.id}`
	const generalCollectionPath = `movies/${movieId}/${collectionName}/${item.id}`
	const newCollectionItemRef = ref(database, collectionPath)
	const newGeneralCollectionItemRef = ref(database, generalCollectionPath)

	await set(newCollectionItemRef, item)
	await set(newGeneralCollectionItemRef, item)
}

export const updateReviewItem = async (
	item: IReviewCardFromDB | IReplyCard,
	userId: string,
	movieId: number,
	collectionName: 'reviews' | 'replies'
) => {
	const itemId = item.id
	const collectionPath = `users/${userId}/${collectionName}/${itemId}`
	const generalCollectionPath = `movies/${movieId}/${collectionName}/${itemId}`
	const itemRef = ref(database, collectionPath)
	const generalItemRef = ref(database, generalCollectionPath)
	const itemSnapshot = await get(itemRef)

	if (itemSnapshot.exists()) {
		await update(itemRef, item)
		await update(generalItemRef, item)
		return true
	} else {
		return false
	}
}

export const removeReviewItem = async (
	itemId: string,
	movieId: number,
	userId: string,
	collectionName: 'reviews' | 'replies'
) => {
	const collectionPath = `users/${userId}/${collectionName}/${itemId}`
	const generalCollectionPath = `movies/${movieId}/${collectionName}/${itemId}`

	const itemRef = ref(database, collectionPath)
	const generalCollectionItemRef = ref(database, generalCollectionPath)

	return new Promise(async resolve => {
		let isRemoved = false

		if (collectionName === 'reviews') {
			const repliesCollectionPath = `users/${userId}/replies/`
			const repliesGeneralCollectionPath = `movies/${movieId}/replies/`

			const repliesCollectionRef = ref(database, repliesCollectionPath)
			const repliesGeneralCollectionRef = ref(
				database,
				repliesGeneralCollectionPath
			)

			const removeReviewRepliesInUserCollection = async () => {
				const snapshot = await get(repliesCollectionRef)

				if (snapshot.exists()) {
					snapshot.forEach(childSnapshot => {
						const reply = childSnapshot.val()
						if (reply.reviewId === itemId) {
							const replyPath = `users/${userId}/replies/${childSnapshot.key}`
							const replyRef = ref(database, replyPath)
							remove(replyRef)
						}
					})
				}
			}

			const removeReviewRepliesInGeneralCollection = async () => {
				const snapshot = await get(repliesGeneralCollectionRef)

				if (snapshot.exists()) {
					snapshot.forEach(childSnapshot => {
						const reply = childSnapshot.val()
						if (reply.reviewId === itemId) {
							const replyPath = `movies/${movieId}/replies/${childSnapshot.key}`
							const replyRef = ref(database, replyPath)
							remove(replyRef)
						}
					})
				}
			}

			await removeReviewRepliesInUserCollection()
			await removeReviewRepliesInGeneralCollection()
		}

		remove(itemRef).then(() => {
			remove(generalCollectionItemRef)
				.then(() =>
					removeAllReactions(userId, itemId, movieId, collectionName)
				)
				.then(() => {
					isRemoved = true
				})
		})
		resolve(isRemoved)
	})
}

export const getDBRepliesList = async (movieId: number, reviewId: string) => {
	const collectionPath = `movies/${movieId}/replies/`
	const repliesCollectionRef = ref(database, collectionPath)
	try {
		const snapshot = await get(repliesCollectionRef)
		const replies = []

		if (snapshot.exists()) {
			snapshot.forEach(childSnapshot => {
				const reply = childSnapshot.val()
				if (reply.reviewId === reviewId) {
					replies.push(reply)
				}
			})
		}

		return replies
	} catch (error) {
		return []
	}
}

export const getDBReviewsList = async (
	movieId: number,
	collectionName: 'reviews' | 'replies'
) => {
	const collectionPath = `movies/${movieId}/${collectionName}/`
	const reviewsCollectionRef = ref(database, collectionPath)

	try {
		const snapshot = await get(reviewsCollectionRef)

		if (snapshot.exists()) {
			const data = snapshot.val()
			const result = Object.values(data)
			return result
		} else {
			return []
		}
	} catch (error) {
		return []
	}
}

export const reviewsListener = (
	collectionId: number | string,
	loadedItems: Array<IReviewCardFromDB>,
	setItems: ([]) => void,
	collectionName: 'movie' | 'users'
) => {
	let reviewsRef
	if (collectionName === 'users') {
		reviewsRef = ref(database, `users/${collectionId}/reviews/`)
	} else reviewsRef = ref(database, `movies/${collectionId}/reviews/`)

	const onReviewAdded = (childSnapshot: DataSnapshot) => {
		const newItem = childSnapshot.val()
		if (!loadedItems.some(existingItem => existingItem.id === newItem.id)) {
			setItems(prevItems => [newItem, ...prevItems])
		}
	}

	const onReviewRemoved = (childSnapshot: DataSnapshot) => {
		const removedItem = childSnapshot.val()
		setItems(prevItems =>
			prevItems.filter(item => item.id !== removedItem.id)
		)
	}

	const onReviewChanged = (childSnapshot: DataSnapshot) => {
		const updatedItem = childSnapshot.val()
		setItems(prevItems => {
			const updatedIndex = prevItems.findIndex(
				item => item.id === updatedItem.id
			)
			if (updatedIndex !== -1) {
				prevItems[updatedIndex] = updatedItem
				return [...prevItems]
			}
			return prevItems
		})
	}

	const unsubscribeReviewAdded = onChildAdded(reviewsRef, onReviewAdded)
	const unsubscribeReviewRemoved = onChildRemoved(reviewsRef, onReviewRemoved)
	const unsubscribeReviewChanged = onChildChanged(reviewsRef, onReviewChanged)

	return () => {
		unsubscribeReviewAdded()
		unsubscribeReviewRemoved()
		unsubscribeReviewChanged()
	}
}

export const repliesListener = (
	movieId: number,
	reviewId: string,
	loadedItems: Array<IReplyCard>,
	setItems: ([]) => void
) => {
	const repliesRef = ref(database, `movies/${movieId}/replies/`)

	const onReplyAdded = (childSnapshot: DataSnapshot) => {
		const newItem = childSnapshot.val()
		if (
			!loadedItems.some(existingItem => existingItem.id === newItem.id) &&
			newItem.reviewId === reviewId
		) {
			setItems(prevItems => [newItem, ...prevItems])
		}
	}

	const onReplyRemoved = (childSnapshot: DataSnapshot) => {
		const removedItem = childSnapshot.val()
		setItems(prevItems =>
			prevItems.filter(item => item.id !== removedItem.id)
		)
	}

	const onReplyChanged = (childSnapshot: DataSnapshot) => {
		const updatedItem = childSnapshot.val()
		setItems(prevItems => {
			const updatedIndex = prevItems.findIndex(
				item => item.id === updatedItem.id
			)
			if (updatedIndex !== -1) {
				prevItems[updatedIndex] = updatedItem
				return [...prevItems]
			}
			return prevItems
		})
	}

	const unsubscribeReplyAdded = onChildAdded(repliesRef, onReplyAdded)
	const unsubscribeReplyRemoved = onChildRemoved(repliesRef, onReplyRemoved)
	const unsubscribeReplyChanged = onChildChanged(repliesRef, onReplyChanged)

	return () => {
		unsubscribeReplyAdded()
		unsubscribeReplyRemoved()
		unsubscribeReplyChanged()
	}
}

export const collectionRepliesListener = (
	userId: string,
	setItems: ([]) => void
) => {
	const repliesRef = ref(database, `users/${userId}/replies/`)

	const onReplyRemoved = (childSnapshot: DataSnapshot) => {
		const removedItem = childSnapshot.val()

		setItems(prevItems =>
			prevItems.filter(item => item.id !== removedItem.reviewId)
		)
	}

	const unsubscribeReplyRemoved = onChildRemoved(repliesRef, onReplyRemoved)

	return () => {
		unsubscribeReplyRemoved()
	}
}

export const userProfileListener = (
	userId: string,
	setProfile: ([]) => void
) => {
	const userRef = ref(database, `users/${userId}/info`)

	const onInfoChanged = (snapshot: DataSnapshot) => {
		const profileData = snapshot.val()
		setProfile(profileData)
	}

	const unsubscribe = onValue(userRef, onInfoChanged)

	return () => {
		unsubscribe()
	}
}

export const userContextListener = (
	userId: string,
	prevData: object,
	updateUserProfile: () => void
) => {
	const userRef = ref(database, `users/${userId}/info`)

	const onInfoChanged = (snapshot: DataSnapshot) => {
		const profileData = snapshot.val()

		if (
			prevData.id !== profileData.id ||
			prevData.userName !== profileData.displayName
		) {
			updateUserProfile()
		}
	}

	const unsubscribe = onValue(userRef, onInfoChanged)

	return () => {
		unsubscribe()
	}
}

export const setNewReviewReaction = async (
	userId: string,
	itemId: string,
	movieId: number,
	collectionName: 'reviews' | 'replies',
	action: 'like' | 'dislike'
) => {
	const collectionPath = `users/${userId}/${collectionName}/${itemId}/${
		action === 'like' ? 'likes' : 'dislikes'
	}/${userId}`
	const generalCollectionPath = `reviewsReactions/${movieId}/${collectionName}/${itemId}/${
		action === 'like' ? 'likes' : 'dislikes'
	}/${userId}`

	const itemRef = ref(database, collectionPath)
	const generalCollectionItemRef = ref(database, generalCollectionPath)

	await set(itemRef, itemId)
	await set(generalCollectionItemRef, itemId)
	await removeReviewReaction(
		userId,
		itemId,
		movieId,
		collectionName,
		action === 'like' ? 'dislike' : 'like'
	)
}

export const removeReviewReaction = (
	userId: string,
	reviewId: string,
	movieId: number,
	collectionName: 'reviews' | 'replies',
	action: 'like' | 'dislike'
) => {
	const itemId = userId
	const collectionPath = `users/${userId}/${collectionName}/${reviewId}/${
		action === 'like' ? 'likes' : 'dislikes'
	}/${itemId}`
	const generalCollectionPath = `reviewsReactions/${movieId}/${collectionName}/${reviewId}/${
		action === 'like' ? 'likes' : 'dislikes'
	}/${itemId}`

	const itemRef = ref(database, collectionPath)
	const generalCollectionItemRef = ref(database, generalCollectionPath)

	return new Promise(async resolve => {
		let isRemoved = false

		remove(itemRef).then(() => {
			remove(generalCollectionItemRef).then(() => {
				isRemoved = true
			})
		})

		resolve(isRemoved)
	})
}

export const removeAllReactions = (
	userId: string,
	itemId: string,
	movieId: number,
	collectionName: 'reviews' | 'replies'
) => {
	const collectionPath = `users/${userId}/${collectionName}/${itemId}`
	const generalCollectionPath = `reviewsReactions/${movieId}/${collectionName}/${itemId}`

	const itemRef = ref(database, collectionPath)
	const generalCollectionItemRef = ref(database, generalCollectionPath)

	return new Promise(async resolve => {
		let isRemoved = false

		remove(itemRef).then(() => {
			remove(generalCollectionItemRef).then(() => {
				isRemoved = true
			})
		})

		resolve(isRemoved)
	})
}

export const reviewReactionsListener = (
	reviewId: string,
	movieId: number,
	collectionName: 'reviews' | 'replies',
	setItems: ({ likes: [], dislikes: [] }) => void
) => {
	const likesCollectionRef = ref(
		database,
		`reviewsReactions/${movieId}/${collectionName}/${reviewId}/likes`
	)
	const dislikesCollectionRef = ref(
		database,
		`reviewsReactions/${movieId}/${collectionName}/${reviewId}/dislikes`
	)

	const likes = []
	const dislikes = []

	const unsubscribeLikes = onValue(
		likesCollectionRef,
		(snapshot: DataSnapshot) => {
			likes.length = 0
			snapshot.forEach(childSnapshot => {
				likes.push({
					key: childSnapshot.key,
					data: childSnapshot.val(),
				})
			})
			setItems(prevState => ({
				likes: likes,
				dislikes: prevState.dislikes,
			}))
		}
	)

	const unsubscribeDislikes = onValue(
		dislikesCollectionRef,
		(snapshot: DataSnapshot) => {
			dislikes.length = 0
			snapshot.forEach(childSnapshot => {
				dislikes.push({
					key: childSnapshot.key,
					data: childSnapshot.val(),
				})
			})
			setItems(prevState => ({
				likes: prevState.likes,
				dislikes: dislikes,
			}))
		}
	)

	return () => {
		unsubscribeLikes()
		unsubscribeDislikes()
	}
}

export const getReviewReactions = async (
	itemId: string,
	movieId: number,
	collectionName: 'reviews' | 'replies'
) => {
	const likesCollectionPath = `reviewsReactions/${movieId}/${collectionName}/${itemId}/likes/`
	const dislikesCollectionPath = `reviewsReactions/${movieId}/${collectionName}/${itemId}/dislikes/`
	const likesCollectionRef = ref(database, likesCollectionPath)
	const dislikesCollectionRef = ref(database, dislikesCollectionPath)

	const getItemLikes = () => {
		return new Promise(async resolve => {
			get(likesCollectionRef).then(snapshot => {
				let response = []

				snapshot.forEach(childSnapshot => {
					const like = {
						key: childSnapshot.key,
						data: childSnapshot.val(),
					}

					response.push(like)
				})

				resolve(response)
			})
		})
	}

	const getItemDislikes = () => {
		return new Promise(async resolve => {
			get(dislikesCollectionRef).then(snapshot => {
				let response = []

				snapshot.forEach(childSnapshot => {
					const dislike = {
						key: childSnapshot.key,
						data: childSnapshot.val(),
					}

					response.push(dislike)
				})

				resolve(response)
			})
		})
	}

	const likes = await getItemLikes()
	const dislikes = await getItemDislikes()

	return { likes, dislikes }
}
