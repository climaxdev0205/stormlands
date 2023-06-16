import React from 'react'
import Box from '@mui/material/Box';

type Props = {
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = (props) => {
  const { title, children } = props;
  return (
    <>
      <Box sx={{bgcolor: 'background.paper'}} className="stormShadowNoBottom !border-b border-solid !border-neutral-100 font-bold p-4">{title}</Box>
      {children}
    </>
  );
};

export default Modal