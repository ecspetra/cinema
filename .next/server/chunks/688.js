"use strict";
exports.id = 688;
exports.ids = [688];
exports.modules = {

/***/ 4688:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ UI_Search)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "@fortawesome/free-solid-svg-icons"
var free_solid_svg_icons_ = __webpack_require__(6466);
// EXTERNAL MODULE: ./src/app/components/UI/Input/InputField/index.tsx
var InputField = __webpack_require__(6492);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/hooks/useInfiniteScroll.tsx
var useInfiniteScroll = __webpack_require__(4668);
// EXTERNAL MODULE: ./src/components/Loader/index.tsx
var Loader = __webpack_require__(3616);
// EXTERNAL MODULE: ./src/app/components/UI/Button/index.tsx
var Button = __webpack_require__(7458);
;// CONCATENATED MODULE: ./src/app/components/UI/Search/SearchList/SearchItemBasic/index.tsx


const SearchItemBasic = ({ item, fieldName, onSelect })=>{
    return /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
        onClick: ()=>onSelect(fieldName, {
                id: item.id,
                name: item.name
            }),
        context: "listItem",
        className: "w-full z-10",
        children: item.name
    }, item.id);
};
/* harmony default export */ const SearchList_SearchItemBasic = (SearchItemBasic);

// EXTERNAL MODULE: external "moment/moment"
var moment_ = __webpack_require__(3332);
var moment_default = /*#__PURE__*/__webpack_require__.n(moment_);
// EXTERNAL MODULE: ./src/components/List/ItemsListWrap/ItemsList/ItemCard/ItemCardSmall/index.tsx + 1 modules
var ItemCardSmall = __webpack_require__(5620);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./src/app/components/UI/Search/SearchList/SearchItemLink/index.tsx




const SearchItemLink = ({ item, collectionType })=>{
    const { id, title, name, release_date, first_air_date, media_type } = item;
    const itemType = media_type || collectionType;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)((link_default()), {
        href: `/${itemType}/[id]`,
        as: `/${itemType}/${id}`,
        className: "flex justify-start items-center gap-4 w-full hover:bg-rose-600 duration-300 p-2",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(ItemCardSmall/* default */.Z, {
                itemId: id,
                className: "!w-16 !h-24",
                collectionType: itemType
            }),
            /*#__PURE__*/ jsx_runtime.jsx("span", {
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                    className: "flex flex-col justify-start items-start",
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                            className: "font-semibold",
                            children: title ?? name
                        }),
                        (release_date || first_air_date) && /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                            className: "text-xs font-light",
                            children: [
                                "(",
                                moment_default()(release_date ?? first_air_date).format("YYYY"),
                                ")"
                            ]
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const SearchList_SearchItemLink = (SearchItemLink);

// EXTERNAL MODULE: ./src/constants/enum.ts
var constants_enum = __webpack_require__(4259);
;// CONCATENATED MODULE: ./src/app/components/UI/Search/SearchList/index.tsx







const SearchList = ({ itemsList, isMoreDataAvailable, isSearchQueryUpdate, urlToFetch, onSelectItem, onClose, name, collectionType = constants_enum/* UserCollections */.zS.basic })=>{
    const containerRef = (0,external_react_.useRef)(null);
    const { isLoading, items } = (0,useInfiniteScroll/* useInfiniteScroll */.M)(containerRef, itemsList, isMoreDataAvailable, urlToFetch);
    const handleSelectBasicListItem = (fieldName, { id, name })=>{
        onSelectItem(fieldName, {
            id,
            name
        });
        onClose();
    };
    return /*#__PURE__*/ jsx_runtime.jsx("div", {
        ref: containerRef,
        className: "w-full absolute top-full flex flex-col items-start flex-none h-60 box-content border border-gray-500 overflow-y-auto scrollbar-hide bg-gray-950 shadow-[0_35px_60px_15px_rgba(3,7,18,1)] z-20",
        children: isSearchQueryUpdate ? /*#__PURE__*/ jsx_runtime.jsx(Loader/* default */.Z, {
            type: "static",
            className: "mb-4"
        }) : /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
                !items.length && /*#__PURE__*/ jsx_runtime.jsx("span", {
                    className: "mt-4 mx-auto",
                    children: "No results found"
                }),
                items.map((item)=>{
                    switch(collectionType){
                        case "basic":
                            return /*#__PURE__*/ jsx_runtime.jsx(SearchList_SearchItemBasic, {
                                item: item,
                                fieldName: name,
                                onSelect: handleSelectBasicListItem
                            }, item.id);
                        case "movie":
                        case "tv":
                        case "person":
                            return /*#__PURE__*/ jsx_runtime.jsx(SearchList_SearchItemLink, {
                                item: item,
                                collectionType: collectionType
                            }, item.id);
                    }
                }),
                isLoading && /*#__PURE__*/ jsx_runtime.jsx(Loader/* default */.Z, {
                    type: "static",
                    className: "mb-4"
                })
            ]
        })
    });
};
/* harmony default export */ const Search_SearchList = (SearchList);

