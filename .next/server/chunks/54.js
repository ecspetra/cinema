"use strict";
exports.id = 54;
exports.ids = [54];
exports.modules = {

/***/ 3463:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/default-movie-image.34e2a289.svg","height":318,"width":212,"blurWidth":0,"blurHeight":0});

/***/ }),

/***/ 7390:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _app_components_UI_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7458);
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3616);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6466);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7197);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__);





const CollectionButton = ({ isLoadingCollection, isCollectionItem, onClick, className, collectionType = "collection" })=>{
    const collectionButtonContext = isCollectionItem ? "collection" : "filled";
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_UI_Button__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
        context: collectionButtonContext,
        className: className,
        onClick: onClick,
        children: isLoadingCollection ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Loader__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
            type: "static"
        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__.FontAwesomeIcon, {
                    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faHeart,
                    className: "mr-2"
                }),
                isCollectionItem ? `Remove from ${collectionType}` : `Add to ${collectionType}`
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CollectionButton);


/***/ }),

/***/ 5513:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _app_components_UI_Title_Title__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9457);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9003);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);



const EmptyList = ({ title, text = "No items yet", variant = "h1", className })=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()("mb-16", className),
        children: [
            title && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_UI_Title_Title__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                variant: variant,
                children: title
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                children: text
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmptyList);


/***/ }),

/***/ 5311:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ ItemsList_ItemCard)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./src/app/assets/images/default-movie-image.svg
var default_movie_image = __webpack_require__(3463);
// EXTERNAL MODULE: ./src/app/assets/images/default-user-image.svg
var default_user_image = __webpack_require__(3679);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./src/components/Images/Image/index.tsx + 1 modules
var Image = __webpack_require__(1686);
// EXTERNAL MODULE: ./src/app/components/UI/Title/Title.tsx
var Title = __webpack_require__(9457);
// EXTERNAL MODULE: ./src/components/Tag/index.tsx
var Tag = __webpack_require__(6778);
// EXTERNAL MODULE: ./src/app/components/UI/Button/CollectionButton/index.tsx
var CollectionButton = __webpack_require__(7390);
// EXTERNAL MODULE: ./src/hooks/useCollectionButton.tsx + 3 modules
var useCollectionButton = __webpack_require__(7310);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@fortawesome/free-solid-svg-icons"
var free_solid_svg_icons_ = __webpack_require__(6466);
// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__(7197);
// EXTERNAL MODULE: ./src/context/AuthProvider.tsx + 1 modules
var AuthProvider = __webpack_require__(7459);
// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(9003);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);
// EXTERNAL MODULE: ./src/firebase/handlers/markHandlers/getMarkForMovieOrTVShow.tsx
var getMarkForMovieOrTVShow = __webpack_require__(9087);
;// CONCATENATED MODULE: ./src/components/Mark/MarkSmall/index.tsx







const MarkSmall = ({ markedItemId, collectionType, className })=>{
    const [markData, setMarkData] = (0,external_react_.useState)(null);
    const { isLoggedIn, userId } = (0,AuthProvider/* useAuth */.a)();
    (0,external_react_.useEffect)(()=>{
        if (isLoggedIn) {
            const markConfig = {
                markedItemId,
                collectionType
            };
            (0,getMarkForMovieOrTVShow/* getMarkForMovieOrTVShow */.M)(userId, markConfig).then((data)=>{
                if (data) setMarkData(data);
            });
        }
    }, []);
    if (!markData) return null;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: external_classnames_default()("flex justify-center items-center bg-white rounded-full w-14 h-14 z-10 text-rose-500", className),
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                icon: free_solid_svg_icons_.faStar
            }),
            /*#__PURE__*/ jsx_runtime.jsx("span", {
                className: "ml-1 font-semibold",
                children: markData?.data.markValue
            })
        ]
    });
};
/* harmony default export */ const Mark_MarkSmall = (MarkSmall);

// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__(2245);
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);
// EXTERNAL MODULE: external "react-transition-group"
var external_react_transition_group_ = __webpack_require__(4466);
// EXTERNAL MODULE: ./src/constants/images.ts
var constants_images = __webpack_require__(8989);
// EXTERNAL MODULE: ./src/constants/enum.ts
var constants_enum = __webpack_require__(4259);
;// CONCATENATED MODULE: ./src/components/List/ItemsListWrap/ItemsList/ItemCard/index.tsx














const ItemCard = ({ item, collectionType, isShowButton = true, isCollectionListItem = false, isShowRole = false })=>{
    const { id, media_type, genres, poster_path, profile_path, first_air_date, release_date, title, name, job, character } = item;
    const { isMounted, isLoadingCollection, isCollectionItem, handleSetCollectionItem, openConfirmationPopup } = (0,useCollectionButton/* useCollectionButton */.b)(item, (media_type || collectionType) ?? collectionType);
    const isShowTags = genres && genres.length > 0;
    const cardType = media_type ?? collectionType;
    const isShowMark = cardType === constants_enum/* UserCollections */.zS.movie || cardType === constants_enum/* UserCollections */.zS.tv;
    const cardCoverSrc = poster_path ?? profile_path;
    const cardCoverFullSrc = cardCoverSrc ? constants_images/* CARD_IMAGE_SRC */.hm.replace("{imageSrc}", cardCoverSrc) : "";
    const cardTitle = title ?? name;
    const itemCard = /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "flex flex-col w-full max-w-[232px] mb-8 mr-auto",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)((link_default()), {
                href: `/${cardType}/${id}`,
                as: `/${cardType}/${id}`,
                className: "group relative",
                children: [
                    isShowMark && /*#__PURE__*/ jsx_runtime.jsx(Mark_MarkSmall, {
                        markedItemId: id,
                        collectionType: collectionType,
                        className: "absolute -right-3 -top-3"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(Image/* default */.Z, {
                        className: "duration-300 mb-4 group-hover:border-rose-600 border-4",
                        src: cardCoverFullSrc,
                        defaultImage: cardType !== constants_enum/* UserCollections */.zS.person ? default_movie_image/* default */.Z : default_user_image/* default */.Z
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(Title/* default */.Z, {
                        variant: "h3",
                        children: [
                            cardTitle,
                            (release_date || first_air_date) && /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                className: "ml-1",
                                children: [
                                    "(",
                                    external_moment_default()(release_date ? release_date : first_air_date).format("YYYY"),
                                    ")"
                                ]
                            })
                        ]
                    }),
                    isShowRole && /*#__PURE__*/ jsx_runtime.jsx("p", {
                        className: "text-xs",
                        children: character ?? job
                    })
                ]
            }),
            isShowTags && /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: "flex flex-wrap mb-2 relative",
                children: genres.map((item, idx)=>{
                    return /*#__PURE__*/ jsx_runtime.jsx(Tag/* default */.Z, {
                        tag: item
                    }, idx);
                })
            }),
            isShowButton && /*#__PURE__*/ jsx_runtime.jsx(CollectionButton/* default */.Z, {
                className: "mt-auto w-full md:w-full",
                isLoadingCollection: isLoadingCollection,
                isCollectionItem: isCollectionItem,
                onClick: isCollectionItem ? openConfirmationPopup : handleSetCollectionItem
            })
        ]
    });
    return /*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
        children: isCollectionListItem ? /*#__PURE__*/ jsx_runtime.jsx(external_react_transition_group_.CSSTransition, {
            in: isMounted,
            timeout: 500,
            classNames: "collection-card",
            unmountOnExit: true,
            children: itemCard
        }) : itemCard
    });
};
/* harmony default export */ const ItemsList_ItemCard = (ItemCard);


/***/ }),

/***/ 6778:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6466);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7197);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9003);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _app_components_UI_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7458);






