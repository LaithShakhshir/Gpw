

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaSave } from 'react-icons/fa';
import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import { FaMapMarkerAlt, FaUserAlt } from "react-icons/fa";
import DialpadIcon from '@mui/icons-material/Dialpad';
import EventIcon from '@mui/icons-material/Event';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';

function Edit(props) {
  const { id } = props;
  const [isEditDone, setIsEditDone] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8888/api/prisoners/read/${id}`)
      .then(res => {
        console.log(res);
        const prisonerData = res.data[0];
        setValues({
          ...values,
          taxiRideId: prisonerData.taxiRideId,
          startPosition: prisonerData.startPosition,
          endPosition: prisonerData.endPosition,
          rideCost: prisonerData.rideCost,
          rideDate: prisonerData.rideDate,
         
        });
      })
      .catch(err => console.log(err));
  }, [id]);
  // startPosition, endPosition, rideCost, rideDate, taxiRideId]

  const [values, setValues] = useState({
    taxiRideId: '',
    startPosition: '',
    endPosition: '',
    rideCost: '',
    rideDate: '',
   
  });

  const styles = {
    borderRadius: "10px",
    padding: "20px",
    width: "100%",
    height: "600px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: '5px'
  }

  const handleUpdate = (event) => {
    event.preventDefault();
  
    if (values.startPosition.trim() === '') {
      console.log("start Position cannot be empty");
      return;
    }
  
    axios.put(`http://localhost:8888/api/prisoners/edit/${id}`, {
      taxiRideId: values.taxiRideId,
      startPosition: values.startPosition,
      endPosition: values.endPosition,
      rideCost: values.rideCost,
      rideDate: values.rideDate
    })
      .then(res => {
        console.log(res);
        setIsEditDone(true); // Set the flag to indicate edit is done

      })
      .catch(err => console.log(err));
  };
  

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />

        <div className="vcontainer">
          <form onSubmit={handleUpdate} style={styles}>
            <h2 style={{ marginBottom: '0px' }}>Edit Information</h2>
            <div className="filde" style={{ marginTop: '0px' }}>
              <label className="fildelable" htmlFor="">ID</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <DialpadIcon /></i>
                <input
                  type="text"
                  placeholder="taxi Ride Id"
                  value={values.taxiRideId}
                  onChange={(e) =>
                    setValues({ ...values, taxiRideId: e.target.value })
                  }
                />
              </div>
              <label className="fildelable" htmlFor="">Start Position</label>
              <div className="input-field">
                <i className="fas fa-envelope"><FaUserAlt /></i>
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
              <label className="fildelable" htmlFor="">End Position</label>
              <div className="input-field">
                <i className="fas fa-user"><FaMapMarkerAlt /></i>
                <input
                  type="text"
                  placeholder="End Position"
                  value={values.endPosition}
                  onChange={(e) =>
                    setValues({ ...values, endPosition: e.target.value })
                  }
                />
              </div>
              <label className="fildelable" htmlFor="">Ride Cost </label>
              <div className="input-field">
                <i className="fas fa-lock"><EventIcon /></i>
                <input
                  type="text"
                  placeholder="Ride Cost "
                  value={values.rideCost}
                  onChange={(e) =>
                    setValues({ ...values, rideCost: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="filde">
              <label className="fildelable" htmlFor="">Ride Date</label>
              <div className="input-field">
                <i className="fas fa-envelope"><DateRangeIcon /></i>
                <input
                  type="text"
                  placeholder=" Ride Date"
                  value={values.rideDate}
                  onChange={(e) =>
                    setValues({ ...values, rideDate: e.target.value })
                  }
                />
              </div>
              
            </div>
            {isEditDone && <p >Edit is done!</p>}

            <button className="btn solid" type="submit">
              <FaSave /> Save
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default Edit;