// EXTERNAL MODULE: ./src/app/components/UI/Error/index.tsx
var Error = __webpack_require__(3554);
// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__(7197);
// EXTERNAL MODULE: ./src/handlers/getResultsByPage.tsx
var getResultsByPage = __webpack_require__(8750);
// EXTERNAL MODULE: ./src/hooks/useClickOutsideContainer.tsx
var useClickOutsideContainer = __webpack_require__(6682);
// EXTERNAL MODULE: ./src/constants/errorMessages.ts
var errorMessages = __webpack_require__(3514);
;// CONCATENATED MODULE: ./src/handlers/useSearchLogic.tsx




const useSearchLogic = ({ onSearch, urlToFetch, defaultUrlToFetch, isSearchApplied })=>{
    const containerRef = (0,external_react_.useRef)(null);
    const [isLoading, setIsLoading] = (0,external_react_.useState)(false);
    const [isTouched, setIsTouched] = (0,external_react_.useState)(false);
    const [isSearchQueryUpdate, setIsSearchQueryUpdate] = (0,external_react_.useState)(false);
    const [searchQuery, setSearchQuery] = (0,external_react_.useState)("");
    const [results, setResults] = (0,external_react_.useState)([]);
    const [error, setError] = (0,external_react_.useState)("");
    const [isMoreDataAvailable, setIsMoreDataAvailable] = (0,external_react_.useState)(false);
    const { isOpen, onOpenContainer, onCloseContainer } = (0,useClickOutsideContainer/* useClickOutsideContainer */.m)(containerRef, searchQuery.length > 0);
    const urlToFetchWithSearchQuery = urlToFetch.replace("{searchQuery}", searchQuery);
    const isShowClearButton = searchQuery.length > 0 || isSearchApplied;
    const handleInputChange = (event)=>{
        setSearchQuery(event.target.value);
        if (!isTouched) setIsTouched(true);
    };
    const cancelSearch = ()=>{
        resetSearch();
        onSearch(defaultUrlToFetch);
    };
    const resetSearch = ()=>{
        onCloseContainer();
        setResults([]);
        setSearchQuery("");
    };
    const handleSearch = async (event)=>{
        event.preventDefault();
        const isFormValid = searchQuery.length > 0;
        if (isFormValid && isTouched) {
            onSearch(urlToFetchWithSearchQuery);
            resetSearch();
        } else {
            setError(errorMessages/* ERROR_MESSAGES */.R.REQUIRED_FIELD);
            setIsLoading(false);
        }
    };
    (0,external_react_.useEffect)(()=>{
        const fetchData = async ()=>{
            const abortController = new AbortController();
            const signal = abortController.signal;
            setResults([]);
            setError("");
            setIsSearchQueryUpdate(true);
            try {
                if (signal) {
                    const data = await (0,getResultsByPage/* getResultsByPage */.Z)(urlToFetchWithSearchQuery, 1, signal);
                    setResults(data.items);
                    setIsMoreDataAvailable(data.isMoreDataAvailable);
                    setIsSearchQueryUpdate(false);
                }
            } catch (error) {
                setError("Error fetching data");
            } finally{
                abortController.abort();
            }
        };
        if (searchQuery.length > 0) {
            if (!isOpen) onOpenContainer();
            const timeoutId = setTimeout(fetchData, 500);
            return ()=>{
                clearTimeout(timeoutId);
            };
        }
    }, [
        searchQuery,
        urlToFetchWithSearchQuery
    ]);
    return {
        containerRef,
        isLoading,
        urlToFetchWithSearchQuery,
        isShowClearButton,
        isSearchQueryUpdate,
        searchQuery,
        results,
        error,
        isMoreDataAvailable,
        isOpen,
        handleInputChange,
        cancelSearch,
        resetSearch,
        handleSearch
    };
};
/* harmony default export */ const handlers_useSearchLogic = (useSearchLogic);

;// CONCATENATED MODULE: ./src/app/components/UI/Search/index.tsx









