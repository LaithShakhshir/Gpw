import "./rightbar.css"
import { AuthContext } from '../../components/context/authContext';
import Calendar from '../calendar/Calendar'
import { useContext, useState } from 'react';
export default function Rightbar({profile}){
  const PF =process.env.REACT_APP_PUBLIC_FOLDER;


const { currentUser } = useContext(AuthContext);

console.log(currentUser)
  const HomeRightbar = () => {
    return(<>
    
            <Calendar className="rightbarAd"/>
     
    </>)
  };

  const ProfileRightbar =() =>{
    return(<>
    <h4 className="rightbarTitle">User Information</h4>
    <div className="rightbarInfo">
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">City:</span>
        <span className="rightbarInfoValue">{currentUser.Location}</span>

      </div>

      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">From:</span>
        <span className="rightbarInfoValue">Palestine</span>

      </div>

      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">Phone:</span>
        <span className="rightbarInfoValue">{currentUser.telephone}</span>

      </div>

    </div>
    <Calendar className="rightbarAd"/>


    </>)
  }

    return(
        <div className="rightbar">
          <div className="rightbarWrapper">
           {profile ? <ProfileRightbar/> : <HomeRightbar/>}
          </div>
        </div>
    )
} 