import React from 'react';
import { makeStyles, Button, Card, CardHeader, CardContent } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import FormText from '../../Components/FormComponents/FormText';
import FormTextMulti from '../../Components/FormComponents/FormTextMulti';
import FormSubmitButton from '../../Components/FormComponents/FormSubmitButton';
import axios from 'axios';
import Swal from 'sweetalert2'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    margin: '10px 0px 0px 10px'
  },
  cardRoot: {
    margin: '10px',
    boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.6)',
  },
}))

const CatalogForm = (props) => {
  const showRedirect = props.location.selectedItem;
  const isEdit = props.location.isEdit;
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = (values) => {
    if (!isEdit) {
      axios({
        method: 'post',
        url: process.env.REACT_APP_API+'/api/inventory',
        data: values,
        headers: {'auth-token': localStorage.getItem('auth-token')}
      }).then(function(newCatalogItem){
        if (newCatalogItem.data.errors) {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: newCatalogItem.data.error,
            confirmButtonText: 'Ok'
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            showConfirmButton: false,
            timer: 1500
          }).then(function(){
            history.push({
              pathname: '/catalog',
              selectedItem: newCatalogItem.data
            });
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
    } else {
      values._id = showRedirect._id;
      axios({
        method: 'patch',
        url: process.env.REACT_APP_API+'/api/inventory',
        data: values,
        headers: {'auth-token': localStorage.getItem('auth-token')}
      }).then(function(updatedCatalogItem){
        if (updatedCatalogItem.data.errors) {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: updatedCatalogItem.data.error,
            confirmButtonText: 'Ok'
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            showConfirmButton: false,
            timer: 1500
          }).then(function(){
            history.push({
              pathname: '/catalog',
              selectedItem: updatedCatalogItem.data
            });
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
  }

  let formTitle = 'Add new item to catalog'
  if (isEdit) {
    formTitle = 'Edit catalog item'
  }

  var initialValues = {
    // _id: isEdit && showRedirect ? showRedirect._id : '' ,
    partNumber: isEdit && showRedirect ? showRedirect.partNumber : [] ,
    description: isEdit && showRedirect ? showRedirect.description : '',
    brand: isEdit && showRedirect ? showRedirect.brand : '',
    category: isEdit && showRedirect ? showRedirect.category : ''
  }

  return (
    <div className={classes.root}>
      <Button 
        className={classes.backButton}
        variant="contained" 
        color="primary" 
        onClick={() => {
          history.push({
            pathname: '/catalog',
            selectedItem: showRedirect
          });
        }}
      >
        Back
      </Button>
      <div>
        <Card className={classes.cardRoot}>
          <CardHeader 
            title={formTitle}
          />
          <CardContent>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
            >
              {(
                handleChange,
              ) => (
                <Form>
                  <Field 
                    title="Part number"
                    name="partNumber"
                    handleChange={handleChange}
                    component={FormTextMulti}
                  />
                  <Field
                    title="Description"
                    name="description"
                    type="text"
                    component={FormText}
                  />
                  <Field
                    title="Brand"
                    name="brand"
                    type="text"
                    component={FormText}
                  />
                  <Field
                    title="Category"
                    name="category"
                    type="text"
                    component={FormText}
                  />
                  <FormSubmitButton />
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CatalogForm;
