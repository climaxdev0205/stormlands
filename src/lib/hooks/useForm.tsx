import React, { useState, useCallback, useEffect } from "react";

type RegisterOptions = {
  required: boolean
}

type FormState = {
  [key: string]: string
}

type InputProps = {
  name: string, registerOptions?: RegisterOptions
}

interface Form {
  formState: FormState;
  registerOptions: {
    [key: string]: RegisterOptions;
  };
}

const initalState = {
  formState: {},
  registerOptions: {}
}

const useForm = (inital? : any) => {

  const state = {
    formState: inital,
    registerOptions: {}
  }
  const [form, setForm] = useState<Form>(state || initalState);
  const [errors, setErrors] = useState<any>({})

  const setInitialFormState = (
    name: string,
    registerOptions?: RegisterOptions
  ) => {
    const formStateCopy = { ...form.formState };
    setForm({
      ...form,
      formState: { ...formStateCopy, [name]: "" },
      registerOptions: {
        [name]: {
          required: registerOptions?.required || false,
        },
      },
    });
  };

  const input = (name: string, registerOptions?: RegisterOptions) => {
      return {
        onChange: (e: any) => {
          const formStateCopy = { ...form.formState };
          setForm({
            ...form,
            formState: { ...formStateCopy, [name]: e.target.value },
            registerOptions: {
              [name]: {
                required: registerOptions?.required || false,
              },
            },
          });
        },
        value: form.formState[name]
      };
    };
  
  const handleSubmit = (cb: any) => {
    return (e: any) => {
      validateForm();
      cb(form.formState)
      e.preventDefault();
    };
  };

  const monitor = (n?: string) => n ? form.formState[n] : form.formState;

  const validateForm = () => {
    // Throw and error for empty required fields
    Object.keys(form.formState).map((key: string) => {
      isEmptyAndRequired(form, key)
        ? setErrors((prev: any) => {
            return { ...prev, [key]: true };
          })
        : setErrors((prev: any) => {
            return { ...prev, [key]: false };
          });
    });
  };
  
const isEmptyAndRequired = (form: any, field: string) => {
  const { formState, registerOptions } = form;
  if (formState[field] == "" && registerOptions[field]?.required == true)
    return true;
  return false;
};
  
  return {
    monitor,
    input,
    handleSubmit,
    form: form.formState,
    errors
  }
}

export default useForm