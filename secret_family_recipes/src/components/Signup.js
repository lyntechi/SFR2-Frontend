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
      <form className="formContainer" onSubmit={onSubmit}>
        <div className='formContent'>

        <div>
          <h2 className="signUpTitle">
            Sign Up for <br />
            <span className="appName">Secret Family Recipe</span>
          </h2>
          {loginExists === false ? null : (
          <p className="error">Username is already taken. Try Again!</p>
        )}
        </div>
        <div className="error container">
          <div className="error">{errors.first_name}</div>
          <div className="error">{errors.password}</div>
        </div>

        <div className="formInputs">
          <label className="inputLabels">
            Username:&nbsp;
            <input
              name="username"
              type="text"
              placeholder="username"
              value={formValues.username}
              onChange={inputChange}
            />
          </label>

          <label className="inputLabels">
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
        <div className="formSubmitContainer">
          <button id="submitBtn" disabled={disabled}>
            Register
          </button>
        </div>
        </div>
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