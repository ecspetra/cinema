import React, { useState } from "react";
import {signIn, signOutUser} from "../../../../firebase/config";
import {useAuth} from "../../../../context/AuthProvider";
import InputField from "../../UI/Input/InputField/index";
import Title from "../../UI/Title/Title";
import Button from "../../UI/Button/index";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { currentUser } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await signIn(email, password);
        } catch (error) {
            console.error("Ошибка при входе:", error);
        }
    };

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="max-w-md w-full">
                <Title className="text-center !mb-12">Login</Title>
                <form onSubmit={handleLogin} className="flex flex-col justify-center items-center">
                    <InputField className="mb-4" type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)} />
                    <InputField type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                    <Button className="mt-8 w-full" type="submit">Submit</Button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
