import { SortByOption } from '@/constants/enum'
import SelectOption from '@/app/components/UI/Input/Select/SelectOption'
import Select from '@/app/components/UI/Input/Select'
import React, { FC } from 'react'

type PropsType = {
	onChange: () => void
}

const ItemsListSort: FC<PropsType> = ({ onChange }) => {
	return (
		<Select label='Sort by' onChange={onChange} className='!w-48 ml-auto'>
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
