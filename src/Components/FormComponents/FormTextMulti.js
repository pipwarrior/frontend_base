import React, { useState, useEffect, useRef, createRef } from 'react';
import { Grid, FormControl, TextField, Typography, makeStyles, Button, Chip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    flexGrow: 1,
  },
  formControl: {
    // margin: theme.spacing(0.5),
    width: '100%',
  },
  inlineStyle: {
    display: 'inline-block',
    width: '100%',
  },
  addButtonStyle: {
    // margin: '10px 0px 0px 0px'
    // float: 'right'
  },
  textBoxStyle: {
    width: '100%',
  },
  chipStyle: {
    margin: '5px 0px 0px 5px',
    width: '24%',
  }
}));

const FormTextMulti = (props) => {
  const fieldName = props.field.name;
  const handleChange = props.form.setFieldValue;
  const classes = useStyles();
  const [fieldValue, setFieldValue] = useState(props.field.value);
  const textBoxRef = useRef(null);
  const chipRef = fieldValue.map(() => createRef());

  useEffect(() => {
    handleChange(fieldName, fieldValue);
  }, [fieldValue, fieldName, handleChange]);

  const addItem = () => {
    const newItem = textBoxRef.current.children[0].children[0].value;
    if (newItem.trim() !== '') {
      setFieldValue(prevState => {return [...prevState, newItem]});
      textBoxRef.current.children[0].children[0].value = '';
    }
  }

  const displayFieldValue = fieldValue.map((value, key) => {
    return (
      <Chip 
        key={key}
        label={value}
        // onDelete={() => {
        //   const textContent = chipRef[key].current.children[0].textContent;
        //   const removeThis = chipRef[key].current;
        //   setFieldValue(prevState => {
        //     // const newState = prevState.filter(item => item !== textContent);
        //     prevState.splice(key,1);
        //     return prevState;
        //   })
        // }}
        onDelete={() => {
          const textContent = chipRef[key].current.children[0].textContent;
          // const removeThis = chipRef[key].current;
          setFieldValue(prevState => {
            const newState = prevState.filter(item => item !== textContent);
            return newState;
          })
        }}
        color="primary"
        variant="outlined"
        className={classes.chipStyle}
        ref={chipRef[key]}
      />
    )
  });

  return (
    <div style={{ marginTop: 10 }}>
      <FormControl className={classes.formControl}>
        <Typography variant="subtitle2" display="block">
          {props.title}
        </Typography>
        <Grid container spacing={1} style={{width:'100%'}}>
          <Grid item xs={11}>
            <TextField
              name={fieldName}
              type='text'
              disabled={props.disabled}
              variant="standard"
              size="medium"
              ref={textBoxRef}
              className={classes.textBoxStyle}
              onBlur={addItem}
            />
          </Grid>
          <Grid item xs={1} style={{display: "flex"}}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={addItem} 
              // className={classes.addButtonStyle}
            >
              Add
            </Button>
          </Grid>
        </Grid>
        <div>
          {displayFieldValue}
        </div>
      </FormControl>
    </div>
  )
}

export default FormTextMulti;