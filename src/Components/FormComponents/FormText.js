import React from 'react';
import { FormControl, TextField, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(0.5),
    width: '100%',
  },
}));

const FormText = (props) => {
  const classes = useStyles();
  return (
    <div style={{ marginTop: 10 }}>
      <FormControl className={classes.formControl}>
        <Typography variant="subtitle2" display="block">
          {props.title}
        </Typography>
        <TextField
          name={props.field.name}
          type={props.type}
          disabled={props.disabled}
          defaultValue={props.field.value}
          onChange={props.form.handleChange}
          variant="standard"
          size="medium"
        />
      </FormControl>
    </div>
  )
}

export default FormText;