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
      .get("http://localhost:8888/api/prisoners/trip")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8888/api/prisoners/deletetrip/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  
  const filteredData = data.filter((prisoner) => {
    const { id, from, to, price,date } = prisoner;
    const searchTermLower = searchTerm.toLowerCase();
  
    return (
      (id && id.toString().includes(searchTermLower)) ||
      (from && from.toLowerCase().includes(searchTermLower)) ||
      (to && to.toLowerCase().includes(searchTermLower)) ||
      // (price && price.toLowerCase().includes(searchTermLower)) ||
      (date && date.toLowerCase().includes(searchTermLower)) 
    );
  });
  

  const sortedData = sortBy
    ? [...filteredData].sort((a, b) => {
      if (sortBy === "id") {
        return a.id - b.id;
      } else if (sortBy === "from") {
        return a.from.localeCompare(b.from);
      } else if (sortBy === "to") {
        return a.to.localeCompare(b.to);
      } else if (sortBy === "price") {
        return a.price.localeCompare(b.price);
      }
      else if (sortBy === "date") {
        return a.date.localeCompare(b.date);
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
                <th onClick={() => handleSort("id")}>ID</th>
                <th onClick={() => handleSort("from")}>From</th>
                <th onClick={() => handleSort("to")}>To</th>
                <th onClick={() => handleSort("price")}>Price</th>
                <th>Trip Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((prisoner, index) => {
                return (
                  <tr key={index}>
                    <td>{prisoner.id}</td>
                    <td>{prisoner.from}</td>
                    <td>{prisoner.to}</td>
                    <td>{prisoner.price}</td>
                    <td>{moment(prisoner.PrisoneDate).format('YYYY-MM-DD')}</td>
                    

                   
                    <td>
                      <Link  className="visetor-action-link">
                        <FaEdit className="action-icon edit-icon" />
                      </Link>
                      <Link  className="visetor-action-link">
                        <FaEye className="action-icon view-icon" />
                      </Link>
                      <button
                        className="visetor-action-link"
                        onClick={() => handleDelete(prisoner.id)}
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
