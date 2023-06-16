import React from 'react'

const dataset1 = [
    {
        name: "Page 1"
    },
    {
        name: "Page 2"
    },
]

type Props = {
    list?:{name?: string}[]
}

const Breadcrumbs: React.FC<Props> = ({ list = dataset1 }) => {
    return (
        <div className="b-8 flex items-center flex-wrap" style={{background:"#fcfcfc"}}>
            <ul className="flex items-center">
                {list && list.map((item, index) => {
                    return (
                        <li key={index} className="inline-flex items-center">
                            <a href="#" className={"text-gray-600 hover:text-blue-500 hover:border-0 " + (index==list.length-1 && " font-bold")}>
                                {item.name}
                            </a>
                            {list.length - 1 != index && <span className="mx-4 h-auto text-gray-400 font-medium">/</span>}
                        </li>
                    )
                })}

            </ul>
        </div>
    )
}

export default Breadcrumbs