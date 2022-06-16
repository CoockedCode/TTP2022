import { MenuItem, Select } from "@mui/material";

export default function DropDown({name, ID, value, label, onChange, options}){
    return(
        <>
        <Select
            id={ID}
            value={value}
            label={label}
            onChange={onChange}
            sx={{my: "0.8rem"}}
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
        </>
    );

}
