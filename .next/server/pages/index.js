"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 7674:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderkind_PAGES_page_2F_preferredRegion_absolutePagePath_private_next_pages_2Findex_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_),
  getServerSideProps: () => (/* binding */ next_route_loaderkind_PAGES_page_2F_preferredRegion_absolutePagePath_private_next_pages_2Findex_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_getServerSideProps),
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

// NAMESPACE OBJECT: ./src/pages/index.tsx
var pages_namespaceObject = {};
__webpack_require__.r(pages_namespaceObject);
__webpack_require__.d(pages_namespaceObject, {
  "default": () => (pages),
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
// EXTERNAL MODULE: ./src/constants/linksToFetch.ts
var linksToFetch = __webpack_require__(6515);
// EXTERNAL MODULE: ./src/components/Loader/index.tsx
var Loader = __webpack_require__(3616);
// EXTERNAL MODULE: ./src/app/components/UI/Button/index.tsx
var Button = __webpack_require__(7458);
// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__(2245);
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);
// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(9003);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);
// EXTERNAL MODULE: ./src/hooks/useInfiniteScroll.tsx
var useInfiniteScroll = __webpack_require__(4668);
;// CONCATENATED MODULE: ./src/components/HomePageSlider/HomePageSliderItemsList/index.tsx








const HomePageSliderItemsList = ({ itemsList, isMoreDataAvailable, onSelectItem, selectedItemId })=>{
    const containerRef = (0,external_react_.useRef)(null);
    const { isLoading, items } = (0,useInfiniteScroll/* useInfiniteScroll */.M)(containerRef, itemsList, isMoreDataAvailable, linksToFetch/* URL_TO_FETCH_UPCOMING_MOVIE_LIST */.ao);
    const defaultItemClassNames = "bg-gray-800 group-hover:bg-white group-hover:text-gray-950";
    const selectedItemClassNames = "bg-white text-gray-950";
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        ref: containerRef,
        className: "overflow-auto flex flex-col flex-none max-w-sm w-full scrollbar-hide bg-gray-950 max-h-[200px] md:max-h-full",
        children: [
            !items.length ? /*#__PURE__*/ jsx_runtime.jsx("span", {
                className: "mt-4 mx-auto",
                children: "No results found"
            }) : items.map((item, idx)=>{
                return /*#__PURE__*/ (0,jsx_runtime.jsxs)(Button/* default */.Z, {
                    context: "listItem",
                    onClick: ()=>onSelectItem(item),
                    className: external_classnames_default()("group !p-0", selectedItemId === item.id && "bg-rose-600"),
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                            className: external_classnames_default()("w-20 h-full p-2 font-black mr-4 flex justify-center items-center flex-none duration-300", selectedItemId === item.id ? selectedItemClassNames : defaultItemClassNames),
                            children: external_moment_default()(item.release_date).format("D MMM")
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                            className: "text-left py-2",
                            children: item.title
                        })
                    ]
                }, idx);
            }),
            isLoading && /*#__PURE__*/ jsx_runtime.jsx(Loader/* default */.Z, {
                type: "static",
                className: "mb-4"
            })
        ]
    });
};
/* harmony default export */ const HomePageSlider_HomePageSliderItemsList = (HomePageSliderItemsList);

// EXTERNAL MODULE: ./src/components/Images/Image/index.tsx + 1 modules
var Image = __webpack_require__(1686);
// EXTERNAL MODULE: ./src/app/assets/images/default-movie-image.svg
var default_movie_image = __webpack_require__(3463);
// EXTERNAL MODULE: ./src/components/TopBanner/index.tsx + 2 modules
var TopBanner = __webpack_require__(9019);
// EXTERNAL MODULE: ./src/app/components/UI/Title/Title.tsx
var Title = __webpack_require__(9457);
// EXTERNAL MODULE: external "react-player"
var external_react_player_ = __webpack_require__(8924);
var external_react_player_default = /*#__PURE__*/__webpack_require__.n(external_react_player_);
// EXTERNAL MODULE: ./src/constants/images.ts
var constants_images = __webpack_require__(8989);
// EXTERNAL MODULE: ./src/handlers/fetchItemData.tsx
var fetchItemData = __webpack_require__(3940);
// EXTERNAL MODULE: ./src/constants/enum.ts
var constants_enum = __webpack_require__(4259);
;// CONCATENATED MODULE: ./src/components/HomePageSlider/hooks/useHomePageSlider.tsx




