import { MenuItem, Select } from "@mui/material";

export default function DropDown({name, ID, value, label, onChange, options}){
    return(
        <>
        <h4>{name}</h4>
        <Select
            id={ID}
            value={value}
            label={label}
            onChange={onChange}
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

