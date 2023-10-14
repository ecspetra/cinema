import { initializeApp } from 'firebase/app'
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
	User,
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
} from 'firebase/database'
import { uuidv4 } from '@firebase/util'
import {
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
	currentUser: User | null
}

export const USER_COLLECTIONS = ['movies', 'persons', 'reviews', 'replies']

// auth handlers

export const addUserToRealtimeDatabase = async (newUser: object) => {
	const newUserRef = ref(database, `users/${newUser.uid}`)

	const newUserData = {
		id: newUser.uid,
		email: newUser.email,
		photoURL: newUser.photoURL,
	}

	await set(newUserRef, newUserData)
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

// movie marks handlers

export const setNewMarkForMovie = async (
	movieId: number,
	userId: string,
	mark: number
) => {
	const newMarkRef = ref(database, `users/${userId}/movieMarks/${uuidv4()}`)

	const newMarkData = {
		movieId: movieId,
		mark: mark,
	}

	await set(newMarkRef, newMarkData)
}

export const getMarkForMovie = (movieId: number, userId: string) => {
	const marksCollectionRef = ref(database, `users/${userId}/movieMarks`)

	return new Promise(async resolve => {
		get(marksCollectionRef).then(snapshot => {
			let response

			snapshot.forEach(childSnapshot => {
				const movieMark = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}

				if (movieMark.data.movieId === movieId) response = movieMark
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
	itemsPerPage: number,
	lastItemId: string | null
) => {
	const collectionPath = `users/${userId}/${collectionName}/`
	const userCollectionRef = ref(database, collectionPath)
	let paginationQuery

	if (lastItemId) {
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
			limitToFirst(itemsPerPage + 1)
		)
	}

	const snapshot = await get(paginationQuery)
	const data = snapshot.val() || {}
	const itemIds = Object.keys(data)
	let isMoreDataAvailable = false

	if (itemIds.length > itemsPerPage) {
		isMoreDataAvailable = true
		itemIds.pop()
	}

	const items = await Promise.all(
		itemIds.map(async itemId => {
			const itemSnapshot = await get(child(userCollectionRef, itemId))
			return itemSnapshot.val()
		})
	)

	return { isMoreDataAvailable, items }
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

export const removeReviewItem = (
	itemId: number,
	movieId: number,
	userId: string
) => {
	const collectionPath = `users/${userId}/reviews/${itemId}`
	const generalCollectionPath = `movies/${movieId}/reviews/${itemId}`

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

export const removeReplyItem = (
	itemId: number,
	reviewId: string,
	movieId: number,
	userId: string
) => {
	const collectionPath = `users/${userId}/reviews/${reviewId}/replies/${itemId}`
	const generalCollectionPath = `movies/${movieId}/reviews/${reviewId}/replies/${itemId}`

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
	movieId: number,
	loadedItems: Array<any>,
	setItems: ([]) => void
) => {
	const collectionRef = ref(database, `movies/${movieId}/reviews/`)

	const onAdded = (childSnapshot: DataSnapshot) => {
		const newItem = childSnapshot.val()
		if (!loadedItems.some(existingItem => existingItem.id === newItem.id)) {
			setItems(prevItems => [newItem, ...prevItems])
		}
	}

	const onRemoved = (childSnapshot: DataSnapshot) => {
		const removedItem = childSnapshot.val()
		setItems(prevItems =>
			prevItems.filter(item => item.id !== removedItem.id)
		)
	}

	const unsubscribeAdded = onChildAdded(collectionRef, onAdded)
	const unsubscribeRemoved = onChildRemoved(collectionRef, onRemoved)

	return () => {
		unsubscribeAdded()
		unsubscribeRemoved()
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
