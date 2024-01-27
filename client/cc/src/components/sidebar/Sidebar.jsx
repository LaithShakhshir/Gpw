// import { Event, Chat } from "@mui/icons-material"
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// import PeopleIcon from '@mui/icons-material/People';
// import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
// import FolderSharedIcon from '@mui/icons-material/FolderShared';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import TableChartIcon from '@mui/icons-material/TableChart';
// import AddCardIcon from '@mui/icons-material/AddCard';
// import GroupAddIcon from '@mui/icons-material/GroupAdd';
// import "./sidebar.css"
// import { Link } from "react-router-dom";
// import { useContext } from 'react';
// import { AuthContext } from '../context/authContext';


// export default function Sidebar(){
//     const { currentUser } = useContext(AuthContext);
//    const id=currentUser.ID;


//     return(
//         <div className="sidebar">
//             <div className="sidebarWrapper">
//                 <ul className="sidebarList">
//                 <li className="sidebarListItem">
//                     <Link  style={{textDecoration:"none"}} className="sidebarListItemLink" to={'/'}> 

//                         <Event className="sidebarIcon"/>
//                         <span className="sidebarListItemText">Events </span>
//                         </Link>
//                     </li>
           
//                     <li className="sidebarListItem">
//                     <Link  style={{textDecoration:"none"}} className="sidebarListItemLink"to={`/profile/${id}`}>
//                          <AccountBoxIcon className="sidebarIcon"/>
//                         <span className="sidebarListItemText">Profile</span></Link>
//                     </li>
//                     <li className="sidebarListItem">
//                     <Link  style={{textDecoration:"none"}} className="sidebarListItemLink" to={'/messenger'}> 
//                         <Chat className="sidebarIcon"/>
//                         <span className="sidebarListItemText">Chat</span>
//                         </Link>
//                     </li>
//                     <li className="sidebarListItem">
//                     <Link  style={{textDecoration:"none"}} className="sidebarListItemLink" to={'/visiter/create'}> 

//                         <GroupAddIcon className="sidebarIcon"/>
//                         <span className="sidebarListItemText">Add Viseters</span>
//                         </Link>
//                     </li>
                    
//                     <li className="sidebarListItem">
//                     <Link  style={{textDecoration:"none"}} className="sidebarListItemLink" to={'/visiter'}> 

//                         <PeopleIcon className="sidebarIcon"/>
//                         <span className="sidebarListItemText">Viseters information</span>
//                         </Link>
//                     </li>
                   
//                     <li className="sidebarListItem">
//                     <Link  style={{textDecoration:"none"}} className="sidebarListItemLink" to={'/emergency'}> 

//                         <NotificationImportantIcon className="sidebarIcon"/>
//                         <span className="sidebarListItemText">Emergency</span>
//                         </Link>
//                     </li>
//                     <li className="sidebarListItem">
//                     <Link  style={{textDecoration:"none"}} className="sidebarListItemLink" to={'/prisoners'}> 

//                         <FolderSharedIcon className="sidebarIcon"/>
//                         <span className="sidebarListItemText">Prisoner information</span>
//                         </Link>
//                     </li>
//                     <li className="sidebarListItem">
//                     <Link  style={{textDecoration:"none"}} className="sidebarListItemLink" to={'/prisoners/create'}> 

//                         <PersonAddAltIcon className="sidebarIcon"/>
//                         <span className="sidebarListItemText">Add prisoner </span>
//                         </Link>
//                     </li>
//                     <li className="sidebarListItem">
//                     <Link  style={{textDecoration:"none"}} className="sidebarListItemLink" to={'/visit'}> 

//                         <TableChartIcon className="sidebarIcon"/>
//                         <span className="sidebarListItemText">Visit data</span>
//                         </Link>
//                     </li>
//                     <li className="sidebarListItem">
//                     <Link  style={{textDecoration:"none"}} className="sidebarListItemLink" to={'/visit/create'}> 

//                         <AddCardIcon className="sidebarIcon"/>
//                         <span className="sidebarListItemText">Create Visit </span>
//                         </Link>
//                     </li>
                    
//                     <li className="sidebarListItem">
//                     <Link  style={{textDecoration:"none"}} className="sidebarListItemLink" to={'/proofpapers'}> 

//                         <ReceiptLongIcon className="sidebarIcon"/>
//                         <span className="sidebarListItemText">Proof papers</span>
//                         </Link>
//                     </li>
                    
//                 </ul>
        
//             </div>
//         </div>
//     )
// }


