"use strict";
exports.id = 908;
exports.ids = [908];
exports.modules = {

/***/ 5122:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _app_components_UI_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7458);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7197);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__);



const DropdownItem = ({ label, icon, onClick, closeList })=>{
    const onChoseDropdownItem = (event)=>{
        onClick(event);
        closeList && closeList();
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_app_components_UI_Button__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
        context: "icon-text",
        className: "w-full text-left",
        onClick: onChoseDropdownItem,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
                icon: icon,
                className: "mr-2"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                children: label
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownItem);


/***/ }),

/***/ 4735:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_components_UI_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7458);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7197);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6466);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4466);
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_transition_group__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9003);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_6__);







const Dropdown = ({ children, icon = "dots", className })=>{
    const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const toggleList = ()=>{
        setIsOpen(!isOpen);
    };
    const closeList = ()=>{
        setIsOpen(false);
    };
    const childrenWithProps = react__WEBPACK_IMPORTED_MODULE_1__.Children.map(children, (child)=>{
        if (/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.isValidElement)(child)) {
            return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.cloneElement)(child, {
                closeList
            });
        }
        return child;
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
        className: classnames__WEBPACK_IMPORTED_MODULE_6___default()("absolute top-2 right-2 md:top-4 md:right-4", className),
        onMouseLeave: closeList,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_UI_Button__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                className: "!absolute top-0 right-0",
                context: "icon",
                onClick: toggleList,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__.FontAwesomeIcon, {
                    icon: icon === "settings" ? _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__.faGear : _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__.faEllipsisVertical,
                    className: "w-6 h-6"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_transition_group__WEBPACK_IMPORTED_MODULE_5__.CSSTransition, {
                in: isOpen,
                timeout: 300,
                classNames: "dropdown",
                unmountOnExit: true,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "w-52 relative right-0 pt-14 block z-50",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "w-full p-2 rounded-md bg-gray-600 block",
                        children: childrenWithProps
                    })
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dropdown);


/***/ }),

/***/ 8728:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _app_components_UI_Error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3554);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9003);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);



const Textarea = ({ onChange, value, error, placeholder = "Enter text...", className })=>{
    const onTextareaContentChange = (event)=>{
        const newValue = event.target.value;
        onChange(newValue);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                value: value,
                onChange: onTextareaContentChange,
                onClick: (event)=>event.preventDefault(),
                rows: 6,
                className: classnames__WEBPACK_IMPORTED_MODULE_2___default()("w-full bg-transparent p-4 border border-gray-500 hover:border-white duration-300 resize-none outline-none block", className, error && "!border-rose-600"),
                placeholder: placeholder
            }),
            error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_UI_Error__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                className: "self-start",
                error: error
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Textarea);


/***/ }),

/***/ 6868:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ Form_NewReviewForm)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/app/components/UI/Input/Textarea/index.tsx
var Textarea = __webpack_require__(8728);
// EXTERNAL MODULE: ./src/app/components/UI/Title/Title.tsx
var Title = __webpack_require__(9457);
// EXTERNAL MODULE: ./src/app/components/UI/Button/index.tsx
var Button = __webpack_require__(7458);
// EXTERNAL MODULE: external "@firebase/util"
var util_ = __webpack_require__(5260);
// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__(2245);
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);
// EXTERNAL MODULE: ./src/handlers/handleModals.tsx
var handleModals = __webpack_require__(1168);
// EXTERNAL MODULE: ./src/context/ModalProvider.tsx
var ModalProvider = __webpack_require__(4858);
// EXTERNAL MODULE: ./src/constants/errorMessages.ts
var errorMessages = __webpack_require__(3514);
// EXTERNAL MODULE: ./src/components/Loader/index.tsx
var Loader = __webpack_require__(3616);
// EXTERNAL MODULE: ./src/constants/enum.ts
var constants_enum = __webpack_require__(4259);
// EXTERNAL MODULE: external "firebase/database"
var database_ = __webpack_require__(6666);
// EXTERNAL MODULE: ./src/firebase/config.ts
var config = __webpack_require__(6855);
;// CONCATENATED MODULE: ./src/firebase/handlers/reviewAndReplyHandlers/createReviewOrReply.tsx


