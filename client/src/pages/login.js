import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { useDispatch } from "react-redux"

const Login = () => {
  const initialState = { email: "", password: "" };
  
  const [userData, setUserData] = useState(initialState);

  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false)

  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-uppercase text-center mb-4">QudiSpace</h3>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Your email"
            onChange={handleChangeInput}
            value={email}
            name="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <div className="pass">
            <input
              type={ typePass ? "text" : "password" }
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Your password"
              onChange={handleChangeInput}
              value={password}
              name="password"
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? 'Hide' : 'Show'}
            </small>
          </div>
        </div>
        <button
          type="submit"
          className="mt-2 btn btn-dark w-100"
          disabled={email && password ? false : true}
        >
          Login
        </button>
        <p className="my-2">
          You don't have an account?{" "}
          <Link to="/register" style={{ color: "crimson" }}>
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
