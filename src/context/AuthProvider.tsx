import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, AuthContextType } from '@/firebase/config'
import { onAuthStateChanged, User } from 'firebase/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			setCurrentUser(user)
			setLoading(false)
		})

		return unsubscribe
	}, [])

	const value: AuthContextType = {
		currentUser,
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}
