import React, { useState } from "react";
import SignUpForm from "../../app/components/Auth/SignUpForm/index";
import LoginForm from "../../app/components/Auth/LoginForm/index";
import Button from "../../app/components/UI/Button/index";

const Auth = () => {
    const [isShowSignUp, setIsShowSignUp] = useState<boolean>(true)

    return (
        <div className="h-full flex flex-1 flex-col justify-center items-center">
            {isShowSignUp ? <SignUpForm /> : <LoginForm />}
            <div className="flex justify-center items-center flex-wrap mt-12 gap-2">
                <p>{isShowSignUp ? 'Do you already have an account?' : 'Do you want to create a new account?'}</p>
                <Button context="text" className="mt-0" onClick={() => setIsShowSignUp(!isShowSignUp)}>{isShowSignUp ? 'Login' : 'Sign up'}</Button>
            </div>
        </div>
    );
}

export default Auth;
