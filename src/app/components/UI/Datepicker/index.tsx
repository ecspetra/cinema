import React, { FC, useState, useEffect } from 'react'
import Datepicker from 'tailwind-datepicker-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

type PropsType = {
	initialDateValue: string
	label: string
	onChange: (event) => void
	required?: boolean
}

const CustomDatepicker: FC<PropsType> = ({
	initialDateValue,
	label,
	onChange,
	required,
}) => {
	const [show, setShow] = useState<boolean>(false)
	const currentDate = new Date()
	currentDate.setHours(0, 0, 0, 0)

	const initialDate =
		initialDateValue.length !== 0
			? moment(initialDateValue, 'Do MMM YYYY').toDate()
			: currentDate

	const options = {
		title: '',
		autoHide: true,
		todayBtn: false,
		clearBtn: true,
		clearBtnText: 'Clear',
		maxDate: currentDate,
		minDate: new Date('1950-01-01'),
		theme: {
			background: 'bg-gray-900 rounded-none',
			todayBtn: '',
			clearBtn:
				'bg-gray-700 rounded-md hover:bg-gray-600 focus:ring-0 !outline-0 font-semibold border-0 text-white duration-300',
			icons: 'bg-transparent rounded-md hover:bg-transparent hover:text-white focus:ring-0 !outline-0 font-semibold border-0 text-white duration-300',
			text: 'text-white hover:!bg-amber-500 rounded-none duration-300',
			disabledText:
				'!text-gray-500 bg-gray-800 rounded-none hover:!bg-gray-800',
			input: 'w-full bg-transparent text-base pl-10 pr-4 pt-8 pb-4 focus:ring-0 focus:border-white !outline-0 border-0 hover:border-0 focus-within:border-0 rounded-none text-white',
			inputIcon: 'text-white w-4 h-4 absolute top-1/2 transform left-4',
			selected: 'bg-amber-500 hover:!bg-amber-500',
		},
		icons: {
			prev: () => (
				<span>
					<FontAwesomeIcon icon={faChevronLeft} />
				</span>
			),
			next: () => (
				<span>
					<FontAwesomeIcon icon={faChevronRight} />
				</span>
			),
		},
		datepickerClassNames: 'top-full',
		defaultDate: initialDate,
		language: 'en',
		disabledDates: [],
		weekDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
		inputNameProp: 'date',
		inputIdProp: 'date',
		inputPlaceholderProp: 'Select Date',
		inputDateFormatProp: {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		},
	}

	const handleClose = (state: boolean) => {
		setShow(state)
	}

	return (
		<div className='relative w-full bg-transparent text-base focus:ring-0 focus:border-white !outline-0 border border-gray-500 hover:border-white focus-within:border-white duration-300 block rounded-none text-white'>
			<span className='text-xs text-gray-500 font-semibold absolute top-4 left-4'>
				{`${label}${required ? ' *' : ''}`}
			</span>
			<Datepicker
				options={options}
				onChange={onChange}
				show={show}
				setShow={handleClose}
			/>
		</div>
	)
}

export default CustomDatepicker
