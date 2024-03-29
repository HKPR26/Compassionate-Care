import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { BiLogOut } from "react-icons/bi";
import "./geolocate.css";
import axios from "axios";

mapboxgl.accessToken = process.env.REACT_APP_TOKEN;

const Geolocate = () => {
  const mapContainer = useRef(null);
  const circleRef = useRef(null);
  const [alertTriggered, setAlertTriggered] = useState(false); // Flag to track if alert has been triggered
  const [latitude, setLatitude] = useState(null); // State to store latitude
  const [longitude, setLongitude] = useState(null); // State to store longitude

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-24, 42],
      zoom: 1,
    });

    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });

    map.addControl(geolocateControl);

    // Add circle layer
    map.on("load", () => {
      map.addLayer({
        id: "boundary-circle",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [0, 0], // Initial coordinates (will be updated dynamically)
            },
          },
        },
        paint: {
          "circle-radius": {
            stops: [[0, 0], [20, 1000]], // Radius of the circle (in meters)
            base: 2,
          },
          "circle-color": "rgba(255, 0, 0, 0.5)", // Color of the circle
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff",
        },
      });
    });

    // Listen for the geolocate event
    geolocateControl.on("geolocate", function (e) {
      const userCoordinates = [e.coords.longitude, e.coords.latitude];
      setLatitude(e.coords.latitude); // Set latitude
      setLongitude(e.coords.longitude); // Set longitude

      if (!circleRef.current) {
        // Create circle layer if not exists
        circleRef.current = new mapboxgl.Marker({
          color: "red",
          draggable: false
        })
          .setLngLat(userCoordinates)
          .addTo(map);
      } else {
        // Update existing circle layer
        circleRef.current.setLngLat(userCoordinates);
      }

      // Update circle coordinates
      if (map.getSource("boundary-circle")) {
        map.getSource("boundary-circle").setData({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: userCoordinates,
          },
        });
      }

      // Define your area limit coordinates here
      const areaLimitCoordinates = [[-25, 41], [-23, 43]]; // Example area limit coordinates

      // Check if user has crossed the area limit and alert is not already triggered
      if (!alertTriggered && !isInsideArea(userCoordinates, areaLimitCoordinates)) {
        // Play beep sound after 5 seconds
        setTimeout(() => {
          const beep = new Audio('/beep.mp3');
          beep.play();
        }, 8000);
      
        // Show alert after 7 seconds
        setTimeout(() => {
          setAlertTriggered(true); // Set flag to true to prevent subsequent alerts
          const [longitude, latitude] = userCoordinates;
          // Show alert
          alert(`You have crossed the area limit!\nLatitude: ${latitude}, Longitude: ${longitude}\nMap Link: https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}`);
        }, 10000);
      }
      
      
      
    });

    // Helper function to check if a point is inside a polygon
    function isInsideArea(point, polygon) {
      // Implementation of point-in-polygon algorithm
      // You can use a library like Turf.js for more robust implementation
      const x = point[0], y = point[1];
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i][0], yi = polygon[i][1];
        const xj = polygon[j][0], yj = polygon[j][1];
        const intersect = ((yi > y) !== (yj > y)) && (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    }

    return () => map.remove();
  }, []);

  return (
    <React.Fragment>
      <h1> Welcome to the Live Location tracker Web App </h1>
      <h3>Click on the top-right corner icon to get your live location.</h3>
      {alertTriggered && latitude && longitude && (
       <div style={{ textAlign: 'center' }}>
       <p>
         <a
           href={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}`}
           target="_blank"
           rel="noopener noreferrer"
           style={{
             display: 'inline-block',
             padding: '8px 16px',
             backgroundColor: '#dc3545',
             color: 'white',
             textDecoration: 'none',
             borderRadius: '4px',
             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
             transition: 'background-color 0.3s',
           }}
         >
           Click Here to Track!
         </a>
       </p>
     </div>
     
      )}
      <a className="icon" href="/admin/dashboard/liveLocationFeature/login">
        <BiLogOut size={30} />
      </a>
      <div ref={mapContainer} style={{ height: "100vh" }}></div>
    </React.Fragment>
  );
};

export default Geolocate;
