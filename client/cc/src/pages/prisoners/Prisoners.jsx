import "./prisoners.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaEye, FaPrint } from "react-icons/fa";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import moment from 'moment';

export default function Prisoners() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#my-table' });
    doc.save('table.pdf');
  }

  useEffect(() => {
    axios
      .get("http://localhost:8888/api/prisoners/prisonerstabel")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8888/api/prisoners/delete/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // startPosition, endPosition, rideCost, rideDate, taxiRideId]
  const filteredData = data.filter((prisoner) => {
    const { taxiRideId, startPosition, endPosition, rideCost,rideDate } = prisoner;
    const searchTermLower = searchTerm.toLowerCase();
  
    return (
      (taxiRideId && taxiRideId.toString().includes(searchTermLower)) ||
      (startPosition && startPosition.toLowerCase().includes(searchTermLower)) ||
      (endPosition && endPosition.toLowerCase().includes(searchTermLower)) ||
      // (price && price.toLowerCase().includes(searchTermLower)) ||
      (rideDate && rideDate.toLowerCase().includes(searchTermLower)) 
    );
  });
  

  const sortedData = sortBy
    ? [...filteredData].sort((a, b) => {
      if (sortBy === "taxiRideId") {
        return a.taxiRideId - b.taxiRideId;
      } else if (sortBy === "startPosition") {
        return a.from.localeCompare(b.startPosition);
      } else if (sortBy === "endPosition") {
        return a.endPosition.localeCompare(b.endPosition);
      } else if (sortBy === "rideCost") {
        return a.rideCost.localeCompare(b.rideCost);
      }
      else if (sortBy === "rideDate") {
        return a.rideDate.localeCompare(b.rideDate);
      }
      
    })
    : filteredData;

  const handleSort = (field) => {
    setSortBy(field);
  };

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />

        <div className="visetor-table-container" style={{ marginTop: "15px" , flex:'9.1'}}>
          <div className="visetor-table-header">
            <h2 className="titel" style={{ marginBottom: '20px' }}>Trip</h2>
            <div className="buttonTop">
  <Link style={{ textDecoration: "none", marginRight: '20px' }} className="btn solid" to={"/prisoners/create"}>
    <div style={{ display: "flex", alignItems: "center", marginLeft: '40px', marginTop: '12px' }}>
      <GroupAddIcon className="sidebarIcon" />
      <span style={{ fontWeight: '200' }}>Add Trip</span>
    </div>
  </Link>
  <button style={{ marginRight: '20px' }} onClick={handlePrint} className="btn solid">
    <div style={{ display: "flex", alignItems: "center", marginLeft: '90px' }}>
      <FaPrint style={{ marginRight: '10px' }} className="print-icon" />
      <span style={{ fontWeight: '500' }}>Print</span>
    </div>
  </button>
  <button style={{ marginRight: '20px' }} onClick={handleDownload} className="btn solid">
    <div style={{ display: "flex", alignItems: "center", marginLeft: '60px' }}>
      <ArrowDownwardIcon className="print-icon" />
      <span style={{ marginTop: '3px', fontWeight: '500' }}>Download PDF</span>
    </div>
  </button>

            <div className="input-fieldv">
              <i className="fas fa-user"><SearchIcon /></i>
              <input
                type="text"
                placeholder="Search..."
                className="search-bar"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

        <div className="table">
          <table id="my-table" className="visetor-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("taxiRideId")}>ID</th>
                <th onClick={() => handleSort("startPosition")}>start Position</th>
                <th onClick={() => handleSort("endPosition")}>End Position</th>
                <th onClick={() => handleSort("rideCost")}>Ride Cost</th>
                <th>Trip Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((prisoner, index) => {
                return (
                  <tr key={index}>
                    <td>{prisoner.taxiRideId}</td>
                    <td>{prisoner.startPosition}</td>
                    <td>{prisoner.endPosition}</td>
                    <td>{prisoner.rideCost}</td>
                    <td>{moment(prisoner.PrisoneDate).format('YYYY-MM-DD')}</td>
                    

                   
                    <td>
                      <Link to={`/prisoners/edit/${prisoner.taxiRideId}`} className="visetor-action-link">
                        <FaEdit className="action-icon edit-icon" />
                      </Link>
                      <Link to={`/prisoners/read/${prisoner.taxiRideId}`} className="visetor-action-link">
                        <FaEye className="action-icon view-icon" />
                      </Link>
                      <button
                        className="visetor-action-link"
                        onClick={() => handleDelete(prisoner.taxiRideId)}
                      >
                        <FaTrashAlt className="action-icon delete-icon" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      </div>
  </>
);
}
