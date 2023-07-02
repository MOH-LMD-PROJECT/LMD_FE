import React from 'react'




type CustomInputProps = {
    label: string;
    placeholder: string;
    type: string;
    name: string | undefined;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value: string

};
const CustomInput: React.FC<CustomInputProps> = ({ value, label, placeholder, type, name, onChange }) => {
    return (
        <div>
            <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                    {label}
                </label>
                <div className="relative">
                    <input
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        onChange={onChange}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>
            </div>
        </div>
    )
}

export default CustomInput