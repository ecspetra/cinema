exports.id = 567;
exports.ids = [567];
exports.modules = {

/***/ 3679:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/default-user-image.cfdaa3f1.svg","height":24,"width":24,"blurWidth":0,"blurHeight":0});

/***/ }),

/***/ 7458:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9003);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);


const Button = ({ onClick, onMouseEnter, onMouseLeave, children, context = "filled", className, type = "button" })=>{
    const filledButtonClassNames = "w-full md:w-72 text-xs md:text-sm min-h-[48px] bg-rose-600 border-2 border-transparent rounded-3xl hover:bg-rose-500 text-white p-3 flex justify-center items-center";
    const filledDarkButtonClassNames = "w-full md:w-72 text-xs md:text-sm min-h-[48px] bg-gray-700 rounded-3xl hover:bg-gray-600 p-3 flex justify-center items-center";
    const emptyButtonClassNames = "w-full md:w-72 text-xs md:text-sm border-2 border-rose-600 text-rose-600 rounded-3xl hover:border-transparent hover:w-full hover:text-rose-500 p-3 flex justify-center items-center";
    const collectionButtonClassNames = "w-full md:w-72 text-xs md:text-sm min-h-[48px] border-2 border-rose-600 text-rose-600 rounded-3xl hover:border-rose-500 hover:text-rose-500 p-3 flex justify-center items-center";
    const imageButtonClassNames = "flex justify-center items-center";
    const textButtonClassNames = "text-sm md:text-base inline-flex items-center h-fit text-rose-600 hover:text-rose-500";
    const iconTextButtonClassNames = "text-xs md:text-sm rounded-md p-2 bg-gray-600/50 leading-tight hover:bg-rose-900/30 hover:text-rose-500 flex justify-start items-center";
    const iconButtonClassNames = "w-9 h-9 md:w-11 md:h-11 flex justify-center items-center bg-gray-700 hover:bg-gray-600 rounded-3xl z-10";
    const listItemButtonClassNames = "text-xs md:text-sm w-full py-1 px-2 flex justify-start items-center hover:bg-rose-600 hover:text-white leading-normal";
    const tagButtonClassNames = "bg-gray-800 rounded flex justify-center items-center text-xs leading-none px-2 py-1 my-0 mr-1 mb-1 duration-300 last:mr-0";
    const fieldButtonClassNames = "text-sm md:text-base w-full h-full text-left bg-transparent border border-gray-500 hover:border-white focus-within:border-white !font-light block";
    const getButtonClassNames = ()=>{
        switch(context){
            case "filled":
                return filledButtonClassNames;
            case "filledDark":
                return filledDarkButtonClassNames;
            case "empty":
                return emptyButtonClassNames;
            case "collection":
                return collectionButtonClassNames;
            case "image":
                return imageButtonClassNames;
            case "text":
                return textButtonClassNames;
            case "icon-text":
                return iconTextButtonClassNames;
            case "icon":
                return iconButtonClassNames;
            case "listItem":
                return listItemButtonClassNames;
            case "tag":
                return tagButtonClassNames;
            case "field":
                return fieldButtonClassNames;
        }
    };
    const handleOnClick = (event)=>{
        if (type !== "submit") {
            event.preventDefault();
            if (onClick) onClick(event);
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
        type: type,
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("duration-300 relative leading-none font-semibold", className, getButtonClassNames()),
        onClick: handleOnClick,
        onMouseEnter: onMouseEnter && onMouseEnter,
        onMouseLeave: onMouseLeave && onMouseLeave,
        children: children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);


/***/ }),

/***/ 9457:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9003);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);


const Title = ({ variant = "h1", children, className })=>{
    return variant === "h1" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("break-words relative text-2xl md:text-4xl font-bold leading-tight mb-4 after:w-16 after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-rose-600 pb-4", className),
        children: children
    }) : variant === "h2" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("break-words relative text-xl md:text-4xl font-light leading-tight mb-2", className),
        children: children
    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("break-words relative text-lg font-semibold leading-tight mb-2", className),
        children: children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Title);


/***/ }),

/***/ 1686:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ Images_Image)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./src/handlers/getDefaultImage.tsx
const getDefaultImage = (event, defaultImage)=>{
    const imageElement = event.target;
    imageElement.src = defaultImage.src;
};

// EXTERNAL MODULE: ./src/components/Loader/index.tsx
var Loader = __webpack_require__(3616);
// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(9003);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);
;// CONCATENATED MODULE: ./src/components/Images/Image/index.tsx





const Image = ({ src, defaultImage, className, loaderClassName })=>{
    const [isLoading, setIsLoading] = (0,external_react_.useState)(true);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
        className: external_classnames_default()(className, "relative block aspect-[2/3] w-full overflow-hidden"),
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("img", {
                onError: (event)=>getDefaultImage(event, defaultImage),
                onLoad: ()=>{
                    setIsLoading(false);
                },
                src: src,
                alt: "image",
                className: "block object-cover w-full h-full"
            }),
            isLoading && /*#__PURE__*/ jsx_runtime.jsx(Loader/* default */.Z, {
                className: loaderClassName
            })
        ]
    });
};
/* harmony default export */ const Images_Image = (Image);


/***/ }),

/***/ 3616:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6466);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7197);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9003);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);




