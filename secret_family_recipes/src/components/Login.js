import React, { useState, useEffect } from "react";
import * as yup from "yup";
import validationSchema from "./validation/validationSchema";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const initialFormValues = {
  username: "",
  password: "",
};

const initialFormErrors = {
  username: "",
  password: "",
};

const initialDisabled = true;

export default function LoginForm() {
  const [login, setLogin] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const history = useHistory();

  // FORM FUNCTIONS
  const onLoginSubmit = (evt) => {
    evt.preventDefault();
    axiosWithAuth()
      .post("/api/users/login ", login)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        history.push("/recipes");
      });
    const userLogin = {
      username: login.username.trim(),
      password: login.password.trim(),
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

    setLogin({
      ...login,
      [name]: value,
    });
  };

  useEffect(() => {
    validationSchema.isValid(login).then((valid) => {
      setDisabled(!valid);
    });
  }, [login]);

  return (
    <form className="form container" onSubmit={onLoginSubmit}>
      <div>
        <h2>
          Login for
          <br />
          Secret Family Recipe
        </h2>
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
            value={login.username}
            onChange={inputChange}
          />
        </label>

        <label>
          Password:&nbsp;
          <input
            name="password"
            type="password"
            placeholder="******"
            value={login.password}
            onChange={inputChange}
          />
        </label>
      </div>
      <div className="form submit container">
        <button id="submitBtn" disabled={disabled}>
          Login
        </button>
      </div>

      <div>
        {/* <Route path='/Signup'> */}
        <h4>Don't have an account? Sign Up Here!</h4>
        {/* </Route> */}
      </div>
    </form>
  );
}
