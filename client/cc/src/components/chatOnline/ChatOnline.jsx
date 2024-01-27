import './chatOnline.css'

export default function ChatOnline(){
    const PF =process.env.REACT_APP_PUBLIC_FOLDER;

    return(
        <div className='chatOnline'>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className='chatOnlineImg' src={`${PF}post/3.jpeg`} alt="" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">sojod jamous</span>
            </div>
        </div>
    )
}
