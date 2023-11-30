import Link from 'next/link'
import { useAuth } from '@/context/AuthProvider'
import Button from '@/app/components/UI/Button'
import { signOutUser } from '@/firebase/config'
import Image from '@/components/Images/Image'
import defaultUserImage from '../../../app/assets/images/default-user-image.svg'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { AUTH_PAGE, COLLECTION_PAGE, PROFILE_PAGE } from '@/constants/paths'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createRoutes } from '@/constants/routes'

const Logo = () => {
	return (
		<Link href={`/`} as={`/`}>
			<span className='font-black'>
				<span className='text-rose-600 pl-2 py-1 border-b-2 border-t-2 border-l-2 border-rose-600'>
					CINEMA&nbsp;
				</span>
				<span className='border-r-2 border-t-2 border-rose-600 pr-2 py-1'>
					Street
				</span>
			</span>
		</Link>
	)
}

export default Logo
