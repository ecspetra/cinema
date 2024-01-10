"use strict";
exports.id = 318;
exports.ids = [318];
exports.modules = {

/***/ 3803:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _app_components_UI_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7458);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9003);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);



const SelectOption = ({ value, label, onClick, closeList, className })=>{
    const onChooseSelectOption = ()=>{
        onClick && onClick(value, label);
        closeList && closeList();
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_UI_Button__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
        context: "listItem",
        onClick: onChooseSelectOption,
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()("w-full z-10 text-left", className),
        children: label
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectOption);


/***/ }),

/***/ 84:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9003);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hooks_useClickOutsideContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6682);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6466);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7197);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _app_components_UI_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7458);







const Select = ({ children, label, onChange, defaultValue, name, className })=>{
    const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [selectedOption, setSelectedOption] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(defaultValue);
    const { isOpen, onToggleContainer, onCloseContainer } = (0,_hooks_useClickOutsideContainer__WEBPACK_IMPORTED_MODULE_3__/* .useClickOutsideContainer */ .m)(containerRef);
    const handleSelectChange = (value, label)=>{
        if (name) {
            onChange(name, value);
        } else {
            onChange(value);
        }
        setSelectedOption(label);
    };
    const childrenWithProps = react__WEBPACK_IMPORTED_MODULE_1__.Children.map(children, (child)=>{
        if (/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.isValidElement)(child)) {
            const childProps = {
                onClick: handleSelectChange,
                closeList: onCloseContainer
            };
            return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.cloneElement)(child, childProps);
        }
        return child;
    });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (defaultValue) {
            setSelectedOption(defaultValue);
        }
    }, [
        defaultValue
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        ref: containerRef,
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()("relative w-full h-16", className),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_app_components_UI_Button__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                context: "field",
                onClick: onToggleContainer,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "text-xs text-gray-500 font-semibold absolute top-2 left-3 z-10",
                        children: label
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "absolute top-7 left-3 w-[calc(100%-22px)] flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "truncate leading-5",
                                children: selectedOption
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__.FontAwesomeIcon, {
                                icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__.faChevronDown
                            })
                        ]
                    })
                ]
            }),
            isOpen && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "w-full absolute top-full flex flex-col items-center flex-none h-60 border border-gray-500 overflow-y-auto scrollbar-hide bg-gray-950 shadow-[0_35px_60px_15px_rgba(3,7,18,1)] z-20",
                children: childrenWithProps
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Select);


/***/ }),

/***/ 8478:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ List_ItemsListWrap)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./src/app/components/UI/Title/Title.tsx
var Title = __webpack_require__(9457);
// EXTERNAL MODULE: ./src/components/List/EmptyList/index.tsx
var EmptyList = __webpack_require__(5513);
// EXTERNAL MODULE: ./src/constants/enum.ts
var constants_enum = __webpack_require__(4259);
// EXTERNAL MODULE: ./src/app/components/UI/Input/Select/SelectOption/index.tsx
var SelectOption = __webpack_require__(3803);
// EXTERNAL MODULE: ./src/app/components/UI/Input/Select/index.tsx
var Select = __webpack_require__(84);
;// CONCATENATED MODULE: ./src/components/List/ItemsListWrap/ItemsList/ItemsListSort/index.tsx




const ItemsListSort = ({ onChange, defaultSortValue })=>{
    const defaultValue = Object.keys(constants_enum/* SortByOption */.IE).find((key)=>constants_enum/* SortByOption */.IE[key] === defaultSortValue);
    return /*#__PURE__*/ jsx_runtime.jsx(Select/* default */.Z, {
        label: "Sort by",
        onChange: (value)=>onChange(value),
        defaultValue: defaultValue,
        className: "!w-48 ml-auto",
        children: Object.values(constants_enum/* SortByOption */.IE).map((item, idx)=>/*#__PURE__*/ jsx_runtime.jsx(SelectOption/* default */.Z, {
                value: item,
                className: "text-sm !font-light",
                label: Object.keys(constants_enum/* SortByOption */.IE)[idx]
            }, item))
    });
};
/* harmony default export */ const ItemsList_ItemsListSort = (ItemsListSort);

