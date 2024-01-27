import React, { useState } from "react";
import "./create.css";
import axios from "axios";
import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import { FaMapMarkerAlt, FaUserAlt } from "react-icons/fa";
import DialpadIcon from "@mui/icons-material/Dialpad";
import EventIcon from "@mui/icons-material/Event";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import { FaSave } from "react-icons/fa";

export default function Create() {
  const [values, setValues] = useState({
    taxiRideId: "",
    startPosition: "",
    endPosition: "",
    rideCost: "",
    rideDate: "",
   
  });
    // startPosition, endPosition, rideCost, rideDate, taxiRideId]


  const [success, setSuccess] = useState(false); // State variable for success status

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8888/api/prisoners/register", values)
      .then((res) => {
        console.log(res);
        setSuccess(true); // Set success to true after successful submission
        resetForm(); // Reset the form fields
      })
      .catch((err) => console.log(err));
  };

  const resetForm = () => {
    setValues({
      taxiRideId: "",
      startPosition: "",
      endPosition: "",
      rideCost: "",
      rideDate: "",
      
    });
  };

  const styles = {
    borderRadius: "10px",
    padding: "20px",
    width: "100%",
    height: "600px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: "5px",
  };

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <div className="vcontainer">
          <form onSubmit={handleSubmit} style={styles}>
            <h2 style={{ marginBottom: "0px" }}>Add Trip</h2>
            <div className="filde" style={{ marginTop: "0px" }}>
              <label className="fildelable" htmlFor="">
                ID
              </label>
              <div className="input-field">
                <i className="fas fa-envelope">
                  {" "}
                  <DialpadIcon />
                </i>
                <input
                  type="text"
                  placeholder="ID"
                  value={values.taxiRideId}
                  onChange={(e) =>
                    setValues({ ...values, taxiRideId: e.target.value })
                  }
                />
              </div>
              <label className="fildelable" htmlFor="">
              Start Position
              </label>
              <div className="input-field">
                <i className="fas fa-envelope">
                  <FaUserAlt />
                </i>
                <input
                  type="text"
                  placeholder="Start Position"
                  value={values.startPosition}
                  onChange={(e) =>
                    setValues({ ...values, startPosition: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="filde">
              <label className="fildelable" htmlFor="">
              End Position
              </label>
              <div className="input-field">
                <i className="fas fa-user">
                  <FaMapMarkerAlt />
                </i>

                <input
                  type="text"
                  placeholder="End Position"
                  value={values.endPosition}
                  onChange={(e) =>
                    setValues({ ...values, endPosition: e.target.value })
                  }
                />
              </div>
              <label className="fildelable" htmlFor="">
              Ride Date
              </label>
              <div className="input-field">
                <i className="fas fa-lock">
                  <EventIcon />
                </i>

                <input
                  type="Date"
                  placeholder=" Ride Date"
                  value={values.rideDate}
                  onChange={(e) =>
                    setValues({ ...values, rideDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="filde">
              <label className="fildelable" htmlFor="">
              Ride Cost
              </label>
              <div className="input-field">
                <i className="fas fa-envelope">
                  <DateRangeIcon />
                </i>
                <input
                  type="text"
                  placeholder=" Ride Cost"
                  value={values.rideCost}
                  onChange={(e) =>
                    setValues({ ...values, rideCost: e.target.value })
                  }
                />
              </div>
</div>
              
            <button className="btn solid">
              <FaSave /> save
            </button>
            {success && <p>Add Trip Done </p>}

          </form>
        </div>
      </div>
    </>
  );
}
