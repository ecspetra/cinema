"use strict";
(() => {
var exports = {};
exports.id = 192;
exports.ids = [192];
exports.modules = {

/***/ 4619:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ next_route_loaderkind_PAGES_page_2Fprofile_2F_5Bid_5D_preferredRegion_absolutePagePath_private_next_pages_2Fprofile_2F_5Bid_5D_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_config),
  "default": () => (/* binding */ next_route_loaderkind_PAGES_page_2Fprofile_2F_5Bid_5D_preferredRegion_absolutePagePath_private_next_pages_2Fprofile_2F_5Bid_5D_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_),
  getServerSideProps: () => (/* binding */ next_route_loaderkind_PAGES_page_2Fprofile_2F_5Bid_5D_preferredRegion_absolutePagePath_private_next_pages_2Fprofile_2F_5Bid_5D_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_getServerSideProps),
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

// NAMESPACE OBJECT: ./src/pages/profile/[id].tsx
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
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./src/components/Loader/index.tsx
var Loader = __webpack_require__(3616);
// EXTERNAL MODULE: ./src/app/components/UI/Title/Title.tsx
var Title = __webpack_require__(9457);
// EXTERNAL MODULE: ./src/components/Details/DetailsList/index.tsx + 2 modules
var DetailsList = __webpack_require__(8938);
;// CONCATENATED MODULE: ./src/components/Profile/ProfileInfo/index.tsx




const ProfileInfo = ({ userInfo })=>{
    const [profile, setProfile] = (0,external_react_.useState)(null);
    const details = [
        {
            type: "user_email",
            title: "Email:",
            text: profile?.email
        },
        {
            type: "user_date_of_birth",
            title: "Date of birth:",
            text: profile?.dateOfBirth
        },
        {
            type: "user_country",
            title: "Country:",
            text: profile?.country
        }
    ];
    (0,external_react_.useEffect)(()=>{
        setProfile(userInfo);
    }, [
        userInfo
    ]);
    return /*#__PURE__*/ jsx_runtime.jsx("div", {
        className: "flex flex-col justify-start items-center",
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "w-full",
            children: [
                /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                    className: "text-3xl md:text-7xl after:hidden pb-0",
                    children: profile?.displayName
                }),
                /*#__PURE__*/ jsx_runtime.jsx(DetailsList/* default */.Z, {
                    itemsList: details,
                    className: "!mb-8"
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "mb-8",
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                            variant: "h3",
                            children: "About"
                        }),
                        profile?.about ? profile?.about : "No info yet"
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const Profile_ProfileInfo = (ProfileInfo);

// EXTERNAL MODULE: ./src/app/components/UI/Input/Textarea/index.tsx
var Textarea = __webpack_require__(8728);
// EXTERNAL MODULE: ./src/app/components/UI/Button/index.tsx
var Button = __webpack_require__(7458);
// EXTERNAL MODULE: ./src/app/components/UI/Input/InputField/index.tsx
var InputField = __webpack_require__(6492);
// EXTERNAL MODULE: external "@fortawesome/free-solid-svg-icons"
var free_solid_svg_icons_ = __webpack_require__(6466);
// EXTERNAL MODULE: ./src/app/components/UI/Error/index.tsx
var Error = __webpack_require__(3554);
;// CONCATENATED MODULE: external "react-tailwindcss-datepicker"
const external_react_tailwindcss_datepicker_namespaceObject = require("react-tailwindcss-datepicker");
var external_react_tailwindcss_datepicker_default = /*#__PURE__*/__webpack_require__.n(external_react_tailwindcss_datepicker_namespaceObject);
// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__(2245);
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);
;// CONCATENATED MODULE: ./src/app/components/UI/Datepicker/index.tsx




const CustomDatepicker = ({ initialDateValue, label, onChange, required })=>{
    const [value, setValue] = (0,external_react_.useState)({
        startDate: external_moment_default()(initialDateValue, "YYYY-MM-DD").toDate(),
        endDate: external_moment_default()(initialDateValue, "YYYY-MM-DD").toDate()
    });
    const handleValueChange = (value, e)=>{
        if (value) {
            const dateValueType = {
                startDate: value.startDate,
                endDate: value.endDate
            };
            onChange(dateValueType, e);
            setValue(value);
        }
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "relative w-full bg-transparent text-base border border-gray-500 hover:border-white focus-within:border-white duration-300 block text-white",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("span", {
                className: "text-xs text-gray-500 font-semibold absolute top-3 left-3",
                children: `${label}${required ? " *" : ""}`
            }),
            /*#__PURE__*/ jsx_runtime.jsx((external_react_tailwindcss_datepicker_default()), {
                readOnly: true,
                primaryColor: "rose",
                toggleClassName: (defaultClassName)=>`${defaultClassName} pt-4`,
                inputClassName: (defaultClassName)=>`${defaultClassName} w-full !bg-transparent !rounded-none focus:!ring-0 focus:!border-0 focus-visible:!outline-0 !border-0 !font-light !text-base !text-white pl-3 pt-7 pb-2 pr-3`,
                useRange: false,
                asSingle: true,
                value: value,
                onChange: handleValueChange,
                minDate: new Date("1940-01-01"),
                maxDate: new Date()
            })
        ]
    });
};
/* harmony default export */ const Datepicker = (CustomDatepicker);

;// CONCATENATED MODULE: ./src/components/Profile/hooks/useProfileEditFormReducer.tsx

const initialState = (profileInfo)=>{
    return {
        isLoading: false,
        isTouched: false,
        formData: {
            name: {
                value: profileInfo.displayName,
                error: ""
            },
            country: {
                value: profileInfo.country || "",
                error: ""
            },
            dateOfBirth: {
                value: profileInfo.dateOfBirth || "",
                error: ""
            },
            about: {
                value: profileInfo.about || "",
                error: ""
            },
            formError: {
                error: ""
            }
        }
    };
};
const reducer = (state, action, profileInfo)=>{
    switch(action.type){
        case "SET_FORM_DATA":
            return {
                ...state,
                formData: action.payload
            };
        case "SET_LOADING":
            return {
                ...state,
                isLoading: action.payload
            };
        case "SET_TOUCHED":
            return {
                ...state,
                isTouched: true
            };
        case "CLEAR_FORM":
            return initialState(profileInfo);
        default:
            return state;
    }
};
const useProfileEditCredentialFormReducer = (profileInfo)=>{
    return (0,external_react_.useReducer)((state, action)=>reducer(state, action, profileInfo), initialState(profileInfo));
};
/* harmony default export */ const useProfileEditFormReducer = (useProfileEditCredentialFormReducer);

// EXTERNAL MODULE: ./src/context/ModalProvider.tsx
var ModalProvider = __webpack_require__(4858);
// EXTERNAL MODULE: ./src/constants/errorMessages.ts
var errorMessages = __webpack_require__(3514);
// EXTERNAL MODULE: ./src/handlers/handleModals.tsx
var handleModals = __webpack_require__(1168);
// EXTERNAL MODULE: ./src/firebase/config.ts
var config = __webpack_require__(6855);
// EXTERNAL MODULE: external "firebase/auth"
var auth_ = __webpack_require__(4610);
// EXTERNAL MODULE: ./src/firebase/handlers/profileHandlers/updateUserInStorage.tsx
var updateUserInStorage = __webpack_require__(6798);
;// CONCATENATED MODULE: ./src/firebase/handlers/profileHandlers/updateUserProfileInfo.tsx



const updateUserProfileInfo = async (updatedUserInfo)=>{
    const currentUser = config/* auth */.I.currentUser;
    const displayName = updatedUserInfo.name.value;
    const userId = currentUser?.uid;
    const photoURL = currentUser?.photoURL;
    const updatedFields = {
        displayName: updatedUserInfo.name.value,
        country: updatedUserInfo.country.value,
        dateOfBirth: updatedUserInfo.dateOfBirth.value,
        about: updatedUserInfo.about.value
    };
    await (0,auth_.updateProfile)(currentUser, {
        displayName,
        photoURL
    });
    await (0,updateUserInStorage/* updateUserInStorage */.c)(updatedFields, userId);
};

;// CONCATENATED MODULE: ./src/components/Profile/hooks/useProfileEditForm.tsx





const useProfileEditForm = (profileInfo, onFormClose)=>{
    const [state, dispatch] = useProfileEditFormReducer(profileInfo);
    const { showModal } = (0,ModalProvider/* useModal */.d)();
    const isNameValid = state.formData.name.value.length > 0;
    const handleNameChange = (event)=>{
        const error = event.target.value === "" ? errorMessages/* ERROR_MESSAGES */.R.REQUIRED_FIELD : "";
        updateField("name", event.target.value, error);
    };
    const handleCountryChange = (event)=>{
        updateField("country", event.target.value, "");
    };
    const handleDateOfBirthChange = (date)=>{
        let formattedDate;
        if (!date) {
            formattedDate = "";
        } else {
            formattedDate = date.startDate;
        }
        updateField("dateOfBirth", formattedDate, "");
    };
    const handleTextareaChange = (value)=>{
        updateField("about", value, "");
    };
    const updateField = (fieldName, value, error)=>{
        dispatch({
            type: "SET_FORM_DATA",
            payload: {
                ...state.formData,
                [fieldName]: {
                    ...state.formData[fieldName],
                    value,
                    error
                }
            }
        });
        if (!state.isTouched) {
            dispatch({
                type: "SET_TOUCHED",
                payload: true
            });
        }
    };
    const updateFormError = (error)=>{
        dispatch({
            type: "SET_FORM_DATA",
            payload: {
                ...state.formData,
                formError: {
                    error
                }
            }
        });
    };
    const clearForm = ()=>{
        dispatch({
            type: "CLEAR_FORM"
        });
    };
    const handleSubmit = async (event)=>{
        event.preventDefault();
        dispatch({
            type: "SET_LOADING",
            payload: true
        });
        if (isNameValid && state.isTouched) {
            try {
                await updateUserProfileInfo(state.formData);
                onFormClose(false);
                updateFormError("");
                clearForm();
                (0,handleModals/* showSuccessNotification */.LX)(showModal, "Your profile was successfully updated");
            } catch (error) {
                updateFormError(error.toString());
            } finally{
                dispatch({
                    type: "SET_LOADING",
                    payload: false
                });
            }
        } else {
            dispatch({
                type: "SET_FORM_DATA",
                payload: {
                    ...state.formData,
                    name: {
                        ...state.formData.name,
                        error: isNameValid ? "" : errorMessages/* ERROR_MESSAGES */.R.REQUIRED_FIELD
                    }
                }
            });
            dispatch({
                type: "SET_LOADING",
                payload: false
            });
        }
    };
    return {
        state,
        handleNameChange,
        handleCountryChange,
        handleDateOfBirthChange,
        handleTextareaChange,
        handleSubmit
    };
};
/* harmony default export */ const hooks_useProfileEditForm = (useProfileEditForm);

;// CONCATENATED MODULE: ./src/components/Profile/Form/EditProfileForm/index.tsx









const EditProfileForm = ({ profileInfo, onFormClose })=>{
    const { state, handleNameChange, handleCountryChange, handleDateOfBirthChange, handleTextareaChange, handleSubmit } = hooks_useProfileEditForm(profileInfo, onFormClose);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("form", {
        onSubmit: handleSubmit,
        className: "flex flex-col justify-start items-start gap-4 mb-16",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(InputField/* default */.Z, {
                id: "userName",
                label: "Name",
                value: state.formData.name.value,
                error: state.formData.name.error,
                onChange: handleNameChange,
                icon: free_solid_svg_icons_.faUser,
                required: true,
                placeholder: "Name"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(InputField/* default */.Z, {
                id: "country",
                label: "Country",
                value: state.formData.country.value,
                onChange: handleCountryChange,
                icon: free_solid_svg_icons_.faCalendarCheck,
                placeholder: "Country"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(Datepicker, {
                initialDateValue: state.formData.dateOfBirth.value,
                onChange: (date)=>handleDateOfBirthChange(date),
                label: "Date of birth"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(Textarea/* default */.Z, {
                onChange: handleTextareaChange,
                value: state.formData.about.value
            }),
            state.formData.formError.error && /*#__PURE__*/ jsx_runtime.jsx(Error/* default */.Z, {
                className: "px-4 py-2 bg-rose-600/20 w-full rounded-md",
                error: state.formData.formError.error
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "w-full mt-8 flex justify-start items-center",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                        type: "submit",
                        children: state.isLoading ? /*#__PURE__*/ jsx_runtime.jsx(Loader/* default */.Z, {
                            isShowText: true,
                            type: "static"
                        }) : "Update"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                        context: "filledDark",
                        className: "ml-2",
                        onClick: ()=>onFormClose(false),
                        children: "Cancel"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const Form_EditProfileForm = (EditProfileForm);

// EXTERNAL MODULE: ./src/constants/images.ts
var constants_images = __webpack_require__(8989);
// EXTERNAL MODULE: ./src/components/TopBanner/index.tsx + 2 modules
var TopBanner = __webpack_require__(9019);
// EXTERNAL MODULE: ./src/components/Images/Image/index.tsx + 1 modules
var Image = __webpack_require__(1686);
// EXTERNAL MODULE: ./src/app/assets/images/default-user-image.svg
var default_user_image = __webpack_require__(3679);
// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(9003);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);
// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__(7197);
;// CONCATENATED MODULE: ./src/app/components/UI/Input/InputField/FileInputField/index.tsx





const FileInputField_InputField = ({ id, onChange, error, className })=>{
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("label", {
                htmlFor: id,
                className: external_classnames_default()("w-full min-h-[48px] bg-gray-700 rounded-3xl hover:bg-gray-600 font-semibold p-3 flex justify-center items-center duration-300 cursor-pointer", className),
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                        icon: free_solid_svg_icons_.faFileArrowUp,
                        className: "mr-2"
                    }),
                    "Upload image",
                    /*#__PURE__*/ jsx_runtime.jsx("input", {
                        onChange: onChange,
                        type: "file",
                        id: id,
                        accept: "image/*",
                        className: "hidden"
                    })
                ]
            }),
            error && /*#__PURE__*/ jsx_runtime.jsx(Error/* default */.Z, {
                className: "text-center",
                error: error
            })
        ]
    });
};
/* harmony default export */ const FileInputField = (FileInputField_InputField);

;// CONCATENATED MODULE: ./src/app/components/UI/ProgressBar/index.tsx

const ProgressBar = ({ progress })=>{
    return /*#__PURE__*/ jsx_runtime.jsx("div", {
        style: {
            width: `${progress}%`
        },
        className: "h-1 bg-rose-600 mt-2"
    });
};
/* harmony default export */ const UI_ProgressBar = (ProgressBar);

;// CONCATENATED MODULE: external "firebase/storage"
const storage_namespaceObject = require("firebase/storage");
;// CONCATENATED MODULE: ./src/firebase/handlers/profileHandlers/updateUserProfileIcon.tsx



const updateUserProfileIcon = async (newIcon)=>{
    const currentUser = config/* auth */.I.currentUser;
    const displayName = currentUser?.displayName;
    const currentUserId = currentUser?.uid;
    const photoURL = newIcon;
    const updateFields = {
        photoURL: newIcon
    };
    await (0,auth_.updateProfile)(currentUser, {
        displayName,
        photoURL
    });
    await (0,updateUserInStorage/* updateUserInStorage */.c)(updateFields, currentUserId);
};

;// CONCATENATED MODULE: ./src/hooks/useUploadProfileImage.tsx





const useUploadProfileImage = (photoURL)=>{
    const [image, setImage] = (0,external_react_.useState)({
        value: photoURL,
        error: ""
    });
    const [uploadProgress, setUploadProgress] = (0,external_react_.useState)(0);
    const storage = (0,storage_namespaceObject.getStorage)();
    const { showModal } = (0,ModalProvider/* useModal */.d)();
    const isShowProgressBar = uploadProgress > 0 && uploadProgress < 100;
    const isShowSaveButton = image && !image.error && uploadProgress === 100;
    const createTemporaryImage = (temporaryImageSrc, error)=>{
        const uploadingError = error.length !== 0 ? error : "";
        setImage({
            value: temporaryImageSrc,
            error: uploadingError
        });
    };
    const changeProfileImage = async (event)=>{
        const file = event.target.files && event.target.files[0];
        const MAX_FILE_SIZE = 1024 * 1024;
        if (!file) return;
        if (file.size > MAX_FILE_SIZE) {
            createTemporaryImage(image.value, "The file size should not exceed 1MB");
            return;
        } else {
            try {
                const response = await uploadProfileImage(file, setUploadProgress);
                if (response.status === 200) {
                    createTemporaryImage(response.data, "");
                }
            } catch (error) {
                createTemporaryImage(image.value, error.toString());
            }
        }
    };
    const uploadProfileImage = async (file, setUploadProgress)=>{
        const storageRef = (0,storage_namespaceObject.ref)(storage, `images/${file.name}`);
        const uploadTask = (0,storage_namespaceObject.uploadBytesResumable)(storageRef, file);
        uploadTask.on("state_changed", (snapshot)=>{
            const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            setUploadProgress(progress);
        });
        try {
            await uploadTask;
            const downloadURL = await (0,storage_namespaceObject.getDownloadURL)(storageRef);
            return {
                status: 200,
                data: downloadURL
            };
        } catch (error) {
            return {
                status: 500,
                data: "Error uploading image"
            };
        }
    };
    const saveProfileImage = ()=>{
        updateUserProfileIcon(image.value).then(()=>{
            setUploadProgress(0);
            (0,handleModals/* showSuccessNotification */.LX)(showModal, "Your profile was successfully updated");
        });
    };
    (0,external_react_.useEffect)(()=>{
        setImage({
            value: photoURL,
            error: ""
        });
    }, [
        photoURL
    ]);
    return {
        image,
        uploadProgress,
        isShowProgressBar,
        isShowSaveButton,
        changeProfileImage,
        saveProfileImage
    };
};
/* harmony default export */ const hooks_useUploadProfileImage = (useUploadProfileImage);

;// CONCATENATED MODULE: ./src/components/Profile/ProfileInfo/ProfileIcon/index.tsx







const ProfileIcon = ({ photoURL, isCurrentUserProfile })=>{
    const { image, uploadProgress, isShowProgressBar, isShowSaveButton, changeProfileImage, saveProfileImage } = hooks_useUploadProfileImage(photoURL);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(Image/* default */.Z, {
                className: "!w-[232px] h-[232px] rounded-full mb-4",
                src: image.value,
                defaultImage: default_user_image/* default */.Z
            }),
            isCurrentUserProfile && /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                children: [
                    isShowSaveButton ? /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                        className: "w-full",
                        onClick: saveProfileImage,
                        children: "Save changes"
                    }) : /*#__PURE__*/ jsx_runtime.jsx(FileInputField, {
                        id: "profileImage",
                        error: image.error,
                        onChange: changeProfileImage
                    }),
                    isShowProgressBar && /*#__PURE__*/ jsx_runtime.jsx(UI_ProgressBar, {
                        progress: uploadProgress
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const ProfileInfo_ProfileIcon = (ProfileIcon);

// EXTERNAL MODULE: ./src/components/Tag/TagList/index.tsx + 2 modules
var TagList = __webpack_require__(1226);
// EXTERNAL MODULE: ./src/context/AuthProvider.tsx + 1 modules
var AuthProvider = __webpack_require__(7459);
// EXTERNAL MODULE: ./src/app/components/UI/Dropdown/DropdownItem/index.tsx
var DropdownItem = __webpack_require__(5122);
// EXTERNAL MODULE: ./src/app/components/UI/Dropdown/index.tsx
var Dropdown = __webpack_require__(4735);
// EXTERNAL MODULE: ./src/components/List/EmptyList/index.tsx
var EmptyList = __webpack_require__(5513);
// EXTERNAL MODULE: ./src/components/Profile/ProfileInfo/ProfileIcon/ProfileIconSmall/index.tsx
var ProfileIconSmall = __webpack_require__(9390);
;// CONCATENATED MODULE: ./src/components/Friends/FriendList/index.tsx








const FriendList = ({ friends, onRemove })=>{
    const { showModal } = (0,ModalProvider/* useModal */.d)();
    const [itemsList, setItemsList] = (0,external_react_.useState)([]);
    const initialItemsLength = 3;
    const isShowMoreButton = friends.length > initialItemsLength;
    (0,external_react_.useEffect)(()=>{
        setItemsList(friends);
    }, [
        friends
    ]);
    if (!itemsList.length) return /*#__PURE__*/ jsx_runtime.jsx(EmptyList/* default */.Z, {
        title: "Friends",
        text: "No friends yet"
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "mb-16",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                children: "Friends"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "flex justify-start items-center",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: "flex justify-start items-center",
                        children: itemsList.map((item, idx)=>{
                            if (idx < initialItemsLength) {
                                return /*#__PURE__*/ jsx_runtime.jsx(ProfileIconSmall/* default */.Z, {
                                    userId: item.info.id,
                                    photoURL: item.info.photoURL,
                                    isLinkToProfile: true
                                }, item.info.id);
                            }
                        })
                    }),
                    isShowMoreButton && /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                        context: "text",
                        onClick: ()=>(0,handleModals/* openFriendsModal */.MB)(showModal, itemsList, onRemove),
                        children: "Show all"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const Friends_FriendList = (FriendList);

;// CONCATENATED MODULE: ./src/components/Profile/hooks/useProfileEditCredentialFormReducer.tsx

const useProfileEditCredentialFormReducer_initialState = {
    isLoading: false,
    isTouched: false,
    formData: {
        email: {
            value: "",
            error: ""
        },
        oldPassword: {
            value: "",
            error: ""
        },
        newPassword: {
            value: "",
            error: ""
        },
        formError: {
            error: ""
        }
    }
};
const useProfileEditCredentialFormReducer_reducer = (state, action)=>{
    switch(action.type){
        case "SET_FORM_DATA":
            return {
                ...state,
                formData: action.payload
            };
        case "SET_LOADING":
            return {
                ...state,
                isLoading: action.payload
            };
        case "SET_TOUCHED":
            return {
                ...state,
                isTouched: true
            };
        case "CLEAR_FORM":
            return useProfileEditCredentialFormReducer_initialState;
        default:
            return state;
    }
};
const useProfileEditCredentialFormReducer_useProfileEditCredentialFormReducer = ()=>{
    return (0,external_react_.useReducer)(useProfileEditCredentialFormReducer_reducer, useProfileEditCredentialFormReducer_initialState);
};
/* harmony default export */ const hooks_useProfileEditCredentialFormReducer = (useProfileEditCredentialFormReducer_useProfileEditCredentialFormReducer);

;// CONCATENATED MODULE: ./src/firebase/handlers/profileHandlers/updateUserCredential.tsx



const updateUserCredential = async (formData)=>{
    const currentUser = config/* auth */.I.currentUser;
    const currentUserId = currentUser?.uid;
    const oldEmail = currentUser?.email;
    const updateFields = {
        email: formData.email.value
    };
    const credential = auth_.EmailAuthProvider.credential(oldEmail, formData.oldPassword.value);
    await (0,auth_.reauthenticateWithCredential)(currentUser, credential).then(async ()=>{
        await (0,auth_.updateEmail)(currentUser, formData.email.value);
        await (0,auth_.updatePassword)(currentUser, formData.newPassword.value);
        await (0,updateUserInStorage/* updateUserInStorage */.c)(updateFields, currentUserId);
    });
};

;// CONCATENATED MODULE: ./src/components/Profile/hooks/useProfileEditCredentialForm.tsx





const useProfileEditCredentialForm = (onFormClose)=>{
    const [state, dispatch] = hooks_useProfileEditCredentialFormReducer();
    const { showModal } = (0,ModalProvider/* useModal */.d)();
    const isEmailValid = /\S+@\S+\.\S+/.test(state.formData.email.value);
    const isOldPasswordValid = state.formData.oldPassword.value.length > 0;
    const isNewPasswordValid = state.formData.newPassword.value.length > 6;
    const isNewPasswordSameAsOldPassword = state.formData.newPassword.value === state.formData.oldPassword.value;
    const handleEmailChange = (event)=>{
        const error = event.target.value === "" ? errorMessages/* ERROR_MESSAGES */.R.INVALID_EMAIL : "";
        updateField("email", event.target.value, error);
    };
    const handleOldPasswordChange = (event)=>{
        const error = event.target.value === "" ? errorMessages/* ERROR_MESSAGES */.R.INVALID_PASSWORD : "";
        updateField("oldPassword", event.target.value, error);
    };
    const handleNewPasswordChange = (event)=>{
        const error = event.target.value === "" ? errorMessages/* ERROR_MESSAGES */.R.INVALID_PASSWORD : "";
        updateField("newPassword", event.target.value, error);
    };
    const updateField = (fieldName, value, error = "")=>{
        dispatch({
            type: "SET_FORM_DATA",
            payload: {
                ...state.formData,
                [fieldName]: {
                    ...state.formData[fieldName],
                    value,
                    error
                }
            }
        });
        if (!state.isTouched) {
            dispatch({
                type: "SET_TOUCHED",
                payload: true
            });
        }
    };
    const updateFormError = (error)=>{
        dispatch({
            type: "SET_FORM_DATA",
            payload: {
                ...state.formData,
                formError: {
                    error
                }
            }
        });
    };
    const clearForm = ()=>{
        dispatch({
            type: "CLEAR_FORM"
        });
    };
    const handleSubmit = async (event)=>{
        event.preventDefault();
        dispatch({
            type: "SET_LOADING",
            payload: true
        });
        const isFormValid = isEmailValid && isOldPasswordValid && isNewPasswordValid && !isNewPasswordSameAsOldPassword;
        if (isFormValid && state.isTouched) {
            try {
                await updateUserCredential(state.formData);
                onFormClose(false);
                updateFormError("");
                clearForm();
                (0,handleModals/* showSuccessNotification */.LX)(showModal, "Your profile was successfully updated");
            } catch (error) {
                updateFormError(error.toString());
            } finally{
                dispatch({
                    type: "SET_LOADING",
                    payload: false
                });
            }
        } else {
            dispatch({
                type: "SET_FORM_DATA",
                payload: {
                    ...state.formData,
                    email: {
                        ...state.formData.email,
                        error: isEmailValid ? "" : errorMessages/* ERROR_MESSAGES */.R.REQUIRED_FIELD
                    },
                    oldPassword: {
                        ...state.formData.oldPassword,
                        error: isOldPasswordValid ? "" : errorMessages/* ERROR_MESSAGES */.R.REQUIRED_FIELD
                    },
                    newPassword: {
                        ...state.formData.newPassword,
                        error: !isNewPasswordValid ? errorMessages/* ERROR_MESSAGES */.R.INVALID_PASSWORD : isNewPasswordSameAsOldPassword ? errorMessages/* ERROR_MESSAGES */.R.SAME_PASSWORDS : ""
                    }
                }
            });
            dispatch({
                type: "SET_LOADING",
                payload: false
            });
        }
    };
    return {
        state,
        handleEmailChange,
        handleOldPasswordChange,
        handleNewPasswordChange,
        handleSubmit
    };
};
/* harmony default export */ const hooks_useProfileEditCredentialForm = (useProfileEditCredentialForm);

;// CONCATENATED MODULE: ./src/components/Profile/Form/EditCredentialForm/index.tsx







const EditCredentialForm = ({ onFormClose })=>{
    const { state, handleEmailChange, handleOldPasswordChange, handleNewPasswordChange, handleSubmit } = hooks_useProfileEditCredentialForm(onFormClose);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("form", {
        onSubmit: handleSubmit,
        className: "flex flex-col justify-start items-start gap-4 mb-16",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(InputField/* default */.Z, {
                id: "userEmail",
                label: "Email",
                value: state.formData.email.value,
                error: state.formData.email.error,
                onChange: handleEmailChange,
                icon: free_solid_svg_icons_.faAt,
                required: true,
                placeholder: "Email"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(InputField/* default */.Z, {
                id: "userOldPassword",
                label: "Old password",
                value: state.formData.oldPassword.value,
                error: state.formData.oldPassword.error,
                onChange: handleOldPasswordChange,
                icon: free_solid_svg_icons_.faKey,
                required: true,
                type: "password",
                placeholder: "Old password"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(InputField/* default */.Z, {
                id: "userNewPassword",
                label: "New password",
                value: state.formData.newPassword.value,
                error: state.formData.newPassword.error,
                onChange: handleNewPasswordChange,
                icon: free_solid_svg_icons_.faKey,
                required: true,
                type: "password",
                placeholder: "New password"
            }),
            state.formData.formError.error && /*#__PURE__*/ jsx_runtime.jsx(Error/* default */.Z, {
                className: "px-4 py-2 bg-rose-600/20 w-full rounded-md",
                error: state.formData.formError.error
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "w-full mt-8 flex justify-start items-center",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                        type: "submit",
                        children: state.isLoading ? /*#__PURE__*/ jsx_runtime.jsx(Loader/* default */.Z, {
                            isShowText: true,
                            type: "static"
                        }) : "Update"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                        context: "filledDark",
                        className: "ml-2",
                        onClick: ()=>onFormClose(false),
                        children: "Cancel"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const Form_EditCredentialForm = (EditCredentialForm);

// EXTERNAL MODULE: external "firebase/database"
var database_ = __webpack_require__(6666);
;// CONCATENATED MODULE: ./src/firebase/handlers/friendHandlers/createNewFriend.tsx


const createNewFriend = async (newFriendId)=>{
    const currentUser = config/* auth */.I.currentUser;
    const currentUserId = currentUser?.uid;
    const friendsCollectionPathForCurrentUser = `users/${currentUserId}/friends/${newFriendId}/`;
    const friendsCollectionPathForNewFriend = `users/${newFriendId}/friends/${currentUserId}/`;
    const friendsCollectionRefForCurrentUser = (0,database_.ref)(config/* database */.F, friendsCollectionPathForCurrentUser);
    const friendsCollectionRefForNewFriend = (0,database_.ref)(config/* database */.F, friendsCollectionPathForNewFriend);
    await (0,database_.set)(friendsCollectionRefForCurrentUser, newFriendId);
    await (0,database_.set)(friendsCollectionRefForNewFriend, currentUserId);
};

;// CONCATENATED MODULE: ./src/firebase/handlers/friendHandlers/removeFriend.tsx


const removeFriend = (friendId)=>{
    const currentUser = config/* auth */.I.currentUser;
    const currentUserId = currentUser?.uid;
    const friendsCollectionPathForCurrentUser = `users/${currentUserId}/friends/${friendId}`;
    const friendsCollectionPathForRemovedFriend = `users/${friendId}/friends/${currentUserId}`;
    const friendsCollectionRefForCurrentUser = (0,database_.ref)(config/* database */.F, friendsCollectionPathForCurrentUser);
    const friendsCollectionRefForNewFriend = (0,database_.ref)(config/* database */.F, friendsCollectionPathForRemovedFriend);
    return new Promise(async (resolve)=>{
        let isFriendRemovedFromCollection = false;
        (0,database_.remove)(friendsCollectionRefForCurrentUser).then(()=>{
            (0,database_.remove)(friendsCollectionRefForNewFriend).then(()=>{
                isFriendRemovedFromCollection = true;
            });
        });
        resolve(isFriendRemovedFromCollection);
    });
};

;// CONCATENATED MODULE: ./src/firebase/handlers/friendHandlers/checkIfUserExistsInFriendsCollection.tsx


const checkIfUserExistsInFriendsCollection = (friendId)=>{
    const currentUser = config/* auth */.I.currentUser;
    const currentUserId = currentUser?.uid;
    const currentUserFriendsCollectionPath = `users/${currentUserId}/friends/${friendId}`;
    const currentUserFriendsCollectionRef = (0,database_.ref)(config/* database */.F, currentUserFriendsCollectionPath);
    return new Promise(async (resolve)=>{
        let isUserExistsInFriendsCollection = false;
        (0,database_.get)(currentUserFriendsCollectionRef).then((snapshot)=>{
            if (snapshot.exists()) isUserExistsInFriendsCollection = true;
            resolve(isUserExistsInFriendsCollection);
        });
    });
};

;// CONCATENATED MODULE: ./src/hooks/useFriendsCollection.tsx







const useFriendsCollection = (userInfo)=>{
    const [isFriend, setIsFriend] = (0,external_react_.useState)(false);
    const [isLoadingFriends, setIsLoadingFriends] = (0,external_react_.useState)(true);
    const { showModal, hideModal } = (0,ModalProvider/* useModal */.d)();
    const { isLoggedIn } = (0,AuthProvider/* useAuth */.a)();
    const userId = userInfo?.id;
    const handleSetNewFriend = ()=>{
        if (isLoggedIn) {
            setIsLoadingFriends(true);
            if (userId) {
                createNewFriend(userInfo?.id).then(()=>{
                    checkIfUserExistsInFriendsCollection(userInfo?.id).then((data)=>{
                        setIsFriend(data);
                        (0,handleModals/* showSuccessNotification */.LX)(showModal, "User added as friend");
                    }).catch(()=>{
                        (0,handleModals/* showErrorNotification */.s9)(showModal, "An error has occurred");
                    }).finally(()=>{
                        setIsLoadingFriends(false);
                    });
                });
            }
        } else (0,handleModals/* openLoginModal */.Mo)(showModal);
    };
    const handleRemoveFriend = (userId, modalId)=>{
        hideModal(modalId);
        setIsLoadingFriends(true);
        setTimeout(()=>{
            removeFriend(userId).then(()=>{
                setIsFriend(false);
            }).then(()=>{
                (0,handleModals/* showSuccessNotification */.LX)(showModal, "User was removed from friends");
            }).catch(()=>{
                (0,handleModals/* showErrorNotification */.s9)(showModal, "An error has occurred");
            }).finally(()=>{
                setIsLoadingFriends(false);
            });
        }, 500);
    };
    const openConfirmationPopup = (userInfo, modalId = null)=>{
        if (modalId) {
            hideModal(modalId);
        }
        (0,handleModals/* openRemoveFriendModal */.kS)(showModal, hideModal, handleRemoveFriend, userInfo?.displayName, userInfo?.id);
    };
    (0,external_react_.useEffect)(()=>{
        if (isLoggedIn) {
            setIsLoadingFriends(true);
            if (userId) {
                checkIfUserExistsInFriendsCollection(userInfo?.id).then((data)=>{
                    setIsFriend(data);
                }).finally(()=>{
                    setIsLoadingFriends(false);
                });
            }
        } else setIsLoadingFriends(false);
    }, [
        isLoggedIn,
        userInfo
    ]);
    return {
        isLoadingFriends,
        isFriend,
        handleSetNewFriend,
        openConfirmationPopup
    };
};

// EXTERNAL MODULE: ./src/app/components/UI/Button/CollectionButton/index.tsx
var CollectionButton = __webpack_require__(7390);
// EXTERNAL MODULE: ./src/components/Collection/index.tsx + 3 modules
var Collection = __webpack_require__(5511);
// EXTERNAL MODULE: ./src/constants/enum.ts
var constants_enum = __webpack_require__(4259);
// EXTERNAL MODULE: ./src/handlers/getUserCollection.tsx + 3 modules
var getUserCollection = __webpack_require__(1546);
// EXTERNAL MODULE: ./src/firebase/handlers/profileHandlers/getUserProfileInfo.tsx
var getUserProfileInfo = __webpack_require__(1398);
;// CONCATENATED MODULE: ./src/firebase/handlers/friendHandlers/getUserFriendList.tsx

const getUserFriendList = (friendIdsList)=>{
    return new Promise(async (resolve)=>{
        let friendsWithFullUserInfo = [];
        const promises = Object.keys(friendIdsList).map(async (userId)=>{
            const userInfo = await (0,getUserProfileInfo/* getUserProfileInfo */.s)(userId);
            friendsWithFullUserInfo.push(userInfo);
        });
        await Promise.all(promises);
        resolve(friendsWithFullUserInfo);
    });
};

;// CONCATENATED MODULE: ./src/handlers/getUserProfilePageData.tsx



const getUserProfilePageData = async (userIdFromUrl)=>{
    try {
        let friendList = [];
        const user = await (0,getUserProfileInfo/* getUserProfileInfo */.s)(userIdFromUrl);
        const userCollection = await (0,getUserCollection/* getUserCollection */.J)(userIdFromUrl);
        if (user.friends) {
            friendList = await getUserFriendList(user.friends);
        }
        return {
            info: user.info,
            friends: friendList,
            collection: userCollection
        };
    } catch (error) {
        throw error;
    }
};

// EXTERNAL MODULE: ./src/app/components/UI/Error/ErrorScreen/index.tsx
var ErrorScreen = __webpack_require__(5155);
;// CONCATENATED MODULE: ./src/firebase/handlers/friendHandlers/userFriendsListener.tsx



const userFriendsListener = (userId, friendListState)=>{
    const { oldFriendList, setFriends } = friendListState;
    const userRef = (0,database_.ref)(config/* database */.F, `users/${userId}/friends`);
    const onFriendAdded = async (childSnapshot)=>{
        const newFriendId = childSnapshot.val();
        const isOldFriendListEmpty = oldFriendList.length === 0;
        const isNewFriendExistsInOldFriendList = oldFriendList.some((existingItem)=>existingItem.info.id === newFriendId);
        if (isOldFriendListEmpty || !isNewFriendExistsInOldFriendList) {
            const newFriendInfo = await (0,getUserProfileInfo/* getUserProfileInfo */.s)(newFriendId);
            setFriends((prevItems)=>[
                    newFriendInfo,
                    ...prevItems
                ]);
        }
    };
    const onFriendRemoved = (childSnapshot)=>{
        const removedFriendId = childSnapshot.val();
        setFriends((prevItems)=>prevItems.filter((item)=>item.info.id !== removedFriendId));
    };
    const unsubscribeFriendAdded = (0,database_.onChildAdded)(userRef, onFriendAdded);
    const unsubscribeFriendRemoved = (0,database_.onChildRemoved)(userRef, onFriendRemoved);
    return ()=>{
        unsubscribeFriendAdded();
        unsubscribeFriendRemoved();
    };
};

// EXTERNAL MODULE: external "@firebase/database"
var external_firebase_database_ = __webpack_require__(4960);
;// CONCATENATED MODULE: ./src/firebase/handlers/profileHandlers/userProfileInfoListener.tsx



const userProfileInfoListener = (userId, setProfile)=>{
    const userInfoPath = `users/${userId}/info`;
    const userInfoRef = (0,database_.ref)(config/* database */.F, userInfoPath);
    const onUserProfileInfoChanged = (snapshot)=>{
        const profileData = snapshot.val();
        setProfile(profileData);
    };
    const unsubscribeUserProfileInfoChanged = (0,external_firebase_database_.onValue)(userInfoRef, onUserProfileInfoChanged);
    return ()=>{
        unsubscribeUserProfileInfoChanged();
    };
};

;// CONCATENATED MODULE: ./src/pages/profile/[id].tsx


























const UserProfilePage = ({ profilePageProps })=>{
    const [isLoading, setIsLoading] = (0,external_react_.useState)(true);
    const [profile, setProfile] = (0,external_react_.useState)(null);
    const [friends, setFriends] = (0,external_react_.useState)([]);
    const [generalCollection, setGeneralCollection] = (0,external_react_.useState)(null);
    const [isEditInfo, setIsEditInfo] = (0,external_react_.useState)(false);
    const [isEditTags, setIsEditTags] = (0,external_react_.useState)(false);
    const [isEditCredential, setIsEditCredential] = (0,external_react_.useState)(false);
    const { showModal } = (0,ModalProvider/* useModal */.d)();
    const router = (0,router_.useRouter)();
    const { userId } = (0,AuthProvider/* useAuth */.a)();
    const isCurrentUserProfile = userId === profile?.id;
    const { isLoadingFriends, isFriend, handleSetNewFriend, openConfirmationPopup } = useFriendsCollection(profile);
    const handleResetForms = ()=>{
        setIsEditInfo(false);
        setIsEditTags(false);
        setIsEditCredential(false);
    };
    const handleOpenForm = (openFunction)=>{
        handleResetForms();
        openFunction(true);
    };
    (0,external_react_.useEffect)(()=>{
        const fetchUserProfilePageData = async ()=>{
            const userIdFromUrl = router.query.id;
            setIsLoading(true);
            setProfile(null);
            getUserProfilePageData(userIdFromUrl).then((data)=>{
                setProfile(data.info);
                setFriends(data.friends);
                setGeneralCollection(data.collection);
            }).catch(()=>{
                (0,handleModals/* showErrorNotification */.s9)(showModal, "An error has occurred");
            }).finally(()=>{
                setIsLoading(false);
            });
        };
        if (!profilePageProps) {
            fetchUserProfilePageData();
        } else {
            setProfile(profilePageProps.info);
            setFriends(profilePageProps.friends);
            setGeneralCollection(profilePageProps.collection);
        }
    }, [
        profilePageProps,
        router.query.id
    ]);
    (0,external_react_.useEffect)(()=>{
        if (isCurrentUserProfile) {
            const unsubscribeUserProfileInfoChanged = userProfileInfoListener(userId, setProfile);
            return ()=>{
                unsubscribeUserProfileInfoChanged();
            };
        }
    }, [
        isCurrentUserProfile
    ]);
    (0,external_react_.useEffect)(()=>{
        if (profile) {
            const friendListState = {
                oldFriendList: friends,
                setFriends
            };
            const unsubscribeFriends = userFriendsListener(profile.id, friendListState);
            return ()=>{
                unsubscribeFriends();
            };
        }
    }, [
        profile,
        friends
    ]);
    if (!profile) {
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
                imageSrc: constants_images/* PROFILE_PAGE_TOP_BANNER_IMAGE */.Ie
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "flex justify-start items-start gap-14 flex-wrap md:flex-nowrap",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "mb-0 mt-24 md:mb-16 md:mt-0 relative mx-auto",
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx(ProfileInfo_ProfileIcon, {
                                photoURL: profile.photoURL,
                                isCurrentUserProfile: isCurrentUserProfile
                            }),
                            !isCurrentUserProfile && /*#__PURE__*/ jsx_runtime.jsx(CollectionButton/* default */.Z, {
                                className: "md:w-full",
                                isLoadingCollection: isLoadingFriends,
                                isCollectionItem: isFriend,
                                onClick: isFriend ? ()=>openConfirmationPopup(profile) : handleSetNewFriend,
                                collectionType: constants_enum/* UserCollections */.zS.friends
                            }),
                            isCurrentUserProfile && /*#__PURE__*/ (0,jsx_runtime.jsxs)(Dropdown/* default */.Z, {
                                icon: "settings",
                                className: "!top-0 !right-0",
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx(DropdownItem/* default */.Z, {
                                        label: "Edit info",
                                        icon: free_solid_svg_icons_.faPenToSquare,
                                        onClick: ()=>handleOpenForm(setIsEditInfo)
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx(DropdownItem/* default */.Z, {
                                        label: "Edit genres",
                                        icon: free_solid_svg_icons_.faBarsStaggered,
                                        onClick: ()=>handleOpenForm(setIsEditTags)
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx(DropdownItem/* default */.Z, {
                                        label: "Edit email/password",
                                        icon: free_solid_svg_icons_.faKey,
                                        onClick: ()=>handleOpenForm(setIsEditCredential)
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "w-full",
                        children: [
                            isEditInfo ? /*#__PURE__*/ jsx_runtime.jsx(Form_EditProfileForm, {
                                profileInfo: profile,
                                onFormClose: setIsEditInfo
                            }) : isEditCredential ? /*#__PURE__*/ jsx_runtime.jsx(Form_EditCredentialForm, {
                                onFormClose: setIsEditCredential
                            }) : /*#__PURE__*/ jsx_runtime.jsx(Profile_ProfileInfo, {
                                userInfo: profile
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(TagList/* default */.Z, {
                                tags: profile.favoriteGenres ?? [],
                                title: "Favorite genres",
                                className: "mb-8",
                                isEditTags: isEditTags,
                                onFormClose: setIsEditTags
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(Friends_FriendList, {
                                friends: friends || [],
                                onRemove: openConfirmationPopup
                            })
                        ]
                    })
                ]
            }),
            !isCurrentUserProfile && /*#__PURE__*/ jsx_runtime.jsx(Collection/* default */.Z, {
                movies: generalCollection?.collectionMovies ?? [],
                tvShows: generalCollection?.collectionTVShows ?? [],
                persons: generalCollection?.collectionPersons ?? [],
                marks: generalCollection?.collectionMarks ?? [],
                reviews: generalCollection?.allCollectionReviews ?? [],
                isCurrentUserCollection: isCurrentUserProfile,
                collectionOwnerId: profile?.id
            })
        ]
    });
};
const getServerSideProps = async (ctx)=>{
    const userIdFromUrl = ctx.query.id;
    return getUserProfilePageData(userIdFromUrl).then((data)=>{
        return {
            props: {
                profilePageProps: data
            }
        };
    }).catch(()=>{
        return {
            props: {
                profilePageProps: null
            }
        };
    });
};
/* harmony default export */ const _id_ = (UserProfilePage);

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2Fprofile%2F%5Bid%5D&preferredRegion=&absolutePagePath=private-next-pages%2Fprofile%2F%5Bid%5D.tsx&absoluteAppPath=private-next-pages%2F_app.tsx&absoluteDocumentPath=private-next-pages%2F_document.tsx&middlewareConfigBase64=e30%3D!
// @ts-ignore this need to be imported from next/dist to be external



// Import the app and document modules.
// @ts-expect-error - replaced by webpack/turbopack loader

// @ts-expect-error - replaced by webpack/turbopack loader

// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

const PagesRouteModule = pages_module.PagesRouteModule;
// Re-export the component (should be the default export).
/* harmony default export */ const next_route_loaderkind_PAGES_page_2Fprofile_2F_5Bid_5D_preferredRegion_absolutePagePath_private_next_pages_2Fprofile_2F_5Bid_5D_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(_id_namespaceObject, "default"));
// Re-export methods.
const getStaticProps = (0,helpers/* hoist */.l)(_id_namespaceObject, "getStaticProps");
const getStaticPaths = (0,helpers/* hoist */.l)(_id_namespaceObject, "getStaticPaths");
const next_route_loaderkind_PAGES_page_2Fprofile_2F_5Bid_5D_preferredRegion_absolutePagePath_private_next_pages_2Fprofile_2F_5Bid_5D_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_getServerSideProps = (0,helpers/* hoist */.l)(_id_namespaceObject, "getServerSideProps");
const next_route_loaderkind_PAGES_page_2Fprofile_2F_5Bid_5D_preferredRegion_absolutePagePath_private_next_pages_2Fprofile_2F_5Bid_5D_tsx_absoluteAppPath_private_next_pages_2F_app_tsx_absoluteDocumentPath_private_next_pages_2F_document_tsx_middlewareConfigBase64_e30_3D_config = (0,helpers/* hoist */.l)(_id_namespaceObject, "config");
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
        page: "/profile/[id]",
        pathname: "/profile/[id]",
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
var __webpack_exports__ = __webpack_require__.X(0, [604,812,567,858,54,620,570,908,938,226,9,600], () => (__webpack_exec__(4619)));
module.exports = __webpack_exports__;

})();