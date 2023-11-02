import React, { useEffect, useRef, useState } from 'react'
import Portal from '../Portal/index'
import Button from '../Button/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Title from '../Title/Title'
import classNames from 'classnames'
import { useModal } from '@/context/ModalProvider'
import Alert from '@/app/components/UI/Alert'
import { CSSTransition } from 'react-transition-group'

const Modal = () => {
	const modalRef = useRef(null)
	const { hideModal, isModalVisible, isMounted, content } = useModal()
	const { modalTitle, modalText, modalClassName, modalContent, alertInfo } =
		content
	const isShowModalHeader = modalTitle || modalText

	useEffect(() => {
		if (alertInfo?.isAlert) {
			setTimeout(() => {
				hideModal()
			}, 4500)
		} else {
			const handleClickOutside = (event: MouseEvent) => {
				if (
					modalRef.current &&
					!modalRef.current.contains(event.target)
				) {
					hideModal()
				}
			}

			document.addEventListener('click', handleClickOutside)

			return () => {
				document.removeEventListener('click', handleClickOutside)
			}
		}
	}, [modalRef, alertInfo?.isAlert])

	if (!isModalVisible) return null

	return (
		<Portal wrapperId='modal-root' isAlert={alertInfo?.isAlert}>
			<CSSTransition
				in={isMounted}
				timeout={300}
				appear={true}
				classNames='modal'
			>
				{alertInfo?.isAlert ? (
					<Alert modalText={modalText} type={alertInfo?.type} />
				) : (
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
								onClick={() => {
									hideModal()
								}}
							>
								<FontAwesomeIcon
									icon={faXmark}
									className='w-6 h-6'
								/>
							</Button>
							<div>
								{isShowModalHeader && (
									<div className='mb-8 max-w-[90%]'>
										{modalTitle && (
											<Title
												variant='h2'
												className='!font-bold'
											>
												{modalTitle}
											</Title>
										)}
										{modalText && <p>{modalText}</p>}
									</div>
								)}
								{modalContent && (
									<div className='relative'>
										{modalContent}
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</CSSTransition>
		</Portal>
	)
}

export default Modal