const Loader = ({ className, isShowText = false, type = "absolute", isPageLoader })=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()("w-full h-full flex justify-center items-center", type === "absolute" && "absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900", className),
        children: [
            isShowText && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "mr-2",
                children: "Loading"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
                className: classnames__WEBPACK_IMPORTED_MODULE_3___default()("w-4 h-4 animate-spin", isPageLoader && "w-8 h-8"),
                icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__.faCircleNotch
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loader);


/***/ }),

/***/ 9390:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _components_Images_Image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1686);
/* harmony import */ var _app_assets_images_default_user_image_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3679);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _constants_paths__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6949);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9003);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);






const ProfileIconSmall = ({ photoURL, isLinkToProfile = false, userId, className })=>{
    const isUserFromDB = userId !== undefined;
    const profileIcon = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Images_Image__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()("aspect-square !w-7 !h-7 md:!w-10 md:!h-10 mr-3 rounded-full overflow-hidden flex-none", className),
        src: photoURL,
        defaultImage: _app_assets_images_default_user_image_svg__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z
    });
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: isLinkToProfile && isUserFromDB ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
            href: _constants_paths__WEBPACK_IMPORTED_MODULE_5__/* .PROFILE_PAGE */ .Jt.replace("{userId}", userId),
            children: profileIcon
        }) : profileIcon
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProfileIconSmall);


/***/ }),

/***/ 4259:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BM: () => (/* binding */ FilterFields),
/* harmony export */   IE: () => (/* binding */ SortByOption),
/* harmony export */   NH: () => (/* binding */ FilterUrlToSearchMap),
/* harmony export */   zS: () => (/* binding */ UserCollections)
/* harmony export */ });
/* harmony import */ var _constants_linksToFetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6515);

var SortByOption;
(function(SortByOption) {
    SortByOption["Popularity: Low to hight"] = "popularity.asc";
    SortByOption["Popularity: Hight to low"] = "popularity.desc";
    SortByOption["Revenue: Low to hight"] = "revenue.asc";
    SortByOption["Revenue: Hight to low"] = "revenue.desc";
    SortByOption["Release year: Low to hight"] = "primary_release_year.asc";
    SortByOption["Release year: Hight to low"] = "primary_release_year.desc";
    SortByOption["Vote average: Low to hight"] = "vote_average.asc";
    SortByOption["Vote average: Hight to low"] = "vote_average.desc";
    SortByOption["Vote count: Low to hight"] = "vote_count.asc";
    SortByOption["Vote count: Hight to low"] = "vote_count.desc";
})(SortByOption || (SortByOption = {}));
var FilterFields;
(function(FilterFields) {
    FilterFields["primary_release_year"] = "Year";
    FilterFields["first_air_date_year"] = "First air date";
    FilterFields["vote_average.lte"] = "Vote average";
    FilterFields["with_people"] = "Person";
    FilterFields["with_companies"] = "Company";
    FilterFields["with_genres"] = "Genres";
    FilterFields["with_original_language"] = "Country";
    FilterFields["with_keywords"] = "Keyword";
})(FilterFields || (FilterFields = {}));
const FilterUrlToSearchMap = {
    with_people: _constants_linksToFetch__WEBPACK_IMPORTED_MODULE_0__/* .URL_TO_SEARCH */ .Zh.replace("{fieldName}", FilterFields.with_people.toLowerCase()),
    with_companies: _constants_linksToFetch__WEBPACK_IMPORTED_MODULE_0__/* .URL_TO_SEARCH */ .Zh.replace("{fieldName}", FilterFields.with_companies.toLowerCase()),
    with_original_language: _constants_linksToFetch__WEBPACK_IMPORTED_MODULE_0__/* .URL_TO_FETCH_COUNTRIES */ .wc,
    with_keywords: _constants_linksToFetch__WEBPACK_IMPORTED_MODULE_0__/* .URL_TO_SEARCH */ .Zh.replace("{fieldName}", FilterFields.with_keywords.toLowerCase())
};
var UserCollections;
(function(UserCollections) {
    UserCollections["movie"] = "movie";
    UserCollections["tv"] = "tv";
    UserCollections["person"] = "person";
    UserCollections["reviews"] = "reviews";
    UserCollections["replies"] = "replies";
    UserCollections["marks"] = "marks";
    UserCollections["users"] = "users";
    UserCollections["basic"] = "basic";
    UserCollections["friends"] = "friends";
})(UserCollections || (UserCollections = {}));


/***/ }),