const Tag = ({ tag, isEdit = false, isSelected = false, onToggle, onRemove })=>{
    const [isChecked, setIsChecked] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(isSelected);
    const handleToggleIsChecked = ()=>{
        if (onToggle) {
            onToggle(tag, isChecked);
            setIsChecked(!isChecked);
        } else {
            onRemove && onRemove(tag);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setIsChecked(isSelected);
    }, [
        isSelected
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: isEdit ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_app_components_UI_Button__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
            context: "tag",
            onClick: handleToggleIsChecked,
            className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(isChecked && "!bg-rose-900/30 text-rose-500", isEdit && "hover:bg-rose-900/30"),
            children: [
                isChecked && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__.FontAwesomeIcon, {
                    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faCheck,
                    className: "w-3 h-3 mr-1"
                }),
                tag.name,
                onRemove && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__.FontAwesomeIcon, {
                    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faXmark,
                    className: "w-3 h-3 ml-2"
                })
            ]
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
            className: "bg-gray-800 rounded flex text-xs leading-none px-2 py-1 my-0 mr-1 mb-1 last:mr-0",
            children: tag.name
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tag);


/***/ }),

/***/ 9019:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ components_TopBanner)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
;// CONCATENATED MODULE: ./src/app/assets/images/default-movie-bg.jpg
/* harmony default export */ const default_movie_bg = ({"src":"/_next/static/media/default-movie-bg.7bc16b89.jpg","height":1600,"width":2400,"blurDataURL":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIAAUACAMBIgACEQEDEQH/xAAnAAEBAAAAAAAAAAAAAAAAAAAABwEBAAAAAAAAAAAAAAAAAAAAAv/aAAwDAQACEAMQAAAAnoD/AP/EAB4QAAIBAwUAAAAAAAAAAAAAAAERAwACBBITISIx/9oACAEBAAE/AI8q8QmJdde4jyGl5X//xAAYEQACAwAAAAAAAAAAAAAAAAABAgADMf/aAAgBAgEBPwA1o2qDP//EABgRAAIDAAAAAAAAAAAAAAAAAAECAAMx/9oACAEDAQE/ABY4xp//2Q==","blurWidth":8,"blurHeight":5});
// EXTERNAL MODULE: ./src/components/Images/Image/index.tsx + 1 modules
var Image = __webpack_require__(1686);
// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(9003);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);
// EXTERNAL MODULE: ./src/constants/images.ts
var constants_images = __webpack_require__(8989);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./src/components/TopBanner/hooks/useTopBannerParallax.tsx

const useTopBannerParallax = (imageSrc)=>{
    const [scrollY, setScrollY] = (0,external_react_.useState)(0);
    const parallaxFactor = 0.5;
    const translateY = scrollY * parallaxFactor;
    (0,external_react_.useEffect)(()=>{
        const handleScroll = ()=>{
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return ()=>{
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return {
        translateY
    };
};
/* harmony default export */ const hooks_useTopBannerParallax = (useTopBannerParallax);

;// CONCATENATED MODULE: ./src/components/TopBanner/index.tsx






const TopBanner = ({ imageSrc, className })=>{
    const { translateY } = hooks_useTopBannerParallax(imageSrc);
    const imageFullSrc = imageSrc ? constants_images/* ORIGINAL_IMAGE_SRC */.qX.replace("{imageSrc}", imageSrc) : "";
    const imageKey = imageSrc || "default";
    const imageComponent = /*#__PURE__*/ jsx_runtime.jsx(Image/* default */.Z, {
        className: "aspect-[215/121] inset-x-1/2 top-1/4 -translate-x-1/2 -translate-y-1/4",
        src: imageFullSrc,
        defaultImage: default_movie_bg,
        loaderClassName: "bg-transparent"
    }, imageKey);
    return /*#__PURE__*/ jsx_runtime.jsx("div", {
        className: external_classnames_default()("w-screen h-[40vw] md:h-[25vw] -z-10 -mb-40 relative inset-x-1/2 -translate-x-1/2 after:w-full after:absolute after:bottom-0 after:h-4/5 after:bg-gradient-to-t from-gray-950 overflow-hidden", className),
        children: /*#__PURE__*/ jsx_runtime.jsx("div", {
            style: {
                transform: `translateY(${translateY}px)`
            },
            children: imageComponent
        })
    });
};
/* harmony default export */ const components_TopBanner = (TopBanner);


/***/ }),

/***/ 8989:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ie: () => (/* binding */ PROFILE_PAGE_TOP_BANNER_IMAGE),
/* harmony export */   OP: () => (/* binding */ MOVIE_LIST_TOP_BANNER_IMAGE),
/* harmony export */   TX: () => (/* binding */ TV_LIST_TOP_BANNER_IMAGE),
/* harmony export */   dK: () => (/* binding */ COLLECTION_PAGE_TOP_BANNER_IMAGE),
/* harmony export */   hm: () => (/* binding */ CARD_IMAGE_SRC),
/* harmony export */   mM: () => (/* binding */ PERSON_LIST_TOP_BANNER_IMAGE),
/* harmony export */   qX: () => (/* binding */ ORIGINAL_IMAGE_SRC),
/* harmony export */   yI: () => (/* binding */ SLIDER_IMAGE_SRC)
/* harmony export */ });
const COLLECTION_PAGE_TOP_BANNER_IMAGE = `/b1Y8SUb12gPHCSSSNlbX4nB3IKy.jpg`;
const PROFILE_PAGE_TOP_BANNER_IMAGE = `/vXpeJJs1z8OKC88CNJX9O9QOhtr.jpg`;
const MOVIE_LIST_TOP_BANNER_IMAGE = `/8GnWDLn2AhnmkQ7hlQ9NJUYobSS.jpg`;
const TV_LIST_TOP_BANNER_IMAGE = `/SqAZjEqqBAYvyu3KSrWq1d0QLB.jpg`;
const PERSON_LIST_TOP_BANNER_IMAGE = `/l8v3gJDlASN0lNn51gR8zQJsu5O.jpg`;
const ORIGINAL_IMAGE_SRC = `https://image.tmdb.org/t/p/original{imageSrc}`;
const CARD_IMAGE_SRC = `https://image.tmdb.org/t/p/w440_and_h660_face{imageSrc}`;
const SLIDER_IMAGE_SRC = `https://image.tmdb.org/t/p/w500{imageSrc}`;


/***/ }),

