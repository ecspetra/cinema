"use strict";
(() => {
var exports = {};
exports.id = 186;
exports.ids = [186];
exports.modules = {

/***/ 6455:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderkind_PAGES_page_2Fcollection_preferredRegion_absolutePagePath_private_next_pages_2Fcollection_2Findex_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_),
  getServerSideProps: () => (/* binding */ next_route_loaderkind_PAGES_page_2Fcollection_preferredRegion_absolutePagePath_private_next_pages_2Fcollection_2Findex_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_getServerSideProps),
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

// NAMESPACE OBJECT: ./src/pages/collection/index.tsx
var collection_namespaceObject = {};
__webpack_require__.r(collection_namespaceObject);
__webpack_require__.d(collection_namespaceObject, {
  "default": () => (collection),
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
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/app/components/UI/Title/Title.tsx
var Title = __webpack_require__(9457);
// EXTERNAL MODULE: ./src/app/components/UI/Button/index.tsx
var Button = __webpack_require__(7458);
// EXTERNAL MODULE: ./src/handlers/handleModals.tsx
var handleModals = __webpack_require__(1168);
// EXTERNAL MODULE: ./src/context/ModalProvider.tsx
var ModalProvider = __webpack_require__(4858);
// EXTERNAL MODULE: ./src/handlers/handleCookies.tsx
var handleCookies = __webpack_require__(5648);
// EXTERNAL MODULE: ./src/components/TopBanner/index.tsx + 2 modules
var TopBanner = __webpack_require__(9019);
// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__(7197);
// EXTERNAL MODULE: external "@fortawesome/free-solid-svg-icons"
var free_solid_svg_icons_ = __webpack_require__(6466);
// EXTERNAL MODULE: ./src/context/AuthProvider.tsx + 1 modules
var AuthProvider = __webpack_require__(7459);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./src/constants/images.ts
var constants_images = __webpack_require__(8989);
// EXTERNAL MODULE: ./src/components/Collection/index.tsx + 3 modules
var Collection = __webpack_require__(5511);
// EXTERNAL MODULE: ./src/constants/paths.ts
var paths = __webpack_require__(6949);
// EXTERNAL MODULE: ./src/handlers/getUserCollection.tsx + 3 modules
var getUserCollection = __webpack_require__(1546);
;// CONCATENATED MODULE: ./src/handlers/getGeneralCollectionPage.tsx


const getGeneralCollectionPage = async (userIdFromUrl, userId, redirect)=>{
    const isUserIdNotPresented = !userId;
    if (isUserIdNotPresented) {
        return null;
    }
    const isUserIdFromUrlNotPresented = !userIdFromUrl;
    if (isUserIdFromUrlNotPresented) {
        redirect(paths/* CURRENT_USER_COLLECTION_PAGE */.A6.replace("{userId}", userId));
    }
    const areUserIdsPresentedButDifferent = userId !== userIdFromUrl;
    if (areUserIdsPresentedButDifferent) {
        redirect("/404");
    }
    try {
        const generalCollection = await (0,getUserCollection/* getUserCollection */.J)(userIdFromUrl);
        if (!generalCollection) {
            return null;
        }
        return {
            collectionMovies: generalCollection.collectionMovies,
            collectionTVShows: generalCollection.collectionTVShows,
            collectionPersons: generalCollection.collectionPersons,
            allCollectionReviews: generalCollection.allCollectionReviews,
            collectionMarks: generalCollection.collectionMarks
        };
    } catch (error) {
        throw error;
    }
};

// EXTERNAL MODULE: ./src/components/Loader/index.tsx
var Loader = __webpack_require__(3616);
// EXTERNAL MODULE: ./src/app/components/UI/Error/ErrorScreen/index.tsx
var ErrorScreen = __webpack_require__(5155);
;// CONCATENATED MODULE: ./src/pages/collection/index.tsx

















const GeneralCollectionPage = ({ generalCollectionPageProps })=>{
    const [isLoading, setIsLoading] = (0,external_react_.useState)(true);
    const [generalCollection, setGeneralCollection] = (0,external_react_.useState)(null);
    const { showModal } = (0,ModalProvider/* useModal */.d)();
    const router = (0,router_.useRouter)();
    const { userId } = (0,AuthProvider/* useAuth */.a)();
    (0,external_react_.useEffect)(()=>{
        const getGeneralCollection = async ()=>{
            setIsLoading(true);
            const userIdFromUrl = router.query.uid;
            getGeneralCollectionPage(userIdFromUrl, userId, (url)=>{
                router.push(url);
            }).then((data)=>{
                setGeneralCollection(data);
            }).catch(()=>{
                (0,handleModals/* showErrorNotification */.s9)(showModal, "An error has occurred");
            }).finally(()=>{
                setIsLoading(false);
            });
        };
        if (userId) {
            generalCollectionPageProps ? setGeneralCollection(generalCollectionPageProps) : getGeneralCollection();
        }
    }, [
        generalCollectionPageProps,
        router.query.uid
    ]);
    if (!userId) {
        return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
                /*#__PURE__*/ jsx_runtime.jsx(TopBanner/* default */.Z, {
                    imageSrc: "/35z8hWuzfFUZQaYog8E9LsXW3iI.jpg"
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "max-w-4xl",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(Title/* default */.Z, {
                            className: "text-3xl md:text-7xl",
                            children: [
                                "Your favorite movies, TV shows and persons will be displayed here",
                                /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                                    icon: free_solid_svg_icons_.faFilm,
                                    className: "ml-4 text-rose-600"
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("p", {
                            className: "mb-8",
                            children: "Please login or register to be able to create your own collection"
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                            onClick: ()=>(0,handleModals/* openLoginModal */.Mo)(showModal),
                            children: "Sign In"
                        })
                    ]
                })
            ]
        });
    }
    if (!generalCollection) {
        return isLoading ? /*#__PURE__*/ jsx_runtime.jsx(Loader/* default */.Z, {
            className: "bg-transparent"
        }) : /*#__PURE__*/ jsx_runtime.jsx(ErrorScreen/* default */.Z, {
            title: "Something went wrong",
            text: "No data found"
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(TopBanner/* default */.Z, {
                imageSrc: constants_images/* COLLECTION_PAGE_TOP_BANNER_IMAGE */.dK
            }),
            /*#__PURE__*/ jsx_runtime.jsx(Collection/* default */.Z, {
                movies: generalCollection.collectionMovies,
                tvShows: generalCollection.collectionTVShows,
                persons: generalCollection.collectionPersons,
                marks: generalCollection.collectionMarks,
                reviews: generalCollection.allCollectionReviews
            })
        ]
    });
};
const getServerSideProps = async (ctx)=>{
    const userIdFromUrl = ctx.query.uid;
    const cookies = await (0,handleCookies/* parseCookies */.jl)(ctx.req);
    const userId = cookies.uid;
    const generalCollection = await getGeneralCollectionPage(userIdFromUrl, userId, (url)=>{
        ctx.res?.writeHead(302, {
            Location: url
        });
        ctx.res?.end();
    });
    return {
        props: {
            generalCollectionPageProps: generalCollection
        }
    };
};
/* harmony default export */ const collection = (GeneralCollectionPage);

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2Fcollection&preferredRegion=&absolutePagePath=private-next-pages%2Fcollection%2Findex.tsx&absoluteAppPath=private-next-pages%2F_app.tsx&absoluteDocumentPath=private-next-pages%2F_document.tsx&middlewareConfigBase64=e30%3D!
// @ts-ignore this need to be imported from next/dist to be external



// Import the app and document modules.
// @ts-expect-error - replaced by webpack/turbopack loader

// @ts-expect-error - replaced by webpack/turbopack loader

// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

const PagesRouteModule = pages_module.PagesRouteModule;
// Re-export the component (should be the default export).
/* harmony default export */ const next_route_loaderkind_PAGES_page_2Fcollection_preferredRegion_absolutePagePath_private_next_pages_2Fcollection_2Findex_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(collection_namespaceObject, "default"));
// Re-export methods.
const getStaticProps = (0,helpers/* hoist */.l)(collection_namespaceObject, "getStaticProps");
const getStaticPaths = (0,helpers/* hoist */.l)(collection_namespaceObject, "getStaticPaths");
const next_route_loaderkind_PAGES_page_2Fcollection_preferredRegion_absolutePagePath_private_next_pages_2Fcollection_2Findex_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_getServerSideProps = (0,helpers/* hoist */.l)(collection_namespaceObject, "getServerSideProps");
const config = (0,helpers/* hoist */.l)(collection_namespaceObject, "config");
const reportWebVitals = (0,helpers/* hoist */.l)(collection_namespaceObject, "reportWebVitals");
// Re-export legacy methods.
const unstable_getStaticProps = (0,helpers/* hoist */.l)(collection_namespaceObject, "unstable_getStaticProps");
const unstable_getStaticPaths = (0,helpers/* hoist */.l)(collection_namespaceObject, "unstable_getStaticPaths");
const unstable_getStaticParams = (0,helpers/* hoist */.l)(collection_namespaceObject, "unstable_getStaticParams");
const unstable_getServerProps = (0,helpers/* hoist */.l)(collection_namespaceObject, "unstable_getServerProps");
const unstable_getServerSideProps = (0,helpers/* hoist */.l)(collection_namespaceObject, "unstable_getServerSideProps");
// Create and export the route module that will be consumed.
const routeModule = new PagesRouteModule({
    definition: {
        kind: route_kind/* RouteKind */.x.PAGES,
        page: "/collection",
        pathname: "/collection",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    components: {
        App: _app["default"],
        Document: _document["default"]
    },
    userland: collection_namespaceObject
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
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [604,812,567,858,54,620,570,908,9,600], () => (__webpack_exec__(6455)));
module.exports = __webpack_exports__;

})();