/***/ 6515:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $D: () => (/* binding */ URL_TO_FETCH_PERSON_LIST),
/* harmony export */   IS: () => (/* binding */ URL_TO_FETCH_ALL_GENRES),
/* harmony export */   Zh: () => (/* binding */ URL_TO_SEARCH),
/* harmony export */   ao: () => (/* binding */ URL_TO_FETCH_UPCOMING_MOVIE_LIST),
/* harmony export */   bD: () => (/* binding */ URL_TO_SEARCH_LIST_ITEMS),
/* harmony export */   bi: () => (/* binding */ URL_TO_FETCH_COUNTRY_MOVIE_LIST),
/* harmony export */   r2: () => (/* binding */ URL_TO_FETCH_MOVIES_WITH_PERSONS),
/* harmony export */   vp: () => (/* binding */ URL_TO_FETCH_ITEM_DATA),
/* harmony export */   wc: () => (/* binding */ URL_TO_FETCH_COUNTRIES),
/* harmony export */   yK: () => (/* binding */ URL_TO_FETCH_SIMILAR_LIST)
/* harmony export */ });
/* unused harmony export API_KEY */
const API_KEY = "1fdbb7205b3bf878ede960ab5c9bc7ce";
const URL_TO_FETCH_ITEM_DATA = `https://api.themoviedb.org/3/{collectionType}/{itemId}{queryParam}?api_key=${API_KEY}`;
const URL_TO_FETCH_UPCOMING_MOVIE_LIST = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page={currentPage}`;
const URL_TO_FETCH_SIMILAR_LIST = `https://api.themoviedb.org/3/{collectionType}/{itemId}/similar?api_key=${API_KEY}&page={currentPage}`;
const URL_TO_FETCH_ALL_GENRES = `https://api.themoviedb.org/3/genre/{queryParam}/list?api_key=${API_KEY}`;
const URL_TO_FETCH_PERSON_LIST = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&page={currentPage}`;
const URL_TO_FETCH_MOVIES_WITH_PERSONS = `https://api.themoviedb.org/3/discover/{type}?api_key=${API_KEY}&with_people={personId}&page={currentPage}`;
const URL_TO_FETCH_COUNTRIES = `https://api.themoviedb.org/3/configuration/countries?api_key=${API_KEY}&language=en-US`;
const URL_TO_SEARCH = `https://api.themoviedb.org/3/search/{fieldName}?api_key=${API_KEY}&query={searchQuery}&page={currentPage}`;
const URL_TO_SEARCH_LIST_ITEMS = `https://api.themoviedb.org/3/discover/{type}?api_key=${API_KEY}&page={currentPage}&sort_by=popularity.desc`;
const URL_TO_FETCH_COUNTRY_MOVIE_LIST = `https://api.themoviedb.org/3/discover/{type}?api_key=${API_KEY}&with_original_language={country}`;


/***/ }),

/***/ 6949:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A6: () => (/* binding */ CURRENT_USER_COLLECTION_PAGE),
/* harmony export */   Jt: () => (/* binding */ PROFILE_PAGE),
/* harmony export */   _L: () => (/* binding */ AUTH_PAGE),
/* harmony export */   vE: () => (/* binding */ COLLECTION_PAGE)
/* harmony export */ });
const AUTH_PAGE = "/auth";
const COLLECTION_PAGE = "/collection";
const PROFILE_PAGE = "/profile/{userId}";
const CURRENT_USER_COLLECTION_PAGE = `/collection?uid={userId}`;


/***/ }),

/***/ 7459:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  H: () => (/* binding */ AuthProvider),
  a: () => (/* binding */ useAuth)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/firebase/config.ts
var config = __webpack_require__(6855);
// EXTERNAL MODULE: external "firebase/auth"
var auth_ = __webpack_require__(4610);
// EXTERNAL MODULE: ./src/handlers/handleCookies.tsx
var handleCookies = __webpack_require__(5648);
// EXTERNAL MODULE: external "firebase/database"
var database_ = __webpack_require__(6666);
// EXTERNAL MODULE: external "@firebase/database"
var external_firebase_database_ = __webpack_require__(4960);
;// CONCATENATED MODULE: ./src/firebase/handlers/authHandlers/userContextListener.tsx



const userContextListener = (oldUserProfileData, updateUserProfile)=>{
    const userRef = (0,database_.ref)(config/* database */.F, `users/${oldUserProfileData.userId}/info`);
    const onUserProfileChanged = (snapshot)=>{
        const newUserProfileData = snapshot.val();
        if (oldUserProfileData.photoURL !== newUserProfileData?.photoURL || oldUserProfileData.userName !== newUserProfileData?.displayName) {
            updateUserProfile();
        }
    };
    const unsubscribeUserProfile = (0,external_firebase_database_.onValue)(userRef, onUserProfileChanged);
    return ()=>{
        unsubscribeUserProfile();
    };
};

;// CONCATENATED MODULE: ./src/context/AuthProvider.tsx






const AuthContext = /*#__PURE__*/ (0,external_react_.createContext)(undefined);
const useAuth = ()=>{
    const context = (0,external_react_.useContext)(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
const AuthProvider = ({ children })=>{
    const [currentUser, setCurrentUser] = (0,external_react_.useState)(null);
    const [isLoading, setIsLoading] = (0,external_react_.useState)(true);
    const updateUserProfile = async ()=>{
        if (currentUser) {
            setIsLoading(true);
            try {
                await (0,auth_.reload)(currentUser);
                const updatedUser = config/* auth */.I.currentUser;
                setCurrentUser(updatedUser);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        }
    };
    (0,external_react_.useEffect)(()=>{
        const unsubscribe = (0,auth_.onAuthStateChanged)(config/* auth */.I, async (user)=>{
            setCurrentUser(user);
            setIsLoading(false);
            if (user) {
                (0,handleCookies/* setCookie */.d8)("uid", user.uid, {
                    path: "/"
                });
            } else {
                (0,handleCookies/* removeCookie */.nJ)("uid", {
                    path: "/"
                });
            }
        });
        if (currentUser) {
            const oldUserProfileData = {
                userId: currentUser?.uid,
                photoURL: currentUser?.photoURL ?? "",
                userName: currentUser?.displayName ?? ""
            };
            const unsubscribeUserProfile = userContextListener(oldUserProfileData, updateUserProfile);
            return unsubscribeUserProfile;
        }
        return unsubscribe;
    }, [
        currentUser
    ]);
    const value = {
        isLoggedIn: currentUser !== null,
        userId: currentUser?.uid ?? "",
        photoURL: currentUser?.photoURL ?? "",
        userName: currentUser?.displayName ?? "",
        updateUserProfile
    };
    return /*#__PURE__*/ jsx_runtime.jsx(AuthContext.Provider, {
        value: value,
        children: !isLoading && children
    });
};


/***/ }),

/***/ 4858:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ ModalProvider),
/* harmony export */   d: () => (/* binding */ useModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);



const ModalContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const useModal = ()=>{
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
const ModalProvider = ({ children })=>{
    const [modalQueue, setModalQueue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [currentModal, setCurrentModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [isMounted, setIsMounted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const showModal = (modalData)=>{
        setModalQueue((prevState)=>[
                ...prevState,
                modalData
            ]);
    };
    const hideModal = (modalId)=>{
        setIsMounted(false);
        setTimeout(()=>{
            setModalQueue((prevState)=>prevState.filter((item)=>item.id !== modalId));
            setCurrentModal(null);
        }, 300);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (modalQueue.length > 0 && !currentModal) {
            setCurrentModal(modalQueue[modalQueue.length - 1]);
        }
    }, [
        modalQueue,
        currentModal
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (currentModal) {
            setIsMounted(true);
        }
    }, [
        currentModal
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleRouteChange = ()=>{
            modalQueue.forEach((modal)=>hideModal(modal.id));
        };
        router.events.on("beforeHistoryChange", handleRouteChange);
        return ()=>{
            router.events.off("beforeHistoryChange", handleRouteChange);
        };
    }, [
        modalQueue,
        hideModal,
        router
    ]);
    const contextValue = {
        showModal,
        hideModal,
        isMounted,
        currentModal
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ModalContext.Provider, {
        value: contextValue,
        children: children
    });
};


/***/ }),

/***/ 6855:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ database),
/* harmony export */   I: () => (/* binding */ auth)
/* harmony export */ });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4324);
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4610);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_auth__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6666);
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_database__WEBPACK_IMPORTED_MODULE_2__);



const firebaseConfig = {
    apiKey: "AIzaSyDl5YBCC9mLDjRfNTWmZ8UUHTsjnAKTmEM",
    authDomain: "cinema-street-455b7.firebaseapp.com",
    databaseURL: "https://cinema-street-455b7-default-rtdb.firebaseio.com",
    projectId: "cinema-street-455b7",
    storageBucket: "cinema-street-455b7.appspot.com",
    messagingSenderId: "683792306478",
    appId: "1:683792306478:web:f2015d82892a46bf35aabf",
    measurementId: "G-52TEHZDBE6"
};
const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);
const database = (0,firebase_database__WEBPACK_IMPORTED_MODULE_2__.getDatabase)(app);
const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)(app);


/***/ }),

/***/ 1398:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ getUserProfileInfo)
/* harmony export */ });
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6666);
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_database__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _firebase_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6855);


const getUserProfileInfo = async (userId)=>{
    const userPath = `users/${userId}`;
    const userRef = (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(_firebase_config__WEBPACK_IMPORTED_MODULE_1__/* .database */ .F, userPath);
    return new Promise(async (resolve)=>{
        (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.get)(userRef).then((snapshot)=>{
            let userInfo = null;
            if (snapshot.exists()) {
                userInfo = snapshot.val();
            }
            resolve(userInfo);
        });
    });
};


/***/ }),

/***/ 3940:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ fetchItemData)
/* harmony export */ });
/* harmony import */ var _constants_linksToFetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6515);

const fetchItemData = async (collectionType, itemId, queryParam)=>{
    try {
        const urlToFetch = _constants_linksToFetch__WEBPACK_IMPORTED_MODULE_0__/* .URL_TO_FETCH_ITEM_DATA */ .vp.replace("{collectionType}", collectionType).replace("{itemId}", itemId.toString()).replace("{queryParam}", queryParam);
        const response = await fetch(urlToFetch);
        if (!response.ok) {
            throw `Failed to fetch`;
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};


/***/ }),

/***/ 5648:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d8: () => (/* binding */ setCookie),
/* harmony export */   jl: () => (/* binding */ parseCookies),
/* harmony export */   nJ: () => (/* binding */ removeCookie)
/* harmony export */ });
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4802);
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_0__);

const setCookie = (name, value, options = {})=>{
    const { expires, path } = options;
    document.cookie = `${name}=${value};${expires ? `expires=${expires};` : ""}${path ? `path=${path};` : ""}`;
};
const removeCookie = (name, options = {})=>{
    options = {
        expires: new Date(0),
        path: "/",
        ...options
    };
    document.cookie = `${name}=; expires=${options.expires?.toUTCString()}; path=${options.path}`;
};
function parseCookies(req) {
    return new Promise((resolve, reject)=>{
        try {
            const cookies = (0,cookie__WEBPACK_IMPORTED_MODULE_0__.parse)(req ? req.headers.cookie || "" : document.cookie);
            resolve(cookies);
        } catch (error) {
            reject(error);
        }
    });
}


