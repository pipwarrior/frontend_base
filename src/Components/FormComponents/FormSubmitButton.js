import React from 'react';
import { FormControl, Button, /*makeStyles*/ } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   // formControl: {
//   //   margin: theme.spacing(0.5),
//   //   width: '100%',
//   // },
// }));

const FormSubmitButton = ({width}) => {
  // const classes = useStyles();
  // console.log(width)
  return(
    <div style={{ marginTop: 10 }}>
      <FormControl>
        <Button variant="contained" color="primary" type="submit" style={{width: '100'}} >
          Submit
        </Button>
      </FormControl>
    </div>
  );
};

export default FormSubmitButton;

FormSubmitButton.defaultProps = {
  width: ''
}
