
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaSave } from 'react-icons/fa';
import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import { FaLock, FaMapMarkerAlt, FaUserAlt, FaCommentAlt } from "react-icons/fa";
import DialpadIcon from '@mui/icons-material/Dialpad';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import TableChartIcon from '@mui/icons-material/TableChart';

import './edit.css';

function Edit(props) {
  const { id } = props;

  // startPosition,p.endPosition , vis.optionName, p.rideCost,p.rideDate,p.rideTime
  const [visitorData, setVisitorData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    money: '',
    startPosition: '',
    endPosition: '',
    rideCost: ''
  });

  const [isEditDone, setIsEditDone] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8888/api/visiter/read/${id}`)
      .then(res => {
        const fetchedData = res.data[0];
        console.log(fetchedData)
        setVisitorData({
          id: fetchedData.id || '',
          name: fetchedData.name || '',
          email: fetchedData.email || '',
          password: fetchedData.password || '',
          money: fetchedData.money || '',
          startPosition: fetchedData.startPosition || '',
          endPosition: fetchedData.endPosition || '',
          rideCost: fetchedData.rideCost || ''
        });
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();

    // Check if any required field is empty
    if (!visitorData.name || !visitorData.email || !visitorData.password || !visitorData.money) {
      console.log("Please fill in all required fields.");
      return;
    }

    // Create a new object with non-null values
    const updatedVisitorData = {
      id: visitorData.id,
      name: visitorData.name || '',
      email: visitorData.email || '',
      password: visitorData.password || '',
      money: visitorData.money || '',
      startPosition: visitorData.startPosition || '',
      endPosition: visitorData.endPosition || '',
      rideCost: visitorData.rideCost || '',
    };

    // Send the data to the API
    axios
      .put(`http://localhost:8888/api/visiter/edit/${id}`, {
        id: visitorData.id,
        name: updatedVisitorData.name,
        email: updatedVisitorData.email,
        password: updatedVisitorData.password,
        money: updatedVisitorData.money,
        startPosition: updatedVisitorData.startPosition,
        endPosition: updatedVisitorData.endPosition,
        rideCost: updatedVisitorData.rideCost,
      })
      .then((res) => {
        console.log("Update response:", res.data);
        setIsEditDone(true); // Set the flag to indicate edit is done
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
    marginTop: '5px'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitorData((prevData) => ({ ...prevData, [name]: value }));
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
              <label className="fildelable" htmlFor="id">ID</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <DialpadIcon /></i>
                <input
                  type="text"
                  id="id"
                  placeholder="ID"
                  name="userID"
                  value={visitorData.id}
                  onChange={handleChange}
                />
              </div>
              <label className="fildelable" htmlFor="name">Name</label>
              <div className="input-field">
                <i className="fas fa-envelope"><FaUserAlt /></i>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  name="name"
                  value={visitorData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="filde">
              <label className="fildelable" htmlFor="email">Email</label>
              <div className="input-field">
                <i className="fas fa-user"><FaCommentAlt/></i>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={visitorData.email}
                  onChange={handleChange}
                />
              </div>
              <label className="fildelable" htmlFor="password">Password</label>
              <div className="input-field">
                <i className="fas fa-lock"><FaLock/></i>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={visitorData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="filde">
              <label className="fildelable" htmlFor="money">Money</label>
              <div className="input-field">
                <i className="fas fa-envelope"><FaMapMarkerAlt/></i>
                <input
                  type="text"
                  id="money"
                  placeholder="Money"
                  name="money"
                  value={visitorData.money}
                  onChange={handleChange}
                />
              </div>
              <label className="fildelable" htmlFor="photo">start Position</label>
              <div className="input-field">
                <i className="fas fa-envelope"><AddPhotoAlternateIcon/></i> 
                <input
                  type="text"
                  id="startPosition"
                  placeholder="start Position"
                  name="startPosition"
                  value={visitorData.startPosition}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="filde">
              <label className="fildelable" htmlFor="id_Prisoner">End Position</label>
              <div className="input-field">
                <i className="fas fa-envelope"><FolderSharedIcon/></i>
                <input
                  type="text"
                  id="endPosition"
                  placeholder=" end Position"
                  name="endPosition"
                  value={visitorData.endPosition}
                  onChange={handleChange}
                />
              </div>
              <label className="fildelable" htmlFor="id_Visite">Ride Cost</label>
              <div className="input-field">
                <i className="fas fa-envelope"><TableChartIcon/></i>
                <input
                  type="text"
                  id="rideCost"
                  placeholder="Ride Cost"
                  name="rideCost"
                  value={visitorData.rideCost}
                  onChange={handleChange}
                />
              </div>
            </div>          
            {isEditDone && <p >Edit is done!</p>}

            <button className="btn solid">
              <FaSave /> Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Edit;
