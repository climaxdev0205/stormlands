import React, { InputHTMLAttributes, type RefObject } from "react";
import cn from "clsx";
import s from "./Input.module.css";
import { type Ref } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm, type UseFormRegister } from "react-hook-form";
import {Input as MUIInput} from "@mui/material";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name?: string;
  value?: string | number;
  onChange?: (...args: any[]) => any;
  useform?: any;
  label?: string
}

const Input: React.FC<InputProps> = (props) => {
  const { className, children, name, onChange, label, useform } = props;

  const rootClassName = cn(
    s.input,
    " border-neutral-100 rounded text-black border focus:ring-green-500 focus:neutral-100 block  ",
    className
  );

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label={label}
        size="small"
        required
        {...useform}
        {...props}
        value={props.value}
        type={props.type}
        name={props?.name}
        className={rootClassName}
        onChange={onChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        placeholder="Text"
      />
    </Box>
  );
};

export default Input;
