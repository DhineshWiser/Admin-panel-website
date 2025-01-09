"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaRegUserCircle } from "react-icons/fa";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';

// Login Component
const Login = () => {
  const [apiData, setApiData] = useState([]);
  const navigate = useNavigate();

  // Fetching users from the API
  useEffect(() => {
    axios
      .get("https://670f45153e715186165720fb.mockapi.io/admin")
      .then((response) => {
        setApiData(response.data);
      });
  }, []);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    const { email, password } = values;

    let filterdata = apiData.filter((item) => item?.email === email);

    if (filterdata.length === 0) {
      toast.error("Email not found, please register first.");
    } else {
      if (password === filterdata[0].password) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        toast.success("Login successful!");
        navigate("/products");
      } else {
        toast.error("Incorrect password. Please try again.");
      }
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-dark">
      <FaRegUserCircle className="fs-3 fw-bold" />
      <h1 className="fs-2 fw-bold mb-4">Log in</h1>

      {/* Formik Form */}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors }) => (
          <Form className="w-25">
            {/* Email Field */}
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

            {/* Password Field */}
            <div className="mb-3">
              <label className="fw-bold">Password:</label>
              <Field
                type="password"
                className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
                id="password"
                name="password"
                placeholder="Enter Password"
              />
              {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button type="submit" className="btn btn-primary fw-bold">
                Log in
              </button>
              <Link to="/UpdatePassword" className="btn btn-success fw-bold">
                Forget Password
              </Link>
            </div>
          </Form>
        )}
      </Formik>

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

export default Login;
