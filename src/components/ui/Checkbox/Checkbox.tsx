import React from 'react'
type Props = {
  id?: string
}
const Checkbox: React.FC<Props> = ({id}) => {
  return (
    <input
      id={id}
      type="checkbox"
      value=""
      className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
  );
}

export default Checkbox