/***/ 9087:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ getMarkForMovieOrTVShow)
/* harmony export */ });
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6666);
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_database__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _firebase_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6855);


const getMarkForMovieOrTVShow = (userId, markConfig)=>{
    const { markedItemId, collectionType } = markConfig;
    const marksCollectionPath = `users/${userId}/collection/marks/${collectionType}`;
    const marksCollectionRef = (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(_firebase_config__WEBPACK_IMPORTED_MODULE_1__/* .database */ .F, marksCollectionPath);
    return new Promise(async (resolve)=>{
        (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.get)(marksCollectionRef).then((snapshot)=>{
            let mark;
            snapshot.forEach((childSnapshot)=>{
                const markFromStorage = {
                    key: childSnapshot.key,
                    data: childSnapshot.val()
                };
                if (markFromStorage.data.markedItemId === markedItemId) mark = markFromStorage;
            });
            resolve(mark);
        });
    });
};


/***/ }),

/***/ 8694:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* binding */ createItemCard)
/* harmony export */ });
/* harmony import */ var _handlers_getAllGenres__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3663);

const createItemCard = (items)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            const allGenres = await (0,_handlers_getAllGenres__WEBPACK_IMPORTED_MODULE_0__/* .getAllGenres */ .K)("all");
            let cards = [];
            items.map((item)=>{
                const itemGenres = item.genre_ids ?? item.genres;
                let genresNames = [];
                let card;
                if (itemGenres) {
                    itemGenres.map((genre)=>{
                        let equalGenre;
                        if (typeof genre === "number") {
                            equalGenre = allGenres.find((genreFromDB)=>genreFromDB.id === genre);
                        } else {
                            equalGenre = allGenres.find((genreFromDB)=>genreFromDB.id === genre.id);
                        }
                        if (equalGenre) genresNames.push(equalGenre);
                    });
                }
                card = {
                    id: item.id,
                    ...item.media_type !== undefined && {
                        media_type: item.media_type
                    },
                    ...item.gender !== undefined && {
                        gender: item.gender
                    },
                    ...item.poster_path !== undefined && {
                        poster_path: item.poster_path
                    },
                    ...item.profile_path !== undefined && {
                        profile_path: item.profile_path
                    },
                    ...item.release_date !== undefined && {
                        release_date: item.release_date
                    },
                    ...item.first_air_date !== undefined && {
                        first_air_date: item.first_air_date
                    },
                    ...item.title !== undefined && {
                        title: item.title
                    },
                    ...item.name !== undefined && {
                        name: item.name
                    },
                    ...itemGenres !== undefined && {
                        genres: genresNames.filter(Boolean)
                    },
                    ...item.known_for_department !== undefined && {
                        known_for_department: item.known_for_department
                    },
                    ...item.character !== undefined && {
                        character: item.character
                    },
                    ...item.job !== undefined && {
                        job: item.job
                    }
                };
                cards.push(card);
            });
            resolve(cards);
        } catch (error) {
            reject(error);
        }
    });
};


