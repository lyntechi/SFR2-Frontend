import React, { useState, useEffect } from "react";
import * as yup from "yup";
import validationSchema from "./validation/validationSchema";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory, Link } from "react-router-dom";
import { setLoggedIn, setLoggedOut } from "../actions/accountActions";
import { connect } from "react-redux";

const initialFormValues = {
  username: "",
  password: "",
};

const initialFormErrors = {
  username: "",
  password: "",
};

const initialUser = [];
const initialDisabled = true;

  function SignupForm(props) {
  const [users, setUsers] = useState(initialUser);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const history = useHistory();
  const [loginExists, setLoginExists] = useState(false);


  // FORM FUNCTIONS
  const onSubmit = (evt) => {
    evt.preventDefault();
    axiosWithAuth()
      .post("/api/users/register", formValues)
      .then((res) => {
        props.setLoggedIn()
        console.log("new user created", res.data);
        localStorage.setItem("token", res.data.data.token);
        history.push("/recipes");
      })
      .catch(error=>{
        setLoginExists(true);
      })
    const newUser = {
      username: formValues.username.trim(),
      password: formValues.password.trim(),
    };
  };

  // YUP VALIDATIONS
  const inputChange = (evt) => {
    const { name, value } = evt.target;

    yup
      .reach(validationSchema, name)
      .validate(value)
      .then((valid) => {
        setErrors({
          ...errors,
          [name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [name]: err.errors[0],
        });
      });

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    validationSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <>
      <form className="form container" onSubmit={onSubmit}>
        <div>
          <h2>
            Sign Up for <br />
            Secret Family Recipe
          </h2>
          {loginExists === false ? null : (
          <p className="error">Username is already taken. Try Again!</p>
        )}
        </div>
        <div className="error container">
          <div className="error">{errors.first_name}</div>
          <div className="error">{errors.password}</div>
        </div>

        <div className="form inputs">
          <label>
            Username:&nbsp;
            <input
              name="username"
              type="text"
              placeholder="username"
              value={formValues.username}
              onChange={inputChange}
            />
          </label>

          <label>
            Password:&nbsp;
            <input
              name="password"
              type="password"
              placeholder="******"
              value={formValues.password}
              onChange={inputChange}
            />
          </label>
        </div>
        <div className="form submit container">
          <button id="submitBtn" disabled={disabled}>
            Register
          </button>
        </div>

        {/* <Route path='/Login' component={Login}> */}
        <div>
          <h4>Already have an account? <Link to="/login">Login Here!</Link></h4>
        </div>
        {/* </Route> */}
      </form>
    </>
  );
}



const mapStateToProps = (state) => {
  return {
    loggedIn: state.accountReducer.loggedIn,
  };
};
export default connect(mapStateToProps, { setLoggedIn, setLoggedOut })(SignupForm);