// EXTERNAL MODULE: ./src/components/List/ItemsListWrap/ItemsList/ItemCard/index.tsx + 1 modules
var ItemCard = __webpack_require__(5311);
// EXTERNAL MODULE: ./src/app/components/UI/Button/index.tsx
var Button = __webpack_require__(7458);
// EXTERNAL MODULE: ./src/components/Loader/index.tsx
var Loader = __webpack_require__(3616);
// EXTERNAL MODULE: ./src/context/ModalProvider.tsx
var ModalProvider = __webpack_require__(4858);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/handlers/getResultsByPage.tsx
var getResultsByPage = __webpack_require__(8750);
// EXTERNAL MODULE: ./src/handlers/handleModals.tsx
var handleModals = __webpack_require__(1168);
;// CONCATENATED MODULE: ./src/components/List/hooks/useItemsList.tsx




const useItemsList = (itemsList, itemsListConfig)=>{
    const { onEmptyList, urlToFetchItems, isMoreDataAvailable, isFilterable } = itemsListConfig;
    const { showModal } = (0,ModalProvider/* useModal */.d)();
    const [isLoading, setIsLoading] = (0,external_react_.useState)(false);
    const [currentPage, setCurrentPage] = (0,external_react_.useState)(1);
    const [itemsToShow, setItemsToShow] = (0,external_react_.useState)([]);
    const [isShowMoreButton, setIsShowMoreButton] = (0,external_react_.useState)(isMoreDataAvailable);
    const showMore = ()=>{
        setCurrentPage((prevState)=>prevState + 1);
    };
    const getMoreItems = (page)=>{
        setIsLoading(true);
        (0,getResultsByPage/* getResultsByPage */.Z)(urlToFetchItems, page).then((data)=>{
            let newItems = [];
            if (!data.items.length) onEmptyList(true);
            data.items.map((item)=>{
                const isItemExistsInList = itemsToShow.find((existingItem)=>existingItem.id === item.id);
                if (!isItemExistsInList) {
                    newItems.push(item);
                }
            });
            if (newItems.length !== 0) {
                setItemsToShow((prevState)=>[
                        ...prevState,
                        ...newItems
                    ]);
            } else {
                setItemsToShow((prevState)=>[
                        ...prevState,
                        ...itemsToShow
                    ]);
            }
            setIsShowMoreButton(data.isMoreDataAvailable);
        }).catch(()=>{
            (0,handleModals/* showErrorNotification */.s9)(showModal, "An error has occurred");
            onEmptyList(true);
        }).finally(()=>{
            setIsLoading(false);
        });
    };
    const resetItems = ()=>{
        setItemsToShow([]);
        setCurrentPage(1);
        setIsShowMoreButton(isFilterable ? false : isMoreDataAvailable);
        getMoreItems(1);
    };
    (0,external_react_.useEffect)(()=>{
        if (currentPage > 1) getMoreItems(currentPage);
    }, [
        currentPage
    ]);
    (0,external_react_.useEffect)(()=>{
        resetItems();
    }, [
        itemsList,
        urlToFetchItems
    ]);
    return {
        itemsToShow,
        isLoading,
        isShowMoreButton,
        showMore
    };
};
/* harmony default export */ const hooks_useItemsList = (useItemsList);

;// CONCATENATED MODULE: ./src/components/List/ItemsListWrap/ItemsList/index.tsx





const ItemsList = ({ itemsList, collectionType, isMoreDataAvailable, urlToFetchItems, onEmptyList, isFilterable = false })=>{
    const itemsListConfig = {
        onEmptyList,
        urlToFetchItems,
        isMoreDataAvailable,
        isFilterable
    };
    const { itemsToShow, isLoading, isShowMoreButton, showMore } = hooks_useItemsList(itemsList, itemsListConfig);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: "grid grid-cols-[repeat(auto-fill,232px)] gap-x-5 justify-center",
                children: itemsToShow.map((item)=>{
                    return /*#__PURE__*/ jsx_runtime.jsx(ItemCard/* default */.Z, {
                        item: item,
                        collectionType: collectionType
                    }, item.id);
                })
            }),
            isLoading && /*#__PURE__*/ jsx_runtime.jsx(Loader/* default */.Z, {
                type: "static",
                className: "mb-4"
            }),
            isShowMoreButton && /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                className: "mx-auto",
                context: "empty",
                onClick: showMore,
                children: "Show more"
            })
        ]
    });
};
/* harmony default export */ const ItemsListWrap_ItemsList = (ItemsList);

;// CONCATENATED MODULE: ./src/components/List/hooks/useItemsListWrap.tsx