/***/ }),

/***/ 3663:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ getAllGenres)
/* harmony export */ });
/* harmony import */ var _constants_linksToFetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6515);
/* harmony import */ var _constants_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4259);


const getAllGenres = async (type)=>{
    let genres;
    const getGenres = async (type)=>{
        const response = await fetch(_constants_linksToFetch__WEBPACK_IMPORTED_MODULE_1__/* .URL_TO_FETCH_ALL_GENRES */ .IS.replace(`{queryParam}`, type));
        const result = await response.json();
        return result.genres;
    };
    switch(type){
        case "movie":
            genres = await getGenres(_constants_enum__WEBPACK_IMPORTED_MODULE_0__/* .UserCollections */ .zS.movie);
            return genres;
        case "tv":
            genres = await getGenres(_constants_enum__WEBPACK_IMPORTED_MODULE_0__/* .UserCollections */ .zS.tv);
            return genres;
        case "all":
            const movieGenres = await getGenres(_constants_enum__WEBPACK_IMPORTED_MODULE_0__/* .UserCollections */ .zS.movie);
            const tvGenres = await getGenres(_constants_enum__WEBPACK_IMPORTED_MODULE_0__/* .UserCollections */ .zS.tv);
            const mergedGenres = [
                ...movieGenres,
                ...tvGenres.filter((tvGenre)=>!movieGenres.some((movieGenre)=>tvGenre.id === movieGenre.id))
            ];
            return mergedGenres.map((genre)=>JSON.parse(JSON.stringify(genre)));
    }
};


/***/ }),

/***/ 1168:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G6: () => (/* binding */ openRemoveModal),
/* harmony export */   LX: () => (/* binding */ showSuccessNotification),
/* harmony export */   MB: () => (/* binding */ openFriendsModal),
/* harmony export */   Mo: () => (/* binding */ openLoginModal),
/* harmony export */   kS: () => (/* binding */ openRemoveFriendModal),
/* harmony export */   s9: () => (/* binding */ showErrorNotification)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _app_components_Auth_AuthForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2858);
/* harmony import */ var _app_components_UI_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7458);
/* harmony import */ var _firebase_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5260);
/* harmony import */ var _firebase_util__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_firebase_util__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_Profile_ProfileInfo_ProfileIcon_ProfileIconSmall__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9390);