const useHomePageSlider = (itemsList)=>{
    const [selectedItem, setSelectedItem] = (0,external_react_.useState)(itemsList.items[0]);
    const [imageSrc, setImageSrc] = (0,external_react_.useState)("");
    const [videoSrc, setVideoSrc] = (0,external_react_.useState)("");
    const imageFullSrc = imageSrc ? constants_images/* ORIGINAL_IMAGE_SRC */.qX.replace("{imageSrc}", imageSrc) : "";
    const getSelectedItemImageSrc = async ()=>{
        const images = await (0,fetchItemData/* fetchItemData */.R)(constants_enum/* UserCollections */.zS.movie, selectedItem.id, "/images");
        const videos = await (0,fetchItemData/* fetchItemData */.R)(constants_enum/* UserCollections */.zS.movie, selectedItem.id, "/videos");
        const movieTeaser = videos.results.length > 0 && videos.results.find((item)=>(item.type === "Teaser" || item.type === "Trailer") && item.site === "YouTube");
        const image = images.backdrops[0]?.file_path;
        const imageSrc = image || "";
        const videoSrc = movieTeaser.key || "";
        setImageSrc(imageSrc);
        setVideoSrc(videoSrc);
    };
    (0,external_react_.useEffect)(()=>{
        if (selectedItem) getSelectedItemImageSrc();
    }, [
        selectedItem
    ]);
    return {
        imageFullSrc,
        videoSrc,
        selectedItem,
        setSelectedItem
    };
};
/* harmony default export */ const hooks_useHomePageSlider = (useHomePageSlider);

;// CONCATENATED MODULE: ./src/components/HomePageSlider/index.tsx








