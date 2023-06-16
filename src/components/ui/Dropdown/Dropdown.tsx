import React,{useState} from 'react'
import cn from 'clsx'

export interface DropdownProps {
  className?: string
  label?: string
  options: (string|number)[]
}

const Dropdown: React.FC<DropdownProps> = ({ className, options, label}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      onBlur={() => {
        setIsModalOpen(false);
      }}
    >
      <span className="text-sm">{label}</span>
      <button
        id="dropdownDefault"
        onClick={() => {
          setIsModalOpen(!isModalOpen);
        }}
        className={
          "border border-neutral-100  focus:ring-1 focus:outline-none  rounded-xs text-sm px-4 py-2.5 text-center inline-flex items-center  " +
          className
        }
        type="button"
      >
        {options[0]}{" "}
        <svg
          className="ml-auto  w-4 h-4"
          aria-hidden="true"
          fill="none"
          height={30}
          width={25}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        id="dropdown"
        className=" z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
        data-popper-reference-hidden=""
        data-popper-escaped=""
        data-popper-placement="bottom"
      >
        {isModalOpen && (
          <ul
            className="absolute border py-1 text-sm text-gray-700 dark:text-gray-200 bg-white"
            aria-labelledby="dropdownDefault"
          >
            {options.map((item,index) => {
              return (
                <li key={index}>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dropdown