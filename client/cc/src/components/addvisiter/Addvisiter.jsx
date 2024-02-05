






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './addvisiter.css';
import Sidebar from "./../sidebar/Sidebar";
import Topbar from "./../topbar/Topbar";

const Addvisiter = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const response = await axios.get('http://localhost:8888/api/visiter/addvisiter');
      const data = response.data;
      setVisitors(data);
    } catch (error) {
      console.error('Error fetching visitors:', error);
    }
  };

  const acceptVisitor = async (id, email) => {
    console.log(id);
    try {
      await axios.put(`http://localhost:8888/api/visiter/addvisitertosystem/${id}`);
      //sendEmailToVisitor(email);
      fetchVisitors();
    } catch (error) {
      console.error('Error accepting visitor:', error);
    }
  };

  const sendEmailToVisitor = (email) => {
    const subject = 'Your Trip has been accepted';
    const body = 'Dear Visitor,\n\nYour request to register in the application has been accepted in Wink enjoy your trip.\n\nBest regards,\nThe Management';
    const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(composeUrl);
  };

  const deleteVisitor = async (id) => {
    console.log(id);

    try {
      await axios.delete(`http://localhost:8888/api/visiter/dele/${id}`);
      fetchVisitors();
    } catch (error) {
      console.error('Error deleting visitor:', error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <div className="visetor-table-container" style={{ marginTop: "15px", flex: "9" }}>
          <div className="visetor-table-header">
            <h2 className="titel" style={{ marginBottom: '20px' }}>Accept the trip</h2>
            <div className="table">
              <table id="my-table" className="visetor-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Money</th>
                    <th>Email</th>
{/*                     <th>Start</th>
                    <th>End</th>
                    <th>Cost</th>
                    <th>Date</th> */}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map(visitor => (
                    <tr key={visitor.id}>
                      <td>{visitor.name}</td>
                      <td>{visitor.money}</td>
                      <td>{visitor.email}</td>
{/*                       <td>{visitor.startPosition}</td>
                      <td>{visitor.endPosition}</td>
                      <td>{visitor.rideCost}</td>
                      <td>{visitor.rideDate}</td> */}
                      <td>
                        <button onClick={() => acceptVisitor(visitor.id, visitor.email)} className="action-button accept-button">Accept</button>
                        <button onClick={() => deleteVisitor(visitor.id)} className="action-button delete-button">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addvisiter;