const createReviewOrReply = async (userId, itemConfig)=>{
    const { newItem, reviewedItemId, collectionType, reviewedItemCollectionType } = itemConfig;
    const collectionPathForReviewOrReply = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${newItem.id}`;
    const generalCollectionPathForReviewOrReply = `${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${newItem.id}`;
    const collectionRefForReviewOrReply = (0,database_.ref)(config/* database */.F, collectionPathForReviewOrReply);
    const generalCollectionRefForReviewOrReply = (0,database_.ref)(config/* database */.F, generalCollectionPathForReviewOrReply);
    await (0,database_.set)(collectionRefForReviewOrReply, newItem);
    await (0,database_.set)(generalCollectionRefForReviewOrReply, newItem);
};

;// CONCATENATED MODULE: ./src/components/Review/Form/NewReviewForm/index.tsx













const NewReviewForm = ({ reviewedItemId, reviewedItemCollectionType, userId, reviewAuthorId, reviewId, replyToUser, isReplyItem = false, onFormClose })=>{
    const [isLoading, setIsLoading] = (0,external_react_.useState)(false);
    const [textareaValue, setTextareaValue] = (0,external_react_.useState)("");
    const [error, setError] = (0,external_react_.useState)("");
    const { showModal } = (0,ModalProvider/* useModal */.d)();
    const buttonText = isLoading ? /*#__PURE__*/ jsx_runtime.jsx(Loader/* default */.Z, {
        type: "static"
    }) : /*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
        children: `${isReplyItem ? "Submit reply" : "Submit review"}`
    });
    const handleTextareaChange = (newValue)=>{
        setTextareaValue(newValue);
        setError("");
    };
    const handleCloseForm = ()=>{
        onFormClose && onFormClose(false);
    };
    const handleSubmit = async (event)=>{
        event.preventDefault();
        setIsLoading(true);
        if (textareaValue.trim() !== "") {
            if (userId) {
                setError("");
                let newItem;
                if (isReplyItem) {
                    newItem = {
                        ...reviewAuthorId !== undefined && {
                            reviewAuthorId: reviewAuthorId
                        },
                        reviewedItemId: reviewedItemId,
                        replyToUser: replyToUser,
                        reviewId: reviewId,
                        id: (0,util_.uuidv4)(),
                        content: textareaValue,
                        created_at: external_moment_default()().format(),
                        authorId: userId,
                        reviewedItemCollectionType: reviewedItemCollectionType
                    };
                } else {
                    newItem = {
                        reviewedItemId: reviewedItemId,
                        id: (0,util_.uuidv4)(),
                        content: textareaValue,
                        created_at: external_moment_default()().format(),
                        authorId: userId,
                        reviewedItemCollectionType: reviewedItemCollectionType
                    };
                }
                const itemConfig = {
                    newItem,
                    reviewedItemId,
                    collectionType: isReplyItem ? constants_enum/* UserCollections */.zS.replies : constants_enum/* UserCollections */.zS.reviews,
                    reviewedItemCollectionType
                };
                await createReviewOrReply(userId, itemConfig);
                setTextareaValue("");
                if (isReplyItem) handleCloseForm();
            } else (0,handleModals/* openLoginModal */.Mo)(showModal);
        } else {
            setError(errorMessages/* ERROR_MESSAGES */.R.REQUIRED_FIELD);
        }
        setIsLoading(false);
    };
    (0,external_react_.useEffect)(()=>{
        setTextareaValue("");
        setError("");
    }, [
        reviewedItemId
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            isReplyItem ? /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                variant: "h3",
                className: "mt-8",
                children: `Leave your reply to ${replyToUser}`
            }) : /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                children: "Leave your review"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("form", {
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(Textarea/* default */.Z, {
                        onChange: handleTextareaChange,
                        value: textareaValue,
                        error: error
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                        className: "mt-8 flex justify-start items-center",
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                                onClick: handleSubmit,
                                children: buttonText
                            }),
                            isReplyItem && /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                                context: "filledDark",
                                className: "ml-2",
                                onClick: handleCloseForm,
                                children: "Cancel"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const Form_NewReviewForm = (NewReviewForm);


/***/ }),

/***/ 908:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ Review_ReviewList)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./src/app/components/UI/Title/Title.tsx
var Title = __webpack_require__(9457);
// EXTERNAL MODULE: ./src/app/components/UI/Button/index.tsx
var Button = __webpack_require__(7458);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__(2245);
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);
// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(9003);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);
// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__(7197);
// EXTERNAL MODULE: external "@fortawesome/free-solid-svg-icons"
var free_solid_svg_icons_ = __webpack_require__(6466);
;// CONCATENATED MODULE: ./src/components/Review/ReviewList/ReviewCard/ReviewActions/ReviewActionButton/index.tsx





const ReviewActionButton = ({ title, action, onClick, counter, isCurrentUserReaction })=>{
    const iconClassNames = "mr-1";
    const getButtonIcon = ()=>{
        switch(action){
            case "like":
                return /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                    icon: free_solid_svg_icons_.faThumbsUp,
                    className: iconClassNames
                });
            case "dislike":
                return /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                    icon: free_solid_svg_icons_.faThumbsUp,
                    className: external_classnames_default()(iconClassNames, "rotate-180")
                });
            case "reply":
                return /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                    icon: free_solid_svg_icons_.faThumbsUp,
                    className: iconClassNames
                });
        }
    };
    return /*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(Button/* default */.Z, {
            className: external_classnames_default()("mr-2", isCurrentUserReaction && "text-rose-500 !bg-rose-900/30"),
            context: "icon-text",
            onClick: onClick,
            children: [
                getButtonIcon(),
                title,
                /*#__PURE__*/ jsx_runtime.jsx("span", {
                    className: "ml-1",
                    children: counter
                })
            ]
        })
    });
};
/* harmony default export */ const ReviewActions_ReviewActionButton = (ReviewActionButton);

// EXTERNAL MODULE: ./src/handlers/handleModals.tsx
var handleModals = __webpack_require__(1168);
// EXTERNAL MODULE: ./src/context/ModalProvider.tsx
var ModalProvider = __webpack_require__(4858);
// EXTERNAL MODULE: external "firebase/database"
var database_ = __webpack_require__(6666);
// EXTERNAL MODULE: ./src/firebase/config.ts
var config = __webpack_require__(6855);
;// CONCATENATED MODULE: ./src/firebase/handlers/reviewAndReplyHandlers/getReviewOrReplyReactions.tsx


const getReviewOrReplyReactions = async (itemId, itemConfig)=>{
    const { reviewedItemId, collectionType, reviewedItemCollectionType } = itemConfig;
    const collectionPathForLikes = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${itemId}/likes/`;
    const collectionPathForDislikes = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${itemId}/dislikes/`;
    const collectionRefForLikes = (0,database_.ref)(config/* database */.F, collectionPathForLikes);
    const collectionRefForDislikes = (0,database_.ref)(config/* database */.F, collectionPathForDislikes);
    const getItemLikes = ()=>{
        return new Promise(async (resolve)=>{
            (0,database_.get)(collectionRefForLikes).then((snapshot)=>{
                let likesList = [];
                snapshot.forEach((childSnapshot)=>{
                    const like = {
                        key: childSnapshot.key,
                        data: childSnapshot.val()
                    };
                    likesList.push(like);
                });
                resolve(likesList);
            });
        });
    };
    const getItemDislikes = ()=>{
        return new Promise(async (resolve)=>{
            (0,database_.get)(collectionRefForDislikes).then((snapshot)=>{
                let dislikesList = [];
                snapshot.forEach((childSnapshot)=>{
                    const dislike = {
                        key: childSnapshot.key,
                        data: childSnapshot.val()
                    };
                    dislikesList.push(dislike);
                });
                resolve(dislikesList);
            });
        });
    };
    const likes = await getItemLikes();
    const dislikes = await getItemDislikes();
    return {
        likes,
        dislikes
    };
};

// EXTERNAL MODULE: external "@firebase/database"
var external_firebase_database_ = __webpack_require__(4960);
;// CONCATENATED MODULE: ./src/firebase/handlers/reactionHandlers/reviewOrReplyReactionsListener.tsx



const reviewOrReplyReactionsListener = (reviewId, reviewConfig)=>{
    const { reviewedItemId, collectionType, setReactions, reviewedItemCollectionType } = reviewConfig;
    const collectionPathForLikes = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${reviewId}/likes`;
    const collectionPathForDislikes = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${reviewId}/dislikes`;
    const collectionRefForLikes = (0,database_.ref)(config/* database */.F, collectionPathForLikes);
    const collectionRefForDislikes = (0,database_.ref)(config/* database */.F, collectionPathForDislikes);
    const likesList = [];
    const dislikesList = [];
    const unsubscribeLikes = (0,external_firebase_database_.onValue)(collectionRefForLikes, (snapshot)=>{
        likesList.length = 0;
        snapshot.forEach((childSnapshot)=>{
            likesList.push({
                key: childSnapshot.key,
                data: childSnapshot.val()
            });
        });
        setReactions((prevState)=>({
                likes: likesList,
                dislikes: prevState.dislikes
            }));
    });
    const unsubscribeDislikes = (0,external_firebase_database_.onValue)(collectionRefForDislikes, (snapshot)=>{
        dislikesList.length = 0;
        snapshot.forEach((childSnapshot)=>{
            dislikesList.push({
                key: childSnapshot.key,
                data: childSnapshot.val()
            });
        });
        setReactions((prevState)=>({
                likes: prevState.likes,
                dislikes: dislikesList
            }));
    });
    return ()=>{
        unsubscribeLikes();
        unsubscribeDislikes();
    };
};

;// CONCATENATED MODULE: ./src/firebase/handlers/reactionHandlers/removeReviewOrReplyReaction.tsx


const removeReviewOrReplyReaction = (userId, itemConfig)=>{
    const { reviewId, reviewedItemId, collectionType, reactionType, reviewedItemCollectionType } = itemConfig;
    const reactionId = userId;
    const collectionPathForUserReaction = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${reviewId}/${reactionType === "like" ? "dislikes" : "likes"}/${reactionId}`;
    const generalCollectionPathForUserReaction = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${reviewId}/${reactionType === "like" ? "dislikes" : "likes"}/${reactionId}`;
    const collectionRefForUserReaction = (0,database_.ref)(config/* database */.F, collectionPathForUserReaction);
    const generalCollectionRefForUserReaction = (0,database_.ref)(config/* database */.F, generalCollectionPathForUserReaction);
    return new Promise(async (resolve)=>{
        let isReactionRemovedFromCollection = false;
        (0,database_.remove)(collectionRefForUserReaction).then(()=>{
            (0,database_.remove)(generalCollectionRefForUserReaction).then(()=>{
                isReactionRemovedFromCollection = true;
            });
        });
        resolve(isReactionRemovedFromCollection);
    });
};

;// CONCATENATED MODULE: ./src/firebase/handlers/reactionHandlers/createNewReviewOrReplyReaction.tsx



const createNewReviewOrReplyReaction = async (userId, itemConfig)=>{
    const { reviewId, reviewedItemId, collectionType, reactionType, reviewedItemCollectionType } = itemConfig;
    const collectionPathForUserReaction = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${reviewId}/${reactionType === "like" ? "likes" : "dislikes"}/${userId}`;
    const generalCollectionPathForUserReaction = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${reviewId}/${reactionType === "like" ? "likes" : "dislikes"}/${userId}`;
    const collectionRefForUserReaction = (0,database_.ref)(config/* database */.F, collectionPathForUserReaction);
    const generalCollectionRefForUserReaction = (0,database_.ref)(config/* database */.F, generalCollectionPathForUserReaction);
    await (0,database_.set)(collectionRefForUserReaction, reviewId);
    await (0,database_.set)(generalCollectionRefForUserReaction, reviewId);
    await removeReviewOrReplyReaction(userId, itemConfig);
};

;// CONCATENATED MODULE: ./src/components/Review/ReviewList/ReviewCard/ReviewActions/index.tsx









const ReviewActions = ({ reviewId, reviewedItemId, userId, onReply, collectionType, reviewedItemCollectionType })=>{
    const { showModal } = (0,ModalProvider/* useModal */.d)();
    const [reactions, setReactions] = (0,external_react_.useState)({
        likes: [],
        dislikes: []
    });
    const isCurrentUserLike = reactions.likes.length > 0 && reactions.likes.some((item)=>item.key === userId);
    const isCurrentUserDislike = reactions.dislikes.length > 0 && reactions.dislikes.some((item)=>item.key === userId);
    const handleReaction = async (event, reactionType, collectionType)=>{
        if (userId) {
            const itemConfig = {
                reviewId,
                reviewedItemId,
                collectionType,
                reactionType,
                reviewedItemCollectionType
            };
            isCurrentUserReaction(reactionType) ? await removeReviewOrReplyReaction(userId, itemConfig) : await createNewReviewOrReplyReaction(userId, itemConfig);
        } else (0,handleModals/* openLoginModal */.Mo)(showModal);
    };
    const isCurrentUserReaction = (reactionType)=>{
        if (reactionType === "like") {
            return isCurrentUserLike;
        } else if (reactionType === "dislike") {
            return isCurrentUserDislike;
        }
        return false;
    };
    (0,external_react_.useEffect)(()=>{
        const itemConfig = {
            reviewedItemId,
            collectionType,
            reviewedItemCollectionType
        };
        getReviewOrReplyReactions(reviewId, itemConfig).then((data)=>{
            setReactions({
                likes: data.likes,
                dislikes: data.dislikes
            });
        });
    }, []);
    (0,external_react_.useEffect)(()=>{
        if (userId) {
            const reviewConfig = {
                reviewedItemId,
                collectionType,
                setReactions,
                reviewedItemCollectionType
            };
            const unsubscribe = reviewOrReplyReactionsListener(reviewId, reviewConfig);
            return ()=>{
                unsubscribe();
            };
        }
    }, [
        reactions,
        userId
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
        className: "flex justify-start items-center mt-auto",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(ReviewActions_ReviewActionButton, {
                title: "Like",
                action: "like",
                onClick: (event)=>handleReaction(event, "like", collectionType),
                counter: reactions.likes.length,
                isCurrentUserReaction: isCurrentUserLike
            }),
            /*#__PURE__*/ jsx_runtime.jsx(ReviewActions_ReviewActionButton, {
                title: "Dislike",
                action: "dislike",
                onClick: (event)=>handleReaction(event, "dislike", collectionType),
                counter: reactions.dislikes.length,
                isCurrentUserReaction: isCurrentUserDislike
            }),
            /*#__PURE__*/ jsx_runtime.jsx(ReviewActions_ReviewActionButton, {
                title: "Reply",
                action: "reply",
                onClick: onReply
            })
        ]
    });
};
/* harmony default export */ const ReviewCard_ReviewActions = (ReviewActions);

// EXTERNAL MODULE: ./src/components/Review/Form/NewReviewForm/index.tsx + 1 modules
var NewReviewForm = __webpack_require__(6868);
// EXTERNAL MODULE: ./src/app/components/UI/Input/Textarea/index.tsx
var Textarea = __webpack_require__(8728);
// EXTERNAL MODULE: ./src/constants/errorMessages.ts
var errorMessages = __webpack_require__(3514);
// EXTERNAL MODULE: ./src/constants/enum.ts
var constants_enum = __webpack_require__(4259);
;// CONCATENATED MODULE: ./src/firebase/handlers/reviewAndReplyHandlers/updateReviewOrReply.tsx


const updateReviewOrReply = async (userId, itemConfig)=>{
    const { item, reviewedItemId, collectionType, reviewedItemCollectionType } = itemConfig;
    const itemId = item.id;
    const collectionPathForReviewOrReply = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${itemId}`;
    const generalCollectionPathForReviewOrReply = `${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${itemId}`;
    const collectionRefForReviewOrReply = (0,database_.ref)(config/* database */.F, collectionPathForReviewOrReply);
    const generalCollectionRefForReviewOrReply = (0,database_.ref)(config/* database */.F, generalCollectionPathForReviewOrReply);
    const snapshot = await (0,database_.get)(collectionRefForReviewOrReply);
    if (snapshot.exists()) {
        await (0,database_.update)(collectionRefForReviewOrReply, item);
        await (0,database_.update)(generalCollectionRefForReviewOrReply, item);
        return true;
    } else {
        return false;
    }
};

;// CONCATENATED MODULE: ./src/components/Review/Form/EditReviewForm/index.tsx







const EditReviewForm = ({ editedItem, reviewedItemId, reviewedItemCollectionType, onFormClose, isReplyItem = false })=>{
    const [textareaValue, setTextareaValue] = (0,external_react_.useState)(editedItem.content);
    const [error, setError] = (0,external_react_.useState)("");
    const handleTextareaChange = (newValue)=>{
        setTextareaValue(newValue);
        setError("");
    };
    const handleSubmit = async (event)=>{
        event.preventDefault();
        if (textareaValue.trim() !== "") {
            setError("");
            let updatedItem;
            updatedItem = {
                ...editedItem,
                content: textareaValue
            };
            const itemConfig = {
                item: updatedItem,
                reviewedItemId,
                collectionType: isReplyItem ? constants_enum/* UserCollections */.zS.replies : constants_enum/* UserCollections */.zS.reviews,
                reviewedItemCollectionType
            };
            await updateReviewOrReply(editedItem.authorId, itemConfig);
            setTextareaValue("");
            onFormClose();
        } else {
            setError(errorMessages/* ERROR_MESSAGES */.R.REQUIRED_FIELD);
        }
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("form", {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(Textarea/* default */.Z, {
                onChange: handleTextareaChange,
                value: textareaValue,
                error: error
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                className: "mt-8 flex justify-start items-center",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                        onClick: handleSubmit,
                        children: "Update"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                        context: "filledDark",
                        className: "ml-2",
                        onClick: onFormClose,
                        children: "Cancel"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const Form_EditReviewForm = (EditReviewForm);

// EXTERNAL MODULE: ./src/app/components/UI/Dropdown/index.tsx
var Dropdown = __webpack_require__(4735);
// EXTERNAL MODULE: ./src/app/components/UI/Dropdown/DropdownItem/index.tsx
var DropdownItem = __webpack_require__(5122);
// EXTERNAL MODULE: external "react-transition-group"
var external_react_transition_group_ = __webpack_require__(4466);
// EXTERNAL MODULE: ./src/components/Profile/ProfileInfo/ProfileIcon/ProfileIconSmall/index.tsx
var ProfileIconSmall = __webpack_require__(9390);
;// CONCATENATED MODULE: ./src/components/Review/handlers/formatReviewTextWithHtmlTags.tsx
const formatReviewTextWithHtmlTags = (reviewText)=>{
    const parser = new DOMParser();
    const doc = parser.parseFromString(reviewText, "text/html");
    let formattedText = "";
    for (const element of doc.body.childNodes){
        if (element.nodeName === "B") {
            formattedText += `<b class='font-bold'>${element.textContent}</b>`;
        } else if (element.nodeName === "I") {
            formattedText += `<i>${element.textContent}</i>`;
        } else if (element.nodeType === 3) {
            formattedText += element.textContent;
        }
    }
    return formattedText;
};

;// CONCATENATED MODULE: ./src/components/Review/hooks/useReviewCardContentLength.tsx

const useReviewCardContentLength = (content)=>{
    const [contentHeight, setContentHeight] = (0,external_react_.useState)(0);
    const contentRef = (0,external_react_.useRef)(null);
    const isLongReviewContent = (0,external_react_.useMemo)(()=>content.length > 400, [
        content
    ]);
    const [isContentOpen, setIsContentOpen] = (0,external_react_.useState)(false);
    const [isTruncateReview, setIsTruncateReview] = (0,external_react_.useState)(false);
    const isShowTruncateDots = isLongReviewContent && !isContentOpen && isTruncateReview;
    const toggleReviewContentLength = ()=>{
        setIsContentOpen(!isContentOpen);
    };
    (0,external_react_.useEffect)(()=>{
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
        if (!isContentOpen) {
            setTimeout(()=>{
                setIsTruncateReview(true);
            }, 500);
        } else setIsTruncateReview(false);
    }, [
        isContentOpen
    ]);
    return {
        isContentOpen,
        contentHeight,
        contentRef,
        isShowTruncateDots,
        isLongReviewContent,
        toggleReviewContentLength
    };
};
/* harmony default export */ const hooks_useReviewCardContentLength = (useReviewCardContentLength);

;// CONCATENATED MODULE: ./src/components/Review/hooks/useReplyEditForm.tsx

const useReplyEditForm = (userId)=>{
    const [isShowEditForm, setIsShowEditForm] = (0,external_react_.useState)(false);
    const showEditReviewForm = ()=>{
        setIsShowEditForm(true);
    };
    const closeEditReviewForm = ()=>{
        setIsShowEditForm(false);
    };
    (0,external_react_.useEffect)(()=>{
        if (!userId) {
            setIsShowEditForm(false);
        }
    }, [
        userId
    ]);
    return {
        isShowEditForm,
        showEditReviewForm,
        closeEditReviewForm
    };
};
/* harmony default export */ const hooks_useReplyEditForm = (useReplyEditForm);

// EXTERNAL MODULE: ./src/firebase/handlers/profileHandlers/getUserProfileInfo.tsx
var getUserProfileInfo = __webpack_require__(1398);
;// CONCATENATED MODULE: ./src/components/Review/hooks/useReplyCard.tsx


const useReplyCard = (authorId)=>{
    const [isMounted, setIsMounted] = (0,external_react_.useState)(false);
    const [authorInfo, setAuthorInfo] = (0,external_react_.useState)({
        userId: "",
        photoURL: "",
        displayName: ""
    });
    (0,external_react_.useEffect)(()=>{
        (0,getUserProfileInfo/* getUserProfileInfo */.s)(authorId).then((data)=>{
            setAuthorInfo({
                userId: data.info.id,
                photoURL: data.info.photoURL,
                displayName: data.info.displayName
            });
        }).then(()=>{
            setIsMounted(true);
        });
    }, []);
    return {
        isMounted,
        authorInfo
    };
};
/* harmony default export */ const hooks_useReplyCard = (useReplyCard);

;// CONCATENATED MODULE: ./src/firebase/handlers/reactionHandlers/removeAllReviewOrReplyReactions.tsx


const removeAllReviewOrReplyReactions = (userId, itemId, reviewedItemId, collectionType, reviewedItemCollectionType)=>{
    const collectionPathForUserReaction = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${itemId}`;
    const generalCollectionPathForUserReaction = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${itemId}`;
    const collectionRefForUserReaction = (0,database_.ref)(config/* database */.F, collectionPathForUserReaction);
    const generalCollectionRefForUserReaction = (0,database_.ref)(config/* database */.F, generalCollectionPathForUserReaction);
    return new Promise(async (resolve)=>{
        let isReactionRemovedFromCollection = false;
        (0,database_.remove)(collectionRefForUserReaction).then(()=>{
            (0,database_.remove)(generalCollectionRefForUserReaction).then(()=>{
                isReactionRemovedFromCollection = true;
            });
        });
        resolve(isReactionRemovedFromCollection);
    });
};

;// CONCATENATED MODULE: ./src/firebase/handlers/reviewAndReplyHandlers/removeReviewOrReply.tsx




const removeReviewOrReply = async (itemId, itemConfig)=>{
    const { reviewedItemId, userId, collectionType, reviewedItemCollectionType } = itemConfig;
    const collectionPathForReviewOrReply = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${itemId}`;
    const generalCollectionPathForReviewOrReply = `${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${itemId}`;
    const collectionRefForReviewOrReply = (0,database_.ref)(config/* database */.F, collectionPathForReviewOrReply);
    const generalCollectionRefForReviewOrReply = (0,database_.ref)(config/* database */.F, generalCollectionPathForReviewOrReply);
    return new Promise(async (resolve)=>{
        let isReviewOrReplyRemovedFromCollection = false;
        if (collectionType === constants_enum/* UserCollections */.zS.reviews) {
            const collectionPathForReply = `users/${userId}/collection/replies/${reviewedItemCollectionType}/`;
            const generalCollectionPathForReply = `${reviewedItemCollectionType}/${reviewedItemId}/replies/`;
            const collectionRefForReply = (0,database_.ref)(config/* database */.F, collectionPathForReply);
            const generalCollectionRefForReply = (0,database_.ref)(config/* database */.F, generalCollectionPathForReply);
            const removeRepliesForReviewInCollection = async (isRemoveFromUserCollection = false)=>{
                const snapshot = isRemoveFromUserCollection ? await (0,database_.get)(collectionRefForReply) : await (0,database_.get)(generalCollectionRefForReply);
                if (snapshot.exists()) {
                    snapshot.forEach((childSnapshot)=>{
                        const reply = childSnapshot.val();
                        if (reply.reviewId === itemId) {
                            const replyPath = isRemoveFromUserCollection ? `users/${userId}/collection/replies/${reviewedItemCollectionType}/${childSnapshot.key}` : `${reviewedItemCollectionType}/${reviewedItemId}/replies/${childSnapshot.key}`;
                            const replyRef = (0,database_.ref)(config/* database */.F, replyPath);
                            (0,database_.remove)(replyRef);
                        }
                    });
                }
            };
            await removeRepliesForReviewInCollection();
            await removeRepliesForReviewInCollection(true);
        }
        (0,database_.remove)(collectionRefForReviewOrReply).then(()=>{
            (0,database_.remove)(generalCollectionRefForReviewOrReply).then(()=>removeAllReviewOrReplyReactions(userId, itemId, reviewedItemId, collectionType, reviewedItemCollectionType)).then(()=>{
                isReviewOrReplyRemovedFromCollection = true;
            });
        });
        resolve(isReviewOrReplyRemovedFromCollection);
    });
};

;// CONCATENATED MODULE: ./src/components/Review/ReplyList/ReplyCard/index.tsx


















const ReplyCard = ({ reviewedItemId, userId, reply, collectionType, onReply, isCollectionItem })=>{
    const { content, id, created_at, authorId, replyToUser } = reply;
    const formattedDate = (0,external_react_.useMemo)(()=>external_moment_default()(created_at).format("MMM Do YY"), [
        created_at
    ]);
    const isCurrentUserItem = userId === authorId;
    const { isMounted, authorInfo } = hooks_useReplyCard(authorId);
    const { isShowEditForm, showEditReviewForm, closeEditReviewForm } = hooks_useReplyEditForm(userId);
    const { isContentOpen, contentHeight, contentRef, isShowTruncateDots, isLongReviewContent, toggleReviewContentLength } = hooks_useReviewCardContentLength(content);
    const removeReplyCard = ()=>{
        const itemConfig = {
            reviewedItemId: reviewedItemId,
            userId,
            collectionType: constants_enum/* UserCollections */.zS.replies,
            reviewedItemCollectionType: collectionType
        };
        removeReviewOrReply(id, itemConfig);
    };
    return /*#__PURE__*/ jsx_runtime.jsx(external_react_transition_group_.CSSTransition, {
        in: isMounted,
        timeout: 500,
        classNames: "fade",
        unmountOnExit: true,
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
            className: "mb-4 p-2 md:p-4 bg-gray-800 rounded-md border-gray-500 relative last:mb-0 block",
            children: [
                isCurrentUserItem && /*#__PURE__*/ (0,jsx_runtime.jsxs)(Dropdown/* default */.Z, {
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx(DropdownItem/* default */.Z, {
                            label: "Edit",
                            icon: free_solid_svg_icons_.faPenToSquare,
                            onClick: showEditReviewForm
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx(DropdownItem/* default */.Z, {
                            label: "Delete",
                            icon: free_solid_svg_icons_.faTrash,
                            onClick: removeReplyCard
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime.jsx("span", {
                    className: "flex mb-2 max-w-[calc(100%-54px)]",
                    children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                        className: "flex items-center w-full",
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx(ProfileIconSmall/* default */.Z, {
                                userId: authorInfo.userId,
                                photoURL: authorInfo.photoURL,
                                isLinkToProfile: !isCollectionItem
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                className: "w-full max-w-[calc(100%-54px)]",
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx("span", {
                                        className: "truncate mb-1 min-h-[22.5px] text-lg font-semibold leading-tight block",
                                        children: authorInfo.displayName
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("span", {
                                        className: "text-xs block",
                                        children: formattedDate
                                    })
                                ]
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ jsx_runtime.jsx("span", {
                    children: isShowEditForm ? /*#__PURE__*/ jsx_runtime.jsx(Form_EditReviewForm, {
                        editedItem: reply,
                        reviewedItemId: reviewedItemId,
                        reviewedItemCollectionType: collectionType,
                        onFormClose: closeEditReviewForm,
                        isReplyItem: true
                    }) : /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                className: "mb-4 block",
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx("span", {
                                        style: {
                                            maxHeight: isContentOpen ? contentHeight : "3rem"
                                        },
                                        ref: contentRef,
                                        className: "overflow-hidden transition-[max-height] duration-500",
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                            className: external_classnames_default()(isShowTruncateDots && "line-clamp-2"),
                                            children: [
                                                /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                    className: "mr-1 font-semibold",
                                                    children: `${replyToUser},`
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                    dangerouslySetInnerHTML: {
                                                        __html: formatReviewTextWithHtmlTags(content)
                                                    },
                                                    className: external_classnames_default()(isShowTruncateDots && "line-clamp-2")
                                                })
                                            ]
                                        })
                                    }),
                                    isLongReviewContent && /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                                        context: "text",
                                        onClick: toggleReviewContentLength,
                                        children: isContentOpen ? "Hide" : "Show more"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(ReviewCard_ReviewActions, {
                                reviewId: id,
                                reviewedItemId: reviewedItemId,
                                userId: userId,
                                collectionType: constants_enum/* UserCollections */.zS.replies,
                                onReply: ()=>onReply(authorInfo.displayName),
                                reviewedItemCollectionType: collectionType
                            })
                        ]
                    })
                })
            ]
        })
    });
};
/* harmony default export */ const ReplyList_ReplyCard = (ReplyCard);

;// CONCATENATED MODULE: ./src/firebase/handlers/reviewAndReplyHandlers/movieOrTVShowRepliesListener.tsx


const movieOrTVShowRepliesListener = (reviewedItemId, replyListConfig)=>{
    const { reviewId, oldItems, setItems, reviewedItemCollectionType } = replyListConfig;
    const collectionPathForReplies = `${reviewedItemCollectionType}/${reviewedItemId}/replies/`;
    const collectionRefForReplies = (0,database_.ref)(config/* database */.F, collectionPathForReplies);
    const onReplyAdded = (childSnapshot)=>{
        const newReply = childSnapshot.val();
        if (!oldItems.some((existingItem)=>existingItem.id === newReply.id) && newReply.reviewId === reviewId) {
            setItems((prevItems)=>[
                    newReply,
                    ...prevItems
                ]);
        }
    };
    const onReplyRemoved = (childSnapshot)=>{
        const removedReply = childSnapshot.val();
        setItems((prevItems)=>prevItems.filter((item)=>item.id !== removedReply.id));
    };
    const onReplyChanged = (childSnapshot)=>{
        const updatedReply = childSnapshot.val();
        setItems((prevItems)=>{
            const updatedIndex = prevItems.findIndex((item)=>item.id === updatedReply.id);
            if (updatedIndex !== -1) {
                prevItems[updatedIndex] = updatedReply;
                return [
                    ...prevItems
                ];
            }
            return prevItems;
        });
    };
    const unsubscribeReplyAdded = (0,database_.onChildAdded)(collectionRefForReplies, onReplyAdded);
    const unsubscribeReplyRemoved = (0,database_.onChildRemoved)(collectionRefForReplies, onReplyRemoved);
    const unsubscribeReplyChanged = (0,database_.onChildChanged)(collectionRefForReplies, onReplyChanged);
    return ()=>{
        unsubscribeReplyAdded();
        unsubscribeReplyRemoved();
        unsubscribeReplyChanged();
    };
};

;// CONCATENATED MODULE: ./src/components/Review/hooks/useReplyList.tsx


const useReplyList = (replies, collectionInfo, userId)=>{
    const initialItemsLength = 2;
    const [maxReviewsLength, setMaxReviewsLength] = (0,external_react_.useState)(initialItemsLength);
    const [itemsToShow, setItemsToShow] = (0,external_react_.useState)([]);
    const isMoreDataAvailable = maxReviewsLength < itemsToShow.length;
    const isShowMoreButton = itemsToShow.length > initialItemsLength;
    const buttonText = isMoreDataAvailable ? "Show more" : "Show less";
    const { collectionType, reviewId, reviewedItemId } = collectionInfo;
    const handleItemsToShowLength = ()=>{
        const newMaxReviewsLength = isMoreDataAvailable ? Math.min(maxReviewsLength + initialItemsLength, itemsToShow.length) : initialItemsLength;
        setMaxReviewsLength(newMaxReviewsLength);
    };
    (0,external_react_.useEffect)(()=>{
        setItemsToShow(replies);
    }, [
        replies
    ]);
    (0,external_react_.useEffect)(()=>{
        if (userId) {
            const replyListConfig = {
                reviewId,
                oldItems: replies,
                setItems: setItemsToShow,
                reviewedItemCollectionType: collectionType
            };
            const unsubscribe = movieOrTVShowRepliesListener(reviewedItemId, replyListConfig);
            return ()=>{
                unsubscribe();
            };
        }
    }, [
        replies,
        userId,
        reviewedItemId,
        reviewId
    ]);
    return {
        itemsToShow,
        maxReviewsLength,
        isShowMoreButton,
        buttonText,
        handleItemsToShowLength
    };
};
/* harmony default export */ const hooks_useReplyList = (useReplyList);

;// CONCATENATED MODULE: ./src/components/Review/ReplyList/index.tsx




const ReplyList = ({ reviewedItemId, userId, reviewId, replies, onReply, collectionType, isCollectionList = false })=>{
    const collectionInfo = {
        collectionType,
        reviewedItemId,
        reviewId
    };
    const { itemsToShow, maxReviewsLength, isShowMoreButton, buttonText, handleItemsToShowLength } = hooks_useReplyList(replies, collectionInfo, userId);
    if (!itemsToShow.length) return null;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
        className: "mt-4 block",
        children: [
            itemsToShow.slice(0, maxReviewsLength).map((item)=>/*#__PURE__*/ jsx_runtime.jsx(ReplyList_ReplyCard, {
                    reply: item,
                    userId: userId,
                    reviewedItemId: reviewedItemId,
                    onReply: onReply,
                    isCollectionItem: isCollectionList,
                    collectionType: collectionType
                }, item.id)),
            isShowMoreButton && /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                className: "mx-auto",
                context: "empty",
                onClick: handleItemsToShowLength,
                children: buttonText
            })
        ]
    });
};
/* harmony default export */ const Review_ReplyList = (ReplyList);

// EXTERNAL MODULE: ./src/context/AuthProvider.tsx + 1 modules
var AuthProvider = __webpack_require__(7459);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./src/components/List/ItemsListWrap/ItemsList/ItemCard/ItemCardSmall/index.tsx + 1 modules
var ItemCardSmall = __webpack_require__(5620);
// EXTERNAL MODULE: ./src/constants/images.ts
var constants_images = __webpack_require__(8989);
;// CONCATENATED MODULE: ./src/firebase/handlers/reviewAndReplyHandlers/getReplyListFromStorage.tsx


const getReplyListFromStorage = async (reviewedItemId, reviewId, reviewedItemCollectionType)=>{
    const collectionPathForReplies = `${reviewedItemCollectionType}/${reviewedItemId}/replies/`;
    const collectionRefForReplies = (0,database_.ref)(config/* database */.F, collectionPathForReplies);
    try {
        const snapshot = await (0,database_.get)(collectionRefForReplies);
        const replyList = [];
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot)=>{
                const reply = childSnapshot.val();
                if (reply.reviewId === reviewId) {
                    replyList.push(reply);
                }
            });
        }
        return replyList;
    } catch (error) {
        return [];
    }
};

;// CONCATENATED MODULE: ./src/components/Review/hooks/useReviewCard.tsx





const useReviewCard = (collectionInfo, userId)=>{
    const [replies, setReplies] = (0,external_react_.useState)([]);
    const [authorInfo, setAuthorInfo] = (0,external_react_.useState)({
        userId: "",
        photoURL: "",
        displayName: ""
    });
    const [isMounted, setIsMounted] = (0,external_react_.useState)(false);
    const { id, authorId, reviewedItemId, collectionType } = collectionInfo;
    const isItemFromDB = !!authorId;
    const removeReviewCard = ()=>{
        setIsMounted(false);
        setTimeout(()=>{
            const itemConfig = {
                reviewedItemId: reviewedItemId,
                userId,
                collectionType: constants_enum/* UserCollections */.zS.reviews,
                reviewedItemCollectionType: collectionType
            };
            removeReviewOrReply(id, itemConfig);
        }, 500);
    };
    (0,external_react_.useEffect)(()=>{
        getReplyListFromStorage(reviewedItemId, id, collectionType).then((data)=>{
            setReplies(data);
        });
    }, []);
    (0,external_react_.useEffect)(()=>{
        if (isItemFromDB) {
            (0,getUserProfileInfo/* getUserProfileInfo */.s)(authorId).then((data)=>{
                setAuthorInfo({
                    userId: data.info.id,
                    photoURL: data.info.photoURL,
                    displayName: data.info.displayName
                });
            }).then(()=>{
                setIsMounted(true);
            });
        } else {
            setIsMounted(true);
        }
    }, [
        isItemFromDB
    ]);
    return {
        isMounted,
        replies,
        isItemFromDB,
        authorInfo,
        removeReviewCard
    };
};
/* harmony default export */ const hooks_useReviewCard = (useReviewCard);

;// CONCATENATED MODULE: ./src/components/Review/hooks/useReplyForm.tsx

const useReplyForm = (authorName)=>{
    const [isShowReplyForm, setIsShowReplyForm] = (0,external_react_.useState)(false);
    const [replyToUser, setReplyToUser] = (0,external_react_.useState)("");
    const showReplyForm = ()=>{
        setIsShowReplyForm(true);
    };
    const closeReplyForm = ()=>{
        setReplyToUser(authorName);
        setIsShowReplyForm(false);
    };
    const makeReplyToUser = (userName)=>{
        setIsShowReplyForm(true);
        setReplyToUser(userName);
    };
    (0,external_react_.useEffect)(()=>{
        setReplyToUser(authorName);
    }, [
        authorName
    ]);
    return {
        replyToUser,
        isShowReplyForm,
        showReplyForm,
        closeReplyForm,
        makeReplyToUser
    };
};
/* harmony default export */ const hooks_useReplyForm = (useReplyForm);

;// CONCATENATED MODULE: ./src/components/Review/ReviewList/ReviewCard/index.tsx
























const ReviewCard = ({ collectionType, review, defaultCardReviewedId, isLinkToMovie = false, isCollectionItem = false })=>{
    const { userId } = (0,AuthProvider/* useAuth */.a)();
    const { content, id, author, created_at, avatar_path, authorId, reviewedItemId } = review;
    const collectionInfo = {
        id,
        authorId,
        reviewedItemId,
        collectionType
    };
    const { isMounted, replies, isItemFromDB, authorInfo, removeReviewCard } = hooks_useReviewCard(collectionInfo, userId);
    const { isShowEditForm, showEditReviewForm, closeEditReviewForm } = hooks_useReplyEditForm(userId);
    const { replyToUser, isShowReplyForm, showReplyForm, closeReplyForm, makeReplyToUser } = hooks_useReplyForm(isItemFromDB ? authorInfo.displayName : author);
    const isCurrentUserItem = userId === authorId && isItemFromDB;
    const formattedDate = (0,external_react_.useMemo)(()=>external_moment_default()(created_at).format("MMM Do YY"), [
        created_at
    ]);
    const { isContentOpen, contentHeight, contentRef, isShowTruncateDots, isLongReviewContent, toggleReviewContentLength } = hooks_useReviewCardContentLength(content);
    const reviewContent = /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
        className: "p-2 md:p-4 gap-4 bg-gray-900 relative duration-300 flex flex-wrap md:flex-nowrap",
        children: [
            isCurrentUserItem && /*#__PURE__*/ (0,jsx_runtime.jsxs)(Dropdown/* default */.Z, {
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(DropdownItem/* default */.Z, {
                        label: "Edit",
                        icon: free_solid_svg_icons_.faPenToSquare,
                        onClick: showEditReviewForm
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(DropdownItem/* default */.Z, {
                        label: "Delete",
                        icon: free_solid_svg_icons_.faTrash,
                        onClick: removeReviewCard
                    })
                ]
            }),
            isLinkToMovie && /*#__PURE__*/ jsx_runtime.jsx(ItemCardSmall/* default */.Z, {
                itemId: reviewedItemId,
                collectionType: collectionType
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                className: "w-full",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("span", {
                        className: "flex mb-2 max-w-[calc(100%-54px)]",
                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ jsx_runtime.jsx(ProfileIconSmall/* default */.Z, {
                                    userId: isItemFromDB ? authorInfo.userId : undefined,
                                    photoURL: isItemFromDB ? authorInfo.photoURL : constants_images/* ORIGINAL_IMAGE_SRC */.qX.replace("{imageSrc}", avatar_path),
                                    isLinkToProfile: isItemFromDB && !isLinkToMovie
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                                            className: "mb-1 min-h-[22.5px] text-lg font-semibold leading-tight block",
                                            children: isItemFromDB ? authorInfo.displayName : author
                                        }),
                                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                                            className: "text-xs block",
                                            children: formattedDate
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("span", {
                        className: "flex flex-col h-[calc(100%-50.5px)]",
                        children: isShowEditForm ? /*#__PURE__*/ jsx_runtime.jsx(Form_EditReviewForm, {
                            editedItem: review,
                            reviewedItemId: defaultCardReviewedId ?? reviewedItemId,
                            reviewedItemCollectionType: collectionType,
                            onFormClose: closeEditReviewForm
                        }) : /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                    className: "block mb-4",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                                            style: {
                                                maxHeight: isContentOpen ? contentHeight : "3rem"
                                            },
                                            ref: contentRef,
                                            className: "overflow-hidden transition-[max-height] duration-500 block text-base",
                                            children: /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                dangerouslySetInnerHTML: {
                                                    __html: formatReviewTextWithHtmlTags(content)
                                                },
                                                className: external_classnames_default()(isShowTruncateDots && "line-clamp-2")
                                            })
                                        }),
                                        isLongReviewContent && /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                                            context: "text",
                                            onClick: toggleReviewContentLength,
                                            children: isContentOpen ? "Hide" : "Show more"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx(ReviewCard_ReviewActions, {
                                    reviewId: id,
                                    reviewedItemId: defaultCardReviewedId ?? reviewedItemId,
                                    userId: userId,
                                    onReply: showReplyForm,
                                    collectionType: constants_enum/* UserCollections */.zS.reviews,
                                    reviewedItemCollectionType: collectionType
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx(Review_ReplyList, {
                                    reviewedItemId: defaultCardReviewedId ?? reviewedItemId,
                                    userId: userId,
                                    reviewId: id,
                                    replies: replies,
                                    onReply: makeReplyToUser,
                                    collectionType: collectionType,
                                    isCollectionList: isCollectionItem
                                }),
                                isShowReplyForm && /*#__PURE__*/ jsx_runtime.jsx(NewReviewForm/* default */.Z, {
                                    reviewAuthorId: review.authorId,
                                    reviewedItemId: defaultCardReviewedId ?? reviewedItemId,
                                    reviewedItemCollectionType: collectionType,
                                    userId: userId,
                                    reviewId: id,
                                    replyToUser: replyToUser,
                                    onFormClose: closeReplyForm,
                                    isReplyItem: true
                                })
                            ]
                        })
                    })
                ]
            })
        ]
    });
    return /*#__PURE__*/ jsx_runtime.jsx(external_react_transition_group_.CSSTransition, {
        in: isMounted,
        timeout: 500,
        classNames: "fade",
        unmountOnExit: true,
        children: isLinkToMovie ? /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
            href: "/movie/[id]",
            as: `/movie/${reviewedItemId}`,
            className: "mb-4 block last:mb-0",
            children: reviewContent
        }) : /*#__PURE__*/ jsx_runtime.jsx("span", {
            className: "mb-4 block last:mb-0",
            children: reviewContent
        })
    });
};
/* harmony default export */ const ReviewList_ReviewCard = (ReviewCard);

// EXTERNAL MODULE: ./src/components/List/EmptyList/index.tsx
var EmptyList = __webpack_require__(5513);
// EXTERNAL MODULE: ./src/hooks/useScrollToTop.tsx
var useScrollToTop = __webpack_require__(5809);
;// CONCATENATED MODULE: ./src/firebase/handlers/reviewAndReplyHandlers/movieOrTVShowReviewsListener.tsx


const movieOrTVShowReviewsListener = (collectionId, reviewListConfig)=>{
    const { oldItems, setItems, reviewedItemCollectionType } = reviewListConfig;
    const generalCollectionPathForReviews = `${reviewedItemCollectionType}/${collectionId}/reviews/`;
    const generalCollectionRefForReviews = (0,database_.ref)(config/* database */.F, generalCollectionPathForReviews);
    const onReviewAdded = (childSnapshot)=>{
        const newReview = childSnapshot.val();
        if (!oldItems.some((existingItem)=>existingItem.id === newReview.id)) {
            setItems((prevItems)=>[
                    newReview,
                    ...prevItems
                ]);
        }
    };
    const onReviewRemoved = (childSnapshot)=>{
        const removedReview = childSnapshot.val();
        setItems((prevItems)=>prevItems.filter((item)=>item.id !== removedReview.id));
    };
    const onReviewChanged = (childSnapshot)=>{
        const updatedReview = childSnapshot.val();
        setItems((prevItems)=>{
            const updatedIndex = prevItems.findIndex((item)=>item.id === updatedReview.id);
            if (updatedIndex !== -1) {
                prevItems[updatedIndex] = updatedReview;
                return [
                    ...prevItems
                ];
            }
            return prevItems;
        });
    };
    const unsubscribeReviewAdded = (0,database_.onChildAdded)(generalCollectionRefForReviews, onReviewAdded);
    const unsubscribeReviewRemoved = (0,database_.onChildRemoved)(generalCollectionRefForReviews, onReviewRemoved);
    const unsubscribeReviewChanged = (0,database_.onChildChanged)(generalCollectionRefForReviews, onReviewChanged);
    return ()=>{
        unsubscribeReviewAdded();
        unsubscribeReviewRemoved();
        unsubscribeReviewChanged();
    };
};

;// CONCATENATED MODULE: ./src/firebase/handlers/userCollectionHandlers/collectionRepliesListener.tsx



const collectionRepliesListener = (userId, collectionOwnerId, setItems)=>{
    const tvShowRepliesCollectionPath = `users/${collectionOwnerId}/collection/replies/tv`;
    const tvShowReviewsCollectionPath = `users/${collectionOwnerId}/collection/reviews/tv`;
    const movieRepliesCollectionPath = `users/${collectionOwnerId}/collection/replies/movie`;
    const movieReviewsCollectionPath = `users/${collectionOwnerId}/collection/reviews/movie`;
    const tvShowRepliesCollectionRef = (0,database_.ref)(config/* database */.F, tvShowRepliesCollectionPath);
    const tvShowReviewsCollectionRef = (0,database_.ref)(config/* database */.F, tvShowReviewsCollectionPath);
    const movieRepliesCollectionRef = (0,database_.ref)(config/* database */.F, movieRepliesCollectionPath);
    const movieReviewsCollectionRef = (0,database_.ref)(config/* database */.F, movieReviewsCollectionPath);
    const onReplyRemoved = async (childSnapshot)=>{
        const removedItem = childSnapshot.val();
        let allRepliesSnapshot;
        let allReplies = [];
        let allReviewsSnapshot;
        let allReviews = [];
        if (removedItem.reviewedItemCollectionType === constants_enum/* UserCollections */.zS.movie) {
            allRepliesSnapshot = await (0,database_.get)((0,database_.query)(movieRepliesCollectionRef));
            allReplies = Object.values(allRepliesSnapshot.val() || {});
            allReviewsSnapshot = await (0,database_.get)((0,database_.query)(movieReviewsCollectionRef));
            allReviews = Object.values(allReviewsSnapshot.val() || {});
        } else {
            allRepliesSnapshot = await (0,database_.get)((0,database_.query)(tvShowRepliesCollectionRef));
            allReplies = Object.values(allRepliesSnapshot.val() || {});
            allReviewsSnapshot = await (0,database_.get)((0,database_.query)(tvShowReviewsCollectionRef));
            allReviews = Object.values(allReviewsSnapshot.val() || {});
        }
        const review = allReviews.find((item)=>item.id === removedItem.reviewId);
        const isLastReplyInReview = !allReplies.some((item)=>item.reviewId === removedItem.reviewId);
        const isCurrentUserReview = review && review.authorId === userId;
        const isReviewFromDefaultReviews = !review;
        const isCurrentUserCollection = collectionOwnerId === userId;
        if (isLastReplyInReview && !isCurrentUserReview && isCurrentUserCollection || isReviewFromDefaultReviews) {
            setItems((prevItems)=>prevItems.filter((item)=>item.id !== removedItem.reviewId));
        }
    };
    const unsubscribeTVShowReplyRemoved = (0,database_.onChildRemoved)(tvShowRepliesCollectionRef, onReplyRemoved);
    const unsubscribeMovieReplyRemoved = (0,database_.onChildRemoved)(movieRepliesCollectionRef, onReplyRemoved);
    return ()=>{
        unsubscribeTVShowReplyRemoved();
        unsubscribeMovieReplyRemoved();
    };
};

;// CONCATENATED MODULE: ./src/firebase/handlers/userCollectionHandlers/collectionReviewsListener.tsx


const collectionReviewsListener = (collectionId, setItems)=>{
    const tvShowReviewsCollectionPath = `users/${collectionId}/collection/reviews/tv`;
    const movieReviewsCollectionPath = `users/${collectionId}/collection/reviews/movie`;
    const tvShowReviewsCollectionRef = (0,database_.ref)(config/* database */.F, tvShowReviewsCollectionPath);
    const movieReviewsCollectionRef = (0,database_.ref)(config/* database */.F, movieReviewsCollectionPath);
    const onReviewRemoved = (childSnapshot)=>{
        const removedItem = childSnapshot.val();
        setItems((prevItems)=>prevItems.filter((item)=>item.id !== removedItem.id));
    };
    const onReviewChanged = (childSnapshot)=>{
        const updatedItem = childSnapshot.val();
        setItems((prevItems)=>{
            const updatedIndex = prevItems.findIndex((item)=>item.id === updatedItem.id);
            if (updatedIndex !== -1) {
                prevItems[updatedIndex] = updatedItem;
                return [
                    ...prevItems
                ];
            }
            return prevItems;
        });
    };
    const unsubscribeTVShowReviewRemoved = (0,database_.onChildRemoved)(tvShowReviewsCollectionRef, onReviewRemoved);
    const unsubscribeTVShowReviewChanged = (0,database_.onChildChanged)(tvShowReviewsCollectionRef, onReviewChanged);
    const unsubscribeMovieReviewRemoved = (0,database_.onChildRemoved)(movieReviewsCollectionRef, onReviewRemoved);
    const unsubscribeMovieReviewChanged = (0,database_.onChildChanged)(movieReviewsCollectionRef, onReviewChanged);
    return ()=>{
        unsubscribeTVShowReviewRemoved();
        unsubscribeTVShowReviewChanged();
        unsubscribeMovieReviewRemoved();
        unsubscribeMovieReviewChanged();
    };
};

;// CONCATENATED MODULE: ./src/components/Review/hooks/useReviewList.tsx





const useReviewList = (reviews, collectionInfo, scrollToTop)=>{
    const { userId } = (0,AuthProvider/* useAuth */.a)();
    const initialItemsLength = 3;
    const [maxReviewsLength, setMaxReviewsLength] = (0,external_react_.useState)(initialItemsLength);
    const [itemsToShow, setItemsToShow] = (0,external_react_.useState)(reviews);
    const [itemsFromStorage, setitemsFromStorage] = (0,external_react_.useState)([]);
    const [defaultItems, setDefaultItems] = (0,external_react_.useState)([]);
    const isMoreDataAvailable = maxReviewsLength < itemsToShow.filter((item)=>item.id !== undefined).length;
    const isShowMoreButton = itemsToShow.length > initialItemsLength;
    const buttonText = isMoreDataAvailable ? "Show more" : "Show less";
    const { collectionType, isCollectionList, reviewedItemId, collectionOwnerId } = collectionInfo;
    const handleItemsToShowLength = ()=>{
        if (!isMoreDataAvailable) scrollToTop();
        const newMaxReviewsLength = isMoreDataAvailable ? Math.min(maxReviewsLength + initialItemsLength, itemsToShow.length) : initialItemsLength;
        if (isMoreDataAvailable) {
            setMaxReviewsLength(newMaxReviewsLength);
        } else {
            setTimeout(()=>{
                setMaxReviewsLength(newMaxReviewsLength);
            }, 600);
        }
    };
    const defineReviewSrc = ()=>{
        const itemsFromStorage = [];
        const defaultItems = [];
        reviews.forEach((item)=>{
            if (item.authorId) {
                itemsFromStorage.push(item);
            } else {
                defaultItems.push(item);
            }
        });
        setitemsFromStorage(itemsFromStorage);
        setDefaultItems(defaultItems);
    };
    (0,external_react_.useEffect)(()=>{
        defineReviewSrc();
    }, [
        reviews
    ]);
    (0,external_react_.useEffect)(()=>{
        const newItemsToShow = [
            ...itemsFromStorage,
            ...defaultItems
        ];
        setItemsToShow(newItemsToShow);
    }, [
        itemsFromStorage,
        defaultItems
    ]);
    (0,external_react_.useEffect)(()=>{
        if (userId) {
            if (isCollectionList) {
                const collectionId = isCollectionList ? userId : reviewedItemId;
                const unsubscribe = collectionReviewsListener(collectionId, setItemsToShow);
                return ()=>{
                    unsubscribe();
                };
            } else {
                const collectionId = isCollectionList ? userId : reviewedItemId;
                const reviewListConfig = {
                    oldItems: itemsFromStorage,
                    setItems: setitemsFromStorage,
                    reviewedItemCollectionType: collectionType
                };
                const unsubscribe = movieOrTVShowReviewsListener(collectionId, reviewListConfig);
                return ()=>{
                    unsubscribe();
                };
            }
        }
    }, [
        itemsFromStorage,
        userId
    ]);
    (0,external_react_.useEffect)(()=>{
        if (userId) {
            if (isCollectionList) {
                const unsubscribe = collectionRepliesListener(userId, collectionOwnerId, setItemsToShow);
                return ()=>{
                    unsubscribe();
                };
            }
        }
    }, [
        userId
    ]);
    return {
        itemsToShow,
        isShowMoreButton,
        buttonText,
        maxReviewsLength,
        handleItemsToShowLength
    };
};
/* harmony default export */ const hooks_useReviewList = (useReviewList);

;// CONCATENATED MODULE: ./src/components/Review/ReviewList/index.tsx








const ReviewList = ({ reviews, collectionType, reviewedItemId, isCollectionList = false, collectionOwnerId, className })=>{
    const { listRef, scrollToTop } = (0,useScrollToTop/* default */.Z)(100);
    const collectionInfo = {
        collectionType,
        isCollectionList,
        reviewedItemId,
        collectionOwnerId
    };
    const { itemsToShow, isShowMoreButton, buttonText, maxReviewsLength, handleItemsToShowLength } = hooks_useReviewList(reviews, collectionInfo, scrollToTop);
    if (!itemsToShow.length) {
        return /*#__PURE__*/ jsx_runtime.jsx(EmptyList/* default */.Z, {
            title: "Reviews",
            text: isCollectionList ? "Please write a review before you can see it here" : undefined,
            className: isCollectionList ? "border border-gray-500 !mb-4 -my-12 p-4 last:mb-0" : undefined
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        ref: listRef,
        className: external_classnames_default()("mb-16", className),
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                children: "Reviews"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                children: [
                    itemsToShow.slice(0, maxReviewsLength).map((item)=>/*#__PURE__*/ jsx_runtime.jsx(ReviewList_ReviewCard, {
                            review: item,
                            collectionType: collectionType ?? item.reviewedItemCollectionType,
                            defaultCardReviewedId: reviewedItemId,
                            isLinkToMovie: isCollectionList,
                            isCollectionItem: isCollectionList
                        }, item.id)),
                    isShowMoreButton && /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                        className: "mx-auto",
                        context: "empty",
                        onClick: handleItemsToShowLength,
                        children: buttonText
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const Review_ReviewList = (ReviewList);


/***/ })

};
;