import { Event, Chat } from "@mui/icons-material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PeopleIcon from '@mui/icons-material/People';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import TableChartIcon from '@mui/icons-material/TableChart';
import AddCardIcon from '@mui/icons-material/AddCard';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import "./sidebar.css"
import { Link, useLocation } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';


export default function Sidebar(){
    const { currentUser } = useContext(AuthContext);
    const id = currentUser.ID;
    const location = useLocation();

    return(
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className={`sidebarListItem ${location.pathname === '/' ? 'active' : ''}`}>
                        <Link to={'/'} className="sidebarListItemLink" style={{textDecoration:"none"}}>
                            <Event className="sidebarIcon"/>
                            <span className="sidebarListItemText">Events</span>
                        </Link>
                    </li>
                    <li className={`sidebarListItem ${location.pathname === `/profile/${id}` ? 'active' : ''}`}> 
                        <Link to={`/profile/${id}`} className="sidebarListItemLink" style={{textDecoration:"none"}}>
                            <AccountBoxIcon className="sidebarIcon"/>
                            <span className="sidebarListItemText">Profile</span>
                        </Link>
                    </li>
                    <li className={`sidebarListItem ${location.pathname === '/messenger' ? 'active' : ''}`}>
                        <Link to={'/messenger'} className="sidebarListItemLink" style={{textDecoration:"none"}}>
                            <Chat className="sidebarIcon"/>
                            <span className="sidebarListItemText">Chat</span>
                        </Link>
                    </li>
                    <li className={`sidebarListItem ${location.pathname === '/visiter/create' ? 'active' : ''}`}>
                        <Link to={'/visiter/create'} className="sidebarListItemLink" style={{textDecoration:"none"}}>
                            <GroupAddIcon className="sidebarIcon"/>
                            <span className="sidebarListItemText">Add User</span>
                        </Link>
                    </li>
                    <li className={`sidebarListItem ${location.pathname === '/visiter' ? 'active' : ''}`}>
                        <Link to={'/visiter'} className="sidebarListItemLink" style={{textDecoration:"none"}}>
                            <PeopleIcon className="sidebarIcon"/>
                            <span className="sidebarListItemText">User Information</span>
                        </Link>
                    </li>
                    <li className={`sidebarListItem ${location.pathname === '/emergency' ? 'active' : ''}`}>
                        <Link to={'/emergency'} className="sidebarListItemLink" style={{textDecoration:"none"}}>
                            <NotificationImportantIcon className="sidebarIcon"/>
                            <span className="sidebarListItemText">Emergency</span>
                        </Link>
                    </li>
                    <li className={`sidebarListItem ${location.pathname === '/prisoners' ? 'active' : ''}`}>
                        <Link to={'/prisoners'} className="sidebarListItemLink" style={{textDecoration:"none"}}>
                            <FolderSharedIcon className="sidebarIcon"/>
                            <span className="sidebarListItemText">Ride Information</span>
                        </Link>
                    </li>
                    <li className={`sidebarListItem ${location.pathname === '/trip' ? 'active' : ''}`}>
                        <Link to={'/trip'} className="sidebarListItemLink" style={{textDecoration:"none"}}>
                            <TableChartIcon className="sidebarIcon"/>
                            <span className="sidebarListItemText">Taxi trip</span>
                        </Link>
                    </li>
                    <li className={`sidebarListItem ${location.pathname === '/prisoners/create' ? 'active' : ''}`}>
                        <Link to={'/prisoners/create'} className="sidebarListItemLink" style={{textDecoration:"none"}}>
                            <PersonAddAltIcon className="sidebarIcon"/>
                            <span className="sidebarListItemText">Add Trip</span>
                        </Link>
                    </li>
                    <li className={`sidebarListItem ${location.pathname === '/visit' ? 'active' : ''}`}>
                        <Link to={'/visit'} className="sidebarListItemLink" style={{textDecoration:"none"}}>
                            <TableChartIcon className="sidebarIcon"/>
                            <span className="sidebarListItemText">Service</span>
                        </Link>
                    </li>
                    <li className={`sidebarListItem ${location.pathname === '/visit/create' ? 'active' : ''}`}>
                        <Link to={'/visit/create'} className="sidebarListItemLink" style={{textDecoration:"none"}}>
                            <AddCardIcon className="sidebarIcon"/>
                            <span className="sidebarListItemText">ِِAdd Service</span>
                        </Link>
                    </li>
                    
                    <li className={`sidebarListItem ${location.pathname === '/proofpapers' ? 'active' : ''}`}>
                        <Link to={'/proofpapers'} className="sidebarListItemLink" style={{textDecoration:"none"}}>
                            <ReceiptLongIcon className="sidebarIcon"/>
                            <span className="sidebarListItemText">Proof Papers</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
