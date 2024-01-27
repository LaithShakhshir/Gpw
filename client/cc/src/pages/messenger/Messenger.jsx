import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import Conversations from "../../components/conversations/Conversations"
import Message from "../../components/message/Message"



import "./messenger.css"
import ChatOnline from "../../components/chatOnline/ChatOnline"
import ChatWrapper from "../chat/ChatWrapper"


export default function Messenger(){

  const PF =process.env.REACT_APP_PUBLIC_FOLDER;

    return(
        <>
        <Topbar/>
        <div className="chat">
        <Sidebar/>
        <div className="messenger">
        <ChatWrapper/>
           {/* <div className="chatBox">
          <div className='person'>
            <img src={`${PF}person/7.jpeg`} alt="" className="messageImg" />
           <span className="chatOnlineName">sojod jamous</span>
           </div>
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">

                <Message/>
                <Message own={true}/>
                <Message/>
                <Message own={true}/>
                <Message/>
                <Message/>
                <Message/>


            </div>
            <div className="chatBoxBottom">
                <textarea className="chatMessageInput" placeholder="write somthing..."></textarea>
                <button className="chatSubmitButton">Send</button>

            </div>
          </div>
          </div>
          <div className="chatOnline">
          <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input className="chatMenuInput" placeholder="Search Friends"/>
                <Conversations/>
                <Conversations/>
               
                <Conversations/>
                <Conversations/>
              




            </div>
          </div>



          <div className="chatOnlineWrapper">
            <span className="chatOnlineName" style={{marginTop:'20px'}}>Online Friends</span>
            <ChatOnline/>
           

          </div>

          </div>  */}
        </div>
        </div>
        
        </>
    )

}