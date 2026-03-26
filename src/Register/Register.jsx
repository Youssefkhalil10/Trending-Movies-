import axios from "axios";
import React, { useState } from "react";
import Joi from "joi";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../Firebase.js";

export default function Register() {
  const [errorList, setErrorList] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: "",
  });

  function getUser(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  async function submitRegister(e) {
    e.preventDefault();
    setIsLoading(true);

    let validationResult = ValidateRegisterForm(user);

    if (validationResult.error) {
      setIsLoading(false);
      ///list all errors
      setErrorList(validationResult.error.details);
      console.log(validationResult);
    } else {
      try {
        await signUp(user.email, user.password);
        navigate("/login");
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }
  }

  function ValidateRegisterForm(user) {
    let schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(8).required(),
      last_name: Joi.string().alphanum().min(3).max(8).required(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string()
        .min(6)
        .pattern(/^[A-Z][a-z]{3,8}$/),
    });
    return schema.validate(user, { abortEarly: false });
  }

  return (
    <>
      <h2 className="my-3">Register Now</h2>

      {errorList.map((error, index) => {
        if (index === 4) {
          return (
            <div key={index} className="alert alert-danger">
              Password Invalid
            </div>
          );
        } else
          return (
            <div key={index} className="alert alert-danger">
              {error.message}
            </div>
          );
      })}

      {error ? <div className="alert alert-danger">{error}</div> : ""}

      <form className="py-4" onSubmit={submitRegister}>
        <label htmlFor="first_name">First Name</label>
        <input
          onChange={getUser}
          type="text"
          className="form-control my-3"
          name="first_name"
          id="first_name"
        />

        <label htmlFor="last_name">Last Name</label>
        <input
          onChange={getUser}
          type="text"
          className="form-control my-3"
          name="last_name"
          id="last_name"
        />

        <label htmlFor="age">Age</label>
        <input
          onChange={getUser}
          type="number"
          className="form-control my-3"
          name="age"
          id="age"
        />

        <label htmlFor="email">Email</label>
        <input
          onChange={getUser}
          type="email"
          className="form-control my-3"
          name="email"
          id="email"
        />

        <label htmlFor="password">password</label>
        <input
          onChange={getUser}
          type="password"
          className="form-control my-3"
          name="password"
          id="password"
        />

        <button type="submit" className="btn btn-outline-info">
          {IsLoading ? (
            <i className=" fas fa-spinner fa-spin "></i>
          ) : (
            "register"
          )}
        </button>
      </form>
      <div className="w-100">
        Alerady Have An Account?{" "}
        <Link
          className="text-primary fw-bold text-decoration-underline"
          to={"/login"}
        >
          LogIn
        </Link>
      </div>
    </>
  );
}

// try {
//   await signUp(user.email, user.password);
//   navigate("/login"); // ✅ تحويل المستخدم إلى صفحة تسجيل الدخول
// } catch (err) {
//   setError(err);
//   setIsLoading(false);
// }
