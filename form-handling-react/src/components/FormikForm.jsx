import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// 1. Define the Validation Schema using Yup
const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const FormikForm = () => {
  const initialValues = { username: '', email: '', password: '' };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Formik handles state and validation; we just handle the submission logic
    setTimeout(() => {
      console.log('Submitting Formik Data:', values);
      alert(`Formik registration successful for: ${values.username}`);
      
      setSubmitting(false); 
      resetForm(); 
    }, 500);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #007bff', borderRadius: '8px' }}>
      <h3>2. Formik & Yup Integration</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema} // Use Yup schema for validation
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          // <Form> is Formik's wrapper for the HTML form element
          <Form>
            
            <label htmlFor="username">Username:</label>
            {/* <Field> is Formik's wrapper for input, handling value, onChange, and onBlur */}
            <Field name="username" type="text" />
            {/* <ErrorMessage> displays the Yup validation error */}
            <ErrorMessage name="username" component="div" style={{ color: 'red', fontSize: '12px' }} />
            <br/>
            
            <label htmlFor="email">Email:</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: '12px' }} />
            <br/>
            
            <label htmlFor="password">Password:</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" style={{ color: 'red', fontSize: '12px' }} />
            <br/><br/>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Register (Formik)'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;