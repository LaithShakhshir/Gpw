import './message.css'

export default function Message({own}){
    const PF =process.env.REACT_APP_PUBLIC_FOLDER;

    return(
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img src={`${PF}person/7.jpeg`} alt="" className="messageImg" />
                <p className='messageText'>Hello this lllllllllllllllllllllllllll llllllllllllllllll lllllllllllllll lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
                lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
                llllllllllllllllllllllllllllllllllllllllllllllll
                llllllllllllllllllllllis a message </p>
            </div>
            <div className="messageBottom">1 hour ago</div>

        </div>
    )
}
