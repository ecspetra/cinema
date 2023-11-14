import React, { FC, ReactNode, useEffect, useState } from 'react'
import Button from '@/app/components/UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faGear } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'
import Title from '@/app/components/UI/Title/Title'
import EmptyList from '@/components/List/EmptyList'
import ProfileIconSmall from '@/components/Profile/ProfileInfo/ProfileIcon/ProfileIconSmall'

type PropsType = {
	friends: Array<any>
}

const FriendList: FC<PropsType> = ({ friends }) => {
	const [itemsList, setItemsList] = useState(friends)

	useEffect(() => {
		setItemsList(friends)
	}, [friends])

	if (!itemsList.length)
		return <EmptyList title='Friends' text='No friends yet' />

	return (
		<>
			<Title>Friends</Title>
			<div className='flex justify-start items-center'>
				{itemsList.map(item => {
					return (
						<ProfileIconSmall
							key={item.info.id}
							userId={item.info.id}
							photoURL={item.info.photoURL}
						/>
					)
				})}
			</div>
		</>
	)
}

export default FriendList
