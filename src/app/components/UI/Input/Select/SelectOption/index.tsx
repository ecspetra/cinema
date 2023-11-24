import { FC } from 'react'

type PropsType = {
	value: string
	label: string
}

const SelectOption: FC<PropsType> = ({ value, label }) => {
	return (
		<option
			className='w-full bg-transparent autofill:shadow-[inset_0_0_0px_1000px_#000000/0] autofill:caret-white outline-none block'
			value={value}
		>
			{label}
		</option>
	)
}

export default SelectOption
