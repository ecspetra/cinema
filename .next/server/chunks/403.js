"use strict";
exports.id = 403;
exports.ids = [403];
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

/***/ 911:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _handlers_handleModals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1168);
/* harmony import */ var _context_ModalProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4858);
/* harmony import */ var _handlers_getResultsByPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8750);




const useGeneralListPageFetch = (itemsListFromProps, urlToFetch)=>{
    const { showModal } = (0,_context_ModalProvider__WEBPACK_IMPORTED_MODULE_2__/* .useModal */ .d)();
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        setIsLoading(true);
        if (!itemsListFromProps) {
            (0,_handlers_getResultsByPage__WEBPACK_IMPORTED_MODULE_3__/* .getResultsByPage */ .Z)(urlToFetch, 1).then((data)=>{
                setItems(data);
            }).catch(()=>{
                (0,_handlers_handleModals__WEBPACK_IMPORTED_MODULE_1__/* .showErrorNotification */ .s9)(showModal, "An error has occurred");
            }).finally(()=>{
                setIsLoading(false);
            });
        } else setItems(itemsListFromProps);
    }, [
        itemsListFromProps
    ]);
    return {
        items,
        isLoading
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useGeneralListPageFetch);


/***/ })

};
;