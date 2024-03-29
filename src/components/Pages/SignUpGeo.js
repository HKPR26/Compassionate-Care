import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Login from "./LoginGeo";
import "./signupLocation.css";
import { ToastContainer, toast } from "react-toastify";
import backgroundImage from "./map.jpg"; // Import your background image

const SignUp = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [flag, setFlag] = useState(false);
  const [login, setLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !pass) {
      setFlag(true);
    } else {
      setFlag(false);
      localStorage.setItem("Name", JSON.stringify(name));
      localStorage.setItem("Password", JSON.stringify(pass));
      console.log("Saved in Local storage!");
      setLogin(!Login);
      toast("SignUp successfully done!", { type: "success" });
    }
  };

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
      <div className="justify-content-center text-center height mid">
        <Row
          xs={1}
          md={1}
          className="justify-content-md-center align-self-center"
        >
          {login ? (
            <form onSubmit={handleSubmit}>
              <Col md="auto">
                <h2 className="cent">Sign Up</h2>
              </Col>
              <div>
                <input
                  name="name"
                  value={name}
                  className="mar width custom-input"
                  placeholder="name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <input
                  name="pass"
                  value={pass}
                  className="mar width custom-input"
                  placeholder="Password"
                  required
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
              <Button type="submit" variant="primary" size="sm">
                Sign Up
              </Button>

              <div>
                <p>
                  If you successfully done signup then click{" "}
                  <Link
                    className="link"
                    to="/admin/dashboard/liveLocationFeature/login"
                  >
                    Login
                  </Link>
                </p>
              </div>

              <ToastContainer />
            </form>
          ) : (
            <Login />
          )}
        </Row>
      </div>
    </div>
  );
};

export default SignUp;
