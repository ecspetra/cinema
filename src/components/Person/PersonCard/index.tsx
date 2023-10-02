import { IPersonCard } from '../../../../interfaces'
import { FC } from 'react'
import defaultPersonImage from '../../../app/assets/images/default-person-image.svg'
import Image from '../../Images/Image'
import Button from '../../../app/components/UI/Button'
import Link from 'next/link'
import Title from '../../../app/components/UI/Title/Title'

type PropsType = {
	person: IPersonCard
	isShowCollectionButton?: boolean
}

const PersonCard: FC<PropsType> = ({
	person,
	isShowCollectionButton = false,
}) => {
	const test = () => {}

	return (
		<div className='flex flex-col w-full max-w-[232px]'>
			<Link
				href={`/person/[id]`}
				as={`/person/${person.id}`}
				className='group text-sm'
			>
				<Image
					className='duration-300 mb-4 group-hover:shadow-red-700/70 group-hover:shadow-2xl'
					src={`https://image.tmdb.org/t/p/w440_and_h660_face${person.profile_path}`}
					defaultImage={defaultPersonImage}
				/>
				<Title className='relative z-10' variant='h3'>
					{person.name}
				</Title>
				<p className='relative z-10 text-xs'>
					{person.character ?? person.job}
				</p>
			</Link>
			{isShowCollectionButton && (
				<Button className='mt-auto w-full' onClick={test}>
					Add to collection
				</Button>
			)}
		</div>
	)
}

export default PersonCard