const openLoginModal = (showModal)=>{
    const modalId = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_3__.uuidv4)();
    showModal({
        id: modalId,
        modalContent: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_Auth_AuthForm__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {})
    });
};
const openFriendsModal = (showModal, itemsList, onRemove)=>{
    const modalId = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_3__.uuidv4)();
    showModal({
        id: modalId,
        modalTitle: "Friends",
        modalContent: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: itemsList.map((item)=>{
                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex justify-between items-center gap-4 w-full mb-4 last:mb-0",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Profile_ProfileInfo_ProfileIcon_ProfileIconSmall__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                    userId: item.info.id,
                                    photoURL: item.info.photoURL,
                                    isLinkToProfile: true
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: "font-semibold",
                                    children: item.info.displayName
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_UI_Button__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                            context: "icon-text",
                            onClick: ()=>onRemove(item.info, modalId),
                            children: "Remove"
                        })
                    ]
                }, item.info.id);
            })
        })
    });
};
const openRemoveFriendModal = (showModal, onClose, onRemove, itemName, itemId)=>{
    const modalId = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_3__.uuidv4)();
    showModal({
        id: modalId,
        modalTitle: `Are you sure you want to remove ${itemName} from your friends?`,
        modalContent: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex justify-between items-center gap-4",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_UI_Button__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                    onClick: ()=>onRemove(itemId, modalId),
                    children: "Confirm"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_UI_Button__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                    context: "filledDark",
                    onClick: ()=>onClose(modalId),
                    children: "Cancel"
                })
            ]
        })
    });
};
const openRemoveModal = (showModal, onClose, onRemove, itemName)=>{
    const modalId = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_3__.uuidv4)();
    showModal({
        id: modalId,
        modalTitle: `Are you sure you want to remove ${itemName} from your collection?`,
        modalContent: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex justify-between items-center gap-4",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_UI_Button__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                    onClick: ()=>onRemove(modalId),
                    children: "Confirm"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_UI_Button__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                    context: "filledDark",
                    onClick: ()=>onClose(modalId),
                    children: "Cancel"
                })
            ]
        })
    });
};
const showSuccessNotification = (showModal, text)=>{
    const modalId = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_3__.uuidv4)();
    showModal({
        id: modalId,
        modalText: text,
        alertInfo: {
            isAlert: true,
            type: "success"
        }
    });
};
const showErrorNotification = (showModal, text)=>{
    const modalId = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_3__.uuidv4)();
    showModal({
        id: modalId,
        modalText: text,
        alertInfo: {
            isAlert: true,
            type: "error"
        }
    });
};


/***/ }),

/***/ 7310:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  b: () => (/* binding */ useCollectionButton)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/context/AuthProvider.tsx + 1 modules
var AuthProvider = __webpack_require__(7459);
// EXTERNAL MODULE: ./src/context/ModalProvider.tsx
var ModalProvider = __webpack_require__(4858);
// EXTERNAL MODULE: ./src/handlers/handleModals.tsx
var handleModals = __webpack_require__(1168);
// EXTERNAL MODULE: external "firebase/database"
var database_ = __webpack_require__(6666);
// EXTERNAL MODULE: ./src/firebase/config.ts
var config = __webpack_require__(6855);
;// CONCATENATED MODULE: ./src/firebase/handlers/userCollectionHandlers/removeCollectionItem.tsx


const removeCollectionItem = (itemId, collectionType)=>{
    const currentUser = config/* auth */.I.currentUser;
    const currentUserId = currentUser?.uid;
    const collectionPathForRemovedItem = `users/${currentUserId}/collection/${collectionType}/${itemId}`;
    const collectionRefForRemovedItem = (0,database_.ref)(config/* database */.F, collectionPathForRemovedItem);
    return new Promise(async (resolve)=>{
        let isItemRemovedFromCollection = false;
        (0,database_.remove)(collectionRefForRemovedItem).then(()=>{
            isItemRemovedFromCollection = true;
        });
        resolve(isItemRemovedFromCollection);
    });
};

;// CONCATENATED MODULE: ./src/firebase/handlers/userCollectionHandlers/checkIfItemExistsInCollection.tsx


