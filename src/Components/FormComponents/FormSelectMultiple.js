import React from 'react';
import { FormControl, Select, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0.5),
    width: '100%',
  },
}));

const FormSelectMultiple = (props) => {
  const classes = useStyles();
  return (
    <div style={{ marginTop: 10 }}>
      <FormControl className={classes.formControl}>
        <Typography variant="subtitle2" display="block">
          {props.title}
        </Typography>
        
      </FormControl>
    </div>
  )
}

export default FormSelectMultiple;