"use strict";
exports.id = 570;
exports.ids = [570];
exports.modules = {

/***/ 5155:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _app_components_UI_Title_Title__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9457);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7197);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6466);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__);




const ErrorScreen = ({ title, text })=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "w-full h-full flex flex-col justify-center items-center flex-1 text-center",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
                icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faBug,
                className: "text-rose-600 text-2xl mb-4"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_UI_Title_Title__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                variant: "h3",
                children: title
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: "text-sm text-gray-500",
                children: text
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorScreen);


/***/ }),

/***/ 7535:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_useScrollToTop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5809);


const useItemsToShow = (initialItems, initialItemsLength, scrollHeight = 100)=>{
    const [itemsToShow, setItemsToShow] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const { listRef, scrollToTop } = (0,_hooks_useScrollToTop__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(scrollHeight);
    const isAllDataVisible = itemsToShow.length > initialItemsLength;
    const isShowMoreButton = initialItems.length > initialItemsLength;
    const buttonText = isAllDataVisible ? "Show less" : "Show all";
    const getItemsToShow = ()=>{
        if (isAllDataVisible) scrollToTop();
        const newItems = isAllDataVisible ? initialItems.slice(0, initialItemsLength) : initialItems;
        if (isAllDataVisible) {
            setTimeout(()=>{
                setItemsToShow(newItems);
            }, 600);
        } else {
            setItemsToShow(newItems);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const updatedItems = initialItems.slice(0, initialItemsLength);
        setItemsToShow(updatedItems);
    }, [
        initialItems
    ]);
    return {
        itemsToShow,
        getItemsToShow,
        isShowMoreButton,
        buttonText,
        listRef
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useItemsToShow);


/***/ }),

/***/ 5809:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useScrollToTop(offset = 0) {
    const listRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const scrollToTop = ()=>{
        if (listRef.current) {
            const scrollPosition = listRef.current.getBoundingClientRect().top;
            window.scrollTo({
                top: window.pageYOffset + scrollPosition - offset,
                behavior: "smooth"
            });
        }
    };
    return {
        listRef,
        scrollToTop
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useScrollToTop);


/***/ })

};
;