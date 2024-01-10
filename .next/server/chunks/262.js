"use strict";
exports.id = 262;
exports.ids = [262];
exports.modules = {

/***/ 6262:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ components_Filter)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./src/app/components/UI/Title/Title.tsx
var Title = __webpack_require__(9457);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/components/Loader/index.tsx
var Loader = __webpack_require__(3616);
// EXTERNAL MODULE: ./src/app/components/UI/Button/index.tsx
var Button = __webpack_require__(7458);
// EXTERNAL MODULE: ./src/app/components/UI/Error/index.tsx
var Error = __webpack_require__(3554);
// EXTERNAL MODULE: ./src/app/components/UI/Input/Select/SelectOption/index.tsx
var SelectOption = __webpack_require__(3803);
// EXTERNAL MODULE: ./src/app/components/UI/Input/Select/index.tsx
var Select = __webpack_require__(84);
// EXTERNAL MODULE: ./src/components/Tag/index.tsx
var Tag = __webpack_require__(6778);
// EXTERNAL MODULE: ./src/handlers/getAllGenres.tsx
var getAllGenres = __webpack_require__(3663);
;// CONCATENATED MODULE: ./src/components/Tag/FilterTagList/index.tsx





const FilterTagList = ({ tags, onToggle, name, type })=>{
    const [itemsList, setItemsList] = (0,external_react_.useState)([]);
    const [selectedTags, setSelectedTags] = (0,external_react_.useState)(tags);
    const onToggleTag = (tag, isChecked)=>{
        onToggle(name, tag, isChecked);
    };
    (0,external_react_.useEffect)(()=>{
        const getTags = async ()=>{
            const allTags = await (0,getAllGenres/* getAllGenres */.K)(type);
            setItemsList(allTags);
        };
        getTags();
    }, []);
    (0,external_react_.useEffect)(()=>{
        setSelectedTags(tags);
    }, [
        tags
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "h-fit",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                variant: "h3",
                children: "With genres"
            }),
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: "flex flex-wrap justify-start items-start mb-5",
                children: itemsList.map((item)=>{
                    return /*#__PURE__*/ jsx_runtime.jsx(Tag/* default */.Z, {
                        tag: item,
                        isEdit: true,
                        isSelected: selectedTags && selectedTags.some((tag)=>tag.name === item.name),
                        onToggle: onToggleTag
                    }, item.name);
                })
            })
        ]
    });
};
/* harmony default export */ const Tag_FilterTagList = (FilterTagList);

// EXTERNAL MODULE: ./src/app/components/UI/Search/index.tsx + 4 modules
var Search = __webpack_require__(4688);
// EXTERNAL MODULE: ./src/constants/enum.ts
var constants_enum = __webpack_require__(4259);
// EXTERNAL MODULE: external "p-limit"
var external_p_limit_ = __webpack_require__(5471);
var external_p_limit_default = /*#__PURE__*/__webpack_require__.n(external_p_limit_);
// EXTERNAL MODULE: ./src/constants/linksToFetch.ts
var linksToFetch = __webpack_require__(6515);
;// CONCATENATED MODULE: ./src/app/components/Filter/handlers/getCountriesList.tsx


const limit = external_p_limit_default()(5) // Установите лимит в 5 запросов
;
const getCountriesList = async (type)=>{
    const allCountries = await fetch(linksToFetch/* URL_TO_FETCH_COUNTRIES */.wc);
    const allCountriesResult = await allCountries.json();
    const requests = allCountriesResult.map(async (item)=>{
        return limit(()=>fetch(linksToFetch/* URL_TO_FETCH_COUNTRY_MOVIE_LIST */.bi.replace("{type}", type).replace("{country}", item.iso_3166_1.toLowerCase())).then((response)=>response.json()));
    });
    const responses = await Promise.all(requests);
    const countriesWhichHaveAvailableResults = allCountriesResult.filter((item, idx)=>{
        return responses[idx].results.length > 0;
    });
    return countriesWhichHaveAvailableResults;
};

;// CONCATENATED MODULE: ./src/app/components/Filter/SelectedFilters/index.tsx




