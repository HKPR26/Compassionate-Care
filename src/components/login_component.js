import React, { Component } from "react";
import "../index.css";
import { toast, ToastContainer } from "react-toastify";

// Import your background image
import backgroundImage from "../assets/bg2.jpg";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // Login component
  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    fetch("http://localhost:5000/login-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Login failed");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data, "userRegister");
        alert("Login successful");
        window.localStorage.setItem("token", data.data);
        // Redirect to dashboard or other page upon successful login
        window.location.href = "/admin/dashboard";
      })
      .catch((error) => {
        console.error("Login error:", error.message); // Log the error message
        // Display toast message only if login fails
        toast("Login failed. Please try again.", { type: "error" });
      });
  }
  
  render() {
    return ( 
      <div
      className="auth-wrapper"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", // Ensure background covers the whole viewport
      }}
      >
        <div className="auth-inner">
          <form onSubmit={this.handleSubmit}>
            <ToastContainer />
            <h2 style={{ textAlign: "center", fontFamily: "Bebas Neue" }}>Sign In</h2> {/* Change font family using inline style */}

            <div className="mb-3">
              <label>E-mail address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>

            <p className="forgot-password text-right">
              Don't have an account? <a href="/sign-up">Sign Up</a>
            </p>
          </form>
        </div>
      </div>

    );
  }
}
