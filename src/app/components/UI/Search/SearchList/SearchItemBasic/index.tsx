import React, { FC } from 'react'
import Button from '@/app/components/UI/Button'

type PropsType = {
	item: object
	fieldName: string
	onSelect: () => void
}

const SearchItemBasic: FC<PropsType> = ({ item, fieldName, onSelect }) => {
	return (
		<Button
			key={item.id}
			onClick={() =>
				onSelect(fieldName, {
					id: item.id,
					name: item.name,
				})
			}
			context='listItem'
			className='w-full z-10'
		>
			{item.name}
		</Button>
	)
}

export default SearchItemBasic
