import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export default function DropDown({name, ID, value, label, onChange, options, heading="grid", size="normal", disableLabel=true, margin="normal", padding="normal", nameValue=false}){
    return(
        <>
        <h4 style={{display: heading, padding: "0", margin: "0", marginBottom: "0.5rem"}}>{name}</h4>
        <FormControl fullWidth InputLabelProps={{ shrink: true }} size={size}>
            <InputLabel InputLabelProps={{ shrink: true }}>{ !disableLabel ? label : "" }</InputLabel>
            <Select
                id={ID}
                value={value}
                onChange={onChange}
                label={ !disableLabel ? label : "" }
                MenuProps={{ disableScrollLock: true }}
                InputLabelProps={{ shrink: true }}
                margin={margin}
                padding={padding}
            >
                {options.map((options, index) => (
                    <MenuItem
                        key={index}
                        value={ nameValue ? options.name : options.id }
                        name={options.name}
                    >
                        {options.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        </>
    );
}
