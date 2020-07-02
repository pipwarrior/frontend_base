import React from 'react';
import { makeStyles, Typography } from '@material-ui/core'; 

const useStyles = makeStyles((theme)=> ({
  titleBox: {
    width: 'calc(100% - 20px)',
    margin: '0',
    padding: '10px 10px 10px 10px',
    // backgroundColor: 'blue',
  },
}));

const PageTitle = ({title, variant}) => {
  const classes = useStyles();

  return (
    <div className={classes.titleBox}>
      <Typography variant={variant}>
        {title}
      </Typography>
    </div>
  )
}

export default PageTitle;