const SelectedFilters = ({ formData, onRemove, onReset, countryList })=>{
    if (Object.keys(formData).length === 0) return null;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "mb-4 p-4 gap-4 bg-gray-900 rounded-md",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "flex justify-between items-center mb-4",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                        variant: "h3",
                        className: "!mb-0 mr-2",
                        children: "Selected filters"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                        context: "text",
                        onClick: onReset,
                        children: "Reset"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: "flex flex-wrap justify-start items-start",
                children: Object.keys(formData).map((field, idx)=>{
                    switch(field){
                        case "primary_release_year":
                        case "first_air_date_year":
                        case "vote_average.lte":
                            return /*#__PURE__*/ jsx_runtime.jsx(Tag/* default */.Z, {
                                tag: {
                                    name: formData[field] ?? "",
                                    field: field
                                },
                                isEdit: true,
                                onRemove: onRemove
                            }, field);
                        case "with_people":
                        case "with_companies":
                        case "with_keywords":
                        case "with_genres":
                            return (formData[field] ?? []).map((item)=>{
                                return /*#__PURE__*/ jsx_runtime.jsx(Tag/* default */.Z, {
                                    tag: {
                                        name: item.name,
                                        field: Object.keys(formData)[idx]
                                    },
                                    isEdit: true,
                                    onRemove: onRemove
                                }, item.name);
                            });
                        case "with_original_language":
                            const country = countryList.find((item)=>item.iso_3166_1.toLowerCase() === formData[field]);
                            const countryName = country.english_name;
                            return /*#__PURE__*/ jsx_runtime.jsx(Tag/* default */.Z, {
                                tag: {
                                    name: countryName,
                                    field: field
                                },
                                isEdit: true,
                                onRemove: onRemove
                            }, field);
                    }
                })
            })
        ]
    });
};
/* harmony default export */ const Filter_SelectedFilters = (SelectedFilters);

;// CONCATENATED MODULE: ./src/hooks/useFilterReducer.tsx

const isGroupedField = {
    primary_release_year: true,
    first_air_date_year: true,
    "vote_average.lte": true,
    with_people: true,
    with_companies: true,
    with_genres: false,
    with_original_language: true,
    with_keywords: true
};
const groupedFilterFields = Object.keys(isGroupedField).filter((key)=>isGroupedField[key]).map((key)=>key);
const ungroupedFilterFields = Object.keys(isGroupedField).filter((key)=>!isGroupedField[key]).map((key)=>key);
const initialState = {};
const useFilterReducer = ()=>{
    const reducer = (state, action)=>{
        switch(action.type){
            case "RESET":
                return initialState;
            case "SELECT_FIELD_CHANGE":
                return {
                    ...state,
                    [action.field]: action.value
                };
            case "ARRAY_FIELD_CHANGE":
                return {
                    ...state,
                    [action.field]: Array.isArray(state[action.field]) ? [
                        ...state[action.field],
                        action.value
                    ] : [
                        action.value
                    ]
                };
            case "REMOVE_TAG":
                const updatedArray = Array.isArray(state[action.tag.field]) ? state[action.tag.field].filter((item)=>item.name !== action.tag.name) : [];
                const updatedState = {
                    ...state,
                    [action.tag.field]: updatedArray
                };
                if (updatedArray.length === 0) {
                    const { [action.tag.field]: removedField, ...restState } = updatedState;
                    return restState;
                }
                return updatedState;
            case "TOGGLE_TAG":
                const currentArrayToggle = Array.isArray(state[action.field]) ? state[action.field] : [];
                const updatedArrayToggle = action.isChecked ? currentArrayToggle.filter((item)=>item.name !== action.tag.name) : [
                    ...currentArrayToggle,
                    action.tag
                ];
                const updatedStateToggle = {
                    ...state,
                    [action.field]: updatedArrayToggle
                };
                if (updatedArrayToggle.length === 0) {
                    const { [action.field]: removedField, ...restStateToggle } = updatedStateToggle;
                    return restStateToggle;
                }
                return updatedStateToggle;
            default:
                return state;
        }
    };
    return (0,external_react_.useReducer)(reducer, initialState);
};
/* harmony default export */ const hooks_useFilterReducer = (useFilterReducer);

;// CONCATENATED MODULE: ./src/app/components/Filter/handlers/getFilterQuery.tsx
const getFilterQuery = (state)=>{
    let filterQueryArray = [];
    for(const key in state){
        if (state.hasOwnProperty(key)) {
            const formFieldValue = state[key];
            const formFieldIds = Array.isArray(formFieldValue) ? formFieldValue.map((item)=>item?.id).join(",") : formFieldValue?.id;
            const stringValue = Array.isArray(formFieldValue) ? formFieldIds : `${formFieldValue}`;
            filterQueryArray.push(`${key}=${stringValue || ""}`);
        }
    }
    return `&${filterQueryArray.join("&").replace(/\s/g, "")}`;
};

;// CONCATENATED MODULE: ./src/app/components/Filter/handlers/generateYearsList.tsx
const generateYearsList = (startYear)=>{
    const currentYear = new Date().getFullYear();
    const yearsList = [];
    for(let year = startYear; year <= currentYear; year++){
        yearsList.push(year.toString());
    }
    return yearsList;
};

;// CONCATENATED MODULE: ./src/app/components/Filter/handlers/generateRatingList.tsx
const generateRatingList = (count)=>{
    return Array.from({
        length: count
    }, (_, index)=>(index + 1).toFixed(1));
};

;// CONCATENATED MODULE: ./src/app/components/Filter/handlers/getSelectOptions.tsx


const getSelectOptions = (field)=>{
    let options = [];
    switch(field){
        case "primary_release_year":
        case "first_air_date_year":
            options = generateYearsList(1930);
            return options;
        case "vote_average.lte":
            options = generateRatingList(10);
            return options;
    }
};

