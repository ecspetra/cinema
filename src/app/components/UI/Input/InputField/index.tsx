import React, { FC, useState } from 'react';
import classNames from "classnames";

type PropsType = {
    onChange: React.Dispatch<React.SetStateAction<string>>;
    type?: "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";
    placeholder?: string;
    className?: string;
}

const InputField: FC<PropsType> = ({ onChange, type= 'text', placeholder = 'Enter text...', className }) => {
    const [value, setValue] = useState<string>('');

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        onChange(newValue);
    };

    return (
        <input
            value={value}
            type={type}
            onChange={handleChange}
            className={classNames('w-full bg-transparent p-4 border border-slate-800 hover:border-white duration-300 resize-none outline-none block', className)}
            placeholder={placeholder}
        />
    );
};

export default InputField;
