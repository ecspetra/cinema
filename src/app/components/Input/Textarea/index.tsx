import React, { FC, useState } from 'react';

type PropsType = {
    onChange: React.Dispatch<React.SetStateAction<string>>;
    placeholder?: string;
}

const Textarea: FC<PropsType> = ({ onChange, placeholder = 'Enter text...' }) => {
    const [value, setValue] = useState<string>('');

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        onChange(newValue);
    };

    return (
        <textarea
            value={value}
            onChange={handleChange}
            rows={6}
            className="w-full bg-transparent p-4 border border-slate-800 hover:border-white duration-300 resize-none outline-none block"
            placeholder={placeholder}
        />
    );
};

export default Textarea;
