import "./visiter.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaEye, FaPrint } from "react-icons/fa";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import SearchIcon from '@mui/icons-material/Search';

export default function Visiter() {
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
      .get("http://localhost:8888/api/visiter/visitertabel")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8888/api/visiter/delete/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((visiter) => {
    const { id, name, email, money } = visiter; // Updated property names
    const searchTermLower = searchTerm.toLowerCase();
  
    return (
      id.toString().includes(searchTermLower) ||
      name.toLowerCase().includes(searchTermLower) ||
      email.toLowerCase().includes(searchTermLower) 
      // money.toLowerCase().includes(searchTermLower)
    );
  });
  

  const sortedData = sortBy
    ? [...filteredData].sort((a, b) => {
        if (sortBy === "id") {
          return a.id - b.id;
        } else if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else if (sortBy === "Email") {
          return a.email.localeCompare(b.email);
        }
        //  else if (sortBy === "money") {
        //   return a.money.localeCompare(b.money);
        // }
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

        <div className="visetor-table-container" style={{ marginTop: "15px", flex: "9" }}>
          <div className="visetor-table-header">
            <h2 className="titel" style={{ marginBottom: '20px' }}>User</h2>
            <div className="buttonTop">
              <Link style={{ textDecoration: "none", marginRight: '20px' }} className="btn solid" to={"/visiter/create"}>
                <div style={{ display: "flex", alignItems: "center", marginLeft: '40px', marginTop: '12px' }}>
                  <GroupAddIcon className="sidebarIcon" />
                  <span style={{ fontWeight: '200' }}>Add User</span>
                </div>
              </Link> 
              <button style={{ marginRight: '20px' }} onClick={handlePrint} className="btn solid">
<div style={{ display: "flex", alignItems: "center", marginLeft: '90px' }}>
  <FaPrint style={{ marginRight: '10px' }} className="print-icon" />
  <span style={{ fontWeight: '500' }} >Print</span>
</div>
</button>
<button style={{ marginRight: '20px' }} onClick={handleDownload} className="btn solid">
<div style={{ display: "flex", alignItems: "center", marginLeft: '60px' }}>
  <ArrowDownwardIcon className="print-icon" />
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
  <th onClick={() => handleSort("userID")}>ID</th>
  <th onClick={() => handleSort("name")}>Name</th>
  <th onClick={() => handleSort("email")}>Email</th>
  <th>Password</th>
  <th onClick={() => handleSort("money")}>Money</th>
  <th>Photo</th>
  {/*<th>ID trip</th>
  <th>ID Visite</th> */}
  <th>Action</th>
</tr>
</thead>
<tbody>
{sortedData.map((visiter, index) => {
  return (
    <tr key={index}>
      <td>{visiter.id}</td>
      <td>{visiter.name}</td>
      <td>{visiter.email}</td>
      <td>{visiter.password}</td>
      <td>{visiter.money}</td>
      <td>
        {visiter.photo ? (
          <img src={visiter.photo} alt={visiter.name} className="table-photo" />
        ) : (
          "-"
        )}
      </td>
      {/* <td>{visiter.ID_Prisoner}</td> */}
      {/* <td>{visiter.ID_Visite}</td> */}
      <td>
        <Link to={`/visiter/edit/${visiter.id}`} className="visetor-action-link">
          <FaEdit className="action-icon edit-icon" />
        </Link>
        <Link to={`/visiter/read/${visiter.id}`} className="visetor-action-link">
          <FaEye className="action-icon view-icon" />
        </Link>
        <button
          className="visetor-action-link"
          onClick={() => handleDelete(visiter.id)}
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
