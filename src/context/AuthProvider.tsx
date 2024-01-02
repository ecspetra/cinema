import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, AuthContextType } from '@/firebase/config'
import { onAuthStateChanged, reload, User } from 'firebase/auth'
import { removeCookie, setCookie } from '@/handlers/handleCookies'
import { userContextListener } from '@/firebase/handlers/authHandlers/userContextListener'

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

	const updateUserProfile = async () => {
		if (currentUser) {
			setIsLoading(true)

			try {
				await reload(currentUser)
				const updatedUser = auth.currentUser
				setCurrentUser(updatedUser)
				setIsLoading(false)
			} catch (error) {
				setIsLoading(false)
			}
		}
	}

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

		if (currentUser) {
			const prevData = {
				id: currentUser?.uid,
				photoURL: currentUser?.photoURL,
				userName: currentUser?.displayName,
			}

			const unsubscribeUserInfo = userContextListener(
				currentUser?.uid,
				prevData,
				updateUserProfile
			)

			return unsubscribeUserInfo
		}

		return unsubscribe
	}, [currentUser])

	const value: AuthContextType = {
		isLoggedIn: currentUser !== null,
		userId: currentUser?.uid,
		photoURL: currentUser?.photoURL,
		userName: currentUser?.displayName,
		updateUserProfile,
	}

	return (
		<AuthContext.Provider value={value}>
			{!isLoading && children}
		</AuthContext.Provider>
	)
}
