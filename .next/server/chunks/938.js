"use strict";
exports.id = 938;
exports.ids = [938];
exports.modules = {

/***/ 8938:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ Details_DetailsList)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__(7197);
// EXTERNAL MODULE: external "@fortawesome/free-solid-svg-icons"
var free_solid_svg_icons_ = __webpack_require__(6466);
// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__(2245);
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);
;// CONCATENATED MODULE: ./src/components/Details/handlers/getDetailsItemText.tsx


const getDetailsItemText = (text, type = "date")=>{
    let itemText;
    const emptyText = "No info yet";
    switch(type){
        case "date":
            return itemText = text ? external_moment_default()(text).format("Do MMM YYYY") : emptyText;
        case "array":
            return itemText = Array.isArray(text) && text.length > 0 ? text.map((item, idx)=>{
                return /*#__PURE__*/ jsx_runtime.jsx("span", {
                    className: "mr-1",
                    children: idx === text.length - 1 ? item.name : item.name + ","
                }, item.name);
            }) : emptyText;
        case "text":
            itemText = text ? text : emptyText;
    }
    return itemText;
};

;// CONCATENATED MODULE: ./src/components/Details/DetailsList/DetailsItem/index.tsx




const DetailsItem = ({ item })=>{
    const { type, title, text } = item;
    const getDetailsItem = ()=>{
        switch(type){
            case "release_date":
            case "first_air_date":
                return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                            className: "mr-1.5",
                            icon: free_solid_svg_icons_.faCalendarCheck
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                            className: "mr-1.5 font-semibold",
                            children: title
                        }),
                        getDetailsItemText(text)
                    ]
                });
            case "production_countries":
            case "production_companies":
                return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                            className: "mr-1.5",
                            icon: type === "production_companies" ? free_solid_svg_icons_.faBolt : free_solid_svg_icons_.faFlag
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                            className: "mr-1.5 font-semibold",
                            children: title
                        }),
                        getDetailsItemText(text, "array")
                    ]
                });
            case "place_of_birth":
            case "user_country":
                return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                            className: "mr-1.5",
                            icon: free_solid_svg_icons_.faFlag
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                            className: "mr-1.5 font-semibold",
                            children: title
                        }),
                        getDetailsItemText(text, "text")
                    ]
                });
            case "birthday":
                if (typeof title !== "string" && typeof text !== "string") {
                    const birthdayText = getDetailsItemText(text.birthday);
                    const deathdayText = text.deathday && getDetailsItemText(text.deathday);
                    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                                className: "mr-1.5",
                                icon: free_solid_svg_icons_.faCalendarCheck
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("span", {
                                className: "mr-1.5 font-semibold",
                                children: title.birthday
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("span", {
                                children: birthdayText
                            }),
                            text.deathday && /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                        className: "mr-1.5 font-semibold",
                                        children: [
                                            "\xa0",
                                            `— ${title.deathday} `
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("span", {
                                        children: deathdayText
                                    })
                                ]
                            })
                        ]
                    });
                }
            case "user_email":
                return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                            className: "mr-1.5",
                            icon: free_solid_svg_icons_.faAt
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                            className: "mr-1.5 font-semibold",
                            children: title
                        }),
                        getDetailsItemText(text, "text")
                    ]
                });
            case "gender":
                return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                            className: "mr-1.5",
                            icon: free_solid_svg_icons_.faUser
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                            className: "mr-1.5 font-semibold",
                            children: title
                        }),
                        getDetailsItemText(text, "text")
                    ]
                });
            case "user_date_of_birth":
                return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                            className: "mr-1.5",
                            icon: free_solid_svg_icons_.faCalendarCheck
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                            className: "mr-1.5 font-semibold",
                            children: title
                        }),
                        getDetailsItemText(text)
                    ]
                });
        }
    };
    return /*#__PURE__*/ jsx_runtime.jsx("div", {
        className: "flex items-center flex-wrap text-sm mb-1",
        children: getDetailsItem()
    });
};
/* harmony default export */ const DetailsList_DetailsItem = (DetailsItem);

// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(9003);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);
;// CONCATENATED MODULE: ./src/components/Details/DetailsList/index.tsx



const DetailsList = ({ itemsList, className })=>{
    return /*#__PURE__*/ jsx_runtime.jsx("div", {
        className: external_classnames_default()("mb-5", className),
        children: itemsList.map((item)=>{
            return /*#__PURE__*/ jsx_runtime.jsx(DetailsList_DetailsItem, {
                item: item
            }, item.title);
        })
    });
};
/* harmony default export */ const Details_DetailsList = (DetailsList);


/***/ })

};
;