;// CONCATENATED MODULE: ./src/app/components/Filter/index.tsx
















const Filter = ({ onApplyFilter, collectionType, fields, defaultUrl })=>{
    const [state, dispatch] = hooks_useFilterReducer();
    const [isLoading, setIsLoading] = (0,external_react_.useState)(false);
    const [error, setError] = (0,external_react_.useState)("");
    const [countryList, setCountryList] = (0,external_react_.useState)([]);
    const handleResetFilter = ()=>{
        dispatch({
            type: "RESET"
        });
        onApplyFilter(defaultUrl);
    };
    const handleSelectChange = (field, value)=>{
        dispatch({
            type: "SELECT_FIELD_CHANGE",
            field,
            value
        });
    };
    const handleArrayFieldChange = (field, value)=>{
        dispatch({
            type: "ARRAY_FIELD_CHANGE",
            field,
            value
        });
    };
    const handleRemoveFilterTag = (tag)=>{
        dispatch({
            type: "REMOVE_TAG",
            tag
        });
    };
    const handleToggleTag = (field, tag, isChecked)=>{
        dispatch({
            type: "TOGGLE_TAG",
            field,
            tag,
            isChecked
        });
    };
    const handleSearch = async (event)=>{
        event.preventDefault();
        setIsLoading(true);
        try {
            const query = Object.keys(state).length === 0 ? "" : getFilterQuery(state);
            onApplyFilter(defaultUrl.concat(query));
            setError("");
        } catch (error) {
            setError(error.toString());
        } finally{
            setIsLoading(false);
        }
    };
    const getFilterField = (field)=>{
        switch(field){
            case "primary_release_year":
            case "first_air_date_year":
            case "vote_average.lte":
                const options = getSelectOptions(field);
                const dateAndVoteAverageSelectValue = state[field] ?? "Select";
                return /*#__PURE__*/ jsx_runtime.jsx(Select/* default */.Z, {
                    label: constants_enum/* FilterFields */.BM[field],
                    name: field,
                    onChange: handleSelectChange,
                    defaultValue: dateAndVoteAverageSelectValue,
                    children: options.map((item, idx)=>/*#__PURE__*/ jsx_runtime.jsx(SelectOption/* default */.Z, {
                            value: item,
                            label: item
                        }, idx))
                }, field);
            case "with_original_language":
                const countrySelectValue = countryList.find((item)=>item.iso_3166_1.toLowerCase() === state[field])?.english_name ?? "Select";
                return /*#__PURE__*/ jsx_runtime.jsx(Select/* default */.Z, {
                    label: constants_enum/* FilterFields */.BM[field],
                    name: field,
                    onChange: handleSelectChange,
                    defaultValue: countrySelectValue,
                    children: countryList.map((item, idx)=>/*#__PURE__*/ jsx_runtime.jsx(SelectOption/* default */.Z, {
                            value: item.iso_3166_1.toLowerCase(),
                            label: item.english_name
                        }, idx))
                }, field);
            case "with_people":
            case "with_companies":
            case "with_keywords":
                return /*#__PURE__*/ jsx_runtime.jsx(Search/* default */.Z, {
                    name: field,
                    label: constants_enum/* FilterFields */.BM[field],
                    urlToFetch: constants_enum/* FilterUrlToSearchMap */.NH[field].toString(),
                    onSearch: handleArrayFieldChange
                }, field);
            case "with_genres":
                return /*#__PURE__*/ jsx_runtime.jsx(Tag_FilterTagList, {
                    tags: state[field] ?? [],
                    onToggle: handleToggleTag,
                    name: field,
                    type: collectionType
                }, field);
        }
    };
    const renderFieldGroup = (filterFieldGroup)=>{
        return filterFieldGroup.map((field)=>{
            if (fields.includes(field)) return getFilterField(field);
        });
    };
    (0,external_react_.useEffect)(()=>{
        const fetchCountriesList = async ()=>{
            const countryList = await getCountriesList(collectionType);
            setCountryList(countryList);
        };
        fetchCountriesList();
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "mb-16 bg-gray-950",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                children: "Filter"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("form", {
                onSubmit: handleSearch,
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4",
                        children: renderFieldGroup(groupedFilterFields)
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        children: renderFieldGroup(ungroupedFilterFields)
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(Filter_SelectedFilters, {
                        formData: state,
                        onRemove: handleRemoveFilterTag,
                        onReset: handleResetFilter,
                        countryList: countryList
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                        type: "submit",
                        className: "mx-auto",
                        children: isLoading ? /*#__PURE__*/ jsx_runtime.jsx(Loader/* default */.Z, {
                            isShowText: true,
                            type: "static"
                        }) : "Apply"
                    }),
                    error && /*#__PURE__*/ jsx_runtime.jsx(Error/* default */.Z, {
                        className: "px-4 py-2 bg-rose-600/20 w-full rounded-md",
                        error: error
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const components_Filter = (Filter);


/***/ })

};
;