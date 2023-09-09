import React, {FC, JSX, useEffect, useRef} from 'react';
import Portal from "../Portal/index";
import Button from "../Button/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import Title from "../Title/Title";
import classNames from "classnames";

type ModalPropTypes = {
    handleCloseModal: (arg: boolean) => void;
    children?: JSX.Element | JSX.Element[];
    modalTitle?: string;
    modalText?: string;
    className?: string;
}

const Modal: FC<ModalPropTypes> = ({ children, handleCloseModal, modalTitle, modalText, className }) => {
    const modalRef = useRef(null);

    const childrenWithProps = React.Children.map(children, (child) => (
        React.cloneElement(child, {
            handleCloseModal: handleCloseModal,
        })
    ));

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleCloseModal(false);
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [modalRef]);

    return (
        <Portal wrapperId="modal-root">
            <div className="w-screen h-screen fixed inset-0 z-50 bg-slate-900 bg-opacity-80 flex justify-center items-center">
                <div className={classNames('w-full max-w-xl relative', className)} ref={modalRef}>
                    <Button context="icon" className="absolute top-4 right-4" onClick={() => {handleCloseModal(false)}}>
                        <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
                    </Button>
                    <div>
                        {modalTitle || modalText && (
                            <div className="mb-8">
                                {modalTitle && <Title>{modalTitle}</Title>}
                                {modalText && <p>{modalText}</p>}
                            </div>
                        )}
                        {childrenWithProps && (
                            <div className="relative">
                                {childrenWithProps}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default Modal;