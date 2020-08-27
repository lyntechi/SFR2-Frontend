import React, { useState, useEffect } from "react";
import * as yup from "yup";
import validationSchema from "./validation/validationSchema";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import { setLoggedIn, setLoggedOut, setUser } from "../actions/accountActions";


const initialFormValues = {
  username: "",
  password: "",
};

const initialFormErrors = {
  username: "",
  password: "",
};

const initialDisabled = true;

function LoginForm(props) {
  const [login, setLogin] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [doesntExist, setDoesntExist] = useState(false);
  const history = useHistory();



useEffect(()=>{
  setLoggedIn()
  setLoggedOut()
},[])


  // FORM FUNCTIONS
  const onLoginSubmit = (evt) => {
    evt.preventDefault();
    axiosWithAuth()
      .post("/api/users/login ", login)
      .then((res) => {
        props.setLoggedIn();
        localStorage.setItem("token", res.data.data.token);
        props.setUser(res.data.data.user)
        history.push("/recipes");
      })
      .catch((err) => {
        console.log("error happend with post request", err);

        setDoesntExist(true);
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
    <form className="formContainerLogin" onSubmit={onLoginSubmit}>
      
      <div className='formContent'>
      <div>
        <h2 className="signUpTitle">
          Login for
          <br />
          <span className="appName">Secret Family Recipe</span>
        </h2>
        {doesntExist === false ? null : (
          <p className="error">Username doesnt exist!</p>
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
            value={login.username}
            onChange={inputChange}
          />
        </label>

        <label className="inputLabels">
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
      <div className="formSubmitContainer">
        <button id="submitBtn" disabled={disabled}>
          Login
        </button>
      </div>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.accountReducer.loggedIn,
  };
};
export default connect(mapStateToProps, { setLoggedIn, setLoggedOut, setUser })(
  LoginForm
);
