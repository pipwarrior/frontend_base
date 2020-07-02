import React from 'react';
import { FormControl, Select, MenuItem, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(0.5),
    width: '100%',
  },
  menuItemStyle: {
    alignItems: 'center',
    alignContent: 'center',
  }
}));

const FormSelect = (props) => {
  // console.log(props);
  const classes = useStyles();
  return (
    <div style={{ marginTop: 10 }}>
      <FormControl className={classes.formControl}>
        <Typography variant="subtitle2" display="block">
          {props.title}
        </Typography>
        <Select
          name={props.field.name}
          defaultValue={props.field.value}
          onChange={props.form.handleChange}
          className={classes.menuItemStyle}
          // autoWidth={true}
          fullWidth={true}
        >
          {
            props.options.map((option, key) => {
            return (
              <MenuItem value={ option.value } key={key}>
                {option.label}
              </MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
    </div>
  )
}

export default FormSelect;
