import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = (props) => {
  const host = 'https://inotebook-8my7.onrender.com';
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth and redirect
      localStorage.setItem('token', json.authToken);
      localStorage.setItem('username', json.userName);
      props.showAlert('Login Successfully', 'success');
      history('/');
    } else {
      props.showAlert('Invalid credentials', 'danger');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div class="alert alert-info" role="alert">
        Please login from the below login form to create/view your own notes,
        blogs. Don't have an account, <b>SignUp </b>
        <Link to="/signup">here</Link>
      </div>
      <div className="login-form">
        <h2>Sign in</h2>
        <form method="post" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
