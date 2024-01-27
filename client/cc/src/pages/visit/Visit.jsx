import "./visit.css"
import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./tables.css";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaEye, FaPrint  } from "react-icons/fa";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment';

export default function Visit(){
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
        .get("http://localhost:8888/api/visit/visittabel")
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    }, []);
  
    const handleDelete = (id) => {
      axios
        .delete(`http://localhost:8888/api/visit/delete/${id}`)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    };
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  // SELECT * FROM `taxiofficeoption` WHERE 1 `optionID`, `taxiOfficeID`, `optionName`, `optionTime`, `optionSeats`, `optionPhoto`, `costKmUnit`, `costKmPrice`, `taxiRideId`

    const filteredData = data.filter((visiter) => {
      const { optionID,  taxiOfficeID,taxiRideId,optionName,costKmUnit } = visiter;
      const searchTermLower = searchTerm.toLowerCase();
  
      return (
        optionID.toString().includes(searchTermLower) ||
        
        // taxiOfficeID.toLowerCase().includes(searchTermLower) ||
        // taxiRideId.toLowerCase().includes(searchTermLower) ||
        optionName.toLowerCase().includes(searchTermLower)
      );
    });
  
    const sortedData = sortBy
      ? [...filteredData].sort((a, b) => {
          if (sortBy === "optionName") {
            return a.optionName.localeCompare(b.optionName);
           
          } 
          //  else if (sortBy === "taxiOfficeID") {
          //   return a.taxiOfficeID.localeCompare(b.taxiOfficeID);
          // }
          // else if (sortBy === "taxiRideId") {
          //   return a.taxiRideId.localeCompare(b.taxiRideId);
          // }
          // else if (sortBy === "optionName") {
          //   return a.optionName.localeCompare(b.optionName);
          // }
          
        })
      : filteredData;
  
    const handleSort = (field) => {
      setSortBy(field);
    };

    return(
        <>
             <Topbar/>
            <div className="homeContainer">
            <Sidebar/>

            <div className="visetor-table-container" style={{ marginTop: "15px",  flex:'9.2'  }}>
    <div className="visetor-table-header">
    <h2 className="titel" style={{ marginBottom: '20px' }}>Services </h2>
      <div className="buttonTop">
        <Link style={{ textDecoration: "none", marginRight: '20px' }} className="btn solid" to={"/visit/create"}>
        <div style={{display:"flex",    alignitems: "center", marginLeft: '40px', marginTop: '12px'}}> 
          <GroupAddIcon className="sidebarIcon" />
          <span style={{ fontWeight: '200' }}>Add services </span>
          </div>
        </Link>
        <button  style={{ marginRight: '20px' }} onClick={handlePrint} className="btn solid">
          <div style={{display: "flex", alignItems: "center", marginLeft: '90px'}}> 
          <FaPrint style={{ marginRight: '10px' }} className="print-icon"  />
          <span style={{ fontWeight: '500' }}>Print</span>
          </div>
        </button>
        <button style={{ marginRight: '20px' }} onClick={handleDownload} className="btn solid">
        <div style={{ display: "flex", alignItems: "center", marginLeft: '60px' }}> 
          <ArrowDownwardIcon className="print-icon"/>
          <span style={{ marginTop: '3px', fontWeight: '500' }}>Download PDF</span>
          </div>
          </button>
          <div className="input-fieldv">
<i className="fas fa-user"><SearchIcon/></i>
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
            <th onClick={() => handleSort("id")}>ID</th>
            {/* <th onClick={() => handleSort("Name")}>Name</th>
            <th onClick={() => handleSort("NumOFpepole")}>Num OF pepole</th> */}
            <th>Office ID</th>
            <th>Ride ID</th>
            <th onClick={() => handleSort("Prison")}>Type</th>
            <th>Action</th>

          </tr>

        </thead>
        <tbody>
          {sortedData.map((visit, index) => {
            return (
              <tr key={index}>
                <td>{visit.optionID}</td>
                
                {/* <td>{visit.Name}</td>
                <td>{visit.NumOFpepole}</td> */}
                <td>{visit.taxiOfficeID}</td>
                <td>{visit.taxiRideId}</td>
                <td>{visit.optionName}</td>

                <td>
                  <Link to={`/visit/edit/${visit.optionID}`} className="visetor-action-link">
                    <FaEdit className="action-icon edit-icon" />
                  </Link>
                  <Link to={`/visit/read/${visit.optionID}`} className="visetor-action-link">
                    <FaEye className="action-icon view-icon" />
                  </Link>
                  <button
                    className="visetor-action-link"
                    onClick={() => handleDelete(visit.optionID)}
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
    )
}