import Title from '@/app/components/UI/Title/Title'
import InputField from '@/app/components/UI/Input/InputField'
import React, { ChangeEvent, FC, useState } from 'react'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import Loader from '@/components/Loader'
import Button from '@/app/components/UI/Button'
import Error from '@/app/components/UI/Error'
import { SortByOption } from '@/constants/enum'
import SelectOption from '@/app/components/UI/Input/Select/SelectOption'
import Select from '@/app/components/UI/Input/Select'
import FilterTagList from '@/components/Tag/FilterTagList'
import Search from '@/app/components/UI/Search'
import FilterTag from '@/app/components/Filter/FilterTag'

type PropsType = {
	onApply: (formData: FilterFormData) => void
	type: 'movie' | 'person'
	fields: (keyof FilterFormData)[]
}

interface FilterFormData {
	searchQuery: string
	primary_release_year: number
	first_air_date_year: number
	include_adult: boolean
	vote_average: number
	with_people: Array<string>
	with_companies: Array<string>
	with_genres: Array<string>
	with_origin_country: string
	with_keywords: Array<string>
}

const Filter: FC<PropsType> = ({ onApply, type, fields }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isTouched, setIsTouched] = useState<boolean>(false)
	const [formData, setFormData] = useState<FilterFormData>({})
	const [error, setError] = useState<string>('')
	console.log(formData)

	const handleSelectChange = (field: keyof FilterFormData, value: any) => {
		setIsTouched(true)
		setFormData(prevData => ({ ...prevData, [field]: value }))
	}

	const handleArrayFieldChange = (
		field: keyof FilterFormData,
		value: any
	) => {
		setIsTouched(true)
		setFormData(prevData => {
			const currentValue = prevData[field]

			const updatedArray = Array.isArray(currentValue)
				? [...currentValue, value]
				: [value]
			return { ...prevData, [field]: updatedArray }
		})
	}

	const handleStringFieldChange = (
		field: keyof FilterFormData,
		value: any
	) => {
		setIsTouched(true)
		setFormData(prevData => ({ ...prevData, [field]: value }))
	}

	const handleRemoveFilterTag = (field: keyof FilterFormData, value: any) => {
		setFormData(prevData => {
			const currentValue = prevData[field]

			const updatedArray = Array.isArray(currentValue)
				? currentValue.filter(item => item !== value)
				: []

			const updatedData = { ...prevData, [field]: updatedArray }

			if (updatedArray.length === 0) {
				const { [field]: removedField, ...restData } = updatedData
				return restData
			}

			return updatedData
		})
	}

	const handleToggleTag = (field: keyof FilterFormData, tag, isChecked) => {
		setIsTouched(true)

		setFormData(prevData => {
			const currentValue = prevData[field]

			if (isChecked) {
				const updatedArray = Array.isArray(currentValue)
					? currentValue.filter(item => item !== tag.name)
					: []

				const updatedData = { ...prevData, [field]: updatedArray }
				if (updatedArray.length === 0) {
					const { [field]: removedField, ...restData } = updatedData
					return restData
				}

				return updatedData
			} else {
				const updatedArray = Array.isArray(currentValue)
					? [...currentValue, tag.name]
					: [tag.name]
				return { ...prevData, [field]: updatedArray }
			}
		})
	}

	const handleSearch = async (event: React.FormEvent) => {
		event.preventDefault()
		setIsLoading(true)

		const isFormValid = true

		if (isFormValid && isTouched) {
			try {
				// onApply(
				// 	LINK_TO_SEARCH_MOVIE.replace('{type}', type).replace(
				// 		'{searchQuery}',
				// 		formData.searchQuery.value
				// 	)
				// )
				setError('')
			} catch (error: any) {
				setError(error.toString())
			} finally {
				setIsLoading(false)
			}
		} else {
			setError(isFormValid ? '' : ERROR_MESSAGES.REQUIRED_FIELD)
			setIsLoading(false)
		}
	}

	return (
		<div className='mb-16 bg-gray-950 p-4'>
			<Title variant='h3'>Filter</Title>
			<div className='flex justify-start items-start'>
				{Object.values(formData).map((value, idx) => {
					if (Array.isArray(value)) {
						return value.map(item => {
							return (
								<FilterTag
									key={item}
									field={Object.keys(formData)[idx]}
									tag={item}
									onRemove={handleRemoveFilterTag}
								/>
							)
						})
					} else {
						return (
							<FilterTag
								key={value}
								field={Object.keys(formData)[idx]}
								tag={value}
								onRemove={handleRemoveFilterTag}
							/>
						)
					}
				})}
			</div>

			<form onSubmit={handleSearch}>
				<div className='flex justify-between items-start'>
					<div className='flex gap-4'>
						{fields.map((item: keyof FilterFormData) => {
							if (
								item === 'primary_release_year' ||
								item === 'first_air_date_year'
							) {
								return (
									<Select
										key={item}
										label='Year'
										onChange={handleSelectChange}
										className='max-w-[200px]'
									>
										{Object.values(SortByOption).map(
											(item, idx) => (
												<SelectOption
													key={item}
													value={item}
													text={
														Object.keys(
															SortByOption
														)[idx]
													}
												/>
											)
										)}
									</Select>
								)
							} else if (
								item === 'with_people' ||
								item === 'with_companies'
							) {
								return (
									<Search
										key={item}
										formFieldName={item}
										onSearch={handleArrayFieldChange}
									/>
								)
							} else if (item === 'with_genres') {
								return (
									<FilterTagList
										key={item}
										onToggle={handleToggleTag}
										formFieldName={item}
									/>
								)
							} else {
								return (
									<InputField
										key={item}
										id={item}
										label={
											item.charAt(0).toUpperCase() +
											item.slice(1).replace(/_/g, ' ')
										}
										value={formData[item]}
										onChange={(
											e: ChangeEvent<HTMLInputElement>
										) =>
											handleStringFieldChange(
												item,
												e.target.value
											)
										}
									/>
								)
							}
						})}
					</div>
				</div>
				<Button className='mt-8 w-full' type='submit'>
					{isLoading ? <Loader isShowText type='static' /> : 'Apply'}
				</Button>
				{error && (
					<Error
						className='px-4 py-2 bg-rose-600/20 w-full rounded-md'
						error={error}
					/>
				)}
			</form>
		</div>
	)
}

export default Filter
