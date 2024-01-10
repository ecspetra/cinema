"use strict";
(() => {
var exports = {};
exports.id = 297;
exports.ids = [297];
exports.modules = {

/***/ 1137:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ next_route_loaderkind_PAGES_page_2Fcollection_2F_5Btype_5D_preferredRegion_absolutePagePath_private_next_pages_2Fcollection_2F_5Btype_5D_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_config),
  "default": () => (/* binding */ next_route_loaderkind_PAGES_page_2Fcollection_2F_5Btype_5D_preferredRegion_absolutePagePath_private_next_pages_2Fcollection_2F_5Btype_5D_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_),
  getServerSideProps: () => (/* binding */ next_route_loaderkind_PAGES_page_2Fcollection_2F_5Btype_5D_preferredRegion_absolutePagePath_private_next_pages_2Fcollection_2F_5Btype_5D_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_getServerSideProps),
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

// NAMESPACE OBJECT: ./src/pages/collection/[type].tsx
var _type_namespaceObject = {};
__webpack_require__.r(_type_namespaceObject);
__webpack_require__.d(_type_namespaceObject, {
  "default": () => (_type_),
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
// EXTERNAL MODULE: ./src/handlers/handleCookies.tsx
var handleCookies = __webpack_require__(5648);
// EXTERNAL MODULE: ./src/components/List/ItemsListWrap/ItemsList/ItemCard/index.tsx + 1 modules
var ItemCard = __webpack_require__(5311);
// EXTERNAL MODULE: ./src/app/components/UI/Button/index.tsx
var Button = __webpack_require__(7458);
// EXTERNAL MODULE: ./src/app/components/UI/Title/Title.tsx
var Title = __webpack_require__(9457);
// EXTERNAL MODULE: ./src/components/Loader/index.tsx
var Loader = __webpack_require__(3616);
// EXTERNAL MODULE: ./src/components/List/EmptyList/index.tsx
var EmptyList = __webpack_require__(5513);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/context/AuthProvider.tsx + 1 modules
var AuthProvider = __webpack_require__(7459);
// EXTERNAL MODULE: ./src/firebase/handlers/userCollectionHandlers/getCollectionItemsList.tsx + 2 modules
var getCollectionItemsList = __webpack_require__(9);
// EXTERNAL MODULE: external "firebase/database"
var database_ = __webpack_require__(6666);
// EXTERNAL MODULE: ./src/firebase/config.ts
var config = __webpack_require__(6855);
;// CONCATENATED MODULE: ./src/firebase/handlers/userCollectionHandlers/specificCollectionListener.tsx


const specificCollectionListener = (userId, collectionConfig)=>{
    const { collectionType, oldItems, setItems, setIsMoreDataAvailable } = collectionConfig;
    const specificCollectionPath = `users/${userId}/collection/${collectionType}`;
    const specificCollectionRef = (0,database_.ref)(config/* database */.F, specificCollectionPath);
    const getAllItemsFromSpecificCollection = ()=>{
        return new Promise(async (resolve)=>{
            (0,database_.get)(specificCollectionRef).then((snapshot)=>{
                let specificCollectionItems = [];
                if (snapshot.exists()) {
                    snapshot.forEach((childSnapshot)=>{
                        specificCollectionItems.push(childSnapshot.val());
                    });
                }
                resolve(specificCollectionItems);
            });
        });
    };
    const onItemRemoved = async (childSnapshot)=>{
        const removedItem = childSnapshot.val();
        const allItemsFromSpecificCollection = await getAllItemsFromSpecificCollection();
        const totalItemsFromSpecificCollectionLength = allItemsFromSpecificCollection.length;
        const oldItemsLength = oldItems.length;
        const newItems = oldItems.filter((existingItem)=>existingItem.id !== removedItem.id);
        setItems(newItems);
        setIsMoreDataAvailable(totalItemsFromSpecificCollectionLength > oldItemsLength);
    };
    const unsubscribeItemRemoved = (0,database_.onChildRemoved)(specificCollectionRef, onItemRemoved);
    return ()=>{
        unsubscribeItemRemoved();
    };
};

;// CONCATENATED MODULE: ./src/components/Collection/hooks/useSpecificCollectionItemsList.tsx




const useSpecificCollectionItemsList = (items, collectionConfig)=>{
    const { isMoreDataAvailable, collectionType } = collectionConfig;
    const [isFirstRender, setIsFirstRender] = (0,external_react_.useState)(true);
    const [isLoading, setIsLoading] = (0,external_react_.useState)(false);
    const [lastItemId, setLastItemId] = (0,external_react_.useState)(undefined);
    const [itemsToShow, setItemsToShow] = (0,external_react_.useState)([]);
    const [isShowMoreButton, setIsShowMoreButton] = (0,external_react_.useState)(false);
    const { userId } = (0,AuthProvider/* useAuth */.a)();
    const showMore = ()=>{
        setLastItemId(itemsToShow[itemsToShow.length - 1].id.toString());
    };
    const getMoreCollectionItems = async ()=>{
        setIsLoading(true);
        const result = await (0,getCollectionItemsList/* getCollectionItemsList */.n)(userId, collectionType, 20, lastItemId);
        setItemsToShow((prevState)=>[
                ...prevState,
                ...result.items
            ]);
        setIsShowMoreButton(result.isMoreDataAvailable);
        setIsLoading(false);
        setLastItemId(undefined);
    };
    (0,external_react_.useEffect)(()=>{
        const collectionConfig = {
            collectionType,
            oldItems: itemsToShow,
            setItems: setItemsToShow,
            setIsMoreDataAvailable: setIsShowMoreButton
        };
        const unsubscribe = specificCollectionListener(userId, collectionConfig);
        return ()=>{
            unsubscribe();
        };
    }, [
        itemsToShow
    ]);
    (0,external_react_.useEffect)(()=>{
        if (lastItemId || !itemsToShow.length && isShowMoreButton && !isFirstRender) {
            getMoreCollectionItems();
        }
    }, [
        lastItemId,
        itemsToShow,
        isShowMoreButton
    ]);
    (0,external_react_.useEffect)(()=>{
        setItemsToShow(items);
        setTimeout(()=>{
            setIsShowMoreButton(isMoreDataAvailable);
        }, 1500);
        setIsFirstRender(false);
    }, [
        items
    ]);
    return {
        isShowMoreButton,
        isLoading,
        itemsToShow,
        showMore
    };
};
/* harmony default export */ const hooks_useSpecificCollectionItemsList = (useSpecificCollectionItemsList);

;// CONCATENATED MODULE: ./src/components/Collection/SpecificCollectionItemsList/index.tsx







const SpecificCollectionItemsList = ({ collectionType, items, isMoreDataAvailable, title })=>{
    const collectionConfig = {
        isMoreDataAvailable,
        collectionType
    };
    const { isShowMoreButton, isLoading, itemsToShow, showMore } = hooks_useSpecificCollectionItemsList(items, collectionConfig);
    if (!itemsToShow.length) {
        return /*#__PURE__*/ jsx_runtime.jsx(EmptyList/* default */.Z, {
            title: title
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "mb-16",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                children: title
            }),
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: "grid grid-cols-[repeat(auto-fill,232px)] gap-x-5 justify-center",
                children: itemsToShow.map((item)=>{
                    return /*#__PURE__*/ jsx_runtime.jsx(ItemCard/* default */.Z, {
                        item: item,
                        collectionType: collectionType,
                        isCollectionListItem: true
                    }, item.id);
                })
            }),
            isLoading && /*#__PURE__*/ jsx_runtime.jsx(Loader/* default */.Z, {
                type: "static"
            }),
            itemsToShow.length > 0 && isShowMoreButton && /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                className: "mx-auto",
                context: "empty",
                onClick: showMore,
                children: "Show more"
            })
        ]
    });
};
/* harmony default export */ const Collection_SpecificCollectionItemsList = (SpecificCollectionItemsList);

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./src/components/TopBanner/index.tsx + 2 modules
var TopBanner = __webpack_require__(9019);
// EXTERNAL MODULE: ./src/constants/images.ts
var constants_images = __webpack_require__(8989);
// EXTERNAL MODULE: ./src/constants/enum.ts
var constants_enum = __webpack_require__(4259);
// EXTERNAL MODULE: ./src/constants/paths.ts
var paths = __webpack_require__(6949);
;// CONCATENATED MODULE: ./src/handlers/getSpecificCollectionPage.tsx


