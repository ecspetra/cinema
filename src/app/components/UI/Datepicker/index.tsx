import React, { FC, useEffect, useState } from 'react'
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker'
import moment from 'moment'

type PropsType = {
	initialDateValue: string
	label: string
	onChange: (
		value: DateValueType,
		e?: HTMLInputElement | null | undefined
	) => void
	required?: boolean
}

const CustomDatepicker: FC<PropsType> = ({
	initialDateValue,
	label,
	onChange,
	required,
}) => {
	const [value, setValue] = useState<DateValueType | null>({
		startDate: moment(initialDateValue, 'YYYY-MM-DD').toDate(),
		endDate: moment(initialDateValue, 'YYYY-MM-DD').toDate(),
	})

	const handleValueChange = (
		value: DateValueType,
		e?: HTMLInputElement | null | undefined
	) => {
		if (value) {
			const dateValueType: DateValueType = {
				startDate: value.startDate,
				endDate: value.endDate,
			}

			onChange(dateValueType, e)
			setValue(value)
		}
	}

	return (
		<div className='relative w-full bg-transparent text-base border border-gray-500 hover:border-white focus-within:border-white duration-300 block text-white'>
			<span className='text-xs text-gray-500 font-semibold absolute top-4 left-4'>
				{`${label}${required ? ' *' : ''}`}
			</span>
			<Datepicker
				readOnly={true}
				primaryColor={'rose'}
				toggleClassName={defaultClassName => `${defaultClassName} pt-4`}
				inputClassName={defaultClassName =>
					`${defaultClassName} w-full !bg-transparent !rounded-none focus:!ring-0 focus:!border-0 focus-visible:!outline-0 !border-0 !font-light !text-base !text-white pl-4 pt-8 pb-4 pr-4`
				}
				useRange={false}
				asSingle={true}
				value={value}
				onChange={handleValueChange}
				minDate={new Date('1940-01-01')}
				maxDate={new Date()}
			/>
		</div>
	)
}

export default CustomDatepicker
