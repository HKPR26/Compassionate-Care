import React, { Component } from "react";
import app from "./firebase_config";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import backgroundImage from "../assets/bg.jpg";

const auth = getAuth(app);

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      mobile: "",
      password: "",
      verifyButton: false,
      verifyotp: false,
      otp: "",
      verified: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSignInSubmit = this.onSignInSubmit.bind(this);
    this.verifyCode = this.verifyCode.bind(this);
  }

  componentDidMount() {
    // Render reCAPTCHA when the component mounts
    this.renderRecaptcha();
  }

  renderRecaptcha() {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // Do nothing, just trigger the callback
        },
      },
      auth
    );
  }

  onSignInSubmit() {
    const phoneNumber = "+91" + this.state.mobile;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        alert("OTP sent");
        this.setState({ verifyotp: true });
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        alert("Error sending OTP. Please try again later.");
      });
  }

  verifyCode() {
    window.confirmationResult
      .confirm(this.state.otp)
      .then((result) => {
        const user = result.user;
        console.log(user);
        alert("Verification Done");
        this.setState({
          verified: true,
          verifiedotp: false,
        });
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        alert("Invalid OTP. Please try again.");
      });
  }

  changeMobile(e) {
    const mobileNumber = e.target.value;
    this.setState({ mobile: mobileNumber }, () => {
      if (mobileNumber.length === 10) {
        this.setState({
          verifyButton: true,
        });
      } else {
        this.setState({
          verifyButton: false,
        });
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.verified) {
      const { fname, lname, email, mobile, password } = this.state;
      fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          fname,
          email,
          lname,
          mobile,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status === "ok") {
            alert("Registration Successful");
          } else {
            alert("Something went wrong");
          }
        })
        .catch((error) => {
          console.error("Error registering user:", error);
          alert("Error registering user. Please try again later.");
        });
    } else {
      alert("Please Verify Mobile");
    }
  }

  render() {
    return (
      <div
        className="auth-wrapper"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div className="auth-inner">
          <form onSubmit={this.handleSubmit}>
          <h2 style={{ textAlign: "center", fontFamily: "Bebas Neue" }}>Welcome To CC 🤝</h2> {/* Change font family using inline style and add the handshake emoji */}
            <div id="recaptcha-container"></div>
            <div className="mb-3">
              <label>First name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
                value={this.state.fname}
                onChange={(e) => this.setState({ fname: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label>Last name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter last name"
                value={this.state.lname}
                onChange={(e) => this.setState({ lname: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label>Mobile</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Mobile"
                onChange={(e) => this.changeMobile(e)}
              />
              {this.state.verifyButton ? (
                <input
                  type="button"
                  value={this.state.verified ? "Verified" : "Verify"}
                  onClick={this.onSignInSubmit}
                  style={{
                    backgroundColor: "#51cbce",
                    width: "100%",
                    padding: 8,
                    color: "white",
                    border: "none",
                  }}
                />
              ) : null}
            </div>
            {this.state.verifyotp ? (
              <div className="mb-3">
                <label>OTP</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter OTP"
                  onChange={(e) => this.setState({ otp: e.target.value })}
                />
                <input
                  type="button"
                  value="Verify OTP"
                  onClick={this.verifyCode}
                  style={{
                    backgroundColor: "#51cbce",
                    width: "100%",
                    padding: 8,
                    color: "white",
                    border: "none",
                  }}
                />
              </div>
            ) : null}
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <a href="/sign-in">sign in?</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
