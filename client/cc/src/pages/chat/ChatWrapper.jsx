import { ChatFeed, MultiChatSocket, MultiChatWindow, useMultiChatLogic } from 'react-chat-engine-advanced'
import { AuthContext } from '../../components/context/authContext';
import { useContext } from "react"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";


// import { PrettyChatWindow } from 'react-chat-engine-pretty';


const Chat = (props) => {
    // console.log("ss")

  const chatProps = useMultiChatLogic(
    '6bfdf9dc-269a-45a0-bd32-defb44f3a7eb',
    props.user.Name,
    props.user.Name
  );

  return (

                  <div style={{ height: '90vh' ,width:'100%'}}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow {...chatProps} style={{ height: '100%' }} />
    </div>

   
      

  );
};

const ChatWrapper = () => {
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser.Name)

  if (!currentUser) {
    return null;
  }

  return <Chat user={currentUser} />;
}

export default ChatWrapper;
