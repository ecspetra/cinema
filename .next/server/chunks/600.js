"use strict";
exports.id = 600;
exports.ids = [600];
exports.modules = {

/***/ 5511:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ Collection)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./src/app/components/UI/Title/Title.tsx
var Title = __webpack_require__(9457);
// EXTERNAL MODULE: ./src/components/List/EmptyList/index.tsx
var EmptyList = __webpack_require__(5513);
// EXTERNAL MODULE: ./src/components/Review/ReviewList/index.tsx + 26 modules
var ReviewList = __webpack_require__(908);
// EXTERNAL MODULE: ./src/app/components/UI/Button/index.tsx
var Button = __webpack_require__(7458);
// EXTERNAL MODULE: ./src/components/List/ItemsListWrap/ItemsList/ItemCard/ItemCardSmall/index.tsx + 1 modules
var ItemCardSmall = __webpack_require__(5620);
// EXTERNAL MODULE: ./src/hooks/useItemsToShow.tsx
var useItemsToShow = __webpack_require__(7535);
;// CONCATENATED MODULE: ./src/components/Collection/CollectionWrap/MarksCollectionWrap/index.tsx




const MarksCollectionWrap = ({ items })=>{
    const { itemsToShow, getItemsToShow, isShowMoreButton, buttonText, listRef } = (0,useItemsToShow/* default */.Z)(items, 8, 180);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                ref: listRef,
                className: "grid grid-cols-[repeat(auto-fill,141px)] gap-4 justify-center mb-8",
                children: itemsToShow.map((item, idx)=>{
                    return /*#__PURE__*/ jsx_runtime.jsx(ItemCardSmall/* default */.Z, {
                        itemId: item.markedItemId,
                        mark: item.markValue,
                        collectionType: item.collectionType,
                        isLinkToMovie: true
                    }, idx);
                })
            }),
            isShowMoreButton && /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                className: "mx-auto mt-8",
                context: "empty",
                onClick: getItemsToShow,
                children: buttonText
            })
        ]
    });
};
/* harmony default export */ const CollectionWrap_MarksCollectionWrap = (MarksCollectionWrap);

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./src/context/AuthProvider.tsx + 1 modules
var AuthProvider = __webpack_require__(7459);
// EXTERNAL MODULE: ./src/components/List/ItemsListWrap/ItemsList/ItemCard/index.tsx + 1 modules
var ItemCard = __webpack_require__(5311);
;// CONCATENATED MODULE: ./src/components/Collection/ItemsCollectionWrap/index.tsx




const ItemsCollectionWrap = ({ items, collectionType })=>{
    const { userId } = (0,AuthProvider/* useAuth */.a)();
    const maxListLength = 4;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: "grid grid-cols-[repeat(auto-fill,232px)] gap-x-5 justify-center",
                children: items.map((item, idx)=>{
                    if (idx <= maxListLength) {
                        return /*#__PURE__*/ jsx_runtime.jsx(ItemCard/* default */.Z, {
                            item: item,
                            collectionType: collectionType,
                            isShowButton: false
                        }, idx);
                    }
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                href: `/collection/[type]?uid=${userId}&type=${collectionType}`,
                as: `/collection/${collectionType}?uid=${userId}&type=${collectionType}`,
                className: "w-full md:w-72 border-2 border-rose-600 duration-300 font-semibold leading-none text-rose-600 rounded-3xl hover:border-transparent hover:w-full hover:text-rose-500 p-3 flex justify-center items-center mx-auto mt-8",
                children: `View ${collectionType} collection`
            })
        ]
    });
};
/* harmony default export */ const Collection_ItemsCollectionWrap = (ItemsCollectionWrap);

// EXTERNAL MODULE: ./src/constants/enum.ts
var constants_enum = __webpack_require__(4259);
;// CONCATENATED MODULE: ./src/components/Collection/CollectionWrap/index.tsx







const CollectionWrap = ({ title, collectionType, items, isCurrentUserCollection, collectionOwnerId })=>{
    const isShowTitle = collectionType !== constants_enum/* UserCollections */.zS.reviews;
    const getItemsList = ()=>{
        switch(collectionType){
            case "reviews":
                return /*#__PURE__*/ jsx_runtime.jsx(ReviewList/* default */.Z, {
                    reviews: items,
                    className: "!mb-0",
                    collectionOwnerId: collectionOwnerId,
                    isCollectionList: true
                });
            case "marks":
                return /*#__PURE__*/ jsx_runtime.jsx(CollectionWrap_MarksCollectionWrap, {
                    items: items
                });
            case "movie":
            case "tv":
            case "person":
                return /*#__PURE__*/ jsx_runtime.jsx(Collection_ItemsCollectionWrap, {
                    items: items,
                    collectionType: collectionType
                });
        }
    };
    const getEmptyCollectionText = ()=>{
        switch(collectionType){
            case "movie":
            case "person":
                return `Please add some ${collectionType} to your collection before you can see it here`;
            case "tv":
                return `Please add some TV show to your collection before you can see it here`;
            case "marks":
                return `Please rate something before you can see it here`;
            case "reviews":
                return `Please write a review before you can see it here`;
        }
    };
    if (!items.length) {
        return /*#__PURE__*/ jsx_runtime.jsx(EmptyList/* default */.Z, {
            title: title,
            text: isCurrentUserCollection ? getEmptyCollectionText() : undefined,
            className: "border border-gray-500 mb-4 p-4 last:mb-0"
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "my-16 first:mt-0 last:mb-0",
        children: [
            isShowTitle && /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                children: title
            }),
            getItemsList()
        ]
    });
};
/* harmony default export */ const Collection_CollectionWrap = (CollectionWrap);

