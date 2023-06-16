import React from 'react'

type Props = {
  name: string;
  className?: string;
  value?: string | number;
  title?: string
};

const RadioButton: React.FC<Props> = ({ title, name, className, value }) => {
  return (
    <>
      <div className={"flex items-center " + className}>
        <input
          id="default-radio-1"
          type="radio"
          value={value}
          name={name}
          className={
            "w-5 h-5  text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
          }
        />
        <label
          htmlFor={name}
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {title}{" "}
        </label>
      </div>
    </>
  );
};

export default RadioButton