import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaSave } from 'react-icons/fa';
import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import DialpadIcon from '@mui/icons-material/Dialpad';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventIcon from '@mui/icons-material/Event';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';




function Edit(props) {
  const { id } = props;
  const [isEditDone, setIsEditDone] = useState(false);
    // SELECT * FROM `taxiofficeoption` WHERE 1 `optionID`, `taxiOfficeID`, `optionName`, `optionTime`, `optionSeats`, `optionPhoto`, `costKmUnit`, `costKmPrice`, `taxiRideId`

  useEffect(() => {
    axios.get(`http://localhost:8888/api/visit/read/${id}`)
      .then(res => {
        console.log(res);
        setValues({
          ...values,
          optionID: res.data[0].optionID,
          
          taxiOfficeID: res.data[0].taxiOfficeID,
          taxiRideId: res.data[0].taxiRideId,
          optionName: res.data[0].optionName,
          costKmPrice: res.data[0].costKmPrice
        });
      })
      .catch(err => console.log(err));
  }, [id]);

  const [values, setValues] = useState({
    optionID: '',
    
    taxiOfficeID: '',
    taxiRideId: '',
    optionName: '',
    costKmPrice: ''
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
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8888/api/visit/edit/${id}`, {
      optionID: values.optionID,
      taxiOfficeID: values.taxiOfficeID,
      taxiRideId: values.taxiRideId,
      optionName: values.optionName,
      costKmPrice: values.costKmPrice
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
              <label className="fildelable" htmlFor="">Option ID</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <DialpadIcon /></i>
                <input
                  type="text"
                  placeholder="Option ID"
                  value={values.optionID}
                  onChange={(e) =>
                    setValues({ ...values, optionID: e.target.value })
                  }
                />
              </div>
              {/* <label className="fildelable" htmlFor="">Name</label>
              <div className="input-field">
                <i className="fas fa-envelope"><CalendarMonthIcon /></i>
                <input
                  type="text"
                  placeholder="Name"
                  value={values.Name}
                  onChange={(e) =>
                    setValues({ ...values, Name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="filde">
              <label className="fildelable" htmlFor="">Num OF pepole</label>
              <div className="input-field">
                <i className="fas fa-user"><DateRangeIcon /></i>
                <input
                  type="text"
                  placeholder="Num OF pepole "
                  value={values.NumOFpepole}
                  onChange={(e) =>
                    setValues({ ...values, NumOFpepole: e.target.value })
                  }
                />
              </div> 
              optionID: values.optionID,
      taxiOfficeID: values.taxiOfficeID,
      taxiRideId: values.taxiRideId,
      optionName: values.optionName,
      costKmPrice: values.costKmPrice
              */}
              <label className="fildelable" htmlFor="">Taxi Office ID</label>
              <div className="input-field">
                <i className="fas fa-lock"><EventIcon /></i>
                <input
                  type="text"
                  placeholder="Taxi Office ID"
                  value={values.taxiOfficeID}
                  onChange={(e) =>
                    setValues({ ...values, taxiOfficeID: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="filde">
              <label className="fildelable" htmlFor="">Taxi Ride Id</label>
              <div className="input-field">
                <i className="fas fa-envelope"><ReduceCapacityIcon /></i>
                <input
                  type="text"
                  placeholder="Taxi Ride Id "
                  value={values.taxiRideId}
                  onChange={(e) =>
                    setValues({ ...values, taxiRideId: e.target.value })
                  }
                />
              </div>
              <label className="fildelable" htmlFor="">Option Name</label>
              <div className="input-field">
                <i className="fas fa-envelope"><CalendarViewWeekIcon /></i>
                <input
                  type="text"
                  placeholder="Option Name"
                  value={values.optionName}
                  onChange={(e) =>
                    setValues({ ...values, optionName: e.target.value })
                  }
                />
                </div>
              
            </div>
            <div className="filde">

            <label className="fildelable" htmlFor="">cost Km Price</label>
              <div className="input-field">
                <i className="fas fa-lock"><EventIcon /></i>
                <input
                  type="text"
                  placeholder="cost Km Price "
                  value={values.costKmPrice}
                  onChange={(e) =>
                    setValues({ ...values, costKmPrice: e.target.value })
                  }
                />
              </div>
              </div>

            {isEditDone && <p >Edit is done!</p>}

            <button className="btn solid">
              <FaSave /> save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Edit;