;// CONCATENATED MODULE: ./src/components/Collection/index.tsx



const GeneralUserCollection = ({ movies, tvShows, persons, marks, reviews, isCurrentUserCollection = true, collectionOwnerId })=>{
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "mt-24 md:mt-0",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(Collection_CollectionWrap, {
                title: "Movies",
                collectionType: constants_enum/* UserCollections */.zS.movie,
                items: movies ?? [],
                isCurrentUserCollection: isCurrentUserCollection
            }),
            /*#__PURE__*/ jsx_runtime.jsx(Collection_CollectionWrap, {
                title: "TV shows",
                collectionType: constants_enum/* UserCollections */.zS.tv,
                items: tvShows ?? [],
                isCurrentUserCollection: isCurrentUserCollection
            }),
            /*#__PURE__*/ jsx_runtime.jsx(Collection_CollectionWrap, {
                title: "Persons",
                collectionType: constants_enum/* UserCollections */.zS.person,
                items: persons ?? [],
                isCurrentUserCollection: isCurrentUserCollection
            }),
            /*#__PURE__*/ jsx_runtime.jsx(Collection_CollectionWrap, {
                title: "Marks",
                collectionType: constants_enum/* UserCollections */.zS.marks,
                items: marks ?? [],
                isCurrentUserCollection: isCurrentUserCollection
            }),
            /*#__PURE__*/ jsx_runtime.jsx(Collection_CollectionWrap, {
                title: "Reviews",
                collectionType: constants_enum/* UserCollections */.zS.reviews,
                items: reviews ?? [],
                isCurrentUserCollection: isCurrentUserCollection,
                collectionOwnerId: collectionOwnerId
            })
        ]
    });
};
/* harmony default export */ const Collection = (GeneralUserCollection);


/***/ }),

/***/ 1546:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  J: () => (/* binding */ getUserCollection)
});

// EXTERNAL MODULE: ./src/firebase/config.ts
var config = __webpack_require__(6855);
// EXTERNAL MODULE: ./src/handlers/fetchItemData.tsx
var fetchItemData = __webpack_require__(3940);
// EXTERNAL MODULE: ./src/constants/enum.ts
var constants_enum = __webpack_require__(4259);
// EXTERNAL MODULE: external "firebase/database"
var database_ = __webpack_require__(6666);
;// CONCATENATED MODULE: ./src/firebase/handlers/reviewAndReplyHandlers/getReviewFromAnotherUserCollection.tsx


const getReviewFromAnotherUserCollection = async (reviewAuthorId, reviewId, collectionType)=>{
    const collectionPathForReview = `users/${reviewAuthorId}/collection/reviews/${collectionType}/${reviewId}`;
    const collectionRefForReview = (0,database_.ref)(config/* database */.F, collectionPathForReview);
    try {
        const snapshot = await (0,database_.get)(collectionRefForReview);
        if (snapshot.exists()) {
            const review = snapshot.val();
            return review;
        } else {
            return;
        }
    } catch (error) {
        return null;
    }
};

;// CONCATENATED MODULE: ./src/handlers/getCollectionReviewsWithRepliesList.tsx



