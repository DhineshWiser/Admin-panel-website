"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { SiGnuprivacyguard } from "react-icons/si";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [apiData, setApiData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://670f45153e715186165720fb.mockapi.io/admin")
      .then((response) => setApiData(response.data));
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    num: Yup.string().required("Number is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    repassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const { name, num, email, password } = values;

    const existingEmail = apiData.find(user => user.email === email);

    if (existingEmail) {
      toast.error("This email is already registered.");
    } else {
      axios.post("https://670f45153e715186165720fb.mockapi.io/admin", { name, num, email, password })
        .then(() => {
          toast.success("Signup successful!");
          resetForm();
          navigate("/login");
        })
        .catch((err) => {
          console.error("Error: ", err);
          toast.error("Error during signup. Please try again.");
        });
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "30rem", borderRadius: "10px" }}>
        <h1 className="fs-2 fw-bold text-primary mb-4">Sign Up</h1>

        <Formik
          initialValues={{
            name: "",
            num: "",
            email: "",
            password: "",
            repassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <Field
                  type="text"
                  className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                />
                {touched.name && errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="num" className="form-label">Number</label>
                <Field
                  type="number"
                  className={`form-control ${touched.num && errors.num ? "is-invalid" : ""}`}
                  id="num"
                  name="num"
                  placeholder="Enter Number"
                />
                {touched.num && errors.num && <div className="invalid-feedback">{errors.num}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field
                  type="email"
                  className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                />
                {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field
                  type="password"
                  className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                />
                {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="repassword" className="form-label">Confirm Password</label>
                <Field
                  type="password"
                  className={`form-control ${touched.repassword && errors.repassword ? "is-invalid" : ""}`}
                  id="repassword"
                  name="repassword"
                  placeholder="Confirm Password"
                />
                {touched.repassword && errors.repassword && <div className="invalid-feedback">{errors.repassword}</div>}
              </div>

              <div className="d-flex justify-content-center my-4">
                <button type="submit" className="btn btn-primary fw-bold px-4">Sign Up</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

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

export default Signup;
