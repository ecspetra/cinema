import { FC } from 'react'
import Button from '@/app/components/UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

type PropsType = {
	title: string
	action: 'like' | 'dislike' | 'reply'
	onClick: () => void
	counter?: number
	isCurrentUserReaction?: boolean
}

const ReviewActionButton: FC<PropsType> = ({
	title,
	action,
	onClick,
	counter,
	isCurrentUserReaction,
}) => {
	const buttonIcon = action === 'like'

	const iconClassNames = 'mr-2 text-lg'

	const getButtonIcon = () => {
		switch (action) {
			case 'like':
				return (
					<FontAwesomeIcon
						icon={faThumbsUp}
						className={iconClassNames}
					/>
				)
			case 'dislike':
				return (
					<FontAwesomeIcon
						icon={faThumbsUp}
						className={classNames(iconClassNames, 'rotate-180')}
					/>
				)
			case 'reply':
				return (
					<FontAwesomeIcon
						icon={faThumbsUp}
						className={iconClassNames}
					/>
				)
		}
	}

	return (
		<>
			<Button
				className={classNames(
					'mr-2',
					isCurrentUserReaction && 'text-amber-400 !bg-amber-900/50'
				)}
				context='icon-text'
				onClick={onClick}
			>
				{getButtonIcon()}
				{title}
				<span className='ml-2'>{counter}</span>
			</Button>
		</>
	)
}

export default ReviewActionButton