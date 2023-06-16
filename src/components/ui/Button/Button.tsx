import React from 'react'

interface Props  {
  dark?: boolean
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  style?: any
  type?: string
};

const Button: React.FC<Props> = ({ className, dark=true,children, style,onClick, type } ) => {
   
  const rootClassName = dark
    ? "w-60 text-center text-white block bg-storm-bgdefault hover:bg-storm-bghovered  rounded px-8 py-2 "
    : "w-60 text-center text-storm-default  block border bg-white border-storm-default  rounded px-8 py-2 ";
  return (
    <button
      type={"submit"}
      onClick={onClick}
      className={
        rootClassName+className
      }
      style={{ ...style }}
    >
      {children}{" "}
    </button>
  );
}

export default Button