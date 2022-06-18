import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export default function DropDown({name, ID, value, label, onChange, options, heading="grid", size="normal", disableLabel=true}){
    console.log()
    return(
        <>
        <h4 style={{display: heading, padding: "0", margin: "0", marginBottom: "0.5rem"}}>{name}</h4>
        <FormControl fullWidth InputLabelProps={{ shrink: true }}>
            <InputLabel InputLabelProps={{ shrink: true }}>{ !disableLabel ? label : "" }</InputLabel>
            <Select
                id={ID}
                value={value}
                onChange={onChange}
                label={ !disableLabel ? label : "" }
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
        </>
    );
}