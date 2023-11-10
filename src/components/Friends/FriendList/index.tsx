import React, { FC, ReactNode, useState } from 'react'
import Button from '@/app/components/UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faGear } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'
import Title from '@/app/components/UI/Title/Title'
import EmptyList from '@/components/List/EmptyList'

type PropsType = {
	friends: Array<any>
}

const FriendList: FC<PropsType> = ({ friends }) => {
	const [itemsList, setItemsList] = useState(friends)

	if (!itemsList.length)
		return <EmptyList title='Friends' text='No friends yet' />

	return (
		<>
			<Title className='after:hidden !pb-0 text-center'>Friends</Title>
			{/*{userInfo?.friends ? userInfo?.friends : 'No friends yet'}*/}
		</>
	)
}

export default FriendList
