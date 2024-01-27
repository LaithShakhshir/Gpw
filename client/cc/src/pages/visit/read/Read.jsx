import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import "./read.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import DialpadIcon from '@mui/icons-material/Dialpad';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import EventIcon from '@mui/icons-material/Event';
import DateRangeIcon from '@mui/icons-material/DateRange';
import moment from 'moment';

function Read(props) {
  const { id } = props;
  const [visit, setvisit] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8888/api/visit/read/${id}`)
      .then((res) => {
        console.log(res);
        setvisit(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);


  const styles = {
    borderRadius: "10px",
    padding: "20px",
    width: "100%",
    height: "600px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: '5px'  

    
  }

  return (<>
    <Topbar />
    <div className="homeContainer">
      <Sidebar />

      <div className="vcontainer">
      <form  style={styles}>
      <h2 style={{ marginBottom: '0px' }}>services Detail</h2>
      <div className="filde" style={{ marginTop: '0px' }}>
              <label className="fildelable" htmlFor="">ID</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <DialpadIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visit.optionID}</span>
          </div>
          {/* <label className="fildelable" htmlFor="">Name</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <CalendarMonthIcon /></i>
                <span style={{marginTop:"15px",width:"240px"}} >{visit.Name}</span>

        </div> </div> 
          
        <div className="filde" style={{ marginTop: '0px' }}>
        <label className="fildelable" htmlFor="">Num OF pepole:</label>
        <div className="input-field">
                <i className="fas fa-envelope"> </i>
                <span style={{marginTop:"15px",width:"240px"}} >{visit.NumOFpepole}</span>
          </div> */}


          <label className="fildelable" htmlFor="">Taxi Office ID </label>
          <div className="input-field">
                <i className="fas fa-envelope"> <DialpadIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visit.taxiOfficeID}</span>
          </div>          </div>

          



          <div className="filde" style={{ marginTop: '0px' }}>
          <label className="fildelable" htmlFor="">taxi Ride Id</label>
          <div className="input-field">
                <i className="fas fa-envelope"> <ReduceCapacityIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visit.taxiRideId}</span>
          </div>
          <label className="fildelable" htmlFor="">Option Name</label>
              <div className="input-field">
                <i className="fas fa-envelope"> </i>
          <span style={{marginTop:"15px",width:"240px"}} >{visit.optionName}</span>
          </div>          </div>
          <div className="filde" style={{ marginTop: '0px' }}>

          <label className="fildelable" htmlFor="">Cost Km Price</label>
              <div className="input-field">
                <i className="fas fa-envelope"> </i>
          <span style={{marginTop:"15px",width:"240px"}} >{visit.costKmPrice}</span>
          </div>
          </div>




          <div className="button-row" >
        <Link style={{ textDecoration: "none",marginRight: '80px' }} to={'/visit'} className="editbutton">
            <div style={{display:"flex",alignItems: "center",marginLeft:'90px',marginTop:'10px'}}>
            <FaArrowLeft className="button-icon" />
            <span style={{  fontWeight:'100'}}>Back</span>
            </div>
           
          </Link>
          <Link style={{ textDecoration: "none",marginRight: '0px' }} to={`/visit/edit/${visit.optionID}`} className="editbutton">
            <div style={{display:"flex",alignItems: "center",marginLeft:'90px',marginTop:'10px'}}>
            <FaEdit className="button-icon" />
            <span style={{  fontWeight:'100'}}>Edit</span>
            </div>
           
          </Link>
        </div>  



        </form>
      </div>
    </div>
  </>
  );
}

export default Read;
