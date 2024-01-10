"use strict";
exports.id = 620;
exports.ids = [620];
exports.modules = {

/***/ 5620:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ ItemCard_ItemCardSmall)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/app/assets/images/default-movie-image.svg
var default_movie_image = __webpack_require__(3463);
// EXTERNAL MODULE: ./src/app/assets/images/default-user-image.svg
var default_user_image = __webpack_require__(3679);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./src/components/Images/Image/index.tsx + 1 modules
var Image = __webpack_require__(1686);
// EXTERNAL MODULE: ./src/handlers/fetchItemData.tsx
var fetchItemData = __webpack_require__(3940);
;// CONCATENATED MODULE: ./src/handlers/getCover.tsx

const getCover = async (itemId, collectionType)=>{
    const result = await (0,fetchItemData/* fetchItemData */.R)(collectionType, itemId, "");
    return result.poster_path || result.profile_path;
};

// EXTERNAL MODULE: external "@fortawesome/free-solid-svg-icons"
var free_solid_svg_icons_ = __webpack_require__(6466);
// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__(7197);
// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(9003);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);
// EXTERNAL MODULE: ./src/constants/enum.ts
var constants_enum = __webpack_require__(4259);
// EXTERNAL MODULE: ./src/constants/images.ts
var constants_images = __webpack_require__(8989);
;// CONCATENATED MODULE: ./src/components/List/ItemsListWrap/ItemsList/ItemCard/ItemCardSmall/index.tsx












const ItemCardSmall = ({ itemId, collectionType, mark, isLinkToMovie = false, className = false })=>{
    const [itemCover, setItemCover] = (0,external_react_.useState)("");
    const imageFullSrc = itemCover ? constants_images/* CARD_IMAGE_SRC */.hm.replace("{imageSrc}", itemCover) : "";
    (0,external_react_.useEffect)(()=>{
        getCover(itemId, collectionType).then((data)=>{
            setItemCover(data);
        });
    }, []);
    const itemCard = /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(Image/* default */.Z, {
                className: "duration-300 mb-4 border-4",
                src: imageFullSrc,
                defaultImage: collectionType !== constants_enum/* UserCollections */.zS.person ? default_movie_image/* default */.Z : default_user_image/* default */.Z
            }),
            mark && /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                className: "flex justify-center items-center",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                        icon: free_solid_svg_icons_.faStar,
                        className: "text-rose-500"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("span", {
                        className: "ml-1 font-semibold",
                        children: mark
                    })
                ]
            })
        ]
    });
    return /*#__PURE__*/ jsx_runtime.jsx("span", {
        className: external_classnames_default()(!mark && "w-24 h-36", "flex-none", className),
        children: isLinkToMovie ? /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
            href: `/${collectionType}/[id]`,
            as: `/${collectionType}/${itemId}`,
            children: itemCard
        }) : itemCard
    });
};
/* harmony default export */ const ItemCard_ItemCardSmall = (ItemCardSmall);


/***/ })

};
;