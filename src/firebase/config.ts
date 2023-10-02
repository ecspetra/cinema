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
	startAt,
	endAt,
	onChildAdded,
	query,
	orderByChild,
	startAfter,
	child,
} from 'firebase/database'
import { uuidv4 } from '@firebase/util'
import { IMovieCard, IPersonCard } from '../../interfaces'

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

// collection movie handlers

export const setNewCollectionItem = async (
	item: IMovieCard | IPersonCard,
	userId: string,
	collection: 'movies' | 'persons'
) => {
	const newCollectionItemRef = ref(
		database,
		`users/${userId}/${
			collection === 'movies' ? 'collectionMovies' : 'collectionPersons'
		}/${item.id}`
	)
	let newCollectionItemData

	if (collection === 'movies') {
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
	collection: 'movies' | 'persons'
) => {
	const movieRef = ref(
		database,
		`users/${userId}/${
			collection === 'movies' ? 'collectionMovies' : 'collectionPersons'
		}/${itemId}`
	)

	return new Promise(async resolve => {
		let isCollectionItem = false

		get(movieRef).then(snapshot => {
			if (snapshot.exists()) isCollectionItem = true

			resolve(isCollectionItem)
		})
	})
}

export const getCollectionMovies = async (
	userId: string,
	lastMovieId: string | null
) => {
	const userCollectionRef = ref(database, `users/${userId}/collectionMovies/`)
	const moviesPerPage = 20
	let queryRef

	if (lastMovieId) {
		queryRef = query(
			userCollectionRef,
			orderByKey(),
			startAfter(lastMovieId),
			limitToFirst(moviesPerPage + 1)
		)
	} else {
		queryRef = query(
			userCollectionRef,
			orderByKey(),
			limitToFirst(moviesPerPage + 1)
		)
	}

	const snapshot = await get(queryRef)
	const data = snapshot.val() || {}
	const movieIds = Object.keys(data)
	let isMoreDataAvailable = false

	if (movieIds.length > moviesPerPage) {
		isMoreDataAvailable = true
		movieIds.pop()
	}

	const movies = await Promise.all(
		movieIds.map(async movieId => {
			const movieSnapshot = await get(child(userCollectionRef, movieId))
			return movieSnapshot.val()
		})
	)

	return { isMoreDataAvailable, movies }
}

export const removeCollectionItem = (
	itemId: number,
	userId: string,
	collection: 'movies' | 'persons'
) => {
	const itemRef = ref(
		database,
		`users/${userId}/${
			collection === 'movies' ? 'collectionMovies' : 'collectionPersons'
		}/${itemId}`
	)

	return new Promise(async resolve => {
		let isRemoved = false

		remove(itemRef).then(() => {
			isRemoved = true
		})

		resolve(isRemoved)
	})
}