const checkIfItemExistsInCollection = (itemId, collectionType)=>{
    const currentUser = config/* auth */.I.currentUser;
    const currentUserId = currentUser?.uid;
    const collectionPathForItem = `users/${currentUserId}/collection/${collectionType}/${itemId}`;
    const collectionRefForItem = (0,database_.ref)(config/* database */.F, collectionPathForItem);
    return new Promise(async (resolve)=>{
        let isItemExistsInCollection = false;
        (0,database_.get)(collectionRefForItem).then((snapshot)=>{
            if (snapshot.exists()) isItemExistsInCollection = true;
            resolve(isItemExistsInCollection);
        });
    });
};

;// CONCATENATED MODULE: ./src/firebase/handlers/userCollectionHandlers/createNewCollectionItem.tsx


const createNewCollectionItem = async (itemId, collectionType)=>{
    const currentUser = config/* auth */.I.currentUser;
    const currentUserId = currentUser?.uid;
    const newCollectionItemPath = `users/${currentUserId}/collection/${collectionType}/${itemId}`;
    const newCollectionItemRef = (0,database_.ref)(config/* database */.F, newCollectionItemPath);
    const newItem = {
        id: itemId
    };
    await (0,database_.set)(newCollectionItemRef, newItem);
};

;// CONCATENATED MODULE: ./src/hooks/useCollectionButton.tsx







const useCollectionButton = (itemInfo, collectionType)=>{
    const [isMounted, setIsMounted] = (0,external_react_.useState)(false);
    const [isCollectionItem, setIsCollectionItem] = (0,external_react_.useState)(false);
    const [isLoadingCollection, setIsLoadingCollection] = (0,external_react_.useState)(true);
    const { isLoggedIn } = (0,AuthProvider/* useAuth */.a)();
    const { showModal, hideModal } = (0,ModalProvider/* useModal */.d)();
    const handleSetCollectionItem = ()=>{
        if (isLoggedIn) {
            setIsLoadingCollection(true);
            createNewCollectionItem(itemInfo.id, collectionType).then(()=>{
                checkIfItemExistsInCollection(itemInfo.id, collectionType).then((data)=>{
                    setIsCollectionItem(data);
                    (0,handleModals/* showSuccessNotification */.LX)(showModal, "The item was successfully added");
                }).catch(()=>{
                    (0,handleModals/* showErrorNotification */.s9)(showModal, "An error has occurred");
                }).finally(()=>{
                    setIsLoadingCollection(false);
                });
            });
        } else (0,handleModals/* openLoginModal */.Mo)(showModal);
    };
    const handleRemoveCollectionItem = (modalId)=>{
        hideModal(modalId);
        setIsLoadingCollection(true);
        setIsMounted(false);
        setTimeout(()=>{
            removeCollectionItem(itemInfo.id, collectionType).then(()=>{
                setIsCollectionItem(false);
                (0,handleModals/* showSuccessNotification */.LX)(showModal, "The item was successfully removed");
            }).catch(()=>{
                (0,handleModals/* showErrorNotification */.s9)(showModal, "An error has occurred");
            }).finally(()=>{
                setIsLoadingCollection(false);
            });
        }, 500);
    };
    const openConfirmationPopup = ()=>{
        const itemName = itemInfo.title ?? itemInfo.name ?? "this item";
        (0,handleModals/* openRemoveModal */.G6)(showModal, hideModal, handleRemoveCollectionItem, itemName);
    };
    (0,external_react_.useEffect)(()=>{
        if (isLoggedIn) {
            setIsLoadingCollection(true);
            checkIfItemExistsInCollection(itemInfo.id, collectionType).then((data)=>{
                setIsCollectionItem(data);
            }).finally(()=>{
                setIsLoadingCollection(false);
                setIsMounted(true);
            });
        } else setIsLoadingCollection(false);
    }, [
        isLoggedIn,
        itemInfo
    ]);
    return {
        isMounted,
        isLoadingCollection,
        isCollectionItem,
        handleSetCollectionItem,
        openConfirmationPopup
    };
};


/***/ })

};
;