const getSpecificCollectionPage = async (userIdFromUrl, collectionType, userId, redirect)=>{
    const areBothIdsNotPresented = !userId && !userIdFromUrl;
    if (areBothIdsNotPresented) {
        redirect("/404");
    }
    const isOneOfIdsNotPresented = !userId || !userIdFromUrl;
    const areUserIdsPresentedButDifferent = userId && userIdFromUrl && userId !== userIdFromUrl;
    const isRedirectToGeneralCollectionPage = areUserIdsPresentedButDifferent || isOneOfIdsNotPresented;
    if (isRedirectToGeneralCollectionPage) {
        redirect(paths/* CURRENT_USER_COLLECTION_PAGE */.A6.replace("{userId}", userId));
    }
    try {
        const collectionItemsList = await (0,getCollectionItemsList/* getCollectionItemsList */.n)(userIdFromUrl, collectionType, 20);
        const isEmptyCollectionTypePage = !collectionItemsList.items.length;
        if (isEmptyCollectionTypePage) {
            redirect(paths/* CURRENT_USER_COLLECTION_PAGE */.A6.replace("{userId}", userId));
        }
        return collectionItemsList;
    } catch (error) {
        return null;
    }
};

;// CONCATENATED MODULE: ./src/pages/collection/[type].tsx











