"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';

const ForgetPassword = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
  });

  const handleSubmit = (values) => {
    const { email } = values;

    
    toast.success(`Password reset link sent to ${email}!`);
    setIsEmailSent(true);  
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-dark">
      <h1 className="fs-2 fw-bold mb-4">Forgot Your Password?</h1>

      {!isEmailSent ? (
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form className="w-25">
              <div className="mb-3">
                <label className="fw-bold">Email:</label>
                <Field
                  type="email"
                  className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                />
                {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="d-flex justify-content-between mt-4">
                <button type="submit" className="btn btn-primary fw-bold">
                  Send Reset Link
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="text-center">
          <h2>Check your email inbox!</h2>
          <p>A password reset link has been sent to your email address. Please follow the link to reset your password.</p>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ForgetPassword;
