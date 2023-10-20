import Title from '@/app/components/UI/Title/Title'
import React, { FC } from 'react'

type PropsType = {
	title?: string
	text?: string
}

const EmptyList: FC<PropsType> = ({ title, text = 'No items yet' }) => {
	return (
		<div className='mb-16'>
			{title && <Title>{title}</Title>}
			<p>{text}</p>
		</div>
	)
}

export default EmptyList