const SpecificCollectionPage = ({ specificCollectionPageProps })=>{
    const [itemsList, setItemsList] = (0,external_react_.useState)(null);
    const router = (0,router_.useRouter)();
    const { userId } = (0,AuthProvider/* useAuth */.a)();
    const listTitle = router.query.type === constants_enum/* UserCollections */.zS.movie ? "Movies from your collection" : "Persons from your collection";
    const collectionType = router.query.type;
    (0,external_react_.useEffect)(()=>{
        const getCollectionItemsList = async ()=>{
            const userIdFromUrl = router.query.uid;
            const collectionItemsList = await getSpecificCollectionPage(userIdFromUrl, collectionType, userId, (url)=>{
                router.push(url);
            });
            setItemsList(collectionItemsList);
        };
        if (!specificCollectionPageProps) {
            getCollectionItemsList();
        } else setItemsList(specificCollectionPageProps);
    }, [
        specificCollectionPageProps
    ]);
    if (!itemsList) return /*#__PURE__*/ jsx_runtime.jsx(Loader/* default */.Z, {
        className: "bg-transparent"
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(TopBanner/* default */.Z, {
                imageSrc: constants_images/* COLLECTION_PAGE_TOP_BANNER_IMAGE */.dK
            }),
            /*#__PURE__*/ jsx_runtime.jsx(Collection_SpecificCollectionItemsList, {
                collectionType: collectionType,
                items: itemsList ? itemsList.items : [],
                isMoreDataAvailable: itemsList ? itemsList.isMoreDataAvailable : false,
                title: listTitle
            })
        ]
    });
};
const getServerSideProps = async (ctx)=>{
    const userIdFromUrl = ctx.query.uid;
    const collectionType = ctx.query.type;
    const cookies = await (0,handleCookies/* parseCookies */.jl)(ctx.req);
    const userId = cookies.uid;
    const collectionItemsList = await getSpecificCollectionPage(userIdFromUrl, collectionType, userId, (url)=>{
        ctx.res?.writeHead(302, {
            Location: url
        });
        ctx.res?.end();
    });
    return {
        props: {
            specificCollectionPageProps: collectionItemsList
        }
    };
};
/* harmony default export */ const _type_ = (SpecificCollectionPage);

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2Fcollection%2F%5Btype%5D&preferredRegion=&absolutePagePath=private-next-pages%2Fcollection%2F%5Btype%5D.tsx&absoluteAppPath=private-next-pages%2F_app.tsx&absoluteDocumentPath=private-next-pages%2F_document.tsx&middlewareConfigBase64=e30%3D!
// @ts-ignore this need to be imported from next/dist to be external



// Import the app and document modules.
// @ts-expect-error - replaced by webpack/turbopack loader

// @ts-expect-error - replaced by webpack/turbopack loader

// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

const PagesRouteModule = pages_module.PagesRouteModule;
// Re-export the component (should be the default export).
/* harmony default export */ const next_route_loaderkind_PAGES_page_2Fcollection_2F_5Btype_5D_preferredRegion_absolutePagePath_private_next_pages_2Fcollection_2F_5Btype_5D_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(_type_namespaceObject, "default"));
// Re-export methods.
const getStaticProps = (0,helpers/* hoist */.l)(_type_namespaceObject, "getStaticProps");
const getStaticPaths = (0,helpers/* hoist */.l)(_type_namespaceObject, "getStaticPaths");
const next_route_loaderkind_PAGES_page_2Fcollection_2F_5Btype_5D_preferredRegion_absolutePagePath_private_next_pages_2Fcollection_2F_5Btype_5D_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_getServerSideProps = (0,helpers/* hoist */.l)(_type_namespaceObject, "getServerSideProps");
const next_route_loaderkind_PAGES_page_2Fcollection_2F_5Btype_5D_preferredRegion_absolutePagePath_private_next_pages_2Fcollection_2F_5Btype_5D_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_config = (0,helpers/* hoist */.l)(_type_namespaceObject, "config");
const reportWebVitals = (0,helpers/* hoist */.l)(_type_namespaceObject, "reportWebVitals");
// Re-export legacy methods.
const unstable_getStaticProps = (0,helpers/* hoist */.l)(_type_namespaceObject, "unstable_getStaticProps");
const unstable_getStaticPaths = (0,helpers/* hoist */.l)(_type_namespaceObject, "unstable_getStaticPaths");
const unstable_getStaticParams = (0,helpers/* hoist */.l)(_type_namespaceObject, "unstable_getStaticParams");
const unstable_getServerProps = (0,helpers/* hoist */.l)(_type_namespaceObject, "unstable_getServerProps");
const unstable_getServerSideProps = (0,helpers/* hoist */.l)(_type_namespaceObject, "unstable_getServerSideProps");
// Create and export the route module that will be consumed.
const routeModule = new PagesRouteModule({
    definition: {
        kind: route_kind/* RouteKind */.x.PAGES,
        page: "/collection/[type]",
        pathname: "/collection/[type]",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    components: {
        App: _app["default"],
        Document: _document["default"]
    },
    userland: _type_namespaceObject
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
var __webpack_exports__ = __webpack_require__.X(0, [604,812,567,858,54,9], () => (__webpack_exec__(1137)));
module.exports = __webpack_exports__;

})();