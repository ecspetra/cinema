import Title from '@/app/components/UI/Title/Title'
import React, { FC, useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import Button from '@/app/components/UI/Button'
import Error from '@/app/components/UI/Error'
import SelectOption from '@/app/components/UI/Input/Select/SelectOption'
import Select from '@/app/components/UI/Input/Select'
import FilterTagList from '@/components/Tag/FilterTagList'
import Search from '@/app/components/UI/Search'
import { generateYearsList } from '@/handlers/generateYearsList'
import {
	FilterFields,
	FilterUrlToSearch,
	UserCollections,
} from '@/constants/enum'
import { getCountriesList } from '@/handlers/getCountriesList'
import SelectedFilters from '@/app/components/Filter/SelectedFilters'
import { generateRatingList } from '@/handlers/generateRatingList'

type PropsType = {
	onApply: (formData: FilterFormData) => void
	collectionType: UserCollections.movie | UserCollections.tv
	fields: (keyof FilterFormData)[]
	defaultUrl: string
}

interface FilterFormData {
	primary_release_year: number
	first_air_date_year: number
	'vote_average.lte': number
	with_people: Array<string>
	with_companies: Array<string>
	with_genres: Array<string>
	with_original_language: string
	with_keywords: Array<string>
}

const Filter: FC<PropsType> = ({
	onApply,
	collectionType,
	fields,
	defaultUrl,
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [formData, setFormData] = useState<FilterFormData>({})
	const [error, setError] = useState<string>('')
	const [countryList, setCountryList] = useState([])

	const handleResetFilter = () => {
		setFormData({})
		onApply(defaultUrl)
	}

	const handleSelectChange = (field: keyof FilterFormData, value: any) => {
		setFormData(prevData => ({ ...prevData, [field]: value }))
	}

	const handleArrayFieldChange = (
		field: keyof FilterFormData,
		value: object
	) => {
		setFormData(prevData => {
			const currentValue = prevData[field]

			const updatedArray = Array.isArray(currentValue)
				? [...currentValue, value]
				: [value]
			return { ...prevData, [field]: updatedArray }
		})
	}

	const handleRemoveFilterTag = (tag: any) => {
		setFormData(prevData => {
			const currentValue = prevData[tag.field]

			const updatedArray = Array.isArray(currentValue)
				? currentValue.filter(item => item.name !== tag.name)
				: []

			const updatedData = { ...prevData, [tag.field]: updatedArray }

			if (updatedArray.length === 0) {
				const { [tag.field]: removedField, ...restData } = updatedData
				return restData
			}

			return updatedData
		})
	}

	const handleToggleTag = (field: keyof FilterFormData, tag, isChecked) => {
		setFormData(prevData => {
			const currentValue = prevData[field]

			if (isChecked) {
				const updatedArray = Array.isArray(currentValue)
					? currentValue.filter(item => item.name !== tag.name)
					: []

				const updatedData = { ...prevData, [field]: updatedArray }
				if (updatedArray.length === 0) {
					const { [field]: removedField, ...restData } = updatedData
					return restData
				}

				return updatedData
			} else {
				const updatedArray = Array.isArray(currentValue)
					? [...currentValue, tag]
					: [tag]
				return { ...prevData, [field]: updatedArray }
			}
		})
	}

	const getQuery = () => {
		let queryArray = []

		for (const key in formData) {
			if (formData.hasOwnProperty(key)) {
				const value = formData[key]

				if (Array.isArray(value)) {
					queryArray.push(
						`${key}=${value.map(item => item?.id).join(',')}`
					)
				} else if (
					typeof value === 'string' ||
					typeof value === 'number'
				) {
					queryArray.push(`${key}=${value || ''}`)
				}
			}
		}

		return `&${queryArray.join('&').replace(/\s/g, '')}`
	}

	const getSelectOptions = field => {
		let options = []
		switch (field) {
			case 'primary_release_year':
			case 'first_air_date_year':
				options = generateYearsList(1930)
				return options
			case 'vote_average.lte':
				options = generateRatingList(10)
				return options
		}
	}

	const handleSearch = async (event: React.FormEvent) => {
		event.preventDefault()
		setIsLoading(true)

		try {
			if (Object.keys(formData).length === 0) {
				onApply(defaultUrl)
			} else {
				const query = getQuery()
				onApply(defaultUrl.concat(query))
			}

			setError('')
		} catch (error: any) {
			setError(error.toString())
		} finally {
			setIsLoading(false)
		}
	}

	const groupedFields = [
		'primary_release_year',
		'first_air_date_year',
		'vote_average.lte',
		'with_people',
		'with_companies',
		'with_original_language',
		'with_keywords',
	]
	const ungroupedFields = ['with_genres']

	const getField = (field: keyof FilterFormData) => {
		switch (field) {
			case 'primary_release_year':
			case 'first_air_date_year':
			case 'vote_average.lte':
				const options = getSelectOptions(field)
				return (
					<Select
						key={field}
						label={FilterFields[field]}
						name={field}
						onChange={handleSelectChange}
					>
						{options.map((item, idx) => (
							<SelectOption
								key={item}
								value={item}
								label={item}
							/>
						))}
					</Select>
				)
			case 'with_original_language':
				return (
					<Select
						key={field}
						label={FilterFields[field]}
						name={field}
						onChange={handleSelectChange}
					>
						{countryList.map((item, idx) => (
							<SelectOption
								key={idx}
								value={item.iso_3166_1.toLowerCase()}
								label={item.english_name}
							/>
						))}
					</Select>
				)
			case 'with_people':
			case 'with_companies':
			case 'with_keywords':
				return (
					<Search
						key={field}
						name={field}
						label={FilterFields[field]}
						urlToFetch={FilterUrlToSearch[field]}
						onSearch={handleArrayFieldChange}
					/>
				)
			case 'with_genres':
				return (
					<FilterTagList
						key={field}
						tags={formData[field]}
						onToggle={handleToggleTag}
						name={field}
						type={collectionType}
					/>
				)
		}
	}

	useEffect(() => {
		const fetchCountriesList = async () => {
			const countryList = await getCountriesList(collectionType)
			setCountryList(countryList)
		}

		fetchCountriesList()
	}, [])

	return (
		<div className='mb-16 bg-gray-950'>
			<Title>Filter</Title>
			<form onSubmit={handleSearch}>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
					{fields.map((field: keyof FilterFormData) => {
						if (groupedFields.includes(field))
							return getField(field)
					})}
				</div>
				<div>
					{fields.map((field: keyof FilterFormData) => {
						if (ungroupedFields.includes(field))
							return getField(field)
					})}
				</div>
				<SelectedFilters
					formData={formData}
					onRemove={handleRemoveFilterTag}
					onReset={handleResetFilter}
					countryList={countryList}
				/>
				<Button type='submit' className='mx-auto'>
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
