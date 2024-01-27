import React, { useState } from "react";
import './create.css';
import axios from 'axios';
import { FaSave } from 'react-icons/fa';

import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import { FaLock, FaMapMarkerAlt, FaUserAlt, FaCommentAlt } from "react-icons/fa";
import DialpadIcon from '@mui/icons-material/Dialpad';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import TableChartIcon from '@mui/icons-material/TableChart';

export default function Create() {
  const [values, setValues] = useState({
    id: '',
    name: '',
    photo: '',
    email: '',
    password: '',
    money: '',
    
  });

  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8888/api/visiter/register', values)
      .then(res => {
        console.log(values)
        console.log(res.data.message);
        if (res.data.message === "User ID not found") {
          setMessage('User ID not found.');
        } else if (res.data.message === "User registered successfully") {
          setMessage('User registered successfully.');
          resetForm(); // Reset the form fields after successful submission
        } else {
          setMessage('User registered successfully');
        }
      })
      .catch(err => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage('Registration failed. Please try again.');
        }
      });
  };

  const resetForm = () => {
    setValues({
      id: '',
      name: '',
      photo: '',
      email: '',
      password: '',
      money: '',
      
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
    marginTop: '5px'
  };

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <div className="vcontainer">
          <div>
            <form onSubmit={handleSubmit} style={styles}>
              <h2 style={{ marginBottom: '0px' }}>Add user</h2>
              <div className="filde" style={{ marginTop: '0px' }}>
                <label className="fildelable" htmlFor="">User ID</label>
                <div className="input-field">
                  <i className="fas fa-envelope"> <DialpadIcon /></i>
                  <input type="text" placeholder="ID" value={values.id} onChange={e => setValues({ ...values, id: e.target.value })} />
                </div>
                <label className="fildelable" htmlFor="">Name</label>
                <div className="input-field">
                  <i className="fas fa-envelope"><FaUserAlt /></i>
                  <input type="text" placeholder="Name" value={values.name} onChange={e => setValues({ ...values, name: e.target.value })} />
                </div>
              </div>
              <div className="filde">
                <label className="fildelable" htmlFor="">Email</label>
                <div className="input-field">
                  <i className="fas fa-user"><FaCommentAlt /></i>
                  <input type="email" placeholder="Email" value={values.email} onChange={e => setValues({ ...values, email: e.target.value })} />
                </div>

                <label className="fildelable" htmlFor="">Password</label>
                <div className="input-field">
                  <i className="fas fa-lock"><FaLock /></i>
                  <input type="password" placeholder="Password" value={values.password} onChange={e => setValues({ ...values, password: e.target.value })} />
                </div>
              </div>
              <div className="filde">
                <label className="fildelable" htmlFor="">Money</label>
                <div className="input-field">
                  {/* //<i className="fas fa-lock"><FaMapMarkerAlt /></i> */}
                  <input type="text" placeholder="$$$" value={values.money} onChange={e => setValues({ ...values, money: e.target.value })} />
                </div>

                <label className="fildelable" htmlFor="">photo</label>
                <div className="input-field">
                  <i className="fas fa-lock"><AddPhotoAlternateIcon /></i>
                  <input type="text" placeholder="Add Photo" value={values.photo} onChange={e => setValues({ ...values, photo: e.target.value })} />
                </div>
              </div>
              
              
           
              <button type="submit" className="btn solid"><FaSave /> save</button>


              {message && <div className="message">{message}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
