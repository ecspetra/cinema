import { useState } from 'react'
import { ERROR_MESSAGES } from '@/constants/errorMessages'

const useInput = (
	initialValue: string,
	validationFunction: (value: string) => boolean
) => {
	const [value, setValue] = useState<string>(initialValue)
	const [error, setError] = useState<string>('')

	const handleInput = (newValue: string) => {
		setValue(newValue)
		setError(newValue ? '' : 'ERROR_MESSAGES.INVALID_INPUT')
	}

	return { value, error, handleInput, isValid: validationFunction(value) }
}

export default useInput
