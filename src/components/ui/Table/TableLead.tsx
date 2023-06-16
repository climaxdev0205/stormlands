import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

type Props = {
  onHandleInput: any,
  C_PB_Zn: string | null,
  C_PB_H20: string | null,
  C_PB_Ag: string | null,
  C_PB_Au: string | null,
  C_PB_Pb: string | null,
  C_PB_Cu: string | null,
  C_PB_Fe: string | null,
  C_PB_Si02: string | null,
  C_PB_As: string | null,
}

const TableLead: React.FC<Props> = ({
    onHandleInput,
    C_PB_Zn,
    C_PB_H20,
    C_PB_Ag,
    C_PB_Au,
    C_PB_Pb,
    C_PB_Cu,
    C_PB_Fe,
    C_PB_Si02,
    C_PB_As,
  }) => {

  return (
    <div className=" h-full">
      <div className="grid grid-cols-4 gap-4 border border-b-0 py-2 text-sm ">
        <div className="col-span-2">
          <span className="pl-4 lg:pl-8 ">Element</span>
        </div>
        <div className="col-span-1 ">
          <span className="">Value</span>
        </div>
        <div className="col-span-1">
          <span className="">Unit</span>
        </div>
      </div>
      <div className="h-full border">
        
      <div className="grid grid-cols-4 border py-1.5">
              <div className="col-span-2 flex">
                <span className="self-center text-base font-bold pl-4 lg:pl-8">
                  Pb (Lead)
                </span>
              </div>
              <div className="col-span-1 pr-2 flex items-center">
                <Box sx={{ }}>
                  <TextField
                    size={"small"}
                    name="name"
                    value={C_PB_Pb}
                    onChange={(e) => { onHandleInput('C_PB_Pb', e.target.value) }}
                    error={!C_PB_Pb}
                    helperText={
                            (!C_PB_Pb || parseFloat(C_PB_Pb) <= 0)
                            ? "Required and must be greater than 0"
                            : ""
                    } 
                    type={"number"}
                    inputProps={{
                        inputMode: "numeric",
                        min: "0",
                    }}
                    required
                  />
                </Box>
              </div>
              <div className="col-span-1 pr-2 ">
                <FormControl sx={{ minWidth: 60 }} fullWidth size="small">
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={"%"}
                    onChange={() => {}}
                  >
                    <MenuItem value={"%"}>{"%"}</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="grid grid-cols-4 border py-1.5">
              <div className="col-span-2 flex">
                <span className="self-center text-base font-bold pl-4 lg:pl-8">
                  Zn (Zinc)
                </span>
              </div>
              <div className="col-span-1 pr-2 flex items-center">
                <Box sx={{ }}>
                  <TextField
                    size={"small"}
                    
                    name="name"
                    type={"text"}
                    value={C_PB_Zn}
                    onChange={(e) => { onHandleInput('C_PB_Zn', e.target.value) }}
                  />
                </Box>
              </div>
              <div className="col-span-1 pr-2 ">
                <FormControl sx={{ minWidth: 60 }} fullWidth size="small">
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={"%"}
                    onChange={() => {}}
                  >
                    <MenuItem value={"%"}>{"%"}</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="grid grid-cols-4 border py-1.5">
              <div className="col-span-2 flex">
                <span className="self-center text-base font-bold pl-4 lg:pl-8">
                  H20 (Moisture)
                </span>
              </div>
              <div className="col-span-1 pr-2 flex items-center">
                <Box sx={{ }}>
                  <TextField
                    size={"small"}
                    name="name"
                    type={"text"}
                    value={C_PB_H20}
                    onChange={(e) => { onHandleInput('C_PB_H20', e.target.value) }}
                  />
                </Box>
              </div>
              <div className="col-span-1 pr-2 ">
                <FormControl sx={{ minWidth: 60 }} fullWidth size="small">
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={"%"}
                    onChange={() => {}}
                  >
                    <MenuItem value={"%"}>{"%"}</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="grid grid-cols-4 border py-1.5">
              <div className="col-span-2 flex">
                <span className="self-center text-base font-bold pl-4 lg:pl-8">
                  Ag (Silver)
                </span>
              </div>
              <div className="col-span-1 pr-2 flex items-center">
                <Box sx={{ }}>
                  <TextField
                    size={"small"}
                    
                    name="name"
                    type={"text"}
                    value={C_PB_Ag}
                    onChange={(e) => { onHandleInput('C_PB_Ag', e.target.value) }}
                  />
                </Box>
              </div>
              <div className="col-span-1 pr-2 ">
                <FormControl sx={{ minWidth: 60 }} fullWidth size="small">
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={"%"}
                    onChange={() => {}}
                  >
                    <MenuItem value={"%"}>{"%"}</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="grid grid-cols-4 border py-1.5">
              <div className="col-span-2 flex">
                <span className="self-center text-base font-bold pl-4 lg:pl-8">
                  Au (Gold)
                </span>
              </div>
              <div className="col-span-1 pr-2 flex items-center">
                <Box sx={{ }}>
                  <TextField
                    size={"small"}
                    
                    name="name"
                    type={"text"}
                    value={C_PB_Au}
                    onChange={(e) => { onHandleInput('C_PB_Au', e.target.value) }}
                  />
                </Box>
              </div>
              <div className="col-span-1 pr-2 ">
                <FormControl sx={{ minWidth: 60 }} fullWidth size="small">
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={"%"}
                    onChange={() => {}}
                  >
                    <MenuItem value={"%"}>{"%"}</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="grid grid-cols-4 border py-1.5">
              <div className="col-span-2 flex">
                <span className="self-center text-base font-bold pl-4 lg:pl-8">
                  Cu (Copper)
                </span>
              </div>
              <div className="col-span-1 pr-2 flex items-center">
                <Box sx={{ }}>
                  <TextField
                    size={"small"}
                    
                    name="name"
                    type={"text"}
                    value={C_PB_Cu}
                    onChange={(e) => { onHandleInput('C_PB_Cu', e.target.value) }}
                  />
                </Box>
              </div>
              <div className="col-span-1 pr-2 ">
                <FormControl sx={{ minWidth: 60 }} fullWidth size="small">
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={"%"}
                    onChange={() => {}}
                  >
                    <MenuItem value={"%"}>{"%"}</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="grid grid-cols-4 border py-1.5">
              <div className="col-span-2 flex">
                <span className="self-center text-base font-bold pl-4 lg:pl-8">
                  Fe (Iron)
                </span>
              </div>
              <div className="col-span-1 pr-2 flex items-center">
                <Box sx={{ }}>
                  <TextField
                    size={"small"}
                    
                    name="name"
                    type={"text"}
                    value={C_PB_Fe}
                    onChange={(e) => { onHandleInput('C_PB_Fe', e.target.value) }}
                  />
                </Box>
              </div>
              <div className="col-span-1 pr-2 ">
                <FormControl sx={{ minWidth: 60 }} fullWidth size="small">
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={"%"}
                    onChange={() => {}}
                  >
                    <MenuItem value={"%"}>{"%"}</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="grid grid-cols-4 border py-1.5">
              <div className="col-span-2 flex">
                <span className="self-center text-base font-bold pl-4 lg:pl-8">
                  Si02 (Silicon Dioxide)
                </span>
              </div>
              <div className="col-span-1 pr-2 flex items-center">
                <Box sx={{ }}>
                  <TextField
                    size={"small"}
                    
                    name="name"
                    type={"text"}
                    value={C_PB_Si02}
                    onChange={(e) => { onHandleInput('C_PB_Si02', e.target.value) }}
                  />
                </Box>
              </div>
              <div className="col-span-1 pr-2 ">
                <FormControl sx={{ minWidth: 60 }} fullWidth size="small">
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={"%"}
                    onChange={() => {}}
                  >
                    <MenuItem value={"%"}>{"%"}</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="grid grid-cols-4 border py-1.5">
              <div className="col-span-2 flex">
                <span className="self-center text-base font-bold pl-4 lg:pl-8">
                  As (Arsenic)
                </span>
              </div>
              <div className="col-span-1 pr-2 flex items-center">
                <Box sx={{ }}>
                  <TextField
                    size={"small"}
                    
                    name="name"
                    type={"text"}
                    value={C_PB_As}
                    onChange={(e) => { onHandleInput('C_PB_As', e.target.value) }}
                  />
                </Box>
              </div>
              <div className="col-span-1 pr-2 ">
                <FormControl sx={{ minWidth: 60 }} fullWidth size="small">
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={"%"}
                    onChange={() => {}}
                  >
                    <MenuItem value={"%"}>{"%"}</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

      </div>
    </div>
  );
}

export default TableLead;