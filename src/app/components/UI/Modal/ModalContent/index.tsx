import React, { FC, useRef } from 'react'
import classNames from 'classnames'
import Button from '@/app/components/UI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Title from '@/app/components/UI/Title/Title'
import { IModalContent } from '../../../../../../interfaces'

type PropsType = {
	currentModal: IModalContent
	onClose: () => void
}

const ModalContent: FC<PropsType> = ({ currentModal, onClose }) => {
	const modalRef = useRef(null)
	const { id, modalTitle, modalText, modalClassName, modalContent } =
		currentModal
	const isShowModalHeader = modalTitle || modalText

	return (
		<div className='w-screen h-screen fixed inset-0 z-50 bg-black/70 flex justify-center items-center backdrop-blur duration-300'>
			<div
				className={classNames(
					'w-full max-w-lg relative p-12 bg-gray-900',
					modalClassName
				)}
				ref={modalRef}
			>
				<Button
					context='icon'
					className='!absolute top-4 right-4'
					onClick={onClose}
				>
					<FontAwesomeIcon icon={faXmark} className='w-6 h-6' />
				</Button>
				<div>
					{isShowModalHeader && (
						<div className='mb-8 max-w-[90%]'>
							{modalTitle && (
								<Title variant='h2' className='!font-bold'>
									{modalTitle}
								</Title>
							)}
							{modalText && <p>{modalText}</p>}
						</div>
					)}
					{modalContent && (
						<div className='relative'>{modalContent}</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ModalContent
