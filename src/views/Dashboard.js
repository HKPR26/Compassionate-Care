import React from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { Line, Pie, Bar } from "react-chartjs-2";
import backgroundImage from "../assets/homeee.png"; // Import your background image
import alzheimersImage from "../assets/6425307.jpg";
import second from "../assets/favicon.png";
import third from "../assets/hehe.jpg"
 // Import Alzheimer's image
import "./Dashboard.css"; // Import CSS for animations

function Dashboard() {
  // Sample data for demonstration purposes
  const liveLocationData = {
    labels: ["Home", "Clinic", "Park", "Grocery Store", "Pharmacy"],
    datasets: [
      {
        label: "Live Location",
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800"],
        data: [25, 15, 20, 10, 30], // Sample percentages for each location
      },
    ],
  };

  const medicineReminderData = {
    labels: ["Morning", "Afternoon", "Evening"],
    datasets: [
      {
        label: "Medicine Reminder",
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        data: [80, 70, 90], // Sample percentages for each time of the day
      },
    ],
  };

  const additionalFeatures = [
    "Live Location Tracking: Patients' whereabouts can be monitored in real-time to ensure their safety.",
    "Medicine Reminder: Patients receive timely reminders for their medication, promoting adherence to treatment plans.",
    // Add more features here
  ];

  return (
    <div className="content" style={{ backgroundImage: `url(${backgroundImage})`, animation: "floatAnimation 3s infinite alternate" }}>
      {/* Cards Section */}
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>DASHBOARD</h1>
      <Row>
        <Col md="4">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h5">Live Location Tracking</CardTitle>
            </CardHeader>
            <CardBody>
              <Pie data={liveLocationData} />
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h5">Medicine Reminder</CardTitle>
            </CardHeader>
            <CardBody>
              <Line data={medicineReminderData} />
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h5">Additional Features</CardTitle>
            </CardHeader>
            <CardBody>
              <ul>
                {additionalFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* Alzheimer's Card */}
      <Row>
        <Col md="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h2">About Alzheimer's Disease</CardTitle>
            </CardHeader>
            <CardBody>
              <img src={alzheimersImage} alt="Alzheimer's" style={{ width: '30%' }} />
              <img src={second} alt="second" className="second-image" style={{ width: '35%' }} />
              <img src={third} alt="Third Image" className="third-image" style={{ width: '35%' }} /> {/* Adjust the width */}
              
              <p>
                Of the about 55 million people worldwide with dementia, 60% to 70% are estimated to have Alzheimer's disease.
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* Bar Graph */}
      <Row>
        <Col md="12">
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h5">Bar Graph</CardTitle>
            </CardHeader>
            <CardBody>
              <Bar
                data={{
                  labels: ["A", "B", "C", "D", "E"],
                  datasets: [
                    {
                      label: "Sample Data",
                      backgroundColor: "#36A2EB",
                      borderColor: "#36A2EB",
                      borderWidth: 1,
                      hoverBackgroundColor: "#36A2EB",
                      hoverBorderColor: "#36A2EB",
                      data: [12, 19, 3, 5, 2],
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false, // Ensure the chart doesn't maintain aspect ratio
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true
                      }
                    }]
                  }
                }}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
