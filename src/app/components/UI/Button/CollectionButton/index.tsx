import React, { FC } from 'react'
import Button from '@/app/components/UI/Button'
import Loader from '@/components/Loader'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type PropsType = {
	isLoadingCollection: boolean
	isCollectionItem: boolean
	onClick: () => void
	className?: string
	collectionName?: string
}

const CollectionButton: FC<PropsType> = ({
	isLoadingCollection,
	isCollectionItem,
	onClick,
	className,
	collectionName = 'collection',
}) => {
	return (
		<Button
			context={isCollectionItem ? 'collection' : 'filled'}
			className={className}
			onClick={onClick}
		>
			{isLoadingCollection ? (
				<Loader type='static' />
			) : (
				<span>
					<FontAwesomeIcon icon={faHeart} className='mr-2' />
					{isCollectionItem
						? `Remove from ${collectionName}`
						: `Add to ${collectionName}`}
				</span>
			)}
		</Button>
	)
}

export default CollectionButton
