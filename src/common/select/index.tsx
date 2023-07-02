import React from 'react';

type CustomSelectProps = {
  label: string;
  name: string | undefined;
  options: Array<{ value: string; label: string }>;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  value: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  label,
  name,
  options,
  onChange,
}) => {
    console.log(options)
  return (
    <div>
      <div className="mb-6">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          {label}
        </label>
        <div className="relative">
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            {options?.map((option:any) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
