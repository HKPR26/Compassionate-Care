import React from "react";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import "../views/Services.css"; // Import CSS file
function Services() {
  return (
    <>
      <div
        className="content"
        style={{
          backgroundImage: `url(${require("../assets/1.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          height: "100vh",
        }}
      >
        <Row>
          <Col md="6" className="mt-5">
            {" "}
            {/* Add margin-top to push it down */}
            <div className="ml-3">
            <Card
        className="image-card"
        style={{
          height: "18rem",
          background: `url(${require("../assets/What-is-location-tracking_.png")}) center/cover no-repeat`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          transition: "transform 0.3s ease",
        }}
      >
                <CardBody>{/* No title */}</CardBody>
              </Card>
              <div className="mt-3 d-flex justify-content-center">
                {" "}
                {/* Adjust margin-top as needed */}
                <Button  onClick={() => {
                    window.location.href = "/admin/dashboard/liveLocationFeature";
                  }} color="primary">Live Location Tracking</Button>  
              </div>
            </div>
          </Col>
          <Col md="6" className="mt-5">
            {" "}
            {/* Add margin-top to push it down */}
            <div className="mr-3">
              <Card
                   className="image-card" style={{
                  height: "18rem",
                  background: `url(${require("../assets/1_BBYDxgzLQi12aRNbZK4Wiw.jpg")}) center/cover no-repeat`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  transition: "transform 0.3s ease",
                }}
              >
                <CardBody>{/* No title */}</CardBody>
              </Card>
              <div className="mt-3 d-flex justify-content-center">
                {" "}
                {/* Adjust margin-top as needed */}
                <Button
                  onClick={() => {
                    window.location.href =
                      "/admin/dashboard/medicineReminderDashboard";
                  }}
                  color="primary"
                >
                  Medicine Reminder
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Services;