/***/ }),

/***/ 9254:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./node_modules/next/app.js
var app = __webpack_require__(7544);
var app_default = /*#__PURE__*/__webpack_require__.n(app);
// EXTERNAL MODULE: ./src/context/AuthProvider.tsx + 1 modules
var AuthProvider = __webpack_require__(7459);
// EXTERNAL MODULE: ./src/app/globals.css
var globals = __webpack_require__(4542);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./src/app/components/UI/Button/index.tsx
var Button = __webpack_require__(7458);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(9332);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./src/constants/paths.ts
var paths = __webpack_require__(6949);
// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(9003);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);
// EXTERNAL MODULE: ./src/handlers/fetchItemData.tsx
var fetchItemData = __webpack_require__(3940);
// EXTERNAL MODULE: ./src/constants/enum.ts
var constants_enum = __webpack_require__(4259);
// EXTERNAL MODULE: ./src/firebase/handlers/profileHandlers/getUserProfileInfo.tsx
var getUserProfileInfo = __webpack_require__(1398);
;// CONCATENATED MODULE: ./src/handlers/getBreadcrumbsList.tsx



const getItemName = (item)=>item.title ? item.title : item.name || "";
const capitalizeFirstLetter = (str)=>str.charAt(0).toUpperCase() + str.slice(1);
const getBreadcrumbsList = async (allSegments)=>{
    const allBreadcrumbs = [
        {
            label: "Home",
            href: "/"
        }
    ];
    for(let i = 0; i < allSegments.length; i++){
        const segment = allSegments[i];
        const href = `/${allSegments.slice(0, i + 1).join("/")}`;
        let segmentName = "";
        const isIdPageSegment = !isNaN(Number(segment));
        const isUserCollectionSegment = segment.includes("?uid");
        const isTVShowPageSegment = segment === constants_enum/* UserCollections */.zS.tv;
        const isProfilePageSegment = allSegments.includes("profile") && segment !== "profile";
        const getPageIdPageSegment = async ()=>{
            try {
                const collectionType = allSegments[i - 1];
                const itemInfo = await (0,fetchItemData/* fetchItemData */.R)(collectionType, segment, "");
                if (itemInfo) {
                    segmentName = getItemName(itemInfo);
                    const itemNameCapitalized = capitalizeFirstLetter(segmentName);
                    allBreadcrumbs.push({
                        label: itemNameCapitalized,
                        href
                    });
                }
            } catch (error) {
                throw error;
            }
        };
        const getUserCollectionSegment = ()=>{
            const segmentsBeforeUid = segment.split("?uid");
            segmentName = capitalizeFirstLetter(segmentsBeforeUid[0]);
            allBreadcrumbs.push({
                label: segmentName,
                href
            });
        };
        const getProfilePageSegment = async ()=>{
            try {
                const item = await (0,getUserProfileInfo/* getUserProfileInfo */.s)(segment);
                if (item) {
                    segmentName = item.info.displayName;
                    allBreadcrumbs.push({
                        label: segmentName,
                        href
                    });
                }
            } catch (error) {
                throw error;
            }
        };
        const getTVShowPageSegment = ()=>{
            segmentName = segment.toUpperCase();
            allBreadcrumbs.push({
                label: segmentName,
                href
            });
        };
        const getDefaultSegment = ()=>{
            segmentName = capitalizeFirstLetter(segment);
            allBreadcrumbs.push({
                label: segmentName,
                href
            });
        };
        switch(true){
            case isIdPageSegment:
                await getPageIdPageSegment();
                break;
            case isUserCollectionSegment:
                getUserCollectionSegment();
                break;
            case isProfilePageSegment:
                await getProfilePageSegment();
                break;
            case isTVShowPageSegment:
                getTVShowPageSegment();
                break;
            default:
                getDefaultSegment();
                break;
        }
    }
    return allBreadcrumbs;
};

;// CONCATENATED MODULE: ./src/app/components/Breadcrumbs/index.tsx








const Breadcrumbs = ()=>{
    const router = (0,router_.useRouter)();
    const pathname = (0,navigation.usePathname)();
    const [breadcrumbs, setBreadcrumbs] = (0,external_react_.useState)([]);
    (0,external_react_.useEffect)(()=>{
        const getBreadcrumbs = async ()=>{
            const allPathSegments = router.asPath.split("/").filter((segment)=>segment !== "");
            const breadcrumbsList = await getBreadcrumbsList(allPathSegments);
            setBreadcrumbs(breadcrumbsList);
        };
        getBreadcrumbs();
    }, [
        router.asPath,
        router.query.id
    ]);
    if (breadcrumbs.length === 1 || pathname === paths/* AUTH_PAGE */._L) return null;
    return /*#__PURE__*/ jsx_runtime.jsx("nav", {
        className: "mt-2",
        children: breadcrumbs.map((item, idx)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                className: external_classnames_default()("text-xs md:text-sm", idx === breadcrumbs.length - 1 ? "text-rose-600" : "text-gray-400"),
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                        href: item.href,
                        children: item.label
                    }),
                    idx < breadcrumbs.length - 1 && " > "
                ]
            }, idx))
    });
};
/* harmony default export */ const components_Breadcrumbs = (Breadcrumbs);

