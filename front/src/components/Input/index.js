import React from 'react'
import TextField from '@material-ui/core/TextField';

const InputField = (props) => {
    return(
        <TextField
            name={props.name}
            style={props.style}
            placeholder={props.placeholder}
            margin="normal"
            onChange={props.onChange}
        >
        </TextField>
    )
}

export default InputField