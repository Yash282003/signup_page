import { useState, useEffect } from "react";
import "./signup.css";

function App() {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    
  };
  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 7 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        null
      )}

      <div className="signup_details">
        <h1>SignUp Now</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="name"
            className="input_box"
            placeholder="Your Name"
            value={formValues.username}
            onChange={handleChange}
            name="username"
          />
          <p>{formErrors.name}</p>
          <input
            type="email"
            className="input_box"
            placeholder="Your Email"
            value={formValues.email}
            onChange={handleChange}
            name="email"
          />
          <p>{formErrors.email}</p>
          <input
            type={isPasswordVisible ? "text" : "password"}
            className={`input_box ${isPasswordVisible ? 'visible' : ''}`}
            placeholder="Your Password"
            value={formValues.password}
            onChange={handleChange}
            name="password"
            
          />
          <span
              className="toggle-password"
              onClick={handleTogglePasswordVisibility}
            >
              <i className={`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`} />
            </span>
          
          <p>{formErrors.password}</p>
          <p>
            <span>
              <input type="checkbox" />
            </span>
            I agree to the terms of services{" "}
          </p>
          <button type="submit" className="signup_button">
            Sign up
          </button>
          <hr />
          <p className="or">OR</p>
          <p>
            Do you already have an account?
            <a href="#">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default App;
