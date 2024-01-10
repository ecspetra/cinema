"use strict";
exports.id = 216;
exports.ids = [216];
exports.modules = {

/***/ 3216:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ Images_ImagesList)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./src/components/Images/Image/index.tsx + 1 modules
var Image = __webpack_require__(1686);
// EXTERNAL MODULE: ./src/app/assets/images/default-movie-image.svg
var default_movie_image = __webpack_require__(3463);
// EXTERNAL MODULE: ./src/app/components/UI/Button/index.tsx
var Button = __webpack_require__(7458);
// EXTERNAL MODULE: ./src/app/components/UI/Title/Title.tsx
var Title = __webpack_require__(9457);
// EXTERNAL MODULE: external "@fortawesome/free-solid-svg-icons"
var free_solid_svg_icons_ = __webpack_require__(6466);
// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__(7197);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./src/components/Images/hooks/useImagesSlider.tsx

const useImagesSlider = (initialImages, initialIdx)=>{
    const [currentImageIdx, setCurrentImageIdx] = (0,external_react_.useState)(initialIdx);
    const showNextImage = ()=>{
        setCurrentImageIdx((prevIdx)=>prevIdx === initialImages.length - 1 ? 0 : prevIdx + 1);
    };
    const showPrevImage = ()=>{
        setCurrentImageIdx((prevIdx)=>prevIdx === 0 ? initialImages.length - 1 : prevIdx - 1);
    };
    return {
        currentImageIdx,
        showNextImage,
        showPrevImage
    };
};
/* harmony default export */ const hooks_useImagesSlider = (useImagesSlider);

// EXTERNAL MODULE: ./src/constants/images.ts
var constants_images = __webpack_require__(8989);
;// CONCATENATED MODULE: ./src/components/Images/ImagesSlider/index.tsx








const ImagesSlider = ({ images, initialSliderImageIdx, isPersonImages })=>{
    const { currentImageIdx, showNextImage, showPrevImage } = hooks_useImagesSlider(images, initialSliderImageIdx);
    const imageFullSrc = images[currentImageIdx].file_path ? constants_images/* ORIGINAL_IMAGE_SRC */.qX.replace("{imageSrc}", images[currentImageIdx].file_path) : "";
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(Image/* default */.Z, {
                className: isPersonImages ? "aspect-[2/3]" : "aspect-[215/121]",
                src: imageFullSrc,
                defaultImage: default_movie_image/* default */.Z
            }),
            /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                context: "icon",
                className: "!absolute inset-y-1/2 -translate-y-1/2 right-4",
                onClick: showNextImage,
                children: /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                    icon: free_solid_svg_icons_.faChevronRight,
                    className: "w-6 h-6"
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                context: "icon",
                className: "!absolute inset-y-1/2 -translate-y-1/2 left-4",
                onClick: showPrevImage,
                children: /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                    icon: free_solid_svg_icons_.faChevronLeft,
                    className: "w-6 h-6"
                })
            })
        ]
    });
};
/* harmony default export */ const Images_ImagesSlider = (ImagesSlider);

// EXTERNAL MODULE: ./src/context/ModalProvider.tsx
var ModalProvider = __webpack_require__(4858);
// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(9003);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);
// EXTERNAL MODULE: ./src/components/List/EmptyList/index.tsx
var EmptyList = __webpack_require__(5513);
// EXTERNAL MODULE: ./src/hooks/useItemsToShow.tsx
var useItemsToShow = __webpack_require__(7535);
// EXTERNAL MODULE: external "@firebase/util"
var util_ = __webpack_require__(5260);
;// CONCATENATED MODULE: ./src/components/Images/ImagesList/index.tsx












const ImagesList = ({ images, isPersonImages = false, className })=>{
    const { showModal } = (0,ModalProvider/* useModal */.d)();
    const { itemsToShow, getItemsToShow, isShowMoreButton, buttonText, listRef } = (0,useItemsToShow/* default */.Z)(images, 12);
    const handleSliderImage = (idx)=>{
        showModal({
            id: (0,util_.uuidv4)(),
            modalTitle: "",
            modalText: "",
            modalClassName: isPersonImages ? "!p-0" : "!max-w-7xl !p-0",
            modalContent: /*#__PURE__*/ jsx_runtime.jsx(Images_ImagesSlider, {
                images: images,
                initialSliderImageIdx: idx,
                isPersonImages: isPersonImages
            }),
            alertInfo: null
        });
    };
    if (!images.length) {
        return /*#__PURE__*/ jsx_runtime.jsx(EmptyList/* default */.Z, {
            title: "Images"
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        ref: listRef,
        className: external_classnames_default()("mb-16", className),
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                children: "Images"
            }),
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: "grid grid-cols-[repeat(auto-fill,calc((100vw-24px)/3))] md:grid-cols-[repeat(auto-fill,calc((100vw-416px)/3))] xl:grid-cols-[repeat(auto-fill,calc(864px/3))] gap-1 justify-start",
                children: itemsToShow.map((item, idx)=>/*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                        context: "image",
                        onClick: ()=>handleSliderImage(idx),
                        children: /*#__PURE__*/ jsx_runtime.jsx(Image/* default */.Z, {
                            className: isPersonImages ? "aspect-[2/3]" : "aspect-[215/121]",
                            src: item.file_path ? constants_images/* SLIDER_IMAGE_SRC */.yI.replace("{imageSrc}", item.file_path) : "",
                            defaultImage: default_movie_image/* default */.Z
                        })
                    }, idx))
            }),
            isShowMoreButton && /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                className: "mx-auto mt-8",
                context: "empty",
                onClick: getItemsToShow,
                children: buttonText
            })
        ]
    });
};
/* harmony default export */ const Images_ImagesList = (ImagesList);


/***/ })

};
;