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
} from 'firebase/database'
import { uuidv4 } from '@firebase/util'
import { IMovieCard, IPersonCard, IReviewCard } from '../../interfaces'
import { onValue } from '@firebase/database'
import React from 'react'

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
	let newCollectionItemData

	if (collectionName === 'movies') {
		newCollectionItemData = {
			id: item.id,
			poster_path: item.poster_path,
			release_date: item.release_date,
			title: item.title,
			genres: item.genres,
		}
	} else {
		newCollectionItemData = {
			id: item.id,
			profile_path: item.profile_path,
			name: item.name,
		}
	}

	await set(newCollectionItemRef, newCollectionItemData)
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
