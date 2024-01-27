
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import TitleIcon from '@mui/icons-material/Title';
import DialpadIcon from '@mui/icons-material/Dialpad';
import './emergency.css';
import EmailIcon from '@mui/icons-material/Email';
import Conversations from '../../components/conversations/Conversations';

const Emergency = () => {
  const [subject, setSubject] = useState('');
  const [visitId, setVisitId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8888/api/emergency', {
        visitId,
        title: subject,
        content: message,
      });
      console.log('Emergency message sent successfully.');
      // Reset form fields
      setSubject('');
      setVisitId('');
      setMessage('');
    } catch (error) {
      console.error('Error sending emergency message:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8888/api/emergency');
      const reversedMessages = response.data.reverse(); // Reverse the order of messages
      setMessages(reversedMessages);

      // Count the number of new messages
      const newMessages = reversedMessages.filter((message) => !message.seen);
    } catch (error) {
      console.error('Error retrieving messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const styles = {
    borderRadius: '10px',
    padding: '20px',
    width: '100%',
    height: '700px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: '5px',
  };

  return (
    <>
      <Topbar  />

      <div className="chat" style={{ display: 'flex' }}>
        <Sidebar  />
        <div className="proofpapers"style={{ flex: '9.2' }}>
          <div className="messenger" >
            <form onSubmit={handleSubmit} style={styles}>
              <h2 style={{ marginBottom: '0px' }}>Send message to user</h2>
              <div className="messenger" style={{ display: 'flex', marginTop: '30px' }}>
                <div className="vontainer" style={{padding:'20px',width:'900px'}}>
                  <h3 style={{ marginTop: '20px', marginLeft: '250px', marginBottom: '30px' }}>Talk to user</h3>
                  <div className="filde" style={{ marginTop: '0px' }}>
                    <label className="fildelable" htmlFor="">
                      Subject
                    </label>
                    <div className="input-field" >
                      <i className="fas fa-envelope">
                        {' '}
                        <TitleIcon />
                      </i>
                      <input
                        type="text"
                        name="to_name"
                        required="required"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="filde" style={{ marginTop: '0px' }}>
                    <label className="fildelable" htmlFor="">
                      User ID
                    </label>
                    <div className="input-field">
                      <i className="fas fa-envelope">
                        {' '}
                        <DialpadIcon />
                      </i>
                      <input
                        type="text"
                        placeholder="ID"
                        value={visitId}
                        onChange={(e) => setVisitId(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="filde" style={{ marginTop: '0px' }}>
                    <label className="fildelable" htmlFor="">
                      Message
                    </label>
                    <div className="input-fields">
                      <i className="fas fa-envelope">
                        {' '}
                        <EmailIcon />
                      </i>
                      <textarea
                        name="message"
                        required="required"
                        placeholder="Your Message!..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="inputBox">
                    <button type="submit" className="btn" style={{ marginTop: '20px', marginLeft: '250px' }}>
                      Send
                    </button>
                  </div>
                </div>
                <div className="chatOnline" style={{ marginTop: '30px' }}>
                  <div className="chatMenu">
                    <h3>Messages</h3>
                    <div className="chatMenuWrapper" style={{ overflowY: 'auto', maxHeight: '550px' }}>
                      {messages.map((message, index) => (
                        <Conversations key={index} message={message} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Emergency;

