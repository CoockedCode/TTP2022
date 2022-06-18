import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export default function DropDown({name, ID, value, label, onChange, options, heading = "none", size="normal"}){
    console.log()
    return(
        <FormControl fullWidth InputLabelProps={{ shrink: true }}>
            <h4 style={{display: heading}}>{name}</h4>
            <InputLabel InputLabelProps={{ shrink: true }}>{label}</InputLabel>
            <Select
                id={ID}
                value={value}
                onChange={onChange}
                label={label}
                MenuProps={{ disableScrollLock: true }}
                InputLabelProps={{ shrink: true }}
                size={size}
            >
                {options.map((options, index) => (
                    <MenuItem
                        key={index}
                        value={options.id}
                        placeholder={options.name}
                    >
                        {options.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

    );

}
