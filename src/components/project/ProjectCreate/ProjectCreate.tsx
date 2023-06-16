import React, { useState, useEffect } from "react";
import { Button } from '@components/ui'
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type Props = {
  storeProject: (data: any) => void;
  isLoading: boolean;
  setIsLoading: (data: boolean) => void;
  onDataChange: (data: any) => void;
};

const ProjectCreate: React.FC<Props> = ({ storeProject, isLoading, setIsLoading, onDataChange }) => {
  const [dateValue, setDateValue] = React.useState<Dayjs | null>(dayjs());

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data: any) => {
    storeProject({ ...data, date: dateValue });
  };

  const name = watch("name");

  useEffect(() => {
    onDataChange({ 
      name, 
      date: dateValue?.isValid() ? dateValue.toISOString() : "" 
    });
  }, [name, location, dateValue]);

  console.log(errors)
  return (
    <div className=" m-auto py-10 md:py-20 ">
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-2 h-16">
          <Box sx={{ paddingBottom: "0px" }}>
            <TextField
              size={"small"}
              error={errors.name && true}
              label={"Project Name"}
              {...register("name", { required: true })}
              name="name"
              className="w-60"
              helperText={errors.location && "This field is required"}
            />
          </Box>
        </div>
        <div className="mb-2 h-16">
          <Box sx={{ marginBottom: "10px" }}>
            <TextField
              size={"small"}
              error={errors.location && true}
              label={"Location"}
              {...register("location", { required: true })}
              name="location"
              className="w-60"
              helperText={errors.location && "This field is required"}
            />
          </Box>
        </div>
        <div className="">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DatePicker
                value={dateValue}
                onChange={(newValue) => {
                  setDateValue(newValue);
                }}
                slotProps={{ textField: {
                  size: "small",
                  label: "Date",
                } }}
                disablePast={true}
              />
            </Stack>
          </LocalizationProvider>
        </div>
        <Button type="submit" className="mt-20">
          Create Project
        </Button>
      </form>
    </div>
  );
};

export default ProjectCreate