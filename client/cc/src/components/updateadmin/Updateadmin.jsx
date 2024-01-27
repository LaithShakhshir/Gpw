

import React, { useState } from 'react';
import axios from 'axios';
import { FaFileImage } from 'react-icons/fa';
import { makeRequest } from "../../axios";
import './updateadmin.css';
import {  FaMapMarkerAlt, FaUserAlt } from "react-icons/fa";
import CloseIcon from '@mui/icons-material/Close';
import LockOpenIcon from '@mui/icons-material/LockOpen';
const Updateadmin = ({ setOpenUpdate, user }) => {
  const [name, setName] = useState(user.Name || '');
  const [password, setPassword] = useState(user.Password || '');
  const [photo, setPhoto] = useState(user.Photo || '');
  const [location, setLocation] = useState(user.Location || '');
  const [coverPage, setCoverPage] = useState(user.CoverPage || null);
  const [error, setError] = useState('');
  const [telephone, settelephone] = useState(user.telephone || '');

  const handleUpdate = async () => {
    setError('');
    

    // Check if Password is provided
    if (!password) {
      setError('Password is required');
      return;
    }

    try {
      let photoUrl = photo;
      if (photo instanceof File) {
        photoUrl = await upload(photo);
      }

      let coverPageUrl = coverPage;
      if (coverPage instanceof File) {
        coverPageUrl = await upload(coverPage);
      }

      // Prepare the data object to be sent in the request
      const data = {
        Name: name,
        Password: password,
        Photo: photoUrl,
        Location: location,
        CoverPage: coverPageUrl,
        telephone: telephone,
      };
      console.log(data)

      await axios.put(`http://localhost:8888/api/auth/${user.ID}`, data, {
        headers: { 'Content-Type': 'application/json' },
        
      });
      console.log(data)
      // Handle success
      setOpenUpdate(false); // Close the update form
    } catch (error) {
      // Handle error
      setError(error.response.data.error);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleCoverPageChange = (e) => {
    const file = e.target.files[0];
    setCoverPage(file);
  };

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await makeRequest.post('/upload', formData);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h2 style={{color:'white'}}>Update User</h2>
        <form>
        <div className="filde" >

        <h3 className="fildelable" htmlFor="">Name</h3>
              <div className="input-field">
                <i className="fas fa-envelope"><FaUserAlt /></i>
                <input
                  type="text"
                  placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div> 
          <h3 className="fildelable" htmlFor="">Picture</h3>

          <div className="input-field">
            <label htmlFor="photo" className="label-style">
              
              <input
                type="file"
                id="photo"
                name="Photo"
                onChange={handlePhotoChange}
              />
              <i className="fas fa-envelope"style={{marginLeft:'10px',marginRight:'10px'}}><FaFileImage className="icon" /></i> 
            </label>
            {photo && typeof photo === 'string' && <img src={photo} alt="User Photo" style={{marginTop:'15px'}} />}
            {photo && photo instanceof File && <span>uploaded</span>}
          </div>        

               </div>
          <div className="filde" style={{ marginTop: '0px' }}>
          <h3 className="fildelable" htmlFor="">Password</h3>
              <div className="input-field">
                <i className="fas fa-envelope"><LockOpenIcon /></i>
                <input
                  type="password"
                  placeholder="password"  value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>     
          
          <h3 className="fildelable" htmlFor="">Cover Page</h3>

          <div className="input-field">
            <label htmlFor="coverPage" className="label-style">
              
              <input
                type="file"
                id="coverPage"
                name="CoverPage"
                accept="image/*"
                onChange={handleCoverPageChange}
              />
              <i className="fas fa-envelope"style={{marginLeft:'10px',marginRight:'10px'}}><FaFileImage className="icon" /></i> 
            </label>
            {coverPage && typeof coverPage === 'string' && <img src={coverPage} alt="Cover Page" style={{marginTop:'15px'}}/>}
            {coverPage && coverPage instanceof File && <span>uploaded</span>}
          </div></div>
          <div className="filde" style={{ marginTop: '0px' }}>

        <h3 className="fildelable" htmlFor="">Location</h3>
              <div className="input-field">
                <i className="fas fa-envelope"><FaUserAlt /></i>
                <input
                  type="text"
          value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <h3 className="fildelable" htmlFor="">TelePhone</h3>
              <div className="input-field">
                <i className="fas fa-envelope"><FaUserAlt /></i>
                <input
                  type="text"
          value={telephone} onChange={(e) => settelephone(e.target.value)} />
          </div>
          </div>{error && <p>{error}</p>}
          <button type="button" onClick={handleUpdate} className='shareButton'style={{width:'400px'}}>
            Update
          </button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          <CloseIcon style={{width:'10px' ,height:'10px'}}/>
        </button>
      </div>
    </div>
  );
};

export default Updateadmin;


