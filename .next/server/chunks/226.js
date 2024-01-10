"use strict";
exports.id = 226;
exports.ids = [226];
exports.modules = {

/***/ 1226:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ Tag_TagList)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./src/components/Tag/index.tsx
var Tag = __webpack_require__(6778);
// EXTERNAL MODULE: ./src/app/components/UI/Title/Title.tsx
var Title = __webpack_require__(9457);
// EXTERNAL MODULE: ./src/components/List/EmptyList/index.tsx
var EmptyList = __webpack_require__(5513);
// EXTERNAL MODULE: ./src/app/components/UI/Button/index.tsx
var Button = __webpack_require__(7458);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/context/ModalProvider.tsx
var ModalProvider = __webpack_require__(4858);
// EXTERNAL MODULE: ./src/firebase/config.ts
var config = __webpack_require__(6855);
// EXTERNAL MODULE: ./src/firebase/handlers/profileHandlers/updateUserInStorage.tsx
var updateUserInStorage = __webpack_require__(6798);
;// CONCATENATED MODULE: ./src/firebase/handlers/profileHandlers/updateUserProfileGenres.tsx


const updateUserProfileGenres = async (newGenres)=>{
    const currentUser = config/* auth */.I.currentUser;
    const currentUserId = currentUser?.uid;
    const updatedFields = {
        favoriteGenres: newGenres
    };
    await (0,updateUserInStorage/* updateUserInStorage */.c)(updatedFields, currentUserId);
};

// EXTERNAL MODULE: ./src/handlers/handleModals.tsx
var handleModals = __webpack_require__(1168);
// EXTERNAL MODULE: ./src/handlers/getAllGenres.tsx
var getAllGenres = __webpack_require__(3663);
;// CONCATENATED MODULE: ./src/components/Tag/hooks/useTagList.tsx





const useTagList = (tags, tagListConfig)=>{
    const { onFormClose, isEditTags } = tagListConfig;
    const [itemsList, setItemsList] = (0,external_react_.useState)([]);
    const [selectedTags, setSelectedTags] = (0,external_react_.useState)(tags);
    const { showModal } = (0,ModalProvider/* useModal */.d)();
    const toggleTag = (tag, isChecked)=>{
        if (isChecked) {
            setSelectedTags((prevState)=>prevState.filter((item)=>item.name !== tag.name));
        } else {
            setSelectedTags((prevState)=>[
                    ...prevState,
                    tag
                ]);
        }
    };
    const checkIfTagIsSelected = (tagName)=>{
        if (tags && tags.find((item)=>item.name === tagName)) {
            return true;
        }
    };
    const closeEditTagsForm = ()=>{
        onFormClose && onFormClose(false);
    };
    const saveChanges = async ()=>{
        await updateUserProfileGenres(selectedTags).then(()=>{
            closeEditTagsForm();
            (0,handleModals/* showSuccessNotification */.LX)(showModal, "Your profile was successfully updated");
        });
    };
    (0,external_react_.useEffect)(()=>{
        if (isEditTags) {
            const getTags = async ()=>{
                const allTags = await (0,getAllGenres/* getAllGenres */.K)("all");
                setItemsList(allTags);
            };
            getTags();
        } else {
            setItemsList(tags);
        }
    }, [
        isEditTags
    ]);
    return {
        itemsList,
        toggleTag,
        saveChanges,
        closeEditTagsForm,
        checkIfTagIsSelected
    };
};
/* harmony default export */ const hooks_useTagList = (useTagList);

;// CONCATENATED MODULE: ./src/components/Tag/TagList/index.tsx






const TagList = ({ tags, title = "", className, isEditTags = false, onFormClose })=>{
    const tagListConfig = {
        onFormClose,
        isEditTags
    };
    const { itemsList, toggleTag, saveChanges, closeEditTagsForm, checkIfTagIsSelected } = hooks_useTagList(tags, tagListConfig);
    if (!itemsList.length) return /*#__PURE__*/ jsx_runtime.jsx(EmptyList/* default */.Z, {
        title: title,
        variant: "h3",
        text: "No genres yet",
        className: className
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: className,
        children: [
            title && /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                variant: "h3",
                children: title
            }),
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: "flex flex-wrap justify-start items-start",
                children: itemsList.map((item)=>{
                    return /*#__PURE__*/ jsx_runtime.jsx(Tag/* default */.Z, {
                        tag: item,
                        isEdit: isEditTags,
                        isSelected: checkIfTagIsSelected(item.name),
                        onToggle: toggleTag
                    }, item.name);
                })
            }),
            isEditTags && /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "w-full flex justify-start items-center gap-2 mt-5",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                        onClick: saveChanges,
                        children: "Save"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                        context: "filledDark",
                        onClick: closeEditTagsForm,
                        children: "Cancel"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const Tag_TagList = (TagList);


/***/ }),

/***/ 6798:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ updateUserInStorage)
/* harmony export */ });
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6666);
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_database__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _firebase_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6855);


const updateUserInStorage = async (updatedFields, userId)=>{
    const userToUpdatePath = `users/${userId}/info`;
    const userToUpdateRef = (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(_firebase_config__WEBPACK_IMPORTED_MODULE_1__/* .database */ .F, userToUpdatePath);
    const oldUserInfo = (await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.get)(userToUpdateRef)).val();
    const updatedUserData = {
        ...oldUserInfo,
        ...updatedFields
    };
    await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.set)(userToUpdateRef, updatedUserData);
};


/***/ })

};
;