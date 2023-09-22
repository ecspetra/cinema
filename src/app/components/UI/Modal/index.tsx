import React, { useEffect, useRef } from 'react'
import Portal from '../Portal/index'
import Button from '../Button/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Title from '../Title/Title'
import classNames from 'classnames'
import { useModal } from '@/context/ModalProvider'

const Modal = () => {
	const modalRef = useRef(null)
	const { hideModal, isModalVisible, content } = useModal()
	const { modalTitle, modalText, modalClassName, modalContent } = content
	const isShowModalHeader = modalTitle || modalText

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				hideModal()
			}
		}

		document.addEventListener('click', handleClickOutside)

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [modalRef])

	if (!isModalVisible) return null

	return (
		<Portal wrapperId='modal-root'>
			<div className='w-screen h-screen fixed inset-0 z-50 bg-black/70 flex justify-center items-center backdrop-blur'>
				<div
					className={classNames(
						'w-full max-w-lg relative p-12 bg-slate-900',
						modalClassName
					)}
					ref={modalRef}
				>
					<Button
						context='icon'
						className='absolute top-4 right-4'
						onClick={() => {
							hideModal()
						}}
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
		</Portal>
	)
}

export default Modal
