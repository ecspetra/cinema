"use strict";
(() => {
var exports = {};
exports.id = 911;
exports.ids = [911];
exports.modules = {

/***/ 4566:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderkind_PAGES_page_2Ftv_2F_5Bid_5D_preferredRegion_absolutePagePath_private_next_pages_2Ftv_2F_5Bid_5D_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_),
  getServerSideProps: () => (/* binding */ next_route_loaderkind_PAGES_page_2Ftv_2F_5Bid_5D_preferredRegion_absolutePagePath_private_next_pages_2Ftv_2F_5Bid_5D_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_getServerSideProps),
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

// NAMESPACE OBJECT: ./src/pages/tv/[id].tsx
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
// EXTERNAL MODULE: ./src/components/Person/PersonList/MovieOrTVShowPersonList/index.tsx
var MovieOrTVShowPersonList = __webpack_require__(8357);
// EXTERNAL MODULE: ./src/components/Loader/index.tsx
var Loader = __webpack_require__(3616);
// EXTERNAL MODULE: ./src/components/TopBanner/index.tsx + 2 modules
var TopBanner = __webpack_require__(9019);
// EXTERNAL MODULE: ./src/components/List/ItemsListWrap/index.tsx + 4 modules
var ItemsListWrap = __webpack_require__(8478);
// EXTERNAL MODULE: ./src/constants/enum.ts
var constants_enum = __webpack_require__(4259);
// EXTERNAL MODULE: ./src/components/Movie/MovieOrTVShowBasicInfo/index.tsx + 8 modules
var MovieOrTVShowBasicInfo = __webpack_require__(6769);
// EXTERNAL MODULE: ./src/handlers/getMovieOrTvShowPageData.tsx + 1 modules
var getMovieOrTvShowPageData = __webpack_require__(4765);
// EXTERNAL MODULE: ./src/app/components/UI/Error/ErrorScreen/index.tsx
var ErrorScreen = __webpack_require__(5155);
// EXTERNAL MODULE: ./src/hooks/useMovieOrTVShowFetch.tsx
var useMovieOrTVShowFetch = __webpack_require__(9994);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./src/pages/tv/[id].tsx











const TVShowPage = ({ tvShowFromProps })=>{
    const router = (0,router_.useRouter)();
    const itemId = router.query.id;
    const { data: tvShow, isLoading, urlToFetchSimilarItems } = (0,useMovieOrTVShowFetch/* default */.Z)(tvShowFromProps, itemId, constants_enum/* UserCollections */.zS.tv);
    const tvShowTeaser = tvShow?.video && tvShow.video.length > 0 ? tvShow.video.find((item)=>(item.type === "Teaser" || item.type === "Trailer") && item.site === "YouTube") : null;
    const tvShowTeaserKey = tvShowTeaser?.key || "";
    if (!tvShow) {
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
                imageSrc: tvShow?.images[0]?.file_path
            }),
            /*#__PURE__*/ jsx_runtime.jsx(MovieOrTVShowBasicInfo/* default */.Z, {
                basicInfo: tvShow?.basicInfo,
                images: tvShow?.images,
                reviews: tvShow?.reviewsFromAPIAndStorage,
                video: tvShowTeaserKey,
                collectionType: constants_enum/* UserCollections */.zS.tv
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(MovieOrTVShowPersonList/* default */.Z, {
                        itemsList: tvShow?.credits.cast,
                        title: "Cast"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(MovieOrTVShowPersonList/* default */.Z, {
                        itemsList: tvShow?.credits.crew,
                        title: "Crew"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(ItemsListWrap/* default */.Z, {
                        itemsList: tvShow?.similarItemsList.items,
                        collectionType: constants_enum/* UserCollections */.zS.tv,
                        isMoreDataAvailable: tvShow?.similarItemsList.isMoreDataAvailable,
                        urlToFetchItems: urlToFetchSimilarItems,
                        title: "Similar TV Shows"
                    })
                ]
            })
        ]
    });
};
const getServerSideProps = async (ctx)=>{
    const tvShowId = ctx.query.id;
    return (0,getMovieOrTvShowPageData/* getMovieOrTvShowPageData */.i)(tvShowId, constants_enum/* UserCollections */.zS.tv).then((data)=>{
        return {
            props: {
                tvShowPageProps: data
            }
        };
    }).catch(()=>{
        return {
            props: {
                tvShowPageProps: null
            }
        };
    });
};
/* harmony default export */ const _id_ = (TVShowPage);

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2Ftv%2F%5Bid%5D&preferredRegion=&absolutePagePath=private-next-pages%2Ftv%2F%5Bid%5D.tsx&absoluteAppPath=private-next-pages%2F_app.tsx&absoluteDocumentPath=private-next-pages%2F_document.tsx&middlewareConfigBase64=e30%3D!
// @ts-ignore this need to be imported from next/dist to be external



// Import the app and document modules.
// @ts-expect-error - replaced by webpack/turbopack loader

// @ts-expect-error - replaced by webpack/turbopack loader

// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

const PagesRouteModule = pages_module.PagesRouteModule;
// Re-export the component (should be the default export).
/* harmony default export */ const next_route_loaderkind_PAGES_page_2Ftv_2F_5Bid_5D_preferredRegion_absolutePagePath_private_next_pages_2Ftv_2F_5Bid_5D_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(_id_namespaceObject, "default"));
// Re-export methods.
const getStaticProps = (0,helpers/* hoist */.l)(_id_namespaceObject, "getStaticProps");
const getStaticPaths = (0,helpers/* hoist */.l)(_id_namespaceObject, "getStaticPaths");
const next_route_loaderkind_PAGES_page_2Ftv_2F_5Bid_5D_preferredRegion_absolutePagePath_private_next_pages_2Ftv_2F_5Bid_5D_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_getServerSideProps = (0,helpers/* hoist */.l)(_id_namespaceObject, "getServerSideProps");
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
        page: "/tv/[id]",
        pathname: "/tv/[id]",
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

/***/ 3332:
/***/ ((module) => {

module.exports = require("moment/moment");

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

/***/ 8924:
/***/ ((module) => {

module.exports = require("react-player");

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
var __webpack_exports__ = __webpack_require__.X(0, [604,812,567,858,54,620,318,570,908,938,216,226,946], () => (__webpack_exec__(4566)));
module.exports = __webpack_exports__;

})();