import React, {FC} from "react";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../app/components/UI/Button/index";
import {IBackdrop} from "../../../../interfaces";
import useImagesSlider from "../../../hooks/useImagesSlider";
import defaultMovieImage from "../../../app/assets/images/default-movie-image.svg";
import Modal from "../../../app/components/UI/Modal/index";
import Image from "../Image/index";

type PropsType = {
    images: Array<IBackdrop>;
    setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImagesSlider: FC<PropsType> = ({ images, setIsShowModal}) => {
    const { currentImageIndex, showNextImage, showPrevImage } = useImagesSlider(images);

    const handleCloseModal = () => {
        setIsShowModal(false);
    };

    return (
        <Modal className="!max-w-5xl" handleCloseModal={handleCloseModal}>
            <Image
                className="aspect-[215/121]"
                src={`https://image.tmdb.org/t/p/w500${images[currentImageIndex].file_path}`}
                defaultImage={defaultMovieImage}
            />
            <Button context="icon" className="absolute inset-y-1/2 -translate-y-1/2 right-4" onClick={showNextImage}>
                <FontAwesomeIcon icon={faChevronRight} className="w-6 h-6" />
            </Button>
            <Button context="icon" className="absolute inset-y-1/2 -translate-y-1/2 left-4" onClick={showPrevImage}>
                <FontAwesomeIcon icon={faChevronLeft} className="w-6 h-6" />
            </Button>
        </Modal>
    );
};

export default ImagesSlider;
