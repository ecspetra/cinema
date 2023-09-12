import React, { useState } from "react";
import {useAuth} from "../../../../context/AuthProvider";
import {signUp, signOutUser} from "../../../../firebase/config";
import Title from "../../UI/Title/Title";
import Button from "../../UI/Button/index";
import InputField from "../../UI/Input/InputField/index";
import { useRouter } from "next/router";

function SignUpForm() {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleEmailInput = (newValue) => {
        setEmail(newValue);
    };

    const handlePasswordInput = (newValue) => {
        setPassword(newValue);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            await signUp(email, password);
            await router.push('/');
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="max-w-md w-full">
                <Title className="text-center !mb-12">Sign up</Title>
                <form onSubmit={handleSignUp} className="flex flex-col justify-center items-center">
                    <InputField className="mb-4" type="email" placeholder="Email" onChange={handleEmailInput} />
                    <InputField type="password" placeholder="Password" onChange={handlePasswordInput} />
                    <Button className="mt-8 w-full" type="submit">Submit</Button>
                </form>
            </div>
        </div>
    );
}

export default SignUpForm;
