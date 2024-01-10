"use strict";
exports.id = 858;
exports.ids = [858];
exports.modules = {

/***/ 2858:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ Auth_AuthForm)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/app/components/UI/Title/Title.tsx
var Title = __webpack_require__(9457);
// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__(7197);
// EXTERNAL MODULE: external "@fortawesome/free-solid-svg-icons"
var free_solid_svg_icons_ = __webpack_require__(6466);
// EXTERNAL MODULE: ./src/app/components/UI/Button/index.tsx
var Button = __webpack_require__(7458);
// EXTERNAL MODULE: ./src/app/components/UI/Input/InputField/index.tsx
var InputField = __webpack_require__(6492);
// EXTERNAL MODULE: ./src/components/Loader/index.tsx
var Loader = __webpack_require__(3616);
// EXTERNAL MODULE: ./src/app/components/UI/Error/index.tsx
var Error = __webpack_require__(3554);
;// CONCATENATED MODULE: ./src/hooks/useLoginFormReducer.tsx

const initialState = {
    isLoading: false,
    isTouched: false,
    formData: {
        email: {
            value: "",
            error: ""
        },
        password: {
            value: "",
            error: ""
        },
        formError: {
            error: ""
        }
    }
};
const reducer = (state, action)=>{
    switch(action.type){
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
        case "SET_FORM_DATA":
            return {
                ...state,
                formData: action.payload
            };
        case "CLEAR_FORM":
            return initialState;
        default:
            return state;
    }
};
const useLoginFormReducer = ()=>{
    return (0,external_react_.useReducer)(reducer, initialState);
};
/* harmony default export */ const hooks_useLoginFormReducer = (useLoginFormReducer);

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./src/constants/errorMessages.ts
var errorMessages = __webpack_require__(3514);
// EXTERNAL MODULE: ./src/constants/paths.ts
var paths = __webpack_require__(6949);
// EXTERNAL MODULE: ./src/context/ModalProvider.tsx
var ModalProvider = __webpack_require__(4858);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(9332);
// EXTERNAL MODULE: ./src/handlers/handleCookies.tsx
var handleCookies = __webpack_require__(5648);
// EXTERNAL MODULE: external "firebase/auth"
var auth_ = __webpack_require__(4610);
// EXTERNAL MODULE: ./src/firebase/config.ts
var config = __webpack_require__(6855);
;// CONCATENATED MODULE: ./src/firebase/handlers/authHandlers/signIn.tsx


const signIn = async (email, password)=>{
    try {
        await (0,auth_.signInWithEmailAndPassword)(config/* auth */.I, email, password);
    } catch (error) {
        throw error;
    }
};

;// CONCATENATED MODULE: ./src/hooks/useLoginForm.tsx








