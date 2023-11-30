import Tag from '@/components/Tag'
import React, { FC } from 'react'
import Title from '@/app/components/UI/Title/Title'
import Button from '@/app/components/UI/Button'

type PropsType = {
	formData: object
	onRemove: () => void
	onReset: () => void
	countryList: Array<any>
}

const SelectedFilters: FC<PropsType> = ({
	formData,
	onRemove,
	onReset,
	countryList,
}) => {
	if (Object.keys(formData).length === 0) return null

	return (
		<div className='mb-4 p-4 gap-4 bg-gray-900 rounded-md'>
			<div className='flex justify-between items-center mb-4'>
				<Title variant='h3' className='!mb-0 mr-2'>
					Selected filters
				</Title>
				<Button context='text' onClick={onReset}>
					Reset
				</Button>
			</div>
			<div className='flex justify-start items-start'>
				{Object.keys(formData).map((field, idx) => {
					switch (field) {
						case 'primary_release_year':
						case 'first_air_date_year':
						case 'vote_average.lte':
							return (
								<Tag
									key={field}
									tag={{
										name: formData[field],
										field: field,
									}}
									isEdit
									onRemove={onRemove}
								/>
							)
						case 'with_people':
						case 'with_companies':
						case 'with_keywords':
						case 'with_genres':
							return formData[field].map(item => {
								return (
									<Tag
										key={item.name}
										tag={{
											name: item.name,
											field: Object.keys(formData)[idx],
										}}
										isEdit
										onRemove={onRemove}
									/>
								)
							})
						case 'with_original_language':
							const country = countryList.find(
								item =>
									item.iso_3166_1.toLowerCase() ===
									formData[field]
							)
							const countryName = country.english_name
							return (
								<Tag
									key={field}
									tag={{
										name: countryName,
										field: field,
									}}
									isEdit
									onRemove={onRemove}
								/>
							)
					}
				})}
			</div>
		</div>
	)
}

export default SelectedFilters
