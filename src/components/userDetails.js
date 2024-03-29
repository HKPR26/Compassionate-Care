import React, { Component } from "react";

export default class userDetails extends Component {
  componentDidMount() { 
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
      });
    }
    render() {
      return(
        <div>
          Name<h1> HK </h1>
          Email<h1>Hari@123</h1>
        </div>
      );
    }
  }