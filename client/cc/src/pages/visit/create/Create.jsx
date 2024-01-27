
import React, { useState } from "react";
import "./create.css";
import axios from "axios";
import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import DialpadIcon from "@mui/icons-material/Dialpad";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventIcon from "@mui/icons-material/Event";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";
import { FaSave } from "react-icons/fa";

// id.toString().includes(searchTermLower) ||
//         Name.toLowerCase().includes(searchTermLower) ||
//         NumOFpepole.toLowerCase().includes(searchTermLower) ||
//         officeID.toLowerCase().includes(searchTermLower) ||
//         idVisitLocation.toLowerCase().includes(searchTermLower) ||
//         type.toLowerCase().includes(searchTermLower)



export default function Create() {
  const [values, setValues] = useState({
    optionID: "",
   
    taxiOfficeID: "",
    taxiRideId: "",
    optionName: "",
    costKmPrice: ""
  });

    // SELECT * FROM `taxiofficeoption` WHERE 1 `optionID`, `taxiOfficeID`, `optionName`, `optionTime`, `optionSeats`, `optionPhoto`, `costKmUnit`, `costKmPrice`, `taxiRideId`

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8888/api/visit/register", values)
      .then((res) => {
        if (res.data.error) {
          setErrorMessage(res.data.error);
          setSuccessMessage("");
        } else {
          setSuccessMessage("Registration success");
          setErrorMessage("");
        }
      })
      .catch((err) => console.log(err));
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
            <h2 style={{ marginBottom: "0px" }}>Add services </h2>
          
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
                  placeholder="option ID"
                  onChange={(e) =>
                    setValues({ ...values, optionID: e.target.value })
                  }
                />
              </div>
              {/* <label className="fildelable" htmlFor="">
                Name
              </label>
              <div className="input-field">
                <i className="fas fa-envelope">
                  <CalendarMonthIcon />
                </i>
                <input
                  type="text"
                  placeholder="Name "
                  onChange={(e) =>
                    setValues({ ...values, Name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="filde">
              <label className="fildelable" htmlFor="">
              Num OF pepole
              </label>
              <div className="input-field">
                <i className="fas fa-user">
                  <DateRangeIcon />
                </i>

                <input
                  type="text"
                  className="custom-date-input"
                  placeholder="Num OF pepole"
                  onChange={(e) =>
                    setValues({ ...values, NumOFpepole: e.target.value })
                  }
                />
              </div> 
              
              taxiRideId: "",
    optionName: "",
    costKmPrice:
    */}
              <label className="fildelable" htmlFor="">
                Office ID
              </label>
              <div className="input-field">
                <i className="fas fa-lock">
                  <EventIcon />
                </i>

                <input
                  type="text"
                  placeholder="taxi Office ID"
                  onChange={(e) => setValues({ ...values, taxiOfficeID: e.target.value })}
                />
              </div>
            </div>
            <div className="filde">
              <label className="fildelable" htmlFor="">
              taxi Ride Id 
              </label>
              <div className="input-field">
                <i className="fas fa-envelope">
                  <ReduceCapacityIcon />
                </i>
                <input
                  type="text"
                  placeholder="Trip ID"
                  onChange={(e) =>
                    setValues({ ...values, taxiRideId: e.target.value })
                  }
                />
              </div>
              <label className="fildelable" htmlFor="">
              Option Name
              </label>
              <div className="input-field">
                <i className="fas fa-envelope">
                  <CalendarViewWeekIcon />
                </i>
                <input
                  type="text"
                  placeholder="Option Name"
                  onChange={(e) =>
                    setValues({ ...values, optionName: e.target.value })
                  }
                />
              </div>
              </div>
              <div className="filde">

              <label className="fildelable" htmlFor="">
              Cost Km Price
              </label>
              <div className="input-field">
                <i className="fas fa-envelope">
                  <CalendarViewWeekIcon />
                </i>
                <input
                  type="text"
                  placeholder="Cost Km Price"
                  onChange={(e) =>
                    setValues({ ...values, costKmPrice: e.target.value })
                  }
                />
                </div>
                </div>
            <button className="btn solid">
              <FaSave /> save
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
