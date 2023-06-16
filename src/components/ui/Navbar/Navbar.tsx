import React, { ReactText } from 'react'

type Props = {
data: {
  name: string
}[], 
activePageIndex: number, 
setActivePageIndex: (n: number) => void, 
onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const Navbar: React.FC<Props> = ({ data, activePageIndex, setActivePageIndex, onClick}) => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="my-1"
              onClick={(e) => {
                setActivePageIndex(index);
                onClick && onClick(e);
              }}
            >
              <span
                className={`lg:pr-4 py-4 w-full pb-1 cursor-pointer border-b ${
                  activePageIndex == index && "border-b-2 border-black"
                }`}
              >
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
  )
}

export default Navbar