const Search = ({ name, label, urlToFetch, onSearch, collectionType, defaultUrlToFetch, isSearchApplied = false, isSearchFieldWrapped = false })=>{
    const { containerRef, isLoading, urlToFetchWithSearchQuery, isShowClearButton, isSearchQueryUpdate, searchQuery, results, error, isMoreDataAvailable, isOpen, handleInputChange, cancelSearch, resetSearch, handleSearch } = handlers_useSearchLogic({
        onSearch,
        urlToFetch,
        defaultUrlToFetch,
        isSearchApplied
    });
    const search = /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        ref: containerRef,
        className: "relative h-16",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "relative h-full",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(InputField/* default */.Z, {
                        id: name,
                        label: label,
                        value: searchQuery,
                        onChange: handleInputChange,
                        icon: free_solid_svg_icons_.faMagnifyingGlass,
                        placeholder: "Search",
                        additionalInputClassName: "max-w-[calc(100%-128px)]"
                    }),
                    isSearchFieldWrapped && /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "absolute inset-y-1/2 -translate-y-1/2 right-4 flex justify-end items-center gap-4",
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                                type: "submit",
                                context: "text",
                                children: isLoading ? /*#__PURE__*/ jsx_runtime.jsx(Loader/* default */.Z, {
                                    type: "static"
                                }) : "Submit"
                            }),
                            isShowClearButton && /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                                context: "icon",
                                onClick: cancelSearch,
                                children: /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                                    icon: free_solid_svg_icons_.faXmark,
                                    className: "w-6 h-6"
                                })
                            })
                        ]
                    })
                ]
            }),
            isOpen && /*#__PURE__*/ jsx_runtime.jsx(Search_SearchList, {
                collectionType: collectionType,
                itemsList: results,
                isMoreDataAvailable: isMoreDataAvailable,
                urlToFetch: urlToFetchWithSearchQuery,
                onSelectItem: onSearch,
                name: name,
                onClose: resetSearch,
                isSearchQueryUpdate: isSearchQueryUpdate
            })
        ]
    });
    return /*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
        children: isSearchFieldWrapped ? /*#__PURE__*/ (0,jsx_runtime.jsxs)("form", {
            className: "mb-4 bg-gray-950",
            onSubmit: handleSearch,
            children: [
                search,
                error && /*#__PURE__*/ jsx_runtime.jsx(Error/* default */.Z, {
                    className: "px-4 py-2 bg-rose-600/20 w-full rounded-md",
                    error: error
                })
            ]
        }) : search
    });
};
/* harmony default export */ const UI_Search = (Search);


/***/ }),

/***/ 4668:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ useInfiniteScroll)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _handlers_getResultsByPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8750);


const useInfiniteScroll = (containerRef, itemsList, isMoreDataAvailable, urlToFetch)=>{
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [isMoreItemsAvailable, setIsMoreItemsAvailable] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(isMoreDataAvailable);
    const [currentPage, setCurrentPage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const getMoreItems = async ()=>{
        if (currentPage === 1) setItems([]);
        (0,_handlers_getResultsByPage__WEBPACK_IMPORTED_MODULE_1__/* .getResultsByPage */ .Z)(urlToFetch, currentPage).then((data)=>{
            setItems((prevState)=>[
                    ...prevState,
                    ...data.items
                ]);
            setIsMoreItemsAvailable(data.isMoreDataAvailable);
        }).finally(()=>{
            setIsLoading(false);
        });
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (currentPage > 1) getMoreItems();
    }, [
        currentPage
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        setItems([
            ...itemsList
        ]);
    }, [
        itemsList
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        setIsMoreItemsAvailable(isMoreDataAvailable);
    }, [
        isMoreDataAvailable
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        setCurrentPage(1);
        setIsMoreItemsAvailable(true);
    }, [
        urlToFetch
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const itemsContainer = containerRef.current;
        const handleScroll = ()=>{
            if (itemsContainer && itemsContainer.scrollHeight - itemsContainer.scrollTop === itemsContainer.clientHeight && !isLoading && isMoreItemsAvailable) {
                setIsLoading(true);
                setCurrentPage((prevPage)=>prevPage + 1);
            }
        };
        if (itemsContainer) {
            itemsContainer.addEventListener("scroll", handleScroll);
        }
        return ()=>{
            if (itemsContainer) {
                itemsContainer.removeEventListener("scroll", handleScroll);
            }
        };
    }, [
        containerRef,
        isMoreItemsAvailable,
        isLoading
    ]);
    return {
        isLoading,
        items
    };
};


/***/ })

};
;