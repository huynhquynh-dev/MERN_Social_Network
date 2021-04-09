import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { register } from "../redux/actions/authAction";

const Register = () => {
	const { auth, alert } = useSelector((state) => state);
	const dispatch = useDispatch();
	const history = useHistory();

	const initialState = {
		fullname: "",
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		gender: "male" 
	};

	const [userData, setUserData] = useState(initialState);

	const { 
		fullname,
		username,
		email,
		password,
		confirmPassword,
		gender 
	 } = userData;

	const [typePass, setTypePass] = useState(false);
	const [typeConfirmPass, setTypeConfirmPass] = useState(false);

	useEffect(() => {
		if (auth.token) history.push("/");
	}, [auth.token, history]);

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(register(userData));
	};

	return (
		<div className="auth_page">
			<form onSubmit={handleSubmit}>
				<h3 className="text-uppercase text-center mb-4">QudiSpace</h3>

				<div className="form-group">
					<label htmlFor="fullname">Full Name</label>
					<input
						type="text"
						className="form-control"
						id="fullname"
						placeholder="Your full name"
						onChange={handleChangeInput}
						value={fullname}
						name="fullname"
						style={{background: `${alert.fullname ? '#fd2d6a14' : ''}`}}
					/>
					<small className="form-text text-danger ml-1">{alert.fullname ? alert.fullname : ''}</small>
				</div>

				<div className="form-group">
					<label htmlFor="username">User Name</label>
					<input
						type="text"
						className="form-control"
						id="username"
						placeholder="Your user name"
						onChange={handleChangeInput}
						value={username.toLowerCase().replace(/ /g, '')}
						name="username"
						style={{background: `${alert.username ? '#fd2d6a14' : ''}`}}
					/>
					<small className="form-text text-danger ml-1">{alert.username ? alert.username : ''}</small>
				</div>

				<div className="form-group">
					<label htmlFor="email">Email Address</label>
					<input
						type="email"
						className="form-control"
						id="email"
						placeholder="Your email"
						onChange={handleChangeInput}
						value={email}
						name="email"
						style={{background: `${alert.email ? '#fd2d6a14' : ''}`}}
					/>
					<small className="form-text text-danger ml-1">{alert.email ? alert.email : ''}</small>
				</div>

				<div className="form-group">
					<label htmlFor="password">Password</label>
					<div className="pass">
						<input
							type={typePass ? "text" : "password"}
							className="form-control"
							id="exampleInputPassword1"
							placeholder="Your password"
							onChange={handleChangeInput}
							value={password}
							name="password"
							style={{background: `${alert.password ? '#fd2d6a14' : ''}`}}
						/>
						<small onClick={() => setTypePass(!typePass)}>
							{typePass ? "Hide" : "Show"}
						</small>						
					</div>
					<small className="form-text text-danger ml-1">{alert.password ? alert.password : ''}</small>
				</div>

				<div className="form-group">
					<label htmlFor="confirmPassword">Confirm Password</label>
					<div className="pass">
						<input
							type={typeConfirmPass ? "text" : "password"}
							className="form-control"
							id="confirmPassword"
							placeholder="Your password"
							onChange={handleChangeInput}
							value={confirmPassword}
							name="confirmPassword"
							style={{background: `${alert.confirmPassword ? '#fd2d6a14' : ''}`}}
						/>
						<small onClick={() => setTypeConfirmPass(!typeConfirmPass)}>
							{typeConfirmPass ? "Hide" : "Show"}
						</small>						
					</div>
					<small className="form-text text-danger ml-1">{alert.confirmPassword ? alert.confirmPassword : ''}</small>
				</div>

				<div className="row justify-content-between mx-0 mb-1">
					<label htmlFor="male">
						Male: <input type="radio" id="male" name="gender" value="male" defaultChecked onChange={handleChangeInput}/>
					</label>
					<label htmlFor="female">
						Female: <input type="radio" id="female" name="gender" value="female" onChange={handleChangeInput}/>
					</label>
					<label htmlFor="other">
						Other: <input type="radio" id="other" name="gender" value="other" onChange={handleChangeInput}/>
					</label>
				</div>

				<button type="submit" className="mt-2 btn btn-dark w-100">
					Register
				</button>
				<p className="my-2">
					You already have an account?{" "}
					<Link to="/login" style={{ color: "crimson" }}>
						Login Now
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Register;
