import { FC } from 'react'
import Title from '@/app/components/UI/Title/Title'
import Button from '../../app/components/UI/Button/index'
import Loader from '@/components/Loader'
import { UserCollections } from '@/constants/enum'
import useMarkIcons from '@/components/Mark/hooks/useMarkIcons'
import { useAuth } from '@/context/AuthProvider'

type PropsType = {
	markedItemId: number
	collectionType: UserCollections.movie | UserCollections.tv
}

const Mark: FC<PropsType> = ({ markedItemId, collectionType }) => {
	const { userId } = useAuth()
	const {
		mark,
		markIcons,
		isLoadingMark,
		isShowRemoveMarkButton,
		removeMark,
	} = useMarkIcons(markedItemId, collectionType)

	return (
		<div className='mb-4 relative'>
			<Title variant='h3'>My mark</Title>
			{isLoadingMark ? (
				<Loader isShowText type='static' className='!inline-block' />
			) : (
				<>
					<div className='flex justify-start items-center gap-x-1'>
						<div className='flex justify-start items-center gap-x-1'>
							{markIcons.map(item => {
								return item
							})}
						</div>
						{isShowRemoveMarkButton && (
							<>
								<p className='text-sm font-semibold leading-none mr-2'>
									{mark}
								</p>
								<Button onClick={removeMark} context='text'>
									Remove my mark
								</Button>
							</>
						)}
					</div>
					{!userId && (
						<p className='text-gray-400 text-sm leading-none mt-2'>
							Please login or register to be able to rate the
							movie
						</p>
					)}
				</>
			)}
		</div>
	)
}

export default Mark
