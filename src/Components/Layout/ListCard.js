import React from 'react';
import { makeStyles, Typography, Card, CardHeader, 
  // IconButton
} from '@material-ui/core';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme)=> ({
  cardStyle: {
    margin: '10px',
    boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.6)',
    cursor: 'pointer',
    // backgroundColor: 'red',
  },
  cardHeaderStyle: {
    cursor: 'pointer',
  },
  cardContentRoot: {
    paddingTop: '0px',
  },
}));

const ListCard = ({
  value,
  id,
  title,
  subTitle,
  contentTitle,
  content,
  handleSelectitemChange,
  selectedItem
}) => {
  const classes = useStyles();
  let boxBackgroundColor = {backgroundColor: ''};

  if (title.length !== 1) {
    title = title.join(', ');
  }

  if(selectedItem && selectedItem._id === id) {
    boxBackgroundColor = {
      // backgroundColor: '#F8F8F8',
      boxShadow: '0px 0px 6px 0px #3f51b5'
    };
  }

  return (
    <Card className={classes.cardStyle} style={boxBackgroundColor}>
      <CardHeader
        onClick={() => handleSelectitemChange(value)}
        title={
          <Typography 
            className={classes.cardHeaderStyle}
            variant='h6'
            onClick={() => handleSelectitemChange(value)}
          >
            {title}
          </Typography>
        }
        subheader={subTitle}
        // action={
        //   <IconButton aria-label="settings">
        //     <ExpandMoreIcon />
        //   </IconButton>
        // }
      />
      {/* <CardContent className={classes.cardContentRoot}>
        <Typography variant="body2" color="textSecondary" component="p">
          {contentTitle}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {content}
        </Typography>
      </CardContent> */}
    </Card>
  )
}

export default ListCard;
