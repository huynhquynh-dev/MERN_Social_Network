import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="auth_page">
      <form>
        <h3 className="text-uppercase">QudiSpace</h3>
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
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Your password"
            onChange={handleChangeInput}
            value={password}
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-dark w-100" disabled={email && password ? false : true}>
          Submit
        </button>
		<p className="my-2">
			You don't have an account? <Link to="/register" style={{color: "crimson"}}>Register Now</Link>
		</p>
      </form>
    </div>
  );
};

export default Login;
