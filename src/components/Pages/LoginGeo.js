import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Geolocate from "./Geolocate";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "./map2.jpg"; // Import your background image

const LoginGeo = () => {
  const [namelog, setNamelog] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [dash, setDash] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    let pass = localStorage.getItem("Password").replace(/"/g, "");
    let name = localStorage.getItem("Name").replace(/"/g, "");

    if (!namelog || !password) {
      setFlag(true);
      console.log("Empty");
    } else if (password !== pass || namelog !== name) {
      setFlag(true);
      return toast("User Doesn't Exist.....", { type: "error" });
    } else {
      setDash(!dash);
      setFlag(false);
      navigate("/logged/locate");
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
      <Container className="justify-content-center text-center height mid bag">
        <Row
          xs={1}
          md={1}
          className="justify-content-md-center align-self-center bag-color mid"
        >
          {dash ? (
            <form onSubmit={handleSubmit}>
              <Col md="auto">
                <h2 className="cent">Login</h2>
              </Col>
              <div>
                <input
                  name="namelog"
                  value={namelog}
                  className="mar width custom-input"
                  placeholder="name"
                  required
                  onChange={(e) => setNamelog(e.target.value)}
                />
              </div>
              <div>
                <input
                  name="pass"
                  value={password}
                  className="mar width custom-input"
                  placeholder="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" variant="primary" size="sm">
                Login
              </Button>
              <div>
                <p>
                  Don't have an account?
                  <Link className="link" to="/admin/dashboard/liveLocationFeature">
                    Signup
                  </Link>
                </p>
              </div>
              <ToastContainer />
            </form>
          ) : (
            <Geolocate />
          )}
        </Row>
        {/* Add button for going back to dashboard */}
        <Button
          variant="secondary"
          className="btn-back-dashboard"
          onClick={() => navigate("./views/Dashboard.js")} // Change this to the appropriate route
        >
          Go back to Dashboard
        </Button>
      </Container>
    </div>
  );
};

export default LoginGeo;
