import React from 'react'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export const DropdownGroup: React.FC<any> = ({ dataset, data, onChange }) => {

  const handleChange = (
    e: SelectChangeEvent | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    
                  onChange(e.target.name, e.target.value);
  };


  return (
    <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: 700 }}>
      <Grid item xs={6} md={6}>
        <FormControl
          sx={{ minWidth: 60, maxWidth: 500 }}
          fullWidth
          size="small"
        >
          <InputLabel id="demo-simple-select-label">
            {dataset[0].label}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={data?.name}
            name="name"
            label={dataset[0].label}
            onChange={handleChange}
          >
            {dataset[0].options.map((item: string, index: number) => {
              return (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <Box sx={{ marginBottom: "10px" }}>
          <TextField
            size={"small"}
            label={"Value"}
            type="number"
            autoComplete="off"
            value={data?.value}
            onChange={handleChange}
            name="value"
            InputLabelProps={{ inputMode: "numeric", shrink: true }}
          />
        </Box>
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">
            {dataset[2].label}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={"%"}
            label={dataset[2].label}
            onChange={() => {}}
          >
            <MenuItem value={"%"}>{dataset[2].options[0]}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default DropdownGroup