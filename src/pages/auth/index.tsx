import React, { useState } from 'react'
import SignUpForm from '../../app/components/Auth/SignUpForm/index'
import LoginForm from '../../app/components/Auth/LoginForm/index'
import Button from '../../app/components/UI/Button/index'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthProvider'
import Loader from '@/components/Loader'
import Title from '@/app/components/UI/Title/Title'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import AuthForm from '@/app/components/Auth/AuthForm'

const Auth = () => {
	const router = useRouter()
	const { currentUser } = useAuth()

	if (currentUser) {
		router.push('/')
		return <Loader className='bg-transparent' />
	}

	return <AuthForm />
}

export default Auth
