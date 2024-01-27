


import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Person, Chat, Notifications } from '@mui/icons-material';
import './Topbar.css';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Taxii from '../.././Taxii.png';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';

const Topbar = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const [visitorCount, setVisitorCount] = useState(0);
  const [visitors, setVisitors] = useState([]);
  const [unseenMessageCount, setUnseenMessageCount] = useState(0); // State for the number of unseen messages

  useEffect(() => {
    fetchVisitors();
    fetchUnseenMessages(); 
  }, []);

  const fetchVisitors = async () => {
    try {
      const response = await axios.get('http://localhost:8888/api/visiter/addvisiter');
      const data = response.data;
      setVisitorCount(data.length);
      setVisitors(data);
    } catch (error) {
      console.error('Error fetching visitors:', error);
    }
  };

  const fetchUnseenMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8888/api/emergency/seen');
      const data = response.data;
      setUnseenMessageCount(data.count);
      console.log(data.count);
    } catch (error) {
      console.error('Error fetching unseen messages:', error);
    }
  };
  

  const acceptVisitor = async (id) => {
    try {
      await axios.put(`http://localhost:8888/api/visiter/edit/${id}`, { added: 1 });
      fetchVisitors();
    } catch (error) {
      console.error('Error accepting visitor:', error);
    }
  };

  const deleteVisitor = async (id) => {
    try {
      await axios.delete(`http://localhost:8888/api/visiter/delete/${id}`);
      fetchVisitors();
    } catch (error) {
      console.error('Error deleting visitor:', error);
    }
  };

  const handleClickChatIcon = async () => {
    try {
      await axios.post('http://localhost:8888/api/emergency/seendone');
      history.push('/emergency');
    } catch (error) {
      console.error('Error updating chat seen status:', error);
    }
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: 'none', marginLeft: '30px' }}>
          <img src={Taxii} alt="" className="topbarlogoTaxi" />
        </Link>
        <Link to="/" style={{ textDecoration: 'none'}}>
          <span className="logo" style={{ marginBottom: '40px' }}>
            Wenak - وينك
          </span>
        </Link>
      </div>
      <div className="topbarCenter">{/* Rest of the code */}</div>
      <div className="topbarRight">
        <div className="topbarIcons" style={{ marginTop: '15px' }}>
        <Link to="/Addvisiter" style={{ textDecoration: 'none', marginBottom: '10px', color: '#fff' }}>
          <div className="topbarIconItem">
            <Person />
            {visitorCount > 0 && <span className="topbarIconBadge">{visitorCount}</span>}
          </div>
          </Link>

          <Link to="/emergency" style={{ textDecoration: 'none', marginBottom: '10px', color: '#fff' }}>
            <div className="topbarIconItem" onClick={handleClickChatIcon}>
              <Chat />
              {unseenMessageCount > 0 && <span className="topbarIconBadge">{unseenMessageCount}</span>}
            </div>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none', marginBottom: '10px', color: '#fff' }}>
            <div className="topbarIconItem" onClick={() => history.push('/login')}>
              <LogoutIcon />
            </div>
          </Link>
        </div>
        <div style={{ display: 'flex' }}>
          <span style={{ marginTop: '8px', marginRight: '20px' }}>{currentUser.Name}</span>
          <img src={'/upload/' + currentUser.Photo} alt="" className="topbarImg" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
