import React, { FC } from 'react'
import Button from '@/app/components/UI/Button'
import Loader from '@/components/Loader'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type PropsType = {
	isLoadingFavorite: boolean
	isFavoriteItem: boolean
	onClick: () => void
}

const FavoriteButton: FC<PropsType> = ({
	isLoadingFavorite,
	isFavoriteItem,
	onClick,
}) => {
	return (
		<Button
			context={isFavoriteItem ? 'favorite' : 'filled'}
			className='mb-12'
			onClick={onClick}
		>
			{isLoadingFavorite ? (
				<Loader className='!static bg-transparent !transform-none !inset-0' />
			) : (
				<span>
					<FontAwesomeIcon icon={faHeart} className='mr-2' />
					{isFavoriteItem
						? 'Remove from favorite'
						: 'Add to favorite'}
				</span>
			)}
		</Button>
	)
}

export default FavoriteButton
