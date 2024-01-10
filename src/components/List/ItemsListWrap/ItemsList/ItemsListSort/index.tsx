import { SortByOption } from '@/constants/enum'
import SelectOption from '@/app/components/UI/Input/Select/SelectOption'
import Select from '@/app/components/UI/Input/Select'
import { FC } from 'react'

type PropsType = {
	onChange: (value: SortByOption) => void
	defaultSortValue: string
}

const ItemsListSort: FC<PropsType> = ({ onChange, defaultSortValue }) => {
	const defaultValue = Object.keys(SortByOption).find(
		key =>
			SortByOption[key as keyof typeof SortByOption] === defaultSortValue
	)

	return (
		<Select
			label='Sort by'
			onChange={value => onChange(value as SortByOption)}
			defaultValue={defaultValue!}
			className='!w-48 ml-auto'
		>
			{Object.values(SortByOption).map((item, idx) => (
				<SelectOption
					key={item}
					value={item}
					className='text-sm !font-light'
					label={Object.keys(SortByOption)[idx]}
				/>
			))}
		</Select>
	)
}

export default ItemsListSort
