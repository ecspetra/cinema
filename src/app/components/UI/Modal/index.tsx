import React, { useEffect, useRef, useState } from 'react'
import Portal from '../Portal/index'
import { useModal } from '@/context/ModalProvider'
import Alert from '@/app/components/UI/Alert'
import { CSSTransition } from 'react-transition-group'
import ModalContent from '@/app/components/UI/Modal/ModalContent'

const Modal = () => {
	const modalRef = useRef(null)
	const { hideModal, isMounted, currentModal } = useModal()

	const { id, modalText, alertInfo } = currentModal || {}

	useEffect(() => {
		if (alertInfo?.isAlert) {
			setTimeout(() => {
				hideModal(id)
			}, 4500)
		} else {
			const handleClickOutside = (event: MouseEvent) => {
				if (
					modalRef.current &&
					!modalRef.current.contains(event.target)
				) {
					hideModal(id)
				}
			}

			document.addEventListener('click', handleClickOutside)

			return () => {
				document.removeEventListener('click', handleClickOutside)
			}
		}
	}, [modalRef, alertInfo?.isAlert])

	if (!currentModal) return null

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
					<ModalContent
						currentModal={currentModal}
						onClose={() => hideModal(id)}
					/>
				)}
			</CSSTransition>
		</Portal>
	)
}

export default Modal
