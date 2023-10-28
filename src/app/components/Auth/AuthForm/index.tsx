import React, { useState } from 'react'
import Title from '@/app/components/UI/Title/Title'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Button from '@/app/components/UI/Button'
import LoginForm from '@/app/components/Auth/LoginForm'
import SignUpForm from '@/app/components/Auth/SignUpForm'

const AuthForm = () => {
	const [isShowSignUp, setIsShowSignUp] = useState<boolean>(true)

	return (
		<div className='h-full flex flex-1 flex-col justify-center items-center'>
			<div className='flex justify-center items-center mb-12 gap-4'>
				<Title className='!mb-0 after:hidden !pb-0'>
					{isShowSignUp ? 'Sign up' : 'Login'}
				</Title>
				<FontAwesomeIcon
					className='text-2xl text-amber-600'
					icon={isShowSignUp ? faUserPlus : faDoorOpen}
				/>
			</div>
			{isShowSignUp ? <SignUpForm /> : <LoginForm />}
			<div className='flex justify-center items-center flex-wrap mt-12 gap-2'>
				<p>
					{isShowSignUp
						? 'Do you already have an account?'
						: 'Do you want to create a new account?'}
				</p>
				<Button
					context='text'
					className='mt-0'
					onClick={() => setIsShowSignUp(!isShowSignUp)}
				>
					{isShowSignUp ? 'Login' : 'Sign up'}
				</Button>
			</div>
		</div>
	)
}

export default AuthForm