// EXTERNAL MODULE: external "@fortawesome/free-solid-svg-icons"
var free_solid_svg_icons_ = __webpack_require__(6466);
// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__(7197);
;// CONCATENATED MODULE: ./src/constants/routes.ts

const getCollectionLink = (userId)=>{
    return userId === undefined ? paths/* COLLECTION_PAGE */.vE : paths/* CURRENT_USER_COLLECTION_PAGE */.A6.replace("{userId}", userId);
};
const createRoutes = (userId)=>[
        {
            name: "Library",
            href: getCollectionLink(userId)
        },
        {
            name: "Persons",
            href: "/person"
        },
        {
            name: "Movies",
            href: "/movie"
        },
        {
            name: "TV shows",
            href: "/tv"
        }
    ];

;// CONCATENATED MODULE: ./src/app/components/Logo/index.tsx



const Logo = ({ className })=>{
    return /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
        href: `/`,
        as: `/`,
        className: external_classnames_default()("flex justify-center items-center min-h-[34px]", className),
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
            className: "font-black",
            children: [
                /*#__PURE__*/ jsx_runtime.jsx("span", {
                    className: "text-rose-600 pl-2 py-1 border-b-2 border-t-2 border-l-2 border-rose-600",
                    children: "CINEMA\xa0"
                }),
                /*#__PURE__*/ jsx_runtime.jsx("span", {
                    className: "border-r-2 border-t-2 border-rose-600 pr-2 py-1",
                    children: "Street"
                })
            ]
        })
    });
};
/* harmony default export */ const components_Logo = (Logo);

// EXTERNAL MODULE: external "firebase/auth"
var auth_ = __webpack_require__(4610);
// EXTERNAL MODULE: ./src/firebase/config.ts
var config = __webpack_require__(6855);
;// CONCATENATED MODULE: ./src/firebase/handlers/authHandlers/signOutUser.tsx


const signOutUser = async ()=>{
    try {
        await (0,auth_.signOut)(config/* auth */.I);
    } catch (error) {
        throw error;
    }
};

// EXTERNAL MODULE: ./src/components/Profile/ProfileInfo/ProfileIcon/ProfileIconSmall/index.tsx
var ProfileIconSmall = __webpack_require__(9390);
;// CONCATENATED MODULE: ./src/app/components/Header/index.tsx















const Header = ()=>{
    const { userId, photoURL, isLoggedIn } = (0,AuthProvider/* useAuth */.a)();
    const router = (0,router_.useRouter)();
    const pathname = (0,navigation.usePathname)() ?? "";
    const ROUTES = createRoutes(userId);
    const isAuthPage = (0,external_react_.useMemo)(()=>pathname === "/auth", [
        pathname
    ]);
    const isShowUserMenu = !isAuthPage && isLoggedIn;
    const isShowAuthButton = !isAuthPage && !isLoggedIn;
    const handleSignOutUser = async ()=>{
        await signOutUser();
        if (pathname.startsWith(paths/* COLLECTION_PAGE */.vE)) {
            await router.push(paths/* COLLECTION_PAGE */.vE);
        } else if (pathname === paths/* PROFILE_PAGE */.Jt.replace("{userId}", userId)) {
            await router.push(paths/* AUTH_PAGE */._L);
        } else {
            router.reload();
        }
    };
    if (pathname === "/404") return null;
    return /*#__PURE__*/ jsx_runtime.jsx("header", {
        className: "min-h-[68px] fixed top-0 left-0 w-full z-20 bg-gray-950 flex items-center justify-between",
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "w-full max-w-screen-xl mx-auto py-2 px-2 md:py-3 md:px-5",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "flex justify-between items-center gap-4",
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx(components_Logo, {
                            className: "hidden md:flex"
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("div", {
                            className: "flex justify-center items-center gap-2 md:gap-4 text-xs md:text-base",
                            children: ROUTES.map((item)=>{
                                return /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                    className: "font-semibold hover:text-rose-600 duration-300",
                                    href: item.href,
                                    as: item.href,
                                    children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                                        children: item.name
                                    })
                                }, item.href);
                            })
                        }),
                        isShowUserMenu && /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "flex justify-center items-center gap-4",
                            children: [
                                /*#__PURE__*/ jsx_runtime.jsx(ProfileIconSmall/* default */.Z, {
                                    isLinkToProfile: true,
                                    photoURL: photoURL,
                                    userId: userId,
                                    className: "mr-0"
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)(Button/* default */.Z, {
                                    context: "text",
                                    onClick: handleSignOutUser,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                                            className: "hidden md:block text-sm",
                                            children: "Sign Out"
                                        }),
                                        /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                                            icon: free_solid_svg_icons_.faRightFromBracket,
                                            className: "ml-1"
                                        })
                                    ]
                                })
                            ]
                        }),
                        isShowAuthButton && /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                            href: `/auth`,
                            as: `/auth`,
                            className: "font-semibold bg-rose-600 text-sm px-4 py-2 rounded-3xl duration-300",
                            children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                                children: "Sign In"
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime.jsx(components_Breadcrumbs, {})
            ]
        })
    });
};
/* harmony default export */ const components_Header = (Header);

;// CONCATENATED MODULE: ./src/app/components/Footer/index.tsx






