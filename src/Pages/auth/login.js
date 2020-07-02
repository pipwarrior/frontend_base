import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import FormText from '../../Components/FormComponents/FormText';
import FormSubmitButton from '../../Components/FormComponents/FormSubmitButton';
import { makeStyles, Card, CardContent, Typography } from '@material-ui/core';
import UserContext from '../../context/UserContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const useStyles = makeStyles({
  root: {
    minWidth: '300px',
    width: '60%',
    margin: 'auto',
    marginTop: '10%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Login = () => {
  const history = useHistory();
  const { setUserData } = useContext(UserContext);
  const classes = useStyles();
  
  const handleSubmit = async (values) => {
    await axios({
      method:'post',
      url: process.env.REACT_APP_API+'/api/auth/login',
      data: values
    }).then(function(loginRes){
      if(loginRes.data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: loginRes.data.error,
          confirmButtonText: 'Ok'
        })
       } else {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          showConfirmButton: false,
          timer: 1500
        }).then(function(){
          setUserData({
            token: loginRes.data.token,
            accountType: loginRes.data.user.accountType,
            username: loginRes.data.user.username,
            fullName: loginRes.data.user.fullName
          })
          localStorage.setItem('auth-token', loginRes.data.token);
          localStorage.setItem('accountType', loginRes.data.user.accountType);
          history.push('/catalog');
        })
       }
    }).catch(function(err){
      let errMessage = err;
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong..',
        text: errMessage,
        confirmButtonText: 'Ok'
      })
    })
  }

  const initialValues = {
    username: '',
    password: ''
  }

  return (
    <div className={classes.root}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>My catalog</Typography>
          <Typography variant="body2" component="p">Login</Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {(
              values,
              // handleChange,
              ) => (
                <Form>
                  <Field
                    title="Username"
                    name="username"
                    type="text"
                    component={FormText}
                  />
                  <Field
                    title="Password"
                    name="password"
                    type="password"
                    component={FormText}
                  />
                  <FormSubmitButton
                    width={100}
                  />
                </Form>
              )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login;