"use strict";
exports.id = 946;
exports.ids = [946];
exports.modules = {

/***/ 6769:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ Movie_MovieOrTVShowBasicInfo)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./src/components/Images/Image/index.tsx + 1 modules
var Image = __webpack_require__(1686);
// EXTERNAL MODULE: ./src/app/assets/images/default-movie-image.svg
var default_movie_image = __webpack_require__(3463);
// EXTERNAL MODULE: ./src/components/Images/ImagesList/index.tsx + 2 modules
var ImagesList = __webpack_require__(3216);
// EXTERNAL MODULE: ./src/app/components/UI/Title/Title.tsx
var Title = __webpack_require__(9457);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__(7197);
// EXTERNAL MODULE: external "@fortawesome/free-solid-svg-icons"
var free_solid_svg_icons_ = __webpack_require__(6466);
;// CONCATENATED MODULE: ./src/components/Rating/hooks/useRatingIcons.tsx




const useRatingIcons = (rating)=>{
    const [ratingIcons, setRatingIcons] = (0,external_react_.useState)([]);
    (0,external_react_.useEffect)(()=>{
        const getRatingIcons = ()=>{
            const icons = [];
            for(let i = 1; i <= 10; i++){
                const decimalPart = (i * 10 - Math.ceil(rating * 10)) / 10;
                if (i <= rating || decimalPart < 0.3) {
                    icons.push(/*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                        icon: free_solid_svg_icons_.faStar
                    }, i));
                } else if (decimalPart >= 0.3 && decimalPart <= 0.7) {
                    icons.push(/*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                        className: "relative leading-none w-[18px] h-[16px]",
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                                className: "absolute top-0 left-0",
                                icon: free_solid_svg_icons_.faStarHalf
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                                className: "absolute top-0 right-0 text-gray-800 -scale-x-100",
                                icon: free_solid_svg_icons_.faStarHalf
                            })
                        ]
                    }, i));
                } else {
                    icons.push(/*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                        className: "text-gray-800",
                        icon: free_solid_svg_icons_.faStar
                    }, i));
                }
            }
            setRatingIcons(icons);
        };
        getRatingIcons();
    }, [
        rating
    ]);
    return {
        ratingIcons
    };
};
/* harmony default export */ const hooks_useRatingIcons = (useRatingIcons);

;// CONCATENATED MODULE: ./src/components/Rating/index.tsx



const Rating = ({ rating, voteCount })=>{
    const { ratingIcons } = hooks_useRatingIcons(rating);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                variant: "h3",
                children: "Rating"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "flex gap-x-1 text-white items-center mb-5",
                children: [
                    ratingIcons.map((item)=>item),
                    /*#__PURE__*/ jsx_runtime.jsx("p", {
                        className: "text-sm font-semibold leading-none mr-2",
                        children: Math.ceil(rating * 10) / 10
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                        className: "text-gray-400 text-sm leading-none mt-[2px]",
                        children: [
                            voteCount,
                            " voted"
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const components_Rating = (Rating);

// EXTERNAL MODULE: ./src/app/components/UI/Button/index.tsx
var Button = __webpack_require__(7458);
// EXTERNAL MODULE: ./src/components/Loader/index.tsx
var Loader = __webpack_require__(3616);
// EXTERNAL MODULE: ./src/context/AuthProvider.tsx + 1 modules
var AuthProvider = __webpack_require__(7459);
// EXTERNAL MODULE: ./src/context/ModalProvider.tsx
var ModalProvider = __webpack_require__(4858);
// EXTERNAL MODULE: external "firebase/database"
var database_ = __webpack_require__(6666);
// EXTERNAL MODULE: external "@firebase/util"
var util_ = __webpack_require__(5260);
// EXTERNAL MODULE: ./src/firebase/config.ts
var config = __webpack_require__(6855);
;// CONCATENATED MODULE: ./src/firebase/handlers/markHandlers/createNewMarkForMovieOrTVShow.tsx



const createNewMarkForMovieOrTVShow = async (markData, userId)=>{
    const newMarkPath = `users/${userId}/collection/marks/${markData.collectionType}/${(0,util_.uuidv4)()}`;
    const newMarkRef = (0,database_.ref)(config/* database */.F, newMarkPath);
    const newMarkData = {
        markedItemId: markData.markedItemId,
        markValue: markData.markValue,
        collectionType: markData.collectionType
    };
    await (0,database_.set)(newMarkRef, newMarkData);
};

// EXTERNAL MODULE: ./src/firebase/handlers/markHandlers/getMarkForMovieOrTVShow.tsx
var getMarkForMovieOrTVShow = __webpack_require__(9087);
// EXTERNAL MODULE: ./src/handlers/handleModals.tsx
var handleModals = __webpack_require__(1168);
;// CONCATENATED MODULE: ./src/firebase/handlers/markHandlers/removeMarkForMovie.tsx


const removeMarkForMovie = (userId, markConfig)=>{
    const { markKey, collectionType } = markConfig;
    const removedMarkPath = `users/${userId}/collection/marks/${collectionType}/${markKey}`;
    const removedMarkRef = (0,database_.ref)(config/* database */.F, removedMarkPath);
    return new Promise(async (resolve)=>{
        let isMarkRemovedFromCollection = false;
        (0,database_.remove)(removedMarkRef).then(()=>{
            isMarkRemovedFromCollection = true;
        });
        resolve(isMarkRemovedFromCollection);
    });
};

;// CONCATENATED MODULE: ./src/components/Mark/hooks/useMarkIcons.tsx











const useMarkIcons = (markedItemId, collectionType)=>{
    const [markIcons, setMarkIcons] = (0,external_react_.useState)([]);
    const [isLoadingMark, setIsLoadingMark] = (0,external_react_.useState)(false);
    const [markData, setMarkData] = (0,external_react_.useState)(null);
    const { userId, isLoggedIn } = (0,AuthProvider/* useAuth */.a)();
    const { showModal } = (0,ModalProvider/* useModal */.d)();
    const isShowRemoveMarkButton = markData && userId;
    const MAX_MARK = 10;
    const EMPTY_MARK_COLOR = "text-rose-900";
    const FILLED_MARK_COLOR = "text-rose-500";
    const createNewMark = (markValue)=>{
        if (isLoggedIn) {
            setIsLoadingMark(true);
            const markedItemData = {
                markedItemId,
                markValue,
                collectionType
            };
            createNewMarkForMovieOrTVShow(markedItemData, userId).then(()=>{
                const markConfig = {
                    markedItemId,
                    collectionType
                };
                (0,getMarkForMovieOrTVShow/* getMarkForMovieOrTVShow */.M)(userId, markConfig).then((data)=>{
                    if (data) setMarkData(data);
                }).finally(()=>{
                    setIsLoadingMark(false);
                });
            });
        } else (0,handleModals/* openLoginModal */.Mo)(showModal);
    };
    const createStarButton = (idx, className)=>{
        return /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
            context: "image",
            className: className,
            onClick: ()=>createNewMark(idx),
            onMouseEnter: ()=>handleIconsHover(idx),
            onMouseLeave: getEmptyMarkIcons,
            children: /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                icon: free_solid_svg_icons_.faStar
            })
        }, idx);
    };
    const createStarIcon = (idx, className)=>{
        return /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
            icon: free_solid_svg_icons_.faStar,
            className: className
        }, idx);
    };
    const handleIconsHover = (iconIdx)=>{
        let hoveredIcons = [];
        for(let i = 1; i <= MAX_MARK; i++){
            hoveredIcons.push(createStarButton(i, i <= iconIdx ? FILLED_MARK_COLOR : EMPTY_MARK_COLOR));
        }
        setMarkIcons(hoveredIcons);
    };
    const getMarkIcons = ()=>{
        setMarkIcons([]);
        for(let i = 1; i <= MAX_MARK; i++){
            setMarkIcons((prevState)=>[
                    ...prevState,
                    createStarIcon(i, markData && i <= markData.data.markValue ? FILLED_MARK_COLOR : EMPTY_MARK_COLOR)
                ]);
        }
    };
    const getEmptyMarkIcons = ()=>{
        setMarkIcons([]);
        setMarkIcons(Array.from({
            length: MAX_MARK
        }, (_, idx)=>createStarButton(idx + 1, EMPTY_MARK_COLOR)));
    };
    const removeMark = ()=>{
        setIsLoadingMark(true);
        const markConfig = {
            markKey: markData?.key,
            collectionType
        };
        removeMarkForMovie(userId, markConfig).then(()=>{
            setMarkData(null);
            getEmptyMarkIcons();
        }).finally(()=>{
            setIsLoadingMark(false);
        });
    };
    (0,external_react_.useEffect)(()=>{
        if (isLoggedIn) {
            const markConfig = {
                markedItemId,
                collectionType
            };
            (0,getMarkForMovieOrTVShow/* getMarkForMovieOrTVShow */.M)(userId, markConfig).then((data)=>{
                if (data) setMarkData(data);
            });
        } else getEmptyMarkIcons();
    }, [
        userId,
        markedItemId
    ]);
    (0,external_react_.useEffect)(()=>{
        if (markData) {
            getMarkIcons();
        } else getEmptyMarkIcons();
    }, [
        markData
    ]);
    return {
        mark: markData?.data.markValue,
        markIcons,
        isLoadingMark,
        isShowRemoveMarkButton,
        removeMark
    };
};
/* harmony default export */ const hooks_useMarkIcons = (useMarkIcons);

;// CONCATENATED MODULE: ./src/components/Mark/index.tsx






const Mark = ({ markedItemId, collectionType })=>{
    const { userId } = (0,AuthProvider/* useAuth */.a)();
    const { mark, markIcons, isLoadingMark, isShowRemoveMarkButton, removeMark } = hooks_useMarkIcons(markedItemId, collectionType);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "mb-4 relative",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                variant: "h3",
                children: "My mark"
            }),
            isLoadingMark ? /*#__PURE__*/ jsx_runtime.jsx(Loader/* default */.Z, {
                isShowText: true,
                type: "static",
                className: "!inline-block"
            }) : /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "flex justify-start items-center gap-x-1",
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("div", {
                                className: "flex justify-start items-center gap-x-1",
                                children: markIcons.map((item)=>{
                                    return item;
                                })
                            }),
                            isShowRemoveMarkButton && /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx("p", {
                                        className: "text-sm font-semibold leading-none mr-2",
                                        children: mark
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                                        onClick: removeMark,
                                        context: "text",
                                        children: "Remove my mark"
                                    })
                                ]
                            })
                        ]
                    }),
                    !userId && /*#__PURE__*/ jsx_runtime.jsx("p", {
                        className: "text-gray-400 text-sm leading-none mt-2",
                        children: "Please login or register to be able to rate the movie"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const components_Mark = (Mark);

// EXTERNAL MODULE: ./src/components/Review/ReviewList/index.tsx + 26 modules
var ReviewList = __webpack_require__(908);
// EXTERNAL MODULE: ./src/components/Review/Form/NewReviewForm/index.tsx + 1 modules
var NewReviewForm = __webpack_require__(6868);
// EXTERNAL MODULE: ./src/app/components/UI/Button/CollectionButton/index.tsx
var CollectionButton = __webpack_require__(7390);
// EXTERNAL MODULE: ./src/hooks/useCollectionButton.tsx + 3 modules
var useCollectionButton = __webpack_require__(7310);
// EXTERNAL MODULE: external "react-player"
var external_react_player_ = __webpack_require__(8924);
var external_react_player_default = /*#__PURE__*/__webpack_require__.n(external_react_player_);
// EXTERNAL MODULE: external "moment/moment"
var moment_ = __webpack_require__(3332);
var moment_default = /*#__PURE__*/__webpack_require__.n(moment_);
// EXTERNAL MODULE: ./src/constants/images.ts
var constants_images = __webpack_require__(8989);
;// CONCATENATED MODULE: ./src/components/Movie/MovieOrTVShowBasicInfo/TVSeasonList/TVSeasonCard/index.tsx








const TVSeasonCard = ({ season })=>{
    const { name, air_date, poster_path, vote_average, episode_count, overview } = season;
    const imageFullSrc = poster_path ? constants_images/* CARD_IMAGE_SRC */.hm.replace("{imageSrc}", poster_path) : "";
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "flex justify-start items-start gap-4 mb-4 last:mb-0",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(Image/* default */.Z, {
                className: "!w-24 !h-36 flex-none duration-300 mb-4 group-hover:border-rose-600 border-4",
                src: imageFullSrc,
                defaultImage: default_movie_image/* default */.Z
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                        variant: "h3",
                        children: name
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: "text-sm",
                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "mb-4 flex flex-col justify-start items-start",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                    children: [
                                        "Air date: ",
                                        moment_default()(air_date).format("Do MMM YYYY")
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                    children: [
                                        "Number of episodes: ",
                                        episode_count
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                    className: "flex justify-center items-center text-sm",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                                            className: "mr-2",
                                            children: "Rating:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                                            icon: free_solid_svg_icons_.faStar,
                                            className: "text-white"
                                        }),
                                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                                            className: "ml-1 font-semibold",
                                            children: Math.ceil(vote_average * 10) / 10
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    overview && /*#__PURE__*/ jsx_runtime.jsx("p", {
                        className: "text-gray-400",
                        children: overview
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const TVSeasonList_TVSeasonCard = (TVSeasonCard);

// EXTERNAL MODULE: ./src/hooks/useItemsToShow.tsx
var useItemsToShow = __webpack_require__(7535);
// EXTERNAL MODULE: ./src/components/List/EmptyList/index.tsx
var EmptyList = __webpack_require__(5513);
;// CONCATENATED MODULE: ./src/components/Movie/MovieOrTVShowBasicInfo/TVSeasonList/index.tsx






const TVSeasonsList = ({ seasonsList })=>{
    const { itemsToShow, getItemsToShow, isShowMoreButton, buttonText, listRef } = (0,useItemsToShow/* default */.Z)(seasonsList, 2);
    if (!seasonsList.length) {
        return /*#__PURE__*/ jsx_runtime.jsx(EmptyList/* default */.Z, {
            title: "Seasons"
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        ref: listRef,
        className: "mb-16",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                children: "Seasons"
            }),
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                children: itemsToShow.map((item, idx)=>/*#__PURE__*/ jsx_runtime.jsx(TVSeasonList_TVSeasonCard, {
                        season: item
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
/* harmony default export */ const TVSeasonList = (TVSeasonsList);

// EXTERNAL MODULE: ./src/components/Tag/TagList/index.tsx + 2 modules
var TagList = __webpack_require__(1226);
// EXTERNAL MODULE: ./src/components/Details/DetailsList/index.tsx + 2 modules
var DetailsList = __webpack_require__(8938);
// EXTERNAL MODULE: ./src/constants/enum.ts
var constants_enum = __webpack_require__(4259);
;// CONCATENATED MODULE: ./src/components/Movie/MovieOrTVShowBasicInfo/index.tsx


















const MovieOrTVShowBasicInfo = ({ basicInfo, images, reviews, video, collectionType })=>{
    const { userId } = (0,AuthProvider/* useAuth */.a)();
    const { title, name, id, genres, overview, production_companies, tagline, poster_path, production_countries, release_date, first_air_date, vote_count, vote_average, seasons } = basicInfo;
    const isTVShowItem = collectionType === constants_enum/* UserCollections */.zS.tv;
    const details = [
        isTVShowItem ? first_air_date && {
            type: "first_air_date",
            title: "First air date:",
            text: first_air_date
        } : {
            type: "release_date",
            title: "Release date:",
            text: release_date
        },
        {
            type: "production_countries",
            title: "Production countries:",
            text: production_countries
        },
        {
            type: "production_companies",
            title: "Production companies:",
            text: production_companies
        }
    ].filter(Boolean);
    const { isLoadingCollection, isCollectionItem, handleSetCollectionItem, openConfirmationPopup } = (0,useCollectionButton/* useCollectionButton */.b)(basicInfo, collectionType);
    const imageFullSrc = poster_path ? constants_images/* CARD_IMAGE_SRC */.hm.replace("{imageSrc}", poster_path) : "";
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "flex gap-7 py-7 mb-16 flex-wrap md:flex-nowrap",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: "w-full max-w-[240px] md:max-w-[340px] mx-auto mt-24 md:mt-0",
                children: /*#__PURE__*/ jsx_runtime.jsx("div", {
                    className: "sticky top-28",
                    children: /*#__PURE__*/ jsx_runtime.jsx(Image/* default */.Z, {
                        src: imageFullSrc,
                        defaultImage: default_movie_image/* default */.Z,
                        className: "border-4"
                    })
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "w-full",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                        className: "text-3xl md:text-7xl after:hidden pb-0",
                        children: title ? title : name
                    }),
                    tagline && /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                        variant: "h2",
                        className: "text-gray-400",
                        children: tagline
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(TagList/* default */.Z, {
                        tags: genres,
                        className: "mb-5"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(DetailsList/* default */.Z, {
                        itemsList: details
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(components_Rating, {
                        rating: vote_average,
                        voteCount: vote_count
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(components_Mark, {
                        markedItemId: id,
                        collectionType: collectionType
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("p", {
                        className: "mb-6",
                        children: overview
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(CollectionButton/* default */.Z, {
                        className: "mb-12",
                        isLoadingCollection: isLoadingCollection,
                        isCollectionItem: isCollectionItem,
                        onClick: isCollectionItem ? openConfirmationPopup : handleSetCollectionItem
                    }),
                    isTVShowItem && /*#__PURE__*/ jsx_runtime.jsx(TVSeasonList, {
                        seasonsList: seasons || []
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(ImagesList/* default */.Z, {
                        images: images
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(ReviewList/* default */.Z, {
                        reviewedItemId: id,
                        collectionType: collectionType,
                        reviews: reviews
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(NewReviewForm/* default */.Z, {
                        reviewedItemId: id,
                        userId: userId,
                        reviewedItemCollectionType: collectionType
                    }),
                    video && /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "mt-16",
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                                children: "Trailer"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx((external_react_player_default()), {
                                url: `https://www.youtube.com/watch?v=${video}`,
                                controls: true,
                                width: "100%",
                                height: "auto",
                                style: {
                                    aspectRatio: "16/9"
                                }
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const Movie_MovieOrTVShowBasicInfo = (MovieOrTVShowBasicInfo);


/***/ }),

/***/ 8357:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _app_components_UI_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7458);
/* harmony import */ var _app_components_UI_Title_Title__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9457);
/* harmony import */ var _components_List_EmptyList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5513);
/* harmony import */ var _hooks_useItemsToShow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7535);
/* harmony import */ var _components_List_ItemsListWrap_ItemsList_ItemCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5311);
/* harmony import */ var _constants_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4259);







const MovieOrTVShowPersonList = ({ itemsList, title })=>{
    const { itemsToShow, getItemsToShow, isShowMoreButton, buttonText, listRef } = (0,_hooks_useItemsToShow__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)(itemsList, 8);
    if (!itemsToShow.length) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_List_EmptyList__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
            title: title
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        ref: listRef,
        className: "mb-16",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_UI_Title_Title__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                children: title
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "grid grid-cols-[repeat(auto-fill,141px)] gap-4 justify-center mb-8",
                children: itemsToShow.map((item, idx)=>{
                    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_List_ItemsListWrap_ItemsList_ItemCard__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                        item: item,
                        isShowButton: false,
                        collectionType: _constants_enum__WEBPACK_IMPORTED_MODULE_6__/* .UserCollections */ .zS.person,
                        isShowRole: true
                    }, idx);
                })
            }),
            isShowMoreButton && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_UI_Button__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                className: "mx-auto",
                context: "empty",
                onClick: getItemsToShow,
                children: buttonText
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MovieOrTVShowPersonList);


/***/ }),

/***/ 4765:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  i: () => (/* binding */ getMovieOrTvShowPageData)
});

// EXTERNAL MODULE: ./src/constants/linksToFetch.ts
var linksToFetch = __webpack_require__(6515);
// EXTERNAL MODULE: ./src/handlers/fetchItemData.tsx
var fetchItemData = __webpack_require__(3940);
// EXTERNAL MODULE: ./src/handlers/getResultsByPage.tsx
var getResultsByPage = __webpack_require__(8750);
// EXTERNAL MODULE: ./src/constants/enum.ts
var constants_enum = __webpack_require__(4259);
// EXTERNAL MODULE: ./src/handlers/createItemCard.tsx
var createItemCard = __webpack_require__(8694);
// EXTERNAL MODULE: external "firebase/database"
var database_ = __webpack_require__(6666);
// EXTERNAL MODULE: ./src/firebase/config.ts
var config = __webpack_require__(6855);
;// CONCATENATED MODULE: ./src/firebase/handlers/reviewAndReplyHandlers/getMovieOrTVShowReviewListFromStorage.tsx


const getMovieOrTVShowReviewListFromStorage = async (reviewedItemId, collectionType, reviewedItemCollectionType)=>{
    const collectionPathForReviews = `${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/`;
    const collectionRefForReviews = (0,database_.ref)(config/* database */.F, collectionPathForReviews);
    try {
        const snapshot = await (0,database_.get)(collectionRefForReviews);
        if (snapshot.exists()) {
            const data = snapshot.val();
            const reviewList = Object.values(data);
            return reviewList;
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
};

;// CONCATENATED MODULE: ./src/handlers/getMovieOrTvShowPageData.tsx






const getMovieOrTvShowPageData = async (itemId, collectionType)=>{
    try {
        const urlToFetchSimilarMovies = linksToFetch/* URL_TO_FETCH_SIMILAR_LIST */.yK.replace("{itemId}", itemId).replace("{collectionType}", collectionType);
        const fetchReviewListFromStorage = async ()=>{
            const reviewListFromStorage = await getMovieOrTVShowReviewListFromStorage(itemId, constants_enum/* UserCollections */.zS.reviews, collectionType);
            return reviewListFromStorage;
        };
        const [basicInfo, credits, images, reviews, video, reviewListFromStorage, similarItemsList] = await Promise.all([
            (0,fetchItemData/* fetchItemData */.R)(collectionType, itemId, ""),
            (0,fetchItemData/* fetchItemData */.R)(collectionType, itemId, "/credits"),
            (0,fetchItemData/* fetchItemData */.R)(collectionType, itemId, "/images"),
            (0,fetchItemData/* fetchItemData */.R)(collectionType, itemId, "/reviews"),
            (0,fetchItemData/* fetchItemData */.R)(collectionType, itemId, "/videos"),
            fetchReviewListFromStorage(),
            (0,getResultsByPage/* getResultsByPage */.Z)(urlToFetchSimilarMovies, 1)
        ]);
        const reviewsFromAPIAndStorage = [
            ...reviews.results,
            ...reviewListFromStorage
        ];
        const getCreditsItems = async (items)=>{
            if (items.length > 0) {
                const itemCards = await (0,createItemCard/* createItemCard */.v)(items);
                return itemCards;
            } else return [];
        };
        const cast = await getCreditsItems(credits.cast);
        const crew = await getCreditsItems(credits.crew);
        return {
            basicInfo,
            credits: {
                cast: cast,
                crew: crew
            },
            images: images.backdrops,
            video: video.results,
            reviewsFromAPIAndStorage,
            similarItemsList
        };
    } catch (error) {
        throw error;
    }
};


/***/ }),

/***/ 9994:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _handlers_handleModals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1168);
/* harmony import */ var _context_ModalProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4858);
/* harmony import */ var _constants_linksToFetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6515);
/* harmony import */ var _handlers_getMovieOrTvShowPageData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4765);





const useFetchData = (movieOrTVShowFromProps, itemId, collectionType)=>{
    const { showModal } = (0,_context_ModalProvider__WEBPACK_IMPORTED_MODULE_2__/* .useModal */ .d)();
    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    const urlToFetchSimilarItems = _constants_linksToFetch__WEBPACK_IMPORTED_MODULE_4__/* .URL_TO_FETCH_SIMILAR_LIST */ .yK.replace("{itemId}", itemId).replace("{collectionType}", collectionType);
    const fetchMovieOrTVShowPageData = async ()=>{
        setIsLoading(true);
        setData(null);
        (0,_handlers_getMovieOrTvShowPageData__WEBPACK_IMPORTED_MODULE_3__/* .getMovieOrTvShowPageData */ .i)(itemId, collectionType).then((data)=>{
            setData(data);
        }).catch(()=>{
            (0,_handlers_handleModals__WEBPACK_IMPORTED_MODULE_1__/* .showErrorNotification */ .s9)(showModal, "An error has occurred");
        }).finally(()=>{
            setIsLoading(false);
        });
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (!movieOrTVShowFromProps) {
            fetchMovieOrTVShowPageData();
        } else setData(movieOrTVShowFromProps);
    }, [
        itemId
    ]);
    return {
        data,
        isLoading,
        urlToFetchSimilarItems
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useFetchData);


/***/ })

};
;