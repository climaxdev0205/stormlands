import React from 'react'

type Props = {
  fill?: string,
  height?: number,
  width?: number,
  style?: any
}

const Plus: React.FC<Props> = ({ fill, height, width, style } ) => {
  return (
    <svg width={width || "20"} height={height || "20"} style={style} viewBox="0 0 20 20" fill="" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M11 9H20V11H11V20H9V11H0V9H9V0H11V9Z" fill= {fill || "#98A7B2"}/>
</svg>

  )
}

export default Plus