const Footer = ()=>{
    const { userId } = (0,AuthProvider/* useAuth */.a)();
    const pathname = (0,navigation.usePathname)();
    const ROUTES = createRoutes(userId);
    if (pathname === "/404") return null;
    return /*#__PURE__*/ jsx_runtime.jsx("footer", {
        className: "w-full z-20 bg-gray-950 py-4",
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "max-w-screen-xl mx-auto py-3 px-5 flex flex-col justify-start items-center",
            children: [
                /*#__PURE__*/ jsx_runtime.jsx("div", {
                    className: "flex justify-center items-center gap-2 md:gap-4 pb-4",
                    children: ROUTES.map((item)=>{
                        return /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                            className: "text-xs md:text-base text-gray-500 hover:text-rose-600 duration-300",
                            href: item.href,
                            as: item.href,
                            children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                                children: item.name
                            })
                        }, item.href);
                    })
                }),
                /*#__PURE__*/ jsx_runtime.jsx(components_Logo, {}),
                /*#__PURE__*/ jsx_runtime.jsx("span", {
                    className: "mt-4 text-xs text-gray-500",
                    children: "Created by Yuliia Tkachenko"
                })
            ]
        })
    });
};
/* harmony default export */ const components_Footer = (Footer);

;// CONCATENATED MODULE: ./src/components/MainLayout/index.tsx




const MainLayout = ({ children })=>{
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(components_Header, {}),
            /*#__PURE__*/ jsx_runtime.jsx("main", {
                className: "container w-full max-w-screen-xl mx-auto pt-[68px] px-2 md:px-5 pb-16 relative font-light min-h-screen flex flex-col text-base",
                children: children
            }),
            /*#__PURE__*/ jsx_runtime.jsx(components_Footer, {})
        ]
    });
};
/* harmony default export */ const components_MainLayout = (MainLayout);

// EXTERNAL MODULE: ./src/context/ModalProvider.tsx
var ModalProvider = __webpack_require__(4858);
// EXTERNAL MODULE: external "react-dom"
var external_react_dom_ = __webpack_require__(6405);
;// CONCATENATED MODULE: ./src/app/components/UI/Portal/index.tsx


const Portal = ({ children, wrapperId, isAlert })=>{
    const [isDOMReady, setIsDOMReady] = (0,external_react_.useState)(false);
    const [wrapperElement, setWrapperElement] = (0,external_react_.useState)(null);
    const createWrapperAndAppendToBody = (wrapperId)=>{
        const wrapperElement = document.createElement("div");
        wrapperElement.setAttribute("id", wrapperId);
        document.body.appendChild(wrapperElement);
        return wrapperElement;
    };
    (0,external_react_.useEffect)(()=>{
        setIsDOMReady(true);
        if (!isAlert) {
            document.body.classList.add("modal-open");
            return ()=>{
                document.body.classList.remove("modal-open");
            };
        }
    }, [
        isAlert
    ]);
    (0,external_react_.useLayoutEffect)(()=>{
        let element = document.getElementById(wrapperId);
        let isAppendToBody = false;
        if (!element) {
            isAppendToBody = true;
            element = createWrapperAndAppendToBody(wrapperId);
        }
        setWrapperElement(element);
        return ()=>{
            const parent = element?.parentNode;
            if (isAppendToBody && parent && element) {
                parent.removeChild(element);
            }
        };
    }, [
        wrapperId
    ]);
    if (!isDOMReady) return null;
    return /*#__PURE__*/ (0,external_react_dom_.createPortal)(children, wrapperElement ?? document.createElement("div"));
};
/* harmony default export */ const UI_Portal = (Portal);

;// CONCATENATED MODULE: ./src/app/components/UI/Alert/index.tsx



const Alert = ({ modalText, type })=>{
    const isErrorAlert = type === "error";
    return /*#__PURE__*/ jsx_runtime.jsx("div", {
        className: "w-screen h-screen fixed top-0 pt-12 z-50 flex justify-center items-start",
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: `w-full text-sm md:text-base max-w-72 md:max-w-md relative p-2 md:p-6 ${isErrorAlert ? "bg-red-600" : "bg-green-600"} flex justify-start items-center font-semibold`,
            children: [
                /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                    icon: isErrorAlert ? free_solid_svg_icons_.faXmark : free_solid_svg_icons_.faCircleCheck,
                    className: "text-2xl mr-4"
                }),
                modalText
            ]
        })
    });
};
/* harmony default export */ const UI_Alert = (Alert);

// EXTERNAL MODULE: external "react-transition-group"
var external_react_transition_group_ = __webpack_require__(4466);
// EXTERNAL MODULE: ./src/app/components/UI/Title/Title.tsx
var Title = __webpack_require__(9457);
;// CONCATENATED MODULE: ./src/app/components/UI/Modal/ModalContent/index.tsx






