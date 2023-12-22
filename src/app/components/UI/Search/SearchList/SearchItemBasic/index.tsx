import { FC } from 'react'
import Button from '@/app/components/UI/Button'
import { FilterFormData } from '@/hooks/useFilterReducer'
import { IItemCard } from '../../../../../../../interfaces'

type PropsType = {
	item: IItemCard
	fieldName: string
	onSelect: (
		field: keyof FilterFormData,
		value: { id: number; name: string }
	) => void
}

const SearchItemBasic: FC<PropsType> = ({ item, fieldName, onSelect }) => {
	return (
		<Button
			key={item.id}
			onClick={() =>
				onSelect(fieldName, {
					id: item.id,
					name: item.name!,
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
