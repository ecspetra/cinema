import Title from '@/app/components/UI/Title/Title'
import React, { FC } from 'react'
import classNames from 'classnames'

type PropsType = {
	title?: string
	text?: string
	variant?: 'h1' | 'h3'
	className?: string
}

const EmptyList: FC<PropsType> = ({
	title,
	text = 'No items yet',
	variant = 'h1',
	className,
}) => {
	return (
		<div className={classNames('mb-16', className)}>
			{title && <Title variant={variant}>{title}</Title>}
			<p>{text}</p>
		</div>
	)
}

export default EmptyList