const useLoginForm = ()=>{
    const [state, dispatch] = hooks_useLoginFormReducer();
    const pathname = (0,navigation.usePathname)();
    const { hideModal, currentModal } = (0,ModalProvider/* useModal */.d)();
    const { id } = currentModal || {};
    const router = (0,router_.useRouter)();
    const isEmailValid = /\S+@\S+\.\S+/.test(state.formData.email.value);
    const isPasswordValid = state.formData.password.value.length > 0;
    const handleEmailChange = (event)=>{
        const error = event.target.value === "" ? errorMessages/* ERROR_MESSAGES */.R.INVALID_EMAIL : "";
        updateField("email", event.target.value, error);
    };
    const handlePasswordChange = (event)=>{
        const error = event.target.value === "" ? errorMessages/* ERROR_MESSAGES */.R.REQUIRED_FIELD : "";
        updateField("password", event.target.value, error);
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
    const handleLogin = async (event)=>{
        event.preventDefault();
        dispatch({
            type: "SET_LOADING",
            payload: true
        });
        const isFormValid = isEmailValid && isPasswordValid;
        if (isFormValid && state.isTouched) {
            try {
                await signIn(state.formData.email.value, state.formData.password.value);
                updateFormError("");
                clearForm();
                hideModal(id);
                let target = null;
                switch(true){
                    case pathname === paths/* AUTH_PAGE */._L:
                        target = `/`;
                        break;
                    case pathname === paths/* COLLECTION_PAGE */.vE:
                        const cookies = await (0,handleCookies/* parseCookies */.jl)();
                        const userId = cookies.uid;
                        target = paths/* CURRENT_USER_COLLECTION_PAGE */.A6.replace("{userId}", userId);
                        break;
                    default:
                        break;
                }
                if (target !== null) {
                    await router.push(target);
                }
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
                        error: isEmailValid ? "" : errorMessages/* ERROR_MESSAGES */.R.INVALID_EMAIL
                    },
                    password: {
                        ...state.formData.password,
                        error: isPasswordValid ? "" : errorMessages/* ERROR_MESSAGES */.R.REQUIRED_FIELD
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
        handlePasswordChange,
        handleLogin
    };
};
/* harmony default export */ const hooks_useLoginForm = (useLoginForm);

;// CONCATENATED MODULE: ./src/app/components/Auth/LoginForm/index.tsx







const LoginForm = ()=>{
    const { state, handleEmailChange, handlePasswordChange, handleLogin } = hooks_useLoginForm();
    return /*#__PURE__*/ jsx_runtime.jsx("div", {
        className: "w-full flex flex-col justify-center items-center",
        children: /*#__PURE__*/ jsx_runtime.jsx("div", {
            className: "max-w-md w-full",
            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("form", {
                onSubmit: handleLogin,
                className: "flex flex-col justify-center items-center gap-4",
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
                        id: "userPassword",
                        label: "Password",
                        value: state.formData.password.value,
                        error: state.formData.password.error,
                        onChange: handlePasswordChange,
                        icon: free_solid_svg_icons_.faKey,
                        required: true,
                        type: "password",
                        placeholder: "Password"
                    }),
                    state.formData.formError.error && /*#__PURE__*/ jsx_runtime.jsx(Error/* default */.Z, {
                        className: "px-4 py-2 bg-rose-600/20 w-full rounded-md",
                        error: state.formData.formError.error
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                        className: "mt-8 w-full",
                        type: "submit",
                        children: state.isLoading ? /*#__PURE__*/ jsx_runtime.jsx(Loader/* default */.Z, {
                            isShowText: true,
                            type: "static"
                        }) : "Submit"
                    })
                ]
            })
        })
    });
};
/* harmony default export */ const Auth_LoginForm = (LoginForm);

;// CONCATENATED MODULE: ./src/hooks/useSignUpFormReducer.tsx

const useSignUpFormReducer_initialState = {
    isLoading: false,
    isTouched: false,
    formData: {
        name: {
            value: "",
            error: ""
        },
        email: {
            value: "",
            error: ""
        },
        password: {
            value: "",
            error: ""
        },
        formError: {
            error: ""
        }
    }
};
const useSignUpFormReducer_reducer = (state, action)=>{
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
            return useSignUpFormReducer_initialState;
        default:
            return state;
    }
};
const useSignUpFormReducer = ()=>{
    return (0,external_react_.useReducer)(useSignUpFormReducer_reducer, useSignUpFormReducer_initialState);
};
/* harmony default export */ const hooks_useSignUpFormReducer = (useSignUpFormReducer);

// EXTERNAL MODULE: external "firebase/database"
var database_ = __webpack_require__(6666);
;// CONCATENATED MODULE: ./src/firebase/handlers/profileHandlers/addUserToStorage.tsx


const addUserToStorage = async (newUser)=>{
    const newUserPath = `users/${newUser.uid}`;
    const newUserRef = (0,database_.ref)(config/* database */.F, newUserPath);
    const newUserData = {
        info: {
            displayName: newUser.displayName,
            id: newUser.uid,
            email: newUser.email,
            photoURL: newUser.photoURL
        }
    };
    await (0,database_.set)(newUserRef, newUserData);
};

;// CONCATENATED MODULE: ./src/firebase/handlers/authHandlers/signUp.tsx



const signUp = async (email, password, displayName)=>{
    try {
        const userCredential = await (0,auth_.createUserWithEmailAndPassword)(config/* auth */.I, email, password);
        const newUser = userCredential.user;
        const photoURL = `https://api.dicebear.com/5.x/thumbs/svg?seed=${newUser.uid}`;
        await (0,auth_.updateProfile)(newUser, {
            displayName,
            photoURL
        });
        await addUserToStorage(newUser);
        await (0,auth_.signInWithEmailAndPassword)(config/* auth */.I, email, password);
    } catch (error) {
        throw error;
    }
};