const useItemsListWrap = (itemsList, itemsListConfig)=>{
    const { urlToFetchItems, isSortable } = itemsListConfig;
    const [isFirstRender, setIsFirstRender] = (0,external_react_.useState)(true);
    const [urlToFetch, setUrlToFetch] = (0,external_react_.useState)(urlToFetchItems);
    const [isShowEmptyList, setIsShowEmptyList] = (0,external_react_.useState)(!itemsList.length);
    const defaultSortValue = isSortable ? new URLSearchParams(urlToFetchItems).get("sort_by") : undefined;
    const handleSortChange = (value)=>{
        const updatedLinkToFetch = urlToFetch.replace(/(sort_by=)[^&]*/, `$1${value}`);
        setUrlToFetch(updatedLinkToFetch);
    };
    (0,external_react_.useEffect)(()=>{
        setUrlToFetch(urlToFetchItems);
        if (!isFirstRender) {
            setIsShowEmptyList(false);
        } else {
            setIsFirstRender(false);
        }
    }, [
        urlToFetchItems
    ]);
    return {
        defaultSortValue,
        urlToFetch,
        isShowEmptyList,
        handleSortChange,
        setIsShowEmptyList
    };
};
/* harmony default export */ const hooks_useItemsListWrap = (useItemsListWrap);

;// CONCATENATED MODULE: ./src/components/List/ItemsListWrap/index.tsx






const ItemsListWrap = ({ itemsList, collectionType, isMoreDataAvailable, urlToFetchItems, title, isFilterable = false, isSortable = false })=>{
    const itemsListConfig = {
        urlToFetchItems,
        isSortable
    };
    const { defaultSortValue, urlToFetch, isShowEmptyList, handleSortChange, setIsShowEmptyList } = hooks_useItemsListWrap(itemsList, itemsListConfig);
    if (isShowEmptyList) {
        return /*#__PURE__*/ jsx_runtime.jsx(EmptyList/* default */.Z, {
            title: title
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "mb-16",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "flex justify-between items-start mb-4",
                children: [
                    title && /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                        className: "!mb-0",
                        children: title
                    }),
                    isSortable && /*#__PURE__*/ jsx_runtime.jsx(ItemsList_ItemsListSort, {
                        onChange: handleSortChange,
                        defaultSortValue: defaultSortValue
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx(ItemsListWrap_ItemsList, {
                itemsList: itemsList,
                collectionType: collectionType,
                isMoreDataAvailable: isMoreDataAvailable,
                urlToFetchItems: urlToFetch,
                isFilterable: isFilterable,
                onEmptyList: setIsShowEmptyList
            })
        ]
    });
};
/* harmony default export */ const List_ItemsListWrap = (ItemsListWrap);


/***/ }),

/***/ 8750:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ getResultsByPage)
/* harmony export */ });
/* harmony import */ var _handlers_createItemCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8694);

const getResultsByPage = async (url, page, signal = undefined)=>{
    const options = signal ? {
        signal
    } : {};
    try {
        const basicResponse = await fetch(url.replace("{currentPage}", page.toString()), options);
        const nextResponse = await fetch(url.replace("{currentPage}", (page + 1).toString()));
        if (!basicResponse.ok) {
            throw `Failed to fetch`;
        }
        const basicResult = await basicResponse.json();
        const nextResult = await nextResponse.json();
        try {
            const resultCards = await (0,_handlers_createItemCard__WEBPACK_IMPORTED_MODULE_0__/* .createItemCard */ .v)(basicResult.results);
            return {
                items: resultCards,
                isMoreDataAvailable: !!nextResult.results.length
            };
        } catch (error) {
            throw error;
        }
    } catch (error) {
        throw error;
    }
};


/***/ }),

/***/ 6682:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ useClickOutsideContainer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const useClickOutsideContainer = (ref, isContainerOpen = false)=>{
    const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(isContainerOpen);
    const onToggleContainer = ()=>{
        setIsOpen(!isOpen);
    };
    const onOpenContainer = ()=>{
        setIsOpen(true);
    };
    const onCloseContainer = ()=>{
        setIsOpen(false);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const handleClickOutside = (event)=>{
            if (ref.current && !ref.current.contains(event.target)) {
                onCloseContainer();
            }
        };
        document.addEventListener("click", handleClickOutside);
        return ()=>{
            document.removeEventListener("click", handleClickOutside);
        };
    }, [
        ref
    ]);
    return {
        isOpen,
        onToggleContainer,
        onOpenContainer,
        onCloseContainer
    };
};


/***/ })

};
;