const getCollectionReviewsWithRepliesList = (collectionOwnerId, collectionReplies)=>{
    return new Promise(async (resolve)=>{
        let reviews;
        const filteredReplies = collectionReplies.filter((item)=>item.reviewedItemId !== undefined && item.reviewId !== undefined);
        const addedReviewIds = new Set();
        const fetchMovieOrTVShowReviews = async (reviewedItemId, reviewId, collectionType)=>{
            const result = await (0,fetchItemData/* fetchItemData */.R)(collectionType, reviewedItemId, "/reviews");
            const fetchedReview = result.results.find((item)=>item.id === reviewId);
            if (!addedReviewIds.has(reviewId) && fetchedReview) {
                const review = {
                    ...fetchedReview,
                    reviewedItemId: reviewedItemId,
                    reviewedItemCollectionType: collectionType
                };
                addedReviewIds.add(reviewId);
                return review;
            }
            return null;
        };
        const fetchMovieReviewPromises = filteredReplies.map((item)=>{
            const isReviewFromDefaultReviews = !item.reviewAuthorId;
            const isReviewsOwnerReview = item.reviewAuthorId === collectionOwnerId;
            const isMovieReview = item.reviewedItemCollectionType === constants_enum/* UserCollections */.zS.movie;
            if (isMovieReview && !isReviewsOwnerReview) {
                return isReviewFromDefaultReviews ? fetchMovieOrTVShowReviews(item.reviewedItemId, item.reviewId, constants_enum/* UserCollections */.zS.movie) : getReviewFromAnotherUserCollection(item.reviewAuthorId, item.reviewId, constants_enum/* UserCollections */.zS.movie);
            }
        });
        const fetchTVShowReviewPromises = filteredReplies.map((item)=>{
            const isReviewFromDefaultReviews = !item.reviewAuthorId;
            const isReviewsOwnerReview = item.reviewAuthorId === collectionOwnerId;
            const isTVShowReview = item.reviewedItemCollectionType === constants_enum/* UserCollections */.zS.tv;
            if (isTVShowReview && !isReviewsOwnerReview) {
                return isReviewFromDefaultReviews ? fetchMovieOrTVShowReviews(item.reviewedItemId, item.reviewId, constants_enum/* UserCollections */.zS.tv) : getReviewFromAnotherUserCollection(item.reviewAuthorId, item.reviewId, constants_enum/* UserCollections */.zS.tv);
            }
        });
        const resolvedMovieReviews = await Promise.all(fetchMovieReviewPromises);
        const resolvedTVShowReviews = await Promise.all(fetchTVShowReviewPromises);
        const movieReviews = resolvedMovieReviews.filter((review)=>review !== null && review !== undefined);
        const tvShowReviews = resolvedTVShowReviews.filter((review)=>review !== null && review !== undefined);
        reviews = [
            ...movieReviews,
            ...tvShowReviews
        ];
        resolve(reviews.filter((item)=>item !== undefined));
    });
};

// EXTERNAL MODULE: ./src/firebase/handlers/userCollectionHandlers/getCollectionItemsList.tsx + 2 modules
var getCollectionItemsList = __webpack_require__(9);
;// CONCATENATED MODULE: ./src/firebase/handlers/userCollectionHandlers/getReviewsOrRepliesFromUserCollection.tsx


const getReviewsOrRepliesFromUserCollection = async (collectionOwnerId, collectionType)=>{
    try {
        const collectionPathForReviewsOrReplies = `users/${collectionOwnerId}/collection/${collectionType}/`;
        const collectionRefForReviewsOrReplies = (0,database_.ref)(config/* database */.F, collectionPathForReviewsOrReplies);
        const paginationQuery = (0,database_.query)(collectionRefForReviewsOrReplies, (0,database_.orderByKey)());
        const snapshot = await (0,database_.get)(paginationQuery);
        const data = snapshot.val() || {};
        const itemsFromStorage = [];
        for(const type in data){
            const items = data[type];
            for(const itemId in items){
                const review = items[itemId];
                itemsFromStorage.push(review);
            }
        }
        return itemsFromStorage;
    } catch (error) {
        throw error;
    }
};

;// CONCATENATED MODULE: ./src/handlers/getUserCollection.tsx





const getUserCollection = async (collectionOwnerId)=>{
    try {
        const collectionMovies = await (0,getCollectionItemsList/* getCollectionItemsList */.n)(collectionOwnerId, constants_enum/* UserCollections */.zS.movie, 5);
        const collectionTVShows = await (0,getCollectionItemsList/* getCollectionItemsList */.n)(collectionOwnerId, constants_enum/* UserCollections */.zS.tv, 5);
        const collectionPersons = await (0,getCollectionItemsList/* getCollectionItemsList */.n)(collectionOwnerId, constants_enum/* UserCollections */.zS.person, 5);
        const collectionMarks = await (0,getCollectionItemsList/* getCollectionItemsList */.n)(collectionOwnerId, constants_enum/* UserCollections */.zS.marks, null);
        const collectionReviews = await getReviewsOrRepliesFromUserCollection(collectionOwnerId, constants_enum/* UserCollections */.zS.reviews);
        const collectionReplies = await getReviewsOrRepliesFromUserCollection(collectionOwnerId, constants_enum/* UserCollections */.zS.replies);
        const reviewsWithUserReplies = await getCollectionReviewsWithRepliesList(collectionOwnerId, collectionReplies);
        const allCollectionReviews = [
            ...collectionReviews.filter((item)=>item.reviewedItemId !== undefined && item.id !== undefined),
            ...reviewsWithUserReplies
        ];
        return {
            collectionMovies: collectionMovies.items,
            collectionTVShows: collectionTVShows.items,
            collectionPersons: collectionPersons.items,
            allCollectionReviews,
            collectionMarks: collectionMarks.items
        };
    } catch (error) {
        throw error;
    }
};


/***/ })

};
;