import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'

const PageLoader = ({ children }) => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const handleRouteChangeStart = () => {
			setIsLoading(true)
		}

		const handleRouteChangeComplete = () => {
			setIsLoading(false)
		}

		router.events.on('routeChangeStart', handleRouteChangeStart)
		router.events.on('routeChangeComplete', handleRouteChangeComplete)

		return () => {
			router.events.off('routeChangeStart', handleRouteChangeStart)
			router.events.off('routeChangeComplete', handleRouteChangeComplete)
		}
	}, [])

	return (
		<div className='relative'>
			{isLoading && (
				<div className='absolute w-screen h-screen z-50 flex justify-center items-center'>
					<Loader className='bg-transparent' />
				</div>
			)}
			{children}
		</div>
	)
}

export default PageLoader
