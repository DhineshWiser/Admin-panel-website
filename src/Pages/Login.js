import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaRegUserCircle } from "react-icons/fa";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
// import '../Login.css'; 

const Login = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    GetData();
  }, [useNavigate]);

  const GetData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://670f45153e715186165720fb.mockapi.io/admin");
      setApiData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user data.");
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    const { email, password } = values;

    if (loading) {
      toast.error("Please wait, data is loading...");
      return;
    }

    let user = apiData.filter((item) => item.email === email);

    if (!user) {
      toast.error("Email not found, please register first.");
    } else if (password === user[0].password) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      toast.success("Login successful!");
      navigate('/pro');
    } else {
      toast.error("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light"> 
      <div className="card shadow-lg p-4" style={{ width: "30rem", borderRadius: "10px" }}> 
      <h1 className="fs-2 fw-bold mb-4 text-primary text-center">Login</h1>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form className="login-form">
              <div className="mb-3">
                <label htmlFor="email" className="fw-semibold text-dark">Email:</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                  disabled={loading}
                />
                {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="fw-semibold text-dark">Password:</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
                  disabled={loading}
                />
                {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mt-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>

              <div className="mt-3 text-center">
                <Link to="/UpdatePassword" className="text-muted">Forgot Password?</Link>
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
        theme="colored" 
      />
    </div>
  );
};

export default Login;
