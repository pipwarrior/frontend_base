import React from 'react';
import { Formik, Form, Field } from 'formik'
// import FormText from '../../Components/FormComponents/FormText';
import FormTextMulti from '../../Components/FormComponents/FormTextMulti';
// import FormSelect from '../../Components/FormComponents/FormSelect';
import FormSubmitButton from '../../Components/FormComponents/FormSubmitButton';

const Settings = () => {
  const handleSubmit = (values) => {
    console.log(values);
  }
  const initialValues = {
    test: ['part1', 'part2', 'part3', 'part4', 'part5', 'part6', 'part7', 'part8', 'part9']
    // test: []
  }
  return (
    <div>
      <h1>Settings Page</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {(
          // values,
          handleChange,
          ) => (
            <Form>
            <Field
              title="Test"
              name="test"
              handleChange={handleChange}
              component={FormTextMulti}
            />
            <FormSubmitButton />
            </Form>
        )}
      </Formik>
    </div>
  )
}

export default Settings;