import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import "./read.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import { FaLock,FaMapMarkerAlt,FaUserAlt ,FaCommentAlt} from "react-icons/fa";
import DialpadIcon from '@mui/icons-material/Dialpad';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import TableChartIcon from '@mui/icons-material/TableChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from 'moment';

function Read(props) {
  const { id } = props;
  const [visiter, setVisiter] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8888/api/visiter/read/${id}`)
      .then((res) => {
        console.log(res);
        setVisiter(res.data[0]);
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
// startPosition,p.endPosition , vis.optionName, p.rideCost,p.rideDate,p.rideTime
  return ( <>
    <Topbar/>
   <div className="homeContainer">
   <Sidebar/>

    <div className="vcontainer">
      <form  style={styles}>
      <h2 style={{ marginBottom: '0px' }}>User Detail</h2>
        <div className="detail-row">
          {/* <span className="detail-label">Photo:</span> */}
          <span className="information" style={{marginTop:'20px'}}>{visiter.Photo ? (
                    <img src={ visiter.Photo} alt={visiter.name} className="table-photo"style={{width:"80px",height:'80px'}} />
                  ) : (
                    ""
                  )}</span>
        </div>
        <div className="filde" style={{ marginTop: '0px' }}>
              <label className="fildelable" htmlFor="">ID</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <DialpadIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visiter.id}</span>
        </div>       

              <label className="fildelable" htmlFor="">Name</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <FaUserAlt /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visiter.name}</span>
        </div> </div> 



        <div className="filde" style={{ marginTop: '0px' }}>
              <label className="fildelable" htmlFor="">Email</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <FaCommentAlt /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visiter.email}</span>
        </div>       

              <label className="fildelable" htmlFor="">Password</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <FaLock /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visiter.password}</span>
        </div> </div>



        <div className="filde" style={{ marginTop: '0px' }}>
              <label className="fildelable" htmlFor="">Money</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <FaMapMarkerAlt /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visiter.money}</span>
        </div>       
        
              <label className="fildelable" htmlFor="">Start Position</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <DialpadIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visiter.startPosition}</span>
        </div> </div> 


        <div className="filde" style={{ marginTop: '0px' }}>
              <label className="fildelable" htmlFor="">End Position</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <FolderSharedIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visiter.endPosition}</span>
        </div>       

              <label className="fildelable" htmlFor="">Ride Cost</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <CalendarViewWeekIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visiter.rideCost}</span>
        </div> </div> 


         <div className="filde" style={{ marginTop: '0px' }}>
              <label className="fildelable" htmlFor=""> Option Name</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <TableChartIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{visiter.optionName}</span>
        </div>       

              <label className="fildelable" htmlFor="">Ride Date</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <CalendarMonthIcon /></i>
          <span style={{marginTop:"15px",width:"240px"}} >{moment(visiter.rideDate).format('YYYY-MM-DD')}</span>
        </div> </div> 



  
       
        
      <div className="button-row" >
        <Link style={{ textDecoration: "none",marginRight: '80px' }} to={'/visiter'} className="editbutton">
            <div style={{display:"flex",alignItems: "center",marginLeft:'90px',marginTop:'10px'}}>
            <FaArrowLeft className="button-icon" />
            <span style={{  fontWeight:'100'}}>Back</span>
            </div>
           
          </Link>
          <Link style={{ textDecoration: "none",marginRight: '0px' }} to={`/visiter/edit/${visiter.id}`} className="editbutton">
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
