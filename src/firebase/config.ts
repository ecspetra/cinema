import { initializeApp } from 'firebase/app'
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
	User,
	updateProfile,
} from 'firebase/auth'
import { getDatabase, ref, get, set, remove } from 'firebase/database'
import { uuidv4 } from '@firebase/util'
import { IMovieCard } from '../../interfaces'

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
	const marksRef = ref(database, `users/${userId}/movieMarks`)

	return new Promise(async resolve => {
		get(marksRef).then(snapshot => {
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

// favorite movie handlers

export const setNewFavoriteMovie = async (
	movie: IMovieCard,
	userId: string
) => {
	const newFavoriteMovieRef = ref(
		database,
		`users/${userId}/favoriteMovies/${movie.id}`
	)

	const newFavoriteMovieData = {
		id: movie.id,
		poster_path: movie.poster_path,
		release_date: movie.release_date,
		title: movie.title,
		genres: movie.genres,
	}

	await set(newFavoriteMovieRef, newFavoriteMovieData)
}

export const getFavoriteMovie = (movieId: number, userId: string) => {
	const movieRef = ref(database, `users/${userId}/favoriteMovies/${movieId}`)

	return new Promise(async resolve => {
		let isFavoriteMovie = false

		get(movieRef).then(snapshot => {
			if (snapshot.exists()) isFavoriteMovie = true

			resolve(isFavoriteMovie)
		})
	})
}

export const removeFavoriteMovie = (movieId: number, userId: string) => {
	const movieRef = ref(database, `users/${userId}/favoriteMovies/${movieId}`)

	return new Promise(async resolve => {
		let isRemoved = false

		remove(movieRef).then(() => {
			isRemoved = true
		})

		resolve(isRemoved)
	})
}
