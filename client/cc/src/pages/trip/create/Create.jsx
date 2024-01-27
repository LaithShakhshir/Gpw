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
    id: "",
    from: "",
    to: "",
    price: "",
    date: "",
   
  });

  const [success, setSuccess] = useState(false); // State variable for success status

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8888/api/prisoners/registertrip", values)
      .then((res) => {
        console.log(res);
        setSuccess(true); // Set success to true after successful submission
        resetForm(); // Reset the form fields
      })
      .catch((err) => console.log(err));
  };

  const resetForm = () => {
    setValues({
      id: "",
    from: "",
    to: "",
    price: "",
    date: "",
      
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
                  value={values.id}
                  onChange={(e) =>
                    setValues({ ...values, id: e.target.value })
                  }
                />
              </div>
              <label className="fildelable" htmlFor="">
                From
              </label>
              <div className="input-field">
                <i className="fas fa-envelope">
                  <FaUserAlt />
                </i>
                <input
                  type="text"
                  placeholder="From"
                  value={values.from}
                  onChange={(e) =>
                    setValues({ ...values, from: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="filde">
              <label className="fildelable" htmlFor="">
                To
              </label>
              <div className="input-field">
                <i className="fas fa-user">
                  <FaMapMarkerAlt />
                </i>

                <input
                  type="text"
                  placeholder="To"
                  value={values.to}
                  onChange={(e) =>
                    setValues({ ...values, to: e.target.value })
                  }
                />
              </div>
              <label className="fildelable" htmlFor="">
                Date
              </label>
              <div className="input-field">
                <i className="fas fa-lock">
                  <EventIcon />
                </i>

                <input
                  type="Date"
                  placeholder=" Date"
                  value={values.prisoneDate}
                  onChange={(e) =>
                    setValues({ ...values, date: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="filde">
              <label className="fildelable" htmlFor="">
                Price
              </label>
              <div className="input-field">
                <i className="fas fa-envelope">
                  <DateRangeIcon />
                </i>
                <input
                  type="text"
                  placeholder=" Price"
                  value={values.EndDate}
                  onChange={(e) =>
                    setValues({ ...values, price: e.target.value })
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