;// CONCATENATED MODULE: ./src/hooks/useSignUpForm.tsx







const useSignUpForm = ()=>{
    const [state, dispatch] = hooks_useSignUpFormReducer();
    const router = (0,router_.useRouter)();
    const { hideModal, currentModal } = (0,ModalProvider/* useModal */.d)();
    const { id } = currentModal || {};
    const pathname = (0,navigation.usePathname)();
    const isAuthPage = (0,external_react_.useMemo)(()=>pathname === "/auth", [
        pathname
    ]);
    const isNameValid = state.formData.name.value.trim() !== "";
    const isEmailValid = /\S+@\S+\.\S+/.test(state.formData.email.value);
    const isPasswordValid = state.formData.password.value.length >= 6;
    const handleNameChange = (event)=>{
        const error = event.target.value === "" ? errorMessages/* ERROR_MESSAGES */.R.REQUIRED_FIELD : "";
        updateField("name", event.target.value, error);
    };
    const handleEmailChange = (event)=>{
        const error = event.target.value === "" ? errorMessages/* ERROR_MESSAGES */.R.INVALID_EMAIL : "";
        updateField("email", event.target.value, error);
    };
    const handlePasswordChange = (event)=>{
        const error = event.target.value === "" ? errorMessages/* ERROR_MESSAGES */.R.INVALID_PASSWORD : "";
        updateField("password", event.target.value, error);
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
    const handleSignUp = async (event)=>{
        event.preventDefault();
        dispatch({
            type: "SET_LOADING",
            payload: true
        });
        const isFormValid = isNameValid && isEmailValid && isPasswordValid;
        if (isFormValid && state.isTouched) {
            try {
                await signUp(state.formData.email.value, state.formData.password.value, state.formData.name.value);
                updateFormError("");
                clearForm();
                hideModal(id);
                if (isAuthPage) await router.push("/");
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
                    },
                    email: {
                        ...state.formData.email,
                        error: isEmailValid ? "" : errorMessages/* ERROR_MESSAGES */.R.INVALID_EMAIL
                    },
                    password: {
                        ...state.formData.password,
                        error: isPasswordValid ? "" : errorMessages/* ERROR_MESSAGES */.R.INVALID_PASSWORD
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
        handleEmailChange,
        handlePasswordChange,
        handleSignUp
    };
};
/* harmony default export */ const hooks_useSignUpForm = (useSignUpForm);

;// CONCATENATED MODULE: ./src/app/components/Auth/SignUpForm/index.tsx







const SignUpForm = ()=>{
    const { state, handleNameChange, handleEmailChange, handlePasswordChange, handleSignUp } = hooks_useSignUpForm();
    return /*#__PURE__*/ jsx_runtime.jsx("div", {
        className: "w-full flex flex-col justify-center items-center",
        children: /*#__PURE__*/ jsx_runtime.jsx("div", {
            className: "max-w-md w-full",
            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("form", {
                onSubmit: handleSignUp,
                autoComplete: "off",
                className: "flex flex-col justify-center items-center gap-4",
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
                        id: "userPassword",
                        label: "Password",
                        value: state.formData.password.value,
                        error: state.formData.password.error,
                        onChange: handlePasswordChange,
                        icon: free_solid_svg_icons_.faKey,
                        required: true,
                        type: "password",
                        placeholder: "Password"
                    }),
                    state.formData.formError.error && /*#__PURE__*/ jsx_runtime.jsx(Error/* default */.Z, {
                        className: "px-4 py-2 bg-rose-600/20 w-full rounded-md",
                        error: state.formData.formError.error
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                        className: "mt-8 w-full",
                        type: "submit",
                        children: state.isLoading ? /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                            className: "flex justify-center items-center",
                            children: [
                                "Loading",
                                " ",
                                /*#__PURE__*/ jsx_runtime.jsx(Loader/* default */.Z, {
                                    type: "static",
                                    className: "ml-2"
                                })
                            ]
                        }) : "Submit"
                    })
                ]
            })
        })
    });
};
/* harmony default export */ const Auth_SignUpForm = (SignUpForm);

