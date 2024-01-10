"use strict";
exports.id = 9;
exports.ids = [9];
exports.modules = {

/***/ 9:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  n: () => (/* binding */ getCollectionItemsList)
});

// EXTERNAL MODULE: external "firebase/database"
var database_ = __webpack_require__(6666);
// EXTERNAL MODULE: ./src/firebase/config.ts
var config = __webpack_require__(6855);
// EXTERNAL MODULE: ./src/handlers/fetchItemData.tsx
var fetchItemData = __webpack_require__(3940);
// EXTERNAL MODULE: ./src/handlers/createItemCard.tsx
var createItemCard = __webpack_require__(8694);
// EXTERNAL MODULE: ./src/constants/enum.ts
var constants_enum = __webpack_require__(4259);
;// CONCATENATED MODULE: ./src/firebase/handlers/userCollectionHandlers/getCollectionMarksList.tsx



const getCollectionMarksList = async (userId)=>{
    try {
        const getMarks = async (markedItemType)=>{
            let items = [];
            const collectionPathForMarksList = `users/${userId}/collection/marks/${markedItemType}`;
            const collectionRefForMarksList = (0,database_.ref)(config/* database */.F, collectionPathForMarksList);
            const snapshot = await (0,database_.get)(collectionRefForMarksList);
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot)=>{
                    const item = childSnapshot.val();
                    items.push(item);
                });
            }
            return items;
        };
        const movieMarks = await getMarks(constants_enum/* UserCollections */.zS.movie);
        const tvMarks = await getMarks(constants_enum/* UserCollections */.zS.tv);
        return [
            ...movieMarks,
            ...tvMarks
        ];
    } catch (error) {
        throw error;
    }
};

;// CONCATENATED MODULE: ./src/firebase/handlers/userCollectionHandlers/getCollectionItemsInfo.tsx




const getCollectionItemsInfo = async (itemIds, collectionInfo)=>{
    const collectionType = collectionInfo.type;
    try {
        switch(collectionType){
            case "movie":
            case "tv":
            case "person":
                const itemsInfo = await Promise.all(itemIds.map(async (itemId)=>{
                    const itemInfo = await (0,fetchItemData/* fetchItemData */.R)(collectionInfo.type, itemId, "");
                    return itemInfo;
                }));
                const items = (0,createItemCard/* createItemCard */.v)(itemsInfo);
                return items;
            case "reviews":
            case "replies":
                return await Promise.all(itemIds.map(async (itemId)=>{
                    const itemSnapshot = await (0,database_.get)((0,database_.child)(collectionInfo.ref, itemId));
                    return itemSnapshot.val();
                }));
            case "marks":
                return await getCollectionMarksList(collectionInfo.userId);
        }
    } catch (error) {
        throw error;
    }
};

;// CONCATENATED MODULE: ./src/firebase/handlers/userCollectionHandlers/getCollectionItemsList.tsx



const getCollectionItemsList = async (collectionOwnerId, collectionType, itemsPerPage, lastItemId = undefined)=>{
    try {
        const userPath = `users/${collectionOwnerId}/`;
        const userRef = (0,database_.ref)(config/* database */.F, userPath);
        const userSnapshot = await (0,database_.get)(userRef);
        if (!userSnapshot.exists()) {
            throw `Failed to fetch`;
        }
        const collectionPathForUser = `users/${collectionOwnerId}/collection/${collectionType}/`;
        const collectionRefForUser = (0,database_.ref)(config/* database */.F, collectionPathForUser);
        const collectionInfo = {
            type: collectionType,
            ref: collectionRefForUser,
            userId: collectionOwnerId
        };
        let paginationQuery;
        if (lastItemId) {
            if (itemsPerPage !== null) {
                paginationQuery = (0,database_.query)(collectionRefForUser, (0,database_.orderByKey)(), (0,database_.startAfter)(lastItemId), (0,database_.limitToFirst)(itemsPerPage + 1));
            } else {
                paginationQuery = (0,database_.query)(collectionRefForUser, (0,database_.orderByKey)(), (0,database_.startAfter)(lastItemId));
            }
        } else {
            if (itemsPerPage !== null) {
                paginationQuery = (0,database_.query)(collectionRefForUser, (0,database_.orderByKey)(), (0,database_.limitToFirst)(itemsPerPage + 1));
            } else {
                paginationQuery = (0,database_.query)(collectionRefForUser, (0,database_.orderByKey)());
            }
        }
        const snapshot = await (0,database_.get)(paginationQuery);
        const data = snapshot.val() || {};
        const itemIds = Object.keys(data);
        let isMoreDataAvailable = false;
        if (itemsPerPage !== null && itemIds.length > itemsPerPage) {
            isMoreDataAvailable = true;
            itemIds.pop();
        }
        if (!itemIds.length) {
            return {
                isMoreDataAvailable,
                items: []
            };
        }
        const items = await getCollectionItemsInfo(itemIds, collectionInfo);
        return {
            isMoreDataAvailable,
            items: items
        };
    } catch (error) {
        throw error;
    }
};


/***/ })

};
;