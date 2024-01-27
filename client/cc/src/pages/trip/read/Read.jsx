import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import "./read.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import DialpadIcon from '@mui/icons-material/Dialpad';
import { FaLock,FaMapMarkerAlt,FaUserAlt ,FaCommentAlt} from "react-icons/fa";
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from 'moment';


function Read(props) {
  const { id } = props;
  const [prisoners, setprisoners] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8888/api/prisoners/read/${id}`)
      .then((res) => {
        console.log(prisoners);
        setprisoners(res.data[0]);
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

  return ( <>
    <Topbar/>
   <div className="homeContainer">
   <Sidebar/>

    <div className="vcontainer">
    <form  style={styles}>
    <h2 style={{ marginBottom: '0px' }}>Trip Detail</h2>
    <div className="filde" style={{ marginTop: '0px' }}>
    <label className="fildelable" htmlFor="">ID</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <DialpadIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{prisoners.id}</span>
        </div>
        <label className="fildelable" htmlFor="">From</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <FaUserAlt /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{prisoners.from}</span>
        </div>        </div>


        <div className="filde" style={{ marginTop: '0px' }}>
              <label className="fildelable" htmlFor="">To</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <FaMapMarkerAlt /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{prisoners.to}</span>
        </div>

        <label className="fildelable" htmlFor="">Price</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <CalendarViewWeekIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{prisoners.price}</span>
        </div>
        </div>



        <div className="filde" style={{ marginTop: '0px' }}>

        <label className="fildelable" htmlFor=""> Date </label>
              <div className="input-field">
                <i className="fas fa-envelope"> <CalendarMonthIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{moment(prisoners.date).format('YYYY-MM-DD')}</span>
        </div>

        <label className="fildelable" htmlFor=""> Type </label>
              <div className="input-field">
                <i className="fas fa-envelope"> <CalendarMonthIcon /></i>
                <span style={{marginTop:"15px",width:"240px"}} >{prisoners.type}</span>
          {/* <span style={{marginTop:"15px",width:"240px"}} >{moment(prisoners.type).format('YYYY-MM-DD')}</span> */}
        </div>        </div>
        <div className="filde" style={{ marginTop: '0px' }}>
              <label className="fildelable" htmlFor=""> ID</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <DialpadIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{prisoners.id}</span>
        </div>       

              <label className="fildelable" htmlFor=""> Name</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <FaUserAlt /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{prisoners.Name}</span>
        </div> </div> 
      


      
        <div className="button-row" >
        <Link style={{ textDecoration: "none",marginRight: '80px' }} to={'/prisoners'} className="editbutton">
            <div style={{display:"flex",alignItems: "center",marginLeft:'90px',marginTop:'10px'}}>
            <FaArrowLeft className="button-icon" />
            <span style={{  fontWeight:'100'}}>Back</span>
            </div>
           
          </Link>
          <Link style={{ textDecoration: "none",marginRight: '0px' }} to={`/prisoners/edit/${prisoners.id}`} className="editbutton">
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