;// CONCATENATED MODULE: ./src/app/components/Auth/AuthForm/index.tsx








const AuthForm = ()=>{
    const [isShowSignUp, setIsShowSignUp] = (0,external_react_.useState)(true);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "h-full flex flex-1 flex-col justify-center items-center",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "flex justify-center items-center mb-12 gap-4",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(Title/* default */.Z, {
                        className: "!mb-0 after:hidden !pb-0",
                        children: isShowSignUp ? "Sign up" : "Login"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(react_fontawesome_.FontAwesomeIcon, {
                        className: "text-2xl text-rose-600",
                        icon: isShowSignUp ? free_solid_svg_icons_.faUserPlus : free_solid_svg_icons_.faDoorOpen
                    })
                ]
            }),
            isShowSignUp ? /*#__PURE__*/ jsx_runtime.jsx(Auth_SignUpForm, {}) : /*#__PURE__*/ jsx_runtime.jsx(Auth_LoginForm, {}),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "flex justify-center items-center flex-wrap mt-12 gap-2",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("p", {
                        children: isShowSignUp ? "Do you already have an account?" : "Do you want to create a new account?"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(Button/* default */.Z, {
                        context: "text",
                        className: "mt-0",
                        onClick: ()=>setIsShowSignUp(!isShowSignUp),
                        children: isShowSignUp ? "Login" : "Sign up"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const Auth_AuthForm = (AuthForm);


/***/ }),

/***/ 3554:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9003);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);


const Error = ({ error, className })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("w-full text-sm text-rose-600 font-semibold block mt-2", className),
        children: error
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Error);


/***/ }),

/***/ 6492:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9003);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7197);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6466);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _app_components_UI_Error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3554);
/* harmony import */ var _app_components_UI_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7458);







const InputField = ({ id, label, value, onChange, error, type = "text", placeholder = "Enter your text...", className, additionalInputClassName, icon, required })=>{
    const [isPasswordVisible, setIsPasswordVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const isPasswordInput = type === "password";
    const inputClassName = "truncate w-full h-full bg-transparent autofill:shadow-[inset_0_0_0px_1000px_#000000/0] autofill:caret-white outline-none block";
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "w-full h-full",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                htmlFor: id,
                className: classnames__WEBPACK_IMPORTED_MODULE_2___default()("w-full h-full bg-gray-950 pt-1 px-3 pb-2 border border-gray-500 hover:border-white focus-within:border-white duration-300 block", className, error && "!border-rose-600"),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "text-xs text-gray-500 font-semibold",
                        children: `${label}${required ? " *" : ""}`
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "flex justify-between items-center",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                            className: classnames__WEBPACK_IMPORTED_MODULE_2___default()("w-full flex justify-start items-center", additionalInputClassName),
                            children: [
                                icon && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__.FontAwesomeIcon, {
                                    className: "text-sm mr-2",
                                    icon: icon
                                }),
                                isPasswordInput ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "w-full flex justify-between items-center",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                            value: value,
                                            onChange: onChange,
                                            type: isPasswordVisible ? "text" : "password",
                                            id: id,
                                            placeholder: placeholder,
                                            className: inputClassName
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_UI_Button__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                            className: "!w-auto !h-auto hover:bg-transparent",
                                            context: "icon",
                                            onClick: ()=>setIsPasswordVisible(!isPasswordVisible),
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__.FontAwesomeIcon, {
                                                icon: isPasswordVisible ? _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__.faEyeSlash : _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__.faEye
                                            })
                                        })
                                    ]
                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    value: value,
                                    onChange: onChange,
                                    type: type,
                                    id: id,
                                    placeholder: placeholder,
                                    className: inputClassName
                                })
                            ]
                        })
                    })
                ]
            }),
            error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_UI_Error__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                className: "self-start",
                error: error
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InputField);


/***/ }),

/***/ 3514:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ ERROR_MESSAGES)
/* harmony export */ });
const ERROR_MESSAGES = {
    REQUIRED_FIELD: "This field is required",
    INVALID_EMAIL: "Please enter a valid email address",
    INVALID_PASSWORD: "Password length must be at least 6 characters",
    SAME_PASSWORDS: "Your new password must not be the same as your old one"
};


/***/ })

};
;