const HomePageSlider = ({ itemsList })=>{
    const { imageFullSrc, videoSrc, selectedItem, setSelectedItem } = hooks_useHomePageSlider(itemsList);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(TopBanner/* default */.Z, {
                imageSrc: imageFullSrc,
                className: "-mb-72 after:h-full"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                children: "Upcoming movies"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "bg-white p-1 flex flex-wrap md:flex-nowrap justify-between items-stretch md:max-h-[500px] mb-16 mt-44 md:mt-0",
                children: [
                    videoSrc ? /*#__PURE__*/ jsx_runtime.jsx((external_react_player_default()), {
                        url: `https://www.youtube.com/watch?v=${videoSrc}`,
                        controls: true,
                        width: "100%",
                        height: "auto",
                        style: {
                            aspectRatio: "16/9"
                        }
                    }) : /*#__PURE__*/ jsx_runtime.jsx(Image/* default */.Z, {
                        src: imageFullSrc,
                        defaultImage: default_movie_image/* default */.Z,
                        className: "aspect-[215/121]"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(HomePageSlider_HomePageSliderItemsList, {
                        itemsList: itemsList.items,
                        isMoreDataAvailable: itemsList.isMoreDataAvailable,
                        selectedItemId: selectedItem ? selectedItem.id : undefined,
                        onSelectItem: setSelectedItem
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const components_HomePageSlider = (HomePageSlider);

// EXTERNAL MODULE: ./src/components/List/ItemsListWrap/index.tsx + 4 modules
var ItemsListWrap = __webpack_require__(8478);
// EXTERNAL MODULE: ./src/app/components/UI/Search/index.tsx + 4 modules
var Search = __webpack_require__(4688);
// EXTERNAL MODULE: ./src/handlers/handleModals.tsx
var handleModals = __webpack_require__(1168);
// EXTERNAL MODULE: ./src/context/ModalProvider.tsx
var ModalProvider = __webpack_require__(4858);
// EXTERNAL MODULE: ./src/handlers/getResultsByPage.tsx
var getResultsByPage = __webpack_require__(8750);
;// CONCATENATED MODULE: ./src/handlers/getHomePageData.tsx



const getHomePageData = async ()=>{
    try {
        const defaultMoviesData = await (0,getResultsByPage/* getResultsByPage */.Z)(linksToFetch/* URL_TO_SEARCH_LIST_ITEMS */.bD.replace("{type}", constants_enum/* UserCollections */.zS.movie), 1);
        const upcomingMoviesData = await (0,getResultsByPage/* getResultsByPage */.Z)(linksToFetch/* URL_TO_FETCH_UPCOMING_MOVIE_LIST */.ao, 1);
        return {
            defaultMoviesData,
            upcomingMoviesData
        };
    } catch (error) {
        throw error;
    }
};

;// CONCATENATED MODULE: ./src/pages/index.tsx












const HomePage = ({ homePageProps })=>{
    const { showModal } = (0,ModalProvider/* useModal */.d)();
    const defaultUrlToSearchItems = linksToFetch/* URL_TO_SEARCH */.Zh.replace("{fieldName}", "multi");
    const defaultUrlToFetchItems = linksToFetch/* URL_TO_SEARCH_LIST_ITEMS */.bD.replace("{type}", constants_enum/* UserCollections */.zS.movie);
    const [defaultMovieList, setDefaultMovieList] = (0,external_react_.useState)(null);
    const [upcomingMovieList, setUpcomingMovieList] = (0,external_react_.useState)(null);
    const [urlToFetch, setUrlToFetch] = (0,external_react_.useState)(defaultUrlToFetchItems);
    const searchQuery = new URL(urlToFetch).searchParams.get("query");
    const isDefaultListPresented = urlToFetch.includes(defaultUrlToFetchItems);
    const listTitle = isDefaultListPresented ? "Popular movies" : `Search results for '${searchQuery}'`;
    const collectionType = isDefaultListPresented ? constants_enum/* UserCollections */.zS.movie : constants_enum/* UserCollections */.zS.basic;
    (0,external_react_.useEffect)(()=>{
        if (homePageProps) {
            setDefaultMovieList(homePageProps.defaultMovies);
            setUpcomingMovieList(homePageProps.upcomingMovies);
        } else getHomePageData().then((data)=>{
            setDefaultMovieList(data.defaultMoviesData);
            setUpcomingMovieList(data.upcomingMoviesData);
        }).catch(()=>{
            (0,handleModals/* showErrorNotification */.s9)(showModal, "An error has occurred");
            setDefaultMovieList({
                items: [],
                isMoreDataAvailable: false
            });
            setUpcomingMovieList({
                items: [],
                isMoreDataAvailable: false
            });
        });
    }, [
        homePageProps
    ]);
    if (!defaultMovieList || !upcomingMovieList) return /*#__PURE__*/ jsx_runtime.jsx(Loader/* default */.Z, {
        className: "bg-transparent"
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(components_HomePageSlider, {
                itemsList: upcomingMovieList
            }),
            /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                children: listTitle
            }),
            /*#__PURE__*/ jsx_runtime.jsx(Search/* default */.Z, {
                collectionType: constants_enum/* UserCollections */.zS.movie,
                name: "defaultSearch",
                label: "Search for movie, TV show or person",
                urlToFetch: defaultUrlToSearchItems,
                defaultUrlToFetch: defaultUrlToFetchItems,
                onSearch: setUrlToFetch,
                isSearchFieldWrapped: true,
                isSearchApplied: !isDefaultListPresented
            }),
            /*#__PURE__*/ jsx_runtime.jsx(ItemsListWrap/* default */.Z, {
                itemsList: defaultMovieList.items,
                collectionType: collectionType,
                isMoreDataAvailable: defaultMovieList.isMoreDataAvailable,
                urlToFetchItems: urlToFetch,
                isFilterable: true
            })
        ]
    });
};
const getServerSideProps = async ()=>{
    return getHomePageData().then((data)=>{
        return {
            props: {
                homePageProps: {
                    defaultMovies: data.defaultMoviesData,
                    upcomingMovies: data.upcomingMoviesData
                }
            }
        };
    }).catch(()=>{
        return {
            props: {
                homePageProps: null
            }
        };
    });
};
/* harmony default export */ const pages = (HomePage);

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F&preferredRegion=&absolutePagePath=private-next-pages%2Findex.tsx&absoluteAppPath=private-next-pages%2F_app.tsx&absoluteDocumentPath=private-next-pages%2F_document.tsx&middlewareConfigBase64=e30%3D!
// @ts-ignore this need to be imported from next/dist to be external



// Import the app and document modules.
// @ts-expect-error - replaced by webpack/turbopack loader

// @ts-expect-error - replaced by webpack/turbopack loader

// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

const PagesRouteModule = pages_module.PagesRouteModule;
// Re-export the component (should be the default export).
/* harmony default export */ const next_route_loaderkind_PAGES_page_2F_preferredRegion_absolutePagePath_private_next_pages_2Findex_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(pages_namespaceObject, "default"));
// Re-export methods.
const getStaticProps = (0,helpers/* hoist */.l)(pages_namespaceObject, "getStaticProps");
const getStaticPaths = (0,helpers/* hoist */.l)(pages_namespaceObject, "getStaticPaths");
const next_route_loaderkind_PAGES_page_2F_preferredRegion_absolutePagePath_private_next_pages_2Findex_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_getServerSideProps = (0,helpers/* hoist */.l)(pages_namespaceObject, "getServerSideProps");
const config = (0,helpers/* hoist */.l)(pages_namespaceObject, "config");
const reportWebVitals = (0,helpers/* hoist */.l)(pages_namespaceObject, "reportWebVitals");
// Re-export legacy methods.
const unstable_getStaticProps = (0,helpers/* hoist */.l)(pages_namespaceObject, "unstable_getStaticProps");
const unstable_getStaticPaths = (0,helpers/* hoist */.l)(pages_namespaceObject, "unstable_getStaticPaths");
const unstable_getStaticParams = (0,helpers/* hoist */.l)(pages_namespaceObject, "unstable_getStaticParams");
const unstable_getServerProps = (0,helpers/* hoist */.l)(pages_namespaceObject, "unstable_getServerProps");
const unstable_getServerSideProps = (0,helpers/* hoist */.l)(pages_namespaceObject, "unstable_getServerSideProps");
// Create and export the route module that will be consumed.
const routeModule = new PagesRouteModule({
    definition: {
        kind: route_kind/* RouteKind */.x.PAGES,
        page: "/index",
        pathname: "/",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    components: {
        App: _app["default"],
        Document: _document["default"]
    },
    userland: pages_namespaceObject
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
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [604,812,567,858,54,620,318,688], () => (__webpack_exec__(7674)));
module.exports = __webpack_exports__;

})();