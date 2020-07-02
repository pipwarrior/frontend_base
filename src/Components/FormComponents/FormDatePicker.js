import React, { useState } from 'react';
import { FormControl, Typography, makeStyles } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0.5),
    width: '100%',
  },
}));

const FormDatePicker = (props) => {
  const [selectedDate, setSelectedDate] = useState(props.field.value ? new Date(props.field.value) : new Date());
  const handleChange = (e) => {
    setSelectedDate(e._d);
  }
  console.log(props);
  const classes = useStyles();
  return(
    <div style={{ marginTop: 10 }}>
      <FormControl className={classes.formControl}>
        <Typography variant="subtitle2" display="block">
          {props.title}
        </Typography>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            name={props.field.name}
            value={selectedDate}
            onChange={handleChange}
          />
        </MuiPickersUtilsProvider>
      </FormControl>
    </div>
  );
}

export default FormDatePicker;
