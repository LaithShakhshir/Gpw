

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
          id: prisonerData.id,
          from: prisonerData.from,
          to: prisonerData.to,
          price: prisonerData.price,
          date: prisonerData.date,
         
        });
      })
      .catch(err => console.log(err));
  }, [id]);
  

  const [values, setValues] = useState({
    id: '',
    from: '',
    to: '',
    price: '',
    date: '',
   
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
  
    if (values.from.trim() === '') {
      console.log("from cannot be empty");
      return;
    }
  
    axios.put(`http://localhost:8888/api/prisoners/edit/${id}`, {
      id: values.id,
      from: values.from,
      to: values.to,
      price: values.price,
      date: values.date
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
                  placeholder="ID"
                  value={values.id}
                  onChange={(e) =>
                    setValues({ ...values, id: e.target.value })
                  }
                />
              </div>
              <label className="fildelable" htmlFor="">From</label>
              <div className="input-field">
                <i className="fas fa-envelope"><FaUserAlt /></i>
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
              <label className="fildelable" htmlFor="">To</label>
              <div className="input-field">
                <i className="fas fa-user"><FaMapMarkerAlt /></i>
                <input
                  type="text"
                  placeholder="To"
                  value={values.to}
                  onChange={(e) =>
                    setValues({ ...values, to: e.target.value })
                  }
                />
              </div>
              <label className="fildelable" htmlFor="">Price </label>
              <div className="input-field">
                <i className="fas fa-lock"><EventIcon /></i>
                <input
                  type="text"
                  placeholder="Price "
                  value={values.price}
                  onChange={(e) =>
                    setValues({ ...values, price: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="filde">
              <label className="fildelable" htmlFor="">Date</label>
              <div className="input-field">
                <i className="fas fa-envelope"><DateRangeIcon /></i>
                <input
                  type="text"
                  placeholder=" Date"
                  value={values.date}
                  onChange={(e) =>
                    setValues({ ...values, date: e.target.value })
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