const ModalContent = ({ currentModal, onClose, modalRef })=>{
    const { modalTitle, modalText, modalClassName, modalContent } = currentModal;
    const isShowModalHeader = modalTitle || modalText;
    return /*#__PURE__*/ jsx_runtime.jsx("div", {
        className: "w-screen h-screen fixed inset-0 z-50 bg-gray-950/70 flex justify-center items-center backdrop-blur duration-300",
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: external_classnames_default()("w-full max-w-72 md:max-w-lg relative p-4 md:p-12 bg-gray-900 max-h-[80vh] overflow-hidden flex flex-col", modalClassName),
            ref: modalRef,
            children: [
                /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                    context: "icon",
                    className: "!absolute top-2 right-2 md:top-4 md:right-4",
                    onClick: onClose,
                    children: /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                        icon: free_solid_svg_icons_.faXmark,
                        className: "w-6 h-6"
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "flex-grow overflow-y-auto",
                    children: [
                        isShowModalHeader && /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "mb-8 max-w-[90%]",
                            children: [
                                modalTitle && /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                                    variant: "h2",
                                    className: "!font-bold",
                                    children: modalTitle
                                }),
                                modalText && /*#__PURE__*/ jsx_runtime.jsx("p", {
                                    children: modalText
                                })
                            ]
                        }),
                        modalContent && /*#__PURE__*/ jsx_runtime.jsx("div", {
                            className: "relative",
                            children: modalContent
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const Modal_ModalContent = (ModalContent);

;// CONCATENATED MODULE: ./src/app/components/UI/Modal/index.tsx







const Modal = ()=>{
    const modalRef = (0,external_react_.useRef)(null);
    const timeoutRef = (0,external_react_.useRef)(null);
    const { hideModal, isMounted, currentModal } = (0,ModalProvider/* useModal */.d)();
    const { id, modalText = "", alertInfo } = currentModal || {};
    const handleClose = ()=>{
        hideModal(id);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };
    (0,external_react_.useEffect)(()=>{
        const handleClickOutside = (event)=>{
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                hideModal(id);
            }
        };
        if (!alertInfo?.isAlert) {
            document.addEventListener("click", handleClickOutside);
        } else {
            timeoutRef.current = setTimeout(()=>{
                hideModal(id);
            }, 4500);
        }
        return ()=>{
            if (!alertInfo?.isAlert) {
                document.removeEventListener("click", handleClickOutside);
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [
        modalRef,
        alertInfo?.isAlert,
        id,
        hideModal
    ]);
    if (!currentModal) return null;
    return /*#__PURE__*/ jsx_runtime.jsx(UI_Portal, {
        wrapperId: "modal-root",
        isAlert: alertInfo?.isAlert ?? false,
        children: /*#__PURE__*/ jsx_runtime.jsx(external_react_transition_group_.CSSTransition, {
            in: isMounted,
            timeout: 300,
            appear: true,
            classNames: "modal",
            children: alertInfo?.isAlert ? /*#__PURE__*/ jsx_runtime.jsx(UI_Alert, {
                modalText: modalText,
                type: alertInfo?.type
            }) : /*#__PURE__*/ jsx_runtime.jsx(Modal_ModalContent, {
                currentModal: currentModal,
                onClose: handleClose,
                modalRef: modalRef
            })
        })
    });
};
/* harmony default export */ const UI_Modal = (Modal);

// EXTERNAL MODULE: ./src/components/Loader/index.tsx
var Loader = __webpack_require__(3616);
;// CONCATENATED MODULE: ./src/app/components/PageLoader/index.tsx




const PageLoader = ({ children })=>{
    const router = (0,router_.useRouter)();
    const [isLoading, setIsLoading] = (0,external_react_.useState)(false);
    (0,external_react_.useEffect)(()=>{
        const handleRouteChangeStart = ()=>{
            setIsLoading(true);
        };
        const handleRouteChangeComplete = ()=>{
            setIsLoading(false);
        };
        router.events.on("routeChangeStart", handleRouteChangeStart);
        router.events.on("routeChangeComplete", handleRouteChangeComplete);
        return ()=>{
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeComplete", handleRouteChangeComplete);
        };
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "relative",
        children: [
            isLoading && /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: "fixed w-screen h-screen z-50 flex justify-center items-center",
                children: /*#__PURE__*/ jsx_runtime.jsx(Loader/* default */.Z, {
                    className: "!w-12 !h-12 rounded-full text-rose-600 bg-white",
                    isPageLoader: true
                })
            }),
            children
        ]
    });
};
/* harmony default export */ const components_PageLoader = (PageLoader);

;// CONCATENATED MODULE: ./src/pages/_app.tsx








class MyApp extends (app_default()) {
    render() {
        const { Component, pageProps } = this.props;
        return /*#__PURE__*/ jsx_runtime.jsx(components_PageLoader, {
            children: /*#__PURE__*/ jsx_runtime.jsx(AuthProvider/* AuthProvider */.H, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(ModalProvider/* ModalProvider */.D, {
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx(components_MainLayout, {
                            children: /*#__PURE__*/ jsx_runtime.jsx(Component, {
                                ...pageProps
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx(UI_Modal, {})
                    ]
                })
            })
        });
    }
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 1522:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6859);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_1__);


const Document = ()=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(next_document__WEBPACK_IMPORTED_MODULE_1__.Html, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(next_document__WEBPACK_IMPORTED_MODULE_1__.Head, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        rel: "preconnect",
                        href: "https://fonts.googleapis.com"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        rel: "preconnect",
                        href: "https://fonts.gstatic.com",
                        crossOrigin: ""
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap",
                        rel: "stylesheet"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("body", {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_document__WEBPACK_IMPORTED_MODULE_1__.Main, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_document__WEBPACK_IMPORTED_MODULE_1__.NextScript, {})
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Document);


/***/ }),

/***/ 4542:
/***/ (() => {



/***/ })

};
;