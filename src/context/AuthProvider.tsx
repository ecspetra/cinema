import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, AuthContextType } from '@/firebase/config'
import { onAuthStateChanged, User } from 'firebase/auth'
import { removeCookie, setCookie } from '@/handlers/handleCookies'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const isLoggedIn = currentUser !== null
	const userId = currentUser?.uid
	const photoURL = currentUser?.photoURL

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async user => {
			setCurrentUser(user)
			setIsLoading(false)

			if (user) {
				setCookie('uid', user.uid, { path: '/' })
			} else {
				removeCookie('uid', { path: '/' })
			}
		})

		return unsubscribe
	}, [])

	const value: AuthContextType = {
		isLoggedIn,
		userId,
		photoURL,
	}

	return (
		<AuthContext.Provider value={value}>
			{!isLoading && children}
		</AuthContext.Provider>
	)
}
