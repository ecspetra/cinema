import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthProvider'
import Loader from '@/components/Loader'
import AuthForm from '@/app/components/Auth/AuthForm'

const Auth = () => {
	const router = useRouter()
	const { isLoggedIn } = useAuth()

	if (isLoggedIn) {
		router.push('/')
		return <Loader className='bg-transparent' />
	}

	return <AuthForm />
}

export default Auth
