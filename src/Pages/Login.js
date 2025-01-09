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
import '../Login.css';  // Optional: You can create this file for custom styling

const Login = () => {
  const [apiData, setApiData] = useState([]);
  const navigate = useNavigate();

  // Fetch user data from API on component mount
  useEffect(() => {
    axios
      .get("https://670f45153e715186165720fb.mockapi.io/admin")
      .then((response) => {
        setApiData(response.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data.");
      });
  }, []);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    const { email, password } = values;

    let user = apiData.find((item) => item?.email === email);

    if (!user) {
      toast.error("Email not found, please register first.");
    } else if (password === user.password) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password); // Note: Storing password is not ideal
      toast.success("Login successful!");
      navigate("/products");
    } else {
      toast.error("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="login-container d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-dark">
      <FaRegUserCircle className="fs-3 fw-bold login-icon" />
      <h1 className="fs-2 fw-bold mb-4">Log in</h1>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors }) => (
          <Form className="login-form w-25">
            {/* Email Field */}
            <div className="mb-3">
              <label className="fw-bold text-dark">Email:</label>
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
              <label className="fw-bold text-dark">Password:</label>
              <Field
                type="password"
                className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
                id="password"
                name="password"
                placeholder="Enter Password"
              />
              {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-between mt-4">
              <button type="submit" className="btn btn-primary fw-bold login-btn">
                Log in
              </button>
              <Link to="/UpdatePassword" className="btn btn-success fw-bold forget-password-btn">
                Forget Password
              </Link>
            </div>
          </Form>
        )}
      </Formik>

      {/* Toast Notifications */}
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
