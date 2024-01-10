"use strict";
(() => {
var exports = {};
exports.id = 478;
exports.ids = [478];
exports.modules = {

/***/ 2592:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderkind_PAGES_page_2Fperson_2F_5Bid_5D_preferredRegion_absolutePagePath_private_next_pages_2Fperson_2F_5Bid_5D_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_),
  getServerSideProps: () => (/* binding */ next_route_loaderkind_PAGES_page_2Fperson_2F_5Bid_5D_preferredRegion_absolutePagePath_private_next_pages_2Fperson_2F_5Bid_5D_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_getServerSideProps),
  getStaticPaths: () => (/* binding */ getStaticPaths),
  getStaticProps: () => (/* binding */ getStaticProps),
  reportWebVitals: () => (/* binding */ reportWebVitals),
  routeModule: () => (/* binding */ routeModule),
  unstable_getServerProps: () => (/* binding */ unstable_getServerProps),
  unstable_getServerSideProps: () => (/* binding */ unstable_getServerSideProps),
  unstable_getStaticParams: () => (/* binding */ unstable_getStaticParams),
  unstable_getStaticPaths: () => (/* binding */ unstable_getStaticPaths),
  unstable_getStaticProps: () => (/* binding */ unstable_getStaticProps)
});

// NAMESPACE OBJECT: ./src/pages/person/[id].tsx
var _id_namespaceObject = {};
__webpack_require__.r(_id_namespaceObject);
__webpack_require__.d(_id_namespaceObject, {
  "default": () => (_id_),
  getServerSideProps: () => (getServerSideProps)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/pages/module.js
var pages_module = __webpack_require__(3185);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(5244);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/helpers.js
var helpers = __webpack_require__(7182);
// EXTERNAL MODULE: ./src/pages/_document.tsx
var _document = __webpack_require__(1522);
// EXTERNAL MODULE: ./src/pages/_app.tsx + 13 modules
var _app = __webpack_require__(9254);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./src/constants/linksToFetch.ts
var linksToFetch = __webpack_require__(6515);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./src/components/Images/Image/index.tsx + 1 modules
var Image = __webpack_require__(1686);
// EXTERNAL MODULE: ./src/app/assets/images/default-movie-image.svg
var default_movie_image = __webpack_require__(3463);
// EXTERNAL MODULE: ./src/app/components/UI/Title/Title.tsx
var Title = __webpack_require__(9457);
// EXTERNAL MODULE: ./src/app/components/UI/Button/CollectionButton/index.tsx
var CollectionButton = __webpack_require__(7390);
// EXTERNAL MODULE: ./src/hooks/useCollectionButton.tsx + 3 modules
var useCollectionButton = __webpack_require__(7310);
;// CONCATENATED MODULE: ./src/handlers/getPersonGender.tsx
const getPersonGender = (gender)=>{
    const genderText = gender === 1 ? "Female" : "Male";
    return genderText;
};

// EXTERNAL MODULE: ./src/components/Images/ImagesList/index.tsx + 2 modules
var ImagesList = __webpack_require__(3216);
// EXTERNAL MODULE: ./src/components/Details/DetailsList/index.tsx + 2 modules
var DetailsList = __webpack_require__(8938);
// EXTERNAL MODULE: ./src/constants/images.ts
var constants_images = __webpack_require__(8989);
// EXTERNAL MODULE: ./src/constants/enum.ts
var constants_enum = __webpack_require__(4259);
;// CONCATENATED MODULE: ./src/components/Person/PersonInfo/index.tsx











const PersonInfo = ({ personInfo, personImages })=>{
    const { isLoadingCollection, isCollectionItem, handleSetCollectionItem, openConfirmationPopup } = (0,useCollectionButton/* useCollectionButton */.b)(personInfo, constants_enum/* UserCollections */.zS.person);
    const { profile_path, name, biography, known_for_department, place_of_birth, birthday, deathday, gender, id } = personInfo;
    const genderInString = getPersonGender(gender);
    const imageFullSrc = profile_path ? constants_images/* CARD_IMAGE_SRC */.hm.replace("{imageSrc}", profile_path) : "";
    const details = [
        {
            type: "place_of_birth",
            title: "Place of birth:",
            text: place_of_birth
        },
        {
            type: "birthday",
            title: {
                birthday: "Date of birth:",
                deathday: "Date of death:"
            },
            text: {
                birthday,
                deathday
            }
        },
        {
            type: "gender",
            title: "Gender:",
            text: genderInString
        }
    ];
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "flex gap-7 py-7 mb-16 flex-wrap md:flex-nowrap",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: "w-full max-w-[240px] md:max-w-[340px] mx-auto mt-24 md:mt-0",
                children: /*#__PURE__*/ jsx_runtime.jsx("div", {
                    className: "sticky top-8",
                    children: /*#__PURE__*/ jsx_runtime.jsx(Image/* default */.Z, {
                        src: imageFullSrc,
                        defaultImage: default_movie_image/* default */.Z
                    })
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "w-full",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                        className: "text-3xl md:text-7xl after:hidden pb-0",
                        children: name
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                        variant: "h2",
                        className: "text-gray-400",
                        children: known_for_department
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(DetailsList/* default */.Z, {
                        itemsList: details
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("p", {
                        className: "mb-6",
                        children: biography
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(CollectionButton/* default */.Z, {
                        className: "mb-12",
                        isLoadingCollection: isLoadingCollection,
                        isCollectionItem: isCollectionItem,
                        onClick: isCollectionItem ? openConfirmationPopup : handleSetCollectionItem
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(ImagesList/* default */.Z, {
                        images: personImages,
                        isPersonImages: true,
                        className: "!mb-0"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const Person_PersonInfo = (PersonInfo);

// EXTERNAL MODULE: ./src/components/Loader/index.tsx
var Loader = __webpack_require__(3616);
// EXTERNAL MODULE: ./src/components/TopBanner/index.tsx + 2 modules
var TopBanner = __webpack_require__(9019);
// EXTERNAL MODULE: ./src/components/List/ItemsListWrap/index.tsx + 4 modules
var ItemsListWrap = __webpack_require__(8478);
// EXTERNAL MODULE: ./src/handlers/fetchItemData.tsx
var fetchItemData = __webpack_require__(3940);
// EXTERNAL MODULE: ./src/handlers/getResultsByPage.tsx
var getResultsByPage = __webpack_require__(8750);
;// CONCATENATED MODULE: ./src/handlers/getPersonPageData.tsx




const getPersonPageData = async (personId)=>{
    const getPersonData = async (fetchQuery)=>{
        try {
            const personData = await (0,fetchItemData/* fetchItemData */.R)(constants_enum/* UserCollections */.zS.person, personId, fetchQuery);
            return personData;
        } catch (error) {
            throw error;
        }
    };
    try {
        const urlToFetchMoviesWithCurrentPerson = linksToFetch/* URL_TO_FETCH_MOVIES_WITH_PERSONS */.r2.replace("{type}", constants_enum/* UserCollections */.zS.movie).replace("{personId}", personId);
        const urlToFetchTVShowsWithCurrentPerson = linksToFetch/* URL_TO_FETCH_MOVIES_WITH_PERSONS */.r2.replace("{type}", constants_enum/* UserCollections */.zS.tv).replace("{personId}", personId);
        const personInfo = await getPersonData("");
        const personImages = await getPersonData("/images");
        const moviesWithPerson = await (0,getResultsByPage/* getResultsByPage */.Z)(urlToFetchMoviesWithCurrentPerson, 1);
        const tvShowsWithPerson = await (0,getResultsByPage/* getResultsByPage */.Z)(urlToFetchTVShowsWithCurrentPerson, 1);
        return {
            info: personInfo,
            images: personImages.profiles,
            movies: moviesWithPerson,
            tvShows: tvShowsWithPerson
        };
    } catch (error) {
        throw error;
    }
};

// EXTERNAL MODULE: ./src/handlers/handleModals.tsx
var handleModals = __webpack_require__(1168);
// EXTERNAL MODULE: ./src/context/ModalProvider.tsx
var ModalProvider = __webpack_require__(4858);
// EXTERNAL MODULE: ./src/app/components/UI/Error/ErrorScreen/index.tsx
var ErrorScreen = __webpack_require__(5155);
;// CONCATENATED MODULE: ./src/pages/person/[id].tsx













const PersonPage = ({ personFromProps })=>{
    const { showModal } = (0,ModalProvider/* useModal */.d)();
    const [isLoading, setIsLoading] = (0,external_react_.useState)(true);
    const [person, setPerson] = (0,external_react_.useState)(null);
    const router = (0,router_.useRouter)();
    const personId = router.query.id;
    const urlToFetchMoviesWithCurrentPerson = linksToFetch/* URL_TO_FETCH_MOVIES_WITH_PERSONS */.r2.replace("{type}", constants_enum/* UserCollections */.zS.movie).replace("{personId}", personId);
    const urlToFetchTVShowsWithCurrentPerson = linksToFetch/* URL_TO_FETCH_MOVIES_WITH_PERSONS */.r2.replace("{type}", constants_enum/* UserCollections */.zS.tv).replace("{personId}", personId);
    (0,external_react_.useEffect)(()=>{
        const fetchPersonPageData = async ()=>{
            setIsLoading(true);
            setPerson(null);
            getPersonPageData(personId).then((data)=>{
                setPerson(data);
            }).catch(()=>{
                (0,handleModals/* showErrorNotification */.s9)(showModal, "An error has occurred");
            }).finally(()=>{
                setIsLoading(false);
            });
        };
        if (!personFromProps) {
            fetchPersonPageData();
        } else setPerson(personFromProps);
    }, [
        personId
    ]);
    if (!person) {
        return isLoading ? /*#__PURE__*/ jsx_runtime.jsx(Loader/* default */.Z, {
            className: "bg-transparent"
        }) : /*#__PURE__*/ jsx_runtime.jsx(ErrorScreen/* default */.Z, {
            title: "Something went wrong",
            text: "No data found"
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(TopBanner/* default */.Z, {}),
            /*#__PURE__*/ jsx_runtime.jsx(Person_PersonInfo, {
                personInfo: person.info,
                personImages: person.images
            }),
            /*#__PURE__*/ jsx_runtime.jsx(ItemsListWrap/* default */.Z, {
                itemsList: person.movies.items,
                collectionType: constants_enum/* UserCollections */.zS.movie,
                isMoreDataAvailable: person.movies.isMoreDataAvailable,
                urlToFetchItems: urlToFetchMoviesWithCurrentPerson,
                title: `Movies with ${person.info.name}`
            }),
            /*#__PURE__*/ jsx_runtime.jsx(ItemsListWrap/* default */.Z, {
                itemsList: person.tvShows.items,
                collectionType: constants_enum/* UserCollections */.zS.tv,
                isMoreDataAvailable: person.tvShows.isMoreDataAvailable,
                urlToFetchItems: urlToFetchTVShowsWithCurrentPerson,
                title: `TV Shows with ${person.info.name}`
            })
        ]
    });
};
const getServerSideProps = async (ctx)=>{
    const personId = ctx.query.id;
    return getPersonPageData(personId).then((data)=>{
        return {
            props: {
                personPageProps: data
            }
        };
    }).catch(()=>{
        return {
            props: {
                personPageProps: null
            }
        };
    });
};
/* harmony default export */ const _id_ = (PersonPage);

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2Fperson%2F%5Bid%5D&preferredRegion=&absolutePagePath=private-next-pages%2Fperson%2F%5Bid%5D.tsx&absoluteAppPath=private-next-pages%2F_app.tsx&absoluteDocumentPath=private-next-pages%2F_document.tsx&middlewareConfigBase64=e30%3D!
// @ts-ignore this need to be imported from next/dist to be external



// Import the app and document modules.
// @ts-expect-error - replaced by webpack/turbopack loader

// @ts-expect-error - replaced by webpack/turbopack loader

// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

const PagesRouteModule = pages_module.PagesRouteModule;
// Re-export the component (should be the default export).
/* harmony default export */ const next_route_loaderkind_PAGES_page_2Fperson_2F_5Bid_5D_preferredRegion_absolutePagePath_private_next_pages_2Fperson_2F_5Bid_5D_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(_id_namespaceObject, "default"));
// Re-export methods.
const getStaticProps = (0,helpers/* hoist */.l)(_id_namespaceObject, "getStaticProps");
const getStaticPaths = (0,helpers/* hoist */.l)(_id_namespaceObject, "getStaticPaths");
const next_route_loaderkind_PAGES_page_2Fperson_2F_5Bid_5D_preferredRegion_absolutePagePath_private_next_pages_2Fperson_2F_5Bid_5D_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_getServerSideProps = (0,helpers/* hoist */.l)(_id_namespaceObject, "getServerSideProps");
const config = (0,helpers/* hoist */.l)(_id_namespaceObject, "config");
const reportWebVitals = (0,helpers/* hoist */.l)(_id_namespaceObject, "reportWebVitals");
// Re-export legacy methods.
const unstable_getStaticProps = (0,helpers/* hoist */.l)(_id_namespaceObject, "unstable_getStaticProps");
const unstable_getStaticPaths = (0,helpers/* hoist */.l)(_id_namespaceObject, "unstable_getStaticPaths");
const unstable_getStaticParams = (0,helpers/* hoist */.l)(_id_namespaceObject, "unstable_getStaticParams");
const unstable_getServerProps = (0,helpers/* hoist */.l)(_id_namespaceObject, "unstable_getServerProps");
const unstable_getServerSideProps = (0,helpers/* hoist */.l)(_id_namespaceObject, "unstable_getServerSideProps");
// Create and export the route module that will be consumed.
const routeModule = new PagesRouteModule({
    definition: {
        kind: route_kind/* RouteKind */.x.PAGES,
        page: "/person/[id]",
        pathname: "/person/[id]",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    components: {
        App: _app["default"],
        Document: _document["default"]
    },
    userland: _id_namespaceObject
});

//# sourceMappingURL=pages.js.map

/***/ }),

/***/ 4960:
/***/ ((module) => {

module.exports = require("@firebase/database");

/***/ }),

/***/ 5260:
/***/ ((module) => {

module.exports = require("@firebase/util");

/***/ }),

/***/ 6466:
/***/ ((module) => {

module.exports = require("@fortawesome/free-solid-svg-icons");

/***/ }),

/***/ 7197:
/***/ ((module) => {

module.exports = require("@fortawesome/react-fontawesome");

/***/ }),

/***/ 9003:
/***/ ((module) => {

module.exports = require("classnames");

/***/ }),

/***/ 4802:
/***/ ((module) => {

module.exports = require("cookie");

/***/ }),

/***/ 4324:
/***/ ((module) => {

module.exports = require("firebase/app");

/***/ }),

/***/ 4610:
/***/ ((module) => {

module.exports = require("firebase/auth");

/***/ }),

/***/ 6666:
/***/ ((module) => {

module.exports = require("firebase/database");

/***/ }),

/***/ 2245:
/***/ ((module) => {

module.exports = require("moment");

/***/ }),

/***/ 3076:
/***/ ((module) => {

module.exports = require("next/dist/server/future/route-modules/route-module.js");

/***/ }),

/***/ 4140:
/***/ ((module) => {

module.exports = require("next/dist/server/get-page-files.js");

/***/ }),

/***/ 9716:
/***/ ((module) => {

module.exports = require("next/dist/server/htmlescape.js");

/***/ }),

/***/ 3100:
/***/ ((module) => {

module.exports = require("next/dist/server/render.js");

/***/ }),

/***/ 6368:
/***/ ((module) => {

module.exports = require("next/dist/server/utils.js");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 6724:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/constants.js");

/***/ }),

/***/ 9274:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/hooks-client-context.js");

/***/ }),

/***/ 8743:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/html-context.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 3349:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/server-inserted-html.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

module.exports = require("react-dom");

/***/ }),

/***/ 4466:
/***/ ((module) => {

module.exports = require("react-transition-group");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [604,812,567,858,54,318,570,938,216], () => (__webpack_exec__(2592)));
module.exports = __webpack_exports__;

})();