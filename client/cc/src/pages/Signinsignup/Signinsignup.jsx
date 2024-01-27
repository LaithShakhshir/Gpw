



import React, { useCallback, useContext, useState } from 'react';
import './Signinsignup.css';
import { FaLock, FaFileImage, FaMapMarkerAlt, FaUserAlt, FaCommentAlt } from 'react-icons/fa';
import logo from './wenak.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../components/context/authContext';
import { makeRequest } from '../../axios';

function Signinsignup() {
  const [file, setFile] = useState(null);
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Location, setLocation] = useState('');
  const [errlogin, setErrlogin] = useState(null);
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
      window.history.pushState(null, null, '/');
      window.location.reload();
    } catch (errlogin) {
      setErrlogin(errlogin.response.data);
    }
  };

  const [inputs, setInput] = useState({
    Name: '',
    Email: '',
    Password: '',
    Location: '',
    Photo: '',
  });

  const [err, setErr] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Define setSuccessMessage

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await makeRequest.post('/upload', formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = '';
    if (file) imgUrl = await upload();

    try {
      await axios.post('http://localhost:8888/api/auth/register', {
        Name: Name,
        Email: Email,
        Password: Password,
        Photo: imgUrl,
        Location: Location,
      });
      setSuccessMessage('Registration successful!'); // Set the success message
      setInput({
        Name: '',
        Email: '',
        Password: '',
        Location: '',
        Photo: '',
      }); // Reset the form fields
      setFile(null);
      setErrorMessage(''); // Clear any previous error message
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message); // Extract the error message from the response object
      } else {
        setErrorMessage('An error occurred during registration.'); // Set a generic error message
      }
      setFile(null);
    }
  };

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    const { name, value } = e.target;
    if (name === 'Name') setName(value);
    else if (name === 'Email') setEmail(value);
    else if (name === 'Password') setPassword(value);
    else if (name === 'Location') setLocation(value);
  };

  const viewsignp = () => {
    const container = document.querySelector('.container');
    container.classList.add('sign-up-mode');
  };

  const viewsigin = () => {
    const container = document.querySelector('.container');
    container.classList.remove('sign-up-mode');
  };

  return (
    <>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form action="/login" className="sign-in-form">
              <h2 className="title">Sign In</h2>
              <div className="input-field">
                <i className="fas fa-user">
                  <FaUserAlt />
                </i>
                <input type="text" placeholder="Office Email" name="Email" onChange={handleChange} />
              </div>
              <div className="input-field">
                <i className="fas fa-lock">
                  <FaLock />
                </i>
                <input type="password" placeholder="Password" name="Password" onChange={handleChange} />
              </div>
              {/* <Link to="/password">Forgot your password ?</Link> */}
              {errlogin && errlogin}
              <input type="submit" value="Login" className="btn solid" onClick={handleLogin} />
            </form>
            <form action="/register" className="sign-up-form">
              <h2 className="title">Sign Up</h2>
              <div className="input-field">
                <i className="fas fa-envelope">
                  <FaUserAlt />
                </i>
                <input
                  type="text"
                  placeholder="Office Name"
                  name="Name"
                  value={Name}
                  onChange={handleChange}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope">
                  <FaMapMarkerAlt />
                </i>
                <input
                  type="text"
                  placeholder="Location"
                  name="Location"
                  onChange={(e) => setLocation(e.target.value)}
                  value={Location}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope">
                  <FaFileImage />
                </i>
                <input
                  type="file"
                  style={{ marginTop: '15px', display: 'none' }}
                  id="file"
                  placeholder="Picture"
                  name="Photo"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label htmlFor="file" style={{ color: '#aaa', fontWeight: '500', marginTop: '18px' }}>
                  Picture
                </label>
              </div>
              <div className="input-field">
                <i className="fas fa-user">
                  <FaCommentAlt />
                </i>
                <input
                  type="email"
                  placeholder="Office Email"
                  name="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={Email}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock">
                  <FaLock />
                </i>
                <input
                  type="password"
                  placeholder="Password"
                  name="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={Password}
                />
              </div>
              {err && err}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>} {/* Add the success message */}
              <input onClick={handleClick} type="submit" className="btnup" value="Sign up" />
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Not a User ?</h3>
              <p>If you have not yet registered, please register first</p>
              <Link to="/register">
                <button className="btn transparent" id="sign-up-btn" action="/register" onClick={viewsignp}>
                  Sign up
                </button>
              </Link>
            </div>
            <img src={logo} className="image" alt="Logo" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Already a User ?</h3>
              <p>Welcome to our community</p>
              <Link to="/login">
                {' '}
                <button className="btn transparent" id="sign-in-btn" action="/login" onClick={viewsigin}>
                  Login
                </button>
              </Link>
            </div>
            <img src={logo} className="image" alt="Logo" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Signinsignup;

