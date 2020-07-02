import React from 'react';
import { FormControlLabel, Switch, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0.5),
    marginRight: 0,
    display: "flex",
    justifyContent: "space-between",
    // width: '100%',
  },
  lineStyle: {
    margin: theme.spacing(0.5),
    // margin: '3px 0px 3px 0px',
  }
}));

const FormSwitch = (props) => {
  // console.log(props)
  const classes = useStyles();
  return(
    <div style={{ marginTop: 10 }}>
      {/* <hr className={classes.lineStyle} /> */}
        <FormControlLabel
          control={
            <Switch 
              color={props.color} 
              value={props.field.value ? props.field.value : false} 
              onChange={props.form.handleChange} 
            />
          }
          label={props.title}
          labelPlacement="start"
          name={props.field.name}
          // onChange={props.form.handleChange}
          className={classes.formControl}
        />
      <hr className={classes.lineStyle} />
    </div>
  );
};

export default FormSwitch;
